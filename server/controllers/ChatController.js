import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Studysession from "../models/Studysession.js";
import { ObjectId } from "mongodb";

export const accessChat = async (req, res) => {
  try {
    // Check if studysession and user exist.
    var { userId, studysessionId } = req.body;
    studysessionId = new ObjectId(studysessionId);
    const studysession = await Studysession.findById(studysessionId);
    userId = new ObjectId(userId);
    const user = await User.findById(userId);
    if (!studysession || !user) {
      res.status(404).send("Object reference not found!");
      return;
    }
    // Access chat.
    var chat = await Chat.find({
      studysession: studysessionId,
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: req.params.userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("studysession")
      .populate("latest_message");
    chat = await User.populate(chat, {
      path: "latest_message.sender",
      select: "username picture",
    });

    // Create chat if it doesn't exist.
    if (chat.length > 0) {
      res.status(200).send(chat[0]);
    } else {
      var newChat = new Chat({
        studysession: studysessionId,
        users: [userId, req.params.userId],
      });
      try {
        var savedChat = await newChat.save();
        savedChat = await Chat.populate(savedChat, {
          path: "users",
          select: "-password",
        });
        res.status(201).send(savedChat);
      } catch (err) {
        res.status(500).send("Failed to create chat!");
      }
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const getChat = async (req, res) => {
  try {
    const chatId = new ObjectId(req.params.chatId);
    const chat = await Chat.findById(chatId);
    try {
      if (!chat) {
        res.status(404).send("Chat not found!");
      } else {
        res.status(200).send(chat);
      }
    } catch (err) {
      res.status(500).send("Failed to retrieve chat!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const getChatsOfStudysession = async (req, res) => {
  try {
    // Check if studysession exists.
    const studysessionId = new ObjectId(req.params.studysessionId);
    const studysession = await Studysession.findById(studysessionId);
    if (!studysession) {
      res.status(404).send("Object reference not found!");
      return;
    }
    var chats = await Chat.find({ studysession: studysessionId })
      .populate("users", "-password")
      .populate("studysession")
      .populate("latest_message")
      .sort({ updatedAt: -1 });
    chats = await User.populate(chats, {
      path: "latest_message.sender",
      select: "username picture",
    });
    try {
      if (chats.length === 0) {
        res.status(404).send("No chats found!");
        return;
      } else {
        res.status(200).send(chats);
      }
    } catch (err) {
      res.status(500).send("Failed to retrieve chats!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const getChatsOfUser = async (req, res) => {
  try {
    var chats = await Chat.find({
      users: { $elemMatch: { $eq: req.params.userId } },
    })
      .populate("users", "-password")
      .populate("studysession")
      .populate("latest_message")
      .sort({ updatedAt: -1 });
    chats = await User.populate(chats, {
      path: "latest_message.sender",
      select: "username picture",
    });
    chats = await Studysession.populate(chats, {
      path: "studysession.tutoredBy",
      select: "firstname lastname picture",
    });
    try {
      if (chats.length === 0) {
        res.status(404).send("No chats found!");
        return;
      } else {
        res.status(200).send(chats);
      }
    } catch (err) {
      res.status(500).send("Failed to retrieve chats!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
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
      res.status(404).send("Object reference not found!");
      return;
    }
    var chats = await Chat.find({
      studysession: studysessionId,
      users: { $elemMatch: { $eq: userId } },
    })
      .populate("users", "-password")
      .populate("studysession")
      .populate("latest_message")
      .sort({ updatedAt: -1 });
    chats = await User.populate(chats, {
      path: "latest_message.sender",
      select: "username picture",
    });
    try {
      if (chats.length === 0) {
        res.status(404).send("No chats found!");
        return;
      } else {
        res.status(200).send(chats);
      }
    } catch (err) {
      res.status(500).send("Failed to retrieve chats!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const updateChat = async (req, res) => {
  try {
    // Check if studysession and user exist.
    const studysessionId = new ObjectId(req.body.studysession);
    const studysession = await Studysession.findById(studysessionId);
    if (!studysession) {
      res.status(404).send("Object reference not found!");
      return;
    }
    const users = [];
    for (const userId of req.body.users) {
      const userIdObject = new ObjectId(userId);
      const user = await User.findById(userIdObject);
      if (!user) {
        res.status(404).send("Object reference not found!");
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
      const chat = await Chat.findByIdAndUpdate(chatId, {
        studysession: updatedChat.studysession,
        users: updatedChat.users,
        latest_message: updatedChat.latest_message,
        read_by_recipient: updatedChat.read_by_recipient,
      });
      if (!chat) {
        res.status(404).send("Chat not found!");
      } else {
        res.status(200).send(updatedChat);
      }
    } catch (err) {
      res.status(500).send("Failed to update chat!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
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
        res.status(404).send("Chat not found!");
      } else {
        res.status(200).send("Chat deleted!");
      }
    } catch (err) {
      res.status(500).send("Failed to delete chat!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};
