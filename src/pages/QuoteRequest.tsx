import { Link } from "wouter";
import { motion } from "framer-motion";
import { useShortlist } from "@/contexts/ShortlistContext";

export default function QuoteRequest() {
  const { shortlist, count } = useShortlist();

  return (
    <div style={{ background: "#02274A", minHeight: "100vh" }}>
      <div className="pt-28 md:pt-40 pb-10 px-8 md:px-14 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
            Trade Enquiry
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-tight">
            Request a Quote
          </h1>
          <div className="w-10 h-px my-4" style={{ background: "#1CA9C9" }} />
          <p className="text-white/45 text-sm max-w-xl leading-relaxed font-light">
            {count > 0
              ? `You have ${count} ${count === 1 ? "stone" : "stones"} on your shortlist. Submit your details and we'll respond within one business day.`
              : "No stones on your shortlist yet."}
          </p>

          {count === 0 ? (
            <Link href="/diamonds">
              <button
                className="mt-8 px-8 py-3.5 text-[10px] uppercase tracking-[0.4em] font-semibold text-white"
                style={{ background: "#1CA9C9" }}
              >
                Browse Collection
              </button>
            </Link>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-10 p-8 flex flex-col gap-6"
              style={{ background: "#021C38", border: "1px solid rgba(28,169,201,0.12)" }}
            >
              <p className="text-[10px] uppercase tracking-[0.35em] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
                Selected Stones
              </p>
              {shortlist.map(d => (
                <div key={d.stockId} className="flex items-center justify-between py-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="font-serif text-white">{d.shape} · {d.carat.toFixed(2)} ct</span>
                  <span className="font-mono text-[9px] tracking-widest" style={{ color: "rgba(28,169,201,0.6)" }}>{d.stockId}</span>
                </div>
              ))}
              <Link href="/contact">
                <button
                  className="w-full mt-2 py-4 text-[10px] uppercase tracking-[0.4em] font-semibold text-white"
                  style={{ background: "#1CA9C9" }}
                >
                  Continue to Contact Form
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}