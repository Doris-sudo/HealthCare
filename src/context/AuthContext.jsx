import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'lifecare_user_v1';

const DEMO_USER = {
  id: 'usr-101',
  name: 'Tunde Bakare',
  email: 'tunde.bakare@example.com',
  phone: '+234 803 123 4567',
  address: '14 Adeleke Street, Off Admiralty Way',
  city: 'Lekki Phase 1',
  state: 'Lagos State',
  memberSince: 'January 2025',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
  prescriptions: [
    {
      id: 'rx-901',
      doctor: 'Dr. Chinedu Eze (Lekki Medical Centre)',
      medication: 'Amoxicillin & Clavulanate 625mg',
      date: '2025-02-14',
      status: 'Verified',
      file: 'prescription_amoxicillin_dr_eze.pdf'
    },
    {
      id: 'rx-902',
      doctor: 'Dr. Fatima Bello (National Hospital Abuja)',
      medication: 'Amlodipine 5mg Daily',
      date: '2025-01-20',
      status: 'Active Refill',
      file: 'hypertension_refill_auth.pdf'
    }
  ]
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [currentUser]);

  const login = (email, password) => {
    // Mock authentication: accepts any valid looking email
    const user = {
      id: 'usr-' + Math.floor(Math.random() * 900 + 100),
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
      email,
      phone: '+234 802 987 6543',
      address: '24 Crescent Boulevard',
      city: 'Victoria Island',
      state: 'Lagos State',
      memberSince: 'February 2025',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
      prescriptions: []
    };
    setCurrentUser(user);
    return { success: true, user };
  };

  const register = ({ name, email, phone }) => {
    const newUser = {
      id: 'usr-' + Math.floor(Math.random() * 900 + 100),
      name,
      email,
      phone: phone || '+234 800 000 0000',
      address: 'New Customer Address',
      city: 'Lagos',
      state: 'Lagos State',
      memberSince: 'March 2025',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
      prescriptions: []
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const addPrescription = (prescriptionData) => {
    if (!currentUser) return;
    const newRx = {
      id: 'rx-' + Math.floor(Math.random() * 900 + 100),
      date: new Date().toISOString().split('T')[0],
      status: 'Under Pharmacist Review',
      ...prescriptionData
    };
    setCurrentUser((prev) => ({
      ...prev,
      prescriptions: [newRx, ...(prev.prescriptions || [])]
    }));
    return newRx;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        updateProfile,
        addPrescription,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
