"use client";
import { motion } from "framer-motion";
import { artists } from "@/lib/data";
import { ExternalLink } from "lucide-react";

export default function ArtistRoster() {
  return (
    <section className="py-24 border-t border-white/5 bg-[#0D0D14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-4"
        >
          <div>
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase mb-3 block">
              Our Roster
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#E8E8F0] tracking-tight">
              Artists We Represent
            </h2>
          </div>
          <p className="text-[#6B6B7B] text-sm max-w-xs leading-relaxed">
            A curated roster of independent artists across country, pop, rock, and R&B.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artists.map((artist, i) => (
            <motion.a
              key={artist.domain}
              href={`https://${artist.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-[#0A0A0F] border border-white/7 rounded-lg p-6 hover:border-[#1B3FCC]/40 transition-all duration-300"
            >
              {/* Placeholder avatar */}
              <div className="w-14 h-14 rounded-full bg-[#1B3FCC]/10 border border-[#1B3FCC]/20 flex items-center justify-center mb-4">
                <span className="text-[#1B3FCC] font-bold text-lg">
                  {artist.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-[#E8E8F0] font-semibold text-base mb-1">{artist.name}</h3>
              <p className="text-[#6B6B7B] text-sm mb-3">{artist.genre}</p>
              <span className="text-[#1B3FCC] text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {artist.domain} <ExternalLink size={10} />
              </span>
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-lg">
                <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-[#C9A84C] opacity-60" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
