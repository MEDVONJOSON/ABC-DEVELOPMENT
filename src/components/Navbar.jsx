import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/news', label: 'News' },
  { to: '/impact', label: 'Impact' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

const aboutLinks = [
  { to: '/about', label: 'About ABC' },
  { to: '/team-members', label: 'Team Members' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
];

const logoBlue = 'text-[#0ea5e9]';
const logoBlueHover = 'hover:text-[#0284c7]';
const logoBlueBg = 'bg-sky-50';
const logoBlueHoverBg = 'hover:bg-sky-50';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [location.pathname]);

  const aboutActive = aboutLinks.some((link) => link.to === location.pathname);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="ABC-Development-SL Logo"
            className="h-14 md:h-16 w-auto scale-110 drop-shadow-sm"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              onClick={() => setAboutOpen((value) => !value)}
              className={`px-4 py-2 text-base font-extrabold uppercase rounded-lg transition-colors inline-flex items-center gap-1.5 ${
                aboutActive
                  ? `${logoBlue} ${logoBlueBg}`
                  : `${logoBlue} ${logoBlueHover} ${logoBlueHoverBg}`
              }`}
              aria-expanded={aboutOpen}
            >
              About <ChevronDown size={17} className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
            </button>
            {aboutOpen && (
              <div className="absolute left-0 top-full pt-2 w-60">
                <div className="rounded-lg border border-slate-100 bg-white shadow-lg p-2">
                  {aboutLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 rounded-md text-sm font-bold transition-colors ${
                          isActive
                            ? `${logoBlue} ${logoBlueBg}`
                            : `${logoBlue} ${logoBlueHover} ${logoBlueHoverBg}`
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 text-base font-extrabold uppercase rounded-lg transition-colors ${
                  isActive
                    ? `${logoBlue} ${logoBlueBg}`
                    : `${logoBlue} ${logoBlueHover} ${logoBlueHoverBg}`
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/get-involved#volunteer" className="btn-primary text-sm">
            Volunteer
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-lg hover:bg-brand-50"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <div className="container-page py-4 grid gap-1">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg text-base font-extrabold uppercase ${
                  isActive
                    ? `${logoBlue} ${logoBlueBg}`
                    : `${logoBlue} ${logoBlueHoverBg}`
                }`
              }
            >
              About
            </NavLink>
            <div className="grid gap-1 pl-4 pb-2">
              {aboutLinks.slice(1).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-bold ${
                      isActive
                        ? `${logoBlue} ${logoBlueBg}`
                        : `${logoBlue} ${logoBlueHover} ${logoBlueHoverBg}`
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-base font-extrabold uppercase ${
                    isActive
                      ? `${logoBlue} ${logoBlueBg}`
                      : `${logoBlue} ${logoBlueHoverBg}`
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-3">
              <Link to="/get-involved#volunteer" className="btn-primary text-sm flex-1">
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
