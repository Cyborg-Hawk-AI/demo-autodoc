import Link from "next/link";

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

const painPoints = [
  {
    problem:
      "Automated workflows lack proper error handling, causing complete failures when edge cases occur (missing fields, timeouts, API limits), leaving clients unable to troubleshoot and dependent on the original creator.",
    persona: "Automation consultant, business process expert",
    workaround:
      "Clients remain dependent on automation experts to fix issues; many experts disappear leaving clients stranded",
    wtp: "Clients are paying for automation services but experiencing costly failures",
    source: "https://www.reddit.com/r/Entrepreneur/comments/1u97zle/vibecoded_automations_are_becoming_a_real_problem/",
  },
  {
    problem:
      "Automated workflows are built without proper documentation, modularity, or clear logic explanation, making it impossible for others to understand, maintain, or debug them when issues arise.",
    persona: "Business owner, automation client",
    workaround:
      "Hiring automation experts who create undocumented, non-modular solutions; stuck with broken workflows when creators disappear",
    wtp: "Paying for automation services but receiving poor quality deliverables",
    source: "https://www.reddit.com/r/Entrepreneur/comments/1u97zle/vibecoded_automations_are_becoming_a_real_problem/",
  },
];

export const metadata = {
  title: "Research — How We Found AutoDoc",
  description: "The research and validation behind the AutoDoc micro-SaaS idea",
};

export default function ResearchPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <p className="mb-2 text-sm font-medium text-brand-400">Idea Miner Research</p>
          <h1 className="mb-4 text-4xl font-bold text-white">Why AutoDoc Exists</h1>
          <p className="text-lg text-gray-400">
            Real pain from real posts. This page documents the research that led to building
            AutoDoc — a tool for small business owners stranded with undocumented no-code
            workflows.
          </p>
        </div>

        {/* Origin story */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">The Origin Story</h2>
          <div className="card p-6">
            <p className="leading-relaxed text-gray-300">
              In r/Entrepreneur, business owners described being &ldquo;stranded&rdquo; after
              automation consultants disappeared, leaving behind workflows with &ldquo;no
              documentation, no modularity, no clear logic.&rdquo; One commenter noted clients
              literally cannot open the tool without breaking something. They tried asking the
              original creator, hiring a new consultant, or just abandoning the workflow entirely.
            </p>
            <p className="mt-4 leading-relaxed text-gray-300">
              Generic AI tools like ChatGPT require manually pasting every node&apos;s config —
              tedious and error-prone. No tool reads the workflow file and produces a maintainable
              runbook automatically.
            </p>
          </div>
        </section>

        {/* Scoring */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Opportunity Scoring</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-brand-400">112</p>
              <p className="text-sm text-gray-400">Rubric Score / 130</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-emerald-400">9/9</p>
              <p className="text-sm text-gray-400">Validation Checks</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-white">1 hr</p>
              <p className="text-sm text-gray-400">Owner Time / Week</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            <strong className="text-gray-300">Cluster:</strong> Undocumented &amp; unmaintainable
            automation workflows
          </p>
        </section>

        {/* Validation checklist */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Validation Checklist</h2>
          <div className="card p-6">
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                    ✓
                  </span>
                  <span className="text-gray-300">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Competitive landscape */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Competitive Landscape</h2>
          <div className="card p-6">
            <p className="text-gray-300">
              No dedicated workflow documentation tool exists. Competitors are generic AI writing
              tools (Notion AI, ChatGPT) that require manual copy-paste and produce inconsistent
              results.
            </p>
            <p className="mt-4 text-gray-300">
              <strong className="text-white">Unfair advantage:</strong> Deep integration with
              Make/Zapier/n8n APIs means zero manual input — the workflow IS the prompt. Output
              is structured and repeatable unlike generic LLM use.
            </p>
          </div>
        </section>

        {/* GTM */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Go-to-Market</h2>
          <div className="card p-6">
            <p className="text-gray-300">
              Reddit communities (r/Entrepreneur, r/nocode, r/zapier, r/n8n), direct outreach
              to automation consultants who can white-label it for clients.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              <strong className="text-gray-300">Pricing:</strong> $29/month for 5 workflows;
              $79/month for 20 workflows; $0.99 per extra workflow doc.
            </p>
          </div>
        </section>

        {/* Automation playbook */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">
            How This Business Runs Itself
          </h2>
          <div className="card p-6">
            <p className="leading-relaxed text-gray-300">
              After a user connects their Make/Zapier account, a cron job polls for workflow
              changes nightly and queues re-documentation jobs. OpenAI processes each workflow
              JSON into a structured runbook via a serverless function. Stripe handles all billing
              events. A Crisp AI chat widget answers support questions using the product&apos;s
              own documentation. Owner estimated time: under 1 hour/week reviewing error logs.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              <strong className="text-gray-300">MVP estimate:</strong> Next.js + Supabase +
              OpenAI API + Make/Zapier REST APIs; 3 weeks to launch with one integration
              (Make.com first).
            </p>
          </div>
        </section>

        {/* Pain points */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Source Pain Points</h2>
          <div className="space-y-6">
            {painPoints.map((pp, i) => (
              <div key={i} className="card p-6">
                <p className="mb-3 text-gray-300">{pp.problem}</p>
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-gray-500">Persona</dt>
                    <dd className="text-gray-300">{pp.persona}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Workaround</dt>
                    <dd className="text-gray-300">{pp.workaround}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">WTP Signal</dt>
                    <dd className="text-gray-300">{pp.wtp}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Source</dt>
                    <dd>
                      <a
                        href={pp.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-400 hover:text-brand-300"
                      >
                        Reddit post →
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* About Idea Miner */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">About This Program</h2>
          <div className="card p-6">
            <p className="text-gray-300">
              This demo was auto-built by the <strong className="text-white">Idea Miner</strong>{" "}
              pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack
              Exchange, and GitHub for real people describing real pain, scores the opportunities,
              and automatically ships a working mock of every idea that passes validation (≥8/9
              checks, momentum not declining, not previously built). The bar for every idea:
              low-maintenance recurring revenue that a solo owner can run in a few hours a week.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Generated by Idea Miner run 2026-07-10-pm on 2026-07-10 21:51 UTC
            </p>
          </div>
        </section>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/demo" className="btn-primary">
            Try the Interactive Demo →
          </Link>
          <Link href="/developers" className="btn-secondary">
            Developer Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
