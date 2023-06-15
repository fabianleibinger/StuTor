import React from "react";
import { Rating, Button } from "@mui/material";
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
  const { isLoading, error, data } = useQuery(["rating", studySessionId], () =>
    getReviewsAndRatingOfStudysession(studySessionId)
  );
  if (isLoading) return "Loading Rating...";
  if (error) return "An error has occurred!";
  if (data == -1) {
    rating = 0;
    buttonText = "No Reviews yet";
  } else {
    rating = data.rating;
    reviews = data.reviews;
    buttonDisabled = false;
  }

  return (
    <div>
      <StarRating rating={rating} isReadOnly={true} />
      <Button
        variant="outlined"
        onClick={handleOpenDialog}
        disabled={buttonDisabled}
      >
        {buttonText}
      </Button>
      <StudysessionReviewDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        reviews={reviews}
      />
    </div>
  );
};

export default StudysessionRating;
