import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, User, Globe, Bell, Shield, Key, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); toast.success("Settings saved"); setTimeout(() => setSaved(false), 2000); };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Key },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-44 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 max-w-2xl space-y-6">
          {activeTab === "profile" && (
            <div className="glass-surface p-6">
              <h3 className="font-semibold mb-4">Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">PC</div>
                  <Button variant="outline" size="sm" className="text-xs">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Display Name</Label><Input defaultValue="Post Cat User" className="mt-1.5 bg-secondary border-border" /></div>
                  <div><Label>Username</Label><Input defaultValue="@postcatuser" className="mt-1.5 bg-secondary border-border" /></div>
                </div>
                <div><Label>Email</Label><Input defaultValue="user@postcat.io" className="mt-1.5 bg-secondary border-border" /></div>
                <div><Label>Bio</Label><textarea defaultValue="Content creator using Post Cat API" className="mt-1.5 w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm h-20 resize-none text-foreground" /></div>
              </div>
            </div>
          )}
          {activeTab === "preferences" && (
            <div className="glass-surface p-6">
              <h3 className="font-semibold mb-4">Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Timezone</Label><Input defaultValue="UTC+6 (Asia/Dhaka)" className="mt-1.5 bg-secondary border-border" /></div>
                <div><Label>Default Platform</Label><Input defaultValue="Instagram" className="mt-1.5 bg-secondary border-border" /></div>
                <div><Label>Date Format</Label><Input defaultValue="MMM DD, YYYY" className="mt-1.5 bg-secondary border-border" /></div>
                <div><Label>Language</Label><Input defaultValue="English" className="mt-1.5 bg-secondary border-border" /></div>
              </div>
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="glass-surface p-6">
              <h3 className="font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: "Post published", desc: "Get notified when posts go live", def: true },
                  { label: "Post failed", desc: "Alert when posts fail to publish", def: true },
                  { label: "API usage alerts", desc: "Warnings when approaching limits", def: true },
                  { label: "Weekly digest", desc: "Summary of your weekly activity", def: false },
                  { label: "Product updates", desc: "New features and improvements", def: true },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-2">
                    <div><p className="text-sm font-medium">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={n.def} className="sr-only peer" />
                      <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-foreground after:rounded-full after:h-4 after:w-4 after:transition-all" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "security" && (
            <div className="glass-surface p-6">
              <h3 className="font-semibold mb-4">Security</h3>
              <div className="space-y-4">
                <div><Label>Current Password</Label><Input type="password" className="mt-1.5 bg-secondary border-border" /></div>
                <div><Label>New Password</Label><Input type="password" className="mt-1.5 bg-secondary border-border" /></div>
                <div><Label>Confirm Password</Label><Input type="password" className="mt-1.5 bg-secondary border-border" /></div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between py-2">
                    <div><p className="text-sm font-medium">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add an extra layer of security</p></div>
                    <Button variant="outline" size="sm" className="text-xs">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "integrations" && (
            <div className="glass-surface p-6">
              <h3 className="font-semibold mb-4">Platform Integrations</h3>
              <div className="space-y-3">
                {[
                  { name: "Instagram", connected: true, account: "@postcat_official" },
                  { name: "X / Twitter", connected: true, account: "@postcat" },
                  { name: "LinkedIn", connected: false, account: "" },
                  { name: "YouTube", connected: false, account: "" },
                  { name: "Meta / Facebook", connected: true, account: "Post Cat Page" },
                  { name: "TikTok", connected: false, account: "" },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div><p className="text-sm font-medium">{p.name}</p>{p.connected && <p className="text-xs text-muted-foreground">{p.account}</p>}</div>
                    <Button variant={p.connected ? "outline" : "default"} size="sm" className={`text-xs ${!p.connected ? "btn-glow" : "border-border/60 text-muted-foreground"}`}>
                      {p.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="glass-surface p-6 border-destructive/30">
            <h3 className="font-semibold mb-2 text-destructive">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back.</p>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </div>
          <div className="flex justify-end gap-3 pb-8">
            <Button variant="outline" className="border-border/60 text-muted-foreground">Cancel</Button>
            <Button className="btn-glow gap-2" onClick={handleSave}>
              {saved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
