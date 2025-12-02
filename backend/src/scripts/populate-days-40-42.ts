import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays40to42() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 40 - Prefix Sum + Hashing ====================
    const day40Topic = await Topic.findOneAndUpdate(
      { id: 'day-40' },
      {
        id: 'day-40',
        title: 'Prefix Sum + Hashing',
        description: 'Subarray sum problems using prefix sum and HashMap.',
        week: 6,
        day: 40,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-39'],
        compulsoryQuestion: 'Subarray Sum Equals K',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day40Topic.title}`);
    await Question.deleteMany({ topicId: 'day-40' });

    await Question.insertMany([
      {
        topicId: 'day-40',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Count subarrays with sum equal to k. Use prefix sum with HashMap.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int subarraySum(int[] nums, int k) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int subarraySum(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, 1);\n        int sum = 0, count = 0;\n        for (int num : nums) {\n            sum += num;\n            if (map.containsKey(sum - k)) {\n                count += map.get(sum - k);\n            }\n            map.put(sum, map.getOrDefault(sum, 0) + 1);\n        }\n        return count;\n    }\n}',
        examples: [{ input: 'nums = [1,1,1], k = 2', output: '2' }],
        testCases: [
          { input: '[1,1,1]\n2', expectedOutput: '2', isHidden: false, points: 12 }
        ],
        hints: ['Use prefix sum', 'Map stores sum → frequency', 'Check if (sum - k) exists'],
        tags: ['Array', 'Hash Table', 'Prefix Sum']
      },
      {
        topicId: 'day-40',
        title: 'Continuous Subarray Sum',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Check if array has subarray of size >= 2 with sum multiple of k.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean checkSubarraySum(int[] nums, int k) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean checkSubarraySum(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, -1);\n        int sum = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n            int mod = sum % k;\n            if (map.containsKey(mod)) {\n                if (i - map.get(mod) >= 2) return true;\n            } else {\n                map.put(mod, i);\n            }\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'nums = [23,2,4,6,7], k = 6', output: 'true' }],
        testCases: [
          { input: '[23,2,4,6,7]\n6', expectedOutput: 'true', isHidden: false, points: 12 }
        ],
        hints: ['Use modulo of prefix sum', 'Store mod → index', 'Check if distance >= 2'],
        tags: ['Array', 'Hash Table', 'Prefix Sum']
      },
      {
        topicId: 'day-40',
        title: 'Contiguous Array',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find maximum length subarray with equal 0s and 1s. Treat 0 as -1.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int findMaxLength(int[] nums) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int findMaxLength(int[] nums) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, -1);\n        int sum = 0, maxLen = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i] == 1 ? 1 : -1;\n            if (map.containsKey(sum)) {\n                maxLen = Math.max(maxLen, i - map.get(sum));\n            } else {\n                map.put(sum, i);\n            }\n        }\n        return maxLen;\n    }\n}',
        examples: [{ input: 'nums = [0,1]', output: '2' }],
        testCases: [
          { input: '[0,1]', expectedOutput: '2', isHidden: false, points: 12 }
        ],
        hints: ['Convert 0 to -1', 'Equal 0s and 1s means sum = 0', 'Store sum → first index'],
        tags: ['Array', 'Hash Table', 'Prefix Sum']
      },
      {
        topicId: 'day-40',
        title: 'Subarray Sums Divisible by K',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Count subarrays with sum divisible by k.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int subarraysDivByK(int[] nums, int k) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int subarraysDivByK(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, 1);\n        int sum = 0, count = 0;\n        for (int num : nums) {\n            sum += num;\n            int mod = sum % k;\n            if (mod < 0) mod += k;\n            count += map.getOrDefault(mod, 0);\n            map.put(mod, map.getOrDefault(mod, 0) + 1);\n        }\n        return count;\n    }\n}',
        examples: [{ input: 'nums = [4,5,0,-2,-3,1], k = 5', output: '7' }],
        testCases: [
          { input: '[4,5,0,-2,-3,1]\n5', expectedOutput: '7', isHidden: false, points: 12 }
        ],
        hints: ['Use modulo of prefix sum', 'Handle negative mod: mod + k', 'Count same remainders'],
        tags: ['Array', 'Hash Table', 'Prefix Sum']
      },
      {
        topicId: 'day-40',
        title: 'Make Sum Divisible by P',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Return smallest subarray length to remove so remaining sum divisible by p.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int minSubarray(int[] nums, int p) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int minSubarray(int[] nums, int p) {\n        long totalSum = 0;\n        for (int num : nums) totalSum += num;\n        int target = (int)(totalSum % p);\n        if (target == 0) return 0;\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, -1);\n        long sum = 0;\n        int minLen = nums.length;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n            int mod = (int)(sum % p);\n            int need = (mod - target + p) % p;\n            if (map.containsKey(need)) {\n                minLen = Math.min(minLen, i - map.get(need));\n            }\n            map.put(mod, i);\n        }\n        return minLen == nums.length ? -1 : minLen;\n    }\n}',
        examples: [{ input: 'nums = [3,1,4,2], p = 6', output: '1' }],
        testCases: [
          { input: '[3,1,4,2]\n6', expectedOutput: '1', isHidden: false, points: 15 }
        ],
        hints: ['Find total % p = target', 'Find subarray with sum % p = target', 'Use prefix sum modulo'],
        tags: ['Array', 'Hash Table', 'Prefix Sum']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 41 - Longest Subarray Problems ====================
    const day41Topic = await Topic.findOneAndUpdate(
      { id: 'day-41' },
      {
        id: 'day-41',
        title: 'Longest Subarray Problems',
        description: 'Sliding window + HashMap for longest subarray patterns.',
        week: 6,
        day: 41,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-40'],
        compulsoryQuestion: 'Longest Substring Without Repeating Characters',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day41Topic.title}`);
    await Question.deleteMany({ topicId: 'day-41' });

    await Question.insertMany([
      {
        topicId: 'day-41',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Find length of longest substring without repeating characters.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int lengthOfLongestSubstring(String s) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        int maxLen = 0, left = 0;\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (map.containsKey(c)) {\n                left = Math.max(left, map.get(c) + 1);\n            }\n            map.put(c, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}',
        examples: [{ input: 's = "abcabcbb"', output: '3' }],
        testCases: [
          { input: 'abcabcbb', expectedOutput: '3', isHidden: false, points: 12 }
        ],
        hints: ['Use sliding window', 'Map stores char → last index', 'Move left when duplicate found'],
        tags: ['Hash Table', 'String', 'Sliding Window']
      },
      {
        topicId: 'day-41',
        title: 'Longest Palindrome',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find length of longest palindrome that can be built from string.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int longestPalindrome(String s) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int longestPalindrome(String s) {\n        Set<Character> set = new HashSet<>();\n        int length = 0;\n        for (char c : s.toCharArray()) {\n            if (set.contains(c)) {\n                length += 2;\n                set.remove(c);\n            } else {\n                set.add(c);\n            }\n        }\n        if (!set.isEmpty()) length++;\n        return length;\n    }\n}',
        examples: [{ input: 's = "abccccdd"', output: '7' }],
        testCases: [
          { input: 'abccccdd', expectedOutput: '7', isHidden: false, points: 8 }
        ],
        hints: ['Count pairs of characters', 'Add 1 if odd character exists'],
        tags: ['Hash Table', 'String', 'Greedy']
      },
      {
        topicId: 'day-41',
        title: 'Maximum Size Subarray Sum Equals k',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find maximum length subarray with sum equal to k.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int maxSubArrayLen(int[] nums, int k) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int maxSubArrayLen(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, -1);\n        int sum = 0, maxLen = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n            if (map.containsKey(sum - k)) {\n                maxLen = Math.max(maxLen, i - map.get(sum - k));\n            }\n            if (!map.containsKey(sum)) {\n                map.put(sum, i);\n            }\n        }\n        return maxLen;\n    }\n}',
        examples: [{ input: 'nums = [1,-1,5,-2,3], k = 3', output: '4' }],
        testCases: [
          { input: '[1,-1,5,-2,3]\n3', expectedOutput: '4', isHidden: false, points: 12 }
        ],
        hints: ['Use prefix sum', 'Store first occurrence of each sum', 'Check sum - k'],
        tags: ['Array', 'Hash Table', 'Prefix Sum']
      },
      {
        topicId: 'day-41',
        title: 'Minimum Window Substring',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Find minimum window in s that contains all characters of t.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String minWindow(String s, String t) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String minWindow(String s, String t) {\n        if (s.length() < t.length()) return "";\n        Map<Character, Integer> need = new HashMap<>();\n        Map<Character, Integer> have = new HashMap<>();\n        for (char c : t.toCharArray()) {\n            need.put(c, need.getOrDefault(c, 0) + 1);\n        }\n        int left = 0, minLen = Integer.MAX_VALUE, minStart = 0;\n        int formed = 0, required = need.size();\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            have.put(c, have.getOrDefault(c, 0) + 1);\n            if (need.containsKey(c) && have.get(c).intValue() == need.get(c).intValue()) {\n                formed++;\n            }\n            while (formed == required && left <= right) {\n                if (right - left + 1 < minLen) {\n                    minLen = right - left + 1;\n                    minStart = left;\n                }\n                char leftChar = s.charAt(left);\n                have.put(leftChar, have.get(leftChar) - 1);\n                if (need.containsKey(leftChar) && have.get(leftChar) < need.get(leftChar)) {\n                    formed--;\n                }\n                left++;\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);\n    }\n}',
        examples: [{ input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' }],
        testCases: [
          { input: 'ADOBECODEBANC\nABC', expectedOutput: 'BANC', isHidden: false, points: 18 }
        ],
        hints: ['Two maps: need and have', 'Expand right, contract left', 'Track formed count'],
        tags: ['Hash Table', 'String', 'Sliding Window']
      },
      {
        topicId: 'day-41',
        title: 'Longest Substring with At Most K Distinct Characters',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find longest substring with at most k distinct characters.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int lengthOfLongestSubstringKDistinct(String s, int k) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int lengthOfLongestSubstringKDistinct(String s, int k) {\n        if (k == 0) return 0;\n        Map<Character, Integer> map = new HashMap<>();\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            map.put(c, map.getOrDefault(c, 0) + 1);\n            while (map.size() > k) {\n                char leftChar = s.charAt(left);\n                map.put(leftChar, map.get(leftChar) - 1);\n                if (map.get(leftChar) == 0) {\n                    map.remove(leftChar);\n                }\n                left++;\n            }\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}',
        examples: [{ input: 's = "eceba", k = 2', output: '3' }],
        testCases: [
          { input: 'eceba\n2', expectedOutput: '3', isHidden: false, points: 12 }
        ],
        hints: ['Use sliding window', 'Map tracks char frequencies', 'Shrink when size > k'],
        tags: ['Hash Table', 'String', 'Sliding Window']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 42 - Consecutive Sequences ====================
    const day42Topic = await Topic.findOneAndUpdate(
      { id: 'day-42' },
      {
        id: 'day-42',
        title: 'Consecutive Sequences & Advanced Hashing',
        description: 'Finding consecutive elements and grouping patterns.',
        week: 6,
        day: 42,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-41'],
        compulsoryQuestion: 'Longest Consecutive Sequence',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day42Topic.title}`);
    await Question.deleteMany({ topicId: 'day-42' });

    await Question.insertMany([
      {
        topicId: 'day-42',
        title: 'Longest Consecutive Sequence',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Find longest consecutive elements sequence in O(n) time.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int longestConsecutive(int[] nums) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int longestConsecutive(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int num : nums) set.add(num);\n        int maxLen = 0;\n        for (int num : set) {\n            if (!set.contains(num - 1)) {\n                int currentNum = num;\n                int currentLen = 1;\n                while (set.contains(currentNum + 1)) {\n                    currentNum++;\n                    currentLen++;\n                }\n                maxLen = Math.max(maxLen, currentLen);\n            }\n        }\n        return maxLen;\n    }\n}',
        examples: [{ input: 'nums = [100,4,200,1,3,2]', output: '4' }],
        testCases: [
          { input: '[100,4,200,1,3,2]', expectedOutput: '4', isHidden: false, points: 12 }
        ],
        hints: ['Add all to HashSet', 'Only start sequence if num-1 not in set', 'Count consecutive'],
        tags: ['Array', 'Hash Table', 'Union Find']
      },
      {
        topicId: 'day-42',
        title: 'First Missing Positive',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Find smallest missing positive integer in O(n) time, O(1) space.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int firstMissingPositive(int[] nums) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int firstMissingPositive(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                int temp = nums[nums[i] - 1];\n                nums[nums[i] - 1] = nums[i];\n                nums[i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            if (nums[i] != i + 1) return i + 1;\n        }\n        return n + 1;\n    }\n}',
        examples: [{ input: 'nums = [1,2,0]', output: '3' }],
        testCases: [
          { input: '[1,2,0]', expectedOutput: '3', isHidden: false, points: 15 }
        ],
        hints: ['Place each number at index num-1', 'Use array as hash', 'First mismatch is answer'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-42',
        title: 'Max Consecutive Ones III',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find max consecutive 1s if you can flip at most k 0s.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int longestOnes(int[] nums, int k) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int longestOnes(int[] nums, int k) {\n        int left = 0, zeros = 0, maxLen = 0;\n        for (int right = 0; right < nums.length; right++) {\n            if (nums[right] == 0) zeros++;\n            while (zeros > k) {\n                if (nums[left] == 0) zeros--;\n                left++;\n            }\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}',
        examples: [{ input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', output: '6' }],
        testCases: [
          { input: '[1,1,1,0,0,0,1,1,1,1,0]\n2', expectedOutput: '6', isHidden: false, points: 12 }
        ],
        hints: ['Use sliding window', 'Track count of zeros', 'Shrink when zeros > k'],
        tags: ['Array', 'Sliding Window']
      },
      {
        topicId: 'day-42',
        title: 'Degree of an Array',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Find smallest subarray with same degree as array. Degree = max frequency.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int findShortestSubArray(int[] nums) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int findShortestSubArray(int[] nums) {\n        Map<Integer, Integer> count = new HashMap<>();\n        Map<Integer, Integer> first = new HashMap<>();\n        int degree = 0, minLen = 0;\n        for (int i = 0; i < nums.length; i++) {\n            first.putIfAbsent(nums[i], i);\n            count.put(nums[i], count.getOrDefault(nums[i], 0) + 1);\n            int freq = count.get(nums[i]);\n            if (freq > degree) {\n                degree = freq;\n                minLen = i - first.get(nums[i]) + 1;\n            } else if (freq == degree) {\n                minLen = Math.min(minLen, i - first.get(nums[i]) + 1);\n            }\n        }\n        return minLen;\n    }\n}',
        examples: [{ input: 'nums = [1,2,2,3,1]', output: '2' }],
        testCases: [
          { input: '[1,2,2,3,1]', expectedOutput: '2', isHidden: false, points: 10 }
        ],
        hints: ['Track count and first occurrence', 'Update minLen when degree changes'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-42',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Group strings that are anagrams.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<List<String>> groupAnagrams(String[] strs) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] chars = s.toCharArray();\n            Arrays.sort(chars);\n            String key = new String(chars);\n            map.putIfAbsent(key, new ArrayList<>());\n            map.get(key).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}',
        examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }],
        testCases: [
          { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]', isHidden: false, points: 12 }
        ],
        hints: ['Sort each string as key', 'Group by sorted string'],
        tags: ['Array', 'Hash Table', 'String', 'Sorting']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 40-42 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays40to42();
