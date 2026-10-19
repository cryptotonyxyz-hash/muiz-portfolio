import { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------
   EDIT THESE CONSTANTS FIRST. Everything on the site reads from here.
   Items marked CHECK are facts that differ between your old site and
   your CV, so confirm which version is true before deploying.
------------------------------------------------------------------- */

const CONTACT = {
  email: "muizanthony0@gmail.com",
  linkedin: "https://www.linkedin.com/in/muiz-anthony/",
  cv: "/Muiz_Anthony_CV.pdf", // replace this file in /public with your latest CV
};

const METRICS = [
  { end: 5000, suffix: "+", label: "Community Members", sub: "EnableHer Nigeria network" },
  { end: 30, prefix: "$", suffix: "K+", label: "Grant Portfolio", sub: "Supported at EnableHer" }, // CHECK: "secured" vs "supported"
  { end: 100, suffix: "+", label: "Users Onboarded", sub: "BitMart campus campaign" },
  { end: 300, suffix: "+", label: "Student Community", sub: "LASU BitMart" },
  { end: 50, suffix: "+", label: "Patient Records / Week", sub: "Clinical internship" }, // CHECK: "lab samples" vs "patient records"
  { end: 4.36, label: "CGPA", sub: "Second Class Honours (Upper)" },
];

// CHECK: titles and dates below follow your CV. Your old site said
// "Co-Founder", "Campus Ambassador" and "Clinical Lab Intern".
const EXPERIENCE = [
  {
    role: "Co-Founder & Grants Operations Manager",
    org: "EnableHer Nigeria",
    period: "Sep 2024 – Aug 2026",
    type: "Self-employed",
    active: false,
    desc: "Grant operations, CRM automation and community growth for an initiative supporting people with disabilities and underserved communities.",
  },
  {
    role: "Zonal Community Coordinator",
    org: "BitMart Exchange",
    period: "Jan 2026 – Jul 2026",
    type: "Part-time",
    active: false,
    desc: "Campus-level Web3 activation at Lagos State University: onboarding new users, handling enquiries and building a lasting student community.",
  },
  {
    role: "Clinical Data & Operations Intern",
    org: "Crystal Specialist Hospital",
    period: "Apr 2025 – Oct 2025",
    type: "Internship",
    active: false,
    desc: "Entered and maintained patient records, audited data flows and compiled status reports for administrative leadership.",
  },
];

const PROJECTS = [
  {
    id: "kpi",
    org: "AUTOMATION + BI",
    title: "Operational KPI Dashboard",
    image: "/kpi-dashboard.jpg", // add a screenshot to /public
    demo: "https://www.loom.com/share/656698b5b4f14f7db3ac8af9f69fc370", // paste your Loom link here
    summary:
      "A KPI dashboard that updates from the CRM through an automated pipeline: HubSpot to Make to Google Sheets to Power BI, so reports don't depend on manual data entry.",
    tags: ["Power BI", "DAX", "HubSpot", "Make"],
    outcome:
      "A new CRM contact appears on the dashboard after a refresh. Built on a simulated fintech dataset of 600 customers.",
    bullets: [
      "Configured a Make scenario that watches HubSpot for new contacts and adds each one to a Google Sheet on a 15-minute schedule",
      "Connected Power BI to the sheet and built visuals for customers, revenue, satisfaction, growth trend, locations, channels and account types",
      "Wrote DAX measures and formatted revenue as naira billions",
      "A test typo ('Referal') created a fake channel on the dashboard, which led me to add dropdown validation at the source",
    ],
  },
  {
    id: "webinar",
    org: "ENABLEHER NIGERIA · REAL USE",
    title: "Webinar Registration & Reminder Automation",
    summary:
      "A Make workflow that confirms each webinar registration and sends scheduled reminders, replacing manual follow-up for the team.",
    tags: ["Make", "Google Forms", "Google Calendar", "Gmail"],
    outcome: "Consistent confirmations and reminders for every attendee with no manual sending.",
    bullets: [
      "Captured registrations from Google Forms and updated the webinar event in Google Calendar",
      "Sent an automatic confirmation email through Gmail to each registrant",
      "Scheduled reminder emails ahead of each webinar",
    ],
  },
  {
    id: "hr",
    org: "EXCEL · ADMIN SYSTEMS",
    title: "HR Attendance & Onboarding Tracker",
    image: "/hr-tracker.jpg", // add a screenshot to /public
    demo: "https://docs.google.com/spreadsheets/d/1eWGtn0T-fApQYYHq0ZIn-rBtOJtAAPCJ/edit?usp=sharing&ouid=116281657937785804429&rtpof=true&sd=true",
    summary:
      "An Excel workbook for small teams: staff list, formula-driven attendance, a summary with review flags, a PivotTable, a chart and an onboarding checklist, with a user guide.",
    tags: ["Excel", "PivotTables", "Data validation", "Conditional formatting"],
    outcome: "Lateness, absences and overdue onboarding tasks are flagged automatically. Built on fictional sample data.",
    bullets: [
      "Calculated status and minutes late from time-in values against a configurable resume time",
      "Built a summary with punctuality percentage and a review flag at a set late-day threshold",
      "Added an onboarding checklist with status dropdowns, overdue highlighting and progress per new hire",
      "Wrote a user guide so anyone can use the workbook without help",
    ],
  },
  {
    id: "enableher",
    org: "ENABLEHER NIGERIA",
    title: "Grant Operations & Community Growth",
    image: "/enableher-team.jpg",
    summary:
      "End-to-end grant operations for a 5,000+ member community, supporting a $30,000+ grant portfolio including funding from the Global Fund for Women.", // CHECK wording
    tags: ["$30K+ Portfolio", "5,000+ Members", "CRM Automation"],
    outcome:
      "A structured grant cycle (identification, proposal, reporting) and automated member communication, run without a dedicated finance team.",
    bullets: [
      "Identified and evaluated grant opportunities across multiple international funders",
      "Coordinated application timelines, compiled impact reports and managed funder liaison",
      "Built automated CRM pipelines (HubSpot, Make, Zapier) to cut manual data entry",
      "Managed stakeholder communications across co-founders, beneficiaries and external partners",
    ],
  },
  {
    id: "bitmart",
    org: "BITMART × LASU",
    title: "Campus Activation & Community Operations",
    image: "/bitmart-event.jpg",
    summary:
      "Campus-level Web3 activation that built a 300+ member student community and onboarded 100+ new users at Lagos State University.",
    tags: ["100+ Users Onboarded", "300+ Community", "Live Event"],
    outcome: "Zero-to-community execution: event planning, logistics and ongoing management delivered measurable platform growth.",
    bullets: [
      "Planned and executed an in-person campus event: venue, speakers and logistics",
      "Onboarded 100+ new users to BitMart through outreach and the event",
      "Built and managed the LASU BitMart community from zero to 300+ members",
      "Escalated user feedback and operational gaps to product teams",
    ],
  },
  {
    id: "heatmap",
    org: "PERSONAL PROJECT",
    title: "UHSIS: Urban Heat Stress Information System",
    image: "/uhsis-dashboard.jpg",
    link: "https://uhsis.lovable.app",
    summary:
      "A live environmental monitoring dashboard tracking heat stress across six Lagos zones, using live weather data to power health advisories and safe work scheduling.",
    tags: ["Live Dashboard", "6 Lagos Zones", "Live Weather Data"],
    outcome: "A working system, live and publicly accessible, with heat index, health advisories and 7-day trend analytics.",
    bullets: [
      "Built a React/Vite frontend with interactive zone views and a live-updating dashboard",
      "Developed a FastAPI + SQLite backend integrating Open-Meteo weather data", // CHECK: matches the deployed version
      "Implemented heat index calculation, health advisory logic and safe work scheduling recommendations",
      "Added 7-day trend analytics and an alert system for at-risk conditions",
    ],
  },
  {
    id: "tonybot",
    org: "PYTHON",
    title: "TonyBot: Trading Signal System",
    link: "https://github.com/cryptotonyxyz-hash/tonybot",
    summary:
      "A Python signal system that applies a mean-reversion strategy and publishes structured trade ideas to Telegram. It is a signal service, so the final decision stays with the user.",
    tags: ["Python", "Telegram", "GitHub"],
    outcome: "Version 3.0 reworked stop-loss logic after a code audit, added confidence scoring and moved credentials into environment variables.",
    bullets: [
      "Generated structured ideas with entry, target, stop-loss, invalidation level and risk information",
      "Reworked stop-loss logic after an independent code audit found flaws",
      "Added a confidence-scoring layer so signals are not all treated equally",
      "Moved credentials into environment variables instead of hardcoding them",
    ],
  },
  {
    id: "agent",
    org: "AI AUTOMATION",
    title: "Mean Reversion AI Agent",
    link: "https://eu1.make.com/public/shared-scenario/MeFzehkucME/mean-reversion-autotrading-ai-agent",
    summary:
      "A Make workflow that reads market data, applies AI reasoning to find a candidate setup and checks a history of failed trades so unsuccessful configurations are avoided.",
    tags: ["Make", "AI reasoning", "Google Sheets"],
    outcome: "Moves from a fixed rule-based pipeline to one that uses live data, AI reasoning and stored feedback.",
    bullets: [
      "Retrieved price and OHLC data for the previous 100 four-hour candles from MEXC",
      "Passed market context to an AI step to identify a candidate mean-reversion entry",
      "Read a Google Sheets trade history so failed setups are identified and avoided",
    ],
  },
  {
    id: "jobs",
    org: "DATA AUTOMATION",
    title: "Job Aggregation & AI Processing Pipeline",
    demo: "https://www.loom.com/share/e65092750e354e839d4f9c194d966d97", // paste your Loom link here
    summary:
      "A scheduled pipeline that collects high-volume job listings and uses an AI agent to standardise the data for bulk upload.",
    tags: ["Make", "REST APIs", "OpenAI", "Google Sheets"],
    outcome: "Replaced a manual data-entry process with a bulk CSV upload system, reducing sourcing time.",
    bullets: [
      "Queried external API endpoints on a schedule and collected listings",
      "Used an AI agent to read, review and standardise unstructured JSON",
      "Fed the cleaned data into Google Sheets for bulk upload",
    ],
  },
  {
    id: "crm",
    org: "WORKFLOW AUTOMATION",
    title: "CRM & Lead Nurturing Automation",
    demo: "https://www.loom.com/share/4a049a554ba74f0caa627053b639e042", // paste your Loom lin
    summary:
      "A multi-step Make workflow that creates HubSpot contacts from a lead form, sends a personalised welcome email and alerts the team.",
    tags: ["Make", "HubSpot", "Gmail", "Telegram"],
    outcome: "No manual data entry, no delayed welcome emails and fewer missed leads.",
    bullets: [
      "Connected a lead capture form through an API to create and categorise HubSpot contacts",
      "Used conditional logic to send a personalised Gmail welcome based on form answers",
      "Sent a Telegram notification so someone follows up quickly",
    ],
  },
];

const FEATURED_IDS = ["kpi", "webinar", "hr"];

const WHAT_I_DO = [
  { title: "Workflow automation", desc: "Connecting forms, CRMs, email and spreadsheets so onboarding, confirmations and follow-ups run on their own." },
  { title: "Live reporting", desc: "Dashboards that pull from a CRM or sheet, so managers see current numbers without waiting for a monthly report." },
  { title: "Admin and records systems", desc: "Clean data, trackers and checklists that keep attendance, onboarding and documentation accurate." },
  { title: "Grant and community operations", desc: "Grant cycles, campus activations and member engagement that deliver measurable outcomes." },
];

const SKILL_GROUPS = [
  { label: "AUTOMATION", items: ["Make", "Zapier", "HubSpot", "REST APIs", "Google Forms & Calendar"] },
  { label: "DATA & BI", items: ["Power BI", "DAX", "Excel", "Power Query", "Google Sheets"] },
  { label: "TECHNICAL", items: ["Python", "React", "FastAPI", "GitHub"] },
  { label: "OPERATIONS", items: ["Google Workspace", "Microsoft Office", "Notion", "ClickUp", "Trello", "Canva"] },
  { label: "LEADERSHIP", items: ["Grant Writing & Proposals", "Community Management", "Event Planning", "Partnership Development", "Public Speaking"] },
  { label: "SCIENCE", items: ["Biochemical Analysis", "Sample Processing", "Spectrophotometry", "Laboratory Data Management"] },
];

/* ------------------------------ helpers ------------------------------ */

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Counter({ end, prefix = "", suffix = "", inView }) {
  const [val, setVal] = useState(0);
  const isDecimal = !Number.isInteger(end);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const eased = 1 - (1 - p) ** 3;
      const cur = eased * end;
      setVal(isDecimal ? +cur.toFixed(2) : Math.floor(cur));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, isDecimal]);
  return <>{prefix}{isDecimal ? val.toFixed(2) : val.toLocaleString()}{suffix}</>;
}

// Hides the image if the file is missing from /public, so you never see a broken icon.
function SafeImg({ src, alt, className }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return null;
  return <img src={src} alt={alt} className={className} onError={() => setOk(false)} />;
}

function ProjectLinks({ p }) {
  return (
    <>
      {p.link && (
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="ml-4 text-sm text-emerald-600 font-semibold hover:underline">
          View project ↗
        </a>
      )}
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="ml-4 text-sm text-emerald-600 font-semibold hover:underline">
          Watch demo ↗
        </a>
      )}
    </>
  );
}

/* ------------------------------ layout ------------------------------ */

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const go = (id) => { setPage(id); setOpen(false); window.scrollTo({ top: 0 }); };
  const links = ["home", "about", "projects", "resume", "contact"];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => go("home")} className="font-semibold text-slate-900 text-sm">Muiz Anthony</button>
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <button key={l} onClick={() => go(l)} className={`text-sm font-medium capitalize transition-colors ${page === l ? "text-emerald-600" : "text-slate-500 hover:text-slate-900"}`}>{l}</button>
          ))}
        </nav>
        <button className="md:hidden text-slate-600 text-xl font-light" onClick={() => setOpen(!open)} aria-label="Menu">{open ? "×" : "≡"}</button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button key={l} onClick={() => go(l)} className={`text-sm capitalize text-left font-medium ${page === l ? "text-emerald-600" : "text-slate-600"}`}>{l}</button>
          ))}
        </div>
      )}
    </header>
  );
}

function Home({ setPage }) {
  const [metricsRef, metricsInView] = useInView();
  const featured = FEATURED_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);
  return (
    <main>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SafeImg src="/headshot.jpg" alt="Muiz Anthony" className="w-36 h-36 rounded-full object-contain border-2 border-emerald-100 mb-6 bg-slate-50" />
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-4">Operations · Automation · Reporting</p>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Muiz{" "}<span className="text-emerald-600" style={{ fontStyle: "italic" }}>Anthony</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            I build automated operations and reporting systems, from CRM workflows to live KPI dashboards, and I run the grant and community operations behind them.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setPage("projects")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors">View Projects</button>
            <a href={CONTACT.cv} download className="border border-slate-300 hover:border-slate-500 text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors">Download CV</a>
            <button onClick={() => setPage("contact")} className="border border-slate-300 hover:border-slate-500 text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors">Work with me</button>
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Experience</p>
          <div className="space-y-4">
            {EXPERIENCE.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.active ? "bg-emerald-500" : "bg-slate-300"}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.role}</p>
                  <p className="text-xs text-slate-500">{item.org}</p>
                  <p className="text-xs text-slate-400">{item.period}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-400 mb-0.5">Education</p>
            <p className="text-sm font-semibold text-slate-900">B.Sc. Biochemistry · LASU</p>
            <p className="text-xs text-emerald-600 font-semibold">CGPA 4.36 / 5.0 · 2026</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-400">Lagos, Nigeria · Open to Operations roles and automation projects</p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Impact</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Outcomes that compound</h2>
          <p className="text-slate-500 text-sm mb-10">Snapshot metrics from real programmes. The numbers animate as you scroll.</p>
          <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-100">
                <p className="text-3xl font-bold text-emerald-600 mb-1">
                  <Counter end={m.end} prefix={m.prefix || ""} suffix={m.suffix || ""} inView={metricsInView} />
                </p>
                <p className="text-sm font-semibold text-slate-800">{m.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Work</p>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured projects</h2>
        <p className="text-slate-500 text-sm mb-10">Automation, reporting and operations work, each with a clear result. Dashboard and tracker projects use simulated data.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <div key={p.id} className="border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-sm transition-all cursor-default">
              <SafeImg src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">{p.org}</p>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{p.summary}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map((t) => <span key={t} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed"><span className="font-semibold text-slate-600">Outcome · </span>{p.outcome}</p>
            </div>
          ))}
        </div>
        <button onClick={() => { setPage("projects"); window.scrollTo({ top: 0 }); }} className="mt-6 text-sm text-emerald-600 font-semibold hover:underline">View all {PROJECTS.length} projects →</button>
      </section>

      {/* What I do */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Practice</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">How I can help</h2>
          <p className="text-slate-500 text-sm mb-10">For teams that still move data around by hand.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {WHAT_I_DO.map((w, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-100">
                <div className="w-6 h-1 bg-emerald-500 rounded mb-3" />
                <h3 className="text-sm font-bold text-slate-900 mb-2">{w.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Next step</p>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to build something that works?</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Hiring for operations, or have a manual process that should run itself? Send me an email and tell me a bit about your team and what you need.
        </p>
        <button onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-colors">Get in touch</button>
      </section>
    </main>
  );
}

function About() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-5 gap-12 items-start mb-12">
        <div className="md:col-span-2">
          <SafeImg src="/headshot.jpg" alt="Muiz Anthony" className="w-40 h-40 rounded-2xl object-contain border-2 border-emerald-100 bg-slate-50" />
        </div>
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">About</h1>
          <p className="text-slate-600 leading-relaxed mb-3 text-sm">I'm Muiz Anthony, a Biochemistry graduate from Lagos State University (CGPA 4.36/5.0) who builds operational systems that deliver measurable outcomes.</p>
          <p className="text-slate-600 leading-relaxed mb-3 text-sm">From coordinating grant pipelines at EnableHer Nigeria to running campus activations for BitMart, I combine scientific rigour with practical execution. I now focus on automation and reporting: connecting CRMs, forms, email and dashboards so that routine work runs by itself and managers can see current numbers.</p>
          <p className="text-slate-600 leading-relaxed text-sm">I'm looking for operations roles in Lagos's growing tech ecosystem, and I take on automation and reporting projects for teams that want to cut manual work.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4">What I specialise in</h2>
          <ul className="space-y-2.5">
            {["Workflow automation (Make, Zapier, HubSpot)", "KPI dashboards and reporting (Power BI, Excel)", "Grant writing & funding operations", "Community building & management", "Event planning & on-ground execution", "Python tools and data pipelines"].map((s) => (
              <li key={s} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4">Tools I use</h2>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className="mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => <span key={item} className="text-xs border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Projects() {
  const [expanded, setExpanded] = useState(null);
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Work</p>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Projects</h1>
      <p className="text-slate-500 text-sm mb-10">Automation, reporting, operations and community work. Dashboard, tracker and data-cleaning projects use simulated data.</p>
      <div className="space-y-5">
        {PROJECTS.map((p) => (
          <div key={p.id} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-6">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">{p.org}</p>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h2>
              <SafeImg src={p.image} alt={p.title} className="w-full max-h-72 object-cover rounded-lg mb-4" />
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">{p.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => <span key={t} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">{t}</span>)}
              </div>
              <p className="text-sm text-slate-500 mb-4"><span className="font-semibold text-slate-700">Outcome · </span>{p.outcome}</p>
              <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} className="text-sm text-emerald-600 font-semibold hover:underline">
                {expanded === p.id ? "Show less ↑" : "How I built it ↓"}
              </button>
              <ProjectLinks p={p} />
            </div>
            {expanded === p.id && (
              <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Approach</p>
                <ul className="space-y-2">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">→</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

function Resume() {
  const ACHIEVEMENTS = [
    "Supported a $30,000+ grant portfolio and a 5,000+ member network at EnableHer Nigeria", // CHECK wording
    "Built automated CRM and webinar workflows (HubSpot, Make, Zapier, Google Workspace)",
    "Onboarded 100+ new users during a campus activation",
    "Built a 300+ member student community from scratch at LASU",
  ];
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Background</p>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Resume</h1>
      <p className="text-slate-500 text-sm mb-2">Operations · Automation · Reporting</p>
      <p className="text-slate-400 text-xs mb-8">Lagos, Nigeria · Remote · GMT+1 · <a href={`mailto:${CONTACT.email}`} className="text-emerald-600 hover:underline">{CONTACT.email}</a></p>

      <a href={CONTACT.cv} download className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors mb-10">
        ↓ Download PDF Resume
      </a>

      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-12">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-4">Selected Achievements</p>
        <ul className="space-y-2">
          {ACHIEVEMENTS.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="text-emerald-500 font-bold flex-shrink-0">✦</span>{a}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-6">Experience</h2>
      <div className="space-y-8 mb-12">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center pt-1.5">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${e.active ? "bg-emerald-500" : "bg-slate-300"}`} />
              {i < EXPERIENCE.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
            </div>
            <div className="pb-2">
              <p className="text-xs text-slate-400 mb-1">{e.period}</p>
              <h3 className="text-base font-bold text-slate-900">{e.role}</h3>
              <p className="text-sm text-slate-500 mb-1">{e.org} · <span className="text-xs">{e.type}</span></p>
              <p className="text-sm text-slate-600 leading-relaxed">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-6">Education</h2>
      <p className="text-sm font-semibold text-slate-900">B.Sc. Biochemistry · Lagos State University</p>
      <p className="text-sm text-slate-500 mb-12">Second Class Honours (Upper Division) · CGPA 4.36/5.0 · 2026</p>

      <h2 className="text-xl font-bold text-slate-900 mb-6">Core Skills</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {SKILL_GROUPS.map((g) => (
          <div key={g.label}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{g.label}</p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => <span key={item} className="text-xs border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{item}</span>)}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-400 mt-10">Prefer LinkedIn? <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">View profile</a></p>
    </main>
  );
}

function Contact() {
  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Contact</h1>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
        I'm open to operations roles and to automation or reporting projects. Send me an email, tell me a bit about your team and what you need, and I'll get back to you as soon as I can.
      </p>
      <a href={`mailto:${CONTACT.email}`} className="text-emerald-600 font-medium text-base hover:underline block mb-6">{CONTACT.email}</a>
      <a href={`mailto:${CONTACT.email}`} className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors mb-10">Send an Email</a>
      <hr className="border-slate-200 mb-8" />
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">LinkedIn</p>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm">linkedin.com/in/muiz-anthony</a>
      </div>
      <p className="text-xs text-slate-400 mt-6">Open to Operations roles · Lagos, Nigeria · GMT+1</p>
    </main>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="border-t border-slate-100 py-10 mt-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-slate-900 text-sm">Muiz Anthony</p>
            <p className="text-xs text-slate-400 mt-0.5">Operations · Automation · Reporting</p>
            <p className="text-xs text-slate-400 mt-0.5">Lagos, Nigeria · Remote · GMT+1</p>
          </div>
          <div className="flex flex-wrap gap-6">
            {["home", "about", "projects", "resume", "contact"].map((l) => (
              <button key={l} onClick={() => { setPage(l); window.scrollTo({ top: 0 }); }} className="text-xs text-slate-500 hover:text-slate-900 capitalize">{l}</button>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-50 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex gap-6">
            <a href={`mailto:${CONTACT.email}`} className="text-xs text-slate-400 hover:text-slate-600">{CONTACT.email}</a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-600">LinkedIn</a>
          </div>
          <p className="text-xs text-slate-300">© 2026 Muiz Anthony</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Nav page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "about" && <About />}
      {page === "projects" && <Projects />}
      {page === "resume" && <Resume />}
      {page === "contact" && <Contact />}
      <Footer setPage={setPage} />
    </div>
  );
}