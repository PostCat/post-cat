import AdminLayout from "@/components/AdminLayout";
import { Shield, Lock, Ban, Key, AlertTriangle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const securityEvents = [
  { id: 1, event: "Brute force attack blocked", ip: "185.234.12.45", time: "12m ago", severity: "high" },
  { id: 2, event: "Suspicious API usage", ip: "92.45.67.123", time: "1h ago", severity: "medium" },
  { id: 3, event: "Failed login attempts (5x)", ip: "203.12.45.89", time: "2h ago", severity: "medium" },
  { id: 4, event: "SQL injection attempt", ip: "178.90.12.34", time: "4h ago", severity: "high" },
];

const sevColor: Record<string, string> = { high: "bg-destructive/15 text-destructive", medium: "bg-warning/15 text-warning", low: "bg-info/15 text-info" };

const AdminSecurity = () => {
  const [blockedIPs, setBlockedIPs] = useState([
    { ip: "185.234.12.45", reason: "Brute force", attempts: 847 },
    { ip: "178.90.12.34", reason: "SQL injection", attempts: 23 },
    { ip: "91.234.56.78", reason: "DDoS attempt", attempts: 12400 },
  ]);
  const [newIP, setNewIP] = useState("");

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold">Security</h1><p className="text-muted-foreground mt-1">Threat monitoring & access control</p></div>
        <Button className="btn-glow gap-2" size="sm" onClick={() => toast.info("Scan initiated...")}><Shield className="h-3.5 w-3.5" /> Run Scan</Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Threats Blocked (24h)", value: "23", icon: Shield, color: "text-success", bg: "bg-success/10" },
          { label: "Active Blocks", value: blockedIPs.length.toString(), icon: Ban, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "SSL Status", value: "Valid", icon: Lock, color: "text-success", bg: "bg-success/10" },
          { label: "2FA Adoption", value: "73%", icon: Key, color: "text-primary", bg: "bg-primary/10" },
        ].map((s) => (
          <div key={s.label} className="glass-surface p-5">
            <div className="flex items-center justify-between mb-3"><span className="stat-label">{s.label}</span><div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`h-4 w-4 ${s.color}`} /></div></div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="glass-surface p-6">
          <h3 className="font-semibold mb-4">Security Events</h3>
          {securityEvents.map((e) => (
            <div key={e.id} className="flex items-start justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-4 w-4 mt-0.5 ${e.severity === "high" ? "text-destructive" : "text-warning"}`} />
                <div>
                  <p className="text-sm font-medium">{e.event}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-mono text-muted-foreground">{e.ip}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium capitalize ${sevColor[e.severity]}`}>{e.severity}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{e.time}</span>
            </div>
          ))}
        </div>
        <div className="glass-surface p-6">
          <h3 className="font-semibold mb-4">Blocked IPs ({blockedIPs.length})</h3>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Enter IP..." value={newIP} onChange={(e) => setNewIP(e.target.value)} className="bg-secondary border-border h-9 font-mono text-sm" />
            <Button size="sm" className="btn-glow gap-1" onClick={() => {
              if (!newIP.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) { toast.error("Invalid IP"); return; }
              setBlockedIPs((p) => [{ ip: newIP, reason: "Manual", attempts: 0 }, ...p]); setNewIP(""); toast.success("Blocked");
            }}><Plus className="h-3.5 w-3.5" /> Block</Button>
          </div>
          {blockedIPs.map((ip) => (
            <div key={ip.ip} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div><p className="text-sm font-mono text-muted-foreground">{ip.ip}</p><p className="text-xs text-muted-foreground">{ip.reason} · {ip.attempts.toLocaleString()} attempts</p></div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => { setBlockedIPs((p) => p.filter((b) => b.ip !== ip.ip)); toast.success("Unblocked"); }}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSecurity;
