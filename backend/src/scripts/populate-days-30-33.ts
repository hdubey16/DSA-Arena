import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays30to33() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 30 - Merge Intervals & Meeting Rooms ====================
    const day30Topic = await Topic.findOneAndUpdate(
      { id: 'day-30' },
      {
        id: 'day-30',
        title: 'Merge Intervals & Meeting Rooms',
        description: 'Interval problems - sorting start/end times.',
        week: 5,
        day: 30,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-29'],
        compulsoryQuestion: 'Merge Intervals',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day30Topic.title}`);
    await Question.deleteMany({ topicId: 'day-30' });

    await Question.insertMany([
      {
        topicId: 'day-30',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Merge all overlapping intervals and return non-overlapping intervals.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[][] merge(int[][] intervals) { return new int[0][0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[][] merge(int[][] intervals) {\n        if (intervals.length == 0) return new int[0][0];\n        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n        List<int[]> merged = new ArrayList<>();\n        int[] current = intervals[0];\n        merged.add(current);\n        for (int[] interval : intervals) {\n            if (interval[0] <= current[1]) {\n                current[1] = Math.max(current[1], interval[1]);\n            } else {\n                current = interval;\n                merged.add(current);\n            }\n        }\n        return merged.toArray(new int[merged.size()][]);\n    }\n}',
        examples: [{ input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
        testCases: [
          { input: '[[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]', isHidden: false, points: 12 }
        ],
        hints: ['Sort by start time', 'Merge overlapping intervals'],
        tags: ['Array', 'Sorting']
      },
      {
        topicId: 'day-30',
        title: 'Insert Interval',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Insert newInterval into non-overlapping sorted intervals, merging if necessary.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[][] insert(int[][] intervals, int[] newInterval) { return new int[0][0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[][] insert(int[][] intervals, int[] newInterval) {\n        List<int[]> result = new ArrayList<>();\n        int i = 0;\n        while (i < intervals.length && intervals[i][1] < newInterval[0]) {\n            result.add(intervals[i++]);\n        }\n        while (i < intervals.length && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        result.add(newInterval);\n        while (i < intervals.length) {\n            result.add(intervals[i++]);\n        }\n        return result.toArray(new int[result.size()][]);\n    }\n}',
        examples: [{ input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]' }],
        testCases: [
          { input: '[[1,3],[6,9]]\n[2,5]', expectedOutput: '[[1,5],[6,9]]', isHidden: false, points: 12 }
        ],
        hints: ['Add non-overlapping before', 'Merge overlapping', 'Add remaining after'],
        tags: ['Array', 'Sorting']
      },
      {
        topicId: 'day-30',
        title: 'Non-overlapping Intervals',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Return minimum number of intervals to remove to make rest non-overlapping.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int eraseOverlapIntervals(int[][] intervals) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int eraseOverlapIntervals(int[][] intervals) {\n        if (intervals.length == 0) return 0;\n        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);\n        int end = intervals[0][1];\n        int count = 0;\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] < end) {\n                count++;\n            } else {\n                end = intervals[i][1];\n            }\n        }\n        return count;\n    }\n}',
        examples: [{ input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1' }],
        testCases: [
          { input: '[[1,2],[2,3],[3,4],[1,3]]', expectedOutput: '1', isHidden: false, points: 12 }
        ],
        hints: ['Sort by end time', 'Greedy: keep earliest ending'],
        tags: ['Array', 'Greedy', 'Sorting']
      },
      {
        topicId: 'day-30',
        title: 'Meeting Rooms',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Determine if person can attend all meetings (no overlaps).',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean canAttendMeetings(int[][] intervals) { return true; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean canAttendMeetings(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] < intervals[i - 1][1]) {\n                return false;\n            }\n        }\n        return true;\n    }\n}',
        examples: [{ input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false' }],
        testCases: [
          { input: '[[0,30],[5,10],[15,20]]', expectedOutput: 'false', isHidden: false, points: 8 }
        ],
        hints: ['Sort by start time', 'Check if any overlap'],
        tags: ['Array', 'Sorting']
      },
      {
        topicId: 'day-30',
        title: 'Meeting Rooms II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Return minimum number of conference rooms required.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int minMeetingRooms(int[][] intervals) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int minMeetingRooms(int[][] intervals) {\n        int[] starts = new int[intervals.length];\n        int[] ends = new int[intervals.length];\n        for (int i = 0; i < intervals.length; i++) {\n            starts[i] = intervals[i][0];\n            ends[i] = intervals[i][1];\n        }\n        Arrays.sort(starts);\n        Arrays.sort(ends);\n        int rooms = 0, endIdx = 0;\n        for (int i = 0; i < starts.length; i++) {\n            if (starts[i] < ends[endIdx]) {\n                rooms++;\n            } else {\n                endIdx++;\n            }\n        }\n        return rooms;\n    }\n}',
        examples: [{ input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2' }],
        testCases: [
          { input: '[[0,30],[5,10],[15,20]]', expectedOutput: '2', isHidden: false, points: 15 }
        ],
        hints: ['Sort starts and ends separately', 'Track concurrent meetings'],
        tags: ['Array', 'Sorting', 'Heap']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 31 - Matrix Snake & Boundary ====================
    const day31Topic = await Topic.findOneAndUpdate(
      { id: 'day-31' },
      {
        id: 'day-31',
        title: 'Matrix Snake & Boundary Traversal',
        description: 'Basic 2D array traversal patterns.',
        week: 5,
        day: 31,
        difficulty: 'Easy',
        estimatedTime: 120,
        prerequisites: ['day-30'],
        compulsoryQuestion: 'Matrix Diagonal Sum',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day31Topic.title}`);
    await Question.deleteMany({ topicId: 'day-31' });

    await Question.insertMany([
      {
        topicId: 'day-31',
        title: 'Matrix Diagonal Sum',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: 'Return sum of primary and secondary diagonals (count center only once for odd n).',
        starterCode: 'public class Solution {\n    public static int diagonalSum(int[][] mat) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int diagonalSum(int[][] mat) {\n        int n = mat.length;\n        int sum = 0;\n        for (int i = 0; i < n; i++) {\n            sum += mat[i][i];\n            sum += mat[i][n - 1 - i];\n        }\n        if (n % 2 == 1) {\n            sum -= mat[n / 2][n / 2];\n        }\n        return sum;\n    }\n}',
        examples: [{ input: 'mat = [[1,2,3],[4,5,6],[7,8,9]]', output: '25' }],
        testCases: [
          { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '25', isHidden: false, points: 8 }
        ],
        hints: ['mat[i][i] for primary', 'mat[i][n-1-i] for secondary', 'Subtract center if odd'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-31',
        title: 'Toeplitz Matrix',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Return true if every diagonal from top-left to bottom-right has same elements.',
        starterCode: 'public class Solution {\n    public static boolean isToeplitzMatrix(int[][] matrix) { return true; }\n}',
        solution: 'public class Solution {\n    public static boolean isToeplitzMatrix(int[][] matrix) {\n        for (int i = 1; i < matrix.length; i++) {\n            for (int j = 1; j < matrix[0].length; j++) {\n                if (matrix[i][j] != matrix[i - 1][j - 1]) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n}',
        examples: [{ input: 'matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]', output: 'true' }],
        testCases: [
          { input: '[[1,2,3,4],[5,1,2,3],[9,5,1,2]]', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Check if mat[i][j] == mat[i-1][j-1]'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-31',
        title: 'Lucky Numbers in a Matrix',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Lucky number is minimum in its row and maximum in its column.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> luckyNumbers(int[][] matrix) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> luckyNumbers(int[][] matrix) {\n        List<Integer> result = new ArrayList<>();\n        for (int i = 0; i < matrix.length; i++) {\n            int minCol = 0;\n            for (int j = 1; j < matrix[0].length; j++) {\n                if (matrix[i][j] < matrix[i][minCol]) {\n                    minCol = j;\n                }\n            }\n            boolean isLucky = true;\n            for (int k = 0; k < matrix.length; k++) {\n                if (matrix[k][minCol] > matrix[i][minCol]) {\n                    isLucky = false;\n                    break;\n                }\n            }\n            if (isLucky) {\n                result.add(matrix[i][minCol]);\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'matrix = [[3,7,8],[9,11,13],[15,16,17]]', output: '[15]' }],
        testCases: [
          { input: '[[3,7,8],[9,11,13],[15,16,17]]', expectedOutput: '[15]', isHidden: false, points: 10 }
        ],
        hints: ['Find min in each row', 'Check if it\'s max in its column'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-31',
        title: 'Shift 2D Grid',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Shift grid k times. Element at [i][j] moves to [i][j+1], wrapping around.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<List<Integer>> shiftGrid(int[][] grid, int k) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<List<Integer>> shiftGrid(int[][] grid, int k) {\n        int m = grid.length, n = grid[0].length;\n        k %= (m * n);\n        List<List<Integer>> result = new ArrayList<>();\n        for (int i = 0; i < m; i++) {\n            List<Integer> row = new ArrayList<>();\n            for (int j = 0; j < n; j++) {\n                int oldPos = (i * n + j - k + m * n) % (m * n);\n                int oldI = oldPos / n;\n                int oldJ = oldPos % n;\n                row.add(grid[oldI][oldJ]);\n            }\n            result.add(row);\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1', output: '[[9,1,2],[3,4,5],[6,7,8]]' }],
        testCases: [
          { input: '[[1,2,3],[4,5,6],[7,8,9]]\n1', expectedOutput: '[[9,1,2],[3,4,5],[6,7,8]]', isHidden: false, points: 10 }
        ],
        hints: ['Flatten to 1D conceptually', 'Calculate new positions'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-31',
        title: 'Boundary Elements of Matrix',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Return boundary elements in clockwise order.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> boundaryTraversal(int[][] matrix) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> boundaryTraversal(int[][] matrix) {\n        List<Integer> result = new ArrayList<>();\n        int m = matrix.length, n = matrix[0].length;\n        if (m == 1) {\n            for (int j = 0; j < n; j++) result.add(matrix[0][j]);\n            return result;\n        }\n        if (n == 1) {\n            for (int i = 0; i < m; i++) result.add(matrix[i][0]);\n            return result;\n        }\n        for (int j = 0; j < n; j++) result.add(matrix[0][j]);\n        for (int i = 1; i < m; i++) result.add(matrix[i][n - 1]);\n        for (int j = n - 2; j >= 0; j--) result.add(matrix[m - 1][j]);\n        for (int i = m - 2; i > 0; i--) result.add(matrix[i][0]);\n        return result;\n    }\n}',
        examples: [{ input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4]' }],
        testCases: [
          { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[1,2,3,6,9,8,7,4]', isHidden: false, points: 8 }
        ],
        hints: ['Top row', 'Right column', 'Bottom row (reverse)', 'Left column (reverse)'],
        tags: ['Array', 'Matrix']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 32 - Matrix Transpose & Rotation ====================
    const day32Topic = await Topic.findOneAndUpdate(
      { id: 'day-32' },
      {
        id: 'day-32',
        title: 'Matrix Transpose & Rotation',
        description: 'In-place matrix transformations.',
        week: 5,
        day: 32,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-31'],
        compulsoryQuestion: 'Transpose Matrix',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day32Topic.title}`);
    await Question.deleteMany({ topicId: 'day-32' });

    await Question.insertMany([
      {
        topicId: 'day-32',
        title: 'Transpose Matrix',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: 'Return transpose of matrix (flip over main diagonal).',
        starterCode: 'public class Solution {\n    public static int[][] transpose(int[][] matrix) { return new int[0][0]; }\n}',
        solution: 'public class Solution {\n    public static int[][] transpose(int[][] matrix) {\n        int m = matrix.length, n = matrix[0].length;\n        int[][] result = new int[n][m];\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                result[j][i] = matrix[i][j];\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'matrix = [[1,2,3],[4,5,6]]', output: '[[1,4],[2,5],[3,6]]' }],
        testCases: [
          { input: '[[1,2,3],[4,5,6]]', expectedOutput: '[[1,4],[2,5],[3,6]]', isHidden: false, points: 8 }
        ],
        hints: ['result[j][i] = matrix[i][j]', 'Dimensions swap: m×n becomes n×m'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-32',
        title: 'Rotate Image',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Rotate n×n matrix 90 degrees clockwise in-place.',
        starterCode: 'public class Solution {\n    public static void rotate(int[][] matrix) {}\n}',
        solution: 'public class Solution {\n    public static void rotate(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n / 2; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[i][n - 1 - j];\n                matrix[i][n - 1 - j] = temp;\n            }\n        }\n    }\n}',
        examples: [{ input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' }],
        testCases: [
          { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[[7,4,1],[8,5,2],[9,6,3]]', isHidden: false, points: 12 }
        ],
        hints: ['Transpose matrix', 'Reverse each row'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-32',
        title: 'Determine Whether Matrix Can Be Obtained By Rotation',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Check if mat can equal target by rotating 0, 90, 180, or 270 degrees.',
        starterCode: 'public class Solution {\n    public static boolean findRotation(int[][] mat, int[][] target) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean findRotation(int[][] mat, int[][] target) {\n        for (int i = 0; i < 4; i++) {\n            if (equals(mat, target)) return true;\n            rotate(mat);\n        }\n        return false;\n    }\n    private static void rotate(int[][] mat) {\n        int n = mat.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = mat[i][j];\n                mat[i][j] = mat[j][i];\n                mat[j][i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n / 2; j++) {\n                int temp = mat[i][j];\n                mat[i][j] = mat[i][n - 1 - j];\n                mat[i][n - 1 - j] = temp;\n            }\n        }\n    }\n    private static boolean equals(int[][] a, int[][] b) {\n        for (int i = 0; i < a.length; i++) {\n            for (int j = 0; j < a[0].length; j++) {\n                if (a[i][j] != b[i][j]) return false;\n            }\n        }\n        return true;\n    }\n}',
        examples: [{ input: 'mat = [[0,1],[1,0]], target = [[1,0],[0,1]]', output: 'true' }],
        testCases: [
          { input: '[[0,1],[1,0]]\n[[1,0],[0,1]]', expectedOutput: 'true', isHidden: false, points: 10 }
        ],
        hints: ['Rotate 4 times and check each'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-32',
        title: 'Flipping an Image',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Flip image horizontally, then invert (0→1, 1→0).',
        starterCode: 'public class Solution {\n    public static int[][] flipAndInvertImage(int[][] image) { return image; }\n}',
        solution: 'public class Solution {\n    public static int[][] flipAndInvertImage(int[][] image) {\n        for (int i = 0; i < image.length; i++) {\n            int left = 0, right = image[i].length - 1;\n            while (left <= right) {\n                int temp = image[i][left] ^ 1;\n                image[i][left] = image[i][right] ^ 1;\n                image[i][right] = temp;\n                left++;\n                right--;\n            }\n        }\n        return image;\n    }\n}',
        examples: [{ input: 'image = [[1,1,0],[1,0,1],[0,0,0]]', output: '[[1,0,0],[0,1,0],[1,1,1]]' }],
        testCases: [
          { input: '[[1,1,0],[1,0,1],[0,0,0]]', expectedOutput: '[[1,0,0],[0,1,0],[1,1,1]]', isHidden: false, points: 8 }
        ],
        hints: ['Reverse each row', 'XOR with 1 to invert'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-32',
        title: 'Reshape the Matrix',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Reshape m×n matrix to r×c keeping row-traversing order. Return original if impossible.',
        starterCode: 'public class Solution {\n    public static int[][] matrixReshape(int[][] mat, int r, int c) { return mat; }\n}',
        solution: 'public class Solution {\n    public static int[][] matrixReshape(int[][] mat, int r, int c) {\n        int m = mat.length, n = mat[0].length;\n        if (m * n != r * c) return mat;\n        int[][] result = new int[r][c];\n        int row = 0, col = 0;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                result[row][col] = mat[i][j];\n                col++;\n                if (col == c) {\n                    col = 0;\n                    row++;\n                }\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'mat = [[1,2],[3,4]], r = 1, c = 4', output: '[[1,2,3,4]]' }],
        testCases: [
          { input: '[[1,2],[3,4]]\n1\n4', expectedOutput: '[[1,2,3,4]]', isHidden: false, points: 8 }
        ],
        hints: ['Check if m*n == r*c', 'Traverse and fill new matrix'],
        tags: ['Array', 'Matrix']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 33 - Spiral Traversal & Search ====================
    const day33Topic = await Topic.findOneAndUpdate(
      { id: 'day-33' },
      {
        id: 'day-33',
        title: 'Spiral Traversal & Search in Matrix',
        description: 'Complex traversals and efficient 2D search.',
        week: 5,
        day: 33,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-32'],
        compulsoryQuestion: 'Spiral Matrix',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day33Topic.title}`);
    await Question.deleteMany({ topicId: 'day-33' });

    await Question.insertMany([
      {
        topicId: 'day-33',
        title: 'Spiral Matrix',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Return all elements of m×n matrix in spiral order.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> spiralOrder(int[][] matrix) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> result = new ArrayList<>();\n        if (matrix.length == 0) return result;\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        while (top <= bottom && left <= right) {\n            for (int j = left; j <= right; j++) result.add(matrix[top][j]);\n            top++;\n            for (int i = top; i <= bottom; i++) result.add(matrix[i][right]);\n            right--;\n            if (top <= bottom) {\n                for (int j = right; j >= left; j--) result.add(matrix[bottom][j]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) result.add(matrix[i][left]);\n                left++;\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' }],
        testCases: [
          { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[1,2,3,6,9,8,7,4,5]', isHidden: false, points: 12 }
        ],
        hints: ['Four boundaries: top, bottom, left, right', 'Move inward after each layer'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-33',
        title: 'Spiral Matrix II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Generate n×n matrix filled with 1 to n² in spiral order.',
        starterCode: 'public class Solution {\n    public static int[][] generateMatrix(int n) { return new int[n][n]; }\n}',
        solution: 'public class Solution {\n    public static int[][] generateMatrix(int n) {\n        int[][] matrix = new int[n][n];\n        int top = 0, bottom = n - 1, left = 0, right = n - 1;\n        int num = 1;\n        while (top <= bottom && left <= right) {\n            for (int j = left; j <= right; j++) matrix[top][j] = num++;\n            top++;\n            for (int i = top; i <= bottom; i++) matrix[i][right] = num++;\n            right--;\n            for (int j = right; j >= left; j--) matrix[bottom][j] = num++;\n            bottom--;\n            for (int i = bottom; i >= top; i--) matrix[i][left] = num++;\n            left++;\n        }\n        return matrix;\n    }\n}',
        examples: [{ input: 'n = 3', output: '[[1,2,3],[8,9,4],[7,6,5]]' }],
        testCases: [
          { input: '3', expectedOutput: '[[1,2,3],[8,9,4],[7,6,5]]', isHidden: false, points: 12 }
        ],
        hints: ['Same spiral pattern', 'Fill with incrementing counter'],
        tags: ['Array', 'Matrix']
      },
      {
        topicId: 'day-33',
        title: 'Search a 2D Matrix',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 25,
        description: 'Each row sorted, first element of row > last of previous row. O(log(m*n)) search.',
        starterCode: 'public class Solution {\n    public static boolean searchMatrix(int[][] matrix, int target) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean searchMatrix(int[][] matrix, int target) {\n        int m = matrix.length, n = matrix[0].length;\n        int left = 0, right = m * n - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            int val = matrix[mid / n][mid % n];\n            if (val == target) return true;\n            if (val < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true' }],
        testCases: [
          { input: '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3', expectedOutput: 'true', isHidden: false, points: 12 }
        ],
        hints: ['Treat as flattened sorted array', 'Binary search with index conversion'],
        tags: ['Array', 'Binary Search', 'Matrix']
      },
      {
        topicId: 'day-33',
        title: 'Search a 2D Matrix II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Rows sorted left-to-right, columns sorted top-to-bottom. Efficient search.',
        starterCode: 'public class Solution {\n    public static boolean searchMatrix(int[][] matrix, int target) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean searchMatrix(int[][] matrix, int target) {\n        int row = 0, col = matrix[0].length - 1;\n        while (row < matrix.length && col >= 0) {\n            if (matrix[row][col] == target) return true;\n            if (matrix[row][col] > target) {\n                col--;\n            } else {\n                row++;\n            }\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5', output: 'true' }],
        testCases: [
          { input: '[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n5', expectedOutput: 'true', isHidden: false, points: 12 }
        ],
        hints: ['Start from top-right corner', 'Move left if too large, down if too small'],
        tags: ['Array', 'Binary Search', 'Matrix']
      },
      {
        topicId: 'day-33',
        title: 'Spiral Matrix IV',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Fill m×n matrix with linked list values in spiral order. Fill remaining with -1.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static int[][] spiralMatrix(int m, int n, ListNode head) { return new int[m][n]; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static int[][] spiralMatrix(int m, int n, ListNode head) {\n        int[][] matrix = new int[m][n];\n        for (int i = 0; i < m; i++) {\n            java.util.Arrays.fill(matrix[i], -1);\n        }\n        int top = 0, bottom = m - 1, left = 0, right = n - 1;\n        ListNode curr = head;\n        while (top <= bottom && left <= right && curr != null) {\n            for (int j = left; j <= right && curr != null; j++) {\n                matrix[top][j] = curr.val;\n                curr = curr.next;\n            }\n            top++;\n            for (int i = top; i <= bottom && curr != null; i++) {\n                matrix[i][right] = curr.val;\n                curr = curr.next;\n            }\n            right--;\n            for (int j = right; j >= left && curr != null; j--) {\n                matrix[bottom][j] = curr.val;\n                curr = curr.next;\n            }\n            bottom--;\n            for (int i = bottom; i >= top && curr != null; i--) {\n                matrix[i][left] = curr.val;\n                curr = curr.next;\n            }\n            left++;\n        }\n        return matrix;\n    }\n}',
        examples: [{ input: 'm = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]', output: '[[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]' }],
        testCases: [
          { input: '3\n5\n[3,0,2,6,8,1,7,9,4,2,5,5,0]', expectedOutput: '[[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]', isHidden: false, points: 15 }
        ],
        hints: ['Initialize with -1', 'Spiral fill while list has nodes'],
        tags: ['Array', 'Linked List', 'Matrix']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 30-33 populated successfully! (20 questions)`);
    console.log(`📊 Total Days 1-33 complete!`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays30to33();
