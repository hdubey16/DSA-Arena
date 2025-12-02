import mongoose from 'mongoose';
import Question from '../models/Question';
import Topic from '../models/Topic';
import dotenv from 'dotenv';

dotenv.config();

function createQuestion(data: any) {
  return {
    topicId: data.topicId,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    points: 100,
    timeLimit: 2000,
    starterCode: data.starterCode || `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    solution: data.solution,
    examples: data.examples,
    testCases: data.testCases,
    hints: data.hints || [],
    tags: data.tags || []
  };
}

const topicsData: any[] = [
  {
    id: 'day-85-greedy-intervals',
    title: 'Greedy Interval Selection',
    description: 'Non-overlapping intervals, burst balloons, merge intervals, pair chain',
    week: 13,
    day: 85,
    difficulty: 'Medium',
    estimatedTime: 120,
    prerequisites: [],
    compulsoryQuestion: 'Non-overlapping Intervals',
    practiceQuestions: 5
  },
  {
    id: 'day-86-fractional-knapsack',
    title: 'Fractional Knapsack & Greedy',
    description: 'Maximum units on truck, bag of tokens, max rocks, break palindrome',
    week: 13,
    day: 86,
    difficulty: 'Medium',
    estimatedTime: 125,
    prerequisites: ['day-85-greedy-intervals'],
    compulsoryQuestion: 'Maximum Units on a Truck',
    practiceQuestions: 5
  },
  {
    id: 'day-87-job-scheduling',
    title: 'Job Sequencing & Huffman Coding',
    description: 'Connect sticks (Huffman), task scheduler, reorganize string, water garden',
    week: 13,
    day: 87,
    difficulty: 'Medium',
    estimatedTime: 130,
    prerequisites: ['day-86-fractional-knapsack'],
    compulsoryQuestion: 'Minimum Cost to Connect Sticks',
    practiceQuestions: 5
  }
];

async function populateDays85to87() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    console.log('📝 Creating Topics...\n');
    for (const topicData of topicsData) {
      const existing = await Topic.findOne({ id: topicData.id });
      if (!existing) {
        await Topic.create(topicData);
        console.log(`  ✅ Created: Day ${topicData.day} - ${topicData.title}`);
      } else {
        console.log(`  ⏭️  Exists: Day ${topicData.day}`);
      }
    }

    console.log('\n📝 Creating Questions...\n');
    
    const questions = [
      // Day 85: Greedy Intervals
      createQuestion({
        topicId: 'day-85-greedy-intervals',
        title: 'Non-overlapping Intervals',
        description: 'Given array of intervals, remove minimum number of intervals to make all remaining non-overlapping.',
        difficulty: 'Medium',
        tags: ['Greedy', 'Intervals', 'Array'],
        examples: [{ input: '[[1,2],[2,3],[3,4],[1,3]]', output: '1' }],
        testCases: [
          { input: '[[1,2],[2,3],[3,4],[1,3]]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[[0,2],[1,3],[2,4],[3,5],[4,6]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,2]]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[[1,2],[1,2],[1,2]]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[[0,2],[1,3],[1,2],[2,4],[3,5],[3,7]]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
        int end = Integer.MIN_VALUE, count = 0;
        for (int[] interval : intervals) {
            if (interval[0] >= end) {
                end = interval[1];
            } else {
                count++;
            }
        }
        return count;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-85-greedy-intervals',
        title: 'Minimum Number of Arrows to Burst Balloons',
        description: 'Return minimum arrows needed to burst all balloons.',
        difficulty: 'Medium',
        tags: ['Greedy', 'Intervals', 'Sort'],
        examples: [{ input: '[[10,16],[2,8],[1,6],[7,12]]', output: '2' }],
        testCases: [
          { input: '[[10,16],[2,8],[1,6],[7,12]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,2],[3,4],[5,6],[7,8]]', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[[1,2]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[2,3],[2,3]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1,2],[2,3],[3,4],[4,5],[5,6],[0,0],[1,1]]', expectedOutput: '4', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int findMinArrowShots(int[][] points) {
        if (points.length == 0) return 0;
        Arrays.sort(points, (a, b) -> Long.compare((long)a[1], (long)b[1]));
        int arrows = 1;
        long lastEnd = (long)points[0][1];
        for (int i = 1; i < points.length; i++) {
            if ((long)points[i][0] > lastEnd) {
                arrows++;
                lastEnd = (long)points[i][1];
            }
        }
        return arrows;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-85-greedy-intervals',
        title: 'Meeting Rooms II',
        description: 'Given array of meeting intervals, return minimum conference rooms required.',
        difficulty: 'Medium',
        tags: ['Greedy', 'Intervals', 'Heap'],
        examples: [{ input: '[[0,30],[5,10],[15,20]]', output: '1' }],
        testCases: [
          { input: '[[0,30],[5,10],[15,20]]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[[0,30],[5,10],[15,20],[10,15]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[7,10]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[0,10],[1,11],[2,12],[3,13],[4,14],[5,15]]', expectedOutput: '6', isHidden: true, points: 20 },
          { input: '[[1,5],[2,6],[3,7],[4,8]]', expectedOutput: '4', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int minMeetingRooms(int[][] intervals) {
        int[] starts = new int[intervals.length];
        int[] ends = new int[intervals.length];
        for (int i = 0; i < intervals.length; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        int rooms = 0, endPtr = 0;
        for (int start : starts) {
            if (start < ends[endPtr]) {
                rooms++;
            } else {
                endPtr++;
            }
        }
        return rooms;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-85-greedy-intervals',
        title: 'Merge Intervals',
        description: 'Given array of intervals, merge overlapping intervals.',
        difficulty: 'Medium',
        tags: ['Greedy', 'Intervals', 'Array'],
        examples: [{ input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
        testCases: [
          { input: '[[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]', isHidden: false, points: 20 },
          { input: '[[1,4],[4,5]]', expectedOutput: '[[1,5]]', isHidden: false, points: 20 },
          { input: '[[1,5]]', expectedOutput: '[[1,5]]', isHidden: true, points: 20 },
          { input: '[[1,5],[0,0]]', expectedOutput: '[[0,0],[1,5]]', isHidden: true, points: 20 },
          { input: '[[1,5],[0,4],[2,3]]', expectedOutput: '[[0,5]]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> result = new ArrayList<>();
        result.add(intervals[0]);
        for (int i = 1; i < intervals.length; i++) {
            int[] last = result.get(result.size() - 1);
            if (intervals[i][0] <= last[1]) {
                last[1] = Math.max(last[1], intervals[i][1]);
            } else {
                result.add(intervals[i]);
            }
        }
        return result.toArray(new int[0][]);
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-85-greedy-intervals',
        title: 'Maximum Length of Pair Chain',
        description: 'Return length of longest chain of pairs where p2 follows p1 if p1[1] < p2[0].',
        difficulty: 'Medium',
        tags: ['Greedy', 'Intervals', 'DP'],
        examples: [{ input: '[[1,2],[2,3],[3,4]]', output: '2' }],
        testCases: [
          { input: '[[1,2],[2,3],[3,4]]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[[1,2],[7,8],[4,5]]', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '[[1,2]]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1,3],[2,3],[3,4]]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[[1,2],[2,3],[3,4],[4,5]]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int maxChainLength(int[][] pairs) {
        Arrays.sort(pairs, (a, b) -> a[1] - b[1]);
        int count = 1, end = pairs[0][1];
        for (int i = 1; i < pairs.length; i++) {
            if (pairs[i][0] > end) {
                count++;
                end = pairs[i][1];
            }
        }
        return count;
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 86: Fractional Knapsack
      createQuestion({
        topicId: 'day-86-fractional-knapsack',
        title: 'Maximum Units on a Truck',
        description: 'Pack boxes on truck with max truckSize capacity to maximize total units.',
        difficulty: 'Easy',
        tags: ['Greedy', 'Array', 'Fractional Knapsack'],
        examples: [{ input: '[[1,3],[2,2],[3,1]]\n4', output: '8' }],
        testCases: [
          { input: '[[1,3],[2,2],[3,1]]\n4', expectedOutput: '8', isHidden: false, points: 20 },
          { input: '[[5,10],[2,5],[4,7],[3,9]]\n10', expectedOutput: '91', isHidden: false, points: 20 },
          { input: '[[1,1]]\n1', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[[1,5],[1,4],[1,3]]\n2', expectedOutput: '9', isHidden: true, points: 20 },
          { input: '[[2,10],[3,5],[4,2]]\n5', expectedOutput: '20', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int maximumUnits(int[][] boxTypes, int truckSize) {
        Arrays.sort(boxTypes, (a, b) -> b[1] - a[1]);
        int units = 0;
        for (int[] box : boxTypes) {
            int take = Math.min(box[0], truckSize);
            units += take * box[1];
            truckSize -= take;
            if (truckSize == 0) break;
        }
        return units;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-86-fractional-knapsack',
        title: 'Bag of Tokens',
        description: 'Play tokens face up (lose power, gain score) or face down (gain power, lose score). Maximize score.',
        difficulty: 'Medium',
        tags: ['Greedy', 'Two Pointers'],
        examples: [{ input: '[100,200,300,400]\n200', output: '2' }],
        testCases: [
          { input: '[100,200,300,400]\n200', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[100]\n50', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '[100]\n150', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[71,55,82]\n54', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[100,300,200,400]\n200', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int bagOfTokensScore(int[] tokens, int power) {
        Arrays.sort(tokens);
        int left = 0, right = tokens.length - 1;
        int score = 0, maxScore = 0;
        while (left <= right) {
            if (power >= tokens[left]) {
                power -= tokens[left];
                score++;
                maxScore = Math.max(maxScore, score);
                left++;
            } else if (score > 0) {
                power += tokens[right];
                score--;
                right--;
            } else {
                break;
            }
        }
        return maxScore;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-86-fractional-knapsack',
        title: 'Maximum Bags With Full Capacity of Rocks',
        description: 'Distribute additional rocks among bags to maximize number of completely filled bags.',
        difficulty: 'Medium',
        tags: ['Greedy', 'Array'],
        examples: [{ input: '[2,3,4,5]\n[1,2,4,4]\n2', output: '3' }],
        testCases: [
          { input: '[2,3,4,5]\n[1,2,4,4]\n2', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '[10]\n[2]\n2', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '[2]\n[1]\n1', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[5,5,5]\n[1,2,3]\n3', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[3,4,5]\n[1,2,4]\n4', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int maximumBags(int[] capacity, int[] rocks, int additionalRocks) {
        int n = capacity.length;
        int[] needs = new int[n];
        for (int i = 0; i < n; i++) {
            needs[i] = capacity[i] - rocks[i];
        }
        Arrays.sort(needs);
        int bags = 0;
        for (int need : needs) {
            if (additionalRocks >= need) {
                additionalRocks -= need;
                bags++;
            } else {
                break;
            }
        }
        return bags;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-86-fractional-knapsack',
        title: 'Break a Palindrome',
        description: 'Replace exactly one character to make palindrome not a palindrome, lexicographically smallest result.',
        difficulty: 'Easy',
        tags: ['Greedy', 'String'],
        examples: [{ input: '\"abccba\"', output: '\"aaccba\"' }],
        testCases: [
          { input: '\"abccba\"', expectedOutput: '\"aaccba\"', isHidden: false, points: 20 },
          { input: '\"a\"', expectedOutput: '\"\"', isHidden: false, points: 20 },
          { input: '\"aa\"', expectedOutput: '\"ba\"', isHidden: true, points: 20 },
          { input: '\"aba\"', expectedOutput: '\"abb\"', isHidden: true, points: 20 },
          { input: '\"ababa\"', expectedOutput: '\"bbaba\"', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static String breakPalindrome(String palindrome) {
        if (palindrome.length() == 1) return "";
        char[] arr = palindrome.toCharArray();
        for (int i = 0; i < arr.length / 2; i++) {
            if (arr[i] != 'a') {
                arr[i] = 'a';
                return new String(arr);
            }
        }
        arr[arr.length - 1] = 'b';
        return new String(arr);
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-86-fractional-knapsack',
        title: 'Smallest String With A Given Numeric Value',
        description: 'Return lexicographically smallest string of length n with numeric value k.',
        difficulty: 'Medium',
        tags: ['Greedy', 'String'],
        examples: [{ input: '3\n27', output: '\"aay\"' }],
        testCases: [
          { input: '3\n27', expectedOutput: '\"aay\"', isHidden: false, points: 20 },
          { input: '5\n73', expectedOutput: '\"aaszz\"', isHidden: false, points: 20 },
          { input: '1\n1', expectedOutput: '\"a\"', isHidden: true, points: 20 },
          { input: '2\n26', expectedOutput: '\"az\"', isHidden: true, points: 20 },
          { input: '2\n27', expectedOutput: '\"zz\"', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static String getSmallestString(int n, int k) {
        char[] result = new char[n];
        Arrays.fill(result, 'a');
        k -= n;
        for (int i = n - 1; i >= 0 && k > 0; i--) {
            int add = Math.min(25, k);
            result[i] = (char)('a' + add);
            k -= add;
        }
        return new String(result);
    }
    public static void main(String[] args) {}
}`
      }),
      // Day 87: Job Scheduling & Huffman
      createQuestion({
        topicId: 'day-87-job-scheduling',
        title: 'Minimum Cost to Connect Sticks',
        description: 'Connect sticks with minimum cost using priority queue (Huffman Coding logic).',
        difficulty: 'Medium',
        tags: ['Greedy', 'Heap', 'Huffman'],
        examples: [{ input: '[2,4,3]', output: '14' }],
        testCases: [
          { input: '[2,4,3]', expectedOutput: '14', isHidden: false, points: 20 },
          { input: '[1,8,3,5,4,2]', expectedOutput: '36', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[5,4,3,2,1]', expectedOutput: '33', isHidden: true, points: 20 },
          { input: '[1,1]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int connectSticks(int[] sticks) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(Arrays.asList(
            Arrays.stream(sticks).boxed().toArray(Integer[]::new)
        ));
        int cost = 0;
        while (minHeap.size() > 1) {
            int first = minHeap.poll();
            int second = minHeap.poll();
            int combined = first + second;
            cost += combined;
            minHeap.offer(combined);
        }
        return cost;
    }
    public static void main(String[] args) {}
}`
      }),
      createQuestion({
        topicId: 'day-87-job-scheduling',
        title: 'Task Scheduler',
        description: 'Given list of tasks with cooldown between same tasks, return minimum time to complete all.',
        difficulty: 'Medium',
        tags: ['Greedy', 'Array', 'Heap'],
        examples: [{ input: '[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n2', output: '8' }],
        testCases: [
          { input: '[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n2', expectedOutput: '8', isHidden: false, points: 20 },
          { input: '[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n0', expectedOutput: '6', isHidden: false, points: 20 },
          { input: '[\"A\"]\n0', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[\"A\",\"A\"]\n1', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '[\"A\",\"B\",\"C\",\"A\",\"B\",\"C\"]\n1', expectedOutput: '6', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char task : tasks) freq[task - 'A']++;
        int maxFreq = 0;
        for (int f : freq) maxFreq = Math.max(maxFreq, f);
        int maxCount = 0;
        for (int f : freq) if (f == maxFreq) maxCount++;
        return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
    }
    public static void main(String[] args) {}
}`
      })
    ];

    let created = 0;
    for (const questionData of questions) {
      const existing = await Question.findOne({ title: questionData.title });
      if (!existing) {
        await Question.create(questionData);
        console.log(`  ✅ Created: ${questionData.title}`);
        created++;
      } else {
        console.log(`  ⏭️  Exists: ${questionData.title}`);
      }
    }

    console.log(`\n🎉 Days 85-87 complete! Created ${created}/15 questions\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays85to87();
