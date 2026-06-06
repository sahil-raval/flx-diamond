import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useSanityQuery } from "@/lib/useSanityData";
import { isSanityConfigured } from "@/lib/sanity";
import { ABOUT_PAGE_QUERY } from "@/lib/sanity-queries";
import { useState, useEffect } from "react";

const up = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
};

const PARTNERSHIPS = [
  {
    name: "KGK Diamond",
    role: "Sourcing & Conversion Partner",
    detail: "Supplied precision-cut FL diamonds and specialised regrinding services across multiple production seasons.",
  },
  {
    name: "Venus Jewellery",
    role: "Technical Evaluation Partner",
    detail: "Provided expert stone assessment and IF→FL conversion for high-value finished jewellery projects.",
  },
  {
    name: "Excell Overseas",
    role: "Long-term Trade Partner",
    detail: "Ongoing supply relationship spanning loose FL diamonds and GIA-verified conversion parcels.",
  },
];
const TESTIMONIALS = [
  {
    quote: "Unlocked significant value from a 2.4ct IF stone we'd held for two years. The GIA FL certificate came back within the same carat bracket. Remarkable.",
    role: "Senior Diamond Buyer",
    location: "Dubai",
  },
  {
    quote: "We've used FLXDIAMONDS for white-label sourcing across three collections. Their discretion is absolute. Our clients never know the source, and the quality speaks for itself.",
    role: "Head of Procurement",
    location: "Mumbai",
  },
  {
    quote: "The assessment was free, the process was explained clearly, and the result exceeded expectations. For anyone holding IF stones, the conversation costs nothing.",
    role: "Private Investor",
    location: "Singapore",
  },
  {
    quote: "What impressed us most was the transparency — a clear yes or no on viability, no sales pressure, and a result that genuinely moved the value of our inventory.",
    role: "Jewellery Retailer",
    location: "Melbourne",
  },
];
function TestimonialSlider() {
  const [idx, setIdx]       = useState(0);
  const [dir, setDir]       = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 5000;

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const step = 50;
    const inc  = (step / INTERVAL) * 100;
    const prog = setInterval(() => setProgress(p => Math.min(p + inc, 100)), step);
    const adv  = setTimeout(() => {
      setDir(1);
      setIdx(i => (i + 1) % TESTIMONIALS.length);
    }, INTERVAL);
    return () => { clearInterval(prog); clearTimeout(adv); };
  }, [idx, paused]);

  const goTo = (n: number) => {
    setDir(n > idx ? 1 : -1);
    setProgress(0);
    setIdx(n);
  };
  const prev = () => goTo((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((idx + 1) % TESTIMONIALS.length);

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  const t = TESTIMONIALS[idx];

  return (
    <div
      className="relative mx-auto"
      style={{ maxWidth: "860px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative px-6 sm:px-10 md:px-20 py-10 md:py-16"
        style={{
          background: "white",
          border: "1px solid rgba(28,169,201,0.18)",
          boxShadow: "0 8px 48px rgba(2,39,74,0.07)",
        }}
      >
        <span
          className="absolute top-6 left-6 sm:top-8 sm:left-8 md:left-12 font-serif select-none pointer-events-none"
          style={{ color: "#1CA9C9", fontSize: "4rem", lineHeight: 1, opacity: 0.12 }}
        >
          &ldquo;
        </span>
        <div className="overflow-hidden" style={{ minHeight: "180px" }}>
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={idx}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col items-center text-center gap-6 sm:gap-7"
            >
              {/* Quote */}
              <p
                className="font-playfair text-base sm:text-lg md:text-xl font-light italic leading-relaxed"
                style={{ color: "#02274A", maxWidth: "640px" }}
              >
                {t.quote}
              </p>

              {/* Attribution */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-8 h-px mb-2"
                  style={{ background: "linear-gradient(90deg, transparent, #1CA9C9, transparent)" }}
                />
                <p
                  className="text-[11px] uppercase tracking-[0.35em] font-medium"
                  style={{ color: "rgba(2,39,74,0.5)" }}
                >
                  {t.role}
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "#1CA9C9" }}
                >
                  {t.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
          style={{ background: "rgba(2,39,74,0.06)" }}
        >
          <motion.div
            className="h-full"
            style={{ background: "#1CA9C9" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0 }}
          />
        </div>
      </div>

      {/* Prev arrow — outside card left */}
      <button
        onClick={prev}
        aria-label="Previous testimonial"
        className="absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center transition-all group"
        style={{
          left: "-64px",
          width: "44px",
          height: "44px",
          border: "1px solid rgba(28,169,201,0.35)",
          background: "white",
          color: "#1CA9C9",
          boxShadow: "0 2px 12px rgba(2,39,74,0.08)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "#1CA9C9";
          (e.currentTarget as HTMLButtonElement).style.color = "white";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "white";
          (e.currentTarget as HTMLButtonElement).style.color = "#1CA9C9";
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next arrow — outside card right */}
      <button
        onClick={next}
        aria-label="Next testimonial"
        className="absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center transition-all"
        style={{
          right: "-64px",
          width: "44px",
          height: "44px",
          border: "1px solid rgba(28,169,201,0.35)",
          background: "white",
          color: "#1CA9C9",
          boxShadow: "0 2px 12px rgba(2,39,74,0.08)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "#1CA9C9";
          (e.currentTarget as HTMLButtonElement).style.color = "white";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "white";
          (e.currentTarget as HTMLButtonElement).style.color = "#1CA9C9";
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Mobile prev/next row */}
      <div className="flex md:hidden justify-center gap-3 mt-5">
        <button
          onClick={prev}
          aria-label="Previous"
          className="flex items-center justify-center"
          style={{
            width: "40px", height: "40px",
            border: "1px solid rgba(28,169,201,0.4)",
            background: "white", color: "#1CA9C9",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="flex items-center justify-center"
          style={{
            width: "40px", height: "40px",
            border: "1px solid rgba(28,169,201,0.4)",
            background: "white", color: "#1CA9C9",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot nav */}
      <div className="flex justify-center gap-2 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className="transition-all"
            style={{
              width: i === idx ? "28px" : "7px",
              height: "7px",
              background: i === idx ? "#1CA9C9" : "rgba(2,39,74,0.15)",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const PILLARS = [
  {
    label: "Technical Depth",
    body: "We do not grade by eye alone. Each stone is assessed against its GIA report with full understanding of what the inclusions are, where they sit, and whether removal is viable without carat loss beyond threshold.",
  },
  {
    label: "Commercial Discretion",
    body: "Every enquiry is handled under strict commercial confidence. We do not discuss client relationships publicly, and we expect the same standard from the partners we choose to work with.",
  },
  {
    label: "Geelong, Australia",
    body: "Operating from Geelong, Victoria, we serve trade partners globally while maintaining the time-zone availability and regulatory environment of a mature, stable business jurisdiction.",
  },
];

interface SanityAboutPage {
  partnerships?: { name: string; role: string; detail: string }[];
  pillars?: { label: string; body: string }[];
  heroTagline?: string;
  heroHeading?: string;
  heroSubtext?: string;
  craftsman?: { name: string; beganCutting: string; yearsMastery: string; primaryCraft: string; basedIn: string; biography?: string[] };
  techniqueSteps?: { step: string; title: string; body: string }[];
  ctaHeading?: string;
  ctaBody?: string;
}

export default function About() {
  const { data: sanityAbout } = useSanityQuery<SanityAboutPage>(["about-page"], ABOUT_PAGE_QUERY);

  const partnerships = isSanityConfigured && sanityAbout?.partnerships?.length
    ? sanityAbout.partnerships
    : PARTNERSHIPS;

  const pillars = isSanityConfigured && sanityAbout?.pillars?.length
    ? sanityAbout.pillars
    : PILLARS;

  return (
    <div className="" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 px-8 md:px-14 lg:px-20" style={{ background: "#02274A" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid md:grid-cols-2 gap-10 md:gap-20 items-center"
        >
          <div className="space-y-5 md:space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
              Our Story
            </motion.p>
            <motion.h1 variants={up} className="font-serif leading-[1.05]" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "rgba(255,255,255,0.92)" }}>
              Heritage.<br />Mastery.<br />
              <span style={{ color: "rgba(255,255,255,0.22)" }}>Quiet Confidence.</span>
            </motion.h1>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
          </div>
          <motion.p variants={up} className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
            FLX Diamonds was built around one craftsman's 47 years of accumulated knowledge,
            knowledge that cannot be certified, cannot be replicated, and cannot be rushed.
          </motion.p>
        </motion.div>
      </section>

      {/* ── The Origin ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 md:gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="lg:col-span-1 space-y-6"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
              The Craftsman
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl text-[#02274A] leading-tight">
              Babu Vekariya
            </motion.h2>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
            <motion.div variants={up} className="space-y-0">
              {[
                { label: "Began cutting",    value: "1978, Age 12" },
                { label: "Years mastery",    value: "47 Years" },
                { label: "Primary craft",    value: "IF → FL Conversion" },
                { label: "Based in",         value: "Geelong, VIC" },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-baseline border-b py-3" style={{ borderColor: "#02274A10" }}>
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(2,39,74,0.35)" }}>{s.label}</span>
                  <span className="text-sm text-[#02274A]">{s.value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="lg:col-span-2 space-y-6 lg:pt-16"
          >
            <motion.p variants={up} className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>
              Babu began cutting diamonds in 1978, aged 12, apprenticed to craftsmen in the diamond ateliers
              of Surat. The work in those ateliers was exacting: every error came out of the stone's value,
              which meant every error came out of his reputation.
            </motion.p>
            <motion.p variants={up} className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>
              By his late 20s he had developed what most craftsmen in the industry never acquire: the ability to read
              a GIA report not as a grade, but as a map. He could identify which surface inclusions were
              responsible for holding a stone at IF grade, and could determine, often by examination alone,
              whether those characteristics sat within reach of a micro-regrind.
            </motion.p>
            <motion.p variants={up} className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>
              The IF→FL conversion is not taught formally. It is developed over a career of failed attempts,
              successful recoveries, and accumulated judgment. Of the craftsmen who attempt it with regularity,
              only a handful can execute consistently at commercial scale without meaningful carat loss.
              Babu is among them.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── The Technique ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start"
          >
            <div className="space-y-6">
              <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
                The Technique
              </motion.p>
              <motion.h2 variants={up} className="font-serif text-4xl text-white leading-tight">
                What the conversion<br />
                <span style={{ color: "rgba(255,255,255,0.3)" }}>actually requires.</span>
              </motion.h2>
              <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
              <motion.p variants={up} className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                GIA grades Internally Flawless (IF) stones based on the absence of internal inclusions,
                but allows for minor surface blemishes such as naturals, extra facets, or surface graining.
                FL grade requires that neither internal nor external characteristics are present under
                10× magnification by a trained grader.
              </motion.p>
              <motion.p variants={up} className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                When the only barrier to FL is a surface-level characteristic, a precision micro-regrind
                of the affected facet can eliminate it entirely. The operation is measured in hundredths
                of a millimetre, typically under 0.01mm of material removal. Executed correctly,
                carat weight is preserved within GIA rounding thresholds and the stone re-grades as FL.
              </motion.p>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 lg:pt-16"
            >
              {[
                { step: "01", title: "Certificate Assessment", body: "The GIA report is read as a technical document, not a grade. Inclusion type, facet location, and depth are mapped against the stone." },
                { step: "02", title: "Physical Examination", body: "The stone is examined under 10× loupe and microscopy. The surface characteristic is identified, measured, and assessed for removability." },
                { step: "03", title: "Micro-Regrind", body: "A precision regrind of the affected facet removes the characteristic within sub-0.01mm tolerance. Polish is restored to GIA standard." },
                { step: "04", title: "GIA Re-submission", body: "The stone is submitted to GIA for re-grading. A new FL certificate is issued. The conversion is documented and verifiable." },
              ].map((s) => (
                <motion.div key={s.step} variants={up} className="flex gap-6 items-start p-5 border" style={{ borderColor: "rgba(28,169,201,0.12)", background: "rgba(28,169,201,0.04)" }}>
                  <span className="text-xl shrink-0 font-medium tabular-nums" style={{ color: "rgba(28,169,201,0.4)" }}>{s.step}</span>
                  <div>
                    <p className="text-white text-sm font-medium tracking-wide mb-1">{s.title}</p>
                    <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Notable Partnerships ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl space-y-5"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
              Notable Relationships
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl text-[#02274A] leading-tight">
              Trusted by names that<br />
              <span style={{ color: "rgba(2,39,74,0.3)" }}>hold their own standard.</span>
            </motion.h2>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
            <motion.p variants={up} className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(2,39,74,0.45)" }}>
              Over four decades, Babu's craft earned the trust of established names in the diamond and
              jewellery trade. These are relationships built on consistent output, not on contracts alone.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-8"
          >
            {partnerships.map((p) => (
              <motion.div
                key={p.name}
                variants={up}
                className="p-8 space-y-4 border-t-2"
                style={{ background: "white", borderTopColor: "#1CA9C9" }}
              >
                <h3 className="font-serif text-xl text-[#02274A]">{p.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "#1CA9C9" }}>
                  {p.role}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>{p.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── What We Stand For ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center space-y-4 max-w-xl mx-auto"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
              Our Position
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl text-white leading-tight">
              How we operate.
            </motion.h2>
          </motion.div>



          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-10"
          >
            {pillars.map((p) => (
              <motion.div key={p.label} variants={up} className="space-y-4 pt-6 border-t" style={{ borderColor: "rgba(28,169,201,0.2)" }}>
                <h3 className="font-serif text-xl text-white">{p.label}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="mb-10 sm:mb-14 text-center">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
              From Our Partners
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-3xl sm:text-4xl md:text-5xl" style={{ color: "#02274A" }}>
              What the trade says.
            </motion.h2>
          </motion.div>
          <div className="px-0 md:px-16">
            <TestimonialSlider />
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-center mt-8 sm:mt-10 text-[9px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(2,39,74,0.35)" }}
          >
            All testimonials are anonymised by request. Full references available to verified trade partners.
          </motion.p>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-20 md:py-28 px-6 text-center" style={{ background: "#F4F8FC" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.h2 variants={up} className="font-serif text-4xl text-[#02274A] leading-tight">
            Ready to begin a<br />
            <span style={{ color: "rgba(2,39,74,0.35)" }}>serious conversation?</span>
          </motion.h2>
          <motion.p variants={up} className="text-base" style={{ color: "rgba(2,39,74,0.45)" }}>
            All enquiries are handled directly and under strict commercial confidence.
          </motion.p>
          <motion.div variants={up} className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <Button
                className="rounded-none text-[10px] uppercase tracking-[0.25em] text-white hover:opacity-90"
                style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem" }}
                data-testid="btn-about-contact"
              >
                Begin the Conversation
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                variant="outline"
                className="rounded-none text-[10px] uppercase tracking-[0.25em] text-[#02274A] hover:bg-[#02274A] hover:text-white transition-colors"
                style={{ borderColor: "#02274A", height: "48px", padding: "0 2rem" }}
                data-testid="btn-about-faq"
              >
                Read FAQ
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
