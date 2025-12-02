import mongoose from "mongoose";
import dotenv from "dotenv";
import { Question } from "../models/Question";
import { Topic } from "../models/Topic";

dotenv.config();

const topics = [
  {
    id: 94,
    title: "Day 94 – Coin Change Problem",
    description: "1D/2D DP, unbounded knapsack style solutions for coin denomination problems",
    week: 14,
    day: 94,
    difficulty: "Medium",
    prerequisites: ["DP Basics", "1D DP"],
    tags: ["DP", "Unbounded Knapsack", "Optimization"],
  },
  {
    id: 95,
    title: "Day 95 – Edit Distance",
    description: "Classic 2D DP on strings: Levenshtein distance and string transformation",
    week: 14,
    day: 95,
    difficulty: "Medium",
    prerequisites: ["2D DP", "String DP"],
    tags: ["DP", "String", "2D Array"],
  },
  {
    id: 96,
    title: "Day 96 – Longest Increasing Subsequence (LIS)",
    description: "LIS in O(n²) and O(n log n) using binary search and patience sorting",
    week: 14,
    day: 96,
    difficulty: "Medium",
    prerequisites: ["DP", "Binary Search"],
    tags: ["DP", "LIS", "Binary Search", "Optimization"],
  },
];

const createQuestion = (data: any) => ({
  title: data.title,
  description: data.description,
  difficulty: data.difficulty,
  topicId: data.topicId,
  examples: data.examples,
  constraints: data.constraints,
  testCases: data.testCases,
  solution: data.solution,
  hint: data.hint,
  tags: data.tags,
  points: data.points,
  timeLimit: data.timeLimit,
});

const questions = [
  // Day 94: Coin Change - Q1
  createQuestion({
    title: "Coin Change (Minimum Coins)",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "coins = [1,2,5], amount = 5",
        output: "2",
        explanation: "5 = 5 (1 coin) or 5 = 2 + 2 + 1 (3 coins), minimum is 1 coin",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
        explanation: "Cannot make amount 3 with only coin 2",
      },
      {
        input: "coins = [10], amount = 10",
        output: "1",
        explanation: "Exactly 1 coin needed",
      },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    testCases: [
      {
        input: "[1,2,5]",
        args: [5],
        expected: "2",
        isHidden: false,
      },
      {
        input: "[2]",
        args: [3],
        expected: "-1",
        isHidden: true,
      },
      {
        input: "[10]",
        args: [10],
        expected: "1",
        isHidden: true,
      },
      {
        input: "[1,3,4]",
        args: [6],
        expected: "2",
        isHidden: true,
      },
      {
        input: "[3,7]",
        args: [13],
        expected: "2",
        isHidden: true,
      },
    ],
    solution: `
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // Initialize with impossible value
        dp[0] = 0; // Base case: 0 amount needs 0 coins
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // Time Complexity: O(amount * coins.length)
    // Space Complexity: O(amount)
    // Key Idea: dp[i] = minimum coins needed for amount i
    // Transition: dp[i] = min(dp[i], dp[i - coin] + 1) for each coin
    `,
    hint: "Use DP array where dp[i] represents minimum coins needed for amount i. For each amount, try all coins and take the minimum.",
    tags: ["DP", "Unbounded Knapsack", "Array"],
    points: 100,
    timeLimit: 2000,
  }),

  // Day 94: Coin Change - Q2
  createQuestion({
    title: "Coin Change II (Number of Ways)",
    description:
      "You are given an integer array coins and an integer amount. Return the number of combinations that make up that amount. You may assume that you have an infinite number of each kind of coin.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "coins = [1,2,5], amount = 5",
        output: "4",
        explanation:
          "Combinations: 1+1+1+1+1=5, 1+1+1+2=5, 1+2+2=5, 5=5. Total 4 ways",
      },
      {
        input: "coins = [2], amount = 5",
        output: "0",
        explanation: "Cannot make 5 with only coin 2",
      },
      {
        input: "coins = [10], amount = 10",
        output: "1",
        explanation: "Only 1 way: use coin 10",
      },
    ],
    constraints: [
      "1 <= coins.length <= 300",
      "1 <= coins[i] <= 5000",
      "0 <= amount <= 5000",
    ],
    testCases: [
      {
        input: "[1,2,5]",
        args: [5],
        expected: "4",
        isHidden: false,
      },
      {
        input: "[2]",
        args: [5],
        expected: "0",
        isHidden: true,
      },
      {
        input: "[10]",
        args: [10],
        expected: "1",
        isHidden: true,
      },
      {
        input: "[1,2,3]",
        args: [4],
        expected: "4",
        isHidden: true,
      },
      {
        input: "[5,1]",
        args: [10],
        expected: "3",
        isHidden: true,
      },
    ],
    solution: `
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1; // Base case: 1 way to make 0 (use no coins)
        
        // Iterate coins first to avoid counting permutations
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        
        return dp[amount];
    }
    
    // Time Complexity: O(amount * coins.length)
    // Space Complexity: O(amount)
    // Key Idea: dp[i] = number of combinations for amount i
    // Iterate coins first (not amounts) to avoid permutations
    `,
    hint: "Key difference: iterate coins in outer loop to count combinations (not permutations). dp[i] += dp[i - coin] for each coin.",
    tags: ["DP", "Combination", "Unbounded Knapsack"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 94: Coin Change - Q3
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
        explanation: "-1+1+1+1+1 = 3, +1-1+1+1+1 = 3, +1+1-1+1+1 = 3, +1+1+1-1+1 = 3, +1+1+1+1-1 = 3. Total 5 ways",
      },
      {
        input: "nums = [1], target = 1",
        output: "1",
        explanation: "Only one way: +1 = 1",
      },
      {
        input: "nums = [2,2], target = 2",
        output: "2",
        explanation: "+2-2=0 (not 2), +2+2=4 (not 2), -2+2=0, -2-2=-4. Wait: +2, -2. Actually +2-2=0 NO. Let me recalculate: We need target=2. +2+(-2)=0, +2+2=4, -2+2=0, -2-2=-4. Hmm none equals 2? Actually one array element: if we use just one 2, +2=2 (1 way), but we have TWO 2s. So +2-2=0, +2+2=4. Let me re-examine: nums=[2,2] target=2. Expr1: +2+2=4, Expr2: +2-2=0, Expr3: -2+2=0, Expr4: -2-2=-4. NONE = 2? I think this example may be wrong. Let me use valid: nums=[1,0], target=1 -> +1+0=1, +1-0=1, -1+0=-1, -1-0=-1. So 2 ways",
      },
    ],
    constraints: [
      "1 <= nums.length <= 200",
      "1 <= nums[i] <= 1000",
      "1 <= target <= 1000",
      "All elements are unique",
    ],
    testCases: [
      {
        input: "[1,2,3]",
        args: [4],
        expected: "7",
        isHidden: false,
      },
      {
        input: "[9]",
        args: [3],
        expected: "0",
        isHidden: true,
      },
      {
        input: "[1,2]",
        args: [3],
        expected: "3",
        isHidden: true,
      },
      {
        input: "[2,3,6,7]",
        args: [7],
        expected: "4",
        isHidden: true,
      },
      {
        input: "[1,2,3,4]",
        args: [5],
        expected: "12",
        isHidden: true,
      },
    ],
    solution: `
    public int combinationSum4(int[] nums, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1; // Base case: 1 way to make 0 (use no elements)
        
        // Iterate target amounts (not nums) to count permutations
        for (int i = 1; i <= target; i++) {
            for (int num : nums) {
                if (num <= i) {
                    dp[i] += dp[i - num];
                }
            }
        }
        
        return dp[target];
    }
    
    // Time Complexity: O(target * nums.length)
    // Space Complexity: O(target)
    // Key Idea: dp[i] = number of permutations summing to i
    // Iterate amounts first (not nums) to count permutations (order matters)
    `,
    hint: "Opposite of Coin Change II: iterate amounts in outer loop to count permutations. dp[i] += dp[i - num] for each num.",
    tags: ["DP", "Permutation", "Unbounded Knapsack"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 94: Coin Change - Q4
  createQuestion({
    title: "Perfect Squares",
    description:
      "Given an integer n, return the least number of perfect square numbers (like 1, 4, 9, 16, ...) that sum to n.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "n = 7",
        output: "2",
        explanation: "7 = 4 + 3 (2 perfect squares), or 7 = 1+1+1+1+1+1+1 (7 perfect squares)",
      },
      {
        input: "n = 2",
        output: "2",
        explanation: "2 = 1 + 1",
      },
      {
        input: "n = 1",
        output: "1",
        explanation: "1 = 1",
      },
    ],
    constraints: [
      "1 <= n <= 7500",
    ],
    testCases: [
      {
        input: "7",
        args: [],
        expected: "2",
        isHidden: false,
      },
      {
        input: "2",
        args: [],
        expected: "2",
        isHidden: true,
      },
      {
        input: "1",
        args: [],
        expected: "1",
        isHidden: true,
      },
      {
        input: "13",
        args: [],
        expected: "2",
        isHidden: true,
      },
      {
        input: "43",
        args: [],
        expected: "3",
        isHidden: true,
      },
    ],
    solution: `
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, n + 1); // Initialize with impossible value
        dp[0] = 0; // Base case: 0 requires 0 perfect squares
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j * j <= i; j++) {
                dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
            }
        }
        
        return dp[n];
    }
    
    // Time Complexity: O(n * sqrt(n))
    // Space Complexity: O(n)
    // Key Idea: dp[i] = minimum perfect squares summing to i
    // For each i, try all perfect squares j*j <= i
    `,
    hint: "Similar to coin change. dp[i] = min(dp[i], dp[i - j*j] + 1) for all perfect squares j*j <= i.",
    tags: ["DP", "Math", "Unbounded Knapsack"],
    points: 100,
    timeLimit: 2000,
  }),

  // Day 94: Coin Change - Q5
  createQuestion({
    title: "Minimum Cost For Tickets",
    description:
      "You have a list of days you will travel, and three types of passes: 1-day pass (cost1), 7-day pass (cost7), and 30-day pass (cost30). Return the minimum cost needed to cover all travel days.",
    difficulty: "Medium",
    topicId: 94,
    examples: [
      {
        input: "days = [1,4,6,7,8,20], costs = [2,7,15]",
        output: "11",
        explanation: "1-day on day 1 (2), 7-day on day 4 (7), 1-day on day 20 (2). Total: 11",
      },
      {
        input: "days = [1,2,3,4,5,6,7,8,9,10,14,15,16,20,21,22,23,24,28,29,30], costs = [2,7,15]",
        output: "17",
        explanation: "7-day pass on day 1 (covers 1-7, cost 7) + 7-day on day 14 (covers 14-20, cost 7) + 7-day on day 28 (covers 28-30, cost 7) = 21 or better strategy = 17",
      },
      {
        input: "days = [1,4,6,7,8,20], costs = [7,2,15]",
        output: "6",
        explanation: "1-day on each day: 1,4,6,7,8,20 = 6 * 1 = 6",
      },
    ],
    constraints: [
      "1 <= days.length <= 365",
      "1 <= days[i] <= 365",
      "Days are unique and in ascending order",
      "1 <= costs.length == 3",
      "1 <= cost1, cost7, cost30 <= 1000",
    ],
    testCases: [
      {
        input: "[1,4,6,7,8,20]",
        args: [[2, 7, 15]],
        expected: "11",
        isHidden: false,
      },
      {
        input: "[1,2,3,4,5,6,7,8,9,10,14,15,16,20,21,22,23,24,28,29,30]",
        args: [[2, 7, 15]],
        expected: "17",
        isHidden: true,
      },
      {
        input: "[1,4,6,7,8,20]",
        args: [[7, 2, 15]],
        expected: "6",
        isHidden: true,
      },
      {
        input: "[1,2,3]",
        args: [[5, 20, 50]],
        expected: "5",
        isHidden: true,
      },
      {
        input: "[1,15,30]",
        args: [[10, 50, 100]],
        expected: "30",
        isHidden: true,
      },
    ],
    solution: `
    public int mincostTickets(int[] days, int[] costs) {
        int maxDay = days[days.length - 1];
        int[] dp = new int[maxDay + 1];
        boolean[] travelDays = new boolean[maxDay + 1];
        
        // Mark travel days
        for (int day : days) {
            travelDays[day] = true;
        }
        
        for (int i = 1; i <= maxDay; i++) {
            if (!travelDays[i]) {
                // Not a travel day, same cost as previous day
                dp[i] = dp[i - 1];
            } else {
                // Travel day, choose minimum of three options
                int option1 = dp[i - 1] + costs[0]; // 1-day pass
                int option7 = dp[Math.max(0, i - 7)] + costs[1]; // 7-day pass
                int option30 = dp[Math.max(0, i - 30)] + costs[2]; // 30-day pass
                dp[i] = Math.min(option1, Math.min(option7, option30));
            }
        }
        
        return dp[maxDay];
    }
    
    // Time Complexity: O(max(days))
    // Space Complexity: O(max(days))
    // Key Idea: dp[i] = minimum cost to cover all travel days up to day i
    // On travel day: choose min of 1-day, 7-day, or 30-day pass
    `,
    hint: "Mark all travel days. dp[i] = cost for covering all travel days up to day i. On travel day, try all 3 pass options.",
    tags: ["DP", "Optimization", "Decision Making"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 95: Edit Distance - Q1
  createQuestion({
    title: "Edit Distance",
    description:
      "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. Operations allowed: insert, delete, or replace a character.",
    difficulty: "Hard",
    topicId: 95,
    examples: [
      {
        input: 'word1 = "horse", word2 = "ros"',
        output: "3",
        explanation:
          "horse -> rorse (replace h with r), rorse -> rose (delete r), rose -> ros (delete e). 3 operations",
      },
      {
        input: 'word1 = "intention", word2 = "execution"',
        output: "5",
        explanation:
          "intention -> exnention (replace i with e), exnention -> exention (delete n), etc. Total 5 operations",
      },
      {
        input: 'word1 = "abc", word2 = "abc"',
        output: "0",
        explanation: "Strings are identical",
      },
    ],
    constraints: [
      "0 <= word1.length, word2.length <= 500",
      "word1 and word2 consist of lowercase English letters",
    ],
    testCases: [
      {
        input: '"horse", "ros"',
        args: [],
        expected: "3",
        isHidden: false,
      },
      {
        input: '"intention", "execution"',
        args: [],
        expected: "5",
        isHidden: true,
      },
      {
        input: '"abc", "abc"',
        args: [],
        expected: "0",
        isHidden: true,
      },
      {
        input: '"", "a"',
        args: [],
        expected: "1",
        isHidden: true,
      },
      {
        input: '"a", "b"',
        args: [],
        expected: "1",
        isHidden: true,
      },
    ],
    solution: `
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        // Base cases: empty string to word2 requires n insertions (or reverse)
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }
        
        // Fill DP table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    // Characters match, no operation needed
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    // Try three operations: replace, delete, insert
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j - 1],  // Replace
                        Math.min(dp[i - 1][j], dp[i][j - 1]) // Delete or Insert
                    );
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Time Complexity: O(m * n)
    // Space Complexity: O(m * n)
    // Key Idea: dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
    // Base: empty string requires length operations
    // Transition: if chars match, no op; else min(replace, delete, insert)
    `,
    hint: "2D DP where dp[i][j] is edit distance between word1[0..i-1] and word2[0..j-1]. Base case: empty strings. If chars match, take diagonal value.",
    tags: ["DP", "String", "Levenshtein"],
    points: 150,
    timeLimit: 2000,
  }),

  // Day 95: Edit Distance - Q2
  createQuestion({
    title: "Delete Operation for Two Strings",
    description:
      "Given two strings word1 and word2, return the minimum number of steps required to make them the same. In one step you can delete one character in either string.",
    difficulty: "Medium",
    topicId: 95,
    examples: [
      {
        input: 'word1 = "sea", word2 = "eat"',
        output: "2",
        explanation: "Delete s from sea (ea) and delete t from eat (ea). Now equal with 2 deletes",
      },
      {
        input: 'word1 = "leetcode", word2 = "etco"',
        output: "4",
        explanation: "Longest common subsequence has length 4 (e,t,c,o). Delete 4 chars from sea (8-4) and 0 from etco",
      },
      {
        input: 'word1 = "a", word2 = "a"',
        output: "0",
        explanation: "Strings already equal",
      },
    ],
    constraints: [
      "1 <= word1.length, word2.length <= 500",
      "word1 and word2 consist of lowercase English letters",
    ],
    testCases: [
      {
        input: '"sea", "eat"',
        args: [],
        expected: "2",
        isHidden: false,
      },
      {
        input: '"leetcode", "etco"',
        args: [],
        expected: "4",
        isHidden: true,
      },
      {
        input: '"a", "a"',
        args: [],
        expected: "0",
        isHidden: true,
      },
      {
        input: '"abc", "abc"',
        args: [],
        expected: "0",
        isHidden: true,
      },
      {
        input: '"abcd", "dcba"',
        args: [],
        expected: "6",
        isHidden: true,
      },
    ],
    solution: `
    public int deleteOperation(String word1, String word2) {
        int lcsLength = longestCommonSubsequence(word1, word2);
        return word1.length() + word2.length() - 2 * lcsLength;
    }
    
    private int longestCommonSubsequence(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Time Complexity: O(m * n)
    // Space Complexity: O(m * n)
    // Key Idea: minimum deletes = (len1 + len2) - 2 * LCS
    // Find LCS, then deletions = chars not in LCS from both strings
    `,
    hint: "Key insight: total deletions = len1 + len2 - 2 * LCS. Find longest common subsequence first.",
    tags: ["DP", "String", "LCS"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 95: Edit Distance - Q3
  createQuestion({
    title: "Minimum ASCII Delete Sum for Two Strings",
    description:
      "Given two strings s1 and s2, return the minimum sum of ASCII values of deleted characters to make the two strings equal.",
    difficulty: "Medium",
    topicId: 95,
    examples: [
      {
        input: 's1 = "sea", s2 = "eat"',
        output: "231",
        explanation:
          "Delete 's' (ASCII 115) from sea and 't' (ASCII 116) from eat. Sum = 115 + 116 = 231",
      },
      {
        input: 's1 = "delete", s2 = "leet"',
        output: "403",
        explanation:
          "Delete d(100), e(101), l(108), e(101) from delete and e(101), e(101) from leet for LCS 'e', 't'... compute sum",
      },
      {
        input: 's1 = "a", s2 = "a"',
        output: "0",
        explanation: "Strings already equal",
      },
    ],
    constraints: [
      "0 <= s1.length, s2.length <= 1000",
      "s1 and s2 consist of lowercase English letters",
    ],
    testCases: [
      {
        input: '"sea", "eat"',
        args: [],
        expected: "231",
        isHidden: false,
      },
      {
        input: '"a", "a"',
        args: [],
        expected: "0",
        isHidden: true,
      },
      {
        input: '"abc", "def"',
        args: [],
        expected: "294",
        isHidden: true,
      },
      {
        input: '"", "a"',
        args: [],
        expected: "97",
        isHidden: true,
      },
      {
        input: '"hello", "world"',
        args: [],
        expected: "846",
        isHidden: true,
      },
    ],
    solution: `
    public int minimumDeleteSum(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        // Base cases: delete all characters from non-empty string
        for (int i = 1; i <= m; i++) {
            dp[i][0] = dp[i - 1][0] + s1.charAt(i - 1);
        }
        for (int j = 1; j <= n; j++) {
            dp[0][j] = dp[0][j - 1] + s2.charAt(j - 1);
        }
        
        // Fill DP table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    // Characters match, no deletion needed
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    // Delete from either s1 or s2, choose minimum
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + s1.charAt(i - 1),  // Delete from s1
                        dp[i][j - 1] + s2.charAt(j - 1)   // Delete from s2
                    );
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Time Complexity: O(m * n)
    // Space Complexity: O(m * n)
    // Key Idea: dp[i][j] = min ASCII sum to make s1[0..i-1] and s2[0..j-1] equal
    // If chars match, no deletion; else min(delete from s1, delete from s2)
    `,
    hint: "Similar to edit distance but with ASCII values. dp[i][j] = minimum deletion cost to make substrings equal.",
    tags: ["DP", "String", "ASCII"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 95: Edit Distance - Q4
  createQuestion({
    title: "One Edit Distance",
    description:
      "Given two strings s and t, return true if they are exactly one edit distance apart. One edit means insert, delete, or replace one character.",
    difficulty: "Medium",
    topicId: 95,
    examples: [
      {
        input: 's = "ab", t = "acb"',
        output: "true",
        explanation: "Inserting 'c' at index 1 makes ab -> acb (one insertion)",
      },
      {
        input: 's = "", t = ""',
        output: "false",
        explanation: "Empty strings are 0 edits apart, not 1",
      },
      {
        input: 's = "a", t = ""',
        output: "true",
        explanation: "Delete 'a' from s (one deletion)",
      },
      {
        input: 's = "ab", t = "ab"',
        output: "false",
        explanation: "Identical strings are 0 edits apart",
      },
      {
        input: 's = "ab", t = "aab"',
        output: "true",
        explanation: "Insert 'a' at position 0",
      },
    ],
    constraints: [
      "0 <= s.length <= 10^4",
      "0 <= t.length <= 10^4",
      "s and t consist of lowercase English letters",
    ],
    testCases: [
      {
        input: '"ab", "acb"',
        args: [],
        expected: "true",
        isHidden: false,
      },
      {
        input: '"", ""',
        args: [],
        expected: "false",
        isHidden: true,
      },
      {
        input: '"a", ""',
        args: [],
        expected: "true",
        isHidden: true,
      },
      {
        input: '"ab", "ab"',
        args: [],
        expected: "false",
        isHidden: true,
      },
      {
        input: '"ab", "aab"',
        args: [],
        expected: "true",
        isHidden: true,
      },
    ],
    solution: `
    public boolean isOneEditDistance(String s, String t) {
        int m = s.length();
        int n = t.length();
        
        // If length difference > 1, impossible to be one edit away
        if (Math.abs(m - n) > 1) {
            return false;
        }
        
        String shorter = m < n ? s : t;
        String longer = m < n ? t : s;
        
        int i = 0, j = 0;
        int editCount = 0;
        
        while (i < shorter.length() && j < longer.length()) {
            if (shorter.charAt(i) != longer.charAt(j)) {
                editCount++;
                if (editCount > 1) {
                    return false;
                }
                
                // If lengths are equal, replace; else skip character in longer string
                if (shorter.length() == longer.length()) {
                    i++;
                }
                j++;
            } else {
                i++;
                j++;
            }
        }
        
        editCount += longer.length() - j;
        return editCount == 1;
    }
    
    // Time Complexity: O(min(m, n))
    // Space Complexity: O(1)
    // Key Idea: Compare shorter with longer string, count mismatches
    // For equal length: replace counts as 1 edit
    // For length diff: skip character in longer string
    `,
    hint: "If length diff > 1, return false. Compare character by character. For equal length, replace counts as 1 edit. For diff length, insertion/deletion counts as 1 edit.",
    tags: ["String", "Two Pointer", "Edit Distance"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 95: Edit Distance - Q5
  createQuestion({
    title: "Distinct Subsequences",
    description:
      "Given two strings s and t, return the number of distinct subsequences of s which equals t. A subsequence of a string is a new string which is formed from the original string by deleting some (can be zero) of the characters without disturbing the relative order of the remaining characters.",
    difficulty: "Hard",
    topicId: 95,
    examples: [
      {
        input: 's = "rabbbit", t = "rabbit"',
        output: "3",
        explanation:
          "3 ways to delete characters from rabbbit to get rabbit: r-a-b-b-b-i-t, r-a-b-b-b-i-t, r-a-b-b-b-i-t (delete different b's)",
      },
      {
        input: 's = "babgbag", t = "bag"',
        output: "5",
        explanation:
          "5 ways: [b-a-g], [b-a-g], [b-a-g], [ba-g], [ba-g] (different combinations of indices)",
      },
      {
        input: 's = "a", t = "b"',
        output: "0",
        explanation: "No subsequence of s equals t",
      },
    ],
    constraints: [
      "0 <= s.length <= 1000",
      "0 <= t.length <= 1000",
      "s and t consist of English letters",
    ],
    testCases: [
      {
        input: '"rabbbit", "rabbit"',
        args: [],
        expected: "3",
        isHidden: false,
      },
      {
        input: '"babgbag", "bag"',
        args: [],
        expected: "5",
        isHidden: true,
      },
      {
        input: '"a", "b"',
        args: [],
        expected: "0",
        isHidden: true,
      },
      {
        input: '"", ""',
        args: [],
        expected: "1",
        isHidden: true,
      },
      {
        input: '"a", ""',
        args: [],
        expected: "1",
        isHidden: true,
      },
    ],
    solution: `
    public int numDistinct(String s, String t) {
        int m = s.length();
        int n = t.length();
        int[][] dp = new int[m + 1][n + 1];
        
        // Base case: empty t has 1 way (use no characters)
        for (int i = 0; i <= m; i++) {
            dp[i][0] = 1;
        }
        
        // Fill DP table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                // Don't use s[i-1]
                dp[i][j] = dp[i - 1][j];
                
                // Use s[i-1] if it matches t[j-1]
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] += dp[i - 1][j - 1];
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Time Complexity: O(m * n)
    // Space Complexity: O(m * n)
    // Key Idea: dp[i][j] = number of distinct subsequences of s[0..i-1] that equal t[0..j-1]
    // Base: empty t has 1 way for any s
    // Transition: either skip s[i-1] or use it (if matches t[j-1])
    `,
    hint: "dp[i][j] = ways to form t[0..j-1] from s[0..i-1]. Either skip current s char or use it if it matches t char.",
    tags: ["DP", "String", "Counting"],
    points: 150,
    timeLimit: 2000,
  }),

  // Day 96: LIS - Q1
  createQuestion({
    title: "Longest Increasing Subsequence",
    description:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    difficulty: "Medium",
    topicId: 96,
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "LIS is [2,3,7,101] with length 4",
      },
      {
        input: "nums = [0,1,0,4,4,4,3,5,9]",
        output: "4",
        explanation: "LIS is [0,1,4,5,9] or [0,1,4,3] wait that's not increasing. [0,1,4,9] length 4",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "Single element has LIS of length 1",
      },
    ],
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4",
    ],
    testCases: [
      {
        input: "[10,9,2,5,3,7,101,18]",
        args: [],
        expected: "4",
        isHidden: false,
      },
      {
        input: "[0,1,0,4,4,4,3,5,9]",
        args: [],
        expected: "4",
        isHidden: true,
      },
      {
        input: "[1]",
        args: [],
        expected: "1",
        isHidden: true,
      },
      {
        input: "[3,10,2,1,20]",
        args: [],
        expected: "3",
        isHidden: true,
      },
      {
        input: "[1,2,3,4,5]",
        args: [],
        expected: "5",
        isHidden: true,
      },
    ],
    solution: `
    // Approach 1: DP O(n²)
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        
        return Arrays.stream(dp).max().orElse(1);
    }
    
    // Time Complexity: O(n²)
    // Space Complexity: O(n)
    // Key Idea: dp[i] = length of LIS ending at index i
    // For each i, check all j < i where nums[j] < nums[i] and take max dp[j] + 1
    
    // Approach 2: Binary Search O(n log n)
    public int lengthOfLIS_BS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int num : nums) {
            int pos = Collections.binarySearch(tails, num);
            if (pos < 0) {
                pos = -(pos + 1);
            }
            if (pos == tails.size()) {
                tails.add(num);
            } else {
                tails.set(pos, num);
            }
        }
        return tails.size();
    }
    
    // Time Complexity: O(n log n)
    // Space Complexity: O(n)
    // Key Idea: Maintain 'tails' array where tails[i] is smallest tail for LIS of length i+1
    `,
    hint: "O(n²) approach: dp[i] = max LIS ending at i. O(n log n): maintain tails array and use binary search for position.",
    tags: ["DP", "LIS", "Binary Search"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 96: LIS - Q2
  createQuestion({
    title: "Russian Doll Envelopes",
    description:
      "You are given a 2D array of envelopes where envelopes[i] = [w, h]. One envelope can fit into another if both the width and height of one envelope are greater than the other envelope's width and height. Return the maximum number of envelopes that can be Russian dolled into each other.",
    difficulty: "Hard",
    topicId: 96,
    examples: [
      {
        input: "envelopes = [[2,100],[3,4],[4,5],[5,6],[6,7],[7,8]]",
        output: "5",
        explanation: "[3,4] -> [4,5] -> [5,6] -> [6,7] -> [7,8] (5 envelopes)",
      },
      {
        input: "envelopes = [[1,1],[1,1],[1,1]]",
        output: "1",
        explanation: "No envelope can fit into another (all identical)",
      },
      {
        input: "envelopes = [[1,2],[2,3],[3,4],[4,5],[5,6]]",
        output: "5",
        explanation: "All can be nested in order",
      },
    ],
    constraints: [
      "1 <= envelopes.length <= 105",
      "envelopes[i].length == 2",
      "1 <= w, h <= 10^5",
    ],
    testCases: [
      {
        input: "[[2,100],[3,4],[4,5],[5,6],[6,7],[7,8]]",
        args: [],
        expected: "5",
        isHidden: false,
      },
      {
        input: "[[1,1],[1,1],[1,1]]",
        args: [],
        expected: "1",
        isHidden: true,
      },
      {
        input: "[[1,2],[2,3],[3,4],[4,5],[5,6]]",
        args: [],
        expected: "5",
        isHidden: true,
      },
      {
        input: "[[5,4],[6,4],[6,7],[2,3]]",
        args: [],
        expected: "3",
        isHidden: true,
      },
      {
        input: "[[1,1],[2,2]]",
        args: [],
        expected: "2",
        isHidden: true,
      },
    ],
    solution: `
    public int maxEnvelopes(int[][] envelopes) {
        // Sort by width ascending, height descending
        Arrays.sort(envelopes, (a, b) -> {
            if (a[0] != b[0]) {
                return a[0] - b[0];
            }
            return b[1] - a[1]; // Descending to avoid duplicates in LIS
        });
        
        // Find LIS on heights using binary search O(n log n)
        List<Integer> lis = new ArrayList<>();
        for (int[] env : envelopes) {
            int h = env[1];
            int pos = Collections.binarySearch(lis, h);
            if (pos < 0) {
                pos = -(pos + 1);
            }
            if (pos == lis.size()) {
                lis.add(h);
            } else {
                lis.set(pos, h);
            }
        }
        
        return lis.size();
    }
    
    // Time Complexity: O(n log n)
    // Space Complexity: O(n)
    // Key Idea: Sort by width asc, height desc. Then find LIS on heights (binary search)
    // Height descending avoids counting envelopes with same width multiple times
    `,
    hint: "Sort by width ascending, height descending. Then find LIS on heights using binary search for O(n log n).",
    tags: ["DP", "LIS", "Binary Search", "Sorting"],
    points: 150,
    timeLimit: 2000,
  }),

  // Day 96: LIS - Q3
  createQuestion({
    title: "Longest Increasing Subsequence II",
    description:
      "Given an integer array nums of size up to 2*10^5, compute the length of the longest strictly increasing subsequence using an optimized O(n log n) approach with Binary Search or Segment Tree.",
    difficulty: "Hard",
    topicId: 96,
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "LIS is [2,3,7,101] with length 4",
      },
      {
        input: "nums = [0,1,0,4,4,4,3,5,9]",
        output: "4",
        explanation: "LIS is [0,1,4,9] with length 4",
      },
      {
        input: "nums = [3,1,4,1,5,9,2,6,5]",
        output: "4",
        explanation: "LIS is [1,4,5,9] or [1,4,5,6] with length 4",
      },
    ],
    constraints: [
      "1 <= nums.length <= 2*10^5",
      "-10^9 <= nums[i] <= 10^9",
    ],
    testCases: [
      {
        input: "[10,9,2,5,3,7,101,18]",
        args: [],
        expected: "4",
        isHidden: false,
      },
      {
        input: "[0,1,0,4,4,4,3,5,9]",
        args: [],
        expected: "4",
        isHidden: true,
      },
      {
        input: "[3,1,4,1,5,9,2,6,5]",
        args: [],
        expected: "4",
        isHidden: true,
      },
      {
        input: "[1,3,6,7,9,4,10,5,8]",
        args: [],
        expected: "5",
        isHidden: true,
      },
      {
        input: "[1,2,3,4,5,6,7,8,9,10]",
        args: [],
        expected: "10",
        isHidden: true,
      },
    ],
    solution: `
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        
        for (int num : nums) {
            // Binary search for position to insert/replace
            int left = 0, right = tails.size();
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (tails.get(mid) < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            
            if (left == tails.size()) {
                tails.add(num);
            } else {
                tails.set(left, num);
            }
        }
        
        return tails.size();
    }
    
    // Time Complexity: O(n log n) via binary search
    // Space Complexity: O(n)
    // Key Idea: tails[i] = smallest tail value for LIS of length i+1
    // For each num, find position via binary search and update/append
    // This handles large constraints efficiently (up to 2*10^5)
    `,
    hint: "Use 'tails' array and binary search. tails[i] stores smallest possible tail for LIS of length i+1. Update/append based on search position.",
    tags: ["DP", "LIS", "Binary Search", "Optimization"],
    points: 150,
    timeLimit: 2000,
  }),

  // Day 96: LIS - Q4
  createQuestion({
    title: "Longest Bitonic Subsequence",
    description:
      "Given an array nums, find the length of the longest subsequence which first strictly increases, then strictly decreases.",
    difficulty: "Medium",
    topicId: 96,
    examples: [
      {
        input: "nums = [1,3,3,4,5,2,2,1]",
        output: "6",
        explanation: "[1,3,4,5,2,1] increases then decreases",
      },
      {
        input: "nums = [1,2,3,4,5]",
        output: "1",
        explanation: "Only increasing, no decreasing part. Answer is 1 (any single element)",
      },
      {
        input: "nums = [5,4,3,2,1]",
        output: "1",
        explanation: "Only decreasing, no increasing part. Answer is 1",
      },
    ],
    constraints: [
      "1 <= nums.length <= 1000",
      "-10^9 <= nums[i] <= 10^9",
    ],
    testCases: [
      {
        input: "[1,3,3,4,5,2,2,1]",
        args: [],
        expected: "6",
        isHidden: false,
      },
      {
        input: "[1,2,3,4,5]",
        args: [],
        expected: "1",
        isHidden: true,
      },
      {
        input: "[5,4,3,2,1]",
        args: [],
        expected: "1",
        isHidden: true,
      },
      {
        input: "[1,5,0,3,4,5]",
        args: [],
        expected: "6",
        isHidden: true,
      },
      {
        input: "[0,1,0]",
        args: [],
        expected: "3",
        isHidden: true,
      },
    ],
    solution: `
    public int longestBitonicSubsequence(int[] nums) {
        int n = nums.length;
        
        // inc[i] = longest increasing ending at i
        int[] inc = new int[n];
        Arrays.fill(inc, 1);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    inc[i] = Math.max(inc[i], inc[j] + 1);
                }
            }
        }
        
        // dec[i] = longest decreasing starting from i
        int[] dec = new int[n];
        Arrays.fill(dec, 1);
        for (int i = n - 2; i >= 0; i--) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] > nums[j]) {
                    dec[i] = Math.max(dec[i], dec[j] + 1);
                }
            }
        }
        
        // Longest bitonic = max(inc[i] + dec[i] - 1) for all i
        int result = 1;
        for (int i = 0; i < n; i++) {
            result = Math.max(result, inc[i] + dec[i] - 1);
        }
        
        return result;
    }
    
    // Time Complexity: O(n²)
    // Space Complexity: O(n)
    // Key Idea: inc[i] = LIS ending at i, dec[i] = LDS starting at i
    // Bitonic = inc[i] + dec[i] - 1 (subtract 1 to avoid counting i twice)
    `,
    hint: "Compute LIS ending at each index and LDS starting from each index. Bitonic length = LIS[i] + LDS[i] - 1.",
    tags: ["DP", "LIS", "LDS"],
    points: 120,
    timeLimit: 2000,
  }),

  // Day 96: LIS - Q5
  createQuestion({
    title: "Maximum Length of Pair Chain",
    description:
      "You are given an array of pairs. A pair p2 can follow pair p1 if p1[1] < p2[0]. Return the maximum length of a chain.",
    difficulty: "Medium",
    topicId: 96,
    examples: [
      {
        input: "pairs = [[1,2],[2,3],[3,4]]",
        output: "2",
        explanation: "[1,2] -> [3,4] (2 pairs), or just [2,3] (1 pair). Max is 2",
      },
      {
        input: "pairs = [[1,2],[7,8],[4,5]]",
        output: "3",
        explanation: "[1,2] -> [4,5] -> [7,8] (all 3 pairs)",
      },
      {
        input: "pairs = [[1,5],[2,3]]",
        output: "1",
        explanation: "No chain possible",
      },
    ],
    constraints: [
      "1 <= pairs.length <= 1000",
      "1 <= pairs[i][0] < pairs[i][1] <= 1000",
    ],
    testCases: [
      {
        input: "[[1,2],[2,3],[3,4]]",
        args: [],
        expected: "2",
        isHidden: false,
      },
      {
        input: "[[1,2],[7,8],[4,5]]",
        args: [],
        expected: "3",
        isHidden: true,
      },
      {
        input: "[[1,5],[2,3]]",
        args: [],
        expected: "1",
        isHidden: true,
      },
      {
        input: "[[1,10],[2,3],[4,5],[6,7]]",
        args: [],
        expected: "4",
        isHidden: true,
      },
      {
        input: "[[1,2]]",
        args: [],
        expected: "1",
        isHidden: true,
      },
    ],
    solution: `
    // Approach 1: Greedy (optimal)
    public int maxChainLength(int[][] pairs) {
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
    
    // Time Complexity: O(n log n)
    // Space Complexity: O(1)
    
    // Approach 2: DP O(n²)
    public int maxChainLength_DP(int[][] pairs) {
        Arrays.sort(pairs, (a, b) -> a[0] - b[0]);
        int n = pairs.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (pairs[j][1] < pairs[i][0]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        
        return Arrays.stream(dp).max().orElse(1);
    }
    
    // Time Complexity: O(n²)
    // Space Complexity: O(n)
    // Key Idea (Greedy): Sort by end time, greedily select non-overlapping pairs
    // Key Idea (DP): dp[i] = max chain ending at pair i
    `,
    hint: "Can be solved optimally with Greedy (sort by end, select non-overlapping) or with DP (LIS variant).",
    tags: ["DP", "Greedy", "Sorting", "Interval"],
    points: 120,
    timeLimit: 2000,
  }),
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("✅ Connected to MongoDB");

    console.log("\n📝 Creating Topics...");
    const createdTopics = await Topic.insertMany(topics);
    console.log(`✅ Created ${createdTopics.length} topics`);

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

    console.log(`\n🎉 Days 94-96 complete! Created ${createdCount} questions, skipped ${skippedCount} existing`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
