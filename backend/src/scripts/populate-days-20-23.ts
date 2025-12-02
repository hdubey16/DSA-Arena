import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays20to23() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 20 - Prefix Sum ====================
    const day20Topic = await Topic.findOneAndUpdate(
      { id: 'day-20' },
      {
        id: 'day-20',
        title: 'Prefix Sum Technique',
        description: 'Range queries and cumulative sum arrays.',
        week: 3,
        day: 20,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-19'],
        compulsoryQuestion: 'Range Sum Query - Immutable',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day20Topic.title}`);
    await Question.deleteMany({ topicId: 'day-20' });

    await Question.insertMany([
      {
        topicId: 'day-20',
        title: 'Range Sum Query - Immutable',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: 'Calculate sum of elements between indices left and right using prefix sum.',
        starterCode: 'class NumArray {\n    public NumArray(int[] nums) {}\n    public int sumRange(int left, int right) { return 0; }\n}',
        solution: 'class NumArray {\n    int[] prefix;\n    public NumArray(int[] nums) {\n        prefix = new int[nums.length + 1];\n        for (int i = 0; i < nums.length; i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n    }\n    public int sumRange(int left, int right) {\n        return prefix[right + 1] - prefix[left];\n    }\n}',
        examples: [{ input: '[-2,0,3,-5,2,-1], sumRange(0,2)', output: '1' }],
        testCases: [
          { input: '[-2,0,3,-5,2,-1]\n0\n2', expectedOutput: '1', isHidden: false, points: 8 }
        ],
        hints: ['Build prefix sum array', 'sum(left,right) = prefix[right+1] - prefix[left]'],
        tags: ['Array', 'Prefix Sum']
      },
      {
        topicId: 'day-20',
        title: 'Find Pivot Index',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find index where left sum equals right sum.',
        starterCode: 'public class Solution {\n    public static int pivotIndex(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int pivotIndex(int[] nums) {\n        int total = 0;\n        for (int n : nums) total += n;\n        int left = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (left == total - left - nums[i]) return i;\n            left += nums[i];\n        }\n        return -1;\n    }\n}',
        examples: [{ input: 'nums = [1,7,3,6,5,6]', output: '3' }],
        testCases: [
          { input: '[1,7,3,6,5,6]', expectedOutput: '3', isHidden: false, points: 8 }
        ],
        hints: ['Calculate total sum', 'Track left sum, check if left == total - left - current'],
        tags: ['Array', 'Prefix Sum']
      },
      {
        topicId: 'day-20',
        title: 'Product of Array Except Self',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 25,
        description: 'Return array where answer[i] is product of all elements except nums[i]. No division allowed.',
        starterCode: 'public class Solution {\n    public static int[] productExceptSelf(int[] nums) { return new int[nums.length]; }\n}',
        solution: 'public class Solution {\n    public static int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] result = new int[n];\n        result[0] = 1;\n        for (int i = 1; i < n; i++) {\n            result[i] = result[i - 1] * nums[i - 1];\n        }\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            result[i] *= right;\n            right *= nums[i];\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' }],
        testCases: [
          { input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]', isHidden: false, points: 12 }
        ],
        hints: ['Two passes: left products, then multiply with right products'],
        tags: ['Array', 'Prefix Sum']
      },
      {
        topicId: 'day-20',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Count subarrays whose sum equals k.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int subarraySum(int[] nums, int k) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int subarraySum(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, 1);\n        int sum = 0, count = 0;\n        for (int num : nums) {\n            sum += num;\n            count += map.getOrDefault(sum - k, 0);\n            map.put(sum, map.getOrDefault(sum, 0) + 1);\n        }\n        return count;\n    }\n}',
        examples: [{ input: 'nums = [1,1,1], k = 2', output: '2' }],
        testCases: [
          { input: '[1,1,1]\n2', expectedOutput: '2', isHidden: false, points: 12 }
        ],
        hints: ['Use HashMap for prefix sums', 'If (sum - k) exists, found subarray'],
        tags: ['Array', 'Hash Table', 'Prefix Sum']
      },
      {
        topicId: 'day-20',
        title: 'Continuous Subarray Sum',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Check if there exists a subarray (length >= 2) whose sum is multiple of k.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean checkSubarraySum(int[] nums, int k) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean checkSubarraySum(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, -1);\n        int sum = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n            int mod = sum % k;\n            if (map.containsKey(mod)) {\n                if (i - map.get(mod) >= 2) return true;\n            } else {\n                map.put(mod, i);\n            }\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'nums = [23,2,4,6,7], k = 6', output: 'true' }],
        testCases: [
          { input: '[23,2,4,6,7]\n6', expectedOutput: 'true', isHidden: false, points: 12 }
        ],
        hints: ['Store remainder and index in HashMap', 'Check if length >= 2'],
        tags: ['Array', 'Hash Table', 'Math', 'Prefix Sum']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 21 - Array Practice ====================
    const day21Topic = await Topic.findOneAndUpdate(
      { id: 'day-21' },
      {
        id: 'day-21',
        title: 'Array Practice Problems',
        description: 'Mixed bag of array questions (Sort, Matrix, Intervals).',
        week: 4,
        day: 21,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-20'],
        compulsoryQuestion: 'Sort Colors',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day21Topic.title}`);
    await Question.deleteMany({ topicId: 'day-21' });

    await Question.insertMany([
      {
        topicId: 'day-21',
        title: 'Sort Colors',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Sort array containing 0, 1, 2 in-place (Dutch National Flag).',
        starterCode: 'public class Solution {\n    public static void sortColors(int[] nums) {}\n}',
        solution: 'public class Solution {\n    public static void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                int temp = nums[low];\n                nums[low++] = nums[mid];\n                nums[mid++] = temp;\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                int temp = nums[high];\n                nums[high--] = nums[mid];\n                nums[mid] = temp;\n            }\n        }\n    }\n}',
        examples: [{ input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' }],
        testCases: [
          { input: '[2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]', isHidden: false, points: 10 }
        ],
        hints: ['Three pointers: low, mid, high', 'Swap 0s to left, 2s to right'],
        tags: ['Array', 'Two Pointers', 'Sorting']
      },
      {
        topicId: 'day-21',
        title: 'Majority Element',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find element appearing more than n/2 times (Boyer-Moore Voting).',
        starterCode: 'public class Solution {\n    public static int majorityElement(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int majorityElement(int[] nums) {\n        int candidate = 0, count = 0;\n        for (int num : nums) {\n            if (count == 0) candidate = num;\n            count += (num == candidate) ? 1 : -1;\n        }\n        return candidate;\n    }\n}',
        examples: [{ input: 'nums = [3,2,3]', output: '3' }],
        testCases: [
          { input: '[3,2,3]', expectedOutput: '3', isHidden: false, points: 8 }
        ],
        hints: ['Boyer-Moore Voting Algorithm', 'Track candidate and count'],
        tags: ['Array', 'Hash Table', 'Divide and Conquer']
      },
      {
        topicId: 'day-21',
        title: 'Majority Element II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find all elements appearing more than n/3 times.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> majorityElement(int[] nums) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> majorityElement(int[] nums) {\n        int c1 = 0, c2 = 0, count1 = 0, count2 = 0;\n        for (int num : nums) {\n            if (num == c1) count1++;\n            else if (num == c2) count2++;\n            else if (count1 == 0) { c1 = num; count1 = 1; }\n            else if (count2 == 0) { c2 = num; count2 = 1; }\n            else { count1--; count2--; }\n        }\n        count1 = count2 = 0;\n        for (int num : nums) {\n            if (num == c1) count1++;\n            else if (num == c2) count2++;\n        }\n        List<Integer> result = new ArrayList<>();\n        if (count1 > nums.length / 3) result.add(c1);\n        if (count2 > nums.length / 3) result.add(c2);\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [3,2,3]', output: '[3]' }],
        testCases: [
          { input: '[3,2,3]', expectedOutput: '[3]', isHidden: false, points: 12 }
        ],
        hints: ['At most 2 elements can appear > n/3 times', 'Modified Boyer-Moore'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-21',
        title: 'Merge Sorted Array',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Merge nums2 into nums1 in-place.',
        starterCode: 'public class Solution {\n    public static void merge(int[] nums1, int m, int[] nums2, int n) {}\n}',
        solution: 'public class Solution {\n    public static void merge(int[] nums1, int m, int[] nums2, int n) {\n        int i = m - 1, j = n - 1, k = m + n - 1;\n        while (j >= 0) {\n            if (i >= 0 && nums1[i] > nums2[j]) {\n                nums1[k--] = nums1[i--];\n            } else {\n                nums1[k--] = nums2[j--];\n            }\n        }\n    }\n}',
        examples: [{ input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' }],
        testCases: [
          { input: '[1,2,3,0,0,0]\n3\n[2,5,6]\n3', expectedOutput: '[1,2,2,3,5,6]', isHidden: false, points: 8 }
        ],
        hints: ['Fill from end to avoid overwrites', 'Three pointers'],
        tags: ['Array', 'Two Pointers', 'Sorting']
      },
      {
        topicId: 'day-21',
        title: 'Set Matrix Zeroes',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Set entire row and column to 0 if element is 0. In-place.',
        starterCode: 'public class Solution {\n    public static void setZeroes(int[][] matrix) {}\n}',
        solution: 'public class Solution {\n    public static void setZeroes(int[][] matrix) {\n        boolean firstRow = false, firstCol = false;\n        for (int i = 0; i < matrix.length; i++) {\n            for (int j = 0; j < matrix[0].length; j++) {\n                if (matrix[i][j] == 0) {\n                    if (i == 0) firstRow = true;\n                    if (j == 0) firstCol = true;\n                    matrix[0][j] = 0;\n                    matrix[i][0] = 0;\n                }\n            }\n        }\n        for (int i = 1; i < matrix.length; i++) {\n            for (int j = 1; j < matrix[0].length; j++) {\n                if (matrix[i][0] == 0 || matrix[0][j] == 0) {\n                    matrix[i][j] = 0;\n                }\n            }\n        }\n        if (firstRow) {\n            for (int j = 0; j < matrix[0].length; j++) matrix[0][j] = 0;\n        }\n        if (firstCol) {\n            for (int i = 0; i < matrix.length; i++) matrix[i][0] = 0;\n        }\n    }\n}',
        examples: [{ input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' }],
        testCases: [
          { input: '[[1,1,1],[1,0,1],[1,1,1]]', expectedOutput: '[[1,0,1],[0,0,0],[1,0,1]]', isHidden: false, points: 12 }
        ],
        hints: ['Use first row and column as markers', 'Handle first row/col separately'],
        tags: ['Array', 'Matrix']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 22 - Binary Search Basics ====================
    const day22Topic = await Topic.findOneAndUpdate(
      { id: 'day-22' },
      {
        id: 'day-22',
        title: 'Binary Search (Iterative & Recursive)',
        description: 'Core logic of binary search on arrays.',
        week: 4,
        day: 22,
        difficulty: 'Easy',
        estimatedTime: 120,
        prerequisites: ['day-21'],
        compulsoryQuestion: 'Binary Search',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day22Topic.title}`);
    await Question.deleteMany({ topicId: 'day-22' });

    await Question.insertMany([
      {
        topicId: 'day-22',
        title: 'Binary Search',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 15,
        description: 'Search target in sorted array. Return index or -1.',
        starterCode: 'public class Solution {\n    public static int search(int[] nums, int target) { return -1; }\n}',
        solution: 'public class Solution {\n    public static int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}',
        examples: [{ input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' }],
        testCases: [
          { input: '[-1,0,3,5,9,12]\n9', expectedOutput: '4', isHidden: false, points: 8 }
        ],
        hints: ['Classic binary search', 'O(log n) time'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-22',
        title: 'Search Insert Position',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: 'Return index where target should be inserted in sorted array.',
        starterCode: 'public class Solution {\n    public static int searchInsert(int[] nums, int target) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int searchInsert(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return left;\n    }\n}',
        examples: [{ input: 'nums = [1,3,5,6], target = 5', output: '2' }],
        testCases: [
          { input: '[1,3,5,6]\n5', expectedOutput: '2', isHidden: false, points: 8 }
        ],
        hints: ['Return left pointer at end', 'Lower bound binary search'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-22',
        title: 'Guess Number Higher or Lower',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: 'Guess number from 1 to n using binary search.',
        starterCode: 'public class Solution {\n    public static int guessNumber(int n) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int guessNumber(int n) {\n        int left = 1, right = n;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            int result = guess(mid);\n            if (result == 0) return mid;\n            if (result < 0) right = mid - 1;\n            else left = mid + 1;\n        }\n        return -1;\n    }\n    private static int guess(int num) { return 0; }\n}',
        examples: [{ input: 'n = 10, pick = 6', output: '6' }],
        testCases: [
          { input: '10\n6', expectedOutput: '6', isHidden: false, points: 8 }
        ],
        hints: ['Binary search on range [1, n]', 'Use guess() API'],
        tags: ['Binary Search']
      },
      {
        topicId: 'day-22',
        title: 'Valid Perfect Square',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: 'Check if num is perfect square using binary search.',
        starterCode: 'public class Solution {\n    public static boolean isPerfectSquare(int num) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean isPerfectSquare(int num) {\n        if (num < 2) return true;\n        long left = 2, right = num / 2;\n        while (left <= right) {\n            long mid = left + (right - left) / 2;\n            long square = mid * mid;\n            if (square == num) return true;\n            if (square < num) left = mid + 1;\n            else right = mid - 1;\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'num = 16', output: 'true' }],
        testCases: [
          { input: '16', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Binary search on [2, num/2]', 'Check if mid*mid == num'],
        tags: ['Math', 'Binary Search']
      },
      {
        topicId: 'day-22',
        title: 'Sqrt(x)',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: 'Compute square root rounded down using binary search.',
        starterCode: 'public class Solution {\n    public static int mySqrt(int x) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int mySqrt(int x) {\n        if (x < 2) return x;\n        long left = 2, right = x / 2;\n        while (left <= right) {\n            long mid = left + (right - left) / 2;\n            long square = mid * mid;\n            if (square == x) return (int) mid;\n            if (square < x) left = mid + 1;\n            else right = mid - 1;\n        }\n        return (int) right;\n    }\n}',
        examples: [{ input: 'x = 8', output: '2' }],
        testCases: [
          { input: '8', expectedOutput: '2', isHidden: false, points: 8 }
        ],
        hints: ['Binary search on [2, x/2]', 'Return right pointer'],
        tags: ['Math', 'Binary Search']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 23 - Binary Search Variations ====================
    const day23Topic = await Topic.findOneAndUpdate(
      { id: 'day-23' },
      {
        id: 'day-23',
        title: 'First & Last Occurrence, Count in Sorted',
        description: 'Binary search variations (Lower bound, Upper bound).',
        week: 4,
        day: 23,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-22'],
        compulsoryQuestion: 'Find First and Last Position',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day23Topic.title}`);
    await Question.deleteMany({ topicId: 'day-23' });

    await Question.insertMany([
      {
        topicId: 'day-23',
        title: 'Find First and Last Position of Element in Sorted Array',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Find starting and ending position of target in sorted array.',
        starterCode: 'public class Solution {\n    public static int[] searchRange(int[] nums, int target) { return new int[]{-1, -1}; }\n}',
        solution: 'public class Solution {\n    public static int[] searchRange(int[] nums, int target) {\n        int[] result = {-1, -1};\n        result[0] = findFirst(nums, target);\n        result[1] = findLast(nums, target);\n        return result;\n    }\n    private static int findFirst(int[] nums, int target) {\n        int left = 0, right = nums.length - 1, result = -1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) {\n                result = mid;\n                right = mid - 1;\n            } else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return result;\n    }\n    private static int findLast(int[] nums, int target) {\n        int left = 0, right = nums.length - 1, result = -1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) {\n                result = mid;\n                left = mid + 1;\n            } else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]' }],
        testCases: [
          { input: '[5,7,7,8,8,10]\n8', expectedOutput: '[3,4]', isHidden: false, points: 10 }
        ],
        hints: ['Two binary searches: first and last occurrence', 'Lower bound and upper bound'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-23',
        title: 'First Bad Version',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find first bad version using binary search.',
        starterCode: 'public class Solution {\n    public static int firstBadVersion(int n) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int firstBadVersion(int n) {\n        int left = 1, right = n;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (isBadVersion(mid)) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n    private static boolean isBadVersion(int version) { return false; }\n}',
        examples: [{ input: 'n = 5, bad = 4', output: '4' }],
        testCases: [
          { input: '5\n4', expectedOutput: '4', isHidden: false, points: 8 }
        ],
        hints: ['Find first true in boolean array', 'Lower bound binary search'],
        tags: ['Binary Search']
      },
      {
        topicId: 'day-23',
        title: 'Find Smallest Letter Greater Than Target',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find smallest character lexicographically greater than target.',
        starterCode: 'public class Solution {\n    public static char nextGreatestLetter(char[] letters, char target) { return letters[0]; }\n}',
        solution: 'public class Solution {\n    public static char nextGreatestLetter(char[] letters, char target) {\n        int left = 0, right = letters.length - 1;\n        if (target >= letters[right]) return letters[0];\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (letters[mid] <= target) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return letters[left];\n    }\n}',
        examples: [{ input: 'letters = ["c","f","j"], target = "a"', output: 'c' }],
        testCases: [
          { input: '[c,f,j]\na', expectedOutput: 'c', isHidden: false, points: 8 }
        ],
        hints: ['Upper bound binary search', 'Wrap around if needed'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-23',
        title: 'Single Element in a Sorted Array',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find single element in sorted array where every other element appears twice.',
        starterCode: 'public class Solution {\n    public static int singleNonDuplicate(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int singleNonDuplicate(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (mid % 2 == 1) mid--;\n            if (nums[mid] == nums[mid + 1]) {\n                left = mid + 2;\n            } else {\n                right = mid;\n            }\n        }\n        return nums[left];\n    }\n}',
        examples: [{ input: 'nums = [1,1,2,3,3,4,4,8,8]', output: '2' }],
        testCases: [
          { input: '[1,1,2,3,3,4,4,8,8]', expectedOutput: '2', isHidden: false, points: 12 }
        ],
        hints: ['Check pairs at even indices', 'Binary search on pattern'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-23',
        title: 'H-Index II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Compute h-index from sorted citations array.',
        starterCode: 'public class Solution {\n    public static int hIndex(int[] citations) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int hIndex(int[] citations) {\n        int n = citations.length;\n        int left = 0, right = n - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (citations[mid] == n - mid) {\n                return n - mid;\n            } else if (citations[mid] < n - mid) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return n - left;\n    }\n}',
        examples: [{ input: 'citations = [0,1,3,5,6]', output: '3' }],
        testCases: [
          { input: '[0,1,3,5,6]', expectedOutput: '3', isHidden: false, points: 12 }
        ],
        hints: ['Binary search for h where citations[i] >= n - i', 'Return n - left'],
        tags: ['Array', 'Binary Search']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 20-23 populated successfully! (20 questions)`);
    console.log(`📊 Database now has Days 1-23 complete with 115 questions total!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays20to23();
