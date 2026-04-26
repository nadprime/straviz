import { Algorithm } from "../types";

export const MORE_ALGORITHMS: Algorithm[] = [
  // Arrays & Strings
  {
    id: "arrays-basic",
    name: "Arrays (Basic)",
    description: "A data structure consisting of a collection of elements, each identified by at least one array index or key. Elements are stored contiguously in memory.",
    iconName: "Layers",
    category: "Data Structures",
    complexity: { time: "O(1) access", space: "O(n)" },
    implementations: {
      c: `// Basic array operations in C`,
      cpp: `// Basic array operations in C++`,
      java: `// Basic array operations in Java`,
      javascript: `// Basic array operations in JS`,
      python: `# Basic array operations in Python`
    }
  },
  // Searching
  {
    id: "linear-search",
    name: "Linear Search",
    description: "A method for finding an element within a list by sequentially checking each element until a match is found or the whole list has been searched.",
    iconName: "Search",
    category: "Searching",
    complexity: { time: "O(n)", space: "O(1)" },
    implementations: {
      c: `int linearSearch(int arr[], int n, int x) {\n  for (int i = 0; i < n; i++) {\n    if (arr[i] == x) return i;\n  }\n  return -1;\n}`,
      cpp: `int linearSearch(vector<int>& arr, int x) {\n  for (int i = 0; i < arr.size(); i++) {\n    if (arr[i] == x) return i;\n  }\n  return -1;\n}`,
      java: `int linearSearch(int arr[], int x) {\n  for (int i = 0; i < arr.length; i++) {\n    if (arr[i] == x) return i;\n  }\n  return -1;\n}`,
      javascript: `function linearSearch(arr, x) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === x) return i;\n  }\n  return -1;\n}`,
      python: `def linear_search(arr, x):\n  for i in range(len(arr)):\n    if arr[i] == x: return i\n  return -1`
    }
  },
  {
    id: "hash-table",
    name: "Hashing (Hash Table)",
    description: "A data structure that implements an associative array abstract data type, a structure that can map keys to values.",
    iconName: "Database",
    category: "Data Structures",
    complexity: { time: "O(1) avg", space: "O(n)" },
    implementations: {
      c: `// Hash table implementation in C`,
      cpp: `// Hash table implementation in C++`,
      java: `// Hash table implementation in Java`,
      javascript: `// Hash table implementation in JS`,
      python: `# Hash table implementation in Python`
    }
  },
  // Sorting
  {
    id: "heap-sort",
    name: "Heap Sort",
    description: "A comparison-based sorting technique based on Binary Heap data structure.",
    iconName: "Layers",
    category: "Sorting",
    complexity: { time: "O(n log n)", space: "O(1)" },
    implementations: {
      c: `// Heap Sort in C`, cpp: `// Heap Sort in C++`, java: `// Heap Sort in Java`, javascript: `// Heap Sort in JS`, python: `# Heap Sort in Python`
    }
  },
  {
    id: "counting-sort",
    name: "Counting Sort",
    description: "An algorithm for sorting a collection of objects according to keys that are small integers.",
    iconName: "Layers",
    category: "Sorting",
    complexity: { time: "O(n + k)", space: "O(n + k)" },
    implementations: {
      c: `// Counting Sort`, cpp: `// Counting Sort`, java: `// Counting Sort`, javascript: `// Counting Sort`, python: `# Counting Sort`
    }
  },
  {
    id: "bucket-sort",
    name: "Bucket Sort",
    description: "A sorting algorithm that works by distributing the elements of an array into a number of buckets.",
    iconName: "Layers",
    category: "Sorting",
    complexity: { time: "O(n + k)", space: "O(n)" },
    implementations: {
      c: `// Bucket Sort`, cpp: `// Bucket Sort`, java: `// Bucket Sort`, javascript: `// Bucket Sort`, python: `# Bucket Sort`
    }
  },
  // Advanced Trees
  {
    id: "binary-tree-inorder",
    name: "Inorder Traversal",
    description: "A depth-first traversal of a binary tree, visiting left child, root, right child.",
    iconName: "Share2",
    category: "Trees",
    complexity: { time: "O(n)", space: "O(h)" },
    implementations: {
      c: `// Inorder Traversal`, cpp: `// Inorder Traversal`, java: `// Inorder Traversal`, javascript: `// Inorder Traversal`, python: `# Inorder Traversal`
    }
  },
  {
    id: "binary-tree-preorder",
    name: "Preorder Traversal",
    description: "A depth-first traversal, visiting root, left child, right child.",
    iconName: "Share2",
    category: "Trees",
    complexity: { time: "O(n)", space: "O(h)" },
    implementations: {
      c: `// Preorder`, cpp: `// Preorder`, java: `// Preorder`, javascript: `// Preorder`, python: `# Preorder`
    }
  },
  {
    id: "binary-tree-postorder",
    name: "Postorder Traversal",
    description: "A depth-first traversal, visiting left child, right child, root.",
    iconName: "Share2",
    category: "Trees",
    complexity: { time: "O(n)", space: "O(h)" },
    implementations: {
      c: `// Postorder`, cpp: `// Postorder`, java: `// Postorder`, javascript: `// Postorder`, python: `# Postorder`
    }
  },
  {
    id: "avl-tree",
    name: "AVL Tree",
    description: "A self-balancing binary search tree. In an AVL tree, the heights of the two child subtrees of any node differ by at most one.",
    iconName: "Share2",
    category: "Trees",
    complexity: { time: "O(log n)", space: "O(n)" },
    implementations: {
      c: `// AVL Tree`, cpp: `// AVL Tree`, java: `// AVL Tree`, javascript: `// AVL Tree`, python: `# AVL Tree`
    }
  },
  {
    id: "b-tree",
    name: "B-Tree",
    description: "A self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.",
    iconName: "Share2",
    category: "Trees",
    complexity: { time: "O(log n)", space: "O(n)" },
    implementations: {
      c: `// B-Tree`, cpp: `// B-Tree`, java: `// B-Tree`, javascript: `// B-Tree`, python: `# B-Tree`
    }
  },
  // Advanced Hash/Graph
  {
    id: "dijkstra",
    name: "Dijkstra's Algo",
    description: "An algorithm for finding the shortest paths between nodes in a graph with non-negative edge weights.",
    iconName: "Network",
    category: "Graphs",
    complexity: { time: "O(V^2)", space: "O(V)" },
    implementations: {
      c: `// Dijkstra`, cpp: `// Dijkstra`, java: `// Dijkstra`, javascript: `// Dijkstra`, python: `# Dijkstra`
    }
  },
  {
    id: "bellman-ford",
    name: "Bellman-Ford Algo",
    description: "Computes shortest paths from a single source vertex to all of the other vertices in a weighted digraph. Slower than Dijkstra but can handle negative weights.",
    iconName: "Network",
    category: "Graphs",
    complexity: { time: "O(V*E)", space: "O(V)" },
    implementations: {
      c: `// Bellman Ford`, cpp: `// Bellman Ford`, java: `// Bellman Ford`, javascript: `// Bellman Ford`, python: `# Bellman Ford`
    }
  },
  {
    id: "kruskal",
    name: "Kruskal's Algo",
    description: "Finds a minimum spanning forest of an undirected edge-weighted graph.",
    iconName: "Network",
    category: "Graphs",
    complexity: { time: "O(E log E)", space: "O(V)" },
    implementations: {
      c: `// Kruskal`, cpp: `// Kruskal`, java: `// Kruskal`, javascript: `// Kruskal`, python: `# Kruskal`
    }
  },
  {
    id: "prim",
    name: "Prim's Algo",
    description: "A greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.",
    iconName: "Network",
    category: "Graphs",
    complexity: { time: "O(E + V log V)", space: "O(V)" },
    implementations: {
      c: `// Prim`, cpp: `// Prim`, java: `// Prim`, javascript: `// Prim`, python: `# Prim`
    }
  },
  {
    id: "warshall",
    name: "Warshall's Algo (Floyd-Warshall)",
    description: "Calculates the shortest paths between all pairs of nodes in a weighted graph with positive or negative edge weights.",
    iconName: "Network",
    category: "Graphs",
    complexity: { time: "O(V^3)", space: "O(V^2)" },
    implementations: {
      c: `// Warshall`, cpp: `// Warshall`, java: `// Warshall`, javascript: `// Warshall`, python: `# Warshall`
    }
  },
  {
    id: "strassen",
    name: "Strassen's Algo",
    description: "An algorithm used for matrix multiplication. It is faster than the standard matrix multiplication algorithm.",
    iconName: "Layers",
    category: "Data Structures",
    complexity: { time: "O(n^2.81)", space: "O(n^2)" },
    implementations: {
      c: `// Strassen`, cpp: `// Strassen`, java: `// Strassen`, javascript: `// Strassen`, python: `# Strassen`
    }
  },
  {
    id: "circular-queue",
    name: "Circular Queue",
    description: "A linear data structure in which the operations are performed based on FIFO principle and the last position is connected back to the first position.",
    iconName: "Database",
    category: "Stack & Queue",
    complexity: { time: "O(1)", space: "O(n)" },
    implementations: {
      c: `// Circular Queue`, cpp: `// Circular Queue`, java: `// Circular Queue`, javascript: `// Circular Queue`, python: `# Circular Queue`
    }
  },
  {
    id: "priority-queue",
    name: "Priority Queue",
    description: "An abstract data type similar to a regular queue or stack data structure in which each element additionally has a priority associated with it.",
    iconName: "Database",
    category: "Stack & Queue",
    complexity: { time: "O(log n)", space: "O(n)" },
    implementations: {
      c: `// Priority Queue`, cpp: `// Priority Queue`, java: `// Priority Queue`, javascript: `// Priority Queue`, python: `# Priority Queue`
    }
  },
  {
    id: "doubly-linked-list",
    name: "Doubly Linked List",
    description: "A linked data structure that consists of a set of sequentially linked records called nodes. Each node contains a link to the previous as well as to the next node.",
    iconName: "GitBranch",
    category: "Linked List",
    complexity: { time: "O(n)", space: "O(n)" },
    implementations: {
      c: `// Doubly Linked List`, cpp: `// Doubly Linked List`, java: `// Doubly Linked List`, javascript: `// Doubly Linked List`, python: `# Doubly Linked List`
    }
  },
  {
    id: "circular-linked-list",
    name: "Circular Linked List",
    description: "A variation of linked list in which the first element points to the last element and the last element points to the first element.",
    iconName: "GitBranch",
    category: "Linked List",
    complexity: { time: "O(n)", space: "O(n)" },
    implementations: {
      c: `// Circular Linked List`, cpp: `// Circular Linked List`, java: `// Circular Linked List`, javascript: `// Circular Linked List`, python: `# Circular Linked List`
    }
  },
  {
    id: "huffman-coding",
    name: "Huffman Coding",
    description: "A lossless data compression algorithm. The idea is to assign variable-length codes to input characters.",
    iconName: "Share2",
    category: "Trees",
    complexity: { time: "O(n log n)", space: "O(n)" },
    implementations: {
      c: `// Huffman Coding`, cpp: `// Huffman Coding`, java: `// Huffman Coding`, javascript: `// Huffman Coding`, python: `# Huffman Coding`
    }
  },
  {
    id: "threaded-binary-tree",
    name: "Threaded Binary Tree",
    description: "A binary tree variant that facilitates traversal without a stack or recursion by making use of empty child pointers.",
    iconName: "Share2",
    category: "Trees",
    complexity: { time: "O(n)", space: "O(1)" },
    implementations: {
      c: `// Threaded Tree`, cpp: `// Threaded Tree`, java: `// Threaded Tree`, javascript: `// Threaded Tree`, python: `# Threaded Tree`
    }
  },
  {
    id: "fibonacci-dp",
    name: "Fibonacci (DP)",
    description: "Computing Fibonacci numbers using dynamic programming to avoid redundant calculations.",
    iconName: "Binary",
    category: "Dynamic Programming",
    complexity: { time: "O(n)", space: "O(n) or O(1)" },
    implementations: {
      c: `// Fibonacci DP`, cpp: `// Fibonacci DP`, java: `// Fibonacci DP`, javascript: `// Fibonacci DP`, python: `# Fibonacci DP`
    }
  },
  {
    id: "knapsack-problem",
    name: "0/1 Knapsack",
    description: "A problem in combinatorial optimization: given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit.",
    iconName: "Binary",
    category: "Dynamic Programming",
    complexity: { time: "O(nW)", space: "O(nW)" },
    implementations: {
      c: `// Knapsack`, cpp: `// Knapsack`, java: `// Knapsack`, javascript: `// Knapsack`, python: `# Knapsack`
    }
  },
  {
    id: "lcs",
    name: "Longest Common Subsequence",
    description: "Finding the longest subsequence common to two sequences.",
    iconName: "Binary",
    category: "Dynamic Programming",
    complexity: { time: "O(nm)", space: "O(nm)" },
    implementations: {
      c: `// LCS`, cpp: `// LCS`, java: `// LCS`, javascript: `// LCS`, python: `# LCS`
    }
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    description: "A linear ordering of vertices such that for every directed edge uv, vertex u comes before v in the ordering.",
    iconName: "Network",
    category: "Graphs",
    complexity: { time: "O(V+E)", space: "O(V)" },
    implementations: {
      c: `// Topological Sort`, cpp: `// Topological Sort`, java: `// Topological Sort`, javascript: `// Topological Sort`, python: `# Topological Sort`
    }
  },
  {
    id: "a-star",
    name: "A* Search",
    description: "A graph traversal and path search algorithm, which is often used in computer science due to its completeness, optimality, and optimal efficiency.",
    iconName: "Network",
    category: "Graphs",
    complexity: { time: "O(E)", space: "O(V)" },
    implementations: {
      c: `// A*`, cpp: `// A*`, java: `// A*`, javascript: `// A*`, python: `# A*`
    }
  },
  {
    id: "kmp-search",
    name: "KMP Algorithm",
    description: "Searches for occurrences of a 'word' W within a main 'text string' S by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin.",
    iconName: "Search",
    category: "Searching",
    complexity: { time: "O(n+m)", space: "O(m)" },
    implementations: {
      c: `// KMP`, cpp: `// KMP`, java: `// KMP`, javascript: `// KMP`, python: `# KMP`
    }
  },
  {
    id: "segment-tree",
    name: "Segment Tree",
    description: "A tree data structure used for storing information about intervals, or segments. It allows querying which of the stored segments contain a given point.",
    iconName: "Share2",
    category: "Advanced Data Structures",
    complexity: { time: "O(log n) query/update", space: "O(n)" },
    implementations: {
      c: `// Segment Tree`, cpp: `// Segment Tree`, java: `// Segment Tree`, javascript: `// Segment Tree`, python: `# Segment Tree`
    }
  },
  {
    id: "fenwick-tree",
    name: "Fenwick Tree (BIT)",
    description: "A data structure that can efficiently update elements and calculate prefix sums in a table of numbers.",
    iconName: "Share2",
    category: "Advanced Data Structures",
    complexity: { time: "O(log n)", space: "O(n)" },
    implementations: {
      c: `// BIT`, cpp: `// BIT`, java: `// BIT`, javascript: `// BIT`, python: `# BIT`
    }
  },
  {
    id: "dsu",
    name: "Disjoint Set Union (DSU)",
    description: "A data structure that stores a collection of disjoint (non-overlapping) sets.",
    iconName: "Share2",
    category: "Advanced Data Structures",
    complexity: { time: "O(α(n))", space: "O(n)" },
    implementations: {
      c: `// DSU`, cpp: `// DSU`, java: `// DSU`, javascript: `// DSU`, python: `# DSU`
    }
  }
];
