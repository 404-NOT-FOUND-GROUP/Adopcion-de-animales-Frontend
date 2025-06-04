import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useVerificaContraseña = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendResetEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/AdopcionDeAnimales/v1/user/restablecer-password",
        { email }
      );
      toast.success("Correo de restablecimiento enviado");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al enviar el correo"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    sendResetEmail,
  };
};