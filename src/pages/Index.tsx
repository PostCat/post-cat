import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Zap, Terminal, Shield, BarChart3, Calendar, Globe, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const dur = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{val.toLocaleString()}{suffix}</>;
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10" : "bg-transparent"}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Post Cat" className="h-8 w-8" />
          <span className="text-lg font-bold text-foreground">Post Cat</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">Log in</Button>
          </Link>
          <Link to="/dashboard">
            <Button className="btn-glow text-sm px-5 h-9">Start Free</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const features = [
  { icon: Calendar, title: "Smart Scheduling", desc: "Schedule posts across multiple platforms with our intuitive calendar. Set optimal times for maximum engagement." },
  { icon: Zap, title: "Automation Add-ons", desc: "Automate repetitive tasks like daily posting, cross-platform sync, and bulk scheduling from CSV." },
  { icon: Terminal, title: "REST API", desc: "Full-featured API for developers. Schedule, manage, and publish content programmatically." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track engagement, monitor post performance, and get actionable insights across all platforms." },
  { icon: Globe, title: "Multi-Platform", desc: "Connect Instagram, X, YouTube, LinkedIn, Meta, and more. One dashboard to manage them all." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant with 2FA, IP whitelisting, audit logs, and encrypted data at rest." },
];

const stats = [
  { value: 500, suffix: "+", label: "Active Users" },
  { value: 48, suffix: "K", label: "API Calls / Day" },
  { value: 99, suffix: ".9%", label: "Uptime" },
  { value: 5, suffix: "", label: "Platforms" },
];

const pricingPlans = [
  { name: "Free", price: "৳0", desc: "For individuals getting started", features: ["10 posts/month", "1 social account", "Basic scheduling", "Community support"], popular: false },
  { name: "Pro", price: "৳999", desc: "For growing creators and teams", features: ["Unlimited posts", "5 social accounts", "Automation add-ons", "Full API access", "Priority support", "Analytics dashboard"], popular: true },
  { name: "Enterprise", price: "৳1999", desc: "For agencies and large teams", features: ["Everything in Pro", "Unlimited accounts", "Dedicated API endpoint", "Custom integrations", "24/7 phone support", "SLA guarantee"], popular: false },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero relative min-h-[100vh] flex items-center pt-16 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/[0.03] rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8 shimmer">
                <Zap className="h-3.5 w-3.5" />
                Site Under Development
                <ChevronRight className="h-3.5 w-3.5" />
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.08] tracking-tight">
                <span className="text-gradient-subtle">Automate your</span>{" "}
                <br className="hidden sm:block" />
                <span className="text-gradient-subtle">content with</span>{" "}
                <br />
                <span className="text-gradient">Post Cat API</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                Post Cat helps you automate your content with a powerful scheduling system and API. Manage posts, upload media, and publish across multiple platforms easily from one place.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button className="btn-glow px-7 h-12 text-base gap-2">
                    Get Started Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="px-7 h-12 text-base gap-2 border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:border-border">
                  <Play className="h-4 w-4" /> See How It Works
                </Button>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["SC", "MT", "LP", "AK", "JD"].map((initials, i) => (
                    <div key={initials} className="h-9 w-9 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground" style={{ zIndex: 5 - i }}>
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Trusted by <span className="text-foreground font-medium">500+</span> creators</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
              className="hidden lg:block"
            >
              <div className="glow-ring rounded-2xl bg-card p-6 float-animation relative">
                <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-success text-success-foreground text-xs font-semibold">Live</div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-3 w-3 rounded-full bg-destructive/80" />
                  <div className="h-3 w-3 rounded-full bg-primary/80" />
                  <div className="h-3 w-3 rounded-full bg-success/80" />
                  <span className="ml-2 text-sm text-muted-foreground font-medium">Post Cat Dashboard</span>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Scheduled", value: 12, color: "text-primary" },
                    { label: "Published", value: 847, color: "text-success" },
                    { label: "Failed", value: 3, color: "text-destructive" },
                    { label: "Balance", value: "৳250K", color: "text-foreground" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                      <p className={`text-xl font-bold mt-1 ${stat.color}`}>
                        {typeof stat.value === "number" ? <CountUp target={stat.value} /> : stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground font-medium">Weekly Activity</span>
                    <span className="text-xs text-primary font-medium">+23%</span>
                  </div>
                  <div className="h-28 flex items-end gap-1.5">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-sm bg-primary"
                        style={{ opacity: 0.3 + (h / 200) }}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.6 + i * 0.04, duration: 0.5, ease: "easeOut" as const }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Bar */}
      <section className="py-16 section-divider">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8">Works with your favorite platforms</p>
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { name: "Meta", icon: "M" },
              { name: "Instagram", icon: "I" },
              { name: "YouTube", icon: "Y" },
              { name: "LinkedIn", icon: "L" },
              { name: "X", icon: "X" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-sm font-bold">{p.icon}</div>
                <span className="text-sm font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 section-divider">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase text-primary font-medium mb-3">Features</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Smart Scheduling & <span className="text-gradient">Automation</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Everything you need to automate your social media content workflow, from scheduling to analytics.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="card-surface-hover p-7 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-primary/[0.08] border border-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/[0.15] group-hover:border-primary/20 transition-all duration-300">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 section-divider">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-gradient">
                  <CountUp target={s.value} />{s.suffix}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="py-28 section-divider">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase text-primary font-medium mb-3">Developer API</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Powerful API for <span className="text-gradient">Content Automation</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 text-muted-foreground leading-relaxed text-base">
                Integrate Post Cat into your workflow with our developer-friendly REST API. Schedule posts, manage media, and automate publishing — all programmatically.
              </motion.p>
              <motion.ul variants={fadeUp} className="mt-6 space-y-3">
                {["RESTful endpoints with JSON responses", "OAuth 2.0 & API key authentication", "Webhooks for real-time event notifications", "Rate limiting with generous quotas"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="mt-8 flex gap-4">
                <Link to="/dashboard/api-keys">
                  <Button className="btn-glow gap-2 h-11 px-6">
                    <Terminal className="h-4 w-4" /> Get API Key
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-xl overflow-hidden border border-border bg-card">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">schedule-post.sh</span>
                </div>
                <pre className="p-5 text-[13px] leading-7 overflow-x-auto scrollbar-thin">
                  <code>
                    <span className="text-muted-foreground/40"># Schedule a post via API</span>{"\n"}
                    <span className="text-primary font-medium">curl</span> <span className="text-muted-foreground">-X POST \</span>{"\n"}
                    {"  "}<span className="text-success">https://api.postcat.io/v1/schedule</span> <span className="text-muted-foreground">\</span>{"\n"}
                    {"  "}<span className="text-muted-foreground">-H</span> <span className="text-success">"Authorization: Bearer $API_KEY"</span> <span className="text-muted-foreground">\</span>{"\n"}
                    {"  "}<span className="text-muted-foreground">-d</span> <span className="text-primary">{"'{"}</span>{"\n"}
                    {"    "}<span className="text-foreground">"platform"</span>: <span className="text-success">"instagram"</span>,{"\n"}
                    {"    "}<span className="text-foreground">"content"</span>: <span className="text-success">"Hello from Post Cat! 🐱"</span>,{"\n"}
                    {"    "}<span className="text-foreground">"schedule_at"</span>: <span className="text-success">"2026-04-15T10:00:00Z"</span>{"\n"}
                    {"  "}<span className="text-primary">{"}"}{"'"}</span>
                  </code>
                </pre>
                <div className="px-5 py-3 border-t border-border bg-success/5">
                  <code className="text-xs text-success">✓ 200 OK — Post scheduled for Apr 15 at 10:00 AM UTC</code>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28 section-divider">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase text-primary font-medium mb-3">Pricing</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold">Simple, transparent pricing</motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground max-w-lg mx-auto">Start free and scale as you grow. No hidden fees.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <motion.div key={plan.name} variants={fadeUp} className={`card-surface p-7 relative ${plan.popular ? "ring-2 ring-primary/50 glow-ring" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Most Popular</div>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
                <p className="text-4xl font-bold mt-4">{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/dashboard">
                  <Button className={`w-full mt-8 ${plan.popular ? "btn-glow" : ""}`} variant={plan.popular ? "default" : "outline"}>
                    {plan.popular ? "Start Free Trial" : "Get Started"}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 section-divider">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Ready to automate your <span className="text-gradient">content?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Join 500+ creators and teams using Post Cat to streamline their social media workflow.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex justify-center gap-4">
              <Link to="/dashboard">
                <Button className="btn-glow px-8 h-12 text-base gap-2">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Post Cat" className="h-7 w-7" />
              <span className="font-bold">Post Cat</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <a href="mailto:support@postcat.io" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 Post Cat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
