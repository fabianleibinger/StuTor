import express from 'express';

import {
    accessChat,
    getChat,
    getChatsOfStudysession,
    getChatsOfUser,
    getChatsOfStudysessionAndUser,
    updateChat,
    deleteChat
} from '../controllers/ChatController.js';

const router = express.Router();

// TODO: Authentication instead of id param.
router.post('/:userId', accessChat);
router.get('/id/:chatId', getChat);
router.get('/ofStudysession/:studysessionId', getChatsOfStudysession);
router.get('/ofUser/:userId', getChatsOfUser);
router.get('/ofStudysession/:studysessionId/ofUser/:userId', getChatsOfStudysessionAndUser);
router.put('/:chatId', updateChat);
router.delete('/:chatId', deleteChat);

export default router;