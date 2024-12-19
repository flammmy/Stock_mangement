import React, { createContext, useReducer } from 'react';
import auth, { initialState } from '../store/accountReducer'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(auth, {
      ...initialState,
      isLoggedIn: !!localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user')) || null,
      
    });
  console.log(state);
    // Save auth state to localStorage whenever it changes
    React.useEffect(() => {
      if (state.isLoggedIn) {
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', state.token || '');
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }, [state]);
  
    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };
  