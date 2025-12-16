import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Code2, Lock, CheckCircle2, RefreshCw } from "lucide-react";
import { studyDays } from "@/data/studyDays";
import { getDayProgress, isDayUnlocked, getCompletionStats, syncProgressFromBackend } from "@/utils/progressTracker";
import StudentNavBar from "@/components/StudentNavBar";
import { GlowCard } from "@/components/ui/spotlight-card";
import { RetroGrid } from "@/components/ui/retro-grid";
import { toast } from "sonner";
import { useState } from "react";

const Topics = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(getCompletionStats());
  const [syncing, setSyncing] = useState(false);

  const handleSyncProgress = async () => {
    setSyncing(true);
    try {
      console.log('[Topics] Manual sync triggered');
      await syncProgressFromBackend();
      setStats(getCompletionStats()); // Refresh stats
      toast.success("Progress synced from backend!");
    } catch (error) {
      console.error('[Topics] Sync failed:', error);
      toast.error("Failed to sync progress");
    } finally {
      setSyncing(false);
    }
  };

  const getWeekColor = (week: number) => {
    const colors = [
      "bg-primary/20 text-primary border-primary/50",
      "bg-accent/20 text-accent border-accent/50",
      "bg-primary/20 text-primary border-primary/50",
      "bg-accent/20 text-accent border-accent/50",
      "bg-primary/20 text-primary border-primary/50",
      "bg-accent/20 text-accent border-accent/50",
      "bg-primary/20 text-primary border-primary/50",
    ];
    return colors[(week - 1) % colors.length];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Full Page RetroGrid Background */}
      <div className="fixed inset-0 z-0 opacity-70">
        <RetroGrid angle={65} />
      </div>
      
      <div className="relative z-10">
        <StudentNavBar />
        
        <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 neon-text">
            DSA Mastery Path
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            112-day structured curriculum covering all major DSA topics. Each day includes 5 practice questions (Easy → Medium → Medium → Hard)
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
            <Button 
              onClick={handleSyncProgress} 
              disabled={syncing}
              variant="outline"
              size="sm"
              className="ml-4"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              Sync Progress
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyDays.map((day, index) => {
            const unlocked = isDayUnlocked(day.day);
            const progress = getDayProgress(day.day);
            const completed = progress.allCompleted;
            
            return unlocked ? (
              <GlowCard
                key={day.day}
                glowColor="purple"
                customSize={true}
                className="w-full h-auto cursor-pointer transition-all duration-300 group"
              >
                <div 
                  onClick={() => navigate(`/practice/${day.day}`)}
                  className="relative z-10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {completed ? (
                        <CheckCircle2 className="h-6 w-6 text-[#CB94F7]" />
                      ) : (
                        <Code2 className="h-6 w-6 text-[#CB94F7]" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#CB94F7] transition-colors">
                          Day {day.day}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">Week {day.week}</p>
                      </div>
                    </div>
                    {completed && (
                      <Badge className="bg-[#CB94F7] text-black">
                        Completed
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">{day.topic}</p>

                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={getWeekColor(day.week)}>
                      Week {day.week}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {progress.questionsCompleted.length}/5 Questions
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <span className="text-sm text-[#CB94F7] group-hover:neon-text transition-all">
                      {completed ? "Review →" : "Start Practice →"}
                    </span>
                  </div>
                </div>
              </GlowCard>
            ) : (
              <Card
                key={day.day}
                className="p-6 bg-card border-border transition-all duration-300 group relative overflow-hidden opacity-50 cursor-not-allowed"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Lock className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <h3 className="text-xl font-bold">
                          Day {day.day}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">Week {day.week}</p>
                      </div>
                    </div>
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

                  <div className="pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Complete Day {day.day - 1} to unlock
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;
