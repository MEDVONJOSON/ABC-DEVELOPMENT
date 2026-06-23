import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { siteInfo } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="container-page py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.png"
              alt="ABC-Development-SL Logo"
              className="h-14 w-auto scale-110 drop-shadow-sm"
            />
            <div className="font-display font-bold text-white">{siteInfo.name}</div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {siteInfo.mission}
          </p>
          <div className="flex gap-3 mt-5">
            <a href={siteInfo.social.facebook} className="hover:text-white" aria-label="Facebook"><Facebook size={18} /></a>
            <a href={siteInfo.social.twitter} className="hover:text-white" aria-label="Twitter"><Twitter size={18} /></a>
            <a href={siteInfo.social.instagram} className="hover:text-white" aria-label="Instagram"><Instagram size={18} /></a>
            <a href={siteInfo.social.linkedin} className="hover:text-white" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
        </div>

        <div>
          <div className="text-white font-semibold mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link to="/news" className="hover:text-white">News</Link></li>
            <li><Link to="/impact" className="hover:text-white">Our Impact</Link></li>
            <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold mb-4">Get Involved</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/get-involved#donate" className="hover:text-white">Donate</Link></li>
            <li><Link to="/get-involved#volunteer" className="hover:text-white">Volunteer</Link></li>
            <li><Link to="/get-involved#partner" className="hover:text-white">Partner With Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li>
              <Link
                to="/admin"
                className="relative inline-flex items-center rounded-full border border-slate-700 bg-slate-800/70 px-3 py-2 text-slate-200 text-sm transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400/40 ring-1 ring-sky-400/20 hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]"
                aria-label="Admin sign in"
              >
                <span className="absolute -inset-1 rounded-full blur-sm opacity-30 pointer-events-none" style={{background: 'radial-gradient(circle at center, rgba(14,165,233,0.22), transparent 40%)'}} />
                <span className="relative">Admin</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold mb-4">Contact</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2 items-start">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>{siteInfo.address}</span>
            </li>
            <li className="flex gap-2 items-start">
              <Mail size={16} className="mt-1 flex-shrink-0" />
              <div className="space-y-1">
                {siteInfo.emails.map((contact) => (
                  <a
                    key={contact.address}
                    href={`mailto:${contact.address}`}
                    className="block hover:text-white break-words"
                  >
                    {contact.address}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <Phone size={16} className="mt-1 flex-shrink-0" />
              <div className="space-y-1">
                {siteInfo.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="block hover:text-white"
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

      <div className="border-t border-slate-800">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-white">Privacy</Link>
            <Link to="/contact" className="hover:text-white">Terms</Link>
            <Link to="/contact" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
