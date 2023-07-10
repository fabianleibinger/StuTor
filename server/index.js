import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";

import achievementRoute from "./routes/AchievementRoute.js";
import bookingRoute from "./routes/BookingRoute.js";
import chatRoute from "./routes/ChatRoute.js";
import courseRoute from "./routes/CourseRoute.js";
import messageRoute from "./routes/MessageRoute.js";
import reviewRoute from "./routes/ReviewRoute.js";
import studysessionRoute from "./routes/StudysessionRoute.js";
import universityRoute from "./routes/UniversityRoute.js";
import userRoute from "./routes/UserRoute.js";
import authRoute from "./routes/AuthenticationRoute.js";
import userachievementRoute from "./routes/UserAchievementRoute.js";
import userStudysessionRoute from "./routes/UserStudysessionRoute.js";
import paymentRoute from "./routes/PaymentRoute.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("*********** CONNECTED TO MONGODB ***********");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// Increase the maximum payload size limit to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/achievement", achievementRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/chat", chatRoute);
app.use("/api/course", courseRoute);
app.use("/api/message", messageRoute);
app.use("/api/review", reviewRoute);
app.use("/api/studysession", studysessionRoute);
app.use("/api/university", universityRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/userAchievement", userachievementRoute);
app.use("/api/userStudysession", userStudysessionRoute);
app.use("/api/payment", paymentRoute);

// Http logger
// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request for ${req.url}`);
//   /*const originalSend = res.send;
//   let responseSent = false;
//   res.send = function () {
//     if (!responseSent) {
//       responseSent = true;
//       console.log(
//         `Response for ${req.method} ${req.url}: ${res.statusCode}, response body: ${arguments[0]}`
//       );
//     }
//     originalSend.apply(res, arguments);
//   };
//   next();*/
// });

const port = 3001;
const server = app.listen(port, () => {
  connect();
  console.log("Backend server running on port " + port);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userId) => {
    socket.join(userId);
    console.log(userId + " connected");
    socket.emit("connected");
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    console.log("User joined chat " + chatId);
  });

  socket.on("new message", (newMessageReceived) => {
    newMessageReceived.chat.users.forEach((userId) => {
      if (userId == newMessageReceived.sender._id) return;
      socket.in(userId).emit("message received", newMessageReceived);
    });
  });

  socket.on("typing", (chat) => {
    chat.users.forEach((user) => {
      socket.in(user._id).emit("typing");
    });
  });

  socket.on("stop typing", (chat) => {
    chat.users.forEach((user) => {
      socket.in(user._id).emit("stop typing");
    });
  });

  socket.on("new booking", (studysession) => {
    socket.in(studysession.tutoredBy._id).emit("booking received", studysession);
  });
});
