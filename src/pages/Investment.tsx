import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Link } from "wouter";
import IFtoFLHorizontalScroll from "../components/ui/IFtoFLHorizontalScroll";

const up = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

/* ── Before / After stone results ─────────────────── */
const STONES = [
  {
    id: "FLX–001",
    carat: "1.52 ct",
    colour: "D",
    cut: "Excellent",
    shape: "Round Brilliant",
    before: {
      grade: "IF",
      label: "Internally Flawless",
      comment: "Extra facet, bezel, crown area",
      value: "AUD $28,000",
      note: "Surface-only. Not visible to naked eye. No internal inclusions.",
      videoSrc: "/stone-before-1.mp4" as string | null,
      certPdf: "/gia-cert-if.pdf" as string | null,
      certLabel: "GIA IF Certificate",
    },
    after: {
      grade: "FL",
      label: "Flawless",
      comment: "No clarity characteristics",
      value: "AUD $38,500",
      note: "New GIA certificate issued. Carat bracket unchanged.",
      videoSrc: "/stone-after-1.mp4" as string | null,
      certPdf: "/gia-cert-fl.pdf" as string | null,
      certLabel: "GIA FL Certificate",
    },
    uplift: "+37.5%",
    weeks: "6 weeks",
    removed: "Extra facet, crown",
  },
  {
    id: "FLX–002",
    carat: "2.01 ct",
    colour: "E",
    cut: "Excellent",
    shape: "Round Brilliant",
    before: {
      grade: "IF",
      label: "Internally Flawless",
      comment: "Surface graining not shown",
      value: "AUD $62,000",
      note: "GIA Comments: surface grain only — not internal, fully removable.",
      videoSrc: "/stone-before-2.mp4" as string | null,
      certPdf: null,
      certLabel: null,
    },
    after: {
      grade: "FL",
      label: "Flawless",
      comment: "No clarity characteristics",
      value: "AUD $82,000",
      note: "New GIA certificate issued. Carat bracket unchanged.",
      videoSrc: null,
      certPdf: null,
      certLabel: null,
    },
    uplift: "+32.3%",
    weeks: "4 weeks",
    removed: "Surface graining",
  },
  {
    id: "FLX–003",
    carat: "1.05 ct",
    colour: "F",
    cut: "Very Good",
    shape: "Round Brilliant",
    before: {
      grade: "IF",
      label: "Internally Flawless",
      comment: "Natural, girdle",
      value: "AUD $14,500",
      note: "Natural on girdle — surface characteristic, removable without weight loss.",
      videoSrc: null,
      certPdf: null,
      certLabel: null,
    },
    after: {
      grade: "FL",
      label: "Flawless",
      comment: "No clarity characteristics",
      value: "AUD $18,200",
      note: "New GIA certificate issued. Weight and proportions unchanged.",
      videoSrc: null,
      certPdf: null,
      certLabel: null,
    },
    uplift: "+25.5%",
    weeks: "5 weeks",
    removed: "Natural, girdle",
  },
];

const PILLARS = [
  {
    title: "Wealth Preservation",
    body: "Tangible, highly concentrated value resistant to inflation and currency fluctuations. FL diamonds at meaningful carat weights have demonstrated resilience across economic cycles.",
  },
  {
    title: "Rarity Premium",
    body: "FL clarity at 1ct+ is among the rarest intersections in the diamond market. The IF→FL conversion allows buyers to access this tier at a cost basis below prevailing FL spot pricing.",
  },
  {
    title: "Value Transparency",
    body: "GIA certification provides an objective, globally recognised benchmark. The conversion process is documented and verifiable, eliminating the opacity that characterises many alternative asset classes.",
  },
];

/* ── GIA Clarity Scale ──────────────────────────────── */
const GIA_SCALE = [
  { grade: "FL",   full: "Flawless",             flx: true  },
  { grade: "IF",   full: "Internally Flawless",  flx: true  },
  { grade: "VVS1", full: "Very Very Slightly Included 1", flx: false },
  { grade: "VVS2", full: "Very Very Slightly Included 2", flx: false },
  { grade: "VS1",  full: "Very Slightly Included 1",      flx: false },
  { grade: "VS2",  full: "Very Slightly Included 2",      flx: false },
  { grade: "SI1",  full: "Slightly Included 1",           flx: false },
  { grade: "SI2",  full: "Slightly Included 2",           flx: false },
  { grade: "I1",   full: "Included 1",            flx: false },
  { grade: "I2",   full: "Included 2",            flx: false },
  { grade: "I3",   full: "Included 3",            flx: false },
];

function GIAClarityScale() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-14 p-6 md:p-8"
      style={{ background: "rgba(28,169,201,0.04)", border: "1px solid rgba(28,169,201,0.12)" }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
        <div>
          <p className="text-[9px] uppercase tracking-[0.5em] mb-1.5" style={{ color: "rgba(28,169,201,0.6)" }}>
            GIA Clarity Scale · Source: 4cs.gia.edu
          </p>
          <p className="font-serif text-base md:text-lg" style={{ color: "rgba(255,255,255,0.72)" }}>
            11 grades from Flawless to Included — FL sits at the apex.
          </p>
        </div>
        <a
          href="https://4cs.gia.edu/en-us/diamond-clarity/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] uppercase tracking-widest transition-opacity hover:opacity-100"
          style={{ color: "rgba(28,169,201,0.5)", borderBottom: "1px solid rgba(28,169,201,0.2)", paddingBottom: "2px" }}
        >
          GIA Reference ↗
        </a>
      </div>

      {/* Scale bar — desktop */}
      <div className="hidden sm:flex w-full">
        {GIA_SCALE.map((g, i) => (
          <motion.div
            key={g.grade}
            initial={{ opacity: 0, scaleY: 0.5 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] font-medium tracking-wide"
              style={{ color: g.flx ? "#1CA9C9" : `rgba(255,255,255,${0.48 - i * 0.03})` }}
            >
              {g.grade}
            </span>
            <div
              style={{
                width: "100%",
                height: g.flx ? "28px" : "20px",
                background: g.flx
                  ? "rgba(28,169,201,0.65)"
                  : `rgba(255,255,255,${0.06 - i * 0.004})`,
                border: g.flx ? "1px solid rgba(28,169,201,0.85)" : "1px solid rgba(255,255,255,0.06)",
                transition: "background 0.2s",
                boxShadow: g.flx ? "0 0 12px rgba(28,169,201,0.3)" : "none",
              }}
            />
            <span
              title={g.full}
              className="text-[8px] text-center leading-snug hidden lg:block"
              style={{ color: g.flx ? "rgba(28,169,201,0.55)" : "rgba(255,255,255,0.15)", maxWidth: "56px" }}
            >
              {g.flx ? g.full : ""}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Scale bar — mobile */}
      <div className="sm:hidden flex overflow-x-auto gap-1 pb-2" style={{ scrollbarWidth: "none" }}>
        {GIA_SCALE.map((g, i) => (
          <div key={g.grade} className="shrink-0 flex flex-col items-center gap-1.5" style={{ minWidth: "44px" }}>
            <span className="text-[10px] font-medium" style={{ color: g.flx ? "#1CA9C9" : `rgba(255,255,255,${0.45 - i * 0.03})` }}>
              {g.grade}
            </span>
            <div
              style={{
                width: "36px",
                height: g.flx ? "24px" : "16px",
                background: g.flx ? "rgba(28,169,201,0.6)" : `rgba(255,255,255,${0.06})`,
                border: g.flx ? "1px solid rgba(28,169,201,0.8)" : "1px solid rgba(255,255,255,0.06)",
                boxShadow: g.flx ? "0 0 10px rgba(28,169,201,0.25)" : "none",
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 mt-5 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2">
          <div style={{ width: "16px", height: "10px", background: "rgba(28,169,201,0.65)", border: "1px solid rgba(28,169,201,0.85)" }} />
          <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(28,169,201,0.6)" }}>FLX Focus — FL &amp; IF tier</span>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: "16px", height: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }} />
          <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Lower clarity grades</span>
        </div>
        <span className="text-[9px] ml-auto" style={{ color: "rgba(255,255,255,0.15)" }}>
          Source: Gemological Institute of America (GIA) · 4cs.gia.edu
        </span>
      </div>
    </motion.div>
  );
}

/* ── IF→FL Process Mindmap ─────────────────────────── */
type FlowNode = {
  n: string;
  title: string;
  body: string;
  tag: string;
  type: "start" | "node" | "decision" | "end";
  noPath?: { title: string; body: string; tag: string };
};

const FLOW: FlowNode[] = [
  {
    n: "01",
    title: "Submit GIA Certificate",
    body: "Send us the GIA certificate number. We read the Comments field — specific language such as 'extra facet' or 'surface graining' is the key indicator of conversion candidacy.",
    tag: "Free · 24h response",
    type: "start",
  },
  {
    n: "02",
    title: "GIA Comments Analysis",
    body: "Our team reads the technical language used by GIA graders. The Comments section of an IF certificate often contains removable surface characteristics invisible to the naked eye.",
    tag: "Technical GIA reading",
    type: "node",
  },
  {
    n: "?",
    title: "Does the Stone Qualify?",
    body: "~15–20% of IF stones pass this filter. The characteristic must be surface-only and removable without touching the carat weight threshold.",
    tag: "~15–20% pass rate",
    type: "decision",
    noPath: {
      title: "Stone Returned Unchanged",
      body: "No regrind is performed. The stone is returned as submitted. No cost, no risk, full discretion maintained.",
      tag: "80–85% of submissions",
    },
  },
  {
    n: "03",
    title: "Written Feasibility Report",
    body: "A clear written assessment: projected FL outcome, expected timeline, and cost structure. No commitment is required at this stage.",
    tag: "Written · No obligation",
    type: "node",
  },
  {
    n: "04",
    title: "Precision Micro-Regrind",
    body: "Babu Vekariya executes the regrind. Under 0.01mm of material removed from the affected facet. Hours per stone. No automation, no margin for error.",
    tag: "47 years · Babu Vekariya",
    type: "node",
  },
  {
    n: "FL",
    title: "New GIA FL Certificate",
    body: "The stone is independently resubmitted to GIA. A new Flawless certificate is issued — same carat bracket, verifiable, permanent, globally recognised.",
    tag: "Value uplift: 15–35%",
    type: "end",
  },
];

function IFtoFLMindmap() {
  return (
    <div className="w-full">

      {/* ═══ DESKTOP (lg+): horizontal flow with decision branch ═══ */}
      <div className="hidden lg:block" style={{ paddingBottom: "220px", position: "relative" }}>
        <div className="flex items-start">
          {FLOW.map((node, i) => (
            <div key={node.n} className="flex items-start flex-1">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.11, duration: 0.6, ease: EASE }}
                className="flex-1 relative"
              >
                <div
                  className="p-5 flex flex-col gap-3 h-full"
                  style={{
                    background: node.type === "end"
                      ? "rgba(28,169,201,0.08)"
                      : node.type === "decision"
                      ? "rgba(28,169,201,0.04)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${
                      node.type === "end"
                        ? "rgba(28,169,201,0.55)"
                        : node.type === "decision"
                        ? "rgba(28,169,201,0.45)"
                        : "rgba(28,169,201,0.14)"
                    }`,
                    borderStyle: node.type === "decision" ? "dashed" : "solid",
                    minHeight: "200px",
                  }}
                >
                  <span
                    className="font-serif text-2xl leading-none"
                    style={{
                      color: "#1CA9C9",
                      opacity: node.type === "end" ? 1 : 0.45,
                      fontWeight: node.type === "end" ? 600 : 400,
                    }}
                  >
                    {node.n}
                  </span>
                  <h3
                    className="font-serif text-sm leading-snug"
                    style={{ color: node.type === "end" ? "#1CA9C9" : "rgba(255,255,255,0.85)" }}
                  >
                    {node.title}
                  </h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.32)" }}>
                    {node.body}
                  </p>
                  <p
                    className="text-[9px] uppercase tracking-widest"
                    style={{
                      color: node.type === "end" ? "rgba(28,169,201,0.8)" : "rgba(28,169,201,0.45)",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      paddingTop: "8px",
                    }}
                  >
                    {node.tag}
                  </p>
                </div>

                {node.type === "decision" && node.noPath && (
                  <div
                    className="absolute flex flex-col items-center"
                    style={{ left: "50%", top: "100%", transform: "translateX(-50%)" }}
                  >
                    <div style={{ width: "1px", height: "28px", background: "rgba(28,169,201,0.35)" }} />
                    <div
                      className="text-[8px] uppercase tracking-widest px-2.5 py-1"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        background: "#02274A",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      No path
                    </div>
                    <div style={{ width: "1px", height: "20px", background: "rgba(28,169,201,0.35)" }} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
                      className="p-4 flex flex-col gap-2"
                      style={{
                        width: "190px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <h4 className="font-serif text-sm leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {node.noPath.title}
                      </h4>
                      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
                        {node.noPath.body}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                        {node.noPath.tag}
                      </p>
                    </motion.div>
                  </div>
                )}
              </motion.div>

              {i < FLOW.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.11 + 0.3, duration: 0.4 }}
                  className="shrink-0 flex items-center px-1.5 pt-16"
                  style={{ color: "rgba(28,169,201,0.35)" }}
                >
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                    <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div
          className="absolute text-[8px] uppercase tracking-widest"
          style={{
            color: "rgba(28,169,201,0.5)",
            top: "60px",
            left: "calc(100% / 6 * 2.4)",
          }}
        >
          Yes path →
        </div>
      </div>

      {/* ═══ MOBILE (< lg): vertical timeline ═══ */}
      <div className="lg:hidden">
        {FLOW.map((node, i) => (
          <motion.div
            key={node.n}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55, ease: EASE }}
          >
            <div className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-9 h-9 flex items-center justify-center text-[11px] font-medium shrink-0"
                  style={{
                    background: node.type === "end" ? "#1CA9C9" : "rgba(28,169,201,0.1)",
                    border: `1px solid ${node.type === "decision" ? "rgba(28,169,201,0.55)" : node.type === "end" ? "#1CA9C9" : "rgba(28,169,201,0.28)"}`,
                    borderStyle: node.type === "decision" ? "dashed" : "solid",
                    color: node.type === "end" ? "white" : "#1CA9C9",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {node.n}
                </div>
                {i < FLOW.length - 1 && (
                  <div style={{ width: "1px", flex: 1, minHeight: "32px", background: "rgba(28,169,201,0.18)", marginTop: "4px" }} />
                )}
              </div>
              <div className="pb-8 flex-1 min-w-0">
                <h3
                  className="font-serif text-base leading-snug mb-1.5"
                  style={{ color: node.type === "end" ? "#1CA9C9" : "rgba(255,255,255,0.85)" }}
                >
                  {node.title}
                </h3>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {node.body}
                </p>
                <p className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(28,169,201,0.5)" }}>
                  {node.tag}
                </p>
                {node.type === "decision" && node.noPath && (
                  <div
                    className="mt-4 pl-4 py-3"
                    style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <p className="text-[9px] uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                      If not qualified →
                    </p>
                    <h4 className="font-serif text-sm leading-snug mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {node.noPath.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                      {node.noPath.body}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.18)" }}>
                      {node.noPath.tag}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Stone Before / After card ─────────────────────── */
type Stone = typeof STONES[number];

function StoneCard({ stone, index }: { stone: Stone; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.14, duration: 0.65, ease: EASE }}
      style={{ border: "1px solid rgba(28,169,201,0.14)", background: "rgba(255,255,255,0.025)" }}
    >
      <div
        className="px-6 py-4 flex flex-wrap items-center justify-between gap-3"
        style={{ background: "rgba(28,169,201,0.06)", borderBottom: "1px solid rgba(28,169,201,0.14)" }}
      >
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.55 }}>
            <path d="M8 1L14 6L8 15L2 6Z" stroke="#1CA9C9" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M2 6H14" stroke="#1CA9C9" strokeWidth="1.2" />
          </svg>
          <span className="font-serif text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
            {stone.id}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {[stone.carat, stone.colour + " Colour", stone.cut, stone.shape].map((attr) => (
            <span key={attr} className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.28)" }}>
              {attr}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr]">

        {/* Before — IF */}
        <div className="flex flex-col gap-4">
          {stone.before.videoSrc && (
            <div className="w-full overflow-hidden" style={{ background: "#021C38", aspectRatio: "4/3" }}>
              <video src={stone.before.videoSrc} className="w-full h-full object-cover" controls muted loop playsInline />
            </div>
          )}
          <div className="px-6 md:px-8 pb-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] uppercase tracking-widest px-2.5 py-1" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.09)" }}>
                Before
              </span>
              <span className="font-serif text-base" style={{ color: "rgba(255,255,255,0.45)" }}>{stone.before.grade}</span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.22)" }}>— {stone.before.label}</span>
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: "rgba(28,169,201,0.45)" }}>GIA Comments Field</p>
                <p className="font-serif text-sm italic" style={{ color: "rgba(255,255,255,0.5)" }}>"{stone.before.comment}"</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(28,169,201,0.45)" }}>Surface Characteristic</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{stone.removed}</p>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>{stone.before.note}</p>
            </div>
            <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Indicative Value</p>
              <p className="font-serif text-xl" style={{ color: "rgba(255,255,255,0.45)" }}>{stone.before.value}</p>
            </div>
            {stone.before.certPdf && (
              <a
                href={stone.before.certPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-widest transition-opacity hover:opacity-80 w-fit"
                style={{ color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 12px" }}
              >
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M1 1h5l3 3v7H1V1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/><path d="M6 1v3h3" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg>
                {stone.before.certLabel ?? "GIA Certificate"} ↗
              </a>
            )}
          </div>
        </div>

        {/* Centre divider */}
        <div
          className="hidden sm:flex flex-col items-center justify-center px-3 py-8"
          style={{ borderLeft: "1px solid rgba(28,169,201,0.1)", borderRight: "1px solid rgba(28,169,201,0.1)" }}
        >
          <div style={{ width: "1px", flex: 1, background: "rgba(28,169,201,0.2)" }} />
          <div className="flex flex-col items-center gap-2 py-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13L1 7Z" fill="rgba(28,169,201,0.18)" stroke="#1CA9C9" strokeWidth="1" strokeLinejoin="round" />
            </svg>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" style={{ color: "#1CA9C9", opacity: 0.45 }}>
              <path d="M5 0v14M1 11l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ width: "1px", flex: 1, background: "rgba(28,169,201,0.2)" }} />
        </div>

        {/* Mobile divider */}
        <div className="sm:hidden flex items-center gap-3 px-6 py-3" style={{ borderTop: "1px solid rgba(28,169,201,0.1)" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(28,169,201,0.2)" }} />
          <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(28,169,201,0.5)" }}>conversion</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(28,169,201,0.2)" }} />
        </div>

        {/* After — FL */}
        <div className="flex flex-col gap-4" style={{ background: "rgba(28,169,201,0.04)" }}>
          {stone.after.videoSrc && (
            <div className="w-full overflow-hidden" style={{ background: "#021C38", aspectRatio: "4/3" }}>
              <video src={stone.after.videoSrc} className="w-full h-full object-cover" controls muted loop playsInline />
            </div>
          )}
          <div className="px-6 md:px-8 pb-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] uppercase tracking-widest px-2.5 py-1" style={{ background: "rgba(28,169,201,0.15)", color: "#1CA9C9", border: "1px solid rgba(28,169,201,0.3)" }}>
                After
              </span>
              <span className="font-serif text-base" style={{ color: "#1CA9C9" }}>{stone.after.grade}</span>
              <span className="text-[10px]" style={{ color: "rgba(28,169,201,0.45)" }}>— {stone.after.label}</span>
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: "rgba(28,169,201,0.45)" }}>GIA Comments Field</p>
                <p className="font-serif text-sm italic" style={{ color: "rgba(255,255,255,0.75)" }}>"{stone.after.comment}"</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(28,169,201,0.45)" }}>Surface Characteristic</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Removed — micro-regrind complete</p>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{stone.after.note}</p>
            </div>
            <div className="pt-4 border-t" style={{ borderColor: "rgba(28,169,201,0.15)" }}>
              <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Indicative Value</p>
              <div className="flex items-baseline gap-3">
                <p className="font-serif text-xl" style={{ color: "rgba(255,255,255,0.88)" }}>{stone.after.value}</p>
                <span
                  className="text-[10px] font-medium px-2.5 py-0.5"
                  style={{ background: "rgba(28,169,201,0.15)", color: "#1CA9C9", border: "1px solid rgba(28,169,201,0.3)" }}
                >
                  {stone.uplift}
                </span>
              </div>
            </div>
            {stone.after.certPdf && (
              <a
                href={stone.after.certPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-widest transition-opacity hover:opacity-80 w-fit"
                style={{ color: "#1CA9C9", border: "1px solid rgba(28,169,201,0.3)", padding: "6px 12px" }}
              >
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M1 1h5l3 3v7H1V1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/><path d="M6 1v3h3" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg>
                {stone.after.certLabel ?? "GIA Certificate"} ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <div
        className="px-6 py-3 flex flex-wrap items-center justify-between gap-2"
        style={{ borderTop: "1px solid rgba(28,169,201,0.1)", background: "rgba(2,39,74,0.1)" }}
      >
        <div className="flex items-center gap-5">
          <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.22)" }}>Conversion: {stone.weeks}</span>
          <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.22)" }}>GIA re-certified</span>
        </div>
        <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.14)" }}>Values indicative only. Results vary by stone parameters.</span>
      </div>
    </motion.div>
  );
}

/* ── Stories Gallery ─────────────────────────────────── */
// const STORIES = [
//   {
//     id: "s1",
//     title: "The Extra Facet That Hid a Flawless Stone",
//     subtitle: "1.52 ct · D · Round Brilliant",
//     excerpt: "A GIA Internally Flawless certificate with a single comment: 'extra facet, bezel, crown area.' The blemish was surface-only. Under 0.01mm of material removed. The stone returned as Flawless.",
//     img: "/story-extra-facet.jpg",
//     imgAlt: "Diamond with extra facet before conversion",
//     grade: "IF → FL",
//     uplift: "+37.5%",
//     tag: "Conversion",
//     featured: true,
//   },
//   {
//     id: "s2",
//     title: "Surface Graining — Invisible to the Eye",
//     subtitle: "2.01 ct · E · Round Brilliant",
//     excerpt: "Surface graining is not an internal inclusion. It is a microscopic growth pattern on the outer facet. Babu Vekariya re-polished the affected surface. The GIA recertified the stone as Flawless.",
//     img: "/story-surface-graining.jpg",
//     imgAlt: "Diamond surface graining detail",
//     grade: "IF → FL",
//     uplift: "+32.3%",
//     tag: "Conversion",
//     featured: false,
//   },
//   {
//     id: "s3",
//     title: "A Natural on the Girdle",
//     subtitle: "1.05 ct · F · Round Brilliant",
//     excerpt: "A natural remnant on the girdle is a surface characteristic, not an internal inclusion. Removed by precision micro-regrind with zero weight loss. New GIA FL certificate issued.",
//     img: "/story-natural-girdle.jpg",
//     imgAlt: "Natural girdle characteristic",
//     grade: "IF → FL",
//     uplift: "+25.5%",
//     tag: "Conversion",
//     featured: false,
//   },
//   {
//     id: "s4",
//     title: "Why Family Offices Choose FL Diamonds",
//     subtitle: "Portfolio Allocation",
//     excerpt: "FL-grade diamonds at 1ct+ represent one of the most concentrated portable stores of value. For family offices seeking non-correlated assets, the IF→FL conversion provides an entry point below spot FL pricing.",
//     img: "/story-family-office.jpg",
//     imgAlt: "Diamond portfolio allocation",
//     grade: "Investment",
//     uplift: "",
//     tag: "Advisory",
//     featured: false,
//   },
//   {
//     id: "s5",
//     title: "The GIA Certificate: Objective Benchmark",
//     subtitle: "Verification & Trust",
//     excerpt: "Every converted stone is independently resubmitted to GIA with no pre-disclosure. The new Flawless certificate is verifiable, permanent, and globally recognised. No opinion. Just fact.",
//     img: "/story-gia-cert.jpg",
//     imgAlt: "GIA diamond certificate",
//     grade: "Verification",
//     uplift: "",
//     tag: "Process",
//     featured: false,
//   },
//   {
//     id: "s6",
//     title: "47 Years of Facet Precision",
//     subtitle: "Babu Vekariya",
//     excerpt: "From the cutting rooms of Surat to the diamond districts of Antwerp, Babu Vekariya has spent four decades understanding how a single facet can change a stone's grade.",
//     img: "/story-babu-vekariya.jpg",
//     imgAlt: "Babu Vekariya diamond craftsman",
//     grade: "Heritage",
//     uplift: "",
//     tag: "Heritage",
//     featured: true,
//   },
// ];

// function StoryCard({ story, index, size }: { story: typeof STORIES[0]; index: number; size: "large" | "medium" | "small" }) {
//   const [imgLoaded, setImgLoaded] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const heightMap = { large: "520px", medium: "400px", small: "320px" };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-80px" }}
//       transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: index * 0.08 }}
//       className="group relative overflow-hidden cursor-pointer"
//       style={{ height: heightMap[size] }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute inset-0"
//           animate={{ scale: hovered ? 1.06 : 1 }}
//           transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
//         >
//           <img
//             src={story.img}
//             alt={story.imgAlt}
//             loading="lazy"
//             onLoad={() => setImgLoaded(true)}
//             className="w-full h-full object-cover"
//             style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.6s ease", background: "#02274A" }}
//           />
//         </motion.div>
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `linear-gradient(to bottom, rgba(2,39,74,0.0) 0%, rgba(2,39,74,0.15) 35%, rgba(2,39,74,0.55) 65%, rgba(2,39,74,0.85) 100%)`,
//           }}
//         />
//         <motion.div
//           className="absolute inset-0 pointer-events-none"
//           style={{ background: "rgba(28,169,201,0.08)" }}
//           animate={{ opacity: hovered ? 1 : 0 }}
//           transition={{ duration: 0.4 }}
//         />
//       </div>

//       <div className="absolute top-5 left-5 z-10">
//         <span
//           className="text-[9px] uppercase tracking-[0.25em] px-3 py-1.5"
//           style={{ background: "rgba(2,39,74,0.7)", backdropFilter: "blur(8px)", color: "#1CA9C9", border: "1px solid rgba(28,169,201,0.25)" }}
//         >
//           {story.tag}
//         </span>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
//         <motion.div
//           animate={{ y: hovered ? -4 : 0 }}
//           transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "#1CA9C9" }}>{story.grade}</span>
//             {story.uplift && (
//               <span className="text-[10px] font-medium px-2 py-0.5" style={{ color: "#1CA9C9", background: "rgba(28,169,201,0.15)", border: "1px solid rgba(28,169,201,0.3)" }}>
//                 {story.uplift}
//               </span>
//             )}
//           </div>
//           <h3
//             className="font-serif leading-tight mb-2"
//             style={{ fontSize: size === "large" ? "clamp(1.4rem, 3vw, 2rem)" : "clamp(1.1rem, 2.5vw, 1.5rem)", color: "rgba(255,255,255,0.92)" }}
//           >
//             {story.title}
//           </h3>
//           <p className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{story.subtitle}</p>
//           <motion.p
//             className="text-[13px] leading-relaxed"
//             style={{ color: "rgba(255,255,255,0.55)" }}
//             animate={{ opacity: hovered || size === "large" ? 1 : 0, y: hovered || size === "large" ? 0 : 8 }}
//             transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
//           >
//             {story.excerpt}
//           </motion.p>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// function StoriesGallery() {
//   return (
//     <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
//           <div className="space-y-4">
//             <motion.p
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//               transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
//               className="text-[10px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}
//             >
//               Stories Behind the Stone
//             </motion.p>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//               transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
//               className="font-serif leading-tight"
//               style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "rgba(255,255,255,0.92)" }}
//             >
//               Every Diamond<br />
//               <span style={{ color: "rgba(255,255,255,0.25)" }}>Has a Story.</span>
//             </motion.h2>
//           </div>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//             transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
//             className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.4)" }}
//           >
//             Real conversions. Real certificates. Real outcomes. Each story documents the exact GIA Comments
//             language, the surface characteristic removed, and the verified FL result.
//           </motion.p>
//         </div>

//         <div className="hidden md:grid grid-cols-2 gap-5">
//           <div className="col-span-2 grid grid-cols-2 gap-5">
//             <StoryCard story={STORIES[0]} index={0} size="large" />
//             <StoryCard story={STORIES[1]} index={1} size="medium" />
//           </div>
//           <StoryCard story={STORIES[2]} index={2} size="medium" />
//           <StoryCard story={STORIES[3]} index={3} size="small" />
//           <StoryCard story={STORIES[4]} index={4} size="small" />
//           <StoryCard story={STORIES[5]} index={5} size="large" />
//         </div>

//         <div className="md:hidden flex flex-col gap-5">
//           {STORIES.map((story, i) => (
//             <StoryCard key={story.id} story={story} index={i} size="large" />
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//           transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
//           className="mt-14 md:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 py-8 px-8"
//           style={{ border: "1px solid rgba(28,169,201,0.15)", background: "rgba(28,169,201,0.04)" }}
//         >
//           <div>
//             <p className="text-[10px] uppercase tracking-[0.35em] mb-2" style={{ color: "#1CA9C9" }}>Submit Your Stone</p>
//             <p className="font-serif text-lg" style={{ color: "rgba(255,255,255,0.75)" }}>Have an IF diamond with a GIA Comments field?</p>
//           </div>
//           <Link href="/contact">
//             <button className="text-[10px] uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-80 shrink-0" style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem", border: "none" }}>
//               Free Assessment
//             </button>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

/* ══════════════════════════════════════════════════════════════════════
   INVESTMENT PAGE
   ══════════════════════════════════════════════════════════════════════ */
export default function Investment() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 md:pt-40 pb-20 md:pb-28 px-8 md:px-14 lg:px-20" style={{ background: "#02274A" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(28,169,201,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(28,169,201,0.03) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-end">
          <div className="space-y-5 md:space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>Investment Advisory</motion.p>
            <motion.h1 variants={up} className="font-serif leading-tight" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", color: "rgba(255,255,255,0.9)" }}>
              Diamonds as a<br /><span style={{ color: "rgba(255,255,255,0.25)" }}>Store of Value.</span>
            </motion.h1>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
          </div>
          <motion.div variants={up} className="space-y-4">
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
              FL-grade diamonds at meaningful carat weights have historically functioned as a portable, non-correlated store of value. The IF→FL conversion represents a specific, documentable arbitrage: buy IF, convert to FL, hold or sell at FL pricing.
            </p>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
              We advise a small number of private buyers and family offices on diamond acquisition strategy. Referral or introduction preferred, though direct enquiry is also welcomed.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── The Opportunity ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-5 md:space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}>The Arbitrage</motion.p>
            <motion.h2 variants={up} className="font-serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#02274A" }}>
              The IF → FL<br /><span style={{ color: "rgba(2,39,74,0.28)" }}>Opportunity.</span>
            </motion.h2>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
            <motion.p variants={up} className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.55)" }}>
              GIA-certified FL diamonds command a material premium over IF at commercial scale. The cost of conversion (regrind, GIA re-submission, and handling) is predictable and substantially below that premium in the majority of viable cases.
            </motion.p>
            <motion.p variants={up} className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.55)" }}>
              For a buyer who acquires IF at a market rate, commissions conversion, and receives back a FL-certified stone, the capital gain is structurally embedded in the process. GIA certification makes the outcome verifiable and the exit path straightforward.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
            {[
              { label: "Premium of FL over IF (1ct, D–F colour)", value: "15–35%" },
              { label: "Typical conversion cost as % of FL premium", value: "< 30%" },
              { label: "GIA certification: objective exit benchmark", value: "Yes" },
              { label: "Minimum engagement (AUD)", value: "$50,000" },
              { label: "Typical hold period", value: "12–36 months" },
            ].map((row) => (
              <motion.div key={row.label} variants={up} className="flex items-baseline justify-between gap-6 py-4 border-b" style={{ borderColor: "rgba(2,39,74,0.08)" }}>
                <span className="text-[11px] leading-snug" style={{ color: "rgba(2,39,74,0.4)" }}>{row.label}</span>
                <span className="text-sm shrink-0 tabular-nums" style={{ color: "#02274A" }}>{row.value}</span>
              </motion.div>
            ))}
            <p className="text-[9px] mt-3" style={{ color: "rgba(2,39,74,0.3)" }}>
              All figures are indicative and vary by stone parameters. Past performance does not guarantee future returns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Why Diamonds ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-xl space-y-4">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}>The Asset Case</motion.p>
            <motion.h2 variants={up} className="font-serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.88)" }}>
              Why FL diamonds<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>hold their value.</span>
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((p) => (
              <motion.div key={p.title} variants={up} className="p-7 md:p-8 space-y-4 border-t-2" style={{ background: "rgba(255,255,255,0.03)", borderTopColor: "#1CA9C9" }}>
                <h3 className="font-serif text-xl" style={{ color: "rgba(255,255,255,0.88)" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── IF→FL Process — GIA Clarity Scale ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-8 md:gap-12 pb-12 border-b" style={{ borderColor: "rgba(28,169,201,0.2)" }}
          >
            {[
              { label: "IF vs FL difference", value: "Surface blemish only" },
              { label: "Material removed", value: "< 0.01mm" },
              { label: "Qualification rate", value: "~15–20% of IF stones" },
              { label: "GIA re-certification", value: "Independent · Verifiable" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <p className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(28,169,201,0.7)" }}>{stat.label}</p>
                <p className="font-serif text-base" style={{ color: "#02274A" }}>{stat.value}</p>
              </div>
            ))}
          </motion.div>
          <div className="mt-12">
            <GIAClarityScale />
          </div>
        </div>
      </section>

      {/* ── IF→FL Horizontal Scroll Journey ── */}
      <IFtoFLHorizontalScroll />

      {/* ── Stories Gallery ── */}
      {/* <StoriesGallery /> */}

      {/* ── Before / After Results ── */}
      <section className="relative py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(28,169,201,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(28,169,201,0.02) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-7xl mx-auto space-y-12 md:space-y-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-8 md:gap-16 items-end">
            <div className="space-y-4">
              <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}>Documented Results</motion.p>
              <motion.h2 variants={up} className="font-serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.88)" }}>
                Before & after.<br /><span style={{ color: "rgba(255,255,255,0.25)" }}>Three stones, three outcomes.</span>
              </motion.h2>
              <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
            </div>
            <motion.p variants={up} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Each card shows the exact GIA Comments language from the IF certificate, the specific surface characteristic removed, and the verified FL outcome with its indicative value uplift. All stones were independently recertified by GIA with no pre-disclosure of the conversion.
            </motion.p>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {STONES.map((stone, i) => (
              <StoneCard key={stone.id} stone={stone} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-[10px] leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.2)" }}
          >
            All stone identifiers have been anonymised. Values are indicative and based on market references at time of transaction. Actual results vary by carat weight, colour, cut, and market conditions. Past outcomes do not guarantee future returns. GIA certification is conducted independently with no affiliation to FLXDIAMONDS.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "white" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-2xl mx-auto text-center space-y-6 md:space-y-8">
          <motion.h2 variants={up} className="font-serif leading-tight" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "#02274A" }}>
            Ready to explore<br /><span style={{ color: "rgba(2,39,74,0.3)" }}>diamond as an asset?</span>
          </motion.h2>
          <motion.p variants={up} className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.55)" }}>
            We work with a limited number of private buyers and family offices. All enquiries are handled directly and under strict commercial confidence.
          </motion.p>
          <motion.div variants={up} className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link href="/contact" data-testid="btn-investment-consultation">
              <button className="w-full sm:w-auto text-[10px] uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-80" style={{ background: "#1CA9C9", height: "50px", padding: "0 2.25rem", border: "none" }}>
                Begin a Conversation
              </button>
            </Link>
            <Link href="/faq" data-testid="btn-investment-faq">
              <button
                className="w-full sm:w-auto text-[10px] uppercase tracking-[0.3em] transition-all hover:border-[rgba(2,39,74,0.3)]"
                style={{ height: "50px", padding: "0 2.25rem", border: "1px solid rgba(2,39,74,0.15)", color: "rgba(2,39,74,0.55)", background: "transparent" }}
              >
                Common Questions
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}