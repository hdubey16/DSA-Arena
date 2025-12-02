import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const day9Questions = [
  {
    topicId: 'day-9',
    title: 'Power of Two',
    description: `Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two, if there exists an integer x such that n == 2^x.

**Constraint:** Could you solve it without loops/recursion? (Hint: n & (n-1))`,
    difficulty: 'Easy' as const,
    type: 'practice' as const,
    isCompulsory: true,
    points: 10,
    timeLimit: 15,
    starterCode: `public class Solution {
    public static boolean isPowerOfTwo(int n) {
        // Your code here
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPowerOfTwo(16)); // true
    }
}`,
    solution: `public class Solution {
    public static boolean isPowerOfTwo(int n) {
        // If n <= 0, it cannot be a power of 2
        if (n <= 0) return false;
        
        // A power of 2 has exactly one bit set
        // n & (n-1) removes the rightmost set bit
        // If result is 0, n had only one bit set
        return (n & (n - 1)) == 0;
    }
    
    public static void main(String[] args) {
        System.out.println(isPowerOfTwo(16)); // true
        System.out.println(isPowerOfTwo(3));  // false
    }
}`,
    examples: [
      { input: 'n = 16', output: 'true' },
      { input: 'n = 3', output: 'false' }
    ],
    testCases: [
      { input: '16', expectedOutput: 'true', isHidden: false, points: 3 },
      { input: '3', expectedOutput: 'false', isHidden: false, points: 3 },
      { input: '1', expectedOutput: 'true', isHidden: true, points: 2 },
      { input: '0', expectedOutput: 'false', isHidden: true, points: 2 }
    ],
    hints: [
      'A power of 2 in binary has exactly one bit set (e.g., 16 = 10000)',
      'Use the bit trick: n & (n-1) removes the rightmost set bit',
      'If n is a power of 2, n & (n-1) will be 0'
    ],
    tags: ['Bit Manipulation', 'Math']
  },
  {
    topicId: 'day-9',
    title: 'Counting Bits',
    description: `Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

**Constraints:** 0 <= n <= 10^5.

**Challenge:** Can you do it in O(n) time?`,
    difficulty: 'Easy' as const,
    type: 'practice' as const,
    isCompulsory: false,
    points: 15,
    timeLimit: 20,
    starterCode: `public class Solution {
    public static int[] countBits(int n) {
        // Your code here
        return new int[n + 1];
    }
    
    public static void main(String[] args) {
        int[] result = countBits(5);
        for (int num : result) {
            System.out.print(num + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static int[] countBits(int n) {
        int[] ans = new int[n + 1];
        
        // DP approach: ans[i] = ans[i >> 1] + (i & 1)
        // Right shift divides by 2, (i & 1) checks if odd
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        
        return ans;
    }
    
    public static void main(String[] args) {
        int[] result = countBits(5);
        for (int num : result) {
            System.out.print(num + " "); // 0 1 1 2 1 2
        }
    }
}`,
    examples: [
      { input: 'n = 5', output: '[0,1,1,2,1,2]' }
    ],
    testCases: [
      { input: '5', expectedOutput: '[0, 1, 1, 2, 1, 2]', isHidden: false, points: 5 },
      { input: '2', expectedOutput: '[0, 1, 1]', isHidden: false, points: 3 },
      { input: '0', expectedOutput: '[0]', isHidden: true, points: 2 }
    ],
    hints: [
      'Use dynamic programming with bitwise operations',
      'ans[i] = ans[i >> 1] + (i & 1)',
      'Right shift (>>) divides by 2, (& 1) checks if number is odd'
    ],
    tags: ['Bit Manipulation', 'Dynamic Programming']
  },
  {
    topicId: 'day-9',
    title: 'Prime Number of Set Bits in Binary Representation',
    description: `Given two integers left and right, return the count of numbers in the inclusive range [left, right] having a prime number of set bits in their binary representation.

**Constraints:** 1 <= left <= right <= 10^6.`,
    difficulty: 'Medium' as const,
    type: 'practice' as const,
    isCompulsory: false,
    points: 20,
    timeLimit: 25,
    starterCode: `public class Solution {
    public static int countPrimeSetBits(int left, int right) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(countPrimeSetBits(6, 10)); // 4
    }
}`,
    solution: `public class Solution {
    public static int countPrimeSetBits(int left, int right) {
        // Primes up to 20 (since max number has ~20 bits for 10^6)
        int[] primes = {2, 3, 5, 7, 11, 13, 17, 19};
        int count = 0;
        
        for (int num = left; num <= right; num++) {
            int bits = Integer.bitCount(num);
            for (int prime : primes) {
                if (bits == prime) {
                    count++;
                    break;
                }
            }
        }
        
        return count;
    }
    
    public static void main(String[] args) {
        System.out.println(countPrimeSetBits(6, 10)); // 4
    }
}`,
    examples: [
      { input: 'left = 6, right = 10', output: '4' }
    ],
    testCases: [
      { input: '6\n10', expectedOutput: '4', isHidden: false, points: 5 },
      { input: '10\n15', expectedOutput: '5', isHidden: false, points: 5 },
      { input: '1\n10', expectedOutput: '4', isHidden: true, points: 5 }
    ],
    hints: [
      'Use Integer.bitCount() to count set bits',
      'Precompute primes up to 20 (max bits in 10^6)',
      'Check if bit count is prime for each number in range'
    ],
    tags: ['Bit Manipulation', 'Prime Numbers']
  },
  {
    topicId: 'day-9',
    title: 'Binary Watch',
    description: `A binary watch has 4 LEDs on the top to represent the hours (0-11) and 6 LEDs on the bottom to represent the minutes (0-59). Given an integer turnedOn which represents the number of LEDs that are currently on, return all possible times the watch could represent.

**Constraints:** 0 <= turnedOn <= 9.`,
    difficulty: 'Medium' as const,
    type: 'practice' as const,
    isCompulsory: false,
    points: 20,
    timeLimit: 30,
    starterCode: `import java.util.*;

public class Solution {
    public static List<String> readBinaryWatch(int turnedOn) {
        // Your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(readBinaryWatch(1));
    }
}`,
    solution: `import java.util.*;

public class Solution {
    public static List<String> readBinaryWatch(int turnedOn) {
        List<String> result = new ArrayList<>();
        
        for (int h = 0; h < 12; h++) {
            for (int m = 0; m < 60; m++) {
                // Count total set bits in hour and minute
                if (Integer.bitCount(h) + Integer.bitCount(m) == turnedOn) {
                    result.add(String.format("%d:%02d", h, m));
                }
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println(readBinaryWatch(1));
    }
}`,
    examples: [
      { input: 'turnedOn = 1', output: '["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]' }
    ],
    testCases: [
      { input: '1', expectedOutput: '["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]', isHidden: false, points: 7 },
      { input: '9', expectedOutput: '[]', isHidden: true, points: 3 }
    ],
    hints: [
      'Try all combinations of hours (0-11) and minutes (0-59)',
      'Use Integer.bitCount() to count set bits',
      'Format output as "h:mm" with leading zero for minutes'
    ],
    tags: ['Bit Manipulation', 'Backtracking']
  },
  {
    topicId: 'day-9',
    title: 'Sort Integers by The Number of 1 Bits',
    description: `You are given an integer array arr. Sort the integers in the array in ascending order by the number of 1s in their binary representation. In case of two or more integers having the same number of 1s, sort them in ascending numerical order.

**Constraints:** 1 <= arr.length <= 500.`,
    difficulty: 'Easy' as const,
    type: 'practice' as const,
    isCompulsory: false,
    points: 15,
    timeLimit: 20,
    starterCode: `import java.util.*;

public class Solution {
    public static int[] sortByBits(int[] arr) {
        // Your code here
        return arr;
    }
    
    public static void main(String[] args) {
        int[] arr = {0,1,2,3,4,5,6,7,8};
        int[] result = sortByBits(arr);
        System.out.println(Arrays.toString(result));
    }
}`,
    solution: `import java.util.*;

public class Solution {
    public static int[] sortByBits(int[] arr) {
        Integer[] boxed = Arrays.stream(arr).boxed().toArray(Integer[]::new);
        
        Arrays.sort(boxed, (a, b) -> {
            int countA = Integer.bitCount(a);
            int countB = Integer.bitCount(b);
            
            if (countA != countB) {
                return countA - countB; // Sort by bit count
            }
            return a - b; // Sort by value if bit counts equal
        });
        
        return Arrays.stream(boxed).mapToInt(Integer::intValue).toArray();
    }
    
    public static void main(String[] args) {
        int[] arr = {0,1,2,3,4,5,6,7,8};
        int[] result = sortByBits(arr);
        System.out.println(Arrays.toString(result)); // [0,1,2,4,8,3,5,6,7]
    }
}`,
    examples: [
      { input: 'arr = [0,1,2,3,4,5,6,7,8]', output: '[0,1,2,4,8,3,5,6,7]' }
    ],
    testCases: [
      { input: '[0,1,2,3,4,5,6,7,8]', expectedOutput: '[0,1,2,4,8,3,5,6,7]', isHidden: false, points: 5 },
      { input: '[1024,512,256,128,64,32,16,8,4,2,1]', expectedOutput: '[1,2,4,8,16,32,64,128,256,512,1024]', isHidden: true, points: 5 }
    ],
    hints: [
      'Use a custom comparator with Integer.bitCount()',
      'First compare by bit count, then by value',
      'Convert to Integer[] for easier sorting'
    ],
    tags: ['Bit Manipulation', 'Sorting']
  }
];

async function populateDay9() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // Create or update Day 9 topic
    const topic = await Topic.findOneAndUpdate(
      { id: 'day-9' },
      {
        id: 'day-9',
        title: 'Count Set Bits & Power of 2',
        description: 'Bit counting algorithms (Brian Kernighan\'s) and binary properties.',
        week: 2,
        day: 9,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-8'],
        compulsoryQuestion: 'Power of Two',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );

    console.log(`✅ Created/Updated Topic: ${topic.title}`);

    // Delete existing questions for this day
    await Question.deleteMany({ topicId: 'day-9' });
    console.log('🗑️  Cleared old questions for Day 9\n');

    // Insert questions
    for (const q of day9Questions) {
      const question = await Question.create(q);
      console.log(`✅ Added: ${question.title} (${question.difficulty})`);
    }

    console.log(`\n✅ Successfully populated Day 9 with ${day9Questions.length} questions!`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDay9();
