import Link from "next/link";

const features = [
  {
    title: "One-Click Workflow Import",
    description:
      "Connect Make, Zapier, or n8n via API or JSON export. AutoDoc parses every node, route, and filter automatically — no manual copy-paste.",
    icon: "🔗",
  },
  {
    title: "AI-Generated Runbooks",
    description:
      "Get step-by-step plain-English documentation with annotated screenshots. Every trigger, action, and branch explained like a senior engineer wrote it.",
    icon: "📖",
  },
  {
    title: "Modular Node Breakdown",
    description:
      "Each node documented with inputs, outputs, failure modes, and retry logic. Know exactly what breaks when an API limit hits.",
    icon: "🧩",
  },
  {
    title: "PDF & Notion Export",
    description:
      "One-click export to PDF for clients or push directly to Notion. Shareable runbooks your team can actually maintain.",
    icon: "📤",
  },
  {
    title: "Change Detection",
    description:
      "Nightly polling detects workflow updates and re-generates docs automatically. Never fall behind when a consultant edits your Zaps.",
    icon: "🔄",
  },
  {
    title: "Mailbox Money Ops",
    description:
      "Stripe billing, serverless doc generation, and AI support chat. Under 1 hour/week of owner maintenance.",
    icon: "💰",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    workflows: "5 workflows/month",
    features: [
      "Make, Zapier & n8n import",
      "AI runbook generation",
      "PDF export",
      "Change detection",
      "Email support",
    ],
    cta: "Start with Starter",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$79",
    period: "/month",
    workflows: "20 workflows/month",
    features: [
      "Everything in Starter",
      "Notion sync",
      "Priority re-generation",
      "Team sharing links",
      "Slack notifications",
    ],
    cta: "Go Growth",
    highlighted: true,
  },
  {
    name: "Pay-as-you-go",
    price: "$0.99",
    period: "/workflow",
    workflows: "Extra docs beyond plan",
    features: [
      "No subscription required",
      "Single workflow import",
      "Full runbook + export",
      "Valid for 30 days",
      "Perfect for one-off audits",
    ],
    cta: "Buy a Credit",
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-surface-900 to-surface-900" />
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-950/50 px-4 py-1.5 text-sm text-brand-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            For teams stranded with undocumented automations
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Turn mystery workflows into{" "}
            <span className="gradient-text">plain-English runbooks</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
            AutoDoc reads your Make, Zapier, or n8n workflows and generates
            maintainable documentation — step-by-step guides, node breakdowns,
            failure modes, and one-click exports. No more asking the consultant
            who disappeared.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/demo" className="btn-primary px-8 py-3 text-base">
              Explore Live Demo
            </Link>
            <Link href="/research" className="btn-secondary px-8 py-3 text-base">
              Why we built this
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <span>Trusted by 240+ automation clients</span>
            <span className="hidden sm:inline">·</span>
            <span>Make · Zapier · n8n</span>
            <span className="hidden sm:inline">·</span>
            <span>9/9 validation checks passed</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-surface-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Everything you need to understand any workflow
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Deep integration with no-code platforms means the workflow IS the
              prompt. Structured, repeatable output — not generic ChatGPT
              copy-paste.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card group p-6 transition hover:border-brand-500/40 hover:bg-surface-700/50"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <blockquote className="text-xl italic text-gray-300">
            &ldquo;Clients literally cannot open the tool without breaking
            something. We inherited 14 Zaps from a consultant who vanished — no
            documentation, no modularity, no clear logic.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-gray-500">
            — r/Entrepreneur, business owner describing stranded automation
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-surface-800/30" id="pricing">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-400">
              Subscription + per-workflow credits. Scale as your automation
              portfolio grows.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`card relative p-8 ${
                  plan.highlighted
                    ? "border-brand-500/50 ring-1 ring-brand-500/30"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-brand-400">{plan.workflows}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className="mt-0.5 text-emerald-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-brand-600 text-white hover:bg-brand-500"
                      : "border border-gray-600 text-gray-200 hover:border-gray-500 hover:bg-surface-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-950/50 to-surface-800 p-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Stop guessing what your workflows do
          </h2>
          <p className="mb-8 text-gray-400">
            See AutoDoc document a real Make.com lead-routing scenario in under
            60 seconds. Every button works — this is a fully interactive mock.
          </p>
          <Link href="/demo" className="btn-primary px-8 py-3 text-base">
            Launch Interactive Demo →
          </Link>
        </div>
      </section>
    </>
  );
}
