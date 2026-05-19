import { LayoutDashboard, TrendingUp, Search, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'EV Trends', path: '/dashboard/trends', icon: TrendingUp },
  { name: 'Vehicle Comparison', path: '/dashboard/compare', icon: Search },
  { name: 'About', path: '/dashboard/about', icon: Info },
];

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col h-full sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800">
        <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          EV Analytics
        </span>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto hidden-scrollbar">
        {(navItems || []).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <NavLink 
          to="/"
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Exit Dashboard
        </NavLink>
      </div>
    </aside>
  );
}
