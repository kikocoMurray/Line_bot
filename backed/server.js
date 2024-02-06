const express = require("express");
const { handleHeartbeat } = require("./tools");
const SocketServer = require("ws").Server;

const PORT = 3001;

const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

const wss = new SocketServer({ server });

//當 WebSocket 從外部連結時執行
wss.on("connection", (ws) => {
  //連結時執行此 console 提示
  console.log("Client connected");

  //   //固定送最新時間給 Client
  //   const sendNowTime = setInterval(() => {
  //     ws.send(String(new Date()));
  //   }, 1000);

  ws.on("message", (data) => {
    const message = JSON.parse(data);

    switch (message.router) {
      case "heartbeat": {
        const response = handleHeartbeat();

        ws.send(JSON.stringify(response));
        break;
      }
    }
  });

  //當 WebSocket 的連線關閉時執行
  ws.on("close", () => {
    //連線中斷時停止 setInterval
    // clearInterval(sendNowTime);
    console.log("Close connected");
  });
});
