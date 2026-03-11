import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, logout } = useAuth();

  const handleLogin = () => {
    // Spring Boot default OAuth2 login endpoint
    // window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    window.location.href=`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
  };

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem('jwtToken');
      navigate('/login');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('jwtToken', token);
      
      try {
        // Decode JWT to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        login(payload);
      } catch (error) {
        console.error('Error decoding token:', error);
      }

      // Remove token from URL so it doesn't persist if user refreshes
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/'); 
    }
  }, [location, navigate, login]);

  const isLoggedIn = user || !!localStorage.getItem('jwtToken');

  return (
    <div className="google-auth-container">
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          {user?.name && <span className="font-semibold">Hi, {user.name}</span>}
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="btn-google-login">Sign up with Google</button>
      )}
    </div>
  );
};

export default GoogleAuth;