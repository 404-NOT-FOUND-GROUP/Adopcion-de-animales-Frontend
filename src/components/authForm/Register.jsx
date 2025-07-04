import React, { useState, useEffect } from "react";
import { useRegister } from "../../shared/hooks/useRegister";
import { validateEmail, valideEmailMessage } from "../../shared/validators/valideEmail";
import { validatePassword, validatePasswordMessage } from "../../shared/validators/validatePassword";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, success } = useRegister();

  const [form, setForm] = useState({
    nombre: { value: '', isValid: false, showError: false },
    email: { value: '', isValid: false, showError: false },
    password: { value: '', isValid: false, showError: false },
    passwordConf: { value: '', isValid: false, showError: false },
    foto: { value: null, isValid: true, showError: false },
    role: { value: 'USER_ROLE', isValid: true, showError: false }
  });

  const validators = {
    nombre: (val) => val.trim().length >= 2,
    email: validateEmail,
    password: validatePassword,
    passwordConf: (val) => form.password.value === val && validatePassword(val)
  };

  const messages = {
    nombre: "El nombre debe tener al menos 2 caracteres.",
    email: valideEmailMessage,
    password: validatePasswordMessage,
    passwordConf: "Las contraseñas no coinciden o no cumplen los requisitos."
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const val = files ? files[0] : value;
    const isValid = validators[name] ? validators[name](val) : true;
    setForm((prev) => ({
      ...prev,
      [name]: {
        value: val,
        isValid,
        showError: prev[name].showError
      }
    }));

    if (name === "password" || name === "passwordConf") {
      setForm((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          isValid: validators.password(prev.password.value),
        },
        passwordConf: {
          ...prev.passwordConf,
          isValid: validators.passwordConf(prev.passwordConf.value),
        }
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        showError: !prev[name].isValid
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedForm = {};
    let allValid = true;

    Object.keys(form).forEach((field) => {
      const isValid = validators[field] ? validators[field](form[field].value) : true;
      updatedForm[field] = {
        ...form[field],
        isValid,
        showError: !isValid
      };
      if (!isValid) allValid = false;
    });

    setForm(updatedForm);
    if (!allValid) return;

    const data = new FormData();
    data.append("nombre", form.nombre.value);
    data.append("email", form.email.value);
    data.append("password", form.password.value);
    if (form.foto.value) data.append("foto", form.foto.value);
    data.append("role", form.role.value);

    register(data);
  };

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div
      className="table-responsive"
      style={{
        marginTop: "75px",
        paddingBottom: "2rem",
        minHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "10px" }}>
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5" style={{ minWidth: "340px", maxWidth: "400px", margin: "0 auto" }}>
            <div className="card shadow border-0">
              <div className="card-header text-white text-center" style={{ background: "#17486b", fontSize: "1.5rem", fontWeight: "bold" }}>
                Registro de Usuario
              </div>
              <div className="card-body">
                {showSuccess ? (
                  <div className="alert alert-success text-center" role="alert">
                    ¡Registro exitoso! Redirigiendo al inicio de sesión...
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        name="nombre"
                        className={`form-control ${form.nombre.showError ? "is-invalid" : ""}`}
                        value={form.nombre.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        autoFocus
                      />
                      {form.nombre.showError && (
                        <div className="invalid-feedback">{messages.nombre}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo electrónico</label>
                      <input
                        name="email"
                        type="email"
                        className={`form-control ${form.email.showError ? "is-invalid" : ""}`}
                        value={form.email.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {form.email.showError && (
                        <div className="invalid-feedback">{messages.email}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        name="password"
                        type="password"
                        className={`form-control ${form.password.showError ? "is-invalid" : ""}`}
                        value={form.password.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {form.password.showError && (
                        <div className="invalid-feedback">{messages.password}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirmar contraseña</label>
                      <input
                        name="passwordConf"
                        type="password"
                        className={`form-control ${form.passwordConf.showError ? "is-invalid" : ""}`}
                        value={form.passwordConf.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {form.passwordConf.showError && (
                        <div className="invalid-feedback">{messages.passwordConf}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Foto de perfil (opcional)</label>
                      <input
                        name="foto"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                      {isLoading ? "Registrando..." : "Registrarse"}
                    </button>
                    {error && (
                      <div className="alert alert-danger mt-3 text-center">
                        {error}
                      </div>
                    )}
                  </form>
                )}
                {!showSuccess && (
                  <div className="text-center mt-3 small">
                    ¿Ya tienes cuenta?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => navigate("/login")}
                    >
                      Iniciar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
