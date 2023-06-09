import express from 'express';
import {
  createUser,
  getUser,
  getUsersOfUniversity,
  getUsersThatAchieved,
  getUsersOfStudysession,
  updateUser,
  deleteUser
} from '../controllers/UserController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/byId/:userId', getUser);
router.get('/ofUniversity/:universityId', getUsersOfUniversity);
router.get('/thatAchieved/:achievementId', getUsersThatAchieved);
router.get('/ofStudysession/:studysessionId', getUsersOfStudysession);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
