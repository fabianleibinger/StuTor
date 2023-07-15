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

export const getStudySessionbyId = async studysessionId => {
  const response = await axios.get(
    `${STUDYSESSION_URL}/byId/${studysessionId}`
  );
  return response.data;
};

export const deleteStudysession = async studysessionId => {
  const response = await axios.delete(`${STUDYSESSION_URL}/${studysessionId}`);
  return response;
};

export const getStudysessionsTutoredByUser = async userId => {
  const response = await axios.get(`${STUDYSESSION_URL}/tutoredBy/${userId}`);
  return response.data;
};

export const getStudysessionsForCourse = async courseId => {
  const response = await axios.get(`${STUDYSESSION_URL}/forCourse/${courseId}`);
  return response.data;
};

export const getStudysessionFiltered = async (searchTerm, filters) => {
  const { maxPrice, languages, department, rating, user } = filters;
  let url = `${STUDYSESSION_URL}/search?searchTerm=${searchTerm}`;
  let resultSessions = [];
  // optional parameters
  url += `&maxPrice=${maxPrice}`;
  url += `&languages=${languages}`;
  //url += `&department=${department}`;
  url += `&rating=${rating}`;

  try {
    const response = await axios.get(url);
    if (rating !== 0 && rating !== '') {
      const studysessions = await Promise.all(
        response.data.map(async session => {
          const sessionRating = await getAverageRating(session._id);
          return {
            session,
            rating: sessionRating
          };
        })
      );

      const filteredSessions = studysessions.filter(
        session => session.rating > rating
      );

      resultSessions = filteredSessions.map(session => session.session);
    } else {
      resultSessions = response.data;
    }
    if (user) {
      return resultSessions.filter(
        session =>
          session.tutoredBy._id !== user._id &&
          session.tutoredBy.university == user.university
      );
    } else {
      return resultSessions;
    }
  } catch (error) {
    if (error.response) {
      console.log('Response Status:', error.response.status);
    }
    throw error;
  }
};

export const updateStudysession = async newStudySession => {
  console.log('body', newStudySession);
  const response = await axios.put(
    `${STUDYSESSION_URL}/${newStudySession._id}`,
    newStudySession
  );
  return response.data;
};

export const getReviewsForStudySession = async studysessionId => {
  const rating = await axios.get(
    `${STUDYSESSION_URL}/reviews/${studysessionId}`
  );
  return rating.data;
};

export const getAverageRating = async studysessionId => {
  try {
    const rating = await axios.get(
      `${STUDYSESSION_URL}/averageRating/${studysessionId}`
    );
    return rating.data;
  } catch (error) {
    if (error.response.status === 404) {
      return -1;
    } else {
      console.log(error);
    }
  }
};

export const getReviewsOfStudysession = async studysessionId => {
  const reviews = await axios.get(
    `${STUDYSESSION_URL}/reviews/${studysessionId}`
  );
  return reviews.data;
};

export const getReviewsAndRatingOfStudysession = async studysessionId => {
  const reviews = await axios.get(
    `${STUDYSESSION_URL}/reviews/${studysessionId}`
  );
  const rating = await axios.get(
    `${STUDYSESSION_URL}/averageRating/${studysessionId}`
  );
  return { reviews: reviews.data, rating: rating.data };
};
