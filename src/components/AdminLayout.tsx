import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Database, Shield, Activity, Settings, LogOut, ListChecks, ChevronLeft, Inbox, Menu, X } from "lucide-react";

const adminNav = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: ListChecks, label: "Post Queue", path: "/admin/queue" },
  { icon: Activity, label: "System Logs", path: "/admin/logs" },
  { icon: Database, label: "System", path: "/admin/system" },
  { icon: Shield, label: "Security", path: "/admin/security" },
  { icon: Inbox, label: "Reports", path: "/admin/reports" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src="/logo.png" alt="Post Cat" className="h-7 w-7 flex-shrink-0" />
          {!collapsed && <span className="font-bold text-sidebar-foreground whitespace-nowrap">Admin Panel</span>}
        </div>
        <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }} className="text-sidebar-muted hover:text-sidebar-foreground transition-colors p-1 hidden md:block">
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
        <button onClick={() => setMobileOpen(false)} className="text-sidebar-muted hover:text-sidebar-foreground transition-colors p-1 md:hidden">
          <X className="h-4 w-4" />
        </button>
      </div>
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {adminNav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                active
                  ? "bg-primary/10 text-primary font-medium border border-primary/10"
                  : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-2 border-t border-sidebar-border space-y-0.5">
        <Link to="/dashboard" title={collapsed ? "User Dashboard" : undefined} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>User Dashboard</span>}
        </Link>
        <Link to="/" title={collapsed ? "Back to Home" : undefined} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Back to Home</span>}
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {mobileOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebarContent}
      </aside>
      <aside className={`${collapsed ? "w-[72px]" : "w-64"} bg-sidebar border-r border-sidebar-border flex-col fixed inset-y-0 left-0 z-40 transition-all duration-300 hidden md:flex`}>
        {sidebarContent}
      </aside>
      <main className={`flex-1 ${collapsed ? "md:ml-[72px]" : "md:ml-64"} transition-all duration-300`}>
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4 md:px-8 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="mr-3 text-muted-foreground hover:text-foreground md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin Mode</p>
              <p className="text-xs text-muted-foreground">Full system access</p>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
