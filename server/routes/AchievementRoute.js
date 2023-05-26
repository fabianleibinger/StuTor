import express from 'express';
import { 
    createAchievement, 
    getAchievements, 
    getAchievement,
    getAchievementsOfUser,
    updateAchievement, 
    deleteAchievement 
} from '../controllers/AchievementController.js';

const router = express.Router();

router.post('/', createAchievement);
router.get('/', getAchievements);
router.get('/:achievementId', getAchievement);
router.get('/ofUser/:userId', getAchievementsOfUser);
router.put('/:achievementId', updateAchievement);
router.delete('/:achievementId', deleteAchievement);

export default router;
