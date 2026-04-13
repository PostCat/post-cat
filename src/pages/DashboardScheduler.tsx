import DashboardLayout from "@/components/DashboardLayout";
import { Calendar, Clock, Plus, Filter, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const scheduledPosts = [
  { id: 1, title: "Product Launch Announcement", platform: "Instagram", date: "Apr 15, 2026", time: "10:00 AM", status: "scheduled", type: "Image" },
  { id: 2, title: "Weekly Tips Thread", platform: "X", date: "Apr 15, 2026", time: "1:00 PM", status: "scheduled", type: "Text" },
  { id: 3, title: "Behind the Scenes", platform: "YouTube", date: "Apr 16, 2026", time: "3:00 PM", status: "draft", type: "Video" },
  { id: 4, title: "Customer Spotlight", platform: "LinkedIn", date: "Apr 17, 2026", time: "9:00 AM", status: "scheduled", type: "Carousel" },
  { id: 5, title: "Flash Sale Promo", platform: "Meta", date: "Apr 18, 2026", time: "12:00 PM", status: "draft", type: "Image" },
  { id: 6, title: "Tutorial Series #3", platform: "YouTube", date: "Apr 19, 2026", time: "2:00 PM", status: "scheduled", type: "Video" },
  { id: 7, title: "Team Update", platform: "LinkedIn", date: "Apr 20, 2026", time: "11:00 AM", status: "draft", type: "Text" },
];

const statusStyle: Record<string, string> = {
  scheduled: "bg-primary/15 text-primary border border-primary/20",
  draft: "bg-secondary text-muted-foreground border border-border",
};

const DashboardScheduler = () => {
  const [search, setSearch] = useState("");
  const filtered = scheduledPosts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Post Scheduler</h1>
          <p className="text-muted-foreground mt-1">{scheduledPosts.length} posts · {scheduledPosts.filter((p) => p.status === "scheduled").length} scheduled</p>
        </div>
        <Button className="btn-glow gap-2 h-10 px-5"><Plus className="h-4 w-4" /> New Post</Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Scheduled", value: scheduledPosts.filter((p) => p.status === "scheduled").length, color: "text-primary" },
          { label: "Drafts", value: scheduledPosts.filter((p) => p.status === "draft").length, color: "text-muted-foreground" },
          { label: "This Week", value: 4, color: "text-success" },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="stat-label">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs border-border/60 text-muted-foreground"><Filter className="h-3 w-3" /> Filter</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-4 py-3 font-medium">Post</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Platform</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3.5 text-sm font-medium">{post.title}</td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">{post.platform[0]}</div>
                      <span className="text-sm text-muted-foreground">{post.platform}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground hidden lg:table-cell">{post.type}</td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full capitalize font-medium ${statusStyle[post.status]}`}>{post.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardScheduler;
