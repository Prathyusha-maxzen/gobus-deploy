import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Check for token in URL (from OAuth redirect)
    const params = new URLSearchParams(window.location.search);
    let token = params.get('token');

    if (token) {
      localStorage.setItem('jwtToken', token);
      // Clear the token from the URL so it looks cleaner
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // 2. Check for token in localStorage
      token = localStorage.getItem('jwtToken');
    }

    if (token) {
      try {
        // Decode JWT payload (simple base64 decode)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const userData = JSON.parse(jsonPayload);
        setUser(userData);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
