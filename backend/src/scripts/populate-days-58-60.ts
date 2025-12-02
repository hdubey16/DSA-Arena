import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays58to60() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 58 - Balanced Parentheses & Stock Span ====================
    const day58Topic = await Topic.findOneAndUpdate(
      { id: 'day-58' },
      {
        id: 'day-58',
        title: 'Balanced Parentheses & Stock Span',
        description: 'Monotonic Stack logic for parentheses and span problems.',
        week: 9,
        day: 58,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-57'],
        compulsoryQuestion: 'Generate Parentheses',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day58Topic.title}`);
    await Question.deleteMany({ topicId: 'day-58' });

    await Question.insertMany([
      {
        topicId: 'day-58',
        title: 'Generate Parentheses',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Generate all combinations of n pairs of well-formed parentheses.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<String> generateParenthesis(int n) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<String> generateParenthesis(int n) {\n        List<String> result = new ArrayList<>();\n        backtrack(result, "", 0, 0, n);\n        return result;\n    }\n    private static void backtrack(List<String> result, String curr, int open, int close, int n) {\n        if (curr.length() == 2 * n) {\n            result.add(curr);\n            return;\n        }\n        if (open < n) backtrack(result, curr + "(", open + 1, close, n);\n        if (close < open) backtrack(result, curr + ")", open, close + 1, n);\n    }\n}',
        examples: [{ input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' }],
        testCases: [{ input: '3', expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]', isHidden: false, points: 12 }],
        hints: ['Backtracking', 'Add ( if open < n', 'Add ) if close < open'],
        tags: ['String', 'Backtracking']
      },
      {
        topicId: 'day-58',
        title: 'Longest Valid Parentheses',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Find length of longest valid parentheses substring.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int longestValidParentheses(String s) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int longestValidParentheses(String s) {\n        Stack<Integer> stack = new Stack<>();\n        stack.push(-1);\n        int maxLen = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (s.charAt(i) == \'(\') {\n                stack.push(i);\n            } else {\n                stack.pop();\n                if (stack.isEmpty()) {\n                    stack.push(i);\n                } else {\n                    maxLen = Math.max(maxLen, i - stack.peek());\n                }\n            }\n        }\n        return maxLen;\n    }\n}',
        examples: [{ input: 's = ")()())"', output: '4' }],
        testCases: [{ input: ')()())', expectedOutput: '4', isHidden: false, points: 18 }],
        hints: ['Stack stores indices', 'Push -1 as base', 'Calculate length on pop'],
        tags: ['String', 'Stack', 'Dynamic Programming']
      },
      {
        topicId: 'day-58',
        title: 'Online Stock Span',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Calculate stock span (consecutive days with price <= today).',
        starterCode: 'import java.util.*;\nclass StockSpanner {\n    public StockSpanner() {}\n    public int next(int price) { return 0; }\n}',
        solution: 'import java.util.*;\nclass StockSpanner {\n    private Stack<int[]> stack = new Stack<>();\n    public StockSpanner() {}\n    public int next(int price) {\n        int span = 1;\n        while (!stack.isEmpty() && stack.peek()[0] <= price) {\n            span += stack.pop()[1];\n        }\n        stack.push(new int[]{price, span});\n        return span;\n    }\n}',
        examples: [{ input: '[100, 80, 60, 70, 60, 75, 85]', output: '[1, 1, 1, 2, 1, 4, 6]' }],
        testCases: [{ input: '[100,80,60]', expectedOutput: '[1,1,1]', isHidden: false, points: 12 }],
        hints: ['Monotonic decreasing stack', 'Store price and span', 'Accumulate spans when popping'],
        tags: ['Stack', 'Monotonic Stack', 'Design']
      },
      {
        topicId: 'day-58',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find days to wait for warmer temperature.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] dailyTemperatures(int[] temperatures) { return new int[0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] result = new int[n];\n        Stack<Integer> stack = new Stack<>();\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int idx = stack.pop();\n                result[idx] = i - idx;\n            }\n            stack.push(i);\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' }],
        testCases: [{ input: '[73,74,75,71,69,72,76,73]', expectedOutput: '[1,1,4,2,1,1,0,0]', isHidden: false, points: 12 }],
        hints: ['Monotonic decreasing stack', 'Store indices', 'Calculate difference when popping'],
        tags: ['Array', 'Stack', 'Monotonic Stack']
      },
      {
        topicId: 'day-58',
        title: 'Remove K Digits',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Remove k digits to get smallest possible number.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String removeKdigits(String num, int k) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String removeKdigits(String num, int k) {\n        if (k >= num.length()) return "0";\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char c : num.toCharArray()) {\n            while (!stack.isEmpty() && k > 0 && stack.peek() > c) {\n                stack.pop();\n                k--;\n            }\n            stack.push(c);\n        }\n        while (k > 0) {\n            stack.pop();\n            k--;\n        }\n        StringBuilder sb = new StringBuilder();\n        while (!stack.isEmpty()) sb.append(stack.pollLast());\n        while (sb.length() > 1 && sb.charAt(0) == \'0\') sb.deleteCharAt(0);\n        return sb.toString();\n    }\n}',
        examples: [{ input: 'num = "1432219", k = 3', output: '"1219"' }],
        testCases: [{ input: '1432219\n3', expectedOutput: '1219', isHidden: false, points: 12 }],
        hints: ['Monotonic increasing stack', 'Remove larger preceding digits', 'Handle leading zeros'],
        tags: ['String', 'Stack', 'Greedy', 'Monotonic Stack']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 59 - Next Greater Element & Histogram Area ====================
    const day59Topic = await Topic.findOneAndUpdate(
      { id: 'day-59' },
      {
        id: 'day-59',
        title: 'Next Greater Element & Histogram Area',
        description: 'Hard Monotonic Stack problems.',
        week: 9,
        day: 59,
        difficulty: 'Hard',
        estimatedTime: 180,
        prerequisites: ['day-58'],
        compulsoryQuestion: 'Largest Rectangle in Histogram',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day59Topic.title}`);
    await Question.deleteMany({ topicId: 'day-59' });

    await Question.insertMany([
      {
        topicId: 'day-59',
        title: 'Next Greater Element I',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Find next greater element for each element in nums1 from nums2.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] nextGreaterElement(int[] nums1, int[] nums2) { return new int[0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        Map<Integer, Integer> map = new HashMap<>();\n        Stack<Integer> stack = new Stack<>();\n        for (int num : nums2) {\n            while (!stack.isEmpty() && stack.peek() < num) {\n                map.put(stack.pop(), num);\n            }\n            stack.push(num);\n        }\n        int[] result = new int[nums1.length];\n        for (int i = 0; i < nums1.length; i++) {\n            result[i] = map.getOrDefault(nums1[i], -1);\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' }],
        testCases: [{ input: '[4,1,2]\n[1,3,4,2]', expectedOutput: '[-1,3,-1]', isHidden: false, points: 10 }],
        hints: ['Build map using monotonic stack on nums2', 'Query map for nums1'],
        tags: ['Array', 'Hash Table', 'Stack', 'Monotonic Stack']
      },
      {
        topicId: 'day-59',
        title: 'Next Greater Element II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Next greater element in circular array.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] nextGreaterElements(int[] nums) { return new int[0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] nextGreaterElements(int[] nums) {\n        int n = nums.length;\n        int[] result = new int[n];\n        Arrays.fill(result, -1);\n        Stack<Integer> stack = new Stack<>();\n        for (int i = 0; i < 2 * n; i++) {\n            int num = nums[i % n];\n            while (!stack.isEmpty() && nums[stack.peek()] < num) {\n                result[stack.pop()] = num;\n            }\n            if (i < n) stack.push(i);\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [1,2,1]', output: '[2,-1,2]' }],
        testCases: [{ input: '[1,2,1]', expectedOutput: '[2,-1,2]', isHidden: false, points: 12 }],
        hints: ['Iterate 2n times', 'Use modulo for circular', 'Only push in first n'],
        tags: ['Array', 'Stack', 'Monotonic Stack']
      },
      {
        topicId: 'day-59',
        title: 'Largest Rectangle in Histogram',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: true,
        points: 35,
        timeLimit: 40,
        description: 'Find largest rectangle area in histogram.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int largestRectangleArea(int[] heights) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int largestRectangleArea(int[] heights) {\n        Stack<Integer> stack = new Stack<>();\n        int maxArea = 0;\n        for (int i = 0; i <= heights.length; i++) {\n            int h = (i == heights.length) ? 0 : heights[i];\n            while (!stack.isEmpty() && h < heights[stack.peek()]) {\n                int height = heights[stack.pop()];\n                int width = stack.isEmpty() ? i : i - stack.peek() - 1;\n                maxArea = Math.max(maxArea, height * width);\n            }\n            stack.push(i);\n        }\n        return maxArea;\n    }\n}',
        examples: [{ input: 'heights = [2,1,5,6,2,3]', output: '10' }],
        testCases: [{ input: '[2,1,5,6,2,3]', expectedOutput: '10', isHidden: false, points: 18 }],
        hints: ['Monotonic increasing stack', 'Calculate area when popping', 'Width from stack boundaries'],
        tags: ['Array', 'Stack', 'Monotonic Stack']
      },
      {
        topicId: 'day-59',
        title: 'Maximal Rectangle',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 40,
        timeLimit: 45,
        description: 'Find largest rectangle containing only 1s in binary matrix.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int maximalRectangle(char[][] matrix) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int maximalRectangle(char[][] matrix) {\n        if (matrix.length == 0) return 0;\n        int[] heights = new int[matrix[0].length];\n        int maxArea = 0;\n        for (char[] row : matrix) {\n            for (int i = 0; i < row.length; i++) {\n                heights[i] = row[i] == \'1\' ? heights[i] + 1 : 0;\n            }\n            maxArea = Math.max(maxArea, largestRectangleArea(heights));\n        }\n        return maxArea;\n    }\n    private static int largestRectangleArea(int[] heights) {\n        Stack<Integer> stack = new Stack<>();\n        int maxArea = 0;\n        for (int i = 0; i <= heights.length; i++) {\n            int h = i == heights.length ? 0 : heights[i];\n            while (!stack.isEmpty() && h < heights[stack.peek()]) {\n                int height = heights[stack.pop()];\n                int width = stack.isEmpty() ? i : i - stack.peek() - 1;\n                maxArea = Math.max(maxArea, height * width);\n            }\n            stack.push(i);\n        }\n        return maxArea;\n    }\n}',
        examples: [{ input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: '6' }],
        testCases: [{ input: '[["1","1"],["1","1"]]', expectedOutput: '4', isHidden: false, points: 20 }],
        hints: ['Build histogram row by row', 'Use largest rectangle in histogram', 'Reset height on 0'],
        tags: ['Array', 'Stack', 'Matrix', 'Monotonic Stack']
      },
      {
        topicId: 'day-59',
        title: 'Sum of Subarray Minimums',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Sum of min(b) for all subarrays b. Return mod 10^9+7.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int sumSubarrayMins(int[] arr) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int sumSubarrayMins(int[] arr) {\n        int MOD = 1_000_000_007;\n        int n = arr.length;\n        long result = 0;\n        Stack<Integer> stack = new Stack<>();\n        for (int i = 0; i <= n; i++) {\n            while (!stack.isEmpty() && (i == n || arr[stack.peek()] >= arr[i])) {\n                int mid = stack.pop();\n                int left = stack.isEmpty() ? -1 : stack.peek();\n                int right = i;\n                long count = (long)(mid - left) * (right - mid);\n                result = (result + count * arr[mid]) % MOD;\n            }\n            stack.push(i);\n        }\n        return (int) result;\n    }\n}',
        examples: [{ input: 'arr = [3,1,2,4]', output: '17' }],
        testCases: [{ input: '[3,1,2,4]', expectedOutput: '17', isHidden: false, points: 15 }],
        hints: ['Count subarrays where each element is min', 'Use monotonic stack for boundaries', 'Count = left * right'],
        tags: ['Array', 'Stack', 'Monotonic Stack']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 60 - Infix, Prefix, Postfix Conversions ====================
    const day60Topic = await Topic.findOneAndUpdate(
      { id: 'day-60' },
      {
        id: 'day-60',
        title: 'Infix, Prefix, Postfix Conversions',
        description: 'Expression parsing and evaluation.',
        week: 9,
        day: 60,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-59'],
        compulsoryQuestion: 'Evaluate Reverse Polish Notation',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day60Topic.title}`);
    await Question.deleteMany({ topicId: 'day-60' });

    await Question.insertMany([
      {
        topicId: 'day-60',
        title: 'Evaluate Reverse Polish Notation',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Evaluate expression in Reverse Polish Notation (postfix).',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int evalRPN(String[] tokens) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int evalRPN(String[] tokens) {\n        Stack<Integer> stack = new Stack<>();\n        for (String token : tokens) {\n            if ("+-*/".contains(token)) {\n                int b = stack.pop(), a = stack.pop();\n                switch (token) {\n                    case "+": stack.push(a + b); break;\n                    case "-": stack.push(a - b); break;\n                    case "*": stack.push(a * b); break;\n                    case "/": stack.push(a / b); break;\n                }\n            } else {\n                stack.push(Integer.parseInt(token));\n            }\n        }\n        return stack.pop();\n    }\n}',
        examples: [{ input: 'tokens = ["2","1","+","3","*"]', output: '9' }],
        testCases: [{ input: '["2","1","+","3","*"]', expectedOutput: '9', isHidden: false, points: 12 }],
        hints: ['Push numbers', 'Pop two for operator', 'Push result'],
        tags: ['Array', 'Math', 'Stack']
      },
      {
        topicId: 'day-60',
        title: 'Basic Calculator',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Evaluate expression with +, -, and parentheses.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int calculate(String s) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int calculate(String s) {\n        Stack<Integer> stack = new Stack<>();\n        int result = 0, num = 0, sign = 1;\n        for (char c : s.toCharArray()) {\n            if (Character.isDigit(c)) {\n                num = num * 10 + (c - \'0\');\n            } else if (c == \'+\') {\n                result += sign * num;\n                num = 0;\n                sign = 1;\n            } else if (c == \'-\') {\n                result += sign * num;\n                num = 0;\n                sign = -1;\n            } else if (c == \'(\') {\n                stack.push(result);\n                stack.push(sign);\n                result = 0;\n                sign = 1;\n            } else if (c == \')\') {\n                result += sign * num;\n                num = 0;\n                result *= stack.pop();\n                result += stack.pop();\n            }\n        }\n        return result + sign * num;\n    }\n}',
        examples: [{ input: 's = "(1+(4+5+2)-3)+(6+8)"', output: '23' }],
        testCases: [{ input: '(1+(4+5+2)-3)+(6+8)', expectedOutput: '23', isHidden: false, points: 18 }],
        hints: ['Track sign and result', 'Push on (', 'Pop and combine on )'],
        tags: ['Math', 'String', 'Stack']
      },
      {
        topicId: 'day-60',
        title: 'Basic Calculator II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Evaluate expression with +, -, *, / (no parentheses).',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int calculate(String s) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int calculate(String s) {\n        Stack<Integer> stack = new Stack<>();\n        int num = 0;\n        char op = \'+\';\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (Character.isDigit(c)) {\n                num = num * 10 + (c - \'0\');\n            }\n            if ((!Character.isDigit(c) && c != \' \') || i == s.length() - 1) {\n                if (op == \'+\') stack.push(num);\n                else if (op == \'-\') stack.push(-num);\n                else if (op == \'*\') stack.push(stack.pop() * num);\n                else if (op == \'/\') stack.push(stack.pop() / num);\n                op = c;\n                num = 0;\n            }\n        }\n        int result = 0;\n        while (!stack.isEmpty()) result += stack.pop();\n        return result;\n    }\n}',
        examples: [{ input: 's = "3+2*2"', output: '7' }],
        testCases: [{ input: '3+2*2', expectedOutput: '7', isHidden: false, points: 12 }],
        hints: ['Handle * and / immediately', 'Push + and - to stack', 'Sum stack at end'],
        tags: ['Math', 'String', 'Stack']
      },
      {
        topicId: 'day-60',
        title: 'Decode String',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Decode string with format k[encoded_string].',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String decodeString(String s) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String decodeString(String s) {\n        Stack<Integer> countStack = new Stack<>();\n        Stack<StringBuilder> stringStack = new Stack<>();\n        StringBuilder curr = new StringBuilder();\n        int k = 0;\n        for (char c : s.toCharArray()) {\n            if (Character.isDigit(c)) {\n                k = k * 10 + (c - \'0\');\n            } else if (c == \'[\') {\n                countStack.push(k);\n                stringStack.push(curr);\n                curr = new StringBuilder();\n                k = 0;\n            } else if (c == \']\') {\n                StringBuilder decoded = stringStack.pop();\n                int count = countStack.pop();\n                for (int i = 0; i < count; i++) decoded.append(curr);\n                curr = decoded;\n            } else {\n                curr.append(c);\n            }\n        }\n        return curr.toString();\n    }\n}',
        examples: [{ input: 's = "3[a]2[bc]"', output: '"aaabcbc"' }],
        testCases: [{ input: '3[a]2[bc]', expectedOutput: 'aaabcbc', isHidden: false, points: 12 }],
        hints: ['Two stacks: count and string', 'Push on [', 'Pop and repeat on ]'],
        tags: ['String', 'Stack', 'Recursion']
      },
      {
        topicId: 'day-60',
        title: 'Asteroid Collision',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find state of asteroids after all collisions.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] asteroidCollision(int[] asteroids) { return new int[0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] asteroidCollision(int[] asteroids) {\n        Stack<Integer> stack = new Stack<>();\n        for (int a : asteroids) {\n            boolean alive = true;\n            while (alive && a < 0 && !stack.isEmpty() && stack.peek() > 0) {\n                alive = stack.peek() < -a;\n                if (stack.peek() <= -a) stack.pop();\n            }\n            if (alive) stack.push(a);\n        }\n        int[] result = new int[stack.size()];\n        for (int i = stack.size() - 1; i >= 0; i--) result[i] = stack.pop();\n        return result;\n    }\n}',
        examples: [{ input: 'asteroids = [5,10,-5]', output: '[5,10]' }],
        testCases: [{ input: '[5,10,-5]', expectedOutput: '[5,10]', isHidden: false, points: 12 }],
        hints: ['Collision: positive then negative', 'Larger survives', 'Equal: both explode'],
        tags: ['Array', 'Stack', 'Simulation']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 58-60 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays58to60();
