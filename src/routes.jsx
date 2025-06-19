// src/routes.jsx
import React from 'react';
import { AuthPage } from './pages/auth';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { NotFoundPage } from './pages/notFound';
import { ProtectedRoute } from './components/routes/ProtectedRoute';

export const routes = [
  { 
    path: "/Dashboard/*", 
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  },
  { path: "/*", element: <AuthPage /> },
  { path: "*", element: <NotFoundPage /> },
];
