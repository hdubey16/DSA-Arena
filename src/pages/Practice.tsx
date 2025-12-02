import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor, { Monaco } from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Play, Send, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, 
  AlertCircle, Clock, Zap, TrendingUp, Code2, X, ZoomIn, ZoomOut, GripVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { studyDays, generatePracticeQuestions } from "@/data/studyDays";
import { userAPI, submissionAPI } from "@/lib/api";
import { 
  saveQuestionProgress, 
  isQuestionCompleted, 
  getSavedCode, 
  getDayProgress,
  isDayUnlocked 
} from "@/utils/progressTracker";
import StudentNavBar from "@/components/StudentNavBar";
import { useAuth } from "@/contexts/AuthContext";

interface SubmissionResult {
  success: boolean;
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error' | 'Time Limit Exceeded';
  submission: {
    id: string;
    status: string;
    totalTestCases: number;
    passedTestCases: number;
    runtime: number;
    memory: number;
    runtimeBeats: number;
    memoryBeats: number;
    testResults: Array<{
      testCaseId: string;
      input: string;
      expectedOutput: string;
      actualOutput: string;
      passed: boolean;
      error?: string;
      runtime: number;
      memory: number;
    }>;
  };
  error?: string;
}

const Practice = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const dayNumber = parseInt(topicId || "1");
  const dayData = studyDays.find(d => d.day === dayNumber) || studyDays[0];

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to solve practice questions.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, toast]);

  // Questions state
  const [questions, setQuestions] = useState(() => generatePracticeQuestions(dayData));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState(() => questions[0].starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Output state
  const [outputTab, setOutputTab] = useState<'output' | 'testcases' | 'submission'>('output');
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<any[]>([]);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  // Zoom state
  const [questionZoom, setQuestionZoom] = useState(100);
  const [editorFontSize, setEditorFontSize] = useState(14);

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
      setCode(questions[currentQuestion]?.starterCode || "");
    }
    setOutput("");
    setSubmissionResult(null);
    setOutputTab('output');
  }, [currentQuestion, dayNumber, questions]);

  // Fetch questions from backend
  useEffect(() => {
    const topicIdForAPI = `day-${dayNumber}`;
    if (!topicIdForAPI) return;

    const simpleStarterCode = `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`;
    
    userAPI.getTopicQuestions(topicIdForAPI)
      .then((res: any) => {
        const remote = res.data?.questions;
        if (Array.isArray(remote) && remote.length > 0) {
          const mapped = remote.map((q: any, idx: number) => ({
            id: q._id || `db-${idx}`,
            title: q.title,
            difficulty: q.difficulty || "Easy",
            description: q.description || "",
            examples: q.examples || [{ input: "", output: "" }],
            testCases: q.testCases || [],
            starterCode: simpleStarterCode, // Always use simple template
            rawQuestion: q
          }));
          setQuestions(mapped);
          setCurrentQuestion(0);
        }
      })
      .catch((error) => {
        console.error('[Practice] Failed to fetch questions:', error);
        // ignore and keep local questions
      });
  }, [dayNumber]);

  const handleRun = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty code",
        description: "Please write some code first",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    setOutput("Running code against visible test cases...");
    setOutputTab('output');

    try {
      const response = await submissionAPI.runCode({
        code,
        questionId: question.id
      });

      const result = response.data;
      console.log('Run code result:', result);

      if (result.success) {
        // Store test results for display
        setTestResults(result.testResults);
        setOutputTab('testcases');
        
        // Show simple success message
        if (result.passedTests === result.totalTests) {
          setOutput(`✅ Accepted\n\nAll test cases passed!\n\nRuntime: ${result.totalRuntime}ms\nMemory: ${result.averageMemory}KB`);
        } else {
          setOutput(`❌ Wrong Answer\n\n${result.passedTests}/${result.totalTests} test cases passed\n\nSee Test Cases tab for details`);
        }
        
        toast({
          title: "Run completed",
          description: result.passedTests === result.totalTests ? "All tests passed! 🎉" : "Some tests failed",
        });
      } else {
        const errorMsg = result.error || 'Unknown execution error';
        setOutput(`❌ Error:\n${errorMsg}`);
        toast({
          title: "Execution failed",
          description: errorMsg,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      setOutput(`❌ Error running code:\n${error.message}`);
      toast({
        title: "Error",
        description: "Failed to run code",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty code",
        description: "Please write some code first",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setOutputTab('submission');

    try {
      const response = await submissionAPI.submitCode({
        code,
        questionId: question.id,
        topicId: dayNumber
      });

      const result: SubmissionResult = response.data;
      console.log('Submit result:', result);
      setSubmissionResult(result);
      setShowSubmissionModal(true);

      if (result.success && result.submission.status === 'Accepted') {
        // Only mark as completed if ALL test cases pass
        toast({
          title: "Accepted! 🎉",
          description: "All test cases passed! Next question unlocked.",
        });
        saveQuestionProgress(dayNumber, currentQuestion, code, true);
        // Reload to update completion status
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast({
          title: result.status,
          description: `${result.submission.passedTestCases}/${result.submission.totalTestCases} test cases passed`,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCode(question.starterCode);
    setOutput("");
    setSubmissionResult(null);
    toast({
      title: "Code reset",
      description: "Starter code has been restored.",
    });
  };

  const handleQuestionChange = (newIndex: number) => {
    // Check if the question is unlocked
    if (newIndex > currentQuestion) {
      // Days 1-16 are unlocked by default
      if (dayNumber > 16) {
        // Can only go to next question if current one is completed
        if (!questionCompleted) {
          toast({
            title: "Question Locked",
            description: "Complete the current question by passing all test cases before moving forward.",
            variant: "destructive"
          });
          return;
        }
      }
    }
    
    saveQuestionProgress(dayNumber, currentQuestion, code, questionCompleted);
    setCurrentQuestion(newIndex);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'text-green-500';
      case 'Wrong Answer': return 'text-red-500';
      case 'Runtime Error': return 'text-orange-500';
      case 'Compilation Error': return 'text-red-600';
      case 'Time Limit Exceeded': return 'text-orange-600';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted': return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'Wrong Answer': return <X className="h-6 w-6 text-red-500" />;
      case 'Runtime Error': return <AlertCircle className="h-6 w-6 text-orange-500" />;
      case 'Compilation Error': return <AlertCircle className="h-6 w-6 text-red-600" />;
      case 'Time Limit Exceeded': return <Clock className="h-6 w-6 text-orange-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentNavBar />
      
      <PanelGroup direction="horizontal" className="h-screen">
        {/* Left Panel - Problem Description */}
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full border-r border-border overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" onClick={() => navigate("/topics")}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Topics
              </Button>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuestionZoom(Math.max(50, questionZoom - 10))}
                  disabled={questionZoom <= 50}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground min-w-[3rem] text-center">{questionZoom}%</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuestionZoom(Math.min(200, questionZoom + 10))}
                  disabled={questionZoom >= 200}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
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

          <div style={{ fontSize: `${questionZoom}%` }}>
          <Card className="p-6 bg-card border-border mb-6">
            <h2 className="text-xl font-bold mb-4 text-primary">Topic: {dayData.topic}</h2>
            <p className="text-foreground mb-4">{question.description}</p>
            
            <h3 className="text-lg font-semibold mb-3 text-primary">Examples:</h3>
            {question.examples.map((example: any, idx: number) => (
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
              onClick={() => handleQuestionChange(currentQuestion - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      disabled={currentQuestion === questions.length - 1 || (dayNumber > 16 && !questionCompleted)}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuestionChange(currentQuestion + 1)}
                      className={dayNumber > 16 && !questionCompleted ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </span>
                </TooltipTrigger>
                {dayNumber > 16 && !questionCompleted && currentQuestion < questions.length - 1 && (
                  <TooltipContent>
                    <p>🔒 Submit and pass all test cases to unlock</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <span className="ml-auto text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-primary">
              {dayProgress.questionsCompleted.length}/{questions.length} Completed
            </span>
          </div>
          </div>
          </div>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50 transition-colors relative group">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 flex items-center justify-center">
            <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </PanelResizeHandle>

        {/* Right Panel - Code Editor */}
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={70} minSize={40}>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between bg-card">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-primary">Code Editor</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditorFontSize(Math.max(10, editorFontSize - 2))}
                    disabled={editorFontSize <= 10}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground min-w-[3rem] text-center">{editorFontSize}px</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditorFontSize(Math.min(30, editorFontSize + 2))}
                    disabled={editorFontSize >= 30}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="secondary" size="sm" onClick={handleRun} disabled={isRunning || isSubmitting}>
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={isRunning || isSubmitting} className="neon-glow bg-green-600 hover:bg-green-700">
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
                beforeMount={(monaco) => {
                  // Add custom commands to block copy/paste before editor loads
                  monaco.editor.addKeybindingRules([
                    {
                      keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC,
                      command: null,
                    },
                    {
                      keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX,
                      command: null,
                    },
                    {
                      keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV,
                      command: null,
                    }
                  ]);
                }}
                onMount={(editor, monaco) => {
                  // Block keyboard events
                  editor.onKeyDown((e) => {
                    const ctrlOrCmd = e.ctrlKey || e.metaKey;
                    if (ctrlOrCmd && (e.code === 'KeyC' || e.code === 'KeyX' || e.code === 'KeyV')) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  });
                  
                  // Block clipboard events on DOM
                  const editorDomNode = editor.getDomNode();
                  if (editorDomNode) {
                    const blockEvent = (e: Event) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.stopImmediatePropagation();
                      return false;
                    };
                    
                    editorDomNode.addEventListener('paste', blockEvent, true);
                    editorDomNode.addEventListener('copy', blockEvent, true);
                    editorDomNode.addEventListener('cut', blockEvent, true);
                    editorDomNode.addEventListener('beforecopy', blockEvent, true);
                    editorDomNode.addEventListener('beforecut', blockEvent, true);
                    editorDomNode.addEventListener('beforepaste', blockEvent, true);
                  }
                  
                  // Also block context menu actions
                  editor.onContextMenu(() => {
                    // Prevent right-click menu
                    return;
                  });
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: editorFontSize,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                  readOnly: false,
                  contextmenu: false,
                  quickSuggestions: false,
                  selectOnLineNumbers: false,
                }}
              />
            </div>
              </div>
            </Panel>

            <PanelResizeHandle className="h-1 bg-border hover:bg-primary/50 transition-colors" />
            
            <Panel defaultSize={30} minSize={15} maxSize={50} className="bg-card">
            <Tabs value={outputTab} onValueChange={(v: any) => setOutputTab(v)} className="h-full flex flex-col">
              <TabsList className="border-b border-border rounded-none bg-transparent">
                <TabsTrigger value="output" className="data-[state=active]:text-primary">
                  Output
                </TabsTrigger>
                <TabsTrigger value="testcases" className="data-[state=active]:text-primary">
                  Test Cases
                </TabsTrigger>
              </TabsList>
              <TabsContent value="output" className="flex-1 overflow-y-auto p-4 font-mono text-xs">
                {output ? (
                  <pre className="text-foreground whitespace-pre-wrap">{output}</pre>
                ) : (
                  <p className="text-muted-foreground">Run your code to see output...</p>
                )}
              </TabsContent>
              <TabsContent value="testcases" className="flex-1 overflow-y-auto p-4">
                {testResults.length > 0 ? (
                  <div className="space-y-2">
                    {testResults.map((result: any, idx: number) => (
                      <div key={idx} className={`border rounded-lg overflow-hidden ${result.passed ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                        <div className={`px-4 py-2 flex items-center justify-between ${result.passed ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                          <span className="font-semibold text-sm">
                            {result.passed ? '✓' : '✗'} Case {idx + 1}
                          </span>
                          <span className={`text-xs font-semibold ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                            {result.passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Input</div>
                            <div className="bg-muted/50 rounded p-2 font-mono text-xs">
                              {result.input.split('\n').map((line: string, i: number) => (
                                <div key={i}>{line || ' '}</div>
                              ))}
                            </div>
                          </div>
                          {!result.passed && (
                            <>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Output</div>
                                <div className="bg-red-500/10 rounded p-2 font-mono text-xs text-red-500">
                                  {result.actualOutput || '(empty)'}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Expected</div>
                                <div className="bg-green-500/10 rounded p-2 font-mono text-xs text-green-500">
                                  {result.expectedOutput}
                                </div>
                              </div>
                            </>
                          )}
                          {result.passed && (
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Output</div>
                              <div className="bg-green-500/10 rounded p-2 font-mono text-xs text-green-500">
                                {result.actualOutput}
                              </div>
                            </div>
                          )}
                          {result.error && (
                            <div>
                              <div className="text-xs text-red-500 mb-1">Error</div>
                              <div className="bg-red-500/10 rounded p-2 font-mono text-xs text-red-400">
                                {result.error}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p className="text-sm">You must run your code first</p>
                    <p className="text-xs mt-2">Click "Run" to see test case results</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>

          {/* Submission Result Modal */}
      {showSubmissionModal && submissionResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-card border-border">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(submissionResult.submission.status)}
                  <div>
                    <h2 className={`text-2xl font-bold ${getStatusColor(submissionResult.submission.status)}`}>
                      {submissionResult.submission.status}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {submissionResult.submission.passedTestCases}/{submissionResult.submission.totalTestCases} test cases passed
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowSubmissionModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Runtime</span>
                  </div>
                  <p className="text-2xl font-bold">{submissionResult.submission.runtime}ms</p>
                  {submissionResult.submission.runtimeBeats > 0 && (
                    <p className="text-xs text-green-500">Beats {submissionResult.submission.runtimeBeats}%</p>
                  )}
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Memory</span>
                  </div>
                  <p className="text-2xl font-bold">{submissionResult.submission.memory}MB</p>
                  {submissionResult.submission.memoryBeats > 0 && (
                    <p className="text-xs text-green-500">Beats {submissionResult.submission.memoryBeats}%</p>
                  )}
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-muted-foreground">Language</span>
                  </div>
                  <p className="text-2xl font-bold">Java</p>
                </div>
              </div>

              {/* Test Results */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Test Case Results</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {submissionResult.submission.testResults.map((tr, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${tr.passed ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                      <div className="flex items-center gap-2">
                        {tr.passed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm font-semibold">
                          Test Case {idx + 1} {tr.passed ? '- Passed' : '- Failed'}
                        </span>
                      </div>
                      {!tr.passed && (
                        <div className="mt-2 ml-6 text-xs space-y-1">
                          <p><span className="font-semibold">Input:</span> {tr.input}</p>
                          <p><span className="font-semibold">Expected:</span> {tr.expectedOutput}</p>
                          <p><span className="font-semibold">Got:</span> {tr.actualOutput}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {submissionResult.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{submissionResult.error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button onClick={() => setShowSubmissionModal(false)} className="flex-1">
                  Close
                </Button>
                {submissionResult.submission.status === 'Accepted' && (
                  <Button onClick={() => handleQuestionChange(currentQuestion + 1)} className="flex-1 bg-green-600 hover:bg-green-700">
                    Next Question
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Practice;
