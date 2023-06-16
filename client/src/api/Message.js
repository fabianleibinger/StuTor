import axios from 'axios';
const BASE_URL = '/api';
const MESSAGE_URL = `${BASE_URL}/message`;

// TODO: Authentication instead of id param.
export const sendMessage = async (senderId, content, chatId) => {
    const body = {
        "content": content,
        "chatId": chatId
    };
    const response = await axios.post(`${MESSAGE_URL}/${senderId}`, body);
    return response.data;
}

export const getMessage = async (messageId) => {
    const response = await axios.get(`${MESSAGE_URL}/id/${messageId}`);
    return response.data;
}

export const getMessagesOfChat = async (chatId) => {
    const response = await axios.get(`${MESSAGE_URL}/ofChat/${chatId}`);
    return response.data;
}

export const deleteMessage = async (messageId) => {
    const response = await axios.delete(`${MESSAGE_URL}/${messageId}`);
    return response.data;
}