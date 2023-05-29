import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import achievementRoute from './routes/AchievementRoute.js';
import bookingRoute from './routes/BookingRoute.js';
import chatRoute from './routes/ChatRoute.js';
import courseRoute from './routes/CourseRoute.js';
import messageRoute from './routes/MessageRoute.js';
import reviewRoute from './routes/ReviewRoute.js';
import studysessionRoute from './routes/StudysessionRoute.js';
import universityRoute from './routes/UniversityRoute.js';
import userRoute from './routes/UserRoute.js';
import userachievementRoute from './routes/UserAchievementRoute.js';
import userStudysessionRoute from './routes/UserStudysessionRoute.js';


const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('*********** CONNECTED TO MONGODB ***********');
    } catch (error) {
        console.log(error);
    }
};

app.use(express.json());
// Http logger
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}: response ${res.statusCode}`);
    next();
});

app.use('/api/achievement', achievementRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/chat', chatRoute);
app.use('/api/course', courseRoute);
app.use('/api/message', messageRoute);
app.use('/api/review', reviewRoute);
app.use('/api/studysession', studysessionRoute);
app.use('/api/university', universityRoute);
app.use('/api/user', userRoute);
app.use('/api/userAchievement', userachievementRoute);
app.use('/api/userStudysession', userStudysessionRoute);

const port = 3001;
app.listen(port, () => {
    connect();
    console.log('server running on port ' + port);
});