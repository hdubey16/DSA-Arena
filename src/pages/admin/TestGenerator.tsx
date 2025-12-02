import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Plus,
  Play,
  Pause,
  Trash2,
  Users,
  Clock,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface Test {
  _id: string;
  title: string;
  description: string;
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'archived';
  topics: number[];
  questions: any[];
  duration: number;
  startTime: string;
  endTime: string;
  stats: {
    totalParticipants: number;
  };
  settings: {
    allowMultipleAttempts: boolean;
  };
}

const TestGenerator = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topics: [] as number[],
    startTime: '',
    endTime: '',
    duration: 90,
    questionsPerTopic: 5,
    easy: 2,
    medium: 2,
    hard: 1,
    plagiarismDetection: true,
    allowMultipleAttempts: false,
    hiddenTestCases: 5,
  });

  // Fetch all tests
  const fetchTests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://localhost:5000/api/admin/tests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTests(response.data.tests || []);
    } catch (error: any) {
      console.error('Error fetching tests:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch tests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate test
  const handleGenerateTest = async () => {
    try {
      // Validation
      if (!formData.title.trim()) {
        toast.error('Test name is required');
        return;
      }

      if (formData.topics.length === 0) {
        toast.error('Please select at least one topic');
        return;
      }

      if (!formData.startTime || !formData.endTime) {
        toast.error('Please set start and end times');
        return;
      }

      setIsGenerating(true);
      const token = localStorage.getItem('auth_token');

      const payload = {
        title: formData.title,
        description: formData.description || `Assessment for Days ${formData.topics.join(', ')}`,
        topics: formData.topics,
        questionsPerTopic: formData.questionsPerTopic,
        difficultyDistribution: {
          easy: formData.easy,
          medium: formData.medium,
          hard: formData.hard,
        },
        duration: formData.duration,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        settings: {
          allowMultipleAttempts: formData.allowMultipleAttempts,
          maxAttempts: 1,
          showResults: true,
          showSolutions: false,
          shuffleQuestions: true,
          shuffleOptions: false,
          passingScore: 60,
          penaltyForHints: 0,
        },
        hiddenTestCases: true,
        testCaseCount: formData.hiddenTestCases,
      };

      const response = await axios.post(
        'http://localhost:5000/api/admin/tests',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Test created with ${response.data.questionsCount} questions!`);
      setIsCreateDialogOpen(false);
      fetchTests();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        topics: [],
        startTime: '',
        endTime: '',
        duration: 90,
        questionsPerTopic: 5,
        easy: 2,
        medium: 2,
        hard: 1,
        plagiarismDetection: true,
        allowMultipleAttempts: false,
        hiddenTestCases: 5,
      });
    } catch (error: any) {
      console.error('Error generating test:', error);
      console.error('Full error:', error.response?.data);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Failed to generate test';
      toast.error(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  // Go Live
  const handleGoLive = async (testId: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(
        `http://localhost:5000/api/admin/tests/${testId}/go-live`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Test is now LIVE!');
      fetchTests();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to make test live');
    }
  };

  // End Test
  const handleEndTest = async (testId: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(
        `http://localhost:5000/api/admin/tests/${testId}/end`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Test ended successfully');
      fetchTests();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to end test');
    }
  };

  // Delete Test
  const handleDeleteTest = async (testId: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;
    
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(
        `http://localhost:5000/api/admin/tests/${testId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Test deleted successfully');
      fetchTests();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete test');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/50 neon-glow">Live</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">Scheduled</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">Draft</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return null;
    }
  };

  // Toggle topic selection
  const toggleTopic = (day: number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(day)
        ? prev.topics.filter(d => d !== day)
        : [...prev.topics, day].sort((a, b) => a - b)
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold neon-text mb-2">Test Generator</h1>
            <p className="text-muted-foreground">
              Create and manage assessments from practice questions
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="neon-glow-strong">
                <Plus className="h-4 w-4 mr-2" />
                Create New Test
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl neon-text">Create New Test</DialogTitle>
                <DialogDescription>
                  Configure test settings and select questions from practice pool
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="testName">Test Name *</Label>
                  <Input 
                    id="testName" 
                    placeholder="e.g., Week 3 Assessment" 
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Test description..." 
                    rows={3} 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input 
                      id="startTime" 
                      type="datetime-local" 
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input 
                      id="endTime" 
                      type="datetime-local" 
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    placeholder="90" 
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Topics (Days) *</Label>
                  <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 112 }, (_, i) => i + 1).map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={formData.topics.includes(day) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTopic(day)}
                          className={formData.topics.includes(day) ? "neon-glow" : ""}
                        >
                          Day {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {formData.topics.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Selected: Days {formData.topics.join(', ')}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionCount">Questions per Topic *</Label>
                  <Input 
                    id="questionCount" 
                    type="number" 
                    placeholder="5" 
                    value={formData.questionsPerTopic}
                    onChange={(e) => handleInputChange('questionsPerTopic', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Difficulty Distribution</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="easy" className="text-sm text-muted-foreground">Easy</Label>
                      <Input 
                        id="easy" 
                        type="number" 
                        placeholder="2" 
                        value={formData.easy}
                        onChange={(e) => handleInputChange('easy', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="medium" className="text-sm text-muted-foreground">Medium</Label>
                      <Input 
                        id="medium" 
                        type="number" 
                        placeholder="2" 
                        value={formData.medium}
                        onChange={(e) => handleInputChange('medium', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hard" className="text-sm text-muted-foreground">Hard</Label>
                      <Input 
                        id="hard" 
                        type="number" 
                        placeholder="1" 
                        value={formData.hard}
                        onChange={(e) => handleInputChange('hard', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="font-semibold text-primary">Test Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Plagiarism Detection</Label>
                      <p className="text-sm text-muted-foreground">
                        Auto-check code similarity
                      </p>
                    </div>
                    <Switch 
                      checked={formData.plagiarismDetection}
                      onCheckedChange={(checked) => handleInputChange('plagiarismDetection', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Multiple Attempts</Label>
                      <p className="text-sm text-muted-foreground">
                        Students can retake test
                      </p>
                    </div>
                    <Switch 
                      checked={formData.allowMultipleAttempts}
                      onCheckedChange={(checked) => handleInputChange('allowMultipleAttempts', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hiddenTests">Hidden Test Cases Count</Label>
                  <Input 
                    id="hiddenTests" 
                    type="number" 
                    placeholder="5" 
                    value={formData.hiddenTestCases}
                    onChange={(e) => handleInputChange('hiddenTestCases', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="neon-glow-strong" 
                  onClick={handleGenerateTest}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Test'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tests Table */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>All Tests ({tests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : tests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No tests created yet. Click "Create New Test" to get started.
              </div>
            ) : (
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-accent/5">
                      <TableHead>Test Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tests.map((test) => (
                      <TableRow
                        key={test._id}
                        className="border-border hover:bg-accent/10 transition-colors"
                      >
                        <TableCell className="font-medium">{test.title}</TableCell>
                        <TableCell>{getStatusBadge(test.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{test.questions?.length || 0} Questions</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{test.stats?.totalParticipants || 0}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(test.startTime).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{test.duration}m</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            {(test.status === 'draft' || test.status === 'scheduled') && (
                              <Button
                                size="sm"
                                className="neon-glow bg-green-500 hover:bg-green-600"
                                onClick={() => handleGoLive(test._id)}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                GO LIVE
                              </Button>
                            )}
                            {test.status === 'live' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleEndTest(test._id)}
                              >
                                <Pause className="h-4 w-4 mr-1" />
                                End Test
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:text-destructive"
                              onClick={() => handleDeleteTest(test._id)}
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
      </div>
    </AdminLayout>
  );
};

export default TestGenerator;
