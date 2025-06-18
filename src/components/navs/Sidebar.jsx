import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useAuth } from "../../shared/hooks"

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const { isAdmin, isUser } = useAuth();
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <button
        className="sidebar-toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        ☰
      </button>

      <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          🐾 <span>Sistema de Adopción</span>
        </div>

        <div className="sidebar-menu">

          <div className="sidebar-section">
            <button
              className="sidebar-title clickable"
              onClick={() => toggleSection("mascotas")}
            >
              <span>🐶 Mascotas</span>
              <span>{openSection === "mascotas" ? "▲" : "▼"}</span>
            </button>
            {openSection === "mascotas" && (
              <div className="sidebar-submenu">
                <div className="sidebar-subitem" onClick={() => goTo("/hotel/CreateHotel")}>
                  Agregar
                </div>
                <div className="sidebar-subitem" onClick={() => goTo("/hotel/GetHotel")}>
                  Listar
                </div>
                <div className="sidebar-subitem" onClick={() => goTo("/hotel/Report")}>
                  Reporte
                </div>
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <button
              className="sidebar-title clickable"
              onClick={() => toggleSection("asociaciones")}
            >
              <span>🏢 Asociaciones</span>
              <span>{openSection === "asociaciones" ? "▲" : "▼"}</span>
            </button>
            {openSection === "asociaciones" && (
              <div className="sidebar-submenu">
                <div className="sidebar-subitem" onClick={() => goTo("/association/Create")}>
                  Agregar
                </div>
                <div className="sidebar-subitem" onClick={() => goTo("/association/List")}>
                  Listar
                </div>
                <div className="sidebar-subitem" onClick={() => goTo("/association/Report")}>
                  Reporte
                </div>
              </div>
            )}
          </div>

          {/* Botón de bandeja de mensajes */}
          <div className="sidebar-section">
            <div
              className="sidebar-title clickable"
              onClick={() => goTo("/inbox")}
            >
              <span>📥 Bandeja de mensajes</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};