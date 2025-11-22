import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Code2, Lock, CheckCircle2 } from "lucide-react";
import { studyDays } from "@/data/studyDays";
import { getDayProgress, isDayUnlocked, getCompletionStats } from "@/utils/progressTracker";

const Topics = () => {
  const navigate = useNavigate();
  const stats = getCompletionStats();

  const getWeekColor = (week: number) => {
    const colors = [
      "bg-primary/20 text-primary border-primary/50",
      "bg-accent/20 text-accent border-accent/50",
      "bg-secondary/20 text-secondary border-secondary/50",
      "bg-primary/30 text-primary border-primary/60",
      "bg-accent/30 text-accent border-accent/60",
      "bg-secondary/30 text-secondary border-secondary/60",
      "bg-primary/40 text-primary border-primary/70",
    ];
    return colors[(week - 1) % colors.length];
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 neon-text">
            39-Day Java Mastery
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Each day includes 5 practice questions (Easy → Medium → Medium → Hard)
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Progress:</span>
              <span className="font-bold text-primary">{stats.completedDays}/{stats.totalDays} Days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Questions:</span>
              <span className="font-bold text-primary">{stats.completedQuestions}/{stats.totalQuestions}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Completion:</span>
              <span className="font-bold text-primary">{stats.percentage}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyDays.map((day, index) => {
            const unlocked = isDayUnlocked(day.day);
            const progress = getDayProgress(day.day);
            const completed = progress.allCompleted;
            
            return (
              <Card
                key={day.day}
                onClick={() => unlocked && navigate(`/practice/${day.day}`)}
                className={`p-6 bg-card border-border transition-all duration-300 group relative overflow-hidden ${
                  unlocked 
                    ? "hover:border-primary cursor-pointer" 
                    : "opacity-50 cursor-not-allowed"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {unlocked && (
                  <div className="absolute inset-0 bg-gradient-radial opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {!unlocked ? (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      ) : completed ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <Code2 className="h-6 w-6 text-primary" />
                      )}
                      <div>
                        <h3 className={`text-xl font-bold transition-colors ${unlocked ? "group-hover:text-primary" : ""}`}>
                          Day {day.day}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">Week {day.week}</p>
                      </div>
                    </div>
                    {completed && (
                      <Badge className="bg-primary text-primary-foreground neon-glow">
                        Completed
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-foreground mb-4 line-clamp-2">{day.topic}</p>

                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={getWeekColor(day.week)}>
                      Week {day.week}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {progress.questionsCompleted.length}/5 Questions
                    </span>
                  </div>

                  {unlocked ? (
                    <div className="pt-4 border-t border-border">
                      <span className="text-sm text-primary group-hover:neon-text transition-all">
                        {completed ? "Review →" : "Start Practice →"}
                      </span>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        Complete Day {day.day - 1} to unlock
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Topics;
