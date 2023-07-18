import axios from "axios";
const BASE_URL = "/api";
const COURSE_URL = `${BASE_URL}/course`;

export const getCoursesFilteredBySearchString = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${COURSE_URL}/search?searchTerm=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Response Status:", error.response?.status);
      console.log("Response Data:", error.response.data);
    }
    throw error;
  }
};

export const getCourses = async () => {
  const response = await axios.get(`${COURSE_URL}`);
  return response.data;
};

export const getCourse = async (courseId) => {
  const response = await axios.get(`${COURSE_URL}/byId/${courseId}`);
  return response.data;
};
