import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Shield,
  AlertTriangle,
  Info,
  AlertCircle,
  Download,
  Filter,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface SecurityLog {
  _id: string;
  userId?: {
    name: string;
    email: string;
  };
  type: string;
  action: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  severity: string;
  timestamp: Date;
}

const SecurityLogs = () => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLogs();
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, [page, filterType, filterSeverity]);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
      });

      if (filterType !== 'all') params.append('type', filterType);
      if (filterSeverity !== 'all') params.append('severity', filterSeverity);

      const response = await fetch(`http://localhost:5000/api/admin/security-logs?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      setLogs(data.logs || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch logs');
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/admin/security-logs/export', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `security-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        toast.success('Logs exported successfully');
      } else {
        toast.error('Failed to export logs');
      }
    } catch (error) {
      toast.error('Error exporting logs');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    const styles = {
      info: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50', icon: Info },
      warning: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50', icon: AlertCircle },
      error: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50', icon: AlertTriangle },
      critical: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50', icon: AlertTriangle },
    };

    const style = styles[severity as keyof typeof styles] || styles.info;
    const Icon = style.icon;

    return (
      <Badge className={`${style.bg} ${style.text} ${style.border} border`}>
        <Icon className="h-3 w-3 mr-1" />
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      auth: 'bg-green-500/20 text-green-400 border-green-500/50',
      admin_action: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      cheating_attempt: 'bg-red-500/20 text-red-400 border-red-500/50',
      suspicious_activity: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      system: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    };

    return (
      <Badge className={`${colors[type] || colors.system} border text-xs`}>
        {type.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const filteredLogs = logs.filter((log) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      log.action.toLowerCase().includes(searchLower) ||
      log.userId?.name.toLowerCase().includes(searchLower) ||
      log.ipAddress.includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold neon-text flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Security Logs
          </h2>
          <p className="text-muted-foreground mt-1">Real-time monitoring of system security events</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchLogs}
            variant="outline"
            disabled={loading}
          >
            <Clock className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={handleExport}
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Action, user, IP address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="filterType">Type</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="mt-1 w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="auth">Authentication</SelectItem>
                <SelectItem value="admin_action">Admin Action</SelectItem>
                <SelectItem value="cheating_attempt">Cheating Attempt</SelectItem>
                <SelectItem value="suspicious_activity">Suspicious Activity</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filterSeverity">Severity</Label>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="mt-1 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-semibold">Time</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Severity</th>
                <th className="text-left p-4 font-semibold">Action</th>
                <th className="text-left p-4 font-semibold">User</th>
                <th className="text-left p-4 font-semibold">IP Address</th>
                <th className="text-left p-4 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log._id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-4">
                    <div className="text-sm">
                      <p>{new Date(log.timestamp).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    {getTypeBadge(log.type)}
                  </td>
                  <td className="p-4">
                    {getSeverityBadge(log.severity)}
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{log.action}</p>
                  </td>
                  <td className="p-4">
                    {log.userId ? (
                      <div>
                        <p className="font-medium text-sm">{log.userId.name}</p>
                        <p className="text-xs text-muted-foreground">{log.userId.email}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">System</span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="font-mono text-xs">{log.ipAddress}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-muted-foreground max-w-xs truncate">
                      {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages} • {filteredLogs.length} logs shown
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Live Activity Indicator */}
      <Card className="p-4 border-primary/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-muted-foreground">Live monitoring active • Auto-refresh every 10 seconds</p>
        </div>
      </Card>
    </div>
  );
};

export default SecurityLogs;
