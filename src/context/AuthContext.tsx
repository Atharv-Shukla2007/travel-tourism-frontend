import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "user" | "expert";

export interface AuthUser {
  name: string;
  role: UserRole;
  loggedIn: boolean;
  bio: string;
  interests: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  signIn: (name: string, role: UserRole) => void;
  signOut: () => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signIn = (name: string, role: UserRole) => {
    setUser({
      name,
      role,
      loggedIn: true,
      bio: role === "expert" ? "Heritage guide & historian" : "Curious traveler",
      interests: role === "expert" ? ["Architecture", "History", "Archaeology"] : ["Travel", "Photography", "Culture"],
    });
  };

  const signOut = () => setUser(null);

  const updateProfile = (updates: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
