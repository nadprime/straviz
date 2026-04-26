import React, { useMemo } from "react";
import { ChevronDown, Code2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Language } from "../types";
import { cn } from "../lib/utils";

interface CodeSectionProps {
  code: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  highlightLine?: number;
  theme: "dark" | "light";
}

export const CodeSection: React.FC<CodeSectionProps> = ({ code, language, onLanguageChange, highlightLine, theme }) => {
  const isDark = theme === "dark";
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (highlightLine !== undefined && highlightLine >= 0 && containerRef.current) {
      const parent = containerRef.current;
      const lines = parent.querySelectorAll(".code-line");
      const activeLine = lines[highlightLine] as HTMLElement;
      if (activeLine) {
        const containerHeight = parent.clientHeight;
        const lineTop = activeLine.offsetTop;
        const lineHeight = activeLine.clientHeight;
        
        parent.scrollTo({
          top: lineTop - (containerHeight / 2) + (lineHeight / 2),
          behavior: "smooth"
        });
      }
    }
  }, [highlightLine]);

  // Using a custom style object to override background and padding
  const customStyle = {
    margin: 0,
    padding: "32px 0",
    fontSize: "14px",
    background: "transparent",
    lineHeight: "1.7",
    fontFamily: "'JetBrains Mono', monospace",
    minWidth: "max-content",
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-zinc-50/80 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/20" />
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/20" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
          </div>
          
          <div className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700" />
          
          <div className="flex items-center gap-2">
             <Code2 size={16} className="text-indigo-500" />
             <span className="text-xs font-black text-zinc-600 dark:text-zinc-200 font-mono tracking-tight">
               {language}_implementation.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language}
             </span>
          </div>
        </div>

        <div className="relative">
          <select 
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg pl-3 pr-8 py-1.5 text-xs font-black text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer outline-none appearance-none shadow-sm uppercase tracking-widest"
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="javascript">JS</option>
            <option value="python">PY</option>
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Code Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto code-mono scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent relative"
      >
        <SyntaxHighlighter
          key={`${language}-${theme}`}
          language={language === "javascript" ? "javascript" : language}
          style={isDark ? vscDarkPlus : oneLight}
          customStyle={customStyle}
          showLineNumbers={true}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const isHighlighted = lineNumber === (highlightLine ?? -1) + 1;
            return {
              className: cn(
                "code-line transition-all duration-200",
                isHighlighted && "relative z-10"
              ),
              style: {
                display: "block",
                width: "100%",
                minWidth: "100%",
                backgroundColor: isHighlighted ? (isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.2)") : "transparent",
                borderLeft: isHighlighted ? "5px solid #6366f1" : "5px solid transparent",
                paddingLeft: "28px",
                paddingRight: "28px",
                boxShadow: isHighlighted ? (isDark ? "inset 0 0 30px rgba(99, 102, 241, 0.2)" : "inset 0 0 30px rgba(99, 102, 241, 0.1)") : "none",
              },
            };
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
