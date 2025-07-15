import { useState } from "react";
import { adoptPetById } from "../../services/api.jsx";

export const useAdoptPet = (petId) => {
  const [form, setForm] = useState({
    fullName: "",
    dpi: "",
    email: "",
    phone: "",
    address: "",
    municipality: "",
    zone: "",
    refSource: "",
    petInterest: "",
    petSize: "",
    currentPets: false,
    housingType: "",
    housingKind: "",
    conditions: {
      hungerFree: false,
      fearFree: false,
      noAbuse: false,
      noPain: false,
      naturalBehavior: false,
    },
    commitments: {
      patience: false,
      qualityOfLife: false,
      familyInvolvement: false,
      timeDedication: false,
    },
    status: "PROGRESS",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("conditions.") || name.startsWith("commitments.")) {
      const [group, field] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [field]: checked,
        },
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e, files) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await adoptPetById(petId, form, files);

      if (response.error) throw response.e;

      setSuccess("¡Solicitud enviada correctamente!");

      // Reiniciar formulario
      setForm({
        fullName: "",
        dpi: "",
        email: "",
        phone: "",
        address: "",
        municipality: "",
        zone: "",
        refSource: "",
        petInterest: "",
        petSize: "",
        currentPets: false,
        housingType: "",
        housingKind: "",
        conditions: {
          hungerFree: false,
          fearFree: false,
          noAbuse: false,
          noPain: false,
          naturalBehavior: false,
        },
        commitments: {
          patience: false,
          qualityOfLife: false,
          familyInvolvement: false,
          timeDedication: false,
        },
        status: "PROGRESS",
      });
    } catch (err) {
      setError("Error al enviar la solicitud.");
      console.error("Formulario error:", err);
    }

    setLoading(false);
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    success,
    error,
  };
};
