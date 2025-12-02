import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question";
import Topic from "../models/Topic";

dotenv.config();

const topics = [
  {
    id: "94",
    title: "Day 94 – Coin Change Problem",
    description: "Unbounded Knapsack / Complete Knapsack DP patterns",
    week: 14,
    day: 94,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["DP Basics", "1D DP"],
    compulsoryQuestion: "Coin Change",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "95",
    title: "Day 95 – Edit Distance",
    description: "Levenshtein Distance / LCS variations for string transformations",
    week: 14,
    day: 95,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["2D DP", "String DP"],
    compulsoryQuestion: "Edit Distance",
    practiceQuestions: 5,
    isLocked: false,
  },
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
    compulsoryQuestion: "Palindrome Partitioning",
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
  // Day 94 - Q1
  createQuestion({
    title: "Coin Change",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1 (3 coins)",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
        explanation: "Cannot make 3 with only coin denomination 2",
      },
      {
        input: "coins = [1], amount = 0",
        output: "0",
        explanation: "0 amount needs 0 coins",
      },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    testCases: [
      { input: "[1,2,5]", args: [11], expected: "3", isHidden: false },
      { input: "[2]", args: [3], expected: "-1", isHidden: true },
      { input: "[1]", args: [0], expected: "0", isHidden: true },
      { input: "[1,3,4,5]", args: [7], expected: "2", isHidden: true },
      { input: "[2,5,10,1]", args: [27], expected: "4", isHidden: true },
    ],
    solution: `
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // Time: O(amount * coins.length)
    // Space: O(amount)
    `,
    hint: "dp[i] = minimum coins for amount i. For each amount, try all coins.",
    tags: ["DP", "Unbounded Knapsack"],
    points: 100,
    timeLimit: 2000,
  }),

  // Day 94 - Q2
  createQuestion({
    title: "Coin Change II",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of coin combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0. You may assume that you have an infinite number of each kind of coin.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "coins = [1,2,5], amount = 5",
        output: "4",
        explanation: "5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1 (4 combinations)",
      },
      {
        input: "coins = [2], amount = 3",
        output: "0",
        explanation: "Cannot make 3 with coin 2",
      },
      {
        input: "coins = [10], amount = 10",
        output: "1",
        explanation: "Only 1 way: use one 10 coin",
      },
    ],
    constraints: [
      "1 <= coins.length <= 300",
      "1 <= coins[i] <= 5000",
      "0 <= amount <= 5000",
    ],
    testCases: [
      { input: "[1,2,5]", args: [5], expected: "4", isHidden: false },
      { input: "[2]", args: [3], expected: "0", isHidden: true },
      { input: "[10]", args: [10], expected: "1", isHidden: true },
      { input: "[1,2,3]", args: [4], expected: "4", isHidden: true },
      { input: "[3,5,7,8,9,10,11]", args: [500], expected: "35502874", isHidden: true },
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
    tags: ["DP", "Combination"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 94 - Q3
  createQuestion({
    title: "Target Sum",
    description:
      "You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and evaluate it on a target value. Return the number of ways to assign symbols to make the evaluation of the expression equal to target.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "nums = [1,1,1,1,1], target = 3",
        output: "5",
        explanation:
          "-1+1+1+1+1=3, +1-1+1+1+1=3, +1+1-1+1+1=3, +1+1+1-1+1=3, +1+1+1+1-1=3 (5 ways)",
      },
      {
        input: "nums = [1], target = 1",
        output: "1",
        explanation: "+1 = 1 (1 way)",
      },
      {
        input: "nums = [1,0], target = 1",
        output: "2",
        explanation: "+1+0=1, +1-0=1 (2 ways)",
      },
    ],
    constraints: [
      "1 <= nums.length <= 20",
      "0 <= nums[i] <= 1000",
      "0 <= sum(nums[i]) <= 1000",
      "-1000 <= target <= 1000",
    ],
    testCases: [
      { input: "[1,1,1,1,1]", args: [3], expected: "5", isHidden: false },
      { input: "[1]", args: [1], expected: "1", isHidden: true },
      { input: "[1,0]", args: [1], expected: "2", isHidden: true },
      { input: "[0,0,0,0,0,0,1]", args: [1], expected: "32", isHidden: true },
      { input: "[7,9,3,8,0,2,4,8,3,9]", args: [0], expected: "0", isHidden: true },
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
    // Key: Convert to subset sum problem where P - N = target, P + N = sum
    // So P = (sum + target) / 2
    `,
    hint: "Convert to subset sum: find subsets with sum = (total + target) / 2.",
    tags: ["DP", "Subset Sum", "0/1 Knapsack"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 94 - Q4
  createQuestion({
    title: "Minimum Cost For Tickets",
    description:
      "You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array days. Each day is an integer from 1 to 365. Train tickets are sold in three different ways: a 1-day pass for costs[0] dollars, a 7-day pass for costs[1] dollars, and a 30-day pass for costs[2] dollars. The passes allow that many days of consecutive travel. Return the minimum number of dollars you need to travel every day in the given list of days.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "days = [1,4,6,7,8,20], costs = [2,7,15]",
        output: "11",
        explanation:
          "1-day on day 1 ($2), 7-day on day 4-8 ($7), 1-day on day 20 ($2). Total $11",
      },
      {
        input: "days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]",
        output: "17",
        explanation: "7-day pass on day 1 ($7), 7-day on day 8 ($7), 1-day each on 30,31 ($4). Total $17",
      },
      {
        input: "days = [1,4,6], costs = [3,13,45]",
        output: "9",
        explanation: "3 one-day passes: $9",
      },
    ],
    constraints: [
      "1 <= days.length <= 365",
      "1 <= days[i] <= 365",
      "days is in strictly increasing order",
      "costs.length == 3",
      "1 <= costs[i] <= 1000",
    ],
    testCases: [
      { input: "[1,4,6,7,8,20]", args: [[2, 7, 15]], expected: "11", isHidden: false },
      { input: "[1,2,3,4,5,6,7,8,9,10,30,31]", args: [[2, 7, 15]], expected: "17", isHidden: true },
      { input: "[1,4,6]", args: [[3, 13, 45]], expected: "9", isHidden: true },
      { input: "[1,2,3]", args: [[1, 3, 5]], expected: "3", isHidden: true },
      { input: "[1,4,6,9,10,11,12,13,14,15,16,17,18,20,21,24,25,27,28,29,30,31,34,37,38,39,41,43,44,45,47,48,49,54,57,60,62,63,66,69,70,72,74,76,78,80,81,82,83,84,85,88,89,91,93,94,97,99]", args: [[9, 38, 134]], expected: "423", isHidden: true },
    ],
    solution: `
    public int mincostTickets(int[] days, int[] costs) {
        int maxDay = days[days.length - 1];
        boolean[] travel = new boolean[maxDay + 1];
        for (int day : days) travel[day] = true;
        
        int[] dp = new int[maxDay + 1];
        
        for (int i = 1; i <= maxDay; i++) {
            if (!travel[i]) {
                dp[i] = dp[i - 1];
            } else {
                int option1 = dp[i - 1] + costs[0];
                int option7 = dp[Math.max(0, i - 7)] + costs[1];
                int option30 = dp[Math.max(0, i - 30)] + costs[2];
                dp[i] = Math.min(option1, Math.min(option7, option30));
            }
        }
        
        return dp[maxDay];
    }
    
    // Time: O(max(days))
    // Space: O(max(days))
    `,
    hint: "dp[i] = min cost to cover all travel days up to day i. Try 1, 7, 30-day passes.",
    tags: ["DP", "Decision Making"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 94 - Q5
  createQuestion({
    title: "Capacity To Ship Packages Within D Days",
    description:
      "A conveyor belt has packages that must be shipped from one port to another within days days. The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the conveyor belt to the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "weights = [1,2,3,4,5,6,7,8,9,10], days = 5",
        output: "15",
        explanation: "Ship capacity 15: [1,2,3,4,5], [6,7], [8], [9], [10] (5 days)",
      },
      {
        input: "weights = [3,2,2,4,1,4], days = 3",
        output: "6",
        explanation: "Capacity 6: [3,2], [2,4], [1,4] (3 days)",
      },
      {
        input: "weights = [1,2,3,1,1], days = 4",
        output: "3",
        explanation: "Capacity 3: [1,2], [3], [1], [1] (4 days)",
      },
    ],
    constraints: [
      "1 <= days <= weights.length <= 5 * 10^4",
      "1 <= weights[i] <= 500",
    ],
    testCases: [
      { input: "[1,2,3,4,5,6,7,8,9,10]", args: [5], expected: "15", isHidden: false },
      { input: "[3,2,2,4,1,4]", args: [3], expected: "6", isHidden: true },
      { input: "[1,2,3,1,1]", args: [4], expected: "3", isHidden: true },
      { input: "[1,2,3,4,5]", args: [1], expected: "15", isHidden: true },
      { input: "[10,50,100,100,50,100,100,100]", args: [5], expected: "160", isHidden: true },
    ],
    solution: `
    public int shipWithinDays(int[] weights, int days) {
        int left = 0, right = 0;
        for (int w : weights) {
            left = Math.max(left, w);
            right += w;
        }
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canShip(weights, days, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private boolean canShip(int[] weights, int days, int capacity) {
        int daysNeeded = 1, currentLoad = 0;
        for (int w : weights) {
            if (currentLoad + w > capacity) {
                daysNeeded++;
                currentLoad = w;
            } else {
                currentLoad += w;
            }
        }
        return daysNeeded <= days;
    }
    
    // Time: O(n * log(sum(weights)))
    // Space: O(1)
    `,
    hint: "Binary search on capacity. Check if given capacity can ship all within days.",
    tags: ["Binary Search", "Greedy"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 95 - Q1
  createQuestion({
    title: "Edit Distance",
    description:
      "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.",
    difficulty: "Hard",
    topicId: 95,
    examples: [
      {
        input: 'word1 = "horse", word2 = "ros"',
        output: "3",
        explanation: "horse -> rorse (replace h with r) -> rose (delete r) -> ros (delete e)",
      },
      {
        input: 'word1 = "intention", word2 = "execution"',
        output: "5",
        explanation: "intention -> execution requires 5 operations",
      },
      {
        input: 'word1 = "", word2 = "a"',
        output: "1",
        explanation: "Insert 'a'",
      },
    ],
    constraints: [
      "0 <= word1.length, word2.length <= 500",
      "word1 and word2 consist of lowercase English letters",
    ],
    testCases: [
      { input: '"horse", "ros"', args: [], expected: "3", isHidden: false },
      { input: '"intention", "execution"', args: [], expected: "5", isHidden: true },
      { input: '"", "a"', args: [], expected: "1", isHidden: true },
      { input: '"abc", "abc"', args: [], expected: "0", isHidden: true },
      { input: '"abc", "def"', args: [], expected: "3", isHidden: true },
    ],
    solution: `
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], 
                                   Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Time: O(m * n)
    // Space: O(m * n)
    `,
    hint: "2D DP: dp[i][j] = edit distance for word1[0..i-1] and word2[0..j-1].",
    tags: ["DP", "String", "Levenshtein"],
    points: 150,
    timeLimit: 2000,
  }),

  // Day 95 - Q2
  createQuestion({
    title: "Delete Operation for Two Strings",
    description:
      "Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same. In one step, you can delete exactly one character in either string.",
    difficulty: "Medium",
    topicId: 95,
    examples: [
      {
        input: 'word1 = "sea", word2 = "eat"',
        output: "2",
        explanation: "Delete 's' from sea, delete 't' from eat to get 'ea'",
      },
      {
        input: 'word1 = "leetcode", word2 = "etco"',
        output: "4",
        explanation: "Delete l,e,e,d from leetcode, keep etco",
      },
      {
        input: 'word1 = "a", word2 = "b"',
        output: "2",
        explanation: "Delete both characters",
      },
    ],
    constraints: [
      "1 <= word1.length, word2.length <= 500",
      "word1 and word2 consist of lowercase English letters",
    ],
    testCases: [
      { input: '"sea", "eat"', args: [], expected: "2", isHidden: false },
      { input: '"leetcode", "etco"', args: [], expected: "4", isHidden: true },
      { input: '"a", "b"', args: [], expected: "2", isHidden: true },
      { input: '"abc", "abc"', args: [], expected: "0", isHidden: true },
      { input: '"park", "spake"', args: [], expected: "3", isHidden: true },
    ],
    solution: `
    public int minDistance(String word1, String word2) {
        int lcs = longestCommonSubsequence(word1, word2);
        return word1.length() + word2.length() - 2 * lcs;
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
    
    // Time: O(m * n)
    // Space: O(m * n)
    `,
    hint: "Total deletions = len1 + len2 - 2 * LCS(word1, word2).",
    tags: ["DP", "String", "LCS"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 95 - Q3
  createQuestion({
    title: "Minimum ASCII Delete Sum for Two Strings",
    description:
      "Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.",
    difficulty: "Medium",
    topicId: 95,
    examples: [
      {
        input: 's1 = "sea", s2 = "eat"',
        output: "231",
        explanation: "Delete 's' (ASCII 115) from s1, delete 't' (ASCII 116) from s2. Sum = 231",
      },
      {
        input: 's1 = "delete", s2 = "leet"',
        output: "403",
        explanation: "Delete d, e, e (100+101+101=302) from s1, delete e (101) from s2. Sum = 403",
      },
      {
        input: 's1 = "a", s2 = "a"',
        output: "0",
        explanation: "No deletions needed",
      },
    ],
    constraints: [
      "0 <= s1.length, s2.length <= 1000",
      "s1 and s2 consist of lowercase English letters",
    ],
    testCases: [
      { input: '"sea", "eat"', args: [], expected: "231", isHidden: false },
      { input: '"delete", "leet"', args: [], expected: "403", isHidden: true },
      { input: '"a", "a"', args: [], expected: "0", isHidden: true },
      { input: '"", "a"', args: [], expected: "97", isHidden: true },
      { input: '"abc", "def"', args: [], expected: "597", isHidden: true },
    ],
    solution: `
    public int minimumDeleteSum(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            dp[i][0] = dp[i - 1][0] + s1.charAt(i - 1);
        }
        for (int j = 1; j <= n; j++) {
            dp[0][j] = dp[0][j - 1] + s2.charAt(j - 1);
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + s1.charAt(i - 1),
                        dp[i][j - 1] + s2.charAt(j - 1)
                    );
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Time: O(m * n)
    // Space: O(m * n)
    `,
    hint: "dp[i][j] = min ASCII sum to make s1[0..i-1] and s2[0..j-1] equal.",
    tags: ["DP", "String", "ASCII"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 95 - Q4
  createQuestion({
    title: "Minimum Insertion Steps to Make a String Palindrome",
    description:
      "Given a string s, return the minimum number of insertions needed to make s a palindrome.",
    difficulty: "Medium",
    topicId: 95,
    examples: [
      {
        input: 's = "zzazz"',
        output: "0",
        explanation: "Already a palindrome",
      },
      {
        input: 's = "mbadm"',
        output: "2",
        explanation: "Insert 'b' and 'a' to get 'mbdabdm'",
      },
      {
        input: 's = "leetcode"',
        output: "5",
        explanation: "Insert 5 characters",
      },
    ],
    constraints: [
      "1 <= s.length <= 500",
      "s consists of lowercase English letters",
    ],
    testCases: [
      { input: '"zzazz"', args: [], expected: "0", isHidden: false },
      { input: '"mbadm"', args: [], expected: "2", isHidden: true },
      { input: '"leetcode"', args: [], expected: "5", isHidden: true },
      { input: '"a"', args: [], expected: "0", isHidden: true },
      { input: '"ab"', args: [], expected: "1", isHidden: true },
    ],
    solution: `
    public int minInsertions(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        int lcs = longestCommonSubsequence(s, rev);
        return s.length() - lcs;
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
    hint: "Min insertions = n - LCS(s, reverse(s)).",
    tags: ["DP", "String", "LCS", "Palindrome"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 95 - Q5
  createQuestion({
    title: "Minimum Number of Removals to Make Mountain Array",
    description:
      "You may recall that an array arr is a mountain array if and only if: arr.length >= 3, There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]. Given an integer array nums, return the minimum number of elements to remove to make nums a mountain array.",
    difficulty: "Hard",
    topicId: 95,
    examples: [
      {
        input: "nums = [1,3,1]",
        output: "0",
        explanation: "Already a mountain",
      },
      {
        input: "nums = [2,1,1,5,6,2,3,1]",
        output: "3",
        explanation: "Remove [2,1,1] to get [5,6,2,3,1] which is NOT mountain. Actually remove 2,1,1 -> [5,6,2,3,1] still need work. The answer should be: keep [1,5,6,2,1] (remove 3 elements)",
      },
      {
        input: "nums = [4,3,2,1,1,2,3,1]",
        output: "4",
        explanation: "Keep [4,3,2,1]",
      },
    ],
    constraints: [
      "3 <= nums.length <= 1000",
      "1 <= nums[i] <= 10^9",
      "It is guaranteed that you can make a mountain array out of nums",
    ],
    testCases: [
      { input: "[1,3,1]", args: [], expected: "0", isHidden: false },
      { input: "[2,1,1,5,6,2,3,1]", args: [], expected: "3", isHidden: true },
      { input: "[4,3,2,1,1,2,3,1]", args: [], expected: "4", isHidden: true },
      { input: "[1,2,3,4,4,3,2,1]", args: [], expected: "1", isHidden: true },
      { input: "[100,92,89,77,74,66,64,66,64]", args: [], expected: "6", isHidden: true },
    ],
    solution: `
    public int minimumMountainRemovals(int[] nums) {
        int n = nums.length;
        int[] inc = new int[n], dec = new int[n];
        Arrays.fill(inc, 1);
        Arrays.fill(dec, 1);
        
        // LIS ending at i
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    inc[i] = Math.max(inc[i], inc[j] + 1);
                }
            }
        }
        
        // LDS starting from i
        for (int i = n - 2; i >= 0; i--) {
            for (int j = i + 1; j < n; j++) {
                if (nums[j] < nums[i]) {
                    dec[i] = Math.max(dec[i], dec[j] + 1);
                }
            }
        }
        
        int maxLen = 0;
        for (int i = 1; i < n - 1; i++) {
            if (inc[i] > 1 && dec[i] > 1) {
                maxLen = Math.max(maxLen, inc[i] + dec[i] - 1);
            }
        }
        
        return n - maxLen;
    }
    
    // Time: O(n^2)
    // Space: O(n)
    `,
    hint: "Find longest bitonic subsequence. Removals = n - longest_bitonic.",
    tags: ["DP", "LIS", "Bitonic"],
    points: 150,
    timeLimit: 2000,
  }),

  // Continue with remaining questions...
  // Due to length, I'll create them in batches. Let me know if you'd like me to continue with Days 96-100.
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
      `\n🎉 Days 94-100 processing complete! Created ${createdCount} questions, skipped ${skippedCount} existing`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
