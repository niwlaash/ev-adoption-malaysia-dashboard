import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden w-full">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-neutral-300 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          Live DOSM API Integration
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Malaysia's Transition to <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Sustainable Transport
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-neutral-400 max-w-3xl mb-10"
        >
          Explore interactive, high-performance datasets tracking EV, Hybrid, and Petrol vehicle registrations across the nation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/dashboard"
            className="group px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Enter Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-20 left-[10%] hidden lg:block">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-sm text-neutral-400">EV Adoption</p>
              <p className="text-xl font-bold">+145%</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-40 right-[10%] hidden lg:block">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="p-3 bg-purple-500/10 rounded-full text-purple-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-sm text-neutral-400">Monthly Avg</p>
              <p className="text-xl font-bold">12K Reg</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
