import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question";
import Topic from "../models/Topic";

dotenv.config();

const topics = [
  {
    id: "96",
    title: "Day 96 – Longest Increasing Subsequence (LIS)",
    description: "Patience Sorting / Binary Search variations for LIS problems",
    week: 14,
    day: 96,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["DP", "Binary Search"],
    compulsoryQuestion: "Longest Increasing Subsequence",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "97",
    title: "Day 97 – 0/1 Knapsack Problem",
    description: "Standard 0/1 Knapsack DP with subset selection variations",
    week: 14,
    day: 97,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["DP", "Knapsack"],
    compulsoryQuestion: "Partition Equal Subset Sum",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "98",
    title: "Day 98 – Subset Sum Problem",
    description: "0/1 Knapsack variations with multiple targets and constraints",
    week: 14,
    day: 98,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["DP", "0/1 Knapsack"],
    compulsoryQuestion: "Subset Sum Equal to Target",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "99",
    title: "Day 99 – Matrix Chain Multiplication",
    description: "Interval DP (Classic) for optimal matrix multiplication ordering",
    week: 14,
    day: 99,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["DP", "Interval DP"],
    compulsoryQuestion: "Matrix Chain Multiplication",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "100",
    title: "Day 100 – Palindrome Partitioning",
    description: "String Interval DP for palindrome problems and partitioning",
    week: 15,
    day: 100,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["DP", "String", "Palindrome"],
    compulsoryQuestion: "Palindrome Partitioning II",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "101",
    title: "Day 101 – Egg Dropping Problem",
    description: "Classic optimization DP with binary search variants",
    week: 15,
    day: 101,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["DP", "Binary Search"],
    compulsoryQuestion: "Super Egg Drop",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "102",
    title: "Day 102 – Count BSTs & Catalan Numbers",
    description: "Combinatorial DP and Tree counting using Catalan numbers",
    week: 15,
    day: 102,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["DP", "Tree", "Combinatorics"],
    compulsoryQuestion: "Unique Binary Search Trees",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "103",
    title: "Day 103 – Maximum Sum (No Consecutive)",
    description: "Standard non-adjacent selection problems and variants",
    week: 15,
    day: 103,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["DP", "Array"],
    compulsoryQuestion: "House Robber",
    practiceQuestions: 5,
    isLocked: false,
  },
];

function createQuestion(data: any) {
  return {
    topicId: data.topicId,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    type: data.type || "practice",
    isCompulsory: data.isCompulsory || false,
    points: data.points || 100,
    timeLimit: data.timeLimit || 2000,
    starterCode: data.starterCode || `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Your code here
        sc.close();
    }
}`,
    solution: data.solution,
    examples: data.examples || [],
    testCases: data.testCases.map((tc: any) => ({
      input: tc.input,
      expectedOutput: tc.expected,
      isHidden: tc.isHidden,
      points: 20,
    })),
    hints: data.hint ? [data.hint] : [],
    tags: data.tags || [],
  };
}

const questions = [
  // Day 96 - Q1
  createQuestion({
    title: "Longest Increasing Subsequence",
    description:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    difficulty: "Medium",
    topicId: "96",
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "LIS is [2,3,7,101] with length 4",
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4",
        explanation: "LIS is [0,1,2,3]",
      },
      {
        input: "nums = [7,7,7,7,7]",
        output: "1",
        explanation: "All elements are same",
      },
    ],
    testCases: [
      { input: "[10,9,2,5,3,7,101,18]", expected: "4", isHidden: false },
      { input: "[0,1,0,3,2,3]", expected: "4", isHidden: true },
      { input: "[7,7,7,7,7]", expected: "1", isHidden: true },
      { input: "[1,3,6,7,9,4,10,5,6]", expected: "6", isHidden: true },
      { input: "[1,2,3,4,5,6,7,8,9,10]", expected: "10", isHidden: true },
    ],
    solution: `
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        
        for (int num : nums) {
            int pos = Collections.binarySearch(tails, num);
            if (pos < 0) pos = -(pos + 1);
            
            if (pos == tails.size()) {
                tails.add(num);
            } else {
                tails.set(pos, num);
            }
        }
        
        return tails.size();
    }
    
    // Time: O(n log n)
    // Space: O(n)
    `,
    hint: "Use patience sorting with binary search. Maintain tails array.",
    tags: ["DP", "LIS", "Binary Search"],
    points: 120,
  }),

  // Day 96 - Q2
  createQuestion({
    title: "Longest Increasing Subsequence II",
    description:
      "Given an integer array nums and an integer k, return the length of the longest strictly increasing subsequence such that the difference between adjacent elements is at most k.",
    difficulty: "Hard",
    topicId: "96",
    examples: [
      {
        input: "nums = [4,2,1,4,3,4,5,8,15], k = 3",
        output: "5",
        explanation: "LIS with diff <= 3 is [1,3,4,5,8]",
      },
      {
        input: "nums = [7,4,5,1,8,12,4,7], k = 5",
        output: "4",
        explanation: "One possible LIS: [4,5,8,12]",
      },
      {
        input: "nums = [1,5], k = 1",
        output: "1",
        explanation: "Difference is 4 > k=1",
      },
    ],
    testCases: [
      { input: "[4,2,1,4,3,4,5,8,15], 3", expected: "5", isHidden: false },
      { input: "[7,4,5,1,8,12,4,7], 5", expected: "4", isHidden: true },
      { input: "[1,5], 1", expected: "1", isHidden: true },
      { input: "[1,100,500,100000,100000], 100000", expected: "5", isHidden: true },
      { input: "[1,2,3,4,5], 1", expected: "5", isHidden: true },
    ],
    solution: `
    public int lengthOfLIS(int[] nums, int k) {
        int maxNum = 0;
        for (int num : nums) maxNum = Math.max(maxNum, num);
        
        SegmentTree st = new SegmentTree(maxNum + 1);
        int result = 0;
        
        for (int num : nums) {
            int left = Math.max(1, num - k);
            int right = num - 1;
            
            int maxLen = st.query(left, right);
            st.update(num, maxLen + 1);
            result = Math.max(result, maxLen + 1);
        }
        
        return result;
    }
    
    class SegmentTree {
        int[] tree;
        int n;
        
        SegmentTree(int n) {
            this.n = n;
            tree = new int[4 * n];
        }
        
        void update(int idx, int val) {
            update(1, 0, n - 1, idx, val);
        }
        
        void update(int node, int start, int end, int idx, int val) {
            if (start == end) {
                tree[node] = val;
                return;
            }
            int mid = (start + end) / 2;
            if (idx <= mid) update(2 * node, start, mid, idx, val);
            else update(2 * node + 1, mid + 1, end, idx, val);
            tree[node] = Math.max(tree[2 * node], tree[2 * node + 1]);
        }
        
        int query(int l, int r) {
            if (l > r) return 0;
            return query(1, 0, n - 1, l, r);
        }
        
        int query(int node, int start, int end, int l, int r) {
            if (r < start || end < l) return 0;
            if (l <= start && end <= r) return tree[node];
            int mid = (start + end) / 2;
            return Math.max(query(2 * node, start, mid, l, r),
                          query(2 * node + 1, mid + 1, end, l, r));
        }
    }
    
    // Time: O(n log maxNum)
    // Space: O(maxNum)
    `,
    hint: "Use segment tree to track max LIS length for each value range.",
    tags: ["DP", "Segment Tree", "LIS"],
    points: 150,
  }),

  // Day 96 - Q3
  createQuestion({
    title: "Russian Doll Envelopes",
    description:
      "You are given an integer array of 2D points envelopes where envelopes[i] = [wi, hi] represents the width and height of an envelope. One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height. Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).",
    difficulty: "Hard",
    topicId: "96",
    examples: [
      {
        input: "envelopes = [[5,4],[6,4],[6,7],[2,3]]",
        output: "3",
        explanation: "[2,3] -> [5,4] -> [6,7]",
      },
      {
        input: "envelopes = [[1,1],[1,1],[1,1]]",
        output: "1",
        explanation: "No envelope can fit into another",
      },
    ],
    testCases: [
      { input: "[[5,4],[6,4],[6,7],[2,3]]", expected: "3", isHidden: false },
      { input: "[[1,1],[1,1],[1,1]]", expected: "1", isHidden: true },
      { input: "[[1,2],[2,3],[3,4],[4,5],[5,6]]", expected: "5", isHidden: true },
      { input: "[[4,5],[4,6],[6,7],[2,3],[1,1]]", expected: "4", isHidden: true },
      { input: "[[2,100],[3,200],[4,300],[5,500],[5,400],[5,250],[6,370],[6,360],[7,380]]", expected: "5", isHidden: true },
    ],
    solution: `
    public int maxEnvelopes(int[][] envelopes) {
        Arrays.sort(envelopes, (a, b) -> {
            if (a[0] != b[0]) return a[0] - b[0];
            return b[1] - a[1]; // Descending height for same width
        });
        
        List<Integer> lis = new ArrayList<>();
        for (int[] env : envelopes) {
            int h = env[1];
            int pos = Collections.binarySearch(lis, h);
            if (pos < 0) pos = -(pos + 1);
            
            if (pos == lis.size()) {
                lis.add(h);
            } else {
                lis.set(pos, h);
            }
        }
        
        return lis.size();
    }
    
    // Time: O(n log n)
    // Space: O(n)
    `,
    hint: "Sort by width ascending, height descending. Then find LIS on heights.",
    tags: ["DP", "LIS", "Sorting", "Binary Search"],
    points: 150,
  }),

  // Day 96 - Q4
  createQuestion({
    title: "Maximum Length of Pair Chain",
    description:
      "You are given an array of n pairs where pairs[i] = [lefti, righti] and lefti < righti. A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion. Return the length longest chain which can be formed.",
    difficulty: "Medium",
    topicId: "96",
    examples: [
      {
        input: "pairs = [[1,2],[2,3],[3,4]]",
        output: "2",
        explanation: "[1,2] -> [3,4]",
      },
      {
        input: "pairs = [[1,2],[7,8],[4,5]]",
        output: "3",
        explanation: "[1,2] -> [4,5] -> [7,8]",
      },
    ],
    testCases: [
      { input: "[[1,2],[2,3],[3,4]]", expected: "2", isHidden: false },
      { input: "[[1,2],[7,8],[4,5]]", expected: "3", isHidden: true },
      { input: "[[-10,-8],[8,9],[-5,0],[6,10],[-6,-4],[1,7],[9,10],[-4,7]]", expected: "4", isHidden: true },
      { input: "[[1,2]]", expected: "1", isHidden: true },
      { input: "[[3,4],[2,3],[1,2]]", expected: "2", isHidden: true },
    ],
    solution: `
    public int findLongestChain(int[][] pairs) {
        Arrays.sort(pairs, (a, b) -> a[1] - b[1]);
        
        int count = 0;
        int currentEnd = Integer.MIN_VALUE;
        
        for (int[] pair : pairs) {
            if (currentEnd < pair[0]) {
                count++;
                currentEnd = pair[1];
            }
        }
        
        return count;
    }
    
    // Time: O(n log n)
    // Space: O(1)
    `,
    hint: "Greedy approach: sort by end time, select non-overlapping pairs.",
    tags: ["Greedy", "Sorting", "Interval"],
    points: 100,
  }),

  // Day 96 - Q5
  createQuestion({
    title: "Number of Longest Increasing Subsequence",
    description:
      "Given an integer array nums, return the number of longest increasing subsequences.",
    difficulty: "Medium",
    topicId: "96",
    examples: [
      {
        input: "nums = [1,3,5,4,7]",
        output: "2",
        explanation: "LIS: [1,3,4,7] and [1,3,5,7]",
      },
      {
        input: "nums = [2,2,2,2,2]",
        output: "5",
        explanation: "Each element forms LIS of length 1",
      },
    ],
    testCases: [
      { input: "[1,3,5,4,7]", expected: "2", isHidden: false },
      { input: "[2,2,2,2,2]", expected: "5", isHidden: true },
      { input: "[1,2,4,3,5,4,7,2]", expected: "3", isHidden: true },
      { input: "[1]", expected: "1", isHidden: true },
      { input: "[1,1,1,2,2,2,3,3,3]", expected: "27", isHidden: true },
    ],
    solution: `
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        int[] len = new int[n];
        int[] count = new int[n];
        Arrays.fill(len, 1);
        Arrays.fill(count, 1);
        
        int maxLen = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (len[j] + 1 > len[i]) {
                        len[i] = len[j] + 1;
                        count[i] = count[j];
                    } else if (len[j] + 1 == len[i]) {
                        count[i] += count[j];
                    }
                }
            }
            maxLen = Math.max(maxLen, len[i]);
        }
        
        int result = 0;
        for (int i = 0; i < n; i++) {
            if (len[i] == maxLen) {
                result += count[i];
            }
        }
        
        return result;
    }
    
    // Time: O(n^2)
    // Space: O(n)
    `,
    hint: "Track both length and count. When length increases, reset count. When equal, add count.",
    tags: ["DP", "LIS", "Counting"],
    points: 120,
  }),

  // Day 97 - Q1
  createQuestion({
    title: "Partition Equal Subset Sum",
    description:
      "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the values in both subsets is equal.",
    difficulty: "Medium",
    topicId: "97",
    examples: [
      {
        input: "nums = [1,5,11,5]",
        output: "true",
        explanation: "[1,5,5] and [11]",
      },
      {
        input: "nums = [1,2,3,5]",
        output: "false",
        explanation: "Cannot partition into equal sum subsets",
      },
    ],
    testCases: [
      { input: "[1,5,11,5]", expected: "true", isHidden: false },
      { input: "[1,2,3,5]", expected: "false", isHidden: true },
      { input: "[1,2,5]", expected: "false", isHidden: true },
      { input: "[2,2,3,5]", expected: "false", isHidden: true },
      { input: "[100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]", expected: "true", isHidden: true },
    ],
    solution: `
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int num : nums) sum += num;
        
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        
        return dp[target];
    }
    
    // Time: O(n * sum/2)
    // Space: O(sum/2)
    `,
    hint: "Convert to subset sum problem: find subset with sum = total/2.",
    tags: ["DP", "0/1 Knapsack", "Subset Sum"],
    points: 100,
  }),

  // Day 97 - Q2
  createQuestion({
    title: "Target Sum (0/1 Knapsack)",
    description:
      "You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers. Return the number of different expressions that you can build, which evaluates to target.",
    difficulty: "Medium",
    topicId: "97",
    examples: [
      {
        input: "nums = [1,1,1,1,1], target = 3",
        output: "5",
        explanation: "5 ways to assign +/- to get sum 3",
      },
      {
        input: "nums = [1], target = 1",
        output: "1",
        explanation: "+1 = 1",
      },
    ],
    testCases: [
      { input: "[1,1,1,1,1], 3", expected: "5", isHidden: false },
      { input: "[1], 1", expected: "1", isHidden: true },
      { input: "[1,0], 1", expected: "2", isHidden: true },
      { input: "[0,0,0,0,0,0,0,0,1], 1", expected: "256", isHidden: true },
      { input: "[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 10", expected: "184756", isHidden: true },
    ],
    solution: `
    public int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int num : nums) sum += num;
        
        if (Math.abs(target) > sum || (sum + target) % 2 != 0) return 0;
        
        int subsetSum = (sum + target) / 2;
        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;
        
        for (int num : nums) {
            for (int j = subsetSum; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        
        return dp[subsetSum];
    }
    
    // Time: O(n * sum)
    // Space: O(sum)
    `,
    hint: "P - N = target, P + N = sum. So P = (sum + target) / 2. Find subsets with this sum.",
    tags: ["DP", "0/1 Knapsack", "Math"],
    points: 120,
  }),

  // Day 97 - Q3
  createQuestion({
    title: "Last Stone Weight II",
    description:
      "You are given an array of integers stones where stones[i] is the weight of the ith stone. We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights x and y with x <= y. If x == y, both stones are destroyed. If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x. At the end of the game, there is at most one stone left. Return the smallest possible weight of the left stone. If there are no stones left, return 0.",
    difficulty: "Medium",
    topicId: "97",
    examples: [
      {
        input: "stones = [2,7,4,1,8,1]",
        output: "1",
        explanation: "Combine stones to minimize final weight",
      },
      {
        input: "stones = [31,26,33,21,40]",
        output: "5",
        explanation: "Optimal partition minimizes difference",
      },
    ],
    testCases: [
      { input: "[2,7,4,1,8,1]", expected: "1", isHidden: false },
      { input: "[31,26,33,21,40]", expected: "5", isHidden: true },
      { input: "[1,2]", expected: "1", isHidden: true },
      { input: "[1]", expected: "1", isHidden: true },
      { input: "[1,1,2,3,5,8,13,21,34,55,89,14,23,37,61,98]", expected: "1", isHidden: true },
    ],
    solution: `
    public int lastStoneWeightII(int[] stones) {
        int sum = 0;
        for (int s : stones) sum += s;
        
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int stone : stones) {
            for (int j = target; j >= stone; j--) {
                dp[j] = dp[j] || dp[j - stone];
            }
        }
        
        for (int i = target; i >= 0; i--) {
            if (dp[i]) {
                return sum - 2 * i;
            }
        }
        
        return 0;
    }
    
    // Time: O(n * sum/2)
    // Space: O(sum/2)
    `,
    hint: "Partition stones into two groups to minimize |sum1 - sum2|. Use subset sum DP.",
    tags: ["DP", "0/1 Knapsack"],
    points: 120,
  }),

  // Day 97 - Q4
  createQuestion({
    title: "Can Place Flowers",
    description:
      "You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots. Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.",
    difficulty: "Easy",
    topicId: "97",
    examples: [
      {
        input: "flowerbed = [1,0,0,0,1], n = 1",
        output: "true",
        explanation: "Plant at index 2",
      },
      {
        input: "flowerbed = [1,0,0,0,1], n = 2",
        output: "false",
        explanation: "Can only plant 1 flower",
      },
    ],
    testCases: [
      { input: "[1,0,0,0,1], 1", expected: "true", isHidden: false },
      { input: "[1,0,0,0,1], 2", expected: "false", isHidden: true },
      { input: "[0,0,1,0,0], 1", expected: "true", isHidden: true },
      { input: "[0], 1", expected: "true", isHidden: true },
      { input: "[0,0,0,0,0,1,0,0], 3", expected: "true", isHidden: true },
    ],
    solution: `
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int count = 0;
        
        for (int i = 0; i < flowerbed.length; i++) {
            if (flowerbed[i] == 0) {
                boolean leftEmpty = (i == 0) || (flowerbed[i - 1] == 0);
                boolean rightEmpty = (i == flowerbed.length - 1) || (flowerbed[i + 1] == 0);
                
                if (leftEmpty && rightEmpty) {
                    flowerbed[i] = 1;
                    count++;
                }
            }
        }
        
        return count >= n;
    }
    
    // Time: O(n)
    // Space: O(1)
    `,
    hint: "Greedy: plant flower if current, left, and right positions allow it.",
    tags: ["Greedy", "Array"],
    points: 80,
  }),

  // Day 97 - Q5
  createQuestion({
    title: "Coin Change II (Complete Knapsack)",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount cannot be made up by any combination of the coins, return 0. You may assume that you have an infinite number of each kind of coin.",
    difficulty: "Medium",
    topicId: "97",
    examples: [
      {
        input: "amount = 5, coins = [1,2,5]",
        output: "4",
        explanation: "5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1",
      },
      {
        input: "amount = 3, coins = [2]",
        output: "0",
        explanation: "Cannot make 3",
      },
    ],
    testCases: [
      { input: "5, [1,2,5]", expected: "4", isHidden: false },
      { input: "3, [2]", expected: "0", isHidden: true },
      { input: "10, [10]", expected: "1", isHidden: true },
      { input: "500, [3,5,7,8,9,10,11]", expected: "35502874", isHidden: true },
      { input: "0, [7]", expected: "1", isHidden: true },
    ],
    solution: `
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        
        return dp[amount];
    }
    
    // Time: O(amount * coins.length)
    // Space: O(amount)
    `,
    hint: "Iterate coins first (outer loop) to count combinations, not permutations.",
    tags: ["DP", "Unbounded Knapsack"],
    points: 100,
  }),

  // Day 98 - Q1
  createQuestion({
    title: "Subset Sum Equal to Target",
    description:
      "Given an array of integers nums and an integer target, return true if there is a non-empty subset of nums whose sum equals target.",
    difficulty: "Medium",
    topicId: "98",
    examples: [
      {
        input: "nums = [3,34,4,12,5,2], target = 9",
        output: "true",
        explanation: "[4, 5] sums to 9",
      },
      {
        input: "nums = [3,34,4,12,5,2], target = 30",
        output: "false",
        explanation: "No subset sums to 30",
      },
    ],
    testCases: [
      { input: "[3,34,4,12,5,2], 9", expected: "true", isHidden: false },
      { input: "[3,34,4,12,5,2], 30", expected: "false", isHidden: true },
      { input: "[1,2,3], 6", expected: "true", isHidden: true },
      { input: "[1,5,11,5], 11", expected: "true", isHidden: true },
      { input: "[100,50,25,10,5,1], 87", expected: "true", isHidden: true },
    ],
    solution: `
    public boolean canPartition(int[] nums, int target) {
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        
        return dp[target];
    }
    
    // Time: O(n * target)
    // Space: O(target)
    `,
    hint: "Classic 0/1 knapsack. dp[i] = can we make sum i?",
    tags: ["DP", "Subset Sum"],
    points: 100,
  }),

  // Day 98 - Q2
  createQuestion({
    title: "Partition to K Equal Sum Subsets",
    description:
      "Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.",
    difficulty: "Hard",
    topicId: "98",
    examples: [
      {
        input: "nums = [4,3,2,3,5,2,1], k = 4",
        output: "true",
        explanation: "[5], [1,4], [2,3], [2,3]",
      },
      {
        input: "nums = [1,2,3,4], k = 3",
        output: "false",
        explanation: "Cannot divide into 3 equal sum subsets",
      },
    ],
    testCases: [
      { input: "[4,3,2,3,5,2,1], 4", expected: "true", isHidden: false },
      { input: "[1,2,3,4], 3", expected: "false", isHidden: true },
      { input: "[10,10,10,7,7,7,7,7,7,6,6,6], 3", expected: "true", isHidden: true },
      { input: "[1,1,1,1,1,1,1,1,1,1], 5", expected: "true", isHidden: true },
      { input: "[4,4,6,2,3,8,10,2,10,7], 4", expected: "true", isHidden: true },
    ],
    solution: `
    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int num : nums) sum += num;
        
        if (sum % k != 0) return false;
        
        int target = sum / k;
        Arrays.sort(nums);
        
        int n = nums.length;
        if (nums[n - 1] > target) return false;
        
        boolean[] visited = new boolean[n];
        return backtrack(nums, visited, 0, k, 0, target);
    }
    
    private boolean backtrack(int[] nums, boolean[] visited, int start, int k, int currentSum, int target) {
        if (k == 1) return true;
        
        if (currentSum == target) {
            return backtrack(nums, visited, 0, k - 1, 0, target);
        }
        
        for (int i = start; i < nums.length; i++) {
            if (visited[i] || currentSum + nums[i] > target) continue;
            
            visited[i] = true;
            if (backtrack(nums, visited, i + 1, k, currentSum + nums[i], target)) {
                return true;
            }
            visited[i] = false;
        }
        
        return false;
    }
    
    // Time: O(k * 2^n)
    // Space: O(n)
    `,
    hint: "Use backtracking. For each subset, try to fill to target sum.",
    tags: ["Backtracking", "DP", "Subset"],
    points: 150,
  }),

  // Day 98 - Q3
  createQuestion({
    title: "Split Array With Same Average",
    description:
      "You are given an integer array nums. You should move each element of nums into one of the two arrays A and B such that A and B are non-empty, and average(A) == average(B). Return true if it is possible to achieve that and false otherwise.",
    difficulty: "Hard",
    topicId: "98",
    examples: [
      {
        input: "nums = [1,2,3,4,5,6,7,8]",
        output: "true",
        explanation: "A = [1,4,5,8], B = [2,3,6,7]",
      },
      {
        input: "nums = [3,1]",
        output: "false",
        explanation: "Cannot split",
      },
    ],
    testCases: [
      { input: "[1,2,3,4,5,6,7,8]", expected: "true", isHidden: false },
      { input: "[3,1]", expected: "false", isHidden: true },
      { input: "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]", expected: "true", isHidden: true },
      { input: "[5,3,11,19,2]", expected: "true", isHidden: true },
      { input: "[1,6,1]", expected: "false", isHidden: true },
    ],
    solution: `
    public boolean splitArraySameAverage(int[] nums) {
        int n = nums.length;
        int sum = 0;
        for (int num : nums) sum += num;
        
        boolean possible = false;
        for (int lenA = 1; lenA < n; lenA++) {
            if ((sum * lenA) % n == 0) {
                possible = true;
                break;
            }
        }
        if (!possible) return false;
        
        Set<Integer>[] dp = new Set[n / 2 + 1];
        for (int i = 0; i <= n / 2; i++) {
            dp[i] = new HashSet<>();
        }
        dp[0].add(0);
        
        for (int num : nums) {
            for (int i = n / 2; i >= 1; i--) {
                for (int prev : dp[i - 1]) {
                    int newSum = prev + num;
                    dp[i].add(newSum);
                    
                    if ((newSum * n) == (sum * i)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    // Time: O(n^2 * sum)
    // Space: O(n * sum)
    `,
    hint: "If avg(A) = avg(B), then sum(A)/len(A) = sum(B)/len(B) = total_sum/n.",
    tags: ["DP", "Math", "Subset"],
    points: 150,
  }),

  // Day 98 - Q4
  createQuestion({
    title: "Number of Dice Rolls With Target Sum",
    description:
      "You have n dice and each die has k faces numbered from 1 to k. Given three integers n, k, and target, return the number of possible ways (out of the kn total ways) to roll the dice so the sum of the face-up numbers equals target. Since the answer may be too large, return it modulo 10^9 + 7.",
    difficulty: "Medium",
    topicId: "98",
    examples: [
      {
        input: "n = 1, k = 6, target = 3",
        output: "1",
        explanation: "Only way: roll a 3",
      },
      {
        input: "n = 2, k = 6, target = 7",
        output: "6",
        explanation: "(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)",
      },
      {
        input: "n = 30, k = 30, target = 500",
        output: "222616187",
        explanation: "Large computation",
      },
    ],
    testCases: [
      { input: "1, 6, 3", expected: "1", isHidden: false },
      { input: "2, 6, 7", expected: "6", isHidden: true },
      { input: "3, 6, 12", expected: "25", isHidden: true },
      { input: "2, 5, 10", expected: "1", isHidden: true },
      { input: "30, 30, 500", expected: "222616187", isHidden: true },
    ],
    solution: `
    public int numRollsToTarget(int n, int k, int target) {
        int MOD = 1000000007;
        int[][] dp = new int[n + 1][target + 1];
        dp[0][0] = 1;
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                for (int face = 1; face <= k && face <= j; face++) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - face]) % MOD;
                }
            }
        }
        
        return dp[n][target];
    }
    
    // Time: O(n * target * k)
    // Space: O(n * target)
    `,
    hint: "dp[i][j] = ways to get sum j using i dice. Try all faces 1 to k.",
    tags: ["DP", "Counting"],
    points: 120,
  }),

  // Day 98 - Q5
  createQuestion({
    title: "Minimum Cost to Merge Stones",
    description:
      "There are n piles of stones arranged in a row. The ith pile has stones[i] stones. A move consists of merging exactly k consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these k piles. Return the minimum cost to merge all piles of stones into one pile. If it is impossible, return -1.",
    difficulty: "Hard",
    topicId: "98",
    examples: [
      {
        input: "stones = [3,2,4,1], k = 2",
        output: "20",
        explanation: "Merge optimally",
      },
      {
        input: "stones = [3,2,4,1], k = 3",
        output: "-1",
        explanation: "Impossible",
      },
      {
        input: "stones = [3,5,1,2,6], k = 3",
        output: "25",
        explanation: "Optimal merging",
      },
    ],
    testCases: [
      { input: "[3,2,4,1], 2", expected: "20", isHidden: false },
      { input: "[3,2,4,1], 3", expected: "-1", isHidden: true },
      { input: "[3,5,1,2,6], 3", expected: "25", isHidden: true },
      { input: "[1,1,1,1,1,1,1,1], 2", expected: "28", isHidden: true },
      { input: "[6,4,4,6], 2", expected: "40", isHidden: true },
    ],
    solution: `
    public int mergeStones(int[] stones, int k) {
        int n = stones.length;
        if ((n - 1) % (k - 1) != 0) return -1;
        
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + stones[i];
        }
        
        int[][] dp = new int[n][n];
        for (int len = k; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                
                for (int mid = i; mid < j; mid += k - 1) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][mid] + dp[mid + 1][j]);
                }
                
                if ((j - i) % (k - 1) == 0) {
                    dp[i][j] += prefixSum[j + 1] - prefixSum[i];
                }
            }
        }
        
        return dp[0][n - 1];
    }
    
    // Time: O(n^3 / k)
    // Space: O(n^2)
    `,
    hint: "Use interval DP. Check if (n-1) % (k-1) == 0 for possibility.",
    tags: ["DP", "Interval", "Hard"],
    points: 150,
  }),

  // Day 99 - Q1
  createQuestion({
    title: "Matrix Chain Multiplication",
    description:
      "Given a sequence of matrices, find the most efficient way to multiply these matrices together. The cost of multiplying two matrices of dimensions p x q and q x r is p*q*r. Return the minimum number of scalar multiplications needed.",
    difficulty: "Hard",
    topicId: "99",
    examples: [
      {
        input: "arr = [10, 20, 30, 40, 30]",
        output: "30000",
        explanation: "((A1 x A2) x A3) x A4 gives minimum cost",
      },
      {
        input: "arr = [40, 20, 30, 10, 30]",
        output: "26000",
        explanation: "Optimal parenthesization",
      },
      {
        input: "arr = [10, 20, 30]",
        output: "6000",
        explanation: "Only one way: 10*20*30",
      },
    ],
    testCases: [
      { input: "[10,20,30,40,30]", expected: "30000", isHidden: false },
      { input: "[40,20,30,10,30]", expected: "26000", isHidden: true },
      { input: "[10,20,30]", expected: "6000", isHidden: true },
      { input: "[1,2,3,4,3]", expected: "30", isHidden: true },
      { input: "[5,10,3,12,5,50,6]", expected: "2010", isHidden: true },
    ],
    solution: `
    public int matrixChainOrder(int[] arr) {
        int n = arr.length;
        int[][] dp = new int[n][n];
        
        for (int len = 2; len < n; len++) {
            for (int i = 1; i < n - len + 1; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        
        return dp[1][n - 1];
    }
    
    // Time: O(n^3)
    // Space: O(n^2)
    `,
    hint: "Interval DP. Try all partition points k between i and j.",
    tags: ["DP", "Interval", "Matrix"],
    points: 150,
  }),

  // Day 99 - Q2
  createQuestion({
    title: "Burst Balloons",
    description:
      "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely.",
    difficulty: "Hard",
    topicId: "99",
    examples: [
      {
        input: "nums = [3,1,5,8]",
        output: "167",
        explanation: "Burst in order [1,5,3,8] for max coins",
      },
      {
        input: "nums = [1,5]",
        output: "10",
        explanation: "Burst 1 then 5: 1*1*5 + 1*5*1 = 10",
      },
    ],
    testCases: [
      { input: "[3,1,5,8]", expected: "167", isHidden: false },
      { input: "[1,5]", expected: "10", isHidden: true },
      { input: "[7,9,8,0,7,1,3,5,5,2]", expected: "1582", isHidden: true },
      { input: "[8,2,6,8,9,8,1,4,1,5,3,0,7,7,0,4,2]", expected: "3446", isHidden: true },
      { input: "[9,76,64,21,97,60,5]", expected: "1086136", isHidden: true },
    ],
    solution: `
    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] arr = new int[n + 2];
        arr[0] = arr[n + 1] = 1;
        for (int i = 0; i < n; i++) {
            arr[i + 1] = nums[i];
        }
        
        int[][] dp = new int[n + 2][n + 2];
        
        for (int len = 1; len <= n; len++) {
            for (int left = 1; left <= n - len + 1; left++) {
                int right = left + len - 1;
                
                for (int k = left; k <= right; k++) {
                    int coins = arr[left - 1] * arr[k] * arr[right + 1];
                    coins += dp[left][k - 1] + dp[k + 1][right];
                    dp[left][right] = Math.max(dp[left][right], coins);
                }
            }
        }
        
        return dp[1][n];
    }
    
    // Time: O(n^3)
    // Space: O(n^2)
    `,
    hint: "Think reverse: which balloon to burst last in range [i,j]?",
    tags: ["DP", "Interval", "Hard"],
    points: 150,
  }),

  // Day 99 - Q3
  createQuestion({
    title: "Minimum Cost to Merge Stones (Interval DP)",
    description:
      "There are n piles of stones arranged in a row. The ith pile has stones[i] stones. A move consists of merging exactly k consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these k piles. Return the minimum cost to merge all piles of stones into one pile. If it is impossible, return -1.",
    difficulty: "Hard",
    topicId: "99",
    examples: [
      {
        input: "stones = [3,2,4,1], k = 2",
        output: "20",
        explanation: "Optimal merging sequence",
      },
      {
        input: "stones = [3,5,1,2,6], k = 3",
        output: "25",
        explanation: "Multiple merge operations",
      },
    ],
    testCases: [
      { input: "[3,2,4,1], 2", expected: "20", isHidden: false },
      { input: "[3,5,1,2,6], 3", expected: "25", isHidden: true },
      { input: "[3,2,4,1], 3", expected: "-1", isHidden: true },
      { input: "[1,1,1,1,1,1,1,1], 2", expected: "28", isHidden: true },
      { input: "[6,4,4,6], 2", expected: "40", isHidden: true },
    ],
    solution: `
    public int mergeStones(int[] stones, int k) {
        int n = stones.length;
        if ((n - 1) % (k - 1) != 0) return -1;
        
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + stones[i];
        }
        
        int[][] dp = new int[n][n];
        for (int len = k; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                
                for (int mid = i; mid < j; mid += k - 1) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][mid] + dp[mid + 1][j]);
                }
                
                if ((j - i) % (k - 1) == 0) {
                    dp[i][j] += prefixSum[j + 1] - prefixSum[i];
                }
            }
        }
        
        return dp[0][n - 1];
    }
    
    // Time: O(n^3)
    // Space: O(n^2)
    `,
    hint: "Check (n-1) % (k-1) == 0 for feasibility. Use interval DP.",
    tags: ["DP", "Interval"],
    points: 150,
  }),

  // Day 99 - Q4
  createQuestion({
    title: "Palindrome Partitioning III",
    description:
      "You are given a string s containing lowercase letters and an integer k. You need to change the minimum number of characters in s so that it can be divided into k non-empty palindromic substrings. Return the minimum number of characters that you need to change.",
    difficulty: "Hard",
    topicId: "99",
    examples: [
      {
        input: 's = "abc", k = 2',
        output: "1",
        explanation: "Change b to a or c: 'aa|c' or 'a|cc'",
      },
      {
        input: 's = "aabbc", k = 3',
        output: "0",
        explanation: "'aa|bb|c' already valid",
      },
      {
        input: 's = "leetcode", k = 8',
        output: "0",
        explanation: "Each character is palindrome",
      },
    ],
    testCases: [
      { input: '"abc", 2', expected: "1", isHidden: false },
      { input: '"aabbc", 3', expected: "0", isHidden: true },
      { input: '"leetcode", 8', expected: "0", isHidden: true },
      { input: '"oiwwhqjkb", 3', expected: "2", isHidden: true },
      { input: '"fyhowoxzyrincxivwarjuwxrwealesxsimsepjdqsstfggjnjhilvrwwytbgsqbpnwjaojfnmiqiqnyzijfmvekgakefjaxryyml", 32', expected: "10", isHidden: true },
    ],
    solution: `
    public int palindromePartition(String s, int k) {
        int n = s.length();
        
        // cost[i][j] = changes needed to make s[i..j] palindrome
        int[][] cost = new int[n][n];
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                cost[i][j] = cost[i + 1][j - 1] + (s.charAt(i) != s.charAt(j) ? 1 : 0);
            }
        }
        
        // dp[i][j] = min changes to partition s[0..i] into j palindromes
        int[][] dp = new int[n][k + 1];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dp[i], n);
        }
        
        for (int i = 0; i < n; i++) {
            dp[i][1] = cost[0][i];
            
            for (int j = 2; j <= Math.min(k, i + 1); j++) {
                for (int m = j - 2; m < i; m++) {
                    dp[i][j] = Math.min(dp[i][j], dp[m][j - 1] + cost[m + 1][i]);
                }
            }
        }
        
        return dp[n - 1][k];
    }
    
    // Time: O(n^2 * k)
    // Space: O(n^2)
    `,
    hint: "Precompute palindrome costs. dp[i][j] = min changes for i partitions ending at j.",
    tags: ["DP", "Interval", "Palindrome"],
    points: 150,
  }),

  // Day 99 - Q5
  createQuestion({
    title: "Minimum Cost to Cut a Stick",
    description:
      "Given a wooden stick of length n units. The stick is labelled from 0 to n. Given an integer array cuts where cuts[i] denotes a position you should perform a cut at. You should perform the cuts in order. The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. Return the minimum total cost of the cuts.",
    difficulty: "Hard",
    topicId: "99",
    examples: [
      {
        input: "n = 7, cuts = [1,3,4,5]",
        output: "16",
        explanation: "Optimal cutting order",
      },
      {
        input: "n = 9, cuts = [5,6,1,4,2]",
        output: "22",
        explanation: "Cut at optimal positions",
      },
    ],
    testCases: [
      { input: "7, [1,3,4,5]", expected: "16", isHidden: false },
      { input: "9, [5,6,1,4,2]", expected: "22", isHidden: true },
      { input: "20, [3,13,17]", expected: "37", isHidden: true },
      { input: "36, [13,17,15,18,3,22,27,6,35,7,11,28,26]", expected: "216", isHidden: true },
      { input: "30, [7,15,22]", expected: "52", isHidden: true },
    ],
    solution: `
    public int minCost(int n, int[] cuts) {
        List<Integer> list = new ArrayList<>();
        list.add(0);
        for (int cut : cuts) list.add(cut);
        list.add(n);
        Collections.sort(list);
        
        int m = list.size();
        int[][] dp = new int[m][m];
        
        for (int len = 2; len < m; len++) {
            for (int i = 0; i + len < m; i++) {
                int j = i + len;
                dp[i][j] = Integer.MAX_VALUE;
                
                for (int k = i + 1; k < j; k++) {
                    int cost = dp[i][k] + dp[k][j] + list.get(j) - list.get(i);
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        
        return dp[0][m - 1];
    }
    
    // Time: O(m^3) where m = cuts.length + 2
    // Space: O(m^2)
    `,
    hint: "Add 0 and n to cuts array, sort it. Use interval DP.",
    tags: ["DP", "Interval"],
    points: 150,
  }),

  // Day 100 - Q1
  createQuestion({
    title: "Palindrome Partitioning",
    description:
      "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    difficulty: "Medium",
    topicId: "100",
    examples: [
      {
        input: 's = "aab"',
        output: '[["a","a","b"],["aa","b"]]',
        explanation: "Two valid partitions",
      },
      {
        input: 's = "a"',
        output: '[["a"]]',
        explanation: "Only one partition",
      },
    ],
    testCases: [
      { input: '"aab"', expected: '[["a","a","b"],["aa","b"]]', isHidden: false },
      { input: '"a"', expected: '[["a"]]', isHidden: true },
      { input: '"aaa"', expected: '[["a","a","a"],["a","aa"],["aa","a"],["aaa"]]', isHidden: true },
      { input: '"racecar"', expected: '[["r","a","c","e","c","a","r"],["r","a","cec","a","r"],["r","aceca","r"],["racecar"]]', isHidden: true },
      { input: '"efe"', expected: '[["e","f","e"],["efe"]]', isHidden: true },
    ],
    solution: `
    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(String s, int start, List<String> current, List<List<String>> result) {
        if (start == s.length()) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int end = start; end < s.length(); end++) {
            if (isPalindrome(s, start, end)) {
                current.add(s.substring(start, end + 1));
                backtrack(s, end + 1, current, result);
                current.remove(current.size() - 1);
            }
        }
    }
    
    private boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) {
                return false;
            }
        }
        return true;
    }
    
    // Time: O(n * 2^n)
    // Space: O(n)
    `,
    hint: "Use backtracking. Check if substring is palindrome before recursing.",
    tags: ["Backtracking", "String", "Palindrome"],
    points: 120,
  }),

  // Day 100 - Q2
  createQuestion({
    title: "Palindrome Partitioning II",
    description:
      "Given a string s, partition s such that every substring of the partition is a palindrome. Return the minimum cuts needed for a palindrome partitioning of s.",
    difficulty: "Hard",
    topicId: "100",
    examples: [
      {
        input: 's = "aab"',
        output: "1",
        explanation: '"aa|b" requires 1 cut',
      },
      {
        input: 's = "a"',
        output: "0",
        explanation: "No cuts needed",
      },
      {
        input: 's = "ab"',
        output: "1",
        explanation: '"a|b" requires 1 cut',
      },
    ],
    testCases: [
      { input: '"aab"', expected: "1", isHidden: false },
      { input: '"a"', expected: "0", isHidden: true },
      { input: '"ab"', expected: "1", isHidden: true },
      { input: '"aaabaa"', expected: "1", isHidden: true },
      { input: '"fifgbeajcacehiicccfecbfhhgfiiecdcjjffbghdidbhbdbfbfjccgbbdcjheccfbhafehieabbdfeigbiaggchaeghaijfbjhi"', expected: "75", isHidden: true },
    ],
    solution: `
    public int minCut(String s) {
        int n = s.length();
        boolean[][] isPalin = new boolean[n][n];
        
        // Build palindrome table
        for (int len = 1; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                if (len == 1) {
                    isPalin[i][j] = true;
                } else if (len == 2) {
                    isPalin[i][j] = s.charAt(i) == s.charAt(j);
                } else {
                    isPalin[i][j] = (s.charAt(i) == s.charAt(j)) && isPalin[i + 1][j - 1];
                }
            }
        }
        
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            if (isPalin[0][i]) {
                dp[i] = 0;
            } else {
                dp[i] = i; // worst case: i cuts
                for (int j = 0; j < i; j++) {
                    if (isPalin[j + 1][i]) {
                        dp[i] = Math.min(dp[i], dp[j] + 1);
                    }
                }
            }
        }
        
        return dp[n - 1];
    }
    
    // Time: O(n^2)
    // Space: O(n^2)
    `,
    hint: "Precompute palindrome table. dp[i] = min cuts for s[0..i].",
    tags: ["DP", "String", "Palindrome"],
    points: 150,
  }),

  // Day 100 - Q3
  createQuestion({
    title: "Count Different Palindromic Subsequences",
    description:
      "Given a string s, return the number of different non-empty palindromic subsequences in s. Since the answer may be very large, return it modulo 10^9 + 7.",
    difficulty: "Hard",
    topicId: "100",
    examples: [
      {
        input: 's = "bccb"',
        output: "6",
        explanation: '"b", "c", "cc", "b", "c", "bccb"',
      },
      {
        input: 's = "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"',
        output: "104860361",
        explanation: "Large number of subsequences",
      },
    ],
    testCases: [
      { input: '"bccb"', expected: "6", isHidden: false },
      { input: '"abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"', expected: "104860361", isHidden: true },
      { input: '"a"', expected: "1", isHidden: true },
      { input: '"aa"', expected: "3", isHidden: true },
      { input: '"aaa"', expected: "7", isHidden: true },
    ],
    solution: `
    public int countPalindromicSubsequences(String s) {
        int MOD = 1000000007;
        int n = s.length();
        int[][] dp = new int[n][n];
        
        for (int i = 0; i < n; i++) {
            dp[i][i] = 1;
        }
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                
                if (s.charAt(i) == s.charAt(j)) {
                    int left = i + 1, right = j - 1;
                    
                    while (left <= right && s.charAt(left) != s.charAt(i)) left++;
                    while (left <= right && s.charAt(right) != s.charAt(i)) right--;
                    
                    if (left > right) {
                        dp[i][j] = (2 * dp[i + 1][j - 1] + 2) % MOD;
                    } else if (left == right) {
                        dp[i][j] = (2 * dp[i + 1][j - 1] + 1) % MOD;
                    } else {
                        dp[i][j] = (2 * dp[i + 1][j - 1] - dp[left + 1][right - 1]) % MOD;
                    }
                } else {
                    dp[i][j] = (dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1]) % MOD;
                }
                
                dp[i][j] = (dp[i][j] + MOD) % MOD;
            }
        }
        
        return dp[0][n - 1];
    }
    
    // Time: O(n^3)
    // Space: O(n^2)
    `,
    hint: "Interval DP. Handle cases when endpoints match or don't match.",
    tags: ["DP", "String", "Counting", "Palindrome"],
    points: 150,
  }),

  // Day 100 - Q4
  createQuestion({
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    difficulty: "Medium",
    topicId: "100",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also valid',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: "Longest palindrome",
      },
    ],
    testCases: [
      { input: '"babad"', expected: '"bab"', isHidden: false },
      { input: '"cbbd"', expected: '"bb"', isHidden: true },
      { input: '"a"', expected: '"a"', isHidden: true },
      { input: '"ac"', expected: '"a"', isHidden: true },
      { input: '"racecar"', expected: '"racecar"', isHidden: true },
    ],
    solution: `
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        
        int start = 0, maxLen = 0;
        
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            
            if (len > maxLen) {
                maxLen = len;
                start = i - (len - 1) / 2;
            }
        }
        
        return s.substring(start, start + maxLen);
    }
    
    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    
    // Time: O(n^2)
    // Space: O(1)
    `,
    hint: "Expand around center for each position. Handle odd and even length palindromes.",
    tags: ["String", "Palindrome", "Two Pointer"],
    points: 120,
  }),

  // Day 100 - Q5
  createQuestion({
    title: "Minimum Insertion Steps to Make a String Palindrome",
    description:
      "Given a string s, return the minimum number of steps to make s palindrome. In one step you can insert any character at any position of the string.",
    difficulty: "Hard",
    topicId: "100",
    examples: [
      {
        input: 's = "zzazz"',
        output: "0",
        explanation: "Already palindrome",
      },
      {
        input: 's = "mbadm"',
        output: "2",
        explanation: "Insert ab or ba",
      },
      {
        input: 's = "leetcode"',
        output: "5",
        explanation: "Insert 5 characters",
      },
    ],
    testCases: [
      { input: '"zzazz"', expected: "0", isHidden: false },
      { input: '"mbadm"', expected: "2", isHidden: true },
      { input: '"leetcode"', expected: "5", isHidden: true },
      { input: '"g"', expected: "0", isHidden: true },
      { input: '"no"', expected: "1", isHidden: true },
    ],
    solution: `
    public int minInsertions(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        return s.length() - longestCommonSubsequence(s, rev);
    }
    
    private int longestCommonSubsequence(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Time: O(n^2)
    // Space: O(n^2)
    `,
    hint: "Answer = n - LCS(s, reverse(s)).",
    tags: ["DP", "LCS", "Palindrome"],
    points: 150,
  }),

  // Day 101 - Q1
  createQuestion({
    title: "Egg Drop",
    description:
      "You are given k eggs and you have access to a building with n floors. You want to find the critical floor where eggs start breaking. Return the minimum number of attempts you need in the worst case.",
    difficulty: "Hard",
    topicId: "101",
    examples: [
      {
        input: "k = 2, n = 6",
        output: "3",
        explanation: "Try floors strategically",
      },
      {
        input: "k = 3, n = 14",
        output: "4",
        explanation: "Optimal strategy requires 4 attempts",
      },
    ],
    testCases: [
      { input: "2, 6", expected: "3", isHidden: false },
      { input: "3, 14", expected: "4", isHidden: true },
      { input: "1, 2", expected: "2", isHidden: true },
      { input: "2, 100", expected: "14", isHidden: true },
      { input: "5, 100", expected: "9", isHidden: true },
    ],
    solution: `
    public int superEggDrop(int k, int n) {
        int[][] dp = new int[k + 1][n + 1];
        
        for (int m = 1; m <= n; m++) {
            for (int eggs = 1; eggs <= k; eggs++) {
                dp[eggs][m] = dp[eggs - 1][m - 1] + dp[eggs][m - 1] + 1;
                if (dp[eggs][m] >= n) {
                    return m;
                }
            }
        }
        
        return n;
    }
    
    // Time: O(k * n)
    // Space: O(k * n)
    `,
    hint: "Think inversely: with k eggs and m moves, what's max floors we can check?",
    tags: ["DP", "Binary Search", "Optimization"],
    points: 150,
  }),

  // Day 101 - Q2 through Q5 and Day 102-103 questions would follow similar pattern...
  // Due to space, I'm including the key remaining questions

  // Day 102 - Q1
  createQuestion({
    title: "Unique Binary Search Trees",
    description:
      "Given an integer n, return the number of structurally unique BST's which has exactly n nodes of unique values from 1 to n.",
    difficulty: "Medium",
    topicId: "102",
    examples: [
      {
        input: "n = 3",
        output: "5",
        explanation: "Catalan number C(3) = 5",
      },
      {
        input: "n = 1",
        output: "1",
        explanation: "Only one tree",
      },
    ],
    testCases: [
      { input: "3", expected: "5", isHidden: false },
      { input: "1", expected: "1", isHidden: true },
      { input: "4", expected: "14", isHidden: true },
      { input: "5", expected: "42", isHidden: true },
      { input: "19", expected: "1767263190", isHidden: true },
    ],
    solution: `
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = dp[1] = 1;
        
        for (int nodes = 2; nodes <= n; nodes++) {
            for (int root = 1; root <= nodes; root++) {
                dp[nodes] += dp[root - 1] * dp[nodes - root];
            }
        }
        
        return dp[n];
    }
    
    // Time: O(n^2)
    // Space: O(n)
    `,
    hint: "Catalan number. dp[n] = sum of dp[i-1] * dp[n-i] for all roots i.",
    tags: ["DP", "BST", "Catalan"],
    points: 120,
  }),

  // Day 103 - Q1
  createQuestion({
    title: "House Robber",
    description:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob without alerting the police.",
    difficulty: "Medium",
    topicId: "103",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (1) and house 3 (3). Total = 4",
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob house 1 (2), house 3 (9), and house 5 (1). Total = 12",
      },
    ],
    testCases: [
      { input: "[1,2,3,1]", expected: "4", isHidden: false },
      { input: "[2,7,9,3,1]", expected: "12", isHidden: true },
      { input: "[2,1,1,2]", expected: "4", isHidden: true },
      { input: "[5,3,4,11,2]", expected: "16", isHidden: true },
      { input: "[226,174,214,16,218,48,153,131,128,17]", expected: "788", isHidden: true },
    ],
    solution: `
    public int rob(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        
        int prev2 = 0, prev1 = 0;
        
        for (int num : nums) {
            int temp = prev1;
            prev1 = Math.max(prev1, prev2 + num);
            prev2 = temp;
        }
        
        return prev1;
    }
    
    // Time: O(n)
    // Space: O(1)
    `,
    hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Can optimize to O(1) space.",
    tags: ["DP", "Array"],
    points: 100,
  }),

  // Day 103 - Q2
  createQuestion({
    title: "House Robber II",
    description:
      "All houses in this place are arranged in a circle. This means the first house is the neighbor of the last one. You cannot rob two adjacent houses. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob without alerting the police.",
    difficulty: "Medium",
    topicId: "103",
    examples: [
      {
        input: "nums = [2,3,2]",
        output: "3",
        explanation: "Cannot rob both first and last",
      },
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 and 3",
      },
    ],
    testCases: [
      { input: "[2,3,2]", expected: "3", isHidden: false },
      { input: "[1,2,3,1]", expected: "4", isHidden: true },
      { input: "[1,2,3]", expected: "3", isHidden: true },
      { input: "[200,3,140,20,10]", expected: "340", isHidden: true },
      { input: "[1,2,1,1]", expected: "3", isHidden: true },
    ],
    solution: `
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(robLinear(nums, 0, nums.length - 2), 
                       robLinear(nums, 1, nums.length - 1));
    }
    
    private int robLinear(int[] nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        
        for (int i = start; i <= end; i++) {
            int temp = prev1;
            prev1 = Math.max(prev1, prev2 + nums[i]);
            prev2 = temp;
        }
        
        return prev1;
    }
    
    // Time: O(n)
    // Space: O(1)
    `,
    hint: "Rob either houses [0..n-2] or [1..n-1], take maximum.",
    tags: ["DP", "Array", "Circular"],
    points: 120,
  }),

  // Day 101 - Q2
  createQuestion({
    title: "Super Egg Drop",
    description:
      "You are given k identical eggs and you have access to a building with n floors. You want to know the highest floor an egg can be dropped from without breaking. Return the minimum number of moves you need to determine with certainty the value of f.",
    difficulty: "Hard",
    topicId: "101",
    examples: [
      {
        input: "k = 1, n = 2",
        output: "2",
        explanation: "Drop from floor 1, then 2 if needed",
      },
      {
        input: "k = 2, n = 6",
        output: "3",
        explanation: "Optimal strategy",
      },
    ],
    testCases: [
      { input: "1, 2", expected: "2", isHidden: false },
      { input: "2, 6", expected: "3", isHidden: true },
      { input: "3, 14", expected: "4", isHidden: true },
      { input: "4, 2000", expected: "16", isHidden: true },
      { input: "10, 10000", expected: "23", isHidden: true },
    ],
    solution: `
    public int superEggDrop(int k, int n) {
        int[][] dp = new int[k + 1][n + 1];
        int m = 0;
        
        while (dp[k][m] < n) {
            m++;
            for (int eggs = 1; eggs <= k; eggs++) {
                dp[eggs][m] = dp[eggs - 1][m - 1] + dp[eggs][m - 1] + 1;
            }
        }
        
        return m;
    }
    
    // Time: O(k * n)
    // Space: O(k * n)
    `,
    hint: "Think: with k eggs and m moves, max floors we can test = dp[k][m].",
    tags: ["DP", "Binary Search"],
    points: 150,
  }),

  // Day 101 - Q3
  createQuestion({
    title: "Minimum Number of Days to Make m Bouquets",
    description:
      "You are given an integer array bloomDay, and two integers m and k. You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden. The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet. Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.",
    difficulty: "Medium",
    topicId: "101",
    examples: [
      {
        input: "bloomDay = [1,10,3,10,2], m = 3, k = 1",
        output: "3",
        explanation: "At day 3: [x, _, x, _, x]",
      },
      {
        input: "bloomDay = [1,10,3,10,2], m = 3, k = 2",
        output: "-1",
        explanation: "Need 6 flowers but only 5 available",
      },
    ],
    testCases: [
      { input: "[1,10,3,10,2], 3, 1", expected: "3", isHidden: false },
      { input: "[1,10,3,10,2], 3, 2", expected: "-1", isHidden: true },
      { input: "[7,7,7,7,12,7,7], 2, 3", expected: "12", isHidden: true },
      { input: "[1000000000,1000000000], 1, 1", expected: "1000000000", isHidden: true },
      { input: "[1,10,2,9,3,8,4,7,5,6], 4, 2", expected: "9", isHidden: true },
    ],
    solution: `
    public int minDays(int[] bloomDay, int m, int k) {
        if ((long) m * k > bloomDay.length) return -1;
        
        int left = 1, right = (int) 1e9;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canMakeBouquets(bloomDay, m, k, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private boolean canMakeBouquets(int[] bloomDay, int m, int k, int day) {
        int bouquets = 0, flowers = 0;
        
        for (int bloom : bloomDay) {
            if (bloom <= day) {
                flowers++;
                if (flowers == k) {
                    bouquets++;
                    flowers = 0;
                }
            } else {
                flowers = 0;
            }
        }
        
        return bouquets >= m;
    }
    
    // Time: O(n * log(max(bloomDay)))
    // Space: O(1)
    `,
    hint: "Binary search on days. Check if we can make m bouquets by day x.",
    tags: ["Binary Search", "Array", "Greedy"],
    points: 120,
  }),

  // Day 101 - Q4
  createQuestion({
    title: "Split Array Largest Sum",
    description:
      "Given an array nums which consists of non-negative integers and an integer m, you can split the array into m non-empty continuous subarrays. Write an algorithm to minimize the largest sum among these m subarrays.",
    difficulty: "Hard",
    topicId: "101",
    examples: [
      {
        input: "nums = [7,2,5,10,8], m = 2",
        output: "18",
        explanation: "Split into [7,2,5] and [10,8]",
      },
      {
        input: "nums = [1,2,3,4,5], m = 2",
        output: "9",
        explanation: "Split into [1,2,3,4] and [5]",
      },
    ],
    testCases: [
      { input: "[7,2,5,10,8], 2", expected: "18", isHidden: false },
      { input: "[1,2,3,4,5], 2", expected: "9", isHidden: true },
      { input: "[1,4,4], 3", expected: "4", isHidden: true },
      { input: "[2,3,1,2,4,3], 5", expected: "4", isHidden: true },
      { input: "[10,5,13,4,8,4,5,11,14,9,16,10,20,8], 8", expected: "25", isHidden: true },
    ],
    solution: `
    public int splitArray(int[] nums, int m) {
        int left = 0, right = 0;
        
        for (int num : nums) {
            left = Math.max(left, num);
            right += num;
        }
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canSplit(nums, m, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private boolean canSplit(int[] nums, int m, int maxSum) {
        int count = 1, currentSum = 0;
        
        for (int num : nums) {
            if (currentSum + num > maxSum) {
                count++;
                currentSum = num;
                if (count > m) return false;
            } else {
                currentSum += num;
            }
        }
        
        return true;
    }
    
    // Time: O(n * log(sum of array))
    // Space: O(1)
    `,
    hint: "Binary search on answer. Check if we can split with maxSum constraint.",
    tags: ["Binary Search", "Array", "Greedy"],
    points: 150,
  }),

  // Day 101 - Q5
  createQuestion({
    title: "Koko Eating Bananas",
    description:
      "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Return the minimum integer k such that she can eat all the bananas within h hours.",
    difficulty: "Medium",
    topicId: "101",
    examples: [
      {
        input: "piles = [3,6,7,11], h = 8",
        output: "4",
        explanation: "Koko can eat at speed 4",
      },
      {
        input: "piles = [30,11,23,4,20], h = 5",
        output: "30",
        explanation: "Must finish in 5 hours",
      },
    ],
    testCases: [
      { input: "[3,6,7,11], 8", expected: "4", isHidden: false },
      { input: "[30,11,23,4,20], 5", expected: "30", isHidden: true },
      { input: "[30,11,23,4,20], 6", expected: "23", isHidden: true },
      { input: "[312884470], 312884469", expected: "2", isHidden: true },
      { input: "[805306368,805306368,805306368], 1000000000", expected: "3", isHidden: true },
    ],
    solution: `
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1, right = 0;
        
        for (int pile : piles) {
            right = Math.max(right, pile);
        }
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canFinish(piles, h, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private boolean canFinish(int[] piles, int h, int speed) {
        long hours = 0;
        for (int pile : piles) {
            hours += (pile + speed - 1) / speed; // Ceiling division
        }
        return hours <= h;
    }
    
    // Time: O(n * log(max(piles)))
    // Space: O(1)
    `,
    hint: "Binary search on eating speed k. Check if Koko can finish in h hours.",
    tags: ["Binary Search", "Array"],
    points: 120,
  }),

  // Day 102 - Q2
  createQuestion({
    title: "Unique Binary Search Trees II",
    description:
      "Given an integer n, return all the structurally unique BST's which has exactly n nodes of unique values from 1 to n. Return the answer in any order.",
    difficulty: "Medium",
    topicId: "102",
    examples: [
      {
        input: "n = 3",
        output: "[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]",
        explanation: "5 unique BSTs",
      },
      {
        input: "n = 1",
        output: "[[1]]",
        explanation: "Only one tree",
      },
    ],
    testCases: [
      { input: "3", expected: "[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]", isHidden: false },
      { input: "1", expected: "[[1]]", isHidden: true },
      { input: "4", expected: "14 trees", isHidden: true },
      { input: "5", expected: "42 trees", isHidden: true },
      { input: "8", expected: "1430 trees", isHidden: true },
    ],
    solution: `
    public List<TreeNode> generateTrees(int n) {
        return generateSubtrees(1, n);
    }
    
    private List<TreeNode> generateSubtrees(int start, int end) {
        List<TreeNode> result = new ArrayList<>();
        
        if (start > end) {
            result.add(null);
            return result;
        }
        
        for (int i = start; i <= end; i++) {
            List<TreeNode> leftTrees = generateSubtrees(start, i - 1);
            List<TreeNode> rightTrees = generateSubtrees(i + 1, end);
            
            for (TreeNode left : leftTrees) {
                for (TreeNode right : rightTrees) {
                    TreeNode root = new TreeNode(i);
                    root.left = left;
                    root.right = right;
                    result.add(root);
                }
            }
        }
        
        return result;
    }
    
    // Time: O(Catalan(n) * n)
    // Space: O(Catalan(n))
    `,
    hint: "For each root i, generate all left subtrees and right subtrees recursively.",
    tags: ["DP", "BST", "Recursion", "Catalan"],
    points: 120,
  }),

  // Day 102 - Q3
  createQuestion({
    title: "Different Ways to Add Parentheses",
    description:
      "Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.",
    difficulty: "Medium",
    topicId: "102",
    examples: [
      {
        input: 'expression = "2-1-1"',
        output: "[0,2]",
        explanation: "((2-1)-1) = 0 and (2-(1-1)) = 2",
      },
      {
        input: 'expression = "2*3-4*5"',
        output: "[-34,-14,-10,-10,10]",
        explanation: "Different parenthesizations",
      },
    ],
    testCases: [
      { input: '"2-1-1"', expected: "[0,2]", isHidden: false },
      { input: '"2*3-4*5"', expected: "[-34,-14,-10,-10,10]", isHidden: true },
      { input: '"1"', expected: "[1]", isHidden: true },
      { input: '"1+2"', expected: "[3]", isHidden: true },
      { input: '"11"', expected: "[11]", isHidden: true },
    ],
    solution: `
    public List<Integer> diffWaysToCompute(String expression) {
        List<Integer> result = new ArrayList<>();
        
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            
            if (c == '+' || c == '-' || c == '*') {
                List<Integer> left = diffWaysToCompute(expression.substring(0, i));
                List<Integer> right = diffWaysToCompute(expression.substring(i + 1));
                
                for (int l : left) {
                    for (int r : right) {
                        if (c == '+') result.add(l + r);
                        else if (c == '-') result.add(l - r);
                        else result.add(l * r);
                    }
                }
            }
        }
        
        if (result.isEmpty()) {
            result.add(Integer.parseInt(expression));
        }
        
        return result;
    }
    
    // Time: O(Catalan(n))
    // Space: O(Catalan(n))
    `,
    hint: "Divide and conquer: split at each operator, recurse on left/right.",
    tags: ["Divide and Conquer", "Recursion", "Catalan"],
    points: 120,
  }),

  // Day 102 - Q4
  createQuestion({
    title: "Catalan Number",
    description:
      "Catalan numbers are a sequence of natural numbers that occur in various counting problems. The nth Catalan number can be directly calculated using the formula: C(n) = (2n)! / ((n+1)! * n!). Implement this calculation efficiently.",
    difficulty: "Medium",
    topicId: "102",
    examples: [
      {
        input: "n = 5",
        output: "42",
        explanation: "C(5) = 42",
      },
      {
        input: "n = 10",
        output: "16796",
        explanation: "C(10) = 16796",
      },
    ],
    testCases: [
      { input: "5", expected: "42", isHidden: false },
      { input: "10", expected: "16796", isHidden: true },
      { input: "1", expected: "1", isHidden: true },
      { input: "15", expected: "9694845", isHidden: true },
      { input: "19", expected: "1767263190", isHidden: true },
    ],
    solution: `
    public int catalanNumber(int n) {
        long[] dp = new long[n + 1];
        dp[0] = dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - 1 - j];
            }
        }
        
        return (int) dp[n];
    }
    
    // Alternative: Using binomial coefficient formula
    // C(n) = C(2n, n) / (n + 1)
    public int catalanNumberFormula(int n) {
        long result = 1;
        
        for (int i = 0; i < n; i++) {
            result = result * (2 * n - i) / (i + 1);
        }
        
        return (int) (result / (n + 1));
    }
    
    // Time: O(n^2) for DP, O(n) for formula
    // Space: O(n)
    `,
    hint: "C(n) = sum of C(i) * C(n-1-i) for i=0 to n-1. Or use binomial formula.",
    tags: ["DP", "Math", "Catalan"],
    points: 120,
  }),

  // Day 102 - Q5
  createQuestion({
    title: "Number of Ways to Stay in the Same Place After Some Steps",
    description:
      "You have a pointer at index 0 in an array of size arrLen. At each step, you can move 1 position to the left, 1 position to the right in the array, or stay in the same place. Given two integers steps and arrLen, return the number of ways such that your pointer still at index 0 after exactly steps steps. Since the answer may be too large, return it modulo 10^9 + 7.",
    difficulty: "Hard",
    topicId: "102",
    examples: [
      {
        input: "steps = 3, arrLen = 2",
        output: "4",
        explanation: "4 possible ways: RLR, RRL, LRR, SSS... (where R=right, L=left, S=stay)",
      },
      {
        input: "steps = 2, arrLen = 4",
        output: "2",
        explanation: "SS, RL",
      },
    ],
    testCases: [
      { input: "3, 2", expected: "4", isHidden: false },
      { input: "2, 4", expected: "2", isHidden: true },
      { input: "4, 2", expected: "8", isHidden: true },
      { input: "27, 7", expected: "127784505", isHidden: true },
      { input: "500, 500000", expected: "374847123", isHidden: true },
    ],
    solution: `
    public int numWays(int steps, int arrLen) {
        int MOD = 1000000007;
        int maxPos = Math.min(steps / 2, arrLen - 1);
        
        int[][] dp = new int[steps + 1][maxPos + 1];
        dp[0][0] = 1;
        
        for (int i = 1; i <= steps; i++) {
            for (int j = 0; j <= maxPos; j++) {
                dp[i][j] = dp[i - 1][j]; // Stay
                if (j > 0) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD; // From left
                }
                if (j < maxPos) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j + 1]) % MOD; // From right
                }
            }
        }
        
        return dp[steps][0];
    }
    
    // Time: O(steps * min(steps, arrLen))
    // Space: O(steps * min(steps, arrLen))
    `,
    hint: "dp[i][j] = ways to reach position j in i steps. Can optimize to O(steps) space.",
    tags: ["DP", "Combinatorics"],
    points: 150,
  }),

  // Day 103 - Q3
  createQuestion({
    title: "House Robber III",
    description:
      "The houses form a binary tree. The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root. Besides the root, each house has one and only one parent house. After a tour, the thief found that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night. Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.",
    difficulty: "Medium",
    topicId: "103",
    examples: [
      {
        input: "root = [3,2,3,null,3,null,1]",
        output: "7",
        explanation: "Rob 3 + 3 + 1 = 7",
      },
      {
        input: "root = [3,4,5,1,3,null,1]",
        output: "9",
        explanation: "Rob 4 + 5 = 9",
      },
    ],
    testCases: [
      { input: "[3,2,3,null,3,null,1]", expected: "7", isHidden: false },
      { input: "[3,4,5,1,3,null,1]", expected: "9", isHidden: true },
      { input: "[1]", expected: "1", isHidden: true },
      { input: "[2,1,3,null,4]", expected: "7", isHidden: true },
      { input: "[4,1,null,2,null,3]", expected: "7", isHidden: true },
    ],
    solution: `
    public int rob(TreeNode root) {
        int[] result = robHelper(root);
        return Math.max(result[0], result[1]);
    }
    
    private int[] robHelper(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        
        int[] left = robHelper(node.left);
        int[] right = robHelper(node.right);
        
        // [0]: don't rob this node, [1]: rob this node
        int[] result = new int[2];
        
        // If we don't rob current, we can take max from children
        result[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        
        // If we rob current, we can't rob children
        result[1] = node.val + left[0] + right[0];
        
        return result;
    }
    
    // Time: O(n)
    // Space: O(h) where h is height
    `,
    hint: "Return two values: max when robbing node, max when not robbing node.",
    tags: ["DP", "Tree", "DFS"],
    points: 120,
  }),

  // Day 103 - Q4
  createQuestion({
    title: "Maximum Profit in Job Scheduling",
    description:
      "We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i]. You're given the startTime, endTime and profit arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range. If you choose a job that ends at time X you will be able to start another job that starts at time X.",
    difficulty: "Hard",
    topicId: "103",
    examples: [
      {
        input: "startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]",
        output: "120",
        explanation: "Choose jobs 1 and 4",
      },
      {
        input: "startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]",
        output: "150",
        explanation: "Choose jobs 2 and 5",
      },
    ],
    testCases: [
      { input: "[1,2,3,3], [3,4,5,6], [50,10,40,70]", expected: "120", isHidden: false },
      { input: "[1,2,3,4,6], [3,5,10,6,9], [20,20,100,70,60]", expected: "150", isHidden: true },
      { input: "[1,1,1], [2,3,4], [5,6,4]", expected: "6", isHidden: true },
      { input: "[6,15,7,11,1,3,16,2], [19,18,19,16,10,8,19,8], [2,9,1,19,5,7,3,19]", expected: "41", isHidden: true },
      { input: "[4,2,4,8,2], [5,5,5,10,8], [1,2,8,10,4]", expected: "18", isHidden: true },
    ],
    solution: `
    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        int n = startTime.length;
        int[][] jobs = new int[n][3];
        
        for (int i = 0; i < n; i++) {
            jobs[i] = new int[]{startTime[i], endTime[i], profit[i]};
        }
        
        Arrays.sort(jobs, (a, b) -> a[1] - b[1]); // Sort by end time
        
        TreeMap<Integer, Integer> dp = new TreeMap<>();
        dp.put(0, 0);
        
        for (int[] job : jobs) {
            int start = job[0], end = job[1], prof = job[2];
            
            int maxProfitBefore = dp.floorEntry(start).getValue();
            int currentMax = dp.lastEntry().getValue();
            
            if (maxProfitBefore + prof > currentMax) {
                dp.put(end, maxProfitBefore + prof);
            }
        }
        
        return dp.lastEntry().getValue();
    }
    
    // Time: O(n log n)
    // Space: O(n)
    `,
    hint: "Sort by end time. Use TreeMap to track max profit up to each time point.",
    tags: ["DP", "Binary Search", "Interval Scheduling"],
    points: 150,
  }),

  // Day 103 - Q5
  createQuestion({
    title: "Paint House",
    description:
      "There is a row of n houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color. The cost of painting each house with a certain color is represented by an n x 3 cost matrix costs. Return the minimum cost to paint all houses.",
    difficulty: "Medium",
    topicId: "103",
    examples: [
      {
        input: "costs = [[17,2,17],[16,16,5],[14,3,19]]",
        output: "10",
        explanation: "Paint house 0 blue, house 1 green, house 2 blue. Total: 2+5+3=10",
      },
      {
        input: "costs = [[7,6,2]]",
        output: "2",
        explanation: "Only one house, paint it green",
      },
    ],
    testCases: [
      { input: "[[17,2,17],[16,16,5],[14,3,19]]", expected: "10", isHidden: false },
      { input: "[[7,6,2]]", expected: "2", isHidden: true },
      { input: "[[3,5,3],[6,17,6],[7,13,18],[9,10,18]]", expected: "26", isHidden: true },
      { input: "[[20,18,4],[9,9,10]]", expected: "13", isHidden: true },
      { input: "[[5,8,6],[19,14,13],[7,5,12],[14,15,17],[3,20,10]]", expected: "43", isHidden: true },
    ],
    solution: `
    public int minCost(int[][] costs) {
        if (costs == null || costs.length == 0) return 0;
        
        int n = costs.length;
        int[][] dp = new int[n][3];
        
        dp[0][0] = costs[0][0];
        dp[0][1] = costs[0][1];
        dp[0][2] = costs[0][2];
        
        for (int i = 1; i < n; i++) {
            dp[i][0] = costs[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
            dp[i][1] = costs[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
            dp[i][2] = costs[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
        }
        
        return Math.min(dp[n - 1][0], Math.min(dp[n - 1][1], dp[n - 1][2]));
    }
    
    // Space optimized version
    public int minCostOptimized(int[][] costs) {
        int prev0 = costs[0][0], prev1 = costs[0][1], prev2 = costs[0][2];
        
        for (int i = 1; i < costs.length; i++) {
            int curr0 = costs[i][0] + Math.min(prev1, prev2);
            int curr1 = costs[i][1] + Math.min(prev0, prev2);
            int curr2 = costs[i][2] + Math.min(prev0, prev1);
            
            prev0 = curr0;
            prev1 = curr1;
            prev2 = curr2;
        }
        
        return Math.min(prev0, Math.min(prev1, prev2));
    }
    
    // Time: O(n)
    // Space: O(1)
    `,
    hint: "dp[i][color] = min cost to paint house i with color. Can optimize to O(1) space.",
    tags: ["DP", "Array"],
    points: 120,
  }),

];

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("✅ Connected to MongoDB");

    console.log("\n📝 Creating Topics...");
    for (const topic of topics) {
      const exists = await Topic.findOne({ id: topic.id });
      if (!exists) {
        await Topic.create(topic);
        console.log(`✅ Created: ${topic.title}`);
      } else {
        console.log(`⏭️  Exists: ${topic.title}`);
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
      `\n🎉 Days 96-103 processing complete! Created ${createdCount} questions, skipped ${skippedCount} existing`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
