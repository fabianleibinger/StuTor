import BookingTable from "../components/ViewBookings/BookingTable";
import React from "react";
import { useQuery } from "react-query";
import { getBookingsOfTutor } from "../api/Booking";
import getCurrentUser from "../utils/getCurrentUser";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { LoadingIndicator } from "../components/General/LoadingIndicator";
import { ErrorIndicator } from "../components/General/ErrorIndicator";

const ViewBookingsPage = () => {
    const user = getCurrentUser();
    const userId = user._id;

    const { isLoading, error, data } = useQuery(["tutorBookings"], () => getBookingsOfTutor(userId), {
        retry: 2,
    });

    const CenteredErrorGif = () => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <div>
            <Typography variant="h4" component="h4" gutterBottom>
                You don't have any bookings yet! 
            </Typography>
            <iframe src="https://giphy.com/embed/ltIFdjNAasOwVvKhvx" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            </div>
          </Box>

        );
      };

    if (isLoading) return <LoadingIndicator/>;
    if (error) {
        if (error.response.status === 404) {
            return <CenteredErrorGif/>;
        } else {
        return <ErrorIndicator/>;
        }
    }

    return (
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch',
        width: '97vw',
        mx: 'auto',
        marginTop: '2vh',
        marginBottom: '1vh',
      }}
    >
        <Typography variant="h4" component="h4" gutterBottom>
            Check out your bookings!
        </Typography>
            <BookingTable>
                data={data}
            </BookingTable>
        </Box>
    );

};

export default ViewBookingsPage;
