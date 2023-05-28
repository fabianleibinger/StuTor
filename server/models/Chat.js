import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema({
    studysession: {
        type: Schema.Types.ObjectId,
        ref: 'Studysession',
        required: true,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    ],
    latest_message: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
    },
},
    { timestamps: true }
);

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;