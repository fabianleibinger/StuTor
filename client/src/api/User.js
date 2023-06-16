import axios from 'axios';
const BASE_URL = '/api';
const USER_URL = `${BASE_URL}/user`;

export const getUser = async userId => {
    const response = await axios.get(`${USER_URL}/${userId}`);
    return response.data;
    }
