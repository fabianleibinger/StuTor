import axios from 'axios';
const BASE_URL = '/api';
const MESSAGE_URL = `${BASE_URL}/message`;

export const createMessage = async (body) => {
    const response = await axios.post(`${MESSAGE_URL}`, body);
    return response.data;
}

export const getMessage = async (messageId) => {
    const response = await axios.get(`${MESSAGE_URL}/${messageId}`);
    return response.data;
}

export const getMessagesOfChat = async (chatId) => {
    const response = await axios.get(`${MESSAGE_URL}/ofChat/${chatId}`);
    return response.data;
}

export const updateMessage = async (messageId, body) => {
    const response = await axios.put(`${MESSAGE_URL}/${messageId}`, body);
    return response.data;
}