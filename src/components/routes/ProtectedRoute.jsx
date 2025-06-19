import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks/useUserDetails';
import { Unauthorized } from '../common/Unauthorized';

/**
 * ProtectedRoute: protege rutas según autenticación y rol.
 * @param {Object} props
 * @param {string[]} props.allowedRoles - Lista de roles permitidos. Si está vacío, permite cualquier usuario autenticado.
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar protegidos.
 */
export const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { isLogged, role } = useUserDetails();
  const [isLoading, setIsLoading] = useState(true);  // Estado para controlar si la verificación está en progreso

  useEffect(() => {
    // Asegúrate de que la información de usuario esté lista antes de hacer la verificación
    if (isLogged !== null) {
      setIsLoading(false);  // Deja de cargar una vez que sabemos si el usuario está logueado
    }
  }, [isLogged]);

  // Si estamos en medio de la verificación, mostramos un loader o similar
  if (isLoading) {
    return <div>Loading...</div>;  // O cualquier componente de carga que prefieras
  }

  if (!isLogged) {
    return <Navigate to="/auth" replace />;  // Redirige a la página de login si no está autenticado
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Unauthorized />;  // Si el rol no es permitido, muestra una página de no autorizado
  }

  return <>{children}</>;  // Si está autenticado y tiene el rol adecuado, muestra los hijos
};
