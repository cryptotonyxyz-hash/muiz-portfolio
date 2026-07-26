import { useState, useEffect, useRef } from "react";

const METRICS = [
  { end: 30, prefix: "$", suffix: "K+", label: "Grants Secured", sub: "Global Fund for Women" },
  { end: 5000, suffix: "+", label: "Community Members", sub: "Built from zero" },
  { end: 300, suffix: "+", label: "Student Community", sub: "LASU BitMart" },
  { end: 100, suffix: "+", label: "Users Onboarded", sub: "Crypto traders" },
  { end: 50, suffix: "+", label: "Lab Samples/Week", sub: "Clinical internship" },
  { end: 4.36, label: "CGPA", sub: "Second Class Honours" },
];

const PROJECTS = [
  {
    id: "enableher",
    org: "ENABLEHER NIGERIA",
    title: "Grant Operations & Community Growth",
     image: "/enableher-team.jpg",
    summary: "End-to-end grant operations pipeline that secured $30,000+ from the Global Fund for Women while growing a 5,000+ member community from scratch.",
    tags: ["$30K+ Secured", "5,000+ Members", "2 Years Running"],
    outcome: "A structured grant cycle — identification, proposal, reporting — delivered consistent funding and community growth without a dedicated finance team.",
    bullets: [
      "Identified and evaluated grant opportunities across multiple international funders",
      "Coordinated full application timelines, compiled impact reports, and managed funder liaison",
      "Built engagement strategy that grew Instagram following to 5,000+ organically",
      "Managed stakeholder communications across co-founders, beneficiaries, and external partners",
    ],
  },
  {
    id: "bitmart",
    org: "BITMART × LASU",
    title: "Campus Activation & Community Operations",
    image: "/bitmart-event.jpg",
    summary: "Campus-level Web3 activation that built a 300+ member student community and onboarded 100+ new traders at Lagos State University.",
    tags: ["100+ Users Onboarded", "300+ Community", "IRL Event Executed"],
    outcome: "Zero-to-community execution — event planning, logistics, and ongoing management delivered measurable platform growth.",
    bullets: [
      "Planned and executed a full in-person campus event: venue, speakers, and logistics",
      "Onboarded 100+ new users and active traders to BitMart during the event",
      "Built and managed the LASU BitMart community from zero to 300+ active members",
      "Served as institutional contact representing BitMart at LASU campus",
    ],
  },
  {
    id: "heatmap",
    org: "PERSONAL PROJECT",
    title: "Lagos Urban Heat Stress Monitor",
    summary: "A real-time environmental monitoring system tracking heat stress across Lagos zones — React, FastAPI, Python, Leaflet.",
    tags: ["6 Lagos Zones", "Real-time Data", "Python + React"],
    outcome: "A functioning monitoring system with predictive alerts — operational thinking applied to environmental data.",
    bullets: [
      "Built React/Vite/Tailwind frontend with interactive Leaflet maps for Lagos zone data",
      "Developed FastAPI + SQLite backend integrating Open-Meteo for live weather data",
      "Implemented statistical predictive engine and Twilio SMS alert scaffolding",
      "Deployed to Vercel (frontend) and Render (backend) as a live, accessible system",
    ],
  },
];

const WHAT_I_DO = [
  { title: "Grant & funding operations", desc: "End-to-end grant cycle management — opportunity identification, proposals, timelines, funder liaison, and impact reporting." },
  { title: "Community & event operations", desc: "Campus activations, community growth strategy, IRL event execution, and member engagement that delivers measurable outcomes." },
  { title: "Operational frameworks", desc: "Building processes from scratch — documentation, stakeholder management, and systems that run without constant supervision." },
  { title: "Python automation & data", desc: "Tools, pipelines, monitoring dashboards, and scripts that reduce manual work and surface actionable information." },
];

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
      setVal(isDecimal ? +(cur.toFixed(2)) : Math.floor(cur));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, isDecimal]);
  return <>{prefix}{isDecimal ? val.toFixed(2) : val.toLocaleString()}{suffix}</>;
}

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const go = (id) => { setPage(id); setOpen(false); };
  const links = ["home", "about", "projects", "contact"];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => go("home")} className="font-semibold text-slate-900 text-sm">Muiz Anthony</button>
        <nav className="hidden md:flex gap-8">
          {links.map(l => (
            <button key={l} onClick={() => go(l)} className={`text-sm font-medium capitalize transition-colors ${page === l ? "text-emerald-600" : "text-slate-500 hover:text-slate-900"}`}>{l}</button>
          ))}
        </nav>
        <button className="md:hidden text-slate-600 text-xl font-light" onClick={() => setOpen(!open)}>{open ? "×" : "≡"}</button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <button key={l} onClick={() => go(l)} className={`text-sm capitalize text-left font-medium ${page === l ? "text-emerald-600" : "text-slate-600"}`}>{l}</button>
          ))}
        </div>
      )}
    </header>
  );
}

function Home({ setPage }) {
  const [metricsRef, metricsInView] = useInView();
  return (
    <main>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
       <img
  src="/headshot.jpg"
  alt="Muiz Anthony"
  className="w-36 h-36 rounded-full object-cover border-2 border-emerald-100 mb-6"
  style={{ objectPosition: "center 15%" }}
/>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-4">Operations · Community · Science</p>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Muiz{" "}<span className="text-emerald-600" style={{ fontStyle: "italic" }}>Anthony</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            I build operational systems, grow communities, and execute processes that deliver measurable outcomes — from grant pipelines to campus-level activations.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setPage("projects")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors">View Projects</button>
            <button onClick={() => setPage("contact")} className="border border-slate-300 hover:border-slate-500 text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors">Get in Touch</button>
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Experience</p>
          <div className="space-y-4">
            {[
              { role: "Co-Founder", org: "EnableHer Nigeria", period: "Sep 2024 – Present", active: true },
              { role: "Campus Ambassador", org: "BitMart Exchange", period: "Jan – Jun 2026", active: false },
              { role: "Clinical Lab Intern", org: "Crystal Specialist Hospital", period: "Apr – Oct 2025", active: false },
            ].map((item, i) => (
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
            <p className="text-xs text-slate-400">Lagos, Nigeria · Open to Operations roles</p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Impact</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Outcomes that compound</h2>
          <p className="text-slate-500 text-sm mb-10">Snapshot metrics from real programmes — numbers animate as you scroll.</p>
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

      {/* Projects preview */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Work</p>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured projects</h2>
        <p className="text-slate-500 text-sm mb-10">Operations, community, and technical work — each with measurable outcomes.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map(p => (
            <div key={p.id} className="border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-sm transition-all cursor-default">
              {p.image && (
  <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-lg mb-4" />
)}
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">{p.org}</p>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{p.summary}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map(t => <span key={t} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed"><span className="font-semibold text-slate-600">Outcome · </span>{p.outcome}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setPage("projects")} className="mt-6 text-sm text-emerald-600 font-semibold hover:underline">View all projects →</button>
      </section>

      {/* What I do */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Practice</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">What I do</h2>
          <p className="text-slate-500 text-sm mb-10">Operational systems that get things done — without losing the human element.</p>
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
        <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">Tell me about your team and what you need — I typically reply within two business days.</p>
        <button onClick={() => setPage("contact")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-colors">Get in touch</button>
      </section>
    </main>
  );
}

function About() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-5 gap-12 items-start mb-12">
        <div className="md:col-span-2">
        <img
  src="/headshot.jpg"
  alt="Muiz Anthony"
  className="w-40 h-40 rounded-2xl object-cover object-top border-2 border-emerald-100"
  style={{ objectPosition: "center 15%" }}
/>
        </div>
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">About</h1>
          <p className="text-slate-600 leading-relaxed mb-3 text-sm">I'm Muiz Anthony, a final-year Biochemistry graduate from Lagos State University (CGPA 4.36/5.0) with a track record of building operational systems that deliver measurable outcomes.</p>
          <p className="text-slate-600 leading-relaxed mb-3 text-sm">From coordinating grant pipelines at EnableHer Nigeria to executing campus activations for BitMart, I combine scientific rigour with entrepreneurial execution. I understand how to build processes from scratch, manage stakeholders, and deliver results without a playbook.</p>
          <p className="text-slate-600 leading-relaxed text-sm">I'm targeting Operations roles in Lagos's growing tech ecosystem, where execution discipline and local market knowledge are competitive advantages.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4">What I specialise in</h2>
          <ul className="space-y-2.5">
            {["Grant writing & funding operations", "Community building & management", "Event planning & on-ground execution", "Stakeholder & partnership management", "Python automation & data pipelines", "Lab science & research methodology"].map(s => (
              <li key={s} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4">Tools I use</h2>
          {[
            { label: "OPERATIONS", items: ["Google Workspace", "WhatsApp Communities", "Instagram"] },
            { label: "TECHNICAL", items: ["Python", "GitHub", "React", "FastAPI"] },
            { label: "SCIENCE", items: ["Hematology", "Serology", "Biochemical Analysis", "Spectrophotometry"] },
          ].map(g => (
            <div key={g.label} className="mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map(item => <span key={item} className="text-xs border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{item}</span>)}
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
      <p className="text-slate-500 text-sm mb-10">Operations, community, and technical work — each with measurable outcomes.</p>
      <div className="space-y-5">
        {PROJECTS.map(p => (
          <div key={p.id} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-6">
              
              <h2 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h2>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">{p.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map(t => <span key={t} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">{t}</span>)}
              </div>
              <p className="text-sm text-slate-500 mb-4"><span className="font-semibold text-slate-700">Outcome · </span>{p.outcome}</p>
              <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} className="text-sm text-emerald-600 font-semibold hover:underline">
                {expanded === p.id ? "Show less ↑" : "How I approached it ↓"}
              </button>
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

function Contact() {
  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Contact</h1>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">To reach me, send an email — I typically reply within two business days. Include a short note about your team, timeline, and what you need.</p>
      <a href="mailto:muizanthony0@gmail.com" className="text-emerald-600 font-medium text-base hover:underline block mb-6">muizanthony0@gmail.com</a>
      <a href="mailto:muizanthony0@gmail.com" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors mb-10">Send an Email</a>
      <hr className="border-slate-200 mb-8" />
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">LinkedIn</p>
        <a href="https://www.linkedin.com/in/muiz-anthony-848793242/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm">linkedin.com/in/muiz-anthony-848793242</a>
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
            <p className="text-xs text-slate-400 mt-0.5">Operations · Community Building · Science</p>
            <p className="text-xs text-slate-400 mt-0.5">Lagos, Nigeria · Remote · GMT+1</p>
          </div>
          <div className="flex flex-wrap gap-6">
            {["home", "about", "projects", "contact"].map(l => (
              <button key={l} onClick={() => setPage(l)} className="text-xs text-slate-500 hover:text-slate-900 capitalize">{l}</button>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-50 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex gap-6">
            <a href="mailto:muizanthony0@gmail.com" className="text-xs text-slate-400 hover:text-slate-600">muizanthony0@gmail.com</a>
            <a href="https://www.linkedin.com/in/muiz-anthony-848793242/" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-600">LinkedIn</a>
          </div>
          <p className="text-xs text-slate-300">2026 Muiz Anthony</p>
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
      {page === "home"     && <Home     setPage={setPage} />}
      {page === "about"    && <About    />}
      {page === "projects" && <Projects />}
      {page === "contact"  && <Contact  />}
      <Footer setPage={setPage} />
    </div>
  );
}
