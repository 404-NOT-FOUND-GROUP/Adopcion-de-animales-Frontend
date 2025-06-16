import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes.jsx"; // Asegúrate de que la ruta sea correcta
import {Register} from "../pages/auth/Register.jsx"
import { FogottenPassword } from "../pages/auth/ForgottenPassword.jsx";
import { UpdatePassword } from "../pages/auth/UpdatePassword.jsx";


// Importaciones de los componentes de rutas protegidas y públicas aquí

import { Unauthorized } from "../pages/unauthorized/Unauthorized.jsx";

export const Content = () => {
    return (
        <Routes>
        {/* Rutas públicas */}


        {
        <Route path="/register" element={<Register />} />
        }
        {
        <Route path="/olvido" element={<FogottenPassword/>}/>
        }
        {
        <Route path="/actualiza" element={<UpdatePassword/>}/>
        }

        {/* EJEMPLO DE RUTA PÚBLICA
        <Route path="/register" element={<Register />} />
        */}


        {/* Rutas protegidas solo para ADMIN */}
        
        {/* EJEMPLO DE RUTA PROTEGIDA PARA ADMIN 
            <Route
                path="/pets/updatePet" element={<ProtectedRoutes allowedRoles={["ADMIN_ROLE"]}>
                    <UpdatePet />
                </ProtectedRoutes>
                }
            />
        */}
        
        {/* Rutas protegidas solo para USER y ADMIN*/}

        {/* EJEMPLO DE RUTA PROTEGIDA PARA USER Y ADMIN
            <Route
                path="/adoption/adoptionPet" element={<ProtectedRoutes allowedRoles={["ADMIN_ROLE", "USER_ROLE"]}>
                    <AdoptinPet />
                </ProtectedRoutes>
                }
            />
        */}

        {/* Ruta de acceso no autorizado */}

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Redirección de ruta no válida */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};
