export interface StudyDay {
  day: number;
  week: number;
  topic: string;
  compulsoryQuestion: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const studyDays: StudyDay[] = [
  // Week 1: Introduction & Mathematics
  { day: 1, week: 1, topic: "Analysis of Algorithms & Order of Growth", compulsoryQuestion: "Calculate time complexity of nested loops", difficulty: "Easy" },
  { day: 2, week: 1, topic: "Asymptotic Notations (Big O, Omega, Theta)", compulsoryQuestion: "Analyze Linear Search complexity", difficulty: "Medium" },
  { day: 3, week: 1, topic: "Space Complexity & Recursion Analysis", compulsoryQuestion: "Calculate space complexity of Fibonacci", difficulty: "Medium" },
  { day: 4, week: 1, topic: "Count Digits, Palindrome, Factorial", compulsoryQuestion: "Check if number is palindrome", difficulty: "Easy" },
  { day: 5, week: 1, topic: "GCD, LCM & Prime Check", compulsoryQuestion: "Find GCD of two numbers", difficulty: "Easy" },
  { day: 6, week: 1, topic: "Prime Factors & Sieve of Eratosthenes", compulsoryQuestion: "Find all primes up to N", difficulty: "Medium" },
  { day: 7, week: 1, topic: "Computing Power & Mathematical Problems", compulsoryQuestion: "Calculate x^n efficiently", difficulty: "Medium" },
  
  // Week 2: Bit Magic & Recursion
  { day: 8, week: 2, topic: "Bitwise Operators (AND, OR, XOR, Shifts)", compulsoryQuestion: "Check if Kth bit is set", difficulty: "Easy" },
  { day: 9, week: 2, topic: "Count Set Bits & Power of 2", compulsoryQuestion: "Count number of set bits", difficulty: "Easy" },
  { day: 10, week: 2, topic: "Bit Manipulation Problems", compulsoryQuestion: "Find two odd occurring numbers", difficulty: "Medium" },
  { day: 11, week: 2, topic: "Recursion Basics & Tail Recursion", compulsoryQuestion: "Print numbers 1 to N using recursion", difficulty: "Easy" },
  { day: 12, week: 2, topic: "Recursion: Sum of Digits & Palindrome", compulsoryQuestion: "Check palindrome using recursion", difficulty: "Medium" },
  { day: 13, week: 2, topic: "Tower of Hanoi & Josephus Problem", compulsoryQuestion: "Solve Tower of Hanoi", difficulty: "Hard" },
  { day: 14, week: 2, topic: "Generate Subsets & Rod Cutting", compulsoryQuestion: "Generate all subsets of array", difficulty: "Hard" },
  
  // Week 3: Arrays
  { day: 15, week: 3, topic: "Array Operations & Rotation", compulsoryQuestion: "Left rotate array by D positions", difficulty: "Easy" },
  { day: 16, week: 3, topic: "Leaders in Array & Max Difference", compulsoryQuestion: "Find all leaders in array", difficulty: "Medium" },
  { day: 17, week: 3, topic: "Stock Buy/Sell & Trapping Rainwater", compulsoryQuestion: "Maximum profit from stock prices", difficulty: "Medium" },
  { day: 18, week: 3, topic: "Kadane's Algorithm & Max Consecutive", compulsoryQuestion: "Maximum subarray sum", difficulty: "Medium" },
  { day: 19, week: 3, topic: "Sliding Window Technique", compulsoryQuestion: "Maximum sum of K consecutive elements", difficulty: "Medium" },
  { day: 20, week: 3, topic: "Prefix Sum Technique", compulsoryQuestion: "Range sum queries", difficulty: "Medium" },
  { day: 21, week: 3, topic: "Array Practice Problems", compulsoryQuestion: "Rearrange array alternately", difficulty: "Hard" },
  
  // Week 4: Searching & Sorting
  { day: 22, week: 4, topic: "Binary Search (Iterative & Recursive)", compulsoryQuestion: "Search element in sorted array", difficulty: "Easy" },
  { day: 23, week: 4, topic: "First & Last Occurrence, Count in Sorted", compulsoryQuestion: "Find first occurrence using binary search", difficulty: "Medium" },
  { day: 24, week: 4, topic: "Search in Rotated Array & Peak Element", compulsoryQuestion: "Find peak element", difficulty: "Medium" },
  { day: 25, week: 4, topic: "Two Pointer Technique & Square Root", compulsoryQuestion: "Find pair with given sum", difficulty: "Medium" },
  { day: 26, week: 4, topic: "Bubble, Selection & Insertion Sort", compulsoryQuestion: "Implement insertion sort", difficulty: "Easy" },
  { day: 27, week: 4, topic: "Merge Sort & Quick Sort", compulsoryQuestion: "Implement merge sort", difficulty: "Medium" },
  { day: 28, week: 4, topic: "Partition Schemes & Kth Smallest", compulsoryQuestion: "Find Kth smallest element", difficulty: "Hard" },
  
  // Week 5: Sorting & Matrix
  { day: 29, week: 5, topic: "Heap, Counting & Radix Sort", compulsoryQuestion: "Sort array using counting sort", difficulty: "Medium" },
  { day: 30, week: 5, topic: "Merge Intervals & Meeting Rooms", compulsoryQuestion: "Merge overlapping intervals", difficulty: "Medium" },
  { day: 31, week: 5, topic: "Matrix Snake & Boundary Traversal", compulsoryQuestion: "Print matrix in snake pattern", difficulty: "Easy" },
  { day: 32, week: 5, topic: "Matrix Transpose & Rotation", compulsoryQuestion: "Rotate matrix by 90 degrees", difficulty: "Medium" },
  { day: 33, week: 5, topic: "Spiral Traversal & Search in Matrix", compulsoryQuestion: "Print matrix in spiral form", difficulty: "Medium" },
  { day: 34, week: 5, topic: "Matrix Multiplication", compulsoryQuestion: "Multiply two matrices", difficulty: "Medium" },
  { day: 35, week: 5, topic: "Matrix Practice Problems", compulsoryQuestion: "Search in row-column sorted matrix", difficulty: "Hard" },
  
  // Week 6: Hashing
  { day: 36, week: 6, topic: "Hashing Basics & Hash Functions", compulsoryQuestion: "Implement simple hash function", difficulty: "Easy" },
  { day: 37, week: 6, topic: "Collision Handling (Chaining, Open Addressing)", compulsoryQuestion: "Handle collisions using chaining", difficulty: "Medium" },
  { day: 38, week: 6, topic: "HashSet & HashMap in Java", compulsoryQuestion: "Count distinct elements", difficulty: "Easy" },
  { day: 39, week: 6, topic: "Frequency Count & Intersection/Union", compulsoryQuestion: "Find frequency of elements", difficulty: "Easy" },
  { day: 40, week: 6, topic: "Pair Sum & Subarray with Zero Sum", compulsoryQuestion: "Check if pair with given sum exists", difficulty: "Medium" },
  { day: 41, week: 6, topic: "Longest Subarray Problems", compulsoryQuestion: "Longest subarray with given sum", difficulty: "Medium" },
  { day: 42, week: 6, topic: "Longest Consecutive Sequence", compulsoryQuestion: "Find longest consecutive sequence", difficulty: "Hard" },
  
  // Week 7: Strings
  { day: 43, week: 7, topic: "String Basics & Anagram Check", compulsoryQuestion: "Check if two strings are anagrams", difficulty: "Easy" },
  { day: 44, week: 7, topic: "Leftmost Repeating & Non-repeating", compulsoryQuestion: "Find first non-repeating character", difficulty: "Easy" },
  { day: 45, week: 7, topic: "Lexicographic Rank & Pattern Check", compulsoryQuestion: "Find lexicographic rank of string", difficulty: "Medium" },
  { day: 46, week: 7, topic: "Pattern Searching & Naive Algorithm", compulsoryQuestion: "Search pattern in text", difficulty: "Medium" },
  { day: 47, week: 7, topic: "Rabin-Karp Algorithm", compulsoryQuestion: "Implement Rabin-Karp pattern matching", difficulty: "Hard" },
  { day: 48, week: 7, topic: "KMP Algorithm", compulsoryQuestion: "Implement KMP pattern matching", difficulty: "Hard" },
  { day: 49, week: 7, topic: "String Practice Problems", compulsoryQuestion: "Check if strings are rotations", difficulty: "Medium" },
  
  // Week 8: Linked List
  { day: 50, week: 8, topic: "Singly Linked List Operations", compulsoryQuestion: "Insert at beginning, end, middle", difficulty: "Easy" },
  { day: 51, week: 8, topic: "Delete Node & Find Middle", compulsoryQuestion: "Find middle of linked list", difficulty: "Easy" },
  { day: 52, week: 8, topic: "Reverse Linked List", compulsoryQuestion: "Reverse linked list iteratively", difficulty: "Medium" },
  { day: 53, week: 8, topic: "Loop Detection (Floyd's Cycle)", compulsoryQuestion: "Detect cycle in linked list", difficulty: "Medium" },
  { day: 54, week: 8, topic: "Nth Node from End & Pairwise Swap", compulsoryQuestion: "Find Nth node from end", difficulty: "Medium" },
  { day: 55, week: 8, topic: "Reverse in K Groups & Intersection", compulsoryQuestion: "Reverse linked list in groups of K", difficulty: "Hard" },
  { day: 56, week: 8, topic: "Clone List with Random Pointer & LRU Cache", compulsoryQuestion: "Implement LRU Cache", difficulty: "Hard" },
  
  // Week 9: Stack & Queue
  { day: 57, week: 9, topic: "Stack Implementation & Applications", compulsoryQuestion: "Implement stack using array", difficulty: "Easy" },
  { day: 58, week: 9, topic: "Balanced Parentheses & Stock Span", compulsoryQuestion: "Check balanced parentheses", difficulty: "Medium" },
  { day: 59, week: 9, topic: "Next Greater Element & Histogram Area", compulsoryQuestion: "Find next greater element", difficulty: "Medium" },
  { day: 60, week: 9, topic: "Infix, Prefix, Postfix Conversions", compulsoryQuestion: "Convert infix to postfix", difficulty: "Hard" },
  { day: 61, week: 9, topic: "Queue Implementation & Applications", compulsoryQuestion: "Implement queue using array", difficulty: "Easy" },
  { day: 62, week: 9, topic: "Queue using Stack & Reverse Queue", compulsoryQuestion: "Implement queue using two stacks", difficulty: "Medium" },
  { day: 63, week: 9, topic: "Deque & Sliding Window Maximum", compulsoryQuestion: "Find maximum in sliding window", difficulty: "Hard" },
  
  // Week 10: Tree
  { day: 64, week: 10, topic: "Binary Tree Basics & Traversals", compulsoryQuestion: "Implement inorder traversal", difficulty: "Easy" },
  { day: 65, week: 10, topic: "Level Order & Spiral Traversal", compulsoryQuestion: "Level order traversal", difficulty: "Medium" },
  { day: 66, week: 10, topic: "Height, Size & K-Distance Nodes", compulsoryQuestion: "Find height of binary tree", difficulty: "Easy" },
  { day: 67, week: 10, topic: "Left View & Children Sum Property", compulsoryQuestion: "Print left view of tree", difficulty: "Medium" },
  { day: 68, week: 10, topic: "Balanced Tree & Max Width", compulsoryQuestion: "Check if tree is balanced", difficulty: "Medium" },
  { day: 69, week: 10, topic: "Diameter & LCA", compulsoryQuestion: "Find diameter of tree", difficulty: "Medium" },
  { day: 70, week: 10, topic: "Tree Construction & Serialization", compulsoryQuestion: "Construct tree from traversals", difficulty: "Hard" },
  
  // Week 11: BST & Heap
  { day: 71, week: 11, topic: "BST Operations (Search, Insert, Delete)", compulsoryQuestion: "Search in BST", difficulty: "Easy" },
  { day: 72, week: 11, topic: "Floor, Ceil & BST Check", compulsoryQuestion: "Find floor in BST", difficulty: "Medium" },
  { day: 73, week: 11, topic: "Kth Smallest & Fix Swapped Nodes", compulsoryQuestion: "Find Kth smallest in BST", difficulty: "Medium" },
  { day: 74, week: 11, topic: "Pair Sum & Vertical Traversal", compulsoryQuestion: "Find pair with given sum in BST", difficulty: "Hard" },
  { day: 75, week: 11, topic: "Binary Heap Operations", compulsoryQuestion: "Insert into min heap", difficulty: "Medium" },
  { day: 76, week: 11, topic: "Heapify & Extract Min", compulsoryQuestion: "Implement heapify operation", difficulty: "Medium" },
  { day: 77, week: 11, topic: "K Largest & Merge K Sorted Arrays", compulsoryQuestion: "Find K largest elements", difficulty: "Hard" },
  
  // Week 12: Graph
  { day: 78, week: 12, topic: "Graph Representation & BFS", compulsoryQuestion: "Implement BFS traversal", difficulty: "Easy" },
  { day: 79, week: 12, topic: "DFS & Connected Components", compulsoryQuestion: "Implement DFS traversal", difficulty: "Easy" },
  { day: 80, week: 12, topic: "Cycle Detection in Graph", compulsoryQuestion: "Detect cycle in undirected graph", difficulty: "Medium" },
  { day: 81, week: 12, topic: "Topological Sort (DFS & Kahn's)", compulsoryQuestion: "Topological sort using DFS", difficulty: "Medium" },
  { day: 82, week: 12, topic: "Shortest Path (BFS, Dijkstra)", compulsoryQuestion: "Shortest path in unweighted graph", difficulty: "Medium" },
  { day: 83, week: 12, topic: "Prim's & Kruskal's MST", compulsoryQuestion: "Find MST using Prim's algorithm", difficulty: "Hard" },
  { day: 84, week: 12, topic: "Bellman-Ford & Strongly Connected", compulsoryQuestion: "Shortest path with negative weights", difficulty: "Hard" },
  
  // Week 13: Greedy & Backtracking
  { day: 85, week: 13, topic: "Activity Selection Problem", compulsoryQuestion: "Maximum activities selection", difficulty: "Medium" },
  { day: 86, week: 13, topic: "Fractional Knapsack", compulsoryQuestion: "Solve fractional knapsack", difficulty: "Medium" },
  { day: 87, week: 13, topic: "Job Sequencing & Huffman Coding", compulsoryQuestion: "Job sequencing with deadlines", difficulty: "Hard" },
  { day: 88, week: 13, topic: "Rat in Maze Problem", compulsoryQuestion: "Find path in maze", difficulty: "Medium" },
  { day: 89, week: 13, topic: "N-Queen Problem", compulsoryQuestion: "Solve N-Queen problem", difficulty: "Hard" },
  { day: 90, week: 13, topic: "Sudoku Solver", compulsoryQuestion: "Solve Sudoku using backtracking", difficulty: "Hard" },
  { day: 91, week: 13, topic: "Backtracking Practice Problems", compulsoryQuestion: "Generate all permutations", difficulty: "Hard" },
  
  // Week 14: Dynamic Programming (Part 1)
  { day: 92, week: 14, topic: "DP Introduction & Fibonacci", compulsoryQuestion: "Fibonacci using memoization", difficulty: "Easy" },
  { day: 93, week: 14, topic: "Longest Common Subsequence (LCS)", compulsoryQuestion: "Find LCS of two strings", difficulty: "Medium" },
  { day: 94, week: 14, topic: "Coin Change Problem", compulsoryQuestion: "Minimum coins for given amount", difficulty: "Medium" },
  { day: 95, week: 14, topic: "Edit Distance", compulsoryQuestion: "Minimum edits to convert strings", difficulty: "Hard" },
  { day: 96, week: 14, topic: "Longest Increasing Subsequence (LIS)", compulsoryQuestion: "Find LIS in array", difficulty: "Medium" },
  { day: 97, week: 14, topic: "0/1 Knapsack Problem", compulsoryQuestion: "Solve 0/1 knapsack", difficulty: "Hard" },
  { day: 98, week: 14, topic: "Subset Sum Problem", compulsoryQuestion: "Check if subset with given sum exists", difficulty: "Medium" },
  
  // Week 15: Dynamic Programming (Part 2)
  { day: 99, week: 15, topic: "Matrix Chain Multiplication", compulsoryQuestion: "Minimum cost of matrix multiplication", difficulty: "Hard" },
  { day: 100, week: 15, topic: "Palindrome Partitioning", compulsoryQuestion: "Minimum cuts for palindrome partition", difficulty: "Hard" },
  { day: 101, week: 15, topic: "Egg Dropping Problem", compulsoryQuestion: "Minimum trials to find critical floor", difficulty: "Hard" },
  { day: 102, week: 15, topic: "Count BSTs & Catalan Numbers", compulsoryQuestion: "Count BSTs with N nodes", difficulty: "Hard" },
  { day: 103, week: 15, topic: "Maximum Sum (No Consecutive)", compulsoryQuestion: "Max sum without adjacent elements", difficulty: "Medium" },
  { day: 104, week: 15, topic: "Rod Cutting & Min Jumps", compulsoryQuestion: "Minimum jumps to reach end", difficulty: "Medium" },
  { day: 105, week: 15, topic: "DP Practice Problems", compulsoryQuestion: "Optimal strategy for game", difficulty: "Hard" },
  
  // Week 16: Advanced Data Structures
  { day: 106, week: 16, topic: "Trie (Insert, Search, Delete)", compulsoryQuestion: "Implement Trie data structure", difficulty: "Medium" },
  { day: 107, week: 16, topic: "Trie Applications", compulsoryQuestion: "Count distinct rows in binary matrix", difficulty: "Hard" },
  { day: 108, week: 16, topic: "Segment Tree (Build & Query)", compulsoryQuestion: "Build segment tree for range sum", difficulty: "Hard" },
  { day: 109, week: 16, topic: "Segment Tree (Update)", compulsoryQuestion: "Range update in segment tree", difficulty: "Hard" },
  { day: 110, week: 16, topic: "Disjoint Set (Union-Find)", compulsoryQuestion: "Implement union-find", difficulty: "Medium" },
  { day: 111, week: 16, topic: "Union by Rank & Path Compression", compulsoryQuestion: "Optimize union-find", difficulty: "Hard" },
  { day: 112, week: 16, topic: "DSA Final Practice & Review", compulsoryQuestion: "Mixed problem solving", difficulty: "Hard" },
];

// Helper to generate 5 practice questions (1 main + 4 AI generated: Easy → Med → Med → Hard)
export const generatePracticeQuestions = (dayData: StudyDay) => {
  const { topic, compulsoryQuestion } = dayData;
  
  return [
    {
      id: `q1-day${dayData.day}`,
      title: compulsoryQuestion,
      difficulty: dayData.difficulty,
      description: `Practice problem for Day ${dayData.day}: ${topic}`,
      examples: [
        { input: "// Write your code here", output: "// Expected output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    },
    {
      id: `q2-day${dayData.day}`,
      title: `${topic} - Practice 1`,
      difficulty: "Easy",
      description: `Easy practice question for ${topic}`,
      examples: [
        { input: "Example input", output: "Example output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    },
    {
      id: `q3-day${dayData.day}`,
      title: `${topic} - Practice 2`,
      difficulty: "Medium",
      description: `Medium practice question for ${topic}`,
      examples: [
        { input: "Example input", output: "Example output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    },
    {
      id: `q4-day${dayData.day}`,
      title: `${topic} - Practice 3`,
      difficulty: "Medium",
      description: `Medium practice question for ${topic}`,
      examples: [
        { input: "Example input", output: "Example output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    },
    {
      id: `q5-day${dayData.day}`,
      title: `${topic} - Practice 4`,
      difficulty: "Hard",
      description: `Hard practice question for ${topic}`,
      examples: [
        { input: "Example input", output: "Example output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    }
  ];
};
