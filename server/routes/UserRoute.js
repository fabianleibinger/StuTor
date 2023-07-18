import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {
  getUser,
  getUsersOfUniversity,
  getUsersThatAchieved,
  getUsersOfStudysession,
  updateUser,
  changePassword,
  deleteUser,
  getUserByUsername,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/byId/:userId", verifyToken, getUser);
router.get("/byUsername/:username", verifyToken, getUserByUsername);
router.get("/ofUniversity/:universityId", verifyToken, getUsersOfUniversity);
router.get("/thatAchieved/:achievementId", verifyToken, getUsersThatAchieved);
router.get(
  "/ofStudysession/:studysessionId",
  verifyToken,
  getUsersOfStudysession
);
router.put("/updateUser/:userId", verifyToken, updateUser);
router.put("/changePassword", verifyToken, changePassword);
router.delete("/deleteUser/:userId", verifyToken, deleteUser);

export default router;
