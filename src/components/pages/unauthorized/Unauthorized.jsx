import React from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css";

export const Unauthorized = () => (
  <div className="unauthorized-wrapper">
    <div className="unauthorized-content">
import "./Unauthorized.css"; // Asegúrate de tener un archivo CSS para estilos personalizados

export const Unauthorized = () => (
  <div className="container text-center mt-5">
        <h1 className="text-danger">ACCESO DENEGADO🚫</h1>
        <p>¡¡¡Esta sección es solo para usuarios autorizados 🔒!!!</p>
        <Link to="/dashboard" className="btn btn-secondary">Volver al inicio 🏠</Link>
        <Link to="/" className="btn btn-secondary" style={{marginLeft: "10px"}}>Iniciar Sesion 🪪</Link>
        </div>
  </div>

    </div>
);
