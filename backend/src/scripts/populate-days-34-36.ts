import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays34to36() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 34 - Matrix Multiplication ====================
    const day34Topic = await Topic.findOneAndUpdate(
      { id: 'day-34' },
      {
        id: 'day-34',
        title: 'Matrix Multiplication',
        description: 'Standard and optimized matrix multiplication.',
        week: 5,
        day: 34,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-33'],
        compulsoryQuestion: 'Matrix Multiplication (Basic)',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day34Topic.title}`);
    await Question.deleteMany({ topicId: 'day-34' });

    await Question.insertMany([
      {
        topicId: 'day-34',
        title: 'Matrix Multiplication (Basic)',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Given mat1 (m×k) and mat2 (k×n), return their product mat1 × mat2.',
        starterCode: 'public class Solution {\n    public static int[][] multiply(int[][] mat1, int[][] mat2) { return new int[0][0]; }\n}',
        solution: 'public class Solution {\n    public static int[][] multiply(int[][] mat1, int[][] mat2) {\n        int m = mat1.length, k = mat1[0].length, n = mat2[0].length;\n        int[][] result = new int[m][n];\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                for (int p = 0; p < k; p++) {\n                    result[i][j] += mat1[i][p] * mat2[p][j];\n                }\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]', output: '[[7,0,0],[-7,0,3]]' }],
        testCases: [
          { input: '[[1,0,0],[-1,0,3]]\n[[7,0,0],[0,0,0],[0,0,1]]', expectedOutput: '[[7,0,0],[-7,0,3]]', isHidden: false, points: 10 }
        ],
        hints: ['result[i][j] = sum of mat1[i][p] * mat2[p][j]', 'Three nested loops: i, j, p'],
        tags: ['Array', 'Matrix', 'Math']
      },
      {
        topicId: 'day-34',
        title: 'Sparse Matrix Multiplication',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Multiply sparse matrices efficiently by skipping zero elements.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[][] multiply(int[][] mat1, int[][] mat2) { return new int[0][0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[][] multiply(int[][] mat1, int[][] mat2) {\n        int m = mat1.length, k = mat1[0].length, n = mat2[0].length;\n        int[][] result = new int[m][n];\n        for (int i = 0; i < m; i++) {\n            for (int p = 0; p < k; p++) {\n                if (mat1[i][p] != 0) {\n                    for (int j = 0; j < n; j++) {\n                        if (mat2[p][j] != 0) {\n                            result[i][j] += mat1[i][p] * mat2[p][j];\n                        }\n                    }\n                }\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]', output: '[[7,0,0],[-7,0,3]]' }],
        testCases: [
          { input: '[[1,0,0],[-1,0,3]]\n[[7,0,0],[0,0,0],[0,0,1]]', expectedOutput: '[[7,0,0],[-7,0,3]]', isHidden: false, points: 12 }
        ],
        hints: ['Skip zeros in mat1', 'Only compute when both elements non-zero'],
        tags: ['Array', 'Matrix', 'Hash Table']
      },
      {
        topicId: 'day-34',
        title: 'Multiply Strings',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Multiply two non-negative integers as strings without using BigInteger or direct conversion.',
        starterCode: 'public class Solution {\n    public static String multiply(String num1, String num2) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String multiply(String num1, String num2) {\n        if (num1.equals("0") || num2.equals("0")) return "0";\n        int m = num1.length(), n = num2.length();\n        int[] result = new int[m + n];\n        for (int i = m - 1; i >= 0; i--) {\n            for (int j = n - 1; j >= 0; j--) {\n                int mul = (num1.charAt(i) - \'0\') * (num2.charAt(j) - \'0\');\n                int p1 = i + j, p2 = i + j + 1;\n                int sum = mul + result[p2];\n                result[p2] = sum % 10;\n                result[p1] += sum / 10;\n            }\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int digit : result) {\n            if (!(sb.length() == 0 && digit == 0)) {\n                sb.append(digit);\n            }\n        }\n        return sb.length() == 0 ? "0" : sb.toString();\n    }\n}',
        examples: [{ input: 'num1 = "123", num2 = "456"', output: '"56088"' }],
        testCases: [
          { input: '123\n456', expectedOutput: '56088', isHidden: false, points: 15 }
        ],
        hints: ['Use array to store digits', 'Position of product: i+j and i+j+1'],
        tags: ['String', 'Math']
      },
      {
        topicId: 'day-34',
        title: 'Pow(x, n)',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 25,
        description: 'Implement power function using binary exponentiation. Crucial for matrix exponentiation.',
        starterCode: 'public class Solution {\n    public static double myPow(double x, int n) { return 0.0; }\n}',
        solution: 'public class Solution {\n    public static double myPow(double x, int n) {\n        if (n == 0) return 1.0;\n        long N = n;\n        if (N < 0) {\n            x = 1 / x;\n            N = -N;\n        }\n        return fastPow(x, N);\n    }\n    private static double fastPow(double x, long n) {\n        if (n == 0) return 1.0;\n        double half = fastPow(x, n / 2);\n        if (n % 2 == 0) {\n            return half * half;\n        } else {\n            return half * half * x;\n        }\n    }\n}',
        examples: [{ input: 'x = 2.00000, n = 10', output: '1024.00000' }],
        testCases: [
          { input: '2.0\n10', expectedOutput: '1024.0', isHidden: false, points: 12 }
        ],
        hints: ['Binary exponentiation: x^n = (x^(n/2))^2', 'Handle negative exponent'],
        tags: ['Math', 'Recursion']
      },
      {
        topicId: 'day-34',
        title: 'Fibonacci Number (Matrix Exponentiation)',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Calculate F(n) in O(log n) time using matrix exponentiation. [[1,1],[1,0]]^(n-1) gives nth Fibonacci.',
        starterCode: 'public class Solution {\n    public static int fib(int n) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int fib(int n) {\n        if (n <= 1) return n;\n        int[][] matrix = {{1, 1}, {1, 0}};\n        int[][] result = matrixPower(matrix, n - 1);\n        return result[0][0];\n    }\n    private static int[][] matrixPower(int[][] mat, int n) {\n        int[][] result = {{1, 0}, {0, 1}};\n        while (n > 0) {\n            if (n % 2 == 1) {\n                result = matrixMultiply(result, mat);\n            }\n            mat = matrixMultiply(mat, mat);\n            n /= 2;\n        }\n        return result;\n    }\n    private static int[][] matrixMultiply(int[][] a, int[][] b) {\n        int[][] c = new int[2][2];\n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                for (int k = 0; k < 2; k++) {\n                    c[i][j] += a[i][k] * b[k][j];\n                }\n            }\n        }\n        return c;\n    }\n}',
        examples: [{ input: 'n = 10', output: '55' }],
        testCases: [
          { input: '10', expectedOutput: '55', isHidden: false, points: 18 }
        ],
        hints: ['Use matrix [[1,1],[1,0]]', 'Apply binary exponentiation to matrix'],
        tags: ['Math', 'Matrix', 'Recursion']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 35 - Matrix Practice (BFS/DFS) ====================
    const day35Topic = await Topic.findOneAndUpdate(
      { id: 'day-35' },
      {
        id: 'day-35',
        title: 'Matrix Practice Problems',
        description: 'BFS/DFS on grids and in-place modifications.',
        week: 5,
        day: 35,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-34'],
        compulsoryQuestion: 'Number of Islands',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day35Topic.title}`);
    await Question.deleteMany({ topicId: 'day-35' });

    await Question.insertMany([
      {
        topicId: 'day-35',
        title: 'Number of Islands',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Count islands in binary grid. Island is adjacent lands (1s) surrounded by water (0s).',
        starterCode: 'public class Solution {\n    public static int numIslands(char[][] grid) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int numIslands(char[][] grid) {\n        int count = 0;\n        for (int i = 0; i < grid.length; i++) {\n            for (int j = 0; j < grid[0].length; j++) {\n                if (grid[i][j] == \'1\') {\n                    count++;\n                    dfs(grid, i, j);\n                }\n            }\n        }\n        return count;\n    }\n    private static void dfs(char[][] grid, int i, int j) {\n        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != \'1\') {\n            return;\n        }\n        grid[i][j] = \'0\';\n        dfs(grid, i + 1, j);\n        dfs(grid, i - 1, j);\n        dfs(grid, i, j + 1);\n        dfs(grid, i, j - 1);\n    }\n}',
        examples: [{ input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }],
        testCases: [
          { input: '[[1,1,0],[1,1,0],[0,0,1]]', expectedOutput: '2', isHidden: false, points: 12 }
        ],
        hints: ['DFS from each unvisited land cell', 'Mark visited cells as water'],
        tags: ['Array', 'DFS', 'BFS', 'Matrix']
      },
      {
        topicId: 'day-35',
        title: 'Surrounded Regions',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Capture regions surrounded by X. Flip all surrounded Os to Xs.',
        starterCode: 'public class Solution {\n    public static void solve(char[][] board) {}\n}',
        solution: 'public class Solution {\n    public static void solve(char[][] board) {\n        int m = board.length, n = board[0].length;\n        for (int i = 0; i < m; i++) {\n            if (board[i][0] == \'O\') dfs(board, i, 0);\n            if (board[i][n - 1] == \'O\') dfs(board, i, n - 1);\n        }\n        for (int j = 0; j < n; j++) {\n            if (board[0][j] == \'O\') dfs(board, 0, j);\n            if (board[m - 1][j] == \'O\') dfs(board, m - 1, j);\n        }\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (board[i][j] == \'O\') board[i][j] = \'X\';\n                else if (board[i][j] == \'#\') board[i][j] = \'O\';\n            }\n        }\n    }\n    private static void dfs(char[][] board, int i, int j) {\n        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != \'O\') return;\n        board[i][j] = \'#\';\n        dfs(board, i + 1, j);\n        dfs(board, i - 1, j);\n        dfs(board, i, j + 1);\n        dfs(board, i, j - 1);\n    }\n}',
        examples: [{ input: 'board = [["X","X","X"],["X","O","X"],["X","X","X"]]', output: '[["X","X","X"],["X","X","X"],["X","X","X"]]' }],
        testCases: [
          { input: '[[X,X,X],[X,O,X],[X,X,X]]', expectedOutput: '[[X,X,X],[X,X,X],[X,X,X]]', isHidden: false, points: 12 }
        ],
        hints: ['Mark border-connected Os as safe', 'Flip remaining Os to Xs'],
        tags: ['Array', 'DFS', 'BFS', 'Matrix']
      },
      {
        topicId: 'day-35',
        title: 'Walls and Gates',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Fill empty rooms with distance to nearest gate using multi-source BFS.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static void wallsAndGates(int[][] rooms) {}\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static void wallsAndGates(int[][] rooms) {\n        Queue<int[]> queue = new LinkedList<>();\n        for (int i = 0; i < rooms.length; i++) {\n            for (int j = 0; j < rooms[0].length; j++) {\n                if (rooms[i][j] == 0) {\n                    queue.offer(new int[]{i, j});\n                }\n            }\n        }\n        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n        while (!queue.isEmpty()) {\n            int[] curr = queue.poll();\n            int row = curr[0], col = curr[1];\n            for (int[] dir : dirs) {\n                int r = row + dir[0], c = col + dir[1];\n                if (r >= 0 && r < rooms.length && c >= 0 && c < rooms[0].length && rooms[r][c] == Integer.MAX_VALUE) {\n                    rooms[r][c] = rooms[row][col] + 1;\n                    queue.offer(new int[]{r, c});\n                }\n            }\n        }\n    }\n}',
        examples: [{ input: 'rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]', output: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]' }],
        testCases: [
          { input: '[[2147483647,-1,0,2147483647]]', expectedOutput: '[[3,-1,0,1]]', isHidden: false, points: 12 }
        ],
        hints: ['Multi-source BFS from all gates', 'Update distance as level increases'],
        tags: ['Array', 'BFS', 'Matrix']
      },
      {
        topicId: 'day-35',
        title: 'Rotten Oranges',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find minimum minutes for all fresh oranges to rot. Return -1 if impossible.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int orangesRotting(int[][] grid) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int orangesRotting(int[][] grid) {\n        Queue<int[]> queue = new LinkedList<>();\n        int fresh = 0;\n        for (int i = 0; i < grid.length; i++) {\n            for (int j = 0; j < grid[0].length; j++) {\n                if (grid[i][j] == 2) queue.offer(new int[]{i, j});\n                else if (grid[i][j] == 1) fresh++;\n            }\n        }\n        if (fresh == 0) return 0;\n        int minutes = 0;\n        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            for (int i = 0; i < size; i++) {\n                int[] curr = queue.poll();\n                for (int[] dir : dirs) {\n                    int r = curr[0] + dir[0], c = curr[1] + dir[1];\n                    if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length && grid[r][c] == 1) {\n                        grid[r][c] = 2;\n                        fresh--;\n                        queue.offer(new int[]{r, c});\n                    }\n                }\n            }\n            minutes++;\n        }\n        return fresh == 0 ? minutes - 1 : -1;\n    }\n}',
        examples: [{ input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' }],
        testCases: [
          { input: '[[2,1,1],[1,1,0],[0,1,1]]', expectedOutput: '4', isHidden: false, points: 12 }
        ],
        hints: ['BFS from all rotten oranges', 'Track fresh count and minutes'],
        tags: ['Array', 'BFS', 'Matrix']
      },
      {
        topicId: 'day-35',
        title: 'Game of Life',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Simulate one step of Conway\'s Game of Life in-place (O(1) space).',
        starterCode: 'public class Solution {\n    public static void gameOfLife(int[][] board) {}\n}',
        solution: 'public class Solution {\n    public static void gameOfLife(int[][] board) {\n        int m = board.length, n = board[0].length;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                int live = 0;\n                for (int x = Math.max(0, i - 1); x <= Math.min(m - 1, i + 1); x++) {\n                    for (int y = Math.max(0, j - 1); y <= Math.min(n - 1, j + 1); y++) {\n                        if (x == i && y == j) continue;\n                        if (board[x][y] == 1 || board[x][y] == 2) live++;\n                    }\n                }\n                if (board[i][j] == 1 && (live < 2 || live > 3)) board[i][j] = 2;\n                if (board[i][j] == 0 && live == 3) board[i][j] = 3;\n            }\n        }\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                board[i][j] %= 2;\n            }\n        }\n    }\n}',
        examples: [{ input: 'board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]', output: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]' }],
        testCases: [
          { input: '[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]', expectedOutput: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]', isHidden: false, points: 15 }
        ],
        hints: ['Use state encoding: 2=die, 3=revive', 'Count live neighbors using encoded states'],
        tags: ['Array', 'Matrix', 'Simulation']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 36 - Hashing Basics ====================
    const day36Topic = await Topic.findOneAndUpdate(
      { id: 'day-36' },
      {
        id: 'day-36',
        title: 'Hashing Basics & Hash Functions',
        description: 'HashMap usage and frequency counting.',
        week: 6,
        day: 36,
        difficulty: 'Easy',
        estimatedTime: 90,
        prerequisites: ['day-35'],
        compulsoryQuestion: 'Contains Duplicate',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day36Topic.title}`);
    await Question.deleteMany({ topicId: 'day-36' });

    await Question.insertMany([
      {
        topicId: 'day-36',
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 10,
        timeLimit: 15,
        description: 'Return true if any value appears at least twice in array.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean containsDuplicate(int[] nums) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int num : nums) {\n            if (!set.add(num)) return true;\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'nums = [1,2,3,1]', output: 'true' }],
        testCases: [
          { input: '[1,2,3,1]', expectedOutput: 'true', isHidden: false, points: 5 }
        ],
        hints: ['Use HashSet', 'add() returns false if already exists'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-36',
        title: 'Two Sum',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Return indices of two numbers that add up to target.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) { return new int[2]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[2];\n    }\n}',
        examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
        testCases: [
          { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isHidden: false, points: 8 }
        ],
        hints: ['Store value→index in HashMap', 'Check if complement exists'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-36',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 10,
        timeLimit: 15,
        description: 'Return true if t is an anagram of s.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean isAnagram(String s, String t) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        Map<Character, Integer> map = new HashMap<>();\n        for (char c : s.toCharArray()) {\n            map.put(c, map.getOrDefault(c, 0) + 1);\n        }\n        for (char c : t.toCharArray()) {\n            if (!map.containsKey(c)) return false;\n            map.put(c, map.get(c) - 1);\n            if (map.get(c) < 0) return false;\n        }\n        return true;\n    }\n}',
        examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
        testCases: [
          { input: 'anagram\nnagaram', expectedOutput: 'true', isHidden: false, points: 5 }
        ],
        hints: ['Count character frequencies', 'Both should have same counts'],
        tags: ['Hash Table', 'String', 'Sorting']
      },
      {
        topicId: 'day-36',
        title: 'Ransom Note',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 10,
        timeLimit: 15,
        description: 'Return true if ransomNote can be constructed from magazine letters.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean canConstruct(String ransomNote, String magazine) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean canConstruct(String ransomNote, String magazine) {\n        Map<Character, Integer> map = new HashMap<>();\n        for (char c : magazine.toCharArray()) {\n            map.put(c, map.getOrDefault(c, 0) + 1);\n        }\n        for (char c : ransomNote.toCharArray()) {\n            if (!map.containsKey(c) || map.get(c) == 0) return false;\n            map.put(c, map.get(c) - 1);\n        }\n        return true;\n    }\n}',
        examples: [{ input: 'ransomNote = "aa", magazine = "ab"', output: 'false' }],
        testCases: [
          { input: 'aa\nab', expectedOutput: 'false', isHidden: false, points: 5 }
        ],
        hints: ['Count magazine letters', 'Check if ransom needs more than available'],
        tags: ['Hash Table', 'String']
      },
      {
        topicId: 'day-36',
        title: 'First Unique Character in a String',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find first non-repeating character and return its index. Return -1 if none.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int firstUniqChar(String s) { return -1; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int firstUniqChar(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        for (char c : s.toCharArray()) {\n            map.put(c, map.getOrDefault(c, 0) + 1);\n        }\n        for (int i = 0; i < s.length(); i++) {\n            if (map.get(s.charAt(i)) == 1) {\n                return i;\n            }\n        }\n        return -1;\n    }\n}',
        examples: [{ input: 's = "leetcode"', output: '0' }],
        testCases: [
          { input: 'leetcode', expectedOutput: '0', isHidden: false, points: 8 }
        ],
        hints: ['Count frequencies', 'Find first with count 1'],
        tags: ['Hash Table', 'String']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 34-36 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays34to36();
