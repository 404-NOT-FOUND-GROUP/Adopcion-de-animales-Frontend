// src/components/Layout/Content.jsx
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { DefaultDashboard } from './DefaultDashboard';
import { ProtectedRoute } from '../routes/ProtectedRoute';



export const Content = () => (
  <main className="content-container flex-grow-1 p-4">
    <Routes>

      {/* Default Dashboard */}
      <Route
        path=""
        element={
          <ProtectedRoute>
            <DefaultDashboard />
          </ProtectedRoute>
        }
      />

   

    </Routes>
  </main>
);
