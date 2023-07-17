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
  let reviews = [2];
  let buttonDisabled = true;

  const queryOptions = {
    retry: (failureCount, error) => {
      return error.response?.status !== 404 && failureCount < 2;
    },
  };

  const { isLoading, error, data } = useQuery(
    ["rating", studySessionId],
    () => getReviewsAndRatingOfStudysession(studySessionId),
    queryOptions
  );
  if (isLoading) return <Skeleton variant="text" width={80} height={24} />;
  if (error) {
    rating = 0;
    reviews = [];
    buttonText = "No Reviews yet";
  } else {
    rating = data.rating;
    reviews = data.reviews;
    if (reviews.length > 0) {
      buttonDisabled = false;
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Grid container spacing={2}>
        {/* ----------- Average Rating Number----------- */}
        <Grid item>
          <Typography variant="body1">Average Rating:</Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{ color: "#FFD700" }}
          >
            {rating.toFixed(1)}
          </Typography>
        </Grid>

        {/* ----------- Star Ratings Graphics ----------- */}
        <Grid item>
          <StarRating rating={rating} isReadOnly={true} />
        </Grid>

        {/* ----------- Count Number of Reviews ----------- */}
        <Grid item>
          <Typography variant="body1">{reviews.length} Ratings</Typography>
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
