import React from 'react';
import { Github, Twitter, Linkedin, Globe, Shield, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md py-12 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-xl font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white">
              Straviz <span className="text-indigo-600">STUDIO</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium max-w-xs text-center md:text-left">
              The next generation of algorithm visualization for modern developers.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium max-w-xs text-center md:text-left">
              Built with passion by <a href="https://nadprime.pages.dev" className="text-indigo-600 hover:underline">Nadeem Ahmad</a>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center md:text-left w-full md:w-auto">
               <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Resources</span>
                  <a href="https://github.com/nadprime/straviz" className="flex items-center justify-center md:justify-start gap-3 text-zinc-500 hover:text-indigo-600 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 transition-all">
                      <FileText size={16} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Documentation</span>
                  </a>
                  <a href="https://github.com/nadprime/straviz" className="flex items-center justify-center md:justify-start gap-3 text-zinc-500 hover:text-indigo-600 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 transition-all">
                      <Github size={16} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Repository</span>
                  </a>
               </div>
               <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Connect</span>
                  <a href="https://x.com/nadprime" className="flex items-center justify-center md:justify-start gap-3 text-zinc-500 hover:text-indigo-600 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 transition-all">
                      <Twitter size={16} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Twitter</span>
                  </a>
                  <a href="https://www.linkedin.com/in/nadprime" className="flex items-center justify-center md:justify-start gap-3 text-zinc-500 hover:text-indigo-600 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 transition-all">
                      <Linkedin size={16} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
                  </a>
               </div>
               <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Legal</span>
                  <a href="#" className="flex items-center justify-center md:justify-start gap-3 text-zinc-500 hover:text-indigo-600 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 transition-all">
                      <Shield size={16} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Privacy</span>
                  </a>
                  <a href="#" className="flex items-center justify-center md:justify-start gap-3 text-zinc-500 hover:text-indigo-600 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 transition-all">
                      <Globe size={16} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Terms</span>
                  </a>
               </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                © 2026 Straviz
            </div>
            <div className="flex gap-6">
                <Github size={16} className="text-zinc-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                <Twitter size={16} className="text-zinc-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                <Globe size={16} className="text-zinc-400 hover:text-indigo-600 cursor-pointer transition-colors" />
            </div>
        </div>
      </div>
    </footer>
  );
};
