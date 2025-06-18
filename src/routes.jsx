import React from "react";
import { useRoutes } from "react-router-dom";
// Importacion del componente dashboarPage
import { DashboardPage } from "./components/pages/dashboardpage";


import { Login } from "./components/pages/auth";
import { Ayuda } from "./components/navs/Ayuda";
import { QuienesSomos } from "./components/navs/QuienesSomos";

// Importacion del componente de rutas protegidas
import { Content } from "./components/protectedRoutes";
import { element } from "prop-types";

export const routes = [
    {path: '/login', element: <Login/>},
    {path: '/dashboard', element: <DashboardPage/>},
    {path: '/*', element: <Content/>},
    {path: '/ayuda', element: <Ayuda/>},
    {path: '/quienes-somos', element: <QuienesSomos/>},
]