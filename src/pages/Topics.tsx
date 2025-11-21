import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Code2, Lock } from "lucide-react";

const topics = [
  { id: 1, name: "Arrays & Strings", difficulty: "Easy", questions: 5, locked: false },
  { id: 2, name: "Linked Lists", difficulty: "Medium", questions: 5, locked: false },
  { id: 3, name: "Stacks & Queues", difficulty: "Medium", questions: 5, locked: false },
  { id: 4, name: "Trees & Graphs", difficulty: "Hard", questions: 5, locked: false },
  { id: 5, name: "Dynamic Programming", difficulty: "Hard", questions: 5, locked: true },
  { id: 6, name: "Sorting & Searching", difficulty: "Medium", questions: 5, locked: false },
];

const Topics = () => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-primary/20 text-primary border-primary/50";
      case "Medium":
        return "bg-accent/20 text-accent border-accent/50";
      case "Hard":
        return "bg-destructive/20 text-destructive border-destructive/50";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 neon-text">
            Java Topics Arena
          </h1>
          <p className="text-muted-foreground text-lg">
            Master Java concepts through practice. Each topic contains 5 curated questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <Card
              key={topic.id}
              onClick={() => !topic.locked && navigate(`/practice/${topic.id}`)}
              className={`p-6 bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                topic.locked ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-radial opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {topic.locked ? (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <Code2 className="h-6 w-6 text-primary" />
                    )}
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {topic.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <Badge className={getDifficultyColor(topic.difficulty)}>
                    {topic.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {topic.questions} Questions
                  </span>
                </div>

                {!topic.locked && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-primary group-hover:neon-text transition-all">
                      Start Practice →
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topics;
