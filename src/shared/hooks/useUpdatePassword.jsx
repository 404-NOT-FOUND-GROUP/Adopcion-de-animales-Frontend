import { useState } from "react";
import { updatePassword as updatePasswordRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = async (data) => {
    setIsLoading(true);
    try {
      const result = await updatePasswordRequest(data);

      if (result.error) {
        toast.error("Error al actualizar la contraseña");
        return null;
      }

      toast.success("Contraseña actualizada con éxito");
      return result.data;
    } catch (err) {
      console.error("Update Password error:", err);
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updatePassword,
    isLoading,
  };
};
