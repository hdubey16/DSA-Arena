import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Send, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { studyDays, generatePracticeQuestions } from "@/data/studyDays";
import { 
  saveQuestionProgress, 
  isQuestionCompleted, 
  getSavedCode, 
  getDayProgress,
  isDayUnlocked 
} from "@/utils/progressTracker";

const Practice = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const dayNumber = parseInt(topicId || "1");
  const dayData = studyDays.find(d => d.day === dayNumber) || studyDays[0];
  const questions = generatePracticeQuestions(dayData);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState(questions[0].starterCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const question = questions[currentQuestion];
  const dayProgress = getDayProgress(dayNumber);
  const questionCompleted = isQuestionCompleted(dayNumber, currentQuestion);

  // Check if day is unlocked
  useEffect(() => {
    if (!isDayUnlocked(dayNumber)) {
      toast({
        title: "Day Locked",
        description: `Complete Day ${dayNumber - 1} to unlock this day.`,
        variant: "destructive",
      });
      navigate("/topics");
    }
  }, [dayNumber, navigate, toast]);

  // Load saved code on mount or question change
  useEffect(() => {
    const savedCode = getSavedCode(dayNumber, currentQuestion);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(questions[currentQuestion].starterCode);
    }
    setOutput("");
  }, [currentQuestion, dayNumber, questions]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("Running...");
    
    // Mock execution
    setTimeout(() => {
      setOutput("Test Case 1: Passed ✓\nTest Case 2: Passed ✓\n\nExecution time: 1ms\nMemory: 41.2 MB");
      setIsRunning(false);
      toast({
        title: "Code executed successfully",
        description: "All test cases passed!",
      });
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setOutput("Evaluating...");
    
    // Mock evaluation
    setTimeout(() => {
      const passed = true; // Mock: always pass for now
      
      if (passed) {
        // Save as completed
        saveQuestionProgress(dayNumber, currentQuestion, code, true);
        
        setOutput("✓ All test cases passed!\n\nExecution time: 1ms\nMemory: 41.2 MB");
        
        toast({
          title: "Solution accepted!",
          description: "Moving to next question...",
        });
        
        // Auto-navigate to next question after 1.5s
        setTimeout(() => {
          if (currentQuestion < questions.length - 1) {
            // Move to next question in same day
            handleQuestionChange(currentQuestion + 1);
          } else {
            // All questions completed, check if day is done
            const updatedProgress = getDayProgress(dayNumber);
            if (updatedProgress.allCompleted) {
              toast({
                title: "Day completed! 🎉",
                description: "Great work! Next day is now unlocked.",
              });
              navigate("/topics");
            }
          }
        }, 1500);
      } else {
        setOutput("✗ Some test cases failed.\n\nPlease review your solution.");
        toast({
          title: "Solution incorrect",
          description: "Some test cases failed. Try again!",
          variant: "destructive",
        });
      }
      
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    const savedCode = getSavedCode(dayNumber, currentQuestion);
    if (savedCode) {
      setCode(savedCode);
      toast({
        title: "Code restored",
        description: "Your last saved code has been restored.",
      });
    } else {
      setCode(question.starterCode);
      toast({
        title: "Code reset",
        description: "Starter code has been restored.",
      });
    }
    setOutput("");
  };

  const handleQuestionChange = (newIndex: number) => {
    // Auto-save current code before switching
    saveQuestionProgress(dayNumber, currentQuestion, code, questionCompleted);
    setCurrentQuestion(newIndex);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      handleQuestionChange(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      handleQuestionChange(currentQuestion + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-border overflow-y-auto p-6">
          <div className="mb-6">
            <Button variant="outline" size="sm" className="mb-4" onClick={() => navigate("/topics")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Topics
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-primary">Day {dayData.day}</span>
                  <span className="text-xs text-muted-foreground">• Week {dayData.week}</span>
                </div>
                <h1 className="text-3xl font-bold neon-text">{question.title}</h1>
              </div>
              <div className="ml-auto flex flex-col gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  question.difficulty === "Easy" ? "bg-primary/20 text-primary" :
                  question.difficulty === "Medium" ? "bg-accent/20 text-accent" :
                  "bg-destructive/20 text-destructive"
                }`}>
                  {question.difficulty}
                </span>
                {questionCompleted && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </div>
                )}
              </div>
            </div>
          </div>

          <Card className="p-6 bg-card border-border mb-6">
            <h2 className="text-xl font-bold mb-4 text-primary">Topic: {dayData.topic}</h2>
            <p className="text-foreground mb-4">{question.description}</p>
            
            <h3 className="text-lg font-semibold mb-3 text-primary">Examples:</h3>
            {question.examples.map((example, idx) => (
              <div key={idx} className="mb-4 p-4 bg-muted rounded-lg">
                <p className="text-sm mb-2">
                  <span className="font-semibold text-primary">Input:</span> {example.input}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-primary">Output:</span> {example.output}
                </p>
              </div>
            ))}
          </Card>

          <div className="flex gap-2 items-center">
            <Button
              disabled={currentQuestion === 0}
              variant="outline"
              size="sm"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              disabled={currentQuestion === questions.length - 1}
              variant="outline"
              size="sm"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <span className="ml-auto text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-primary">
              {dayProgress.questionsCompleted.length}/5 Completed
            </span>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between bg-card">
              <h2 className="text-lg font-bold text-primary">Code Editor</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="secondary" size="sm" onClick={handleRun} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={isRunning} className="neon-glow">
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="java"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                }}
              />
            </div>
          </div>

          <div className="h-48 border-t border-border bg-card">
            <Tabs defaultValue="output" className="h-full flex flex-col">
              <TabsList className="border-b border-border rounded-none bg-transparent">
                <TabsTrigger value="output" className="data-[state=active]:text-primary">
                  Output
                </TabsTrigger>
                <TabsTrigger value="testcases" className="data-[state=active]:text-primary">
                  Test Cases
                </TabsTrigger>
              </TabsList>
              <TabsContent value="output" className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                {output ? (
                  <pre className="text-foreground whitespace-pre-wrap">{output}</pre>
                ) : (
                  <p className="text-muted-foreground">Run your code to see output...</p>
                )}
              </TabsContent>
              <TabsContent value="testcases" className="flex-1 overflow-y-auto p-4">
                <p className="text-muted-foreground">Test cases will be shown here...</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
