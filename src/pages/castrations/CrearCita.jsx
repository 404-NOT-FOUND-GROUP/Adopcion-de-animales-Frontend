import React, { useState } from "react";
import { Sidebar } from "../../components/nav/Sidebar";
import { NavBar } from "../../components/nav/NavBar";
import { useNavigate } from "react-router-dom";
import { useCrearCita } from "../../shared/hooks/useCrearCita";
import { validateEmail, valideEmailMessage } from "../../shared/validators/valideEmail";
import { validateDpi, validateDpiMessage } from "../../shared/validators/ValidateDpi";
import "../../components/UI/css/sidebar.css";

export const CrearCita = () => {
  const navigate = useNavigate();
  const { crearCita, isLoading } = useCrearCita();

  const [formData, setFormData] = useState({
    nombre: "",
    dpi: "",
    correo: "",
    telefono: "",
    direccion: "",
    zona: "",
    municipio: "",
    edad: "",
    sexo: "Masculino",
    etnia: "",
    laboraActualmente: false,
    especieMascota: "",
    nombreMascota: "",
    sexoMascota: "Macho",
    razaMascota: "",
    edadMascota: "",
    procedencia: "",
    observaciones: "",
    imageFile: null,
    imagePreview: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewURL,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.correo)) {
      setError(valideEmailMessage);
      return;
    }

    if (!validateDpi(formData.dpi)) {
      setError(validateDpiMessage);
      return;
    }

    if (!formData.imageFile) {
      setError("La constancia de imagen es obligatoria");
      return;
    }

    setError(null);
    setSuccess(null);

    const { imageFile, imagePreview, ...dataToSend } = formData;

    const result = await crearCita(dataToSend, imageFile);

    if (!result) {
      setError("Error al crear la cita");
      return;
    }

    setSuccess("¡Cita registrada correctamente!");
    setFormData({
      nombre: "",
      dpi: "",
      correo: "",
      telefono: "",
      direccion: "",
      zona: "",
      municipio: "",
      edad: "",
      sexo: "Masculino",
      etnia: "",
      laboraActualmente: false,
      especieMascota: "",
      nombreMascota: "",
      sexoMascota: "Macho",
      razaMascota: "",
      edadMascota: "",
      procedencia: "",
      observaciones: "",
      imageFile: null,
      imagePreview: "",
    });
    setTimeout(() => {
      navigate("/castraciones");
    }, 1500);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{ flex: 1, display: "flex", marginTop: "180px" }}>
        <Sidebar />
        <div className="container-fluid p-4">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <form onSubmit={handleSubmit} className="bg-light p-5 shadow rounded-4 border border-secondary-subtle">
                <h3 className="text-center mb-4 text-primary fw-bold">Registrar Cita de Castración</h3>

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">DPI</label>
                    <input type="text" name="dpi" value={formData.dpi} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Correo</label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Dirección</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Zona</label>
                    <input type="text" name="zona" value={formData.zona} onChange={handleChange} className="form-control" disabled={isLoading} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Municipio</label>
                    <input type="text" name="municipio" value={formData.municipio} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Edad</label>
                    <input type="number" name="edad" value={formData.edad} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Sexo</label>
                    <select name="sexo" value={formData.sexo} onChange={handleChange} className="form-select" required disabled={isLoading}>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Etnia</label>
                    <input type="text" name="etnia" value={formData.etnia} onChange={handleChange} className="form-control" disabled={isLoading} />
                  </div>
                  <div className="col-md-6 d-flex align-items-center gap-2 mt-3">
                    <input type="checkbox" name="laboraActualmente" checked={formData.laboraActualmente} onChange={handleChange} id="laboraActualmenteCheck" className="form-check-input" disabled={isLoading} />
                    <label htmlFor="laboraActualmenteCheck" className="form-check-label">¿Labora actualmente?</label>
                  </div>

                  {/* Datos de la mascota */}
                  <div className="col-md-6">
                    <label className="form-label">Especie de la mascota</label>
                    <input type="text" name="especieMascota" value={formData.especieMascota} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Nombre de la mascota</label>
                    <input type="text" name="nombreMascota" value={formData.nombreMascota} onChange={handleChange} className="form-control" required disabled={isLoading} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Sexo de la mascota</label>
                    <select name="sexoMascota" value={formData.sexoMascota} onChange={handleChange} className="form-select" required disabled={isLoading}>
                      <option value="Macho">Macho</option>
                      <option value="Hembra">Hembra</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Raza de la mascota</label>
                    <input type="text" name="razaMascota" value={formData.razaMascota} onChange={handleChange} className="form-control" disabled={isLoading} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Edad de la mascota</label>
                    <input type="number" name="edadMascota" value={formData.edadMascota} onChange={handleChange} className="form-control" disabled={isLoading} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Procedencia</label>
                    <input type="text" name="procedencia" value={formData.procedencia} onChange={handleChange} className="form-control" disabled={isLoading} />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Observaciones</label>
                    <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} className="form-control" rows={2} disabled={isLoading} />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Constancia (imagen)</label>
                    <input type="file" name="image" accept="image/*" className="form-control" onChange={handleImageChange} required={!formData.imageFile} disabled={isLoading} />
                    {formData.imagePreview && (
                      <div className="mt-3 text-center">
                        <img src={formData.imagePreview} alt="preview" style={{ maxWidth: "300px", borderRadius: "12px" }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-12 col-md-15 mb-3">
                    <button
                      type="submit"
                      className="btn btn-submit w-100"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registrando..." : "Registrar Cita"}
                    </button>
                  </div>
                  <div className="col-12 col-md-14">
                    <button
                      type="button"
                      className="btn btn-cancel w-100"
                      onClick={() => navigate("/dashboard")}
                    >
                      ← Regresar al Inicio
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};