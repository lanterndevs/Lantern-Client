import { useState, createContext } from "react";

export const AuthenticationContext = createContext(null);

export function AuthenticationProvider ({ children }) {
  
    const [authToken, setAuthToken] = useState('');

  return (
    <AuthenticationContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthenticationContext.Provider>
  );
};