import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const day10Questions = [
  {
    topicId: 'day-10',
    title: 'Single Number II',
    description: `Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it.

**Constraints:** 1 <= nums.length <= 3 * 10^4.

**Challenge:** O(n) time and O(1) space.`,
    difficulty: 'Medium' as const,
    type: 'practice' as const,
    isCompulsory: true,
    points: 25,
    timeLimit: 30,
    starterCode: `public class Solution {
    public static int singleNumber(int[] nums) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 2, 3, 2};
        System.out.println(singleNumber(nums)); // 3
    }
}`,
    solution: `public class Solution {
    public static int singleNumber(int[] nums) {
        int ones = 0, twos = 0;
        
        for (int num : nums) {
            // Add to twos if it's already in ones
            twos |= ones & num;
            // XOR with ones
            ones ^= num;
            // Remove numbers that appear three times
            int threes = ones & twos;
            ones &= ~threes;
            twos &= ~threes;
        }
        
        return ones;
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 2, 3, 2};
        System.out.println(singleNumber(nums)); // 3
    }
}`,
    examples: [
      { input: 'nums = [2,2,3,2]', output: '3' },
      { input: 'nums = [0,1,0,1,0,1,99]', output: '99' }
    ],
    testCases: [
      { input: '[2,2,3,2]', expectedOutput: '3', isHidden: false, points: 8 },
      { input: '[0,1,0,1,0,1,99]', expectedOutput: '99', isHidden: false, points: 8 },
      { input: '[30000,500,100,30000,100,30000,100]', expectedOutput: '500', isHidden: true, points: 9 }
    ],
    hints: [
      'Use two variables: ones and twos to track bit occurrences',
      'ones tracks bits that appeared once, twos tracks bits that appeared twice',
      'When a bit appears three times, remove it from both ones and twos'
    ],
    tags: ['Bit Manipulation', 'Array']
  },
  {
    topicId: 'day-10',
    title: 'Single Number III',
    description: `Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.

**Constraints:** 2 <= nums.length <= 3 * 10^4.`,
    difficulty: 'Medium' as const,
    type: 'practice' as const,
    isCompulsory: false,
    points: 25,
    timeLimit: 30,
    starterCode: `public class Solution {
    public static int[] singleNumber(int[] nums) {
        // Your code here
        return new int[2];
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 1, 3, 2, 5};
        int[] result = singleNumber(nums);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
    solution: `public class Solution {
    public static int[] singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }
        
        // Find rightmost set bit
        int rightmostBit = xor & (-xor);
        
        int a = 0, b = 0;
        for (int num : nums) {
            if ((num & rightmostBit) != 0) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        
        return new int[]{a, b};
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 1, 3, 2, 5};
        int[] result = singleNumber(nums);
        System.out.println(result[0] + " " + result[1]); // 3 5
    }
}`,
    examples: [
      { input: 'nums = [1,2,1,3,2,5]', output: '[3,5]' }
    ],
    testCases: [
      { input: '[1,2,1,3,2,5]', expectedOutput: '[3,5]', isHidden: false, points: 10 },
      { input: '[2,1,2,3,4,1]', expectedOutput: '[3,4]', isHidden: true, points: 10 }
    ],
    hints: [
      'XOR all numbers - result will be XOR of the two unique numbers',
      'Find any set bit in the XOR result (rightmost is easiest)',
      'Divide numbers into two groups based on this bit - each unique number will be in a different group'
    ],
    tags: ['Bit Manipulation', 'Array']
  },
  {
    topicId: 'day-10',
    title: 'Missing Number',
    description: `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

**Constraint:** Solve using Bit Manipulation (XOR).`,
    difficulty: 'Easy' as const,
    type: 'practice' as const,
    isCompulsory: false,
    points: 15,
    timeLimit: 15,
    starterCode: `public class Solution {
    public static int missingNumber(int[] nums) {
        // Your code here using XOR
        return 0;
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 0, 1};
        System.out.println(missingNumber(nums)); // 2
    }
}`,
    solution: `public class Solution {
    public static int missingNumber(int[] nums) {
        int xor = nums.length;
        
        for (int i = 0; i < nums.length; i++) {
            xor ^= i ^ nums[i];
        }
        
        return xor;
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 0, 1};
        System.out.println(missingNumber(nums)); // 2
    }
}`,
    examples: [
      { input: 'nums = [3,0,1]', output: '2' },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' }
    ],
    testCases: [
      { input: '[3,0,1]', expectedOutput: '2', isHidden: false, points: 5 },
      { input: '[9,6,4,2,3,5,7,0,1]', expectedOutput: '8', isHidden: false, points: 5 },
      { input: '[0,1]', expectedOutput: '2', isHidden: true, points: 5 }
    ],
    hints: [
      'XOR has the property: a ^ a = 0 and a ^ 0 = a',
      'XOR all indices (0 to n) with all array elements',
      'The missing number will remain after all pairs cancel out'
    ],
    tags: ['Bit Manipulation', 'Array', 'Math']
  },
  {
    topicId: 'day-10',
    title: 'Find the Difference',
    description: `You are given two strings s and t. String t is generated by random shuffling string s and then adding one more letter at a random position. Return the letter that was added to t.

**Constraint:** Solve using XOR.`,
    difficulty: 'Easy' as const,
    type: 'practice' as const,
    isCompulsory: false,
    points: 15,
    timeLimit: 15,
    starterCode: `public class Solution {
    public static char findTheDifference(String s, String t) {
        // Your code here using XOR
        return 'a';
    }
    
    public static void main(String[] args) {
        System.out.println(findTheDifference("abcd", "abcde")); // e
    }
}`,
    solution: `public class Solution {
    public static char findTheDifference(String s, String t) {
        char result = 0;
        
        // XOR all characters in s
        for (char c : s.toCharArray()) {
            result ^= c;
        }
        
        // XOR all characters in t
        for (char c : t.toCharArray()) {
            result ^= c;
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println(findTheDifference("abcd", "abcde")); // e
    }
}`,
    examples: [
      { input: 's = "abcd", t = "abcde"', output: 'e' },
      { input: 's = "", t = "y"', output: 'y' }
    ],
    testCases: [
      { input: 'abcd\nabcde', expectedOutput: 'e', isHidden: false, points: 5 },
      { input: '\ny', expectedOutput: 'y', isHidden: false, points: 5 },
      { input: 'a\naa', expectedOutput: 'a', isHidden: true, points: 5 }
    ],
    hints: [
      'XOR all characters in both strings',
      'Characters that appear in both will cancel out (c ^ c = 0)',
      'Only the extra character will remain'
    ],
    tags: ['Bit Manipulation', 'String']
  },
  {
    topicId: 'day-10',
    title: 'Bitwise AND of Numbers Range',
    description: `Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.

**Constraints:** 0 <= left <= right <= 2^31 - 1.`,
    difficulty: 'Medium' as const,
    type: 'practice' as const,
    isCompulsory: false,
    points: 20,
    timeLimit: 25,
    starterCode: `public class Solution {
    public static int rangeBitwiseAnd(int left, int right) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(rangeBitwiseAnd(5, 7)); // 4
    }
}`,
    solution: `public class Solution {
    public static int rangeBitwiseAnd(int left, int right) {
        int shift = 0;
        
        // Find common prefix by right shifting both numbers
        // until they become equal
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        
        // Shift back to get the result
        return left << shift;
    }
    
    public static void main(String[] args) {
        System.out.println(rangeBitwiseAnd(5, 7)); // 4
        System.out.println(rangeBitwiseAnd(0, 0)); // 0
    }
}`,
    examples: [
      { input: 'left = 5, right = 7', output: '4' },
      { input: 'left = 0, right = 0', output: '0' }
    ],
    testCases: [
      { input: '5\n7', expectedOutput: '4', isHidden: false, points: 7 },
      { input: '0\n0', expectedOutput: '0', isHidden: false, points: 6 },
      { input: '1\n2147483647', expectedOutput: '0', isHidden: true, points: 7 }
    ],
    hints: [
      'The result will be the common prefix of left and right in binary',
      'Keep right-shifting both numbers until they become equal',
      'Left-shift the result back by the same amount'
    ],
    tags: ['Bit Manipulation']
  }
];

async function populateDay10() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    const topic = await Topic.findOneAndUpdate(
      { id: 'day-10' },
      {
        id: 'day-10',
        title: 'Bit Manipulation Problems',
        description: 'XOR tricks, masking, and finding unique elements.',
        week: 2,
        day: 10,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-9'],
        compulsoryQuestion: 'Single Number II',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );

    console.log(`✅ Created/Updated Topic: ${topic.title}`);

    await Question.deleteMany({ topicId: 'day-10' });
    console.log('🗑️  Cleared old questions for Day 10\n');

    for (const q of day10Questions) {
      const question = await Question.create(q);
      console.log(`✅ Added: ${question.title} (${question.difficulty})`);
    }

    console.log(`\n✅ Successfully populated Day 10 with ${day10Questions.length} questions!`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDay10();
