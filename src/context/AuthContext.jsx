import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_USER } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || 'alex.vance@nutrifuel.io');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProfile = async (email) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/user/profile`, {
        headers: {
          'X-User-Email': email
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setIsAdmin(data.role === 'ADMIN');
      } else {
        // Fallback to mock data if API fails (e.g. not created yet or off)
        fallbackUser(email);
      }
    } catch (err) {
      console.warn("Backend API not reachable, falling back to mock data.", err);
      fallbackUser(email);
    }
  };

  const fallbackUser = (email) => {
    if (email && email.toLowerCase().includes('admin')) {
      setIsAdmin(true);
      setUser({ ...CURRENT_USER, name: 'Admin Master', email: 'admin@nutrifuel.io', role: 'ADMIN' });
    } else {
      setIsAdmin(false);
      setUser({ ...CURRENT_USER, email: email || CURRENT_USER.email });
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchProfile(userEmail);
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, [userEmail]);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setUserEmail(email);
          localStorage.setItem('userEmail', email);
          return true;
        }
      }
    } catch (err) {
      console.error("Login API request failed:", err);
    }
    
    // Fallback login
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
  };

  const switchRole = (role) => {
    const email = role === 'admin' ? 'admin@nutrifuel.io' : 'alex.vance@nutrifuel.io';
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const updateUserProfile = async (updatedFields) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser((prev) => (prev ? { ...prev, ...updatedFields } : prev));
      }
    } catch (err) {
      console.error("Update profile API request failed:", err);
      setUser((prev) => (prev ? { ...prev, ...updatedFields } : prev));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, userEmail, login, logout, switchRole, updateUserProfile, refetchProfile: () => fetchProfile(userEmail) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

