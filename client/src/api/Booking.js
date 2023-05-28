import axios from 'axios'
const BASE_URL ='http://localhost:3001/api'
const BOOKING_URL = `${BASE_URL}/booking`

export const createBooking = async (body) => {
  const response = await axios.post(`${BOOKING_URL}`, body)
  return response.data
}

export const getBookingsOfStudysession = async (studySessionId) => {
  const response = await axios.get(`${BOOKING_URL}/ofStudysession/${studySessionId}`)
  return response.data
}

export const getBookingsCreatedByUser = async (userId) => {
  const response = await axios.get(`${BOOKING_URL}/createdBy/${userId}`)
  return response.data
}

export const getBookingsOfStudysessionCreatedByUser = async (studySessionId, userId) => {
  const response = await axios.get(`${BOOKING_URL}/ofStudysession/${studySessionId}/createdBy/${userId}`)
  return response.data
}

export const updateBooking = async (bookingId, body) => { 
  const response = await axios.put(`${BOOKING_URL}/${bookingId}`, body)
  return response.data
}

export const deleteBooking = async (bookingId) => {
  const response = await axios.delete(`${BOOKING_URL}/${bookingId}`)
  return response.data
}

