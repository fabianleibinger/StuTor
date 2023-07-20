import React from "react";
import { Button, Skeleton, Grid, Typography } from "@mui/material";
import { getReviewsAndRatingOfStudysession } from "../../api/StudySession";
import { useQuery } from "react-query";
import { useState } from "react";
import StudysessionReviewDialog from "./StudysessionReviewDialog";
import StarRating from "./StarRating";

const StudysessionRating = ({ studySessionId }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  let buttonText = "See Reviews";
  let rating = 0;
  let reviews = [];
  let buttonDisabled = true;

  // Limit retries in case there are no reviews yet
  const queryOptions = {
    retry: (failureCount, error) => {
      return error.response?.status !== 404 && failureCount < 2;
    },
  };

  // Load reviews and rating of study session
  const { isLoading, error, data } = useQuery(
    ["rating", studySessionId],
    () => getReviewsAndRatingOfStudysession(studySessionId),
    queryOptions
  );

  if (isLoading) return <Skeleton variant="text" width={80} height={24} />;
  if (error) return "Something went wrong..."
  
  // Set rating and reviews
  rating = data.rating;
  reviews = data.reviews;
  
  // If the reviews array is not empty, enable the button
  if (reviews.length > 0) {
    buttonDisabled = false;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Grid container spacing={2}>
        {/* ----------- Star Ratings Graphics ----------- */}
        <Grid item marginTop={0.75}>
          <StarRating rating={rating} isReadOnly={true}/>
        </Grid>

        {/* ----------- Count Number of Reviews ----------- */}
        <Grid item marginTop={0.75}>
          <Typography variant="body1">({reviews.length})</Typography>
        </Grid>

        {/* ----------- See Reviews Button ----------- */}
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleOpenDialog}
            disabled={buttonDisabled}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
      <StudysessionReviewDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        reviews={reviews}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default StudysessionRating;
