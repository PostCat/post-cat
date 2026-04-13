import { Link } from "react-router-dom";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-20 max-w-3xl">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">← Back to Home</Link>
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert space-y-6 text-muted-foreground">
        <p>Last updated: April 13, 2026</p>
        <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
        <p>By accessing Post Cat, you agree to be bound by these Terms of Service and all applicable laws.</p>
        <h2 className="text-xl font-semibold text-foreground">2. Use of Service</h2>
        <p>You may use Post Cat to schedule and manage social media content. You are responsible for all content posted through your account.</p>
        <h2 className="text-xl font-semibold text-foreground">3. API Usage</h2>
        <p>API access is subject to rate limits based on your subscription plan. Abuse of the API may result in account suspension.</p>
        <h2 className="text-xl font-semibold text-foreground">4. Contact</h2>
        <p>Questions? Email <a href="mailto:legal@postcat.io" className="text-primary hover:underline">legal@postcat.io</a>.</p>
      </div>
    </div>
  </div>
);

export default Terms;
