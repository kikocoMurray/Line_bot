const WEBSOCKET_STATUS = Object.freeze({
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
});

(() => {
  try {
    const { ws } = window;
    const timer = setInterval(() => {
      const message = {
        router: "heartbeat",
      };
      ws.send(JSON.stringify(message));
    }, 10000);

    if (ws.readyState === WEBSOCKET_STATUS.CLOSED) {
      clearInterval(timer);
    }
  } catch (err) {
    console.log(err);
  }
})();
