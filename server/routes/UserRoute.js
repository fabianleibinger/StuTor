import Express from 'express';
import { deleteUser, getUser } from '../controllers/UserController.js';

const router = Express.Router();

router.route('/').get(getUser);
router.route('/').delete(deleteUser);

export default router;