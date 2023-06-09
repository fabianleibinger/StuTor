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

export const deleteStudysession = async studysessionId => {
  const response = await axios.delete(`${STUDYSESSION_URL}/${studysessionId}`);
  return response;
};

export const getBookingsTutoredByUser = async userId => {
  const response = await axios.get(`${STUDYSESSION_URL}/tutoredBy/${userId}`);
  return response.data;
};
