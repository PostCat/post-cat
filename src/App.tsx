import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import DashboardIndex from "./pages/DashboardIndex";
import DashboardScheduler from "./pages/DashboardScheduler";
import DashboardMedia from "./pages/DashboardMedia";
import DashboardAccounts from "./pages/DashboardAccounts";
import DashboardAutomation from "./pages/DashboardAutomation";
import DashboardApiKeys from "./pages/DashboardApiKeys";
import DashboardSubscription from "./pages/DashboardSubscription";
import DashboardWallet from "./pages/DashboardWallet";
import DashboardNotifications from "./pages/DashboardNotifications";
import DashboardSettings from "./pages/DashboardSettings";
import AdminIndex from "./pages/AdminIndex";
import AdminUsers from "./pages/AdminUsers";
import AdminQueue from "./pages/AdminQueue";
import AdminLogs from "./pages/AdminLogs";
import AdminSystem from "./pages/AdminSystem";
import AdminSecurity from "./pages/AdminSecurity";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/dashboard/scheduler" element={<DashboardScheduler />} />
          <Route path="/dashboard/media" element={<DashboardMedia />} />
          <Route path="/dashboard/accounts" element={<DashboardAccounts />} />
          <Route path="/dashboard/automation" element={<DashboardAutomation />} />
          <Route path="/dashboard/api-keys" element={<DashboardApiKeys />} />
          <Route path="/dashboard/subscription" element={<DashboardSubscription />} />
          <Route path="/dashboard/wallet" element={<DashboardWallet />} />
          <Route path="/dashboard/notifications" element={<DashboardNotifications />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/queue" element={<AdminQueue />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/system" element={<AdminSystem />} />
          <Route path="/admin/security" element={<AdminSecurity />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
