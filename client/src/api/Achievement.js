import newRequest from "../utils/newRequest";
const ACHIEVEMENT_URL = `/achievement`;

export const getAchievementsOfUser = async (userId) => {
  try {
    const response = await newRequest.get(
      `${ACHIEVEMENT_URL}/ofUser/${userId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
  return [];
};
