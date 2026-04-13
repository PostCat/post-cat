import DashboardLayout from "@/components/DashboardLayout";
import { Plus, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const accounts = [
  { platform: "Instagram", handle: "@postcat_official", status: "connected", posts: 234, icon: "I", followers: "12.4K" },
  { platform: "Meta (Facebook)", handle: "Post Cat Page", status: "connected", posts: 189, icon: "M", followers: "8.2K" },
  { platform: "YouTube", handle: "Post Cat Channel", status: "connected", posts: 45, icon: "Y", followers: "5.1K" },
  { platform: "LinkedIn", handle: "Post Cat Inc.", status: "expired", posts: 78, icon: "L", followers: "3.8K" },
  { platform: "X (Twitter)", handle: "@postcatio", status: "connected", posts: 312, icon: "X", followers: "15.7K" },
];

const DashboardAccounts = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Social Accounts</h1>
          <p className="text-muted-foreground mt-1">{accounts.length} accounts · {accounts.filter((a) => a.status === "connected").length} connected</p>
        </div>
        <Button className="btn-glow gap-2 h-10 px-5"><Plus className="h-4 w-4" /> Connect Account</Button>
      </div>
      <div className="space-y-3">
        {accounts.map((acc) => (
          <div key={acc.platform} className="card-surface p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/10 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-lg font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">{acc.icon}</div>
              <div>
                <p className="font-semibold">{acc.platform}</p>
                <p className="text-sm text-muted-foreground">{acc.handle}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{acc.followers}</p>
                <p className="text-xs text-muted-foreground">followers</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{acc.posts}</p>
                <p className="text-xs text-muted-foreground">posts</p>
              </div>
              {acc.status === "connected" ? (
                <span className="flex items-center gap-1.5 text-sm text-success bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
                  <CheckCircle className="h-3.5 w-3.5" /> Connected
                </span>
              ) : (
                <Button variant="outline" size="sm" className="gap-1.5 text-xs text-destructive border-destructive/30 hover:bg-destructive/10">
                  <RefreshCw className="h-3 w-3" /> Reconnect
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardAccounts;
