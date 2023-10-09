import * as net from "net";
import { argv } from "process";

const port = argv[2];
const server = new net.Server();

if (port === undefined) {
  console.error("FATAL ERROR: Port argument not provided.");
  process.exit(1);
}

server.on("connection", (sock) => {
  console.log(
    "New connection handled from " + sock.remoteAddress + ":" + sock.remotePort
  );

  sock.on("data", (data) => {
    const msg = data.toString();
    if (msg === "END") {
      sock.end();
      console.log(
        "Connection closed with " + sock.remoteAddress + ":" + sock.remotePort
      );
    } else {
      console.log("Received message: " + msg);
      sock.write("RECEIVED");
    }
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log("Server running on https://localhost:" + port);
});
