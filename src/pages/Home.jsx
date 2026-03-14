import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { monuments } from "@/data/monuments.js";
import { initialEvents } from "@/data/events.js";
import MonumentCard from "@/components/MonumentCard.jsx";
import EventCard from "@/components/EventCard.jsx";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { ArrowRight } from "lucide-react";

const heroSlides = [hero1, hero2, hero3];

const Home = () => {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const upcomingEvents = initialEvents.filter((e) => e.category !== "past").slice(0, 3);
  const featuredMonuments = monuments.slice(0, 3);

  return (
    <div className="pt-16">
      <div className="relative h-[50vh] overflow-hidden">
        {heroSlides.map((s, i) => (
          <img key={i} src={s} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 to-background" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 pb-8">
            <p className="label-text text-primary-foreground/60 mb-2">Welcome back</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary-foreground">{user?.name || "Explorer"}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="label-text">Trending</p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-1">Featured Monuments</h2>
            </div>
            <Link to="/explore" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">View all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMonuments.map((m) => <MonumentCard key={m.id} monument={m} />)}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="label-text">Upcoming</p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-1">Tourism Events</h2>
            </div>
            <Link to="/explore" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">View all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </section>
        <section>
          <p className="label-text mb-4">Quick Tools</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/explore" className="rounded-2xl card-shadow p-6 hover:card-shadow-hover transition-all group">
              <h3 className="text-base font-semibold text-foreground">Monument Scanner</h3>
              <p className="text-sm text-muted-foreground mt-1">Identify heritage sites instantly</p>
            </Link>
            <Link to="/translator" className="rounded-2xl card-shadow p-6 hover:card-shadow-hover transition-all group">
              <h3 className="text-base font-semibold text-foreground">Language Translator</h3>
              <p className="text-sm text-muted-foreground mt-1">Communicate across cultures</p>
            </Link>
            <Link to="/explore" className="rounded-2xl card-shadow p-6 hover:card-shadow-hover transition-all group">
              <h3 className="text-base font-semibold text-foreground">Book an Expert</h3>
              <p className="text-sm text-muted-foreground mt-1">Connect with local heritage guides</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
