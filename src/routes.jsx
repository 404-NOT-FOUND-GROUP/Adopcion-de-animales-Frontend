import React from 'react';
import { Login } from "./components/authForm/Login";
import { Register } from "./components/authForm/Register"; // ⬅️ Importamos el componente
import { DefaultDashboard } from "./components/dashboard/DefaultDashboard";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { NotFoundPage } from "./pages/notFound";
import { QuienesSomos } from "./pages/quienessomos/QuienesSomos.jsx";
import { PetList } from "./pages/Pets/petList.jsx";
import {PetDetail} from "./pages/Pets/PetDetail.jsx";
import { AddPet } from "./pages/Pets/AddPet.jsx";
import { AdoptPetForm } from "./pages/Forms/AdoptPetForm.jsx";
import { GetOngoingAdoptions } from './pages/Adoptions/GetOngoingAdoptions .jsx';
import { GetCompletedAdoptions } from './pages/Adoptions/GetCompletedAdoptions.jsx';
import { FogottenPassword  } from './components/authForm/ForgottenPassword.jsx';
import { UpdatePassword } from './components/authForm/UpdatePassword.jsx';
import { Navigate } from "react-router-dom";
import UserDetail from "./pages/Users/UserDetail"; // Asegúrate de importar el componente

export const routes = [
  { path: "/", element: <Navigate to="/dashboard" /> },

  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register switchAuthHandler={() => window.location.href = "/login"} />
  },
  {
    path: "/dashboard",
    element: <DefaultDashboard />
  },
  {
    path: "/mascotas",
    element: <PetList />
  },
  {
    path: "/mascotas/:petId",
    element: <PetDetail />
  },
  {
    path: "/mascotas/nueva",
    element: (
      <ProtectedRoute>
        <AddPet />
      </ProtectedRoute>
    )
  },
  {
    path: "/adoptar/:id",
    element: (
      <ProtectedRoute>
        <AdoptPetForm />
      </ProtectedRoute>
    )
  },
  {
    path: "/report/ongoing",
    element: (
      <ProtectedRoute>
        <GetOngoingAdoptions />
      </ProtectedRoute>
    )
  },
  {
    path: "/report/completed",
    element: (
      <ProtectedRoute>
        <GetCompletedAdoptions />
      </ProtectedRoute>
    )
  },
  {
    path: "/quienes-somos",
    element: <QuienesSomos />
  },
  {
    path: "/perfil",
    element: <UserDetail />
  },
  {
    path: "/forgot-password",
    element: <FogottenPassword  />
  },
  {
    path: "/actualiza",
    element: <UpdatePassword />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
];
