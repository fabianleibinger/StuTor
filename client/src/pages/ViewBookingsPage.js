import BookingTable from "../components/ViewBookings/BookingTable";
import React from "react";
import { useQuery } from "react-query";
import { getBookingsOfTutor } from "../api/Booking";
import getCurrentUser from "../utils/getCurrentUser";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const ViewBookingsPage = () => {
    //const user = getCurrentUser();
    //const userId = user._id;
    const userId = "6468f36705853e6071dfec63"

    const { isLoading, error, data } = useQuery(["tutorBookings"], () => getBookingsOfTutor(userId));

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    console.log(error)
    console.log(isLoading)
    console.log(data.bookings);

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