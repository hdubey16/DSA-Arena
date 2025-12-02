import mongoose from 'mongoose';
import Question from '../models/Question';
import Topic from '../models/Topic';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa_arena';

async function populateQuestions() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create topics for days 1-3
    const topics = [
      {
        id: 'day-1',
        title: 'Analysis of Algorithms & Order of Growth',
        description: 'Learn to analyze algorithm efficiency',
        week: 1,
        day: 1,
        difficulty: 'Easy',
        estimatedTime: 120,
        prerequisites: [],
        compulsoryQuestion: 'Calculate time complexity of nested loops',
        practiceQuestions: 5,
        isLocked: false
      },
      {
        id: 'day-2',
        title: 'Asymptotic Notations (Big O, Omega, Theta)',
        description: 'Master asymptotic notations',
        week: 1,
        day: 2,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-1'],
        compulsoryQuestion: 'Analyze Linear Search complexity',
        practiceQuestions: 5,
        isLocked: false
      },
      {
        id: 'day-3',
        title: 'Space Complexity & Recursion Analysis',
        description: 'Understand space complexity analysis',
        week: 1,
        day: 3,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-1', 'day-2'],
        compulsoryQuestion: 'Calculate space complexity of Fibonacci',
        practiceQuestions: 5,
        isLocked: false
      }
    ];

    // Delete existing topics for days 1-3
    await Topic.deleteMany({ day: { $in: [1, 2, 3] } });
    
    // Insert topics
    const createdTopics = await Topic.insertMany(topics);
    console.log('✅ Created 3 topics');

    // Delete existing questions for these topics
    const topicIds = createdTopics.map(t => t.id);
    await Question.deleteMany({ topicId: { $in: topicIds } });

    // Create questions for Day 1
    const day1Questions = [
      {
        topicId: 'day-1',
        title: 'Algorithm Time Complexity Comparison',
        description: 'Given two algorithms with time complexities O(n²) and O(n log n), determine which is faster for given n.',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static String compareComplexity(int n) {
        // Compare n² with n*log₂(n)
        // Return "NLOGN_FASTER", "EQUAL", or "N2_FASTER"
        return "";
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(compareComplexity(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static String compareComplexity(int n) {
        double nSquared = n * n;
        double nLogN = n * (Math.log(n) / Math.log(2));
        
        if (Math.abs(nSquared - nLogN) < 0.0001) return "EQUAL";
        return nLogN < nSquared ? "NLOGN_FASTER" : "N2_FASTER";
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(compareComplexity(n));
        sc.close();
    }
}`,
        examples: [
          { input: '10', output: 'N2_FASTER' },
          { input: '64', output: 'NLOGN_FASTER' }
        ],
        testCases: [
          { input: '1', expectedOutput: 'EQUAL', isHidden: false, points: 10 },
          { input: '2', expectedOutput: 'N2_FASTER', isHidden: false, points: 10 },
          { input: '64', expectedOutput: 'NLOGN_FASTER', isHidden: true, points: 20 },
          { input: '100', expectedOutput: 'NLOGN_FASTER', isHidden: true, points: 20 }
        ],
        hints: ['Use Math.log(n) / Math.log(2) for log₂(n)'],
        tags: ['analysis', 'complexity', 'comparison']
      },
      {
        topicId: 'day-1',
        title: 'Count Nested Loop Operations',
        description: 'Calculate exact number of operations in nested loop: for(i=1; i<=n; i++) for(j=1; j<=i; j++) count++',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static long countOperations(int n) {
        // Calculate exact number of operations
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countOperations(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static long countOperations(int n) {
        return (long)n * (n + 1) / 2;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countOperations(n));
        sc.close();
    }
}`,
        examples: [
          { input: '3', output: '6' },
          { input: '5', output: '15' }
        ],
        testCases: [
          { input: '1', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '5', expectedOutput: '15', isHidden: false, points: 10 },
          { input: '10', expectedOutput: '55', isHidden: true, points: 20 },
          { input: '100', expectedOutput: '5050', isHidden: true, points: 20 }
        ],
        hints: ['Formula: n*(n+1)/2'],
        tags: ['analysis', 'nested-loops', 'arithmetic-series']
      },
      {
        topicId: 'day-1',
        title: 'Analyze Logarithmic Loop',
        description: 'Count iterations: i=n; while(i>=1){ i=i/2; }',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 100,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int countIterations(int n) {
        int count = 0;
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countIterations(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int countIterations(int n) {
        int count = 0;
        int i = n;
        while(i >= 1) {
            count++;
            i = i / 2;
        }
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countIterations(n));
        sc.close();
    }
}`,
        examples: [
          { input: '8', output: '4' },
          { input: '16', output: '5' }
        ],
        testCases: [
          { input: '1', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '8', expectedOutput: '4', isHidden: false, points: 10 },
          { input: '64', expectedOutput: '7', isHidden: true, points: 20 },
          { input: '1024', expectedOutput: '11', isHidden: true, points: 20 }
        ],
        hints: ['This is log₂(n) + 1'],
        tags: ['analysis', 'logarithmic', 'loops']
      },
      {
        topicId: 'day-1',
        title: 'Geometric Loop Complexity',
        description: 'Count operations: for(i=1; i<=n; i*=3) for(j=1; j<=i; j++) count++',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static long countGeometricOperations(int n) {
        long total = 0;
        return total;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countGeometricOperations(n));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static long countGeometricOperations(int n) {
        long total = 0;
        for(int i = 1; i <= n; i *= 3) {
            total += i;
        }
        return total;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(countGeometricOperations(n));
        sc.close();
    }
}`,
        examples: [
          { input: '10', output: '13' },
          { input: '30', output: '40' }
        ],
        testCases: [
          { input: '1', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '10', expectedOutput: '13', isHidden: false, points: 10 },
          { input: '100', expectedOutput: '121', isHidden: true, points: 20 },
          { input: '1000', expectedOutput: '1093', isHidden: true, points: 20 }
        ],
        hints: ['Geometric series: 1+3+9+27+...'],
        tags: ['analysis', 'geometric-series', 'nested-loops']
      },
      {
        topicId: 'day-1',
        title: 'Rank Growth Rates',
        description: 'Rank complexity functions by growth rate. Input 1-6, output rank where 1=slowest.',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 150,
        timeLimit: 30,
        starterCode: `import java.util.*;

public class Solution {
    public static int rankGrowthRate(int functionId) {
        // 1: O(log log n), 2: O(√n), 3: O(n/log n)
        // 4: O(n log n), 5: O(n^3/2), 6: O(2^n)
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int id = sc.nextInt();
        System.out.println(rankGrowthRate(id));
        sc.close();
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int rankGrowthRate(int functionId) {
        Map<Integer, Integer> ranks = new HashMap<>();
        ranks.put(1, 1); // log log n
        ranks.put(2, 2); // √n
        ranks.put(3, 3); // n/log n
        ranks.put(4, 4); // n log n
        ranks.put(5, 5); // n^3/2
        ranks.put(6, 6); // 2^n
        return ranks.get(functionId);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int id = sc.nextInt();
        System.out.println(rankGrowthRate(id));
        sc.close();
    }
}`,
        examples: [
          { input: '1', output: '1' },
          { input: '6', output: '6' }
        ],
        testCases: [
          { input: '1', expectedOutput: '1', isHidden: false, points: 10 },
          { input: '6', expectedOutput: '6', isHidden: false, points: 10 },
          { input: '4', expectedOutput: '4', isHidden: true, points: 15 },
          { input: '2', expectedOutput: '2', isHidden: true, points: 15 },
          { input: '5', expectedOutput: '5', isHidden: true, points: 15 }
        ],
        hints: ['Order: log log n < √n < n/log n < n log n < n^3/2 < 2^n'],
        tags: ['analysis', 'growth-rates', 'comparison']
      }
    ];

    await Question.insertMany(day1Questions);
    console.log(`✅ Inserted ${day1Questions.length} questions for Day 1`);

    console.log('\n🎉 Successfully populated Day 1 questions!');
    console.log('Run this script again to add Day 2 and Day 3 questions.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

populateQuestions();
