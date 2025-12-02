import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays14to16() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // Day 14 - Generate Subsets & Rod Cutting
    const day14Topic = await Topic.findOneAndUpdate(
      { id: 'day-14' },
      {
        id: 'day-14',
        title: 'Generate Subsets & Rod Cutting',
        description: 'Advanced recursion (generating power sets) and introduction to combinatorial optimization.',
        week: 3,
        day: 14,
        difficulty: 'Medium',
        estimatedTime: 150,
        prerequisites: ['day-13'],
        compulsoryQuestion: 'Subsets',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day14Topic.title}`);

    await Question.deleteMany({ topicId: 'day-14' });
    
    const day14Questions = [
      {
        topicId: 'day-14',
        title: 'Subsets',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 30,
        description: `Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

**Constraints:** 1 <= nums.length <= 10, -10 <= nums[i] <= 10.`,
        starterCode: `import java.util.*;

public class Solution {
    public static List<List<Integer>> subsets(int[] nums) {
        // Your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        System.out.println(subsets(nums));
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }
    
    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current));
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        System.out.println(subsets(nums));
    }
}`,
        examples: [
          { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
          { input: 'nums = [0]', output: '[[],[0]]' }
        ],
        testCases: [
          { input: '[1,2,3]', expectedOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', isHidden: false, points: 10 },
          { input: '[0]', expectedOutput: '[[],[0]]', isHidden: true, points: 10 }
        ],
        hints: ['Use backtracking', 'For each element, decide to include or exclude it'],
        tags: ['Backtracking', 'Recursion']
      },
      {
        topicId: 'day-14',
        title: 'Subsets II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

**Constraints:** 1 <= nums.length <= 10, -10 <= nums[i] <= 10.`,
        starterCode: `import java.util.*;

public class Solution {
    public static List<List<Integer>> subsetsWithDup(int[] nums) {
        // Your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 2};
        System.out.println(subsetsWithDup(nums));
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }
    
    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 2};
        System.out.println(subsetsWithDup(nums));
    }
}`,
        examples: [{ input: 'nums = [1,2,2]', output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]' }],
        testCases: [
          { input: '[1,2,2]', expectedOutput: '[[],[1],[1,2],[1,2,2],[2],[2,2]]', isHidden: false, points: 15 }
        ],
        hints: ['Sort array first', 'Skip duplicates at same recursion level'],
        tags: ['Backtracking', 'Array']
      },
      {
        topicId: 'day-14',
        title: 'Integer Break',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: `Given an integer n, break it into the sum of k positive integers (k >= 2), and maximize the product of those integers.

**Constraints:** 2 <= n <= 58.`,
        starterCode: `public class Solution {
    public static int integerBreak(int n) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(integerBreak(10)); // 36
    }
}`,
        solution: `public class Solution {
    public static int integerBreak(int n) {
        if (n <= 3) return n - 1;
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        dp[3] = 3;
        
        for (int i = 4; i <= n; i++) {
            for (int j = 1; j <= i / 2; j++) {
                dp[i] = Math.max(dp[i], dp[j] * dp[i - j]);
            }
        }
        return dp[n];
    }
    
    public static void main(String[] args) {
        System.out.println(integerBreak(10)); // 36
    }
}`,
        examples: [
          { input: 'n = 2', output: '1' },
          { input: 'n = 10', output: '36' }
        ],
        testCases: [
          { input: '2', expectedOutput: '1', isHidden: false, points: 7 },
          { input: '10', expectedOutput: '36', isHidden: false, points: 8 }
        ],
        hints: ['Use DP', 'Break into smaller products'],
        tags: ['Dynamic Programming', 'Math']
      },
      {
        topicId: 'day-14',
        title: 'Combination Sum',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: `Given an array of distinct integers candidates and a target, return all unique combinations where the chosen numbers sum to target. You may use the same number unlimited times.

**Constraints:** 1 <= candidates.length <= 30.`,
        starterCode: `import java.util.*;

public class Solution {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        int[] candidates = {2, 3, 6, 7};
        System.out.println(combinationSum(candidates, 7));
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    
    private static void backtrack(int[] candidates, int target, int start, List<Integer> current, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(current));
            return;
        }
        if (target < 0) return;
        
        for (int i = start; i < candidates.length; i++) {
            current.add(candidates[i]);
            backtrack(candidates, target - candidates[i], i, current, result);
            current.remove(current.size() - 1);
        }
    }
    
    public static void main(String[] args) {
        int[] candidates = {2, 3, 6, 7};
        System.out.println(combinationSum(candidates, 7));
    }
}`,
        examples: [{ input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' }],
        testCases: [
          { input: '[2,3,6,7]\n7', expectedOutput: '[[2,2,3],[7]]', isHidden: false, points: 15 }
        ],
        hints: ['Use backtracking', 'Can reuse same element'],
        tags: ['Backtracking', 'Array']
      },
      {
        topicId: 'day-14',
        title: 'Generalized Abbreviation',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 35,
        description: `Given a string word, return a list of all the possible generalized abbreviations.

**Example:** word = "word" → ["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]`,
        starterCode: `import java.util.*;

public class Solution {
    public static List<String> generateAbbreviations(String word) {
        // Your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(generateAbbreviations("word"));
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static List<String> generateAbbreviations(String word) {
        List<String> result = new ArrayList<>();
        backtrack(word, 0, "", 0, result);
        return result;
    }
    
    private static void backtrack(String word, int pos, String current, int count, List<String> result) {
        if (pos == word.length()) {
            result.add(current + (count > 0 ? count : ""));
            return;
        }
        
        // Abbreviate current char
        backtrack(word, pos + 1, current, count + 1, result);
        
        // Keep current char
        backtrack(word, pos + 1, current + (count > 0 ? count : "") + word.charAt(pos), 0, result);
    }
    
    public static void main(String[] args) {
        System.out.println(generateAbbreviations("word"));
    }
}`,
        examples: [{ input: 'word = "word"', output: '["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]' }],
        testCases: [
          { input: 'word', expectedOutput: '["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]', isHidden: false, points: 15 }
        ],
        hints: ['For each char: abbreviate or keep', 'Track abbreviation count'],
        tags: ['Backtracking', 'String']
      }
    ];

    for (const q of day14Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    // Day 15 - Array Operations & Rotation
    const day15Topic = await Topic.findOneAndUpdate(
      { id: 'day-15' },
      {
        id: 'day-15',
        title: 'Array Operations & Rotation',
        description: 'In-place modifications, rotation logic, and handling indices.',
        week: 3,
        day: 15,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-14'],
        compulsoryQuestion: 'Rotate Array',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`\n✅ ${day15Topic.title}`);

    await Question.deleteMany({ topicId: 'day-15' });

    const day15Questions = [
      {
        topicId: 'day-15',
        title: 'Rotate Array',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: `Given an integer array nums, rotate the array to the right by k steps.

**Constraints:** 1 <= nums.length <= 10^5, 0 <= k <= 10^5.
**Follow-up:** Do it in-place with O(1) extra space.`,
        starterCode: `public class Solution {
    public static void rotate(int[] nums, int k) {
        // Your code here
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6, 7};
        rotate(nums, 3);
        for (int n : nums) System.out.print(n + " ");
    }
}`,
        solution: `public class Solution {
    public static void rotate(int[] nums, int k) {
        k = k % nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    
    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6, 7};
        rotate(nums, 3);
        for (int n : nums) System.out.print(n + " ");
    }
}`,
        examples: [{ input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]' }],
        testCases: [
          { input: '[1,2,3,4,5,6,7]\n3', expectedOutput: '[5,6,7,1,2,3,4]', isHidden: false, points: 10 }
        ],
        hints: ['Reverse entire array, then reverse first k and last n-k elements'],
        tags: ['Array', 'Two Pointers']
      },
      {
        topicId: 'day-15',
        title: 'Move Zeroes',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: `Given an integer array nums, move all 0's to the end while maintaining the relative order of non-zero elements. Do this in-place.`,
        starterCode: `public class Solution {
    public static void moveZeroes(int[] nums) {
        // Your code here
    }
    
    public static void main(String[] args) {
        int[] nums = {0, 1, 0, 3, 12};
        moveZeroes(nums);
        for (int n : nums) System.out.print(n + " ");
    }
}`,
        solution: `public class Solution {
    public static void moveZeroes(int[] nums) {
        int pos = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                nums[pos++] = nums[i];
            }
        }
        while (pos < nums.length) {
            nums[pos++] = 0;
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {0, 1, 0, 3, 12};
        moveZeroes(nums);
        for (int n : nums) System.out.print(n + " ");
    }
}`,
        examples: [{ input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' }],
        testCases: [
          { input: '[0,1,0,3,12]', expectedOutput: '[1,3,12,0,0]', isHidden: false, points: 8 }
        ],
        hints: ['Use two pointers', 'Move non-zero elements to front'],
        tags: ['Array', 'Two Pointers']
      },
      {
        topicId: 'day-15',
        title: 'Remove Duplicates from Sorted Array',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: `Remove duplicates in-place from a sorted array such that each unique element appears only once. Return the number of unique elements.`,
        starterCode: `public class Solution {
    public static int removeDuplicates(int[] nums) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        int[] nums = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
        System.out.println(removeDuplicates(nums));
    }
}`,
        solution: `public class Solution {
    public static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int pos = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[pos++] = nums[i];
            }
        }
        return pos;
    }
    
    public static void main(String[] args) {
        int[] nums = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
        System.out.println(removeDuplicates(nums));
    }
}`,
        examples: [{ input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5' }],
        testCases: [
          { input: '[0,0,1,1,1,2,2,3,3,4]', expectedOutput: '5', isHidden: false, points: 8 }
        ],
        hints: ['Two pointers approach', 'Compare with previous element'],
        tags: ['Array', 'Two Pointers']
      },
      {
        topicId: 'day-15',
        title: 'Remove Element',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 15,
        description: `Remove all occurrences of val in nums in-place. Return the number of elements not equal to val.`,
        starterCode: `public class Solution {
    public static int removeElement(int[] nums, int val) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 2, 2, 3};
        System.out.println(removeElement(nums, 3));
    }
}`,
        solution: `public class Solution {
    public static int removeElement(int[] nums, int val) {
        int pos = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) {
                nums[pos++] = nums[i];
            }
        }
        return pos;
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 2, 2, 3};
        System.out.println(removeElement(nums, 3));
    }
}`,
        examples: [{ input: 'nums = [3,2,2,3], val = 3', output: '2' }],
        testCases: [
          { input: '[3,2,2,3]\n3', expectedOutput: '2', isHidden: false, points: 8 }
        ],
        hints: ['Use two pointers', 'Skip elements equal to val'],
        tags: ['Array', 'Two Pointers']
      },
      {
        topicId: 'day-15',
        title: 'Find All Numbers Disappeared in an Array',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 20,
        description: `Given an array nums of n integers where nums[i] is in range [1, n], return an array of all integers in [1, n] that do not appear.

**Follow-up:** O(n) time, O(1) space (returned list doesn't count).`,
        starterCode: `import java.util.*;

public class Solution {
    public static List<Integer> findDisappearedNumbers(int[] nums) {
        // Your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        int[] nums = {4, 3, 2, 7, 8, 2, 3, 1};
        System.out.println(findDisappearedNumbers(nums));
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static List<Integer> findDisappearedNumbers(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            int index = Math.abs(nums[i]) - 1;
            if (nums[index] > 0) {
                nums[index] = -nums[index];
            }
        }
        
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                result.add(i + 1);
            }
        }
        return result;
    }
    
    public static void main(String[] args) {
        int[] nums = {4, 3, 2, 7, 8, 2, 3, 1};
        System.out.println(findDisappearedNumbers(nums));
    }
}`,
        examples: [{ input: 'nums = [4,3,2,7,8,2,3,1]', output: '[5,6]' }],
        testCases: [
          { input: '[4,3,2,7,8,2,3,1]', expectedOutput: '[5,6]', isHidden: false, points: 10 }
        ],
        hints: ['Mark visited indices by negating values', 'Positive values indicate missing numbers'],
        tags: ['Array', 'Hash Table']
      }
    ];

    for (const q of day15Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    // Day 16 - Leaders in Array & Max Difference
    const day16Topic = await Topic.findOneAndUpdate(
      { id: 'day-16' },
      {
        id: 'day-16',
        title: 'Leaders in Array & Max Difference',
        description: 'Array patterns with single-pass logic and suffix/prefix maximums.',
        week: 3,
        day: 16,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-15'],
        compulsoryQuestion: 'Leaders in an Array',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`\n✅ ${day16Topic.title}`);

    await Question.deleteMany({ topicId: 'day-16' });

    const day16Questions = [
      {
        topicId: 'day-16',
        title: 'Leaders in an Array',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: `Replace every element with the greatest element among elements to its right, and replace the last element with -1.`,
        starterCode: `public class Solution {
    public static int[] replaceElements(int[] arr) {
        // Your code here
        return arr;
    }
    
    public static void main(String[] args) {
        int[] arr = {17, 18, 5, 4, 6, 1};
        int[] result = replaceElements(arr);
        for (int n : result) System.out.print(n + " ");
    }
}`,
        solution: `public class Solution {
    public static int[] replaceElements(int[] arr) {
        int max = -1;
        for (int i = arr.length - 1; i >= 0; i--) {
            int temp = arr[i];
            arr[i] = max;
            max = Math.max(max, temp);
        }
        return arr;
    }
    
    public static void main(String[] args) {
        int[] arr = {17, 18, 5, 4, 6, 1};
        int[] result = replaceElements(arr);
        for (int n : result) System.out.print(n + " ");
    }
}`,
        examples: [{ input: 'arr = [17,18,5,4,6,1]', output: '[18,6,6,6,1,-1]' }],
        testCases: [
          { input: '[17,18,5,4,6,1]', expectedOutput: '[18,6,6,6,1,-1]', isHidden: false, points: 8 }
        ],
        hints: ['Traverse from right to left', 'Track maximum so far'],
        tags: ['Array']
      },
      {
        topicId: 'day-16',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: `Find the maximum profit from buying and selling stock once.`,
        starterCode: `public class Solution {
    public static int maxProfit(int[] prices) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        int[] prices = {7, 1, 5, 3, 6, 4};
        System.out.println(maxProfit(prices));
    }
}`,
        solution: `public class Solution {
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        
        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        
        return maxProfit;
    }
    
    public static void main(String[] args) {
        int[] prices = {7, 1, 5, 3, 6, 4};
        System.out.println(maxProfit(prices));
    }
}`,
        examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
        testCases: [
          { input: '[7,1,5,3,6,4]', expectedOutput: '5', isHidden: false, points: 8 }
        ],
        hints: ['Track minimum price seen so far', 'Calculate profit at each step'],
        tags: ['Array', 'Dynamic Programming']
      },
      {
        topicId: 'day-16',
        title: 'Maximum Difference Between Increasing Elements',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: `Find maximum nums[j] - nums[i] where i < j and nums[i] < nums[j].`,
        starterCode: `public class Solution {
    public static int maximumDifference(int[] nums) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        int[] nums = {7, 1, 5, 4};
        System.out.println(maximumDifference(nums));
    }
}`,
        solution: `public class Solution {
    public static int maximumDifference(int[] nums) {
        int minVal = nums[0];
        int maxDiff = -1;
        
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > minVal) {
                maxDiff = Math.max(maxDiff, nums[i] - minVal);
            }
            minVal = Math.min(minVal, nums[i]);
        }
        
        return maxDiff;
    }
    
    public static void main(String[] args) {
        int[] nums = {7, 1, 5, 4};
        System.out.println(maximumDifference(nums));
    }
}`,
        examples: [{ input: 'nums = [7,1,5,4]', output: '4' }],
        testCases: [
          { input: '[7,1,5,4]', expectedOutput: '4', isHidden: false, points: 8 }
        ],
        hints: ['Track minimum so far', 'Check if current > minimum'],
        tags: ['Array']
      },
      {
        topicId: 'day-16',
        title: 'Increasing Triplet Subsequence',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: `Return true if there exists triple (i, j, k) with i < j < k and nums[i] < nums[j] < nums[k].

**Follow-up:** O(n) time, O(1) space.`,
        starterCode: `public class Solution {
    public static boolean increasingTriplet(int[] nums) {
        // Your code here
        return false;
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 1, 5, 0, 4, 6};
        System.out.println(increasingTriplet(nums));
    }
}`,
        solution: `public class Solution {
    public static boolean increasingTriplet(int[] nums) {
        int first = Integer.MAX_VALUE;
        int second = Integer.MAX_VALUE;
        
        for (int num : nums) {
            if (num <= first) {
                first = num;
            } else if (num <= second) {
                second = num;
            } else {
                return true;
            }
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 1, 5, 0, 4, 6};
        System.out.println(increasingTriplet(nums));
    }
}`,
        examples: [{ input: 'nums = [2,1,5,0,4,6]', output: 'true' }],
        testCases: [
          { input: '[2,1,5,0,4,6]', expectedOutput: 'true', isHidden: false, points: 10 }
        ],
        hints: ['Track two smallest values', 'If find third larger, return true'],
        tags: ['Array', 'Greedy']
      },
      {
        topicId: 'day-16',
        title: 'Next Greater Element I',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: `For each element in nums1, find the next greater element in nums2.`,
        starterCode: `import java.util.*;

public class Solution {
    public static int[] nextGreaterElement(int[] nums1, int[] nums2) {
        // Your code here
        return new int[nums1.length];
    }
    
    public static void main(String[] args) {
        int[] nums1 = {4, 1, 2};
        int[] nums2 = {1, 3, 4, 2};
        int[] result = nextGreaterElement(nums1, nums2);
        System.out.println(Arrays.toString(result));
    }
}`,
        solution: `import java.util.*;

public class Solution {
    public static int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>();
        Stack<Integer> stack = new Stack<>();
        
        for (int num : nums2) {
            while (!stack.isEmpty() && stack.peek() < num) {
                map.put(stack.pop(), num);
            }
            stack.push(num);
        }
        
        int[] result = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            result[i] = map.getOrDefault(nums1[i], -1);
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] nums1 = {4, 1, 2};
        int[] nums2 = {1, 3, 4, 2};
        int[] result = nextGreaterElement(nums1, nums2);
        System.out.println(Arrays.toString(result));
    }
}`,
        examples: [{ input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' }],
        testCases: [
          { input: '[4,1,2]\n[1,3,4,2]', expectedOutput: '[-1,3,-1]', isHidden: false, points: 10 }
        ],
        hints: ['Use stack to find next greater', 'Store in hash map'],
        tags: ['Array', 'Stack', 'Hash Table']
      }
    ];

    for (const q of day16Questions) {
      await Question.create(q);
      console.log(`  ✅ ${q.title}`);
    }

    console.log(`\n🎉 Days 14-16 populated successfully!`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays14to16();
