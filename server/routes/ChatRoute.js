import express from 'express';

import {
    createChat,
    getChat,
    getChatsOfStudysession,
    getChatsOfUser,
    getChatsOfStudysessionAndUser,
    deleteChat
} from '../controllers/ChatController.js';

const router = express.Router();

router.post('/', createChat);
router.get('/:chatId', getChat);
router.get('/ofStudysession/:studysessionId', getChatsOfStudysession);
router.get('/ofUser/:userId', getChatsOfUser);
router.get('/ofStudysession/:studysessionId/ofUser/:userId', getChatsOfStudysessionAndUser);
router.delete('/:chatId', deleteChat);

export default router;