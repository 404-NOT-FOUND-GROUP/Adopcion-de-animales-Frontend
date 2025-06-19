import { useState } from "react";
import { createForm as createFormRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createForm = async (petId, data) => {
    setIsLoading(true);
    try {
      const result = await createFormRequest(petId, data);

      if (result.error) {
        toast.error("Error al crear el formulario");
        return null;
      }

      toast.success("Formulario creado con éxito");
      return result.data;
    } catch (err) {
      console.error("Create Form error:", err);
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createForm,
    isLoading,
  };
};
