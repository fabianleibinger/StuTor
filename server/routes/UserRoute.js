import express from "express";
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
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/byId/:userId", getUser);
router.get("/byUsername/:username", getUserByUsername);
router.get("/ofUniversity/:universityId", getUsersOfUniversity);
router.get("/thatAchieved/:achievementId", getUsersThatAchieved);
router.get("/ofStudysession/:studysessionId", getUsersOfStudysession);
router.put("/updateUser/:userId", updateUser);
router.put("/changePassword", changePassword);
router.delete("/deleteUser/:userId", verifyToken, deleteUser);

export default router;
