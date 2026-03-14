import { MapPin, Calendar } from "lucide-react";

const EventCard = ({ event }) => {
  const statusColors = {
    ongoing: "bg-emerald text-accent-foreground",
    upcoming: "bg-accent text-accent-foreground",
    past: "bg-secondary text-muted-foreground",
  };

  return (
    <div className="rounded-2xl card-shadow hover:card-shadow-hover transition-all duration-300 bg-background p-5">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg ${statusColors[event.category]}`}>
          {event.category}
        </span>
      </div>
      <h3 className="text-base font-semibold tracking-tight text-foreground mb-2">{event.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{event.description}</p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
      </div>
    </div>
  );
};

export default EventCard;
