import { Algorithm } from "../types";
import { MORE_ALGORITHMS } from "./moreAlgorithms";

export const ALGORITHMS: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    iconName: "ArrowDownNarrowWide",
    category: "Sorting",
    complexity: { time: "O(n²)", space: "O(1)" },
    implementations: {
      c: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}`,
      cpp: `void bubbleSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        swap(arr[j], arr[j+1]);
      }
    }
  }
}`,
      java: `public static void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`,
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`
    }
  },
  {
    id: "binary-search",
    name: "Binary Search",
    description: "A fast search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    iconName: "Binary",
    category: "Searching",
    complexity: { time: "O(log n)", space: "O(1)" },
    implementations: {
      c: `int binarySearch(int arr[], int l, int r, int x) {
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (arr[m] == x) return m;
    if (arr[m] < x) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      cpp: `int binarySearch(vector<int>& arr, int x) {
  int l = 0, r = arr.size() - 1;
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (arr[m] == x) return m;
    if (arr[m] < x) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      java: `int binarySearch(int arr[], int x) {
  int l = 0, r = arr.length - 1;
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (arr[m] == x) return m;
    if (arr[m] < x) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      javascript: `function binarySearch(arr, x) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    let m = Math.floor(l + (r - l) / 2);
    if (arr[m] === x) return m;
    if (arr[m] < x) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      python: `def binary_search(arr, x):
    l, r = 0, len(arr) - 1
    while l <= r:
        m = l + (r - l) // 2
        if arr[m] == x:
            return m
        elif arr[m] < x:
            l = m + 1
        else:
            r = m - 1
    return -1`
    }
  },
  {
    id: "graph-bfs",
    name: "Breadth First Search",
    description: "An algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.",
    iconName: "Network",
    category: "Graphs",
    complexity: { time: "O(V + E)", space: "O(V)" },
    implementations: {
      c: `void BFS(int startNode) {
  bool visited[V];
  int queue[V], front = 0, rear = 0;
  visited[startNode] = true;
  queue[rear++] = startNode;
  while(front < rear) {
    int curr = queue[front++];
    for(int i = 0; i < adj[curr].size(); i++) {
      int neighbor = adj[curr][i];
      if(!visited[neighbor]) {
        visited[neighbor] = true;
        queue[rear++] = neighbor;
      }
    }
  }
}`,
      cpp: `void BFS(int start) {
  queue<int> q;
  vector<bool> visited(V, false);
  visited[start] = true; q.push(start);
  while(!q.empty()) {
    int curr = q.front(); q.pop();
    for(int neighbor : adj[curr]) {
      if(!visited[neighbor]) {
        visited[neighbor] = true; q.push(neighbor);
      }
    }
  }
}`,
      java: `void BFS(int start) {
  Queue<Integer> q = new LinkedList<>();
  boolean[] visited = new boolean[V];
  visited[start] = true; q.add(start);
  while (!q.isEmpty()) {
    int curr = q.poll();
    for (int neighbor : adj[curr]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true; q.add(neighbor);
      }
    }
  }
}`,
      javascript: `function BFS(start) {
  let queue = [start], visited = new Set();
  visited.add(start);
  while(queue.length > 0) {
    let curr = queue.shift();
    adj[curr].forEach(neighbor => {
      if(!visited.has(neighbor)) {
        visited.add(neighbor); queue.push(neighbor);
      }
    });
  }
}`,
      python: `def BFS(start):
    queue = [start]
    visited = {start}
    while queue:
        curr = queue.pop(0)
        for neighbor in adj[curr]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`
    }
  },
  {
    id: "stack",
    name: "Stack Operations",
    description: "A Last-In-First-Out (LIFO) data structure. The main operations are push (add item to top) and pop (remove item from top).",
    iconName: "Layers",
    category: "Stack & Queue",
    complexity: { time: "O(1) per op", space: "O(n)" },
    implementations: {
      c: `void push(int x) {
  if(top >= MAX-1) return;
  stack[++top] = x;
}

int pop() {
  if(top < 0) return -1;
  return stack[top--];
}`,
      cpp: `stack<int> s;
s.push(x);
int val = s.top();
s.pop();`,
      java: `Stack<Integer> s = new Stack<>();
s.push(x);
int val = s.pop();`,
      javascript: `let stack = [];
stack.push(x);
let val = stack.pop();`,
      python: `stack = []
stack.append(x)
val = stack.pop()`
    }
  },
  {
    id: "queue",
    name: "Queue Operations",
    description: "A First-In-First-Out (FIFO) data structure. The main operations are enqueue (add item to back) and dequeue (remove item from front).",
    iconName: "AlignJustify",
    category: "Stack & Queue",
    complexity: { time: "O(1) per op", space: "O(n)" },
    implementations: {
      c: `void enqueue(int x) {
  if(rear == MAX-1) return;
  queue[rear++] = x;
}

int dequeue() {
  if(front == rear) return -1;
  return queue[front++];
}`,
      cpp: `queue<int> q;
q.push(x);
int val = q.front();
q.pop();`,
      java: `Queue<Integer> q = new LinkedList<>();
q.add(x);
int val = q.poll();`,
      javascript: `let queue = [];
queue.push(x);
let val = queue.shift();`,
      python: `from collections import deque
q = deque()
q.append(x)
val = q.popleft()`
    }
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    description: "An efficient, stable, comparison-based, divide and conquer sorting algorithm. Most implementations produce a stable sort, meaning that the order of equal elements is the same in the input and output.",
    iconName: "Split",
    category: "Sorting",
    complexity: { time: "O(n log n)", space: "O(n)" },
    implementations: {
      c: `void merge(int arr[], int l, int m, int r) {
  // Merge two subarrays
}
void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
      cpp: `void mergeSort(vector<int>& arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
      java: `void sort(int arr[], int l, int r) {
  if (l < r) {
    int m = (l + r) / 2;
    sort(arr, l, m);
    sort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`,
      python: `def mergeSort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        mergeSort(L)
        mergeSort(R)
        merge(arr, L, R)`
    }
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    description: "Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
    iconName: "ListOrdered",
    category: "Sorting",
    complexity: { time: "O(n²)", space: "O(1)" },
    implementations: {
      c: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
      cpp: `void insertionSort(vector<int>& arr) {
  for (int i = 1; i < arr.size(); i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
      java: `void insertionSort(int arr[]) {
  for (int i = 1; i < arr.length; ++i) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
      python: `def insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >=0 and key < arr[j] :
                arr[j+1] = arr[j]
                j -= 1
        arr[j+1] = key`
    }
  },
  {
    id: "linked-list",
    name: "Linked List",
    description: "A linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next.",
    iconName: "GitCommitVertical",
    category: "Linked List",
    complexity: { time: "O(n)", space: "O(n)" },
    implementations: {
      c: `struct Node {
  int data;
  struct Node* next;
};
void push(struct Node** head_ref, int new_data) {
  struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
  new_node->data = new_data;
  new_node->next = (*head_ref);
  (*head_ref) = new_node;
}`,
      cpp: `class Node {
public:
  int data;
  Node* next;
};
void push(Node** head_ref, int new_data) {
  Node* new_node = new Node();
  new_node->data = new_data;
  new_node->next = (*head_ref);
  (*head_ref) = new_node;
}`,
      java: `class LinkedList {
  Node head;
  class Node {
    int data; Node next;
    Node(int d) { data = d; next = null; }
  }
  public void push(int new_data) {
    Node new_node = new Node(new_data);
    new_node.next = head;
    head = new_node;
  }
}`,
      javascript: `class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
function push(head, val) {
  let newNode = new Node(val);
  newNode.next = head;
  return newNode;
}`,
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def push(head, data):
    new_node = Node(data)
    new_node.next = head
    return new_node`
    }
  },
  {
    id: "bst-search",
    name: "BST Search",
    description: "Binary Search Tree is a node-based binary tree data structure which has properties like: Left subtree of a node contains nodes with keys less than node's key.",
    iconName: "Share2",
    category: "Trees",
    complexity: { time: "O(h)", space: "O(1)" },
    implementations: {
      c: `struct Node* search(struct Node* root, int key) {
  if (root == NULL || root->key == key)
    return root;
  if (root->key < key)
    return search(root->right, key);
  return search(root->left, key);
}`,
      cpp: `Node* search(Node* root, int key) {
  if (root == NULL || root->key == key)
    return root;
  if (root->key < key)
    return search(root->right, key);
  return search(root->left, key);
}`,
      java: `public Node search(Node root, int key) {
  if (root==null || root.key==key)
    return root;
  if (root.key < key)
    return search(root.right, key);
  return search(root.left, key);
}`,
      javascript: `function search(root, key) {
  if (root === null || root.key === key)
    return root;
  if (root.key < key)
    return search(root.right, key);
  return search(root.left, key);
}`,
      python: `def search(root, key):
    if root is None or root.key == key:
        return root
    if root.key < key:
        return search(root.right, key)
    return search(root.left, key)`
    }
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    description: "An in-place comparison sorting algorithm. It has O(n²) time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort.",
    iconName: "ListOrdered",
    category: "Sorting",
    complexity: { time: "O(n²)", space: "O(1)" },
    implementations: {
      c: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    int min_idx = i;
    for (int j = i+1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
    int temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
}`,
      cpp: `void selectionSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n-1; i++) {
    int min_idx = i;
    for (int j = i+1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
    swap(arr[min_idx], arr[i]);
  }
}`,
      java: `void sort(int arr[]) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    int min_idx = i;
    for (int j = i+1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
    int temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
}`,
      javascript: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
    [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]];
  }
}`,
      python: `def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[min_idx] > arr[j]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`
    }
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    description: "An efficient sorting algorithm, serving as a systematic method for placing the elements of a random access file or an array in order. Developed by Tony Hoare in 1959.",
    iconName: "Split",
    category: "Sorting",
    complexity: { time: "O(n log n)", space: "O(log n)" },
    implementations: {
      c: `int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return (i + 1);
}
void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
      cpp: `int partition(vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return (i + 1);
}
void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
      java: `void sort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    sort(arr, low, pi - 1);
    sort(arr, pi + 1, high);
  }
}`,
      javascript: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
      python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`
    }
  },
  {
    id: "graph-dfs",
    name: "Graph DFS",
    description: "Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking.",
    iconName: "Binary",
    category: "Graphs",
    complexity: { time: "O(V + E)", space: "O(V)" },
    implementations: {
      c: `void DFS(int v) {
  visited[v] = true;
  for (int i = 0; i < adj[v].size(); i++)
    if (!visited[adj[v][i]])
      DFS(adj[v][i]);
}`,
      cpp: `void DFS(int v) {
  visited[v] = true;
  for (int u : adj[v])
    if (!visited[u])
      DFS(u);
}`,
      java: `void DFS(int v) {
  visited[v] = true;
  for (int u : adj[v])
    if (!visited[u])
      DFS(u);
}`,
      javascript: `function dfs(node, visited) {
  visited.add(node);
  const neighbors = graph[node];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, visited);
    }
  }
}`,
      python: `def dfs(node, visited):
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(neighbor, visited)`
    }
  },
  ...MORE_ALGORITHMS
];
