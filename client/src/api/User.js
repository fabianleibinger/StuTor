import axios from 'axios';
const BASE_URL = '/api';
const USER_URL = `${BASE_URL}/user`;

export const getUser = async userId => {
    const response = await axios.get(`${USER_URL}/${userId}`);
    return response.data;
    }

export const updateUser = async newUser => {
    const response = await axios.put(`${USER_URL}/updateUser/${newUser._id}`, newUser);
    return response.data;
}