"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,232,240,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,232,240,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Cobalt glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1B3FCC]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Gold glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/05 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase mb-6">
              <span className="w-8 h-px bg-[#C9A84C]" />
              Orlando, FL · Nashville, TN
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold text-[#E8E8F0] leading-[1.05] tracking-tight mb-6"
          >
            Your Music.
            <br />
            <span className="text-[#1B3FCC]">Your Career.</span>
            <br />
            Elevated.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#6B6B7B] text-lg leading-relaxed max-w-lg mb-10"
          >
            Full-service artist management and music promotion for independent artists
            who are serious about building a lasting career in the industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="bg-[#1B3FCC] hover:bg-[#2347e0] text-white font-medium px-8 py-4 rounded transition-colors duration-200 text-sm tracking-wide"
            >
              Book a Consultation
            </Link>
            <Link
              href="/services"
              className="border border-white/15 hover:border-white/30 text-[#E8E8F0] font-medium px-8 py-4 rounded transition-colors duration-200 text-sm tracking-wide"
            >
              Our Services
            </Link>
          </motion.div>
        </div>

        {/* Right: signal graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-[400px] h-[400px]">
            {/* Concentric rings */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-[#1B3FCC]/20"
                style={{ margin: `${(i - 1) * 40}px` }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
              />
            ))}
            {/* Center mark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 relative">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M72 40C72 57.673 57.673 72 40 72C22.327 72 8 57.673 8 40C8 22.327 22.327 8 40 8"
                    stroke="#1B3FCC"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M40 8C48.284 8 55.284 11.358 60.284 16.716"
                    stroke="#C9A84C"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="40" cy="40" r="6" fill="#E8E8F0" />
                </svg>
              </div>
            </div>
            {/* Waveform bars */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1">
              {[20, 32, 48, 64, 40, 56, 32, 44, 24, 36, 52, 28].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-[#1B3FCC] rounded-full"
                  style={{ height: h }}
                  animate={{ height: [h, h * 0.5, h * 1.2, h] }}
                  transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[#6B6B7B] text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#6B6B7B] to-transparent" />
      </motion.div>
    </section>
  );
}
