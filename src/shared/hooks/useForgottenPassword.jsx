import { useState } from "react";
import { forgottenPassword as forgottenPasswordRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useForgottenPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const forgottenPassword = async (email) => {
    setIsLoading(true);
    try {
      const result = await forgottenPasswordRequest({ email });

      if (result.error) {
        toast.error("Error al enviar el correo de restablecimiento");
        return null;
      }

      toast.success("Correo de restablecimiento enviado con éxito");
      return result.data;
    } catch (err) {
      console.error("Forgotten Password error:", err);
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    forgottenPassword,
    isLoading,
  };
};
