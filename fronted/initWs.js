const WEBSOCKET_STATUS = Object.freeze({
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
});

class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.timer = null;
  }

  start() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("open connection");
        this.startHeartbeat();
      };

      this.ws.onclose = () => {
        console.log("close connection");
        this.stopHeartbeat();
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event);
      };
    } catch (e) {
      console.error(e);
    }
  }

  restart() {
    if (this.ws) {
      this.ws.close();
    }
    this.start();
  }

  startHeartbeat() {
    this.timer = setInterval(() => {
      if (this.ws.readyState === WEBSOCKET_STATUS.OPEN) {
        const message = {
          router: "heartbeat",
        };
        this.ws.send(JSON.stringify(message));
      } else {
        this.stopHeartbeat();
      }
    }, 10000);
  }

  stopHeartbeat() {
    clearInterval(this.timer);
  }

  handleMessage(event) {
    const message = JSON.parse(event.data);

    switch (message.router) {
      case "heartbeat": {
        console.log(message);
        break;
      }
      // Add more cases for different message types if needed
    }
  }
}

// 使用範例
const wsClient = new WebSocketClient("ws://localhost:3001");
window.ws = wsClient.start();

// 如果需要重啟連線，可以調用 restart 方法
// wsClient.restart();
