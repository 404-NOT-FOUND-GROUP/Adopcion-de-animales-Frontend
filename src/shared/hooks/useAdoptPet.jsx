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
    interestedPetName: "",
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
    status: "PROGRESS"
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("conditions.") || name.startsWith("commitments.")) {
      const [group, field] = name.split(".");
      setForm(prev => ({
        ...prev,
        [group]: {
          ...prev[group],
          [field]: checked,
        }
      }));
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await adoptPetById(petId, form);
      setSuccess("¡Solicitud enviada correctamente!");
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
        interestedPetName: "",
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
        status: "PROGRESS"
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
