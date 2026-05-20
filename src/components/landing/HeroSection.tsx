import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden w-full bg-neutral-950">
      {/* Dynamic Animated Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, -45, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3 h-3" />
          Powered by Python & DOSM Data
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
        >
          MAKING SENSE OF <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent italic">
            MALAYSIA'S ROADS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed"
        >
          Experience the most advanced vehicle registration dashboard.
          Real-time analytics for the sustainable transport transition across every state.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:row gap-4"
        >
          <Link
            to="/dashboard"
            className="group relative px-10 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-all flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            START ANALYZING
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Floating Metrics Badge - EV adoption */}
        <div className="absolute top-20 left-[12%] hidden xl:block">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl flex items-center gap-4"
          >
            <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Growth</p>
              <p className="text-2xl font-black text-white">142%</p>
            </div>
          </motion.div>
        </div>

        {/* Floating Metrics Badge - Scale */}
        <div className="absolute bottom-40 right-[12%] hidden xl:block">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl flex items-center gap-4"
          >
            <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Datasets</p>
              <p className="text-2xl font-black text-white">1.1M Rows</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
