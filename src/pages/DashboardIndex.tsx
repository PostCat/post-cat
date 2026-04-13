import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Send, CreditCard, AlertCircle, TrendingUp, ArrowUpRight, Clock, MoreHorizontal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Scheduled", value: "12", icon: Calendar, trend: "+3 today", trendUp: true, color: "text-primary", bg: "bg-primary/10" },
  { label: "Published", value: "847", icon: Send, trend: "+24 this week", trendUp: true, color: "text-success", bg: "bg-success/10" },
  { label: "Failed", value: "3", icon: AlertCircle, trend: "-2 vs last week", trendUp: false, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Credits", value: "৳254,000", icon: CreditCard, trend: "Plenty left", trendUp: true, color: "text-primary", bg: "bg-primary/10" },
];

const chartData = [
  { name: "Mon", posts: 12 }, { name: "Tue", posts: 19 }, { name: "Wed", posts: 8 },
  { name: "Thu", posts: 22 }, { name: "Fri", posts: 15 }, { name: "Sat", posts: 28 }, { name: "Sun", posts: 18 },
];

const recentPosts = [
  { title: "Product Launch Announcement", platform: "Instagram", status: "published", time: "2h ago" },
  { title: "Weekly Tips Thread", platform: "X", status: "scheduled", time: "in 3h" },
  { title: "Behind the Scenes Reel", platform: "YouTube", status: "processing", time: "5h ago" },
  { title: "Customer Spotlight", platform: "LinkedIn", status: "published", time: "1d ago" },
  { title: "Flash Sale Promo", platform: "Meta", status: "failed", time: "2d ago" },
];

const statusColor: Record<string, string> = {
  published: "bg-success/15 text-success border border-success/20",
  scheduled: "bg-primary/15 text-primary border border-primary/20",
  processing: "bg-warning/15 text-warning border border-warning/20",
  failed: "bg-destructive/15 text-destructive border border-destructive/20",
};

const tooltipStyle = {
  backgroundColor: "hsl(250 18% 16%)",
  border: "1px solid hsl(250 12% 22%)",
  borderRadius: "10px",
  color: "hsl(0 0% 96%)",
  fontSize: "12px",
  padding: "8px 12px",
};

const DashboardIndex = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back — here's your overview.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Schedule Post", href: "/dashboard/scheduler", icon: Calendar },
            { label: "View API Keys", href: "/dashboard/api-keys", icon: CreditCard },
            { label: "Automation", href: "/dashboard/automation", icon: TrendingUp },
          ].map((a) => (
            <Link key={a.label} to={a.href}>
              <Button variant="outline" size="sm" className="gap-2 text-xs border-border/60 text-muted-foreground hover:text-foreground">
                <a.icon className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{a.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, ease: "easeOut" as const }} className="card-surface p-5 group hover:border-primary/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="stat-label">{s.label}</span>
              <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`h-4 w-4 ${s.color}`} /></div>
            </div>
            <p className={`stat-value ${s.color}`}>{s.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {s.trendUp && <ArrowUpRight className="h-3 w-3 text-success" />}
              <p className="text-xs text-muted-foreground">{s.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 card-surface p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">Activity Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Posts published this week</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(45 80% 55%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(45 80% 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(250 12% 20%)" />
              <XAxis dataKey="name" stroke="hsl(250 10% 45%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(250 10% 45%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="posts" stroke="hsl(45 80% 55%)" fillOpacity={1} fill="url(#colorPosts)" strokeWidth={2} dot={{ fill: "hsl(45 80% 55%)", strokeWidth: 0, r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card-surface p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">By Platform</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Post distribution</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[
              { name: "Meta", posts: 120 }, { name: "IG", posts: 230 }, { name: "YT", posts: 85 },
              { name: "LI", posts: 150 }, { name: "X", posts: 262 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(250 12% 20%)" />
              <XAxis dataKey="name" stroke="hsl(250 10% 45%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(250 10% 45%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="posts" radius={[6, 6, 0, 0]} fill="hsl(45 80% 55%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="font-semibold">Recent Posts</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Your latest scheduled & published content</p>
          </div>
          <Link to="/dashboard/scheduler">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="px-6">
          {recentPosts.map((post, i) => (
            <div key={post.title} className={`flex items-center justify-between py-4 ${i < recentPosts.length - 1 ? "border-b border-border" : ""}`}>
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">{post.platform[0]}</div>
                <div>
                  <p className="font-medium text-sm">{post.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{post.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[11px] px-2.5 py-1 rounded-full capitalize font-medium ${statusColor[post.status]}`}>{post.status}</span>
                <span className="text-xs text-muted-foreground w-14 text-right items-center gap-1 justify-end hidden sm:flex">
                  <Clock className="h-3 w-3" />{post.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;
