import { AlgoStep } from "../types";

const MOCK_GRAPH_DATA = {
  nodes: {
    'A': { x: 200, y: 50, label: 'A' },
    'B': { x: 100, y: 150, label: 'B' },
    'C': { x: 300, y: 150, label: 'C' },
    'D': { x: 50, y: 250, label: 'D' },
    'E': { x: 150, y: 250, label: 'E' },
    'F': { x: 300, y: 250, label: 'F' },
  },
  links: [
    { source: 'A', target: 'B' }, { source: 'A', target: 'C' },
    { source: 'B', target: 'D' }, { source: 'B', target: 'E' },
    { source: 'C', target: 'F' }, { source: 'E', target: 'F' }
  ]
};

export const generateBubbleSortSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({ 
    array: [...arr], 
    highlightIdx: [], 
    description: "Starting Bubble Sort...",
    lineIdx: 0
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ 
        array: [...arr], 
        compareIdx: [j, j + 1], 
        description: `Comparing ${arr[j]} and ${arr[j+1]}`,
        lineIdx: 3
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ 
          array: [...arr], 
          swapIdx: [j, j + 1], 
          description: `Swapping ${arr[j+1]} and ${arr[j]}`,
          lineIdx: 5
        });
      }
    }
    steps.push({ 
      array: [...arr], 
      sortedIdx: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
      description: `Largest element moved to the end`,
      lineIdx: 2
    });
  }

  steps.push({ 
    array: [...arr], 
    sortedIdx: Array.from({ length: n }, (_, k) => k),
    description: "Array is fully sorted!",
    lineIdx: 0
  });

  return steps;
};

export const generateInsertionSortSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({ array: [...arr], description: "Starting Insertion Sort...", lineIdx: 0 });

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    steps.push({ array: [...arr], highlightIdx: [i], description: `Picking ${key} as key`, lineIdx: 1 });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({ array: [...arr], compareIdx: [j, j + 1], description: `Shifting ${arr[j]} to the right`, lineIdx: 4 });
      j = j - 1;
    }
    arr[j + 1] = key;
    steps.push({ array: [...arr], swapIdx: [j + 1], description: `Inserting ${key} at index ${j + 1}`, lineIdx: 7 });
  }

  steps.push({ array: [...arr], sortedIdx: Array.from({ length: n }, (_, k) => k), description: "Sorting complete!", lineIdx: 0 });
  return steps;
};

export const generateLinkedListSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const nodes: any[] = [];
  
  steps.push({ description: "Initializing Linked List...", nodes: [] });

  inputArray.forEach((val, i) => {
    nodes.unshift({ id: `node-${i}`, value: val });
    steps.push({ 
      description: `Inserting ${val} at the head`,
      nodes: [...nodes],
      lineIdx: 6
    });
  });

  return steps;
};

export const generateGraphBFSSteps = (startNode: string): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const visited = new Set<string>();
  const queue = [startNode];
  const adj: any = { 'A': ['B', 'C'], 'B': ['A', 'D', 'E'], 'C': ['A', 'F'], 'D': ['B'], 'E': ['B', 'F'], 'F': ['C', 'E'] };
  const graphData = {
    nodes: MOCK_GRAPH_DATA.nodes,
    edges: MOCK_GRAPH_DATA.links.map((l) => [l.source, l.target]) as [string, string][],
  };

  visited.add(startNode);
  steps.push({ current: startNode, visited: new Set(visited), description: "Starting BFS from node A", lineIdx: 0, graphData });

  while (queue.length > 0) {
    const curr = queue.shift()!;
    steps.push({ current: curr, visited: new Set(visited), description: `Processing node ${curr}`, lineIdx: 6, graphData });

    for (const neighbor of adj[curr]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        steps.push({ current: curr, visited: new Set(visited), description: `Visiting neighbor ${neighbor}`, lineIdx: 10, graphData });
      }
    }
  }

  return steps;
};

export const generateBinarySearchSteps = (inputArray: number[], target: number): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray].sort((a, b) => a - b);
  const n = arr.length;

  steps.push({ array: [...arr], description: "Starting Binary Search (Pre-sorted array)...", lineIdx: 0 });

  let l = 0, r = n - 1;
  while (l <= r) {
    let m = Math.floor(l + (r - l) / 2);
    steps.push({ 
      array: [...arr], 
      compareIdx: [m], 
      highlightIdx: Array.from({ length: r - l + 1 }, (_, i) => l + i),
      description: `Mid element is ${arr[m]}. Target is ${target}`,
      lineIdx: 2
    });

    if (arr[m] === target) {
      steps.push({ array: [...arr], sortedIdx: [m], description: `Found ${target} at index ${m}!`, lineIdx: 3 });
      return steps;
    }
    if (arr[m] < target) {
      l = m + 1;
      steps.push({ array: [...arr], description: `${arr[m]} < ${target}, searching right half`, lineIdx: 4 });
    } else {
      r = m - 1;
      steps.push({ array: [...arr], description: `${arr[m]} > ${target}, searching left half`, lineIdx: 5 });
    }
  }

  steps.push({ array: [...arr], description: `${target} not found in array`, lineIdx: 7 });
  return steps;
};

export const generateStackSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const stack: number[] = [];

  steps.push({ array: [], description: "Initializing empty Stack...", lineIdx: 0 });

  inputArray.forEach((val, i) => {
    stack.push(val);
    steps.push({ 
      array: [...stack], 
      highlightIdx: [stack.length - 1], 
      description: `Pushing ${val} onto stack`,
      lineIdx: 2
    });
  });

  while (stack.length > 0) {
    const val = stack.pop();
    steps.push({ 
      array: [...stack], 
      highlightIdx: [stack.length], 
      description: `Popping ${val} from stack`,
      lineIdx: 2
    });
  }

  return steps;
};

export const generateQueueSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const queue: number[] = [];

  steps.push({ array: [], description: "Initializing empty Queue...", lineIdx: 0 });

  inputArray.forEach((val, i) => {
    queue.push(val);
    steps.push({ 
      array: [...queue], 
      highlightIdx: [queue.length - 1], 
      description: `Enqueuing ${val}`,
      lineIdx: 2
    });
  });

  while (queue.length > 0) {
    const val = queue.shift();
    steps.push({ 
      array: [...queue], 
      highlightIdx: [0], 
      description: `Dequeuing ${val}`,
      lineIdx: 3
    });
  }

  return steps;
};

export const generateMergeSortSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];

  const merge = (low: number, mid: number, high: number) => {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);
    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
      steps.push({ 
        array: [...arr], 
        compareIdx: [low + i, mid + 1 + j], 
        description: `Comparing elements from partitions`,
        lineIdx: 5 
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
      steps.push({ array: [...arr], highlightIdx: [k-1], description: "Merging back to main array", lineIdx: 10 });
    }

    while (i < left.length) {
      arr[k] = left[i];
      i++; k++;
      steps.push({ array: [...arr], highlightIdx: [k-1], description: "Copying remaining elements", lineIdx: 11 });
    }
    while (j < right.length) {
      arr[k] = right[j];
      j++; k++;
      steps.push({ array: [...arr], highlightIdx: [k-1], description: "Copying remaining elements", lineIdx: 11 });
    }
  };

  const sort = (low: number, high: number) => {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      steps.push({ array: [...arr], highlightIdx: Array.from({length: high - low + 1}, (_, i) => low + i), description: `Partitioning range [${low}, ${high}]`, lineIdx: 2 });
      sort(low, mid);
      sort(mid + 1, high);
      merge(low, mid, high);
    }
  };

  steps.push({ array: [...arr], description: "Starting Merge Sort...", lineIdx: 0 });
  sort(0, arr.length - 1);
  steps.push({ array: [...arr], sortedIdx: arr.map((_, i) => i), description: "Merge Sort Complete!", lineIdx: 0 });

  return steps;
};


export const generateBSTSearchSteps = (target: number): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  
  const nodes = {
    '50': { x: 200, y: 50, label: '50' },
    '30': { x: 100, y: 150, label: '30' },
    '70': { x: 300, y: 150, label: '70' },
    '20': { x: 50, y: 250, label: '20' },
    '40': { x: 150, y: 250, label: '40' },
    '60': { x: 250, y: 250, label: '60' },
    '80': { x: 350, y: 250, label: '80' },
  };
  const edges: [string, string][] = [
    ['50', '30'], ['50', '70'],
    ['30', '20'], ['30', '40'],
    ['70', '60'], ['70', '80']
  ];

  const graphData = { nodes, edges };
  const visited = new Set<string>();
  
  steps.push({ 
    current: '', 
    visited: new Set(visited), 
    description: `Starting BST Search for ${target}...`, 
    lineIdx: 0,
    graphData
  });

  let curr: string | null = '50';
  while (curr) {
    visited.add(curr);
    steps.push({ 
      current: curr, 
      visited: new Set(visited), 
      description: `Checking node ${curr}`, 
      lineIdx: 1,
      graphData
    });

    const val = parseInt(curr);
    if (val === target) {
      steps.push({ 
        current: curr, 
        visited: new Set(visited), 
        description: `Found ${target}!`, 
        lineIdx: 2,
        graphData
      });
      return steps;
    }

    if (val < target) {
      steps.push({ 
        current: curr, 
        visited: new Set(visited), 
        description: `${val} < ${target}, going right`, 
        lineIdx: 3,
        graphData
      });
      if (curr === '50') curr = '70';
      else if (curr === '70') curr = '80';
      else curr = null;
    } else {
      steps.push({ 
        current: curr, 
        visited: new Set(visited), 
        description: `${val} > ${target}, going left`, 
        lineIdx: 4,
        graphData
      });
      if (curr === '50') curr = '30';
      else if (curr === '30') curr = '20';
      else if (curr === '70') curr = '60';
      else curr = null;
    }
  }

  steps.push({ 
    current: '', 
    visited: new Set(visited), 
    description: `${target} not found in BST`, 
    lineIdx: 6,
    graphData
  });

  return steps;
};

export const generateSelectionSortSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({ array: [...arr], description: "Starting Selection Sort...", lineIdx: 0 });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ array: [...arr], highlightIdx: [i], description: `Assumption: index ${i} has minimum element`, lineIdx: 3 });

    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...arr], compareIdx: [minIdx, j], description: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`, lineIdx: 4 });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({ array: [...arr], highlightIdx: [minIdx], description: `New minimum found at index ${minIdx}`, lineIdx: 5 });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ array: [...arr], swapIdx: [i, minIdx], description: `Swapping minimum ${arr[i]} into position ${i}`, lineIdx: 7 });
    }
    steps.push({ array: [...arr], sortedIdx: Array.from({length: i + 1}, (_, k) => k), description: `Index ${i} is now sorted`, lineIdx: 2 });
  }

  steps.push({ array: [...arr], sortedIdx: arr.map((_, i) => i), description: "Sorting complete!", lineIdx: 0 });
  return steps;
};

export const generateQuickSortSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];

  const partition = (low: number, high: number): number => {
    let pivot = arr[high];
    steps.push({ array: [...arr], highlightIdx: [high], description: `Choosing ${pivot} as pivot`, lineIdx: 1 });
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ array: [...arr], compareIdx: [j, high], description: `Comparing ${arr[j]} with pivot ${pivot}`, lineIdx: 2 });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ array: [...arr], swapIdx: [i, j], description: `Swapping ${arr[i]} and ${arr[j]}`, lineIdx: 3 });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ array: [...arr], swapIdx: [i + 1, high], description: "Placing pivot in sorted position", lineIdx: 5 });
    return i + 1;
  };

  const sort = (low: number, high: number) => {
    if (low < high) {
      let pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  steps.push({ array: [...arr], description: "Starting Quick Sort (Lomuto Partition)...", lineIdx: 0 });
  sort(0, arr.length - 1);
  steps.push({ array: [...arr], sortedIdx: arr.map((_, i) => i), description: "Quick Sort Complete!", lineIdx: 0 });

  return steps;
};

export const generateGraphDFSSteps = (startNode: string): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const visited = new Set<string>();
  const graphData = { nodes: MOCK_GRAPH_DATA.nodes, edges: MOCK_GRAPH_DATA.links.map(l => [l.source, l.target]) as [string, string][] };

  const dfs = (node: string) => {
    if (visited.has(node)) return;
    visited.add(node);
    steps.push({ 
      current: node, 
      visited: new Set(visited), 
      description: `Visiting node ${node}`, 
      lineIdx: 1,
      graphData
    });

    const neighbors = MOCK_GRAPH_DATA.links
      .filter(l => l.source === node || l.target === node)
      .map(l => l.source === node ? l.target : l.source);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        steps.push({ 
          current: neighbor, 
          visited: new Set(visited), 
          description: `Exploring edge to ${neighbor}`, 
          lineIdx: 2,
          graphData
        });
        dfs(neighbor);
      }
    }
  };

  steps.push({ 
    current: startNode, 
    visited: new Set(visited), 
    description: `Starting DFS from node ${startNode}`, 
    lineIdx: 0,
    graphData
  });
  
  dfs(startNode);

  steps.push({ 
    visited: new Set(visited), 
    description: "DFS traversal complete!", 
    lineIdx: 0,
    graphData
  });

  return steps;
};

export const generateLinearSearchSteps = (inputArray: number[], target: number): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];

  steps.push({ array: [...arr], description: "Starting Linear Search...", lineIdx: 0 });

  for (let i = 0; i < arr.length; i++) {
    steps.push({ 
      array: [...arr], 
      compareIdx: [i], 
      description: `Checking index ${i}: Is ${arr[i]} === ${target}?`,
      lineIdx: 2
    });

    if (arr[i] === target) {
      steps.push({ 
        array: [...arr], 
        sortedIdx: [i], 
        description: `Found ${target} at index ${i}!`,
        lineIdx: 3
      });
      return steps;
    }
  }

  steps.push({ array: [...arr], description: `${target} not found in array`, lineIdx: 5 });
  return steps;
};

export const generateFibonacciDPSteps = (n: number): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const fib = new Array(n + 1).fill(0);
  
  steps.push({ array: [], description: `Computing Fibonacci up to F(${n}) using DP`, lineIdx: 0 });
  
  if (n >= 0) {
    fib[0] = 0;
    steps.push({ array: [0], highlightIdx: [0], description: "Base case: F(0) = 0", lineIdx: 2 });
  }
  if (n >= 1) {
    fib[1] = 1;
    steps.push({ array: [0, 1], highlightIdx: [1], description: "Base case: F(1) = 1", lineIdx: 3 });
  }

  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
    steps.push({ 
      array: [...fib.slice(0, i + 1)], 
      compareIdx: [i - 1, i - 2],
      highlightIdx: [i],
      description: `F(${i}) = F(${i-1}) + F(${i-2}) = ${fib[i-1]} + ${fib[i-2]} = ${fib[i]}`,
      lineIdx: 6
    });
  }

  return steps;
};

export const generateHeapSortSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];
  const n = arr.length;

  const heapify = (size: number, j: number) => {
    let largest = j;
    let left = 2 * j + 1;
    let right = 2 * j + 2;

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest !== j) {
      [arr[j], arr[largest]] = [arr[largest], arr[j]];
      steps.push({ array: [...arr], swapIdx: [j, largest], description: `Heapifying: swapped ${arr[j]} and ${arr[largest]}`, lineIdx: 5 });
      heapify(size, largest);
    }
  };

  steps.push({ array: [...arr], description: "Starting Heap Sort: Building Max Heap...", lineIdx: 0 });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    steps.push({ array: [...arr], swapIdx: [0, i], description: `Moving max ${arr[0]} to the end`, lineIdx: 10 });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
    steps.push({ array: [...arr], sortedIdx: Array.from({length: n-i}, (_, k) => n-1-k), description: `Re-heapified`, lineIdx: 12 });
  }

  steps.push({ array: [...arr], sortedIdx: arr.map((_, i) => i), description: "Heap Sort Complete!", lineIdx: 0 });
  return steps;
};

export const generateCountingSortSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  if (inputArray.length === 0) return steps;
  
  const max = Math.max(...inputArray);
  const min = Math.min(...inputArray);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(inputArray.length).fill(0);
  const arr = [...inputArray];

  steps.push({ array: [...arr], description: "Starting Counting Sort...", lineIdx: 0 });

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
    steps.push({ array: [...arr], highlightIdx: [i], description: `Counting ${arr[i]}`, lineIdx: 2 });
  }

  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];

  for (let i = arr.length - 1; i >= 0; i--) {
    const val = arr[i];
    const pos = count[val - min] - 1;
    output[pos] = val;
    count[val - min]--;
    steps.push({ array: [...output], highlightIdx: [pos], description: `Placing ${val} at position ${pos}`, lineIdx: 10 });
  }

  steps.push({ array: [...output], sortedIdx: output.map((_, i) => i), description: "Counting Sort Complete!", lineIdx: 0 });
  return steps;
};

export const generateDijkstraSteps = (startNode: string): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const dist: any = {};
  const visited = new Set<string>();
  const nodes = {
    'A': { x: 200, y: 80, label: 'A' },
    'B': { x: 100, y: 180, label: 'B' },
    'C': { x: 300, y: 180, label: 'C' },
    'D': { x: 50, y: 280, label: 'D' },
    'E': { x: 150, y: 280, label: 'E' },
    'F': { x: 300, y: 280, label: 'F' },
  };
  const graphData = {
    nodes: nodes,
    edges: MOCK_GRAPH_DATA.links.map(l => [l.source, l.target]) as [string, string][],
    edgeWeights: {
      'A-B': 4,
      'A-C': 2,
      'B-D': 5,
      'B-E': 2,
      'C-F': 3,
      'E-F': 1,
    },
  };
  const adj: any = { 'A': [['B', 4], ['C', 2]], 'B': [['A', 4], ['D', 5]], 'C': [['A', 2], ['F', 3]], 'D': [['B', 1]], 'E': [['B', 2], ['F', 1]], 'F': [['C', 3], ['E', 1]] };

  Object.keys(nodes).forEach(node => dist[node] = Infinity);
  dist[startNode] = 0;

  steps.push({ current: startNode, visited: new Set(visited), description: "Distances initialized", lineIdx: 0, graphData });

  const pq = [startNode];
  while (pq.length > 0) {
    pq.sort((a, b) => dist[a] - dist[b]);
    const curr = pq.shift()!;
    if (visited.has(curr)) continue;
    visited.add(curr);

    steps.push({ current: curr, visited: new Set(visited), description: `Processing ${curr} (dist: ${dist[curr]})`, lineIdx: 5, graphData });

    (adj[curr] || []).forEach(([neighbor, weight]: [string, number]) => {
      if (!visited.has(neighbor)) {
        const d = dist[curr] + weight;
        if (d < dist[neighbor]) {
          dist[neighbor] = d;
          pq.push(neighbor);
          steps.push({ current: curr, visited: new Set(visited), description: `Updated ${neighbor} to ${d}`, lineIdx: 10, graphData });
        }
      }
    });
  }
  return steps;
};

export const generatePriorityQueueSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const pq: number[] = [];
  inputArray.forEach(val => {
    pq.push(val);
    pq.sort((a, b) => a - b);
    steps.push({ array: [...pq], highlightIdx: [pq.indexOf(val)], description: `Pushed ${val}`, lineIdx: 2 });
  });
  while (pq.length > 0) {
    const val = pq.shift();
    steps.push({ array: [...pq], description: `Popped ${val}`, lineIdx: 5 });
  }
  return steps;
};

export const generateCircularQueueSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const size = 5;
  const queue = new Array(size).fill(null);
  let head = 0, tail = 0, count = 0;

  steps.push({ array: [...queue], description: `Initializing Circular Queue of size ${size}`, lineIdx: 0 });

  inputArray.slice(0, 6).forEach((val) => {
    if (count === size) {
      steps.push({ array: [...queue], description: `Queue is full! Cannot enqueue ${val}`, lineIdx: 2 });
    } else {
      queue[tail] = val;
      const oldTail = tail;
      tail = (tail + 1) % size;
      count++;
      steps.push({ 
        array: [...queue], 
        highlightIdx: [oldTail], 
        description: `Enqueued ${val} at index ${oldTail}. Tail moved to ${tail}`,
        lineIdx: 4
      });
    }
  });

  while (count > 0) {
    const val = queue[head];
    queue[head] = null;
    const oldHead = head;
    head = (head + 1) % size;
    count--;
    steps.push({ 
      array: [...queue], 
      highlightIdx: [oldHead], 
      description: `Dequeued ${val} from index ${oldHead}. Head moved to ${head}`,
      lineIdx: 8
    });
  }

  return steps;
};

export const generateBSTTraversals = (type: 'pre' | 'in' | 'post'): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const nodes = {
    '50': { x: 200, y: 80, label: '50' },
    '30': { x: 100, y: 180, label: '30' },
    '70': { x: 300, y: 180, label: '70' },
  };
  const edges: [string, string][] = [['50', '30'], ['50', '70']];
  const graphData = { nodes, edges };
  const visited = new Set<string>();

  const traverse = (node: string) => {
    if (type === 'pre') {
      visited.add(node);
      steps.push({ current: node, visited: new Set(visited), description: `Visiting root ${node}`, graphData });
    }
    
    if (node === '50') {
      traverse('30');
    }

    if (type === 'in') {
      visited.add(node);
      steps.push({ current: node, visited: new Set(visited), description: `Visiting node ${node}`, graphData });
    }

    if (node === '50') {
      traverse('70');
    }

    if (type === 'post') {
      visited.add(node);
      steps.push({ current: node, visited: new Set(visited), description: `Visiting node ${node}`, graphData });
    }
  };

  steps.push({ description: `Starting ${type}order traversal`, graphData });
  traverse('50');
  return steps;
};

export const generateArraysBasicSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];

  steps.push({ array: [...arr], description: "Array initialized", lineIdx: 0 });
  arr.forEach((value, idx) => {
    steps.push({
      array: [...arr],
      highlightIdx: [idx],
      description: `Accessing arr[${idx}] = ${value}`,
      lineIdx: 1,
    });
  });

  if (arr.length > 0) {
    arr[0] = arr[0] + 5;
    steps.push({
      array: [...arr],
      swapIdx: [0],
      description: `Updating first element to ${arr[0]}`,
      lineIdx: 2,
    });
  }

  steps.push({ array: [...arr], description: "Array traversal complete", lineIdx: 3 });
  return steps;
};

export const generateHashTableSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const size = 7;
  const table = new Array(size).fill(-1);

  steps.push({ array: [...table], description: `Created hash table with ${size} slots`, lineIdx: 0 });

  inputArray.slice(0, 6).forEach((value) => {
    let idx = Math.abs(value) % size;
    const start = idx;
    steps.push({ array: [...table], highlightIdx: [idx], description: `Hash(${value}) -> ${idx}`, lineIdx: 1 });

    while (table[idx] !== -1) {
      steps.push({ array: [...table], compareIdx: [idx], description: `Collision at ${idx}, probing next slot`, lineIdx: 2 });
      idx = (idx + 1) % size;
      if (idx === start) break;
    }

    if (table[idx] === -1) {
      table[idx] = value;
      steps.push({ array: [...table], swapIdx: [idx], description: `Inserted ${value} at slot ${idx}`, lineIdx: 3 });
    }
  });

  return steps;
};

export const generateBucketSortSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = [...inputArray];
  if (arr.length === 0) return [{ array: [], description: "No data for Bucket Sort", lineIdx: 0 }];

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.max(3, Math.ceil(Math.sqrt(arr.length)));
  const range = Math.max(1, max - min + 1);
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  steps.push({ array: [...arr], description: `Creating ${bucketCount} buckets`, lineIdx: 0 });

  arr.forEach((value, i) => {
    const idx = Math.min(bucketCount - 1, Math.floor(((value - min) / range) * bucketCount));
    buckets[idx].push(value);
    steps.push({
      array: buckets.flat(),
      highlightIdx: [buckets.flat().length - 1],
      description: `Placed ${value} in bucket ${idx}`,
      lineIdx: 2,
    });
    steps.push({ array: [...arr], compareIdx: [i], description: `Distributed element ${value}`, lineIdx: 3 });
  });

  const sorted: number[] = [];
  buckets.forEach((bucket, idx) => {
    bucket.sort((a, b) => a - b);
    bucket.forEach((v) => sorted.push(v));
    steps.push({
      array: [...sorted],
      sortedIdx: Array.from({ length: sorted.length }, (_, i) => i),
      description: `Sorted bucket ${idx} and merged`,
      lineIdx: 5,
    });
  });

  return steps;
};

export const generateAVLTreeSteps = (): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const graphData = {
    nodes: {
      '30': { x: 200, y: 70, label: '30' },
      '20': { x: 120, y: 170, label: '20' },
      '40': { x: 280, y: 170, label: '40' },
      '10': { x: 80, y: 270, label: '10' },
      '25': { x: 160, y: 270, label: '25' },
    },
    edges: [['30', '20'], ['30', '40'], ['20', '10'], ['20', '25']] as [string, string][],
  };

  steps.push({ graphData, description: "Start AVL insertion sequence", current: '30', lineIdx: 0 });
  steps.push({ graphData, visited: new Set(['30', '20', '10']), current: '10', description: "Imbalance detected at node 30", lineIdx: 2 });
  steps.push({ graphData, visited: new Set(['20', '30', '40', '10', '25']), current: '20', description: "Right rotation restores balance", lineIdx: 4 });
  return steps;
};

export const generateBTreeSteps = (): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const graphData = {
    nodes: {
      '20|40': { x: 200, y: 70, label: '20|40' },
      '10': { x: 100, y: 190, label: '10' },
      '30': { x: 200, y: 190, label: '30' },
      '50|60': { x: 300, y: 190, label: '50|60' },
    },
    edges: [['20|40', '10'], ['20|40', '30'], ['20|40', '50|60']] as [string, string][],
  };

  steps.push({ graphData, current: '20|40', description: "B-Tree root created", lineIdx: 0 });
  steps.push({ graphData, current: '50|60', visited: new Set(['20|40', '50|60']), description: "Inserted keys while keeping nodes sorted", lineIdx: 2 });
  steps.push({ graphData, visited: new Set(Object.keys(graphData.nodes)), description: "Split operation keeps B-Tree balanced", lineIdx: 4 });
  return steps;
};

const WEIGHTED_GRAPH = {
  nodes: {
    'A': { x: 180, y: 70, label: 'A' },
    'B': { x: 80, y: 170, label: 'B' },
    'C': { x: 280, y: 170, label: 'C' },
    'D': { x: 80, y: 280, label: 'D' },
    'E': { x: 180, y: 280, label: 'E' },
    'F': { x: 280, y: 280, label: 'F' },
  },
  edges: [
    ['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'E'], ['C', 'F'], ['E', 'F'], ['D', 'E'],
  ] as [string, string][],
};

const WEIGHTED_EDGE_MAP: Record<string, number> = {
  'A-B': 4,
  'A-C': 2,
  'B-D': 5,
  'B-E': 3,
  'C-E': 3,
  'C-F': 6,
  'D-E': 2,
  'E-F': 1,
};

export const generateBellmanFordSteps = (startNode: string): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const edges: [string, string, number][] = [
    ['A', 'B', 4], ['A', 'C', 2], ['B', 'D', 3], ['B', 'E', 2], ['C', 'E', 3], ['E', 'F', 1], ['D', 'E', -1], ['C', 'F', 8],
  ];
  const dist: Record<string, number> = {};
  const graphData = {
    ...WEIGHTED_GRAPH,
    edgeWeights: {
      'A->B': 4,
      'A->C': 2,
      'B->D': 3,
      'B->E': 2,
      'C->E': 3,
      'E->F': 1,
      'D->E': -1,
      'C->F': 8,
    },
    directed: true,
  };
  Object.keys(WEIGHTED_GRAPH.nodes).forEach((n) => (dist[n] = Infinity));
  dist[startNode] = 0;

  steps.push({ graphData, current: startNode, visited: new Set([startNode]), description: `Initialized Bellman-Ford from ${startNode}`, lineIdx: 0 });
  for (let i = 0; i < Object.keys(WEIGHTED_GRAPH.nodes).length - 1; i++) {
    edges.forEach(([u, v, w]) => {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        steps.push({
          graphData,
          current: v,
          visited: new Set([u, v]),
          description: `Relaxed ${u}->${v} (w=${w}), dist(${v})=${dist[v]}`,
          lineIdx: 3,
        });
      }
    });
  }
  return steps;
};

export const generateKruskalSteps = (): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const sortedEdges: [string, string, number][] = [
    ['E', 'F', 1], ['A', 'C', 2], ['D', 'E', 2], ['B', 'E', 3], ['A', 'B', 4], ['B', 'D', 5], ['C', 'F', 6],
  ];
  const chosen: [string, string][] = [];
  const visited = new Set<string>();

  const nodes = Object.keys(WEIGHTED_GRAPH.nodes);
  const parent: Record<string, string> = {};
  const rank: Record<string, number> = {};
  nodes.forEach((n) => {
    parent[n] = n;
    rank[n] = 0;
  });

  const find = (x: string): string => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };

  const union = (a: string, b: string): boolean => {
    let ra = find(a);
    let rb = find(b);
    if (ra === rb) return false;
    if (rank[ra] < rank[rb]) [ra, rb] = [rb, ra];
    parent[rb] = ra;
    if (rank[ra] === rank[rb]) rank[ra]++;
    return true;
  };

  const graphData = { ...WEIGHTED_GRAPH, edgeWeights: WEIGHTED_EDGE_MAP };
  steps.push({ graphData, description: "Sorting edges by weight", lineIdx: 0 });

  sortedEdges.forEach(([u, v, w]) => {
    if (union(u, v)) {
      chosen.push([u, v]);
      visited.add(u);
      visited.add(v);
      steps.push({
        graphData: {
          nodes: WEIGHTED_GRAPH.nodes,
          edges: [...chosen],
          edgeWeights: WEIGHTED_EDGE_MAP,
        },
        current: v,
        visited: new Set(visited),
        description: `Added edge ${u}-${v} (w=${w}) to MST`,
        lineIdx: 2,
      });
    } else {
      steps.push({ graphData, current: u, visited: new Set(visited), description: `Skipped ${u}-${v} (w=${w}) to avoid cycle`, lineIdx: 4 });
    }
  });

  return steps;
};

export const generatePrimSteps = (startNode: string): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const weightedEdges: [string, string, number][] = [
    ['A', 'B', 4], ['A', 'C', 2], ['B', 'D', 5], ['B', 'E', 3], ['C', 'E', 3], ['C', 'F', 6], ['D', 'E', 2], ['E', 'F', 1],
  ];
  const adj: Record<string, [string, number][]> = {};
  Object.keys(WEIGHTED_GRAPH.nodes).forEach((n) => (adj[n] = []));
  weightedEdges.forEach(([u, v, w]) => {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  });

  const visited = new Set<string>();
  const mstEdges: [string, string][] = [];

  steps.push({ graphData: { ...WEIGHTED_GRAPH, edgeWeights: WEIGHTED_EDGE_MAP }, current: startNode, visited: new Set([startNode]), description: `Starting Prim from ${startNode}`, lineIdx: 0 });

  visited.add(startNode);
  while (visited.size < Object.keys(WEIGHTED_GRAPH.nodes).length) {
    let best: [string, string, number] | null = null;
    for (const u of visited) {
      for (const [v, w] of adj[u]) {
        if (visited.has(v)) continue;
        if (!best || w < best[2]) best = [u, v, w];
      }
    }
    if (!best) break;

    visited.add(best[1]);
    mstEdges.push([best[0], best[1]]);
    steps.push({
      graphData: { nodes: WEIGHTED_GRAPH.nodes, edges: [...mstEdges], edgeWeights: WEIGHTED_EDGE_MAP },
      current: best[1],
      visited: new Set(visited),
      description: `Chose edge ${best[0]}-${best[1]} (w=${best[2]})`,
      lineIdx: 3,
    });
  }

  return steps;
};

export const generateWarshallSteps = (): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const INF = 999;
  const n = 4;
  const dist2D = [
    [0, 5, 9, INF],
    [INF, 0, 2, 6],
    [INF, INF, 0, 1],
    [4, INF, INF, 0],
  ];
  const flat = () => dist2D.flat();

  steps.push({ array: flat(), description: "Initial 4x4 distance matrix (flattened)", lineIdx: 0 });

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const throughK = dist2D[i][k] + dist2D[k][j];
        if (throughK < dist2D[i][j]) {
          dist2D[i][j] = throughK;
          const idx = i * n + j;
          steps.push({
            array: flat(),
            highlightIdx: [idx, i * n + k, k * n + j],
            description: `Updated d(${i},${j}) via ${k} -> ${throughK}`,
            lineIdx: 4,
          });
        }
      }
    }
  }

  steps.push({ array: flat(), sortedIdx: Array.from({ length: n * n }, (_, i) => i), description: "All-pairs shortest paths complete", lineIdx: 6 });
  return steps;
};

export const generateStrassenSteps = (): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const a = [1, 3, 7, 5];
  const b = [6, 8, 4, 2];
  const p = [
    (a[0] + a[3]) * (b[0] + b[3]),
    (a[2] + a[3]) * b[0],
    a[0] * (b[1] - b[3]),
    a[3] * (b[2] - b[0]),
    (a[0] + a[1]) * b[3],
    (a[2] - a[0]) * (b[0] + b[1]),
    (a[1] - a[3]) * (b[2] + b[3]),
  ];

  steps.push({ array: [...a, ...b], description: "Loaded two 2x2 matrices A and B", lineIdx: 0 });
  p.forEach((value, idx) => {
    steps.push({ array: [...p.slice(0, idx + 1)], highlightIdx: [idx], description: `Computed P${idx + 1} = ${value}`, lineIdx: 2 });
  });

  const c11 = p[0] + p[3] - p[4] + p[6];
  const c12 = p[2] + p[4];
  const c21 = p[1] + p[3];
  const c22 = p[0] - p[1] + p[2] + p[5];
  steps.push({ array: [c11, c12, c21, c22], sortedIdx: [0, 1, 2, 3], description: "Combined P terms into result matrix C", lineIdx: 5 });
  return steps;
};

export const generateDoublyLinkedListSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const nodes: { id: string; value: number }[] = [];

  steps.push({ nodes: [], description: "Initializing empty Doubly Linked List", lineIdx: 0 });
  inputArray.slice(0, 6).forEach((value, idx) => {
    nodes.push({ id: `d-${idx}`, value });
    steps.push({ nodes: [...nodes], description: `Inserted ${value}; prev and next pointers updated`, lineIdx: 2 });
  });

  return steps;
};

export const generateCircularLinkedListSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const nodes: { id: string; value: number }[] = [];

  steps.push({ nodes: [], description: "Initializing Circular Linked List", lineIdx: 0 });
  inputArray.slice(0, 6).forEach((value, idx) => {
    nodes.push({ id: `c-${idx}`, value });
    steps.push({ nodes: [...nodes], description: `Inserted ${value}; tail now points back to head`, lineIdx: 3 });
  });

  return steps;
};

export const generateHuffmanCodingSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const freq = inputArray.slice(0, 5).map((value, idx) => ({ ch: String.fromCharCode(65 + idx), f: Math.max(1, Math.abs(value % 10)) }));
  steps.push({ array: freq.map((x) => x.f), description: "Created frequency table", lineIdx: 0 });

  const queue = [...freq].sort((a, b) => a.f - b.f);
  while (queue.length > 1) {
    const a = queue.shift()!;
    const b = queue.shift()!;
    const merged = { ch: `${a.ch}${b.ch}`, f: a.f + b.f };
    queue.push(merged);
    queue.sort((x, y) => x.f - y.f);
    steps.push({ array: queue.map((x) => x.f), description: `Merged ${a.ch} and ${b.ch} -> ${merged.f}`, lineIdx: 2 });
  }

  steps.push({ array: queue.map((x) => x.f), sortedIdx: [0], description: "Huffman tree root finalized", lineIdx: 4 });
  return steps;
};

export const generateThreadedBinaryTreeSteps = (): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const graphData = {
    nodes: {
      '40': { x: 200, y: 70, label: '40' },
      '20': { x: 120, y: 170, label: '20' },
      '60': { x: 280, y: 170, label: '60' },
      '10': { x: 80, y: 270, label: '10' },
      '30': { x: 160, y: 270, label: '30' },
    },
    edges: [['40', '20'], ['40', '60'], ['20', '10'], ['20', '30']] as [string, string][],
  };

  steps.push({ graphData, current: '40', description: "Threaded BST created", lineIdx: 0 });
  steps.push({ graphData, visited: new Set(['10', '20', '30']), current: '30', description: "Added thread from 30 to inorder successor 40", lineIdx: 2 });
  steps.push({ graphData, visited: new Set(['10', '20', '30', '40', '60']), description: "Inorder traversal using threads complete", lineIdx: 4 });
  return steps;
};

export const generateKnapsackSteps = (weights: number[], capacity: number): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const w = weights.slice(0, 5).map((x) => Math.max(1, Math.min(10, Math.abs(x))));
  const values = w.map((x, i) => x + i + 2);
  const dp = new Array(capacity + 1).fill(0);

  steps.push({ array: [...dp], description: `0/1 Knapsack with capacity ${capacity}`, lineIdx: 0 });
  for (let i = 0; i < w.length; i++) {
    for (let c = capacity; c >= w[i]; c--) {
      dp[c] = Math.max(dp[c], dp[c - w[i]] + values[i]);
      steps.push({
        array: [...dp],
        highlightIdx: [c],
        compareIdx: [c - w[i]],
        description: `Item ${i} (w=${w[i]}, v=${values[i]}) updates dp[${c}]`,
        lineIdx: 3,
      });
    }
  }
  return steps;
};

export const generateLCSSteps = (seqA: string, seqB: string): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const a = seqA.slice(0, 6);
  const b = seqB.slice(0, 6);
  const cols = b.length + 1;
  const dp = new Array((a.length + 1) * (b.length + 1)).fill(0);

  steps.push({ array: [...dp], description: `Building LCS DP table for ${a} and ${b}`, lineIdx: 0 });

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const idx = i * cols + j;
      if (a[i - 1] === b[j - 1]) {
        dp[idx] = dp[(i - 1) * cols + (j - 1)] + 1;
      } else {
        dp[idx] = Math.max(dp[(i - 1) * cols + j], dp[i * cols + (j - 1)]);
      }
      steps.push({ array: [...dp], highlightIdx: [idx], description: `dp[${i}][${j}] = ${dp[idx]}`, lineIdx: 2 });
    }
  }

  steps.push({ array: [...dp], sortedIdx: [dp.length - 1], description: `LCS length = ${dp[dp.length - 1]}`, lineIdx: 5 });
  return steps;
};

export const generateTopologicalSortSteps = (): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const graphData = {
    nodes: {
      'A': { x: 70, y: 90, label: 'A' },
      'B': { x: 180, y: 90, label: 'B' },
      'C': { x: 290, y: 90, label: 'C' },
      'D': { x: 120, y: 220, label: 'D' },
      'E': { x: 240, y: 220, label: 'E' },
    },
    edges: [['A', 'B'], ['A', 'D'], ['B', 'C'], ['D', 'E'], ['C', 'E']] as [string, string][],
    directed: true,
  };
  const indegree: Record<string, number> = {};
  Object.keys(graphData.nodes).forEach((n) => (indegree[n] = 0));
  graphData.edges.forEach(([u, v]) => {
    if (graphData.nodes[u] && graphData.nodes[v]) indegree[v]++;
  });

  const queue = Object.keys(indegree).filter((n) => indegree[n] === 0);
  const order: string[] = [];
  const visited = new Set<string>();

  steps.push({ graphData, description: "Computing indegrees and queueing zero-indegree nodes", lineIdx: 0 });

  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    visited.add(node);
    steps.push({ graphData, current: node, visited: new Set(visited), description: `Output ${node} at position ${order.length}`, lineIdx: 3 });
    graphData.edges.forEach(([u, v]) => {
      if (u === node) {
        indegree[v]--;
        if (indegree[v] === 0) queue.push(v);
      }
    });
  }

  return steps;
};

export const generateAStarSteps = (startNode: string, goalNode: string): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const weightedEdges: [string, string, number][] = [
    ['A', 'B', 4], ['A', 'C', 2], ['B', 'D', 5], ['B', 'E', 3], ['C', 'E', 2], ['C', 'F', 6], ['D', 'E', 2], ['E', 'F', 1],
  ];
  const adj: Record<string, [string, number][]> = {};
  Object.keys(WEIGHTED_GRAPH.nodes).forEach((n) => (adj[n] = []));
  weightedEdges.forEach(([u, v, w]) => {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  });

  const heuristic: Record<string, number> = { A: 5, B: 4, C: 2, D: 3, E: 1, F: 0 };
  const g: Record<string, number> = {};
  const f: Record<string, number> = {};
  const cameFrom: Record<string, string | null> = {};
  Object.keys(WEIGHTED_GRAPH.nodes).forEach((n) => {
    g[n] = Infinity;
    f[n] = Infinity;
    cameFrom[n] = null;
  });

  g[startNode] = 0;
  f[startNode] = heuristic[startNode] ?? 0;
  const open = new Set<string>([startNode]);
  const visited = new Set<string>();

  steps.push({ graphData: { ...WEIGHTED_GRAPH, edgeWeights: WEIGHTED_EDGE_MAP }, current: startNode, description: `A* search from ${startNode} to ${goalNode}`, lineIdx: 0 });

  while (open.size > 0) {
    let current = Array.from(open).sort((a, b) => f[a] - f[b])[0];
    open.delete(current);
    visited.add(current);

    steps.push({
      graphData: { ...WEIGHTED_GRAPH, edgeWeights: WEIGHTED_EDGE_MAP },
      current,
      visited: new Set(visited),
      description: `Expanded ${current} with f=${f[current]}`,
      lineIdx: 2,
    });

    if (current === goalNode) break;

    for (const [neighbor, w] of adj[current]) {
      const tentativeG = g[current] + w;
      if (tentativeG < g[neighbor]) {
        cameFrom[neighbor] = current;
        g[neighbor] = tentativeG;
        f[neighbor] = tentativeG + (heuristic[neighbor] ?? 0);
        open.add(neighbor);
      }
    }
  }

  const path: string[] = [];
  let node: string | null = goalNode;
  while (node) {
    path.push(node);
    node = cameFrom[node] ?? null;
  }
  path.reverse();

  if (path.length > 0 && path[0] === startNode) {
    const pathEdges: [string, string][] = [];
    for (let i = 1; i < path.length; i++) pathEdges.push([path[i - 1], path[i]]);
    steps.push({
      graphData: { nodes: WEIGHTED_GRAPH.nodes, edges: pathEdges, edgeWeights: WEIGHTED_EDGE_MAP },
      current: goalNode,
      visited: new Set(path),
      description: `Reached goal ${goalNode}; path ${path.join(' -> ')}`,
      lineIdx: 4,
    });
  }

  return steps;
};

export const generateKMPSteps = (text: string, pattern: string): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const t = text.slice(0, 12);
  const p = pattern.slice(0, 5);
  const lps = new Array(p.length).fill(0);

  steps.push({ array: t.split('').map((c) => c.charCodeAt(0) - 64), description: `Searching pattern ${p} in text ${t}`, lineIdx: 0 });

  let len = 0;
  for (let i = 1; i < p.length; ) {
    if (p[i] === p[len]) {
      lps[i++] = ++len;
      steps.push({ array: [...lps], highlightIdx: [i - 1], description: `Built LPS index ${i - 1} = ${lps[i - 1]}`, lineIdx: 2 });
    } else if (len !== 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }

  let i = 0;
  let j = 0;
  while (i < t.length) {
    steps.push({ array: t.split('').map((c) => c.charCodeAt(0) - 64), compareIdx: [i], highlightIdx: [j], description: `Compare text[${i}] with pattern[${j}]`, lineIdx: 6 });
    if (t[i] === p[j]) {
      i++;
      j++;
      if (j === p.length) {
        steps.push({ array: [i - j], sortedIdx: [0], description: `Pattern found at index ${i - j}`, lineIdx: 8 });
        break;
      }
    } else if (j !== 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }

  return steps;
};

export const generateSegmentTreeSteps = (inputArray: number[]): AlgoStep[] => {
  const arr = inputArray.slice(0, 6);
  const steps: AlgoStep[] = [];
  if (arr.length === 0) return [{ array: [], description: "No data for Segment Tree", lineIdx: 0 }];

  const tree: number[] = [];
  const build = (node: number, l: number, r: number): number => {
    if (l === r) {
      tree[node] = arr[l];
      steps.push({ array: [...tree], highlightIdx: [node], description: `Leaf node ${node} = ${arr[l]}`, lineIdx: 2 });
      return tree[node];
    }
    const mid = Math.floor((l + r) / 2);
    const left = build(2 * node + 1, l, mid);
    const right = build(2 * node + 2, mid + 1, r);
    tree[node] = left + right;
    steps.push({ array: [...tree], highlightIdx: [node], compareIdx: [2 * node + 1, 2 * node + 2], description: `Internal node ${node} = ${tree[node]}`, lineIdx: 4 });
    return tree[node];
  };

  steps.push({ array: [...arr], description: "Building Segment Tree for range sums", lineIdx: 0 });
  build(0, 0, arr.length - 1);
  steps.push({ array: [...tree], sortedIdx: [0], description: `Range sum [0, ${arr.length - 1}] = ${tree[0]}`, lineIdx: 6 });
  return steps;
};

export const generateFenwickTreeSteps = (inputArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const arr = inputArray.slice(0, 7);
  const bit = new Array(arr.length + 1).fill(0);

  steps.push({ array: [...bit], description: "Initialized Fenwick tree", lineIdx: 0 });

  const update = (idx: number, delta: number) => {
    let i = idx + 1;
    while (i < bit.length) {
      bit[i] += delta;
      steps.push({ array: [...bit], highlightIdx: [i], description: `Updated BIT[${i}] by ${delta}`, lineIdx: 2 });
      i += i & -i;
    }
  };

  arr.forEach((value, idx) => update(idx, value));

  let prefix = 0;
  let i = Math.min(5, arr.length);
  while (i > 0) {
    prefix += bit[i];
    steps.push({ array: [...bit], compareIdx: [i], description: `Accumulating prefix, now ${prefix}`, lineIdx: 5 });
    i -= i & -i;
  }

  steps.push({ array: [...bit], sortedIdx: [0], description: `Prefix sum query complete: ${prefix}`, lineIdx: 6 });
  return steps;
};

export const generateDSUSteps = (): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const parent = [0, 1, 2, 3, 4, 5];
  const rank = [0, 0, 0, 0, 0, 0];

  const find = (x: number): number => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };

  const union = (a: number, b: number) => {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return;
    if (rank[ra] < rank[rb]) parent[ra] = rb;
    else if (rank[ra] > rank[rb]) parent[rb] = ra;
    else {
      parent[rb] = ra;
      rank[ra]++;
    }
    steps.push({ array: [...parent], highlightIdx: [a, b], description: `Union(${a}, ${b})`, lineIdx: 2 });
  };

  steps.push({ array: [...parent], description: "Initialized DSU parent array", lineIdx: 0 });
  union(0, 1);
  union(2, 3);
  union(1, 2);
  union(4, 5);
  union(3, 5);
  steps.push({ array: [...parent], sortedIdx: parent.map((_, i) => i), description: "Final connected components formed", lineIdx: 4 });
  return steps;
};
