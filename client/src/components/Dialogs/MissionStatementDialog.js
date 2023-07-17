import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@mui/material";

/**
 * The StuTor Mission Statement Dialog content.
 */
function MissionStatementDialog() {
  return (
    <div>
      <DialogTitle>{"The StuTor Mission Statement"}</DialogTitle>
      <DialogContent>
        <img
          src="https://res.cloudinary.com/daefab1lj/image/upload/v1688829580/anhz4srs4pgrwr5woyav.png"
          alt="Mission Statement"
          style={{ maxWidth: "550px", maxHeight: "550px" }}
        />
        <DialogContentText id="alert-dialog-slide-description">
          "At StuTor, our mission is to foster a culture of collaboration and
          academic excellence among students by providing a platform where they
          can connect, support, and inspire each other in their educational
          journeys. We believe that teamwork truly makes the dream work, and
          through our app, we aim to bring together students who can mutually
          benefit from their diverse knowledge and experiences.
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          Our primary goal is to help students excel in their studies by
          enabling them to find the perfect tutor from their own university or
          become a tutor themselves. We understand the importance of
          personalized learning and the positive impact it can have on
          educational outcomes. By facilitating these connections, we strive to
          create a dynamic and inclusive learning community where students can
          access high-quality academic assistance, exchange ideas, and build
          lasting relationships.
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          Through our app, we aim to revolutionize the way students approach
          their exams, transforming them into confident, empowered learners. We
          are committed to providing a safe, trustworthy, and supportive
          environment for students to collaborate, share knowledge, and unlock
          their full potential.
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          At StuTor, we are passionate about empowering students to reach new
          heights academically and create a brighter future for themselves.
          Together, let's embark on this exciting journey of learning, growth,
          and achievement. Join us today, and let's get studying!"
        </DialogContentText>
      </DialogContent>
    </div>
  );
}

export default MissionStatementDialog;
