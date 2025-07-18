import { createContext, useContext, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const register = async (formData, navigate) => {
    try {
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      throw err;
    }
  };

  const login = async (formData, navigate) => {
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      throw err;
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);