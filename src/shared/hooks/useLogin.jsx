import { useState } from "react";
import { login as loginRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = (onLoginSuccess) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginRequest({ email: form.email, password: form.password });

      if (result.error) {
        toast.error("Credenciales inválidas");
        setLoading(false);
        return;
      }

      const { userDetails } = result.data;
      const { token, role } = userDetails;
      localStorage.setItem("userDetails", JSON.stringify({ token, role }));

      toast.success("Inicio de sesión exitoso");
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      } else {
        navigate("/DefaultDashboard");
      }
    } catch (err) {
      toast.error("Error de red", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    navigate("/login");
    toast.success("Has cerrado sesión con éxito");
  };

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
    logout,
  };
};