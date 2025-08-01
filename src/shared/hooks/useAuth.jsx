import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userDetails");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem("userDetails");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("storage", checkAuth);
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  return {
    isAdmin: user?.role === "ADMIN_ROLE",
    isUser: user?.role === "USER_ROLE",
    isVet: user?.role === "VET_ROLE",
    user,
  };
};
