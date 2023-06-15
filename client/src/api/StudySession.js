import axios from 'axios';
const BASE_URL = '/api';
const STUDYSESSION_URL = `${BASE_URL}/studysession`;

export const createStudysession = async body => {
  console.log('body', body);
  const response = await axios.post(`${STUDYSESSION_URL}`, body);
  return response.data;
};

export const getStudysessions = async () => {
  const response = await axios.get(`${STUDYSESSION_URL}`);
  return response.data;
};

export const getStudySessionbyId = async (studysessionId) => {
  console.log("studysessionId", studysessionId)
  const response = await axios.get(`${STUDYSESSION_URL}/${studysessionId}`);
  console.log("response", response)
  return response.data;
};

export const deleteStudysession = async studysessionId => {
  const response = await axios.delete(`${STUDYSESSION_URL}/${studysessionId}`);
  return response;
};

export const getBookingsTutoredByUser = async userId => {
  const response = await axios.get(`${STUDYSESSION_URL}/tutoredBy/${userId}`);
  return response.data;
};

export const getReviewsForStudySession = async (studysessionId) => {
  const rating = await axios.get(`${STUDYSESSION_URL}/reviews/${studysessionId}`);
  console.log("reviews", rating)
  return rating.data;
  };

export const getAverageRating = async (studysessionId) => {
  try {
  const rating = await axios.get(`${STUDYSESSION_URL}/averageRating/${studysessionId}`);
  return rating.data;
  } catch (error) {
    if (error.response.status === 404) {
      return -1;
    } else {
      console.log(error);
    }
  }
  };

export const getReviewsOfStudysession = async (studysessionId) => {
  const reviews = await axios.get(`${STUDYSESSION_URL}/reviews/${studysessionId}`);
  return reviews.data;
  };

export const getReviewsAndRatingOfStudysession = async (studysessionId) => {
  try {
  const reviews = await axios.get(`${STUDYSESSION_URL}/reviews/${studysessionId}`);
  const rating = await axios.get(`${STUDYSESSION_URL}/averageRating/${studysessionId}`);
  console.log("reviews", reviews)
  console.log("rating", rating)
  return {reviews: reviews.data, rating: rating.data};
} catch (error) {
  if (error.response.status === 404) {
    return -1;
  } else {
    console.log(error);
    throw error;
  }
}
  };