import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginCardSection from '@/components/ui/login-signup';
import { toast } from 'sonner';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const { login, register, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin/login';

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated && user) {
      if (user.role === 'admin' && isAdminLogin) {
        navigate('/admin', { replace: true });
      } else if (user.role !== 'admin' && !isAdminLogin) {
        navigate('/topics', { replace: true });
      }
    }
  }, [isAuthenticated, user, isAdminLogin, navigate]);

  useEffect(() => {
    // Check if remember me was set
    const rememberMe = localStorage.getItem('rememberMe');
    const savedUserEmail = localStorage.getItem('savedEmail');
    
    if (rememberMe === 'true' && savedUserEmail) {
      setSavedEmail(savedUserEmail);
    }
  }, []);

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    setError('');
    setLoading(true);

    try {
      console.log('[Login] Starting login for:', email, 'isAdmin:', isAdminLogin);
      await login(email, password, isAdminLogin);
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('savedEmail');
      }
      
      console.log('[Login] Login successful, navigating to', isAdminLogin ? '/admin' : '/topics');
      toast.success('Login successful!');
      navigate(isAdminLogin ? '/admin' : '/topics');
      console.log('[Login] Navigation called');
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || 'Invalid credentials. Please try again.';
      console.error('[Login] Login failed:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setError('');
    setLoading(true);

    try {
      console.log('[Login] Starting registration for:', email);
      await register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/topics');
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || 'Registration failed. Please try again.';
      console.error('[Login] Registration failed:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginCardSection
      onLogin={handleLogin}
      onRegister={handleRegister}
      isLoading={loading}
      error={error}
      mode="login"
      title={isAdminLogin ? "Admin Portal" : "Welcome to DSA Arena"}
      description={isAdminLogin ? "Secure admin access" : "Master Data Structures & Algorithms in Java with 560+ questions across 112 days"}
      savedEmail={savedEmail}
    />
  );
};

export default Login;
