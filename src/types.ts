export type Language = 'c' | 'cpp' | 'java' | 'javascript' | 'python';

export interface AlgoStep {
  array?: number[];
  highlightIdx?: number[];
  swapIdx?: number[];
  compareIdx?: number[];
  sortedIdx?: number[];
  lineIdx?: number;
  description?: string;
  // Node pointer visualization
  nodes?: any[];
  edges?: any[];
  // Graph specific
  visited?: Set<string>;
  current?: string;
  graphData?: {
    nodes: { [id: string]: { x: number, y: number, label: string } };
    edges: [string, string][];
  };
}

export interface Algorithm {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: string;
  complexity: {
    time: string;
    space: string;
  };
  implementations: Record<Language, string>;
}

export interface VisualizerProps {
  data: any;
  currentStep: number;
  steps: AlgoStep[];
}
