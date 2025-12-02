import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa_arena';

async function populateDay8() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const day8Questions = [
      {
        topicId: 'day-8',
        title: 'Single Number',
        description: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

Hint: Use XOR property: a ^ a = 0, a ^ 0 = a

Constraints:
• 1 ≤ nums.length ≤ 3 × 10^4
• -3 × 10^4 ≤ nums[i] ≤ 3 × 10^4
• Each element appears twice except for one`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int singleNumber(int[] nums) {
        // Use XOR to find the single number
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(singleNumber(nums));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(singleNumber(nums));
        sc.close();
    }
}`,
        examples: [
          { input: '5\n4 1 2 1 2', output: '4' },
          { input: '3\n2 2 1', output: '1' },
          { input: '1\n1', output: '1' }
        ],
        testCases: [
          { input: '5\n4 1 2 1 2', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '3\n2 2 1', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '1\n1', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '7\n-1 -1 2 2 3 3 4', expectedOutput: '4', isHidden: true, points: 25 },
          { input: '5\n5 3 3 7 7', expectedOutput: '5', isHidden: true, points: 15 },
          { input: '9\n1 2 3 4 5 1 2 3 4', expectedOutput: '5', isHidden: true, points: 15 }
        ],
        hints: [
          'XOR property: a ^ a = 0',
          'XOR is commutative and associative',
          'XOR all numbers, duplicates cancel out',
          'Time: O(n), Space: O(1)'
        ],
        tags: ['bit-manipulation', 'xor', 'array']
      },
      {
        topicId: 'day-8',
        title: 'Number of 1 Bits',
        description: `Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).

Constraints:
• 1 ≤ n ≤ 2^31 - 1`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int hammingWeight(int n) {
        // Count number of 1 bits
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(hammingWeight(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // Remove rightmost 1 bit
            count++;
        }
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(hammingWeight(n));
        sc.close();
    }
}`,
        examples: [
          { input: '11', output: '3' },
          { input: '128', output: '1' },
          { input: '7', output: '3' }
        ],
        testCases: [
          { input: '11', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '128', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '7', expectedOutput: '3', isHidden: false, points: 10 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '255', expectedOutput: '8', isHidden: true, points: 20 },
          { input: '2147483647', expectedOutput: '31', isHidden: true, points: 20 }
        ],
        hints: [
          'Use n & (n-1) to remove rightmost 1 bit',
          'Count until n becomes 0',
          'Alternative: check each bit with n & 1',
          'Time: O(number of 1 bits), Space: O(1)'
        ],
        tags: ['bit-manipulation', 'counting']
      },
      {
        topicId: 'day-8',
        title: 'Hamming Distance',
        description: `The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers x and y, return the Hamming distance between them.

Constraints:
• 0 ≤ x, y ≤ 2^31 - 1`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int hammingDistance(int x, int y) {
        // Find number of different bits
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        System.out.println(hammingDistance(x, y));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int hammingDistance(int x, int y) {
        int xor = x ^ y;
        int count = 0;
        
        while (xor != 0) {
            count += xor & 1;
            xor >>= 1;
        }
        
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        System.out.println(hammingDistance(x, y));
        sc.close();
    }
}`,
        examples: [
          { input: '1 4', output: '2' },
          { input: '3 1', output: '1' }
        ],
        testCases: [
          { input: '1 4', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '3 1', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '0 0', expectedOutput: '0', isHidden: true, points: 15 },
          { input: '7 15', expectedOutput: '2', isHidden: true, points: 25 },
          { input: '100 200', expectedOutput: '5', isHidden: true, points: 25 }
        ],
        hints: [
          'XOR gives 1 where bits differ',
          'Count 1 bits in x ^ y',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['bit-manipulation', 'xor', 'hamming-distance']
      },
      {
        topicId: 'day-8',
        title: 'Complement of Base 10 Integer',
        description: `The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

For example, the integer 5 is "101" in binary and its complement is "010" which is the integer 2.

Given an integer n, return its complement.

Constraints:
• 0 ≤ n < 10^9`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int bitwiseComplement(int n) {
        // Find complement by flipping bits
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(bitwiseComplement(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int bitwiseComplement(int n) {
        if (n == 0) return 1;
        
        int mask = 0;
        int temp = n;
        
        while (temp > 0) {
            mask = (mask << 1) | 1;
            temp >>= 1;
        }
        
        return n ^ mask;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(bitwiseComplement(n));
        sc.close();
    }
}`,
        examples: [
          { input: '5', output: '2' },
          { input: '7', output: '0' },
          { input: '10', output: '5' }
        ],
        testCases: [
          { input: '5', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '7', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '10', expectedOutput: '5', isHidden: false, points: 15 },
          { input: '0', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '1', expectedOutput: '0', isHidden: true, points: 15 },
          { input: '255', expectedOutput: '0', isHidden: true, points: 15 }
        ],
        hints: [
          'Create a mask with all 1s of same length',
          'XOR with mask to flip all bits',
          'Handle special case n = 0',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['bit-manipulation', 'xor', 'complement']
      },
      {
        topicId: 'day-8',
        title: 'Binary Number with Alternating Bits',
        description: `Given a positive integer n, check whether it has alternating bits: namely, if two adjacent bits will always have different values.

Return 1 if true, 0 otherwise.

Constraints:
• 1 ≤ n ≤ 2^31 - 1`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int hasAlternatingBits(int n) {
        // Check if adjacent bits are different
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(hasAlternatingBits(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int hasAlternatingBits(int n) {
        int prev = n & 1;
        n >>= 1;
        
        while (n > 0) {
            int curr = n & 1;
            if (curr == prev) {
                return 0;
            }
            prev = curr;
            n >>= 1;
        }
        
        return 1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(hasAlternatingBits(n));
        sc.close();
    }
}`,
        examples: [
          { input: '5', output: '1' },
          { input: '7', output: '0' },
          { input: '11', output: '0' }
        ],
        testCases: [
          { input: '5', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '7', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '11', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '10', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '42', expectedOutput: '1', isHidden: true, points: 20 }
        ],
        hints: [
          'Check each bit with previous bit',
          'Use n & 1 to get rightmost bit',
          'Alternative: n ^ (n >> 1) should have all 1s',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['bit-manipulation', 'pattern-checking']
      }
    ];

    await Question.deleteMany({ topicId: 'day-8' });
    await Question.insertMany(day8Questions);
    console.log(`✅ Inserted ${day8Questions.length} questions for Day 8`);

    console.log('\n🎉 Day 8 (Bitwise Operations) populated successfully!');
    console.log('\n📊 Summary - Days 4-8:');
    console.log('Day 4: Count Digits, Palindrome, Factorial (5 questions)');
    console.log('Day 5: GCD, LCM & Prime Check (5 questions)');
    console.log('Day 6: Prime Factors & Sieve (5 questions)');
    console.log('Day 7: Computing Power (5 questions)');
    console.log('Day 8: Bitwise Operators (5 questions)');
    console.log('\nTotal: 25 new questions added! 🚀');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

populateDay8();
