import { useState } from "react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, BookOpen } from "lucide-react";

const RoleSelectModal = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    signIn(name.trim(), role);
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md mx-4 rounded-2xl bg-background shadow-elevated p-8 animate-scale-in">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground text-center">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>
        <p className="text-sm text-muted-foreground text-center mt-2">
          {isSignUp ? "Join the heritage community" : "Welcome back, explorer"}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label-text">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1.5 w-full px-4 py-3 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-shadow"
              required
            />
          </div>

          <div>
            <label className="label-text">Choose your role</label>
            <div className="mt-1.5 flex p-1 bg-secondary rounded-xl">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  role === "user"
                    ? "bg-background card-shadow text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                Traveler
              </button>
              <button
                type="button"
                onClick={() => setRole("expert")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  role === "expert"
                    ? "bg-background card-shadow text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Expert
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-accent font-medium hover:underline"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RoleSelectModal;
