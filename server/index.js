const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
});
const PORT = 3001;
app.use(cors(
    
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
));
app.get("/", (req, res) => {
    res.send("Hello World!");
});         
io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
  
    socket.on("message", ({ room, message }) => {
      console.log({ room, message });
      socket.to(room).emit("receive-message", message);
    });
  
    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

server.listen(PORT, () => {
    console.log("listening on *:3001");
});
