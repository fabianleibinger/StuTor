import axios from 'axios';
const BASE_URL = '/api';
const ACHIEVEMENT_URL = `${BASE_URL}/achievement`;

export const getAchievementsOfUser = async (userId) => {
    const response = await axios.get(`${ACHIEVEMENT_URL}/ofUser/${userId}`);
    return response.data;
}