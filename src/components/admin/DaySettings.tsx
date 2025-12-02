import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar, Lock, Unlock, Settings as SettingsIcon, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { studyDays } from "@/data/studyDays";

const DaySettings = () => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState(1);
  const [settings, setSettings] = useState<any>(null);
  const [bulkUnlockDays, setBulkUnlockDays] = useState("");

  useEffect(() => {
    fetchDaySettings(selectedDay);
  }, [selectedDay]);

  const fetchDaySettings = async (dayId: number) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/days/settings`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      const data = await response.json();
      const daySetting = data.settings?.find((s: any) => s.dayId === dayId);
      
      if (daySetting) {
        setSettings(daySetting);
      } else {
        // Initialize with default settings
        const dayData = studyDays.find(d => d.day === dayId);
        setSettings({
          dayId,
          title: `Day ${dayId}`,
          topic: dayData?.topic || '',
          week: dayData?.week || 1,
          isLocked: dayId > 16,
          questionsPerDay: 5,
          customSettings: {
            allowHints: true,
            allowReset: true,
            showSolutions: true
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch day settings:', error);
    }
  };

  const saveDaySettings = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/days/${selectedDay}/settings`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(settings)
        }
      );

      toast({
        title: "Success",
        description: "Day settings saved"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    }
  };

  const handleBulkUnlock = async () => {
    try {
      const dayIds = bulkUnlockDays
        .split(',')
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id) && id >= 1 && id <= 39);

      if (dayIds.length === 0) {
        toast({
          title: "Invalid input",
          description: "Please enter valid day numbers (1-39)",
          variant: "destructive"
        });
        return;
      }

      const token = localStorage.getItem('auth_token');
      await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/days/bulk-unlock`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ dayIds })
        }
      );

      toast({
        title: "Success",
        description: `${dayIds.length} days unlocked for all users`
      });
      setBulkUnlockDays("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unlock days",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Day Selector */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-bold mb-4">Select Day</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-13 gap-2">
          {Array.from({ length: 39 }, (_, i) => i + 1).map((dayId) => (
            <Button
              key={dayId}
              variant={selectedDay === dayId ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDay(dayId)}
              className={selectedDay === dayId ? "neon-glow" : ""}
            >
              {dayId}
            </Button>
          ))}
        </div>
      </Card>

      {/* Bulk Unlock */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-bold mb-4">Bulk Actions</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="bulkUnlock">Unlock Days (comma-separated, e.g., 1,2,3-10)</Label>
            <Input
              id="bulkUnlock"
              placeholder="1,2,3,4,5"
              value={bulkUnlockDays}
              onChange={(e) => setBulkUnlockDays(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleBulkUnlock} className="neon-glow">
              <Unlock className="h-4 w-4 mr-2" />
              Unlock Days
            </Button>
          </div>
        </div>
      </Card>

      {/* Day Settings */}
      {settings && (
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Day {selectedDay} Settings</h3>
            <Button onClick={saveDaySettings} className="neon-glow">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={settings.title}
                  onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={settings.topic}
                  onChange={(e) => setSettings({ ...settings, topic: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Lock Status */}
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                {settings.isLocked ? (
                  <Lock className="h-5 w-5 text-destructive" />
                ) : (
                  <Unlock className="h-5 w-5 text-green-500" />
                )}
                <div>
                  <p className="font-semibold">Lock Status</p>
                  <p className="text-sm text-muted-foreground">
                    {settings.isLocked ? 'Locked for all users' : 'Unlocked for all users'}
                  </p>
                </div>
              </div>
              <Switch
                checked={!settings.isLocked}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, isLocked: !checked })
                }
              />
            </div>

            {/* Questions Per Day */}
            <div>
              <Label htmlFor="questionsPerDay">Questions Per Day</Label>
              <Input
                id="questionsPerDay"
                type="number"
                min="1"
                max="10"
                value={settings.questionsPerDay}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  questionsPerDay: parseInt(e.target.value) 
                })}
                className="mt-2"
              />
            </div>

            {/* Time Limit */}
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes, optional)</Label>
              <Input
                id="timeLimit"
                type="number"
                min="0"
                value={settings.timeLimit || ''}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  timeLimit: e.target.value ? parseInt(e.target.value) : undefined 
                })}
                className="mt-2"
                placeholder="No time limit"
              />
            </div>

            {/* Custom Settings */}
            <div className="space-y-3">
              <h4 className="font-semibold">Custom Settings</h4>
              
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium">Allow Hints</p>
                  <p className="text-sm text-muted-foreground">Users can view hints</p>
                </div>
                <Switch
                  checked={settings.customSettings?.allowHints}
                  onCheckedChange={(checked) => 
                    setSettings({
                      ...settings,
                      customSettings: { ...settings.customSettings, allowHints: checked }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium">Allow Reset</p>
                  <p className="text-sm text-muted-foreground">Users can reset their code</p>
                </div>
                <Switch
                  checked={settings.customSettings?.allowReset}
                  onCheckedChange={(checked) => 
                    setSettings({
                      ...settings,
                      customSettings: { ...settings.customSettings, allowReset: checked }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium">Show Solutions</p>
                  <p className="text-sm text-muted-foreground">Display solutions after completion</p>
                </div>
                <Switch
                  checked={settings.customSettings?.showSolutions}
                  onCheckedChange={(checked) => 
                    setSettings({
                      ...settings,
                      customSettings: { ...settings.customSettings, showSolutions: checked }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DaySettings;
