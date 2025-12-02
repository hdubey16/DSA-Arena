import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginCardSection from '@/components/ui/login-signup';
import { toast } from 'sonner';

const UserLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

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
      console.log('[UserLogin] Starting login for:', email);
      await login(email, password, false); // isAdmin = false
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('savedEmail');
      }
      
      console.log('[UserLogin] Login successful, navigating to /topics');
      toast.success('Login successful!');
      navigate('/topics');
      console.log('[UserLogin] Navigation called');
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || 'Invalid credentials. Please try again.';
      console.error('[UserLogin] Login failed:', errorMessage);
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
      await register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/topics');
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginCardSection
      onLogin={handleLogin}
      isLoading={loading}
      error={error}
      mode="login"
      title="Welcome to JavaPrep"
      description="Master Data Structures & Algorithms in Java with 560+ questions across 112 days"
      savedEmail={savedEmail}
    />
  );
};

export default UserLogin;
