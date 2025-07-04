import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks/useUserDetails';
import { Unauthorized } from '../common/Unauthorized';

export const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { isLogged, role } = useUserDetails();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLogged !== null) {
      setIsLoading(false);
    }
  }, [isLogged]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLogged) {
    return <Navigate to="/login" replace />; // <--- aquí el cambio
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Unauthorized />;
  }

  return <>{children}</>;
};