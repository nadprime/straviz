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
      c: `int getAt(int arr[], int n, int i) { return (i >= 0 && i < n) ? arr[i] : -1; }\nvoid setAt(int arr[], int n, int i, int v) { if (i >= 0 && i < n) arr[i] = v; }`,
      cpp: `int getAt(const vector<int>& a, int i){ return (i>=0 && i<(int)a.size()) ? a[i] : -1; }\nvoid setAt(vector<int>& a, int i, int v){ if(i>=0 && i<(int)a.size()) a[i]=v; }`,
      java: `int getAt(int[] arr, int i){ return (i>=0 && i<arr.length) ? arr[i] : -1; }\nvoid setAt(int[] arr, int i, int v){ if(i>=0 && i<arr.length) arr[i]=v; }`,
      javascript: `function getAt(arr, i){ return i >= 0 && i < arr.length ? arr[i] : -1; }\nfunction setAt(arr, i, v){ if (i >= 0 && i < arr.length) arr[i] = v; }`,
      python: `def get_at(arr, i):\n    return arr[i] if 0 <= i < len(arr) else -1\n\ndef set_at(arr, i, v):\n    if 0 <= i < len(arr):\n        arr[i] = v`
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
      c: `#define SIZE 101\ntypedef struct { int key, value, used; } Entry;\nEntry table[SIZE];\nint hash(int k){ return (k % SIZE + SIZE) % SIZE; }`,
      cpp: `unordered_map<int,int> mp;\nmp[key] = value;\nif (mp.count(key)) { int v = mp[key]; }`,
      java: `Map<Integer,Integer> map = new HashMap<>();\nmap.put(key, value);\nif (map.containsKey(key)) { int v = map.get(key); }`,
      javascript: `const map = new Map();\nmap.set(key, value);\nif (map.has(key)) { const v = map.get(key); }`,
      python: `table = {}\ntable[key] = value\nif key in table:\n    v = table[key]`
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
      c: `void heapify(int a[], int n, int i){ int l=2*i+1,r=2*i+2,m=i; if(l<n&&a[l]>a[m])m=l; if(r<n&&a[r]>a[m])m=r; if(m!=i){int t=a[i];a[i]=a[m];a[m]=t; heapify(a,n,m);} }`,
      cpp: `void heapSort(vector<int>& a){ make_heap(a.begin(), a.end()); sort_heap(a.begin(), a.end()); }`,
      java: `void heapSort(int[] a){ PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder()); for(int x:a)pq.add(x); for(int i=a.length-1;i>=0;i--) a[i]=pq.poll(); }`,
      javascript: `function heapSort(arr){ return [...arr].sort((a,b)=>a-b); }`,
      python: `import heapq\ndef heap_sort(arr):\n    h = arr[:]\n    heapq.heapify(h)\n    return [heapq.heappop(h) for _ in range(len(h))]`
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
      c: `void countingSort(int a[], int n) {
      int maxVal = a[0];
      for (int i = 1; i < n; i++) if (a[i] > maxVal) maxVal = a[i];

      int count[maxVal + 1];
      memset(count, 0, sizeof(count));
      for (int i = 0; i < n; i++) count[a[i]]++;
      for (int i = 1; i <= maxVal; i++) count[i] += count[i - 1];

      int out[n];
      for (int i = n - 1; i >= 0; i--) out[--count[a[i]]] = a[i];
      for (int i = 0; i < n; i++) a[i] = out[i];
    }`,
      cpp: `vector<int> countingSort(const vector<int>& a) {
      int k = *max_element(a.begin(), a.end());
      vector<int> count(k + 1, 0), out(a.size());

      for (int x : a) count[x]++;
      for (int i = 1; i <= k; i++) count[i] += count[i - 1];
      for (int i = (int)a.size() - 1; i >= 0; i--) out[--count[a[i]]] = a[i];

      return out;
    }`,
      java: `int[] countingSort(int[] a) {
      int k = Arrays.stream(a).max().orElse(0);
      int[] count = new int[k + 1];
      int[] out = new int[a.length];

      for (int x : a) count[x]++;
      for (int i = 1; i <= k; i++) count[i] += count[i - 1];
      for (int i = a.length - 1; i >= 0; i--) out[--count[a[i]]] = a[i];

      return out;
    }`,
      javascript: `function countingSort(a) {
      const k = Math.max(...a);
      const count = Array(k + 1).fill(0);
      const out = Array(a.length);

      for (const x of a) count[x]++;
      for (let i = 1; i <= k; i++) count[i] += count[i - 1];
      for (let i = a.length - 1; i >= 0; i--) out[--count[a[i]]] = a[i];

      return out;
    }`,
      python: `def counting_sort(a):\n    k=max(a)\n    c=[0]*(k+1)\n    out=[0]*len(a)\n    for x in a: c[x]+=1\n    for i in range(1,k+1): c[i]+=c[i-1]\n    for x in reversed(a):\n        c[x]-=1\n        out[c[x]]=x\n    return out`
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
      c: `/* Bucket sort for values in [0,1):
   1) scatter into buckets
   2) sort each bucket
   3) concatenate */`,
      cpp: `vector<float> bucketSort(vector<float> a) {
  int n = a.size();
  vector<vector<float>> buckets(n);

  for (float x : a) {
    int idx = min(n - 1, (int)(x * n));
    buckets[idx].push_back(x);
  }

  for (auto& b : buckets) sort(b.begin(), b.end());

  vector<float> out;
  for (auto& b : buckets) out.insert(out.end(), b.begin(), b.end());
  return out;
}`,
      java: `void bucketSort(float[] a) {
  int n = a.length;
  List<Float>[] buckets = new ArrayList[n];
  for (int i = 0; i < n; i++) buckets[i] = new ArrayList<>();

  for (float x : a) {
    int idx = Math.min(n - 1, (int)(x * n));
    buckets[idx].add(x);
  }

  int k = 0;
  for (List<Float> b : buckets) {
    Collections.sort(b);
    for (float x : b) a[k++] = x;
  }
}`,
      javascript: `function bucketSort(a) {
  const n = a.length;
  const buckets = Array.from({ length: n }, () => []);

  for (const x of a) {
    const idx = Math.min(n - 1, Math.floor(x * n));
    buckets[idx].push(x);
  }

  buckets.forEach((b) => b.sort((p, q) => p - q));
  return buckets.flat();
}`,
      python: `def bucket_sort(a):\n    n=len(a)\n    b=[[] for _ in range(n)]\n    for x in a: b[min(n-1,int(x*n))].append(x)\n    return [v for bk in b for v in sorted(bk)]`
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
      c: `void inorder(struct Node* root) {
  if (!root) return;
  inorder(root->left);
  printf("%d ", root->key);
  inorder(root->right);
}`, cpp: `void inorder(Node* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->key << " ";
  inorder(root->right);
}`, java: `void inorder(Node root) {
  if (root == null) return;
  inorder(root.left);
  System.out.print(root.key + " " );
  inorder(root.right);
}`, javascript: `function inorder(root) {
  if (!root) return;
  inorder(root.left);
  console.log(root.key);
  inorder(root.right);
}`, python: `def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.key, end=" " )
    inorder(root.right)`
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
      c: `void preorder(struct Node* root) {
  if (!root) return;
  printf("%d ", root->key);
  preorder(root->left);
  preorder(root->right);
}`, cpp: `void preorder(Node* root) {
  if (!root) return;
  cout << root->key << " ";
  preorder(root->left);
  preorder(root->right);
}`, java: `void preorder(Node root) {
  if (root == null) return;
  System.out.print(root.key + " " );
  preorder(root.left);
  preorder(root.right);
}`, javascript: `function preorder(root) {
  if (!root) return;
  console.log(root.key);
  preorder(root.left);
  preorder(root.right);
}`, python: `def preorder(root):
    if not root:
        return
    print(root.key, end=" " )
    preorder(root.left)
    preorder(root.right)`
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
      c: `void postorder(struct Node* root) {
  if (!root) return;
  postorder(root->left);
  postorder(root->right);
  printf("%d ", root->key);
}`, cpp: `void postorder(Node* root) {
  if (!root) return;
  postorder(root->left);
  postorder(root->right);
  cout << root->key << " ";
}`, java: `void postorder(Node root) {
  if (root == null) return;
  postorder(root.left);
  postorder(root.right);
  System.out.print(root.key + " " );
}`, javascript: `function postorder(root) {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.key);
}`, python: `def postorder(root):
    if not root:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.key, end=" " )`
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
      c: `/* AVL insertion uses rotations based on balance factor. */`, cpp: `int height(Node* n){ return n ? n->h : 0; }
int balance(Node* n){ return n ? height(n->left)-height(n->right) : 0; }
Node* rotateRight(Node* y){ Node* x=y->left; y->left=x->right; x->right=y; return x; }
Node* rotateLeft(Node* x){ Node* y=x->right; x->right=y->left; y->left=x; return y; }`, java: `int height(Node n){ return n == null ? 0 : n.h; }
int balance(Node n){ return n == null ? 0 : height(n.left)-height(n.right); }
Node rotateRight(Node y){ Node x=y.left; y.left=x.right; x.right=y; return x; }
Node rotateLeft(Node x){ Node y=x.right; x.right=y.left; y.left=x; return y; }`, javascript: `function height(n){ return n ? n.h : 0; }
function balance(n){ return n ? height(n.left)-height(n.right) : 0; }
function rotateRight(y){ const x=y.left; y.left=x.right; x.right=y; return x; }
function rotateLeft(x){ const y=x.right; x.right=y.left; y.left=x; return y; }`, python: `def height(n):
    return n.h if n else 0

def balance(n):
    return height(n.left)-height(n.right) if n else 0

def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    return x`
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
      c: `/* B-Tree insert splits full children before descent. */`, cpp: `class BTreeNode {
public:
  vector<int> keys;
  vector<BTreeNode*> child;
  bool leaf = true;
};`, java: `class BTreeNode {
  List<Integer> keys = new ArrayList<>();
  List<BTreeNode> child = new ArrayList<>();
  boolean leaf = true;
}`, javascript: `class BTreeNode {
  constructor(){
    this.keys = [];
    this.child = [];
    this.leaf = true;
  }
}`, python: `class BTreeNode:
    def __init__(self):
        self.keys = []
        self.child = []
        self.leaf = True`
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
      c: `/* A*: keep open set ordered by f(n)=g(n)+h(n), relax neighbors and track parent. */`,
      cpp: `vector<int> aStar(int s, int t, vector<vector<pair<int,int>>>& g, vector<int>& h){
  const int INF = 1e9;
  vector<int> gs(g.size(), INF), parent(g.size(), -1);
  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
  gs[s] = 0;
  pq.push({h[s], s});

  while(!pq.empty()){
    auto [f,u] = pq.top(); pq.pop();
    if(u == t) break;
    for(auto [v,w] : g[u]) if(gs[u] + w < gs[v]){
      gs[v] = gs[u] + w;
      parent[v] = u;
      pq.push({gs[v] + h[v], v});
    }
  }

  return parent;
}`,
      java: `int[] aStar(List<int[]>[] g, int s, int t, int[] h){
  int n = g.length, INF = 1_000_000_000;
  int[] gs = new int[n], parent = new int[n];
  Arrays.fill(gs, INF);
  Arrays.fill(parent, -1);
  PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
  gs[s] = 0;
  pq.add(new int[]{h[s], s});

  while(!pq.isEmpty()){
    int u = pq.poll()[1];
    if(u == t) break;
    for(int[] e : g[u]){
      int v = e[0], w = e[1];
      if(gs[u] + w < gs[v]){
        gs[v] = gs[u] + w;
        parent[v] = u;
        pq.add(new int[]{gs[v] + h[v], v});
      }
    }
  }

  return parent;
}`,
      javascript: `function aStar(start, goal, graph, h) {
  const gScore = Object.fromEntries(Object.keys(graph).map((k) => [k, Infinity]));
  const parent = Object.fromEntries(Object.keys(graph).map((k) => [k, null]));
  const open = [[h[start], start]];
  gScore[start] = 0;

  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [, u] = open.shift();
    if (u === goal) break;
    for (const [v, w] of graph[u]) {
      const cand = gScore[u] + w;
      if (cand < gScore[v]) {
        gScore[v] = cand;
        parent[v] = u;
        open.push([cand + h[v], v]);
      }
    }
  }

  return parent;
}`,
      python: `import heapq

def a_star(start, goal, graph, h):
    g_score = {u: float("inf") for u in graph}
    parent = {u: None for u in graph}
    pq = [(h[start], start)]
    g_score[start] = 0

    while pq:
        _, u = heapq.heappop(pq)
        if u == goal:
            break
        for v, w in graph[u]:
            cand = g_score[u] + w
            if cand < g_score[v]:
                g_score[v] = cand
                parent[v] = u
                heapq.heappush(pq, (cand + h[v], v))

    return parent`
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
      c: `/* Relax all edges V-1 times; detect negative cycle on extra pass. */`,
      cpp: `vector<int> bellmanFord(int n, vector<tuple<int,int,int>> edges, int s){ const int INF=1e9; vector<int>d(n,INF); d[s]=0; for(int i=0;i<n-1;i++) for(auto [u,v,w]:edges) if(d[u]<INF && d[u]+w<d[v]) d[v]=d[u]+w; return d; }`,
      java: `int[] bellmanFord(int n, int[][] edges, int s){ int INF=1_000_000_000; int[] d=new int[n]; Arrays.fill(d,INF); d[s]=0; for(int i=0;i<n-1;i++) for(int[] e:edges){ int u=e[0],v=e[1],w=e[2]; if(d[u]<INF && d[u]+w<d[v]) d[v]=d[u]+w; } return d; }`,
      javascript: `function bellmanFord(n, edges, s){ const d=Array(n).fill(Infinity); d[s]=0; for(let i=0;i<n-1;i++) for(const [u,v,w] of edges) if(d[u]!==Infinity && d[u]+w<d[v]) d[v]=d[u]+w; return d; }`,
      python: `def bellman_ford(n, edges, s):\n    d=[float('inf')]*n\n    d[s]=0\n    for _ in range(n-1):\n        for u,v,w in edges:\n            if d[u] != float('inf') and d[u]+w < d[v]:\n                d[v] = d[u]+w\n    return d`
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
      c: `/* Kruskal: sort edges by weight and union components using DSU. */`,
      cpp: `int kruskal(int n, vector<tuple<int,int,int>> e){ sort(e.begin(),e.end(),[](auto&a,auto&b){return get<2>(a)<get<2>(b);}); return 0; }`,
      java: `int kruskal(int n, int[][] edges){ Arrays.sort(edges, Comparator.comparingInt(a->a[2])); return 0; }`,
      javascript: `function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const p = Array.from({ length: n }, (_, i) => i);
  const r = Array(n).fill(0);
  const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
  let cost = 0;

  for (const [u, v, w] of edges) {
    let ru = find(u), rv = find(v);
    if (ru === rv) continue;
    if (r[ru] < r[rv]) [ru, rv] = [rv, ru];
    p[rv] = ru;
    if (r[ru] === r[rv]) r[ru]++;
    cost += w;
  }

  return cost;
}`,
        python: `def kruskal(n, edges):
      edges.sort(key=lambda e: e[2])
      p = list(range(n))
      r = [0] * n

      def find(x):
        if p[x] != x:
          p[x] = find(p[x])
        return p[x]

      cost = 0
      for u, v, w in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
          continue
        if r[ru] < r[rv]:
          ru, rv = rv, ru
        p[rv] = ru
        if r[ru] == r[rv]:
          r[ru] += 1
        cost += w

      return cost`
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
      c: `/* Prim: grow MST by repeatedly adding minimum edge from visited set. */`,
      cpp: `int prim(int n, vector<vector<pair<int,int>>> &g){ return 0; }`,
      java: `int prim(List<int[]>[] g){ return 0; }`,
      javascript: `function prim(graph, start = 0) {
  const n = graph.length;
  const used = Array(n).fill(false);
  const dist = Array(n).fill(Infinity);
  dist[start] = 0;
  let total = 0;

  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let v = 0; v < n; v++) if (!used[v] && (u === -1 || dist[v] < dist[u])) u = v;
    used[u] = true;
    total += dist[u];
    for (const [to, w] of graph[u]) if (!used[to] && w < dist[to]) dist[to] = w;
  }

  return total;
}`,
      python: `def prim(graph, start=0):
    n = len(graph)
    used = [False] * n
    dist = [float("inf")] * n
    dist[start] = 0
    total = 0

    for _ in range(n):
        u = min((i for i in range(n) if not used[i]), key=lambda i: dist[i])
        used[u] = True
        total += dist[u]
        for to, w in graph[u]:
            if not used[to] and w < dist[to]:
                dist[to] = w

    return total`
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
      c: `void floydWarshall(int d[][N], int n){ for(int k=0;k<n;k++) for(int i=0;i<n;i++) for(int j=0;j<n;j++) if(d[i][k]+d[k][j] < d[i][j]) d[i][j]=d[i][k]+d[k][j]; }`,
      cpp: `void floyd(vector<vector<int>>& d){ int n=d.size(); for(int k=0;k<n;k++) for(int i=0;i<n;i++) for(int j=0;j<n;j++) d[i][j]=min(d[i][j], d[i][k]+d[k][j]); }`,
      java: `void floyd(int[][] d){ int n=d.length; for(int k=0;k<n;k++) for(int i=0;i<n;i++) for(int j=0;j<n;j++) d[i][j]=Math.min(d[i][j], d[i][k]+d[k][j]); }`,
      javascript: `function floyd(d){ const n=d.length; for(let k=0;k<n;k++) for(let i=0;i<n;i++) for(let j=0;j<n;j++) d[i][j]=Math.min(d[i][j], d[i][k]+d[k][j]); return d; }`,
      python: `def floyd(d):\n    n=len(d)\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                d[i][j]=min(d[i][j], d[i][k]+d[k][j])\n    return d`
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
      c: `/* Strassen multiplies 2x2 blocks using 7 products (P1..P7) instead of 8. */`,
      cpp: `vector<vector<int>> strassen2x2(vector<vector<int>> A, vector<vector<int>> B){ return {{A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]}, {A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]}}; }`,
      java: `int[][] mul(int[][] A, int[][] B){ return new int[][]{{A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]}, {A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]}}; }`,
      javascript: `function mul2x2(A,B){ return [[A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],[A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]]]; }`,
      python: `def mul_2x2(A,B):\n    return [[A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],[A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]]]`
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
      c: `int q[N], front=0, rear=0, cnt=0; void enq(int x){ if(cnt==N) return; q[rear]=x; rear=(rear+1)%N; cnt++; } int deq(){ if(!cnt) return -1; int v=q[front]; front=(front+1)%N; cnt--; return v; }`,
      cpp: `struct CQ{ vector<int> q; int f=0,r=0,c=0; CQ(int n):q(n){} };`,
      java: `class CQueue{ int[] q; int f=0,r=0,c=0; CQueue(int n){ q=new int[n]; } }`,
      javascript: `class CircularQueue{ constructor(n){ this.q=Array(n); this.f=0; this.r=0; this.c=0; } }`,
      python: `class CircularQueue:\n    def __init__(self,n):\n        self.q=[None]*n; self.f=self.r=self.c=0`
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
      c: `/* Priority queue can be implemented using binary heap. */`,
      cpp: `priority_queue<int, vector<int>, greater<int>> pq; pq.push(x); int v=pq.top(); pq.pop();`,
      java: `PriorityQueue<Integer> pq = new PriorityQueue<>(); pq.add(x); int v = pq.poll();`,
      javascript: `const pq = []; const push=x=>{pq.push(x); pq.sort((a,b)=>a-b)}; const pop=()=>pq.shift();`,
      python: `import heapq\npq=[]\nheapq.heappush(pq, x)\nv=heapq.heappop(pq)`
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
      c: `typedef struct Node{ int v; struct Node *prev,*next; } Node;`,
      cpp: `struct Node{ int v; Node *prev,*next; Node(int x):v(x),prev(nullptr),next(nullptr){} };`,
      java: `class Node { int v; Node prev, next; Node(int v){ this.v=v; } }`,
      javascript: `class Node { constructor(v){ this.v=v; this.prev=null; this.next=null; } }`,
      python: `class Node:\n    def __init__(self, v):\n        self.v=v\n        self.prev=None\n        self.next=None`
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
      c: `/* In circular list, tail->next points to head. */`,
      cpp: `struct Node{ int v; Node* next; };`,
      java: `class Node { int v; Node next; Node(int v){ this.v=v; } }`,
      javascript: `class Node { constructor(v){ this.v=v; this.next=null; } }`,
      python: `class Node:\n    def __init__(self, v):\n        self.v=v\n        self.next=None`
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
      c: `/* Build min-heap of frequencies; repeatedly merge two minimum nodes. */`,
      cpp: `/* Use priority_queue<Node*, vector<Node*>, Cmp> for Huffman tree. */`,
      java: `/* Use PriorityQueue<Node> ordered by frequency for Huffman coding. */`,
      javascript: `// Use a min-heap of [freq, node], merge until one root remains.`,
      python: `# Use heapq with (freq, counter, node), merge two minimum each step.`
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
      c: `/* Threaded tree stores inorder predecessor/successor in null child pointers. */`,
      cpp: `struct Node{ int v; Node *l,*r; bool lThread,rThread; };`,
      java: `class Node { int v; Node left, right; boolean lThread, rThread; }`,
      javascript: `class Node { constructor(v){ this.v=v; this.left=this.right=null; this.lThread=false; this.rThread=false; } }`,
      python: `class Node:\n    def __init__(self, v):\n        self.v=v\n        self.left=self.right=None\n        self.l_thread=self.r_thread=False`
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
      c: `int fib(int n){ if(n<=1) return n; int a=0,b=1; for(int i=2;i<=n;i++){ int c=a+b; a=b; b=c; } return b; }`,
      cpp: `int fib(int n){ if(n<=1) return n; int a=0,b=1; for(int i=2;i<=n;i++){ int c=a+b; a=b; b=c; } return b; }`,
      java: `int fib(int n){ if(n<=1) return n; int a=0,b=1; for(int i=2;i<=n;i++){ int c=a+b; a=b; b=c; } return b; }`,
      javascript: `function fib(n){ if(n<=1) return n; let a=0,b=1; for(let i=2;i<=n;i++){ [a,b]=[b,a+b]; } return b; }`,
      python: `def fib(n):\n    if n <= 1: return n\n    a,b = 0,1\n    for _ in range(2,n+1):\n        a,b = b,a+b\n    return b`
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
      c: `int knap(int W,int wt[],int val[],int n){ int dp[W+1]; memset(dp,0,sizeof(dp)); for(int i=0;i<n;i++) for(int w=W;w>=wt[i];w--) dp[w]=dp[w]>dp[w-wt[i]]+val[i]?dp[w]:dp[w-wt[i]]+val[i]; return dp[W]; }`,
      cpp: `int knap(int W, vector<int>& wt, vector<int>& val){ vector<int> dp(W+1); for(int i=0;i<(int)wt.size();i++) for(int w=W; w>=wt[i]; w--) dp[w]=max(dp[w], dp[w-wt[i]]+val[i]); return dp[W]; }`,
      java: `int knap(int W, int[] wt, int[] val){ int[] dp=new int[W+1]; for(int i=0;i<wt.length;i++) for(int w=W; w>=wt[i]; w--) dp[w]=Math.max(dp[w], dp[w-wt[i]]+val[i]); return dp[W]; }`,
      javascript: `function knap(W, wt, val){ const dp=Array(W+1).fill(0); for(let i=0;i<wt.length;i++) for(let w=W; w>=wt[i]; w--) dp[w]=Math.max(dp[w], dp[w-wt[i]]+val[i]); return dp[W]; }`,
      python: `def knap(W, wt, val):\n    dp=[0]*(W+1)\n    for i in range(len(wt)):\n        for w in range(W, wt[i]-1, -1):\n            dp[w]=max(dp[w], dp[w-wt[i]]+val[i])\n    return dp[W]`
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
      c: `/* LCS DP: dp[i][j] = (a[i-1]==b[j-1]) ? dp[i-1][j-1]+1 : max(dp[i-1][j],dp[i][j-1]) */`,
      cpp: `int lcs(string a,string b){ vector<vector<int>> dp(a.size()+1, vector<int>(b.size()+1)); for(int i=1;i<=a.size();i++) for(int j=1;j<=b.size();j++) dp[i][j]=(a[i-1]==b[j-1])?dp[i-1][j-1]+1:max(dp[i-1][j],dp[i][j-1]); return dp[a.size()][b.size()]; }`,
      java: `int lcs(String a,String b){ int[][] dp=new int[a.length()+1][b.length()+1]; for(int i=1;i<=a.length();i++) for(int j=1;j<=b.length();j++) dp[i][j]=(a.charAt(i-1)==b.charAt(j-1))?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]); return dp[a.length()][b.length()]; }`,
      javascript: `function lcs(a,b){ const dp=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0)); for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]); return dp[a.length][b.length]; }`,
      python: `def lcs(a,b):\n    dp=[[0]*(len(b)+1) for _ in range(len(a)+1)]\n    for i in range(1,len(a)+1):\n        for j in range(1,len(b)+1):\n            dp[i][j]=dp[i-1][j-1]+1 if a[i-1]==b[j-1] else max(dp[i-1][j],dp[i][j-1])\n    return dp[-1][-1]`
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
      c: `/* Kahn's algorithm: compute indegree, push zeros to queue, pop and relax edges. */`,
      cpp: `vector<int> topo(int n, vector<vector<int>>& g){ vector<int> in(n),res; queue<int> q; for(int u=0;u<n;u++) for(int v:g[u]) in[v]++; for(int i=0;i<n;i++) if(!in[i]) q.push(i); while(!q.empty()){ int u=q.front();q.pop(); res.push_back(u); for(int v:g[u]) if(--in[v]==0) q.push(v);} return res; }`,
      java: `List<Integer> topo(List<Integer>[] g){ int n=g.length; int[] in=new int[n]; for(int u=0;u<n;u++) for(int v:g[u]) in[v]++; Queue<Integer> q=new ArrayDeque<>(); for(int i=0;i<n;i++) if(in[i]==0) q.add(i); List<Integer> out=new ArrayList<>(); while(!q.isEmpty()){ int u=q.poll(); out.add(u); for(int v:g[u]) if(--in[v]==0) q.add(v);} return out; }`,
      javascript: `function topo(graph){ const inDeg={}; Object.keys(graph).forEach(u=>{inDeg[u]??=0; graph[u].forEach(v=>inDeg[v]=(inDeg[v]||0)+1)}); const q=Object.keys(inDeg).filter(k=>inDeg[k]===0), out=[]; while(q.length){ const u=q.shift(); out.push(u); for(const v of graph[u]||[]) if(--inDeg[v]===0) q.push(v); } return out; }`,
      python: `from collections import deque\ndef topo(g):\n    indeg={u:0 for u in g}\n    for u in g:\n        for v in g[u]: indeg[v]=indeg.get(v,0)+1\n    q=deque([u for u in indeg if indeg[u]==0])\n    out=[]\n    while q:\n        u=q.popleft(); out.append(u)\n        for v in g.get(u,[]):\n            indeg[v]-=1\n            if indeg[v]==0: q.append(v)\n    return out`
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
      c: `/* A*: keep open set ordered by f(n)=g(n)+h(n), relax neighbors and track parent. */`,
      cpp: `vector<int> aStar(int s, int t, vector<vector<pair<int,int>>>& g, vector<int>& h){
  const int INF = 1e9;
  vector<int> gs(g.size(), INF), parent(g.size(), -1);
  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
  gs[s] = 0;
  pq.push({h[s], s});
  while(!pq.empty()){
    auto [f,u] = pq.top(); pq.pop();
    if(u == t) break;
    for(auto [v,w] : g[u]) if(gs[u] + w < gs[v]){
      gs[v] = gs[u] + w;
      parent[v] = u;
      pq.push({gs[v] + h[v], v});
    }
  }
  return parent;
}`,
      java: `int[] aStar(List<int[]>[] g, int s, int t, int[] h){
  int n = g.length, INF = 1_000_000_000;
  int[] gs = new int[n], parent = new int[n];
  Arrays.fill(gs, INF); Arrays.fill(parent, -1);
  PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
  gs[s] = 0; pq.add(new int[]{h[s], s});
  while(!pq.isEmpty()){
    int u = pq.poll()[1];
    if(u == t) break;
    for(int[] e : g[u]){
      int v = e[0], w = e[1];
      if(gs[u] + w < gs[v]){ gs[v] = gs[u] + w; parent[v] = u; pq.add(new int[]{gs[v] + h[v], v}); }
    }
  }
  return parent;
}`,
      javascript: `function aStar(start, goal, graph, h) {
  const gScore = Object.fromEntries(Object.keys(graph).map((k) => [k, Infinity]));
  const parent = Object.fromEntries(Object.keys(graph).map((k) => [k, null]));
  const open = [[h[start], start]];
  gScore[start] = 0;

  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [, u] = open.shift();
    if (u === goal) break;
    for (const [v, w] of graph[u]) {
      const cand = gScore[u] + w;
      if (cand < gScore[v]) {
        gScore[v] = cand;
        parent[v] = u;
        open.push([cand + h[v], v]);
      }
    }
  }

  return parent;
}`,
      python: `import heapq

def a_star(start, goal, graph, h):
    g_score = {u: float("inf") for u in graph}
    parent = {u: None for u in graph}
    pq = [(h[start], start)]
    g_score[start] = 0

    while pq:
        _, u = heapq.heappop(pq)
        if u == goal:
            break
        for v, w in graph[u]:
            cand = g_score[u] + w
            if cand < g_score[v]:
                g_score[v] = cand
                parent[v] = u
                heapq.heappush(pq, (cand + h[v], v))

    return parent`
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
      c: `/* KMP: build LPS array, then scan text with pattern backtracking via LPS. */`,
      cpp: `int kmp(string t,string p){ vector<int> lps(p.size()); for(int i=1,len=0;i<p.size();) if(p[i]==p[len]) lps[i++]=++len; else if(len) len=lps[len-1]; else lps[i++]=0; for(int i=0,j=0;i<t.size();){ if(t[i]==p[j]){ i++; j++; if(j==p.size()) return i-j; } else if(j) j=lps[j-1]; else i++; } return -1; }`,
      java: `int kmp(String t,String p){ int[] lps=new int[p.length()]; for(int i=1,len=0;i<p.length();) if(p.charAt(i)==p.charAt(len)) lps[i++]=++len; else if(len!=0) len=lps[len-1]; else lps[i++]=0; for(int i=0,j=0;i<t.length();){ if(t.charAt(i)==p.charAt(j)){ i++; j++; if(j==p.length()) return i-j; } else if(j!=0) j=lps[j-1]; else i++; } return -1; }`,
      javascript: `function kmp(t,p){ const lps=Array(p.length).fill(0); for(let i=1,len=0;i<p.length;){ if(p[i]===p[len]) lps[i++]=++len; else if(len) len=lps[len-1]; else lps[i++]=0; } for(let i=0,j=0;i<t.length;){ if(t[i]===p[j]){ i++; j++; if(j===p.length) return i-j; } else if(j) j=lps[j-1]; else i++; } return -1; }`,
      python: `def kmp(t,p):\n    lps=[0]*len(p)\n    i,l=1,0\n    while i < len(p):\n        if p[i]==p[l]: l+=1; lps[i]=l; i+=1\n        elif l: l=lps[l-1]\n        else: i+=1\n    i=j=0\n    while i < len(t):\n        if t[i]==p[j]: i+=1; j+=1\n        if j==len(p): return i-j\n        if i < len(t) and t[i]!=p[j]: j=lps[j-1] if j else 0\n    return -1`
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
      c: `/* Segment tree supports range query and point update in O(log n). */`,
      cpp: `struct SegTree{ int n; vector<int> t; SegTree(int n):n(n),t(4*n){} int query(int v,int tl,int tr,int l,int r){ if(l>r) return 0; if(l==tl&&r==tr) return t[v]; int tm=(tl+tr)/2; return query(v*2,tl,tm,l,min(r,tm))+query(v*2+1,tm+1,tr,max(l,tm+1),r);} };`,
      java: `class SegTree { int[] t; int n; SegTree(int n){ this.n=n; t=new int[4*n]; } }`,
      javascript: `class SegTree { constructor(arr){ this.n=arr.length; this.t=Array(this.n*4).fill(0); } }`,
      python: `class SegTree:\n    def __init__(self, n):\n        self.n=n\n        self.t=[0]*(4*n)`
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
      c: `int bit[N]; void add(int i,int v){ for(++i;i<N;i+=i&-i) bit[i]+=v; } int sum(int i){ int s=0; for(++i;i>0;i-=i&-i) s+=bit[i]; return s; }`,
      cpp: `struct BIT{ int n; vector<int> b; BIT(int n):n(n),b(n+1){} void add(int i,int v){ for(++i;i<=n;i+=i&-i)b[i]+=v; } int sum(int i){ int s=0; for(++i;i>0;i-=i&-i)s+=b[i]; return s; } };`,
      java: `class BIT{ int[] b; int n; BIT(int n){this.n=n; b=new int[n+1];} void add(int i,int v){ for(i++;i<=n;i+=i&-i)b[i]+=v; } int sum(int i){ int s=0; for(i++;i>0;i-=i&-i)s+=b[i]; return s; } }`,
      javascript: `class BIT{ constructor(n){ this.n=n; this.b=Array(n+1).fill(0);} add(i,v){ for(i++;i<=this.n;i+=i&-i) this.b[i]+=v;} sum(i){ let s=0; for(i++;i>0;i-=i&-i) s+=this.b[i]; return s;} }`,
      python: `class BIT:\n    def __init__(self,n):\n        self.n=n; self.b=[0]*(n+1)\n    def add(self,i,v):\n        i+=1\n        while i<=self.n:\n            self.b[i]+=v; i+=i&-i\n    def sum(self,i):\n        s=0; i+=1\n        while i>0:\n            s+=self.b[i]; i-=i&-i\n        return s`
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
      c: `int p[N], rnk[N]; int find(int x){ return p[x]==x?x:(p[x]=find(p[x])); } void uni(int a,int b){ a=find(a); b=find(b); if(a==b)return; if(rnk[a]<rnk[b]){int t=a;a=b;b=t;} p[b]=a; if(rnk[a]==rnk[b]) rnk[a]++; }`,
      cpp: `struct DSU{ vector<int> p,r; DSU(int n):p(n),r(n){ iota(p.begin(),p.end(),0);} int find(int x){ return p[x]==x?x:p[x]=find(p[x]); } void unite(int a,int b){ a=find(a); b=find(b); if(a==b)return; if(r[a]<r[b]) swap(a,b); p[b]=a; if(r[a]==r[b]) r[a]++; } };`,
      java: `class DSU{ int[] p,r; DSU(int n){ p=new int[n]; r=new int[n]; for(int i=0;i<n;i++)p[i]=i; } int find(int x){ return p[x]==x?x:(p[x]=find(p[x])); } void unite(int a,int b){ a=find(a); b=find(b); if(a==b)return; if(r[a]<r[b]){int t=a;a=b;b=t;} p[b]=a; if(r[a]==r[b]) r[a]++; } }`,
      javascript: `class DSU{ constructor(n){ this.p=[...Array(n).keys()]; this.r=Array(n).fill(0);} find(x){ return this.p[x]===x?x:(this.p[x]=this.find(this.p[x])); } unite(a,b){ a=this.find(a); b=this.find(b); if(a===b) return; if(this.r[a]<this.r[b]) [a,b]=[b,a]; this.p[b]=a; if(this.r[a]===this.r[b]) this.r[a]++; } }`,
      python: `class DSU:\n    def __init__(self,n):\n        self.p=list(range(n)); self.r=[0]*n\n    def find(self,x):\n        if self.p[x]!=x: self.p[x]=self.find(self.p[x])\n        return self.p[x]\n    def unite(self,a,b):\n        a,b=self.find(a),self.find(b)\n        if a==b: return\n        if self.r[a]<self.r[b]: a,b=b,a\n        self.p[b]=a\n        if self.r[a]==self.r[b]: self.r[a]+=1`
    }
  }
];
