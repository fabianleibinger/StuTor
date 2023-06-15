import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import achievementRoute from './routes/AchievementRoute.js';
import bookingRoute from './routes/BookingRoute.js';
import courseRoute from './routes/CourseRoute.js';
import reviewRoute from './routes/ReviewRoute.js';
import studysessionRoute from './routes/StudysessionRoute.js';
import universityRoute from './routes/UniversityRoute.js';
import userRoute from './routes/UserRoute.js';
import authRoute from "./routes/AuthenticationRoute.js";
import userachievementRoute from './routes/UserAchievementRoute.js';
import userStudysessionRoute from './routes/UserStudysessionRoute.js';


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
// Increase the maximum payload size limit to 50MB (or adjust according to your needs)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/achievement', achievementRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/course', courseRoute);
app.use('/api/review', reviewRoute);
app.use('/api/studysession', studysessionRoute);
app.use('/api/university', universityRoute);
app.use('/api/user', userRoute);
app.use("/api/auth", authRoute);
app.use('/api/userAchievement', userachievementRoute);
app.use('/api/userStudysession', userStudysessionRoute);

// For generating error messages & codes
// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Something went wrong!";

//   return res.status(errorStatus).send(errorMessage);
// });

const port = 3001;
app.listen(port, () => {
    connect();
    console.log('Backend server running on port ' + port);
});