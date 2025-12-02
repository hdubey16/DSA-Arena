import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays43to45() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 43 - String Basics ====================
    const day43Topic = await Topic.findOneAndUpdate(
      { id: 'day-43' },
      {
        id: 'day-43',
        title: 'String Basics & Manipulation',
        description: 'Fundamental string operations and transformations.',
        week: 7,
        day: 43,
        difficulty: 'Easy',
        estimatedTime: 90,
        prerequisites: ['day-42'],
        compulsoryQuestion: 'Reverse String',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day43Topic.title}`);
    await Question.deleteMany({ topicId: 'day-43' });

    await Question.insertMany([
      {
        topicId: 'day-43',
        title: 'Reverse String',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 10,
        timeLimit: 15,
        description: 'Reverse string in-place with O(1) extra space.',
        starterCode: 'public class Solution {\n    public static void reverseString(char[] s) {}\n}',
        solution: 'public class Solution {\n    public static void reverseString(char[] s) {\n        int left = 0, right = s.length - 1;\n        while (left < right) {\n            char temp = s[left];\n            s[left] = s[right];\n            s[right] = temp;\n            left++;\n            right--;\n        }\n    }\n}',
        examples: [{ input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }],
        testCases: [
          { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]', isHidden: false, points: 5 }
        ],
        hints: ['Use two pointers', 'Swap left and right'],
        tags: ['Two Pointers', 'String']
      },
      {
        topicId: 'day-43',
        title: 'Reverse Words in a String',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Reverse order of words. Remove extra spaces.',
        starterCode: 'public class Solution {\n    public static String reverseWords(String s) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String reverseWords(String s) {\n        String[] words = s.trim().split("\\\\s+");\n        StringBuilder sb = new StringBuilder();\n        for (int i = words.length - 1; i >= 0; i--) {\n            sb.append(words[i]);\n            if (i > 0) sb.append(" ");\n        }\n        return sb.toString();\n    }\n}',
        examples: [{ input: 's = "the sky is blue"', output: '"blue is sky the"' }],
        testCases: [
          { input: 'the sky is blue', expectedOutput: 'blue is sky the', isHidden: false, points: 10 }
        ],
        hints: ['Split by spaces', 'Reverse array order', 'Join with single space'],
        tags: ['Two Pointers', 'String']
      },
      {
        topicId: 'day-43',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Check if t is anagram of s.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean isAnagram(String s, String t) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            count[s.charAt(i) - \'a\']++;\n            count[t.charAt(i) - \'a\']--;\n        }\n        for (int c : count) {\n            if (c != 0) return false;\n        }\n        return true;\n    }\n}',
        examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
        testCases: [
          { input: 'anagram\nnagaram', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Count character frequencies', 'Compare counts'],
        tags: ['Hash Table', 'String', 'Sorting']
      },
      {
        topicId: 'day-43',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Check if string is palindrome (alphanumeric only, ignore case).',
        starterCode: 'public class Solution {\n    public static boolean isPalindrome(String s) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean isPalindrome(String s) {\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n}',
        examples: [{ input: 's = "A man, a plan, a canal: Panama"', output: 'true' }],
        testCases: [
          { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Two pointers', 'Skip non-alphanumeric', 'Compare lowercase'],
        tags: ['Two Pointers', 'String']
      },
      {
        topicId: 'day-43',
        title: 'String Compression',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Compress string using counts. Modify in-place.',
        starterCode: 'public class Solution {\n    public static int compress(char[] chars) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int compress(char[] chars) {\n        int write = 0, i = 0;\n        while (i < chars.length) {\n            char curr = chars[i];\n            int count = 0;\n            while (i < chars.length && chars[i] == curr) {\n                i++;\n                count++;\n            }\n            chars[write++] = curr;\n            if (count > 1) {\n                for (char c : String.valueOf(count).toCharArray()) {\n                    chars[write++] = c;\n                }\n            }\n        }\n        return write;\n    }\n}',
        examples: [{ input: 'chars = ["a","a","b","b","c","c","c"]', output: '6' }],
        testCases: [
          { input: '["a","a","b","b","c","c","c"]', expectedOutput: '6', isHidden: false, points: 10 }
        ],
        hints: ['Use write pointer', 'Count consecutive', 'Write char then count'],
        tags: ['Two Pointers', 'String']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 44 - Palindrome Problems ====================
    const day44Topic = await Topic.findOneAndUpdate(
      { id: 'day-44' },
      {
        id: 'day-44',
        title: 'Palindrome Problems',
        description: 'Palindrome detection and substring finding.',
        week: 7,
        day: 44,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-43'],
        compulsoryQuestion: 'Longest Palindromic Substring',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day44Topic.title}`);
    await Question.deleteMany({ topicId: 'day-44' });

    await Question.insertMany([
      {
        topicId: 'day-44',
        title: 'Longest Palindromic Substring',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Find longest palindromic substring. Use expand around center.',
        starterCode: 'public class Solution {\n    public static String longestPalindrome(String s) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String longestPalindrome(String s) {\n        if (s == null || s.length() < 1) return "";\n        int start = 0, end = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int len1 = expandAroundCenter(s, i, i);\n            int len2 = expandAroundCenter(s, i, i + 1);\n            int len = Math.max(len1, len2);\n            if (len > end - start) {\n                start = i - (len - 1) / 2;\n                end = i + len / 2;\n            }\n        }\n        return s.substring(start, end + 1);\n    }\n    private static int expandAroundCenter(String s, int left, int right) {\n        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n}',
        examples: [{ input: 's = "babad"', output: '"bab"' }],
        testCases: [
          { input: 'babad', expectedOutput: 'bab', isHidden: false, points: 12 }
        ],
        hints: ['Expand around each center', 'Consider odd and even length', 'Track longest'],
        tags: ['String', 'Dynamic Programming']
      },
      {
        topicId: 'day-44',
        title: 'Palindromic Substrings',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Count total palindromic substrings.',
        starterCode: 'public class Solution {\n    public static int countSubstrings(String s) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int countSubstrings(String s) {\n        int count = 0;\n        for (int i = 0; i < s.length(); i++) {\n            count += expandAroundCenter(s, i, i);\n            count += expandAroundCenter(s, i, i + 1);\n        }\n        return count;\n    }\n    private static int expandAroundCenter(String s, int left, int right) {\n        int count = 0;\n        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n            count++;\n            left--;\n            right++;\n        }\n        return count;\n    }\n}',
        examples: [{ input: 's = "abc"', output: '3' }],
        testCases: [
          { input: 'abc', expectedOutput: '3', isHidden: false, points: 12 }
        ],
        hints: ['Expand from each center', 'Count expansions', 'Sum all palindromes'],
        tags: ['String', 'Dynamic Programming']
      },
      {
        topicId: 'day-44',
        title: 'Longest Common Prefix',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find longest common prefix string among array of strings.',
        starterCode: 'public class Solution {\n    public static String longestCommonPrefix(String[] strs) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String longestCommonPrefix(String[] strs) {\n        if (strs == null || strs.length == 0) return "";\n        String prefix = strs[0];\n        for (int i = 1; i < strs.length; i++) {\n            while (strs[i].indexOf(prefix) != 0) {\n                prefix = prefix.substring(0, prefix.length() - 1);\n                if (prefix.isEmpty()) return "";\n            }\n        }\n        return prefix;\n    }\n}',
        examples: [{ input: 'strs = ["flower","flow","flight"]', output: '"fl"' }],
        testCases: [
          { input: '["flower","flow","flight"]', expectedOutput: 'fl', isHidden: false, points: 8 }
        ],
        hints: ['Start with first string', 'Shorten until matches', 'Check indexOf == 0'],
        tags: ['String']
      },
      {
        topicId: 'day-44',
        title: 'Find the Difference',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 10,
        timeLimit: 15,
        description: 'Find added letter in t. String t is s with one letter added.',
        starterCode: 'public class Solution {\n    public static char findTheDifference(String s, String t) { return \' \'; }\n}',
        solution: 'public class Solution {\n    public static char findTheDifference(String s, String t) {\n        int charCode = 0;\n        for (char c : s.toCharArray()) charCode -= c;\n        for (char c : t.toCharArray()) charCode += c;\n        return (char) charCode;\n    }\n}',
        examples: [{ input: 's = "abcd", t = "abcde"', output: '\'e\'' }],
        testCases: [
          { input: 'abcd\nabcde', expectedOutput: 'e', isHidden: false, points: 5 }
        ],
        hints: ['XOR all characters', 'Or sum differences', 'Extra char remains'],
        tags: ['Hash Table', 'String', 'Bit Manipulation']
      },
      {
        topicId: 'day-44',
        title: 'First Unique Character in a String',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find first non-repeating character index.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int firstUniqChar(String s) { return -1; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int firstUniqChar(String s) {\n        Map<Character, Integer> count = new HashMap<>();\n        for (char c : s.toCharArray()) {\n            count.put(c, count.getOrDefault(c, 0) + 1);\n        }\n        for (int i = 0; i < s.length(); i++) {\n            if (count.get(s.charAt(i)) == 1) return i;\n        }\n        return -1;\n    }\n}',
        examples: [{ input: 's = "leetcode"', output: '0' }],
        testCases: [
          { input: 'leetcode', expectedOutput: '0', isHidden: false, points: 8 }
        ],
        hints: ['Count frequencies', 'Find first with count 1'],
        tags: ['Hash Table', 'String', 'Queue']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 45 - Permutation & Advanced String ====================
    const day45Topic = await Topic.findOneAndUpdate(
      { id: 'day-45' },
      {
        id: 'day-45',
        title: 'Permutations & String Algorithms',
        description: 'Next permutation, custom sorting, parsing.',
        week: 7,
        day: 45,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-44'],
        compulsoryQuestion: 'Next Permutation',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day45Topic.title}`);
    await Question.deleteMany({ topicId: 'day-45' });

    await Question.insertMany([
      {
        topicId: 'day-45',
        title: 'Next Permutation',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Find next lexicographic permutation. Rearrange in-place.',
        starterCode: 'public class Solution {\n    public static void nextPermutation(int[] nums) {}\n}',
        solution: 'public class Solution {\n    public static void nextPermutation(int[] nums) {\n        int i = nums.length - 2;\n        while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n        if (i >= 0) {\n            int j = nums.length - 1;\n            while (nums[j] <= nums[i]) j--;\n            swap(nums, i, j);\n        }\n        reverse(nums, i + 1);\n    }\n    private static void swap(int[] nums, int i, int j) {\n        int temp = nums[i];\n        nums[i] = nums[j];\n        nums[j] = temp;\n    }\n    private static void reverse(int[] nums, int start) {\n        int end = nums.length - 1;\n        while (start < end) {\n            swap(nums, start++, end--);\n        }\n    }\n}',
        examples: [{ input: 'nums = [1,2,3]', output: '[1,3,2]' }],
        testCases: [
          { input: '[1,2,3]', expectedOutput: '[1,3,2]', isHidden: false, points: 12 }
        ],
        hints: ['Find rightmost ascending pair', 'Swap with next larger', 'Reverse suffix'],
        tags: ['Array', 'Two Pointers']
      },
      {
        topicId: 'day-45',
        title: 'Permutation Sequence',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Find kth permutation of [1,2,...,n]. Use factorial number system.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String getPermutation(int n, int k) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String getPermutation(int n, int k) {\n        int[] factorial = new int[n];\n        List<Integer> numbers = new ArrayList<>();\n        factorial[0] = 1;\n        for (int i = 1; i < n; i++) {\n            factorial[i] = factorial[i - 1] * i;\n            numbers.add(i);\n        }\n        numbers.add(n);\n        k--;\n        StringBuilder sb = new StringBuilder();\n        for (int i = n - 1; i >= 0; i--) {\n            int index = k / factorial[i];\n            sb.append(numbers.get(index));\n            numbers.remove(index);\n            k %= factorial[i];\n        }\n        return sb.toString();\n    }\n}',
        examples: [{ input: 'n = 3, k = 3', output: '"213"' }],
        testCases: [
          { input: '3\n3', expectedOutput: '213', isHidden: false, points: 15 }
        ],
        hints: ['Use factorial to find digit', 'k / factorial[i] gives index', 'Remove used number'],
        tags: ['Math', 'Recursion']
      },
      {
        topicId: 'day-45',
        title: 'Custom Sort String',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Sort string s according to order in order string.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String customSortString(String order, String s) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String customSortString(String order, String s) {\n        Map<Character, Integer> count = new HashMap<>();\n        for (char c : s.toCharArray()) {\n            count.put(c, count.getOrDefault(c, 0) + 1);\n        }\n        StringBuilder sb = new StringBuilder();\n        for (char c : order.toCharArray()) {\n            if (count.containsKey(c)) {\n                int freq = count.get(c);\n                for (int i = 0; i < freq; i++) sb.append(c);\n                count.remove(c);\n            }\n        }\n        for (char c : count.keySet()) {\n            int freq = count.get(c);\n            for (int i = 0; i < freq; i++) sb.append(c);\n        }\n        return sb.toString();\n    }\n}',
        examples: [{ input: 'order = "cba", s = "abcd"', output: '"cbad"' }],
        testCases: [
          { input: 'cba\nabcd', expectedOutput: 'cbad', isHidden: false, points: 10 }
        ],
        hints: ['Count frequencies', 'Append in order', 'Append remaining'],
        tags: ['Hash Table', 'String', 'Sorting']
      },
      {
        topicId: 'day-45',
        title: 'Is Subsequence',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Check if s is subsequence of t.',
        starterCode: 'public class Solution {\n    public static boolean isSubsequence(String s, String t) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean isSubsequence(String s, String t) {\n        int i = 0, j = 0;\n        while (i < s.length() && j < t.length()) {\n            if (s.charAt(i) == t.charAt(j)) i++;\n            j++;\n        }\n        return i == s.length();\n    }\n}',
        examples: [{ input: 's = "abc", t = "ahbgdc"', output: 'true' }],
        testCases: [
          { input: 'abc\nahbgdc', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Two pointers', 'Match chars greedily', 'Check if i reached end'],
        tags: ['Two Pointers', 'String']
      },
      {
        topicId: 'day-45',
        title: 'String to Integer (atoi)',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Implement atoi. Handle whitespace, sign, overflow.',
        starterCode: 'public class Solution {\n    public static int myAtoi(String s) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int myAtoi(String s) {\n        int i = 0, n = s.length();\n        while (i < n && s.charAt(i) == \' \') i++;\n        if (i == n) return 0;\n        int sign = 1;\n        if (s.charAt(i) == \'+\' || s.charAt(i) == \'-\') {\n            sign = s.charAt(i) == \'-\' ? -1 : 1;\n            i++;\n        }\n        long result = 0;\n        while (i < n && Character.isDigit(s.charAt(i))) {\n            result = result * 10 + (s.charAt(i) - \'0\');\n            if (result * sign > Integer.MAX_VALUE) return Integer.MAX_VALUE;\n            if (result * sign < Integer.MIN_VALUE) return Integer.MIN_VALUE;\n            i++;\n        }\n        return (int) (result * sign);\n    }\n}',
        examples: [{ input: 's = "42"', output: '42' }],
        testCases: [
          { input: '42', expectedOutput: '42', isHidden: false, points: 12 }
        ],
        hints: ['Skip whitespace', 'Check sign', 'Handle overflow with long'],
        tags: ['String']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 43-45 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays43to45();
