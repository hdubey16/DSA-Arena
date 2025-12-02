import { 
  Home, 
  Code, 
  BookOpen, 
  Trophy,
  User,
  LogOut
} from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const StudentNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const tabs = [
    { title: "Home", icon: Home },
    { title: "Topics", icon: BookOpen },
    { title: "Tests", icon: Trophy },
    { type: "separator" as const },
    { title: "Profile", icon: User },
  ];

  const tabMapping = [
    "/",
    "/topics",
    "/tests",
    null, // separator
    "/profile",
  ];

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const path = tabMapping[index];
      if (path) {
        navigate(path as string);
      }
    }
  };

  // Calculate active index based on current location
  const activeIndex = tabMapping.indexOf(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="border-b border-border bg-card sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 min-w-fit cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold neon-text">DSA Arena</h1>
              <p className="text-xs text-muted-foreground">Master DSA in Java</p>
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
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {user.email}
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
              </>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => navigate('/login')}
                className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,0,0.3)]"
              >
                <User className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentNavBar;
