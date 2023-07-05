import BookingTable from "../components/ViewBookings/BookingTable";
import React from "react";
import { useQuery } from "react-query";
import { getBookingsOfTutor } from "../api/Booking";
import getCurrentUser from "../utils/getCurrentUser";

const ViewBookingsPage = () => {
    //const user = getCurrentUser();
    //const userId = user._id;
    const userId = "6468f36705853e6071dfec63"

    const { isLoading, error, data: bookings } = useQuery(["tutorBookings"], () => getBookingsOfTutor(userId));

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    console.log(error)
    console.log(isLoading)
    console.log(bookings);

    return (
        <div>
            <h1>View Bookings</h1>
            <BookingTable>
                bookings={bookings}
            </BookingTable>
            {bookings.map((booking) => (
                <div key={booking._id}>
                    <p>Booking ID: {booking._id}</p>
                    <p>Study Session ID: {booking.studysession.course.name}</p>
                    <p>Created By: {booking.createdBy.firstname} {booking.createdBy.lastname}</p>
                    <p>Hours: {booking.hours}</p>
                    <p>Is Payed: {booking.isPayed}</p>
                    <p>Is Confirmed: {booking.isConfirmed}</p>
                    </div>
            ))}
        </div>
    );

};

export default ViewBookingsPage;