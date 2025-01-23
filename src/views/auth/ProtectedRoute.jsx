// import { AuthContext } from 'contexts/authContext';
// import React, { useState, useEffect, useContext } from 'react';
// import Unauthorised from 'components/Unauthorised';
// import Signin1 from './signin/SignIn1';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const {state} = useContext(AuthContext);
//   const { isLoggedIn, user } = state;
//   console.log(isLoggedIn)

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }
  
//   const userRole = state.user.role;
//   if(!allowedRoles.includes(userRole)) {
//     return <Unauthorised/>
//   }

//   return children; 
// };

// export default ProtectedRoute;


import { AuthContext } from 'contexts/authContext';
import React, { useContext } from 'react';
import Unauthorised from 'components/Unauthorised';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { state } = useContext(AuthContext);
  const { isLoggedIn, user } = state;

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, but the role is not in allowedRoles, show the Unauthorized page
  const userRole = user ? user.role : null;
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Unauthorised />;
  }

  // If all checks pass, render the children (protected content)
  return children; 
};

export default ProtectedRoute;
