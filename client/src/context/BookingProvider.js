import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [bookingNotification, setBookingNotification] = useState([]);

  return (
    <BookingContext.Provider
      value={{
        bookingNotification,
        setBookingNotification,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = () => {
  return useContext(BookingContext);
};

export { BookingProvider, useBookingContext };
