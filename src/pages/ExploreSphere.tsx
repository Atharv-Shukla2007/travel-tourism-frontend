import { useState } from "react";
import { monuments } from "@/data/monuments";
import { initialEvents, TourEvent } from "@/data/events";
import { experts } from "@/data/experts";
import { useAuth } from "@/context/AuthContext";
import MonumentCard from "@/components/MonumentCard";
import EventCard from "@/components/EventCard";
import ExpertCard from "@/components/ExpertCard";
import Scanner from "@/components/Scanner";
import EventForm from "@/components/EventForm";
import { Search } from "lucide-react";

const ExploreSphere = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");
  const [eventCategory, setEventCategory] = useState("all");
  const [events, setEvents] = useState<TourEvent[]>(initialEvents);

  const types = ["All", ...new Set(monuments.map((m) => m.type))];
  const states = ["All", ...new Set(monuments.map((m) => m.state))];

  const filteredMonuments = monuments.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || m.type === typeFilter;
    const matchState = stateFilter === "All" || m.state === stateFilter;
    return matchSearch && matchType && matchState;
  });

  const filteredEvents = eventCategory === "all" ? events : events.filter((e) => e.category === eventCategory);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        {/* Header */}
        <div>
          <p className="label-text">Discovery</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mt-1">ExploreSphere</h1>
          <p className="text-muted-foreground mt-2 max-w-lg leading-relaxed">
            Your gateway to monuments, events, experts, and heritage tools.
          </p>
        </div>

        {/* Monument Archive */}
        <section>
          <p className="label-text">Archive</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-1 mb-6">Monument Archive</h2>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search monuments..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground focus:outline-none"
            >
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground focus:outline-none"
            >
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMonuments.map((m) => (
              <MonumentCard key={m.id} monument={m} />
            ))}
          </div>
          {filteredMonuments.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">No monuments found. Try adjusting your filters.</p>
          )}
        </section>

        {/* Tourism Events */}
        <section>
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="label-text">Events</p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-1">Tourism Events</h2>
            </div>
          </div>

          {user?.role === "expert" && (
            <div className="mb-6">
              <EventForm onSubmit={(event) => setEvents((prev) => [...prev, event])} />
            </div>
          )}

          <div className="flex gap-2 mb-6">
            {["all", "ongoing", "upcoming", "past"].map((cat) => (
              <button
                key={cat}
                onClick={() => setEventCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  eventCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>

        {/* Scanner */}
        <section>
          <p className="label-text">Tools</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-1 mb-6">Monument Scanner</h2>
          <div className="max-w-xl">
            <Scanner />
          </div>
        </section>

        {/* Experts */}
        <section>
          <p className="label-text">Guides</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-1 mb-6">Local Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts.map((ex) => (
              <ExpertCard key={ex.id} expert={ex} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExploreSphere;
