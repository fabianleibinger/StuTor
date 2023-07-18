import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  accessChat,
  getChat,
  getChatsOfStudysession,
  getChatsOfUser,
  getChatsOfStudysessionAndUser,
  updateChat,
  deleteChat,
} from "../controllers/ChatController.js";

const router = express.Router();

router.post("/:userId", accessChat);
router.get("/id/:chatId", getChat);
router.get("/ofStudysession/:studysessionId", getChatsOfStudysession);
router.get("/ofUser/:userId", getChatsOfUser);
router.get(
  "/ofStudysession/:studysessionId/ofUser/:userId",
  getChatsOfStudysessionAndUser
);
router.put("/:chatId", updateChat);
router.delete("/:chatId", verifyToken, deleteChat);

export default router;
