import { AuthContext } from 'contexts/authContext';
import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Unauthorised from 'components/Unauthorised';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const {state} = useContext(AuthContext);
  const userRole = state.user.role;

  if(!allowedRoles.includes(userRole)) {
    return <Unauthorised/>
  }

  return children; 
};

export default ProtectedRoute;
