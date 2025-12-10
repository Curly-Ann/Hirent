import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage immediately to prevent logout on refresh
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [user, setUser] = useState(storedUser ? (() => {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error("Error parsing user data:", e);
      return null;
    }
  })() : null);
  const [token, setToken] = useState(storedToken);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(true);

  // Fetch counts when logged in
  useEffect(() => {
    if (isLoggedIn && token) {
      const fetchCounts = async () => {
        try {
          const [wishRes, collRes] = await Promise.all([
            fetch("http://localhost:5000/api/wishlist/count", {
              headers: { "Authorization": `Bearer ${token}` }
            }),
            fetch("http://localhost:5000/api/collection/count", {
              headers: { "Authorization": `Bearer ${token}` }
            })
          ]);

          const wishData = await wishRes.json();
          const collData = await collRes.json();

          setWishlistCount(wishData.count || 0);
          setCollectionCount(collData.count || 0);
        } catch (error) {
          console.error("Error fetching counts:", error);
        }
      };

      fetchCounts();
    }
  }, [isLoggedIn, token]);

  const updateWishlistCount = (count) => {
    setWishlistCount(count);
  };

  const updateCollectionCount = (count) => {
    setCollectionCount(count);
  };

  const login = (token, userData = null) => {
    localStorage.setItem("token", token);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("fakeToken");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setWishlistCount(0);
    setCollectionCount(0);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  
  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      token,
      user,
      updateUser,
      wishlistCount,
      collectionCount,
      updateWishlistCount,
      updateCollectionCount,
      isInitialized
    }}>
      {children}
    </AuthContext.Provider>
  );
};

