import axios from 'axios';
import { getCoursesFilteredBySearchString, getCourse } from './Course';
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

export const getStudysessionsTutoredByUser = async userId => {
  const response = await axios.get(`${STUDYSESSION_URL}/tutoredBy/${userId}`);
  return response.data;
};

export const getStudysessionsForCourse = async courseId => {
  const response = await axios.get(`${STUDYSESSION_URL}/forCourse/${courseId}`);
  return response.data;
};

export const getStudysessionFiltered = async (searchTerm, filters) => {
  const { maxPrice, languages, department, rating } = filters;
  let url = `${STUDYSESSION_URL}/search?searchTerm=${searchTerm}`;

  // optional parameters
  url += `&maxPrice=${maxPrice}`;
  url += `&languages=${languages}`;
  url += `&department=${department}`;
  url += `&rating=${rating}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('Response Status:', error.response.status);
      console.log('Response Data:', error.response.data);
    }
    throw error;
  }
};

export const getStudysessionFiltered1 = async (searchTerm, filters) => {
  try {
    // get all courses with the name or external identifier
    const courses = await getCoursesFilteredBySearchString(searchTerm);
    console.log('courses:', courses);
    console.log('filters: ', filters);

    // Array to store all study sessions
    const allStudySessions = [];

    if (courses) {
      for (const c of courses) {
        // get all study sessions for each course
        try {
          const additionalStudySessions = await getStudysessionsForCourse(
            c._id
          );
          allStudySessions.push(...additionalStudySessions);
        } catch (e) {
          console.log(
            'For course with id:',
            c._id,
            'there are no sessions available'
          );
        }
      }

      // Apply filters directly to each study session (e.g., price, languages, department)
      const filteredStudySessions = await Promise.all(
        allStudySessions.map(async studySession => {
          let includeStudySession = true;

          // Filter by price
          if (
            filters.maxPrice !== '' &&
            studySession.pricePerHourEuro > filters.maxPrice
          ) {
            includeStudySession = false;
          }

          // Filter by languages (should include at least one selected language)
          if (
            filters.languages.length > 0 &&
            !studySession.languages.some(language =>
              filters.languages.includes(language)
            )
          ) {
            includeStudySession = false;
          }

          // Filter by department
          if (filters.department !== '') {
            const course = await getCourse(studySession.course);
            if (course.department !== filters.department) {
              includeStudySession = false;
            }
          }

          return includeStudySession ? studySession : null;
        })
      );

      // Remove any null values from the filtered study sessions from the mapping before
      const finalStudySessions = filteredStudySessions.filter(
        studySession => studySession !== null
      );

      // Return filtered study sessions
      return finalStudySessions;
    }
  } catch (error) {
    console.log('Error occurred while filtering study sessions:', error);
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
