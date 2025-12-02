import { useState, useEffect } from 'react';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RefreshCw, Eye, Filter, CheckCircle, XCircle, Loader2, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface Submission {
  id: string;
  type: 'practice' | 'test';
  user: {
    id: string;
    name: string;
    email: string;
  };
  question?: {
    id: string;
    title: string;
    difficulty: string;
    topicId: string;
  };
  test?: {
    id: string;
    title: string;
  };
  status?: string;
  score?: number;
  totalTestCases?: number;
  passedTestCases?: number;
  runtime?: number;
  memory?: number;
  runtimeBeats?: number;
  memoryBeats?: number;
  totalQuestions?: number;
  correctAnswers?: number;
  plagiarismScore?: number;
  suspicious?: boolean;
  submittedAt: string;
}

const SubmissionsManagement = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const params: any = { type: typeFilter };
      if (filter !== 'all' && filter !== 'suspicious') {
        params.status = filter;
      }

      const response = await axios.get('http://localhost:5000/api/admin/submissions', {
        headers: { Authorization: `Bearer ${token}` },
        params
      });

      let filteredSubmissions = response.data.submissions || [];
      
      // Filter suspicious if needed
      if (filter === 'suspicious') {
        filteredSubmissions = filteredSubmissions.filter((s: Submission) => s.suspicious);
      }

      // Search filter
      if (searchQuery.trim()) {
        filteredSubmissions = filteredSubmissions.filter((s: Submission) =>
          s.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setSubmissions(filteredSubmissions);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://localhost:5000/api/admin/submissions/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, filter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== undefined) {
        fetchSubmissions();
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleViewDetails = async (submissionId: string, type: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get(
        `http://localhost:5000/api/admin/submissions/${submissionId}?type=${type}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedSubmission(response.data.submission);
      setViewDialogOpen(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch submission details');
    }
  };

  const handleReevaluate = async (submissionId: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(
        `http://localhost:5000/api/admin/submissions/${submissionId}/reevaluate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Re-evaluation queued');
      fetchSubmissions();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to re-evaluate');
    }
  };

  const handleDelete = async (submissionId: string, type: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(
        `http://localhost:5000/api/admin/submissions/${submissionId}?type=${type}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Submission deleted');
      fetchSubmissions();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete submission');
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'Accepted':
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        );
      case 'Wrong Answer':
        return (
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50">
            <XCircle className="h-3 w-3 mr-1" />
            Wrong Answer
          </Badge>
        );
      case 'Runtime Error':
      case 'Compilation Error':
      case 'Time Limit Exceeded':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null;
    
    const colors: any = {
      Easy: 'bg-green-500/20 text-green-500 border-green-500/50',
      Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
      Hard: 'bg-red-500/20 text-red-500 border-red-500/50'
    };

    return <Badge className={colors[difficulty] || ''}>{difficulty}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold neon-text mb-2">Submissions Management</h1>
            <p className="text-muted-foreground">
              View and manage all practice and test submissions
            </p>
          </div>
          <Button onClick={fetchSubmissions} variant="outline" className="border-primary/50">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">{stats.practice.total}</div>
                <p className="text-xs text-muted-foreground">Total Practice Submissions</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-500">{stats.practice.accepted}</div>
                <p className="text-xs text-muted-foreground">Accepted Solutions</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-500">{stats.practice.acceptanceRate}%</div>
                <p className="text-xs text-muted-foreground">Acceptance Rate</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-500">{stats.test.total}</div>
                <p className="text-xs text-muted-foreground">Test Submissions</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Input 
                placeholder="Search by user..." 
                className="max-w-sm border-primary/30" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="practice">Practice Only</SelectItem>
                  <SelectItem value="test">Tests Only</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Wrong Answer">Wrong Answer</SelectItem>
                  <SelectItem value="Runtime Error">Runtime Error</SelectItem>
                  <SelectItem value="suspicious">Suspicious Only</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Table */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>All Submissions ({submissions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No submissions found
              </div>
            ) : (
              <div className="rounded-md border border-border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-accent/5">
                      <TableHead>Type</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Question/Test</TableHead>
                      <TableHead>Status/Score</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow
                        key={submission.id}
                        className={`border-border hover:bg-accent/10 transition-colors ${
                          submission.suspicious ? 'bg-red-500/5' : ''
                        }`}
                      >
                        <TableCell>
                          <Badge variant={submission.type === 'practice' ? 'default' : 'secondary'}>
                            {submission.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>{submission.user.name}</div>
                          {submission.suspicious && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Plagiarism {submission.plagiarismScore}%
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {submission.type === 'practice' ? (
                            <div>
                              <div className="font-medium text-sm">{submission.question?.title}</div>
                              <div className="flex items-center gap-2 mt-1">
                                {getDifficultyBadge(submission.question?.difficulty)}
                                <span className="text-xs text-muted-foreground">
                                  Day {submission.question?.topicId}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="font-medium">{submission.test?.title}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          {submission.type === 'practice' ? (
                            <div>
                              {getStatusBadge(submission.status)}
                              <div className="text-xs text-muted-foreground mt-1">
                                {submission.passedTestCases}/{submission.totalTestCases} passed
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-bold text-primary text-lg">
                                {submission.score}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {submission.correctAnswers}/{submission.totalQuestions} correct
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {submission.type === 'practice' && (
                            <div className="text-xs space-y-1">
                              <div>⚡ {submission.runtime}ms ({submission.runtimeBeats}%)</div>
                              <div>💾 {submission.memory}KB ({submission.memoryBeats}%)</div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(submission.submittedAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:text-primary h-8 px-2"
                              onClick={() => handleViewDetails(submission.id, submission.type)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {submission.type === 'practice' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:text-primary h-8 px-2"
                                onClick={() => handleReevaluate(submission.id)}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:text-destructive h-8 px-2"
                              onClick={() => handleDelete(submission.id, submission.type)}
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
            )}
          </CardContent>
        </Card>

        {/* View Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl neon-text">Submission Details</DialogTitle>
              <DialogDescription>
                {selectedSubmission?.userId?.name} - {selectedSubmission && new Date(selectedSubmission.createdAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-bold">{selectedSubmission.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Test Cases</p>
                    <p className="font-bold">
                      {selectedSubmission.passedTestCases}/{selectedSubmission.totalTestCases}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Runtime</p>
                    <p className="font-bold">{selectedSubmission.runtime}ms</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Memory</p>
                    <p className="font-bold">{selectedSubmission.memory}KB</p>
                  </div>
                </div>
                {selectedSubmission.code && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Submitted Code</p>
                    <pre className="bg-background border border-border rounded p-4 overflow-x-auto text-sm">
                      <code>{selectedSubmission.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default SubmissionsManagement;
