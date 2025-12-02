import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminNavBar from "@/components/AdminNavBar";
import UserManagement from "@/components/admin/UserManagement";
import DaySettings from "@/components/admin/DaySettings";
import DashboardStats from "@/components/admin/DashboardStats";
import TestGenerator from "@/pages/admin/TestGenerator";
import TopicManagement from "@/components/admin/TopicManagement";
import SubmissionsManagement from "@/pages/admin/SubmissionsManagement";
import SecurityLogs from "@/components/admin/SecurityLogs";
import AdminSettings from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      toast({
        title: "Access denied",
        description: "Admin privileges required",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    setUser(parsedUser);
  }, [navigate, toast]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <AdminNavBar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName={user.name}
        userEmail={user.email}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <TestGenerator />
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <TopicManagement />
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <SubmissionsManagement />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="days" className="space-y-6">
            <DaySettings />
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <SecurityLogs />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
