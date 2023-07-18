import axios from "axios";
const BASE_URL = "/api";
const BOOKING_URL = `${BASE_URL}/booking`;

export const createBooking = async (
  studysession,
  hours,
  priceEuro,
  createdBy
) => {
  const body = {
    studysession: studysession,
    hours: hours,
    priceEuro: priceEuro,
    createdBy: createdBy,
  };
  try {
    const response = await axios.post(`${BOOKING_URL}`, body);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptBooking = async (bookingId) => {
  const response = await axios.put(`${BOOKING_URL}/acceptBooking/${bookingId}`);
  return response.data;
};

export const confirmBooking = async (bookingId) => {
  const response = await axios.put(
    `${BOOKING_URL}/confirmBooking/${bookingId}`
  );
  return response.data;
};

export const setBookingIsPayed = async (bookingId) => {
  try {
    await axios.put(`${BOOKING_URL}/payBooking/${bookingId}`);
    return "You successfully booked a study session! Please wait for your tutor to confirm...";
  } catch (error) {
    if (error.response?.status == 400) {
      console.log("Booking has already been payed!");
      return "You didn't pay correctly! Try to book again and make sure you checkout via stripe.";
    } else if (error.response?.status == 404) {
      console.log("Booking not found!");
      return "Something went wrong! Try again.";
    } else {
      return "Error! You didn't pay correctly. Please contact customer support.";
    }
  }
};

export const getBookingsOfStudysession = async (studySessionId) => {
  const response = await axios.get(
    `${BOOKING_URL}/ofStudysession/${studySessionId}`
  );
  return response.data;
};

export const getBookingsOfTutor = async (userId) => {
  const response = await axios.get(`${BOOKING_URL}/bookingsOfTutor/${userId}`);
  return response.data;
};

export const getBookingsCreatedByUser = async (userId) => {
  const response = await axios.get(`${BOOKING_URL}/createdBy/${userId}`);
  return response.data;
};

export const getBookingsOfStudysessionCreatedByUser = async (
  studySessionId,
  userId
) => {
  const response = await axios.get(
    `${BOOKING_URL}/ofStudysession/${studySessionId}/createdBy/${userId}`
  );
  return response.data;
};

export const updateBooking = async (bookingId, body) => {
  const response = await axios.put(`${BOOKING_URL}/${bookingId}`, body);
  return response.data;
};

export const deleteBooking = async (bookingId) => {
  const response = await axios.delete(`${BOOKING_URL}/${bookingId}`);
  return response.data;
};
