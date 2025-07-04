import React, { useState } from "react";
import { Sidebar } from "../../components/nav/Sidebar";
import { NavBar } from "../../components/nav/NavBar";
import { useNavigate } from "react-router-dom";
import { addPet } from "../../services/api.jsx";
import "../../components/UI/css/sidebar.css";
import "../../components/UI/css/AddPet.css";


// ... imports iguales
export const AddPet = () => {
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    name: "",
    type: "dog",
    age: 0,
    breed: "",
    gender: "male",
    weight: "",
    size: "small",
    color: "",
    exerciseLevel: "low",
    rescueDate: "",
    diseases: [],
    disability: [],
    vaccines: false,
    imageFile: null,
    imagePreview: "",
    status: "AVAILABLE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (name, value) => {
    const arr = value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
    setPetData((prev) => ({ ...prev, [name]: arr }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setPetData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewURL,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!petData.imageFile) {
      setError("La imagen es obligatoria");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      for (const key in petData) {
        if (key === "imageFile" || key === "imagePreview") continue;
        if (Array.isArray(petData[key])) {
          petData[key].forEach((item) => {
            formData.append(`${key}[]`, item);
          });
        } else {
          formData.append(key, petData[key]);
        }
      }

      formData.append("image", petData.imageFile);

      const response = await addPet(formData);

      if (response.error) {
        throw new Error(response.message || "Error al guardar la mascota");
      }

      setSuccess("¡Mascota guardada con éxito!");
      setPetData({
        name: "",
        type: "dog",
        age: 0,
        breed: "",
        gender: "male",
        weight: "",
        size: "small",
        color: "",
        exerciseLevel: "low",
        rescueDate: "",
        diseases: [],
        disability: [],
        vaccines: false,
        imageFile: null,
        imagePreview: "",
        status: "AVAILABLE",
      });

      setTimeout(() => {
        navigate("/mascotas");
      }, 1500);
    } catch (err) {
      setError(err.message || "Error inesperado al guardar la mascota");
    } finally {
      setLoading(false);
    }
  };

  const translateOption = (name, value) => {
    const map = {
      type: {
        dog: "Perro",
        cat: "Gato",
        bird: "Ave",
        fish: "Pez",
        turtle: "Tortuga",
        other: "Otro",
      },
      gender: {
        male: "Macho",
        female: "Hembra",
      },
      size: {
        small: "Pequeño",
        medium: "Mediano",
        large: "Grande",
      },
      exerciseLevel: {
        low: "Bajo",
        mid: "Medio",
        high: "Alto",
      },
      status: {
        AVAILABLE: "Disponible",
        ADOPTED: "Adoptado",
        PENDING: "Pendiente",
      },
    };
    return map[name][value] || value;
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{ flex: 1, display: "flex", marginTop: "180px" }}>
        <Sidebar />
        <div className="container-fluid p-4" style={{ marginLeft: "250px", width: "100%" }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <form onSubmit={handleSubmit} className="bg-light p-5 shadow rounded-4 border border-secondary-subtle">
                <h3 className="text-center mb-4 text-primary fw-bold">Registrar Nueva Mascota</h3>

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                <div className="row g-3">
                  {[{ label: "Nombre", name: "name", type: "text" },
                    { label: "Edad", name: "age", type: "number", col: 4 },
                    { label: "Raza", name: "breed", type: "text", col: 4 },
                    { label: "Peso (kg)", name: "weight", type: "text", col: 6 },
                    { label: "Color", name: "color", type: "text", col: 6 },
                    { label: "Fecha de Rescate", name: "rescueDate", type: "date", col: 6 }]
                    .map(({ label, name, type, col = 6 }) => (
                      <div className={`col-md-${col}`} key={name}>
                        <label className="form-label">{label}</label>
                        <input
                          type={type}
                          name={name}
                          value={petData[name]}
                          onChange={handleChange}
                          className="form-control"
                          required
                          disabled={loading}
                        />
                      </div>
                    ))}

                  {/* Selects en español */}
                  {[{ label: "Tipo", name: "type", options: ["dog", "cat", "bird", "fish", "turtle", "other"] },
                    { label: "Género", name: "gender", options: ["male", "female"] },
                    { label: "Tamaño", name: "size", options: ["small", "medium", "large"] },
                    { label: "Nivel de Ejercicio", name: "exerciseLevel", options: ["low", "mid", "high"] },
                    { label: "Estado", name: "status", options: ["AVAILABLE", "ADOPTED", "PENDING"] }]
                    .map(({ label, name, options }) => (
                      <div className="col-md-6" key={name}>
                        <label className="form-label">{label}</label>
                        <select name={name} value={petData[name]} onChange={handleChange} className="form-select" disabled={loading}>
                          {options.map((opt) => (
                            <option key={opt} value={opt}>{translateOption(name, opt)}</option>
                          ))}
                        </select>
                      </div>
                    ))}

                  {[{ label: "Enfermedades (separadas por coma)", name: "diseases", placeholder: "Ej: parvovirus, rabia" },
                    { label: "Discapacidades (separadas por coma)", name: "disability", placeholder: "Ej: ceguera, cojera" }]
                    .map(({ label, name, placeholder }) => (
                      <div className="col-md-6" key={name}>
                        <label className="form-label">{label}</label>
                        <input
                          type="text"
                          name={name}
                          value={petData[name].join(", ")}
                          onChange={(e) => handleArrayChange(name, e.target.value)}
                          className="form-control"
                          placeholder={placeholder}
                          disabled={loading}
                        />
                      </div>
                    ))}

                  <div className="col-md-12">
                    <label className="form-label">Imagen</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="form-control"
                      onChange={handleImageChange}
                      required={!petData.imageFile}
                      disabled={loading}
                    />
                    {petData.imagePreview && (
                      <div className="mt-3 text-center">
                        <img
                          src={petData.imagePreview}
                          alt="preview"
                          style={{ maxWidth: "300px", borderRadius: "12px" }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-md-12 d-flex align-items-center gap-2 mt-3">
                    <input
                      type="checkbox"
                      name="vaccines"
                      checked={petData.vaccines}
                      onChange={handleChange}
                      id="vaccinesCheck"
                      className="form-check-input"
                      disabled={loading}
                    />
                    <label htmlFor="vaccinesCheck" className="form-check-label">Vacunas completas</label>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-success px-5" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Mascota"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
