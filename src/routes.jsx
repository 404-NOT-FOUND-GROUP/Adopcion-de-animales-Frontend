<<<<<<< HEAD
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
=======
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
>>>>>>> 2_Diseño_Login_Register
