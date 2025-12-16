import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Flame, 
  Zap, 
  Code2,
  ChevronLeft,
  Medal,
  Award,
  Crown
} from "lucide-react";
import StudentNavBar from "@/components/StudentNavBar";
import { RetroGrid } from "@/components/ui/retro-grid";
import { userAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  questionsSolved: number;
  totalSubmissions: number;
  avgRuntime: number;
  avgMemory: number;
  score: number;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to view leaderboard");
      navigate("/login");
      return;
    }

    fetchLeaderboard();
  }, [isAuthenticated, navigate]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getLeaderboard();
      setLeaderboard(response.data.leaderboard || []);
    } catch (error: any) {
      console.error("Failed to fetch leaderboard:", error);
      toast.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-orange-500" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 border-yellow-500/50";
    if (rank === 2) return "bg-gray-400/20 border-gray-400/50";
    if (rank === 3) return "bg-orange-500/20 border-orange-500/50";
    return "bg-card border-border";
  };

  const isCurrentUser = (userId: string) => {
    return user?.id === userId;
  };

  return (
    <div className="min-h-screen bg-background">
      <RetroGrid className="fixed inset-0 opacity-20" />
      <StudentNavBar />

      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/topics")}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Topics
          </Button>

          <div className="flex items-center gap-4 mb-2">
            <Trophy className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold neon-text">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">
            Top performers ranked by questions solved and performance metrics
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading leaderboard...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <Card className="p-12 text-center">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Data Yet</h3>
            <p className="text-muted-foreground">
              Be the first to solve questions and appear on the leaderboard!
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {/* Top 3 Podium */}
            {leaderboard.slice(0, 3).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {leaderboard.slice(0, 3).map((entry) => (
                  <Card
                    key={entry.userId}
                    className={`p-6 ${getRankColor(entry.rank)} ${
                      isCurrentUser(entry.userId) ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">{getRankIcon(entry.rank)}</div>
                      <h3 className="text-lg font-bold mb-1">{entry.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        {entry.email}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Code2 className="h-4 w-4 text-primary" />
                        <span className="text-2xl font-bold text-primary">
                          {entry.questionsSolved}
                        </span>
                        <span className="text-sm text-muted-foreground">solved</span>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {entry.avgRuntime}ms
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-3 w-3" />
                          {entry.avgMemory}KB
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Rest of leaderboard */}
            {leaderboard.slice(3).map((entry) => (
              <Card
                key={entry.userId}
                className={`p-4 ${
                  isCurrentUser(entry.userId)
                    ? "bg-primary/10 border-primary/50 ring-2 ring-primary"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xl font-bold">#{entry.rank}</span>
                    </div>

                    {/* User Info */}
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {entry.name}
                        {isCurrentUser(entry.userId) && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{entry.email}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Code2 className="h-4 w-4 text-primary" />
                        <span className="text-2xl font-bold text-primary">
                          {entry.questionsSolved}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Solved</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-lg font-semibold">
                          {entry.avgRuntime}ms
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Avg Runtime</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Flame className="h-4 w-4 text-muted-foreground" />
                        <span className="text-lg font-semibold">
                          {entry.avgMemory}KB
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Avg Memory</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span className="text-lg font-semibold">
                          {entry.totalSubmissions}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Submissions</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
