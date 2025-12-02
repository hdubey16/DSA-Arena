import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays46to48() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 46 - Pattern Searching Basics ====================
    const day46Topic = await Topic.findOneAndUpdate(
      { id: 'day-46' },
      {
        id: 'day-46',
        title: 'Pattern Searching: Naive Approach',
        description: 'String pattern matching fundamentals.',
        week: 7,
        day: 46,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-45'],
        compulsoryQuestion: 'Implement strStr()',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day46Topic.title}`);
    await Question.deleteMany({ topicId: 'day-46' });

    await Question.insertMany([
      {
        topicId: 'day-46',
        title: 'Implement strStr()',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Return index of first occurrence of needle in haystack. Use naive pattern matching.',
        starterCode: 'public class Solution {\n    public static int strStr(String haystack, String needle) { return -1; }\n}',
        solution: 'public class Solution {\n    public static int strStr(String haystack, String needle) {\n        if (needle.isEmpty()) return 0;\n        int n = haystack.length(), m = needle.length();\n        for (int i = 0; i <= n - m; i++) {\n            int j = 0;\n            while (j < m && haystack.charAt(i + j) == needle.charAt(j)) {\n                j++;\n            }\n            if (j == m) return i;\n        }\n        return -1;\n    }\n}',
        examples: [{ input: 'haystack = "sadbutsad", needle = "sad"', output: '0' }],
        testCases: [
          { input: 'sadbutsad\nsad', expectedOutput: '0', isHidden: false, points: 10 }
        ],
        hints: ['Check each position', 'Match characters one by one', 'Return i when full match'],
        tags: ['Two Pointers', 'String']
      },
      {
        topicId: 'day-46',
        title: 'Repeated Substring Pattern',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Check if string can be constructed by repeating substring.',
        starterCode: 'public class Solution {\n    public static boolean repeatedSubstringPattern(String s) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean repeatedSubstringPattern(String s) {\n        String doubled = s + s;\n        String sub = doubled.substring(1, doubled.length() - 1);\n        return sub.contains(s);\n    }\n}',
        examples: [{ input: 's = "abab"', output: 'true' }],
        testCases: [
          { input: 'abab', expectedOutput: 'true', isHidden: false, points: 10 }
        ],
        hints: ['Try (s+s).substring(1, 2n-1)', 'Check if s is in it', 'Or check all divisor lengths'],
        tags: ['String', 'String Matching']
      },
      {
        topicId: 'day-46',
        title: 'Rotate String',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Check if goal is rotation of s.',
        starterCode: 'public class Solution {\n    public static boolean rotateString(String s, String goal) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean rotateString(String s, String goal) {\n        return s.length() == goal.length() && (s + s).contains(goal);\n    }\n}',
        examples: [{ input: 's = "abcde", goal = "cdeab"', output: 'true' }],
        testCases: [
          { input: 'abcde\ncdeab', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['All rotations in s+s', 'Check if goal is substring'],
        tags: ['String', 'String Matching']
      },
      {
        topicId: 'day-46',
        title: 'Find All Anagrams in a String',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find all start indices of anagrams of p in s. Use sliding window.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> findAnagrams(String s, String p) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> findAnagrams(String s, String p) {\n        List<Integer> result = new ArrayList<>();\n        if (s.length() < p.length()) return result;\n        int[] pCount = new int[26];\n        int[] sCount = new int[26];\n        for (char c : p.toCharArray()) pCount[c - \'a\']++;\n        for (int i = 0; i < s.length(); i++) {\n            sCount[s.charAt(i) - \'a\']++;\n            if (i >= p.length()) {\n                sCount[s.charAt(i - p.length()) - \'a\']--;\n            }\n            if (Arrays.equals(pCount, sCount)) {\n                result.add(i - p.length() + 1);\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 's = "cbaebabacd", p = "abc"', output: '[0,6]' }],
        testCases: [
          { input: 'cbaebabacd\nabc', expectedOutput: '[0,6]', isHidden: false, points: 12 }
        ],
        hints: ['Sliding window size = p.length', 'Compare frequency arrays', 'Add start index when match'],
        tags: ['Hash Table', 'String', 'Sliding Window']
      },
      {
        topicId: 'day-46',
        title: 'Count and Say',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Generate nth term of count-and-say sequence.',
        starterCode: 'public class Solution {\n    public static String countAndSay(int n) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String countAndSay(int n) {\n        String result = "1";\n        for (int i = 1; i < n; i++) {\n            StringBuilder sb = new StringBuilder();\n            int j = 0;\n            while (j < result.length()) {\n                char curr = result.charAt(j);\n                int count = 0;\n                while (j < result.length() && result.charAt(j) == curr) {\n                    count++;\n                    j++;\n                }\n                sb.append(count).append(curr);\n            }\n            result = sb.toString();\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'n = 4', output: '"1211"' }],
        testCases: [
          { input: '4', expectedOutput: '1211', isHidden: false, points: 10 }
        ],
        hints: ['Start with "1"', 'Count consecutive digits', 'Build next string'],
        tags: ['String']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 47 - Rabin-Karp Algorithm ====================
    const day47Topic = await Topic.findOneAndUpdate(
      { id: 'day-47' },
      {
        id: 'day-47',
        title: 'Rabin-Karp Algorithm (Rolling Hash)',
        description: 'Pattern matching using rolling hash technique.',
        week: 7,
        day: 47,
        difficulty: 'Hard',
        estimatedTime: 180,
        prerequisites: ['day-46'],
        compulsoryQuestion: 'Repeated DNA Sequences',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day47Topic.title}`);
    await Question.deleteMany({ topicId: 'day-47' });

    await Question.insertMany([
      {
        topicId: 'day-47',
        title: 'Repeated DNA Sequences',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Find all 10-letter sequences that occur more than once. Use rolling hash.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<String> findRepeatedDnaSequences(String s) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<String> findRepeatedDnaSequences(String s) {\n        Set<String> seen = new HashSet<>();\n        Set<String> result = new HashSet<>();\n        for (int i = 0; i <= s.length() - 10; i++) {\n            String seq = s.substring(i, i + 10);\n            if (seen.contains(seq)) {\n                result.add(seq);\n            } else {\n                seen.add(seq);\n            }\n        }\n        return new ArrayList<>(result);\n    }\n}',
        examples: [{ input: 's = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"', output: '["AAAAACCCCC","CCCCCAAAAA"]' }],
        testCases: [
          { input: 'AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT', expectedOutput: '["AAAAACCCCC","CCCCCAAAAA"]', isHidden: false, points: 12 }
        ],
        hints: ['Use HashSet for seen', 'Sliding window of 10', 'Add to result if seen before'],
        tags: ['Hash Table', 'String', 'Bit Manipulation', 'Rolling Hash']
      },
      {
        topicId: 'day-47',
        title: 'Longest Duplicate Substring',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Find longest duplicate substring. Use binary search + rolling hash.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String longestDupSubstring(String s) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    private static final long MOD = (long) 1e9 + 7;\n    private static final int BASE = 26;\n    public static String longestDupSubstring(String s) {\n        int left = 1, right = s.length();\n        String result = "";\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            String dup = search(s, mid);\n            if (dup != null) {\n                result = dup;\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return result;\n    }\n    private static String search(String s, int len) {\n        long hash = 0, pow = 1;\n        for (int i = 0; i < len; i++) {\n            hash = (hash * BASE + (s.charAt(i) - \'a\')) % MOD;\n            if (i < len - 1) pow = (pow * BASE) % MOD;\n        }\n        Set<Long> seen = new HashSet<>();\n        seen.add(hash);\n        for (int i = len; i < s.length(); i++) {\n            hash = (hash - (s.charAt(i - len) - \'a\') * pow % MOD + MOD) % MOD;\n            hash = (hash * BASE + (s.charAt(i) - \'a\')) % MOD;\n            if (seen.contains(hash)) {\n                return s.substring(i - len + 1, i + 1);\n            }\n            seen.add(hash);\n        }\n        return null;\n    }\n}',
        examples: [{ input: 's = "banana"', output: '"ana"' }],
        testCases: [
          { input: 'banana', expectedOutput: 'ana', isHidden: false, points: 18 }
        ],
        hints: ['Binary search on length', 'Rolling hash for each length', 'Check if hash seen before'],
        tags: ['String', 'Binary Search', 'Rolling Hash', 'Suffix Array']
      },
      {
        topicId: 'day-47',
        title: 'Implement strStr() with Rabin-Karp',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Implement strStr using Rabin-Karp rolling hash algorithm.',
        starterCode: 'public class Solution {\n    public static int strStr(String haystack, String needle) { return -1; }\n}',
        solution: 'public class Solution {\n    private static final int BASE = 256;\n    private static final int MOD = 101;\n    public static int strStr(String haystack, String needle) {\n        if (needle.isEmpty()) return 0;\n        int n = haystack.length(), m = needle.length();\n        if (n < m) return -1;\n        long needleHash = 0, windowHash = 0, pow = 1;\n        for (int i = 0; i < m - 1; i++) {\n            pow = (pow * BASE) % MOD;\n        }\n        for (int i = 0; i < m; i++) {\n            needleHash = (needleHash * BASE + needle.charAt(i)) % MOD;\n            windowHash = (windowHash * BASE + haystack.charAt(i)) % MOD;\n        }\n        for (int i = 0; i <= n - m; i++) {\n            if (windowHash == needleHash) {\n                int j = 0;\n                while (j < m && haystack.charAt(i + j) == needle.charAt(j)) j++;\n                if (j == m) return i;\n            }\n            if (i < n - m) {\n                windowHash = (windowHash - haystack.charAt(i) * pow % MOD + MOD) % MOD;\n                windowHash = (windowHash * BASE + haystack.charAt(i + m)) % MOD;\n            }\n        }\n        return -1;\n    }\n}',
        examples: [{ input: 'haystack = "sadbutsad", needle = "sad"', output: '0' }],
        testCases: [
          { input: 'sadbutsad\nsad', expectedOutput: '0', isHidden: false, points: 15 }
        ],
        hints: ['Calculate needle hash', 'Rolling hash for window', 'Verify on hash match'],
        tags: ['String', 'Rolling Hash']
      },
      {
        topicId: 'day-47',
        title: 'Shortest Palindrome',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Find shortest palindrome by adding characters in front. Use rolling hash.',
        starterCode: 'public class Solution {\n    public static String shortestPalindrome(String s) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String shortestPalindrome(String s) {\n        String rev = new StringBuilder(s).reverse().toString();\n        String combined = s + "#" + rev;\n        int[] lps = buildLPS(combined);\n        int palindromeLen = lps[combined.length() - 1];\n        String toAdd = rev.substring(0, s.length() - palindromeLen);\n        return toAdd + s;\n    }\n    private static int[] buildLPS(String s) {\n        int[] lps = new int[s.length()];\n        int len = 0, i = 1;\n        while (i < s.length()) {\n            if (s.charAt(i) == s.charAt(len)) {\n                lps[i++] = ++len;\n            } else if (len > 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i++] = 0;\n            }\n        }\n        return lps;\n    }\n}',
        examples: [{ input: 's = "aacecaaa"', output: '"aaacecaaa"' }],
        testCases: [
          { input: 'aacecaaa', expectedOutput: 'aaacecaaa', isHidden: false, points: 18 }
        ],
        hints: ['Find longest palindrome prefix', 'Use KMP LPS array', 'Prepend remaining reversed'],
        tags: ['String', 'Rolling Hash', 'KMP']
      },
      {
        topicId: 'day-47',
        title: 'Distinct Echo Substrings',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Count distinct echo substrings (substring repeated twice). Use rolling hash.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int distinctEchoSubstrings(String text) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    private static final long MOD = (long) 1e9 + 7;\n    private static final int BASE = 26;\n    public static int distinctEchoSubstrings(String text) {\n        Set<Long> seen = new HashSet<>();\n        int n = text.length();\n        for (int len = 1; len <= n / 2; len++) {\n            long hash1 = 0, hash2 = 0, pow = 1;\n            for (int i = 0; i < len; i++) {\n                hash1 = (hash1 * BASE + (text.charAt(i) - \'a\')) % MOD;\n                hash2 = (hash2 * BASE + (text.charAt(i + len) - \'a\')) % MOD;\n                if (i < len - 1) pow = (pow * BASE) % MOD;\n            }\n            if (hash1 == hash2) seen.add(hash1);\n            for (int i = 1; i + 2 * len <= n; i++) {\n                hash1 = (hash1 - (text.charAt(i - 1) - \'a\') * pow % MOD + MOD) % MOD;\n                hash1 = (hash1 * BASE + (text.charAt(i + len - 1) - \'a\')) % MOD;\n                hash2 = (hash2 - (text.charAt(i + len - 1) - \'a\') * pow % MOD + MOD) % MOD;\n                hash2 = (hash2 * BASE + (text.charAt(i + 2 * len - 1) - \'a\')) % MOD;\n                if (hash1 == hash2) seen.add(hash1);\n            }\n        }\n        return seen.size();\n    }\n}',
        examples: [{ input: 'text = "abcabcabc"', output: '3' }],
        testCases: [
          { input: 'abcabcabc', expectedOutput: '3', isHidden: false, points: 18 }
        ],
        hints: ['Try all lengths', 'Rolling hash for two windows', 'Compare adjacent windows'],
        tags: ['String', 'Rolling Hash']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 48 - KMP Algorithm ====================
    const day48Topic = await Topic.findOneAndUpdate(
      { id: 'day-48' },
      {
        id: 'day-48',
        title: 'KMP Algorithm (Knuth-Morris-Pratt)',
        description: 'Efficient pattern matching with failure function.',
        week: 7,
        day: 48,
        difficulty: 'Hard',
        estimatedTime: 180,
        prerequisites: ['day-47'],
        compulsoryQuestion: 'Implement strStr() with KMP',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day48Topic.title}`);
    await Question.deleteMany({ topicId: 'day-48' });

    await Question.insertMany([
      {
        topicId: 'day-48',
        title: 'Implement strStr() with KMP',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: true,
        points: 35,
        timeLimit: 40,
        description: 'Implement strStr using KMP algorithm with LPS array.',
        starterCode: 'public class Solution {\n    public static int strStr(String haystack, String needle) { return -1; }\n}',
        solution: 'public class Solution {\n    public static int strStr(String haystack, String needle) {\n        if (needle.isEmpty()) return 0;\n        int[] lps = buildLPS(needle);\n        int i = 0, j = 0;\n        while (i < haystack.length()) {\n            if (haystack.charAt(i) == needle.charAt(j)) {\n                i++;\n                j++;\n                if (j == needle.length()) return i - j;\n            } else if (j > 0) {\n                j = lps[j - 1];\n            } else {\n                i++;\n            }\n        }\n        return -1;\n    }\n    private static int[] buildLPS(String pattern) {\n        int[] lps = new int[pattern.length()];\n        int len = 0, i = 1;\n        while (i < pattern.length()) {\n            if (pattern.charAt(i) == pattern.charAt(len)) {\n                lps[i++] = ++len;\n            } else if (len > 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i++] = 0;\n            }\n        }\n        return lps;\n    }\n}',
        examples: [{ input: 'haystack = "sadbutsad", needle = "sad"', output: '0' }],
        testCases: [
          { input: 'sadbutsad\nsad', expectedOutput: '0', isHidden: false, points: 18 }
        ],
        hints: ['Build LPS array for needle', 'Use LPS to avoid backtracking', 'O(n+m) time complexity'],
        tags: ['String', 'String Matching', 'KMP']
      },
      {
        topicId: 'day-48',
        title: 'Shortest Palindrome with KMP',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Find shortest palindrome using KMP LPS array technique.',
        starterCode: 'public class Solution {\n    public static String shortestPalindrome(String s) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String shortestPalindrome(String s) {\n        String rev = new StringBuilder(s).reverse().toString();\n        String combined = s + "#" + rev;\n        int[] lps = buildLPS(combined);\n        int palindromeLen = lps[combined.length() - 1];\n        String toAdd = rev.substring(0, s.length() - palindromeLen);\n        return toAdd + s;\n    }\n    private static int[] buildLPS(String s) {\n        int[] lps = new int[s.length()];\n        int len = 0, i = 1;\n        while (i < s.length()) {\n            if (s.charAt(i) == s.charAt(len)) {\n                lps[i++] = ++len;\n            } else if (len > 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i++] = 0;\n            }\n        }\n        return lps;\n    }\n}',
        examples: [{ input: 's = "aacecaaa"', output: '"aaacecaaa"' }],
        testCases: [
          { input: 'aacecaaa', expectedOutput: 'aaacecaaa', isHidden: false, points: 18 }
        ],
        hints: ['Combine s + # + reverse(s)', 'Build LPS array', 'LPS[end] = longest palindrome prefix'],
        tags: ['String', 'KMP']
      },
      {
        topicId: 'day-48',
        title: 'Longest Happy Prefix',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Find longest proper prefix that is also suffix. Use KMP LPS.',
        starterCode: 'public class Solution {\n    public static String longestPrefix(String s) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String longestPrefix(String s) {\n        int[] lps = buildLPS(s);\n        int len = lps[s.length() - 1];\n        return s.substring(0, len);\n    }\n    private static int[] buildLPS(String s) {\n        int[] lps = new int[s.length()];\n        int len = 0, i = 1;\n        while (i < s.length()) {\n            if (s.charAt(i) == s.charAt(len)) {\n                lps[i++] = ++len;\n            } else if (len > 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i++] = 0;\n            }\n        }\n        return lps;\n    }\n}',
        examples: [{ input: 's = "level"', output: '"l"' }],
        testCases: [
          { input: 'level', expectedOutput: 'l', isHidden: false, points: 15 }
        ],
        hints: ['Build LPS array', 'Last value is answer', 'LPS[n-1] = longest proper prefix'],
        tags: ['String', 'KMP']
      },
      {
        topicId: 'day-48',
        title: 'Repeated Substring Pattern with KMP',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Check if string can be repeated substring using KMP property.',
        starterCode: 'public class Solution {\n    public static boolean repeatedSubstringPattern(String s) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean repeatedSubstringPattern(String s) {\n        int[] lps = buildLPS(s);\n        int n = s.length();\n        int len = lps[n - 1];\n        return len > 0 && n % (n - len) == 0;\n    }\n    private static int[] buildLPS(String s) {\n        int[] lps = new int[s.length()];\n        int len = 0, i = 1;\n        while (i < s.length()) {\n            if (s.charAt(i) == s.charAt(len)) {\n                lps[i++] = ++len;\n            } else if (len > 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i++] = 0;\n            }\n        }\n        return lps;\n    }\n}',
        examples: [{ input: 's = "abab"', output: 'true' }],
        testCases: [
          { input: 'abab', expectedOutput: 'true', isHidden: false, points: 12 }
        ],
        hints: ['Build LPS array', 'Check if n % (n - lps[n-1]) == 0', 'Period = n - lps[n-1]'],
        tags: ['String', 'KMP']
      },
      {
        topicId: 'day-48',
        title: 'Find the Index of the First Occurrence with KMP',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Return index of first occurrence using KMP. Same as strStr with KMP.',
        starterCode: 'public class Solution {\n    public static int strStr(String haystack, String needle) { return -1; }\n}',
        solution: 'public class Solution {\n    public static int strStr(String haystack, String needle) {\n        if (needle.isEmpty()) return 0;\n        int[] lps = buildLPS(needle);\n        int i = 0, j = 0;\n        while (i < haystack.length()) {\n            if (haystack.charAt(i) == needle.charAt(j)) {\n                i++;\n                j++;\n                if (j == needle.length()) return i - j;\n            } else if (j > 0) {\n                j = lps[j - 1];\n            } else {\n                i++;\n            }\n        }\n        return -1;\n    }\n    private static int[] buildLPS(String pattern) {\n        int[] lps = new int[pattern.length()];\n        int len = 0, i = 1;\n        while (i < pattern.length()) {\n            if (pattern.charAt(i) == pattern.charAt(len)) {\n                lps[i++] = ++len;\n            } else if (len > 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i++] = 0;\n            }\n        }\n        return lps;\n    }\n}',
        examples: [{ input: 'haystack = "sadbutsad", needle = "sad"', output: '0' }],
        testCases: [
          { input: 'sadbutsad\nsad', expectedOutput: '0', isHidden: false, points: 15 }
        ],
        hints: ['Build LPS for needle', 'Match with haystack', 'Use LPS on mismatch'],
        tags: ['String', 'KMP']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 46-48 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays46to48();
