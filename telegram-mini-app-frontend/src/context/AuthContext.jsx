"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "user";

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);

      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to restore user data:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save user
  const setUser = (userData) => {
    if (!userData) return;

    console.log("Saving user:", userData);

    setUserState(userData);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

      console.log(
        "User saved to localStorage:",
        JSON.parse(localStorage.getItem(STORAGE_KEY)),
      );
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  // Clear user
  const clearUser = () => {
    setUserState(null);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear user data:", error);
    }
  };

  const value = {
    user,
    loading,
    setUser,
    clearUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
