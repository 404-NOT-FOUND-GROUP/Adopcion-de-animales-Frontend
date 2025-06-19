// src/shared/hooks/useUserDetails.js
import { useState, useEffect } from "react";

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Recuperar el token de la URL cuando el usuario se redirige después de iniciar sesión
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      sessionStorage.setItem("token", token); // Guardamos el token en sessionStorage
      setUserDetails({ token });
    } else {
      const storedUserDetails = sessionStorage.getItem("userDetails");
      if (storedUserDetails) {
        setUserDetails(JSON.parse(storedUserDetails));
      }
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("userDetails");
    sessionStorage.removeItem("token");
    setUserDetails(null);
  };

  return {
    isLogged: Boolean(userDetails?.token),
    role: userDetails?.role,
    token: userDetails?.token,
    logout,
  };
};
