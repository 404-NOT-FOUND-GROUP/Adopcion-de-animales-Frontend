import { useState } from "react";
import { addPet as addPetRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useAddPet = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addPet = async (data) => {
    setIsLoading(true);
    try {
      const result = await addPetRequest(data);

      if (result.error) {
        toast.error("Error al agregar la mascota");
        return null;
      }

      toast.success("Mascota agregada con éxito");
      return result.data;
    } catch (err) {
      console.error("Add Pet error:", err);
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addPet,
    isLoading,
  };
};
