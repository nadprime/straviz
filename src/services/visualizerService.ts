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

  visited.add(startNode);
  steps.push({ current: startNode, visited: new Set(visited), description: "Starting BFS from node A", lineIdx: 0 });

  while (queue.length > 0) {
    const curr = queue.shift()!;
    steps.push({ current: curr, visited: new Set(visited), description: `Processing node ${curr}`, lineIdx: 6 });

    for (const neighbor of adj[curr]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        steps.push({ current: curr, visited: new Set(visited), description: `Visiting neighbor ${neighbor}`, lineIdx: 10 });
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
  const graphData = { nodes: nodes, edges: MOCK_GRAPH_DATA.links.map(l => [l.source, l.target]) as [string, string][] };
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
  const order: string[] = [];

  const traverse = (node: string) => {
    if (type === 'pre') {
      order.push(node);
      visited.add(node);
      steps.push({ current: node, visited: new Set(visited), description: `Visiting root ${node}`, graphData, array: [...order.map(Number)] });
    }
    
    if (node === '50') {
      traverse('30');
    }

    if (type === 'in') {
      order.push(node);
      visited.add(node);
      steps.push({ current: node, visited: new Set(visited), description: `Visiting node ${node}`, graphData, array: [...order.map(Number)] });
    }

    if (node === '50') {
      traverse('70');
    }

    if (type === 'post') {
      order.push(node);
      visited.add(node);
      steps.push({ current: node, visited: new Set(visited), description: `Visiting node ${node}`, graphData, array: [...order.map(Number)] });
    }
  };

  steps.push({ description: `Starting ${type}order traversal`, graphData, array: [] });
  traverse('50');
  return steps;
};
