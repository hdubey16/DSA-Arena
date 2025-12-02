import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Edit, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Eye,
  Code,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface Topic {
  _id: string;
  dayId: number;
  title: string;
  description: string;
  difficulty: string;
  starterCode: string;
  solution: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }>;
  isLocked: boolean;
  practiceQuestionsCount?: number;
}

const TopicManagement = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Form state for editing
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    starterCode: '',
    solution: '',
    testCases: [] as Array<{
      input: string;
      expectedOutput: string;
      isHidden: boolean;
    }>,
  });

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/admin/days', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setTopics(data.days || []);
    } catch (error) {
      toast.error('Failed to fetch topics');
    }
  };

  const handleEditTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setFormData({
      title: topic.title,
      description: topic.description,
      difficulty: topic.difficulty,
      starterCode: topic.starterCode,
      solution: topic.solution,
      testCases: topic.testCases,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveTopic = async () => {
    if (!selectedTopic) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/admin/days/${selectedTopic.dayId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Topic updated successfully');
        setIsEditDialogOpen(false);
        fetchTopics();
      } else {
        toast.error('Failed to update topic');
      }
    } catch (error) {
      toast.error('Error updating topic');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLock = async (dayId: number, currentLockState: boolean) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/admin/days/${dayId}/lock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isLocked: !currentLockState }),
      });

      if (response.ok) {
        toast.success(`Topic ${!currentLockState ? 'locked' : 'unlocked'} successfully`);
        fetchTopics();
      } else {
        toast.error('Failed to update lock status');
      }
    } catch (error) {
      toast.error('Error updating lock status');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateAI = async (dayId: number) => {
    if (!confirm('This will regenerate all AI practice questions for this topic. Continue?')) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/admin/days/${dayId}/regenerate-ai`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('🤖 AI questions regenerated successfully', {
          description: '4 new practice questions have been created',
          duration: 5000,
        });
        fetchTopics();
      } else {
        toast.error('Failed to regenerate AI questions');
      }
    } catch (error) {
      toast.error('Error regenerating questions');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateAllAI = async () => {
    if (!confirm('This will regenerate ALL AI practice questions for ALL 39 topics. This may take several minutes. Continue?')) return;

    setLoading(true);
    toast.info('Starting AI regeneration...', {
      description: 'This may take 5-10 minutes',
    });

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/admin/days/regenerate-all-ai', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('✨ All AI questions regenerated!', {
          description: '156 practice questions created (4 per topic)',
          duration: 7000,
        });
        fetchTopics();
      } else {
        toast.error('Failed to regenerate all questions');
      }
    } catch (error) {
      toast.error('Error regenerating questions');
    } finally {
      setLoading(false);
    }
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [
        ...formData.testCases,
        { input: '', expectedOutput: '', isHidden: false }
      ]
    });
  };

  const updateTestCase = (index: number, field: string, value: string | boolean) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index] = { ...newTestCases[index], [field]: value };
    setFormData({ ...formData, testCases: newTestCases });
  };

  const removeTestCase = (index: number) => {
    setFormData({
      ...formData,
      testCases: formData.testCases.filter((_, i) => i !== index)
    });
  };

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.dayId.toString().includes(searchTerm);
    const matchesDifficulty = filterDifficulty === 'all' || topic.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'text-green-500 border-green-500/50 bg-green-500/10',
      medium: 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10',
      hard: 'text-red-500 border-red-500/50 bg-red-500/10',
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold neon-text">Topic Management</h2>
          <p className="text-muted-foreground mt-1">Edit compulsory questions and regenerate AI practice questions</p>
        </div>
        <Button
          onClick={handleRegenerateAllAI}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-[0_0_20px_rgba(147,51,234,0.5)]"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Regenerate All AI Questions
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search by day number or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
            <Button
              key={difficulty}
              onClick={() => setFilterDifficulty(difficulty)}
              variant={filterDifficulty === difficulty ? 'default' : 'outline'}
              size="sm"
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => (
          <Card key={topic._id} className="p-6 hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="neon-text border-primary">
                  Day {topic.dayId}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                  {topic.difficulty}
                </Badge>
              </div>
              {topic.isLocked ? (
                <Lock className="h-4 w-4 text-red-500" />
              ) : (
                <Unlock className="h-4 w-4 text-green-500" />
              )}
            </div>

            <h3 className="font-bold text-lg mb-2 line-clamp-2">{topic.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{topic.description}</p>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                <span>{topic.testCases?.filter(tc => !tc.isHidden).length || 0} visible tests</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-orange-500" />
                <span>{topic.testCases?.filter(tc => tc.isHidden).length || 0} hidden tests</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleEditTopic(topic)}
                disabled={loading}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                onClick={() => handleRegenerateAI(topic.dayId)}
                disabled={loading}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Regen AI
              </Button>
              <Button
                onClick={() => handleToggleLock(topic.dayId, topic.isLocked)}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {topic.isLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="neon-text text-2xl">
              Edit Day {selectedTopic?.dayId} - Compulsory Question
            </DialogTitle>
            <DialogDescription>
              Modify the main compulsory question for this topic
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Question Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 font-mono"
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="mt-1 w-full p-2 bg-background border border-border rounded-md"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Code Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="starterCode">Starter Code (Java)</Label>
                <Textarea
                  id="starterCode"
                  value={formData.starterCode}
                  onChange={(e) => setFormData({ ...formData, starterCode: e.target.value })}
                  className="mt-1 font-mono text-sm"
                  rows={12}
                />
              </div>
              <div>
                <Label htmlFor="solution">Solution Code</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="mt-1 font-mono text-sm"
                  rows={12}
                />
              </div>
            </div>

            {/* Test Cases */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-lg font-semibold">Test Cases</Label>
                <Button onClick={addTestCase} size="sm" variant="outline">
                  Add Test Case
                </Button>
              </div>
              <div className="space-y-4">
                {formData.testCases.map((testCase, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label htmlFor={`input-${index}`}>Input</Label>
                          <Textarea
                            id={`input-${index}`}
                            value={testCase.input}
                            onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                            className="mt-1 font-mono text-sm"
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`output-${index}`}>Expected Output</Label>
                          <Textarea
                            id={`output-${index}`}
                            value={testCase.expectedOutput}
                            onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                            className="mt-1 font-mono text-sm"
                            rows={2}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`hidden-${index}`}
                            checked={testCase.isHidden}
                            onChange={(e) => updateTestCase(index, 'isHidden', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor={`hidden-${index}`}>Hidden Test Case</Label>
                        </div>
                      </div>
                      <Button
                        onClick={() => removeTestCase(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleSaveTopic}
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                onClick={() => setIsEditDialogOpen(false)}
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
  );
};

export default TopicManagement;
