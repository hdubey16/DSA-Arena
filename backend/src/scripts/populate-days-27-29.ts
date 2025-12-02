import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays27to29() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 27 - Merge Sort & Quick Sort ====================
    const day27Topic = await Topic.findOneAndUpdate(
      { id: 'day-27' },
      {
        id: 'day-27',
        title: 'Merge Sort & Quick Sort',
        description: 'Divide and conquer sorting - O(n log n) algorithms.',
        week: 4,
        day: 27,
        difficulty: 'Medium',
        estimatedTime: 180,
        prerequisites: ['day-26'],
        compulsoryQuestion: 'Sort an Array (Merge Sort)',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day27Topic.title}`);
    await Question.deleteMany({ topicId: 'day-27' });

    await Question.insertMany([
      {
        topicId: 'day-27',
        title: 'Sort an Array (Merge Sort)',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 35,
        description: 'Sort array using Merge Sort. Implement recursive divide-and-conquer with merge logic.',
        starterCode: 'public class Solution {\n    public static int[] sortArray(int[] nums) { return nums; }\n}',
        solution: 'public class Solution {\n    public static int[] sortArray(int[] nums) {\n        if (nums.length <= 1) return nums;\n        mergeSort(nums, 0, nums.length - 1);\n        return nums;\n    }\n    private static void mergeSort(int[] nums, int left, int right) {\n        if (left < right) {\n            int mid = left + (right - left) / 2;\n            mergeSort(nums, left, mid);\n            mergeSort(nums, mid + 1, right);\n            merge(nums, left, mid, right);\n        }\n    }\n    private static void merge(int[] nums, int left, int mid, int right) {\n        int[] temp = new int[right - left + 1];\n        int i = left, j = mid + 1, k = 0;\n        while (i <= mid && j <= right) {\n            temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];\n        }\n        while (i <= mid) temp[k++] = nums[i++];\n        while (j <= right) temp[k++] = nums[j++];\n        for (i = 0; i < temp.length; i++) {\n            nums[left + i] = temp[i];\n        }\n    }\n}',
        examples: [{ input: 'nums = [5,1,1,2,0,0]', output: '[0,0,1,1,2,5]' }],
        testCases: [
          { input: '[5,1,1,2,0,0]', expectedOutput: '[0,0,1,1,2,5]', isHidden: false, points: 12 }
        ],
        hints: ['Recursively divide array in half', 'Merge two sorted halves'],
        tags: ['Array', 'Sorting', 'Divide and Conquer']
      },
      {
        topicId: 'day-27',
        title: 'Sort an Array (Quick Sort)',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 35,
        description: 'Sort array using Quick Sort with partition logic (Lomuto or Hoare scheme).',
        starterCode: 'public class Solution {\n    public static int[] sortArray(int[] nums) { return nums; }\n}',
        solution: 'public class Solution {\n    public static int[] sortArray(int[] nums) {\n        quickSort(nums, 0, nums.length - 1);\n        return nums;\n    }\n    private static void quickSort(int[] nums, int low, int high) {\n        if (low < high) {\n            int pi = partition(nums, low, high);\n            quickSort(nums, low, pi - 1);\n            quickSort(nums, pi + 1, high);\n        }\n    }\n    private static int partition(int[] nums, int low, int high) {\n        int pivot = nums[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (nums[j] <= pivot) {\n                i++;\n                int temp = nums[i];\n                nums[i] = nums[j];\n                nums[j] = temp;\n            }\n        }\n        int temp = nums[i + 1];\n        nums[i + 1] = nums[high];\n        nums[high] = temp;\n        return i + 1;\n    }\n}',
        examples: [{ input: 'nums = [5,2,3,1]', output: '[1,2,3,5]' }],
        testCases: [
          { input: '[5,2,3,1]', expectedOutput: '[1,2,3,5]', isHidden: false, points: 12 }
        ],
        hints: ['Choose pivot and partition', 'Recursively sort partitions'],
        tags: ['Array', 'Sorting', 'Divide and Conquer']
      },
      {
        topicId: 'day-27',
        title: 'Sort List (Merge Sort on Linked List)',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 40,
        description: 'Sort linked list in O(n log n) time. Use merge sort approach on linked list.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode sortList(ListNode head) { return head; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode sortList(ListNode head) {\n        if (head == null || head.next == null) return head;\n        ListNode mid = getMid(head);\n        ListNode left = sortList(head);\n        ListNode right = sortList(mid);\n        return merge(left, right);\n    }\n    private static ListNode getMid(ListNode head) {\n        ListNode slow = head, fast = head, prev = null;\n        while (fast != null && fast.next != null) {\n            prev = slow;\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        if (prev != null) prev.next = null;\n        return slow;\n    }\n    private static ListNode merge(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (l1 != null && l2 != null) {\n            if (l1.val < l2.val) {\n                curr.next = l1;\n                l1 = l1.next;\n            } else {\n                curr.next = l2;\n                l2 = l2.next;\n            }\n            curr = curr.next;\n        }\n        curr.next = (l1 != null) ? l1 : l2;\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [4,2,1,3]', output: '[1,2,3,4]' }],
        testCases: [
          { input: '[4,2,1,3]', expectedOutput: '[1,2,3,4]', isHidden: false, points: 15 }
        ],
        hints: ['Find middle using slow-fast pointers', 'Recursively sort and merge'],
        tags: ['Linked List', 'Sorting', 'Divide and Conquer']
      },
      {
        topicId: 'day-27',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Find kth largest element using QuickSelect algorithm. Avoid full sorting.',
        starterCode: 'public class Solution {\n    public static int findKthLargest(int[] nums, int k) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int findKthLargest(int[] nums, int k) {\n        return quickSelect(nums, 0, nums.length - 1, nums.length - k);\n    }\n    private static int quickSelect(int[] nums, int low, int high, int k) {\n        int pi = partition(nums, low, high);\n        if (pi == k) return nums[pi];\n        if (pi < k) return quickSelect(nums, pi + 1, high, k);\n        return quickSelect(nums, low, pi - 1, k);\n    }\n    private static int partition(int[] nums, int low, int high) {\n        int pivot = nums[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (nums[j] <= pivot) {\n                i++;\n                int temp = nums[i];\n                nums[i] = nums[j];\n                nums[j] = temp;\n            }\n        }\n        int temp = nums[i + 1];\n        nums[i + 1] = nums[high];\n        nums[high] = temp;\n        return i + 1;\n    }\n}',
        examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }],
        testCases: [
          { input: '[3,2,1,5,6,4]\n2', expectedOutput: '5', isHidden: false, points: 15 }
        ],
        hints: ['QuickSelect - partition and recurse one side', 'Average O(n) time'],
        tags: ['Array', 'Divide and Conquer', 'QuickSelect']
      },
      {
        topicId: 'day-27',
        title: 'Wiggle Sort II',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 45,
        description: 'Reorder array so nums[0] < nums[1] > nums[2] < nums[3]... Challenge: O(n) time, O(1) space.',
        starterCode: 'public class Solution {\n    public static void wiggleSort(int[] nums) {}\n}',
        solution: 'public class Solution {\n    public static void wiggleSort(int[] nums) {\n        int n = nums.length;\n        int[] temp = nums.clone();\n        java.util.Arrays.sort(temp);\n        int mid = (n + 1) / 2;\n        int j = mid - 1, k = n - 1;\n        for (int i = 0; i < n; i++) {\n            nums[i] = (i % 2 == 0) ? temp[j--] : temp[k--];\n        }\n    }\n}',
        examples: [{ input: 'nums = [1,5,1,1,6,4]', output: '[1,6,1,5,1,4]' }],
        testCases: [
          { input: '[1,5,1,1,6,4]', expectedOutput: '[1,6,1,5,1,4]', isHidden: false, points: 18 }
        ],
        hints: ['Sort and interleave small/large values', 'Advanced: Virtual indexing for O(1) space'],
        tags: ['Array', 'Sorting', 'Divide and Conquer']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 28 - Partition & Kth Smallest ====================
    const day28Topic = await Topic.findOneAndUpdate(
      { id: 'day-28' },
      {
        id: 'day-28',
        title: 'Partition Schemes & Kth Smallest',
        description: 'Dutch National Flag, QuickSelect, and order statistics.',
        week: 5,
        day: 28,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-27'],
        compulsoryQuestion: 'Sort Colors',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day28Topic.title}`);
    await Question.deleteMany({ topicId: 'day-28' });

    await Question.insertMany([
      {
        topicId: 'day-28',
        title: 'Sort Colors',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Sort array with red(0), white(1), blue(2) in-place. Dutch National Flag algorithm.',
        starterCode: 'public class Solution {\n    public static void sortColors(int[] nums) {}\n}',
        solution: 'public class Solution {\n    public static void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                int temp = nums[low];\n                nums[low++] = nums[mid];\n                nums[mid++] = temp;\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                int temp = nums[high];\n                nums[high--] = nums[mid];\n                nums[mid] = temp;\n            }\n        }\n    }\n}',
        examples: [{ input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' }],
        testCases: [
          { input: '[2,0,2,1,1,0]', expectedOutput: '[0,0,1,1,2,2]', isHidden: false, points: 10 }
        ],
        hints: ['Three pointers: low, mid, high', '0s to left, 2s to right, 1s in middle'],
        tags: ['Array', 'Two Pointers', 'Sorting']
      },
      {
        topicId: 'day-28',
        title: 'Kth Smallest Element in a Sorted Matrix',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Given n×n matrix with sorted rows and columns, return kth smallest element.',
        starterCode: 'public class Solution {\n    public static int kthSmallest(int[][] matrix, int k) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int kthSmallest(int[][] matrix, int k) {\n        int n = matrix.length;\n        int left = matrix[0][0], right = matrix[n - 1][n - 1];\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            int count = 0, j = n - 1;\n            for (int i = 0; i < n; i++) {\n                while (j >= 0 && matrix[i][j] > mid) j--;\n                count += (j + 1);\n            }\n            if (count < k) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return left;\n    }\n}',
        examples: [{ input: 'matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8', output: '13' }],
        testCases: [
          { input: '[[1,5,9],[10,11,13],[12,13,15]]\n8', expectedOutput: '13', isHidden: false, points: 15 }
        ],
        hints: ['Binary search on value range', 'Count elements ≤ mid'],
        tags: ['Array', 'Binary Search', 'Matrix', 'Sorting']
      },
      {
        topicId: 'day-28',
        title: 'Top K Frequent Elements',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Return k most frequent elements. Can use Bucket Sort for O(n) solution.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] topKFrequent(int[] nums, int k) { return new int[k]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int num : nums) {\n            map.put(num, map.getOrDefault(num, 0) + 1);\n        }\n        List<Integer>[] buckets = new List[nums.length + 1];\n        for (int key : map.keySet()) {\n            int freq = map.get(key);\n            if (buckets[freq] == null) {\n                buckets[freq] = new ArrayList<>();\n            }\n            buckets[freq].add(key);\n        }\n        int[] result = new int[k];\n        int idx = 0;\n        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {\n            if (buckets[i] != null) {\n                for (int num : buckets[i]) {\n                    result[idx++] = num;\n                    if (idx == k) break;\n                }\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' }],
        testCases: [
          { input: '[1,1,1,2,2,3]\n2', expectedOutput: '[1,2]', isHidden: false, points: 12 }
        ],
        hints: ['Count frequencies with HashMap', 'Bucket sort by frequency'],
        tags: ['Array', 'Hash Table', 'Sorting', 'Bucket Sort']
      },
      {
        topicId: 'day-28',
        title: 'Third Maximum Number',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Return third distinct maximum. If not exists, return maximum.',
        starterCode: 'public class Solution {\n    public static int thirdMax(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int thirdMax(int[] nums) {\n        Integer first = null, second = null, third = null;\n        for (Integer num : nums) {\n            if (num.equals(first) || num.equals(second) || num.equals(third)) continue;\n            if (first == null || num > first) {\n                third = second;\n                second = first;\n                first = num;\n            } else if (second == null || num > second) {\n                third = second;\n                second = num;\n            } else if (third == null || num > third) {\n                third = num;\n            }\n        }\n        return third == null ? first : third;\n    }\n}',
        examples: [{ input: 'nums = [2,2,3,1]', output: '1' }],
        testCases: [
          { input: '[2,2,3,1]', expectedOutput: '1', isHidden: false, points: 8 }
        ],
        hints: ['Track top 3 distinct values', 'Use Integer to handle nulls'],
        tags: ['Array', 'Sorting']
      },
      {
        topicId: 'day-28',
        title: 'Array Partition',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Group 2n integers into n pairs to maximize sum of min(ai, bi).',
        starterCode: 'public class Solution {\n    public static int arrayPairSum(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int arrayPairSum(int[] nums) {\n        java.util.Arrays.sort(nums);\n        int sum = 0;\n        for (int i = 0; i < nums.length; i += 2) {\n            sum += nums[i];\n        }\n        return sum;\n    }\n}',
        examples: [{ input: 'nums = [1,4,3,2]', output: '4' }],
        testCases: [
          { input: '[1,4,3,2]', expectedOutput: '4', isHidden: false, points: 8 }
        ],
        hints: ['Sort array', 'Pair adjacent elements, sum every other element'],
        tags: ['Array', 'Greedy', 'Sorting']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 29 - Heap, Counting & Radix Sort ====================
    const day29Topic = await Topic.findOneAndUpdate(
      { id: 'day-29' },
      {
        id: 'day-29',
        title: 'Heap, Counting & Radix Sort',
        description: 'Non-comparative sorting and heap fundamentals.',
        week: 5,
        day: 29,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-28'],
        compulsoryQuestion: 'Relative Sort Array',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day29Topic.title}`);
    await Question.deleteMany({ topicId: 'day-29' });

    await Question.insertMany([
      {
        topicId: 'day-29',
        title: 'Relative Sort Array',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Sort arr1 by relative ordering in arr2. Elements not in arr2 go at end in ascending order.',
        starterCode: 'public class Solution {\n    public static int[] relativeSortArray(int[] arr1, int[] arr2) { return new int[arr1.length]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] relativeSortArray(int[] arr1, int[] arr2) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int num : arr1) {\n            count.put(num, count.getOrDefault(num, 0) + 1);\n        }\n        int idx = 0;\n        for (int num : arr2) {\n            while (count.getOrDefault(num, 0) > 0) {\n                arr1[idx++] = num;\n                count.put(num, count.get(num) - 1);\n            }\n            count.remove(num);\n        }\n        List<Integer> remaining = new ArrayList<>();\n        for (int num : count.keySet()) {\n            for (int i = 0; i < count.get(num); i++) {\n                remaining.add(num);\n            }\n        }\n        Collections.sort(remaining);\n        for (int num : remaining) {\n            arr1[idx++] = num;\n        }\n        return arr1;\n    }\n}',
        examples: [{ input: 'arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]', output: '[2,2,2,1,4,3,3,9,6,7,19]' }],
        testCases: [
          { input: '[2,3,1,3,2,4,6,7,9,2,19]\n[2,1,4,3,9,6]', expectedOutput: '[2,2,2,1,4,3,3,9,6,7,19]', isHidden: false, points: 10 }
        ],
        hints: ['Count frequencies', 'Place by arr2 order, then sort remainder'],
        tags: ['Array', 'Hash Table', 'Sorting', 'Counting Sort']
      },
      {
        topicId: 'day-29',
        title: 'Sort Characters By Frequency',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 25,
        description: 'Sort string by character frequency in decreasing order.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String frequencySort(String s) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String frequencySort(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        for (char c : s.toCharArray()) {\n            map.put(c, map.getOrDefault(c, 0) + 1);\n        }\n        List<Character>[] buckets = new List[s.length() + 1];\n        for (char c : map.keySet()) {\n            int freq = map.get(c);\n            if (buckets[freq] == null) {\n                buckets[freq] = new ArrayList<>();\n            }\n            buckets[freq].add(c);\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = buckets.length - 1; i >= 0; i--) {\n            if (buckets[i] != null) {\n                for (char c : buckets[i]) {\n                    for (int j = 0; j < i; j++) {\n                        sb.append(c);\n                    }\n                }\n            }\n        }\n        return sb.toString();\n    }\n}',
        examples: [{ input: 's = "tree"', output: '"eert"' }],
        testCases: [
          { input: 'tree', expectedOutput: 'eert', isHidden: false, points: 12 }
        ],
        hints: ['Count frequencies', 'Bucket sort by frequency'],
        tags: ['String', 'Hash Table', 'Sorting', 'Bucket Sort']
      },
      {
        topicId: 'day-29',
        title: 'Maximum Gap',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 45,
        description: 'Find max difference between successive elements in sorted form. Linear time and space required.',
        starterCode: 'public class Solution {\n    public static int maximumGap(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int maximumGap(int[] nums) {\n        if (nums.length < 2) return 0;\n        int min = nums[0], max = nums[0];\n        for (int num : nums) {\n            min = Math.min(min, num);\n            max = Math.max(max, num);\n        }\n        int n = nums.length;\n        int bucketSize = Math.max(1, (max - min) / (n - 1));\n        int bucketCount = (max - min) / bucketSize + 1;\n        int[] bucketMin = new int[bucketCount];\n        int[] bucketMax = new int[bucketCount];\n        java.util.Arrays.fill(bucketMin, Integer.MAX_VALUE);\n        java.util.Arrays.fill(bucketMax, Integer.MIN_VALUE);\n        for (int num : nums) {\n            int idx = (num - min) / bucketSize;\n            bucketMin[idx] = Math.min(bucketMin[idx], num);\n            bucketMax[idx] = Math.max(bucketMax[idx], num);\n        }\n        int maxGap = 0, prev = bucketMax[0];\n        for (int i = 1; i < bucketCount; i++) {\n            if (bucketMin[i] == Integer.MAX_VALUE) continue;\n            maxGap = Math.max(maxGap, bucketMin[i] - prev);\n            prev = bucketMax[i];\n        }\n        return maxGap;\n    }\n}',
        examples: [{ input: 'nums = [3,6,9,1]', output: '3' }],
        testCases: [
          { input: '[3,6,9,1]', expectedOutput: '3', isHidden: false, points: 18 }
        ],
        hints: ['Bucket sort approach', 'Pigeonhole principle for max gap'],
        tags: ['Array', 'Sorting', 'Bucket Sort']
      },
      {
        topicId: 'day-29',
        title: 'H-Index',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Compute h-index: h papers with at least h citations each. Use counting sort for O(n).',
        starterCode: 'public class Solution {\n    public static int hIndex(int[] citations) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int hIndex(int[] citations) {\n        int n = citations.length;\n        int[] buckets = new int[n + 1];\n        for (int c : citations) {\n            if (c >= n) {\n                buckets[n]++;\n            } else {\n                buckets[c]++;\n            }\n        }\n        int count = 0;\n        for (int i = n; i >= 0; i--) {\n            count += buckets[i];\n            if (count >= i) {\n                return i;\n            }\n        }\n        return 0;\n    }\n}',
        examples: [{ input: 'citations = [3,0,6,1,5]', output: '3' }],
        testCases: [
          { input: '[3,0,6,1,5]', expectedOutput: '3', isHidden: false, points: 12 }
        ],
        hints: ['Count papers by citation count', 'Find largest h where count ≥ h'],
        tags: ['Array', 'Sorting', 'Counting Sort']
      },
      {
        topicId: 'day-29',
        title: 'K Closest Points to Origin',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Return k closest points to origin (0,0) by Euclidean distance.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[][] kClosest(int[][] points, int k) { return new int[k][2]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[][] kClosest(int[][] points, int k) {\n        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> \n            (b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1])\n        );\n        for (int[] point : points) {\n            heap.offer(point);\n            if (heap.size() > k) {\n                heap.poll();\n            }\n        }\n        int[][] result = new int[k][2];\n        for (int i = 0; i < k; i++) {\n            result[i] = heap.poll();\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]' }],
        testCases: [
          { input: '[[1,3],[-2,2]]\n1', expectedOutput: '[[-2,2]]', isHidden: false, points: 12 }
        ],
        hints: ['Use max heap of size k', 'Distance = x² + y²'],
        tags: ['Array', 'Math', 'Heap', 'Sorting']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 27-29 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays27to29();
