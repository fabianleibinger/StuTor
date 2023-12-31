import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { ObjectId } from "mongodb";

export const sendMessage = async (req, res) => {
  try {
    // Check if chat exists.
    var { chatId, content } = req.body;
    chatId = new ObjectId(chatId);
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).send("Object reference not found!");
      return;
    }
    // Send message.
    const newMessage = {
      chat: chatId,
      sender: req.params.userId,
      content: content,
    };
    try {
      var message = await Message.create(newMessage);
      message = await message.populate(
        "sender",
        "username firstname lastname picture"
      );
      message = await message.populate("chat");
      // Update latest message in chat.
      await Chat.findByIdAndUpdate(chatId, { latest_message: message._id });
      res.status(201).send(message);
    } catch (err) {
      res.status(500).send("Failed to send message!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const getMessage = async (req, res) => {
  try {
    const messageId = new ObjectId(req.params.messageId);
    const message = await Message.findById(messageId);
    try {
      if (!message) {
        res.status(404).send("Message not found!");
      } else {
        res.status(200).send(message);
      }
    } catch (err) {
      res.status(500).send("Failed to retrieve message!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const getMessagesOfChat = async (req, res) => {
  try {
    // Check if chat exists.
    const chatId = new ObjectId(req.params.chatId);
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).send("Object reference not found!");
      return;
    }
    // Get messages of chat.
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "username firstname lastname picture")
      .populate("chat");
    try {
      if (messages.length === 0) {
        res.status(404).send("No messages found!");
      } else {
        res.status(200).send(messages);
      }
    } catch (err) {
      res.status(500).send("Failed to retrieve messages!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const messageId = new ObjectId(req.params.messageId);
    try {
      const message = await Message.findByIdAndDelete(messageId);
      if (!message) {
        res.status(404).send("Message not found!");
      } else {
        res.status(200).send("Message deleted!");
      }
    } catch (err) {
      res.status(500).send("Failed to delete message!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};
