"use client";

import { useState, useMemo } from "react";
import { DevNote } from "@/components/DevNote";
import { useToast } from "@/components/Toast";
import {
  WORKFLOWS,
  ACTIVITY,
  RUNBOOK_STEPS,
  NODE_DETAILS,
  CHANGE_EVENTS,
  MONTHLY_USAGE,
  PLATFORM_LABELS,
  STATUS_COLORS,
  type Platform,
  type Workflow,
  type WorkflowStatus,
} from "./mockData";

type Tab = "dashboard" | "connect" | "runbook" | "nodes" | "export" | "changes";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "connect", label: "Connect", icon: "🔗" },
  { id: "runbook", label: "Runbook", icon: "📖" },
  { id: "nodes", label: "Node Breakdown", icon: "🧩" },
  { id: "export", label: "Export", icon: "📤" },
  { id: "changes", label: "Change Detection", icon: "🔄" },
];

export function DemoApp() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(WORKFLOWS[0]);
  const [statusFilter, setStatusFilter] = useState<WorkflowStatus | "all">("all");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState(NODE_DETAILS[0]);
  const [activeStep, setActiveStep] = useState(0);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectStep, setConnectStep] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("make");
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "notion">("pdf");
  const [exportProgress, setExportProgress] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [changeFilter, setChangeFilter] = useState<"all" | "major" | "critical">("all");
  const [billingPlan, setBillingPlan] = useState<"starter" | "growth">("growth");
  const [creditsUsed, setCreditsUsed] = useState(14);
  const [connectedAccounts, setConnectedAccounts] = useState([
    { platform: "make" as Platform, account: "Brightline Dental", connected: "Jul 8, 2026" },
    { platform: "zapier" as Platform, account: "Meridian Logistics", connected: "Jul 3, 2026" },
  ]);

  const filteredWorkflows = useMemo(() => {
    return WORKFLOWS.filter((w) => {
      if (statusFilter !== "all" && w.status !== statusFilter) return false;
      if (platformFilter !== "all" && w.platform !== platformFilter) return false;
      if (searchQuery && !w.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [statusFilter, platformFilter, searchQuery]);

  const filteredChanges = useMemo(() => {
    if (changeFilter === "all") return CHANGE_EVENTS;
    return CHANGE_EVENTS.filter((c) => c.severity === changeFilter);
  }, [changeFilter]);

  const maxDocs = MONTHLY_USAGE.reduce((max, m) => Math.max(max, m.docs), 0);

  const handleConnect = () => {
    setShowConnectModal(true);
    setConnectStep(0);
  };

  const advanceConnect = () => {
    if (connectStep < 2) {
      setConnectStep(connectStep + 1);
    } else {
      setConnectedAccounts((prev) => [
        ...prev,
        { platform: selectedPlatform, account: "New Account", connected: "Just now" },
      ]);
      setShowConnectModal(false);
      setConnectStep(0);
      showToast(`${PLATFORM_LABELS[selectedPlatform]} account connected successfully`);
    }
  };

  const handleExport = () => {
    setExporting(true);
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setExporting(false);
          showToast(
            exportFormat === "pdf"
              ? "PDF exported — Lead Router runbook (24 pages)"
              : "Notion page created — Lead Router Runbook"
          );
          return 100;
        }
        return p + 20;
      });
    }, 400);
  };

  const handleRegenerate = () => {
    showToast("Re-documentation queued for Customer Onboarding Sequence");
  };

  const handleBuyCredit = () => {
    setCreditsUsed((c) => c + 1);
    showToast("1 workflow credit purchased ($0.99)");
  };

  const activityIcons: Record<string, string> = {
    change: "🔄",
    export: "📤",
    connect: "🔗",
    generate: "✨",
    alert: "⚠️",
  };

  return (
    <div className="min-h-screen bg-surface-900">
      {/* Demo header */}
      <div className="border-b border-gray-800 bg-surface-800/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold text-white">
              AutoDoc Workspace
              <DevNote title="Demo Workspace">
                In production, each user gets an isolated workspace backed by Supabase.
                Workflows sync via platform APIs and are stored encrypted at rest.
              </DevNote>
            </h1>
            <p className="text-sm text-gray-400">
              Brightline Dental · Growth Plan · {creditsUsed}/20 workflows this month
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleBuyCredit}
              className="btn-secondary text-xs"
            >
              + Buy Credit ($0.99)
              <DevNote title="Per-Workflow Credits">
                Stripe Checkout handles one-time credit purchases. Credits are
                decremented when a new workflow doc is generated.
              </DevNote>
            </button>
            <button onClick={handleConnect} className="btn-primary text-xs">
              Connect Platform
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-0 lg:gap-6">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-gray-800 p-4 lg:block">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeTab === tab.id
                    ? "bg-brand-600/20 font-medium text-brand-300"
                    : "text-gray-400 hover:bg-surface-700 hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-lg border border-gray-700/50 bg-surface-800 p-3">
            <p className="text-xs font-medium text-gray-400">Billing</p>
            <div className="mt-2 flex gap-1">
              {(["starter", "growth"] as const).map((plan) => (
                <button
                  key={plan}
                  onClick={() => {
                    setBillingPlan(plan);
                    showToast(`Switched to ${plan === "starter" ? "Starter ($29)" : "Growth ($79)"} plan`);
                  }}
                  className={`flex-1 rounded px-2 py-1 text-xs capitalize transition ${
                    billingPlan === plan
                      ? "bg-brand-600 text-white"
                      : "bg-surface-700 text-gray-400 hover:text-white"
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {billingPlan === "starter" ? "5 workflows/mo" : "20 workflows/mo"}
            </p>
          </div>
        </aside>

        {/* Mobile tabs */}
        <div className="flex w-full overflow-x-auto border-b border-gray-800 lg:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-3 text-xs font-medium transition ${
                activeTab === tab.id
                  ? "border-b-2 border-brand-500 text-brand-400"
                  : "text-gray-400"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6">
          {activeTab === "dashboard" && (
            <div className="animate-fade-in space-y-6">
              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Workflows Documented", value: "5", sub: "of 6 total" },
                  { label: "Credits Used", value: String(creditsUsed), sub: "this month" },
                  { label: "Pending Re-docs", value: "2", sub: "stale + generating" },
                  { label: "Connected Platforms", value: String(connectedAccounts.length), sub: "accounts" },
                ].map((stat) => (
                  <div key={stat.label} className="card p-4">
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="card p-6">
                <h3 className="mb-4 font-semibold text-white">
                  Documentation Volume
                  <DevNote title="Usage Analytics">
                    Tracked via Stripe metered billing and internal event logs.
                    Helps predict credit pack upsells.
                  </DevNote>
                </h3>
                <div className="flex h-40 items-end gap-3">
                  {MONTHLY_USAGE.map((m) => (
                    <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                      <span className="text-xs text-gray-400">{m.docs}</span>
                      <div
                        className="w-full rounded-t bg-brand-600 transition-all hover:bg-brand-500"
                        style={{ height: `${(m.docs / maxDocs) * 100}%`, minHeight: "8px" }}
                      />
                      <span className="text-xs text-gray-500">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters + Table */}
              <div className="card overflow-hidden">
                <div className="flex flex-wrap items-center gap-3 border-b border-gray-700/50 p-4">
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-lg border border-gray-600 bg-surface-700 px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as WorkflowStatus | "all")}
                    className="rounded-lg border border-gray-600 bg-surface-700 px-3 py-1.5 text-sm text-white focus:outline-none"
                  >
                    <option value="all">All statuses</option>
                    <option value="documented">Documented</option>
                    <option value="stale">Stale</option>
                    <option value="generating">Generating</option>
                    <option value="pending">Pending</option>
                  </select>
                  <select
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value as Platform | "all")}
                    className="rounded-lg border border-gray-600 bg-surface-700 px-3 py-1.5 text-sm text-white focus:outline-none"
                  >
                    <option value="all">All platforms</option>
                    <option value="make">Make.com</option>
                    <option value="zapier">Zapier</option>
                    <option value="n8n">n8n</option>
                  </select>
                  <span className="text-xs text-gray-500">
                    {filteredWorkflows.length} workflows
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700/50 text-left text-xs text-gray-400">
                        <th className="p-3 font-medium">Workflow</th>
                        <th className="p-3 font-medium">Platform</th>
                        <th className="p-3 font-medium">Company</th>
                        <th className="p-3 font-medium">Nodes</th>
                        <th className="p-3 font-medium">Status</th>
                        <th className="p-3 font-medium">Last Doc</th>
                        <th className="p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWorkflows.map((wf) => (
                        <tr
                          key={wf.id}
                          onClick={() => {
                            setSelectedWorkflow(wf);
                            showToast(`Selected: ${wf.name}`);
                          }}
                          className={`cursor-pointer border-b border-gray-800 transition hover:bg-surface-700/50 ${
                            selectedWorkflow.id === wf.id ? "bg-brand-950/30" : ""
                          }`}
                        >
                          <td className="p-3 font-medium text-white">{wf.name}</td>
                          <td className="p-3 text-gray-400">{PLATFORM_LABELS[wf.platform]}</td>
                          <td className="p-3 text-gray-400">{wf.company}</td>
                          <td className="p-3 text-gray-400">{wf.nodes}</td>
                          <td className="p-3">
                            <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${STATUS_COLORS[wf.status]}`}>
                              {wf.status}
                            </span>
                          </td>
                          <td className="p-3 text-gray-400">{wf.lastDoc}</td>
                          <td className="p-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedWorkflow(wf);
                                setActiveTab("runbook");
                              }}
                              className="text-xs text-brand-400 hover:text-brand-300"
                            >
                              View runbook →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activity feed */}
              <div className="card p-4">
                <h3 className="mb-3 font-semibold text-white">Recent Activity</h3>
                <div className="space-y-3">
                  {ACTIVITY.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => showToast(item.message)}
                      className="flex cursor-pointer items-start gap-3 rounded-lg p-2 transition hover:bg-surface-700/50"
                    >
                      <span className="text-lg">{activityIcons[item.type]}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">{item.message}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "connect" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Platform Connections
                  <DevNote title="API Integration">
                    OAuth 2.0 flows for Make/Zapier; API key + webhook for self-hosted n8n.
                    Tokens stored encrypted in Supabase; refreshed automatically.
                  </DevNote>
                </h2>
                <button onClick={handleConnect} className="btn-primary text-sm">
                  + Add Connection
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {(["make", "zapier", "n8n"] as Platform[]).map((p) => {
                  const connected = connectedAccounts.some((a) => a.platform === p);
                  return (
                    <button
                      key={p}
                      onClick={() => {
                        setSelectedPlatform(p);
                        if (!connected) handleConnect();
                        else showToast(`${PLATFORM_LABELS[p]} already connected`);
                      }}
                      className={`card p-6 text-left transition hover:border-brand-500/40 ${
                        connected ? "border-emerald-500/30" : ""
                      }`}
                    >
                      <div className="mb-3 text-2xl">
                        {p === "make" ? "🔵" : p === "zapier" ? "⚡" : "🔗"}
                      </div>
                      <h3 className="font-semibold text-white">{PLATFORM_LABELS[p]}</h3>
                      <p className="mt-1 text-xs text-gray-400">
                        {connected ? "Connected" : "Click to connect"}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700/50 text-left text-xs text-gray-400">
                      <th className="p-3">Platform</th>
                      <th className="p-3">Account</th>
                      <th className="p-3">Connected</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connectedAccounts.map((acc, i) => (
                      <tr key={i} className="border-b border-gray-800">
                        <td className="p-3 text-white">{PLATFORM_LABELS[acc.platform]}</td>
                        <td className="p-3 text-gray-400">{acc.account}</td>
                        <td className="p-3 text-gray-400">{acc.connected}</td>
                        <td className="p-3">
                          <button
                            onClick={() => showToast(`Syncing workflows from ${acc.account}...`)}
                            className="mr-2 text-xs text-brand-400 hover:text-brand-300"
                          >
                            Sync now
                          </button>
                          <button
                            onClick={() => {
                              setConnectedAccounts((prev) => prev.filter((_, j) => j !== i));
                              showToast("Connection removed");
                            }}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Disconnect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card p-6">
                <h3 className="mb-3 font-semibold text-white">
                  JSON Import
                  <DevNote title="Workflow JSON Parser">
                    Accepts exported .json from Make scenarios, Zapier zaps, or n8n workflows.
                    Serverless function normalizes schema into internal node graph.
                  </DevNote>
                </h3>
                <div
                  onClick={() => showToast("workflow_export.json parsed — 12 nodes detected")}
                  className="cursor-pointer rounded-lg border-2 border-dashed border-gray-600 p-8 text-center transition hover:border-brand-500/50 hover:bg-surface-700/30"
                >
                  <p className="text-gray-400">Drop workflow JSON here or click to browse</p>
                  <p className="mt-2 text-xs text-gray-500">Supports .json exports from Make, Zapier, n8n</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "runbook" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {selectedWorkflow.name}
                    <DevNote title="AI Runbook Generation">
                      OpenAI processes normalized workflow JSON into structured runbook
                      sections. Prompt includes node types, connections, and error handlers.
                      Screenshots captured via headless browser of platform UI.
                    </DevNote>
                  </h2>
                  <p className="text-sm text-gray-400">
                    {selectedWorkflow.company} · {selectedWorkflow.nodes} nodes · Generated {selectedWorkflow.lastDoc}
                  </p>
                </div>
                <button
                  onClick={() => showToast("Regenerating runbook with latest workflow version...")}
                  className="btn-secondary text-sm"
                >
                  Regenerate
                </button>
              </div>

              <div className="flex gap-6">
                <div className="hidden w-48 shrink-0 space-y-1 md:block">
                  {RUNBOOK_STEPS.map((step, i) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(i)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                        activeStep === i
                          ? "bg-brand-600/20 text-brand-300"
                          : "text-gray-400 hover:bg-surface-700"
                      }`}
                    >
                      Step {step.id}: {step.nodeType}
                    </button>
                  ))}
                </div>

                <div className="card flex-1 p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded bg-brand-600/30 px-2 py-0.5 text-xs text-brand-300">
                      Step {RUNBOOK_STEPS[activeStep].id} of {RUNBOOK_STEPS.length}
                    </span>
                    <span className="text-xs text-gray-500">
                      {RUNBOOK_STEPS[activeStep].nodeType}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {RUNBOOK_STEPS[activeStep].title}
                  </h3>
                  <p className="mb-4 leading-relaxed text-gray-300">
                    {RUNBOOK_STEPS[activeStep].description}
                  </p>
                  <div className="rounded-lg border border-gray-700 bg-surface-900 p-4">
                    <p className="mb-2 text-xs font-medium text-gray-500">Annotated Screenshot</p>
                    <div className="flex h-32 items-center justify-center rounded bg-surface-800 text-sm text-gray-500">
                      📸 {RUNBOOK_STEPS[activeStep].screenshot}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                      className="btn-secondary text-xs disabled:opacity-40"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setActiveStep(Math.min(RUNBOOK_STEPS.length - 1, activeStep + 1))}
                      disabled={activeStep === RUNBOOK_STEPS.length - 1}
                      className="btn-primary text-xs disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "nodes" && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-lg font-semibold text-white">
                Modular Node Breakdown
                <DevNote title="Per-Node Documentation">
                  Each node parsed into inputs, outputs, and failure modes via platform-specific
                  adapters. Make modules, Zapier steps, and n8n nodes each have schema mappers.
                </DevNote>
              </h2>

              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="w-full space-y-2 lg:w-64">
                  {NODE_DETAILS.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        selectedNode.id === node.id
                          ? "border-brand-500/50 bg-brand-950/30"
                          : "border-gray-700 bg-surface-800 hover:border-gray-600"
                      }`}
                    >
                      <p className="text-sm font-medium text-white">{node.name}</p>
                      <p className="text-xs text-gray-500">{node.type}</p>
                    </button>
                  ))}
                </div>

                <div className="card flex-1 p-6">
                  <h3 className="mb-1 text-lg font-semibold text-white">{selectedNode.name}</h3>
                  <p className="mb-4 text-sm text-gray-400">
                    {selectedNode.type} · {selectedNode.platform}
                  </p>

                  <div className="mb-6">
                    <h4 className="mb-2 text-sm font-medium text-brand-400">Inputs</h4>
                    <table className="w-full text-sm">
                      <tbody>
                        {selectedNode.inputs.map((inp) => (
                          <tr key={inp.name} className="border-b border-gray-800">
                            <td className="py-2 pr-4 font-mono text-xs text-gray-300">{inp.name}</td>
                            <td className="py-2 text-gray-400">{inp.value}</td>
                            <td className="py-2 text-right">
                              {inp.required && (
                                <span className="text-xs text-amber-400">required</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-6">
                    <h4 className="mb-2 text-sm font-medium text-emerald-400">Outputs</h4>
                    <div className="space-y-2">
                      {selectedNode.outputs.map((out) => (
                        <div key={out.name} className="flex gap-3 text-sm">
                          <span className="font-mono text-xs text-gray-300">{out.name}</span>
                          <span className="text-gray-400">— {out.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-red-400">Failure Modes</h4>
                    <div className="space-y-3">
                      {selectedNode.failureModes.map((fm, i) => (
                        <div key={i} className="rounded-lg border border-red-500/20 bg-red-950/20 p-3">
                          <p className="text-sm font-medium text-red-300">{fm.scenario}</p>
                          <p className="mt-1 text-xs text-gray-400">
                            <span className="text-gray-500">Impact:</span> {fm.impact}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            <span className="text-gray-500">Fix:</span> {fm.fix}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "export" && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-lg font-semibold text-white">
                Export Runbook
                <DevNote title="Export Pipeline">
                  PDF via Puppeteer rendering of runbook HTML. Notion export uses Notion API
                  to create structured pages with embedded screenshots and node tables.
                </DevNote>
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => {
                    setExportFormat("pdf");
                    setShowExportModal(true);
                  }}
                  className={`card p-6 text-left transition hover:border-brand-500/40 ${
                    exportFormat === "pdf" ? "border-brand-500/30" : ""
                  }`}
                >
                  <div className="mb-3 text-3xl">📄</div>
                  <h3 className="font-semibold text-white">Export as PDF</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Branded 24-page PDF with table of contents, screenshots, and node appendix
                  </p>
                </button>
                <button
                  onClick={() => {
                    setExportFormat("notion");
                    setShowExportModal(true);
                  }}
                  className={`card p-6 text-left transition hover:border-brand-500/40 ${
                    exportFormat === "notion" ? "border-brand-500/30" : ""
                  }`}
                >
                  <div className="mb-3 text-3xl">📝</div>
                  <h3 className="font-semibold text-white">Push to Notion</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Creates structured Notion page with collapsible node sections
                  </p>
                </button>
              </div>

              <div className="card p-6">
                <h3 className="mb-4 font-semibold text-white">Export History</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700/50 text-left text-xs text-gray-400">
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Workflow</th>
                      <th className="pb-2">Format</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "Jul 9, 2026", wf: "Lead Router", fmt: "PDF", pages: 24 },
                      { date: "Jul 7, 2026", wf: "Invoice Sync", fmt: "Notion", pages: 0 },
                      { date: "Jul 5, 2026", wf: "Support Ticket Escalation", fmt: "PDF", pages: 31 },
                    ].map((exp, i) => (
                      <tr key={i} className="border-b border-gray-800">
                        <td className="py-3 text-gray-400">{exp.date}</td>
                        <td className="py-3 text-white">{exp.wf}</td>
                        <td className="py-3 text-gray-400">{exp.fmt}</td>
                        <td className="py-3">
                          <button
                            onClick={() => showToast(`Re-downloading ${exp.wf} ${exp.fmt}...`)}
                            className="text-xs text-brand-400 hover:text-brand-300"
                          >
                            Download again
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "changes" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">
                  Change Detection
                  <DevNote title="Nightly Polling Cron">
                    Vercel Cron runs at 22:00 UTC. Fetches workflow versions via platform APIs,
                    diffs against stored hash, queues re-doc jobs in a serverless queue.
                  </DevNote>
                </h2>
                <button onClick={handleRegenerate} className="btn-primary text-sm">
                  Queue Re-doc (2 stale)
                </button>
              </div>

              <div className="flex gap-2">
                {(["all", "major", "critical"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setChangeFilter(f)}
                    className={`rounded-lg px-3 py-1.5 text-xs capitalize transition ${
                      changeFilter === f
                        ? "bg-brand-600 text-white"
                        : "bg-surface-700 text-gray-400 hover:text-white"
                    }`}
                  >
                    {f === "all" ? "All changes" : f}
                  </button>
                ))}
              </div>

              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700/50 text-left text-xs text-gray-400">
                      <th className="p-3">Date</th>
                      <th className="p-3">Workflow</th>
                      <th className="p-3">Change</th>
                      <th className="p-3">Severity</th>
                      <th className="p-3">Re-doc Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChanges.map((ch) => (
                      <tr key={ch.id} className="border-b border-gray-800">
                        <td className="p-3 text-gray-400">{ch.date}</td>
                        <td className="p-3 text-white">{ch.workflow}</td>
                        <td className="p-3 text-gray-300">{ch.change}</td>
                        <td className="p-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                              ch.severity === "critical"
                                ? "bg-red-500/20 text-red-400"
                                : ch.severity === "major"
                                  ? "bg-amber-500/20 text-amber-400"
                                  : ch.severity === "minor"
                                    ? "bg-gray-500/20 text-gray-400"
                                    : "bg-surface-700 text-gray-500"
                            }`}
                          >
                            {ch.severity}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                              ch.redocStatus === "completed"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : ch.redocStatus === "in_progress"
                                  ? "bg-brand-500/20 text-brand-400"
                                  : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {ch.redocStatus.replace("_", " ")}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => showToast(`Viewing diff for ${ch.workflow}`)}
                            className="text-xs text-brand-400 hover:text-brand-300"
                          >
                            View diff
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card p-4">
                <h3 className="mb-3 text-sm font-semibold text-white">Nightly Scan Schedule</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Next scan: Tonight at 10:00 PM UTC</span>
                  <button
                    onClick={() => showToast("Manual scan triggered — checking 6 workflows...")}
                    className="text-xs text-brand-400 hover:text-brand-300"
                  >
                    Run scan now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md p-6 animate-slide-up">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Connect {PLATFORM_LABELS[selectedPlatform]}
            </h3>
            {connectStep === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-400">Select platform:</p>
                {(["make", "zapier", "n8n"] as Platform[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                      selectedPlatform === p
                        ? "border-brand-500 bg-brand-950/30 text-white"
                        : "border-gray-700 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    {PLATFORM_LABELS[p]}
                  </button>
                ))}
              </div>
            )}
            {connectStep === 1 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-400">
                  Authorize AutoDoc to read your {PLATFORM_LABELS[selectedPlatform]} workflows:
                </p>
                <div className="rounded-lg bg-surface-900 p-4 text-center">
                  <p className="text-sm text-gray-300">OAuth authorization window</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Scopes: read:scenarios, read:zaps, read:workflows
                  </p>
                </div>
              </div>
            )}
            {connectStep === 2 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-400">Select workflows to import:</p>
                {["Lead Router", "Invoice Sync", "Support Escalation"].map((name) => (
                  <label key={name} className="flex items-center gap-2 text-sm text-gray-300">
                    <input type="checkbox" defaultChecked className="rounded" />
                    {name}
                  </label>
                ))}
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  setShowConnectModal(false);
                  setConnectStep(0);
                }}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
              <button onClick={advanceConnect} className="btn-primary text-sm">
                {connectStep < 2 ? "Continue →" : "Connect & Import"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md p-6 animate-slide-up">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Export as {exportFormat === "pdf" ? "PDF" : "Notion"}
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              {selectedWorkflow.name} · {selectedWorkflow.nodes} nodes
            </p>
            {exporting ? (
              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-surface-700">
                  <div
                    className="h-full bg-brand-600 transition-all"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
                <p className="text-center text-xs text-gray-400">
                  {exportProgress < 100 ? "Generating..." : "Complete!"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {exportFormat === "pdf" ? (
                  <>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Include annotated screenshots
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Include node appendix
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input type="checkbox" className="rounded" />
                      Add company branding
                    </label>
                  </>
                ) : (
                  <>
                    <label className="block text-sm text-gray-400">
                      Notion workspace
                      <select className="mt-1 w-full rounded-lg border border-gray-600 bg-surface-700 px-3 py-2 text-white">
                        <option>Brightline Dental Wiki</option>
                        <option>Engineering Docs</option>
                      </select>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Create in &ldquo;Runbooks&rdquo; folder
                    </label>
                  </>
                )}
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setExporting(false);
                  setExportProgress(0);
                }}
                className="btn-secondary text-sm"
              >
                {exporting ? "Close" : "Cancel"}
              </button>
              {!exporting && (
                <button onClick={handleExport} className="btn-primary text-sm">
                  Export Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
