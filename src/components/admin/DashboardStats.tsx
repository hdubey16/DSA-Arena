import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { 
  Users, TrendingUp, Calendar, CheckCircle2, Activity, 
  AlertTriangle, Shield, TestTube, Eye, Clock 
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [realTimeStats, setRealTimeStats] = useState<any>(null);

  useEffect(() => {
    fetchStats();
    fetchRealTimeStats();
    
    // Refresh real-time stats every 30 seconds
    const interval = setInterval(fetchRealTimeStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('[DashboardStats] Fetching with token:', !!token);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/dashboard/enhanced`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('[DashboardStats] Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[DashboardStats] Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('[DashboardStats] Data received:', data);
      setStats(data);
    } catch (error) {
      console.error('[DashboardStats] Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealTimeStats = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/dashboard/realtime`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setRealTimeStats(data);
    } catch (error) {
      console.error('Failed to fetch real-time stats:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading statistics...</div>;
  }

  if (!stats) {
    return <div className="text-center py-12 text-muted-foreground">No data available</div>;
  }

  const NEON_GREEN = '#00ff00';
  const NEON_CYAN = '#00ffff';
  const NEON_PINK = '#ff00ff';
  const NEON_YELLOW = '#ffff00';

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold neon-text">{stats.users?.total || 0}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg animate-pulse">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.users?.active || 0} active users
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Tests Conducted</p>
              <p className="text-3xl font-bold" style={{color: NEON_CYAN}}>{stats.tests?.completed || 0}</p>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-lg">
              <TestTube className="h-6 w-6 text-cyan-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.tests?.total || 0} total tests
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Active Tests</p>
              <p className="text-3xl font-bold" style={{color: NEON_PINK}}>{stats.tests?.active || 0}</p>
            </div>
            <div className="p-3 bg-pink-500/10 rounded-lg animate-pulse">
              <Activity className="h-6 w-6 text-pink-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.tests?.scheduled || 0} scheduled
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Plagiarism Alerts</p>
              <p className="text-3xl font-bold text-red-500">{stats.plagiarism?.totalAlerts || 0}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg animate-pulse">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.plagiarism?.highRisk || 0} high risk
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(255,165,0,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Suspicious Activity</p>
              <p className="text-3xl font-bold text-orange-500">{stats.suspicious?.totalActivities || 0}</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Eye className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.suspicious?.critical || 0} critical
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Avg Submission Time</p>
              <p className="text-3xl font-bold neon-text">{Math.round(stats.performance?.avgSubmissionTime / 60 || 0)}m</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Average time spent
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Security Alerts</p>
              <p className="text-3xl font-bold neon-text">{stats.securityAlerts || 0}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg animate-pulse">
              <Shield className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Last 24 hours
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(138,43,226,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Attempts</p>
              <p className="text-3xl font-bold text-purple-500">{stats.practice?.totalAttempts || 0}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Activity className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Across all questions
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold text-green-500">{stats.practice?.accepted || 0}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Questions completed
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(255,255,0,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Live Submissions</p>
              <p className="text-3xl font-bold" style={{color: NEON_YELLOW}}>{stats.practice?.liveSubmissions || 0}</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg animate-pulse">
              <Activity className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            In progress now
          </p>
        </Card>

        <Card className="p-6 bg-card border-border hover:shadow-[0_0_15px_rgba(255,140,0,0.3)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>
              <p className="text-3xl font-bold text-orange-500">{stats.admins?.total || 0}</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Shield className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Administrator accounts
          </p>
        </Card>
      </div>

      {/* Submission Trends Chart */}
      {stats.submissionTrends && stats.submissionTrends.length > 0 && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold mb-4 neon-text">Submission Trends (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.submissionTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="_id" stroke={NEON_GREEN} />
              <YAxis stroke={NEON_GREEN} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: `1px solid ${NEON_GREEN}` }}
                labelStyle={{ color: NEON_GREEN }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke={NEON_GREEN} 
                strokeWidth={2}
                dot={{ fill: NEON_GREEN, r: 4 }}
                name="Submissions"
              />
              <Line 
                type="monotone" 
                dataKey="avgScore" 
                stroke={NEON_CYAN} 
                strokeWidth={2}
                dot={{ fill: NEON_CYAN, r: 4 }}
                name="Avg Score %"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Topic Completion Chart */}
      {stats.topicCompletion && stats.topicCompletion.length > 0 && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold mb-4 neon-text">Topic Completion Stats</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stats.topicCompletion.slice(0, 20)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="dayId" stroke={NEON_GREEN} label={{ value: 'Day', fill: NEON_GREEN }} />
              <YAxis stroke={NEON_GREEN} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: `1px solid ${NEON_GREEN}` }}
                labelStyle={{ color: NEON_GREEN }}
              />
              <Legend />
              <Bar dataKey="uniqueUsers" fill={NEON_GREEN} name="Unique Users" />
              <Bar dataKey="completions" fill={NEON_CYAN} name="Total Completions" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Recent Submissions */}
      {stats.recentSubmissions && stats.recentSubmissions.length > 0 && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold mb-4 neon-text">Recent Submissions</h3>
          <div className="space-y-3">
            {stats.recentSubmissions.map((submission: any) => (
              <div key={submission._id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-all">
                <div>
                  <p className="font-semibold">{submission.userId?.name || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">{submission.testId?.title || 'Unknown Test'}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold neon-text">{submission.percentage}%</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </p>
                  {submission.plagiarismScore > 70 && (
                    <p className="text-xs text-red-500 flex items-center gap-1 justify-end mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      Plagiarism: {submission.plagiarismScore}%
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Active Tests */}
      {stats.activeTestDetails && stats.activeTestDetails.length > 0 && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold mb-4 neon-text">Active Tests</h3>
          <div className="space-y-3">
            {stats.activeTestDetails.map((test: any) => (
              <div key={test._id} className="flex items-center justify-between p-4 bg-background rounded-lg border-2 border-primary/50 animate-pulse">
                <div>
                  <p className="font-semibold text-primary">{test.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(test.startTime).toLocaleString()} - {new Date(test.endTime).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold neon-text">{test.stats?.totalParticipants || 0}</p>
                  <p className="text-xs text-muted-foreground">Participants</p>
                  {test.stats?.plagiarismAlerts > 0 && (
                    <p className="text-xs text-red-500 flex items-center gap-1 justify-end mt-1">
                      <AlertTriangle className="h-3 w-3" />
                      {test.stats.plagiarismAlerts} alerts
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Real-time Alerts */}
      {realTimeStats && realTimeStats.recentAlerts && realTimeStats.recentAlerts.length > 0 && (
        <Card className="p-6 bg-card border-border border-red-500/50">
          <h3 className="text-lg font-bold mb-4 text-red-500 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 animate-pulse" />
            Recent Security Alerts
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {realTimeStats.recentAlerts.map((alert: any, idx: number) => (
              <div key={idx} className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-red-400">{alert.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {alert.userId?.name || 'System'} - {alert.details?.testId || alert.details}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashboardStats;
