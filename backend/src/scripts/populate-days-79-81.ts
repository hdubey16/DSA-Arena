import mongoose from 'mongoose';
import Question from '../models/Question';
import Topic from '../models/Topic';
import dotenv from 'dotenv';

dotenv.config();

function createQuestion(data: any) {
  return {
    topicId: data.topicId,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    points: 100,
    timeLimit: 2000,
    starterCode: data.starterCode || `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    solution: data.solution,
    examples: data.examples,
    testCases: data.testCases,
    hints: data.hints || [],
    tags: data.tags || []
  };
}

const topicsData: any[] = [
  {
    id: 'day-79-dfs-connected',
    title: 'DFS & Connected Components',
    description: 'Number of Provinces, Max Area Island, Count Sub Islands, Reorder Routes',
    week: 12,
    day: 79,
    difficulty: 'Medium',
    estimatedTime: 120,
    prerequisites: [],
    compulsoryQuestion: 'Number of Provinces',
    practiceQuestions: 5
  },
  {
    id: 'day-80-cycle-detection',
    title: 'Cycle Detection in Graphs',
    description: 'Detect cycles in directed/undirected, find safe states, redundant edges',
    week: 12,
    day: 80,
    difficulty: 'Medium',
    estimatedTime: 125,
    prerequisites: ['day-79-dfs-connected'],
    compulsoryQuestion: 'Course Schedule',
    practiceQuestions: 5
  },
  {
    id: 'day-81-topological-sort',
    title: 'Topological Sort (DFS & Kahn\'s)',
    description: 'DAG linear ordering, Alien Dictionary, Parallel Courses, Sort Items',
    week: 12,
    day: 81,
    difficulty: 'Hard',
    estimatedTime: 130,
    prerequisites: ['day-80-cycle-detection'],
    compulsoryQuestion: 'Course Schedule II',
    practiceQuestions: 5
  }
];

async function populateDays79to81() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    console.log('📝 Creating Topics...\n');
    for (const topicData of topicsData) {
      const existing = await Topic.findOne({ id: topicData.id });
      if (!existing) {
        await Topic.create(topicData);
        console.log(`  ✅ Created: Day ${topicData.day} - ${topicData.title}`);
      } else {
        console.log(`  ⏭️  Exists: Day ${topicData.day}`);
      }
    }

    console.log('\n📝 Creating Questions...\n');
    
    const questions = [
      // Day 79: DFS & Connected Components
      createQuestion({
        topicId: 'day-79-dfs-connected',
        title: 'Number of Provinces',
        description: 'There are n cities. Some are connected, some are not. A province is a group of directly or indirectly connected cities. Given an n x n matrix isConnected where isConnected[i][j] = 1 if city i and city j are directly connected. Return the total number of provinces.',
        difficulty: 'Medium',
        tags: ['Graph', 'DFS', 'Union-Find'],
        examples: [{ input: '[[1,1,0],[1,1,0],[0,0,1]]', output: '2' }],
        testCases: [
          { input: '[[1,1,0],[1,1,0],[0,0,1]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,0,0],[0,1,0],[0,0,1]]', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '[[1,1],[1,1]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(isConnected, i, visited);
                count++;
            }
        }
        return count;
    }
    private static void dfs(int[][] isConnected, int city, boolean[] visited) {
        visited[city] = true;
        for (int i = 0; i < isConnected.length; i++) {
            if (isConnected[city][i] == 1 && !visited[i]) {
                dfs(isConnected, i, visited);
            }
        }
    }
    public static void main(String[] args) {
        // Parse and test
    }
}`
      }),
      createQuestion({
        topicId: 'day-79-dfs-connected',
        title: 'Max Area of Island',
        description: 'Given an m x n binary matrix grid. An island is a group of 1s connected 4-directionally. Return the maximum area of an island in grid. If there is no island, return 0.',
        difficulty: 'Medium',
        tags: ['Graph', 'DFS', 'Matrix'],
        examples: [{ input: '[[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,1],[0,0,0,0,1]]', output: '2' }],
        testCases: [
          { input: '[[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,1],[0,0,0,0,1]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,1],[1,1]]', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[[0]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[1,0,1],[1,0,1]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1,1,1],[1,0,1],[1,1,1]]', expectedOutput: '8', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int maxAreaOfIsland(int[][] grid) {
        int maxArea = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) {
                    int area = dfs(grid, i, j);
                    maxArea = Math.max(maxArea, area);
                }
            }
        }
        return maxArea;
    }
    private static int dfs(int[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 0) {
            return 0;
        }
        grid[i][j] = 0;
        int area = 1;
        area += dfs(grid, i - 1, j);
        area += dfs(grid, i + 1, j);
        area += dfs(grid, i, j - 1);
        area += dfs(grid, i, j + 1);
        return area;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-79-dfs-connected',
        title: 'Count Sub Islands',
        description: 'Given two m x n binary matrices grid1 and grid2. An island in grid2 is a sub-island if there is an island in grid1 that contains all the cells of this island. Return the number of islands in grid2 that are sub-islands.',
        difficulty: 'Medium',
        tags: ['Graph', 'DFS', 'Matrix'],
        examples: [{ input: '[[1,1,1,0,0],[0,1,1,1,1]]\n[[1,1,1,0,0],[0,0,1,1,1]]', output: '1' }],
        testCases: [
          { input: '[[1,1,1,0,0],[0,1,1,1,1]]\n[[1,1,1,0,0],[0,0,1,1,1]]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[[1,1],[1,1]]\n[[1,1],[1,1]]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[[1,0],[1,1]]\n[[1,1],[1,0]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[0,0],[0,0]]\n[[0,0],[0,0]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[1,1,1],[1,1,1],[1,1,1]]\n[[1,1,1],[0,1,0],[1,1,1]]', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int countSubIslands(int[][] grid1, int[][] grid2) {
        int count = 0;
        for (int i = 0; i < grid2.length; i++) {
            for (int j = 0; j < grid2[0].length; j++) {
                if (grid2[i][j] == 1 && isSubIsland(grid1, grid2, i, j)) {
                    count++;
                }
            }
        }
        return count;
    }
    private static boolean isSubIsland(int[][] grid1, int[][] grid2, int i, int j) {
        if (i < 0 || i >= grid2.length || j < 0 || j >= grid2[0].length) {
            return true;
        }
        if (grid2[i][j] == 0) return true;
        if (grid1[i][j] == 0) return false;
        grid2[i][j] = 0;
        boolean result = isSubIsland(grid1, grid2, i - 1, j) && 
                        isSubIsland(grid1, grid2, i + 1, j) &&
                        isSubIsland(grid1, grid2, i, j - 1) &&
                        isSubIsland(grid1, grid2, i, j + 1);
        return result;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-79-dfs-connected',
        title: 'Reorder Routes to Make All Paths Lead to City Zero',
        description: 'There are n cities and n-1 roads forming a tree. Roads are directed. Reorient some roads so each city can visit city 0. Return the minimum number of edges changed.',
        difficulty: 'Medium',
        tags: ['Graph', 'DFS', 'Tree'],
        examples: [{ input: '6\n[[0,1],[1,3],[2,3],[4,0],[4,5]]', output: '3' }],
        testCases: [
          { input: '6\n[[0,1],[1,3],[2,3],[4,0],[4,5]]', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '3\n[[1,0],[2,0]]', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '3\n[[1,0],[2,1]]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '2\n[[1,0]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '4\n[[1,0],[1,2],[3,2]]', expectedOutput: '1', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int minReorder(int n, int[][] connections) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] conn : connections) {
            adj.get(conn[0]).add(new int[]{conn[1], 1});
            adj.get(conn[1]).add(new int[]{conn[0], 0});
        }
        return dfs(0, -1, adj);
    }
    private static int dfs(int node, int parent, List<List<int[]>> adj) {
        int changes = 0;
        for (int[] neighbor : adj.get(node)) {
            if (neighbor[0] != parent) {
                changes += neighbor[1] + dfs(neighbor[0], node, adj);
            }
        }
        return changes;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-79-dfs-connected',
        title: 'Number of Connected Components in an Undirected Graph',
        description: 'Given n nodes labeled from 0 to n-1 and a list of undirected edges. Return the number of connected components in the undirected graph.',
        difficulty: 'Easy',
        tags: ['Graph', 'DFS', 'Union-Find'],
        examples: [{ input: '5\n[[0,1],[1,2],[3,4]]', output: '2' }],
        testCases: [
          { input: '5\n[[0,1],[1,2],[3,4]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '5\n[[0,1],[1,2],[2,3],[3,4]]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '5\n[]', expectedOutput: '5', isHidden: true, points: 20 },
          { input: '3\n[[0,1],[1,2]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '4\n[[0,1],[2,3]]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int countComponents(int n, int[][] edges) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }
        boolean[] visited = new boolean[n];
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(i, adj, visited);
                count++;
            }
        }
        return count;
    }
    private static void dfs(int node, List<Integer>[] adj, boolean[] visited) {
        visited[node] = true;
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited);
            }
        }
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 80: Cycle Detection
      createQuestion({
        topicId: 'day-80-cycle-detection',
        title: 'Course Schedule (Detect Cycle)',
        description: 'There are numCourses courses with prerequisites. prerequisites[i] = [ai, bi] means you must take bi first to take ai. Return true if you can finish all courses.',
        difficulty: 'Medium',
        tags: ['Graph', 'Cycle Detection', 'DFS'],
        examples: [{ input: '2\n[[1,0]]', output: 'true' }, { input: '2\n[[1,0],[0,1]]', output: 'false' }],
        testCases: [
          { input: '2\n[[1,0]]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '2\n[[1,0],[0,1]]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '1\n[]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '3\n[[0,1],[0,2],[1,2]]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '3\n[[0,1],[1,2],[2,0]]', expectedOutput: 'false', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<Integer>[] adj = new ArrayList[numCourses];
        int[] state = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        for (int[] pre : prerequisites) {
            adj[pre[1]].add(pre[0]);
        }
        for (int i = 0; i < numCourses; i++) {
            if (hasCycle(i, adj, state)) return false;
        }
        return true;
    }
    private static boolean hasCycle(int node, List<Integer>[] adj, int[] state) {
        if (state[node] == 1) return true;
        if (state[node] == 2) return false;
        state[node] = 1;
        for (int neighbor : adj[node]) {
            if (hasCycle(neighbor, adj, state)) return true;
        }
        state[node] = 2;
        return false;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-80-cycle-detection',
        title: 'Course Schedule II (Topological Sort)',
        description: 'Return the ordering of courses to finish all courses. If impossible, return empty array.',
        difficulty: 'Medium',
        tags: ['Graph', 'Topological Sort'],
        examples: [{ input: '4\n[[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3]' }],
        testCases: [
          { input: '4\n[[1,0],[2,0],[3,1],[3,2]]', expectedOutput: '[0,1,2,3]', isHidden: false, points: 20 },
          { input: '2\n[[1,0]]', expectedOutput: '[0,1]', isHidden: false, points: 20 },
          { input: '1\n[]', expectedOutput: '[0]', isHidden: true, points: 20 },
          { input: '2\n[[1,0],[0,1]]', expectedOutput: '[]', isHidden: true, points: 20 },
          { input: '3\n[[1,0]]', expectedOutput: '[0,1,2]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int[] findOrder(int numCourses, int[][] prerequisites) {
        int[] indegree = new int[numCourses];
        List<Integer>[] adj = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        for (int[] pre : prerequisites) {
            adj[pre[1]].add(pre[0]);
            indegree[pre[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.offer(i);
        }
        int[] result = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int course = q.poll();
            result[idx++] = course;
            for (int next : adj[course]) {
                if (--indegree[next] == 0) q.offer(next);
            }
        }
        return idx == numCourses ? result : new int[0];
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-80-cycle-detection',
        title: 'Find Eventual Safe States',
        description: 'A safe node is one where every possible path leads to a terminal node. Return all safe nodes sorted in ascending order.',
        difficulty: 'Medium',
        tags: ['Graph', 'DFS', 'Cycle Detection'],
        examples: [{ input: '[[1,2],[2,3],[5],[0],[5],[],[]]', output: '[2,4,5,6]' }],
        testCases: [
          { input: '[[1,2],[2,3],[5],[0],[5],[],[]]', expectedOutput: '[2,4,5,6]', isHidden: false, points: 20 },
          { input: '[[1,2],[2,1],[3],[]]', expectedOutput: '[3]', isHidden: false, points: 20 },
          { input: '[[]]', expectedOutput: '[0]', isHidden: true, points: 20 },
          { input: '[[1],[2],[3],[1]]', expectedOutput: '[]', isHidden: true, points: 20 },
          { input: '[[1,2],[3],[4],[5],[]]', expectedOutput: '[0,1,2,3,4]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        int[] state = new int[n];
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (isSafe(i, graph, state)) result.add(i);
        }
        return result;
    }
    private static boolean isSafe(int node, int[][] graph, int[] state) {
        if (state[node] != 0) return state[node] == 2;
        state[node] = 1;
        for (int neighbor : graph[node]) {
            if (!isSafe(neighbor, graph, state)) return false;
        }
        state[node] = 2;
        return true;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-80-cycle-detection',
        title: 'Redundant Connection',
        description: 'Graph started as a tree with n nodes. One additional edge was added. Return an edge to remove so result is a tree.',
        difficulty: 'Medium',
        tags: ['Graph', 'Union-Find', 'Cycle Detection'],
        examples: [{ input: '[[1,2],[1,3],[2,3]]', output: '[2,3]' }],
        testCases: [
          { input: '[[1,2],[1,3],[2,3]]', expectedOutput: '[2,3]', isHidden: false, points: 20 },
          { input: '[[1,2],[2,3],[3,4],[1,4],[1,5]]', expectedOutput: '[1,4]', isHidden: false, points: 20 },
          { input: '[[1,2]]', expectedOutput: '[]', isHidden: true, points: 20 },
          { input: '[[1,2],[1,3],[3,4],[2,4]]', expectedOutput: '[2,4]', isHidden: true, points: 20 },
          { input: '[[2,3],[3,4],[4,5],[1,5],[3,5]]', expectedOutput: '[3,5]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class UnionFind {
    int[] parent, rank;
    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) { int t = px; px = py; py = t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
}
public class Solution {
    public static int[] findRedundantConnection(int[][] edges) {
        UnionFind uf = new UnionFind(edges.length + 1);
        for (int[] edge : edges) {
            if (!uf.union(edge[0], edge[1])) return edge;
        }
        return new int[0];
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-80-cycle-detection',
        title: 'Is Graph Bipartite?',
        description: 'A graph is bipartite if nodes can be partitioned into two independent sets A and B such that every edge connects a node in A to a node in B.',
        difficulty: 'Medium',
        tags: ['Graph', 'Bipartite', 'Coloring'],
        examples: [{ input: '[[1,2,3],[0,2],[0,1,3],[0,2]]', output: 'false' }],
        testCases: [
          { input: '[[1,2,3],[0,2],[0,1,3],[0,2]]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[[1,3],[0,2],[1,3],[0,2]]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[[]]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[[1],[0,2],[1]]', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[[1],[0],[3],[2]]', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static boolean isBipartite(int[][] graph) {
        int[] color = new int[graph.length];
        for (int i = 0; i < graph.length; i++) {
            if (color[i] == 0 && !bfs(graph, i, color)) return false;
        }
        return true;
    }
    private static boolean bfs(int[][] graph, int start, int[] color) {
        Queue<Integer> q = new LinkedList<>();
        q.offer(start);
        color[start] = 1;
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : graph[u]) {
                if (color[v] == 0) {
                    color[v] = -color[u];
                    q.offer(v);
                } else if (color[v] == color[u]) {
                    return false;
                }
            }
        }
        return true;
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 81: Topological Sort
      createQuestion({
        topicId: 'day-81-topological-sort',
        title: 'Course Schedule II (Kahn\'s Algorithm)',
        description: 'Return course ordering using Kahn\'s Algorithm (BFS Topological Sort).',
        difficulty: 'Medium',
        tags: ['Graph', 'Topological Sort', 'Kahn\'s Algorithm'],
        examples: [{ input: '4\n[[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3]' }],
        testCases: [
          { input: '4\n[[1,0],[2,0],[3,1],[3,2]]', expectedOutput: '[0,1,2,3]', isHidden: false, points: 20 },
          { input: '2\n[[1,0]]', expectedOutput: '[0,1]', isHidden: false, points: 20 },
          { input: '3\n[[1,0],[0,1]]', expectedOutput: '[]', isHidden: true, points: 20 },
          { input: '1\n[]', expectedOutput: '[0]', isHidden: true, points: 20 },
          { input: '3\n[[2,0],[2,1]]', expectedOutput: '[0,1,2]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int[] findOrder(int numCourses, int[][] prerequisites) {
        int[] indegree = new int[numCourses];
        List<Integer>[] adj = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        for (int[] pre : prerequisites) {
            adj[pre[1]].add(pre[0]);
            indegree[pre[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.offer(i);
        }
        int[] result = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int course = q.poll();
            result[idx++] = course;
            for (int next : adj[course]) {
                if (--indegree[next] == 0) q.offer(next);
            }
        }
        return idx == numCourses ? result : new int[0];
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-81-topological-sort',
        title: 'Alien Dictionary',
        description: 'Given a sorted list of words from alien language, return the order of characters. If no valid order exists, return "".',
        difficulty: 'Hard',
        tags: ['Graph', 'Topological Sort'],
        examples: [{ input: '[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]', output: '\"wertf\"' }],
        testCases: [
          { input: '[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]', expectedOutput: '\"wertf\"', isHidden: false, points: 20 },
          { input: '[\"z\",\"x\"]', expectedOutput: '\"zx\"', isHidden: false, points: 20 },
          { input: '[\"z\",\"x\",\"z\"]', expectedOutput: '\"\"', isHidden: true, points: 20 },
          { input: '[\"abc\",\"ab\"]', expectedOutput: '\"\"', isHidden: true, points: 20 },
          { input: '[\"caa\",\"aab\",\"aac\",\"cac\",\"caa\",\"aaac\"]', expectedOutput: '\"cabac\"', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static String alienOrder(String[] words) {
        Map<Character, Set<Character>> graph = new HashMap<>();
        Map<Character, Integer> indegree = new HashMap<>();
        for (String word : words) {
            for (char c : word.toCharArray()) {
                if (!indegree.containsKey(c)) indegree.put(c, 0);
                graph.putIfAbsent(c, new HashSet<>());
            }
        }
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int minLen = Math.min(w1.length(), w2.length());
            for (int j = 0; j < minLen; j++) {
                char c1 = w1.charAt(j), c2 = w2.charAt(j);
                if (c1 != c2) {
                    if (!graph.get(c1).contains(c2)) {
                        graph.get(c1).add(c2);
                        indegree.put(c2, indegree.get(c2) + 1);
                    }
                    break;
                }
            }
        }
        Queue<Character> q = new LinkedList<>();
        for (char c : indegree.keySet()) {
            if (indegree.get(c) == 0) q.offer(c);
        }
        StringBuilder result = new StringBuilder();
        while (!q.isEmpty()) {
            char c = q.poll();
            result.append(c);
            for (char neighbor : graph.get(c)) {
                indegree.put(neighbor, indegree.get(neighbor) - 1);
                if (indegree.get(neighbor) == 0) q.offer(neighbor);
            }
        }
        return result.length() == indegree.size() ? result.toString() : "";
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-81-topological-sort',
        title: 'Parallel Courses',
        description: 'Return the minimum number of semesters needed to take all courses with prerequisites.',
        difficulty: 'Hard',
        tags: ['Graph', 'Topological Sort'],
        examples: [{ input: '3\n[[1,3],[2,3]]', output: '2' }],
        testCases: [
          { input: '3\n[[1,3],[2,3]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '1\n[]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '3\n[[1,2],[2,3]]', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '4\n[[1,2],[2,3],[3,4]]', expectedOutput: '4', isHidden: true, points: 20 },
          { input: '5\n[[1,4],[2,4],[3,1],[3,2]]', expectedOutput: '3', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int minimumSemesters(int n, int[][] relations) {
        int[] indegree = new int[n + 1];
        List<Integer>[] adj = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new ArrayList<>();
        for (int[] rel : relations) {
            adj[rel[0]].add(rel[1]);
            indegree[rel[1]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == 0) q.offer(i);
        }
        int semesters = 0, completed = 0;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int course = q.poll();
                completed++;
                for (int next : adj[course]) {
                    if (--indegree[next] == 0) q.offer(next);
                }
            }
            semesters++;
        }
        return completed == n ? semesters : -1;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-81-topological-sort',
        title: 'Sort Items by Groups Respecting Dependencies',
        description: 'Sort items such that items in same group are adjacent and item dependencies are respected.',
        difficulty: 'Hard',
        tags: ['Graph', 'Topological Sort'],
        examples: [{ input: '8\n2\n[-1,-1,1,0,0,1,0,-1]\n[[],[6],[5],[6],[3,6],[],[],[]]', output: '[6,3,4,1,5,2,0,7]' }],
        testCases: [
          { input: '8\n2\n[-1,-1,1,0,0,1,0,-1]\n[[],[6],[5],[6],[3,6],[],[],[]]', expectedOutput: '[6,3,4,1,5,2,0,7]', isHidden: false, points: 20 },
          { input: '8\n2\n[-1,-1,1,0,0,1,0,-1]\n[[],[6],[5],[6],[3],[],[4],[]]', expectedOutput: '[6,3,4,1,5,2,0,7]', isHidden: false, points: 20 },
          { input: '3\n-1\n[-1,-1,-1]\n[[],[],[]]', expectedOutput: '[0,1,2]', isHidden: true, points: 20 },
          { input: '2\n1\n[0,-1]\n[[1],[]]', expectedOutput: '[0,1]', isHidden: true, points: 20 },
          { input: '3\n2\n[0,1,-1]\n[[],[2],[]]', expectedOutput: '[1,0,2]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int[] sortItems(int n, int m, int[] group, List<List<Integer>> beforeItems) {
        for (int i = 0; i < n; i++) {
            if (group[i] == -1) group[i] = m++;
        }
        int[] itemIndeg = new int[n];
        int[] groupIndeg = new int[m];
        List<Integer>[] itemAdj = new ArrayList[n];
        List<Integer>[] groupAdj = new ArrayList[m];
        for (int i = 0; i < n; i++) itemAdj[i] = new ArrayList<>();
        for (int i = 0; i < m; i++) groupAdj[i] = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            for (int before : beforeItems.get(i)) {
                if (group[i] == group[before]) {
                    itemAdj[before].add(i);
                    itemIndeg[i]++;
                } else {
                    groupAdj[group[before]].add(group[i]);
                }
            }
        }
        List<Integer> itemOrder = topSort(itemIndeg, itemAdj, n);
        List<Integer> groupOrder = topSort(groupIndeg, groupAdj, m);
        if (itemOrder.size() != n || groupOrder.size() != m) return new int[0];
        Map<Integer, List<Integer>> groupToItems = new HashMap<>();
        for (int i = 0; i < n; i++) {
            groupToItems.computeIfAbsent(group[i], k -> new ArrayList<>()).add(i);
        }
        int[] result = new int[n];
        int idx = 0;
        for (int g : groupOrder) {
            for (int item : groupToItems.get(g)) result[idx++] = item;
        }
        return result;
    }
    private static List<Integer> topSort(int[] indeg, List<Integer>[] adj, int n) {
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) if (indeg[i] == 0) q.offer(i);
        List<Integer> order = new ArrayList<>();
        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int v : adj[u]) if (--indeg[v] == 0) q.offer(v);
        }
        return order;
    }
    public static void main(String[] args) {}
}`
      })
    ];

    let created = 0;
    for (const questionData of questions) {
      const existing = await Question.findOne({ title: questionData.title });
      if (!existing) {
        await Question.create(questionData);
        console.log(`  ✅ Created: ${questionData.title}`);
        created++;
      } else {
        console.log(`  ⏭️  Exists: ${questionData.title}`);
      }
    }

    console.log(`\n🎉 Days 79-81 complete! Created ${created}/15 questions\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays79to81();
