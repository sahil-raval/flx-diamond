import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useSanityQuery } from "@/lib/useSanityData";
import { isSanityConfigured } from "@/lib/sanity";
import { HOME_PAGE_QUERY } from "@/lib/sanity-queries";
import { EASE } from "@/lib/motion";
import { Marquee, ScrollReveal, StaggerGroup, StaggerItem, LineMask, ParallaxLayer } from "@/lib/scroll";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiamondCard } from "@/components/DiamondCard";
import { Volume2, VolumeX, ArrowRight, CheckCircle2, ChevronDown, Award, Shield, Sliders, Cpu, Scale, Palette, Eye, Gem } from "lucide-react";

/* ── Word-by-word reveal (luxury heading technique) ──── */
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "span";
  style?: React.CSSProperties;
}
function WordReveal({ text, className = "", delay = 0, as: Tag = "span", style }: WordRevealProps) {
  const words = text.split(" ");
  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} className="word-mask" style={{ marginRight: "0.28em" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1], delay: delay + i * 0.07 }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Viewport word reveal (for scroll-triggered headings) */
function ViewportWordReveal({ text, className = "", delay = 0, as: Tag = "h2", style }: WordRevealProps) {
  const ref  = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-80px" });
  const words = text.split(" ");
  return (
    <Tag ref={ref as any} className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} className="word-mask" style={{ marginRight: "0.28em" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: delay + i * 0.065 }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Magnetic button wrapper ──────────────────────── */
function MagneticBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const sx  = useSpring(mx, { stiffness: 300, damping: 18 });
  const sy  = useSpring(my, { stiffness: 300, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width  / 2)) * 0.22);
    my.set((e.clientY - (r.top  + r.height / 2)) * 0.22);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy, display: "inline-block" }}>
      {children}
    </motion.div>
  );
}

/* ── FAQ section ────────────────────────────────────── */
const FAQS = [
  {
    q: "Do you work with lab-grown diamonds?",
    a: "Yes. We supply both natural and lab-grown diamonds (CVD and HPHT) at competitive trade pricing. Lab-grown stones go through the same GIA grading process and are presented with full certification."
  },
  {
    q: "Is the IF→FL conversion process confidential?",
    a: "Absolutely. Every engagement is treated as commercially confidential by default. We do not disclose client details, stone specifications, or transaction structures to any third party. NDAs are available on request."
  },
  {
    q: "What carat sizes can you work with?",
    a: "We work primarily with stones from 0.50ct upward for IF→FL conversion. For diamond sourcing, we supply from 0.30ct melee through 10ct+ exceptional stones. Custom briefs welcome."
  },
  {
    q: "How long does the IF→FL conversion take?",
    a: "The free assessment typically takes 2–3 business days after receipt of the GIA certificate number. If the stone qualifies, the regrinding process itself takes 1–3 weeks depending on the stone's characteristics. A new GIA certificate is then issued, which takes an additional 2–4 weeks."
  },
  {
    q: "Do you work with retailers and jewellers directly?",
    a: "Yes, we operate as the quiet specialist behind serious businesses. We offer white-label sourcing and IF→FL conversion for retailers and jewellers who present our work under their own brand. Discretion is guaranteed."
  },
];

function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 px-4 sm:px-6" style={{ background: "#02274A" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
          className="mb-12"
        >
          <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
            Before You Reach Out
          </motion.p>
          <motion.h2 variants={up} className="font-serif text-3xl sm:text-4xl md:text-5xl" style={{ color: "rgba(255,255,255,0.88)" }}>
            Common questions.
          </motion.h2>
        </motion.div>

        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <button
                className="w-full text-left py-5 sm:py-6 flex items-start justify-between gap-4 sm:gap-6 group"
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`faq-${i}`}
              >
                <span className="font-serif text-base sm:text-lg leading-snug group-hover:text-[#1CA9C9] transition-colors" style={{ color: "rgba(255,255,255,0.82)" }}>
                  {faq.q}
                </span>
                <span
                  className="shrink-0 mt-1 text-[#1CA9C9] transition-transform"
                  style={{ transform: open === i ? "rotate(45deg)" : "none" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden text-sm leading-relaxed pb-6"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Link href="/contact" className="block w-full sm:inline-block sm:w-auto">
            <Button
              className="rounded-none text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-medium text-white hover:opacity-90 w-full sm:w-auto"
              style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem" }}
              data-testid="faq-cta"
            >
              Still have questions? Get in touch →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Motion presets ─────────────────────────────────── */


import {   type Variants } from "framer-motion";

const up: Variants = {
  hidden:  { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } }
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } }
};

/* ── Wave particles config ──────────────────────────── */
const PARTICLES = [
  { left: "6%",  bottom: "18%", delay: "0s",   dur: "8s",  size: 3 },
  { left: "14%", bottom: "12%", delay: "1.8s", dur: "10s", size: 2 },
  { left: "28%", bottom: "20%", delay: "0.6s", dur: "7s",  size: 2 },
  { left: "42%", bottom: "10%", delay: "2.4s", dur: "9s",  size: 3 },
  { left: "58%", bottom: "16%", delay: "1.1s", dur: "6.5s",size: 2 },
  { left: "71%", bottom: "22%", delay: "3.2s", dur: "8.5s",size: 2 },
  { left: "84%", bottom: "14%", delay: "0.3s", dur: "7.5s",size: 3 },
  { left: "93%", bottom: "18%", delay: "1.7s", dur: "9.5s",size: 2 },
];

/* ── Buyer qualifier data ───────────────────────────── */
const BUYER_TYPES = [
  {
    id: "upgrade",
    num: "01",
    headline: "I hold IF diamonds I want to upgrade",
    subtext: "Your GIA certificate may reveal a path to Flawless grade, same carat weight, measurable value uplift.",
    answer: {
      title: "Yes, this is precisely what we do.",
      points: [
        "Send us your GIA certificate number. We read the comments for surface-characteristic indicators.",
        "If the stone qualifies, our master craftsman precision-regrounds in micro-millimeters.",
        "The stone is resubmitted to GIA. FL grade achieved. Same carat weight bracket documented.",
        "Most partners see measurable value uplift without changing their inventory volume."
      ],
      cta: "Discuss Your Stones",
      href: "/contact"
    }
  },
  {
    id: "supply",
    num: "02",
    headline: "I need a reliable diamond supplier",
    subtext: "Natural and lab-grown, GIA certified, trade pricing. No retail. Sourced through 47 years of trusted relationships.",
    answer: {
      title: "We supply serious trade buyers, not retail.",
      points: [
        "Natural diamonds: D–K colour, VVS1–SI2 clarity, 0.30ct to 10ct+.",
        "Lab-grown: high-precision CVD and HPHT at competitive trade pricing.",
        "Pricing on application. No public catalogue, by design.",
        "47 years of relationships with cutters in Antwerp, Mumbai, and Surat."
      ],
      cta: "Request Trade Access",
      href: "/trade"
    }
  },
  {
    id: "invest",
    num: "03",
    headline: "I want investment-grade diamonds",
    subtext: "FL and IF clarity with complete GIA documentation. The IF→FL conversion creates a documented, verifiable uplift.",
    answer: {
      title: "Diamonds are tangible, portable, stateless assets.",
      points: [
        "FL and IF in D–F colour represent the top 1% of all GIA-graded stones globally.",
        "The IF→FL conversion creates a new GIA certificate with documented uplift.",
        "We advise on stone selection, market timing, and re-sale pathways.",
        "All stones carry full GIA certification, the global standard."
      ],
      cta: "Explore Investment Stones",
      href: "/investment"
    }
  },
  {
    id: "partner",
    num: "04",
    headline: "I want a B2B partnership",
    subtext: "We operate as the quiet expert behind serious businesses, offering white-label sourcing with guaranteed discretion.",
    answer: {
      title: "We are the specialist behind your sourcing.",
      points: [
        "White-label sourcing: we find and verify, you present to your clients.",
        "IF→FL conversion offered on your client's existing stones.",
        "Trusted by KGK Diamond, Venus Jewellery, and Excell Overseas.",
        "All agreements under NDA by default. Discretion is not negotiable."
      ],
      cta: "Discuss a Partnership",
      href: "/contact"
    }
  }
];

/* ── Web Audio API ocean sound generator ────────────────
   Peaceful ambient ocean using pink noise (Paul Kellet approximation).
   Pink noise has a natural 1/f spectrum — far softer than white noise.
   Three layers: deep swell + mid wash + gentle shimmer.
   No harsh high-frequency content. Slow LFOs for a breathing rhythm.
──────────────────────────────────────────────────────── */
function buildOceanSound(ctx: AudioContext): () => void {
  const SR = ctx.sampleRate;

  // Pink noise via Paul Kellet's algorithm — much softer than white noise
  const makePinkNoise = (seconds = 9) => {
    const len = seconds * SR;
    const buf = ctx.createBuffer(1, len, SR);
    const d   = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop   = true;
    return src;
  };

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(ctx.destination);

  // ── Layer 1: deep ocean swell — pink noise → soft lowpass 160 Hz ──
  const n1  = makePinkNoise(10);
  const lp1 = ctx.createBiquadFilter();
  lp1.type = "lowpass"; lp1.frequency.value = 160; lp1.Q.value = 0.5;
  const g1  = ctx.createGain(); g1.gain.value = 0.80;
  n1.connect(lp1); lp1.connect(g1); g1.connect(masterGain);
  // LFO: very slow swell — one full breath every ~22 s (0.045 Hz)
  const lfo1 = ctx.createOscillator();
  lfo1.type = "sine"; lfo1.frequency.value = 0.045;
  const lfoG1 = ctx.createGain(); lfoG1.gain.value = 0.32;
  lfo1.connect(lfoG1); lfoG1.connect(g1.gain);

  // ── Layer 2: mid wash — pink noise → soft lowpass 400 Hz ──────────
  const n2  = makePinkNoise(7);
  const lp2 = ctx.createBiquadFilter();
  lp2.type = "lowpass"; lp2.frequency.value = 400; lp2.Q.value = 0.6;
  const g2  = ctx.createGain(); g2.gain.value = 0.20;
  n2.connect(lp2); lp2.connect(g2); g2.connect(masterGain);
  // LFO: ~14 s cycle (0.072 Hz), slightly offset from layer 1
  const lfo2 = ctx.createOscillator();
  lfo2.type = "sine"; lfo2.frequency.value = 0.072;
  const lfoG2 = ctx.createGain(); lfoG2.gain.value = 0.13;
  lfo2.connect(lfoG2); lfoG2.connect(g2.gain);

  // ── Layer 3: gentle shimmer — pink noise → narrow bandpass 600 Hz ──
  const n3  = makePinkNoise(5);
  const bp3 = ctx.createBiquadFilter();
  bp3.type = "bandpass"; bp3.frequency.value = 600; bp3.Q.value = 1.4;
  const g3  = ctx.createGain(); g3.gain.value = 0.055;
  n3.connect(bp3); bp3.connect(g3); g3.connect(masterGain);
  // LFO: ~10 s cycle (0.10 Hz)
  const lfo3 = ctx.createOscillator();
  lfo3.type = "sine"; lfo3.frequency.value = 0.10;
  const lfoG3 = ctx.createGain(); lfoG3.gain.value = 0.04;
  lfo3.connect(lfoG3); lfoG3.connect(g3.gain);

  // Start all nodes
  [n1, n2, n3, lfo1, lfo2, lfo3].forEach(n => n.start());

  // Fade in gently over 5 seconds
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.26, ctx.currentTime + 5);

  return () => {
    masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
    setTimeout(() => [n1, n2, n3, lfo1, lfo2, lfo3].forEach(n => { try { n.stop(); } catch {} }), 2700);
  };
}

/* ── Testimonials data ──────────────────────────────── */
// const TESTIMONIALS = [
//   {
//     quote: "Unlocked significant value from a 2.4ct IF stone we'd held for two years. The GIA FL certificate came back within the same carat bracket. Remarkable.",
//     role: "Senior Diamond Buyer",
//     location: "Dubai",
//   },
//   {
//     quote: "We've used FLXDIAMONDS for white-label sourcing across three collections. Their discretion is absolute. Our clients never know the source, and the quality speaks for itself.",
//     role: "Head of Procurement",
//     location: "Mumbai",
//   },
//   {
//     quote: "The assessment was free, the process was explained clearly, and the result exceeded expectations. For anyone holding IF stones, the conversation costs nothing.",
//     role: "Private Investor",
//     location: "Singapore",
//   },
//   {
//     quote: "What impressed us most was the transparency — a clear yes or no on viability, no sales pressure, and a result that genuinely moved the value of our inventory.",
//     role: "Jewellery Retailer",
//     location: "Melbourne",
//   },
// ];
// function TestimonialSlider() {
//   const [idx, setIdx]       = useState(0);
//   const [dir, setDir]       = useState(1);
//   const [paused, setPaused] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const INTERVAL = 5000;

//   useEffect(() => {
//     if (paused) return;
//     setProgress(0);
//     const step = 50;
//     const inc  = (step / INTERVAL) * 100;
//     const prog = setInterval(() => setProgress(p => Math.min(p + inc, 100)), step);
//     const adv  = setTimeout(() => {
//       setDir(1);
//       setIdx(i => (i + 1) % TESTIMONIALS.length);
//     }, INTERVAL);
//     return () => { clearInterval(prog); clearTimeout(adv); };
//   }, [idx, paused]);

//   const goTo = (n: number) => {
//     setDir(n > idx ? 1 : -1);
//     setProgress(0);
//     setIdx(n);
//   };
//   const prev = () => goTo((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
//   const next = () => goTo((idx + 1) % TESTIMONIALS.length);

//   const variants = {
//     enter:  (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
//     center: { x: 0, opacity: 1 },
//     exit:   (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
//   };

//   const t = TESTIMONIALS[idx];

//   return (
//     <div
//       className="relative mx-auto"
//       style={{ maxWidth: "860px" }}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <div
//         className="relative px-6 sm:px-10 md:px-20 py-10 md:py-16"
//         style={{
//           background: "white",
//           border: "1px solid rgba(28,169,201,0.18)",
//           boxShadow: "0 8px 48px rgba(2,39,74,0.07)",
//         }}
//       >
//         <span
//           className="absolute top-6 left-6 sm:top-8 sm:left-8 md:left-12 font-serif select-none pointer-events-none"
//           style={{ color: "#1CA9C9", fontSize: "4rem", lineHeight: 1, opacity: 0.12 }}
//         >
//           &ldquo;
//         </span>
//         <div className="overflow-hidden" style={{ minHeight: "180px" }}>
//           <AnimatePresence custom={dir} mode="wait">
//             <motion.div
//               key={idx}
//               custom={dir}
//               variants={variants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
//               className="flex flex-col items-center text-center gap-6 sm:gap-7"
//             >
//               {/* Quote */}
//               <p
//                 className="font-playfair text-base sm:text-lg md:text-xl font-light italic leading-relaxed"
//                 style={{ color: "#02274A", maxWidth: "640px" }}
//               >
//                 {t.quote}
//               </p>

//               {/* Attribution */}
//               <div className="flex flex-col items-center gap-1.5">
//                 <div
//                   className="w-8 h-px mb-2"
//                   style={{ background: "linear-gradient(90deg, transparent, #1CA9C9, transparent)" }}
//                 />
//                 <p
//                   className="text-[11px] uppercase tracking-[0.35em] font-medium"
//                   style={{ color: "rgba(2,39,74,0.5)" }}
//                 >
//                   {t.role}
//                 </p>
//                 <p
//                   className="text-[10px] uppercase tracking-[0.3em]"
//                   style={{ color: "#1CA9C9" }}
//                 >
//                   {t.location}
//                 </p>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Progress bar — inside card, bottom edge */}
//         <div
//           className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
//           style={{ background: "rgba(2,39,74,0.06)" }}
//         >
//           <motion.div
//             className="h-full"
//             style={{ background: "#1CA9C9" }}
//             animate={{ width: `${progress}%` }}
//             transition={{ duration: 0 }}
//           />
//         </div>
//       </div>

//       {/* Prev arrow — outside card left */}
//       <button
//         onClick={prev}
//         aria-label="Previous testimonial"
//         className="absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center transition-all group"
//         style={{
//           left: "-64px",
//           width: "44px",
//           height: "44px",
//           border: "1px solid rgba(28,169,201,0.35)",
//           background: "white",
//           color: "#1CA9C9",
//           boxShadow: "0 2px 12px rgba(2,39,74,0.08)",
//         }}
//         onMouseEnter={e => {
//           (e.currentTarget as HTMLButtonElement).style.background = "#1CA9C9";
//           (e.currentTarget as HTMLButtonElement).style.color = "white";
//         }}
//         onMouseLeave={e => {
//           (e.currentTarget as HTMLButtonElement).style.background = "white";
//           (e.currentTarget as HTMLButtonElement).style.color = "#1CA9C9";
//         }}
//       >
//         <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//           <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       </button>

//       {/* Next arrow — outside card right */}
//       <button
//         onClick={next}
//         aria-label="Next testimonial"
//         className="absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center transition-all"
//         style={{
//           right: "-64px",
//           width: "44px",
//           height: "44px",
//           border: "1px solid rgba(28,169,201,0.35)",
//           background: "white",
//           color: "#1CA9C9",
//           boxShadow: "0 2px 12px rgba(2,39,74,0.08)",
//         }}
//         onMouseEnter={e => {
//           (e.currentTarget as HTMLButtonElement).style.background = "#1CA9C9";
//           (e.currentTarget as HTMLButtonElement).style.color = "white";
//         }}
//         onMouseLeave={e => {
//           (e.currentTarget as HTMLButtonElement).style.background = "white";
//           (e.currentTarget as HTMLButtonElement).style.color = "#1CA9C9";
//         }}
//       >
//         <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//           <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       </button>

//       {/* Mobile prev/next row */}
//       <div className="flex md:hidden justify-center gap-3 mt-5">
//         <button
//           onClick={prev}
//           aria-label="Previous"
//           className="flex items-center justify-center"
//           style={{
//             width: "40px", height: "40px",
//             border: "1px solid rgba(28,169,201,0.4)",
//             background: "white", color: "#1CA9C9",
//           }}
//         >
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//             <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//         <button
//           onClick={next}
//           aria-label="Next"
//           className="flex items-center justify-center"
//           style={{
//             width: "40px", height: "40px",
//             border: "1px solid rgba(28,169,201,0.4)",
//             background: "white", color: "#1CA9C9",
//           }}
//         >
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//             <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//       </div>

//       {/* Dot nav */}
//       <div className="flex justify-center gap-2 mt-6">
//         {TESTIMONIALS.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => goTo(i)}
//             aria-label={`Go to testimonial ${i + 1}`}
//             className="transition-all"
//             style={{
//               width: i === idx ? "28px" : "7px",
//               height: "7px",
//               background: i === idx ? "#1CA9C9" : "rgba(2,39,74,0.15)",
//               borderRadius: "4px",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
interface SanityHomePage {
  heroHeading?: string;
  heroSubtext?: string;
  heroCta?: string;
  heroSecondaryCta?: string;
  marqueeItems?: string[];
  faqs?: { q: string; a: string }[];
  ctaSectionHeading?: string;
  ctaSectionBody?: string;
}

export default function Home() {
  const { data: sanityHome } = useSanityQuery<SanityHomePage>(["home-page"], HOME_PAGE_QUERY);

  const activeFaqs = isSanityConfigured && sanityHome?.faqs?.length
    ? sanityHome.faqs
    : FAQS;

  const marqueeItems = isSanityConfigured && sanityHome?.marqueeItems?.length
    ? sanityHome.marqueeItems
    : [
        "GIA Certified", "IF → FL Conversion", "Natural & Lab Grown", "Trade Only",
        "47 Years Mastery", "Geelong, Australia", "Discreet & Confidential", "Precision Regrinding",
      ];

  const [isMuted, setIsMuted]   = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const videoRef  = useRef<HTMLVideoElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);
  const ctxRef    = useRef<AudioContext | null>(null);
  const stopRef   = useRef<(() => void) | null>(null);

  /* Start ocean sound on first user gesture */
  useEffect(() => {
    let started = false;
    const tryStart = () => {
      if (started) return;
      started = true;
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        ctxRef.current = ctx;
        stopRef.current = buildOceanSound(ctx);
        setIsMuted(false);
      } catch (e) {
        console.warn("Web Audio not available", e);
      }
      document.removeEventListener("click",      tryStart);
      document.removeEventListener("scroll",     tryStart);
      document.removeEventListener("touchstart", tryStart);
    };
    document.addEventListener("click",      tryStart);
    document.addEventListener("scroll",     tryStart);
    document.addEventListener("touchstart", tryStart);
    return () => {
      document.removeEventListener("click",      tryStart);
      document.removeEventListener("scroll",     tryStart);
      document.removeEventListener("touchstart", tryStart);
    };
  }, []);

  /* Pause audio when navigating away from the home page */
  useEffect(() => {
    return () => {
      const ctx = ctxRef.current;
      if (ctx && ctx.state === "running") {
        ctx.suspend();
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === "running") {
      ctx.suspend();
      setIsMuted(true);
    } else {
      ctx.resume();
      setIsMuted(false);
    }
  }, []);

  const handleSelect = (id: string) => {
    setSelected(prev => {
      const next = prev === id ? null : id;
      if (next && answerRef.current) {
        setTimeout(() => answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 130);
      }
      return next;
    });
  };

  const selectedBuyer = BUYER_TYPES.find(b => b.id === selected);

  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════════════
          1. HERO — Ocean video + wave layers
      ══════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-end overflow-hidden" style={{ background: "#02274A" }}>

        {/* Video background — 4K UHD (3840×2160) */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero-ocean-4k.mp4" type="video/mp4" />
          <source src="/hero-ocean.mp4" type="video/mp4" />
        </video>

        {/* Deep ocean overlays — layered for depth */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(2,39,74,0.25) 0%, rgba(2,39,74,0.08) 30%, rgba(2,39,74,0.55) 70%, rgba(2,39,74,0.88) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(2,39,74,0.6) 0%, transparent 60%, rgba(2,39,74,0.3) 100%)" }}
        />

        {/* Floating particles — subtle parallax drift */}
        <ParallaxLayer speed={0.08} style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: p.left,
                bottom: p.bottom,
                width: p.size,
                height: p.size,
                background: "rgba(28,169,201,0.7)",
                animationDelay: p.delay,
                animationDuration: p.dur,
              }}
            />
          ))}
        </ParallaxLayer>

        {/* Sound toggle — top right, safe distance from notch/status bar */}
        <button
          onClick={toggleMute}
          className="absolute z-20 flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-wider transition-all"
          style={{
            top: "env(safe-area-inset-top, 96px)",
            right: "max(env(safe-area-inset-right, 0px), 24px)",
            marginTop: "24px",
            color: isMuted ? "rgba(255,255,255,0.4)" : "#1CA9C9",
            border: "1px solid",
            borderColor: isMuted ? "rgba(255,255,255,0.12)" : "rgba(28,169,201,0.4)",
          }}
          data-testid="btn-toggle-sound"
          aria-label={isMuted ? "Unmute ocean" : "Mute ocean"}
        >
          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          <span className="hidden sm:inline">{isMuted ? "Hear the Ocean" : "Ocean Sound On"}</span>
        </button>

        {/* Hero copy — bottom-left editorial */}
        <div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-24 pt-24 pb-10 sm:pb-20 md:pb-24"
          style={{ paddingBottom: "max(40px, env(safe-area-inset-bottom, 40px))" }}
        >
          <div className="max-w-3xl">

            {/* Overline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-medium mb-4 sm:mb-5"
              style={{ color: "#1CA9C9" }}
            >
              Geelong, Victoria, Australia · Est. 1978
            </motion.p>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
              style={{ transformOrigin: "left", width: "56px", height: "1px", background: "linear-gradient(90deg, #1CA9C9, rgba(28,169,201,0.08))", marginBottom: "20px" }}
            />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 1.1 }}
              className="text-white/55 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg mb-7 sm:mb-8"
            >
              B2B diamond sourcing &amp; IF→FL precision conversion. Natural, lab-grown, and
              custom — every stone GIA-certified.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 1.25 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <MagneticBtn>
                <Link href="/diamonds">
                  <Button
                    className="shimmer-btn rounded-none h-[52px] px-8 sm:px-10 text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] font-medium text-white hover:opacity-90 w-full sm:w-auto"
                    style={{ background: "#1CA9C9" }}
                    data-testid="hero-cta-source"
                  >
                    Source Diamonds
                  </Button>
                </Link>
              </MagneticBtn>
              <MagneticBtn>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-none h-[52px] px-8 sm:px-10 text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white hover:bg-white/8 w-full sm:w-auto"
                    style={{ borderColor: "rgba(28,169,201,0.45)", background: "rgba(28,169,201,0.04)" }}
                    data-testid="hero-cta-if-stone"
                  >
                    IF→FL Conversion
                  </Button>
                </Link>
              </MagneticBtn>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ bottom: "72px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.2 }}
        >
          <ChevronDown size={14} className="animate-bounce" style={{ color: "rgba(28,169,201,0.45)" }} />
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: "rgba(2,39,74,0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(28,169,201,0.12)",
          }}
        >

        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. SIGNAL STRIP — Infinite trust marquee
      ══════════════════════════════════════════════════ */}
      <section className="py-5 border-b border-white/5 overflow-hidden" style={{ background: "#02274A" }}>
        <Marquee duration={30} gap={56} pauseOnHover>
          {[
            { text: "47 Years of Combined Expertise", logo: null },
            { text: "GIA-Certified on Every Stone",   logo: "/gia-logo.png" },
            { text: "B2B Trade Partners Only",         logo: null },
            { text: "Geelong, Victoria, Australia",    logo: null },
            { text: "IF→FL Precision Conversion",      logo: null },
            { text: "Natural & Lab-Grown Diamonds",    logo: null },
          ].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 shrink-0 text-[9px] uppercase tracking-[0.35em]"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              {item.logo && (
                <img src={item.logo} alt="GIA" style={{ width: "14px", height: "14px", objectFit: "contain", opacity: 0.65, mixBlendMode: "screen" }} />
              )}
              {item.text}
              <span style={{ color: "rgba(28,169,201,0.4)", marginLeft: "8px" }}>◆</span>
            </span>
          ))}
        </Marquee>
      </section>


      {/* ══════════════════════════════════════════════════
          2c. CLIENT LOGO STRIP — Instant social proof
      ══════════════════════════════════════════════════ */}
      <section className="py-8 sm:py-5 px-4 sm:px-6" style={{ background: "#F4F8FC", borderBottom: "1px solid rgba(2,39,74,0.07)" }}>
         <div className="max-w-5xl mx-auto">
           <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-14 gap-y-6 sm:gap-y-8">
             {[
              { name: "KGK Diamond",     sub: "Jaipur · Dubai · Hong Kong", logo: null,   logoH: 56 },
              { name: "Venus Jewellery", sub: "Mumbai · Antwerp",            logo: null, logoH: 44 },
              { name: "Excell Overseas", sub: "Surat · Singapore",           logo: null,              logoH: 0  },
            ].map((co, i) => (
              <motion.div
                key={co.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex flex-col items-center gap-2"
              >
                {co.logo ? (
                  <img
                    src={co.logo}
                    alt={co.name}
                    style={{
                      height: co.logoH,
                      width: "auto",
                      opacity: 0.55,
                      mixBlendMode: "multiply",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <span
                    className="font-serif text-lg sm:text-xl md:text-2xl"
                    style={{ color: "#02274A", letterSpacing: "-0.01em" }}
                  >
                    {co.name}
                  </span>
                )}
                <span className="text-[8px] uppercase tracking-[0.35em]" style={{ color: "rgba(2,39,74,0.3)" }}>
                  {co.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. QUALIFIER — "What brings you here today?"
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-10 sm:mb-14">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
              Find Your Answer
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3" style={{ color: "#02274A" }}>
              What brings you here today?
            </motion.h2>
            <motion.p variants={up} className="text-sm sm:text-base max-w-md" style={{ color: "rgba(2,39,74,0.5)" }}>
              Select the situation that matches yours. We'll give you the exact answer.
            </motion.p>
          </motion.div>

          {/* Qualifier cards — 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {BUYER_TYPES.map((bt, i) => (
              <motion.div
                key={bt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`qualifier-card p-6 sm:p-8 border ${selected === bt.id ? "selected" : "border-[rgba(2,39,74,0.08)]"}`}
                style={{ background: selected === bt.id ? "rgba(28,169,201,0.08)" : "rgba(2,39,74,0.02)" }}
                onClick={() => handleSelect(bt.id)}
                data-testid={`qualifier-${bt.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(bt.id)}
              >
                <div className="text-3xl mb-4 sm:mb-5 leading-none font-light tabular-nums" style={{ color: "rgba(2,39,74,0.1)" }}>{bt.num}</div>
                <h3 className="font-serif text-base sm:text-lg mb-2 sm:mb-3 leading-snug" style={{ color: "#02274A" }}>{bt.headline}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>{bt.subtext}</p>
                <div
                  className="mt-5 sm:mt-6 flex items-center gap-2 text-[9px] uppercase tracking-wider font-medium"
                  style={{ color: selected === bt.id ? "#1CA9C9" : "rgba(2,39,74,0.3)" }}
                >
                  {selected === bt.id
                    ? <><CheckCircle2 size={11} /><span>Selected</span></>
                    : <><ArrowRight size={11} /><span>See Answer</span></>
                  }
                </div>
              </motion.div>
            ))}
          </div>

          {/* Answer panel */}
          <div ref={answerRef}>
            <AnimatePresence mode="wait">
              {selectedBuyer && (
                <motion.div
                  key={selectedBuyer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 sm:mt-6 p-6 sm:p-8 md:p-12 border border-[#1CA9C9]/30"
                  style={{ background: "rgba(2,39,74,0.03)" }}
                >
                  <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>Our Answer</p>
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl mb-5 sm:mb-6" style={{ color: "#02274A" }}>
                        {selectedBuyer.answer.title}
                      </h3>
                      <ul className="space-y-3">
                        {selectedBuyer.answer.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.55)" }}>
                            <span className="shrink-0 mt-0.5" style={{ color: "#1CA9C9" }}>—</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-6 md:items-end">
                      <p className="text-sm italic font-serif leading-relaxed text-right hidden md:block max-w-xs" style={{ color: "rgba(2,39,74,0.3)" }}>
                        "Every answer begins with understanding exactly what you need."
                      </p>
                      <Link href={selectedBuyer.answer.href} className="block w-full sm:w-auto">
                        <Button
                          className="rounded-none text-xs uppercase tracking-[0.18em] text-white hover:opacity-90 font-medium w-full sm:w-auto"
                          style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem" }}
                          data-testid={`qualifier-cta-${selectedBuyer.id}`}
                        >
                          {selectedBuyer.answer.cta} →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. THE 4 C'S — Diamond grading criteria
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="mb-10 sm:mb-14"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
              The 4 C's
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ color: "rgba(255,255,255,0.88)" }}>
              Every stone judged by the same uncompromising criteria.
            </motion.h2>
            <motion.div variants={up} className="mt-5"><span className="ocean-line" /></motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 items-start">

            {/* Left: Video */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-col gap-5 sm:gap-6"
            >
              <div className="w-full overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9", background: "#011a36" }}>
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/pPMCz3DN7u4?autoplay=0&controls=1"
                  title="Diamond Crafting — FLX Diamonds"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.45)" }}>
                FLX Diamond sources natural and lab-grown stones graded to the highest standards — 
                assessed across all four criteria before any stone is offered to a trade partner.
              </p>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-none text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
                  style={{ borderColor: "rgba(28,169,201,0.4)", height: "46px", padding: "0 1.75rem" }}
                  data-testid="btn-fourcees-about"
                >
                  More of us 
                </Button>
              </Link>
            </motion.div>

            {/* Right: 4C's list */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {[
                {
                  Icon: Scale,
                  title: "Carat",
                  desc: "The measure of a diamond's weight — 1 carat equals 0.2 grams. FLX supplies from 0.30ct melee through 10ct+ statement stones, sourced to exact brief.",
                },
                {
                  Icon: Palette,
                  title: "Color",
                  desc: "Graded D (colorless) through Z. We source primarily D–J range through 47 years of trusted cutter relationships in Antwerp, Mumbai and Surat.",
                },
                {
                  Icon: Eye,
                  title: "Clarity",
                  desc: "FL and IF represent the pinnacle. Our proprietary IF→FL regrinding technique moves stones up this scale — documented by a new GIA Flawless certificate.",
                },
                {
                  Icon: Gem,
                  title: "Cut",
                  desc: "Determines brilliance, fire and scintillation. Excellent and Ideal cut grades are our benchmark — every stone assessed for maximum light performance.",
                },
              ].map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65, ease: EASE }}
                  className="flex gap-4 sm:gap-5 items-start p-4 sm:p-5 border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(28,169,201,0.12)" }}
                >
                  {/* Circular icon badge */}
                  <div
                    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                    style={{ border: "1.5px solid rgba(28,169,201,0.25)", color: "#1CA9C9" }}
                  >
                    <Icon size={18} strokeWidth={1.4} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-base sm:text-lg leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>{title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          IF → FL EXPERTISE
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">

          {/* Header row */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-end mb-12 sm:mb-16 md:mb-20"
          >
            <div className="space-y-4 sm:space-y-5">
              <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
                IF→FL Conversion
              </motion.p>
              <motion.h2 variants={up} className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none" style={{ color: "#02274A" }}>
                Unlock hidden value<br />in your IF stone.
              </motion.h2>
              <motion.div variants={up}><span className="ocean-line" /></motion.div>
            </div>
            <motion.div variants={up} className="space-y-5 sm:space-y-6">
              <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: "rgba(2,39,74,0.55)" }}>
                When a GIA certificate notes specific surface characteristics on an Internally Flawless
                stone, there is often a viable path to Flawless grade — without leaving the same carat weight bracket.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href="/investment" className="block w-full sm:w-auto">
                  <Button
                    className="rounded-none text-xs uppercase tracking-[0.18em] font-medium text-white hover:opacity-90 w-full sm:w-auto"
                    style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem" }}
                    data-testid="btn-iftfl-learn"
                  >
                    How It Works
                  </Button>
                </Link>
                <Link href="/contact" className="block w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="rounded-none text-xs uppercase tracking-[0.18em] hover:bg-[#02274A]/5 w-full sm:w-auto"
                    style={{ borderColor: "rgba(2,39,74,0.2)", color: "#02274A", height: "48px", padding: "0 2rem" }}
                    data-testid="btn-iftfl-submit"
                  >
                    Submit a GIA Cert →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* 4-step visual flow */}
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(28,169,201,0.3) 15%, rgba(28,169,201,0.3) 85%, transparent)" }}
            />

            {/* Steps: 1 col mobile, 2 col tablet, 4 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(2,39,74,0.06)" }}>
              {[
                {
                  n: "01",
                  label: "GIA Cert Review",
                  body: "Send the GIA certificate number. We read the comments for removable surface characteristic indicators. Roughly 15–20% of IF stones qualify.",
                  tag: "No cost · 24h turnaround"
                },
                {
                  n: "02",
                  label: "Feasibility",
                  body: "We assess whether the characteristic is safely removable without touching carat weight. A clear yes or no — no ambiguity, no obligation.",
                  tag: "Written assessment"
                },
                {
                  n: "03",
                  label: "Craftsmanship",
                  body: "Babu Vekariya executes a precision micro-regrind under 0.01mm. Hours per stone, no automation, no margin for error.",
                  tag: "47 years of judgment"
                },
                {
                  n: "04",
                  label: "Result",
                  body: "The stone is resubmitted to GIA independently. A new FL certificate is issued — verifiable, permanent, globally recognised.",
                  tag: "New GIA FL certificate"
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.15, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                  className="p-6 sm:p-7 md:p-9 flex flex-col gap-4"
                  style={{ background: "white" }}
                >
                  {/* Step number with dot */}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-2xl font-light tabular-nums leading-none"
                      style={{ color: "#1CA9C9", opacity: 0.7 }}
                    >
                      {step.n}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#1CA9C9", opacity: 0.5 }} />
                  </div>
                  <h3 className="font-serif text-lg leading-snug" style={{ color: "#02274A" }}>{step.label}</h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(2,39,74,0.45)" }}>{step.body}</p>
                  <p
                    className="text-[9px] uppercase tracking-widest font-medium pt-1"
                    style={{ color: "rgba(28,169,201,0.7)", borderTop: "1px solid rgba(2,39,74,0.08)", paddingTop: "0.75rem" }}
                  >
                    {step.tag}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Value teaser */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-[11px] italic mt-6 sm:mt-8 font-light"
            style={{ color: "rgba(2,39,74,0.35)" }}
          >
            Ask us about your stone's potential — assessment is always free.
          </motion.p>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. THREE SERVICES
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-12 sm:mb-16"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: "#1CA9C9" }}>
              Our Services
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">
              Three ways we work with you.
            </motion.h2>
          </motion.div>

          {/* Services: 1 col mobile, 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
            {[
              {
                num: "01",
                title: "Diamond Sourcing",
                body: "GIA-certified natural and lab-grown stones at trade pricing. Any shape, any size, any spec. No retail. Minimum order requirements apply.",
                tags: ["Natural", "Lab-Grown", "Melee"],
                link: "/diamonds",
                linkText: "View Diamond Inventory"
              },
              {
                num: "02",
                title: "IF→FL Conversion",
                body: "Send any IF stone's GIA cert number. We analyse the comments, assess viability at no cost, and if the stone qualifies, execute the precision regrind. New GIA FL certificate issued.",
                tags: ["Assessment", "Regrinding", "New Certificate"],
                link: "/investment",
                linkText: "Learn About Conversion"
              },
              {
                num: "03",
                title: "B2B Advisory",
                body: "White-label sourcing. Investment stone advisory. Custom specification briefs. Partnership structures for retailers, jewellers, private clients, and institutional buyers.",
                tags: ["White-Label", "Investment", "Bespoke"],
                link: "/trade",
                linkText: "Explore Partnership"
              }
            ].map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.18, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                className="p-8 sm:p-10 flex flex-col gap-5 group cursor-default transition-colors"
                style={{ background: "#02274A" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#04385E")}
                onMouseLeave={e => (e.currentTarget.style.background = "#02274A")}
              >
                <span className="text-4xl font-light tabular-nums" style={{ color: "#1CA9C9", opacity: 0.4 }}>{svc.num}</span>
                <div className="flex-1 flex flex-col gap-4">
                  <h3 className="font-serif text-xl sm:text-2xl text-white">{svc.title}</h3>
                  {/* Stone-type / category chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[9px] uppercase tracking-widest px-2.5 py-1 font-medium"
                        style={{
                          color: "rgba(28,169,201,0.75)",
                          border: "1px solid rgba(28,169,201,0.22)",
                          background: "rgba(28,169,201,0.06)"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{svc.body}</p>
                </div>
                <Link
                  href={svc.link}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium group-hover:gap-3 transition-all mt-auto"
                  style={{ color: "#1CA9C9" }}
                >
                  {svc.linkText} <ArrowRight size={11} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. FEATURED INVENTORY
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 gap-4">
            <div>
              <ScrollReveal delay={0}>
                <p className="text-[10px] uppercase tracking-[0.35em] mb-2 font-medium" style={{ color: "#1CA9C9" }}>
                  By Application Only
                </p>
              </ScrollReveal>
              <ViewportWordReveal text="Featured Inventory" className="font-serif text-3xl sm:text-4xl" style={{ color: "#02274A" }} as="h2" />
            </div>
            <ScrollReveal delay={0.2}>
              <Link href="/diamonds" className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium transition-colors" style={{ color: "rgba(2,39,74,0.4)" }}>
                View All Stones <ArrowRight size={11} />
              </Link>
            </ScrollReveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { id: 1, shape: "Round Brilliant",    image: "/diamond-3.png", carat: "2.01", color: "D", clarity: "FL",   cut: "Excellent" },
              { id: 2, shape: "Oval Cut",           image: "/diamond-3.png", carat: "1.52", color: "E", clarity: "IF",   cut: "Excellent" },
              { id: 3, shape: "Emerald Cut",        image: "/diamond-3.png", carat: "3.15", color: "F", clarity: "IF",   cut: "Excellent" },
            ].map((d) => (
              <StaggerItem key={d.id}>
                <DiamondCard
                  image={d.image}
                  shape={d.shape}
                  carat={d.carat}
                  color={d.color}
                  clarity={d.clarity}
                  cut={d.cut}
                  onRequestPrice={() => {}}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. WHY FLXDIAMONDS
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 border-t border-[rgba(28,169,201,0.12)]" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="mb-10 sm:mb-14"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
              Our Difference
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-3xl sm:text-4xl md:text-5xl" style={{ color: "rgba(255,255,255,0.88)" }}>
              Why FLXDIAMONDS.
            </motion.h2>
          </motion.div>

          {/* Why cards: 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(28,169,201,0.08)" }}>
            {[
              {
                Icon: Award,
                title: "Expertise",
                body: "47 years of diamond craftsmanship, from Surat to Geelong. Babu Vekariya's precision regrinding technique is the result of a lifetime dedicated to a single discipline.",
                tag: "Est. 1978"
              },
              {
                Icon: Shield,
                title: "Discretion",
                body: "Every engagement is commercially confidential by default. NDAs available on request. Your clients, your stones, and your pricing structures remain yours alone.",
                tag: "NDA as standard"
              },
              {
                Icon: Sliders,
                title: "Custom Solutions",
                body: "No off-the-shelf briefs. Every sourcing mandate is built to your exact specification — shape, carat, colour, clarity, and budget. No two engagements are the same.",
                tag: "Built to your brief"
              },
              {
                Icon: Cpu,
                title: "AI Precision",
                body: "Diamond grading analysis supported by AI-powered assessment tools. Human judgment refined over 47 years, combined with data-driven precision at every step.",
                tag: "Human + AI"
              },
            ].map(({ Icon, title, body, tag }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 72 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.13, duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
                className="p-7 sm:p-9 flex flex-col gap-5 group"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0"
                  style={{ background: "rgba(28,169,201,0.07)", border: "1px solid rgba(28,169,201,0.18)" }}
                >
                  <Icon size={18} style={{ color: "#1CA9C9" }} strokeWidth={1.5} />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-serif text-lg sm:text-xl" style={{ color: "rgba(255,255,255,0.85)" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{body}</p>
                </div>

                <p
                  className="text-[9px] uppercase tracking-widest font-medium pt-4"
                  style={{ color: "rgba(28,169,201,0.6)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {tag}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9b. SOCIAL PROOF — Anonymised testimonials
      ══════════════════════════════════════════════════ */}
      {/* <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="mb-10 sm:mb-14 text-center"
          >
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
      </section> */}

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      {/* <FaqSection faqs={activeFaqs} /> */}

      {/* ══════════════════════════════════════════════════
          11. CLOSING — Ocean panorama + CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "65vh", minHeight: "420px" }}>
        <ParallaxLayer speed={0.18} style={{ position: "absolute", inset: "-15% 0", zIndex: 0 }}>
          <img
            src="/great-ocean-road_2.jpg"
            alt="Twelve Apostles — Great Ocean Road, Victoria"
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.85) brightness(0.55)" }}
            aria-hidden="true"
          />
        </ParallaxLayer>
        <div className="absolute inset-0" style={{ background: "rgba(2,39,74,0.5)" }} />

        <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center space-y-5 sm:space-y-7 max-w-3xl"
          >
            <motion.p variants={up} className="text-[9px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}>
              Precision. Trust. Excellence.
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-2xl sm:text-3xl md:text-5xl text-white leading-snug">
              "The finest diamonds are not found.<br />
              They are understood."
            </motion.h2>
            <motion.div variants={up} className="flex justify-center">
              <span className="ocean-line tide-pulse" />
            </motion.div>
            <motion.div variants={up}>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-none text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] font-medium text-white hover:bg-white/10 w-full sm:w-auto"
                  style={{ borderColor: "rgba(255,255,255,0.4)", height: "52px", padding: "0 2rem sm:2.5rem" }}
                  data-testid="btn-closing-contact"
                >
                  Begin the Conversation →
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}