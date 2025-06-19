import { useState } from "react";
import { register as registerRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data) => {
    setIsLoading(true);
    try {
      const result = await registerRequest(data);

      if (result.error) {
        toast.error("Error al registrar el usuario");
        return null;
      }

      toast.success("Usuario registrado con éxito");
      return result.data;
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
  };
};
