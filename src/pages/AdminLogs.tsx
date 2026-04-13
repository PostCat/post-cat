import AdminLayout from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertTriangle, CheckCircle, Info, Download, Terminal, ChevronDown } from "lucide-react";
import { useState } from "react";

const allLogs = [
  { id: 1, timestamp: "2026-04-13 10:45:23", level: "info", service: "scheduler", message: "Post q-001 picked up for processing", source: "worker-3", statusCode: 200 },
  { id: 2, timestamp: "2026-04-13 10:44:12", level: "warning", message: "API rate limit approaching for user bot-service-3 (85%)", service: "api-gateway", source: "rate-limiter", statusCode: 429 },
  { id: 3, timestamp: "2026-04-13 10:43:05", level: "error", service: "publisher", message: "Failed to publish to Instagram: Token expired", source: "ig-connector", statusCode: 401 },
  { id: 4, timestamp: "2026-04-13 10:42:00", level: "info", service: "auth", message: "New user registration: tom@freelance.dev", source: "auth-service", statusCode: 201 },
  { id: 5, timestamp: "2026-04-13 10:40:45", level: "info", service: "scheduler", message: "Bulk schedule completed: 42 posts queued", source: "bulk-processor", statusCode: 200 },
  { id: 6, timestamp: "2026-04-13 10:39:30", level: "warning", service: "storage", message: "Storage usage at 78% for user lisa@brand.com", source: "storage-monitor", statusCode: 200 },
  { id: 7, timestamp: "2026-04-13 10:38:15", level: "info", service: "billing", message: "Subscription upgraded: sarah@startup.io → Enterprise", source: "billing-service", statusCode: 200 },
  { id: 8, timestamp: "2026-04-13 10:37:00", level: "error", service: "publisher", message: "YouTube API quota exceeded. Retry in 1h", source: "yt-connector", statusCode: 403 },
];

const levelConfig: Record<string, { icon: typeof Info; color: string; bg: string }> = {
  info: { icon: Info, color: "text-info", bg: "bg-info/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  error: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
};

const AdminLogs = () => {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);
  const filtered = allLogs.filter((l) => {
    const matchSearch = l.message.toLowerCase().includes(search.toLowerCase()) || l.service.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === "all" || l.level === levelFilter;
    return matchSearch && matchLevel;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">System Logs</h1>
          <p className="text-muted-foreground mt-1">{allLogs.length} entries · Real-time</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs"><Download className="h-3.5 w-3.5" /> Export</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Info", value: allLogs.filter((l) => l.level === "info").length, icon: Info, color: "text-info" },
          { label: "Warnings", value: allLogs.filter((l) => l.level === "warning").length, icon: AlertTriangle, color: "text-warning" },
          { label: "Errors", value: allLogs.filter((l) => l.level === "error").length, icon: AlertTriangle, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="glass-surface p-4">
            <p className="stat-label">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="glass-surface overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
          </div>
          <div className="flex gap-1">
            {["all", "info", "warning", "error"].map((l) => (
              <Button key={l} variant={levelFilter === l ? "default" : "outline"} size="sm" className={`text-xs capitalize ${levelFilter === l ? "btn-glow" : "border-border/60 text-muted-foreground"}`} onClick={() => setLevelFilter(l)}>
                {l}
              </Button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((log) => {
            const cfg = levelConfig[log.level];
            return (
              <div key={log.id} className="hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => setExpanded(expanded === log.id ? null : log.id)}>
                <div className="flex items-center gap-4 px-4 py-3">
                  <div className={`h-7 w-7 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                    <cfg.icon className={`h-3.5 w-3.5 ${cfg.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono w-36 flex-shrink-0 hidden md:block">{log.timestamp}</span>
                  <span className="text-xs font-medium text-muted-foreground w-20 flex-shrink-0 hidden lg:block">{log.service}</span>
                  <p className="text-sm flex-1 truncate">{log.message}</p>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded === log.id ? "rotate-180" : ""}`} />
                </div>
                {expanded === log.id && (
                  <div className="px-4 pb-3 ml-11 text-xs text-muted-foreground space-y-1 font-mono bg-secondary/20 mx-4 mb-3 rounded-lg p-3">
                    <p>Service: {log.service}</p>
                    <p>Source: {log.source}</p>
                    <p>Status: {log.statusCode}</p>
                    <p>Timestamp: {log.timestamp}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLogs;
