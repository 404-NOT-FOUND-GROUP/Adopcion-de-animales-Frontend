import React from "react";
import { useRoutes } from "react-router-dom";
// Importacion del componente dashboarPage
import { DashboardPage } from "./components/pages/dashboardpage";

/*
Importacion del login
import { Login } from "./components/pages/auth";
*/

// Importacion del componente de rutas protegidas
import { Content } from "./components/protectedRoutes";

export const routes = [
    // Ruta para login {path: '/', element: <Login/>},
    {path: '/dashboard/*', element: <DashboardPage/>},
    {path: '/*', element: <Content/>},
    
]
