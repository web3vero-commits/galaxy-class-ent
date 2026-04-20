"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "@/lib/data";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section className="border-y border-white/5 bg-[#0D0D14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => {
          const num = parseInt(stat.value);
          const suffix = stat.value.replace(String(num), "");
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center lg:text-left"
            >
              <div className="text-4xl font-bold text-[#E8E8F0] mb-1">
                {isNaN(num) ? stat.value : <CountUp target={num} suffix={suffix} />}
              </div>
              <div className="text-[#6B6B7B] text-sm tracking-wide">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
