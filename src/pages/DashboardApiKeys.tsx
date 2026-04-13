import DashboardLayout from "@/components/DashboardLayout";
import { Key, Copy, Plus, Eye, EyeOff, Trash2, RotateCcw, Code, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const initialKeys = [
  { id: 1, name: "Production Key", key: "pk_live_a8f3c2e1d4b5a6f7c8d9e0f1a2b3c4d5", created: "Mar 15, 2026", lastUsed: "2h ago", requests: "12,400", status: "active" },
  { id: 2, name: "Development Key", key: "pk_test_b7e2d1c0a9f8e7d6c5b4a3f2e1d0c9b8", created: "Feb 20, 2026", lastUsed: "5d ago", requests: "3,210", status: "active" },
  { id: 3, name: "Staging Key", key: "pk_stg_c6d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7", created: "Jan 10, 2026", lastUsed: "1w ago", requests: "890", status: "active" },
];

const apiExample = `curl -X POST https://api.postcat.io/v1/posts \\
  -H "Authorization: Bearer pk_live_a8f3..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Hello world! 🚀",
    "platforms": ["instagram", "x"],
    "schedule_at": "2026-04-14T10:00:00Z"
  }'`;

const responseExample = `{
  "id": "post_abc123",
  "status": "scheduled",
  "platforms": ["instagram", "x"],
  "schedule_at": "2026-04-14T10:00:00Z",
  "created_at": "2026-04-13T15:30:00Z"
}`;

const DashboardApiKeys = () => {
  const [keys, setKeys] = useState(initialKeys);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  const handleRegenerate = (id: number) => {
    const newKey = `pk_${Math.random().toString(36).slice(2, 38)}`;
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, key: newKey } : k));
    toast.success("API key regenerated");
  };

  const handleDelete = (id: number) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast.success("API key deleted");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground mt-1">Manage your API keys for the Post Cat REST API.</p>
        </div>
        <Button className="btn-glow gap-2" onClick={() => {
          const id = Math.max(...keys.map((k) => k.id)) + 1;
          setKeys((prev) => [...prev, { id, name: `New Key ${id}`, key: `pk_new_${Math.random().toString(36).slice(2, 38)}`, created: "Just now", lastUsed: "Never", requests: "0", status: "active" }]);
          toast.success("New API key created");
        }}><Plus className="h-4 w-4" /> Create Key</Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Requests (24h)", value: "16,500", color: "text-primary" },
          { label: "Active Keys", value: keys.length.toString(), color: "text-success" },
          { label: "Rate Limit", value: "1,000/hr", color: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="glass-surface p-4">
            <p className="stat-label">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-8">
        {keys.map((k) => (
          <div key={k.id} className="glass-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Key className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="font-medium">{k.name}</span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span>Created: {k.created}</span>
                    <span>·</span>
                    <span>Last used: {k.lastUsed}</span>
                    <span>·</span>
                    <span>{k.requests} requests</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-warning" title="Regenerate" onClick={() => handleRegenerate(k.id)}>
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" title="Delete" onClick={() => handleDelete(k.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2.5">
              <code className="flex-1 text-sm text-muted-foreground font-mono overflow-hidden text-ellipsis">
                {visible[k.id] ? k.key : "•".repeat(40)}
              </code>
              <button onClick={() => setVisible((v) => ({ ...v, [k.id]: !v[k.id] }))} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                {visible[k.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button onClick={() => handleCopy(k.key)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-surface overflow-hidden">
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold">Quick Start</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Example API request & response</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
            Full Docs <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-0 border-t border-border">
          <div className="p-5 border-r border-border">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Request</p>
            <pre className="text-xs leading-6 text-muted-foreground font-mono overflow-x-auto scrollbar-thin"><code>{apiExample}</code></pre>
          </div>
          <div className="p-5">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Response</p>
            <pre className="text-xs leading-6 text-success font-mono overflow-x-auto scrollbar-thin"><code>{responseExample}</code></pre>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardApiKeys;
