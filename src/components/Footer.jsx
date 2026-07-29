import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { siteInfo } from '../data/site.js';

function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{ background: 'linear-gradient(135deg,#2e7d32,#1565c0)', color: '#fff', boxShadow: '0 4px 15px rgba(46,125,50,0.4)' }}
    >
      <ArrowUp size={18} />
    </button>
  );
}

const socials = [
  { href: null, icon: Facebook, label: 'Facebook', color: '#1877F2' },
  { href: null, icon: Twitter, label: 'Twitter', color: '#1DA1F2' },
  { href: null, icon: Instagram, label: 'Instagram', color: '#E1306C' },
  { href: null, icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{ background: 'linear-gradient(160deg,#0a1628 0%,#0f2418 50%,#0a1628 100%)' }}
      className="text-slate-300 mt-16 relative"
    >
      {/* Top accent border */}
      <div
        className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg,#2e7d32,#0ea5e9,#1565c0)' }}
      />

      <div className="container-page py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.png"
              alt="ABC-Development-SL Logo"
              className="h-14 w-auto scale-110 drop-shadow-sm"
            />
            <div className="font-display font-bold text-white leading-tight">
              {siteInfo.name}
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{siteInfo.mission}</p>

          {/* Colored social icons */}
          <div className="flex gap-3 mt-5">
            {socials.map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href || siteInfo.social[label.toLowerCase()] || '#'}
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110"
                style={{ backgroundColor: color }}
              >
                <Icon size={16} color="#fff" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore links */}
        <div>
          <div className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Explore</div>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: '/about', label: 'About Us' },
              { to: '/projects', label: 'Projects' },
              { to: '/news', label: 'News' },
              { to: '/impact', label: 'Our Impact' },
              { to: '/resources', label: 'Resources' },
              { to: '/gallery', label: 'Gallery' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <div className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Get Involved</div>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: '/get-involved#donate', label: 'Donate' },
              { to: '/get-involved#volunteer', label: 'Volunteer' },
              { to: '/get-involved#partner', label: 'Partner With Us' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/admin"
                className="relative inline-flex items-center rounded-full border border-slate-700 bg-slate-800/70 px-3 py-2 text-slate-200 text-sm transition-colors hover:bg-slate-700 focus:outline-none ring-1 ring-sky-400/20"
                aria-label="Admin sign in"
              >
                <span className="relative">Admin</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2 items-start">
              <MapPin size={15} className="mt-1 flex-shrink-0 text-emerald-400" />
              <span>{siteInfo.address}</span>
            </li>
            <li className="flex gap-2 items-start">
              <Mail size={15} className="mt-1 flex-shrink-0 text-sky-400" />
              <div className="space-y-1">
                {siteInfo.emails.map((contact) => (
                  <a
                    key={contact.address}
                    href={`mailto:${contact.address}`}
                    className="block hover:text-white break-words transition-colors"
                  >
                    {contact.address}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <Phone size={15} className="mt-1 flex-shrink-0 text-amber-400" />
              <div className="space-y-1">
                {siteInfo.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="block hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </li>
            <li className="text-slate-400 text-xs pt-2">{siteInfo.hours}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {year} {siteInfo.name}. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
