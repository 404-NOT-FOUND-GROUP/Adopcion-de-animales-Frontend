import { useEffect, useState } from "react";
import { getAllPets } from "../../services/api.jsx";

export const usePets = (pageSize = 5) => {
  const [allPets, setAllPets] = useState([]);
  const [paginatedPets, setPaginatedPets] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Traer todos los pets una vez
  const fetchPets = async () => {
    try {
      const response = await getAllPets();
      if (response && response.pets) {
        const simplified = response.pets.map(pet => ({
          image: pet.image,
          name: pet.name,
          age: pet.age,
        }));
        setAllPets(simplified);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar la página visible
  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedPets(allPets.slice(startIndex, endIndex));
  }, [allPets, page, pageSize]);

  useEffect(() => {
    fetchPets();
  }, []);

  // Funciones para cambiar de página
  const nextPage = () => {
    if (page * pageSize < allPets.length) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return { paginatedPets, loading, error, nextPage, prevPage, page, totalPages: Math.ceil(allPets.length / pageSize) };
};
