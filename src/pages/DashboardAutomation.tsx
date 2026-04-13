import DashboardLayout from "@/components/DashboardLayout";
import { Zap, ToggleLeft, ToggleRight } from "lucide-react";

const automations = [
  { id: 1, name: "Daily Image Post", desc: "Auto-post a random image from your library every day at 9 AM", enabled: true },
  { id: 2, name: "Reel Auto-Posting", desc: "Automatically publish reels to Instagram and YouTube Shorts", enabled: false },
  { id: 3, name: "Bulk Scheduler", desc: "Schedule up to 100 posts at once from CSV upload", enabled: true },
  { id: 4, name: "Cross-Platform Sync", desc: "Mirror posts across all connected platforms automatically", enabled: true },
  { id: 5, name: "Auto-Retry Failed Posts", desc: "Automatically retry failed posts up to 3 times", enabled: false },
];

const DashboardAutomation = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Automation</h1>
        <p className="text-muted-foreground mt-1">Configure automation add-ons for your workflow.</p>
      </div>
      <div className="space-y-3">
        {automations.map((a) => (
          <div key={a.id} className="card-surface p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </div>
            <button className="text-primary">
              {a.enabled ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-muted-foreground" />}
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardAutomation;
