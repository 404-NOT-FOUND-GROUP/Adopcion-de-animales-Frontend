import { useState } from "react";
import { register } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await register(formData);
      if (res?.error) {
        const msg = res.e?.response?.data?.message || "Error al registrar";
        setError(msg);
        toast.error(msg);
      } else {
        setSuccess(true);
        toast.success("Registro exitoso");
        setTimeout(() => navigate("/login"), 1500);
      }
      return res;
    } catch (err) {
      setError("Error al registrar");
      toast.error("Error al registrar");
      return { error: true };
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error, success };
};