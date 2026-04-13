import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Image, Share2, CreditCard, Wallet, Zap, Key, Bell, Settings, LogOut, Shield, ChevronLeft, Menu, X } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Post Scheduler", path: "/dashboard/scheduler" },
  { icon: Image, label: "Media Library", path: "/dashboard/media" },
  { icon: Share2, label: "Social Accounts", path: "/dashboard/accounts" },
  { icon: Zap, label: "Automation", path: "/dashboard/automation" },
  { icon: Key, label: "API Keys", path: "/dashboard/api-keys" },
  { icon: CreditCard, label: "Subscription", path: "/dashboard/subscription" },
  { icon: Wallet, label: "Wallet", path: "/dashboard/wallet" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src="/logo.png" alt="Post Cat" className="h-7 w-7 flex-shrink-0" />
          {!collapsed && <span className="font-bold text-sidebar-foreground whitespace-nowrap">Post Cat</span>}
        </div>
        <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }} className="text-sidebar-muted hover:text-sidebar-foreground transition-colors p-1 hidden md:block">
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
        <button onClick={() => setMobileOpen(false)} className="text-sidebar-muted hover:text-sidebar-foreground transition-colors p-1 md:hidden">
          <X className="h-4 w-4" />
        </button>
      </div>
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
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
        <Link to="/admin" title={collapsed ? "Admin Panel" : undefined} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <Shield className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Admin Panel</span>}
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
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">PC</div>
            <p className="text-sm font-medium">Post Cat User</p>
          </div>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
