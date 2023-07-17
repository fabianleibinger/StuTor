import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Avatar, Button, Tab } from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Rating from "@mui/material/Rating";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { acceptBooking as acceptBookingCall } from "../../api/Booking.js";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";

export default function BookingTable(data) {
  console.log("data: ", data);
  const bookings = data.children[1].bookings;
  const reviews = data.children[1].reviews;
  const bookingsWithReviews = bookings.map((booking) =>
    matchData(booking, reviews)
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Studysession</TableCell>
            <TableCell>Student</TableCell>
            <TableCell>Booking date</TableCell>
            <TableCell>Number of hours</TableCell>
            <TableCell>Is confirmed by student</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Do you want to accept this booking?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingsWithReviews.map(
            (booking) =>
              booking.isPayed && <Row key={booking._id} row={booking} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB");
  return formattedDate;
};

const matchData = (booking, reviews) => {
  const review = reviews.find((review) => review.booking === booking._id);
  let newBooking = booking;
  if (review) {
    newBooking.rating = review.rating;
    newBooking.feedback = review.feedback;
    return newBooking;
  } else {
    return booking;
  }
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  // Create an instance of the queryClient
  const queryClient = useQueryClient();

  const feedbackstyles = {
    container: {
      backgroundColor: "#f5f5f5",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    rating: {
      marginBottom: "8px",
    },
  };

  const acceptBooking = useMutation(
    (bookingId) => acceptBookingCall(bookingId),
    {
      onSuccess: () => {
        row.isAcceptedByTutor = true;
        queryClient.invalidateQueries(["bookings", row.studysession._id]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleAccept = async (bookingId) => {
    try {
      await acceptBooking.mutateAsync(bookingId);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.studysession.courseName}
        </TableCell>
        <TableCell>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar src={row.createdBy.picture} />
            </Grid>
            <Grid item>
              <span>
                {row.createdBy.firstname} {row.createdBy.lastname}
              </span>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>{formatDate(row.createdAt)}</TableCell>
        <TableCell>{row.hours}</TableCell>
        <TableCell>
          {row.isConfirmed && <CheckCircleIcon style={{ color: "green" }} />}
          {!row.isConfirmed && <CancelIcon style={{ color: "red" }} />}
        </TableCell>
        <TableCell>
          <Rating name="read-only" value={row.rating} readOnly />
        </TableCell>
        <TableCell>
          {!row.isAcceptedByTutor && (
            <Tooltip title="Confirm that you want to teach the booked sessions">
              <IconButton
                aria-label="accept booking"
                onClick={() => handleAccept(row._id)}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
          {row.isAcceptedByTutor && (
            <Typography>You already accepted this booking!</Typography>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.feedback !== undefined && (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  paddingBottom={"2rem"}
                >
                  <Box justifyContent={"flex-start"} paddingRight={"1rem"}>
                    <Avatar alt="Profile Picture" src={row.createdBy.picture} />
                  </Box>
                  <Box flexDirection={"column"}>
                    <Rating value={row.rating} precision={0.5} readOnly />
                    <Typography
                      variant="body2"
                      paddingLeft={"0.25rem"}
                      color={"gray"}
                    >
                      {row.hours} hour{row.hours === 1 ? "" : "s"} booked on{" "}
                      {formatDate(row.createdAt)}
                    </Typography>
                    <Typography variant="body1" paddingLeft={"0.25rem"}>
                      {row.feedback}
                    </Typography>
                  </Box>
                </Box>
              )}
              {row.feedback === undefined && (
                <Alert severity="info">
                  Your student did not give you any feedback yet. Check back
                  later!
                </Alert>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/**Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};**/

function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Student</TableCell>
            <TableCell align="right">Booking date</TableCell>
            <TableCell align="right">Is confirmed by student</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Need help?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
