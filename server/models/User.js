import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        bcrypt: true,
    },
    surname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    role: {
        type: String,
        enum: ['STUDENT', 'TUTOR'],
        default: 'STUDENT',
    },
    university: {
        type: Schema.Types.ObjectId,
        ref: 'University',
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);

export default User;