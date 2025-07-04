import { useState, useEffect } from "react";
import { getUserById } from "../../services/api";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getUserById()
      .then((res) => {
        if (res && !res.error) {
          setUser(res.user);
        } else {
          setError(res?.e || "Error al obtener usuario");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { user, loading, error };
};

export default useCurrentUser;
