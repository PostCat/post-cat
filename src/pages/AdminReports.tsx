import AdminLayout from "@/components/AdminLayout";
import { Download, TrendingUp, Users, DollarSign, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Total Revenue", value: "৳48,20,000", trend: "+23%", icon: DollarSign, color: "text-success" },
  { label: "New Users (30d)", value: "284", trend: "+18%", icon: Users, color: "text-primary" },
  { label: "Posts Published", value: "12,400", trend: "+31%", icon: Send, color: "text-info" },
  { label: "Growth Rate", value: "12%", trend: "+5%", icon: TrendingUp, color: "text-warning" },
];

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold">Reports</h1><p className="text-muted-foreground mt-1">Analytics and business insights</p></div>
        <Button variant="outline" size="sm" className="gap-2 text-xs"><Download className="h-3.5 w-3.5" /> Export Report</Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="glass-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="stat-label">{m.label}</span>
              <m.icon className={`h-5 w-5 ${m.color} opacity-40`} />
            </div>
            <p className={`stat-value ${m.color}`}>{m.value}</p>
            <p className="text-xs text-success mt-1">{m.trend} vs last month</p>
          </div>
        ))}
      </div>
      <div className="glass-surface p-6">
        <h3 className="font-semibold mb-4">Monthly Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-4 py-3 font-medium">Month</th>
                <th className="text-left px-4 py-3 font-medium">Users</th>
                <th className="text-left px-4 py-3 font-medium">Posts</th>
                <th className="text-left px-4 py-3 font-medium">Revenue</th>
                <th className="text-left px-4 py-3 font-medium">Growth</th>
              </tr>
            </thead>
            <tbody>
              {[
                { month: "April 2026", users: 284, posts: 3200, revenue: "৳12.4L", growth: "+23%" },
                { month: "March 2026", users: 241, posts: 2800, revenue: "৳10.1L", growth: "+18%" },
                { month: "February 2026", users: 204, posts: 2400, revenue: "৳8.5L", growth: "+15%" },
                { month: "January 2026", users: 177, posts: 2000, revenue: "৳7.4L", growth: "+12%" },
              ].map((r) => (
                <tr key={r.month} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3.5 text-sm font-medium">{r.month}</td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">{r.users}</td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">{r.posts.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-sm text-success font-medium">{r.revenue}</td>
                  <td className="px-4 py-3.5 text-sm text-success">{r.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
