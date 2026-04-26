import React, { useState, useEffect } from "react";
import { 
  Menu, X, Search, Layers, Database, GitBranch, Share2, 
  PlayCircle, ChevronDown, ChevronRight, Binary, Network, 
  AlignJustify, Split, ArrowDownNarrowWide, ListOrdered, GitCommitVertical,
  Home, Sun, Moon
} from "lucide-react";
import { ALGORITHMS } from "../constants/algorithms";
import { Algorithm } from "../types";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface SidebarProps {
  onSelectAlgorithm: (algo: Algorithm) => void;
  onHome: () => void;
  selectedId: string;
}

const ICON_MAP: Record<string, any> = {
  Search,
  Layers,
  Database,
  GitBranch,
  Share2,
  PlayCircle,
  Binary,
  Network,
  AlignJustify,
  Split,
  ArrowDownNarrowWide,
  ListOrdered,
  GitCommitVertical
};

const CATEGORIES = [
  { name: "Sorting", icon: Layers },
  { name: "Searching", icon: Search },
  { name: "Linked List", icon: GitBranch },
  { name: "Stack & Queue", icon: Database },
  { name: "Trees", icon: Share2 },
  { name: "Graphs", icon: PlayCircle },
  { name: "Dynamic Programming", icon: Binary },
  { name: "Advanced Data Structures", icon: Network },
  { name: "Data Structures", icon: Layers },
] as const;

export const Sidebar: React.FC<SidebarProps> = ({ 
  onSelectAlgorithm, 
  onHome, 
  selectedId,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Sorting", "Searching", "Data Structures", "Graphs"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCategory = (catName: string) => {
    setExpandedCategories(prev => 
      prev.includes(catName) 
        ? prev.filter(c => c !== catName) 
        : [...prev, catName]
    );
  };

  const getAlgorithmIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName] || Layers;
    return <IconComponent size={18} />;
  };

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 280 : (isMobile ? 0 : 80),
          x: isMobile && !isOpen ? -280 : 0
        }}
        className={cn(
          "h-[100dvh] bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800 flex flex-col relative sticky top-0 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden",
          isMobile ? "fixed left-0 z-[100]" : "z-50"
        )}
      >
        <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide px-3 w-[280px]">
          {/* Top Toggle Section */}
          <div className={cn("flex items-center", isOpen ? "justify-between px-2" : "justify-center w-[54px]")}>
            {isOpen && (
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
                <span className="font-black tracking-tighter text-lg uppercase italic">Straviz</span>
              </div>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="shrink-0 p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-all text-zinc-400 hover:text-indigo-600 active:scale-95 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {isOpen && (
            <>
              {/* Navigation Section */}
              <div className="space-y-2">
                <h3 className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Main Navigation</h3>
                <button
                  onClick={() => {
                    onHome();
                    if(isMobile) setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all group relative overflow-hidden",
                    selectedId === "home" 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  )}
                >
                  <Home size={20} className={cn(selectedId === "home" ? "opacity-100" : "opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all")} />
                  <span className="font-bold tracking-tight">Overview</span>
                </button>
              </div>

              {/* Algorithm Categories */}
              <div className="space-y-6">
                <h3 className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Algorithms</h3>
                
                {CATEGORIES.map((cat) => {
                  const catAlgorithms = ALGORITHMS.filter(a => a.category === cat.name);
                  if (catAlgorithms.length === 0) return null;

                  const isExpanded = expandedCategories.includes(cat.name);

                  return (
                    <div key={cat.name} className="space-y-1">
                      <button 
                        onClick={() => toggleCategory(cat.name)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group",
                          isExpanded ? "text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <cat.icon size={16} className={cn("transition-colors", isExpanded ? "text-indigo-600" : "group-hover:text-indigo-500")} />
                          <span className="text-xs font-bold tracking-tight">{cat.name}</span>
                        </div>
                        <ChevronDown size={14} className={cn("transition-transform duration-300", !isExpanded && "-rotate-90")} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 pl-4 border-l border-zinc-100 dark:border-zinc-800 space-y-1 mt-1"
                          >
                            {catAlgorithms.map((algo) => (
                              <button
                                key={algo.id}
                                onClick={() => {
                                  onSelectAlgorithm(algo);
                                  if(isMobile) setIsOpen(false);
                                }}
                                className={cn(
                                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all group relative",
                                  selectedId === algo.id 
                                    ? "text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-500/10" 
                                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                                )}
                              >
                                <div className={cn(
                                  "w-1.5 h-1.5 rounded-full transition-all shrink-0",
                                  selectedId === algo.id ? "bg-indigo-600 scale-125" : "bg-zinc-300 dark:bg-zinc-700 group-hover:bg-indigo-500"
                                )} />
                                <span className="truncate tracking-tight">{algo.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </motion.aside>
      
      {/* Mobile toggle button if closed */}
      {isMobile && !isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-40 p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl shadow-lg transition-all text-zinc-900 dark:text-white active:scale-95 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

const Tooltip: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="group relative flex justify-center w-full">
    {children}
    <div className="absolute left-full ml-4 px-3 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-xl font-sans">
      {title}
      <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-zinc-900 dark:border-r-zinc-100" />
    </div>
  </div>
);
