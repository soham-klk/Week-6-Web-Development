import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getStoredToken, getDashboardData, loginUser, signupUser, logoutUser } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check auth status on app load by fetching protected dashboard user info if token exists
  const checkAuthStatus = async () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const result = await getDashboardData();
      if (result.success && result.data?.user) {
        setUser(result.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle user login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await loginUser(email, password);
    setIsLoading(false);

    if (res.user && res.token) {
      setUser(res.user);
      return { success: true, message: res.message || 'Login successful' };
    }
    return { success: false, message: res.message || res.error || 'Login failed' };
  };

  // Handle user registration
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    const res = await signupUser(name, email, password);
    setIsLoading(false);

    if (res.user && res.token) {
      setUser(res.user);
      return { success: true, message: res.message || 'Signup successful' };
    }
    return { success: false, message: res.message || res.error || 'Signup failed' };
  };

  // Handle user logout
  const logout = async () => {
    setIsLoading(true);
    await logoutUser();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshAuth: checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext easily in components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
