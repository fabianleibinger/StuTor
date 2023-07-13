import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Icon,
  Tooltip,
  Alert,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  confirmBooking as confirmBookingCall,
  getBookingsOfStudysessionCreatedByUser,
} from "../../api/Booking.js";
import ReviewDialog from "./ReviewDialog.js";
import { WidthNormal } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CheckIcon from "@mui/icons-material/Check";
import RecommendIcon from "@mui/icons-material/Recommend";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpIcon from '@mui/icons-material/Help';
import { yellow } from "@mui/material/colors";

const BookingHistoryDialog = ({ open, onClose, userId, studySessionId }) => {
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const {
    isLoading: isloading,
    error: error,
    data: bookings,
    refetch,
  } = useQuery(
    ["bookings", studySessionId],
    () => getBookingsOfStudysessionCreatedByUser(studySessionId, userId),
    {
      retry: (failureCount, error) => {
        return error.response.status !== 404 && failureCount < 2;
      },
    }
  );
  const queryClient = useQueryClient();

  const confirmBooking = useMutation(
    (bookingId) => confirmBookingCall(bookingId),
    {
      onSuccess: () => {
        refetch();
        queryClient.invalidateQueries(["bookings", studySessionId]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleConfirm = async (bookingId) => {
    try {
      await confirmBooking.mutateAsync(bookingId);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGiveReview = (bookingId) => {
    setOpenReviewDialog(true);
    setSelectedBookingId(bookingId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  console.log(bookings);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Bookings</DialogTitle>
        <DialogContent>
          {isloading && <div>Loading...</div>}
          {error && <Alert severity="info">
              You didn't book any hours for this studysession yet.
            </Alert>}
          {!isloading && !error && (
            <div>
              <div style={{ paddingBottom: "1rem" }}>
                <Alert severity="info">
                  Here you can see all your bookings for this studysession and
                  have the possibility to confirm your booking as well as rate
                  your tutor.
                </Alert>
              </div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>Hours</TableCell>
                      <TableCell>Booking date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map(
                      (booking) =>
                        booking.isPayed && (
                          <TableRow
                            key={booking._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              {booking.isPayed && booking.isAcceptedByTutor && !booking.isConfirmed && (
                                <Tooltip title="You didn't confirm that all studysession hours are used yet">
                                <Icon>
                                  <HourglassEmptyIcon sx={{ color: yellow[500] }} />
                                </Icon>
                                </Tooltip>
                              )}
                              {booking.isPayed && !booking.isAcceptedByTutor && (
                                <Tooltip title="Your tutor has not accepted your booking yet">
                                <Icon>
                                  <HelpIcon color="warning" />
                                </Icon>
                                </Tooltip>
                              )}
                              {booking.isConfirmed && booking.reviewGiven && (
                                <Tooltip title="All done! Ready for the next studysession?">
                                <Icon>
                                  <RecommendIcon color="success" />
                                </Icon>
                                </Tooltip>
                              )}
                              {booking.isConfirmed && !booking.reviewGiven && (
                                <Tooltip title="Please rate your tutor!">
                                <Icon>
                                  <CheckIcon color="primary" />
                                </Icon>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell>{booking.hours}</TableCell>
                            <TableCell>
                              {formatDate(booking.createdAt)}
                            </TableCell>
                            <TableCell>
                              {booking.isConfirmed && !booking.reviewGiven && (
                                <Tooltip title="Rate your tutor">
                                  <IconButton
                                    aria-label="give review"
                                    onClick={() =>
                                      handleGiveReview(booking._id)
                                    }
                                  >
                                    <RateReviewIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                              {booking.isPayed && !booking.isConfirmed && (
                                <Tooltip title="Confirm that studysession took place">
                                  <IconButton
                                    aria-label="confirm booking"
                                    onClick={() => handleConfirm(booking._id)}
                                    disabled={!booking.isAcceptedByTutor}
                                  >
                                    <CheckIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {selectedBookingId && (
        <ReviewDialog
          open={openReviewDialog}
          onClose={() => setOpenReviewDialog(false)}
          bookingId={selectedBookingId}
        />
      )}
    </>
  );
};

export default BookingHistoryDialog;
