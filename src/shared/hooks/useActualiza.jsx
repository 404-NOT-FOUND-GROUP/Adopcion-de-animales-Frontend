import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export const useActualizaContraseña = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // El resetToken debe venir por location.state o por query param
  const resetToken =
    location.state?.resetToken ||
    new URLSearchParams(window.location.search).get("token");

  const actualizarContraseña = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (!resetToken) {
      toast.error("Token de recuperación no encontrado.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5173/GestionHoteles/v1/user/update-password",
        { resetToken, newPassword }
      );
      toast.success(res.data.message || "Contraseña actualizada con éxito");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al actualizar la contraseña"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newPassword,
    setNewPassword,
    isLoading,
    actualizarContraseña,
  };
};