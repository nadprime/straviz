import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { AlgoStep } from "../types";
import { GraphVisualizer } from "./GraphVisualizer";
import { InteractiveVisualizer } from "./InteractiveVisualizer";

interface VisualizerStageProps {
  step: AlgoStep;
  algorithmId: string;
  isDarkMode: boolean;
  zoom: number;
}

export const VisualizerStage: React.FC<VisualizerStageProps> = ({ 
  step, 
  algorithmId, 
  isDarkMode, 
  zoom 
}) => {
  return (
    <div className="visualizer-container w-full h-full min-h-[320px] relative transition-colors duration-300">
      <div className="absolute top-2 left-4 right-4 md:left-6 md:right-6 flex flex-col gap-2 z-20 pointer-events-none">
        <p className="text-[11px] md:text-xs font-bold text-zinc-900 dark:text-white bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-xs md:max-w-2xl transition-all duration-300 leading-tight md:leading-relaxed capitalize pointer-events-auto">
          {step.description}
        </p>
      </div>

      <InteractiveVisualizer 
        step={step} 
        algorithmId={algorithmId} 
        isDarkMode={isDarkMode}
        zoom={zoom}
      />
    </div>
  );
};
