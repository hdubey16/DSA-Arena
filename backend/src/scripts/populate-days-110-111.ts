import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question";
import Topic from "../models/Topic";

dotenv.config();

const topics = [
  {
    id: "110",
    title: "Day 110 – Union-Find (DSU)",
    description: "Introduction to Disjoint Set Union data structure for efficiently tracking connected components and cycle detection.",
    week: 16,
    day: 110,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["109"],
    compulsoryQuestion: "Number of Connected Components",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "111",
    title: "Day 111 – Union by Rank & Path Compression",
    description: "Advanced DSU optimizations with union by rank and path compression for near-constant time operations.",
    week: 16,
    day: 111,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["110"],
    compulsoryQuestion: "Number of Provinces",
    practiceQuestions: 5,
    isLocked: false,
  },
];

function createQuestion(q: any) {
  return {
    topicId: q.topicId,
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    type: "practice",
    isCompulsory: q.isCompulsory ?? false,
    points: q.points,
    timeLimit: 45,
    starterCode: q.starterCode || "public class Solution {\n    \n}",
    solution: q.solution,
    examples: q.examples,
    testCases: q.testCases.map((tc: any) => ({
      input: tc.input,
      expectedOutput: tc.expected,
      isHidden: tc.isHidden,
      points: tc.isHidden ? 15 : 10,
    })),
    hints: [q.hint],
    tags: q.tags,
  };
}

const questions = [
  // Day 110 - Q1
  createQuestion({
    title: "Number of Connected Components",
    description:
      "You have a graph of n nodes labeled from 0 to n-1. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.\n\nReturn the number of connected components in the graph using Union-Find (Disjoint Set Union).",
    difficulty: "Medium",
    topicId: "110",
    isCompulsory: true,
    examples: [
      {
        input: "n = 5, edges = [[0,1],[1,2],[3,4]]",
        output: "2",
        explanation: "Components: {0,1,2} and {3,4}",
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
        output: "1",
        explanation: "All nodes are connected in one component",
      },
    ],
    testCases: [
      { input: "5, [[0,1],[1,2],[3,4]]", expected: "2", isHidden: false },
      { input: "5, [[0,1],[1,2],[2,3],[3,4]]", expected: "1", isHidden: true },
      { input: "4, [[0,1],[2,3]]", expected: "2", isHidden: true },
      { input: "6, []", expected: "6", isHidden: true },
      { input: "3, [[0,1],[0,2]]", expected: "1", isHidden: true },
    ],
    solution: `
    class Solution {
        private int[] parent;
        private int components;
        
        public int countComponents(int n, int[][] edges) {
            parent = new int[n];
            components = n;
            
            // Initialize parent array
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
            
            // Union operations
            for (int[] edge : edges) {
                union(edge[0], edge[1]);
            }
            
            return components;
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX != rootY) {
                parent[rootX] = rootY;
                components--;
            }
        }
    }
    
    // Alternative: Without path compression (basic version)
    class BasicUnionFind {
        private int[] parent;
        
        public int countComponents(int n, int[][] edges) {
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
            
            for (int[] edge : edges) {
                union(edge[0], edge[1]);
            }
            
            // Count unique roots
            int count = 0;
            for (int i = 0; i < n; i++) {
                if (find(i) == i) {
                    count++;
                }
            }
            
            return count;
        }
        
        private int find(int x) {
            while (parent[x] != x) {
                x = parent[x];
            }
            return x;
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX != rootY) {
                parent[rootX] = rootY;
            }
        }
    }
    
    // Time: O(n + m * α(n)) where α is inverse Ackermann function (nearly constant)
    // Space: O(n) for parent array
    `,
    hint: "Use Union-Find. Initialize each node as its own parent. Union connected nodes and count components.",
    tags: ["Union Find", "Graph", "DSU"],
    points: 100,
  }),

  // Day 110 - Q2
  createQuestion({
    title: "Graph Valid Tree",
    description:
      "Given n nodes labeled from 0 to n-1 and a list of undirected edges, check whether these edges make up a valid tree.\n\nA valid tree must satisfy two conditions:\n1. It must be fully connected (one connected component).\n2. It must have no cycles (exactly n-1 edges for n nodes).\n\nUse Union-Find to solve this problem.",
    difficulty: "Medium",
    topicId: "110",
    examples: [
      {
        input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
        output: "true",
        explanation: "Forms a valid tree with 5 nodes and 4 edges, no cycles",
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
        output: "false",
        explanation: "Contains a cycle: 1-2-3-1",
      },
    ],
    testCases: [
      { input: "5, [[0,1],[0,2],[0,3],[1,4]]", expected: "true", isHidden: false },
      { input: "5, [[0,1],[1,2],[2,3],[1,3],[1,4]]", expected: "false", isHidden: true },
      { input: "4, [[0,1],[2,3]]", expected: "false", isHidden: true },
      { input: "1, []", expected: "true", isHidden: true },
      { input: "4, [[0,1],[1,2],[2,3]]", expected: "true", isHidden: true },
    ],
    solution: `
    class Solution {
        private int[] parent;
        
        public boolean validTree(int n, int[][] edges) {
            // Tree must have exactly n-1 edges
            if (edges.length != n - 1) {
                return false;
            }
            
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
            
            // Check for cycles using union-find
            for (int[] edge : edges) {
                int root1 = find(edge[0]);
                int root2 = find(edge[1]);
                
                // If both nodes already in same set, adding edge creates cycle
                if (root1 == root2) {
                    return false;
                }
                
                parent[root1] = root2;
            }
            
            return true;
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
    }
    
    // Alternative: Counting components approach
    class ComponentCountSolution {
        private int[] parent;
        private int components;
        
        public boolean validTree(int n, int[][] edges) {
            if (edges.length != n - 1) {
                return false;
            }
            
            parent = new int[n];
            components = n;
            
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
            
            for (int[] edge : edges) {
                if (!union(edge[0], edge[1])) {
                    return false; // Cycle detected
                }
            }
            
            return components == 1;
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
        
        private boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX == rootY) {
                return false; // Cycle
            }
            
            parent[rootX] = rootY;
            components--;
            return true;
        }
    }
    
    // Time: O(n * α(n)) where α is inverse Ackermann function
    // Space: O(n) for parent array
    `,
    hint: "Tree with n nodes needs exactly n-1 edges. Use DSU to detect cycles during edge addition.",
    tags: ["Union Find", "Graph", "Tree"],
    points: 120,
  }),

  // Day 110 - Q3
  createQuestion({
    title: "Accounts Merge",
    description:
      "Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.\n\nTwo accounts definitely belong to the same person if there is some common email to both accounts. Merge accounts that belong to the same person.\n\nReturn the accounts in the following format: the first element of each account is the name, and the rest are emails in sorted order.",
    difficulty: "Medium",
    topicId: "110",
    examples: [
      {
        input: 'accounts = [["John","john@mail.com","john_work@mail.com"],["John","john@mail.com","john_home@mail.com"],["Mary","mary@mail.com"]]',
        output: '[["John","john@mail.com","john_home@mail.com","john_work@mail.com"],["Mary","mary@mail.com"]]',
        explanation: "First two accounts belong to same John (common email john@mail.com)",
      },
    ],
    testCases: [
      { input: '[["John","john@mail.com","john_work@mail.com"],["John","john@mail.com","john_home@mail.com"],["Mary","mary@mail.com"]]', expected: '[["John","john@mail.com","john_home@mail.com","john_work@mail.com"],["Mary","mary@mail.com"]]', isHidden: false },
      { input: '[["Alice","alice@mail.com"],["Alice","alice@mail.com","alice2@mail.com"]]', expected: '[["Alice","alice2@mail.com","alice@mail.com"]]', isHidden: true },
      { input: '[["David","david@mail.com","david2@mail.com"],["David","david3@mail.com"],["David","david4@mail.com"]]', expected: '[["David","david2@mail.com","david@mail.com"],["David","david3@mail.com"],["David","david4@mail.com"]]', isHidden: true },
      { input: '[["Bob","bob@mail.com"],["Bob","bob2@mail.com","bob@mail.com"]]', expected: '[["Bob","bob2@mail.com","bob@mail.com"]]', isHidden: true },
      { input: '[["Kevin","kevin@mail.com","kevin1@mail.com"],["Kevin","kevin2@mail.com","kevin1@mail.com"],["Kevin","kevin3@mail.com","kevin2@mail.com"]]', expected: '[["Kevin","kevin1@mail.com","kevin2@mail.com","kevin3@mail.com","kevin@mail.com"]]', isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class Solution {
        private Map<String, String> parent;
        
        public List<List<String>> accountsMerge(List<List<String>> accounts) {
            parent = new HashMap<>();
            Map<String, String> emailToName = new HashMap<>();
            
            // Initialize and union emails within same account
            for (List<String> account : accounts) {
                String name = account.get(0);
                String firstEmail = account.get(1);
                
                for (int i = 1; i < account.size(); i++) {
                    String email = account.get(i);
                    if (!parent.containsKey(email)) {
                        parent.put(email, email);
                    }
                    emailToName.put(email, name);
                    
                    // Union with first email
                    union(firstEmail, email);
                }
            }
            
            // Group emails by root parent
            Map<String, List<String>> components = new HashMap<>();
            for (String email : parent.keySet()) {
                String root = find(email);
                components.putIfAbsent(root, new ArrayList<>());
                components.get(root).add(email);
            }
            
            // Build result
            List<List<String>> result = new ArrayList<>();
            for (List<String> emails : components.values()) {
                Collections.sort(emails);
                String name = emailToName.get(emails.get(0));
                List<String> account = new ArrayList<>();
                account.add(name);
                account.addAll(emails);
                result.add(account);
            }
            
            return result;
        }
        
        private String find(String email) {
            if (!parent.get(email).equals(email)) {
                parent.put(email, find(parent.get(email)));
            }
            return parent.get(email);
        }
        
        private void union(String email1, String email2) {
            String root1 = find(email1);
            String root2 = find(email2);
            if (!root1.equals(root2)) {
                parent.put(root1, root2);
            }
        }
    }
    
    // Time: O(n * k * α(n)) where n is accounts, k is max emails per account
    // Space: O(n * k) for storing all emails
    `,
    hint: "Use DSU on emails. Union all emails within same account. Group by root and sort.",
    tags: ["Union Find", "Hash Table", "String", "Sorting"],
    points: 120,
  }),

  // Day 110 - Q4
  createQuestion({
    title: "Redundant Connection",
    description:
      "In this problem, a tree is an undirected graph that is connected and has no cycles.\n\nYou are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed.\n\nReturn an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.",
    difficulty: "Medium",
    topicId: "110",
    examples: [
      {
        input: "edges = [[1,2],[1,3],[2,3]]",
        output: "[2,3]",
        explanation: "Removing edge [2,3] breaks the cycle",
      },
      {
        input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
        output: "[1,4]",
        explanation: "Cycle formed by 1-2-3-4-1, remove last edge [1,4]",
      },
    ],
    testCases: [
      { input: "[[1,2],[1,3],[2,3]]", expected: "[2,3]", isHidden: false },
      { input: "[[1,2],[2,3],[3,4],[1,4],[1,5]]", expected: "[1,4]", isHidden: true },
      { input: "[[1,2],[2,3],[3,1]]", expected: "[3,1]", isHidden: true },
      { input: "[[1,4],[3,4],[1,3],[1,2],[4,5]]", expected: "[1,3]", isHidden: true },
      { input: "[[9,10],[5,8],[2,6],[1,5],[3,8],[4,9],[8,10],[4,10],[6,8],[7,9]]", expected: "[4,10]", isHidden: true },
    ],
    solution: `
    class Solution {
        private int[] parent;
        
        public int[] findRedundantConnection(int[][] edges) {
            int n = edges.length;
            parent = new int[n + 1];
            
            // Initialize parent array
            for (int i = 1; i <= n; i++) {
                parent[i] = i;
            }
            
            // Process edges in order
            for (int[] edge : edges) {
                int root1 = find(edge[0]);
                int root2 = find(edge[1]);
                
                // If both nodes already connected, this edge creates cycle
                if (root1 == root2) {
                    return edge;
                }
                
                // Union the sets
                parent[root1] = root2;
            }
            
            return new int[0]; // Should never reach here
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }
    }
    
    // Alternative: With union by rank
    class UnionByRankSolution {
        private int[] parent;
        private int[] rank;
        
        public int[] findRedundantConnection(int[][] edges) {
            int n = edges.length;
            parent = new int[n + 1];
            rank = new int[n + 1];
            
            for (int i = 1; i <= n; i++) {
                parent[i] = i;
                rank[i] = 1;
            }
            
            for (int[] edge : edges) {
                if (!union(edge[0], edge[1])) {
                    return edge;
                }
            }
            
            return new int[0];
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
        
        private boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX == rootY) {
                return false; // Already connected, creates cycle
            }
            
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            
            return true;
        }
    }
    
    // Time: O(n * α(n)) where α is inverse Ackermann function
    // Space: O(n) for parent array
    `,
    hint: "Process edges in order. When union fails (both nodes already connected), that edge creates a cycle.",
    tags: ["Union Find", "Graph", "Tree"],
    points: 120,
  }),

  // Day 110 - Q5
  createQuestion({
    title: "Most Stones Removed",
    description:
      "On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone.\n\nA stone can be removed if it shares either the same row or the same column as another stone that has not been removed.\n\nGiven an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the maximum number of stones that can be removed.",
    difficulty: "Medium",
    topicId: "110",
    examples: [
      {
        input: "stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]",
        output: "5",
        explanation: "One way: remove (0,0), (0,1), (1,0), (2,1), (1,2). Stone (2,2) remains.",
      },
      {
        input: "stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]",
        output: "3",
        explanation: "Remove 3 stones, leaving 2 stones that share neither row nor column",
      },
    ],
    testCases: [
      { input: "[[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]", expected: "5", isHidden: false },
      { input: "[[0,0],[0,2],[1,1],[2,0],[2,2]]", expected: "3", isHidden: true },
      { input: "[[0,0]]", expected: "0", isHidden: true },
      { input: "[[0,0],[1,1],[2,2]]", expected: "0", isHidden: true },
      { input: "[[0,1],[1,0],[1,1]]", expected: "2", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class Solution {
        private Map<Integer, Integer> parent;
        private int islands;
        
        public int removeStones(int[][] stones) {
            parent = new HashMap<>();
            islands = 0;
            
            // Union stones by row and column
            for (int[] stone : stones) {
                int row = stone[0];
                int col = stone[1] + 10001; // Offset columns to avoid collision
                
                union(row, col);
            }
            
            return stones.length - islands;
        }
        
        private int find(int x) {
            if (!parent.containsKey(x)) {
                parent.put(x, x);
                islands++;
            }
            
            if (parent.get(x) != x) {
                parent.put(x, find(parent.get(x)));
            }
            
            return parent.get(x);
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX != rootY) {
                parent.put(rootX, rootY);
                islands--;
            }
        }
    }
    
    // Alternative: Using array-based DSU with coordinate compression
    class ArrayBasedSolution {
        private int[] parent;
        private int components;
        
        public int removeStones(int[][] stones) {
            int n = stones.length;
            parent = new int[20002]; // Max 10001 rows + 10001 cols
            components = 0;
            
            for (int i = 0; i < parent.length; i++) {
                parent[i] = -1;
            }
            
            for (int[] stone : stones) {
                union(stone[0], stone[1] + 10001);
            }
            
            return n - components;
        }
        
        private int find(int x) {
            if (parent[x] == -1) {
                parent[x] = x;
                components++;
            }
            
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            
            return parent[x];
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX != rootY) {
                parent[rootX] = rootY;
                components--;
            }
        }
    }
    
    // Time: O(n * α(n)) where n is number of stones
    // Space: O(n) for parent mapping
    `,
    hint: "Use DSU on rows and columns. Stones sharing row/column are connected. Answer = stones - components.",
    tags: ["Union Find", "Graph", "DFS"],
    points: 120,
  }),

  // Day 111 - Q1
  createQuestion({
    title: "Regions Cut By Slashes",
    description:
      "An n x n grid is composed of 1 x 1 squares where each square is a '/', '\\', or blank space ' '. These characters divide the square into contiguous regions.\n\nGiven the grid, return the number of regions.\n\nNote: backslash characters are escaped, so a '\\' is represented as '\\\\'.",
    difficulty: "Medium",
    topicId: "111",
    examples: [
      {
        input: 'grid = [" /","/ "]',
        output: "2",
        explanation: "The slash in top-right and bottom-left creates 2 regions",
      },
      {
        input: 'grid = [" /","  "]',
        output: "1",
        explanation: "One region encompasses the entire grid",
      },
      {
        input: 'grid = ["/\\\\","\\\\/"]',
        output: "5",
        explanation: "4 small triangles + 1 center square = 5 regions",
      },
    ],
    testCases: [
      { input: '[" /","/ "]', expected: "2", isHidden: false },
      { input: '[" /","  "]', expected: "1", isHidden: true },
      { input: '["/\\\\","\\\\/"]', expected: "5", isHidden: true },
      { input: '["//","/ "]', expected: "3", isHidden: true },
      { input: '[" /"," "," "," /"," "]', expected: "1", isHidden: true },
    ],
    solution: `
    class Solution {
        private int[] parent;
        private int[] rank;
        private int regions;
        
        public int regionsBySlashes(String[] grid) {
            int n = grid.length;
            regions = n * n * 4; // Each cell divided into 4 triangles
            parent = new int[regions];
            rank = new int[regions];
            
            // Initialize DSU
            for (int i = 0; i < regions; i++) {
                parent[i] = i;
                rank[i] = 1;
            }
            
            for (int r = 0; r < n; r++) {
                for (int c = 0; c < n; c++) {
                    int base = 4 * (r * n + c);
                    char ch = grid[r].charAt(c);
                    
                    // Union within current cell based on slash
                    if (ch == '/') {
                        union(base + 0, base + 3); // top with left
                        union(base + 1, base + 2); // right with bottom
                    } else if (ch == '\\\\') {
                        union(base + 0, base + 1); // top with right
                        union(base + 2, base + 3); // bottom with left
                    } else {
                        union(base + 0, base + 1);
                        union(base + 1, base + 2);
                        union(base + 2, base + 3);
                    }
                    
                    // Union with right cell
                    if (c + 1 < n) {
                        int rightBase = 4 * (r * n + (c + 1));
                        union(base + 1, rightBase + 3);
                    }
                    
                    // Union with bottom cell
                    if (r + 1 < n) {
                        int bottomBase = 4 * ((r + 1) * n + c);
                        union(base + 2, bottomBase + 0);
                    }
                }
            }
            
            return regions;
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX != rootY) {
                // Union by rank
                if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
                regions--;
            }
        }
    }
    
    // Time: O(n^2 * α(n)) where α is inverse Ackermann function
    // Space: O(n^2) for DSU array
    `,
    hint: "Divide each cell into 4 triangular regions (top, right, bottom, left). Use DSU with union by rank.",
    tags: ["Union Find", "Graph", "Matrix"],
    points: 150,
  }),

  // Day 111 - Q2
  createQuestion({
    title: "Satisfiability of Equality Equations",
    description:
      "You are given an array of strings equations that represent relationships between variables where each string equations[i] is of length 4 and takes one of two different forms: 'xi==yi' or 'xi!=yi'. Here, xi and yi are lowercase letters (not necessarily different) that represent one-letter variable names.\n\nReturn true if it is possible to assign integers to variable names so as to satisfy all the given equations, or false otherwise.",
    difficulty: "Medium",
    topicId: "111",
    examples: [
      {
        input: 'equations = ["a==b","b!=a"]',
        output: "false",
        explanation: "If a==b, then a!=b is impossible",
      },
      {
        input: 'equations = ["b==a","a==b"]',
        output: "true",
        explanation: "Both equations consistent",
      },
      {
        input: 'equations = ["a==b","b==c","a==c"]',
        output: "true",
        explanation: "All variables equal",
      },
    ],
    testCases: [
      { input: '["a==b","b!=a"]', expected: "false", isHidden: false },
      { input: '["b==a","a==b"]', expected: "true", isHidden: true },
      { input: '["a==b","b==c","a==c"]', expected: "true", isHidden: true },
      { input: '["a==b","b!=c","c==a"]', expected: "false", isHidden: true },
      { input: '["c==c","b==d","x!=z"]', expected: "true", isHidden: true },
    ],
    solution: `
    class Solution {
        private int[] parent;
        
        public boolean equationsPossible(String[] equations) {
            parent = new int[26]; // 26 lowercase letters
            
            // Initialize parent array
            for (int i = 0; i < 26; i++) {
                parent[i] = i;
            }
            
            // First pass: union all equal relationships
            for (String eq : equations) {
                if (eq.charAt(1) == '=') {
                    int x = eq.charAt(0) - 'a';
                    int y = eq.charAt(3) - 'a';
                    union(x, y);
                }
            }
            
            // Second pass: check inequality constraints
            for (String eq : equations) {
                if (eq.charAt(1) == '!') {
                    int x = eq.charAt(0) - 'a';
                    int y = eq.charAt(3) - 'a';
                    
                    // If both variables in same set, inequality violated
                    if (find(x) == find(y)) {
                        return false;
                    }
                }
            }
            
            return true;
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX != rootY) {
                parent[rootX] = rootY;
            }
        }
    }
    
    // Time: O(n * α(26)) ≈ O(n) where n is number of equations
    // Space: O(26) = O(1) for parent array
    `,
    hint: "Process all equality constraints first using union. Then check if any inequality connects same component.",
    tags: ["Union Find", "Graph", "Array"],
    points: 120,
  }),

  // Day 111 - Q3
  createQuestion({
    title: "Smallest String With Swaps",
    description:
      "You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices (0-indexed) of the string.\n\nYou can swap the characters at any pair of indices in the given pairs any number of times.\n\nReturn the lexicographically smallest string that s can be changed to after using the swaps.",
    difficulty: "Medium",
    topicId: "111",
    examples: [
      {
        input: 's = "dcab", pairs = [[0,3],[1,2]]',
        output: '"bacd"',
        explanation: "Swap s[0] and s[3], s = 'bcad'. Swap s[1] and s[2], s = 'bacd'",
      },
      {
        input: 's = "dcab", pairs = [[0,3],[1,2],[0,2]]',
        output: '"abcd"',
        explanation: "All indices connected transitively, can rearrange to smallest",
      },
    ],
    testCases: [
      { input: '"dcab", [[0,3],[1,2]]', expected: '"bacd"', isHidden: false },
      { input: '"dcab", [[0,3],[1,2],[0,2]]', expected: '"abcd"', isHidden: true },
      { input: '"cba", [[0,1],[1,2]]', expected: '"abc"', isHidden: true },
      { input: '"abc", []', expected: '"abc"', isHidden: true },
      { input: '"pwqlmqm", [[5,2],[4,3],[1,5],[0,2]]', expected: '"lmqmqpw"', isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class Solution {
        private int[] parent;
        
        public String smallestStringWithSwaps(String s, List<List<Integer>> pairs) {
            int n = s.length();
            parent = new int[n];
            
            // Initialize DSU
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
            
            // Union all pairs
            for (List<Integer> pair : pairs) {
                union(pair.get(0), pair.get(1));
            }
            
            // Group indices by component
            Map<Integer, List<Integer>> components = new HashMap<>();
            for (int i = 0; i < n; i++) {
                int root = find(i);
                components.putIfAbsent(root, new ArrayList<>());
                components.get(root).add(i);
            }
            
            // Sort characters within each component
            char[] result = s.toCharArray();
            for (List<Integer> indices : components.values()) {
                // Get characters at these indices
                List<Character> chars = new ArrayList<>();
                for (int idx : indices) {
                    chars.add(s.charAt(idx));
                }
                
                // Sort both indices and characters
                Collections.sort(indices);
                Collections.sort(chars);
                
                // Assign sorted characters to sorted indices
                for (int i = 0; i < indices.size(); i++) {
                    result[indices.get(i)] = chars.get(i);
                }
            }
            
            return new String(result);
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX != rootY) {
                parent[rootX] = rootY;
            }
        }
    }
    
    // Time: O(n log n + m * α(n)) where n is string length, m is pairs
    // Space: O(n) for DSU and grouping
    `,
    hint: "Use DSU to group swappable indices. Sort characters within each component for lexicographically smallest result.",
    tags: ["Union Find", "String", "Hash Table", "Sorting"],
    points: 120,
  }),

  // Day 111 - Q4
  createQuestion({
    title: "Evaluate Division",
    description:
      "You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.\n\nYou are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.\n\nReturn the answers to all queries. If a single answer cannot be determined, return -1.0.",
    difficulty: "Medium",
    topicId: "111",
    examples: [
      {
        input: 'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
        output: "[6.0, 0.5, -1.0, 1.0, -1.0]",
        explanation: "a/b=2, b/c=3, so a/c=6, b/a=0.5, a/e undefined, a/a=1, x undefined",
      },
    ],
    testCases: [
      { input: '[["a","b"],["b","c"]], [2.0,3.0], [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]', expected: "[6.0, 0.5, -1.0, 1.0, -1.0]", isHidden: false },
      { input: '[["a","b"],["b","c"],["bc","cd"]], [1.5,2.5,5.0], [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]', expected: "[3.75, 0.4, 5.0, 0.2]", isHidden: true },
      { input: '[["a","b"]], [0.5], [["a","b"],["b","a"],["a","c"],["x","y"]]', expected: "[0.5, 2.0, -1.0, -1.0]", isHidden: true },
      { input: '[["x1","x2"],["x2","x3"],["x3","x4"],["x4","x5"]], [3.0,4.0,5.0,6.0], [["x1","x5"],["x5","x2"]]', expected: "[360.0, 0.008333333333333333]", isHidden: true },
      { input: '[["a","b"]], [2.0], [["a","a"]]', expected: "[1.0]", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class Solution {
        public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
            Map<String, Map<String, Double>> graph = new HashMap<>();
            
            // Build graph
            for (int i = 0; i < equations.size(); i++) {
                String a = equations.get(i).get(0);
                String b = equations.get(i).get(1);
                double value = values[i];
                
                graph.putIfAbsent(a, new HashMap<>());
                graph.putIfAbsent(b, new HashMap<>());
                graph.get(a).put(b, value);
                graph.get(b).put(a, 1.0 / value);
            }
            
            double[] result = new double[queries.size()];
            
            for (int i = 0; i < queries.size(); i++) {
                String start = queries.get(i).get(0);
                String end = queries.get(i).get(1);
                
                if (!graph.containsKey(start) || !graph.containsKey(end)) {
                    result[i] = -1.0;
                } else if (start.equals(end)) {
                    result[i] = 1.0;
                } else {
                    Set<String> visited = new HashSet<>();
                    result[i] = dfs(graph, start, end, visited);
                }
            }
            
            return result;
        }
        
        private double dfs(Map<String, Map<String, Double>> graph, String start, String end, Set<String> visited) {
            if (start.equals(end)) {
                return 1.0;
            }
            
            visited.add(start);
            
            for (Map.Entry<String, Double> neighbor : graph.get(start).entrySet()) {
                if (!visited.contains(neighbor.getKey())) {
                    double result = dfs(graph, neighbor.getKey(), end, visited);
                    if (result != -1.0) {
                        return result * neighbor.getValue();
                    }
                }
            }
            
            return -1.0;
        }
    }
    
    // Alternative: Weighted Union-Find
    class WeightedUnionFind {
        private Map<String, String> parent;
        private Map<String, Double> weight; // weight[x] = parent[x] / x
        
        public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
            parent = new HashMap<>();
            weight = new HashMap<>();
            
            // Build union-find
            for (int i = 0; i < equations.size(); i++) {
                String a = equations.get(i).get(0);
                String b = equations.get(i).get(1);
                double value = values[i];
                
                if (!parent.containsKey(a)) {
                    parent.put(a, a);
                    weight.put(a, 1.0);
                }
                if (!parent.containsKey(b)) {
                    parent.put(b, b);
                    weight.put(b, 1.0);
                }
                
                union(a, b, value);
            }
            
            double[] result = new double[queries.size()];
            for (int i = 0; i < queries.size(); i++) {
                String c = queries.get(i).get(0);
                String d = queries.get(i).get(1);
                
                if (!parent.containsKey(c) || !parent.containsKey(d)) {
                    result[i] = -1.0;
                } else {
                    String rootC = find(c);
                    String rootD = find(d);
                    if (!rootC.equals(rootD)) {
                        result[i] = -1.0;
                    } else {
                        result[i] = weight.get(c) / weight.get(d);
                    }
                }
            }
            
            return result;
        }
        
        private String find(String x) {
            if (!parent.get(x).equals(x)) {
                String originalParent = parent.get(x);
                parent.put(x, find(originalParent));
                weight.put(x, weight.get(x) * weight.get(originalParent));
            }
            return parent.get(x);
        }
        
        private void union(String x, String y, double value) {
            String rootX = find(x);
            String rootY = find(y);
            if (!rootX.equals(rootY)) {
                parent.put(rootX, rootY);
                weight.put(rootX, value * weight.get(y) / weight.get(x));
            }
        }
    }
    
    // Time: O((E + Q) * α(V)) for weighted union-find, O(E + Q*V) for DFS
    // Space: O(V) for parent and weight maps
    `,
    hint: "Build graph with division relationships. Use DFS or weighted DSU to find path between query variables.",
    tags: ["Union Find", "Graph", "DFS", "Array"],
    points: 120,
  }),

  // Day 111 - Q5
  createQuestion({
    title: "Number of Provinces",
    description:
      "There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.\n\nA province is a group of directly or indirectly connected cities and no other cities outside of the group.\n\nYou are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.\n\nReturn the total number of provinces using optimized Union-Find with both union by rank and path compression.",
    difficulty: "Medium",
    topicId: "111",
    isCompulsory: true,
    examples: [
      {
        input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
        output: "2",
        explanation: "Cities 0 and 1 form one province, city 2 forms another",
      },
      {
        input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
        output: "3",
        explanation: "Each city is its own province",
      },
    ],
    testCases: [
      { input: "[[1,1,0],[1,1,0],[0,0,1]]", expected: "2", isHidden: false },
      { input: "[[1,0,0],[0,1,0],[0,0,1]]", expected: "3", isHidden: true },
      { input: "[[1,1,1],[1,1,1],[1,1,1]]", expected: "1", isHidden: true },
      { input: "[[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]]", expected: "1", isHidden: true },
      { input: "[[1]]", expected: "1", isHidden: true },
    ],
    solution: `
    class Solution {
        private int[] parent;
        private int[] rank;
        private int provinces;
        
        public int findCircleNum(int[][] isConnected) {
            int n = isConnected.length;
            parent = new int[n];
            rank = new int[n];
            provinces = n;
            
            // Initialize DSU
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 1;
            }
            
            // Process connections
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (isConnected[i][j] == 1) {
                        union(i, j);
                    }
                }
            }
            
            return provinces;
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX != rootY) {
                // Union by rank
                if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
                provinces--;
            }
        }
    }
    
    // Alternative: Counting unique roots at the end
    class AlternativeSolution {
        private int[] parent;
        private int[] rank;
        
        public int findCircleNum(int[][] isConnected) {
            int n = isConnected.length;
            parent = new int[n];
            rank = new int[n];
            
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 1;
            }
            
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (isConnected[i][j] == 1) {
                        union(i, j);
                    }
                }
            }
            
            // Count unique roots
            int count = 0;
            for (int i = 0; i < n; i++) {
                if (find(i) == i) {
                    count++;
                }
            }
            
            return count;
        }
        
        private int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
        
        private void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX != rootY) {
                if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
            }
        }
    }
    
    // Time: O(n^2 * α(n)) where α is inverse Ackermann (nearly constant)
    // Space: O(n) for parent and rank arrays
    `,
    hint: "Use DSU with union by rank and path compression. Connect cities with isConnected[i][j]=1.",
    tags: ["Union Find", "Graph", "DFS", "BFS"],
    points: 100,
  }),
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("✅ Connected to MongoDB");

    console.log("\n📝 Creating Topics...");
    for (const topic of topics) {
      const exists = await Topic.findOne({ id: topic.id });
      if (exists) {
        console.log(`⏭️  Exists: ${topic.title}`);
      } else {
        await Topic.create(topic);
        console.log(`✅ Created: ${topic.title}`);
      }
    }

    console.log("\n📝 Creating Questions...");
    let createdCount = 0;
    let skippedCount = 0;

    for (const question of questions) {
      const exists = await Question.findOne({ title: question.title });
      if (exists) {
        console.log(`⏭️  Exists: ${question.title}`);
        skippedCount++;
      } else {
        await Question.create(question);
        console.log(`✅ Created: ${question.title}`);
        createdCount++;
      }
    }

    console.log(
      `\n🎉 Days 110-111 processing complete! Created ${createdCount} questions, skipped ${skippedCount} existing`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
