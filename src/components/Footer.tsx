import { Link } from '@/router';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr] lg:gap-32">

          {/* Company */}
          <div className="max-w-lg">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-950/30 transition-transform duration-300 group-hover:scale-105">
                <span className="text-lg font-bold text-white">KF</span>
              </div>

              <div className="leading-tight">
                <div className="font-bold text-white">
                  KRISHNA FILAMENT INDUSTRIES LIMITED
                </div>
              </div>
            </Link>

            

            {/* Contact Information */}
            <div className="mt-8 space-y-5">

              {/* Address */}
              <div className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-brand-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
                    Registered Office
                  </p>

                  <p className="mt-1 text-sm leading-6 text-brand-200">
                    Betegaon Village, Boisar (East), Taluka Palghar,
                    <br />
                     Dist. Thane 401501,
                    
                    Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18.6a19.5 19.5 0 0 1-5.79-5.79A19.8 19.8 0 0 1 3.08 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.97 9.73a16 16 0 0 0 5.79 5.79l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                </svg>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
                    Tel No.
                  </p>

                  <a
                    href="tel:02525271881"
                    className="mt-1 block text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    02525 271 881/83
                  </a>
                </div>
              </div>

              {/* Fax */}
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9V2h12v7" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" rx="1" />
                  <path d="M17 12h.01" />
                </svg>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
                    Fax
                  </p>

                  <p className="mt-1 text-sm text-brand-200">
                    02525-271 882
                  </p>
                </div>
              </div>

              {/* Write to Us */}
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
                    Email
                  </p>

                  <a
                    href="mailto:maviindustriesltd@gmail.com"
                    className="mt-0.5 block text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    maviindustriesltd@gmail.com
                  </a>

                  <div className="mt-5 border-t border-brand-800/80 pt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">
                      Corporate Identity Number (CIN)
                    </p>
                    <p className="mt-1.5 break-all font-mono text-base font-bold tracking-[0.08em] text-white sm:text-lg">
                      L25200MH1988PLC048178
                    </p>
                  </div>
                </div>
              </div>

            </div>




            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
              Quick Links
            </h3>

            <ul className="mt-2 space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/ir/policy"
                  className="text-sm text-brand-200 transition-colors hover:text-white"
                >
                  Investor Relations
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Links */}
      </div>
    </footer>
  );
}