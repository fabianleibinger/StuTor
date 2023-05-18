import Express from 'express';
import { deleteUser, getUser } from "../controllers/user.controller.js";

const router = Express.Router();

router.route('/').get(getUser);
router.route('/').delete(deleteUser);

router.get('/test', (req, res) => {
    res.send('Hello World!')});

export default router;