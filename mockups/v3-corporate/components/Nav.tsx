"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0F]/95 backdrop-blur-sm border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4"
                stroke="#1B3FCC"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M16 4C19.314 4 22.314 5.343 24.485 7.515"
                stroke="#C9A84C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="3" fill="#E8E8F0" />
            </svg>
          </div>
          <div>
            <span className="text-[#E8E8F0] font-semibold text-sm tracking-widest uppercase">
              Galaxy Class
            </span>
            <span className="block text-[#6B6B7B] text-[10px] tracking-widest uppercase -mt-0.5">
              Entertainment
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/services", label: "Services" },
            { href: "/artists", label: "Artists" },
            { href: "/about", label: "About" },
            { href: "/newsletter", label: "Newsletter" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#6B6B7B] hover:text-[#E8E8F0] text-sm tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="text-sm text-[#6B6B7B] hover:text-[#E8E8F0] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="bg-[#1B3FCC] hover:bg-[#2347e0] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors duration-200"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#E8E8F0] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-px bg-current mb-1.5 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-px bg-current mb-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-px bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D14] border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {[
            { href: "/services", label: "Services" },
            { href: "/artists", label: "Artists" },
            { href: "/about", label: "About" },
            { href: "/newsletter", label: "Newsletter" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#E8E8F0] text-base tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-[#1B3FCC] text-white text-sm font-medium px-5 py-3 rounded text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}
