import { useState, useEffect } from "react";
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
        setPets([]);
        return;
      }

      // Siempre aseguramos que pets sea un array
      setPets(result.pets || []);
    } catch (err) {
      console.error("Get Filtered Pets error:", err);
      toast.error("Error de red");
      setPets([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilteredPets({});
  }, []);

  return {
    pets,
    getFilteredPets,
    isLoading,
  };
};
