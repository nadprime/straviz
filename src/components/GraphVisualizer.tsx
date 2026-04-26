import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { AlgoStep } from "../types";

interface GraphVisualizerProps {
  step: AlgoStep;
}

const DEFAULT_NODES = {
  'A': { x: 200, y: 80, label: 'A' },
  'B': { x: 100, y: 180, label: 'B' },
  'C': { x: 300, y: 180, label: 'C' },
  'D': { x: 50, y: 280, label: 'D' },
  'E': { x: 150, y: 280, label: 'E' },
  'F': { x: 300, y: 280, label: 'F' },
};

const DEFAULT_EDGES: [string, string][] = [
  ['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'F']
];

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ step }) => {
  const nodes = step.graphData?.nodes || DEFAULT_NODES;
  const edges = step.graphData?.edges || DEFAULT_EDGES;

  return (
    <svg width="100%" height="400" viewBox="0 0 400 400" className="bg-transparent">
      {/* Edges */}
      {edges.map(([u, v], i) => {
        const isEdgeVisited = step.visited?.has(u) && step.visited?.has(v);
        const uNode = nodes[u];
        const vNode = nodes[v];
        if (!uNode || !vNode) return null;
        return (
          <line
            key={`edge-${i}`}
            x1={uNode.x}
            y1={uNode.y}
            x2={vNode.x}
            y2={vNode.y}
            strokeWidth={2}
            className={cn(
              "transition-colors duration-500",
              isEdgeVisited ? "stroke-indigo-600 dark:stroke-indigo-400 stroke-2" : "stroke-zinc-200 dark:stroke-zinc-800"
            )}
          />
        );
      })}

      {/* Nodes */}
      {Object.entries(nodes).map(([id, pos]) => {
        const isVisited = step.visited?.has(id);
        const isCurrent = step.current === id;

        return (
          <g key={id}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={20}
              initial={false}
              animate={{ 
                scale: isCurrent ? 1.3 : 1,
                fill: isCurrent ? "#6366f1" : isVisited ? "#10b981" : "#ffffff"
              }}
              className={cn(
                "stroke-2 transition-all duration-300",
                isCurrent ? "stroke-white dark:stroke-zinc-950 shadow-xl" : 
                isVisited ? "stroke-emerald-600 dark:stroke-emerald-400" : 
                "stroke-zinc-300 dark:stroke-zinc-800 dark:fill-zinc-950"
              )}
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dy=".3em"
              className={cn(
                "text-[12px] font-bold pointer-events-none font-mono transition-colors duration-300",
                isCurrent ? "fill-white dark:fill-black" :
                isVisited ? "fill-white dark:fill-black" : "fill-zinc-500 dark:fill-zinc-600"
              )}
            >
              {pos.label || id}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
