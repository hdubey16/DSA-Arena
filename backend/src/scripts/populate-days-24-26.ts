import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays24to26() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 24 - Search in Rotated Array & Peak Element ====================
    const day24Topic = await Topic.findOneAndUpdate(
      { id: 'day-24' },
      {
        id: 'day-24',
        title: 'Search in Rotated Array & Peak Element',
        description: 'Binary search on rotated and mountain arrays.',
        week: 4,
        day: 24,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-23'],
        compulsoryQuestion: 'Search in Rotated Sorted Array',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day24Topic.title}`);
    await Question.deleteMany({ topicId: 'day-24' });

    await Question.insertMany([
      {
        topicId: 'day-24',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Array nums sorted in ascending order is possibly rotated at an unknown pivot. Given target, return its index or -1. O(log n) complexity required.',
        starterCode: 'public class Solution {\n    public static int search(int[] nums, int target) { return -1; }\n}',
        solution: 'public class Solution {\n    public static int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            } else {\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        return -1;\n    }\n}',
        examples: [{ input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' }],
        testCases: [
          { input: '[4,5,6,7,0,1,2]\n0', expectedOutput: '4', isHidden: false, points: 12 },
          { input: '[4,5,6,7,0,1,2]\n3', expectedOutput: '-1', isHidden: true, points: 13 }
        ],
        hints: ['Identify which half is sorted', 'Check if target lies in sorted half'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-24',
        title: 'Search in Rotated Sorted Array II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Same as above but array can contain duplicates. Return true/false. Worst case O(n) due to duplicates.',
        starterCode: 'public class Solution {\n    public static boolean search(int[] nums, int target) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return true;\n            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {\n                left++;\n                right--;\n            } else if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            } else {\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'nums = [2,5,6,0,0,1,2], target = 0', output: 'true' }],
        testCases: [
          { input: '[2,5,6,0,0,1,2]\n0', expectedOutput: 'true', isHidden: false, points: 12 }
        ],
        hints: ['Handle duplicates by shrinking both ends', 'Skip when left == mid == right'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-24',
        title: 'Find Minimum in Rotated Sorted Array',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 25,
        description: 'Array of unique elements sorted and rotated. Return minimum element in O(log n) time.',
        starterCode: 'public class Solution {\n    public static int findMin(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int findMin(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] > nums[right]) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return nums[left];\n    }\n}',
        examples: [{ input: 'nums = [3,4,5,1,2]', output: '1' }],
        testCases: [
          { input: '[3,4,5,1,2]', expectedOutput: '1', isHidden: false, points: 12 }
        ],
        hints: ['Compare mid with right element', 'Minimum is in unsorted half'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-24',
        title: 'Find Peak Element',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 25,
        description: 'Peak element is strictly greater than neighbors. Return any peak index. O(log n) complexity. Assume nums[-1] = nums[n] = -∞.',
        starterCode: 'public class Solution {\n    public static int findPeakElement(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int findPeakElement(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] > nums[mid + 1]) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n}',
        examples: [{ input: 'nums = [1,2,3,1]', output: '2' }],
        testCases: [
          { input: '[1,2,3,1]', expectedOutput: '2', isHidden: false, points: 12 }
        ],
        hints: ['Move toward higher neighbor', 'Peak guaranteed by -∞ boundaries'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-24',
        title: 'Peak Index in a Mountain Array',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 20,
        description: 'Mountain array: strictly increasing then strictly decreasing. Return peak index in O(log n) time.',
        starterCode: 'public class Solution {\n    public static int peakIndexInMountainArray(int[] arr) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int peakIndexInMountainArray(int[] arr) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] < arr[mid + 1]) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return left;\n    }\n}',
        examples: [{ input: 'arr = [0,10,5,2]', output: '1' }],
        testCases: [
          { input: '[0,10,5,2]', expectedOutput: '1', isHidden: false, points: 10 }
        ],
        hints: ['Same as Find Peak Element', 'Mountain guarantees single peak'],
        tags: ['Array', 'Binary Search']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 25 - Two Pointer & Binary Search on Answers ====================
    const day25Topic = await Topic.findOneAndUpdate(
      { id: 'day-25' },
      {
        id: 'day-25',
        title: 'Two Pointer Technique & Binary Search on Answers',
        description: 'Efficient pair finding and search on answer space.',
        week: 4,
        day: 25,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-24'],
        compulsoryQuestion: 'Two Sum II - Input Array Is Sorted',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day25Topic.title}`);
    await Question.deleteMany({ topicId: 'day-25' });

    await Question.insertMany([
      {
        topicId: 'day-25',
        title: 'Two Sum II - Input Array Is Sorted',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 20,
        description: 'Given 1-indexed sorted array numbers and target, find two numbers that add to target. Return [index1, index2] (1-indexed).',
        starterCode: 'public class Solution {\n    public static int[] twoSum(int[] numbers, int target) { return new int[2]; }\n}',
        solution: 'public class Solution {\n    public static int[] twoSum(int[] numbers, int target) {\n        int left = 0, right = numbers.length - 1;\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) {\n                return new int[]{left + 1, right + 1};\n            } else if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return new int[]{-1, -1};\n    }\n}',
        examples: [{ input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]' }],
        testCases: [
          { input: '[2,7,11,15]\n9', expectedOutput: '[1,2]', isHidden: false, points: 10 }
        ],
        hints: ['Two pointers from both ends', 'Move based on sum comparison'],
        tags: ['Array', 'Two Pointers', 'Binary Search']
      },
      {
        topicId: 'day-25',
        title: 'Kth Missing Positive Number',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 20,
        description: 'Given sorted array arr and integer k, return kth missing positive integer.',
        starterCode: 'public class Solution {\n    public static int findKthPositive(int[] arr, int k) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int findKthPositive(int[] arr, int k) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            int missing = arr[mid] - (mid + 1);\n            if (missing < k) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return left + k;\n    }\n}',
        examples: [{ input: 'arr = [2,3,4,7,11], k = 5', output: '9' }],
        testCases: [
          { input: '[2,3,4,7,11]\n5', expectedOutput: '9', isHidden: false, points: 10 }
        ],
        hints: ['Count missing numbers before index', 'Binary search on missing count'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-25',
        title: 'Arranging Coins',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Given n coins, build staircase where row i has i coins. Return number of complete rows.',
        starterCode: 'public class Solution {\n    public static int arrangeCoins(int n) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int arrangeCoins(int n) {\n        long left = 0, right = n;\n        while (left <= right) {\n            long mid = left + (right - left) / 2;\n            long total = mid * (mid + 1) / 2;\n            if (total == n) {\n                return (int) mid;\n            } else if (total < n) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return (int) right;\n    }\n}',
        examples: [{ input: 'n = 5', output: '2' }],
        testCases: [
          { input: '5', expectedOutput: '2', isHidden: false, points: 8 }
        ],
        hints: ['Sum of first k rows = k*(k+1)/2', 'Binary search on k'],
        tags: ['Math', 'Binary Search']
      },
      {
        topicId: 'day-25',
        title: 'Find Smallest Letter Greater Than Target',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: 'Given sorted letters array and target, return smallest character lexicographically greater than target.',
        starterCode: 'public class Solution {\n    public static char nextGreatestLetter(char[] letters, char target) { return letters[0]; }\n}',
        solution: 'public class Solution {\n    public static char nextGreatestLetter(char[] letters, char target) {\n        int left = 0, right = letters.length - 1;\n        if (target >= letters[right]) return letters[0];\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (letters[mid] <= target) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return letters[left];\n    }\n}',
        examples: [{ input: 'letters = ["c","f","j"], target = "a"', output: 'c' }],
        testCases: [
          { input: '[c,f,j]\na', expectedOutput: 'c', isHidden: false, points: 8 }
        ],
        hints: ['Upper bound binary search', 'Wrap to first if no greater found'],
        tags: ['Array', 'Binary Search']
      },
      {
        topicId: 'day-25',
        title: 'Sum of Square Numbers',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Given non-negative integer c, return true if there exist integers a and b such that a² + b² = c.',
        starterCode: 'public class Solution {\n    public static boolean judgeSquareSum(int c) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean judgeSquareSum(int c) {\n        long left = 0, right = (long) Math.sqrt(c);\n        while (left <= right) {\n            long sum = left * left + right * right;\n            if (sum == c) {\n                return true;\n            } else if (sum < c) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'c = 5', output: 'true' }],
        testCases: [
          { input: '5', expectedOutput: 'true', isHidden: false, points: 10 }
        ],
        hints: ['Two pointers: 0 to sqrt(c)', 'Check if a² + b² equals c'],
        tags: ['Math', 'Two Pointers', 'Binary Search']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 26 - Bubble, Selection & Insertion Sort ====================
    const day26Topic = await Topic.findOneAndUpdate(
      { id: 'day-26' },
      {
        id: 'day-26',
        title: 'Bubble, Selection & Insertion Sort',
        description: 'Elementary sorting algorithms - O(n²) but fundamental.',
        week: 4,
        day: 26,
        difficulty: 'Easy',
        estimatedTime: 120,
        prerequisites: ['day-25'],
        compulsoryQuestion: 'Sort an Array (Bubble Sort)',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day26Topic.title}`);
    await Question.deleteMany({ topicId: 'day-26' });

    await Question.insertMany([
      {
        topicId: 'day-26',
        title: 'Sort an Array (Bubble Sort)',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 25,
        description: 'Sort array in ascending order using Bubble Sort. Implement the raw swapping mechanism.',
        starterCode: 'public class Solution {\n    public static int[] sortArray(int[] nums) { return nums; }\n}',
        solution: 'public class Solution {\n    public static int[] sortArray(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n - 1; i++) {\n            boolean swapped = false;\n            for (int j = 0; j < n - i - 1; j++) {\n                if (nums[j] > nums[j + 1]) {\n                    int temp = nums[j];\n                    nums[j] = nums[j + 1];\n                    nums[j + 1] = temp;\n                    swapped = true;\n                }\n            }\n            if (!swapped) break;\n        }\n        return nums;\n    }\n}',
        examples: [{ input: 'nums = [5,2,3,1]', output: '[1,2,3,5]' }],
        testCases: [
          { input: '[5,2,3,1]', expectedOutput: '[1,2,3,5]', isHidden: false, points: 8 }
        ],
        hints: ['Bubble largest to end in each pass', 'Optimize with swap flag'],
        tags: ['Array', 'Sorting']
      },
      {
        topicId: 'day-26',
        title: 'Sort an Array (Selection Sort)',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 25,
        description: 'Sort array using Selection Sort. Find minimum and swap to front repeatedly.',
        starterCode: 'public class Solution {\n    public static int[] sortArray(int[] nums) { return nums; }\n}',
        solution: 'public class Solution {\n    public static int[] sortArray(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n - 1; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) {\n                if (nums[j] < nums[minIdx]) {\n                    minIdx = j;\n                }\n            }\n            int temp = nums[i];\n            nums[i] = nums[minIdx];\n            nums[minIdx] = temp;\n        }\n        return nums;\n    }\n}',
        examples: [{ input: 'nums = [5,1,1,2,0,0]', output: '[0,0,1,1,2,5]' }],
        testCases: [
          { input: '[5,1,1,2,0,0]', expectedOutput: '[0,0,1,1,2,5]', isHidden: false, points: 8 }
        ],
        hints: ['Find minimum in unsorted part', 'Swap with current position'],
        tags: ['Array', 'Sorting']
      },
      {
        topicId: 'day-26',
        title: 'Sort an Array (Insertion Sort)',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 25,
        description: 'Sort array using Insertion Sort. Insert each element into correct position in sorted part.',
        starterCode: 'public class Solution {\n    public static int[] sortArray(int[] nums) { return nums; }\n}',
        solution: 'public class Solution {\n    public static int[] sortArray(int[] nums) {\n        for (int i = 1; i < nums.length; i++) {\n            int key = nums[i];\n            int j = i - 1;\n            while (j >= 0 && nums[j] > key) {\n                nums[j + 1] = nums[j];\n                j--;\n            }\n            nums[j + 1] = key;\n        }\n        return nums;\n    }\n}',
        examples: [{ input: 'nums = [5,2,3,1]', output: '[1,2,3,5]' }],
        testCases: [
          { input: '[5,2,3,1]', expectedOutput: '[1,2,3,5]', isHidden: false, points: 8 }
        ],
        hints: ['Pick element and insert into sorted part', 'Shift larger elements right'],
        tags: ['Array', 'Sorting']
      },
      {
        topicId: 'day-26',
        title: 'Insertion Sort List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Sort singly linked list using insertion sort algorithm.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode insertionSortList(ListNode head) { return head; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode insertionSortList(ListNode head) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode prev = dummy;\n            while (prev.next != null && prev.next.val < curr.val) {\n                prev = prev.next;\n            }\n            ListNode next = curr.next;\n            curr.next = prev.next;\n            prev.next = curr;\n            curr = next;\n        }\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [4,2,1,3]', output: '[1,2,3,4]' }],
        testCases: [
          { input: '[4,2,1,3]', expectedOutput: '[1,2,3,4]', isHidden: false, points: 12 }
        ],
        hints: ['Use dummy node', 'Find insertion position in sorted part'],
        tags: ['Linked List', 'Sorting']
      },
      {
        topicId: 'day-26',
        title: 'Height Checker',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Given heights array, return count of indices where heights[i] != expected[i] (expected is sorted version).',
        starterCode: 'public class Solution {\n    public static int heightChecker(int[] heights) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int heightChecker(int[] heights) {\n        int[] expected = heights.clone();\n        java.util.Arrays.sort(expected);\n        int count = 0;\n        for (int i = 0; i < heights.length; i++) {\n            if (heights[i] != expected[i]) {\n                count++;\n            }\n        }\n        return count;\n    }\n}',
        examples: [{ input: 'heights = [1,1,4,2,1,3]', output: '3' }],
        testCases: [
          { input: '[1,1,4,2,1,3]', expectedOutput: '3', isHidden: false, points: 8 }
        ],
        hints: ['Sort a copy', 'Compare with original'],
        tags: ['Array', 'Sorting']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 24-26 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays24to26();
