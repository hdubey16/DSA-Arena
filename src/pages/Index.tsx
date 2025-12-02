import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Code2, Trophy, Zap, Shield } from "lucide-react";
import StudentNavBar from "@/components/StudentNavBar";
import { RetroGrid } from "@/components/ui/retro-grid";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/topics");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Full Page RetroGrid Background */}
      <div className="fixed inset-0 z-0 opacity-70">
        <RetroGrid angle={65} />
      </div>
      
      <div className="relative z-10">
        <StudentNavBar />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial opacity-50" />
          <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 neon-text animate-flicker">
              DSA Arena
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Master Data Structures & Algorithms in Java. 112-day structured curriculum. Battle-tested DSA problems. Hidden test cases. LeetCode-style evaluation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="text-lg px-8 py-6 neon-glow-strong hover:scale-105 transition-transform"
              >
                <Code2 className="mr-2 h-5 w-5" />
                {isAuthenticated ? "Continue Learning" : "Get Started"}
              </Button>
            </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in">
            <div className="mb-4">
              <Zap className="h-12 w-12 text-primary group-hover:animate-glow-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              Practice Mode
            </h3>
            <p className="text-muted-foreground">
              5 curated questions per topic. 4 AI-generated practice problems plus 1 compulsory challenge. Unlimited attempts.
            </p>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="mb-4">
              <Trophy className="h-12 w-12 text-primary group-hover:animate-glow-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              Test Mode
            </h3>
            <p className="text-muted-foreground">
              Admin-controlled assessments with AI-generated questions. Hidden test cases. Time limits. Anti-copy measures.
            </p>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="mb-4">
              <Shield className="h-12 w-12 text-primary group-hover:animate-glow-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              Secure Evaluation
            </h3>
            <p className="text-muted-foreground">
              LeetCode-style hidden test cases. Plagiarism detection. Optional proctoring. Professional code sandbox execution.
            </p>
          </Card>
        </div>
      </div>

      {/* Learning Path Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">16-Week DSA Mastery Path</h2>
          <p className="text-muted-foreground text-lg">Comprehensive curriculum covering all major data structures and algorithms</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Week 1-2 */}
          <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in">
            <div className="mb-3">
              <Badge className="mb-2">Week 1-2</Badge>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Fundamentals</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Analysis, Mathematics, Bit Magic, Recursion
            </p>
            <div className="text-xs text-muted-foreground">
              Days 1-14 • 14 Topics
            </div>
          </Card>

          {/* Week 3-4 */}
          <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="mb-3">
              <Badge className="mb-2">Week 3-4</Badge>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Arrays & Sorting</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Arrays, Searching, Sorting algorithms
            </p>
            <div className="text-xs text-muted-foreground">
              Days 15-28 • 14 Topics
            </div>
          </Card>

          {/* Week 5-7 */}
          <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="mb-3">
              <Badge className="mb-2">Week 5-7</Badge>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Matrix & Strings</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Matrix, Hashing, Strings, Pattern Matching
            </p>
            <div className="text-xs text-muted-foreground">
              Days 29-49 • 21 Topics
            </div>
          </Card>

          {/* Week 8-9 */}
          <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="mb-3">
              <Badge className="mb-2">Week 8-9</Badge>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Linear DS</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Linked List, Stack, Queue, Deque
            </p>
            <div className="text-xs text-muted-foreground">
              Days 50-63 • 14 Topics
            </div>
          </Card>

          {/* Week 10-11 */}
          <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="mb-3">
              <Badge className="mb-2">Week 10-11</Badge>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Trees & Heaps</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Binary Tree, BST, Heap, Priority Queue
            </p>
            <div className="text-xs text-muted-foreground">
              Days 64-77 • 14 Topics
            </div>
          </Card>

          {/* Week 12-13 */}
          <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="mb-3">
              <Badge className="mb-2">Week 12-13</Badge>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Graphs & Algorithms</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Graph, BFS, DFS, Greedy, Backtracking
            </p>
            <div className="text-xs text-muted-foreground">
              Days 78-91 • 14 Topics
            </div>
          </Card>

          {/* Week 14-15 */}
          <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="mb-3">
              <Badge className="mb-2">Week 14-15</Badge>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Dynamic Programming</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              DP Patterns: LCS, LIS, Knapsack, Matrix Chain
            </p>
            <div className="text-xs text-muted-foreground">
              Days 92-105 • 14 Topics
            </div>
          </Card>

          {/* Week 16 */}
          <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="mb-3">
              <Badge className="mb-2">Week 16</Badge>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Advanced DS</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Trie, Segment Tree, Disjoint Set
            </p>
            <div className="text-xs text-muted-foreground">
              Days 106-112 • 7 Topics
            </div>
          </Card>
        </div>
      </div>

        {/* Stats Section */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary neon-text mb-2">112</div>
              <div className="text-muted-foreground">Days</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-primary neon-text mb-2">560+</div>
              <div className="text-muted-foreground">Questions</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-primary neon-text mb-2">16</div>
              <div className="text-muted-foreground">Weeks</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold text-primary neon-text mb-2">24</div>
              <div className="text-muted-foreground">Topics</div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
