"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="border-t border-white/5 bg-[#0D0D14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              The Galaxy Report
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#E8E8F0] tracking-tight mb-4">
              Stay Ahead of the Industry
            </h2>
            <p className="text-[#6B6B7B] text-base leading-relaxed mb-8">
              Artist spotlights, radio chart tracking, industry news, and exclusive opportunities —
              delivered bi-weekly to your inbox.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-[#C9A84C] font-medium">
                <CheckCircle size={20} />
                You&apos;re on the list. Welcome to The Galaxy Report.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-[#0A0A0F] border border-white/10 focus:border-[#1B3FCC]/50 text-[#E8E8F0] placeholder-[#6B6B7B] px-4 py-3 rounded text-sm outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#1B3FCC] hover:bg-[#2347e0] text-white font-medium px-6 py-3 rounded transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe <ArrowRight size={14} />
                </button>
              </form>
            )}

            <p className="text-[#6B6B7B] text-xs mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
