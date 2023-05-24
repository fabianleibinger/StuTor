import express from 'express';
import { createUser, getUser, getUsersOfUniversity, updateUser, deleteUser } from '../controllers/UserController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:userId', getUser);
router.get('/ofUniversity/:universityId', getUsersOfUniversity);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;