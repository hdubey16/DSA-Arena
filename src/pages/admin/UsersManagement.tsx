import { useState } from 'react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Ban, RefreshCw, Eye, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { adminAPI } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  progress: {
    topicsCompleted: number;
    questionsSolved: number;
    testsTaken: number;
    suspiciousAttempts: number;
  };
  joinedAt: string;
}

const UsersManagement = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'moderator' | 'admin',
  });
  const { toast } = useToast();
  
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      progress: {
        topicsCompleted: 12,
        questionsSolved: 58,
        testsTaken: 3,
        suspiciousAttempts: 0,
      },
      joinedAt: '2025-11-01',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      progress: {
        topicsCompleted: 8,
        questionsSolved: 42,
        testsTaken: 2,
        suspiciousAttempts: 3,
      },
      joinedAt: '2025-11-05',
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@javaprep.com',
      role: 'admin',
      status: 'active',
      progress: {
        topicsCompleted: 112,
        questionsSolved: 195,
        testsTaken: 15,
        suspiciousAttempts: 0,
      },
      joinedAt: '2025-10-01',
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/50">Admin</Badge>;
      case 'moderator':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">Moderator</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/50">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">Suspended</Badge>;
      case 'banned':
        return <Badge variant="destructive">Banned</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 relative">
        {/* Floating Add Button for better visibility */}
        <Button 
          className="fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full shadow-lg neon-glow-strong"
          onClick={() => setIsAddUserOpen(true)}
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold neon-text mb-2">User Management</h1>
            <p className="text-muted-foreground">
              Manage users, roles, and permissions
            </p>
          </div>
          <Button 
            className="neon-glow-strong"
            onClick={() => setIsAddUserOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
          <p className="text-sm">👆 Use the <strong>"Add User"</strong> button above or the <strong>floating button</strong> at bottom-right to create new users</p>
        </div>

        {/* Filters */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Input placeholder="Search users..." className="max-w-sm border-primary/30" />
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-accent/5">
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-border hover:bg-accent/10 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {user.name}
                        {user.progress.suspiciousAttempts > 0 && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            {user.progress.suspiciousAttempts} flags
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div className="text-muted-foreground">
                            {user.progress.topicsCompleted}/112 topics
                          </div>
                          <div className="text-muted-foreground">
                            {user.progress.questionsSolved} solved
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(user.joinedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          {user.role !== 'admin' && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:text-yellow-500"
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:text-destructive"
                              >
                                <Ban className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:text-destructive"
                            disabled={user.role === 'admin'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add User Dialog */}
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl neon-text">Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="border-primary/30"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="border-primary/30"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="border-primary/30"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value: 'user' | 'moderator' | 'admin') => 
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger className="border-primary/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => {
                    setIsAddUserOpen(false);
                    setNewUser({ name: '', email: '', password: '', role: 'user' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 neon-glow-strong"
                  onClick={async () => {
                    setIsCreating(true);
                    try {
                      await adminAPI.createUser(newUser);
                      toast({
                        title: "User Created",
                        description: `${newUser.name} has been successfully created.`,
                      });
                      setIsAddUserOpen(false);
                      setNewUser({ name: '', email: '', password: '', role: 'user' });
                      // Refresh the users list
                      window.location.reload();
                    } catch (error: any) {
                      toast({
                        title: "Error",
                        description: error.response?.data?.message || "Failed to create user",
                        variant: "destructive",
                      });
                    } finally {
                      setIsCreating(false);
                    }
                  }}
                  disabled={!newUser.name || !newUser.email || !newUser.password || isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create User'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* User Details Dialog */}
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl neon-text">User Details</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold mb-4">Progress Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-2xl font-bold text-primary">
                          {selectedUser.progress.topicsCompleted}/112
                        </p>
                        <p className="text-sm text-muted-foreground">Topics Completed</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-2xl font-bold text-primary">
                          {selectedUser.progress.questionsSolved}
                        </p>
                        <p className="text-sm text-muted-foreground">Questions Solved</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-2xl font-bold text-primary">
                          {selectedUser.progress.testsTaken}
                        </p>
                        <p className="text-sm text-muted-foreground">Tests Taken</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-2xl font-bold text-destructive">
                          {selectedUser.progress.suspiciousAttempts}
                        </p>
                        <p className="text-sm text-muted-foreground">Suspicious Attempts</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default UsersManagement;
