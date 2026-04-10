import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  
  

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = (name, role) => {
    const userData = {
      name,
      role,
      loggedIn: true,
      bio: role === "expert" ? "Heritage guide & historian" : "Curious traveler",
      interests: role === "expert"
        ? ["Architecture", "History", "Archaeology"]
        : ["Travel", "Photography", "Culture"],
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // 🔥 IMPORTANT
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
