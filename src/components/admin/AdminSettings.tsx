import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Sliders, Save, Palette, Brain, TestTube, Award, Shield, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface Settings {
  theme: {
    primaryColor: string;
    accentColor: string;
    neonGlowIntensity: number;
  };
  aiSettings: {
    temperature: number;
    model: string;
    maxTokens: number;
    questionGenerationPrompt: string;
  };
  testSettings: {
    defaultHiddenTestCases: number;
    defaultDuration: number;
    defaultPassingScore: number;
  };
  scoringRules: {
    hintPenalty: number;
    timeBonusEnabled: boolean;
    partialCreditEnabled: boolean;
    negativeMarking: boolean;
  };
  plagiarismSettings: {
    threshold: number;
    autoFlagEnabled: boolean;
    comparisonDepth: string;
    externalCheckEnabled: boolean;
  };
  proctoringSettings: {
    requireByDefault: boolean;
    faceDetectionInterval: number;
    soundDetectionSensitivity: number;
    maxTabSwitches: number;
    recordingQuality: string;
  };
  security: {
    maxLoginAttempts: number;
    lockoutDuration: number;
    sessionTimeout: number;
    twoFactorRequired: boolean;
  };
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/admin/settings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setSettings(data.settings || getDefaultSettings());
    } catch (error) {
      toast.error('Failed to fetch settings');
      setSettings(getDefaultSettings());
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSettings = (): Settings => ({
    theme: {
      primaryColor: '#00ff00',
      accentColor: '#00ffff',
      neonGlowIntensity: 0.5,
    },
    aiSettings: {
      temperature: 0.7,
      model: 'gpt-4',
      maxTokens: 2000,
      questionGenerationPrompt: 'Generate a Java coding question...',
    },
    testSettings: {
      defaultHiddenTestCases: 8,
      defaultDuration: 120,
      defaultPassingScore: 60,
    },
    scoringRules: {
      hintPenalty: 5,
      timeBonusEnabled: true,
      partialCreditEnabled: true,
      negativeMarking: false,
    },
    plagiarismSettings: {
      threshold: 70,
      autoFlagEnabled: true,
      comparisonDepth: 'moderate',
      externalCheckEnabled: false,
    },
    proctoringSettings: {
      requireByDefault: false,
      faceDetectionInterval: 30,
      soundDetectionSensitivity: 0.7,
      maxTabSwitches: 3,
      recordingQuality: 'medium',
    },
    security: {
      maxLoginAttempts: 5,
      lockoutDuration: 30,
      sessionTimeout: 480,
      twoFactorRequired: false,
    },
  });

  if (!settings) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold neon-text flex items-center gap-2">
            <Sliders className="h-8 w-8" />
            Admin Settings
          </h2>
          <p className="text-muted-foreground mt-1">Configure global system settings</p>
        </div>
        <Button
          onClick={handleSaveSettings}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-[0_0_20px_rgba(0,255,0,0.5)]"
        >
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="theme" className="space-y-6">
        <TabsList>
          <TabsTrigger value="theme">
            <Palette className="h-4 w-4 mr-2" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Brain className="h-4 w-4 mr-2" />
            AI
          </TabsTrigger>
          <TabsTrigger value="tests">
            <TestTube className="h-4 w-4 mr-2" />
            Tests
          </TabsTrigger>
          <TabsTrigger value="scoring">
            <Award className="h-4 w-4 mr-2" />
            Scoring
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Theme Settings */}
        <TabsContent value="theme">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Theme & Appearance</h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="primaryColor">Primary Color (Neon Green)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value }
                    })}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.theme.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accentColor">Accent Color (Neon Cyan)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Input
                    id="accentColor"
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, accentColor: e.target.value }
                    })}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.theme.accentColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, accentColor: e.target.value }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="glowIntensity">Neon Glow Intensity</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="glowIntensity"
                    min={0}
                    max={1}
                    step={0.1}
                    value={[settings.theme.neonGlowIntensity]}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, neonGlowIntensity: value[0] }
                    })}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono w-12">{settings.theme.neonGlowIntensity.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">AI Configuration</h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="temperature">Temperature</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="temperature"
                    min={0}
                    max={2}
                    step={0.1}
                    value={[settings.aiSettings.temperature]}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      aiSettings: { ...settings.aiSettings, temperature: value[0] }
                    })}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono w-12">{settings.aiSettings.temperature.toFixed(1)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Higher values = more creative, Lower values = more focused</p>
              </div>

              <div>
                <Label htmlFor="model">AI Model</Label>
                <Input
                  id="model"
                  value={settings.aiSettings.model}
                  onChange={(e) => setSettings({
                    ...settings,
                    aiSettings: { ...settings.aiSettings, model: e.target.value }
                  })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  value={settings.aiSettings.maxTokens}
                  onChange={(e) => setSettings({
                    ...settings,
                    aiSettings: { ...settings.aiSettings, maxTokens: parseInt(e.target.value) }
                  })}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Test Settings */}
        <TabsContent value="tests">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Default Test Configuration</h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="hiddenTests">Hidden Test Cases</Label>
                <Input
                  id="hiddenTests"
                  type="number"
                  min="0"
                  max="20"
                  value={settings.testSettings.defaultHiddenTestCases}
                  onChange={(e) => setSettings({
                    ...settings,
                    testSettings: { ...settings.testSettings, defaultHiddenTestCases: parseInt(e.target.value) }
                  })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="duration">Default Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  value={settings.testSettings.defaultDuration}
                  onChange={(e) => setSettings({
                    ...settings,
                    testSettings: { ...settings.testSettings, defaultDuration: parseInt(e.target.value) }
                  })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="passingScore">Default Passing Score (%)</Label>
                <Input
                  id="passingScore"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.testSettings.defaultPassingScore}
                  onChange={(e) => setSettings({
                    ...settings,
                    testSettings: { ...settings.testSettings, defaultPassingScore: parseInt(e.target.value) }
                  })}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Scoring Rules */}
        <TabsContent value="scoring">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Scoring Rules</h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="hintPenalty">Hint Penalty (%)</Label>
                <Input
                  id="hintPenalty"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.scoringRules.hintPenalty}
                  onChange={(e) => setSettings({
                    ...settings,
                    scoringRules: { ...settings.scoringRules, hintPenalty: parseInt(e.target.value) }
                  })}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="timeBonus">Time Bonus Enabled</Label>
                <Switch
                  id="timeBonus"
                  checked={settings.scoringRules.timeBonusEnabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    scoringRules: { ...settings.scoringRules, timeBonusEnabled: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="partialCredit">Partial Credit Enabled</Label>
                <Switch
                  id="partialCredit"
                  checked={settings.scoringRules.partialCreditEnabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    scoringRules: { ...settings.scoringRules, partialCreditEnabled: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="negativeMarking">Negative Marking</Label>
                <Switch
                  id="negativeMarking"
                  checked={settings.scoringRules.negativeMarking}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    scoringRules: { ...settings.scoringRules, negativeMarking: checked }
                  })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Security & Plagiarism</h3>
            <div className="space-y-6">
              <div>
                <Label>Plagiarism Detection Threshold (%)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[settings.plagiarismSettings.threshold]}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      plagiarismSettings: { ...settings.plagiarismSettings, threshold: value[0] }
                    })}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono w-12">{settings.plagiarismSettings.threshold}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoFlag">Auto-Flag High Risk Submissions</Label>
                <Switch
                  id="autoFlag"
                  checked={settings.plagiarismSettings.autoFlagEnabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    plagiarismSettings: { ...settings.plagiarismSettings, autoFlagEnabled: checked }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  min="1"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                  })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  min="15"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
