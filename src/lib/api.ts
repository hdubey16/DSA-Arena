import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Check if this is from the getCurrentUser call during initial verification
      const isInitialVerification = error.config?.url?.includes('/auth/me');
      
      if (isInitialVerification) {
        console.log('[API] 401 on token verification - letting AuthContext handle it');
        // Don't redirect, let AuthContext handle the cleanup
        return Promise.reject(error);
      }
      
      const user = localStorage.getItem('user');
      let isAdmin = false;
      
      if (user) {
        try {
          const userData = JSON.parse(user);
          isAdmin = userData.role === 'admin';
        } catch (e) {
          console.error('Failed to parse user data', e);
        }
      }
      
      console.log('[API] 401 Unauthorized - clearing auth and redirecting to login');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      // Redirect based on user role
      if (isAdmin || window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  adminLogin: (email: string, password: string) =>
    api.post('/auth/admin/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  verifyToken: () => api.get('/auth/verify'),
  
  getCurrentUser: () => api.get('/auth/me'),
};

// Admin APIs
export const adminAPI = {
  // Dashboard
  getStats: () => api.get('/admin/stats'),
  getActivity: () => api.get('/admin/activity'),
  
  // Topics
  getTopics: () => api.get('/admin/topics'),
  createTopic: (data: any) => api.post('/admin/topics', data),
  updateTopic: (id: string, data: any) => api.put(`/admin/topics/${id}`, data),
  deleteTopic: (id: string) => api.delete(`/admin/topics/${id}`),
  regenerateQuestions: (id: string) => api.post(`/admin/topics/${id}/regenerate`),
  
  // Tests
  getTests: () => api.get('/admin/tests'),
  createTest: (data: any) => api.post('/admin/tests', data),
  updateTest: (id: string, data: any) => api.put(`/admin/tests/${id}`, data),
  deleteTest: (id: string) => api.delete(`/admin/tests/${id}`),
  startTest: (id: string) => api.post(`/admin/tests/${id}/start`),
  endTest: (id: string) => api.post(`/admin/tests/${id}/end`),
  
  // Submissions
  getSubmissions: (filters?: any) => api.get('/admin/submissions', { params: filters }),
  getSubmission: (id: string) => api.get(`/admin/submissions/${id}`),
  rerunSubmission: (id: string) => api.post(`/admin/submissions/${id}/rerun`),
  exportSubmissions: () => api.get('/admin/submissions/export', { responseType: 'blob' }),
  
  // Users
  getUsers: (filters?: any) => api.get('/admin/users', { params: filters }),
  createUser: (data: any) => api.post('/admin/users', data),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  suspendUser: (id: string) => api.post(`/admin/users/${id}/suspend`),
  banUser: (id: string) => api.post(`/admin/users/${id}/ban`),
  resetPassword: (id: string) => api.post(`/admin/users/${id}/reset-password`),
  
  // Plagiarism
  getPlagiarismCases: () => api.get('/admin/plagiarism'),
  reviewCase: (id: string, data: any) => api.put(`/admin/plagiarism/${id}/review`, data),
  checkPlagiarism: (testId: string) => api.post('/admin/plagiarism/check', { testId }),
  
  // Proctoring
  getProctoringsessions: (filters?: any) => api.get('/admin/proctoring/sessions', { params: filters }),
  getSession: (id: string) => api.get(`/admin/proctoring/sessions/${id}`),
  terminateSession: (id: string) => api.post(`/admin/proctoring/sessions/${id}/terminate`),
  
  // Logs
  getLogs: (filters?: any) => api.get('/admin/logs', { params: filters }),
  exportLogs: () => api.get('/admin/logs/export', { responseType: 'blob' }),
  
  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data: any) => api.put('/admin/settings', data),
};

// User APIs
export const userAPI = {
  getTopics: () => api.get('/topics'),
  getTopicQuestions: (topicId: string) => api.get(`/topics/${topicId}/questions`),
  submitAnswer: (data: any) => api.post('/submissions', data),
  getProgress: () => api.get('/progress'),
  getTests: () => api.get('/tests'),
  startTest: (testId: string) => api.post(`/tests/${testId}/start`),
  submitTest: (testId: string, data: any) => api.post(`/tests/${testId}/submit`, data),
  getLeaderboard: () => api.get('/leaderboard'),
};

// Submission APIs
export const submissionAPI = {
  runCode: (data: { code: string; questionId: string }) => 
    api.post('/submissions/run', data),
  submitCode: (data: { code: string; questionId: string; topicId: number }) => 
    api.post('/submissions/submit', data),
};

export default api;
