import express from 'express';

import {
    sendMessage,
    getMessage,
    getMessagesOfChat,
    deleteMessage
} from '../controllers/MessageController.js';

const router = express.Router();

// TODO: Authentication instead of id param.
router.post('/:userId', sendMessage);
router.get('/id/:messageId', getMessage);
router.get('/ofChat/:chatId', getMessagesOfChat);
router.delete('/:messageId', deleteMessage);

export default router;