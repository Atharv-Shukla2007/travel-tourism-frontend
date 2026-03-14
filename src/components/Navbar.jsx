import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import { Home, Globe, Languages, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/explore", label: "ExploreSphere", icon: Globe },
    { to: "/translator", label: "Translator", icon: Languages },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass-nav border-b border-border/50">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Link to="/home" className="text-lg font-semibold tracking-tight text-foreground">
          Heritage<span className="text-accent">&</span>Horizon
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive(link.to) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <button onClick={signOut} className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-150">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden glass-nav border-b border-border/50 animate-fade-in">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.to) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}>
                <link.icon className="w-4 h-4" />{link.label}
              </Link>
            ))}
            <button onClick={() => { signOut(); setMobileOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary">
              <LogOut className="w-4 h-4" />Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
