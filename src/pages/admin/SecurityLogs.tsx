import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Shield,
  User,
  Edit,
  Trash2,
  AlertTriangle,
  Key,
  Monitor,
  Filter,
  Download,
} from 'lucide-react';
import { useState } from 'react';

interface SecurityLog {
  id: string;
  type: 'auth' | 'admin' | 'security' | 'cheating';
  severity: 'info' | 'warning' | 'critical';
  user: string;
  action: string;
  ip: string;
  device: string;
  timestamp: string;
  details: string;
}

const SecurityLogs = () => {
  const [logType, setLogType] = useState('all');

  const logs: SecurityLog[] = [
    {
      id: '1',
      type: 'auth',
      severity: 'info',
      user: 'admin@javaprep.com',
      action: 'Admin Login',
      ip: '192.168.1.100',
      device: 'Chrome / Windows',
      timestamp: '2025-11-22T09:00:00',
      details: 'Successful authentication',
    },
    {
      id: '2',
      type: 'cheating',
      severity: 'critical',
      user: 'jane@example.com',
      action: 'DevTools Detected',
      ip: '192.168.1.105',
      device: 'Firefox / Windows',
      timestamp: '2025-11-22T10:30:00',
      details: 'Browser DevTools opened during test',
    },
    {
      id: '3',
      type: 'admin',
      severity: 'warning',
      user: 'admin@javaprep.com',
      action: 'Test Deleted',
      ip: '192.168.1.100',
      device: 'Chrome / Windows',
      timestamp: '2025-11-22T11:00:00',
      details: 'Deleted test: "Week 1 Quiz"',
    },
    {
      id: '4',
      type: 'security',
      severity: 'warning',
      user: 'john@example.com',
      action: 'Multiple Login Attempts',
      ip: '192.168.1.110',
      device: 'Edge / Windows',
      timestamp: '2025-11-22T11:15:00',
      details: '5 failed login attempts in 2 minutes',
    },
    {
      id: '5',
      type: 'cheating',
      severity: 'critical',
      user: 'tom@example.com',
      action: 'Clipboard Access',
      ip: '192.168.1.115',
      device: 'Chrome / macOS',
      timestamp: '2025-11-22T11:30:00',
      details: 'Attempted to paste external code',
    },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'auth':
        return (
          <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">
            <Key className="h-3 w-3 mr-1" />
            Auth
          </Badge>
        );
      case 'admin':
        return (
          <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/50">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        );
      case 'security':
        return (
          <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Security
          </Badge>
        );
      case 'cheating':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Cheating
          </Badge>
        );
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive" className="neon-glow">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">Warning</Badge>;
      case 'info':
        return <Badge variant="outline">Info</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold neon-text mb-2">Security & Logs</h1>
            <p className="text-muted-foreground">
              Monitor system security and user activity
            </p>
          </div>
          <Button className="neon-glow-strong">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-blue-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Key className="h-4 w-4" />
                Auth Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">1,247</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">156</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">23</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-red-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Cheating Attempts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">12</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Input placeholder="Search logs..." className="max-w-sm border-primary/30" />
              <Select value={logType} onValueChange={setLogType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Logs</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="admin">Admin Actions</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="cheating">Cheating</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Activity Logs ({logs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-accent/5">
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow
                      key={log.id}
                      className={`border-border hover:bg-accent/10 transition-colors ${
                        log.severity === 'critical' ? 'bg-red-500/5' : ''
                      }`}
                    >
                      <TableCell className="font-mono text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{getTypeBadge(log.type)}</TableCell>
                      <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell className="font-semibold">{log.action}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {log.ip}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Monitor className="h-3 w-3" />
                          {log.device}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SecurityLogs;
