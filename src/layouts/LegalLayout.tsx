import { type ReactNode, useState, useEffect } from 'react';
import PortalFooter from '../components/portal/PortalFooter';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalLayout({ children, title }: { children: ReactNode; title: string }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0B0F19] min-h-screen text-neutral-800 dark:text-neutral-200 font-sans antialiased transition-colors flex flex-col justify-between">
      <header className="w-full border-b border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-30 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          <Link to="/" className="text-neutral-900 dark:text-white font-bold text-sm flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-900 font-bold text-xs tracking-wider">
              MY
            </div>
            <span className="tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              Malaysia EV Open Data
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </Link>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-8 tracking-tight">
            {title}
          </h1>
          <div className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </main>
      
      <PortalFooter />
    </div>
  );
}
