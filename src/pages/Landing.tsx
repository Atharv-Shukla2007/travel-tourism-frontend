import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import RoleSelectModal from "@/components/RoleSelectModal";
import { Navigate } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { Globe, Landmark, Calendar, Camera } from "lucide-react";

const slides = [hero1, hero2, hero3];
const taglines = [
  "The past, precisely mapped.",
  "Heritage you can walk through.",
  "Ancient wisdom, modern discovery.",
];

const Landing = () => {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (user?.loggedIn) return <Navigate to="/home" replace />;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[85vh] overflow-hidden">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/20 to-background" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="label-text text-primary-foreground/70 mb-4">Heritage & Horizon</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary-foreground max-w-3xl leading-[1.05]">
            {taglines[current]}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-lg leading-relaxed">
            Discover India's hidden heritage. Connect with local historians and experience monuments like never before.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setShowAuth(true)}
              className="px-8 py-3 rounded-xl text-sm font-medium bg-background text-foreground hover:opacity-90 active:scale-95 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="px-8 py-3 rounded-xl text-sm font-medium bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 active:scale-95 transition-all"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-primary-foreground w-6" : "bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Landmark, title: "Monument Archive", desc: "Explore curated heritage sites with audio guides and 360° views" },
            { icon: Calendar, title: "Cultural Events", desc: "Discover festivals, walks, and workshops across India" },
            { icon: Camera, title: "Monument Scanner", desc: "Point, scan, and learn about any heritage structure instantly" },
            { icon: Globe, title: "Expert Guides", desc: "Book verified local historians for personalized heritage walks" },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-2xl card-shadow p-6 hover:card-shadow-hover transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <f.icon className="w-8 h-8 text-foreground mb-4" />
              <h3 className="text-base font-semibold tracking-tight text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {showAuth && <RoleSelectModal />}
    </div>
  );
};

export default Landing;
