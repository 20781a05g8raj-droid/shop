import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      toast.success(`Welcome back, ${data.name}!`);
      return data;
    } catch (err) {
      // Demo mode fallback
      if (email === 'admin@iwayshopee.com' && password === 'admin123') {
        const demo = { _id: 'demo-admin', name: 'Admin User', email, isAdmin: true, token: 'demo-token-admin' };
        localStorage.setItem('userInfo', JSON.stringify(demo));
        setUser(demo);
        toast.success('Welcome Admin! (Demo mode)');
        return demo;
      }
      if (email && password.length >= 6) {
        const demo = { _id: 'demo-' + Date.now(), name: email.split('@')[0], email, isAdmin: false, token: 'demo-token' };
        localStorage.setItem('userInfo', JSON.stringify(demo));
        setUser(demo);
        toast.success(`Welcome, ${demo.name}! (Demo mode)`);
        return demo;
      }
      toast.error(err.response?.data?.message || 'Invalid credentials');
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/users', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      toast.success(`Welcome to I-WAY Shopee, ${data.name}!`);
      return data;
    } catch (err) {
      const demo = { _id: 'demo-' + Date.now(), name, email, isAdmin: false, token: 'demo-token' };
      localStorage.setItem('userInfo', JSON.stringify(demo));
      setUser(demo);
      toast.success(`Welcome, ${name}! (Demo mode)`);
      return demo;
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
