import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {
  if (typeof props.userId !== 'number') {
    console.log('this is a test');
    return <Navigate to="/" replace/>
  }

  return <Outlet />;
};

export default ProtectedRoute;