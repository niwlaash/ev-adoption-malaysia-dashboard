import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortalFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-16 transition-colors">
      
      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Purpose (Span 6 of 12) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="h-7 flex items-center gap-2.5 mb-3.5">
                <div className="w-6 h-6 rounded bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-900 font-bold text-[10px] tracking-wider shrink-0">
                  MY
                </div>
                <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100 tracking-tight">
                  Malaysia EV Open Data Portal
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mb-4">
                An independent public open-data portal tracking Malaysia&apos;s electric vehicle transition.
                All figures are computed directly from official road transport registration records and verified charging station feeds.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
              <span className="inline-block px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-mono text-[10px] text-neutral-700 dark:text-neutral-300">
                CC BY 4.0
              </span>
              <span>
                Licensed under{' '}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                >
                  Creative Commons Attribution 4.0
                </a>
              </span>
            </div>
          </div>

          {/* Column 2: Data Sources (Span 3 of 12) */}
          <div className="md:col-span-3">
            <h3 className="h-7 flex items-center text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3.5">
              Data Sources
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://data.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <span className="truncate pr-2">Statistics Dept (DOSM)</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://data.gov.my/data-catalogue/cars_2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <span className="truncate pr-2">Road Transport Dept (JPJ)</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://openchargemap.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <span className="truncate pr-2">Open Charge Map (OCM)</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 shrink-0" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: System & Legal (Span 3 of 12) */}
          <div className="md:col-span-3">
            <h3 className="h-7 flex items-center text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3.5">
              System & Policies
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/about"
                  className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Methodology & Sources
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/niwlaash/ev-adoption-malaysia-dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <span className="truncate pr-2">GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 shrink-0" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Sub-Footer Bottom Bar */}
      <div className="border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="flex flex-wrap items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Developed by Alwin Ashraf.</span>
            <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">•</span>
            <span>Verified Public Open Data.</span>
          </div>
          
          <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500 text-[11px] font-mono">
            <span>React 19</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>TypeScript</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default PortalFooter;
