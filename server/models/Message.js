import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;