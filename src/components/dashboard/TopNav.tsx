import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TopNav() {
  const [isDark, setIsDark] = useState(true);

  // Quick theme toggle mechanism for demo purposes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="h-16 flex flex-shrink-0 items-center justify-between px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
        <span>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-neutral-900 dark:text-neutral-100 font-medium">Overview</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white dark:border-neutral-950 ml-2"></div>
      </div>
    </header>
  );
}
