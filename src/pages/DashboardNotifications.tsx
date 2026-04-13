import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Bell, CheckCircle, AlertTriangle, Info, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

const initialNotifications = [
  { id: 1, type: "success", title: "Post published successfully", desc: "Your Instagram post 'Product Launch' was published and is live.", time: "2h ago", read: false },
  { id: 2, type: "warning", title: "API rate limit warning", desc: "You've used 80% of your hourly API limit. Consider upgrading.", time: "5h ago", read: false },
  { id: 3, type: "info", title: "New feature: Bulk scheduling", desc: "Bulk scheduling is now available for all Pro users.", time: "1d ago", read: false },
  { id: 4, type: "success", title: "Automation completed", desc: "Daily image post automation ran successfully.", time: "1d ago", read: true },
  { id: 5, type: "warning", title: "LinkedIn token expiring", desc: "Your LinkedIn token will expire in 3 days.", time: "2d ago", read: true },
  { id: 6, type: "success", title: "Weekly report ready", desc: "Your weekly analytics report is ready to view.", time: "3d ago", read: true },
  { id: 7, type: "info", title: "Maintenance scheduled", desc: "Planned maintenance on Apr 20, 2026, 2:00-4:00 AM UTC.", time: "4d ago", read: true },
  { id: 8, type: "warning", title: "Failed post: YouTube", desc: "Your YouTube video upload failed due to quota limits.", time: "5d ago", read: true },
];

const typeIcon: Record<string, typeof CheckCircle> = { success: CheckCircle, warning: AlertTriangle, info: Info };
const typeColor: Record<string, string> = { success: "text-success", warning: "text-warning", info: "text-info" };
const typeBg: Record<string, string> = { success: "bg-success/10", warning: "bg-warning/10", info: "bg-info/10" };

const DashboardNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">{unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs gap-1.5 border-border/60 text-muted-foreground" onClick={() => { setNotifications((p) => p.map((n) => ({ ...n, read: true }))); toast.success("All marked read"); }}>
          <Check className="h-3.5 w-3.5" /> Mark all read
        </Button>
      </div>
      <div className="flex gap-1 mb-6">
        {["all", "unread", "read"].map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" className={`text-xs capitalize ${filter === f ? "btn-glow" : "border-border/60 text-muted-foreground"}`} onClick={() => setFilter(f)}>
            {f} {f === "unread" && unreadCount > 0 && `(${unreadCount})`}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((n) => {
          const Icon = typeIcon[n.type];
          return (
            <motion.div key={n.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`glass-surface p-5 flex items-start gap-4 group transition-all ${!n.read ? "border-l-2 border-l-primary" : "opacity-75"}`}>
              <div className={`h-9 w-9 rounded-xl ${typeBg[n.type]} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-4 w-4 ${typeColor[n.type]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{n.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">{n.time}</span>
                {!n.read && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-success opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setNotifications((p) => p.map((x) => x.id === n.id ? { ...x, read: true } : x))}>
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => { setNotifications((p) => p.filter((x) => x.id !== n.id)); toast.success("Removed"); }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="glass-surface p-12 text-center">
            <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-muted-foreground">No notifications to show</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotifications;
