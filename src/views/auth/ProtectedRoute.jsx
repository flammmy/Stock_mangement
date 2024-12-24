import { AuthContext } from 'contexts/authContext';
import React, { useState, useEffect, useContext } from 'react';
import Unauthorised from 'components/Unauthorised';
import Signin1 from './signin/SignIn1';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const {state} = useContext(AuthContext);
  const { isLoggedIn, user } = state;
  console.log(isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  const userRole = state.user.role;
  if(!allowedRoles.includes(userRole)) {
    return <Unauthorised/>
  }

  return children; 
};

export default ProtectedRoute;
