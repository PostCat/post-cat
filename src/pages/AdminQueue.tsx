import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, CheckCircle, AlertTriangle, Loader2, RotateCcw, Pause, Play, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialQueue = [
  { id: "q-001", title: "Product Launch Announcement", platform: "Instagram", user: "sarah@startup.io", status: "processing", scheduledAt: "Apr 13, 10:00 AM", priority: "high" },
  { id: "q-002", title: "Weekly Tips Thread", platform: "X", user: "alex@example.com", status: "queued", scheduledAt: "Apr 13, 1:00 PM", priority: "normal" },
  { id: "q-003", title: "BTS Video Upload", platform: "YouTube", user: "mike@agency.co", status: "queued", scheduledAt: "Apr 13, 3:00 PM", priority: "normal" },
  { id: "q-004", title: "Flash Sale Banner", platform: "Meta", user: "lisa@brand.com", status: "failed", scheduledAt: "Apr 13, 9:00 AM", priority: "high" },
  { id: "q-005", title: "Customer Story Feature", platform: "LinkedIn", user: "anna@media.co", status: "completed", scheduledAt: "Apr 13, 8:00 AM", priority: "normal" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  processing: { icon: Loader2, color: "text-primary", bg: "bg-primary/15 border-primary/20" },
  queued: { icon: Clock, color: "text-muted-foreground", bg: "bg-secondary border-border" },
  failed: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/15 border-destructive/20" },
  completed: { icon: CheckCircle, color: "text-success", bg: "bg-success/15 border-success/20" },
};

const AdminQueue = () => {
  const [items, setItems] = useState(initialQueue);
  const [search, setSearch] = useState("");
  const [paused, setPaused] = useState(false);
  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));
  const counts = { processing: items.filter((i) => i.status === "processing").length, queued: items.filter((i) => i.status === "queued").length, failed: items.filter((i) => i.status === "failed").length, completed: items.filter((i) => i.status === "completed").length };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Post Queue</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            {paused ? <span className="text-[11px] px-2 py-0.5 rounded-full bg-warning/10 text-warning">⏸ Paused</span> : <span className="text-[11px] px-2 py-0.5 rounded-full bg-success/10 text-success flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success live-dot" /> Running</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs" onClick={() => { setPaused(!paused); toast.info(paused ? "Resumed" : "Paused"); }}>
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />} {paused ? "Resume" : "Pause"}
          </Button>
          <Button className="btn-glow gap-2" size="sm" onClick={() => { setItems((p) => p.map((i) => i.status === "failed" ? { ...i, status: "queued" } : i)); toast.success("Retrying failed"); }}>
            <RotateCcw className="h-3.5 w-3.5" /> Retry Failed
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Processing", value: counts.processing, icon: Loader2, color: "text-primary" },
          { label: "Queued", value: counts.queued, icon: Clock, color: "text-muted-foreground" },
          { label: "Failed", value: counts.failed, icon: AlertTriangle, color: "text-destructive" },
          { label: "Completed", value: counts.completed, icon: CheckCircle, color: "text-success" },
        ].map((s) => (
          <div key={s.label} className="glass-surface p-4">
            <p className="stat-label">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="glass-surface overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search queue..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-4 py-3 font-medium">Post</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Platform</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">User</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const cfg = statusConfig[item.status];
                return (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3.5"><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-muted-foreground">{item.scheduledAt}</p></td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground hidden md:table-cell">{item.platform}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground font-mono hidden lg:table-cell">{item.user}</td>
                    <td className="px-4 py-3.5"><span className={`text-[11px] px-2.5 py-1 rounded-full font-medium border capitalize ${cfg.bg} ${cfg.color}`}>{item.status}</span></td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {item.status === "failed" && <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => { setItems((p) => p.map((x) => x.id === item.id ? { ...x, status: "queued" } : x)); toast.success("Re-queued"); }}><RotateCcw className="h-3.5 w-3.5" /></Button>}
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => { setItems((p) => p.filter((x) => x.id !== item.id)); toast.success("Removed"); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminQueue;
