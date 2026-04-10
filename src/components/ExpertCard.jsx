import { Star, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import { useBooking } from "@/context/BookingContext.jsx";
import { toast } from "sonner";

const ExpertCard = ({ expert }) => {
  const { user } = useAuth();
  const { createBooking, bookings } = useBooking();

  const alreadyBooked = bookings.some(
    (b) => b.expertId === expert._id && b.userName === user?.name
  );

  const handleBook = () => {
    if (!user) return;
    createBooking({
      userName: user.name,
      expertId: expert._id,
      expertName: expert.name,
      location: expert.location,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long"
      }),
    });
    toast.success(`Booking request sent to ${expert.name}`);
  };

  return (
    <div className="rounded-2xl card-shadow hover:card-shadow-hover transition-all duration-300 bg-background p-5">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-lg font-semibold text-foreground">
            {expert.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background ${expert.isAvailable ? "bg-emerald" : "bg-muted-foreground"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-foreground">{expert.name}</h3>
          <p className="text-sm text-muted-foreground">{expert.specialization}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{expert.location}</span>
        <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber" />{expert.rating}</span>
        <span className="tabular-nums">{expert.toursCompleted} tours</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {expert.languages.map((lang) => (
          <span key={lang} className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{lang}</span>
        ))}
      </div>
      {user?.role === "traveller" && (
        <div className="mt-4 flex gap-2">
          <button onClick={handleBook} disabled={alreadyBooked || !expert.isAvailable}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            {alreadyBooked ? "Request Sent" : !expert.isAvailable ? "Offline":"Book Expert"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpertCard;
