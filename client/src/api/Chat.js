import axios from 'axios';
const BASE_URL = '/api';
const CHAT_URL = `${BASE_URL}/chat`;

export const accessChat = async (users, studysessionId) => {
    const body = {
        "userId": users[1],
        "studysessionId": studysessionId
    };
    const response = await axios.post(`${CHAT_URL}/${users[0]}`, body);
    return response.data;
}

export const getChat = async (chatId) => {
    const response = await axios.get(`${CHAT_URL}/id/${chatId}`);
    return response.data;
}

export const getChatsOfStudysession = async (studysessionId) => {
    const response = await axios.get(`${CHAT_URL}/ofStudysession/${studysessionId}`);
    return response.data;
}

export const getChatsOfUser = async (userId) => {
    const response = await axios.get(`${CHAT_URL}/ofUser/${userId}`);
    return response.data;
}

export const getChatsOfStudysessionAndUser = async (studysessionId, userId) => {
    const response = await axios.get(`${CHAT_URL}/ofStudysession/${studysessionId}/ofUser/${userId}`);
    return response.data;
}

export const updateChat = async (chatId, body) => {
    const response = await axios.put(`${CHAT_URL}/${chatId}`, body);
    return response.data;
}

export const deleteChat = async (chatId) => {
    const response = await axios.delete(`${CHAT_URL}/${chatId}`);
    return response.data;
}