import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  PlayCircle, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  StopCircle, 
  Eye,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

const NEON_GREEN = '#00ff00';

interface Test {
  _id: string;
  title: string;
  description: string;
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'archived';
  topics: string[];
  questionsPerTopic: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  duration: number;
  startTime: Date;
  endTime: Date;
  proctoring: {
    enabled: boolean;
    cameraRequired: boolean;
    screenRecording: boolean;
    faceDetection: boolean;
    soundDetection: boolean;
    tabSwitchLimit: number;
  };
  settings: {
    allowMultipleAttempts: boolean;
    maxAttempts?: number;
    showResults: boolean;
    shuffleQuestions: boolean;
    passingScore: number;
  };
  stats?: {
    totalParticipants: number;
    plagiarismAlerts: number;
    averageScore: number;
  };
}

const TestGenerator = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topics: [] as number[],
    questionsPerTopic: 5,
    difficultyEasy: 40,
    difficultyMedium: 40,
    difficultyHard: 20,
    duration: 120,
    startTime: '',
    endTime: '',
    proctoringEnabled: true,
    cameraRequired: true,
    screenRecording: true,
    faceDetection: true,
    soundDetection: false,
    tabSwitchLimit: 3,
    allowMultipleAttempts: false,
    maxAttempts: 1,
    showResults: true,
    shuffleQuestions: true,
    passingScore: 60,
  });

  useEffect(() => {
    fetchTests();
  }, [filterStatus]);

  const fetchTests = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const params = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
      const response = await fetch(`http://localhost:5000/api/admin/tests${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setTests(data.tests || []);
    } catch (error) {
      toast.error('Failed to fetch tests');
    }
  };

  const handleCreateTest = async () => {
    if (!formData.title || formData.topics.length === 0) {
      toast.error('Please provide title and select at least one topic');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const testData = {
        title: formData.title,
        description: formData.description,
        topics: formData.topics,
        questionsPerTopic: formData.questionsPerTopic,
        difficultyDistribution: {
          easy: formData.difficultyEasy,
          medium: formData.difficultyMedium,
          hard: formData.difficultyHard,
        },
        duration: formData.duration,
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
        proctoring: {
          enabled: formData.proctoringEnabled,
          cameraRequired: formData.cameraRequired,
          screenRecording: formData.screenRecording,
          faceDetection: formData.faceDetection,
          soundDetection: formData.soundDetection,
          tabSwitchLimit: formData.tabSwitchLimit,
          ipChangeAllowed: false,
        },
        settings: {
          allowMultipleAttempts: formData.allowMultipleAttempts,
          maxAttempts: formData.maxAttempts,
          showResults: formData.showResults,
          shuffleQuestions: formData.shuffleQuestions,
          passingScore: formData.passingScore,
          penaltyForHints: 5,
        },
      };

      const url = editingTest 
        ? `http://localhost:5000/api/admin/tests/${editingTest._id}`
        : 'http://localhost:5000/api/admin/tests';
      
      const response = await fetch(url, {
        method: editingTest ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(testData),
      });

      if (response.ok) {
        toast.success(editingTest ? 'Test updated successfully' : 'Test created successfully');
        setIsCreateDialogOpen(false);
        resetForm();
        fetchTests();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to save test');
      }
    } catch (error) {
      toast.error('Error saving test');
    } finally {
      setLoading(false);
    }
  };

  const handleGoLive = async (testId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/admin/tests/${testId}/go-live`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('🚀 Test is now LIVE!', {
          description: 'Students can now access this test',
          duration: 5000,
        });
        fetchTests();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to go live');
      }
    } catch (error) {
      toast.error('Error making test live');
    } finally {
      setLoading(false);
    }
  };

  const handleEndTest = async (testId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/admin/tests/${testId}/end`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('Test ended successfully');
        fetchTests();
      } else {
        toast.error('Failed to end test');
      }
    } catch (error) {
      toast.error('Error ending test');
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (testId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/admin/tests/${testId}/duplicate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('Test duplicated successfully');
        fetchTests();
      } else {
        toast.error('Failed to duplicate test');
      }
    } catch (error) {
      toast.error('Error duplicating test');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (testId: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/admin/tests/${testId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('Test deleted successfully');
        fetchTests();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete test');
      }
    } catch (error) {
      toast.error('Error deleting test');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (test: Test) => {
    setEditingTest(test);
    setFormData({
      title: test.title,
      description: test.description,
      topics: test.topics.map(t => parseInt(t)),
      questionsPerTopic: test.questionsPerTopic,
      difficultyEasy: test.difficultyDistribution.easy,
      difficultyMedium: test.difficultyDistribution.medium,
      difficultyHard: test.difficultyDistribution.hard,
      duration: test.duration,
      startTime: new Date(test.startTime).toISOString().slice(0, 16),
      endTime: new Date(test.endTime).toISOString().slice(0, 16),
      proctoringEnabled: test.proctoring.enabled,
      cameraRequired: test.proctoring.cameraRequired,
      screenRecording: test.proctoring.screenRecording,
      faceDetection: test.proctoring.faceDetection,
      soundDetection: test.proctoring.soundDetection,
      tabSwitchLimit: test.proctoring.tabSwitchLimit,
      allowMultipleAttempts: test.settings.allowMultipleAttempts,
      maxAttempts: test.settings.maxAttempts || 1,
      showResults: test.settings.showResults,
      shuffleQuestions: test.settings.shuffleQuestions,
      passingScore: test.settings.passingScore,
    });
    setIsCreateDialogOpen(true);
  };

  const resetForm = () => {
    setEditingTest(null);
    setFormData({
      title: '',
      description: '',
      topics: [],
      questionsPerTopic: 5,
      difficultyEasy: 40,
      difficultyMedium: 40,
      difficultyHard: 20,
      duration: 120,
      startTime: '',
      endTime: '',
      proctoringEnabled: true,
      cameraRequired: true,
      screenRecording: true,
      faceDetection: true,
      soundDetection: false,
      tabSwitchLimit: 3,
      allowMultipleAttempts: false,
      maxAttempts: 1,
      showResults: true,
      shuffleQuestions: true,
      passingScore: 60,
    });
  };

  const toggleTopic = (day: number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(day)
        ? prev.topics.filter(t => t !== day)
        : [...prev.topics, day].sort((a, b) => a - b)
    }));
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
      scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      live: 'bg-green-500/20 text-green-400 border-green-500/50 animate-pulse',
      completed: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      archived: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    };
    return (
      <Badge className={`${styles[status as keyof typeof styles]} border`}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold neon-text">Test Generator</h2>
          <p className="text-muted-foreground mt-1">Create and manage tests with GO LIVE functionality</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,0,0.5)]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="neon-text text-2xl">
                {editingTest ? 'Edit Test' : 'Create New Test'}
              </DialogTitle>
              <DialogDescription>
                Configure test settings, select topics, and proctoring options
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Test Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Mid-Term Assessment"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Test description and instructions"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              {/* Topic Selection */}
              <div>
                <Label>Select Topics (Days) *</Label>
                <div className="grid grid-cols-10 gap-2 mt-2 max-h-48 overflow-y-auto p-2 border border-border rounded-lg">
                  {Array.from({ length: 39 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleTopic(day)}
                      className={`p-2 rounded border transition-all ${
                        formData.topics.includes(day)
                          ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(0,255,0,0.3)]'
                          : 'bg-background border-border hover:border-primary/50'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Selected: {formData.topics.length} topics
                </p>
              </div>

              {/* Test Configuration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="questionsPerTopic">Questions per Topic</Label>
                  <Input
                    id="questionsPerTopic"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.questionsPerTopic}
                    onChange={(e) => setFormData({ ...formData, questionsPerTopic: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Difficulty Distribution */}
              <div>
                <Label>Difficulty Distribution (%)</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label htmlFor="easy" className="text-green-500">Easy</Label>
                    <Input
                      id="easy"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.difficultyEasy}
                      onChange={(e) => setFormData({ ...formData, difficultyEasy: parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medium" className="text-yellow-500">Medium</Label>
                    <Input
                      id="medium"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.difficultyMedium}
                      onChange={(e) => setFormData({ ...formData, difficultyMedium: parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hard" className="text-red-500">Hard</Label>
                    <Input
                      id="hard"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.difficultyHard}
                      onChange={(e) => setFormData({ ...formData, difficultyHard: parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total: {formData.difficultyEasy + formData.difficultyMedium + formData.difficultyHard}% 
                  {(formData.difficultyEasy + formData.difficultyMedium + formData.difficultyHard) !== 100 && (
                    <span className="text-red-500"> (should be 100%)</span>
                  )}
                </p>
              </div>

              {/* Time Window */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Proctoring Settings */}
              <div>
                <Label className="text-lg font-semibold">Proctoring Settings</Label>
                <div className="space-y-3 mt-2 p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="proctoringEnabled">Enable Proctoring</Label>
                    <Switch
                      id="proctoringEnabled"
                      checked={formData.proctoringEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, proctoringEnabled: checked })}
                    />
                  </div>
                  {formData.proctoringEnabled && (
                    <>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="cameraRequired">Camera Required</Label>
                        <Switch
                          id="cameraRequired"
                          checked={formData.cameraRequired}
                          onCheckedChange={(checked) => setFormData({ ...formData, cameraRequired: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="screenRecording">Screen Recording</Label>
                        <Switch
                          id="screenRecording"
                          checked={formData.screenRecording}
                          onCheckedChange={(checked) => setFormData({ ...formData, screenRecording: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="faceDetection">Face Detection</Label>
                        <Switch
                          id="faceDetection"
                          checked={formData.faceDetection}
                          onCheckedChange={(checked) => setFormData({ ...formData, faceDetection: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="soundDetection">Sound Detection</Label>
                        <Switch
                          id="soundDetection"
                          checked={formData.soundDetection}
                          onCheckedChange={(checked) => setFormData({ ...formData, soundDetection: checked })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tabSwitchLimit">Tab Switch Limit</Label>
                        <Input
                          id="tabSwitchLimit"
                          type="number"
                          min="0"
                          value={formData.tabSwitchLimit}
                          onChange={(e) => setFormData({ ...formData, tabSwitchLimit: parseInt(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Test Settings */}
              <div>
                <Label className="text-lg font-semibold">Test Settings</Label>
                <div className="space-y-3 mt-2 p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowMultipleAttempts">Allow Multiple Attempts</Label>
                    <Switch
                      id="allowMultipleAttempts"
                      checked={formData.allowMultipleAttempts}
                      onCheckedChange={(checked) => setFormData({ ...formData, allowMultipleAttempts: checked })}
                    />
                  </div>
                  {formData.allowMultipleAttempts && (
                    <div>
                      <Label htmlFor="maxAttempts">Max Attempts</Label>
                      <Input
                        id="maxAttempts"
                        type="number"
                        min="1"
                        value={formData.maxAttempts}
                        onChange={(e) => setFormData({ ...formData, maxAttempts: parseInt(e.target.value) })}
                        className="mt-1"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showResults">Show Results After Submission</Label>
                    <Switch
                      id="showResults"
                      checked={formData.showResults}
                      onCheckedChange={(checked) => setFormData({ ...formData, showResults: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="shuffleQuestions">Shuffle Questions</Label>
                    <Switch
                      id="shuffleQuestions"
                      checked={formData.shuffleQuestions}
                      onCheckedChange={(checked) => setFormData({ ...formData, shuffleQuestions: checked })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passingScore">Passing Score (%)</Label>
                    <Input
                      id="passingScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.passingScore}
                      onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleCreateTest}
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {loading ? 'Saving...' : editingTest ? 'Update Test' : 'Create Test'}
                </Button>
                <Button
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}
                  variant="outline"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'draft', 'scheduled', 'live', 'completed', 'archived'].map((status) => (
          <Button
            key={status}
            onClick={() => setFilterStatus(status)}
            variant={filterStatus === status ? 'default' : 'outline'}
            size="sm"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tests List */}
      <div className="grid grid-cols-1 gap-4">
        {tests.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No tests found. Create your first test!</p>
          </Card>
        ) : (
          tests.map((test) => (
            <Card key={test._id} className="p-6 hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{test.title}</h3>
                    {getStatusBadge(test.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Topics</p>
                      <p className="font-semibold">{test.topics.length} days</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-semibold">{test.duration} min</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Questions</p>
                      <p className="font-semibold">{test.topics.length * test.questionsPerTopic}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Participants</p>
                      <p className="font-semibold">{test.stats?.totalParticipants || 0}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 text-xs">
                    {test.proctoring.enabled && (
                      <Badge variant="outline" className="text-orange-500 border-orange-500/50">
                        <Eye className="h-3 w-3 mr-1" />
                        Proctored
                      </Badge>
                    )}
                    {test.stats && test.stats.plagiarismAlerts > 0 && (
                      <Badge variant="outline" className="text-red-500 border-red-500/50">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {test.stats.plagiarismAlerts} alerts
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {test.status === 'draft' && (
                    <Button
                      onClick={() => handleGoLive(test._id)}
                      disabled={loading}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-[0_0_20px_rgba(0,255,0,0.5)] font-bold"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      GO LIVE
                    </Button>
                  )}
                  {test.status === 'live' && (
                    <Button
                      onClick={() => handleEndTest(test._id)}
                      disabled={loading}
                      variant="destructive"
                    >
                      <StopCircle className="mr-2 h-4 w-4" />
                      End Test
                    </Button>
                  )}
                  {test.status !== 'live' && (
                    <>
                      <Button
                        onClick={() => handleEdit(test)}
                        disabled={loading}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDuplicate(test._id)}
                        disabled={loading}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(test._id)}
                        disabled={loading}
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TestGenerator;
