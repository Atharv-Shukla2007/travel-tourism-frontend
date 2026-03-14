import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import BookingRequestCard from "@/components/BookingRequestCard";
import ChatBox from "@/components/ChatBox";
import { User, LogOut, MapPin, Heart, Calendar, TrendingUp, Clock, Award } from "lucide-react";
import { monuments } from "@/data/monuments";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOut, updateProfile } = useAuth();
  const { bookings } = useBooking();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editBio, setEditBio] = useState(user?.bio || "");

  if (!user) return null;

  const myBookings = user.role === "expert"
    ? bookings.filter((b) => b.expertName.includes(user.name.split(" ")[0]) || true)
    : bookings.filter((b) => b.userName === user.name);

  const acceptedBookings = myBookings.filter((b) => b.status === "accepted");
  const savedMonuments = monuments.slice(0, 3);

  const handleSaveProfile = () => {
    updateProfile({ name: editName, bio: editBio });
    setEditing(false);
  };

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  // Expert stats
  const expertStats = {
    revenue: "₹45,000",
    days: 24,
    tours: acceptedBookings.length || 12,
  };

  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Profile Header */}
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground focus:outline-none"
                />
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground focus:outline-none resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={handleSaveProfile} className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all">Save</button>
                  <button onClick={() => setEditing(false)} className="px-4 py-2 rounded-xl text-sm font-medium bg-secondary text-foreground">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{user.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {user.interests.map((i) => (
                    <span key={i} className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{i}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => { setEditName(user.name); setEditBio(user.bio); setEditing(true); }} className="px-4 py-2 rounded-xl text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                    Edit Profile
                  </button>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Expert Stats */}
        {user.role === "expert" && (
          <section>
            <p className="label-text mb-4">Expert Dashboard</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl card-shadow p-5">
                <TrendingUp className="w-5 h-5 text-muted-foreground mb-2" />
                <p className="label-text">Revenue Earned</p>
                <p className="text-2xl font-semibold tabular-nums text-foreground mt-1">{expertStats.revenue}</p>
              </div>
              <div className="rounded-2xl card-shadow p-5">
                <Clock className="w-5 h-5 text-muted-foreground mb-2" />
                <p className="label-text">Days Contributed</p>
                <p className="text-2xl font-semibold tabular-nums text-foreground mt-1">{expertStats.days}</p>
              </div>
              <div className="rounded-2xl card-shadow p-5">
                <Award className="w-5 h-5 text-muted-foreground mb-2" />
                <p className="label-text">Tours Completed</p>
                <p className="text-2xl font-semibold tabular-nums text-foreground mt-1">{expertStats.tours}</p>
              </div>
            </div>
          </section>
        )}

        {/* Booking Requests (Expert) */}
        {user.role === "expert" && myBookings.length > 0 && (
          <section>
            <p className="label-text mb-4">Booking Requests</p>
            <div className="space-y-4">
              {myBookings.map((b) => (
                <BookingRequestCard key={b.id} booking={b} />
              ))}
            </div>
          </section>
        )}

        {/* User Bookings with Chat */}
        {user.role === "user" && acceptedBookings.length > 0 && (
          <section>
            <p className="label-text mb-4">Active Bookings</p>
            <div className="space-y-4">
              {acceptedBookings.map((b) => (
                <div key={b.id} className="rounded-2xl card-shadow bg-background p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{b.expertName}</h3>
                      <p className="text-sm text-muted-foreground">{b.location} · {b.date}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg bg-emerald/20 text-foreground">Active</span>
                  </div>
                  <ChatBox bookingId={b.id} senderRole="user" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Saved Monuments */}
        <section>
          <p className="label-text mb-4">
            <Heart className="w-3.5 h-3.5 inline mr-1" />
            Saved Monuments
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedMonuments.map((m) => (
              <div key={m.id} className="rounded-2xl card-shadow p-4 flex items-center gap-3">
                <img src={m.image} alt={m.name} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trip History */}
        <section>
          <p className="label-text mb-4">
            <Calendar className="w-3.5 h-3.5 inline mr-1" />
            Trip History
          </p>
          <div className="space-y-3">
            {[
              { place: "Amber Fort, Jaipur", date: "Feb 2026" },
              { place: "Hampi Ruins, Karnataka", date: "Jan 2026" },
              { place: "Qutub Minar, Delhi", date: "Dec 2025" },
            ].map((trip, i) => (
              <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl bg-secondary">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{trip.place}</span>
                </div>
                <span className="text-sm tabular-nums text-muted-foreground">{trip.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
