import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const plans = [
  { name: "Free", price: "৳0", features: ["10 posts/month", "1 social account", "Basic scheduling", "Community support"], current: false },
  { name: "Pro", price: "৳2,900", features: ["Unlimited posts", "5 social accounts", "Automation add-ons", "API access", "Priority support"], current: true },
  { name: "Enterprise", price: "৳9,900", features: ["Everything in Pro", "Unlimited accounts", "Dedicated API", "Custom integrations", "24/7 phone support"], current: false },
];

const DashboardSubscription = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your plan and billing.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`card-surface p-6 ${plan.current ? "ring-2 ring-primary" : ""}`}>
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-3xl font-bold mt-2">{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-success" />{f}
                </li>
              ))}
            </ul>
            <Button className={`w-full mt-6 ${plan.current ? "btn-glow" : ""}`} variant={plan.current ? "default" : "outline"}>
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardSubscription;
