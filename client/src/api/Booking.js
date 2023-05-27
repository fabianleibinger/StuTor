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