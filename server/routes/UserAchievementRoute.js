import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {
  createUserAchievement,
  getUserAchievement,
  deleteUserAchievement,
} from "../controllers/UserAchievementController.js";

const router = express.Router();

router.post("/", verifyToken, createUserAchievement);
router.get("/id/:userAchievementId", verifyToken, getUserAchievement);
router.delete("/:userAchievementId", verifyToken, deleteUserAchievement);

export default router;
