import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../shared/hooks/useRegister";

export const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    foto: null,
  });
  const { handleRegister, loading, error, success } = useRegister();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (form.foto) formData.append("foto", form.foto);

    await handleRegister(formData);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 150);
    }
  }, [success, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow" style={{ maxWidth: 400, width: "100%", borderRadius: 8, padding: 0 }}>
        <div
          className="text-center"
          style={{
            background: "#17486b",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.5rem",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            padding: "12px 0 8px 0",
            letterSpacing: "0.5px",
          }}
        >
          Registro de Usuario
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-group position-relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Contraseña (mínimo 8 caracteres)"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="position-absolute top-50 end-0 translate-middle-y btn btn-link"
                  onClick={togglePasswordVisibility}
                  style={{ zIndex: 1 }}
                  tabIndex={-1}
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="foto" className="form-label">Foto de perfil (opcional)</label>
              <input
                id="foto"
                name="foto"
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
            {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
          </form>
          <div className="text-center mt-3">
            <span>¿Ya tienes cuenta? </span>
            <a href="/login" className="text-primary fw-semibold" style={{ textDecoration: "underline", cursor: "pointer" }}>
              Iniciar sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};