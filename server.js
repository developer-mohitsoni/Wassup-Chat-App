const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("./"));

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// Socket

const { Server } = require("socket.io");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connected...");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
