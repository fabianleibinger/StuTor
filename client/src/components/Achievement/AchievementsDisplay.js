import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { useQuery } from "react-query";
import { getAchievementsOfUser } from "../../api/Achievement";

/**
 * Displays the achievements of a user in form of badges.
 * The badges are clickable and show a tooltip with the name and description of the achievement.
 * To be used in the profile page and on studysession details page.
 * @param {Object} user The user whose achievements should be displayed
 * @param {number} size The size of the avatar
 * @param {boolean} showTitle Whether to show the title of the achievement
 */
const AchievementsDisplay = ({ user, size = 100, showTitle = false }) => {
  const [userAchievements, setUserAchievements] = useState([]);

  const { receivedUserAchievements } = useQuery(
    ["receivedUserAchievements", user._id],
    () => getAchievementsOfUser(user._id),
    {
      onSuccess: (data) => {
        setUserAchievements(data.reverse());
      },
      retry: (failureCount, error) => {
        return error.status !== 404 && failureCount < 2;
      },
    }
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        justifyContent: "left",
        maxWidth: "100%",
      }}
    >
      {userAchievements.length === 0 ? (
        <div>This tutor has not earned any cool badges yet!</div>
      ) : (
        userAchievements.map((userAchievement, index) => (
          <Box
            key={userAchievement._id} // Add a unique key prop here
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              margin: "8px", // Add margin here to create the gap between each userAchievement
            }}
          >
            <Tooltip
              title={
                <React.Fragment>
                  {userAchievement.achievement?.name + ":"}
                  <br />
                  {userAchievement.achievement?.description}
                </React.Fragment>
              }
              placement="top"
              followCursor
            >
              <Avatar
                sx={{
                  width: size,
                  height: size,
                  marginBottom: 1,
                  marginTop: 1,
                }}
              >
                <img
                  src={userAchievement.achievement?.badge}
                  alt="Badge"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </Avatar>
            </Tooltip>
            {showTitle && <div>{userAchievement.achievement?.name}</div>}
          </Box>
        ))
      )}
    </Box>
  );
};

export default AchievementsDisplay;
