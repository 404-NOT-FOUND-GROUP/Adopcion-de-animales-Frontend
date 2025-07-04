import { useState } from "react";
import { adoptPetById  } from "../../services/api.jsx";

export const useAdoptPet = (petId) => {
  const [form, setForm] = useState({
    fullName: "",
    dpi: "",
    email: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log("Datos enviados al backend:", {
  fullName: form.fullName,
  dpi: form.dpi,
  email: form.email,
  phone: form.phone,
  address: form.address
});

    try {
      await adoptPetById (petId, form);
      setSuccess("Â¡Solicitud enviada correctamente!");
      setForm({
        fullName: "",
        dpi: "",
        email: "",
        phone: "",
        address: ""
            });
    } catch (err) {
      setError("Error al enviar la solicitud.", err);
    }
    setLoading(false);
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    success,
    error
  };
};