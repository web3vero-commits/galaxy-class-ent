"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/data";
import {
  Star, Radio, Music, Mic, Share2, Briefcase,
  MapPin, Headphones, ClipboardList, ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  star: <Star size={20} />,
  radio: <Radio size={20} />,
  music: <Music size={20} />,
  mic: <Mic size={20} />,
  "share-2": <Share2 size={20} />,
  briefcase: <Briefcase size={20} />,
  "map-pin": <MapPin size={20} />,
  headphones: <Headphones size={20} />,
  clipboard: <ClipboardList size={20} />,
};

export default function ServicesGrid() {
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
          What We Do
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-[#E8E8F0] tracking-tight max-w-xl">
          Full-Spectrum Music Industry Services
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-[#0A0A0F] p-8 group hover:bg-[#0D0D18] transition-colors duration-200 cursor-pointer"
          >
            <div className="text-[#1B3FCC] mb-4 group-hover:text-[#2347e0] transition-colors">
              {iconMap[service.icon]}
            </div>
            <h3 className="text-[#E8E8F0] font-semibold text-base mb-2">{service.title}</h3>
            <p className="text-[#6B6B7B] text-sm leading-relaxed mb-4">{service.description}</p>
            <span className="text-[#1B3FCC] text-xs font-medium tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn more <ArrowRight size={12} />
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="border border-white/15 hover:border-[#1B3FCC]/50 text-[#E8E8F0] text-sm font-medium px-8 py-3.5 rounded transition-all duration-200 inline-flex items-center gap-2"
        >
          View All Services <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
