import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import Studysession from "../models/Studysession.js";
import User from "../models/User.js";
import { ObjectId } from "mongodb";

export const createChat = async (req, res) => {
    try {
        // Check if studysession exists.
        const studysessionId = new ObjectId(req.body.studysession);
        const studysession = await Studysession.findById(studysessionId);
        if (!studysession) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Check if users exist.
        const users = [];
        for (const userId of req.body.users) {
            const userIdObject = new ObjectId(userId);
            const user = await User.findById(userIdObject);
            if (!user) {
                res.status(404).send('Object reference not found!');
                return;
            }
            users.push(user);
        }
        // Create chat.
        const newChat = new Chat({
            studysession: studysessionId,
            users: users,
        });
        try {
            const savedChat = await newChat.save();
            res.status(201).send(savedChat);
        } catch (err) {
            res.status(500).send('Failed to create chat!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getChat = async (req, res) => {
    try {
        const chatId = new ObjectId(req.params.chatId);
        const chat = await Chat.findById(chatId);
        try {
            if (!chat) {
                res.status(404).send('Chat not found!');
            } else {
                res.status(200).send(chat);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve chat!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getChatsOfStudysession = async (req, res) => {
    try {
        // Check if studysession exists.
        const studysessionId = new ObjectId(req.params.studysessionId);
        const studysession = await Studysession.findById(studysessionId);
        if (!studysession) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const chats = await Chat.find({ studysession: studysessionId });
        try {
            if (chats.length === 0) {
                res.status(404).send('No chats found!');
                return;
            } else {
                res.status(200).send(chats);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve chats!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getChatsOfUser = async (req, res) => {
    try {
        // Check if user exists.
        const userId = new ObjectId(req.params.userId);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } });
        try {
            if (chats.length === 0) {
                res.status(404).send('No chats found!');
                return;
            } else {
                res.status(200).send(chats);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve chats!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getChatsOfStudysessionAndUser = async (req, res) => {
    try {
        // Check if studysession and user exist.
        const studysessionId = new ObjectId(req.params.studysessionId);
        const studysession = await Studysession.findById(studysessionId);
        const userId = new ObjectId(req.params.userId);
        const user = await User.findById(userId);
        if (!studysession || !user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const chats = await Chat.find(
            {
                studysession: studysessionId,
                users: { $elemMatch: { $eq: userId } }
            });
        try {
            if (chats.length === 0) {
                res.status(404).send('No chats found!');
                return;
            } else {
                res.status(200).send(chats);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve chats!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const updateChat = async (req, res) => {
    try {
        // Check if studysession and user exist.
        const studysessionId = new ObjectId(req.body.studysession);
        const studysession = await Studysession.findById(studysessionId);
        if (!studysession) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const users = [];
        for (const userId of req.body.users) {
            const userIdObject = new ObjectId(userId);
            const user = await User.findById(userIdObject);
            if (!user) {
                res.status(404).send('Object reference not found!');
                return;
            }
            users.push(user);
        }
        // Update chat.
        const chatId = new ObjectId(req.params.chatId);
        const updatedChat = new Chat({
            studysession: studysessionId,
            users: users,
            latest_message: req.body.latest_message,
            read_by_recipient: req.body.read_by_recipient,
        });
        try {
            const chat = await Chat.findByIdAndUpdate(chatId,
                {
                    studysession: updatedChat.studysession,
                    users: updatedChat.users,
                    latest_message: updatedChat.latest_message,
                    read_by_recipient: updatedChat.read_by_recipient,
                });
            if (!chat) {
                res.status(404).send('Chat not found!');
            } else {
                res.status(200).send(updatedChat);
            }
        } catch (err) {
            res.status(500).send('Failed to update chat!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const deleteChat = async (req, res) => {
    try {
        const chatId = new ObjectId(req.params.chatId);
        try {
            const chat = await Chat.findByIdAndDelete(chatId);
            // Delete messages of this chat.
            await Message.deleteMany({ chat: chatId });
            if (!chat) {
                res.status(404).send('Chat not found!');
            } else {
                res.status(200).send('Chat deleted!');
            }
        } catch (err) {
            res.status(500).send('Failed to delete chat!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};
