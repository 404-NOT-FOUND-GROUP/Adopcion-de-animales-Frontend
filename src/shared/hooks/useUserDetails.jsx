import { useState, useEffect } from "react";

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails && storedUserDetails !== "undefined") {
      try {
        const parsed = JSON.parse(storedUserDetails);
        setUserDetails(parsed);
        return;
      } catch (e) {
        setUserDetails(null, e);
      }
    }
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      setUserDetails({ token });
    } else {
      setUserDetails(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    setUserDetails(null);
  };

  return {
    isLogged: Boolean(userDetails?.token),
    role: userDetails?.role,
    token: userDetails?.token,
    logout,
  };
};