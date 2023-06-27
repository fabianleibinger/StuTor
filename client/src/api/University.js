import axios from 'axios';
const BASE_URL = '/api';
const USER_URL = `${BASE_URL}/university`;

export const getUniversity = async (universityId) => {
    const response = await axios.get(`${USER_URL}/${universityId}`);
    return response.data;
    }