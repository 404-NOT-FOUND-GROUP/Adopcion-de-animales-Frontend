import { useState } from "react";
import { forgottenPassword } from "../../services/api";
import toast from "react-hot-toast";

export const useForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendResetEmail = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!isValidEmail(email)) {
      setError("Email incorrecto");
      toast.error("Email incorrecto");
      setLoading(false);
      return { error: true };
    }

    try {
      const res = await forgottenPassword({ email });
      if (res?.error) {
        let msg = res.e?.response?.data?.message || "Error al enviar el correo";
        if (msg === "Usuario no encontrado") {
          msg = "Email incorrecto";
        }
        setError(msg);
        toast.error(msg);
      } else {
        setSuccess(true);
        toast.success("Correo de restablecimiento enviado");
        setEmail("");
      }
      return res;
    } catch (err) {
      setError("Error al enviar el correo");
      toast.error("Error al enviar el correo");
      return { error: true };
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    error,
    success,
    sendResetEmail,
  };
};