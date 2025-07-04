import { useState, useEffect } from "react";
import { getAllPets as getAllPetsRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useGetAllPets = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllPets = async () => {
    setIsLoading(true);
    try {
      const result = await getAllPetsRequest();

      if (!result.success) {
        toast.error("Error al obtener las mascotas");
        return;
      }

      setPets(result.pets || []);
    } catch (err) {
      console.error("Get All Pets error:", err);
      toast.error("Error de red");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPets();
  }, []);

  return {
    pets,
    isLoading,
  };
};
