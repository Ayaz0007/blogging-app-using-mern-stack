import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Properly sets user on page load
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // ✅ Updates context state AND localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  // ✅ Clears both
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  // ✅ Now it also updates `user`
  const getLoggedIn = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser); // ✅ crucial update
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
