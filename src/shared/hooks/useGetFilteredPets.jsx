import { useState } from "react";
import { getFilteredPets as getFilteredPetsRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetFilteredPets = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFilteredPets = async (filters) => {
    setIsLoading(true);
    try {
      const result = await getFilteredPetsRequest(filters);

      if (result.error) {
        toast.error("Error al obtener las mascotas filtradas");
        return;
      }

      setPets(result.data);
    } catch (err) {
      console.error("Get Filtered Pets error:", err);
      toast.error("Error de red");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pets,
    getFilteredPets,
    isLoading,
  };
};
