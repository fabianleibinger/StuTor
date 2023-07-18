import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {
  sendMessage,
  getMessage,
  getMessagesOfChat,
  deleteMessage,
} from "../controllers/MessageController.js";

const router = express.Router();

router.post("/:userId", verifyToken, sendMessage);
router.get("/id/:messageId", verifyToken, getMessage);
router.get("/ofChat/:chatId", verifyToken, getMessagesOfChat);
router.delete("/:messageId", verifyToken, deleteMessage);

export default router;
