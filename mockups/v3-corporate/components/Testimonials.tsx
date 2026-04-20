"use client";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase mb-3 block">
          What Artists Say
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-[#E8E8F0] tracking-tight">
          Results That Speak
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-[#0D0D14] border border-white/5 rounded-lg p-8 relative overflow-hidden"
          >
            {/* Gold left border accent */}
            <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-[#C9A84C]" />
            <Quote size={24} className="text-[#1B3FCC]/40 mb-6" />
            <p className="text-[#E8E8F0] text-base leading-relaxed mb-8">{t.quote}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1B3FCC]/15 border border-[#1B3FCC]/25 flex items-center justify-center">
                <span className="text-[#1B3FCC] font-semibold text-sm">{t.name.charAt(0)}</span>
              </div>
              <div>
                <div className="text-[#E8E8F0] font-medium text-sm">{t.name}</div>
                <div className="text-[#6B6B7B] text-xs">{t.title}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
