import React, { useState } from "react";
import { useUpdatePassword } from "../../shared/hooks/useUpdatePassword.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const { handleUpdatePassword, isLoading } = useUpdatePassword();

  const actualizarContraseña = async (e) => {
    e.preventDefault();

    if (!resetToken) {
      alert("Token de restablecimiento no encontrado en la URL");
      return;
    }

    const result = await handleUpdatePassword({ resetToken, newPassword });

    if (result) {
      // Redirigir al login después de actualizar
      navigate("/login");
    }
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "4rem",
        marginBottom: "4rem",
        padding: "1rem",
        maxWidth: "450px",
      }}
    >
      <div
        className="card shadow-sm"
        style={{
          borderRadius: "12px",
          border: "1px solid #90d000",
          backgroundColor: "#ffffff",
          boxShadow: "0 6px 15px rgba(144, 208, 0, 0.3)",
        }}
      >
        <div
          className="card-header text-center"
          style={{
            backgroundColor: "#90d000",
            color: "#ffffff",
            fontSize: "1.7rem",
            fontWeight: "700",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            padding: "1.2rem",
          }}
        >
          Actualizar Contraseña
        </div>
        <div className="card-body" style={{ padding: "2rem" }}>
          <form onSubmit={actualizarContraseña}>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="form-label"
                style={{ fontWeight: "600", color: "#555" }}
              >
                Nueva Contraseña
              </label>
              <input
                id="newPassword"
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Escribe tu nueva contraseña"
                style={{
                  borderRadius: "8px",
                  border: "1.5px solid #90d000",
                  padding: "0.6rem 1rem",
                  fontSize: "1rem",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#70b700")}
                onBlur={(e) => (e.target.style.borderColor = "#90d000")}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              disabled={isLoading}
              style={{
                backgroundColor: "#90d000",
                color: "#fff",
                fontWeight: "700",
                padding: "0.75rem",
                borderRadius: "10px",
                fontSize: "1.1rem",
                boxShadow: "0 4px 10px rgba(144, 208, 0, 0.5)",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#70b700")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#90d000")}
            >
              {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
