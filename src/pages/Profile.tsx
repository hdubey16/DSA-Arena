import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Clock, 
  Flame,
  Trophy,
  Code2,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import StudentNavBar from "@/components/StudentNavBar";
import { RetroGrid } from "@/components/ui/retro-grid";
import { getCompletionStats } from "@/utils/progressTracker";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const stats = getCompletionStats();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to view your profile");
      navigate("/login");
      return;
    }

    // Check if user is admin - redirect to admin panel
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === 'admin') {
        navigate("/admin");
        return;
      }
      setUserData(parsedUser);
    }
  }, [isAuthenticated, navigate]);

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'moderator':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      default:
        return 'bg-primary/20 text-primary border-primary/50';
    }
  };

  const calculateStreak = () => {
    // Calculate streak based on completion stats
    const lastActivityDate = localStorage.getItem('lastActivityDate');
    const streakCount = localStorage.getItem('streakCount') || '0';
    
    if (lastActivityDate) {
      const lastDate = new Date(lastActivityDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        return parseInt(streakCount);
      }
    }
    
    return 0;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLastActive = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-background">
        <StudentNavBar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const streak = calculateStreak();
  const accountCreated = userData.createdAt || userData.createdDate || new Date().toISOString();
  const lastActive = userData.lastActive || userData.updatedAt || new Date().toISOString();

  return (
    <div className="min-h-screen bg-background">
      {/* Full Page RetroGrid Background */}
      <div className="fixed inset-0 z-0 opacity-70">
        <RetroGrid angle={65} />
      </div>
      
      <div className="relative z-10">
        <StudentNavBar />
        
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 neon-text">Your Profile</h1>
            <p className="text-muted-foreground text-lg">
              Track your progress and manage your account
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Core User Information */}
            <Card className="lg:col-span-2 p-8 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start gap-6 mb-6">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{userData.name || 'User'}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={`${getRoleBadgeColor(userData.role)} border`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {userData.role || 'User'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-semibold">{userData.email}</p>
                  </div>
                </div>

                {/* Account Created */}
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Account Created</p>
                    <p className="font-semibold">{formatDate(accountCreated)}</p>
                  </div>
                </div>

                {/* Last Active */}
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border">
                  <Clock className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Last Active</p>
                    <p className="font-semibold">{formatLastActive(lastActive)}</p>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="font-semibold text-2xl text-orange-500">
                      {streak} 🔥
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Progress Stats */}
            <div className="space-y-6">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Progress Overview</h3>
                </div>

                <div className="space-y-4">
                  {/* Days Completed */}
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Days Completed</span>
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {stats.completedDays} / {stats.totalDays}
                    </p>
                  </div>

                  {/* Questions Solved */}
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Questions Solved</span>
                      <Code2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {stats.completedQuestions} / {stats.totalQuestions}
                    </p>
                  </div>

                  {/* Overall Progress */}
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Overall Progress</span>
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {stats.percentage}%
                    </p>
                    <div className="mt-2 w-full bg-background rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${stats.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/topics')}
                  >
                    <Code2 className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      toast.success('Logged out successfully');
                      navigate('/login');
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
