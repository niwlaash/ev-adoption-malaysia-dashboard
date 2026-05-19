import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import TopNav from '../components/dashboard/TopNav';

export default function DashboardLayout() {
  return (
    <div className="h-screen w-full flex bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-neutral-50/50 dark:bg-neutral-950/50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
