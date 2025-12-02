import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

export type UserRole = 'user' | 'moderator' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  status: 'active' | 'suspended' | 'banned';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify token and get current user
    const verifyUser = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');
      
      console.log('[AuthContext] Verifying user - Token exists:', !!token, 'User data exists:', !!storedUser);
      
      if (token && storedUser) {
        try {
          // First set user from localStorage for immediate auth
          const parsedUser = JSON.parse(storedUser);
          console.log('[AuthContext] Setting user from localStorage:', parsedUser.email);
          setUser(parsedUser);
          setLoading(false); // Set loading to false immediately after restoring from localStorage
          
          // Then verify token in background (don't await to avoid blocking)
          console.log('[AuthContext] Verifying token with backend...');
          authAPI.getCurrentUser()
            .then((response) => {
              console.log('[AuthContext] Token verified successfully');
              setUser(response.data.user);
              // Update localStorage with fresh user data
              localStorage.setItem('user', JSON.stringify(response.data.user));
            })
            .catch((error) => {
              console.error('[AuthContext] Token verification failed:', error);
              // Only clear if token is actually invalid (401/403)
              const err = error as { response?: { status?: number } };
              if (err.response?.status === 401 || err.response?.status === 403) {
                console.log('[AuthContext] Invalid token, clearing auth data');
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                setUser(null);
              } else {
                // For network errors, keep the user logged in with localStorage data
                console.log('[AuthContext] Network error, keeping localStorage auth');
              }
            });
        } catch (error) {
          console.error('[AuthContext] Failed to parse stored user:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          setUser(null);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email: string, password: string, isAdmin = false) => {
    setLoading(true);
    try {
      console.log('[AuthContext] Attempting login:', { email, isAdmin });
      const response = isAdmin 
        ? await authAPI.adminLogin(email, password)
        : await authAPI.login(email, password);
      
      const { token, user: userData } = response.data;
      
      console.log('[AuthContext] Login successful:', userData.email, 'Role:', userData.role);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Track login session
      await logSession(userData.id, 'login');
      console.log('[AuthContext] Login complete');
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await logSession(user.id, 'logout');
      }
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const logSession = async (userId: string, action: 'login' | 'logout' | 'register') => {
    try {
      // This will be handled by backend to track sessions
      const sessionData = {
        userId,
        action,
        ip: await getClientIP(),
        device: getDeviceInfo(),
        browser: getBrowserInfo(),
        timestamp: new Date(),
      };
      // Backend will handle session tracking
      console.log('Session logged:', sessionData);
    } catch (error) {
      console.error('Failed to log session:', error);
    }
  };

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return 'Mobile';
    if (/tablet/i.test(ua)) return 'Tablet';
    return 'Desktop';
  };

  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authAPI.register(name, email, password);
      
      const token = response.data.token;
      const userData = response.data.user;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isModerator: user?.role === 'moderator' || user?.role === 'admin',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
