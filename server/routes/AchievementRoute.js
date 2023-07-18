import express from "express";
import {
  createAchievement,
  getAchievements,
  getAchievement,
  getUserAchievementsOfUser,
  updateAchievement,
  deleteAchievement,
} from "../controllers/AchievementController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createAchievement);
router.get("/", verifyToken, getAchievements);
router.get("/id/:achievementId", verifyToken, getAchievement);
router.get("/ofUser/:userId", verifyToken, getUserAchievementsOfUser);
router.put("/:achievementId", verifyToken, updateAchievement);
router.delete("/:achievementId", verifyToken, deleteAchievement);

export default router;
