import { useState } from "react";
import { login as loginRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await loginRequest({ email, password });

      if (result.error) {
        toast.error("Credenciales inválidas");
        return null;
      }

      const { token, user } = result.data;
      localStorage.setItem("token", token);
      sessionStorage.setItem("userDetails", JSON.stringify(user));

      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
      return user;
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Has cerrado sesión con éxito");
  };

  return {
    login,
    logout,
    isLoading,
  };
};
