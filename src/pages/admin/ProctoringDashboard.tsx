import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertTriangle, Video, Monitor, Volume2, Wifi } from 'lucide-react';

interface ProctoringSession {
  id: string;
  user: string;
  testName: string;
  status: 'active' | 'completed' | 'flagged';
  duration: string;
  flags: {
    tabSwitches: number;
    faceNotDetected: number;
    multiplePersons: number;
    noiseDetected: number;
    ipChange: boolean;
  };
  webcamSnapshot: string;
  startedAt: string;
}

const ProctoringDashboard = () => {
  const sessions: ProctoringSession[] = [
    {
      id: '1',
      user: 'John Doe',
      testName: 'Week 2 Assessment',
      status: 'active',
      duration: '45:23',
      flags: {
        tabSwitches: 2,
        faceNotDetected: 0,
        multiplePersons: 0,
        noiseDetected: 1,
        ipChange: false,
      },
      webcamSnapshot: 'https://via.placeholder.com/200x150',
      startedAt: '2025-11-22T10:00:00',
    },
    {
      id: '2',
      user: 'Jane Smith',
      testName: 'Week 2 Assessment',
      status: 'flagged',
      duration: '38:15',
      flags: {
        tabSwitches: 8,
        faceNotDetected: 12,
        multiplePersons: 2,
        noiseDetected: 4,
        ipChange: true,
      },
      webcamSnapshot: 'https://via.placeholder.com/200x150',
      startedAt: '2025-11-22T10:05:00',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/50 neon-glow">Live</Badge>;
      case 'flagged':
        return <Badge variant="destructive" className="neon-glow">Flagged</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
    }
  };

  const getTotalFlags = (flags: ProctoringSession['flags']) => {
    return flags.tabSwitches + flags.faceNotDetected + flags.multiplePersons + flags.noiseDetected + (flags.ipChange ? 1 : 0);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold neon-text mb-2">Proctoring Dashboard</h1>
            <p className="text-muted-foreground">
              Live monitoring and recording sessions
            </p>
          </div>
          <Badge className="text-lg px-4 py-2 neon-glow">
            <Eye className="h-5 w-5 mr-2" />
            {sessions.filter(s => s.status === 'active').length} Live Sessions
          </Badge>
        </div>

        {/* Active Sessions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className={`border-primary/20 ${
                session.status === 'flagged' ? 'border-red-500/50 bg-red-500/5' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{session.user}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{session.testName}</p>
                  </div>
                  {getStatusBadge(session.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Webcam Feed */}
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-border">
                    <img
                      src={session.webcamSnapshot}
                      alt="Webcam feed"
                      className="w-full h-full object-cover"
                    />
                    {session.status === 'active' && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-red-500 text-white animate-pulse">
                          <div className="h-2 w-2 bg-white rounded-full mr-2" />
                          REC
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-mono font-bold text-primary text-lg">
                      {session.duration}
                    </span>
                  </div>

                  {/* Flags Summary */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Suspicious Activity:</span>
                      <Badge
                        variant={getTotalFlags(session.flags) > 5 ? 'destructive' : 'outline'}
                        className={getTotalFlags(session.flags) > 5 ? 'neon-glow' : ''}
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {getTotalFlags(session.flags)} flags
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between p-2 bg-card/50 rounded border border-border">
                        <span className="text-muted-foreground">Tab Switches</span>
                        <Badge variant={session.flags.tabSwitches > 3 ? 'destructive' : 'outline'} className="text-xs">
                          {session.flags.tabSwitches}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-card/50 rounded border border-border">
                        <span className="text-muted-foreground">Face Lost</span>
                        <Badge variant={session.flags.faceNotDetected > 5 ? 'destructive' : 'outline'} className="text-xs">
                          {session.flags.faceNotDetected}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-card/50 rounded border border-border">
                        <span className="text-muted-foreground">Multiple Persons</span>
                        <Badge variant={session.flags.multiplePersons > 0 ? 'destructive' : 'outline'} className="text-xs">
                          {session.flags.multiplePersons}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-card/50 rounded border border-border">
                        <span className="text-muted-foreground">Noise Alerts</span>
                        <Badge variant={session.flags.noiseDetected > 2 ? 'destructive' : 'outline'} className="text-xs">
                          {session.flags.noiseDetected}
                        </Badge>
                      </div>
                    </div>

                    {session.flags.ipChange && (
                      <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/50 rounded">
                        <Wifi className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-500 font-medium">IP Address Changed</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Video className="h-4 w-4 mr-2" />
                      Recording
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Monitor className="h-4 w-4 mr-2" />
                      Screen
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Volume2 className="h-4 w-4 mr-2" />
                      Audio
                    </Button>
                  </div>

                  {session.status === 'active' && getTotalFlags(session.flags) > 5 && (
                    <Button variant="destructive" className="w-full">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Terminate Session
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProctoringDashboard;
