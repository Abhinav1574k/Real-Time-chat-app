const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const users = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ username, room }) => {
    username = String(username || "").trim();
    room = String(room || "").trim();

    if (!username || !room) return;

    socket.join(room);

    users.set(socket.id, {
      username,
      room
    });

    socket.emit("systemMessage", {
      text: `Welcome to ${room}, ${username}!`
    });

    socket.to(room).emit("systemMessage", {
      text: `${username} joined the room.`
    });

    broadcastUsers(room);
  });

  socket.on("chatMessage", (message) => {
    const user = users.get(socket.id);

    if (!user || !message || !message.trim()) return;

    io.to(user.room).emit("chatMessage", {
      username: user.username,
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    });
  });

  socket.on("typing", () => {
    const user = users.get(socket.id);

    if (!user) return;

    socket.to(user.room).emit("typing", {
      username: user.username
    });
  });

  socket.on("stopTyping", () => {
    const user = users.get(socket.id);

    if (!user) return;

    socket.to(user.room).emit("stopTyping");
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);

    if (user) {
      socket.to(user.room).emit("systemMessage", {
        text: `${user.username} left the room.`
      });

      users.delete(socket.id);
      broadcastUsers(user.room);
    }

    console.log("User disconnected:", socket.id);
  });
});

function broadcastUsers(room) {
  const roomUsers = [];

  for (const user of users.values()) {
    if (user.room === room) {
      roomUsers.push(user.username);
    }
  }

  io.to(room).emit("userList", roomUsers);
}

server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});