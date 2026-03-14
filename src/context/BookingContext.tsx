import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Booking {
  id: string;
  userName: string;
  expertId: string;
  expertName: string;
  location: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  sender: "user" | "expert";
  message: string;
  timestamp: number;
}

interface BookingContextType {
  bookings: Booking[];
  messages: ChatMessage[];
  createBooking: (booking: Omit<Booking, "id" | "status">) => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  sendMessage: (bookingId: string, sender: "user" | "expert", message: string) => void;
  getBookingMessages: (bookingId: string) => ChatMessage[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const createBooking = (booking: Omit<Booking, "id" | "status">) => {
    const newBooking: Booking = {
      ...booking,
      id: `b-${Date.now()}`,
      status: "pending",
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const sendMessage = (bookingId: string, sender: "user" | "expert", message: string) => {
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

  const getBookingMessages = (bookingId: string) =>
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
