import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Line, Circle, Group } from "react-konva";
import { AlgoStep } from "../types";
import { cn } from "../lib/utils";

interface InteractiveVisualizerProps {
  step: AlgoStep;
  algorithmId: string;
  isDarkMode: boolean;
  zoom: number;
}

export const InteractiveVisualizer: React.FC<InteractiveVisualizerProps> = ({ 
  step, 
  algorithmId, 
  isDarkMode,
  zoom 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  const renderArray = () => {
    if (!step.array || step.array.length === 0) return null;
    
    const barWidth = Math.min(40, (dimensions.width - 100) / step.array.length);
    const spacing = 4;
    const maxVal = Math.max(...step.array, 1);
    const maxHeight = dimensions.height - 150;
    const startX = (dimensions.width - (step.array.length * (barWidth + spacing))) / 2;

    return step.array.map((val, idx) => {
      const barHeight = (val / maxVal) * maxHeight;
      const x = startX + idx * (barWidth + spacing);
      const y = dimensions.height - barHeight - 40;

      const isComparing = step.compareIdx?.includes(idx);
      const isSwapping = step.swapIdx?.includes(idx);
      const isSorted = step.sortedIdx?.includes(idx);
      const isHighlight = step.highlightIdx?.includes(idx);

      let color = isDarkMode ? "#27272a" : "#f4f4f5";
      if (isComparing) color = "#22d3ee";
      if (isSwapping) color = "#f43f5e";
      if (isSorted) color = "#10b981";
      if (isHighlight) color = "#4f46e5";

      return (
        <Group key={idx}>
          <Rect
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill={color}
            cornerRadius={[8, 8, 0, 0]}
            shadowBlur={isHighlight || isComparing || isSwapping || isSorted ? 10 : 0}
            shadowColor={color}
            shadowOpacity={0.4}
          />
          <Text
            x={x}
            y={y - 20}
            width={barWidth}
            text={val.toString()}
            align="center"
            fontSize={10}
            fill={isDarkMode ? "#a1a1aa" : "#71717a"}
            fontStyle="bold"
          />
        </Group>
      );
    });
  };

  const renderGraph = () => {
    if (!step.current && !step.graphData) return null;
    
    const nodes = step.graphData?.nodes || {};
    const edges = step.graphData?.edges || [];
    
    return (
      <Group>
        {edges.map(([u, v], i) => {
          const uNode = nodes[u];
          const vNode = nodes[v];
          if (!uNode || !vNode) return null;
          
          const isEdgeVisited = step.visited?.has(u) && step.visited?.has(v);
          
          return (
            <Line
              key={i}
              points={[uNode.x, uNode.y, vNode.x, vNode.y]}
              stroke={isEdgeVisited ? (isDarkMode ? "#818cf8" : "#4f46e5") : (isDarkMode ? "#27272a" : "#e4e4e7")}
              strokeWidth={2}
            />
          );
        })}
        {Object.entries(nodes).map(([id, pos]) => {
          const isVisited = step.visited?.has(id);
          const isCurrent = step.current === id;

          let color = isDarkMode ? "#09090b" : "#ffffff";
          if (isCurrent) color = "#6366f1";
          else if (isVisited) color = "#10b981";

          return (
            <Group key={id}>
              <Circle
                x={pos.x}
                y={pos.y}
                radius={20}
                fill={color}
                stroke={isCurrent ? "#ffffff" : (isDarkMode ? "#27272a" : "#d4d4d8")}
                strokeWidth={2}
                shadowBlur={isCurrent ? 15 : 0}
                shadowColor="#6366f1"
              />
              <Text
                x={pos.x - 10}
                y={pos.y - 6}
                width={20}
                text={pos.label || id}
                align="center"
                fontSize={12}
                fill={isCurrent || (isVisited && !isDarkMode) ? (isDarkMode ? "#000" : "#fff") : (isDarkMode ? "#a1a1aa" : "#71717a")}
                fontStyle="bold"
              />
            </Group>
          );
        })}
      </Group>
    );
  };

  const renderNodes = () => {
    if (!step.nodes) return null;
    
    const startX = 100;
    const startY = dimensions.height / 2;
    const spacing = 120;

    return step.nodes.map((node, i) => {
      const x = startX + i * spacing;
      const y = startY;

      return (
        <Group key={node.id}>
          {i < step.nodes!.length - 1 && (
            <Line
              points={[x + 40, y, x + spacing - 40, y]}
              stroke={isDarkMode ? "#27272a" : "#e4e4e7"}
              strokeWidth={4}
            />
          )}
          <Rect
            x={x - 30}
            y={y - 30}
            width={60}
            height={60}
            fill={isDarkMode ? "#18181b" : "#fff"}
            stroke={isDarkMode ? "#27272a" : "#e4e4e7"}
            strokeWidth={2}
            cornerRadius={12}
          />
          <Text
            x={x - 30}
            y={y - 10}
            width={60}
            text={node.value.toString()}
            align="center"
            fontSize={16}
            fill={isDarkMode ? "#fff" : "#000"}
            fontStyle="bold"
          />
          {i === 0 && (
            <Text
              x={x - 30}
              y={y - 60}
              width={60}
              text="POINTER"
              align="center"
              fontSize={10}
              fill="#6366f1"
              fontStyle="bold"
            />
          )}
        </Group>
      );
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300 pointer-events-auto"
    >
      {dimensions.width > 0 && (
        <Stage 
          width={dimensions.width} 
          height={dimensions.height}
          draggable
          scaleX={zoom}
          scaleY={zoom}
          onWheel={(e) => {
            // Optional: Mouse wheel zoom could be added here
          }}
        >
          <Layer>
            <Group
               x={dimensions.width / 2 * (1 - zoom)}
               y={dimensions.height / 2 * (1 - zoom)}
            >
              {renderArray()}
              {renderGraph()}
              {renderNodes()}
            </Group>
          </Layer>
        </Stage>
      )}
    </div>
  );
};
