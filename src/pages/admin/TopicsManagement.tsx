import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Edit, Trash2, Plus, RefreshCw, Eye, Lock, Unlock } from 'lucide-react';
import { studyDays } from '@/data/studyDays';

const TopicsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const filteredTopics = studyDays.filter((topic) => {
    const matchesSearch = topic.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWeek = selectedWeek === null || topic.week === selectedWeek;
    return matchesSearch && matchesWeek;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold neon-text mb-2">Topic Management</h1>
            <p className="text-muted-foreground">
              Manage all 112 DSA topics and their questions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-primary/50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate All AI Questions
            </Button>
            <Button className="neon-glow-strong">
              <Plus className="h-4 w-4 mr-2" />
              Add Topic
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm border-primary/30"
              />
              <div className="flex gap-2">
                <Button
                  variant={selectedWeek === null ? 'default' : 'outline'}
                  onClick={() => setSelectedWeek(null)}
                  size="sm"
                >
                  All Weeks
                </Button>
                {[1, 2, 3, 4, 5, 6, 7].map((week) => (
                  <Button
                    key={week}
                    variant={selectedWeek === week ? 'default' : 'outline'}
                    onClick={() => setSelectedWeek(week)}
                    size="sm"
                  >
                    Week {week}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topics Table */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>
              {filteredTopics.length} Topics
              {selectedWeek && ` in Week ${selectedWeek}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-accent/5">
                    <TableHead className="w-20">Day</TableHead>
                    <TableHead className="w-24">Week</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Compulsory Question</TableHead>
                    <TableHead className="w-28">Difficulty</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="text-right w-40">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTopics.map((topic) => (
                    <TableRow
                      key={topic.day}
                      className="border-border hover:bg-accent/10 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <span className="text-primary font-bold">Day {topic.day}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-primary/50">
                          Week {topic.week}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{topic.topic}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {topic.compulsoryQuestion}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            topic.difficulty === 'Easy'
                              ? 'default'
                              : topic.difficulty === 'Medium'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {topic.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                          <Unlock className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:text-primary"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:text-primary"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:text-destructive"
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
      </div>
    </AdminLayout>
  );
};

export default TopicsManagement;
