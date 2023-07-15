import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { useUserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import { getAchievementsOfUser } from "../../api/Achievement";

const AchievementsDisplay = ({ user, size=100, showTitle=false }) => {
  const { userAchievements, setUserAchievements } = useUserContext();

  const { receivedUserAchievements } = useQuery(
    ["userAchievements"],
    async () => getAchievementsOfUser(user._id),
    {
      onSuccess: (data) => {
        setUserAchievements(data);
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
        overflow: "auto",
        justifyContent: "center",
      }}
    >
      {userAchievements.map((userAchievement, index) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Tooltip
            title={
              <React.Fragment>
                {userAchievement.achievement.name + ":"}
                <br />
                {userAchievement.achievement.description}
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
              <img src={userAchievement.achievement.badge} />
            </Avatar>
            {showTitle ? <div>{userAchievement.achievement.name}</div> : null}
          </Tooltip>
        </Box>
      ))}
    </Box>
  );
};

export default AchievementsDisplay;
