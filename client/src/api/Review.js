import axios from 'axios';
const BASE_URL = '/api';
const REVIEW_URL = `${BASE_URL}/review`;

export const createReview = async (booking, rating, feedback) => {
    try {
    const body = {
        "booking": booking,
        "rating": rating,
        "feedback": feedback
    }
    const response = await axios.post(`${REVIEW_URL}`, body);
    return response.data;
    } catch (error) {  
        console.log(error);
    }
    }


