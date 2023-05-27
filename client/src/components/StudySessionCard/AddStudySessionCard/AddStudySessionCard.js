import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Delete } from "@mui/icons-material/";

//import studySessionCardStyles from "../StudySessionCardStyles";

export default function AddStudySessionCard({ children }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "35vh",
        mr: 3,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px"
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            PP
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Delete />
          </IconButton>
        }
        title="Here you can offer a new Study Session"
        subheader="click on this card to fill out the required information"
      />
      <CardContent>
        <Box textAlign="center">{children}</Box>
      </CardContent>
    </Card>
  );
}
