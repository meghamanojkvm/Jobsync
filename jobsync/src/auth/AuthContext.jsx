import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useUser() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  // function getUser() {
  //   return localStorage.getItem("user");
  // }

  let contextData = {
    authenticated,
    setAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
