import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Box, PlayCircle, Code2, Sparkles, Database, Layout } from 'lucide-react';
import { Footer } from './Footer';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-full flex flex-col items-center bg-white dark:bg-black text-zinc-900 dark:text-white relative overflow-x-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-50/50 dark:bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[0%] right-[-10%] w-[60%] h-[60%] bg-emerald-50/50 dark:bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center z-10 w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-8 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-500/20"
        >
          <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Next-Gen Visualization</span>
        </motion.div>

        <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter mb-8 leading-[0.8] mix-blend-exclusion dark:mix-blend-normal">
          STRAVIZ<br/>
          <span className="text-indigo-600 dark:text-indigo-500 italic font-serif">STUDIO</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 mb-16 max-w-3xl font-medium leading-relaxed tracking-tight">
          Deconstruct complexity. Visualize logic. Master the fundamentals of computer science through high-fidelity, interactive algorithm playback.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px rgba(79, 70, 229, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="flex items-center justify-center gap-4 bg-indigo-600 hover:bg-indigo-500 text-white px-10 md:px-14 py-6 md:py-7 w-full md:w-auto rounded-3xl md:rounded-[2rem] font-black text-lg md:text-xl shadow-2xl shadow-indigo-500/20 transition-all uppercase tracking-[0.2em]"
          >
            Get Started
            <ChevronRight size={28} />
          </motion.button>
          
          <button className="px-10 py-6 md:py-7 w-full md:w-auto text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            Documentation
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 md:mt-40 w-full px-4 md:px-0">
           <FeatureCard
            icon={<PlayCircle size={28} className="text-indigo-600" />}
            title="Step-by-Step Clarity"
            desc="Control execution speed and jump between specific logic steps mapped directly to code."
           />
           <FeatureCard
            icon={<Database size={28} className="text-emerald-500" />}
            title="Dynamic Data Injection"
            desc="Test your algorithms with custom inputs and witness real-time structural adaptations."
           />
           <FeatureCard
            icon={<Code2 size={28} className="text-indigo-500" />}
            title="Polyglot Support"
            desc="Switch implementation languages instantly between C, C++, Java, JS, and Python."
           />
        </div>

        <div className="mt-24 md:mt-40 w-full p-2 md:p-1 transition-all">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 md:p-16 rounded-3xl md:rounded-[4rem] border border-zinc-100 dark:border-zinc-800 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <PlayCircle size={120} />
               </div>
               <div className="relative z-10 flex flex-col items-center text-center">
                  <h3 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 md:mb-8 tracking-tighter">Ready to Build Better?</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed mb-10 md:mb-12">
                    Straviz is the premier tool for engineers and students who demand visual precision. Experience the raw beauty of logic in motion.
                  </p>
                  <button 
                    onClick={onStart}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-sm hover:gap-4 transition-all"
                  >
                    Launch Studio Now <ChevronRight size={18} />
                  </button>
               </div>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-black p-8 rounded-3xl border border-zinc-100 dark:border-zinc-900 shadow-xl flex flex-col items-center text-center transition-colors duration-300"
  >
    <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{desc}</p>
  </motion.div>
);
