import React, { useState } from "react";
import { useForgottenPassword } from "../../shared/hooks/useForgottenPassword.jsx";

export const FogottenPassword = () => {
  const [email, setEmail] = useState("");
  const { forgottenPassword, isLoading } = useForgottenPassword();

  const sendResetEmail = async (e) => {
    e.preventDefault();
    const result = await forgottenPassword(email);
    if (result) {
      setEmail("");
    }
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "3rem",
        marginBottom: "3rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        maxWidth: "450px",
      }}
    >
      <div className="row justify-content-center">
        <div style={{ width: "100%" }}>
          <div
            className="card shadow border-0"
            style={{
              borderRadius: "12px",
              border: "2px solid #f72c88",
              boxShadow: "0 8px 20px rgba(247, 44, 136, 0.25)",
              backgroundColor: "#fff",
            }}
          >
            <div
              className="card-header text-white text-center"
              style={{
                backgroundColor: "#f72c88",
                fontSize: "1.6rem",
                fontWeight: "700",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                padding: "1.2rem",
              }}
            >
              Recuperar Contraseña
            </div>
            <div className="card-body" style={{ padding: "2rem" }}>
              <form onSubmit={sendResetEmail}>
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontWeight: "600", color: "#444" }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ejemplo@correo.com"
                    style={{
                      borderRadius: "8px",
                      border: "1.5px solid #f72c88",
                      padding: "0.5rem 1rem",
                      fontSize: "1rem",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#d12173")}
                    onBlur={(e) => (e.target.style.borderColor = "#f72c88")}
                  />
                </div>
                <button
                  className="btn w-100"
                  type="submit"
                  disabled={isLoading}
                  style={{
                    backgroundColor: "#f72c88",
                    color: "#fff",
                    fontWeight: "700",
                    padding: "0.75rem",
                    borderRadius: "10px",
                    fontSize: "1.1rem",
                    boxShadow: "0 4px 12px rgba(247, 44, 136, 0.5)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#d12173")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#f72c88")}
                >
                  {isLoading ? "Enviando..." : "Enviar correo de recuperación"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
