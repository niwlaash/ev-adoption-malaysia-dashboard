import { type ReactNode } from 'react';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';

export default function LegalLayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-300 font-sans selection:bg-purple-500/30 selection:text-white">
      <header className="py-12 border-b border-neutral-900 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <a href="/" className="text-white font-bold text-xl flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-500"></div>
            EV Analytics
          </a>
          <a href="/" className="text-sm hover:text-white transition-colors">Back to Home</a>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12">{title}</h1>
          <div className="prose prose-invert prose-neutral max-w-none prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white">
            {children}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
