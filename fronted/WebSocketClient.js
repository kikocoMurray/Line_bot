const WEBSOCKET_STATUS = Object.freeze({
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
});

export default class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.timer = null;
  }

  start() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("open connection");
      this.startHeartbeat();
      window.ws = this;
    };

    this.ws.onclose = () => {
      console.log("close connection");
      this.stopHeartbeat();
      window.ws = undefined;
    };

    this.ws.onerror = () => {
      console.log("error connection");
      window.ws = undefined;
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(event);
    };
  }

  restart() {
    if (this.ws) {
      this.ws.close();
    }
    this.start();
  }

  stop() {
    if (this.ws) {
      this.ws.close();
    }
  }

  send(message) {
    console.log("1");
    const msg = JSON.stringify(message);

    this.ws.send(msg);
  }

  startHeartbeat() {
    this.timer = setInterval(() => {
      const message = {
        router: "heartbeat",
      };
      this.ws.send(JSON.stringify(message));
    }, 10000);
  }

  stopHeartbeat() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null; // 將計時器設置為 null
    }

    console.log(this.timer);
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
