import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"


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

const port = 3001;
app.listen(port, () => {
    connect()
    console.log('server running on port ' + port);
});