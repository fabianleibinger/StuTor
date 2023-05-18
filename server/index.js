import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"


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


const port = 3001;
app.listen(port, () => {
    connect()
    console.log('server running on port ' + port);
});