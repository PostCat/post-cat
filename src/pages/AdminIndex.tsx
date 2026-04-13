import AdminLayout from "@/components/AdminLayout";
import { Users, Send, Calendar, CheckCircle, AlertTriangle, Server, DollarSign, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Users", value: "1,284", icon: Users, trend: "+12%", trendUp: true, color: "text-primary", bg: "bg-primary/10" },
  { label: "Total Posts", value: "8,470", icon: Send, trend: "+24", trendUp: true, color: "text-success", bg: "bg-success/10" },
  { label: "Scheduled", value: "42", icon: Calendar, trend: "+3 today", trendUp: true, color: "text-info", bg: "bg-info/10" },
  { label: "Published", value: "847", icon: CheckCircle, trend: "+24 this week", trendUp: true, color: "text-success", bg: "bg-success/10" },
  { label: "Failed", value: "3", icon: AlertTriangle, trend: "-2 vs last", trendUp: false, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "API Requests", value: "48.2K", icon: Server, trend: "+15%", trendUp: true, color: "text-primary", bg: "bg-primary/10" },
  { label: "Revenue (MTD)", value: "৳12.4L", icon: DollarSign, trend: "+23%", trendUp: true, color: "text-success", bg: "bg-success/10" },
  { label: "Queue Size", value: "47", icon: Zap, trend: "12/min", trendUp: true, color: "text-warning", bg: "bg-warning/10" },
];

const recentActivity = [
  { event: "New user registration", user: "alex@example.com", time: "2m ago", type: "success" },
  { event: "API rate limit exceeded", user: "bot-service-3", time: "15m ago", type: "warning" },
  { event: "Subscription upgraded to Pro", user: "sarah@startup.io", time: "1h ago", type: "success" },
  { event: "Failed login attempt (3rd)", user: "unknown@spam.net", time: "2h ago", type: "error" },
  { event: "Bulk schedule completed", user: "team@agency.co", time: "3h ago", type: "success" },
];

const typeColor: Record<string, string> = { success: "text-success", warning: "text-warning", error: "text-destructive" };
const typeBg: Record<string, string> = { success: "bg-success/10", warning: "bg-warning/10", error: "bg-destructive/10" };

const AdminIndex = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Overview</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            System monitoring and analytics
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
              <span className="h-1.5 w-1.5 rounded-full bg-success live-dot" /> Live
            </span>
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs border-border/60 text-muted-foreground">Refresh</Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="stat-label">{s.label}</span>
              <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`h-4 w-4 ${s.color}`} /></div>
            </div>
            <p className={`stat-value ${s.color}`}>{s.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {s.trendUp ? <ArrowUpRight className="h-3 w-3 text-success" /> : <ArrowDownRight className="h-3 w-3 text-destructive" />}
              <p className="text-xs text-muted-foreground">{s.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="glass-surface p-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        {recentActivity.map((a, i) => (
          <div key={i} className={`flex items-center justify-between py-3 ${i < recentActivity.length - 1 ? "border-b border-border" : ""}`}>
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-lg ${typeBg[a.type]} flex items-center justify-center`}>
                <CheckCircle className={`h-3.5 w-3.5 ${typeColor[a.type]}`} />
              </div>
              <div><p className="text-sm font-medium">{a.event}</p><p className="text-xs text-muted-foreground">{a.user}</p></div>
            </div>
            <span className="text-xs text-muted-foreground">{a.time}</span>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminIndex;
