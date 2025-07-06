import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true); // Ahora inicia colapsada
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const goTo = (path) => {
    navigate(path);
    setCollapsed(true); // Opcional: cerrar sidebar al navegar
  };

  return (
    <>
      {/* Botón siempre visible, encima de la sidebar */}
      <button
        className="sidebar-toggle-btn"
        style={{
          zIndex: 2100,
          position: "fixed",
          // Si la sidebar está abierta, el botón se pone encima de ella
          left: collapsed ? 7 : 'calc(80vw - 45px)', // Ajusta según el ancho de tu sidebar en móvil
          transition: "left 0.3s"
        }}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Abrir menú lateral" : "Cerrar menú lateral"}
      >
        {collapsed ? "☰" : "✖"}
      </button>

      <div className={`sidebar-container${collapsed ? " collapsed" : ""}`}>
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
                <div
                  className="sidebar-subitem"
                  onClick={() => goTo("/mascotas/nueva")}
                >
                  Agregar
                </div>
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <button
              className="sidebar-title clickable"
              onClick={() => toggleSection("solicitudes")}
            >
              <span>📄 Solicitudes de Adopción</span>
              <span>{openSection === "solicitudes" ? "▲" : "▼"}</span>
            </button>
            {openSection === "solicitudes" && (
              <div className="sidebar-submenu">
                <div
                  className="sidebar-subitem"
                  onClick={() => goTo("/report/ongoing")}
                >
                  Solicitudes Recientes
                </div>
                <div
                  className="sidebar-subitem"
                  onClick={() => goTo("/report/completed")}
                >
                  Solicitudes Finalizadas
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
