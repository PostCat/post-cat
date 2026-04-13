import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ban, CheckCircle, UserPlus, Shield, Trash2, Users, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", plan: "Pro", status: "active", role: "user", posts: 234, joined: "Jan 15, 2026" },
  { id: 2, name: "Sarah Chen", email: "sarah@startup.io", plan: "Enterprise", status: "active", role: "admin", posts: 1289, joined: "Nov 3, 2025" },
  { id: 3, name: "Mike Williams", email: "mike@agency.co", plan: "Pro", status: "active", role: "user", posts: 567, joined: "Feb 20, 2026" },
  { id: 4, name: "Emma Davis", email: "emma@creator.net", plan: "Free", status: "active", role: "user", posts: 45, joined: "Mar 10, 2026" },
  { id: 5, name: "James Wilson", email: "james@tech.io", plan: "Pro", status: "suspended", role: "user", posts: 0, joined: "Apr 1, 2026" },
  { id: 6, name: "Lisa Anderson", email: "lisa@brand.com", plan: "Enterprise", status: "active", role: "user", posts: 892, joined: "Dec 15, 2025" },
];

const planBadge: Record<string, string> = { Free: "bg-secondary text-muted-foreground", Pro: "bg-primary/15 text-primary border border-primary/20", Enterprise: "bg-success/15 text-success border border-success/20" };
const statusBadge: Record<string, string> = { active: "bg-success/15 text-success", suspended: "bg-destructive/15 text-destructive" };

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">{users.length} total · {users.filter((u) => u.status === "active").length} active</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs"><Download className="h-3.5 w-3.5" /> Export</Button>
          <Button className="btn-glow gap-2"><UserPlus className="h-4 w-4" /> Add User</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: users.length, icon: Users, color: "text-primary" },
          { label: "Active", value: users.filter((u) => u.status === "active").length, icon: CheckCircle, color: "text-success" },
          { label: "Suspended", value: users.filter((u) => u.status === "suspended").length, icon: Ban, color: "text-destructive" },
          { label: "Admins", value: users.filter((u) => u.role === "admin").length, icon: Shield, color: "text-warning" },
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
            <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-4 py-3 font-medium">User</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Plan</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Posts</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <div><p className="text-sm font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${planBadge[u.plan]}`}>{u.plan}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium capitalize ${statusBadge[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground hidden lg:table-cell">{u.posts.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-warning" onClick={() => { setUsers((p) => p.map((x) => x.id === u.id ? { ...x, status: x.status === "active" ? "suspended" : "active" } : x)); toast.success("Updated"); }}>
                        <Ban className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => { setUsers((p) => p.filter((x) => x.id !== u.id)); toast.success("Removed"); }}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
