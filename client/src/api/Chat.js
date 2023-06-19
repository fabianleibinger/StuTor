import axios from 'axios';
const BASE_URL = '/api';
const CHAT_URL = `${BASE_URL}/chat`;

export const getChatsOfUser = async userId => {
  const response = await axios.get(`${CHAT_URL}/ofUser/${userId}`);
  return response.data;
};
