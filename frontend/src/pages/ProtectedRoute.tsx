import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';


const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();

  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
