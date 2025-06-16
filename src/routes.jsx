import React from "react";
import { useRoutes } from "react-router-dom";
// Importacion del componente dashboarPage
import { DashboardPage } from "./components/pages/dashboardpage";


import { Login } from "./components/pages/auth";
import { Ayuda } from "./components/navs/Ayuda";

// Importacion del componente de rutas protegidas
import { Content } from "./components/protectedRoutes";
import { element } from "prop-types";

export const routes = [
    {path: '/login', element: <Login/>},
    {path: '/dashboard', element: <DashboardPage/>},
    {path: '/*', element: <Content/>},
    {path: '/ayuda', element: <Ayuda/>},
]

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

import { Register } from "./components/Register"
import { Login } from "./components/Login";
import { ContraseñaOlvidada } from "./components/ContraseñaOlvidada"
import { ActualizaContraseña } from "./components/ActualizaContraseña";

export const routes = [
    {path: '/login', element: <Login/>},
    {path: '/register', element: <Register/>},
    {path: '/olvido', element: <ContraseñaOlvidada/>},
    {path: '/actualiza', element: <ActualizaContraseña/>},
    
    
]
