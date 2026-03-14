import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext(undefined);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);

  const createBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `b-${Date.now()}`,
      status: "pending",
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const sendMessage = (bookingId, sender, message) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        bookingId,
        sender,
        message,
        timestamp: Date.now(),
      },
    ]);
  };

  const getBookingMessages = (bookingId) =>
    messages.filter((m) => m.bookingId === bookingId);

  return (
    <BookingContext.Provider
      value={{ bookings, messages, createBooking, updateBookingStatus, sendMessage, getBookingMessages }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};
