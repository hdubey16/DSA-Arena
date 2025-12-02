import mongoose from 'mongoose';
import Question from '../models/Question';
import Topic from '../models/Topic';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa_arena';

async function populateAllDays() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create/Update topics for days 1-3
    const topics = [
      {
        id: 'day-1',
        title: 'Analysis of Algorithms & Order of Growth',
        description: 'Master basic algorithms with simple loops and derive time/space complexity from code.',
        week: 1,
        day: 1,
        difficulty: 'Easy',
        estimatedTime: 120,
        prerequisites: [],
        compulsoryQuestion: 'Count Digits in an Integer',
        practiceQuestions: 5,
        isLocked: false
      },
      {
        id: 'day-2',
        title: 'Asymptotic Notations (Big O, Omega, Theta)',
        description: 'Understand asymptotic analysis through searching and complexity comparison problems.',
        week: 1,
        day: 2,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-1'],
        compulsoryQuestion: 'Linear Search in Unsorted Array',
        practiceQuestions: 5,
        isLocked: false
      },
      {
        id: 'day-3',
        title: 'Space Complexity & Recursion Analysis',
        description: 'Analyze space complexity and master recursion with call stack analysis.',
        week: 1,
        day: 3,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-1', 'day-2'],
        compulsoryQuestion: 'Recursive Factorial',
        practiceQuestions: 5,
        isLocked: false
      }
    ];

    await Topic.deleteMany({ day: { $in: [1, 2, 3] } });
    const createdTopics = await Topic.insertMany(topics);
    console.log('✅ Created 3 topics');

    const topicIds = createdTopics.map(t => t.id);
    await Question.deleteMany({ topicId: { $in: topicIds } });

    // ==================== DAY 1 QUESTIONS ====================
    const day1Questions = [
      {
        topicId: 'day-1',
        title: 'Count Digits in an Integer',
        description: `You are given an integer n. Return the number of digits in its decimal representation.

Constraints:
• −10^9 ≤ n ≤ 10^9

Goal: Write an iterative solution and state its time and space complexity.`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int countDigits(int n) {
        // Handle negative numbers and zero
        // Count digits iteratively
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countDigits(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int countDigits(int n) {
        if (n == 0) return 1;
        
        n = Math.abs(n); // Handle negative numbers
        int count = 0;
        
        while (n > 0) {
            count++;
            n /= 10;
        }
        
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countDigits(n));
        sc.close();
    }
}`,
        examples: [
          { input: '0', output: '1' },
          { input: '12345', output: '5' },
          { input: '-999', output: '3' }
        ],
        testCases: [
          { input: '0', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '12345', expectedOutput: '5', isHidden: false, points: 10 },
          { input: '-999', expectedOutput: '3', isHidden: false, points: 10 },
          { input: '1000000000', expectedOutput: '10', isHidden: true, points: 20 },
          { input: '-1000000000', expectedOutput: '10', isHidden: true, points: 20 },
          { input: '7', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '-42', expectedOutput: '2', isHidden: true, points: 15 }
        ],
        hints: [
          'Handle the special case when n = 0',
          'Use Math.abs() to handle negative numbers',
          'Divide by 10 repeatedly until n becomes 0',
          'Time Complexity: O(log₁₀ n), Space: O(1)'
        ],
        tags: ['math', 'iteration', 'basic']
      },
      {
        topicId: 'day-1',
        title: 'Sum of First N Natural Numbers',
        description: `Given an integer n, return the sum of all integers from 1 to n.

Tasks:
1. Implement using a loop
2. Implement using the formula n⋅(n+1)/2
3. Compare the time complexity of both approaches

Constraints: 0 ≤ n ≤ 10^6`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    // Method 1: Using loop - O(n)
    public static long sumUsingLoop(int n) {
        // Your code here
        return 0;
    }
    
    // Method 2: Using formula - O(1)
    public static long sumUsingFormula(int n) {
        // Formula: n * (n + 1) / 2
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(sumUsingFormula(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static long sumUsingLoop(int n) {
        long sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }
    
    public static long sumUsingFormula(int n) {
        return (long) n * (n + 1) / 2;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(sumUsingFormula(n));
        sc.close();
    }
}`,
        examples: [
          { input: '5', output: '15' },
          { input: '10', output: '55' },
          { input: '0', output: '0' }
        ],
        testCases: [
          { input: '5', expectedOutput: '15', isHidden: false, points: 10 },
          { input: '10', expectedOutput: '55', isHidden: false, points: 10 },
          { input: '0', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '100', expectedOutput: '5050', isHidden: true, points: 20 },
          { input: '1000', expectedOutput: '500500', isHidden: true, points: 20 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '50000', expectedOutput: '1250025000', isHidden: true, points: 15 }
        ],
        hints: [
          'Loop approach: O(n) time, O(1) space',
          'Formula approach: O(1) time, O(1) space',
          'Formula is: n * (n + 1) / 2',
          'Use long to avoid overflow'
        ],
        tags: ['math', 'formula', 'loop', 'optimization']
      },
      {
        topicId: 'day-1',
        title: 'Find Maximum Element in an Array',
        description: `Given an integer array nums, return the maximum element. Assume the array has at least one element.

Constraints:
• 1 ≤ nums.length ≤ 10^5
• −10^9 ≤ nums[i] ≤ 10^9`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int findMax(int[] nums) {
        // Find and return the maximum element
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(findMax(nums));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int findMax(int[] nums) {
        int max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > max) {
                max = nums[i];
            }
        }
        return max;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(findMax(nums));
        sc.close();
    }
}`,
        examples: [
          { input: '5\n3 7 1 4 2', output: '7' },
          { input: '3\n-5 -2 -8', output: '-2' },
          { input: '1\n42', output: '42' }
        ],
        testCases: [
          { input: '5\n3 7 1 4 2', expectedOutput: '7', isHidden: false, points: 15 },
          { input: '3\n-5 -2 -8', expectedOutput: '-2', isHidden: false, points: 15 },
          { input: '1\n42', expectedOutput: '42', isHidden: false, points: 10 },
          { input: '4\n1 2 3 4', expectedOutput: '4', isHidden: true, points: 20 },
          { input: '4\n4 3 2 1', expectedOutput: '4', isHidden: true, points: 20 },
          { input: '6\n-1000000000 999999999 0 -5 10 999999999', expectedOutput: '999999999', isHidden: true, points: 20 }
        ],
        hints: [
          'Initialize max with the first element',
          'Scan through array once',
          'Time Complexity: O(n), Space: O(1)'
        ],
        tags: ['array', 'iteration', 'basic']
      },
      {
        topicId: 'day-1',
        title: 'Check if Array is Sorted',
        description: `Given an integer array nums, determine if it is sorted in non-decreasing order. Return 1 if it is sorted, 0 otherwise.

Constraints:
• 1 ≤ nums.length ≤ 10^5
• −10^9 ≤ nums[i] ≤ 10^9`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int isSorted(int[] nums) {
        // Return 1 if sorted, 0 otherwise
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(isSorted(nums));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int isSorted(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < nums[i - 1]) {
                return 0;
            }
        }
        return 1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(isSorted(nums));
        sc.close();
    }
}`,
        examples: [
          { input: '4\n1 2 3 4', output: '1' },
          { input: '4\n1 3 2 4', output: '0' },
          { input: '3\n5 5 5', output: '1' }
        ],
        testCases: [
          { input: '4\n1 2 3 4', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '4\n1 3 2 4', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '3\n5 5 5', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '1\n7', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '5\n1 1 2 2 3', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '5\n5 4 3 2 1', expectedOutput: '0', isHidden: true, points: 25 }
        ],
        hints: [
          'Compare each element with the previous one',
          'If any element is less than previous, return 0',
          'Time Complexity: O(n), Space: O(1)'
        ],
        tags: ['array', 'iteration', 'sorting-check']
      },
      {
        topicId: 'day-1',
        title: 'Frequency Count of Elements',
        description: `You are given an array of integers nums. For each distinct value, output its frequency (how many times it appears) in the format: value:frequency, one per line, sorted by value.

Constraints:
• 1 ≤ nums.length ≤ 10^5
• −10^9 ≤ nums[i] ≤ 10^9`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static void printFrequency(int[] nums) {
        // Use HashMap to count frequencies
        // Print in sorted order of keys
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        printFrequency(nums);
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static void printFrequency(int[] nums) {
        TreeMap<Integer, Integer> freq = new TreeMap<>();
        
        for (int num : nums) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }
        
        for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
            System.out.println(entry.getKey() + ":" + entry.getValue());
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        printFrequency(nums);
        sc.close();
    }
}`,
        examples: [
          { input: '5\n1 2 1 2 3', output: '1:2\n2:2\n3:1' },
          { input: '3\n5 5 5', output: '5:3' },
          { input: '4\n4 3 2 1', output: '1:1\n2:1\n3:1\n4:1' }
        ],
        testCases: [
          { input: '5\n1 2 1 2 3', expectedOutput: '1:2\n2:2\n3:1', isHidden: false, points: 15 },
          { input: '3\n5 5 5', expectedOutput: '5:3', isHidden: false, points: 15 },
          { input: '4\n4 3 2 1', expectedOutput: '1:1\n2:1\n3:1\n4:1', isHidden: false, points: 10 },
          { input: '6\n1 1 1 2 2 3', expectedOutput: '1:3\n2:2\n3:1', isHidden: true, points: 20 },
          { input: '1\n42', expectedOutput: '42:1', isHidden: true, points: 20 },
          { input: '7\n-1 0 1 -1 0 1 2', expectedOutput: '-1:2\n0:2\n1:2\n2:1', isHidden: true, points: 20 }
        ],
        hints: [
          'Use TreeMap to maintain sorted order',
          'TreeMap automatically sorts by key',
          'Time Complexity: O(n log n), Space: O(n)'
        ],
        tags: ['hashmap', 'frequency', 'sorting']
      }
    ];

    await Question.insertMany(day1Questions);
    console.log(`✅ Inserted ${day1Questions.length} questions for Day 1`);

    // ==================== DAY 2 QUESTIONS ====================
    const day2Questions = [
      {
        topicId: 'day-2',
        title: 'Linear Search in Unsorted Array',
        description: `Given an integer array nums and an integer target, return the index of target if it exists, otherwise return -1.
You must scan the array from left to right.

Constraints:
• 1 ≤ nums.length ≤ 10^5
• −10^9 ≤ nums[i], target ≤ 10^9`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int linearSearch(int[] nums, int target) {
        // Search for target and return index or -1
        return -1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        int target = sc.nextInt();
        System.out.println(linearSearch(nums, target));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int linearSearch(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        int target = sc.nextInt();
        System.out.println(linearSearch(nums, target));
        sc.close();
    }
}`,
        examples: [
          { input: '5\n3 7 1 4 2\n7', output: '1' },
          { input: '4\n1 2 3 4\n5', output: '-1' },
          { input: '3\n10 20 30\n10', output: '0' }
        ],
        testCases: [
          { input: '5\n3 7 1 4 2\n7', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '4\n1 2 3 4\n5', expectedOutput: '-1', isHidden: false, points: 15 },
          { input: '3\n10 20 30\n10', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '6\n9 8 7 6 5 4\n5', expectedOutput: '4', isHidden: true, points: 20 },
          { input: '1\n42\n42', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '5\n-5 -3 0 3 5\n0', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        hints: [
          'Iterate through the array from left to right',
          'Return index immediately when found',
          'Time Complexity: O(n), Space: O(1)'
        ],
        tags: ['array', 'search', 'linear-search']
      },
      {
        topicId: 'day-2',
        title: 'Binary Search in Sorted Array',
        description: `Given a sorted (in ascending order) integer array nums and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.

You must write an algorithm with O(log n) time complexity.

Constraints:
• 1 ≤ nums.length ≤ 10^5
• −10^9 ≤ nums[i], target ≤ 10^9
• All elements in nums are unique and sorted in ascending order`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int binarySearch(int[] nums, int target) {
        // Implement binary search
        return -1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        int target = sc.nextInt();
        System.out.println(binarySearch(nums, target));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int binarySearch(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        int target = sc.nextInt();
        System.out.println(binarySearch(nums, target));
        sc.close();
    }
}`,
        examples: [
          { input: '6\n-1 0 3 5 9 12\n9', output: '4' },
          { input: '6\n-1 0 3 5 9 12\n2', output: '-1' },
          { input: '1\n5\n5', output: '0' }
        ],
        testCases: [
          { input: '6\n-1 0 3 5 9 12\n9', expectedOutput: '4', isHidden: false, points: 15 },
          { input: '6\n-1 0 3 5 9 12\n2', expectedOutput: '-1', isHidden: false, points: 15 },
          { input: '1\n5\n5', expectedOutput: '0', isHidden: false, points: 10 },
          { input: '5\n1 2 3 4 5\n1', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '5\n1 2 3 4 5\n5', expectedOutput: '4', isHidden: true, points: 20 },
          { input: '7\n-10 -5 0 5 10 15 20\n15', expectedOutput: '5', isHidden: true, points: 20 }
        ],
        hints: [
          'Use two pointers: left and right',
          'Calculate mid = left + (right - left) / 2',
          'Time Complexity: O(log n), Space: O(1)'
        ],
        tags: ['array', 'binary-search', 'sorted']
      },
      {
        topicId: 'day-2',
        title: 'Second Largest Element in Array',
        description: `Given an integer array nums with at least 2 distinct elements, return the second largest distinct value. If no such element exists (e.g., all elements equal), return -1.

Constraints:
• 2 ≤ nums.length ≤ 10^5
• −10^9 ≤ nums[i] ≤ 10^9`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int findSecondLargest(int[] nums) {
        // Find second largest distinct element
        return -1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(findSecondLargest(nums));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int findSecondLargest(int[] nums) {
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        
        for (int num : nums) {
            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                second = num;
            }
        }
        
        return (second == Integer.MIN_VALUE) ? -1 : second;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(findSecondLargest(nums));
        sc.close();
    }
}`,
        examples: [
          { input: '5\n5 3 7 4 2', output: '5' },
          { input: '3\n10 10 10', output: '-1' },
          { input: '4\n1 2 2 1', output: '1' }
        ],
        testCases: [
          { input: '5\n5 3 7 4 2', expectedOutput: '5', isHidden: false, points: 15 },
          { input: '3\n10 10 10', expectedOutput: '-1', isHidden: false, points: 15 },
          { input: '4\n1 2 2 1', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '6\n9 9 8 8 7 7', expectedOutput: '8', isHidden: true, points: 20 },
          { input: '2\n5 10', expectedOutput: '5', isHidden: true, points: 20 },
          { input: '5\n-5 -3 -1 -3 -5', expectedOutput: '-3', isHidden: true, points: 20 }
        ],
        hints: [
          'Track two variables: first and second largest',
          'Handle duplicates carefully',
          'Time Complexity: O(n), Space: O(1)'
        ],
        tags: ['array', 'two-pointer', 'max-finding']
      },
      {
        topicId: 'day-2',
        title: 'Print All Pairs in an Array',
        description: `Given an integer array nums, print all ordered pairs (i, j) such that 0 ≤ i < j < n in the format "i,j" (one per line), and then print the total count.

This problem demonstrates O(n²) complexity.

Constraints:
• 2 ≤ nums.length ≤ 100`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static void printAllPairs(int[] nums) {
        // Print all pairs (i,j) where i < j
        // Then print total count
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        printAllPairs(nums);
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static void printAllPairs(int[] nums) {
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                System.out.println(nums[i] + "," + nums[j]);
                count++;
            }
        }
        System.out.println(count);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        printAllPairs(nums);
        sc.close();
    }
}`,
        examples: [
          { input: '3\n1 2 3', output: '1,2\n1,3\n2,3\n3' },
          { input: '2\n5 10', output: '5,10\n1' }
        ],
        testCases: [
          { input: '3\n1 2 3', expectedOutput: '1,2\n1,3\n2,3\n3', isHidden: false, points: 20 },
          { input: '2\n5 10', expectedOutput: '5,10\n1', isHidden: false, points: 20 },
          { input: '4\n1 2 3 4', expectedOutput: '1,2\n1,3\n1,4\n2,3\n2,4\n3,4\n6', isHidden: true, points: 30 },
          { input: '5\n10 20 30 40 50', expectedOutput: '10,20\n10,30\n10,40\n10,50\n20,30\n20,40\n20,50\n30,40\n30,50\n40,50\n10', isHidden: true, points: 30 }
        ],
        hints: [
          'Use nested loops: outer from 0 to n-1, inner from i+1 to n-1',
          'Total pairs = n*(n-1)/2',
          'Time Complexity: O(n²), Space: O(1)'
        ],
        tags: ['array', 'nested-loops', 'pairs']
      },
      {
        topicId: 'day-2',
        title: 'Matrix Multiplication Complexity Analysis',
        description: `Given two matrices A and B of size n × n, compute the product matrix C = A × B and output the resulting matrix.

This demonstrates O(n³) complexity for standard matrix multiplication.

Constraints:
• 1 ≤ n ≤ 50
• −100 ≤ matrix[i][j] ≤ 100`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int[][] multiplyMatrix(int[][] A, int[][] B, int n) {
        int[][] C = new int[n][n];
        // Implement matrix multiplication
        return C;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] A = new int[n][n];
        int[][] B = new int[n][n];
        
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                A[i][j] = sc.nextInt();
                
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                B[i][j] = sc.nextInt();
        
        int[][] C = multiplyMatrix(A, B, n);
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(C[i][j] + " ");
            }
            System.out.println();
        }
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int[][] multiplyMatrix(int[][] A, int[][] B, int n) {
        int[][] C = new int[n][n];
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                C[i][j] = 0;
                for (int k = 0; k < n; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        
        return C;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] A = new int[n][n];
        int[][] B = new int[n][n];
        
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                A[i][j] = sc.nextInt();
                
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                B[i][j] = sc.nextInt();
        
        int[][] C = multiplyMatrix(A, B, n);
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(C[i][j] + " ");
            }
            System.out.println();
        }
        sc.close();
    }
}`,
        examples: [
          { input: '2\n1 2\n3 4\n5 6\n7 8', output: '19 22 \n43 50 ' }
        ],
        testCases: [
          { input: '2\n1 2\n3 4\n5 6\n7 8', expectedOutput: '19 22 \n43 50 ', isHidden: false, points: 30 },
          { input: '2\n1 0\n0 1\n2 3\n4 5', expectedOutput: '2 3 \n4 5 ', isHidden: false, points: 30 },
          { input: '3\n1 2 3\n4 5 6\n7 8 9\n1 0 0\n0 1 0\n0 0 1', expectedOutput: '1 2 3 \n4 5 6 \n7 8 9 ', isHidden: true, points: 40 }
        ],
        hints: [
          'Use three nested loops: i, j, k',
          'C[i][j] = sum of A[i][k] * B[k][j] for all k',
          'Time Complexity: O(n³), Space: O(n²)'
        ],
        tags: ['matrix', 'multiplication', 'nested-loops']
      }
    ];

    await Question.insertMany(day2Questions);
    console.log(`✅ Inserted ${day2Questions.length} questions for Day 2`);

    // ==================== DAY 3 QUESTIONS ====================
    const day3Questions = [
      {
        topicId: 'day-3',
        title: 'Recursive Factorial',
        description: `Given an integer n, return n! (n factorial) computed using recursion. Assume 0! = 1.

Tasks:
• Write the recursive function
• Analyze time complexity in terms of n
• Analyze extra space due to the recursion call stack

Constraints: 0 ≤ n ≤ 12 (to avoid overflow)`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static long factorial(int n) {
        // Base case: 0! = 1
        // Recursive case: n! = n * (n-1)!
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(factorial(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static long factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(factorial(n));
        sc.close();
    }
}`,
        examples: [
          { input: '4', output: '24' },
          { input: '0', output: '1' },
          { input: '5', output: '120' }
        ],
        testCases: [
          { input: '4', expectedOutput: '24', isHidden: false, points: 15 },
          { input: '0', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '5', expectedOutput: '120', isHidden: false, points: 10 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 15 },
          { input: '10', expectedOutput: '3628800', isHidden: true, points: 20 },
          { input: '12', expectedOutput: '479001600', isHidden: true, points: 25 }
        ],
        hints: [
          'Base case: if n is 0 or 1, return 1',
          'Recursive case: n * factorial(n-1)',
          'Time Complexity: O(n), Space: O(n) for call stack'
        ],
        tags: ['recursion', 'math', 'factorial']
      },
      {
        topicId: 'day-3',
        title: 'Recursive Fibonacci (Naive)',
        description: `Given an integer n, return the nth Fibonacci number using purely recursive definition:
F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n ≥ 2.

Discuss why this is inefficient and what its time complexity is.

Constraints: 0 ≤ n ≤ 30 (larger values will be too slow)`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static long fibonacci(int n) {
        // Base cases: F(0) = 0, F(1) = 1
        // Recursive: F(n) = F(n-1) + F(n-2)
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(fibonacci(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static long fibonacci(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(fibonacci(n));
        sc.close();
    }
}`,
        examples: [
          { input: '4', output: '3' },
          { input: '0', output: '0' },
          { input: '6', output: '8' }
        ],
        testCases: [
          { input: '4', expectedOutput: '3', isHidden: false, points: 15 },
          { input: '0', expectedOutput: '0', isHidden: false, points: 15 },
          { input: '6', expectedOutput: '8', isHidden: false, points: 10 },
          { input: '10', expectedOutput: '55', isHidden: true, points: 20 },
          { input: '15', expectedOutput: '610', isHidden: true, points: 20 },
          { input: '1', expectedOutput: '1', isHidden: true, points: 20 }
        ],
        hints: [
          'Two base cases: n=0 returns 0, n=1 returns 1',
          'Each call branches into two recursive calls',
          'Time Complexity: O(2ⁿ) - exponential!',
          'Space Complexity: O(n) for call stack depth'
        ],
        tags: ['recursion', 'fibonacci', 'exponential']
      },
      {
        topicId: 'day-3',
        title: 'Sum of Array Elements Using Recursion',
        description: `Given an array nums and its length n, write a recursive function that returns the sum of its elements.

Constraints:
• 1 ≤ nums.length ≤ 1000
• −10^6 ≤ nums[i] ≤ 10^6`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static long sumArray(int[] nums, int n) {
        // Base case: if n == 0, return 0
        // Recursive: nums[n-1] + sumArray(nums, n-1)
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(sumArray(nums, n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static long sumArray(int[] nums, int n) {
        if (n == 0) return 0;
        return nums[n - 1] + sumArray(nums, n - 1);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(sumArray(nums, n));
        sc.close();
    }
}`,
        examples: [
          { input: '5\n1 2 3 4 5', output: '15' },
          { input: '3\n10 -5 5', output: '10' },
          { input: '1\n42', output: '42' }
        ],
        testCases: [
          { input: '5\n1 2 3 4 5', expectedOutput: '15', isHidden: false, points: 15 },
          { input: '3\n10 -5 5', expectedOutput: '10', isHidden: false, points: 15 },
          { input: '1\n42', expectedOutput: '42', isHidden: false, points: 10 },
          { input: '4\n-1 -2 -3 -4', expectedOutput: '-10', isHidden: true, points: 20 },
          { input: '6\n0 0 0 0 0 0', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '7\n100 200 300 -100 -200 -300 1000', expectedOutput: '1000', isHidden: true, points: 20 }
        ],
        hints: [
          'Base case: if n == 0, sum is 0',
          'Recursive: add last element to sum of rest',
          'Time: O(n), Space: O(n) for recursion stack'
        ],
        tags: ['recursion', 'array', 'sum']
      },
      {
        topicId: 'day-3',
        title: 'Check Palindrome String Using Recursion',
        description: `Given a string s, determine whether it is a palindrome using recursion. A palindrome reads the same forwards and backwards.

Return 1 if palindrome, 0 otherwise.

Constraints:
• 1 ≤ s.length ≤ 1000
• s consists of lowercase English letters only`,
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int isPalindrome(String s, int left, int right) {
        // Base case: if left >= right, it's a palindrome
        // Check if s[left] == s[right], then recurse
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(isPalindrome(s, 0, s.length() - 1));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int isPalindrome(String s, int left, int right) {
        if (left >= right) return 1;
        
        if (s.charAt(left) != s.charAt(right)) return 0;
        
        return isPalindrome(s, left + 1, right - 1);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(isPalindrome(s, 0, s.length() - 1));
        sc.close();
    }
}`,
        examples: [
          { input: 'racecar', output: '1' },
          { input: 'abc', output: '0' },
          { input: 'a', output: '1' }
        ],
        testCases: [
          { input: 'racecar', expectedOutput: '1', isHidden: false, points: 15 },
          { input: 'abc', expectedOutput: '0', isHidden: false, points: 15 },
          { input: 'a', expectedOutput: '1', isHidden: false, points: 10 },
          { input: 'abba', expectedOutput: '1', isHidden: true, points: 20 },
          { input: 'abcba', expectedOutput: '1', isHidden: true, points: 20 },
          { input: 'abcd', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        hints: [
          'Use two pointers: left and right',
          'Base case: if left >= right, return true',
          'Check if characters at both ends match',
          'Time: O(n), Space: O(n) for recursion'
        ],
        tags: ['recursion', 'string', 'palindrome']
      },
      {
        topicId: 'day-3',
        title: 'Count Digits Using Recursion',
        description: `Given an integer n (possibly negative), write a recursive function that returns the number of digits in n.

Constraints: −10^9 ≤ n ≤ 10^9`,
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int countDigits(int n) {
        // Handle base cases: n == 0
        // Recursive: 1 + countDigits(n / 10)
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countDigits(Math.abs(n)));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int countDigits(int n) {
        if (n == 0) return 1;
        if (n < 10) return 1;
        return 1 + countDigits(n / 10);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countDigits(Math.abs(n)));
        sc.close();
    }
}`,
        examples: [
          { input: '12345', output: '5' },
          { input: '0', output: '1' },
          { input: '-999', output: '3' }
        ],
        testCases: [
          { input: '12345', expectedOutput: '5', isHidden: false, points: 15 },
          { input: '0', expectedOutput: '1', isHidden: false, points: 15 },
          { input: '-999', expectedOutput: '3', isHidden: false, points: 10 },
          { input: '7', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '1000000000', expectedOutput: '10', isHidden: true, points: 20 },
          { input: '-123456', expectedOutput: '6', isHidden: true, points: 20 }
        ],
        hints: [
          'Base case: if n < 10, return 1',
          'Recursive: 1 + countDigits(n / 10)',
          'Handle n = 0 as special case',
          'Time: O(log n), Space: O(log n)'
        ],
        tags: ['recursion', 'math', 'digits']
      }
    ];

    await Question.insertMany(day3Questions);
    console.log(`✅ Inserted ${day3Questions.length} questions for Day 3`);

    console.log('\n🎉 Successfully populated ALL questions for Days 1-3!');
    console.log('Total: 15 questions (5 per day)');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

populateAllDays();
