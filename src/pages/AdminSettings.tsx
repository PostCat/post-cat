import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminSettings = () => {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); toast.success("Settings saved"); setTimeout(() => setSaved(false), 2000); };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground mt-1">Configure system-wide settings</p>
      </div>
      <div className="max-w-2xl space-y-6">
        <div className="glass-surface p-6">
          <h3 className="font-semibold mb-4">General</h3>
          <div className="space-y-4">
            <div><Label>Site Name</Label><Input defaultValue="Post Cat" className="mt-1.5 bg-secondary border-border" /></div>
            <div><Label>Support Email</Label><Input defaultValue="support@postcat.io" className="mt-1.5 bg-secondary border-border" /></div>
            <div><Label>Max Upload Size (MB)</Label><Input defaultValue="50" type="number" className="mt-1.5 bg-secondary border-border" /></div>
          </div>
        </div>
        <div className="glass-surface p-6">
          <h3 className="font-semibold mb-4">Rate Limits</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>API Requests/Hour (Free)</Label><Input defaultValue="100" type="number" className="mt-1.5 bg-secondary border-border" /></div>
            <div><Label>API Requests/Hour (Pro)</Label><Input defaultValue="1000" type="number" className="mt-1.5 bg-secondary border-border" /></div>
            <div><Label>API Requests/Hour (Enterprise)</Label><Input defaultValue="10000" type="number" className="mt-1.5 bg-secondary border-border" /></div>
            <div><Label>Posts/Day (Free)</Label><Input defaultValue="10" type="number" className="mt-1.5 bg-secondary border-border" /></div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-border/60 text-muted-foreground">Cancel</Button>
          <Button className="btn-glow gap-2" onClick={handleSave}>
            {saved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
