import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays11to13() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // Day 11 - Recursion Basics
    const day11Topic = await Topic.findOneAndUpdate(
      { id: 'day-11' },
      {
        id: 'day-11',
        title: 'Recursion Basics & Tail Recursion',
        description: 'Understanding the call stack, base cases, and recursive mathematical definitions.',
        week: 2,
        day: 11,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-10'],
        compulsoryQuestion: 'Print 1 to N Without Loop',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Created/Updated: ${day11Topic.title}`);

    await Question.deleteMany({ topicId: 'day-11' });
    
    const day11Questions = [
      {
        topicId: 'day-11', title: 'Print 1 to N Without Loop', difficulty: 'Easy', type: 'practice', isCompulsory: true, points: 10, timeLimit: 15,
        description: 'Print numbers from 1 to N without the help of loops.',
        starterCode: `public class Solution {\n    public static void printNos(int N) {\n        // Your code here\n    }\n    \n    public static void main(String[] args) {\n        printNos(5);\n    }\n}`,
        solution: `public class Solution {\n    public static void printNos(int N) {\n        if (N == 0) return;\n        printNos(N - 1);\n        System.out.print(N + " ");\n    }\n    \n    public static void main(String[] args) {\n        printNos(5); // 1 2 3 4 5\n    }\n}`,
        examples: [{ input: 'N = 5', output: '1 2 3 4 5' }],
        testCases: [
          { input: '5', expectedOutput: '1 2 3 4 5', isHidden: false, points: 5 },
          { input: '10', expectedOutput: '1 2 3 4 5 6 7 8 9 10', isHidden: true, points: 5 }
        ],
        hints: ['Use recursion with base case N == 0', 'Call function for N-1 first, then print N'],
        tags: ['Recursion']
      },
      {
        topicId: 'day-11', title: 'Power of Four (Recursive Check)', difficulty: 'Easy', type: 'practice', isCompulsory: false, points: 15, timeLimit: 15,
        description: 'Given an integer n, return true if it is a power of four. Write a recursive function to solve this.',
        starterCode: `public class Solution {\n    public static boolean isPowerOfFour(int n) {\n        // Your code here\n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(isPowerOfFour(16)); // true\n    }\n}`,
        solution: `public class Solution {\n    public static boolean isPowerOfFour(int n) {\n        if (n <= 0) return false;\n        if (n == 1) return true;\n        if (n % 4 != 0) return false;\n        return isPowerOfFour(n / 4);\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(isPowerOfFour(16)); // true\n        System.out.println(isPowerOfFour(5)); // false\n    }\n}`,
        examples: [{ input: 'n = 16', output: 'true' }],
        testCases: [
          { input: '16', expectedOutput: 'true', isHidden: false, points: 5 },
          { input: '5', expectedOutput: 'false', isHidden: false, points: 5 },
          { input: '1', expectedOutput: 'true', isHidden: true, points: 5 }
        ],
        hints: ['Base case: n == 1 returns true', 'Check if n % 4 == 0, then recurse with n/4'],
        tags: ['Recursion', 'Math']
      },
      {
        topicId: 'day-11', title: 'K-th Symbol in Grammar', difficulty: 'Medium', type: 'practice', isCompulsory: false, points: 20, timeLimit: 25,
        description: 'We build a table of n rows (1-indexed). We start by writing 0 in the 1st row. Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10. Given n and k, return the k-th (1-indexed) symbol in the n-th row.',
        starterCode: `public class Solution {\n    public static int kthGrammar(int n, int k) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(kthGrammar(2, 2)); // 1\n    }\n}`,
        solution: `public class Solution {\n    public static int kthGrammar(int n, int k) {\n        if (n == 1) return 0;\n        int parent = kthGrammar(n - 1, (k + 1) / 2);\n        if (k % 2 == 1) return parent;\n        return 1 - parent;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(kthGrammar(2, 2)); // 1\n    }\n}`,
        examples: [{ input: 'n = 2, k = 2', output: '1' }],
        testCases: [
          { input: '2\n2', expectedOutput: '1', isHidden: false, points: 7 },
          { input: '4\n5', expectedOutput: '1', isHidden: true, points: 8 }
        ],
        hints: ['Notice the pattern: each row is generated from previous', 'Use recursion to find parent symbol'],
        tags: ['Recursion', 'Binary Tree']
      },
      {
        topicId: 'day-11', title: 'Recursive Implementation of atoi', difficulty: 'Medium', type: 'practice', isCompulsory: false, points: 20, timeLimit: 25,
        description: 'Implement a recursive version of atoi which converts a string to an integer. Discard leading whitespaces, handle signs (+/-), and stop when a non-digit character is found.',
        starterCode: `public class Solution {\n    public static int myAtoi(String s) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(myAtoi(" -42")); // -42\n    }\n}`,
        solution: `public class Solution {\n    public static int myAtoi(String s) {\n        s = s.trim();\n        if (s.isEmpty()) return 0;\n        int sign = 1;\n        int i = 0;\n        if (s.charAt(0) == '-' || s.charAt(0) == '+') {\n            sign = s.charAt(0) == '-' ? -1 : 1;\n            i = 1;\n        }\n        return sign * helper(s, i, 0);\n    }\n    \n    private static int helper(String s, int i, int result) {\n        if (i >= s.length() || !Character.isDigit(s.charAt(i))) return result;\n        int digit = s.charAt(i) - '0';\n        if (result > (Integer.MAX_VALUE - digit) / 10) {\n            return Integer.MAX_VALUE;\n        }\n        return helper(s, i + 1, result * 10 + digit);\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(myAtoi(" -42")); // -42\n    }\n}`,
        examples: [{ input: 's = " -42"', output: '-42' }],
        testCases: [
          { input: ' -42', expectedOutput: '-42', isHidden: false, points: 7 },
          { input: '4193 with words', expectedOutput: '4193', isHidden: true, points: 8 }
        ],
        hints: ['Handle whitespace and sign first', 'Recursively build number digit by digit'],
        tags: ['Recursion', 'String']
      },
      {
        topicId: 'day-11', title: 'Find Maximum Element Recursively', difficulty: 'Easy', type: 'practice', isCompulsory: false, points: 15, timeLimit: 15,
        description: 'Given an array arr of size n, write a recursive function to find the maximum element.',
        starterCode: `public class Solution {\n    public static int findMax(int[] arr, int n) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] arr = {1, 4, 3, -5, 9, 8};\n        System.out.println(findMax(arr, arr.length)); // 9\n    }\n}`,
        solution: `public class Solution {\n    public static int findMax(int[] arr, int n) {\n        if (n == 1) return arr[0];\n        return Math.max(arr[n - 1], findMax(arr, n - 1));\n    }\n    \n    public static void main(String[] args) {\n        int[] arr = {1, 4, 3, -5, 9, 8};\n        System.out.println(findMax(arr, arr.length)); // 9\n    }\n}`,
        examples: [{ input: 'arr = [1, 4, 3, -5, 9, 8]', output: '9' }],
        testCases: [
          { input: '[1, 4, 3, -5, 9, 8]', expectedOutput: '9', isHidden: false, points: 5 },
          { input: '[-1, -5, -3]', expectedOutput: '-1', isHidden: true, points: 5 }
        ],
        hints: ['Base case: array of size 1', 'Compare last element with max of rest'],
        tags: ['Recursion', 'Array']
      }
    ];

    for (const q of day11Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    // Day 12 - Recursion: Sum of Digits & Palindrome
    const day12Topic = await Topic.findOneAndUpdate(
      { id: 'day-12' },
      {
        id: 'day-12',
        title: 'Recursion: Sum of Digits & Palindrome',
        description: 'String processing and digit extraction using recursion.',
        week: 2,
        day: 12,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-11'],
        compulsoryQuestion: 'Add Digits (Recursive Digital Root)',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`\n✅ Created/Updated: ${day12Topic.title}`);

    await Question.deleteMany({ topicId: 'day-12' });

    const day12Questions = [
      {
        topicId: 'day-12', title: 'Add Digits (Recursive Digital Root)', difficulty: 'Easy', type: 'practice', isCompulsory: true, points: 15, timeLimit: 15,
        description: 'Given an integer num, repeatedly add all its digits until the result has only one digit, and return it. Implement this using recursion.',
        starterCode: `public class Solution {\n    public static int addDigits(int num) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(addDigits(38)); // 2\n    }\n}`,
        solution: `public class Solution {\n    public static int addDigits(int num) {\n        if (num < 10) return num;\n        int sum = 0;\n        while (num > 0) {\n            sum += num % 10;\n            num /= 10;\n        }\n        return addDigits(sum);\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(addDigits(38)); // 2\n    }\n}`,
        examples: [{ input: 'num = 38', output: '2' }],
        testCases: [
          { input: '38', expectedOutput: '2', isHidden: false, points: 5 },
          { input: '0', expectedOutput: '0', isHidden: true, points: 5 }
        ],
        hints: ['Base case: num < 10', 'Sum all digits, then recurse'],
        tags: ['Recursion', 'Math']
      },
      {
        topicId: 'day-12', title: 'Valid Palindrome (Recursive)', difficulty: 'Easy', type: 'practice', isCompulsory: false, points: 15, timeLimit: 20,
        description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Write a recursive helper function to check this.',
        starterCode: `public class Solution {\n    public static boolean isPalindrome(String s) {\n        // Your code here\n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true\n    }\n}`,
        solution: `public class Solution {\n    public static boolean isPalindrome(String s) {\n        s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();\n        return helper(s, 0, s.length() - 1);\n    }\n    \n    private static boolean helper(String s, int left, int right) {\n        if (left >= right) return true;\n        if (s.charAt(left) != s.charAt(right)) return false;\n        return helper(s, left + 1, right - 1);\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true\n    }\n}`,
        examples: [{ input: 's = "A man, a plan, a canal: Panama"', output: 'true' }],
        testCases: [
          { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', isHidden: false, points: 5 },
          { input: 'race a car', expectedOutput: 'false', isHidden: true, points: 5 }
        ],
        hints: ['Clean string first', 'Use two pointers recursively'],
        tags: ['Recursion', 'String', 'Two Pointers']
      },
      {
        topicId: 'day-12', title: 'Is Subsequence', difficulty: 'Easy', type: 'practice', isCompulsory: false, points: 15, timeLimit: 20,
        description: 'Given two strings s and t, return true if s is a subsequence of t, or false otherwise. Solve recursively.',
        starterCode: `public class Solution {\n    public static boolean isSubsequence(String s, String t) {\n        // Your code here\n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(isSubsequence("abc", "ahbgdc")); // true\n    }\n}`,
        solution: `public class Solution {\n    public static boolean isSubsequence(String s, String t) {\n        return helper(s, t, 0, 0);\n    }\n    \n    private static boolean helper(String s, String t, int i, int j) {\n        if (i == s.length()) return true;\n        if (j == t.length()) return false;\n        if (s.charAt(i) == t.charAt(j)) {\n            return helper(s, t, i + 1, j + 1);\n        }\n        return helper(s, t, i, j + 1);\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(isSubsequence("abc", "ahbgdc")); // true\n    }\n}`,
        examples: [{ input: 's = "abc", t = "ahbgdc"', output: 'true' }],
        testCases: [
          { input: 'abc\nahbgdc', expectedOutput: 'true', isHidden: false, points: 5 },
          { input: 'axc\nahbgdc', expectedOutput: 'false', isHidden: true, points: 5 }
        ],
        hints: ['Use two pointers', 'Match characters recursively'],
        tags: ['Recursion', 'String', 'Two Pointers']
      },
      {
        topicId: 'day-12', title: 'Recursive Digit Sum (Super Digit)', difficulty: 'Medium', type: 'practice', isCompulsory: false, points: 20, timeLimit: 25,
        description: 'Given a string n representing an integer, return the "super digit" of n. The super digit is calculated by summing the digits of n recursively until a single-digit number is obtained.',
        starterCode: `public class Solution {\n    public static int superDigit(String n) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(superDigit("9875")); // 2\n    }\n}`,
        solution: `public class Solution {\n    public static int superDigit(String n) {\n        if (n.length() == 1) return Integer.parseInt(n);\n        long sum = 0;\n        for (char c : n.toCharArray()) {\n            sum += c - '0';\n        }\n        return superDigit(String.valueOf(sum));\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(superDigit("9875")); // 2\n    }\n}`,
        examples: [{ input: 'n = "9875"', output: '2' }],
        testCases: [
          { input: '9875', expectedOutput: '2', isHidden: false, points: 7 },
          { input: '123', expectedOutput: '6', isHidden: true, points: 8 }
        ],
        hints: ['Base case: single digit', 'Sum digits and recurse'],
        tags: ['Recursion', 'String']
      },
      {
        topicId: 'day-12', title: 'Power Set (Generate Subsets)', difficulty: 'Medium', type: 'practice', isCompulsory: false, points: 25, timeLimit: 30,
        description: 'Given an integer array nums of unique elements, return all possible subsets (the power set). Use the Include/Exclude recursion pattern.',
        starterCode: `import java.util.*;\n\npublic class Solution {\n    public static List<List<Integer>> subsets(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(subsets(new int[]{1,2,3}));\n    }\n}`,
        solution: `import java.util.*;\n\npublic class Solution {\n    public static List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        helper(nums, 0, new ArrayList<>(), result);\n        return result;\n    }\n    \n    private static void helper(int[] nums, int idx, List<Integer> current, List<List<Integer>> result) {\n        if (idx == nums.length) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n        // Exclude\n        helper(nums, idx + 1, current, result);\n        // Include\n        current.add(nums[idx]);\n        helper(nums, idx + 1, current, result);\n        current.remove(current.size() - 1);\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(subsets(new int[]{1,2,3}));\n    }\n}`,
        examples: [{ input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' }],
        testCases: [
          { input: '[1,2,3]', expectedOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', isHidden: false, points: 10 },
          { input: '[0]', expectedOutput: '[[],[0]]', isHidden: true, points: 10 }
        ],
        hints: ['Use include/exclude pattern', 'Build subsets recursively'],
        tags: ['Recursion', 'Backtracking']
      }
    ];

    for (const q of day12Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    // Day 13 - Tower of Hanoi & Josephus
    const day13Topic = await Topic.findOneAndUpdate(
      { id: 'day-13' },
      {
        id: 'day-13',
        title: 'Tower of Hanoi & Josephus Problem',
        description: 'Classical hard recursion problems involving reduction and circular indexing.',
        week: 2,
        day: 13,
        difficulty: 'Hard',
        estimatedTime: 150,
        prerequisites: ['day-12'],
        compulsoryQuestion: 'Tower of Hanoi',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`\n✅ Created/Updated: ${day13Topic.title}`);

    await Question.deleteMany({ topicId: 'day-13' });

    const day13Questions = [
      {
        topicId: 'day-13', title: 'Tower of Hanoi', difficulty: 'Hard', type: 'practice', isCompulsory: true, points: 30, timeLimit: 40,
        description: 'You have 3 rods and n disks of different sizes. Initially, all disks are stacked in decreasing order of size on Rod 1. The objective is to move the entire stack to Rod 3. Return the total number of moves required.',
        starterCode: `public class Solution {\n    public static int towerOfHanoi(int n) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(towerOfHanoi(2)); // 3\n    }\n}`,
        solution: `public class Solution {\n    public static int towerOfHanoi(int n) {\n        if (n == 0) return 0;\n        return 2 * towerOfHanoi(n - 1) + 1;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(towerOfHanoi(2)); // 3\n        System.out.println(towerOfHanoi(3)); // 7\n    }\n}`,
        examples: [{ input: 'n = 2', output: '3' }],
        testCases: [
          { input: '2', expectedOutput: '3', isHidden: false, points: 10 },
          { input: '3', expectedOutput: '7', isHidden: false, points: 10 },
          { input: '4', expectedOutput: '15', isHidden: true, points: 10 }
        ],
        hints: ['Formula: T(n) = 2*T(n-1) + 1', 'Move n-1 disks to auxiliary, move nth to dest, move n-1 from aux to dest'],
        tags: ['Recursion', 'Classic Problem']
      },
      {
        topicId: 'day-13', title: 'Find the Winner of the Circular Game (Josephus Problem)', difficulty: 'Medium', type: 'practice', isCompulsory: false, points: 25, timeLimit: 30,
        description: 'There are n friends playing a game in a circle. Count k friends clockwise, the last one leaves. Repeat until one remains. Return the winner.',
        starterCode: `public class Solution {\n    public static int findTheWinner(int n, int k) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(findTheWinner(5, 2)); // 3\n    }\n}`,
        solution: `public class Solution {\n    public static int findTheWinner(int n, int k) {\n        if (n == 1) return 1;\n        return (findTheWinner(n - 1, k) + k - 1) % n + 1;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(findTheWinner(5, 2)); // 3\n    }\n}`,
        examples: [{ input: 'n = 5, k = 2', output: '3' }],
        testCases: [
          { input: '5\n2', expectedOutput: '3', isHidden: false, points: 10 },
          { input: '6\n5', expectedOutput: '1', isHidden: true, points: 10 }
        ],
        hints: ['Use Josephus formula: J(n,k) = (J(n-1,k) + k) % n', 'Adjust for 1-based indexing'],
        tags: ['Recursion', 'Math', 'Classic Problem']
      },
      {
        topicId: 'day-13', title: 'Elimination Game', difficulty: 'Medium', type: 'practice', isCompulsory: false, points: 25, timeLimit: 35,
        description: 'You have a list [1, n]. Repeatedly remove elements alternating left-to-right and right-to-left. Return the last remaining number.',
        starterCode: `public class Solution {\n    public static int lastRemaining(int n) {\n        // Your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(lastRemaining(9)); // 6\n    }\n}`,
        solution: `public class Solution {\n    public static int lastRemaining(int n) {\n        return helper(n, true);\n    }\n    \n    private static int helper(int n, boolean leftToRight) {\n        if (n == 1) return 1;\n        if (leftToRight) {\n            return 2 * helper(n / 2, false);\n        } else {\n            return 2 * helper(n / 2, true) - (n % 2 == 0 ? 1 : 0);\n        }\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(lastRemaining(9)); // 6\n    }\n}`,
        examples: [{ input: 'n = 9', output: '6' }],
        testCases: [
          { input: '9', expectedOutput: '6', isHidden: false, points: 10 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 10 }
        ],
        hints: ['Track direction', 'Recurse with n/2'],
        tags: ['Recursion', 'Math']
      },
      {
        topicId: 'day-13', title: 'Predict the Winner', difficulty: 'Medium', type: 'practice', isCompulsory: false, points: 25, timeLimit: 35,
        description: 'Two players take turns picking numbers from either end of an array. Return true if Player 1 can win. Use minimax recursion.',
        starterCode: `public class Solution {\n    public static boolean predictTheWinner(int[] nums) {\n        // Your code here\n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(predictTheWinner(new int[]{1, 5, 2})); // false\n    }\n}`,
        solution: `public class Solution {\n    public static boolean predictTheWinner(int[] nums) {\n        return helper(nums, 0, nums.length - 1) >= 0;\n    }\n    \n    private static int helper(int[] nums, int left, int right) {\n        if (left == right) return nums[left];\n        int pickLeft = nums[left] - helper(nums, left + 1, right);\n        int pickRight = nums[right] - helper(nums, left, right - 1);\n        return Math.max(pickLeft, pickRight);\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(predictTheWinner(new int[]{1, 5, 2})); // false\n    }\n}`,
        examples: [{ input: 'nums = [1, 5, 2]', output: 'false' }],
        testCases: [
          { input: '[1, 5, 2]', expectedOutput: 'false', isHidden: false, points: 10 },
          { input: '[1, 5, 233, 7]', expectedOutput: 'true', isHidden: true, points: 10 }
        ],
        hints: ['Use minimax: score = pick - opponent_best', 'Try both ends'],
        tags: ['Recursion', 'Game Theory', 'Dynamic Programming']
      },
      {
        topicId: 'day-13', title: 'Different Ways to Add Parentheses', difficulty: 'Medium', type: 'practice', isCompulsory: false, points: 25, timeLimit: 35,
        description: 'Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators.',
        starterCode: `import java.util.*;\n\npublic class Solution {\n    public static List<Integer> diffWaysToCompute(String expression) {\n        // Your code here\n        return new ArrayList<>();\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(diffWaysToCompute("2-1-1")); // [0, 2]\n    }\n}`,
        solution: `import java.util.*;\n\npublic class Solution {\n    public static List<Integer> diffWaysToCompute(String expression) {\n        List<Integer> result = new ArrayList<>();\n        for (int i = 0; i < expression.length(); i++) {\n            char c = expression.charAt(i);\n            if (c == '+' || c == '-' || c == '*') {\n                List<Integer> left = diffWaysToCompute(expression.substring(0, i));\n                List<Integer> right = diffWaysToCompute(expression.substring(i + 1));\n                for (int l : left) {\n                    for (int r : right) {\n                        if (c == '+') result.add(l + r);\n                        else if (c == '-') result.add(l - r);\n                        else result.add(l * r);\n                    }\n                }\n            }\n        }\n        if (result.isEmpty()) result.add(Integer.parseInt(expression));\n        return result;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(diffWaysToCompute("2-1-1")); // [0, 2]\n    }\n}`,
        examples: [{ input: 'expression = "2-1-1"', output: '[0,2]' }],
        testCases: [
          { input: '2-1-1', expectedOutput: '[0, 2]', isHidden: false, points: 10 },
          { input: '2*3-4*5', expectedOutput: '[-34, -14, -10, -10, 10]', isHidden: true, points: 10 }
        ],
        hints: ['Divide at each operator', 'Combine results from left and right'],
        tags: ['Recursion', 'Divide and Conquer']
      }
    ];

    for (const q of day13Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    console.log(`\n🎉 Successfully populated Days 11-13!`);
    console.log(`📊 Total: 15 questions added`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays11to13();
