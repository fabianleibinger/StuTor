import React from "react";
import { LinearProgress, Typography } from "@mui/material";

const TutorHourProgressBar = ({ hoursTutored }) => {
  // Define the level milestones and corresponding level names
  const levelMilestones = [0, 2, 5, 10, 15, 20, 50, 100, 200, 500];
  //   const levelNames = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Determine the current level based on the user's tutoring hours
  const currentLevel =
    levelMilestones.findIndex((milestone) => hoursTutored < milestone) - 1;

  // Calculate the progress percentage
  const progress = Math.min(
    (hoursTutored / levelMilestones[currentLevel + 1]) * 100,
    100
  );

  return (
    <div style={{ position: "relative" }}>
      {/* Display the user's tutoring hours */}
      <Typography variant="h6" fontWeight="bold">
        {hoursTutored} Hours Tutored
      </Typography>

      {/* Display the golden marker at the current progress */}
      <div
        style={{
          position: "absolute",
          left: `${progress}%`,
          top: "27px", // Adjust the value as needed to position the marker above the progress bar
          height: "30px",
          width: "13px",
          background: "gold", // Change the color of the marker as desired (here, goldenrod)
          zIndex: 2, // Ensure the marker is placed above the progress bar and other elements
          transform: "translateX(-50%)",
        }}
      ></div>

      <Typography
        variant="body1"
        style={{
          position: "absolute",
          left: "0",
          top: "60px", // Adjust the value as needed to move the section down
          transform: "translateX(-50%)",
        }}
      >
        Level: {currentLevel}
        <br />
        {levelMilestones[currentLevel]} hours
      </Typography>
      {/* Display next level on the right side of the progress bar */}
      <Typography
        variant="body1"
        style={{
          position: "absolute",
          right: "0",
          top: "60px", // Adjust the value as needed to move the section down
          transform: "translateX(50%)",
        }}
      >
        Level: {currentLevel + 1}
        <br />
        {levelMilestones[currentLevel + 1]} hours
      </Typography>
      {/* Display the progress bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 20, // Set the height to make the progress bar thicker
          borderRadius: "10px", // Set the border radius to make the ends rounded
          overflow: "hidden", // Hide any overflowing content within the progress bar
        }}
      />
    </div>
  );
};

export default TutorHourProgressBar;
