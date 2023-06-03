import express from 'express';
import { createUserAchievement, getUserAchievement, deleteUserAchievement } from '../controllers/UserAchievementController.js';

const router = express.Router();

router.post('/', createUserAchievement);
router.get('/id/:userAchievementId', getUserAchievement);
router.delete('/:userAchievementId', deleteUserAchievement);

export default router;