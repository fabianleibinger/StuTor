import newRequest from "../../utils/newRequest";

export const fetchStudySessions = async () => {
  try {
    const response = await newRequest.get("/studysession");
    const studySessions = response.data;

    console.log("Study Sessions: ", studySessions);
    return studySessions;
  } catch (error) {
    console.log("Error fetching study sessions:", error);
    return [];
  }
};

const studySessions = await fetchStudySessions();

const addTutorProfilePic = async () => {
  for (let i = 0; i < studySessions.length; i++) {
    const session = studySessions[i];
    const tutorId = session.tutoredBy;
    const courseId = session.course;
    try {
      const tutorResponse = await newRequest.get("/user/byId/" + tutorId);
      const courseResponse = await newRequest.get("/course/byId/" + courseId);

      session.tutorProfilePic = tutorResponse.data.picture;
      session.tutorName = tutorResponse.data.username;
      session.courseName = courseResponse.data.name;
    } catch (error) {
      console.log("Error fetching tutor:", error);
    }
  }
};

await addTutorProfilePic();

export default studySessions;
