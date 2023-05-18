import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import bookingRoute from "./routes/booking.route.js"
import courseRoute from "./routes/course.route.js"
import achievementRoute from "./routes/achievement.route.js"
import studysessionRoute from "./routes/studysession.route.js"
import universityRoute from "./routes/university.route.js"
import reviewRoute from "./routes/review.route.js"


const app = express();
dotenv.config();

const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("*********** CONNECTED TO MONGODB ***********")
    } catch (error){
        console.log(error);
    }
};

app.use("/api/user", userRoute);
app.use("api/booking", bookingRoute);
app.use("api/course", courseRoute);
app.use("api/achievement", achievementRoute);
app.use("api/studysession", studysessionRoute);
app.use("api/university", universityRoute);
app.use("api/review", reviewRoute);

const port = 3001;
app.listen(port, () => {
    connect()
    console.log('server running on port ' + port);
});