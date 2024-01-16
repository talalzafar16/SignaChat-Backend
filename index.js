require("dotenv").config();
const express = require("express");
require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/routes");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

// Router
app.use("/api/v1", router);

// Test Api
app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

const server = app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("setup", (chatId) => {
    console.log(chatId);
    socket.join(chatId);
    socket.emit("connected");
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stopped typing", (room) => socket.in(room).emit("stopped typing"));
  socket.on("new message", (newMessageRecieved) => {
    console.log("New message received:", newMessageRecieved);

    const room1 = newMessageRecieved.senderId + newMessageRecieved.recieverId;
    const room2 = newMessageRecieved.recieverId + newMessageRecieved.senderId;

    console.log("Emitting to room:", room1);
    socket.to(room1).emit("message received", newMessageRecieved);

    console.log("Emitting to room:", room2);
    socket.emit("message received", newMessageRecieved);
  });
  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
