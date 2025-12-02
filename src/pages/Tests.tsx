import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavBar from '@/components/StudentNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, FileText, AlertCircle, Loader2, Play } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface Test {
  _id: string;
  title: string;
  description: string;
  duration: number;
  startTime: string;
  endTime: string;
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'archived';
  topics: number[];
  questions: any[];
  stats: {
    totalParticipants: number;
  };
  settings: {
    allowMultipleAttempts: boolean;
  };
}

const Tests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      // Fetch only live tests for students
      const response = await axios.get('http://localhost:5000/api/admin/tests?status=live', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTests(response.data.tests || []);
    } catch (error: any) {
      console.error('Error fetching tests:', error);
      toast.error('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (test: Test) => {
    const now = new Date();
    const startTime = new Date(test.startTime);
    const endTime = new Date(test.endTime);

    if (test.status === 'live' && now >= startTime && now <= endTime) {
      return (
        <Badge className="bg-green-500/20 text-green-500 border-green-500/50 neon-glow animate-pulse">
          🔴 Live Now
        </Badge>
      );
    } else if (now > endTime) {
      return <Badge variant="secondary">Closed</Badge>;
    } else if (now < startTime) {
      return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">Upcoming</Badge>;
    }
    return <Badge variant="outline">Available</Badge>;
  };

  const canTakeTest = (test: Test) => {
    const now = new Date();
    const startTime = new Date(test.startTime);
    const endTime = new Date(test.endTime);
    return test.status === 'live' && now >= startTime && now <= endTime;
  };

  const handleStartTest = (testId: string) => {
    // Navigate to test taking page
    navigate(`/test/${testId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentNavBar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold neon-text mb-2">Available Tests</h1>
          <p className="text-muted-foreground">
            Take tests to evaluate your learning progress
          </p>
        </div>

        {/* User Info */}
        {user && (
          <Card className="mb-6 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Badge variant="outline" className="text-primary">Student</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tests List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tests.length === 0 ? (
          <Card className="border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Tests Available</h3>
              <p className="text-muted-foreground">
                There are no active tests at the moment. Check back later!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {tests.map((test) => (
              <Card
                key={test._id}
                className={`border-primary/20 hover:border-primary/50 transition-all ${
                  canTakeTest(test) ? 'neon-glow' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">{test.title}</CardTitle>
                        {getStatusBadge(test)}
                      </div>
                      <p className="text-muted-foreground">{test.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-semibold">{test.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Questions</p>
                        <p className="font-semibold">{test.questions?.length || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Start Time</p>
                        <p className="font-semibold text-sm">
                          {new Date(test.startTime).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">End Time</p>
                        <p className="font-semibold text-sm">
                          {new Date(test.endTime).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Topics Covered */}
                  {test.topics && test.topics.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Topics Covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {test.topics.map((topicId) => (
                          <Badge key={topicId} variant="outline">
                            Day {topicId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      {test.stats?.totalParticipants || 0} participants
                    </div>
                    {canTakeTest(test) ? (
                      <Button
                        className="neon-glow-strong"
                        onClick={() => handleStartTest(test._id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Test
                      </Button>
                    ) : new Date() < new Date(test.startTime) ? (
                      <Button disabled variant="outline">
                        Test Not Started
                      </Button>
                    ) : (
                      <Button disabled variant="outline">
                        Test Closed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tests;
