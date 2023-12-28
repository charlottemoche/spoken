import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuthToken } from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const authToken = await getAuthToken();

    console.log('Authentication token:', authToken);

    if (authToken) {
      console.log('User is logged in. Token:', authToken);
      setIsLoggedIn(true);
    } else {
      console.log('User is not logged in.');
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};