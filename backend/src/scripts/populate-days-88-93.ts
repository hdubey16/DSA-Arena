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
    id: 'day-88-rat-in-maze',
    title: 'Rat in Maze & Backtracking Grids',
    description: 'Rat maze paths, unique paths, word search, word search II, gold paths',
    week: 14,
    day: 88,
    difficulty: 'Hard',
    estimatedTime: 140,
    prerequisites: [],
    compulsoryQuestion: 'Rat in a Maze Problem',
    practiceQuestions: 5
  },
  {
    id: 'day-89-n-queens',
    title: 'N-Queens & Constraint Satisfaction',
    description: 'N-Queens, N-Queens II, Valid Sudoku, Combinations, Permutations II',
    week: 14,
    day: 89,
    difficulty: 'Hard',
    estimatedTime: 145,
    prerequisites: ['day-88-rat-in-maze'],
    compulsoryQuestion: 'N-Queens',
    practiceQuestions: 5
  },
  {
    id: 'day-90-sudoku-solver',
    title: 'Sudoku Solver & Hard Backtracking',
    description: 'Sudoku solver, phone letter combos, palindrome partition, restore IP, happy strings',
    week: 14,
    day: 90,
    difficulty: 'Hard',
    estimatedTime: 150,
    prerequisites: ['day-89-n-queens'],
    compulsoryQuestion: 'Sudoku Solver',
    practiceQuestions: 5
  },
  {
    id: 'day-91-backtracking-misc',
    title: 'Backtracking Miscellaneous',
    description: 'Matchsticks to square, partition K subsets, max score words, min time jobs, split string',
    week: 14,
    day: 91,
    difficulty: 'Hard',
    estimatedTime: 155,
    prerequisites: ['day-90-sudoku-solver'],
    compulsoryQuestion: 'Partition to K Equal Sum Subsets',
    practiceQuestions: 5
  },
  {
    id: 'day-92-dp-intro',
    title: 'DP Introduction & Fibonacci',
    description: 'Climbing stairs, fibonacci, min cost stairs, house robber, tribonacci',
    week: 14,
    day: 92,
    difficulty: 'Easy',
    estimatedTime: 120,
    prerequisites: [],
    compulsoryQuestion: 'Climbing Stairs',
    practiceQuestions: 5
  },
  {
    id: 'day-93-lcs-string-dp',
    title: 'Longest Common Subsequence & String DP',
    description: 'LCS, longest palindromic subsequence, uncrossed lines, min insertion palindrome, delete two strings',
    week: 14,
    day: 93,
    difficulty: 'Medium',
    estimatedTime: 140,
    prerequisites: ['day-92-dp-intro'],
    compulsoryQuestion: 'Longest Common Subsequence',
    practiceQuestions: 5
  }
];

async function populateDays88to93() {
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
      // Day 88: Rat in Maze
      createQuestion({
        topicId: 'day-88-rat-in-maze',
        title: 'Rat in a Maze Problem',
        description: 'Find all paths for rat from (0,0) to (n-1,n-1). Can only move U/D/L/R through 1s.',
        difficulty: 'Hard',
        tags: ['Backtracking', 'Matrix', 'DFS'],
        examples: [{ input: '4\n[[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]]', output: '[\"DDRDRR\",\"DRDDRR\"]' }],
        testCases: [
          { input: '4\n[[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]]', expectedOutput: '[\"DDRDRR\",\"DRDDRR\"]', isHidden: false, points: 20 },
          { input: '2\n[[1,1],[1,1]]', expectedOutput: '[\"DR\",\"RD\"]', isHidden: false, points: 20 },
          { input: '1\n[[1]]', expectedOutput: '[\"empty\"]', isHidden: true, points: 20 },
          { input: '2\n[[1,0],[1,1]]', expectedOutput: '[\"DR\"]', isHidden: true, points: 20 },
          { input: '3\n[[1,1,1],[0,1,0],[1,1,1]]', expectedOutput: '[\"DRDR\",\"RRDD\"]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static List<String> ratMaze(int[][] m) {
        List<String> result = new ArrayList<>();
        if (m[0][0] == 0) return result;
        boolean[][] visited = new boolean[m.length][m[0].length];
        backtrack(m, 0, 0, "", visited, result);
        return result;
    }
    private static void backtrack(int[][] m, int r, int c, String path, boolean[][] visited, List<String> result) {
        if (r == m.length - 1 && c == m[0].length - 1) {
            result.add(path);
            return;
        }
        visited[r][c] = true;
        int[][] dirs = {{1,0,'D'},{-1,0,'U'},{0,1,'R'},{0,-1,'L'}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < m.length && nc >= 0 && nc < m[0].length && m[nr][nc] == 1 && !visited[nr][nc]) {
                backtrack(m, nr, nc, path + (char)d[2], visited, result);
            }
        }
        visited[r][c] = false;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-88-rat-in-maze',
        title: 'Unique Paths III',
        description: 'Count paths from 1 to 2 walking over every non-obstacle square exactly once.',
        difficulty: 'Hard',
        tags: ['Backtracking', 'Matrix', 'DFS'],
        examples: [{ input: '[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]', output: '2' }],
        testCases: [
          { input: '[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,0,0],[0,0,0],[0,0,2]]', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[[0,1],[2,0]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[1,2]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1,0],[0,2]]', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    int count = 0;
    public static int uniquePathsIII(int[][] grid) {
        int startR = 0, startC = 0, empty = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) { startR = i; startC = j; }
                if (grid[i][j] != -1) empty++;
            }
        }
        Solution sol = new Solution();
        sol.dfs(grid, startR, startC, empty);
        return sol.count;
    }
    void dfs(int[][] grid, int r, int c, int empty) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == -1) return;
        if (grid[r][c] == 2) {
            if (empty == 1) count++;
            return;
        }
        grid[r][c] = -1;
        dfs(grid, r + 1, c, empty - 1);
        dfs(grid, r - 1, c, empty - 1);
        dfs(grid, r, c + 1, empty - 1);
        dfs(grid, r, c - 1, empty - 1);
        grid[r][c] = 0;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-88-rat-in-maze',
        title: 'Word Search',
        description: 'Search if word exists in grid constructed from sequentially adjacent cells.',
        difficulty: 'Medium',
        tags: ['Backtracking', 'Matrix', 'DFS'],
        examples: [{ input: '[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"ABCCED\"', output: 'true' }],
        testCases: [
          { input: '[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"ABCCED\"', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"SEE\"', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"ABCB\"', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[[\"A\"]]\n\"A\"', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[[\"A\",\"B\"]]\n\"BA\"', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (board[i][j] == word.charAt(0)) {
                    if (dfs(board, word, i, j, 0)) return true;
                }
            }
        }
        return false;
    }
    private static boolean dfs(char[][] board, String word, int r, int c, int idx) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(idx)) return false;
        board[r][c] = '#';
        boolean found = dfs(board, word, r + 1, c, idx + 1) || dfs(board, word, r - 1, c, idx + 1) ||
                       dfs(board, word, r, c + 1, idx + 1) || dfs(board, word, r, c - 1, idx + 1);
        board[r][c] = word.charAt(idx);
        return found;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-88-rat-in-maze',
        title: 'Path with Maximum Gold',
        description: 'Collect maximum gold from grid without revisiting cells.',
        difficulty: 'Medium',
        tags: ['Backtracking', 'Matrix', 'DFS'],
        examples: [{ input: '[[0,6,0],[5,8,7],[0,9,0]]', output: '24' }],
        testCases: [
          { input: '[[0,6,0],[5,8,7],[0,9,0]]', expectedOutput: '24', isHidden: false, points: 20 },
          { input: '[[1,0,7],[2,0,11]]', expectedOutput: '13', isHidden: false, points: 20 },
          { input: '[[0,0],[0,0]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[5]]', expectedOutput: '5', isHidden: true, points: 20 },
          { input: '[[0,1],[1,2]]', expectedOutput: '3', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int getMaximumGold(int[][] grid) {
        int maxGold = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                maxGold = Math.max(maxGold, dfs(grid, i, j));
            }
        }
        return maxGold;
    }
    private static int dfs(int[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == 0) return 0;
        int gold = grid[r][c];
        grid[r][c] = 0;
        int maxGold = gold + Math.max(Math.max(dfs(grid, r + 1, c), dfs(grid, r - 1, c)), 
                                      Math.max(dfs(grid, r, c + 1), dfs(grid, r, c - 1)));
        grid[r][c] = gold;
        return maxGold;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-88-rat-in-maze',
        title: 'Word Search II',
        description: 'Find all words on board. Use Trie + Backtracking.',
        difficulty: 'Hard',
        tags: ['Backtracking', 'Trie', 'Matrix'],
        examples: [{ input: '[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"t\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\n[\"oath\",\"pea\",\"eat\",\"rain\"]', output: '[\"eat\",\"oath\"]' }],
        testCases: [
          { input: '[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"t\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\n[\"oath\",\"pea\",\"eat\",\"rain\"]', expectedOutput: '[\"eat\",\"oath\"]', isHidden: false, points: 20 },
          { input: '[[\"a\",\"a\"]]\n[\"aaa\"]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[[\"a\",\"b\"]]\n[\"ab\",\"ba\"]', expectedOutput: '[\"ab\",\"ba\"]', isHidden: true, points: 20 },
          { input: '[[\"a\"]]\n[\"a\"]', expectedOutput: '[\"a\"]', isHidden: true, points: 20 },
          { input: '[[\"a\",\"b\"],[\"c\",\"d\"]]\n[\"ab\",\"cd\"]', expectedOutput: '[\"ab\",\"cd\"]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    String word = null;
}
public class Solution {
    public static List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String word : words) {
            TrieNode node = root;
            for (char c : word.toCharArray()) {
                node.children.putIfAbsent(c, new TrieNode());
                node = node.children.get(c);
            }
            node.word = word;
        }
        List<String> result = new ArrayList<>();
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                dfs(board, i, j, root, result);
            }
        }
        return result;
    }
    private static void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] == '#') return;
        char ch = board[r][c];
        if (!node.children.containsKey(ch)) return;
        node = node.children.get(ch);
        if (node.word != null) {
            result.add(node.word);
            node.word = null;
        }
        board[r][c] = '#';
        dfs(board, r + 1, c, node, result);
        dfs(board, r - 1, c, node, result);
        dfs(board, r, c + 1, node, result);
        dfs(board, r, c - 1, node, result);
        board[r][c] = ch;
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 89: N-Queens
      createQuestion({
        topicId: 'day-89-n-queens',
        title: 'N-Queens',
        description: 'Return all distinct solutions to n-queens puzzle on n x n board.',
        difficulty: 'Hard',
        tags: ['Backtracking', 'Constraint Satisfaction'],
        examples: [{ input: '4', output: '[[\"Q\",\".\",\".\",\".\"],[\".\",\".\",\".\",\"Q\"],[\".\",\"Q\",\".\",\".\"],[\".\",\".\",\"Q\",\".\"]]' }],
        testCases: [
          { input: '1', expectedOutput: '[[\"Q\"]]', isHidden: false, points: 20 },
          { input: '4', expectedOutput: '2 solutions', isHidden: false, points: 20 },
          { input: '5', expectedOutput: '10 solutions', isHidden: true, points: 20 },
          { input: '2', expectedOutput: '0 solutions', isHidden: true, points: 20 },
          { input: '8', expectedOutput: '92 solutions', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) board[i][j] = '.';
        backtrack(board, 0, result, n);
        return result;
    }
    private static void backtrack(char[][] board, int row, List<List<String>> result, int n) {
        if (row == n) {
            result.add(construct(board));
            return;
        }
        for (int col = 0; col < n; col++) {
            if (isValid(board, row, col, n)) {
                board[row][col] = 'Q';
                backtrack(board, row + 1, result, n);
                board[row][col] = '.';
            }
        }
    }
    private static boolean isValid(char[][] board, int row, int col, int n) {
        for (int i = 0; i < row; i++) if (board[i][col] == 'Q') return false;
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] == 'Q') return false;
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) if (board[i][j] == 'Q') return false;
        return true;
    }
    private static List<String> construct(char[][] board) {
        List<String> solution = new ArrayList<>();
        for (int i = 0; i < board.length; i++) solution.add(new String(board[i]));
        return solution;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-89-n-queens',
        title: 'N-Queens II',
        description: 'Return the number of distinct solutions to n-queens puzzle.',
        difficulty: 'Hard',
        tags: ['Backtracking'],
        examples: [{ input: '4', output: '2' }],
        testCases: [
          { input: '1', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '4', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '5', expectedOutput: '10', isHidden: true, points: 20 },
          { input: '8', expectedOutput: '92', isHidden: true, points: 20 },
          { input: '9', expectedOutput: '352', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int totalNQueens(int n) {
        return backtrack(0, new HashSet<>(), new HashSet<>(), new HashSet<>(), n);
    }
    private static int backtrack(int row, Set<Integer> cols, Set<Integer> diag1, Set<Integer> diag2, int n) {
        if (row == n) return 1;
        int count = 0;
        for (int col = 0; col < n; col++) {
            if (cols.contains(col) || diag1.contains(row - col) || diag2.contains(row + col)) continue;
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            count += backtrack(row + 1, cols, diag1, diag2, n);
            cols.remove(col);
            diag1.remove(row - col);
            diag2.remove(row + col);
        }
        return count;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-89-n-queens',
        title: 'Valid Sudoku',
        description: 'Validate if 9x9 Sudoku board is valid without solving it.',
        difficulty: 'Easy',
        tags: ['Validation', 'HashSet'],
        examples: [{ input: '[[5,3,.,.,7,.,.,.],...]', output: 'true' }],
        testCases: [
          { input: '[[5,3,.,.,7,.,.,.],...]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[[8,3,.,.,7,.,.,.],...]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[[.,.,.,.,.,.,.,.,.]...x9]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[[1,.,.,.,.,.,.,.,2]...]', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[[.,1,.,.,.,.,.,.,.]...]', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') continue;
                String ch = String.valueOf(board[i][j]);
                if (!seen.add(ch + " in row " + i) || !seen.add(ch + " in col " + j) || 
                    !seen.add(ch + " in box " + (i/3) + (j/3))) return false;
            }
        }
        return true;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-89-n-queens',
        title: 'Combinations',
        description: 'Return all possible combinations of k numbers from range [1, n].',
        difficulty: 'Medium',
        tags: ['Backtracking', 'Combinations'],
        examples: [{ input: '4\n2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]' }],
        testCases: [
          { input: '4\n2', expectedOutput: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', isHidden: false, points: 20 },
          { input: '1\n1', expectedOutput: '[[1]]', isHidden: false, points: 20 },
          { input: '5\n1', expectedOutput: '[[1],[2],[3],[4],[5]]', isHidden: true, points: 20 },
          { input: '3\n3', expectedOutput: '[[1,2,3]]', isHidden: true, points: 20 },
          { input: '5\n3', expectedOutput: '10 combinations', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(1, n, k, new ArrayList<>(), result);
        return result;
    }
    private static void backtrack(int start, int n, int k, List<Integer> curr, List<List<Integer>> result) {
        if (curr.size() == k) {
            result.add(new ArrayList<>(curr));
            return;
        }
        for (int i = start; i <= n; i++) {
            curr.add(i);
            backtrack(i + 1, n, k, curr, result);
            curr.remove(curr.size() - 1);
        }
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-89-n-queens',
        title: 'Permutations II',
        description: 'Return all unique permutations of a collection that might contain duplicates.',
        difficulty: 'Medium',
        tags: ['Backtracking', 'Permutations'],
        examples: [{ input: '[1,1,2]', output: '[[1,1,2],[1,2,1],[2,1,1]]' }],
        testCases: [
          { input: '[1,1,2]', expectedOutput: '[[1,1,2],[1,2,1],[2,1,1]]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[[1]]', isHidden: false, points: 20 },
          { input: '[0,0,0]', expectedOutput: '[[0,0,0]]', isHidden: true, points: 20 },
          { input: '[1,2,3]', expectedOutput: '6 permutations', isHidden: true, points: 20 },
          { input: '[1,1,2,2]', expectedOutput: '6 permutations', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        boolean[] used = new boolean[nums.length];
        backtrack(nums, new ArrayList<>(), result, used);
        return result;
    }
    private static void backtrack(int[] nums, List<Integer> curr, List<List<Integer>> result, boolean[] used) {
        if (curr.size() == nums.length) {
            result.add(new ArrayList<>(curr));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
            used[i] = true;
            curr.add(nums[i]);
            backtrack(nums, curr, result, used);
            curr.remove(curr.size() - 1);
            used[i] = false;
        }
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 90: Sudoku Solver
      createQuestion({
        topicId: 'day-90-sudoku-solver',
        title: 'Sudoku Solver',
        description: 'Solve a 9x9 Sudoku puzzle by filling empty cells.',
        difficulty: 'Hard',
        tags: ['Backtracking', 'Constraint Satisfaction'],
        examples: [{ input: '[[5,3,.,.,7,.,.,.],...]', output: 'Solved board' }],
        testCases: [
          { input: '[[5,3,.,.,7,.,.,.],...]', expectedOutput: 'Solved', isHidden: false, points: 20 },
          { input: '[[.,.,.,.,.,.,.,.,.]...x81]', expectedOutput: 'Solved', isHidden: false, points: 20 },
          { input: '[[1-9 full row]...]', expectedOutput: 'Solved', isHidden: true, points: 20 },
          { input: '[[5,3,4,6,7,8,9,1,2]...]', expectedOutput: 'Solved', isHidden: true, points: 20 },
          { input: '[[4,.,.,.,.,.,8,.,5]...]', expectedOutput: 'Solved', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static void solveSudoku(char[][] board) {
        backtrack(board);
    }
    private static boolean backtrack(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') continue;
                for (char c = '1'; c <= '9'; c++) {
                    if (isValid(board, i, j, c)) {
                        board[i][j] = c;
                        if (backtrack(board)) return true;
                        board[i][j] = '.';
                    }
                }
                return false;
            }
        }
        return true;
    }
    private static boolean isValid(char[][] board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == c) return false;
            if (board[row][i] == c) return false;
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-90-sudoku-solver',
        title: 'Letter Combinations of a Phone Number',
        description: 'Given string of digits, return all possible letter combinations they could represent.',
        difficulty: 'Medium',
        tags: ['Backtracking', 'String'],
        examples: [{ input: '\"23\"', output: '[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]' }],
        testCases: [
          { input: '\"23\"', expectedOutput: '[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]', isHidden: false, points: 20 },
          { input: '\"\"', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '\"2\"', expectedOutput: '[\"a\",\"b\",\"c\"]', isHidden: true, points: 20 },
          { input: '\"234\"', expectedOutput: '27 combinations', isHidden: true, points: 20 },
          { input: '\"2357\"', expectedOutput: '81 combinations', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    static String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    public static List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits.isEmpty()) return result;
        backtrack(digits, 0, new StringBuilder(), result);
        return result;
    }
    private static void backtrack(String digits, int idx, StringBuilder curr, List<String> result) {
        if (idx == digits.length()) {
            result.add(curr.toString());
            return;
        }
        String letters = map[digits.charAt(idx) - '0'];
        for (char c : letters.toCharArray()) {
            backtrack(digits, idx + 1, curr.append(c), result);
            curr.deleteCharAt(curr.length() - 1);
        }
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-90-sudoku-solver',
        title: 'Palindrome Partitioning',
        description: 'Partition string so every substring is a palindrome. Return all partitions.',
        difficulty: 'Medium',
        tags: ['Backtracking', 'String', 'DP'],
        examples: [{ input: '\"aab\"', output: '[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]' }],
        testCases: [
          { input: '\"aab\"', expectedOutput: '[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]', isHidden: false, points: 20 },
          { input: '\"a\"', expectedOutput: '[[\"a\"]]', isHidden: false, points: 20 },
          { input: '\"abc\"', expectedOutput: '[[\"a\",\"b\",\"c\"]]', isHidden: true, points: 20 },
          { input: '\"aba\"', expectedOutput: '[[\"a\",\"b\",\"a\"],[\"aba\"]]', isHidden: true, points: 20 },
          { input: '\"abba\"', expectedOutput: '4 partitions', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), result);
        return result;
    }
    private static void backtrack(String s, int start, List<String> curr, List<List<String>> result) {
        if (start == s.length()) {
            result.add(new ArrayList<>(curr));
            return;
        }
        for (int end = start + 1; end <= s.length(); end++) {
            if (isPalindrome(s, start, end - 1)) {
                curr.add(s.substring(start, end));
                backtrack(s, end, curr, result);
                curr.remove(curr.size() - 1);
            }
        }
    }
    private static boolean isPalindrome(String s, int l, int r) {
        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
        return true;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-90-sudoku-solver',
        title: 'Restore IP Addresses',
        description: 'Insert dots to form valid IP addresses from digits string.',
        difficulty: 'Medium',
        tags: ['Backtracking', 'String'],
        examples: [{ input: '\"25525511135\"', output: '[\"255.255.11.135\",\"255.255.111.35\"]' }],
        testCases: [
          { input: '\"25525511135\"', expectedOutput: '[\"255.255.11.135\",\"255.255.111.35\"]', isHidden: false, points: 20 },
          { input: '\"0000\"', expectedOutput: '[\"0.0.0.0\"]', isHidden: false, points: 20 },
          { input: '\"1111\"', expectedOutput: '[\"1.1.1.1\"]', isHidden: true, points: 20 },
          { input: '\"101023\"', expectedOutput: '[\"1.0.10.23\",\"1.0.102.3\",\"10.1.0.23\",\"10.10.2.3\",\"101.0.2.3\"]', isHidden: true, points: 20 },
          { input: '\"010010\"', expectedOutput: '[\"0.10.0.10\",\"0.100.1.0\"]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static List<String> restoreIpAddresses(String s) {
        List<String> result = new ArrayList<>();
        if (s.length() < 4 || s.length() > 12) return result;
        backtrack(s, 0, 0, new StringBuilder(), result);
        return result;
    }
    private static void backtrack(String s, int idx, int parts, StringBuilder curr, List<String> result) {
        if (parts == 4) {
            if (idx == s.length()) result.add(curr.toString());
            return;
        }
        if (idx >= s.length()) return;
        for (int i = idx + 1; i <= Math.min(idx + 3, s.length()); i++) {
            String part = s.substring(idx, i);
            if ((part.startsWith("0") && part.length() > 1) || Integer.parseInt(part) > 255) continue;
            if (parts > 0) curr.append(".");
            backtrack(s, i, parts + 1, curr.append(part), result);
            curr.delete(curr.length() - part.length() - (parts > 0 ? 1 : 0), curr.length());
        }
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 91: Backtracking Misc
      createQuestion({
        topicId: 'day-91-backtracking-misc',
        title: 'Partition to K Equal Sum Subsets',
        description: 'Partition array into k subsets with equal sum.',
        difficulty: 'Medium',
        tags: ['Backtracking', 'Array', 'DP'],
        examples: [{ input: '[4,3,2,3,5,2,1]\n4', output: 'true' }],
        testCases: [
          { input: '[4,3,2,3,5,2,1]\n4', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,2,5]\n2', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[15,10,5]\n3', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1]\n1', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1,1,1,1]\n4', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % k != 0) return false;
        int target = sum / k;
        Arrays.sort(nums);
        if (nums[nums.length - 1] > target) return false;
        int[] buckets = new int[k];
        return backtrack(nums, buckets, nums.length - 1, target);
    }
    private static boolean backtrack(int[] nums, int[] buckets, int idx, int target) {
        if (idx < 0) {
            for (int b : buckets) if (b != target) return false;
            return true;
        }
        for (int i = 0; i < buckets.length; i++) {
            if (buckets[i] + nums[idx] <= target) {
                buckets[i] += nums[idx];
                if (backtrack(nums, buckets, idx - 1, target)) return true;
                buckets[i] -= nums[idx];
            }
        }
        return false;
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 92: DP Intro
      createQuestion({
        topicId: 'day-92-dp-intro',
        title: 'Climbing Stairs',
        description: 'Climb n steps. Each time can climb 1 or 2 steps. Return number of distinct ways.',
        difficulty: 'Easy',
        tags: ['DP', 'Fibonacci'],
        examples: [{ input: '2', output: '2' }, { input: '3', output: '3' }],
        testCases: [
          { input: '2', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '3', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '4', expectedOutput: '5', isHidden: true, points: 20 },
          { input: '5', expectedOutput: '8', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-92-dp-intro',
        title: 'Fibonacci Number',
        description: 'Return the nth Fibonacci number using tabulation O(n) and space O(1).',
        difficulty: 'Easy',
        tags: ['DP', 'Fibonacci'],
        examples: [{ input: '2', output: '1' }, { input: '3', output: '2' }, { input: '4', output: '3' }],
        testCases: [
          { input: '0', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '2', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '4', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '5', expectedOutput: '5', isHidden: true, points: 20 },
          { input: '10', expectedOutput: '55', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int fib(int n) {
        if (n <= 1) return n;
        int prev = 0, curr = 1;
        for (int i = 2; i <= n; i++) {
            int next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-92-dp-intro',
        title: 'Min Cost Climbing Stairs',
        description: 'Start from step 0 or 1. Return minimum cost to reach top.',
        difficulty: 'Easy',
        tags: ['DP', 'Array'],
        examples: [{ input: '[10,15,20]', output: '15' }],
        testCases: [
          { input: '[10,15,20]', expectedOutput: '15', isHidden: false, points: 20 },
          { input: '[1,100,1,1,1,100,1,1,100,1]', expectedOutput: '6', isHidden: false, points: 20 },
          { input: '[5,10]', expectedOutput: '5', isHidden: true, points: 20 },
          { input: '[1,1,1]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[10,10,10]', expectedOutput: '10', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int minimumCost(int[] cost) {
        if (cost.length <= 2) return Math.min(cost[0], cost.length == 2 ? Math.min(cost[0], cost[1]) : cost[0]);
        int[] dp = new int[cost.length + 1];
        dp[0] = cost[0];
        dp[1] = Math.min(cost[0], cost[1]);
        for (int i = 2; i < cost.length; i++) {
            dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
        }
        return dp[cost.length - 1];
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-92-dp-intro',
        title: 'House Robber',
        description: 'Rob houses with max money. Cannot rob adjacent houses.',
        difficulty: 'Medium',
        tags: ['DP', 'Array'],
        examples: [{ input: '[1,2,3,1]', output: '4' }],
        testCases: [
          { input: '[1,2,3,1]', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[2,7,9,3]', expectedOutput: '9', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[2,1]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[5,3,4,11,2]', expectedOutput: '16', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int rob(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
        }
        return dp[nums.length - 1];
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-92-dp-intro',
        title: 'N-th Tribonacci Number',
        description: 'T0 = 0, T1 = 1, T2 = 1. Tn+3 = Tn + Tn+1 + Tn+2.',
        difficulty: 'Easy',
        tags: ['DP', 'Fibonacci'],
        examples: [{ input: '4', output: '4' }],
        testCases: [
          { input: '0', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '4', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '5', expectedOutput: '7', isHidden: true, points: 20 },
          { input: '10', expectedOutput: '274', isHidden: true, points: 20 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        int a = 0, b = 1, c = 1;
        for (int i = 3; i <= n; i++) {
            int next = a + b + c;
            a = b;
            b = c;
            c = next;
        }
        return c;
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 93: LCS & String DP
      createQuestion({
        topicId: 'day-93-lcs-string-dp',
        title: 'Longest Common Subsequence',
        description: 'Return length of longest common subsequence of two strings.',
        difficulty: 'Medium',
        tags: ['DP', 'String', 'LCS'],
        examples: [{ input: '\"abcde\"\n\"ace\"', output: '3' }],
        testCases: [
          { input: '\"abcde\"\n\"ace\"', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '\"abc\"\n\"abc\"', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '\"abc\"\n\"def\"', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '\"a\"\n\"b\"', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '\"abcdef\"\n\"fedcba\"', expectedOutput: '1', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
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

    console.log(`\n🎉 Days 88-93 complete! Created ${created}/30 questions\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays88to93();
