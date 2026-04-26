import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Sidebar } from "./components/Sidebar";
import { LandingPage } from "./components/LandingPage";
import { Footer } from "./components/Footer";
import { VisualizerStage } from "./components/VisualizerStage";
import { CodeSection } from "./components/CodeSection";
import { ALGORITHMS } from "./constants/algorithms";
import { Algorithm, Language, AlgoStep } from "./types";
import { generateBubbleSortSteps, generateInsertionSortSteps, generateLinkedListSteps, generateGraphBFSSteps, generateBinarySearchSteps, generateStackSteps, generateMergeSortSteps, generateQueueSteps, generateBSTSearchSteps, generateSelectionSortSteps, generateQuickSortSteps, generateGraphDFSSteps, generateLinearSearchSteps, generateFibonacciDPSteps, generateHeapSortSteps, generateCountingSortSteps, generateDijkstraSteps, generatePriorityQueueSteps, generateCircularQueueSteps, generateBSTTraversals, generateArraysBasicSteps, generateHashTableSteps, generateBucketSortSteps, generateAVLTreeSteps, generateBTreeSteps, generateBellmanFordSteps, generateKruskalSteps, generatePrimSteps, generateWarshallSteps, generateStrassenSteps, generateDoublyLinkedListSteps, generateCircularLinkedListSteps, generateHuffmanCodingSteps, generateThreadedBinaryTreeSteps, generateKnapsackSteps, generateLCSSteps, generateTopologicalSortSteps, generateAStarSteps, generateKMPSteps, generateSegmentTreeSteps, generateFenwickTreeSteps, generateDSUSteps } from "./services/visualizerService";
import { ComplexityChart } from "./components/ComplexityChart";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Settings2, Moon, Sun, Info, Database, X, LineChart, Binary, ChevronDown, Maximize2, Minimize2, ZoomIn, ZoomOut, Sparkles, Shuffle } from "lucide-react";
import { cn } from "./lib/utils";
import { motion, AnimatePresence } from "motion/react";

const isImplementationAvailable = (code?: string): boolean => {
  if (!code) return false;
  const trimmed = code.trim();
  if (!trimmed) return false;
  // Treat comment-only placeholders as unavailable implementations.
  if (/^(\/\/|#|\/\*)/.test(trimmed)) return false;
  return true;
};

const getPreferredLanguage = (algo: Algorithm): Language => {
  if (isImplementationAvailable(algo.implementations.c)) return "c";
  if (isImplementationAvailable(algo.implementations.cpp)) return "cpp";
  if (isImplementationAvailable(algo.implementations.python)) return "python";
  // Final fallback for unusual cases where all snippets are placeholders.
  return "c";
};

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "visualizer">("landing");
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm>(ALGORITHMS[0]);
  const [language, setLanguage] = useState<Language>(getPreferredLanguage(ALGORITHMS[0]));
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [steps, setSteps] = useState<AlgoStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [inputData, setInputData] = useState("45, 12, 89, 34, 67, 23, 56");
  const [showDatasetModal, setShowDatasetModal] = useState(false);
  const [showComplexityModal, setShowComplexityModal] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const visualizerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      visualizerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // Removed overrides that were closing them on mobile
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initializeSteps = useCallback((algo: Algorithm, data: string) => {
    const arr = data.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (algo.id === "bubble-sort") {
      setSteps(generateBubbleSortSteps(arr));
    } else if (algo.id === "insertion-sort") {
      setSteps(generateInsertionSortSteps(arr));
    } else if (algo.id === "linked-list") {
      setSteps(generateLinkedListSteps(arr));
    } else if (algo.id === "graph-bfs") {
      setSteps(generateGraphBFSSteps('A'));
    } else if (algo.id === "graph-dfs") {
      setSteps(generateGraphDFSSteps('A'));
    } else if (algo.id === "binary-search") {
      // For binary search we use a default target if not specified in input
      const target = arr[arr.length - 1] || 42; 
      setSteps(generateBinarySearchSteps(arr, target));
    } else if (algo.id === "stack") {
      setSteps(generateStackSteps(arr));
    } else if (algo.id === "merge-sort") {
      setSteps(generateMergeSortSteps(arr));
    } else if (algo.id === "queue") {
      setSteps(generateQueueSteps(arr));
    } else if (algo.id === "bst-search") {
      const target = arr[arr.length - 1] || 40;
      setSteps(generateBSTSearchSteps(target));
    } else if (algo.id === "selection-sort") {
      setSteps(generateSelectionSortSteps(arr));
    } else if (algo.id === "quick-sort") {
      setSteps(generateQuickSortSteps(arr));
    } else if (algo.id === "linear-search") {
      const target = arr[arr.length - 1] || 42;
      setSteps(generateLinearSearchSteps(arr, target));
    } else if (algo.id === "fibonacci-dp") {
      const n = Math.min(arr[0] || 10, 20); // Limit to 20 for visibility
      setSteps(generateFibonacciDPSteps(n));
    } else if (algo.id === "heap-sort") {
      setSteps(generateHeapSortSteps(arr));
    } else if (algo.id === "counting-sort") {
      setSteps(generateCountingSortSteps(arr));
    } else if (algo.id === "dijkstra") {
      setSteps(generateDijkstraSteps('A'));
    } else if (algo.id === "priority-queue") {
      setSteps(generatePriorityQueueSteps(arr));
    } else if (algo.id === "circular-queue") {
      setSteps(generateCircularQueueSteps(arr));
    } else if (algo.id === "binary-tree-inorder") {
      setSteps(generateBSTTraversals('in'));
    } else if (algo.id === "binary-tree-preorder") {
      setSteps(generateBSTTraversals('pre'));
    } else if (algo.id === "binary-tree-postorder") {
      setSteps(generateBSTTraversals('post'));
    } else if (algo.id === "arrays-basic") {
      setSteps(generateArraysBasicSteps(arr));
    } else if (algo.id === "hash-table") {
      setSteps(generateHashTableSteps(arr));
    } else if (algo.id === "bucket-sort") {
      setSteps(generateBucketSortSteps(arr));
    } else if (algo.id === "avl-tree") {
      setSteps(generateAVLTreeSteps());
    } else if (algo.id === "b-tree") {
      setSteps(generateBTreeSteps());
    } else if (algo.id === "bellman-ford") {
      setSteps(generateBellmanFordSteps('A'));
    } else if (algo.id === "kruskal") {
      setSteps(generateKruskalSteps());
    } else if (algo.id === "prim") {
      setSteps(generatePrimSteps('A'));
    } else if (algo.id === "warshall") {
      setSteps(generateWarshallSteps());
    } else if (algo.id === "strassen") {
      setSteps(generateStrassenSteps());
    } else if (algo.id === "doubly-linked-list") {
      setSteps(generateDoublyLinkedListSteps(arr));
    } else if (algo.id === "circular-linked-list") {
      setSteps(generateCircularLinkedListSteps(arr));
    } else if (algo.id === "huffman-coding") {
      setSteps(generateHuffmanCodingSteps(arr));
    } else if (algo.id === "threaded-binary-tree") {
      setSteps(generateThreadedBinaryTreeSteps());
    } else if (algo.id === "knapsack-problem") {
      setSteps(generateKnapsackSteps(arr, Math.max(8, Math.min(20, arr[0] || 12))));
    } else if (algo.id === "lcs") {
      const seqA = arr.slice(0, 6).map((n) => String.fromCharCode(65 + (Math.abs(n) % 26))).join("");
      const seqB = arr.slice(1, 7).map((n) => String.fromCharCode(65 + ((Math.abs(n) + 5) % 26))).join("");
      setSteps(generateLCSSteps(seqA || "ABCBD", seqB || "BDCAB"));
    } else if (algo.id === "topological-sort") {
      setSteps(generateTopologicalSortSteps());
    } else if (algo.id === "a-star") {
      setSteps(generateAStarSteps('A', 'F'));
    } else if (algo.id === "kmp-search") {
      const text = arr.map((n) => String.fromCharCode(65 + (Math.abs(n) % 26))).join("") || "ABABACABA";
      const pattern = text.slice(2, 6) || "ABAC";
      setSteps(generateKMPSteps(text, pattern));
    } else if (algo.id === "segment-tree") {
      setSteps(generateSegmentTreeSteps(arr));
    } else if (algo.id === "fenwick-tree") {
      setSteps(generateFenwickTreeSteps(arr));
    } else if (algo.id === "dsu") {
      setSteps(generateDSUSteps());
    } else {
      setSteps([{ array: arr, description: "Algorithm visualization coming soon!", lineIdx: 0 }]);
    }
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    // Apply theme to document element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Initial theme check
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    initializeSteps(selectedAlgo, inputData);
  }, [initializeSteps, selectedAlgo, inputData]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const handleReset = () => {
    initializeSteps(selectedAlgo, inputData);
  };

  const inputTokens = useMemo(() => inputData.split(",").map((x) => x.trim()).filter((x) => x.length > 0), [inputData]);
  const parsedInput = useMemo(() => inputTokens.map((x) => parseInt(x, 10)).filter((x) => !Number.isNaN(x)), [inputTokens]);
  const invalidTokenCount = inputTokens.length - parsedInput.length;

  const estimateOperations = useCallback((n: number, complexity: string) => {
    if (n <= 0) return "0";
    const c = complexity.toLowerCase();
    const logn = Math.max(1, Math.log2(n));
    let ops = n;
    if (c.includes("n²") || c.includes("n^2") || c.includes("n2")) ops = n * n;
    else if (c.includes("n log n") || c.includes("nlogn")) ops = n * logn;
    else if (c.includes("log n") || c.includes("logn")) ops = logn;
    else if (c.includes("v^3") || c.includes("v³")) ops = n * n * n;
    else if (c.includes("v*e") || c.includes("v + e") || c.includes("v+e")) ops = n * n;
    else if (c.includes("n + k")) ops = n * 2;
    return `~${Math.max(1, Math.round(ops)).toLocaleString()} ops`;
  }, []);

  const buildScenarioData = useCallback((mode: "best" | "average" | "worst" | "random") => {
    const length = Math.min(12, Math.max(6, parsedInput.length || 8));
    const base = Array.from({ length }, (_, i) => i + 1);
    const shuffled = [...base].sort(() => Math.random() - 0.5).map((x) => x * 7 + (Math.floor(Math.random() * 5) - 2));

    const sortingIds = new Set(["bubble-sort", "insertion-sort", "selection-sort", "quick-sort", "merge-sort", "heap-sort", "counting-sort", "bucket-sort"]);
    const searchIds = new Set(["binary-search", "linear-search"]);

    let arr: number[] = [];
    if (sortingIds.has(selectedAlgo.id)) {
      if (mode === "best") arr = [...base].map((x) => x * 4);
      else if (mode === "worst") arr = [...base].reverse().map((x) => x * 4);
      else if (mode === "average") arr = [...shuffled];
      else arr = Array.from({ length }, () => Math.floor(Math.random() * 100));
    } else if (searchIds.has(selectedAlgo.id)) {
      const sorted = [...base].map((x) => x * 3);
      const targetBest = sorted[Math.floor(sorted.length / 2)];
      const targetWorst = 999;
      const targetAvg = sorted[Math.floor(sorted.length * 0.75)];
      const targetRandom = sorted[Math.floor(Math.random() * sorted.length)];
      const target = mode === "best" ? targetBest : mode === "worst" ? targetWorst : mode === "average" ? targetAvg : targetRandom;
      arr = [...sorted, target];
    } else {
      arr = mode === "random" ? Array.from({ length }, () => Math.floor(Math.random() * 100)) : [...shuffled];
    }

    return arr.join(", ");
  }, [parsedInput.length, selectedAlgo.id]);

  const applyScenario = useCallback((mode: "best" | "average" | "worst" | "random") => {
    const data = buildScenarioData(mode);
    setInputData(data);
    initializeSteps(selectedAlgo, data);
  }, [buildScenarioData, initializeSteps, selectedAlgo]);

  const currentStep = steps[currentStepIdx] || { array: [], description: "", lineIdx: 0 };
  const progressPercent = steps.length > 1 ? Math.round((currentStepIdx / (steps.length - 1)) * 100) : 0;
  const comparedCount = currentStep.compareIdx?.length || 0;
  const swappedCount = currentStep.swapIdx?.length || 0;
  const highlightedCount = currentStep.highlightIdx?.length || 0;
  const visitedCount = currentStep.visited?.size || 0;
  const totalArrayItems = currentStep.array?.length || 0;

  useEffect(() => {
    let timer: any;
    if (isPlaying && steps.length > 1 && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, speed);
    } else if (isPlaying && currentStepIdx >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length, speed]);

  useEffect(() => {
    initializeSteps(selectedAlgo, inputData);
  }, [selectedAlgo, initializeSteps]);

  const handleAlgoSelect = (algo: Algorithm) => {
    setSelectedAlgo(algo);
    setLanguage(getPreferredLanguage(algo));
    setCurrentView("visualizer");
  };

  return (
    <div className={cn("flex h-screen overflow-hidden", theme)}>
      <AnimatePresence>
        {showDatasetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDatasetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 dark:bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white uppercase flex items-center gap-3">
                  <span className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                     <Database size={18} />
                  </span>
                  Dataset Settings
                </h3>
                <button onClick={() => setShowDatasetModal(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative z-10">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Input Data Array</label>
                   <input 
                      type="text"
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 outline-none text-sm font-semibold text-zinc-700 dark:text-zinc-300 w-full placeholder-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono"
                      placeholder="e.g. 5, 2, 8, 1, 9"
                   />
                   <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest pl-1 mt-1">Comma-separated numbers</p>
                </div>
                <button 
                   onClick={() => {
                     initializeSteps(selectedAlgo, inputData);
                     setShowDatasetModal(false);
                   }}
                   className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-4 rounded-2xl font-black text-sm transition-all uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                >
                   Update Dataset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showComplexityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowComplexityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl max-w-lg w-full relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 dark:bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white uppercase flex items-center gap-3">
                  <span className="p-2 justify-center bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                     <LineChart size={20} />
                  </span>
                  Complexity Analysis
                </h3>
                <button onClick={() => setShowComplexityModal(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative z-10 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 p-2 rounded-full border border-zinc-200 dark:border-zinc-800">
                  <X size={18} />
                </button>
              </div>
              
              <div className="relative z-10">
                <ComplexityChart complexity={selectedAlgo.complexity.time} theme={theme} />
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-1 transition-all hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 group">
                    <div className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase mb-1">Time Complexity</div>
                    <div className="font-mono text-zinc-900 dark:text-white text-xl font-black group-hover:text-indigo-600 transition-colors">{selectedAlgo.complexity.time}</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-1 transition-all hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5 group">
                    <div className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase mb-1">Space Complexity</div>
                    <div className="font-mono text-zinc-900 dark:text-white text-xl font-black group-hover:text-emerald-600 transition-colors">{selectedAlgo.complexity.space}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar 
        onSelectAlgorithm={handleAlgoSelect} 
        onHome={() => setCurrentView("landing")}
        selectedId={currentView === "visualizer" ? selectedAlgo.id : "home"} 
      />
      
      <main className="flex-1 flex flex-col bg-zinc-50 dark:bg-black overflow-hidden relative transition-colors duration-300">
        {/* Floating Theme Toggle */}
        <div className="absolute top-6 right-8 z-[60]">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 shadow-sm hover:shadow-md transition-all active:scale-95 group"
          >
            {theme === "dark" ? (
              <Sun size={18} className="group-hover:text-amber-500 transition-colors" />
            ) : (
              <Moon size={18} className="group-hover:text-indigo-600 transition-colors" />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {currentView === "landing" ? (
            <LandingPage onStart={() => setCurrentView("visualizer")} />
          ) : (
            <div className="pt-24 md:pt-6 p-4 md:p-6 space-y-6">
              {/* Algorithm Header */}
              <div className="max-w-[1600px] mx-auto w-full mb-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
                      {selectedAlgo.name}
                    </h2>
                    <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 rounded-full border border-indigo-100 dark:border-indigo-500/20 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                      {selectedAlgo.category}
                    </div>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium max-w-3xl leading-relaxed tracking-tight">
                    {selectedAlgo.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
                {/* Visualizer Area */}
                <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
                  <div 
                    ref={visualizerRef}
                    className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-colors duration-300 shadow-xl min-h-[300px] md:min-h-[420px] lg:min-h-[440px] relative group/stage"
                  >
                    <VisualizerStage 
                      step={currentStep} 
                      algorithmId={selectedAlgo.id} 
                      isDarkMode={theme === "dark"}
                      zoom={zoom}
                    />

                    {/* Stage Controls Overlay */}
                    <div className="absolute top-24 right-4 flex flex-col gap-2 z-30 opacity-0 group-hover/stage:opacity-100 transition-opacity">
                      <div className="flex flex-col bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg overflow-hidden">
                        <button 
                          onClick={() => setZoom(prev => Math.min(3, prev + 0.1))}
                          className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                          title="Zoom In"
                        >
                          <ZoomIn size={18} />
                        </button>
                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
                        <button 
                          onClick={() => setZoom(1)}
                          className="px-2 py-1 text-[10px] font-black text-indigo-600 dark:text-indigo-400 text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          {Math.round(zoom * 100)}%
                        </button>
                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
                        <button 
                          onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                          className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                          title="Zoom Out"
                        >
                          <ZoomOut size={18} />
                        </button>
                      </div>

                      <button 
                        onClick={toggleFullscreen}
                        className="p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all font-bold"
                      >
                        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                      </button>
                    </div>


                  </div>
                  
                  {/* Controls Section Wrapper */}
                  <div className="flex flex-col gap-2">
                    {isMobile && (
                      <button 
                        onClick={() => setIsControlsOpen(!isControlsOpen)}
                        className="flex items-center justify-between w-full p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                      >
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                          <Settings2 size={14} className="text-indigo-500" />
                          Visualization Controls
                        </span>
                        <ChevronDown size={18} className={cn("text-zinc-400 transition-transform", isControlsOpen ? "rotate-180" : "")} />
                      </button>
                    )}

                    <AnimatePresence>
                      {(isControlsOpen || !isMobile) && (
                        <motion.div 
                          initial={isMobile ? { height: 0, opacity: 0 } : false}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col gap-8 transition-colors duration-300">
                            {/* Main Timeline Seeker */}
                            <div className="w-full flex items-center gap-6 px-2">
                              <div className="flex flex-col min-w-[80px]">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Step</span>
                                <span className="text-xl font-mono font-black text-indigo-600 dark:text-indigo-400 leading-none">
                                  {currentStepIdx + 1}<span className="text-zinc-300 dark:text-zinc-700 mx-1">/</span>{steps.length}
                                </span>
                              </div>
                              
                              <div className="relative flex-1 group/main-timeline">
                                <div className="relative h-3 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
                                  <div 
                                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-100"
                                    style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                                  />
                                </div>
                                <input 
                                  type="range"
                                  min="0"
                                  max={steps.length - 1}
                                  value={currentStepIdx}
                                  onChange={(e) => {
                                    setCurrentStepIdx(parseInt(e.target.value));
                                    setIsPlaying(false);
                                  }}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div 
                                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-indigo-600 dark:border-indigo-500 rounded-full shadow-xl scale-0 group-hover/main-timeline:scale-110 transition-transform pointer-events-none"
                                  style={{ left: `calc(${(currentStepIdx / (steps.length - 1)) * 100}% - 10px)` }}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-8 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 w-full sm:w-auto">
                              <div className="flex flex-col items-center gap-2">
                                <button 
                                  onClick={() => {
                                    if (!isPlaying && currentStepIdx >= steps.length - 1) {
                                      setCurrentStepIdx(0);
                                      setIsPlaying(true);
                                    } else {
                                      setIsPlaying(!isPlaying);
                                    }
                                  }}
                                  className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-2xl shadow-xl shadow-indigo-500/40 transition-all transform active:scale-90"
                                >
                                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                                </button>
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{isPlaying ? "Pause" : "Play"}</span>
                              </div>
                              
                              <div className="flex items-center gap-4 md:gap-6 border-l border-zinc-100 dark:border-zinc-900 pl-4 md:pl-8">
                                <div className="flex flex-col items-center gap-2">
                                  <button 
                                    onClick={handleReset}
                                    className="p-3 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-xl transition-all border border-zinc-100 dark:border-zinc-800"
                                    title="Reset"
                                  >
                                    <RotateCcw size={20} />
                                  </button>
                                  <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Reset</span>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
                                      disabled={currentStepIdx === 0}
                                      className="p-3 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-xl transition-all disabled:opacity-30 border border-zinc-100 dark:border-zinc-800"
                                    >
                                      <ChevronLeft size={20} />
                                    </button>
                                    <button 
                                      onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
                                      disabled={currentStepIdx === steps.length - 1}
                                      className="p-3 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-xl transition-all disabled:opacity-30 border border-zinc-100 dark:border-zinc-800"
                                    >
                                      <ChevronRight size={20} />
                                    </button>
                                  </div>
                                  <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Steps</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto flex-1 sm:justify-end justify-center">
                              <button 
                                onClick={() => setShowDatasetModal(true)}
                                className="p-3 flex-1 sm:flex-none justify-center flex bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-600 dark:text-zinc-300 relative group"
                                title="Dataset Setting"
                              >
                                <Database size={20} />
                              </button>
                              <button 
                                onClick={() => setShowComplexityModal(true)}
                                className="p-3 flex-1 sm:flex-none justify-center flex bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-600 dark:text-zinc-300 relative group"
                                title="Complexity Analysis"
                              >
                                <LineChart size={20} />
                              </button>
                            </div>

                            <div className="flex flex-col w-full sm:w-48 gap-3">
                              <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                                <span>Speed</span>
                                <span className="text-indigo-600 dark:text-indigo-400 font-mono italic">{Math.round((2050 - speed) / 20)}%</span>
                              </div>
                              <div className="relative h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden p-0.5">
                                <input 
                                  type="range" 
                                  min="50" 
                                  max="2000" 
                                  step="50"
                                  value={speed}
                                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                                />
                                <div 
                                  className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                                  style={{ width: `${((speed - 50) / 1950) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Sidebar Info Panel */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Terminal Section Wrapper */}
                  <div className="flex flex-col gap-2">
                    {isMobile && (
                      <button 
                        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                        className="flex items-center justify-between w-full p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                      >
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                          <Binary size={14} className="text-indigo-500" />
                          Implementation Code
                        </span>
                        <ChevronDown size={18} className={cn("text-zinc-400 transition-transform", isTerminalOpen ? "rotate-180" : "")} />
                      </button>
                    )}
                    
                    <AnimatePresence>
                      {(isTerminalOpen || !isMobile) && (
                        <motion.div
                          initial={isMobile ? { height: 0, opacity: 0 } : false}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col gap-6"
                        >
                          <CodeSection 
                            code={selectedAlgo.implementations[language]} 
                            language={language} 
                            algorithmName={selectedAlgo.name}
                            onLanguageChange={setLanguage}
                            highlightLine={currentStep.lineIdx}
                            theme={theme}
                          />

                          <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 shadow-xl transition-colors duration-300 flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <Info size={16} className="text-indigo-500" />
                              <h4 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white italic">Step Insights</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-3">
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Progress</div>
                                <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 leading-none mt-1">{progressPercent}%</div>
                              </div>
                              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-3">
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Code Line</div>
                                <div className="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-none mt-1">{(currentStep.lineIdx ?? 0) + 1}</div>
                              </div>
                              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-3">
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Array Size</div>
                                <div className="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-none mt-1">{totalArrayItems}</div>
                              </div>
                              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-3">
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Visited</div>
                                <div className="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-none mt-1">{visitedCount}</div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">
                                Compare: {comparedCount}
                              </span>
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                                Swap: {swappedCount}
                              </span>
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                                Highlight: {highlightedCount}
                              </span>
                            </div>

                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                              {currentStep.description || "Ready to visualize."}
                            </p>
                          </div>

                          <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 shadow-xl transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-1">
                              <Sparkles size={16} className="text-amber-500" />
                              <h4 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white italic">Smart Assistant</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-3">
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Input Quality</div>
                                <div className="text-sm font-black leading-none mt-1 text-zinc-900 dark:text-zinc-100">
                                  {invalidTokenCount === 0 ? "Valid" : `${invalidTokenCount} invalid`}
                                </div>
                              </div>
                              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-3">
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Est. Work</div>
                                <div className="text-sm font-black leading-none mt-1 text-indigo-600 dark:text-indigo-400">
                                  {estimateOperations(parsedInput.length || 1, selectedAlgo.complexity.time)}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              <button onClick={() => applyScenario("best")} className="px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">Best</button>
                              <button onClick={() => applyScenario("average")} className="px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">Average</button>
                              <button onClick={() => applyScenario("worst")} className="px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300">Worst</button>
                              <button onClick={() => applyScenario("random")} className="px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 inline-flex items-center justify-center gap-1"><Shuffle size={12} />Random</button>
                            </div>

                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                              Apply scenario datasets instantly to stress-test {selectedAlgo.name.toLowerCase()} and compare behavior across best, average, and worst cases.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
