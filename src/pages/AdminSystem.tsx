import AdminLayout from "@/components/AdminLayout";
import { Server, Cpu, CheckCircle, AlertTriangle } from "lucide-react";

const services = [
  { name: "API Gateway", status: "healthy", uptime: "99.99%", load: "23%" },
  { name: "Post Scheduler", status: "healthy", uptime: "99.95%", load: "45%" },
  { name: "Media Processor", status: "healthy", uptime: "99.90%", load: "67%" },
  { name: "Auth Service", status: "healthy", uptime: "100%", load: "12%" },
  { name: "Webhook Relay", status: "degraded", uptime: "98.5%", load: "89%" },
  { name: "CDN Edge", status: "healthy", uptime: "99.99%", load: "34%" },
];

const AdminSystem = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Health</h1>
        <p className="text-muted-foreground mt-1">Infrastructure monitoring & service status</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "CPU Usage", value: "34%", icon: Cpu, color: "text-primary" },
          { label: "Memory", value: "62%", icon: Server, color: "text-warning" },
          { label: "Disk", value: "45%", icon: Server, color: "text-success" },
          { label: "Network", value: "1.2 Gbps", icon: Server, color: "text-info" },
        ].map((s) => (
          <div key={s.label} className="glass-surface p-5">
            <p className="stat-label">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="glass-surface overflow-hidden">
        <div className="p-6 pb-4"><h3 className="font-semibold">Services</h3></div>
        <div className="px-6 pb-4 space-y-3">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                {s.status === "healthy" ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-warning" />}
                <div><p className="text-sm font-medium">{s.name}</p><p className="text-xs text-muted-foreground">Uptime: {s.uptime}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Load: {s.load}</span>
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium capitalize ${s.status === "healthy" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSystem;
