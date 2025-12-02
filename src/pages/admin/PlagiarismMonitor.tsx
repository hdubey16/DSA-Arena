import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertTriangle, CheckCircle, XCircle, Eye, FileCode } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PlagiarismCase {
  id: string;
  user1: string;
  user2: string;
  testName: string;
  similarityScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  detectionMethod: string;
  detectedAt: string;
  reviewed: boolean;
  falsePositive: boolean;
}

const PlagiarismMonitor = () => {
  const cases: PlagiarismCase[] = [
    {
      id: '1',
      user1: 'Jane Smith',
      user2: 'Mike Johnson',
      testName: 'Week 2 Assessment',
      similarityScore: 87,
      riskLevel: 'critical',
      detectionMethod: 'AST Matching',
      detectedAt: '2025-11-22T10:45:00',
      reviewed: false,
      falsePositive: false,
    },
    {
      id: '2',
      user1: 'Tom Brown',
      user2: 'Sarah Williams',
      testName: 'OOP Finals',
      similarityScore: 65,
      riskLevel: 'high',
      detectionMethod: 'Code Similarity',
      detectedAt: '2025-11-22T11:00:00',
      reviewed: true,
      falsePositive: false,
    },
    {
      id: '3',
      user1: 'John Doe',
      user2: 'Emily Davis',
      testName: 'Arrays Quiz',
      similarityScore: 42,
      riskLevel: 'medium',
      detectionMethod: 'Hash Signature',
      detectedAt: '2025-11-22T11:15:00',
      reviewed: true,
      falsePositive: true,
    },
  ];

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return <Badge variant="destructive" className="neon-glow">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/50">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/50">Low</Badge>;
    }
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return 'text-red-500';
    if (score >= 60) return 'text-orange-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold neon-text mb-2">Plagiarism Monitor</h1>
            <p className="text-muted-foreground">
              AI-powered code similarity detection and analysis
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-red-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">1</div>
              <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                High Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">1</div>
              <p className="text-xs text-muted-foreground mt-1">Under review</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reviewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">2</div>
              <p className="text-xs text-muted-foreground mt-1">Cases resolved</p>
            </CardContent>
          </Card>

          <Card className="border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                False Positives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1</div>
              <p className="text-xs text-muted-foreground mt-1">Marked as safe</p>
            </CardContent>
          </Card>
        </div>

        {/* Plagiarism Cases Table */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Detected Cases ({cases.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-accent/5">
                    <TableHead>Users</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Similarity</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Detection Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((caseItem) => (
                    <TableRow
                      key={caseItem.id}
                      className={`border-border hover:bg-accent/10 transition-colors ${
                        caseItem.riskLevel === 'critical' && !caseItem.reviewed
                          ? 'bg-red-500/5'
                          : ''
                      }`}
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{caseItem.user1}</div>
                          <div className="text-sm text-muted-foreground">vs</div>
                          <div className="font-medium">{caseItem.user2}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {caseItem.testName}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className={`text-2xl font-bold ${getSimilarityColor(caseItem.similarityScore)}`}>
                            {caseItem.similarityScore}%
                          </div>
                          <Progress value={caseItem.similarityScore} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{getRiskBadge(caseItem.riskLevel)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          <FileCode className="h-3 w-3 mr-1" />
                          {caseItem.detectionMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {caseItem.reviewed ? (
                          caseItem.falsePositive ? (
                            <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">
                              <XCircle className="h-3 w-3 mr-1" />
                              False Positive
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Reviewed
                            </Badge>
                          )
                        ) : (
                          <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(caseItem.detectedAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:text-primary"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Compare
                          </Button>
                          {!caseItem.reviewed && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:text-green-500"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Safe
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:text-destructive"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                            </>
                          )}
                        </div>
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

export default PlagiarismMonitor;
