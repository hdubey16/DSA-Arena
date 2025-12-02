import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa_arena';

async function populateDays6to8() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Day 6-8 questions will be added to existing topics
    const day6Questions = [
      {
        topicId: 'day-6',
        title: 'Count Primes (Sieve of Eratosthenes)',
        description: `Given an integer n, return the number of prime numbers that are strictly less than n.

Use the Sieve of Eratosthenes algorithm for efficiency.

Constraints:
• 0 ≤ n ≤ 5 × 10^6`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 150,
        timeLimit: 60,
        starterCode: `import java.util.*;

public class Solution {
    public static int countPrimes(int n) {
        // Implement Sieve of Eratosthenes
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countPrimes(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int countPrimes(int n) {
        if (n <= 2) return 0;
        
        boolean[] isPrime = new boolean[n];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        
        for (int i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j < n; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        
        int count = 0;
        for (boolean prime : isPrime) {
            if (prime) count++;
        }
        
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countPrimes(n));
        sc.close();
    }
}`,
        examples: [
          { input: '10', output: '4' },
          { input: '0', output: '0' },
          { input: '1', output: '0' }
        ],
        testCases: [
          { input: '10', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '0', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '1', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '100', expectedOutput: '25', isHidden: true, points: 20 },
          { input: '1000', expectedOutput: '168', isHidden: true, points: 20 },
          { input: '10000', expectedOutput: '1229', isHidden: true, points: 20 }
        ],
        hints: [
          'Use Sieve of Eratosthenes algorithm',
          'Mark multiples of each prime as composite',
          'Start marking from i² for optimization',
          'Time: O(n log log n), Space: O(n)'
        ],
        tags: ['prime', 'sieve', 'math']
      },
      {
        topicId: 'day-6',
        title: 'Ugly Number',
        description: `An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return 1 if n is an ugly number, 0 otherwise.

Constraints:
• -2^31 ≤ n ≤ 2^31 - 1`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int isUgly(int n) {
        // Check if n only has factors 2, 3, 5
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isUgly(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int isUgly(int n) {
        if (n <= 0) return 0;
        
        while (n % 2 == 0) n /= 2;
        while (n % 3 == 0) n /= 3;
        while (n % 5 == 0) n /= 5;
        
        return n == 1 ? 1 : 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isUgly(n));
        sc.close();
    }
}`,
        examples: [
          { input: '6', output: '1' },
          { input: '14', output: '0' },
          { input: '1', output: '1' }
        ],
        testCases: [
          { input: '6', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '14', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '1', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '8', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '0', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '-10', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        hints: [
          'Divide by 2, 3, 5 repeatedly',
          'If result is 1, it\'s an ugly number',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['math', 'prime-factors']
      },
      {
        topicId: 'day-6',
        title: 'Distinct Prime Factors of Product of Array',
        description: `Given an array of positive integers nums, return the number of distinct prime factors in the product of the elements of nums.

Note: You don't need to calculate the actual product (which may overflow). Just find distinct prime factors across all elements.

Constraints:
• 1 ≤ nums.length ≤ 10^4
• 2 ≤ nums[i] ≤ 1000`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int distinctPrimeFactors(int[] nums) {
        // Find all distinct prime factors
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(distinctPrimeFactors(nums));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int distinctPrimeFactors(int[] nums) {
        Set<Integer> primes = new HashSet<>();
        
        for (int num : nums) {
            for (int i = 2; i * i <= num; i++) {
                if (num % i == 0) {
                    primes.add(i);
                    while (num % i == 0) {
                        num /= i;
                    }
                }
            }
            if (num > 1) {
                primes.add(num);
            }
        }
        
        return primes.size();
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(distinctPrimeFactors(nums));
        sc.close();
    }
}`,
        examples: [
          { input: '6\n2 4 3 7 10 6', output: '4' },
          { input: '2\n2 2', output: '1' }
        ],
        testCases: [
          { input: '6\n2 4 3 7 10 6', expectedOutput: '4', isHidden: false, points: 25 },
          { input: '2\n2 2', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '3\n5 10 15', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '4\n7 11 13 17', expectedOutput: '4', isHidden: true, points: 20 },
          { input: '5\n2 3 4 5 6', expectedOutput: '3', isHidden: true, points: 20 }
        ],
        hints: [
          'Use a HashSet to store unique prime factors',
          'Factorize each number and add primes to set',
          'Time: O(n × √m) where m is max element'
        ],
        tags: ['prime', 'factorization', 'hashset']
      },
      {
        topicId: 'day-6',
        title: 'Closest Prime Numbers in Range',
        description: `Given two positive integers left and right, find the two integers num1 and num2 such that:
• left ≤ num1 < num2 ≤ right
• Both num1 and num2 are prime numbers
• num2 - num1 is minimum amongst all other pairs

Return the array as two space-separated integers. If there are multiple pairs with minimum difference, choose the one with smallest num1. If no such numbers exist, return -1 -1.

Constraints:
• 1 ≤ left ≤ right ≤ 10^6`,
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 200,
        timeLimit: 60,
        starterCode: `import java.util.*;

public class Solution {
    public static String closestPrimes(int left, int right) {
        // Find closest prime pair in range
        return "-1 -1";
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int left = sc.nextInt();
        int right = sc.nextInt();
        System.out.println(closestPrimes(left, right));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static String closestPrimes(int left, int right) {
        if (right < 2) return "-1 -1";
        
        boolean[] isPrime = new boolean[right + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        
        for (int i = 2; i * i <= right; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j <= right; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        
        int minDiff = Integer.MAX_VALUE;
        int num1 = -1, num2 = -1;
        int prev = -1;
        
        for (int i = left; i <= right; i++) {
            if (isPrime[i]) {
                if (prev != -1) {
                    int diff = i - prev;
                    if (diff < minDiff) {
                        minDiff = diff;
                        num1 = prev;
                        num2 = i;
                    }
                }
                prev = i;
            }
        }
        
        return num1 + " " + num2;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int left = sc.nextInt();
        int right = sc.nextInt();
        System.out.println(closestPrimes(left, right));
        sc.close();
    }
}`,
        examples: [
          { input: '10 19', output: '11 13' },
          { input: '4 6', output: '-1 -1' }
        ],
        testCases: [
          { input: '10 19', expectedOutput: '11 13', isHidden: false, points: 25 },
          { input: '4 6', expectedOutput: '-1 -1', isHidden: false, points: 20 },
          { input: '1 10', expectedOutput: '2 3', isHidden: true, points: 25 },
          { input: '19 31', expectedOutput: '29 31', isHidden: true, points: 30 }
        ],
        hints: [
          'Use Sieve of Eratosthenes for range',
          'Track consecutive primes',
          'Time: O(n log log n), Space: O(n)'
        ],
        tags: ['prime', 'sieve', 'twin-primes']
      },
      {
        topicId: 'day-6',
        title: 'Prime In Diagonal',
        description: `You are given a 0-indexed 2D integer array nums (n × n matrix). Return the largest prime number that lies on at least one of the diagonals of nums. In case no prime is present on any of the diagonals, return 0.

Diagonals include both main diagonal and anti-diagonal.

Constraints:
• 1 ≤ nums.length ≤ 300
• 1 ≤ nums[i][j] ≤ 4×10^6`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
    
    public static int diagonalPrime(int[][] nums) {
        // Find largest prime on diagonals
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] nums = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                nums[i][j] = sc.nextInt();
            }
        }
        System.out.println(diagonalPrime(nums));
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
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
    
    public static int diagonalPrime(int[][] nums) {
        int n = nums.length;
        int maxPrime = 0;
        
        for (int i = 0; i < n; i++) {
            // Main diagonal
            if (isPrime(nums[i][i])) {
                maxPrime = Math.max(maxPrime, nums[i][i]);
            }
            // Anti-diagonal
            if (isPrime(nums[i][n - 1 - i])) {
                maxPrime = Math.max(maxPrime, nums[i][n - 1 - i]);
            }
        }
        
        return maxPrime;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] nums = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                nums[i][j] = sc.nextInt();
            }
        }
        System.out.println(diagonalPrime(nums));
        sc.close();
    }
}`,
        examples: [
          { input: '3\n1 2 3\n5 6 7\n9 10 11', output: '11' },
          { input: '2\n1 2\n3 4', output: '3' }
        ],
        testCases: [
          { input: '3\n1 2 3\n5 6 7\n9 10 11', expectedOutput: '11', isHidden: false, points: 25 },
          { input: '2\n1 2\n3 4', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '3\n1 4 9\n16 25 36\n49 64 81', expectedOutput: '0', isHidden: true, points: 25 },
          { input: '2\n17 13\n11 19', expectedOutput: '19', isHidden: true, points: 30 }
        ],
        hints: [
          'Check main diagonal: nums[i][i]',
          'Check anti-diagonal: nums[i][n-1-i]',
          'Time: O(n × √m) where m is max value'
        ],
        tags: ['prime', 'matrix', 'diagonal']
      }
    ];

    await Question.deleteMany({ topicId: 'day-6' });
    await Question.insertMany(day6Questions);
    console.log(`✅ Inserted ${day6Questions.length} questions for Day 6`);

    // Day 7 - Computing Power
    const day7Questions = [
      {
        topicId: 'day-7',
        title: 'Pow(x, n)',
        description: `Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).

Use binary exponentiation for O(log n) time complexity.

Constraints:
• -100.0 < x < 100.0
• -2^31 ≤ n ≤ 2^31-1
• Handle negative powers`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static double myPow(double x, int n) {
        // Implement power function
        return 0.0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double x = sc.nextDouble();
        int n = sc.nextInt();
        System.out.printf("%.5f%n", myPow(x, n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static double myPow(double x, int n) {
        if (n == 0) return 1.0;
        
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        
        double result = 1.0;
        double currentProduct = x;
        
        while (N > 0) {
            if (N % 2 == 1) {
                result *= currentProduct;
            }
            currentProduct *= currentProduct;
            N /= 2;
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double x = sc.nextDouble();
        int n = sc.nextInt();
        System.out.printf("%.5f%n", myPow(x, n));
        sc.close();
    }
}`,
        examples: [
          { input: '2.0 10', output: '1024.00000' },
          { input: '2.1 3', output: '9.26100' },
          { input: '2.0 -2', output: '0.25000' }
        ],
        testCases: [
          { input: '2.0 10', expectedOutput: '1024.00000', isHidden: false, points: 20 },
          { input: '2.1 3', expectedOutput: '9.26100', isHidden: false, points: 15 },
          { input: '2.0 -2', expectedOutput: '0.25000', isHidden: false, points: 15 },
          { input: '1.0 2147483647', expectedOutput: '1.00000', isHidden: true, points: 25 },
          { input: '2.0 0', expectedOutput: '1.00000', isHidden: true, points: 25 }
        ],
        hints: [
          'Use binary exponentiation',
          'Handle negative powers by inverting x',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['math', 'binary-exponentiation', 'power']
      },
      {
        topicId: 'day-7',
        title: 'Power of Three',
        description: `Given an integer n, return 1 if it is a power of three. Otherwise, return 0.

An integer n is a power of three, if there exists an integer x such that n == 3^x.

Constraints:
• -2^31 ≤ n ≤ 2^31 - 1

Challenge: Could you solve it without loops/recursion?`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int isPowerOfThree(int n) {
        // Check if n is a power of 3
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPowerOfThree(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int isPowerOfThree(int n) {
        if (n <= 0) return 0;
        while (n % 3 == 0) {
            n /= 3;
        }
        return n == 1 ? 1 : 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPowerOfThree(n));
        sc.close();
    }
}`,
        examples: [
          { input: '27', output: '1' },
          { input: '0', output: '0' },
          { input: '9', output: '1' }
        ],
        testCases: [
          { input: '27', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '0', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '9', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '45', expectedOutput: '0', isHidden: true, points: 25 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '-1', expectedOutput: '0', isHidden: true, points: 15 }
        ],
        hints: [
          'Divide by 3 repeatedly',
          'If result is 1, it\'s a power of 3',
          'Alternative: 3^19 = 1162261467 (max in int32)',
          'Time: O(log n), Space: O(1)'
        ],
        tags: ['math', 'power']
      },
      {
        topicId: 'day-7',
        title: 'Super Pow',
        description: `Your task is to calculate a^b mod 1337 where a is a positive integer and b is an extremely large positive integer given in the form of an array.

For example, b = [1,0] represents 10, b = [3,2,1] represents 321.

Constraints:
• 1 ≤ a ≤ 2^31 - 1
• 1 ≤ b.length ≤ 2000
• 0 ≤ b[i] ≤ 9`,
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 200,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int superPow(int a, int[] b) {
        // Calculate a^b mod 1337
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int n = sc.nextInt();
        int[] b = new int[n];
        for (int i = 0; i < n; i++) {
            b[i] = sc.nextInt();
        }
        System.out.println(superPow(a, b));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    static final int MOD = 1337;
    
    public static int powMod(int a, int k) {
        a %= MOD;
        int result = 1;
        for (int i = 0; i < k; i++) {
            result = (result * a) % MOD;
        }
        return result;
    }
    
    public static int superPow(int a, int[] b) {
        if (b.length == 0) return 1;
        
        int lastDigit = b[b.length - 1];
        int[] newB = Arrays.copyOfRange(b, 0, b.length - 1);
        
        int part1 = powMod(a, lastDigit);
        int part2 = powMod(superPow(a, newB), 10);
        
        return (part1 * part2) % MOD;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int n = sc.nextInt();
        int[] b = new int[n];
        for (int i = 0; i < n; i++) {
            b[i] = sc.nextInt();
        }
        System.out.println(superPow(a, b));
        sc.close();
    }
}`,
        examples: [
          { input: '2 2\n1 0', output: '1024' },
          { input: '1 1\n4', output: '1' }
        ],
        testCases: [
          { input: '2 2\n1 0', expectedOutput: '1024', isHidden: false, points: 30 },
          { input: '1 1\n4', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '2147483647 1\n2', expectedOutput: '1198', isHidden: true, points: 50 }
        ],
        hints: [
          'Use modular arithmetic properties',
          'a^(bc) = (a^b)^c',
          'Process digits from right to left',
          'Time: O(n), Space: O(n) for recursion'
        ],
        tags: ['math', 'modular-arithmetic', 'recursion']
      },
      {
        topicId: 'day-7',
        title: 'Count Operations to Obtain Zero',
        description: `You are given two non-negative integers num1 and num2.

In one operation, if num1 >= num2, you must subtract num2 from num1. Otherwise, subtract num1 from num2.

Return the number of operations required to make either num1 = 0 or num2 = 0.

Constraints:
• 0 ≤ num1, num2 ≤ 10^5`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int countOperations(int num1, int num2) {
        // Count operations to make one zero
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num1 = sc.nextInt();
        int num2 = sc.nextInt();
        System.out.println(countOperations(num1, num2));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int countOperations(int num1, int num2) {
        int count = 0;
        while (num1 > 0 && num2 > 0) {
            if (num1 >= num2) {
                num1 -= num2;
            } else {
                num2 -= num1;
            }
            count++;
        }
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num1 = sc.nextInt();
        int num2 = sc.nextInt();
        System.out.println(countOperations(num1, num2));
        sc.close();
    }
}`,
        examples: [
          { input: '2 3', output: '3' },
          { input: '10 10', output: '1' }
        ],
        testCases: [
          { input: '2 3', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '10 10', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '5 0', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '100 1', expectedOutput: '100', isHidden: true, points: 25 },
          { input: '7 11', expectedOutput: '5', isHidden: true, points: 20 }
        ],
        hints: [
          'Simulate the process',
          'Similar to Euclidean GCD algorithm',
          'Time: O(min(num1, num2)), Space: O(1)'
        ],
        tags: ['math', 'simulation']
      },
      {
        topicId: 'day-7',
        title: 'Self Dividing Numbers',
        description: `A self-dividing number is a number that is divisible by every digit it contains.

For example, 128 is a self-dividing number because 128 % 1 == 0, 128 % 2 == 0, and 128 % 8 == 0.

A self-dividing number is not allowed to contain the digit zero.

Given two integers left and right, return a list of all the self-dividing numbers in the range [left, right]. Print each number on a new line.

Constraints:
• 1 ≤ left ≤ right ≤ 10^4`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static boolean isSelfDividing(int num) {
        int temp = num;
        while (temp > 0) {
            int digit = temp % 10;
            if (digit == 0 || num % digit != 0) {
                return false;
            }
            temp /= 10;
        }
        return true;
    }
    
    public static void selfDividingNumbers(int left, int right) {
        // Print all self-dividing numbers in range
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int left = sc.nextInt();
        int right = sc.nextInt();
        selfDividingNumbers(left, right);
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static boolean isSelfDividing(int num) {
        int temp = num;
        while (temp > 0) {
            int digit = temp % 10;
            if (digit == 0 || num % digit != 0) {
                return false;
            }
            temp /= 10;
        }
        return true;
    }
    
    public static void selfDividingNumbers(int left, int right) {
        for (int i = left; i <= right; i++) {
            if (isSelfDividing(i)) {
                System.out.println(i);
            }
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int left = sc.nextInt();
        int right = sc.nextInt();
        selfDividingNumbers(left, right);
        sc.close();
    }
}`,
        examples: [
          { input: '1 22', output: '1\n2\n3\n4\n5\n6\n7\n8\n9\n11\n12\n15\n22' },
          { input: '47 85', output: '48\n55\n66\n77' }
        ],
        testCases: [
          { input: '1 22', expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n11\n12\n15\n22', isHidden: false, points: 30 },
          { input: '47 85', expectedOutput: '48\n55\n66\n77', isHidden: false, points: 20 },
          { input: '1 1', expectedOutput: '1', isHidden: true, points: 25 },
          { input: '10 20', expectedOutput: '11\n12\n15', isHidden: true, points: 25 }
        ],
        hints: [
          'Check each number in range',
          'Extract digits and check divisibility',
          'Skip if digit is 0',
          'Time: O(n × d) where d is digits'
        ],
        tags: ['math', 'digit-manipulation']
      }
    ];

    await Question.deleteMany({ topicId: 'day-7' });
    await Question.insertMany(day7Questions);
    console.log(`✅ Inserted ${day7Questions.length} questions for Day 7`);

    // Day 8 will be in next message due to length
    console.log('\n✅ Days 6-7 populated! Run Day 8 script separately.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

populateDays6to8();
