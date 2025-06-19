import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";  // Asegúrate de importar useNavigate

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  // Usamos el hook useNavigate

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      // Redirige al servidor para la autenticación con Google
      window.location.href = "http://localhost:3000/AdopcionDeAnimales/v1/auth/google";
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Error de red al iniciar sesión con Google");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    googleLogin,
    isLoading,
  };
};

// Al llegar al dashboard con el token en la URL:
const token = new URLSearchParams(window.location.search).get("token");
if (token) {
  sessionStorage.setItem("token", token); // Guardar el token en sessionStorage
}
