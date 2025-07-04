import { useState } from "react";
import { register as registerRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    setIsLoading(true);
    setSuccess(false);
    setError(null);
    try {
      const result = await registerRequest(data);

      if (result.error) {
        toast.error("Error al registrar el usuario");
        setError("Error al registrar el usuario");
        setSuccess(false);
        return null;
      }

      toast.success("Usuario registrado con éxito");
      setSuccess(true);
      return result.data;
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Error de red");
      setError("Error de red");
      setSuccess(false);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    success,
    error,
  };
};