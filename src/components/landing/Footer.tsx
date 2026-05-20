import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">EV Analytics Dashboard</h3>
          <p className="text-sm max-w-md mb-6">
            A professional analytics platform built to visualize open data from the Department of Statistics Malaysia (DOSM) regarding vehicle registration adoption metrics.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm flex flex-col">
            <a href="https://data.gov.my/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">DOSM Open Data</a>
            <a href="https://github.com/niwlaash" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Developer GitHub</a>
            <a href="https://www.linkedin.com/in/alwin-ashraf-nor-azmil-4628a9223/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Developer LinkedIn</a>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">System</h4>
          <ul className="space-y-2 text-sm flex flex-col">
            <Link to="/contact" className="hover:text-white transition-colors">Contact Developer</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-800 text-sm flex flex-col md:flex-row justify-between items-center text-neutral-500">
        <p>&copy; {new Date().getFullYear()} Alwin Ashraf. All rights reserved.</p>
        <p>Built with React & Vite.</p>
      </div>
    </footer>
  );
}
