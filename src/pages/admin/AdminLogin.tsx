import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginCardSection from '@/components/ui/login-signup';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if remember me was set for admin
    const adminRememberMe = localStorage.getItem('adminRememberMe');
    const savedAdminEmail = localStorage.getItem('savedAdminEmail');
    
    if (adminRememberMe === 'true' && savedAdminEmail) {
      setSavedEmail(savedAdminEmail);
    }
  }, []);

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    setError('');
    setLoading(true);

    try {
      await login(email, password, true); // isAdmin = true
      
      if (rememberMe) {
        localStorage.setItem('adminRememberMe', 'true');
        localStorage.setItem('savedAdminEmail', email);
      } else {
        localStorage.removeItem('adminRememberMe');
        localStorage.removeItem('savedAdminEmail');
      }
      
      toast.success('Admin login successful!');
      navigate('/admin');
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || 'Invalid admin credentials. Please try again.';
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
      title="Admin Access 🛡️"
      description="DSA Arena Administration Panel"
      savedEmail={savedEmail}
    />
  );
};

export default AdminLogin;
