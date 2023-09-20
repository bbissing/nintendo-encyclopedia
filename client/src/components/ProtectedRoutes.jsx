import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {
  if (typeof props.userId !== 'number') {
    return <Navigate to="/" replace/>
  }

  return <Outlet />;
};

export default ProtectedRoute;