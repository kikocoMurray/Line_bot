import WebSocketClient from "./WebSocketClient.js";

(() => {
  // 使用範例
  const wsClient = new WebSocketClient("ws://localhost:3001");
  wsClient.connect();

  window.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      wsClient.disconnect();
    } else {
      wsClient.reconnect();
    }
  });

  window.ws = wsClient;
})();

// 如果需要重啟連線，可以調用 restart 方法
// wsClient.reconnect();
