import express from "express";
import {
  createAchievement,
  getAchievements,
  getAchievement,
  getUserAchievementsOfUser,
  updateAchievement,
  deleteAchievement,
} from "../controllers/AchievementController.js";

const router = express.Router();

router.post("/", createAchievement);
router.get("/", getAchievements);
router.get("/id/:achievementId", getAchievement);
router.get("/ofUser/:userId", getUserAchievementsOfUser);
router.put("/:achievementId", updateAchievement);
router.delete("/:achievementId", deleteAchievement);

export default router;
