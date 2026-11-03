import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useRouter } from '@/router';
import { irItems } from '@/data/ir';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/ir/investor-grievance', label: 'Investor Relations', dropdown: true },
  { to: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [irDropdown, setIrDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setIrDropdown(false);
  }, [path]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedOutsideDesktop = dropdownRef.current && !dropdownRef.current.contains(target);
      const clickedOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(target);

      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setIrDropdown(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const isActive = (to: string) => {
    if (to === '/') return path === '/';
    if (to === '/ir/investor-grievance') return path.startsWith('/ir');
    return path.startsWith(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5  ">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">KF</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-brand-800 text-base sm:text-lg tracking-tight">
                KRISHNA FILAMENT INDUSTRIES LIMITED
              </span>
             
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.to} ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIrDropdown((v) => !v)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      isActive(link.to)
                        ? 'text-brand-700 bg-brand-50'
                        : 'text-gray-700 hover:text-brand-700 hover:bg-brand-50'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${irDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {irDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-down">
                      <div className="max-h-[70vh] overflow-y-auto py-2">
                        {irItems.map((item) => (
                          <Link
                            key={item.slug}
                            to={`/ir/${item.slug}`}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors border-l-2 border-transparent hover:border-brand-500"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    isActive(link.to)
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-gray-700 hover:text-brand-700 hover:bg-brand-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-gray-700 hover:text-brand-700"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.to} ref={mobileDropdownRef}>
                  <button
                    onClick={() => setIrDropdown((v) => !v)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-medium text-sm ${
                      isActive(link.to) ? 'text-brand-700 bg-brand-50' : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${irDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {irDropdown && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-brand-100 pl-3">
                      {irItems.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/ir/${item.slug}`}
                          onClick={() => {
                            setMobileOpen(false);
                            setIrDropdown(false);
                          }}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-brand-700 rounded-lg hover:bg-brand-50"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg font-medium text-sm ${
                    isActive(link.to) ? 'text-brand-700 bg-brand-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
