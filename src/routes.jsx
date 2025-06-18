import React from "react";
import { useRoutes } from "react-router-dom";
import { DashboardPage } from "./components/pages/dashboardpage";
import { Login } from "./components/pages/auth";
import { Ayuda } from "./components/navs/Ayuda";
import { QuienesSomos } from "./components/navs/QuienesSomos";
import { Content } from "./components/protectedRoutes";
import { ChatAtencion } from "./components/navs/ChatAtencion.jsx";
import { AllChatsInbox } from "./components/navs/AllChatsInbox.jsx";


// Simulación de IDs (en tu app real, obtén estos datos del usuario autenticado)


export const routes = [
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/ayuda', element: <Ayuda /> },
  { path: '/quienes-somos', element: <QuienesSomos /> },
    { path: '/inbox', element: <AllChatsInbox /> },
  {
    path: '/chat',
    element: (
      <ChatAtencion />
    ),
  },
  { path: '/*', element: <Content /> }
];

// Hook para usar las rutas en tu App principal
export function AppRoutes() {
  return useRoutes(routes);
}