import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Code2, Trophy, Zap, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 neon-text animate-flicker">
              JavaPrep Arena
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Master Java through practice. Battle-tested questions. Hidden test cases. LeetCode-style evaluation.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/topics")}
                className="text-lg px-8 py-6 neon-glow-strong hover:scale-105 transition-transform"
              >
                <Code2 className="mr-2 h-5 w-5" />
                Start Practicing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary/50 hover:border-primary"
              >
                <Shield className="mr-2 h-5 w-5" />
                Admin Login
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

      {/* Stats Section */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary neon-text mb-2">50+</div>
              <div className="text-muted-foreground">Topics</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-primary neon-text mb-2">250+</div>
              <div className="text-muted-foreground">Questions</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-primary neon-text mb-2">1000+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold text-primary neon-text mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
