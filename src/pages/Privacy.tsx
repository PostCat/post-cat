import { Link } from "react-router-dom";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-20 max-w-3xl">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">← Back to Home</Link>
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert space-y-6 text-muted-foreground">
        <p>Last updated: April 13, 2026</p>
        <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
        <p>We collect information you provide directly, including name, email, and social media account details when you register for Post Cat.</p>
        <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
        <p>We use your information to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
        <h2 className="text-xl font-semibold text-foreground">3. Data Security</h2>
        <p>We implement industry-standard security measures to protect your data, including encryption at rest and in transit.</p>
        <h2 className="text-xl font-semibold text-foreground">4. Contact Us</h2>
        <p>If you have questions about this policy, contact us at <a href="mailto:privacy@postcat.io" className="text-primary hover:underline">privacy@postcat.io</a>.</p>
      </div>
    </div>
  </div>
);

export default Privacy;
