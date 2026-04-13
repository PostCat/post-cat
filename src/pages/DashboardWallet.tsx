import DashboardLayout from "@/components/DashboardLayout";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const transactions = [
  { id: 1, type: "credit", amount: "+৳5,000", desc: "Credit purchase", date: "Apr 12, 2026" },
  { id: 2, type: "debit", amount: "-৳250", desc: "Post scheduled (Instagram)", date: "Apr 12, 2026" },
  { id: 3, type: "debit", amount: "-৳100", desc: "API call batch", date: "Apr 11, 2026" },
  { id: 4, type: "credit", amount: "+৳10,000", desc: "Plan credit bonus", date: "Apr 10, 2026" },
  { id: 5, type: "debit", amount: "-৳500", desc: "Automation run", date: "Apr 9, 2026" },
];

const DashboardWallet = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground mt-1">Manage your credits and transactions.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card-surface p-6">
          <p className="stat-label">Balance</p>
          <p className="stat-value text-primary mt-1">৳254,000</p>
        </div>
        <div className="card-surface p-6">
          <p className="stat-label">Spent This Month</p>
          <p className="stat-value text-foreground mt-1">৳8,650</p>
        </div>
        <div className="card-surface p-6 flex items-end">
          <Button className="btn-glow w-full">Add Credits</Button>
        </div>
      </div>
      <div className="card-surface p-6">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                {t.type === "credit" ? (
                  <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center"><ArrowDownLeft className="h-4 w-4 text-success" /></div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center"><ArrowUpRight className="h-4 w-4 text-destructive" /></div>
                )}
                <div>
                  <p className="text-sm font-medium">{t.desc}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </div>
              <span className={`font-semibold text-sm ${t.type === "credit" ? "text-success" : "text-foreground"}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardWallet;
