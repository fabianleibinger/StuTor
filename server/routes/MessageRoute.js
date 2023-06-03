import express from 'express';

import {
    createMessage,
    getMessage,
    getMessagesOfChat,
    deleteMessage
} from '../controllers/MessageController.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/id/:messageId', getMessage);
router.get('/ofChat/:chatId', getMessagesOfChat);
router.delete('/:messageId', deleteMessage);

export default router;