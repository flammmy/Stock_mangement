import React, { createContext, useReducer, useEffect } from 'react';
import auth, { initialState } from '../store/accountReducer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate fetching user info or validating token
      const user = { name: 'John Doe', email: 'johndoe@example.com' }; // Replace with API call if needed
      dispatch({ type: 'INITIALIZE', payload: { isLoggedIn: true, user } });
    } else {
      dispatch({ type: 'INITIALIZE', payload: { isLoggedIn: false, user: null } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
