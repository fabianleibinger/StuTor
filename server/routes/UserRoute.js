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

router.get("/byId/:userId", getUser);
router.get("/byUsername/:username", getUserByUsername);
router.get("/ofUniversity/:universityId", getUsersOfUniversity);
router.get("/thatAchieved/:achievementId", getUsersThatAchieved);
router.get("/ofStudysession/:studysessionId", getUsersOfStudysession);
router.put("/updateUser/:userId", updateUser);
router.put("/changePassword", changePassword);
router.delete("/deleteUser/:userId", deleteUser);

export default router;
