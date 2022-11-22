import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Expo from "expo-server-sdk";
import { Server } from "socket.io";
import { createServer } from "http";
import userRoutes from "./router/user.js";
import requestRoutes from "./router/request.js";
import messageRoutes from "./router/message.js";

import Message from "./models/message.js";

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/request", requestRoutes);
app.use("/message", messageRoutes);

const CONNECTION_URL =
  "mongodb://Medo:mohd2010@172.30.200.156:8080/?authSource=admin";
const PORT = process.env.PORT || 8080;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://192.168.1.3:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID: ${socket.id} joined room :${data}`);
  });

  socket.on("send_message", (data) => {
    const { message, author, sender } = data;
    const newMessage = new Message({
      ...data,
      message: message,
      receiver: author,
      sender: sender,
    });
    newMessage.save();
    console.log(newMessage);
    socket.to(data.room).emit("receive_message", data);
  });
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    httpServer.listen(PORT, () =>
      console.log("Server running on port: " + PORT)
    )
  )
  .catch((error) => console.log(error.message));
