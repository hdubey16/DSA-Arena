import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays17to19() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 17 ====================
    const day17Topic = await Topic.findOneAndUpdate(
      { id: 'day-17' },
      {
        id: 'day-17',
        title: 'Stock Buy/Sell & Trapping Rainwater',
        description: 'Harder array problems involving pre-computation or two-pointer approaches.',
        week: 3,
        day: 17,
        difficulty: 'Hard',
        estimatedTime: 150,
        prerequisites: ['day-16'],
        compulsoryQuestion: 'Best Time to Buy and Sell Stock II',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day17Topic.title}`);
    await Question.deleteMany({ topicId: 'day-17' });

    const day17Questions = [
      {
        topicId: 'day-17',
        title: 'Best Time to Buy and Sell Stock II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: `You can buy and sell stock multiple times (but hold at most one share at a time). Find the maximum profit.

**Example:** prices = [7,1,5,3,6,4] → Output: 7`,
        starterCode: `public class Solution {\n    public static int maxProfit(int[] prices) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] prices = {7, 1, 5, 3, 6, 4};\n        System.out.println(maxProfit(prices));\n    }\n}`,
        solution: `public class Solution {\n    public static int maxProfit(int[] prices) {\n        int profit = 0;\n        for (int i = 1; i < prices.length; i++) {\n            if (prices[i] > prices[i - 1]) {\n                profit += prices[i] - prices[i - 1];\n            }\n        }\n        return profit;\n    }\n    \n    public static void main(String[] args) {\n        int[] prices = {7, 1, 5, 3, 6, 4};\n        System.out.println(maxProfit(prices));\n    }\n}`,
        examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '7' }],
        testCases: [
          { input: '[7,1,5,3,6,4]', expectedOutput: '7', isHidden: false, points: 10 },
          { input: '[1,2,3,4,5]', expectedOutput: '4', isHidden: true, points: 10 }
        ],
        hints: ['Add all positive differences', 'Buy before every increase'],
        tags: ['Array', 'Greedy']
      },
      {
        topicId: 'day-17',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 40,
        description: `Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.

**Example:** height = [0,1,0,2,1,0,1,3,2,1,2,1] → Output: 6`,
        starterCode: `public class Solution {\n    public static int trap(int[] height) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n        System.out.println(trap(height));\n    }\n}`,
        solution: `public class Solution {\n    public static int trap(int[] height) {\n        if (height.length == 0) return 0;\n        int left = 0, right = height.length - 1;\n        int leftMax = 0, rightMax = 0;\n        int water = 0;\n        \n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) {\n                    leftMax = height[left];\n                } else {\n                    water += leftMax - height[left];\n                }\n                left++;\n            } else {\n                if (height[right] >= rightMax) {\n                    rightMax = height[right];\n                } else {\n                    water += rightMax - height[right];\n                }\n                right--;\n            }\n        }\n        return water;\n    }\n    \n    public static void main(String[] args) {\n        int[] height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n        System.out.println(trap(height));\n    }\n}`,
        examples: [{ input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }],
        testCases: [
          { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', isHidden: false, points: 15 },
          { input: '[4,2,0,3,2,5]', expectedOutput: '9', isHidden: true, points: 15 }
        ],
        hints: ['Two pointers approach', 'Track leftMax and rightMax'],
        tags: ['Array', 'Two Pointers', 'Stack']
      },
      {
        topicId: 'day-17',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Find two lines that form a container with the most water.

**Example:** height = [1,8,6,2,5,4,8,3,7] → Output: 49`,
        starterCode: `public class Solution {\n    public static int maxArea(int[] height) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n        System.out.println(maxArea(height));\n    }\n}`,
        solution: `public class Solution {\n    public static int maxArea(int[] height) {\n        int left = 0, right = height.length - 1;\n        int maxArea = 0;\n        \n        while (left < right) {\n            int area = Math.min(height[left], height[right]) * (right - left);\n            maxArea = Math.max(maxArea, area);\n            \n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        \n        return maxArea;\n    }\n    \n    public static void main(String[] args) {\n        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n        System.out.println(maxArea(height));\n    }\n}`,
        examples: [{ input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' }],
        testCases: [
          { input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49', isHidden: false, points: 12 },
          { input: '[1,1]', expectedOutput: '1', isHidden: true, points: 13 }
        ],
        hints: ['Two pointers from both ends', 'Move pointer with smaller height'],
        tags: ['Array', 'Two Pointers', 'Greedy']
      },
      {
        topicId: 'day-17',
        title: 'Best Time to Buy and Sell Stock III',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 40,
        description: `Find maximum profit with at most two transactions.

**Example:** prices = [3,3,5,0,0,3,1,4] → Output: 6`,
        starterCode: `public class Solution {\n    public static int maxProfit(int[] prices) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] prices = {3, 3, 5, 0, 0, 3, 1, 4};\n        System.out.println(maxProfit(prices));\n    }\n}`,
        solution: `public class Solution {\n    public static int maxProfit(int[] prices) {\n        int buy1 = Integer.MAX_VALUE, buy2 = Integer.MAX_VALUE;\n        int profit1 = 0, profit2 = 0;\n        \n        for (int price : prices) {\n            buy1 = Math.min(buy1, price);\n            profit1 = Math.max(profit1, price - buy1);\n            buy2 = Math.min(buy2, price - profit1);\n            profit2 = Math.max(profit2, price - buy2);\n        }\n        \n        return profit2;\n    }\n    \n    public static void main(String[] args) {\n        int[] prices = {3, 3, 5, 0, 0, 3, 1, 4};\n        System.out.println(maxProfit(prices));\n    }\n}`,
        examples: [{ input: 'prices = [3,3,5,0,0,3,1,4]', output: '6' }],
        testCases: [
          { input: '[3,3,5,0,0,3,1,4]', expectedOutput: '6', isHidden: false, points: 15 },
          { input: '[1,2,3,4,5]', expectedOutput: '4', isHidden: true, points: 15 }
        ],
        hints: ['Track two buy prices and two profits', 'Process sequentially'],
        tags: ['Array', 'Dynamic Programming']
      },
      {
        topicId: 'day-17',
        title: 'Gas Station',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Find the starting gas station index to complete the circular route. Return -1 if impossible.

**Example:** gas = [1,2,3,4,5], cost = [3,4,5,1,2] → Output: 3`,
        starterCode: `public class Solution {\n    public static int canCompleteCircuit(int[] gas, int[] cost) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] gas = {1, 2, 3, 4, 5};\n        int[] cost = {3, 4, 5, 1, 2};\n        System.out.println(canCompleteCircuit(gas, cost));\n    }\n}`,
        solution: `public class Solution {\n    public static int canCompleteCircuit(int[] gas, int[] cost) {\n        int totalGas = 0, totalCost = 0;\n        int tank = 0, start = 0;\n        \n        for (int i = 0; i < gas.length; i++) {\n            totalGas += gas[i];\n            totalCost += cost[i];\n            tank += gas[i] - cost[i];\n            \n            if (tank < 0) {\n                start = i + 1;\n                tank = 0;\n            }\n        }\n        \n        return totalGas < totalCost ? -1 : start;\n    }\n    \n    public static void main(String[] args) {\n        int[] gas = {1, 2, 3, 4, 5};\n        int[] cost = {3, 4, 5, 1, 2};\n        System.out.println(canCompleteCircuit(gas, cost));\n    }\n}`,
        examples: [{ input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3' }],
        testCases: [
          { input: '[1,2,3,4,5]\n[3,4,5,1,2]', expectedOutput: '3', isHidden: false, points: 12 },
          { input: '[2,3,4]\n[3,4,3]', expectedOutput: '-1', isHidden: true, points: 13 }
        ],
        hints: ['If total gas < total cost, impossible', 'Greedy: reset start when tank < 0'],
        tags: ['Array', 'Greedy']
      }
    ];

    for (const q of day17Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    // ==================== DAY 18 ====================
    const day18Topic = await Topic.findOneAndUpdate(
      { id: 'day-18' },
      {
        id: 'day-18',
        title: "Kadane's Algorithm & Max Consecutive",
        description: 'Subarray problems (contiguous elements).',
        week: 3,
        day: 18,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-17'],
        compulsoryQuestion: 'Maximum Subarray',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`\n✅ ${day18Topic.title}`);
    await Question.deleteMany({ topicId: 'day-18' });

    const day18Questions = [
      {
        topicId: 'day-18',
        title: 'Maximum Subarray',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: `Find the subarray with the largest sum (Kadane's Algorithm).

**Example:** nums = [-2,1,-3,4,-1,2,1,-5,4] → Output: 6 (subarray [4,-1,2,1])`,
        starterCode: `public class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(maxSubArray(nums));\n    }\n}`,
        solution: `public class Solution {\n    public static int maxSubArray(int[] nums) {\n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        \n        for (int i = 1; i < nums.length; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        \n        return maxSum;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(maxSubArray(nums));\n    }\n}`,
        examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' }],
        testCases: [
          { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', isHidden: false, points: 10 },
          { input: '[1]', expectedOutput: '1', isHidden: true, points: 10 }
        ],
        hints: ["Kadane's Algorithm", 'Track current sum and max sum'],
        tags: ['Array', 'Dynamic Programming', 'Divide and Conquer']
      },
      {
        topicId: 'day-18',
        title: 'Maximum Sum Circular Subarray',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Find max subarray sum in a circular array.

**Example:** nums = [5,-3,5] → Output: 10`,
        starterCode: `public class Solution {\n    public static int maxSubarraySumCircular(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {5, -3, 5};\n        System.out.println(maxSubarraySumCircular(nums));\n    }\n}`,
        solution: `public class Solution {\n    public static int maxSubarraySumCircular(int[] nums) {\n        int maxKadane = kadane(nums);\n        int totalSum = 0;\n        \n        for (int i = 0; i < nums.length; i++) {\n            totalSum += nums[i];\n            nums[i] = -nums[i];\n        }\n        \n        int maxWrap = totalSum + kadane(nums);\n        \n        if (maxWrap == 0) return maxKadane;\n        return Math.max(maxKadane, maxWrap);\n    }\n    \n    private static int kadane(int[] nums) {\n        int max = nums[0], current = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            current = Math.max(nums[i], current + nums[i]);\n            max = Math.max(max, current);\n        }\n        return max;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {5, -3, 5};\n        System.out.println(maxSubarraySumCircular(nums));\n    }\n}`,
        examples: [{ input: 'nums = [5,-3,5]', output: '10' }],
        testCases: [
          { input: '[5,-3,5]', expectedOutput: '10', isHidden: false, points: 12 },
          { input: '[1,-2,3,-2]', expectedOutput: '3', isHidden: true, points: 13 }
        ],
        hints: ['Max = max(normalKadane, totalSum - minSubarray)', 'Handle all negative case'],
        tags: ['Array', 'Dynamic Programming']
      },
      {
        topicId: 'day-18',
        title: 'Maximum Product Subarray',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Find subarray with largest product.

**Example:** nums = [2,3,-2,4] → Output: 6`,
        starterCode: `public class Solution {\n    public static int maxProduct(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {2, 3, -2, 4};\n        System.out.println(maxProduct(nums));\n    }\n}`,
        solution: `public class Solution {\n    public static int maxProduct(int[] nums) {\n        int maxProd = nums[0];\n        int minProd = nums[0];\n        int result = nums[0];\n        \n        for (int i = 1; i < nums.length; i++) {\n            int temp = maxProd;\n            maxProd = Math.max(nums[i], Math.max(maxProd * nums[i], minProd * nums[i]));\n            minProd = Math.min(nums[i], Math.min(temp * nums[i], minProd * nums[i]));\n            result = Math.max(result, maxProd);\n        }\n        \n        return result;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {2, 3, -2, 4};\n        System.out.println(maxProduct(nums));\n    }\n}`,
        examples: [{ input: 'nums = [2,3,-2,4]', output: '6' }],
        testCases: [
          { input: '[2,3,-2,4]', expectedOutput: '6', isHidden: false, points: 12 },
          { input: '[-2,0,-1]', expectedOutput: '0', isHidden: true, points: 13 }
        ],
        hints: ['Track both max and min products', 'Negative * negative = positive'],
        tags: ['Array', 'Dynamic Programming']
      },
      {
        topicId: 'day-18',
        title: 'Max Consecutive Ones',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: `Return the maximum number of consecutive 1's in a binary array.

**Example:** nums = [1,1,0,1,1,1] → Output: 3`,
        starterCode: `public class Solution {\n    public static int findMaxConsecutiveOnes(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 1, 0, 1, 1, 1};\n        System.out.println(findMaxConsecutiveOnes(nums));\n    }\n}`,
        solution: `public class Solution {\n    public static int findMaxConsecutiveOnes(int[] nums) {\n        int max = 0, current = 0;\n        for (int num : nums) {\n            if (num == 1) {\n                current++;\n                max = Math.max(max, current);\n            } else {\n                current = 0;\n            }\n        }\n        return max;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 1, 0, 1, 1, 1};\n        System.out.println(findMaxConsecutiveOnes(nums));\n    }\n}`,
        examples: [{ input: 'nums = [1,1,0,1,1,1]', output: '3' }],
        testCases: [
          { input: '[1,1,0,1,1,1]', expectedOutput: '3', isHidden: false, points: 8 },
          { input: '[1,0,1,1,0,1]', expectedOutput: '2', isHidden: true, points: 7 }
        ],
        hints: ['Track current consecutive count', 'Reset on 0'],
        tags: ['Array']
      },
      {
        topicId: 'day-18',
        title: 'Longest Continuous Increasing Subsequence',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: `Return the length of the longest continuous increasing subsequence.

**Example:** nums = [1,3,5,4,7] → Output: 3`,
        starterCode: `public class Solution {\n    public static int findLengthOfLCIS(int[] nums) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 3, 5, 4, 7};\n        System.out.println(findLengthOfLCIS(nums));\n    }\n}`,
        solution: `public class Solution {\n    public static int findLengthOfLCIS(int[] nums) {\n        if (nums.length == 0) return 0;\n        int max = 1, current = 1;\n        \n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] > nums[i - 1]) {\n                current++;\n                max = Math.max(max, current);\n            } else {\n                current = 1;\n            }\n        }\n        \n        return max;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 3, 5, 4, 7};\n        System.out.println(findLengthOfLCIS(nums));\n    }\n}`,
        examples: [{ input: 'nums = [1,3,5,4,7]', output: '3' }],
        testCases: [
          { input: '[1,3,5,4,7]', expectedOutput: '3', isHidden: false, points: 8 },
          { input: '[2,2,2,2,2]', expectedOutput: '1', isHidden: true, points: 7 }
        ],
        hints: ['Compare with previous element', 'Reset count when not increasing'],
        tags: ['Array']
      }
    ];

    for (const q of day18Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    // ==================== DAY 19 ====================
    const day19Topic = await Topic.findOneAndUpdate(
      { id: 'day-19' },
      {
        id: 'day-19',
        title: 'Sliding Window Technique',
        description: 'Fixed and variable size window problems.',
        week: 3,
        day: 19,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-18'],
        compulsoryQuestion: 'Maximum Average Subarray I',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`\n✅ ${day19Topic.title}`);
    await Question.deleteMany({ topicId: 'day-19' });

    const day19Questions = [
      {
        topicId: 'day-19',
        title: 'Maximum Average Subarray I',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: `Find contiguous subarray of length k with maximum average.

**Example:** nums = [1,12,-5,-6,50,3], k = 4 → Output: 12.75`,
        starterCode: `public class Solution {\n    public static double findMaxAverage(int[] nums, int k) {\n        // Your code here\n        return 0.0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 12, -5, -6, 50, 3};\n        System.out.println(findMaxAverage(nums, 4));\n    }\n}`,
        solution: `public class Solution {\n    public static double findMaxAverage(int[] nums, int k) {\n        int sum = 0;\n        for (int i = 0; i < k; i++) {\n            sum += nums[i];\n        }\n        \n        int maxSum = sum;\n        for (int i = k; i < nums.length; i++) {\n            sum = sum - nums[i - k] + nums[i];\n            maxSum = Math.max(maxSum, sum);\n        }\n        \n        return (double) maxSum / k;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 12, -5, -6, 50, 3};\n        System.out.println(findMaxAverage(nums, 4));\n    }\n}`,
        examples: [{ input: 'nums = [1,12,-5,-6,50,3], k = 4', output: '12.75' }],
        testCases: [
          { input: '[1,12,-5,-6,50,3]\n4', expectedOutput: '12.75', isHidden: false, points: 8 },
          { input: '[5]\n1', expectedOutput: '5.0', isHidden: true, points: 7 }
        ],
        hints: ['Sliding window of size k', 'Update sum by removing left and adding right'],
        tags: ['Array', 'Sliding Window']
      },
      {
        topicId: 'day-19',
        title: 'Maximum Sum of Distinct Subarrays With Length K',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Find max sum of subarray of length k with all distinct elements.

**Example:** nums = [1,5,4,2,9,9,9], k = 3 → Output: 15`,
        starterCode: `import java.util.*;\n\npublic class Solution {\n    public static long maximumSubarraySum(int[] nums, int k) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 5, 4, 2, 9, 9, 9};\n        System.out.println(maximumSubarraySum(nums, 3));\n    }\n}`,
        solution: `import java.util.*;\n\npublic class Solution {\n    public static long maximumSubarraySum(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        long sum = 0, maxSum = 0;\n        \n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n            map.put(nums[i], map.getOrDefault(nums[i], 0) + 1);\n            \n            if (i >= k) {\n                int left = nums[i - k];\n                sum -= left;\n                map.put(left, map.get(left) - 1);\n                if (map.get(left) == 0) map.remove(left);\n            }\n            \n            if (i >= k - 1 && map.size() == k) {\n                maxSum = Math.max(maxSum, sum);\n            }\n        }\n        \n        return maxSum;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 5, 4, 2, 9, 9, 9};\n        System.out.println(maximumSubarraySum(nums, 3));\n    }\n}`,
        examples: [{ input: 'nums = [1,5,4,2,9,9,9], k = 3', output: '15' }],
        testCases: [
          { input: '[1,5,4,2,9,9,9]\n3', expectedOutput: '15', isHidden: false, points: 12 },
          { input: '[4,4,4]\n3', expectedOutput: '0', isHidden: true, points: 13 }
        ],
        hints: ['Use HashMap to track frequencies', 'Check if map size equals k'],
        tags: ['Array', 'Sliding Window', 'Hash Table']
      },
      {
        topicId: 'day-19',
        title: 'Permutation in String',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Check if s2 contains any permutation of s1.

**Example:** s1 = "ab", s2 = "eidbaooo" → Output: true`,
        starterCode: `public class Solution {\n    public static boolean checkInclusion(String s1, String s2) {\n        // Your code here\n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(checkInclusion("ab", "eidbaooo"));\n    }\n}`,
        solution: `public class Solution {\n    public static boolean checkInclusion(String s1, String s2) {\n        if (s1.length() > s2.length()) return false;\n        \n        int[] s1Count = new int[26];\n        int[] s2Count = new int[26];\n        \n        for (char c : s1.toCharArray()) {\n            s1Count[c - 'a']++;\n        }\n        \n        for (int i = 0; i < s2.length(); i++) {\n            s2Count[s2.charAt(i) - 'a']++;\n            \n            if (i >= s1.length()) {\n                s2Count[s2.charAt(i - s1.length()) - 'a']--;\n            }\n            \n            if (matches(s1Count, s2Count)) return true;\n        }\n        \n        return false;\n    }\n    \n    private static boolean matches(int[] s1Count, int[] s2Count) {\n        for (int i = 0; i < 26; i++) {\n            if (s1Count[i] != s2Count[i]) return false;\n        }\n        return true;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(checkInclusion("ab", "eidbaooo"));\n    }\n}`,
        examples: [{ input: 's1 = "ab", s2 = "eidbaooo"', output: 'true' }],
        testCases: [
          { input: 'ab\neidbaooo', expectedOutput: 'true', isHidden: false, points: 12 },
          { input: 'ab\neidboaoo', expectedOutput: 'false', isHidden: true, points: 13 }
        ],
        hints: ['Sliding window of s1 length', 'Compare character frequencies'],
        tags: ['String', 'Sliding Window', 'Hash Table']
      },
      {
        topicId: 'day-19',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Find length of longest substring without repeating characters.

**Example:** s = "abcabcbb" → Output: 3`,
        starterCode: `import java.util.*;\n\npublic class Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(lengthOfLongestSubstring("abcabcbb"));\n    }\n}`,
        solution: `import java.util.*;\n\npublic class Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        int maxLen = 0, left = 0;\n        \n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (map.containsKey(c)) {\n                left = Math.max(left, map.get(c) + 1);\n            }\n            map.put(c, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        \n        return maxLen;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(lengthOfLongestSubstring("abcabcbb"));\n    }\n}`,
        examples: [{ input: 's = "abcabcbb"', output: '3' }],
        testCases: [
          { input: 'abcabcbb', expectedOutput: '3', isHidden: false, points: 12 },
          { input: 'bbbbb', expectedOutput: '1', isHidden: true, points: 13 }
        ],
        hints: ['Variable size sliding window', 'Use HashMap to track last seen index'],
        tags: ['String', 'Sliding Window', 'Hash Table']
      },
      {
        topicId: 'day-19',
        title: 'Minimum Size Subarray Sum',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Find minimal length subarray with sum >= target.

**Example:** target = 7, nums = [2,3,1,2,4,3] → Output: 2`,
        starterCode: `public class Solution {\n    public static int minSubArrayLen(int target, int[] nums) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {2, 3, 1, 2, 4, 3};\n        System.out.println(minSubArrayLen(7, nums));\n    }\n}`,
        solution: `public class Solution {\n    public static int minSubArrayLen(int target, int[] nums) {\n        int left = 0, sum = 0;\n        int minLen = Integer.MAX_VALUE;\n        \n        for (int right = 0; right < nums.length; right++) {\n            sum += nums[right];\n            \n            while (sum >= target) {\n                minLen = Math.min(minLen, right - left + 1);\n                sum -= nums[left++];\n            }\n        }\n        \n        return minLen == Integer.MAX_VALUE ? 0 : minLen;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {2, 3, 1, 2, 4, 3};\n        System.out.println(minSubArrayLen(7, nums));\n    }\n}`,
        examples: [{ input: 'target = 7, nums = [2,3,1,2,4,3]', output: '2' }],
        testCases: [
          { input: '7\n[2,3,1,2,4,3]', expectedOutput: '2', isHidden: false, points: 12 },
          { input: '11\n[1,1,1,1,1,1,1,1]', expectedOutput: '0', isHidden: true, points: 13 }
        ],
        hints: ['Variable size window', 'Shrink from left when sum >= target'],
        tags: ['Array', 'Sliding Window', 'Binary Search']
      }
    ];

    for (const q of day19Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    console.log(`\n🎉 Days 17-19 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays17to19();
