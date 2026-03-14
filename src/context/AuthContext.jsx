import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (name, role) => {
    setUser({
      name,
      role,
      loggedIn: true,
      bio: role === "expert" ? "Heritage guide & historian" : "Curious traveler",
      interests: role === "expert" ? ["Architecture", "History", "Archaeology"] : ["Travel", "Photography", "Culture"],
    });
  };

  const signOut = () => setUser(null);

  const updateProfile = (updates) => {
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
