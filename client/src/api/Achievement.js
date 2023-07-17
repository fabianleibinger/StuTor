import newRequest from "../utils/newRequest";
const ACHIEVEMENT_URL = `/achievement`;

export const getAchievementsOfUser = async (userId) => {
  const response = await newRequest.get(`${ACHIEVEMENT_URL}/ofUser/${userId}`);
  return response.data;
};
