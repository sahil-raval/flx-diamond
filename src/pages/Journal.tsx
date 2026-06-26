import { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


// ── Motion helpers ─────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as const;

// ── Minimal Link shim ──────────────────────────────────────────────────
function Link({ href, className, children, style, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} className={className} style={style} {...rest}>{children}</a>;
}

// ── Sanity shims ───────────────────────────────────────────────────────
const isSanityConfigured = false;
function useSanityQuery<T>(_keys: string[], _query: string) {
  return { data: null as T | null };
}
const JOURNAL_ARTICLES_QUERY = "";

interface SanityArticle {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  excerpt: string;
  featured: boolean;
}

function formatDate(d: string) {
  try { return new Date(d).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }); } catch { return d; }
}

const up = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const ARTICLES = [
  {
    id: 1,
    title: "Understanding GIA Certificate Comments",
    date: "March 15, 2026",
    category: "Expertise",
    excerpt: "The true value of a diamond often lies in what the certificate comments reveal. A deep dive into interpreting GIA dossiers for conversion potential and investment positioning.",
    featured: true,
  },
  {
    id: 2,
    title: "IF to FL: The Hidden Opportunity in Diamond Grading",
    date: "February 28, 2026",
    category: "Investment",
    excerpt: "How precise evaluation and masterful regrinding can elevate an Internally Flawless stone to Flawless, unlocking significant premiums without changing carat weight.",
    featured: false,
  },
  {
    id: 3,
    title: "Lab-Grown vs Natural: An Investment Perspective",
    date: "January 12, 2026",
    category: "Market Insights",
    excerpt: "Navigating the diverging markets of lab-grown and natural diamonds. Where true long-term value resides for serious buyers and institutional portfolios.",
    featured: false,
  },
  {
    id: 4,
    title: "The Evolution of Diamond Sourcing",
    date: "December 05, 2025",
    category: "Innovation",
    excerpt: "From traditional craftsmanship to modern precision: how expertise and evaluation rigour are reshaping how premium stones are sourced and assessed globally.",
    featured: false,
  },
];

// ══════════════════════════════════════════════════════════════════════
// JOURNAL PAGE
// ══════════════════════════════════════════════════════════════════════

export default function Journal() {
  const { data: sanityArticles } = useSanityQuery<SanityArticle[]>(["journal-articles"], JOURNAL_ARTICLES_QUERY);

  const articles = isSanityConfigured && sanityArticles && sanityArticles.length > 0
    ? sanityArticles.map((a, i) => ({
        id: i + 1, title: a.title, date: formatDate(a.publishedAt),
        category: a.category, excerpt: a.excerpt, featured: a.featured, slug: a.slug?.current,
      }))
    : ARTICLES;

  const [featured, ...rest] = articles;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 px-8 md:px-14 lg:px-20" style={{ background: "#02274A" }}>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-end">
          <div className="space-y-5 md:space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
              Knowledge &amp; Insight
            </motion.p>
            <motion.h1 variants={up} className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              Journal &amp;<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>Insights.</span>
            </motion.h1>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
          </div>
          <motion.p variants={up} className="text-white/40 text-sm md:text-base leading-relaxed md:pb-3">
            Perspectives on diamond grading, investment-grade stones, and the IF→FL conversion process,
            written for trade professionals who already understand the fundamentals.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Featured Article ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] uppercase tracking-[0.45em] mb-10 font-medium" style={{ color: "#1CA9C9" }}>
            Featured
          </motion.p>
          <motion.article
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: EASE }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center p-8 md:p-14"
            style={{ background: "white", border: "1px solid rgba(2,39,74,0.08)" }}
          >
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="text-[8px] uppercase tracking-[0.42em]" style={{ color: "#1CA9C9" }}>{featured.category}</span>
                <span className="w-6 h-px" style={{ background: "rgba(28,169,201,0.3)" }} />
                <span className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(2,39,74,0.3)" }}>{featured.date}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: "#02274A" }}>{featured.title}</h2>
              <span className="block w-8 h-px" style={{ background: "#1CA9C9" }} />
              <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>{featured.excerpt}</p>
              <Link href={`/journal/${featured.id}`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors hover:gap-3" style={{ color: "#1CA9C9" }}>
                Read Article <ArrowRight size={11} />
              </Link>
            </div>
            <div className="aspect-[4/3] hidden lg:block" style={{ background: "linear-gradient(135deg, #02274A 0%, #04385E 100%)", position: "relative", overflow: "hidden" }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <span className="font-serif" style={{ fontSize: "14rem", color: "white", letterSpacing: "-0.04em", lineHeight: 1 }}>01</span>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-[9px] uppercase tracking-[0.4em] mb-1" style={{ color: "rgba(28,169,201,0.6)" }}>GIA Documentation</p>
                <p className="text-white/20 text-xs">Certificate interpretation for professionals</p>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── Diamond Journey ── */}
      

      {/* ── Article List ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] uppercase tracking-[0.45em] mb-10 font-medium" style={{ color: "#1CA9C9" }}>
            All Articles
          </motion.p>
          <div className="divide-y" style={{ borderTop: "1px solid rgba(2,39,74,0.07)", borderColor: "rgba(2,39,74,0.07)" }}>
            {rest.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="py-10 grid md:grid-cols-[180px_1fr_auto] gap-6 md:gap-12 items-start group"
              >
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-[0.42em] font-medium" style={{ color: "#1CA9C9" }}>{article.category}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(2,39,74,0.3)" }}>{article.date}</p>
                </div>
                <div className="space-y-3">
                  <h2 className="font-serif text-xl md:text-2xl leading-snug group-hover:text-[#1CA9C9] transition-colors" style={{ color: "#02274A" }}>
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.45)" }}>{article.excerpt}</p>
                </div>
                <div className="flex items-start pt-1">
                  <Link href={`/journal/${article.id}`} className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] shrink-0 group-hover:gap-3 transition-all" style={{ color: "rgba(2,39,74,0.3)" }}>
                    Read <ArrowRight size={10} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="py-16 px-6" style={{ background: "#02274A", borderTop: "1px solid rgba(28,169,201,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.45em] mb-2" style={{ color: "#1CA9C9" }}>Trade Enquiries</p>
            <p className="font-serif text-2xl text-white">Ready to discuss your stones?</p>
          </div>
          <Link href="/contact">
            <button className="text-[10px] uppercase tracking-[0.3em] text-white transition-all hover:opacity-80" style={{ background: "#1CA9C9", height: "50px", padding: "0 2.5rem", border: "none" }}>
              Begin the Conversation →
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}