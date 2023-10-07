"use-strict";
import * as net from "node:net";
import { argv } from "node:process";
const port = argv[2];
const server = new net.Server();

server.on("connection", (sock) => {
  console.log(
    "New connection handled from " + sock.remoteAddress + ":" + sock.remotePort
  );

  sock.on("data", (data) => {
    let msg = data.toString();
    if (msg === "END") {
      sock.destroy();
      console.log(
        "connection closed with " + sock.remoteAddress + ":" + sock.remotePort
      );
    } else {
      console.log(msg);
      sock.write("RECEIVED");
    }
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log("Running on https://localhost:" + port);
});
