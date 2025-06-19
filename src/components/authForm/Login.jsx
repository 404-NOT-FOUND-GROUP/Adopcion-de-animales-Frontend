import React, { useState } from "react";
import { useLogin } from "../../shared/hooks/useLogin";
import { useGoogleLogin } from "../../shared/hooks/useGoogleLogin";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export const Login = ({ switchAuthHandler, onForgotPassword }) => {
  const { login, isLoading: isLoginLoading } = useLogin();
  const { googleLogin, isLoading: isGoogleLoading } = useGoogleLogin();

  const [form, setForm] = useState({
    email: { value: "", isValid: false, showError: false },
    password: { value: "", isValid: false, showError: false },
  });

  const handleChange = (val, field) => {
    setForm((prev) => ({ ...prev, [field]: { ...prev[field], value: val } }));
  };

  const handleBlur = (val, field) => {
    let valid = false;
    switch (field) {
      case "email":
        valid = /\S+@\S+\.\S+/.test(val);
        break;
      case "password":
        valid = val.trim().length >= 8;
        break;
      default:
        valid = true;
    }
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], isValid: valid, showError: !valid },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: form.email.value.trim().toLowerCase(),
      password: form.password.value,
    };

    login(credentials.email, credentials.password);
  };

  const allValid = form.email.isValid && form.password.isValid;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Correo Electrónico
        </label>
        <input
          type="email"
          className={`form-control ${form.email.showError ? "is-invalid" : ""}`}
          id="email"
          value={form.email.value}
          onChange={(e) => handleChange(e.target.value, "email")}
          onBlur={(e) => handleBlur(e.target.value, "email")}
        />
        {form.email.showError && (
          <div className="invalid-feedback">El correo es obligatorio.</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className={`form-control ${form.password.showError ? "is-invalid" : ""}`}
          id="password"
          value={form.password.value}
          onChange={(e) => handleChange(e.target.value, "password")}
          onBlur={(e) => handleBlur(e.target.value, "password")}
        />
        {form.password.showError && (
          <div className="invalid-feedback">La contraseña debe tener al menos 8 caracteres.</div>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className={`btn btn-primary ${isLoginLoading ? "disabled" : ""}`}
          disabled={!allValid || isLoginLoading}
        >
          {isLoginLoading ? "Iniciando..." : "Iniciar Sesión"}
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={onForgotPassword}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <div className="text-center mt-3">
        <p>O inicia sesión con:</p>
        <button
          type="button"
          className={`btn btn-danger ${isGoogleLoading ? "disabled" : ""}`}
          onClick={googleLogin}
        >
          {isGoogleLoading ? "Iniciando con Google..." : "Google"}
        </button>
      </div>

      <div className="text-center mt-3">
        ¿No tienes cuenta?{" "}
        <button type="button" className="btn btn-link" onClick={switchAuthHandler}>
          Regístrate
        </button>
      </div>
    </form>
  );
};

Login.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
};
