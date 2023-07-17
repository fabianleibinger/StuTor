import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Grid, Typography } from "@mui/material";
import StarRating from "../Booking/StarRating";
import { getStudysessionsTutoredByUser } from "../../api/StudySession";
import { getReviewsAndRatingOfStudysession } from "../../api/StudySession";
import StudysessionRating from "../Booking/Studysessionrating.js";
import newRequest from "../../utils/newRequest";

const TutorCourseRatings = ({ tutorId }) => {
  const [studySessions, setStudySessions] = useState([]);
  const [ratingSum, setRatingSum] = useState(0.0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchStudySessions = async () => {
      try {
        const studySessionsResponse = await newRequest.get(
          `studysession/tutoredBy/${tutorId}`
        );
        setStudySessions(studySessionsResponse.data);
      } catch (err) {
        if (err.response?.status !== 404) {
          console.error("Error fetching study sessions:", err);
        }
      }
    };

    fetchStudySessions();
  }, [tutorId]);

  useEffect(() => {
    // Log the _id of each study session in studySessions
    let rating_sum = 0.0;
    let total_ratings = 0;

    // Create an array to store all the promises for fetching ratings and reviews
    const promises = studySessions.map(async (studySession) => {
      try {
        const { reviews, rating } = await getReviewsAndRatingOfStudysession(
          studySession._id
        );
        if (reviews) {
          rating_sum += rating * reviews.length;
          total_ratings += reviews.length;
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Error fetching reviews and rating:", error);
        }
      }
    });

    // Use Promise.all to wait for all the promises to resolve
    Promise.all(promises).then(() => {
      setRatingSum(rating_sum);
      setTotalRatings(total_ratings);
    });
  }, [studySessions]);

  return (
    <div>
      {/* Average Rating of all study sessions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "30px",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          style={{ textAlign: "left" }}
        >
          Average Rating of All Study Sessions: &nbsp;
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          style={{ textAlign: "left", color: "#FFD700" }}
        >
          {(ratingSum / totalRatings).toFixed(1)}
        </Typography>
      </div>

      {studySessions.map((studySession) => (
        <div key={studySession._id}>
          <Typography
            variant="h6"
            fontWeight="bold"
            style={{ textAlign: "left" }}
          >
            {studySession.courseName}
          </Typography>
          <StudysessionRating studySessionId={studySession._id} />
        </div>
      ))}
    </div>
  );
};

export default TutorCourseRatings;
