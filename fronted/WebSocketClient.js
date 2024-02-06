import { handleMessage } from "./services/response.js";

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

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("open connection");
      this.startHeartbeat();
    };

    this.ws.onclose = () => {
      console.log("close connection");
      this.stopHeartbeat();
    };

    this.ws.onerror = () => {
      console.log("error connection");
    };

    this.ws.onmessage = (event) => handleMessage(event);
  }

  reconnect() {
    this.disconnect();
    this.connect();
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const msg = JSON.stringify(message);

      this.ws.send(msg);
    } else {
      console.error("WebSocket is not open.");
    }
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
  }
}
