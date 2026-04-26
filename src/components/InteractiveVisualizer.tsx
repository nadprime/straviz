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
    const hasGraphOrNodes = !!step.graphData || !!step.nodes;
    if (hasGraphOrNodes || !step.array || step.array.length === 0) return null;

    const barWidth = Math.min(40, (dimensions.width - 100) / step.array.length);
    const spacing = 4;
    const numericValues = step.array.map((v) => (typeof v === "number" ? v : 0));
    const minVal = Math.min(...numericValues, 0);
    const maxVal = Math.max(...numericValues, 1);
    const valueRange = Math.max(1, maxVal - minVal);
    const maxHeight = dimensions.height - 150;
    const startX = (dimensions.width - (step.array.length * (barWidth + spacing))) / 2;

    return step.array.map((val, idx) => {
      const numericVal = typeof val === "number" ? val : 0;
      const barHeight = Math.max(6, ((numericVal - minVal) / valueRange) * maxHeight);
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
            text={val == null ? "-" : String(val)}
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
    if (!step.graphData) return null;
    
    const nodes = step.graphData?.nodes || {};
    const edges = step.graphData?.edges || [];
    const edgeWeights = step.graphData?.edgeWeights || {};
    const directed = !!step.graphData?.directed;

    const getEdgeWeight = (u: string, v: string) => {
      const keyA = `${u}->${v}`;
      const keyB = `${v}->${u}`;
      const undirectedA = `${u}-${v}`;
      const undirectedB = `${v}-${u}`;
      return edgeWeights[keyA] ?? edgeWeights[keyB] ?? edgeWeights[undirectedA] ?? edgeWeights[undirectedB];
    };
    
    return (
      <Group>
        {edges.map(([u, v], i) => {
          const uNode = nodes[u];
          const vNode = nodes[v];
          if (!uNode || !vNode) return null;
          
          const isEdgeVisited = step.visited?.has(u) && step.visited?.has(v);
          
          const dx = vNode.x - uNode.x;
          const dy = vNode.y - uNode.y;
          const length = Math.max(1, Math.hypot(dx, dy));
          const ux = dx / length;
          const uy = dy / length;
          const startX = uNode.x + ux * 20;
          const startY = uNode.y + uy * 20;
          const endX = vNode.x - ux * 20;
          const endY = vNode.y - uy * 20;
          const weight = getEdgeWeight(u, v);
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          const arrowSize = 7;
          const leftX = endX - ux * arrowSize - uy * (arrowSize * 0.7);
          const leftY = endY - uy * arrowSize + ux * (arrowSize * 0.7);
          const rightX = endX - ux * arrowSize + uy * (arrowSize * 0.7);
          const rightY = endY - uy * arrowSize - ux * (arrowSize * 0.7);

          return (
            <Group key={i}>
              <Line
                points={[startX, startY, endX, endY]}
                stroke={isEdgeVisited ? (isDarkMode ? "#818cf8" : "#4f46e5") : (isDarkMode ? "#27272a" : "#e4e4e7")}
                strokeWidth={2}
              />
              {directed && (
                <Line
                  points={[leftX, leftY, endX, endY, rightX, rightY]}
                  stroke={isEdgeVisited ? (isDarkMode ? "#818cf8" : "#4f46e5") : (isDarkMode ? "#52525b" : "#a1a1aa")}
                  strokeWidth={2}
                  lineCap="round"
                  lineJoin="round"
                />
              )}
              {typeof weight === "number" && (
                <>
                  <Rect
                    x={midX - 10}
                    y={midY - 8}
                    width={20}
                    height={16}
                    cornerRadius={8}
                    fill={isDarkMode ? "#09090b" : "#ffffff"}
                    stroke={isDarkMode ? "#27272a" : "#d4d4d8"}
                    strokeWidth={1}
                  />
                  <Text
                    x={midX - 10}
                    y={midY - 5}
                    width={20}
                    text={String(weight)}
                    align="center"
                    fontSize={10}
                    fill={isDarkMode ? "#d4d4d8" : "#3f3f46"}
                    fontStyle="bold"
                  />
                </>
              )}
            </Group>
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
    const isDoubly = algorithmId === "doubly-linked-list";
    const isCircular = algorithmId === "circular-linked-list";
    
    const startX = 100;
    const startY = dimensions.height / 2;
    const spacing = 120;

    return step.nodes.map((node, i) => {
      const x = startX + i * spacing;
      const y = startY;

      return (
        <Group key={node.id}>
          {i < step.nodes!.length - 1 && (
            <>
              <Line
                points={[x + 40, y, x + spacing - 40, y]}
                stroke={isDarkMode ? "#27272a" : "#e4e4e7"}
                strokeWidth={4}
              />
              {isDoubly && (
                <Line
                  points={[x + spacing - 40, y + 14, x + 40, y + 14]}
                  stroke={isDarkMode ? "#4f46e5" : "#6366f1"}
                  strokeWidth={2}
                  dash={[6, 4]}
                />
              )}
            </>
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

          {isCircular && i === step.nodes!.length - 1 && step.nodes!.length > 1 && (
            <>
              <Line
                points={[
                  x + 30,
                  y,
                  x + 70,
                  y - 90,
                  startX - 70,
                  y - 90,
                  startX - 30,
                  y,
                ]}
                stroke={isDarkMode ? "#22d3ee" : "#0891b2"}
                strokeWidth={3}
                lineCap="round"
                lineJoin="round"
                tension={0.2}
              />
              <Text
                x={startX - 84}
                y={y - 112}
                width={120}
                text="tail -> head"
                align="center"
                fontSize={10}
                fill={isDarkMode ? "#67e8f9" : "#0e7490"}
                fontStyle="bold"
              />
            </>
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
