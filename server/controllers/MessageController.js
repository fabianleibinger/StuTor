import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { ObjectId } from "mongodb";

export const createMessage = async (req, res) => {
    try {
        // Check if chat and sender exist.
        const chatId = new ObjectId(req.body.chat);
        const chat = await Chat.findById(chatId);
        const senderId = new ObjectId(req.body.sender);
        const sender = await User.findById(senderId);
        if (!chat || !sender) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Create message.
        const newMessage = new Message({
            chat: chatId,
            sender: senderId,
            content: req.body.content,
        });
        try {
            const savedMessage = await newMessage.save();
            res.status(201).send(savedMessage);
        }
        catch (err) {
            res.status(500).send('Failed to create message!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getMessage = async (req, res) => {
    try {
        const messageId = new ObjectId(req.params.messageId);
        const message = await Message.findById(messageId);
        try {
            if (!message) {
                res.status(404).send('Message not found!');
            } else {
                res.status(200).send(message);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve message!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getMessagesOfChat = async (req, res) => {
    try {
        // Check if chat exists.
        const chatId = new ObjectId(req.params.chatId);
        const chat = await Chat.findById(chatId);
        if (!chat) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Get messages of chat.
        const messages = await Message.find({ chat: chatId });
        try {
            if (messages.length === 0) {
                res.status(404).send('No messages found!');
            } else {
                res.status(200).send(messages);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve messages!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const messageId = new ObjectId(req.params.messageId);
        try {
            const message = await Message.findByIdAndDelete(messageId);
            if (!message) {
                res.status(404).send('Message not found!');
            } else {
                res.status(200).send('Message deleted!');
            }
        } catch (err) {
            res.status(500).send('Failed to delete message!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};
