import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Topics from "./pages/Topics";
import Practice from "./pages/Practice";
import Tests from "./pages/Tests";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TopicsManagement from "./pages/admin/TopicsManagement";
import TestGenerator from "./pages/admin/TestGenerator";
import SubmissionsManagement from "./pages/admin/SubmissionsManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import PlagiarismMonitor from "./pages/admin/PlagiarismMonitor";
import ProctoringDashboard from "./pages/admin/ProctoringDashboard";
import SecurityLogs from "./pages/admin/SecurityLogs";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => {
  // Disable copy-paste globally
  React.useEffect(() => {
    const disableCopyPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // Allow copy if the element or its parent has the 'allow-copy' class
      if (target.closest('.allow-copy')) {
        return true;
      }
      e.preventDefault();
      return false;
    };

    const disableContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Allow context menu if the element or its parent has the 'allow-copy' class
      if (target.closest('.allow-copy')) {
        return true;
      }
      e.preventDefault();
      return false;
    };

    document.addEventListener('copy', disableCopyPaste);
    document.addEventListener('cut', disableCopyPaste);
    document.addEventListener('paste', disableCopyPaste);
    document.addEventListener('contextmenu', disableContextMenu);

    return () => {
      document.removeEventListener('copy', disableCopyPaste);
      document.removeEventListener('cut', disableCopyPaste);
      document.removeEventListener('paste', disableCopyPaste);
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/practice/:topicId" element={<Practice />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/topics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <TopicsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tests"
              element={
                <ProtectedRoute requiredRole="admin">
                  <TestGenerator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/submissions"
              element={
                <ProtectedRoute requiredRole="admin">
                  <SubmissionsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <UsersManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/plagiarism"
              element={
                <ProtectedRoute requiredRole="admin">
                  <PlagiarismMonitor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/proctoring"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ProctoringDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/security"
              element={
                <ProtectedRoute requiredRole="admin">
                  <SecurityLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  );
};

export default App;
