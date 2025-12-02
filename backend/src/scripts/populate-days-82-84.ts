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
    id: 'day-82-shortest-path',
    title: 'Shortest Path (BFS & Dijkstra)',
    description: 'Shortest path in binary matrix, network delay, max probability, cheapest flights, minimum effort',
    week: 13,
    day: 82,
    difficulty: 'Medium',
    estimatedTime: 130,
    prerequisites: [],
    compulsoryQuestion: 'Network Delay Time',
    practiceQuestions: 5
  },
  {
    id: 'day-83-mst-algorithms',
    title: 'MST (Prim\'s & Kruskal\'s)',
    description: 'Minimum spanning tree, connect points, village water distribution, critical edges',
    week: 13,
    day: 83,
    difficulty: 'Hard',
    estimatedTime: 135,
    prerequisites: ['day-82-shortest-path'],
    compulsoryQuestion: 'Min Cost to Connect All Points',
    practiceQuestions: 5
  },
  {
    id: 'day-84-bellman-ford',
    title: 'Bellman-Ford & SCC',
    description: 'Negative weights, network delay, cheapest flights, critical connections, disconnect island',
    week: 13,
    day: 84,
    difficulty: 'Hard',
    estimatedTime: 140,
    prerequisites: ['day-83-mst-algorithms'],
    compulsoryQuestion: 'Critical Connections',
    practiceQuestions: 5
  }
];

async function populateDays82to84() {
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
      // Day 82: Shortest Path
      createQuestion({
        topicId: 'day-82-shortest-path',
        title: 'Shortest Path in Binary Matrix',
        description: 'Given n x n binary matrix, return length of shortest clear path from (0,0) to (n-1,n-1). Use 8-directional movement. Return -1 if no path exists.',
        difficulty: 'Medium',
        tags: ['Graph', 'BFS', 'Shortest Path'],
        examples: [{ input: '[[0,1],[1,0]]', output: '2' }],
        testCases: [
          { input: '[[0,1],[1,0]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[0,0],[1,0]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,0],[1,0]]', expectedOutput: '-1', isHidden: true, points: 20 },
          { input: '[[0]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[0,1,0],[0,1,0],[0,0,0]]', expectedOutput: '4', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int shortestPathBinaryMatrix(int[][] grid) {
        if (grid[0][0] == 1) return -1;
        int n = grid.length;
        if (n == 1) return 1;
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, 0, 1});
        int[][] dirs = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
        boolean[][] visited = new boolean[n][n];
        visited[0][0] = true;
        while (!q.isEmpty()) {
            int[] curr = q.poll();
            for (int[] d : dirs) {
                int nr = curr[0] + d[0], nc = curr[1] + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0 && !visited[nr][nc]) {
                    if (nr == n - 1 && nc == n - 1) return curr[2] + 1;
                    visited[nr][nc] = true;
                    q.offer(new int[]{nr, nc, curr[2] + 1});
                }
            }
        }
        return -1;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-82-shortest-path',
        title: 'Network Delay Time (Dijkstra)',
        description: 'Given n nodes and travel times as edges, send signal from node k. Return minimum time for all nodes to receive signal.',
        difficulty: 'Medium',
        tags: ['Graph', 'Dijkstra', 'Shortest Path'],
        examples: [{ input: '[[2,1,1],[2,3,1],[3,4,1]]\n4\n2', output: '2' }],
        testCases: [
          { input: '[[2,1,1],[2,3,1],[3,4,1]]\n4\n2', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,2,1]]\n2\n1', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[[1,2,1]]\n2\n2', expectedOutput: '-1', isHidden: true, points: 20 },
          { input: '[[1,2,1],[2,3,2],[1,3,4]]\n3\n1', expectedOutput: '4', isHidden: true, points: 20 },
          { input: '[[1,2,1],[2,1,10]]\n2\n1', expectedOutput: '-1', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int networkDelayTime(int[][] times, int n, int k) {
        List<int[]>[] adj = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new ArrayList<>();
        for (int[] t : times) adj[t[0]].add(new int[]{t[1], t[2]});
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.offer(new int[]{k, 0});
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0], d = curr[1];
            if (d > dist[u]) continue;
            for (int[] edge : adj[u]) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.offer(new int[]{v, dist[v]});
                }
            }
        }
        int maxDist = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Integer.MAX_VALUE) return -1;
            maxDist = Math.max(maxDist, dist[i]);
        }
        return maxDist;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-82-shortest-path',
        title: 'Path with Maximum Probability',
        description: 'Find path with maximum probability of success from start to end node.',
        difficulty: 'Medium',
        tags: ['Graph', 'Dijkstra', 'Max Probability'],
        examples: [{ input: '3\n[[0,1],[1,2],[0,2]]\n[0.5,0.5,0.2]\n0\n2', output: '0.25000' }],
        testCases: [
          { input: '3\n[[0,1],[1,2],[0,2]]\n[0.5,0.5,0.2]\n0\n2', expectedOutput: '0.25000', isHidden: false, points: 20 },
          { input: '3\n[[0,1],[1,2]]\n[0.1,0.2]\n0\n2', expectedOutput: '0.02000', isHidden: false, points: 20 },
          { input: '3\n[[0,1],[1,2]]\n[0.1,0.3]\n0\n2', expectedOutput: '0.00000', isHidden: true, points: 20 },
          { input: '2\n[[1,0]]\n[0.5]\n0\n1', expectedOutput: '0.00000', isHidden: true, points: 20 },
          { input: '2\n[[0,1]]\n[0.5]\n0\n1', expectedOutput: '0.50000', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static double maxProbability(int n, int[][] edges, double[] succProb, int start, int end) {
        List<int[]>[] adj = new ArrayList[n];
        List<Double>[] probs = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
            probs[i] = new ArrayList<>();
        }
        for (int i = 0; i < edges.length; i++) {
            int u = edges[i][0], v = edges[i][1];
            adj[u].add(new int[]{v, i});
            adj[v].add(new int[]{u, i});
        }
        double[] prob = new double[n];
        prob[start] = 1.0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Double.compare(prob[b[0]], prob[a[0]]));
        pq.offer(new int[]{start});
        while (!pq.isEmpty()) {
            int u = pq.poll()[0];
            for (int i = 0; i < adj[u].size(); i++) {
                int v = adj[u].get(i)[0], idx = adj[u].get(i)[1];
                double newProb = prob[u] * succProb[idx];
                if (newProb > prob[v]) {
                    prob[v] = newProb;
                    pq.offer(new int[]{v});
                }
            }
        }
        return prob[end];
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-82-shortest-path',
        title: 'Cheapest Flights Within K Stops',
        description: 'Find cheapest price from src to dst with at most k stops.',
        difficulty: 'Medium',
        tags: ['Graph', 'Dijkstra', 'BFS'],
        examples: [{ input: '3\n[[0,1,100],[1,2,100],[0,2,500]]\n0\n2\n1', output: '200' }],
        testCases: [
          { input: '3\n[[0,1,100],[1,2,100],[0,2,500]]\n0\n2\n1', expectedOutput: '200', isHidden: false, points: 20 },
          { input: '3\n[[0,1,100],[1,2,100],[0,2,500]]\n0\n2\n0', expectedOutput: '500', isHidden: false, points: 20 },
          { input: '3\n[[0,1,1],[0,2,4],[1,2,10]]\n0\n2\n1', expectedOutput: '6', isHidden: true, points: 20 },
          { input: '2\n[[0,1,100]]\n0\n1\n1', expectedOutput: '100', isHidden: true, points: 20 },
          { input: '3\n[[0,1,100],[1,2,100],[2,0,100],[1,0,100],[2,1,100],[0,2,100]]\n0\n2\n1', expectedOutput: '200', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] f : flights) adj[f[0]].add(new int[]{f[1], f[2]});
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{src, 0, 0});
        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int u = curr[0], d = curr[1], stops = curr[2];
            if (stops > k || d > dist[u]) continue;
            for (int[] edge : adj[u]) {
                int v = edge[0], w = edge[1];
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    q.offer(new int[]{v, dist[v], stops + 1});
                }
            }
        }
        return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-82-shortest-path',
        title: 'Minimum Effort Path',
        description: 'Find route with minimum effort. Effort is max absolute difference in heights between consecutive cells.',
        difficulty: 'Medium',
        tags: ['Graph', 'Dijkstra', 'Matrix'],
        examples: [{ input: '[[1,2,2],[3,8,2],[5,3,5]]', output: '2' }],
        testCases: [
          { input: '[[1,2,2],[3,8,2],[5,3,5]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,2],[1,2]]', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '[[1]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[1,2,1,1],[1,2,1,2],[1,2,1,2]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1,10,6,14,15],[13,3,11,5,16],[17,1,13,2,18],[8,7,4,9,19],[12,20,21,22,23]]', expectedOutput: '13', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int minimumEffortPath(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        dist[0][0] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, 0, 0});
        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0], r = curr[1], c = curr[2];
            if (d > dist[r][c]) continue;
            if (r == m - 1 && c == n - 1) return d;
            for (int[] dir : dirs) {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    int newEffort = Math.max(d, Math.abs(heights[nr][nc] - heights[r][c]));
                    if (newEffort < dist[nr][nc]) {
                        dist[nr][nc] = newEffort;
                        pq.offer(new int[]{newEffort, nr, nc});
                    }
                }
            }
        }
        return -1;
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 83: MST Algorithms
      createQuestion({
        topicId: 'day-83-mst-algorithms',
        title: 'Min Cost to Connect All Points',
        description: 'Connect all points with minimum total Manhattan distance cost.',
        difficulty: 'Hard',
        tags: ['Graph', 'MST', 'Kruskal'],
        examples: [{ input: '[[0,0],[2,2],[3,10],[5,2],[7,0]]', output: '20' }],
        testCases: [
          { input: '[[0,0],[2,2],[3,10],[5,2],[7,0]]', expectedOutput: '20', isHidden: false, points: 20 },
          { input: '[[0,0],[1,1],[1,0],[0,1]]', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[[0,0]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[0,0],[1,1]]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[[0,0],[1,0],[0,1]]', expectedOutput: '2', isHidden: true, points: 20 }
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
    public static int minCostConnectPoints(int[][] points) {
        int n = points.length;
        List<int[]> edges = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int dist = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
                edges.add(new int[]{dist, i, j});
            }
        }
        Collections.sort(edges, (a, b) -> a[0] - b[0]);
        UnionFind uf = new UnionFind(n);
        int cost = 0, edges_used = 0;
        for (int[] edge : edges) {
            if (uf.union(edge[1], edge[2])) {
                cost += edge[0];
                if (++edges_used == n - 1) break;
            }
        }
        return cost;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-83-mst-algorithms',
        title: 'Connecting Cities With Minimum Cost',
        description: 'Connect n cities with minimum cost. Return -1 if impossible.',
        difficulty: 'Medium',
        tags: ['Graph', 'MST', 'Union-Find'],
        examples: [{ input: '3\n[[1,2,5],[1,3,6],[2,3,1]]', output: '6' }],
        testCases: [
          { input: '3\n[[1,2,5],[1,3,6],[2,3,1]]', expectedOutput: '6', isHidden: false, points: 20 },
          { input: '4\n[[1,2,3],[3,4,4]]', expectedOutput: '-1', isHidden: false, points: 20 },
          { input: '1\n[]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '2\n[[1,2,100]]', expectedOutput: '100', isHidden: true, points: 20 },
          { input: '5\n[[1,2,1],[2,3,2],[1,3,2],[2,4,1],[2,5,3]]', expectedOutput: '5', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class UnionFind {
    int[] parent;
    UnionFind(int n) {
        parent = new int[n + 1];
        for (int i = 0; i <= n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        parent[py] = px;
        return true;
    }
}
public class Solution {
    public static int minimumCost(int n, int[][] connections) {
        Arrays.sort(connections, (a, b) -> a[2] - b[2]);
        UnionFind uf = new UnionFind(n);
        int cost = 0, edges = 0;
        for (int[] conn : connections) {
            if (uf.union(conn[0], conn[1])) {
                cost += conn[2];
                if (++edges == n - 1) return cost;
            }
        }
        return -1;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-83-mst-algorithms',
        title: 'Optimize Water Distribution in a Village',
        description: 'Supply water to all houses with wells and pipes. Create virtual node 0 connected to every house.',
        difficulty: 'Hard',
        tags: ['Graph', 'MST', 'Union-Find'],
        examples: [{ input: '3\n[1,2,2]\n[[1,2,1],[2,3,5]]', output: '3' }],
        testCases: [
          { input: '3\n[1,2,2]\n[[1,2,1],[2,3,5]]', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '2\n[1,1]\n[[1,2,1]]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '1\n[100]\n[]', expectedOutput: '100', isHidden: true, points: 20 },
          { input: '3\n[5,5,5]\n[[1,2,1],[1,3,1]]', expectedOutput: '7', isHidden: true, points: 20 },
          { input: '2\n[1,10]\n[[1,2,100]]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class UnionFind {
    int[] parent;
    UnionFind(int n) {
        parent = new int[n + 1];
        for (int i = 0; i <= n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        parent[py] = px;
        return true;
    }
}
public class Solution {
    public static int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {
        List<int[]> edges = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            edges.add(new int[]{wells[i], 0, i + 1});
        }
        for (int[] pipe : pipes) {
            edges.add(new int[]{pipe[2], pipe[0], pipe[1]});
        }
        Collections.sort(edges, (a, b) -> a[0] - b[0]);
        UnionFind uf = new UnionFind(n + 1);
        int cost = 0;
        for (int[] edge : edges) {
            if (uf.union(edge[1], edge[2])) {
                cost += edge[0];
            }
        }
        return cost;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-83-mst-algorithms',
        title: 'Find Critical and Pseudo-Critical Edges in MST',
        description: 'Critical edge: must be in every MST. Pseudo-critical: in some MST but not all.',
        difficulty: 'Hard',
        tags: ['Graph', 'MST', 'Kruskal'],
        examples: [{ input: '5\n[[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]', output: '[[0,1],[2,3,4,5]]' }],
        testCases: [
          { input: '5\n[[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]', expectedOutput: '[[0,1],[2,3,4,5]]', isHidden: false, points: 20 },
          { input: '4\n[[0,1,1],[1,2,1],[2,3,1],[0,3,1]]', expectedOutput: '[[],[0,1,2,3]]', isHidden: false, points: 20 },
          { input: '3\n[[0,1,1],[1,2,2],[0,2,3]]', expectedOutput: '[[0,1],[2]]', isHidden: true, points: 20 },
          { input: '2\n[[0,1,1]]', expectedOutput: '[[0],[]]', isHidden: true, points: 20 },
          { input: '3\n[[0,1,1],[1,2,1],[0,2,2]]', expectedOutput: '[[],[0,1,2]]', isHidden: true, points: 20 }
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
    public static List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        int[][] sorted = new int[edges.length][4];
        for (int i = 0; i < edges.length; i++) {
            sorted[i][0] = edges[i][0];
            sorted[i][1] = edges[i][1];
            sorted[i][2] = edges[i][2];
            sorted[i][3] = i;
        }
        Arrays.sort(sorted, (a, b) -> a[2] - b[2]);
        long mstWeight = getMSTWeight(n, sorted, -1, -1);
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> critical = new ArrayList<>();
        List<Integer> pseudoCritical = new ArrayList<>();
        for (int i = 0; i < edges.length; i++) {
            if (getMSTWeight(n, sorted, i, -1) > mstWeight) {
                critical.add(i);
            } else if (getMSTWeight(n, sorted, -1, i) == mstWeight) {
                pseudoCritical.add(i);
            }
        }
        result.add(critical);
        result.add(pseudoCritical);
        return result;
    }
    private static long getMSTWeight(int n, int[][] edges, int exclude, int include) {
        UnionFind uf = new UnionFind(n);
        long weight = 0;
        if (include != -1 && include < edges.length) {
            uf.union(edges[include][0], edges[include][1]);
            weight += edges[include][2];
        }
        for (int i = 0; i < edges.length; i++) {
            if (i == exclude || i == include) continue;
            if (uf.union(edges[i][0], edges[i][1])) {
                weight += edges[i][2];
            }
        }
        return weight;
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 84: Bellman-Ford & SCC
      createQuestion({
        topicId: 'day-84-bellman-ford',
        title: 'Critical Connections in a Network (Tarjan)',
        description: 'Return all critical connections (bridges) in the network.',
        difficulty: 'Hard',
        tags: ['Graph', 'Bridge', 'Tarjan'],
        examples: [{ input: '4\n[[0,1],[1,2],[2,0],[1,3]]', output: '[[1,3]]' }],
        testCases: [
          { input: '4\n[[0,1],[1,2],[2,0],[1,3]]', expectedOutput: '[[1,3]]', isHidden: false, points: 20 },
          { input: '2\n[[0,1]]', expectedOutput: '[[0,1]]', isHidden: false, points: 20 },
          { input: '3\n[[0,1],[1,2]]', expectedOutput: '[[0,1],[1,2]]', isHidden: true, points: 20 },
          { input: '3\n[[0,1],[1,2],[2,0]]', expectedOutput: '[]', isHidden: true, points: 20 },
          { input: '4\n[[0,1],[1,2],[2,3],[3,0],[1,3]]', expectedOutput: '[]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    int timer = 0;
    public static List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (List<Integer> conn : connections) {
            adj.get(conn.get(0)).add(conn.get(1));
            adj.get(conn.get(1)).add(conn.get(0));
        }
        List<List<Integer>> bridges = new ArrayList<>();
        int[] disc = new int[n], low = new int[n], parent = new int[n];
        Arrays.fill(parent, -1);
        Solution sol = new Solution();
        for (int i = 0; i < n; i++) {
            if (disc[i] == 0) sol.dfs(i, adj, disc, low, parent, bridges);
        }
        return bridges;
    }
    void dfs(int u, List<List<Integer>> adj, int[] disc, int[] low, int[] parent, List<List<Integer>> bridges) {
        disc[u] = low[u] = ++timer;
        for (int v : adj.get(u)) {
            if (disc[v] == 0) {
                parent[v] = u;
                dfs(v, adj, disc, low, parent, bridges);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) {
                    bridges.add(Arrays.asList(u, v));
                }
            } else if (v != parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-84-bellman-ford',
        title: 'Minimum Number of Days to Disconnect Island',
        description: 'Minimum days needed to disconnect grid. Answer is 0, 1, or 2.',
        difficulty: 'Hard',
        tags: ['Graph', 'Articulation Point', 'BFS'],
        examples: [{ input: '[[0,1,1,0],[0,1,1,0],[0,0,0,0]]', output: '2' }],
        testCases: [
          { input: '[[0,1,1,0],[0,1,1,0],[0,0,0,0]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,1],[1,1]]', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '[[1]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[1,1],[1,0]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1,0],[0,0]]', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int minimumDays(int[][] grid) {
        if (countIslands(grid) != 1) return 0;
        int m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    grid[i][j] = 0;
                    if (countIslands(grid) != 1) {
                        grid[i][j] = 1;
                        return 1;
                    }
                    grid[i][j] = 1;
                }
            }
        }
        return 2;
    }
    private static int countIslands(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        boolean[][] visited = new boolean[m][n];
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1 && !visited[i][j]) {
                    dfs(grid, i, j, visited);
                    count++;
                }
            }
        }
        return count;
    }
    private static void dfs(int[][] grid, int i, int j, boolean[][] visited) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 0 || visited[i][j]) return;
        visited[i][j] = true;
        dfs(grid, i - 1, j, visited);
        dfs(grid, i + 1, j, visited);
        dfs(grid, i, j - 1, visited);
        dfs(grid, i, j + 1, visited);
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

    console.log(`\n🎉 Days 82-84 complete! Created ${created}/15 questions\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays82to84();
