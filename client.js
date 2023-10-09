"use strict";
import { stdin, stdout } from "process";
import * as net from "net";
import readline from "readline";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

const socket = new net.Socket();
const host = process.argv[2];
const port = process.argv[3];

if (!host || !port) {
  console.error("FATAL ERROR: Host and port are required.");
  process.exit(1);
}

socket.connect(port, host, () => {
  console.log(`Connected to ${host}:${port}`);
});

socket.on("error", (err) => {
  console.error("Socket error:", err.message);
});

socket.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

rl.on("line", (line) => {
  socket.write(line);
});

socket.on("close", () => {
  console.log("Connection closed.");
  process.exit(0);
});
