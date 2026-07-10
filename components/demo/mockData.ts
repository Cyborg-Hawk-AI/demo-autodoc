export type Platform = "make" | "zapier" | "n8n";
export type WorkflowStatus = "documented" | "pending" | "stale" | "generating";

export interface Workflow {
  id: string;
  name: string;
  platform: Platform;
  company: string;
  nodes: number;
  status: WorkflowStatus;
  lastDoc: string;
  lastChange: string;
  owner: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  type: "change" | "export" | "connect" | "generate" | "alert";
  message: string;
  workflow?: string;
}

export interface RunbookStep {
  id: number;
  title: string;
  description: string;
  screenshot: string;
  nodeType: string;
}

export interface NodeDetail {
  id: string;
  name: string;
  type: string;
  platform: string;
  inputs: { name: string; value: string; required: boolean }[];
  outputs: { name: string; description: string }[];
  failureModes: { scenario: string; impact: string; fix: string }[];
}

export const WORKFLOWS: Workflow[] = [
  {
    id: "wf-001",
    name: "Lead Router — HubSpot to Slack",
    platform: "make",
    company: "Brightline Dental",
    nodes: 12,
    status: "documented",
    lastDoc: "Jul 9, 2026",
    lastChange: "Jul 8, 2026",
    owner: "Sarah Chen",
  },
  {
    id: "wf-002",
    name: "Invoice Sync — QuickBooks → Airtable",
    platform: "zapier",
    company: "Meridian Logistics",
    nodes: 8,
    status: "documented",
    lastDoc: "Jul 7, 2026",
    lastChange: "Jul 5, 2026",
    owner: "Marcus Webb",
  },
  {
    id: "wf-003",
    name: "Customer Onboarding Sequence",
    platform: "n8n",
    company: "CloudPeak SaaS",
    nodes: 24,
    status: "stale",
    lastDoc: "Jun 18, 2026",
    lastChange: "Jul 9, 2026",
    owner: "Priya Nair",
  },
  {
    id: "wf-004",
    name: "Abandoned Cart Recovery",
    platform: "zapier",
    company: "Oak & Thread Co.",
    nodes: 6,
    status: "generating",
    lastDoc: "Jul 10, 2026",
    lastChange: "Jul 10, 2026",
    owner: "Jake Morrison",
  },
  {
    id: "wf-005",
    name: "Support Ticket Escalation",
    platform: "make",
    company: "Helix Health",
    nodes: 15,
    status: "documented",
    lastDoc: "Jul 6, 2026",
    lastChange: "Jul 4, 2026",
    owner: "Elena Vasquez",
  },
  {
    id: "wf-006",
    name: "Weekly KPI Digest",
    platform: "n8n",
    company: "Summit Realty Group",
    nodes: 9,
    status: "pending",
    lastDoc: "—",
    lastChange: "Jul 10, 2026",
    owner: "Tom Bradley",
  },
];

export const ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    time: "2 min ago",
    type: "generate",
    message: "Runbook generated for Abandoned Cart Recovery",
    workflow: "wf-004",
  },
  {
    id: "a2",
    time: "18 min ago",
    type: "change",
    message: "Workflow change detected: Customer Onboarding Sequence — 3 nodes modified",
    workflow: "wf-003",
  },
  {
    id: "a3",
    time: "1 hr ago",
    type: "export",
    message: "PDF exported for Lead Router — HubSpot to Slack",
    workflow: "wf-001",
  },
  {
    id: "a4",
    time: "2 hrs ago",
    type: "connect",
    message: "Make.com account connected for Brightline Dental",
  },
  {
    id: "a5",
    time: "3 hrs ago",
    type: "export",
    message: "Notion page created: Invoice Sync runbook",
    workflow: "wf-002",
  },
  {
    id: "a6",
    time: "5 hrs ago",
    type: "alert",
    message: "API rate limit warning on Support Ticket Escalation node 7",
    workflow: "wf-005",
  },
  {
    id: "a7",
    time: "Yesterday",
    type: "generate",
    message: "Nightly re-doc completed for 4 workflows",
  },
  {
    id: "a8",
    time: "Yesterday",
    type: "change",
    message: "Zapier webhook URL changed in Abandoned Cart Recovery",
    workflow: "wf-004",
  },
];

export const RUNBOOK_STEPS: RunbookStep[] = [
  {
    id: 1,
    title: "Trigger: New HubSpot Contact Created",
    description:
      "When a new contact is created in HubSpot CRM (list ID: 4821), this workflow fires. Filters require lifecycle stage = 'lead' and source ≠ 'manual import'. Approximately 45 contacts/day trigger this.",
    screenshot: "HubSpot trigger panel showing contact.created event with lifecycle filter",
    nodeType: "Trigger",
  },
  {
    id: 2,
    title: "Router: Territory Assignment",
    description:
      "A Make.com router splits contacts by US state. West coast (CA, OR, WA) → Route A. East coast (NY, NJ, MA, PA) → Route B. All others → Route C (default SDR queue).",
    screenshot: "Router module with 3 branches and state-based filter conditions",
    nodeType: "Router",
  },
  {
    id: 3,
    title: "Action: Enrich via Clearbit",
    description:
      "Each routed contact is enriched with company size, industry, and tech stack via Clearbit API. If enrichment fails (404), workflow continues with partial data — does NOT halt.",
    screenshot: "Clearbit HTTP module with fallback error handler path",
    nodeType: "HTTP Request",
  },
  {
    id: 4,
    title: "Filter: ICP Score Check",
    description:
      "Only contacts scoring ≥ 70 on the ICP model proceed. Score is calculated from: company size (30pts), industry match (25pts), tech stack overlap (25pts), engagement history (20pts).",
    screenshot: "Filter module with numeric comparison on icp_score field",
    nodeType: "Filter",
  },
  {
    id: 5,
    title: "Action: Create Slack Channel Message",
    description:
      "Posts formatted lead card to #sales-leads-west, #sales-leads-east, or #sdr-queue based on route. Includes contact name, company, ICP score, and HubSpot deep link.",
    screenshot: "Slack message block with lead summary and action buttons",
    nodeType: "Slack",
  },
  {
    id: 6,
    title: "Action: Update HubSpot Owner",
    description:
      "Assigns contact owner in HubSpot based on territory mapping table (Airtable lookup). If owner is OOO (checked via Google Calendar), assigns to backup rep.",
    screenshot: "HubSpot update contact module with owner ID mapping",
    nodeType: "HubSpot",
  },
];

export const NODE_DETAILS: NodeDetail[] = [
  {
    id: "node-1",
    name: "HubSpot — Watch Contacts",
    type: "Trigger",
    platform: "Make.com",
    inputs: [
      { name: "Connection", value: "Brightline HubSpot (OAuth)", required: true },
      { name: "Event", value: "contact.creation", required: true },
      { name: "List ID", value: "4821", required: true },
      { name: "Poll interval", value: "5 minutes", required: false },
    ],
    outputs: [
      { name: "contact_id", description: "HubSpot contact VID" },
      { name: "email", description: "Primary email address" },
      { name: "lifecycle_stage", description: "Current lifecycle stage" },
      { name: "state", description: "US state from address field" },
    ],
    failureModes: [
      {
        scenario: "OAuth token expired",
        impact: "Workflow stops entirely — no leads routed",
        fix: "Re-authenticate HubSpot connection in Make.com settings",
      },
      {
        scenario: "Rate limit (100 req/10s)",
        impact: "Missed contacts during burst periods",
        fix: "Enable Make.com error handler with 30s retry",
      },
    ],
  },
  {
    id: "node-2",
    name: "Clearbit Enrichment",
    type: "HTTP Request",
    platform: "Make.com",
    inputs: [
      { name: "API Key", value: "sk_live_••••7xK9", required: true },
      { name: "Email", value: "{{1.email}}", required: true },
      { name: "Timeout", value: "10 seconds", required: false },
    ],
    outputs: [
      { name: "company_name", description: "Enriched company name" },
      { name: "employee_count", description: "Estimated headcount" },
      { name: "industry", description: "NAICS industry classification" },
      { name: "tech_stack", description: "Detected technologies array" },
    ],
    failureModes: [
      {
        scenario: "Email not found in Clearbit (404)",
        impact: "Partial data — ICP score defaults to 40",
        fix: "Workflow continues via error handler; no action needed",
      },
      {
        scenario: "API quota exceeded",
        impact: "All enrichments fail for remainder of billing cycle",
        fix: "Upgrade Clearbit plan or add fallback enrichment provider",
      },
    ],
  },
  {
    id: "node-3",
    name: "Slack — Post Message",
    type: "Action",
    platform: "Make.com",
    inputs: [
      { name: "Channel", value: "#sales-leads-west", required: true },
      { name: "Message template", value: "lead_card_v2.json", required: true },
      { name: "Bot token", value: "xoxb-••••4fR2", required: true },
    ],
    outputs: [
      { name: "message_ts", description: "Slack message timestamp ID" },
      { name: "channel_id", description: "Channel where message was posted" },
    ],
    failureModes: [
      {
        scenario: "Channel archived or renamed",
        impact: "Lead notification lost — sales team unaware",
        fix: "Update channel name in module config; re-test with sample contact",
      },
      {
        scenario: "Bot removed from channel",
        impact: "403 error, message not delivered",
        fix: "Re-invite AutoDoc bot to #sales-leads-west",
      },
    ],
  },
];

export const CHANGE_EVENTS = [
  {
    id: "ch-1",
    date: "Jul 9, 2026 14:32",
    workflow: "Customer Onboarding Sequence",
    change: "Added new 'Send Welcome SMS' node after email step",
    severity: "major" as const,
    redocStatus: "queued" as const,
  },
  {
    id: "ch-2",
    date: "Jul 10, 2026 09:15",
    workflow: "Abandoned Cart Recovery",
    change: "Webhook URL updated for Shopify trigger",
    severity: "critical" as const,
    redocStatus: "in_progress" as const,
  },
  {
    id: "ch-3",
    date: "Jul 8, 2026 22:00",
    workflow: "Lead Router — HubSpot to Slack",
    change: "Filter threshold changed from 60 to 70 ICP score",
    severity: "minor" as const,
    redocStatus: "completed" as const,
  },
  {
    id: "ch-4",
    date: "Jul 7, 2026 22:00",
    workflow: "Invoice Sync — QuickBooks → Airtable",
    change: "No changes detected (nightly scan)",
    severity: "none" as const,
    redocStatus: "completed" as const,
  },
  {
    id: "ch-5",
    date: "Jul 6, 2026 22:00",
    workflow: "Support Ticket Escalation",
    change: "Zendesk connection re-authorized",
    severity: "minor" as const,
    redocStatus: "completed" as const,
  },
];

export const MONTHLY_USAGE = [
  { month: "Feb", docs: 3 },
  { month: "Mar", docs: 5 },
  { month: "Apr", docs: 7 },
  { month: "May", docs: 8 },
  { month: "Jun", docs: 11 },
  { month: "Jul", docs: 14 },
];

export const PLATFORM_LABELS: Record<Platform, string> = {
  make: "Make.com",
  zapier: "Zapier",
  n8n: "n8n",
};

export const STATUS_COLORS: Record<WorkflowStatus, string> = {
  documented: "bg-emerald-500/20 text-emerald-400",
  pending: "bg-gray-500/20 text-gray-400",
  stale: "bg-amber-500/20 text-amber-400",
  generating: "bg-brand-500/20 text-brand-400",
};
