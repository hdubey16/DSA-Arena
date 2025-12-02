import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Save, RotateCcw } from 'lucide-react';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">Admin Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings and preferences
          </p>
        </div>

        {/* AI Configuration */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>AI Question Generation</CardTitle>
            <CardDescription>
              Configure AI parameters for generating practice questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature">AI Temperature</Label>
                  <span className="text-sm text-muted-foreground">0.7</span>
                </div>
                <Slider
                  id="temperature"
                  defaultValue={[0.7]}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher values = more creative, Lower values = more focused
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelVersion">Model Version</Label>
                <Input id="modelVersion" defaultValue="gpt-4" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input id="maxTokens" type="number" defaultValue="2000" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Configuration */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>
              Default settings for test creation and evaluation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hiddenTestCases">Default Hidden Test Cases</Label>
                <Input id="hiddenTestCases" type="number" defaultValue="5" />
                <p className="text-xs text-muted-foreground">
                  Number of hidden test cases for code evaluation
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passingScore">Minimum Passing Score (%)</Label>
                <Input id="passingScore" type="number" defaultValue="60" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hintPenalty">Hint Penalty (%)</Label>
                <Input id="hintPenalty" type="number" defaultValue="10" />
                <p className="text-xs text-muted-foreground">
                  Score reduction per hint used
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Code Compilation Errors</Label>
                  <p className="text-sm text-muted-foreground">
                    Show compilation errors to students
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Time Limit Per Question</Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce individual question time limits
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plagiarism Detection */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Plagiarism Detection</CardTitle>
            <CardDescription>
              Configure automatic plagiarism detection thresholds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="plagiarismThreshold">Auto-Flag Threshold (%)</Label>
                  <span className="text-sm text-muted-foreground">75</span>
                </div>
                <Slider
                  id="plagiarismThreshold"
                  defaultValue={[75]}
                  max={100}
                  min={0}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  Similarity score above this triggers automatic flagging
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable AST Matching</Label>
                  <p className="text-sm text-muted-foreground">
                    Deep code structure analysis
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cross-Test Comparison</Label>
                  <p className="text-sm text-muted-foreground">
                    Compare with previous test submissions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proctoring Settings */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Proctoring Settings</CardTitle>
            <CardDescription>
              Configure monitoring and proctoring features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Proctoring by Default</Label>
                <p className="text-sm text-muted-foreground">
                  Enable for all new tests
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Face Detection Required</Label>
                <p className="text-sm text-muted-foreground">
                  Block test if face not detected
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Screen Recording</Label>
                <p className="text-sm text-muted-foreground">
                  Capture screen during test
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tab Switch Detection</Label>
                <p className="text-sm text-muted-foreground">
                  Log when user switches tabs
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>
              General system configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="120" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxAttempts">Max Failed Login Attempts</Label>
              <Input id="maxAttempts" type="number" defaultValue="5" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Disable access for non-admin users
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send alerts for critical events
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button className="neon-glow-strong">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
