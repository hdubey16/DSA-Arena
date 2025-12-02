import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays37to39() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 37 - Design HashMap/HashSet ====================
    const day37Topic = await Topic.findOneAndUpdate(
      { id: 'day-37' },
      {
        id: 'day-37',
        title: 'Collision Handling (Chaining, Open Addressing)',
        description: 'Design HashMap and HashSet from scratch.',
        week: 6,
        day: 37,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-36'],
        compulsoryQuestion: 'Design HashSet',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day37Topic.title}`);
    await Question.deleteMany({ topicId: 'day-37' });

    await Question.insertMany([
      {
        topicId: 'day-37',
        title: 'Design HashSet',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Design HashSet without using built-in libraries. Implement add, remove, contains.',
        starterCode: 'class MyHashSet {\n    public MyHashSet() {}\n    public void add(int key) {}\n    public void remove(int key) {}\n    public boolean contains(int key) { return false; }\n}',
        solution: 'class MyHashSet {\n    private boolean[] set;\n    public MyHashSet() {\n        set = new boolean[1000001];\n    }\n    public void add(int key) {\n        set[key] = true;\n    }\n    public void remove(int key) {\n        set[key] = false;\n    }\n    public boolean contains(int key) {\n        return set[key];\n    }\n}',
        examples: [{ input: '["add",1],["contains",1],["remove",1]', output: '[null,true,null]' }],
        testCases: [
          { input: '["add",1],["contains",1]', expectedOutput: '[null,true]', isHidden: false, points: 10 }
        ],
        hints: ['Use array or linked list buckets', 'Hash function: key % size'],
        tags: ['Array', 'Hash Table', 'Design']
      },
      {
        topicId: 'day-37',
        title: 'Design HashMap',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Design HashMap without built-in libraries. Implement put, get, remove.',
        starterCode: 'class MyHashMap {\n    public MyHashMap() {}\n    public void put(int key, int value) {}\n    public int get(int key) { return -1; }\n    public void remove(int key) {}\n}',
        solution: 'class MyHashMap {\n    private int[] map;\n    public MyHashMap() {\n        map = new int[1000001];\n        java.util.Arrays.fill(map, -1);\n    }\n    public void put(int key, int value) {\n        map[key] = value;\n    }\n    public int get(int key) {\n        return map[key];\n    }\n    public void remove(int key) {\n        map[key] = -1;\n    }\n}',
        examples: [{ input: '["put",1,1],["get",1],["remove",1]', output: '[null,1,null]' }],
        testCases: [
          { input: '["put",1,1],["get",1]', expectedOutput: '[null,1]', isHidden: false, points: 10 }
        ],
        hints: ['Use array of pairs/nodes', 'Handle collisions with chaining'],
        tags: ['Array', 'Hash Table', 'Design']
      },
      {
        topicId: 'day-37',
        title: 'Encode and Decode TinyURL',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Design URL shortening service. Encode long URL to short URL and decode back.',
        starterCode: 'import java.util.*;\nclass Codec {\n    public String encode(String longUrl) { return ""; }\n    public String decode(String shortUrl) { return ""; }\n}',
        solution: 'import java.util.*;\nclass Codec {\n    private Map<String, String> map = new HashMap<>();\n    private int counter = 0;\n    private String base = "http://tinyurl.com/";\n    public String encode(String longUrl) {\n        String key = base + counter++;\n        map.put(key, longUrl);\n        return key;\n    }\n    public String decode(String shortUrl) {\n        return map.get(shortUrl);\n    }\n}',
        examples: [{ input: 'url = "https://leetcode.com/problems/design-tinyurl"', output: '"https://leetcode.com/problems/design-tinyurl"' }],
        testCases: [
          { input: 'https://leetcode.com', expectedOutput: 'https://leetcode.com', isHidden: false, points: 12 }
        ],
        hints: ['Use HashMap: short → long', 'Counter or random string for short URL'],
        tags: ['Hash Table', 'Design']
      },
      {
        topicId: 'day-37',
        title: 'Isomorphic Strings',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Two strings are isomorphic if characters can be replaced to get the other.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean isIsomorphic(String s, String t) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean isIsomorphic(String s, String t) {\n        if (s.length() != t.length()) return false;\n        Map<Character, Character> mapS = new HashMap<>();\n        Map<Character, Character> mapT = new HashMap<>();\n        for (int i = 0; i < s.length(); i++) {\n            char c1 = s.charAt(i), c2 = t.charAt(i);\n            if (mapS.containsKey(c1)) {\n                if (mapS.get(c1) != c2) return false;\n            } else {\n                mapS.put(c1, c2);\n            }\n            if (mapT.containsKey(c2)) {\n                if (mapT.get(c2) != c1) return false;\n            } else {\n                mapT.put(c2, c1);\n            }\n        }\n        return true;\n    }\n}',
        examples: [{ input: 's = "egg", t = "add"', output: 'true' }],
        testCases: [
          { input: 'egg\nadd', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Use two maps for bijection', 'Check both s→t and t→s mappings'],
        tags: ['Hash Table', 'String']
      },
      {
        topicId: 'day-37',
        title: 'Word Pattern',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Check if string s follows same pattern. Bijection between pattern letters and words.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean wordPattern(String pattern, String s) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean wordPattern(String pattern, String s) {\n        String[] words = s.split(" ");\n        if (pattern.length() != words.length) return false;\n        Map<Character, String> map = new HashMap<>();\n        Map<String, Character> reverseMap = new HashMap<>();\n        for (int i = 0; i < pattern.length(); i++) {\n            char c = pattern.charAt(i);\n            String word = words[i];\n            if (map.containsKey(c)) {\n                if (!map.get(c).equals(word)) return false;\n            } else {\n                map.put(c, word);\n            }\n            if (reverseMap.containsKey(word)) {\n                if (reverseMap.get(word) != c) return false;\n            } else {\n                reverseMap.put(word, c);\n            }\n        }\n        return true;\n    }\n}',
        examples: [{ input: 'pattern = "abba", s = "dog cat cat dog"', output: 'true' }],
        testCases: [
          { input: 'abba\ndog cat cat dog', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Split string by space', 'Two maps: char→word and word→char'],
        tags: ['Hash Table', 'String']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 38 - HashSet & HashMap Operations ====================
    const day38Topic = await Topic.findOneAndUpdate(
      { id: 'day-38' },
      {
        id: 'day-38',
        title: 'HashSet & HashMap in Java',
        description: 'Language-specific features and set operations.',
        week: 6,
        day: 38,
        difficulty: 'Easy',
        estimatedTime: 90,
        prerequisites: ['day-37'],
        compulsoryQuestion: 'Intersection of Two Arrays',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day38Topic.title}`);
    await Question.deleteMany({ topicId: 'day-38' });

    await Question.insertMany([
      {
        topicId: 'day-38',
        title: 'Intersection of Two Arrays',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: 'Return intersection of two arrays. Each element must be unique.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] intersection(int[] nums1, int[] nums2) { return new int[0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] intersection(int[] nums1, int[] nums2) {\n        Set<Integer> set1 = new HashSet<>();\n        Set<Integer> result = new HashSet<>();\n        for (int num : nums1) set1.add(num);\n        for (int num : nums2) {\n            if (set1.contains(num)) result.add(num);\n        }\n        int[] arr = new int[result.size()];\n        int i = 0;\n        for (int num : result) arr[i++] = num;\n        return arr;\n    }\n}',
        examples: [{ input: 'nums1 = [1,2,2,1], nums2 = [2,2]', output: '[2]' }],
        testCases: [
          { input: '[1,2,2,1]\n[2,2]', expectedOutput: '[2]', isHidden: false, points: 8 }
        ],
        hints: ['Use HashSet for nums1', 'Add to result if in set'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-38',
        title: 'Intersection of Two Arrays II',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Return intersection with duplicates. Each element appears as many times as it shows in both.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] intersect(int[] nums1, int[] nums2) { return new int[0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] intersect(int[] nums1, int[] nums2) {\n        Map<Integer, Integer> map = new HashMap<>();\n        List<Integer> result = new ArrayList<>();\n        for (int num : nums1) {\n            map.put(num, map.getOrDefault(num, 0) + 1);\n        }\n        for (int num : nums2) {\n            if (map.getOrDefault(num, 0) > 0) {\n                result.add(num);\n                map.put(num, map.get(num) - 1);\n            }\n        }\n        int[] arr = new int[result.size()];\n        for (int i = 0; i < result.size(); i++) arr[i] = result.get(i);\n        return arr;\n    }\n}',
        examples: [{ input: 'nums1 = [1,2,2,1], nums2 = [2,2]', output: '[2,2]' }],
        testCases: [
          { input: '[1,2,2,1]\n[2,2]', expectedOutput: '[2,2]', isHidden: false, points: 8 }
        ],
        hints: ['Count frequencies in HashMap', 'Decrement count when found'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-38',
        title: 'Happy Number',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Number is happy if repeated sum of squares of digits eventually equals 1. Use HashSet to detect cycles.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean isHappy(int n) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean isHappy(int n) {\n        Set<Integer> seen = new HashSet<>();\n        while (n != 1 && !seen.contains(n)) {\n            seen.add(n);\n            n = getNext(n);\n        }\n        return n == 1;\n    }\n    private static int getNext(int n) {\n        int sum = 0;\n        while (n > 0) {\n            int digit = n % 10;\n            sum += digit * digit;\n            n /= 10;\n        }\n        return sum;\n    }\n}',
        examples: [{ input: 'n = 19', output: 'true' }],
        testCases: [
          { input: '19', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Calculate sum of squares', 'Use set to detect cycle'],
        tags: ['Hash Table', 'Math']
      },
      {
        topicId: 'day-38',
        title: 'Distribute Candies',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 10,
        timeLimit: 15,
        description: 'Return max types of candies Alice can eat if she eats n/2 candies.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int distributeCandies(int[] candyType) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int distributeCandies(int[] candyType) {\n        Set<Integer> types = new HashSet<>();\n        for (int candy : candyType) {\n            types.add(candy);\n        }\n        return Math.min(types.size(), candyType.length / 2);\n    }\n}',
        examples: [{ input: 'candyType = [1,1,2,2,3,3]', output: '3' }],
        testCases: [
          { input: '[1,1,2,2,3,3]', expectedOutput: '3', isHidden: false, points: 5 }
        ],
        hints: ['Count unique types', 'Min of unique types and n/2'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-38',
        title: 'Jewels and Stones',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 10,
        timeLimit: 15,
        description: 'Count how many stones are jewels.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int numJewelsInStones(String jewels, String stones) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int numJewelsInStones(String jewels, String stones) {\n        Set<Character> jewelSet = new HashSet<>();\n        for (char c : jewels.toCharArray()) {\n            jewelSet.add(c);\n        }\n        int count = 0;\n        for (char c : stones.toCharArray()) {\n            if (jewelSet.contains(c)) count++;\n        }\n        return count;\n    }\n}',
        examples: [{ input: 'jewels = "aA", stones = "aAAbbbb"', output: '3' }],
        testCases: [
          { input: 'aA\naAAbbbb', expectedOutput: '3', isHidden: false, points: 5 }
        ],
        hints: ['Store jewels in HashSet', 'Count stones in set'],
        tags: ['Hash Table', 'String']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 39 - Frequency Count ====================
    const day39Topic = await Topic.findOneAndUpdate(
      { id: 'day-39' },
      {
        id: 'day-39',
        title: 'Frequency Count & Intersection/Union',
        description: 'Counting frequencies with HashMap logic.',
        week: 6,
        day: 39,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-38'],
        compulsoryQuestion: 'Find All Duplicates in an Array',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day39Topic.title}`);
    await Question.deleteMany({ topicId: 'day-39' });

    await Question.insertMany([
      {
        topicId: 'day-39',
        title: 'Find All Duplicates in an Array',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Find all integers that appear twice. All integers in range [1, n]. O(n) time, O(1) space.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> findDuplicates(int[] nums) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<Integer> findDuplicates(int[] nums) {\n        List<Integer> result = new ArrayList<>();\n        for (int i = 0; i < nums.length; i++) {\n            int index = Math.abs(nums[i]) - 1;\n            if (nums[index] < 0) {\n                result.add(index + 1);\n            }\n            nums[index] = -nums[index];\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2,3]' }],
        testCases: [
          { input: '[4,3,2,7,8,2,3,1]', expectedOutput: '[2,3]', isHidden: false, points: 10 }
        ],
        hints: ['Use negation to mark visited', 'Index = value - 1'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-39',
        title: 'Sort Characters By Frequency',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Sort string by character frequency in decreasing order.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String frequencySort(String s) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String frequencySort(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        for (char c : s.toCharArray()) {\n            map.put(c, map.getOrDefault(c, 0) + 1);\n        }\n        List<Character>[] buckets = new List[s.length() + 1];\n        for (char c : map.keySet()) {\n            int freq = map.get(c);\n            if (buckets[freq] == null) buckets[freq] = new ArrayList<>();\n            buckets[freq].add(c);\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = buckets.length - 1; i >= 0; i--) {\n            if (buckets[i] != null) {\n                for (char c : buckets[i]) {\n                    for (int j = 0; j < i; j++) sb.append(c);\n                }\n            }\n        }\n        return sb.toString();\n    }\n}',
        examples: [{ input: 's = "tree"', output: '"eert"' }],
        testCases: [
          { input: 'tree', expectedOutput: 'eert', isHidden: false, points: 10 }
        ],
        hints: ['Count frequencies', 'Bucket sort by frequency'],
        tags: ['Hash Table', 'String', 'Bucket Sort']
      },
      {
        topicId: 'day-39',
        title: 'Unique Number of Occurrences',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Return true if all occurrence counts are unique.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean uniqueOccurrences(int[] arr) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean uniqueOccurrences(int[] arr) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int num : arr) {\n            count.put(num, count.getOrDefault(num, 0) + 1);\n        }\n        Set<Integer> occurrences = new HashSet<>(count.values());\n        return occurrences.size() == count.size();\n    }\n}',
        examples: [{ input: 'arr = [1,2,2,1,1,3]', output: 'true' }],
        testCases: [
          { input: '[1,2,2,1,1,3]', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Count frequencies', 'Check if counts set size equals map size'],
        tags: ['Array', 'Hash Table']
      },
      {
        topicId: 'day-39',
        title: 'Find Words That Can Be Formed by Characters',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Return sum of lengths of good words (words that can be formed from chars).',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int countCharacters(String[] words, String chars) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int countCharacters(String[] words, String chars) {\n        int[] count = new int[26];\n        for (char c : chars.toCharArray()) {\n            count[c - \'a\']++;\n        }\n        int result = 0;\n        for (String word : words) {\n            int[] wordCount = new int[26];\n            for (char c : word.toCharArray()) {\n                wordCount[c - \'a\']++;\n            }\n            boolean valid = true;\n            for (int i = 0; i < 26; i++) {\n                if (wordCount[i] > count[i]) {\n                    valid = false;\n                    break;\n                }\n            }\n            if (valid) result += word.length();\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'words = ["cat","bt","hat","tree"], chars = "atach"', output: '6' }],
        testCases: [
          { input: '["cat","bt","hat","tree"]\natach', expectedOutput: '6', isHidden: false, points: 8 }
        ],
        hints: ['Count chars frequencies', 'Check if word can be formed'],
        tags: ['Array', 'Hash Table', 'String']
      },
      {
        topicId: 'day-39',
        title: 'Check if All Characters Have Equal Number of Occurrences',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Return true if all characters have same frequency.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean areOccurrencesEqual(String s) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean areOccurrencesEqual(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        for (char c : s.toCharArray()) {\n            map.put(c, map.getOrDefault(c, 0) + 1);\n        }\n        int freq = map.values().iterator().next();\n        for (int count : map.values()) {\n            if (count != freq) return false;\n        }\n        return true;\n    }\n}',
        examples: [{ input: 's = "abacbc"', output: 'true' }],
        testCases: [
          { input: 'abacbc', expectedOutput: 'true', isHidden: false, points: 8 }
        ],
        hints: ['Count all frequencies', 'Check if all equal'],
        tags: ['Hash Table', 'String']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 37-39 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays37to39();
