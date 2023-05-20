import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/UserController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:userId', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;