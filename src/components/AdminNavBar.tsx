import { 
  BarChart3, 
  TestTube, 
  BookOpen, 
  FileText, 
  Users, 
  Settings, 
  AlertTriangle, 
  Sliders,
  Shield,
  LogOut
} from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AdminNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName?: string;
  userEmail?: string;
}

const AdminNavBar = ({ activeTab, onTabChange, userName, userEmail }: AdminNavBarProps) => {
  const navigate = useNavigate();

  const tabs = [
    { title: "Dashboard", icon: BarChart3 },
    { title: "Tests", icon: TestTube },
    { title: "Submissions", icon: FileText },
    { type: "separator" as const },
    { title: "Users", icon: Users },
    { title: "Days", icon: Settings },
  ];

  const tabMapping = [
    "dashboard",
    "tests",
    "submissions",
    null, // separator
    "users",
    "days",
  ];

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const tab = tabMapping[index];
      if (tab) {
        onTabChange(tab as string);
      }
    }
  };

  // Calculate active index based on current active tab
  const activeIndex = tabMapping.indexOf(activeTab);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="border-b border-border bg-card sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 min-w-fit">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold neon-text">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">DSA Arena</p>
            </div>
          </div>

          {/* Expandable Navigation Tabs */}
          <div className="flex-1 flex justify-center">
            <ExpandableTabs
              tabs={tabs}
              className="border-primary/30 shadow-[0_0_15px_rgba(0,255,0,0.1)]"
              activeColor="text-primary"
              onChange={handleTabChange}
              activeIndex={activeIndex >= 0 ? activeIndex : null}
            />
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-3 min-w-fit">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{userName || 'Admin'}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                {userEmail || 'admin@javaprep.com'}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
