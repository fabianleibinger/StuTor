import axios from "axios";
const BASE_URL = "/api";
const PAYMENT_URL = `${BASE_URL}/payment`;

export const createAccountCall = async (userId) => {
  const response = await axios.post(`${PAYMENT_URL}/createAccount/${userId}`);
  return response.data.url;
};

export const getPaymentInfo = async (userId) => {
  try {
    const response = await axios.get(`${PAYMENT_URL}/account/${userId}`);
    return response.data;
  } catch (error) {
    // Case that payment info cannot be found 
    if (error.response?.status == 400) {
      return [];
    }
    // In other cases, do not catch error
    throw error;
  }
};

export const createPayment = async (studentId, price, studysession, hours) => {
  const response = await axios.post(`${PAYMENT_URL}/createPayment`, {
    studentId: studentId,
    price: price,
    studysession: studysession,
    hours: hours,
  });
  return response.data.url;
};

export const updateAccountCall = async (userId) => {
  const response = await axios.put(`${PAYMENT_URL}/updateAccount/${userId}`);
  return response.data.url;
};

export const deleteAccountCall = async (userId) => {
  const response = await axios.delete(`${PAYMENT_URL}/deleteAccount/${userId}`);
  return response.data;
};
