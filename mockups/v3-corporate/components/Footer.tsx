import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Artist Management", href: "/services#artist-management" },
    { label: "Radio Promotions", href: "/services#radio-promotions" },
    { label: "Music Publishing", href: "/services#music-publishing" },
    { label: "Recording Production", href: "/services#recording-production" },
    { label: "Career Consulting", href: "/services#career-consulting" },
  ],
  Artists: [
    { label: "Our Roster", href: "/artists" },
    { label: "Rex Condor", href: "https://rexcondormusic.com" },
    { label: "Brook Ryan", href: "https://brookeryan.net" },
    { label: "David Mikeal", href: "https://davidmikeal.com" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our History", href: "/about#history" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  Contact: [
    { label: "Book a Consultation", href: "/contact" },
    { label: "Orlando: (407) 574-6988", href: "tel:4075746988" },
    { label: "Nashville: (615) 512-1741", href: "tel:6155121741" },
    { label: "Michael_Z@galaxyclassent.com", href: "mailto:Michael_Z@galaxyclassent.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <path d="M28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4" stroke="#1B3FCC" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M16 4C19.314 4 22.314 5.343 24.485 7.515" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="16" cy="16" r="3" fill="#E8E8F0" />
              </svg>
              <div>
                <div className="text-[#E8E8F0] font-semibold text-xs tracking-widest uppercase">Galaxy Class</div>
                <div className="text-[#6B6B7B] text-[9px] tracking-widest uppercase">Entertainment</div>
              </div>
            </div>
            <p className="text-[#6B6B7B] text-xs leading-relaxed">
              Dedicated to the production and promotion of creations in the entertainment industry.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[#E8E8F0] text-xs font-semibold tracking-widest uppercase mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#6B6B7B] hover:text-[#E8E8F0] text-xs transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#6B6B7B] text-xs">
            © {new Date().getFullYear()} Galaxy Class Entertainment Inc. All rights reserved.
          </p>
          <p className="text-[#6B6B7B] text-xs">
            Orlando, FL · Nashville, TN
          </p>
        </div>
      </div>
    </footer>
  );
}
