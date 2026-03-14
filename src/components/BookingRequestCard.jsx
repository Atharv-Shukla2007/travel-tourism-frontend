import { useBooking } from "@/context/BookingContext.jsx";
import { Check, X, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import ChatBox from "./ChatBox.jsx";

const BookingRequestCard = ({ booking }) => {
  const { updateBookingStatus } = useBooking();
  const [showChat, setShowChat] = useState(false);

  const statusStyles = {
    pending: "bg-amber/20 text-foreground",
    accepted: "bg-emerald/20 text-foreground",
    rejected: "bg-destructive/20 text-foreground",
  };

  return (
    <div className="rounded-2xl card-shadow bg-background p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{booking.userName}</h3>
          <p className="text-sm text-muted-foreground">{booking.location} · {booking.date}</p>
        </div>
        <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg ${statusStyles[booking.status]}`}>
          {booking.status}
        </span>
      </div>
      {booking.status === "pending" && (
        <div className="flex gap-2 mt-3">
          <button onClick={() => { updateBookingStatus(booking.id, "accepted"); toast.success("Booking accepted"); }}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all">
            <Check className="w-4 h-4" />Accept
          </button>
          <button onClick={() => { updateBookingStatus(booking.id, "rejected"); toast.info("Booking rejected"); }}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 active:scale-95 transition-all">
            <X className="w-4 h-4" />Reject
          </button>
        </div>
      )}
      {booking.status === "accepted" && (
        <>
          <button onClick={() => setShowChat(!showChat)}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium bg-accent text-accent-foreground hover:opacity-90 active:scale-95 transition-all">
            <MessageSquare className="w-4 h-4" />{showChat ? "Close Chat" : "Open Chat"}
          </button>
          {showChat && <div className="mt-3 animate-scale-in"><ChatBox bookingId={booking.id} senderRole="expert" /></div>}
        </>
      )}
    </div>
  );
};

export default BookingRequestCard;
