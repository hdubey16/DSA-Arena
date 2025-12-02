import mongoose from 'mongoose';
import Question from '../models/Question';
import Topic from '../models/Topic';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa_arena';

async function populateDays4to8() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create/Update topics for days 4-8
    const topics = [
      {
        id: 'day-4',
        title: 'Count Digits, Palindrome, Factorial',
        description: 'Master digit extraction, reversing logic, and factorial properties.',
        week: 1,
        day: 4,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-1', 'day-2', 'day-3'],
        compulsoryQuestion: 'Count the Digits That Divide a Number',
        practiceQuestions: 5,
        isLocked: false
      },
      {
        id: 'day-5',
        title: 'GCD, LCM & Prime Check',
        description: 'Learn Euclidean algorithm and properties of divisors.',
        week: 1,
        day: 5,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-4'],
        compulsoryQuestion: 'Find Greatest Common Divisor of Array',
        practiceQuestions: 5,
        isLocked: false
      },
      {
        id: 'day-6',
        title: 'Prime Factors & Sieve of Eratosthenes',
        description: 'Generate primes efficiently and master factorization techniques.',
        week: 1,
        day: 6,
        difficulty: 'Hard',
        estimatedTime: 150,
        prerequisites: ['day-5'],
        compulsoryQuestion: 'Count Primes (Sieve of Eratosthenes)',
        practiceQuestions: 5,
        isLocked: false
      },
      {
        id: 'day-7',
        title: 'Computing Power & Mathematical Problems',
        description: 'Master binary exponentiation and modular arithmetic.',
        week: 1,
        day: 7,
        difficulty: 'Hard',
        estimatedTime: 150,
        prerequisites: ['day-6'],
        compulsoryQuestion: 'Pow(x, n)',
        practiceQuestions: 5,
        isLocked: false
      },
      {
        id: 'day-8',
        title: 'Bitwise Operators (AND, OR, XOR, Shifts)',
        description: 'Learn low-level bit manipulation tricks and operations.',
        week: 2,
        day: 8,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-7'],
        compulsoryQuestion: 'Single Number',
        practiceQuestions: 5,
        isLocked: false
      }
    ];

    await Topic.deleteMany({ day: { $in: [4, 5, 6, 7, 8] } });
    const createdTopics = await Topic.insertMany(topics);
    console.log('✅ Created 5 topics (Days 4-8)');

    const topicIds = createdTopics.map(t => t.id);
    await Question.deleteMany({ topicId: { $in: topicIds } });

    // ==================== DAY 4 QUESTIONS ====================
    const day4Questions = [
      {
        topicId: 'day-4',
        title: 'Count the Digits That Divide a Number',
        description: `Given an integer num, return the number of digits in num that divide num. An integer val divides num if num % val == 0.

Constraints:
• 1 ≤ num ≤ 10^9
• Note: A digit that occurs multiple times is counted multiple times`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int countDivisibleDigits(int num) {
        // Count how many digits divide the number
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        System.out.println(countDivisibleDigits(num));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int countDivisibleDigits(int num) {
        int count = 0;
        int temp = num;
        
        while (temp > 0) {
            int digit = temp % 10;
            if (digit != 0 && num % digit == 0) {
                count++;
            }
            temp /= 10;
        }
        
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        System.out.println(countDivisibleDigits(num));
        sc.close();
    }
}`,
        examples: [
          { input: '121', output: '2' },
          { input: '1248', output: '4' },
          { input: '12', output: '2' }
        ],
        testCases: [
          { input: '121', expectedOutput: '2', isHidden: false, points: 15 },
          { input: '1248', expectedOutput: '4', isHidden: false, points: 15 },
          { input: '12', expectedOutput: '2', isHidden: false, points: 10 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '128', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '24', expectedOutput: '2', isHidden: true, points: 25 }
        ],
        hints: [
          'Extract each digit using modulo 10',
          'Check if digit is non-zero before dividing',
          'Time Complexity: O(log n), Space: O(1)'
        ],
        tags: ['math', 'digit-manipulation', 'modulo']
      },
      {
        topicId: 'day-4',
        title: 'Palindrome Number',
        description: `Given an integer x, return 1 if x is a palindrome, and 0 otherwise. An integer is a palindrome when it reads the same backward as forward.

Constraints:
• -2^31 ≤ x ≤ 2^31 - 1
• Negative numbers are not palindromes`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int isPalindrome(int x) {
        // Return 1 if palindrome, 0 otherwise
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        System.out.println(isPalindrome(x));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int isPalindrome(int x) {
        if (x < 0) return 0;
        
        int original = x;
        int reversed = 0;
        
        while (x > 0) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        
        return (original == reversed) ? 1 : 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        System.out.println(isPalindrome(x));
        sc.close();
    }
}`,
        examples: [
          { input: '121', output: '1' },
          { input: '-121', output: '0' },
          { input: '10', output: '0' }
        ],
        testCases: [
          { input: '121', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '-121', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '10', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '12321', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '0', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '123', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        hints: [
          'Negative numbers are never palindromes',
          'Reverse the number and compare',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['math', 'palindrome', 'number-reversal']
      },
      {
        topicId: 'day-4',
        title: 'Factorial Trailing Zeroes',
        description: `Given an integer n, return the number of trailing zeroes in n!.

Note that n! = n × (n - 1) × ... × 3 × 2 × 1.

Constraints:
• 0 ≤ n ≤ 10^4

Challenge: Can you write a solution that works in logarithmic time complexity?`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int trailingZeroes(int n) {
        // Count trailing zeros in n!
        // Hint: trailing zeros come from factors of 5
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(trailingZeroes(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int trailingZeroes(int n) {
        int count = 0;
        while (n >= 5) {
            n /= 5;
            count += n;
        }
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(trailingZeroes(n));
        sc.close();
    }
}`,
        examples: [
          { input: '3', output: '0' },
          { input: '5', output: '1' },
          { input: '25', output: '6' }
        ],
        testCases: [
          { input: '3', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '5', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '25', expectedOutput: '6', isHidden: false, points: 15 },
          { input: '0', expectedOutput: '0', isHidden: true, points: 15 },
          { input: '100', expectedOutput: '24', isHidden: true, points: 20 },
          { input: '1000', expectedOutput: '249', isHidden: true, points: 20 }
        ],
        hints: [
          'Trailing zeros come from pairs of 2 and 5',
          'Count factors of 5 (there are always enough 2s)',
          'Also count 25, 125, etc. (powers of 5)',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['math', 'factorial', 'counting']
      },
      {
        topicId: 'day-4',
        title: 'Check if Number is a Strong Number',
        description: `A number is called a Strong Number if the sum of the factorial of its digits is equal to the number itself. Given n, return 1 if it is Strong, else 0.

Constraints:
• 1 ≤ n ≤ 10^5`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int factorial(int n) {
        if (n <= 1) return 1;
        int result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    public static int isStrongNumber(int n) {
        // Check if sum of factorial of digits equals n
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isStrongNumber(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int factorial(int n) {
        if (n <= 1) return 1;
        int result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    public static int isStrongNumber(int n) {
        int sum = 0;
        int temp = n;
        
        while (temp > 0) {
            int digit = temp % 10;
            sum += factorial(digit);
            temp /= 10;
        }
        
        return (sum == n) ? 1 : 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isStrongNumber(n));
        sc.close();
    }
}`,
        examples: [
          { input: '145', output: '1' },
          { input: '123', output: '0' },
          { input: '1', output: '1' }
        ],
        testCases: [
          { input: '145', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '123', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '1', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '2', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '40585', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '100', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        hints: [
          'Extract each digit and calculate its factorial',
          'Sum all factorials and compare with original number',
          'Strong numbers: 1, 2, 145, 40585',
          'Time: O(d) where d is number of digits'
        ],
        tags: ['math', 'factorial', 'digit-manipulation']
      },
      {
        topicId: 'day-4',
        title: 'Reverse Integer',
        description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Constraints:
• -2^31 ≤ x ≤ 2^31 - 1`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int reverse(int x) {
        // Reverse the integer, handle overflow
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        System.out.println(reverse(x));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int reverse(int x) {
        int result = 0;
        
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            
            // Check for overflow before multiplying
            if (result > Integer.MAX_VALUE / 10 || 
                (result == Integer.MAX_VALUE / 10 && digit > 7)) {
                return 0;
            }
            if (result < Integer.MIN_VALUE / 10 || 
                (result == Integer.MIN_VALUE / 10 && digit < -8)) {
                return 0;
            }
            
            result = result * 10 + digit;
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        System.out.println(reverse(x));
        sc.close();
    }
}`,
        examples: [
          { input: '123', output: '321' },
          { input: '-123', output: '-321' },
          { input: '120', output: '21' }
        ],
        testCases: [
          { input: '123', expectedOutput: '321', isHidden: false, points: 15 },
          { input: '-123', expectedOutput: '-321', isHidden: false, points: 15 },
          { input: '120', expectedOutput: '21', isHidden: false, points: 10 },
          { input: '0', expectedOutput: '0', isHidden: true, points: 15 },
          { input: '1534236469', expectedOutput: '0', isHidden: true, points: 25 },
          { input: '-2147483648', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        hints: [
          'Check for overflow before multiplying by 10',
          'Handle negative numbers properly',
          'Use Integer.MAX_VALUE and Integer.MIN_VALUE',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['math', 'overflow', 'number-reversal']
      }
    ];

    await Question.insertMany(day4Questions);
    console.log(`✅ Inserted ${day4Questions.length} questions for Day 4`);

    // ==================== DAY 5 QUESTIONS ====================
    const day5Questions = [
      {
        topicId: 'day-5',
        title: 'Find Greatest Common Divisor of Array',
        description: `Given an integer array nums, return the greatest common divisor of the smallest number and the largest number in nums.

Constraints:
• 2 ≤ nums.length ≤ 1000
• 1 ≤ nums[i] ≤ 1000`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int gcd(int a, int b) {
        // Euclidean algorithm
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    public static int findGCD(int[] nums) {
        // Find GCD of min and max elements
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(findGCD(nums));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    public static int findGCD(int[] nums) {
        int min = nums[0], max = nums[0];
        
        for (int num : nums) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }
        
        return gcd(max, min);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(findGCD(nums));
        sc.close();
    }
}`,
        examples: [
          { input: '5\n2 5 6 9 10', output: '2' },
          { input: '3\n7 5 6', output: '1' },
          { input: '2\n12 18', output: '6' }
        ],
        testCases: [
          { input: '5\n2 5 6 9 10', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '3\n7 5 6', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '2\n12 18', expectedOutput: '6', isHidden: false, points: 15 },
          { input: '4\n3 3 3 3', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '3\n100 50 25', expectedOutput: '25', isHidden: true, points: 15 },
          { input: '5\n1 2 3 4 5', expectedOutput: '1', isHidden: true, points: 15 }
        ],
        hints: [
          'Find min and max elements first',
          'Use Euclidean algorithm for GCD',
          'Time: O(n + log(min(a,b))), Space: O(1)'
        ],
        tags: ['math', 'gcd', 'array']
      },
      {
        topicId: 'day-5',
        title: 'Find LCM of Two Numbers',
        description: `Given two integers a and b, return their Least Common Multiple (LCM).

Formula: LCM(a, b) = (a × b) / GCD(a, b)

Constraints:
• 1 ≤ a, b ≤ 1000`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    public static int lcm(int a, int b) {
        // Use formula: LCM = (a * b) / GCD(a, b)
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(lcm(a, b));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    public static int lcm(int a, int b) {
        return (a * b) / gcd(a, b);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(lcm(a, b));
        sc.close();
    }
}`,
        examples: [
          { input: '4 6', output: '12' },
          { input: '3 5', output: '15' },
          { input: '12 18', output: '36' }
        ],
        testCases: [
          { input: '4 6', expectedOutput: '12', isHidden: false, points: 20 },
          { input: '3 5', expectedOutput: '15', isHidden: false, points: 15 },
          { input: '12 18', expectedOutput: '36', isHidden: false, points: 15 },
          { input: '1 1', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '7 13', expectedOutput: '91', isHidden: true, points: 20 },
          { input: '100 50', expectedOutput: '100', isHidden: true, points: 15 }
        ],
        hints: [
          'LCM(a, b) = (a × b) / GCD(a, b)',
          'Calculate GCD first using Euclidean algorithm',
          'Time: O(log(min(a,b))), Space: O(1)'
        ],
        tags: ['math', 'lcm', 'gcd']
      },
      {
        topicId: 'day-5',
        title: 'Check Prime',
        description: `Given a positive integer n, return 1 if it is a prime number, otherwise return 0.

A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.

Constraints:
• 1 ≤ n ≤ 10^9`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int isPrime(int n) {
        // Check if n is prime
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPrime(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int isPrime(int n) {
        if (n <= 1) return 0;
        if (n <= 3) return 1;
        if (n % 2 == 0 || n % 3 == 0) return 0;
        
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return 0;
            }
        }
        
        return 1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPrime(n));
        sc.close();
    }
}`,
        examples: [
          { input: '11', output: '1' },
          { input: '1', output: '0' },
          { input: '15', output: '0' }
        ],
        testCases: [
          { input: '11', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '1', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '15', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '2', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '97', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '100', expectedOutput: '0', isHidden: true, points: 25 }
        ],
        hints: [
          'Check divisibility up to sqrt(n)',
          'Optimize by checking 2 and 3, then 6k±1',
          'Time: O(√n), Space: O(1)'
        ],
        tags: ['math', 'prime', 'number-theory']
      },
      {
        topicId: 'day-5',
        title: 'Three Divisors',
        description: `Given an integer n, return 1 if n has exactly three positive divisors. Otherwise, return 0.

An integer n has exactly three divisors if it is the square of a prime number.

Constraints:
• 1 ≤ n ≤ 10^4`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int isThree(int n) {
        // Check if n has exactly 3 divisors
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isThree(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }
    
    public static int isThree(int n) {
        int sqrt = (int) Math.sqrt(n);
        if (sqrt * sqrt == n && isPrime(sqrt)) {
            return 1;
        }
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isThree(n));
        sc.close();
    }
}`,
        examples: [
          { input: '4', output: '1' },
          { input: '12', output: '0' },
          { input: '9', output: '1' }
        ],
        testCases: [
          { input: '4', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '12', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '9', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '1', expectedOutput: '0', isHidden: true, points: 15 },
          { input: '25', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '49', expectedOutput: '1', isHidden: true, points: 15 }
        ],
        hints: [
          'A number has exactly 3 divisors if it\'s a square of a prime',
          'Check if n is a perfect square first',
          'Then check if sqrt(n) is prime',
          'Time: O(√n), Space: O(1)'
        ],
        tags: ['math', 'prime', 'divisors']
      },
      {
        topicId: 'day-5',
        title: 'X of a Kind in a Deck of Cards',
        description: `You are given an integer array deck where deck[i] represents the number written on the ith card.

Return 1 if you can choose X >= 2 such that it is possible to split the entire deck into 1 or more groups of cards where:
• Each group has exactly X cards
• All the cards in each group have the same number

Constraints:
• 1 ≤ deck.length ≤ 10^4
• 0 ≤ deck[i] < 10^4`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    public static int hasGroupsSizeX(int[] deck) {
        // Check if we can partition into groups of size X >= 2
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] deck = new int[n];
        for (int i = 0; i < n; i++) {
            deck[i] = sc.nextInt();
        }
        System.out.println(hasGroupsSizeX(deck));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    public static int hasGroupsSizeX(int[] deck) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int card : deck) {
            count.put(card, count.getOrDefault(card, 0) + 1);
        }
        
        int g = 0;
        for (int freq : count.values()) {
            g = gcd(g, freq);
        }
        
        return g >= 2 ? 1 : 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] deck = new int[n];
        for (int i = 0; i < n; i++) {
            deck[i] = sc.nextInt();
        }
        System.out.println(hasGroupsSizeX(deck));
        sc.close();
    }
}`,
        examples: [
          { input: '8\n1 2 3 4 4 3 2 1', output: '1' },
          { input: '4\n1 1 1 2', output: '0' },
          { input: '6\n1 1 2 2 2 2', output: '1' }
        ],
        testCases: [
          { input: '8\n1 2 3 4 4 3 2 1', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '4\n1 1 1 2', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '6\n1 1 2 2 2 2', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '4\n1 1 1 1', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '2\n1 1', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '3\n1 1 1', expectedOutput: '1', isHidden: true, points: 15 }
        ],
        hints: [
          'Count frequency of each card',
          'Find GCD of all frequencies',
          'If GCD >= 2, we can partition',
          'Time: O(n + k log C) where k is unique cards'
        ],
        tags: ['math', 'gcd', 'hashmap', 'frequency']
      }
    ];

    await Question.insertMany(day5Questions);
    console.log(`✅ Inserted ${day5Questions.length} questions for Day 5`);

    // Continue with Days 6-8...
    console.log('\n🎉 Days 4-5 populated successfully!');
    console.log('Note: Days 6-8 questions will be added in the next part due to message length.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

populateDays4to8();
