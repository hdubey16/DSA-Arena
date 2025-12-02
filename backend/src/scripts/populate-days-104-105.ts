import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question";
import Topic from "../models/Topic";

dotenv.config();

const topics = [
  {
    id: "104",
    title: "Day 104 – Rod Cutting & Min Jumps",
    description: "Classical 1D DP optimization problems including rod cutting and jump game variants.",
    week: 15,
    day: 104,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["103"],
    compulsoryQuestion: "Rod Cutting",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "105",
    title: "Day 105 – DP Practice Problems",
    description: "Mixed DP problems for consolidation including longest path, word break, and pattern matching.",
    week: 15,
    day: 105,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["104"],
    compulsoryQuestion: "Longest Increasing Path in a Matrix",
    practiceQuestions: 5,
    isLocked: false,
  },
];

function createQuestion(q: any) {
  return {
    topicId: q.topicId,
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    type: "practice",
    isCompulsory: q.isCompulsory ?? false,
    points: q.points,
    timeLimit: 45,
    starterCode: q.starterCode || "public class Solution {\n    \n}",
    solution: q.solution,
    examples: q.examples,
    testCases: q.testCases.map((tc: any) => ({
      input: tc.input,
      expectedOutput: tc.expected,
      isHidden: tc.isHidden,
      points: tc.isHidden ? 15 : 10,
    })),
    hints: [q.hint],
    tags: q.tags,
  };
}

const questions = [
  // Day 104 - Q1
  createQuestion({
    title: "Rod Cutting",
    description:
      "Given a rod of length n and an array prices of length n where prices[i] is the price of a rod of length i+1, determine the maximum revenue obtainable by cutting up the rod and selling the pieces.",
    difficulty: "Medium",
    topicId: "104",
    isCompulsory: true,
    examples: [
      {
        input: "n = 4, prices = [1, 5, 8, 9]",
        output: "10",
        explanation: "Cut into pieces of length 2 and 2: 5+5=10",
      },
      {
        input: "n = 8, prices = [1,5,8,9,10,17,17,20]",
        output: "22",
        explanation: "Cut into lengths 2 and 6: 5+17=22",
      },
    ],
    testCases: [
      { input: "4, [1,5,8,9]", expected: "10", isHidden: false },
      { input: "8, [1,5,8,9,10,17,17,20]", expected: "22", isHidden: true },
      { input: "10, [1,5,8,9,10,17,17,20,24,30]", expected: "30", isHidden: true },
      { input: "5, [2,5,7,8,10]", expected: "12", isHidden: true },
      { input: "1, [5]", expected: "5", isHidden: true },
    ],
    solution: `
    public int cutRod(int[] prices, int n) {
        int[] dp = new int[n + 1];
        
        // dp[i] = maximum revenue from rod of length i
        for (int i = 1; i <= n; i++) {
            int maxRevenue = 0;
            
            // Try all possible first cuts
            for (int j = 0; j < i; j++) {
                maxRevenue = Math.max(maxRevenue, prices[j] + dp[i - j - 1]);
            }
            
            dp[i] = maxRevenue;
        }
        
        return dp[n];
    }
    
    // Alternative: Bottom-up approach with different formulation
    public int cutRodAlternative(int[] prices, int n) {
        int[] dp = new int[n + 1];
        
        for (int len = 1; len <= n; len++) {
            for (int cut = 1; cut <= len; cut++) {
                dp[len] = Math.max(dp[len], prices[cut - 1] + dp[len - cut]);
            }
        }
        
        return dp[n];
    }
    
    // Time: O(n^2)
    // Space: O(n)
    `,
    hint: "dp[i] = max revenue from rod length i. Try all possible first cuts.",
    tags: ["DP", "Optimization", "1D DP"],
    points: 120,
  }),

  // Day 104 - Q2
  createQuestion({
    title: "Jump Game II",
    description:
      "Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Your goal is to reach the last index in the minimum number of jumps.",
    difficulty: "Medium",
    topicId: "104",
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "2",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to last index",
      },
      {
        input: "nums = [2,3,0,1,4]",
        output: "2",
        explanation: "Jump from 0→1→4",
      },
    ],
    testCases: [
      { input: "[2,3,1,1,4]", expected: "2", isHidden: false },
      { input: "[2,3,0,1,4]", expected: "2", isHidden: true },
      { input: "[1,1,1,1]", expected: "3", isHidden: true },
      { input: "[1,2,3]", expected: "2", isHidden: true },
      { input: "[10,9,8,7,6,5,4,3,2,1,1,0]", expected: "2", isHidden: true },
    ],
    solution: `
    public int jump(int[] nums) {
        int jumps = 0;
        int currentEnd = 0;
        int farthest = 0;
        
        // We don't need to jump from the last position
        for (int i = 0; i < nums.length - 1; i++) {
            // Update the farthest position we can reach
            farthest = Math.max(farthest, i + nums[i]);
            
            // If we've reached the end of current jump range
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
                
                // Early exit if we can reach the end
                if (currentEnd >= nums.length - 1) {
                    break;
                }
            }
        }
        
        return jumps;
    }
    
    // Time: O(n)
    // Space: O(1)
    `,
    hint: "Greedy BFS approach. Track current range and farthest reachable position.",
    tags: ["Greedy", "Array", "BFS"],
    points: 120,
  }),

  // Day 104 - Q3
  createQuestion({
    title: "Video Stitching",
    description:
      "You are given a series of video clips from a sporting event that lasted time seconds. These video clips were recorded at different times. clips[i] = [starti, endi] indicates the start and end times of the ith video clip. Return the minimum number of clips needed so that we can cut the clips into segments that cover the entire event [0, time]. If the task is impossible, return -1.",
    difficulty: "Medium",
    topicId: "104",
    examples: [
      {
        input: "clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10",
        output: "3",
        explanation: "Take clips [0,2], [1,9], [8,10]",
      },
      {
        input: "clips = [[0,1],[1,2]], time = 5",
        output: "-1",
        explanation: "Cannot cover [0,5]",
      },
    ],
    testCases: [
      { input: "[[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], 10", expected: "3", isHidden: false },
      { input: "[[0,1],[1,2]], 5", expected: "-1", isHidden: true },
      { input: "[[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], 9", expected: "3", isHidden: true },
      { input: "[[0,5],[1,6],[2,7],[3,8],[4,9],[5,10],[6,11],[7,12],[8,13],[9,14],[10,15]], 15", expected: "2", isHidden: true },
      { input: "[[0,4],[2,8]], 5", expected: "2", isHidden: true },
    ],
    solution: `
    public int videoStitching(int[][] clips, int time) {
        // Sort clips by start time
        Arrays.sort(clips, (a, b) -> a[0] - b[0]);
        
        int count = 0;
        int currentEnd = 0;
        int nextEnd = 0;
        int i = 0;
        
        while (currentEnd < time) {
            // Find the clip that extends farthest from current position
            while (i < clips.length && clips[i][0] <= currentEnd) {
                nextEnd = Math.max(nextEnd, clips[i][1]);
                i++;
            }
            
            // If we couldn't extend beyond current end
            if (nextEnd == currentEnd) {
                return -1;
            }
            
            count++;
            currentEnd = nextEnd;
        }
        
        return count;
    }
    
    // Alternative DP approach
    public int videoStitchingDP(int[][] clips, int time) {
        int[] dp = new int[time + 1];
        Arrays.fill(dp, time + 1);
        dp[0] = 0;
        
        for (int i = 0; i <= time; i++) {
            for (int[] clip : clips) {
                if (clip[0] <= i && i <= clip[1]) {
                    dp[i] = Math.min(dp[i], dp[clip[0]] + 1);
                }
            }
        }
        
        return dp[time] == time + 1 ? -1 : dp[time];
    }
    
    // Time: O(n log n) for greedy, O(n * time) for DP
    // Space: O(1) for greedy, O(time) for DP
    `,
    hint: "Greedy: Sort clips, always pick clip that extends farthest from current position.",
    tags: ["Greedy", "Array", "Interval"],
    points: 120,
  }),

  // Day 104 - Q4
  createQuestion({
    title: "Minimum Jumps to Reach Home",
    description:
      "A certain bug's home is on the x-axis at position x. Help the bug get home from position 0. The bug can jump forward a positions and backward b positions. An array of non-negative integers forbidden is given, where forbidden[i] means that the bug cannot be at position forbidden[i]. Return the minimum number of jumps needed for the bug to reach its home. If there is no possible sequence of jumps, return -1.",
    difficulty: "Hard",
    topicId: "104",
    examples: [
      {
        input: "forbidden = [14,4,18,1,15], a = 3, b = 15, x = 9",
        output: "3",
        explanation: "3 forward jumps: 0→3→6→9",
      },
      {
        input: "forbidden = [8,3,16,6,12,20], a = 15, b = 13, x = 11",
        output: "-1",
        explanation: "Impossible to reach position 11",
      },
    ],
    testCases: [
      { input: "[14,4,18,1,15], 3, 15, 9", expected: "3", isHidden: false },
      { input: "[8,3,16,6,12,20], 15, 13, 11", expected: "-1", isHidden: true },
      { input: "[1,6,2,14,5,17,4], 16, 9, 7", expected: "2", isHidden: true },
      { input: "[], 2, 1, 10", expected: "5", isHidden: true },
      { input: "[128,178,147,165,63,11,150,20,158,144,136], 61, 170, 135", expected: "6", isHidden: true },
    ],
    solution: `
    public int minimumJumps(int[] forbidden, int a, int b, int x) {
        Set<Integer> forbiddenSet = new HashSet<>();
        for (int pos : forbidden) {
            forbiddenSet.add(pos);
        }
        
        // BFS with state: (position, canGoBack, jumps)
        Queue<int[]> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        
        queue.offer(new int[]{0, 1, 0}); // pos, canGoBack (1=yes), jumps
        visited.add("0-1");
        
        int maxPos = 6000; // Upper bound
        
        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int pos = curr[0];
            int canGoBack = curr[1];
            int jumps = curr[2];
            
            if (pos == x) {
                return jumps;
            }
            
            // Forward jump
            int forward = pos + a;
            if (forward <= maxPos && !forbiddenSet.contains(forward)) {
                String state = forward + "-1";
                if (!visited.contains(state)) {
                    visited.add(state);
                    queue.offer(new int[]{forward, 1, jumps + 1});
                }
            }
            
            // Backward jump (only if allowed)
            if (canGoBack == 1) {
                int backward = pos - b;
                if (backward >= 0 && !forbiddenSet.contains(backward)) {
                    String state = backward + "-0";
                    if (!visited.contains(state)) {
                        visited.add(state);
                        queue.offer(new int[]{backward, 0, jumps + 1});
                    }
                }
            }
        }
        
        return -1;
    }
    
    // Time: O(maxPos)
    // Space: O(maxPos)
    `,
    hint: "BFS with state tracking: (position, canJumpBackward). Avoid consecutive backward jumps.",
    tags: ["BFS", "Graph", "State Space"],
    points: 150,
  }),

  // Day 104 - Q5
  createQuestion({
    title: "Minimum Number of Flips to Make Binary String Alternating",
    description:
      "You are given a binary string s. You are allowed to perform two types of operations on the string any number of times: Type-1: Remove the character at the start of the string s and append it to the end of the string. Type-2: Pick any character in s and flip its value. Return the minimum number of type-2 operations you need to perform such that s becomes alternating.",
    difficulty: "Hard",
    topicId: "104",
    examples: [
      {
        input: 's = "111000"',
        output: "2",
        explanation: "Use two flips to get 010101 or 101010",
      },
      {
        input: 's = "010"',
        output: "0",
        explanation: "Already alternating",
      },
      {
        input: 's = "1110"',
        output: "1",
        explanation: "Flip one bit",
      },
    ],
    testCases: [
      { input: '"111000"', expected: "2", isHidden: false },
      { input: '"010"', expected: "0", isHidden: true },
      { input: '"1110"', expected: "1", isHidden: true },
      { input: '"01001001101"', expected: "2", isHidden: true },
      { input: '"10001"', expected: "1", isHidden: true },
    ],
    solution: `
    public int minFlips(String s) {
        int n = s.length();
        s = s + s; // Simulate rotations by doubling string
        
        // Two target patterns
        StringBuilder pattern1 = new StringBuilder();
        StringBuilder pattern2 = new StringBuilder();
        
        for (int i = 0; i < s.length(); i++) {
            pattern1.append(i % 2 == 0 ? '0' : '1');
            pattern2.append(i % 2 == 0 ? '1' : '0');
        }
        
        int diff1 = 0, diff2 = 0;
        int minFlips = Integer.MAX_VALUE;
        
        for (int i = 0; i < s.length(); i++) {
            // Add new character differences
            if (s.charAt(i) != pattern1.charAt(i)) diff1++;
            if (s.charAt(i) != pattern2.charAt(i)) diff2++;
            
            // Remove old character differences (sliding window)
            if (i >= n) {
                if (s.charAt(i - n) != pattern1.charAt(i - n)) diff1--;
                if (s.charAt(i - n) != pattern2.charAt(i - n)) diff2--;
            }
            
            // Update minimum if we have a full window
            if (i >= n - 1) {
                minFlips = Math.min(minFlips, Math.min(diff1, diff2));
            }
        }
        
        return minFlips;
    }
    
    // Time: O(n)
    // Space: O(n)
    `,
    hint: "Use sliding window on doubled string. Compare with patterns '010101...' and '101010...'",
    tags: ["String", "Sliding Window", "Greedy"],
    points: 150,
  }),

  // Day 105 - Q1
  createQuestion({
    title: "Longest Increasing Path in a Matrix",
    description:
      "Given an m x n integers matrix, return the length of the longest increasing path in matrix. From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary.",
    difficulty: "Hard",
    topicId: "105",
    isCompulsory: true,
    examples: [
      {
        input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
        output: "4",
        explanation: "Longest path: 1→2→6→9",
      },
      {
        input: "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
        output: "4",
        explanation: "Longest path: 3→4→5→6",
      },
    ],
    testCases: [
      { input: "[[9,9,4],[6,6,8],[2,1,1]]", expected: "4", isHidden: false },
      { input: "[[3,4,5],[3,2,6],[2,2,1]]", expected: "4", isHidden: true },
      { input: "[[1]]", expected: "1", isHidden: true },
      { input: "[[7,8,9],[9,7,6],[7,2,3]]", expected: "6", isHidden: true },
      { input: "[[0,1,2,3,4,5,6,7,8,9],[19,18,17,16,15,14,13,12,11,10],[20,21,22,23,24,25,26,27,28,29],[39,38,37,36,35,34,33,32,31,30]]", expected: "40", isHidden: true },
    ],
    solution: `
    private int[][] directions = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    
    public int longestIncreasingPath(int[][] matrix) {
        if (matrix == null || matrix.length == 0) return 0;
        
        int m = matrix.length;
        int n = matrix[0].length;
        int[][] memo = new int[m][n];
        int maxPath = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxPath = Math.max(maxPath, dfs(matrix, i, j, memo));
            }
        }
        
        return maxPath;
    }
    
    private int dfs(int[][] matrix, int i, int j, int[][] memo) {
        if (memo[i][j] != 0) return memo[i][j];
        
        int maxLength = 1;
        
        for (int[] dir : directions) {
            int ni = i + dir[0];
            int nj = j + dir[1];
            
            if (ni >= 0 && ni < matrix.length && nj >= 0 && nj < matrix[0].length 
                && matrix[ni][nj] > matrix[i][j]) {
                maxLength = Math.max(maxLength, 1 + dfs(matrix, ni, nj, memo));
            }
        }
        
        memo[i][j] = maxLength;
        return maxLength;
    }
    
    // Time: O(m * n)
    // Space: O(m * n)
    `,
    hint: "DFS with memoization. memo[i][j] = longest path starting from (i,j).",
    tags: ["DP", "DFS", "Matrix", "Memoization"],
    points: 150,
  }),

  // Day 105 - Q2
  createQuestion({
    title: "Word Break",
    description:
      "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.",
    difficulty: "Medium",
    topicId: "105",
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet","code"]',
        output: "true",
        explanation: "Return true because 'leetcode' can be segmented as 'leet code'",
      },
      {
        input: 's = "applepenapple", wordDict = ["apple","pen"]',
        output: "true",
        explanation: "'applepenapple' = 'apple pen apple'",
      },
      {
        input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
        output: "false",
        explanation: "Cannot be segmented",
      },
    ],
    testCases: [
      { input: '"leetcode", ["leet","code"]', expected: "true", isHidden: false },
      { input: '"applepenapple", ["apple","pen"]', expected: "true", isHidden: true },
      { input: '"catsandog", ["cats","dog","sand","and","cat"]', expected: "false", isHidden: true },
      { input: '"aaaaaaa", ["aaaa","aaa"]', expected: "true", isHidden: true },
      { input: '"ab", ["a","b"]', expected: "true", isHidden: true },
    ],
    solution: `
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[s.length()];
    }
    
    // Alternative: Optimized with max word length
    public boolean wordBreakOptimized(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        int maxLen = 0;
        for (String word : wordDict) {
            maxLen = Math.max(maxLen, word.length());
        }
        
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (int j = Math.max(0, i - maxLen); j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[s.length()];
    }
    
    // Time: O(n^2) or O(n * maxLen)
    // Space: O(n)
    `,
    hint: "dp[i] = true if s[0..i] can be segmented. Check all substrings ending at i.",
    tags: ["DP", "String", "Hash Table"],
    points: 120,
  }),

  // Day 105 - Q3
  createQuestion({
    title: "Word Break II",
    description:
      "Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order. Note that the same word in the dictionary may be reused multiple times in the segmentation.",
    difficulty: "Hard",
    topicId: "105",
    examples: [
      {
        input: 's = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]',
        output: '["cats and dog","cat sand dog"]',
        explanation: "Two possible sentences",
      },
      {
        input: 's = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]',
        output: '["pine apple pen apple","pineapple pen apple","pine applepen apple"]',
        explanation: "Multiple valid segmentations",
      },
    ],
    testCases: [
      { input: '"catsanddog", ["cat","cats","and","sand","dog"]', expected: '["cats and dog","cat sand dog"]', isHidden: false },
      { input: '"pineapplepenapple", ["apple","pen","applepen","pine","pineapple"]', expected: '["pine apple pen apple","pineapple pen apple","pine applepen apple"]', isHidden: true },
      { input: '"catsandog", ["cats","dog","sand","and","cat"]', expected: "[]", isHidden: true },
      { input: '"a", ["a"]', expected: '["a"]', isHidden: true },
      { input: '"aaaaaaaa", ["aaaa","aa","a"]', expected: "Multiple solutions", isHidden: true },
    ],
    solution: `
    public List<String> wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        Map<Integer, List<String>> memo = new HashMap<>();
        return backtrack(s, 0, wordSet, memo);
    }
    
    private List<String> backtrack(String s, int start, Set<String> wordSet, 
                                    Map<Integer, List<String>> memo) {
        if (memo.containsKey(start)) {
            return memo.get(start);
        }
        
        List<String> result = new ArrayList<>();
        
        if (start == s.length()) {
            result.add("");
            return result;
        }
        
        for (int end = start + 1; end <= s.length(); end++) {
            String word = s.substring(start, end);
            
            if (wordSet.contains(word)) {
                List<String> sublist = backtrack(s, end, wordSet, memo);
                
                for (String sub : sublist) {
                    result.add(word + (sub.isEmpty() ? "" : " " + sub));
                }
            }
        }
        
        memo.put(start, result);
        return result;
    }
    
    // Time: O(2^n) worst case
    // Space: O(2^n)
    `,
    hint: "Backtracking with memoization. Build sentences by trying each valid word prefix.",
    tags: ["DP", "Backtracking", "String", "Memoization"],
    points: 150,
  }),

  // Day 105 - Q4
  createQuestion({
    title: "Regular Expression Matching",
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where: '.' Matches any single character. '*' Matches zero or more of the preceding element. The matching should cover the entire input string (not partial).",
    difficulty: "Hard",
    topicId: "105",
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: "'a' does not match entire 'aa'",
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation: "'*' means zero or more of 'a'",
      },
      {
        input: 's = "ab", p = ".*"',
        output: "true",
        explanation: "'.*' means any characters",
      },
    ],
    testCases: [
      { input: '"aa", "a"', expected: "false", isHidden: false },
      { input: '"aa", "a*"', expected: "true", isHidden: true },
      { input: '"ab", ".*"', expected: "true", isHidden: true },
      { input: '"mississippi", "mis*is*p*."', expected: "false", isHidden: true },
      { input: '"aab", "c*a*b"', expected: "true", isHidden: true },
    ],
    solution: `
    public boolean isMatch(String s, String p) {
        int m = s.length();
        int n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        
        // Empty string matches empty pattern
        dp[0][0] = true;
        
        // Handle patterns like a*, a*b*, a*b*c*
        for (int j = 2; j <= n; j++) {
            if (p.charAt(j - 1) == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char sc = s.charAt(i - 1);
                char pc = p.charAt(j - 1);
                
                if (pc == '*') {
                    // Match zero occurrences
                    dp[i][j] = dp[i][j - 2];
                    
                    // Match one or more occurrences
                    char prevChar = p.charAt(j - 2);
                    if (prevChar == '.' || prevChar == sc) {
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                    }
                } else if (pc == '.' || pc == sc) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Time: O(m * n)
    // Space: O(m * n)
    `,
    hint: "dp[i][j] = s[0..i] matches p[0..j]. Handle '*' by matching 0 or more of previous char.",
    tags: ["DP", "String", "Recursion"],
    points: 150,
  }),

  // Day 105 - Q5
  createQuestion({
    title: "Wildcard Matching",
    description:
      "Given an input string s and a pattern p, implement wildcard pattern matching with support for '?' and '*' where: '?' Matches any single character. '*' Matches any sequence of characters (including the empty sequence). The matching should cover the entire input string (not partial).",
    difficulty: "Hard",
    topicId: "105",
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: "'a' does not match entire 'aa'",
      },
      {
        input: 's = "aa", p = "*"',
        output: "true",
        explanation: "'*' matches any sequence",
      },
      {
        input: 's = "cb", p = "?a"',
        output: "false",
        explanation: "'?' matches 'c', but 'a' doesn't match 'b'",
      },
    ],
    testCases: [
      { input: '"aa", "a"', expected: "false", isHidden: false },
      { input: '"aa", "*"', expected: "true", isHidden: true },
      { input: '"cb", "?a"', expected: "false", isHidden: true },
      { input: '"adceb", "*a*b"', expected: "true", isHidden: true },
      { input: '"acdcb", "a*c?b"', expected: "false", isHidden: true },
    ],
    solution: `
    public boolean isMatch(String s, String p) {
        int m = s.length();
        int n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        
        dp[0][0] = true;
        
        // Handle leading asterisks in pattern
        for (int j = 1; j <= n; j++) {
            if (p.charAt(j - 1) == '*') {
                dp[0][j] = dp[0][j - 1];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char sc = s.charAt(i - 1);
                char pc = p.charAt(j - 1);
                
                if (pc == '*') {
                    // Match empty sequence OR match one or more chars
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (pc == '?' || pc == sc) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Optimized two-pointer approach
    public boolean isMatchOptimized(String s, String p) {
        int i = 0, j = 0;
        int starIdx = -1, matchIdx = 0;
        
        while (i < s.length()) {
            if (j < p.length() && (p.charAt(j) == '?' || p.charAt(j) == s.charAt(i))) {
                i++;
                j++;
            } else if (j < p.length() && p.charAt(j) == '*') {
                starIdx = j;
                matchIdx = i;
                j++;
            } else if (starIdx != -1) {
                j = starIdx + 1;
                matchIdx++;
                i = matchIdx;
            } else {
                return false;
            }
        }
        
        while (j < p.length() && p.charAt(j) == '*') {
            j++;
        }
        
        return j == p.length();
    }
    
    // Time: O(m * n) for DP, O(m + n) for optimized
    // Space: O(m * n) for DP, O(1) for optimized
    `,
    hint: "dp[i][j] = s[0..i] matches p[0..j]. '*' can match empty or extend previous match.",
    tags: ["DP", "String", "Greedy", "Two Pointer"],
    points: 150,
  }),
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("✅ Connected to MongoDB");

    console.log("\n📝 Creating Topics...");
    for (const topic of topics) {
      const exists = await Topic.findOne({ id: topic.id });
      if (exists) {
        console.log(`⏭️  Exists: ${topic.title}`);
      } else {
        await Topic.create(topic);
        console.log(`✅ Created: ${topic.title}`);
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
      `\n🎉 Days 104-105 processing complete! Created ${createdCount} questions, skipped ${skippedCount} existing`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
