import { useState } from "react";
import { updatePassword } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updatePassword(formData);
      if (res?.error) {
        const msg = res.e?.response?.data?.message || "Error al actualizar la contraseña";
        setError(msg);
        toast.error(msg);
      } else {
        setSuccess(true);
        toast.success("Contraseña actualizada exitosamente");
        setTimeout(() => navigate("/login"), 1500);
      }
      return res;
    } catch (err) {
      setError("Error al actualizar la contraseña");
      toast.error("Error al actualizar la contraseña");
      return { error: true };
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdatePassword, loading, error, success };
};