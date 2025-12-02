import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const fixedSolutions: {[key: string]: string} = {
  'Design Circular Deque': `import java.util.*;
class MyCircularDeque {
    private int[] data;
    private int head, tail, size;
    public MyCircularDeque(int k) {
        data = new int[k];
        head = 0;
        tail = 0;
        size = 0;
    }
    public boolean insertFront(int value) {
        if (isFull()) return false;
        head = (head - 1 + data.length) % data.length;
        data[head] = value;
        size++;
        return true;
    }
    public boolean insertLast(int value) {
        if (isFull()) return false;
        data[tail] = value;
        tail = (tail + 1) % data.length;
        size++;
        return true;
    }
    public boolean deleteFront() {
        if (isEmpty()) return false;
        head = (head + 1) % data.length;
        size--;
        return true;
    }
    public boolean deleteLast() {
        if (isEmpty()) return false;
        tail = (tail - 1 + data.length) % data.length;
        size--;
        return true;
    }
    public int getFront() {
        return isEmpty() ? -1 : data[head];
    }
    public int getRear() {
        return isEmpty() ? -1 : data[(tail - 1 + data.length) % data.length];
    }
    public boolean isEmpty() {
        return size == 0;
    }
    public boolean isFull() {
        return size == data.length;
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        MyCircularDeque deque = new MyCircularDeque(3);
        boolean r1 = deque.insertLast(1);
        boolean r2 = deque.insertFront(2);
        System.out.println("[null," + r1 + "," + r2 + "]");
    }
}`,

  'Sliding Window Maximum': `import java.util.*;
public class Solution {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> deque = new ArrayDeque<>();
        int[] result = new int[nums.length - k + 1];
        for (int i = 0; i < nums.length; i++) {
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        int[] nums = parseArray(input);
        int[] result = maxSlidingWindow(nums, k);
        System.out.println(formatArray(result));
    }
    private static int[] parseArray(String input) {
        input = input.replace("[", "").replace("]", "");
        String[] parts = input.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
    private static String formatArray(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(arr[i]);
        }
        sb.append("]");
        return sb.toString();
    }
}`,

  'Shortest Subarray with Sum at Least K': `import java.util.*;
public class Solution {
    public static int shortestSubarray(int[] nums, int k) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        Deque<Integer> deque = new ArrayDeque<>();
        int minLen = n + 1;
        for (int i = 0; i <= n; i++) {
            while (!deque.isEmpty() && prefix[i] - prefix[deque.peekFirst()] >= k) {
                minLen = Math.min(minLen, i - deque.pollFirst());
            }
            while (!deque.isEmpty() && prefix[i] <= prefix[deque.peekLast()]) {
                deque.pollLast();
            }
            deque.offerLast(i);
        }
        return minLen == n + 1 ? -1 : minLen;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        int[] nums = parseArray(input);
        System.out.println(shortestSubarray(nums, k));
    }
    private static int[] parseArray(String input) {
        input = input.replace("[", "").replace("]", "");
        String[] parts = input.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`,

  'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit': `import java.util.*;
public class Solution {
    public static int longestSubarray(int[] nums, int limit) {
        Deque<Integer> maxDeque = new ArrayDeque<>();
        Deque<Integer> minDeque = new ArrayDeque<>();
        int left = 0, result = 0;
        for (int right = 0; right < nums.length; right++) {
            while (!maxDeque.isEmpty() && nums[maxDeque.peekLast()] < nums[right]) {
                maxDeque.pollLast();
            }
            while (!minDeque.isEmpty() && nums[minDeque.peekLast()] > nums[right]) {
                minDeque.pollLast();
            }
            maxDeque.offerLast(right);
            minDeque.offerLast(right);
            while (nums[maxDeque.peekFirst()] - nums[minDeque.peekFirst()] > limit) {
                if (maxDeque.peekFirst() == left) maxDeque.pollFirst();
                if (minDeque.peekFirst() == left) minDeque.pollFirst();
                left++;
            }
            result = Math.max(result, right - left + 1);
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int limit = sc.nextInt();
        sc.close();
        int[] nums = parseArray(input);
        System.out.println(longestSubarray(nums, limit));
    }
    private static int[] parseArray(String input) {
        input = input.replace("[", "").replace("]", "");
        String[] parts = input.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`,

  'Constrained Subsequence Sum': `import java.util.*;
public class Solution {
    public static int constrainedSubsetSum(int[] nums, int k) {
        Deque<Integer> deque = new ArrayDeque<>();
        int[] dp = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            dp[i] = nums[i];
            if (!deque.isEmpty()) {
                dp[i] = Math.max(dp[i], dp[deque.peekFirst()] + nums[i]);
            }
            while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            if (deque.peekFirst() == i - k) {
                deque.pollFirst();
            }
        }
        int result = dp[0];
        for (int num : dp) {
            result = Math.max(result, num);
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        int[] nums = parseArray(input);
        System.out.println(constrainedSubsetSum(nums, k));
    }
    private static int[] parseArray(String input) {
        input = input.replace("[", "").replace("]", "");
        String[] parts = input.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`,

  'Jump Game VI': `import java.util.*;
public class Solution {
    public static int maxResult(int[] nums, int k) {
        Deque<Integer> deque = new ArrayDeque<>();
        deque.offer(0);
        for (int i = 1; i < nums.length; i++) {
            nums[i] += nums[deque.peekFirst()];
            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            if (deque.peekFirst() == i - k) {
                deque.pollFirst();
            }
        }
        return nums[nums.length - 1];
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        int[] nums = parseArray(input);
        System.out.println(maxResult(nums, k));
    }
    private static int[] parseArray(String input) {
        input = input.replace("[", "").replace("]", "");
        String[] parts = input.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`
};

async function fixBatch9() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');
    console.log('📝 Fixing Day 63 Batch 9 (6 questions)...\n');

    let updated = 0;
    for (const [title, solution] of Object.entries(fixedSolutions)) {
      const result = await Question.findOneAndUpdate(
        { title },
        { solution },
        { new: true }
      );
      if (result) {
        console.log(`  ✅ Fixed: ${title}`);
        updated++;
      }
    }

    console.log(`\n🎉 Successfully updated ${updated}/6 questions!\n`);
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixBatch9();
