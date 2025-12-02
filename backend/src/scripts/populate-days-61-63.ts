import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays61to63() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 61 - Queue Implementations ====================
    const day61Topic = await Topic.findOneAndUpdate(
      { id: 'day-61' },
      {
        id: 'day-61',
        title: 'Queue Implementations',
        description: 'Queue using stacks and circular queue.',
        week: 10,
        day: 61,
        difficulty: 'Easy',
        estimatedTime: 120,
        prerequisites: ['day-60'],
        compulsoryQuestion: 'Implement Queue using Stacks',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day61Topic.title}`);
    await Question.deleteMany({ topicId: 'day-61' });

    await Question.insertMany([
      {
        topicId: 'day-61',
        title: 'Implement Queue using Stacks',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 20,
        timeLimit: 25,
        description: 'Implement a FIFO queue using only two stacks.',
        starterCode: 'import java.util.*;\nclass MyQueue {\n    public MyQueue() {}\n    public void push(int x) {}\n    public int pop() { return 0; }\n    public int peek() { return 0; }\n    public boolean empty() { return true; }\n}',
        solution: 'import java.util.*;\nclass MyQueue {\n    private Stack<Integer> input = new Stack<>();\n    private Stack<Integer> output = new Stack<>();\n    public MyQueue() {}\n    public void push(int x) {\n        input.push(x);\n    }\n    public int pop() {\n        peek();\n        return output.pop();\n    }\n    public int peek() {\n        if (output.isEmpty()) {\n            while (!input.isEmpty()) {\n                output.push(input.pop());\n            }\n        }\n        return output.peek();\n    }\n    public boolean empty() {\n        return input.isEmpty() && output.isEmpty();\n    }\n}',
        examples: [{ input: '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]', output: '[null, null, null, 1, 1, false]' }],
        testCases: [{ input: '["MyQueue","push","pop"]\n[[],[1],[]]', expectedOutput: '[null,null,1]', isHidden: false, points: 10 }],
        hints: ['Two stacks: input and output', 'Transfer on peek/pop', 'Amortized O(1)'],
        tags: ['Stack', 'Queue', 'Design']
      },
      {
        topicId: 'day-61',
        title: 'Design Circular Queue',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Design a circular queue with fixed size.',
        starterCode: 'class MyCircularQueue {\n    public MyCircularQueue(int k) {}\n    public boolean enQueue(int value) { return false; }\n    public boolean deQueue() { return false; }\n    public int Front() { return -1; }\n    public int Rear() { return -1; }\n    public boolean isEmpty() { return true; }\n    public boolean isFull() { return false; }\n}',
        solution: 'class MyCircularQueue {\n    private int[] data;\n    private int head, tail, size;\n    public MyCircularQueue(int k) {\n        data = new int[k];\n        head = -1;\n        tail = -1;\n        size = k;\n    }\n    public boolean enQueue(int value) {\n        if (isFull()) return false;\n        if (isEmpty()) head = 0;\n        tail = (tail + 1) % size;\n        data[tail] = value;\n        return true;\n    }\n    public boolean deQueue() {\n        if (isEmpty()) return false;\n        if (head == tail) {\n            head = -1;\n            tail = -1;\n        } else {\n            head = (head + 1) % size;\n        }\n        return true;\n    }\n    public int Front() {\n        return isEmpty() ? -1 : data[head];\n    }\n    public int Rear() {\n        return isEmpty() ? -1 : data[tail];\n    }\n    public boolean isEmpty() {\n        return head == -1;\n    }\n    public boolean isFull() {\n        return ((tail + 1) % size) == head;\n    }\n}',
        examples: [{ input: '["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]\n[[3], [1], [2], [3], [4], [], [], [], [4], []]', output: '[null, true, true, true, false, 3, true, true, true, 4]' }],
        testCases: [{ input: '["MyCircularQueue","enQueue","Front"]\n[[2],[1],[]]', expectedOutput: '[null,true,1]', isHidden: false, points: 12 }],
        hints: ['Use array with head and tail pointers', 'Use modulo for circular', 'Track empty vs full'],
        tags: ['Array', 'Queue', 'Design']
      },
      {
        topicId: 'day-61',
        title: 'Number of Recent Calls',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Count requests in past 3000 milliseconds.',
        starterCode: 'import java.util.*;\nclass RecentCounter {\n    public RecentCounter() {}\n    public int ping(int t) { return 0; }\n}',
        solution: 'import java.util.*;\nclass RecentCounter {\n    private Queue<Integer> queue = new LinkedList<>();\n    public RecentCounter() {}\n    public int ping(int t) {\n        queue.offer(t);\n        while (queue.peek() < t - 3000) {\n            queue.poll();\n        }\n        return queue.size();\n    }\n}',
        examples: [{ input: '["RecentCounter", "ping", "ping", "ping", "ping"]\n[[], [1], [100], [3001], [3002]]', output: '[null, 1, 2, 3, 3]' }],
        testCases: [{ input: '["RecentCounter","ping"]\n[[],[1]]', expectedOutput: '[null,1]', isHidden: false, points: 8 }],
        hints: ['Queue of timestamps', 'Remove old entries', 'Return queue size'],
        tags: ['Queue', 'Design', 'Data Stream']
      },
      {
        topicId: 'day-61',
        title: 'Time Needed to Buy Tickets',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Calculate time for person k to finish buying tickets.',
        starterCode: 'public class Solution {\n    public static int timeRequiredToBuy(int[] tickets, int k) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int timeRequiredToBuy(int[] tickets, int k) {\n        int time = 0;\n        for (int i = 0; i < tickets.length; i++) {\n            if (i <= k) {\n                time += Math.min(tickets[i], tickets[k]);\n            } else {\n                time += Math.min(tickets[i], tickets[k] - 1);\n            }\n        }\n        return time;\n    }\n}',
        examples: [{ input: 'tickets = [2,3,2], k = 2', output: '6' }],
        testCases: [{ input: '[2,3,2]\n2', expectedOutput: '6', isHidden: false, points: 8 }],
        hints: ['People before k: min(tickets[i], tickets[k])', 'People after k: min(tickets[i], tickets[k]-1)', 'No simulation needed'],
        tags: ['Array', 'Queue', 'Simulation']
      },
      {
        topicId: 'day-61',
        title: 'Moving Average from Data Stream',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Calculate moving average of last size elements in stream.',
        starterCode: 'import java.util.*;\nclass MovingAverage {\n    public MovingAverage(int size) {}\n    public double next(int val) { return 0.0; }\n}',
        solution: 'import java.util.*;\nclass MovingAverage {\n    private Queue<Integer> queue = new LinkedList<>();\n    private int size;\n    private int sum = 0;\n    public MovingAverage(int size) {\n        this.size = size;\n    }\n    public double next(int val) {\n        if (queue.size() == size) {\n            sum -= queue.poll();\n        }\n        queue.offer(val);\n        sum += val;\n        return (double) sum / queue.size();\n    }\n}',
        examples: [{ input: '["MovingAverage", "next", "next", "next", "next"]\n[[3], [1], [10], [3], [5]]', output: '[null, 1.0, 5.5, 4.66667, 6.0]' }],
        testCases: [{ input: '["MovingAverage","next","next"]\n[[2],[1],[2]]', expectedOutput: '[null,1.0,1.5]', isHidden: false, points: 8 }],
        hints: ['Queue with max size', 'Track running sum', 'Remove oldest when full'],
        tags: ['Queue', 'Design', 'Data Stream']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 62 - Queue Operations & Problems ====================
    const day62Topic = await Topic.findOneAndUpdate(
      { id: 'day-62' },
      {
        id: 'day-62',
        title: 'Queue Operations & Problems',
        description: 'Reversing and manipulating queues.',
        week: 10,
        day: 62,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-61'],
        compulsoryQuestion: 'Dota2 Senate',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day62Topic.title}`);
    await Question.deleteMany({ topicId: 'day-62' });

    await Question.insertMany([
      {
        topicId: 'day-62',
        title: 'Reverse Queue',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Reverse a queue using recursion or stack.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static Queue<Integer> reverseQueue(Queue<Integer> queue) { return queue; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static Queue<Integer> reverseQueue(Queue<Integer> queue) {\n        Stack<Integer> stack = new Stack<>();\n        while (!queue.isEmpty()) {\n            stack.push(queue.poll());\n        }\n        while (!stack.isEmpty()) {\n            queue.offer(stack.pop());\n        }\n        return queue;\n    }\n}',
        examples: [{ input: 'queue = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' }],
        testCases: [{ input: '[1,2,3]', expectedOutput: '[3,2,1]', isHidden: false, points: 8 }],
        hints: ['Use stack to reverse', 'Pop from queue push to stack', 'Pop from stack offer to queue'],
        tags: ['Queue', 'Stack']
      },
      {
        topicId: 'day-62',
        title: 'First Unique Character in a String',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Find first non-repeating character.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int firstUniqChar(String s) { return -1; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int firstUniqChar(String s) {\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - \'a\']++;\n        for (int i = 0; i < s.length(); i++) {\n            if (count[s.charAt(i) - \'a\'] == 1) return i;\n        }\n        return -1;\n    }\n}',
        examples: [{ input: 's = "leetcode"', output: '0' }],
        testCases: [{ input: 'leetcode', expectedOutput: '0', isHidden: false, points: 8 }],
        hints: ['Count frequency first', 'Scan for count == 1', 'Array of size 26'],
        tags: ['Hash Table', 'String', 'Queue']
      },
      {
        topicId: 'day-62',
        title: 'Interleave First Half with Second Half',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Interleave first and second half of queue.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static Queue<Integer> interleaveQueue(Queue<Integer> queue) { return queue; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static Queue<Integer> interleaveQueue(Queue<Integer> queue) {\n        int n = queue.size();\n        if (n % 2 != 0) return queue;\n        Stack<Integer> stack = new Stack<>();\n        int half = n / 2;\n        for (int i = 0; i < half; i++) stack.push(queue.poll());\n        while (!stack.isEmpty()) queue.offer(stack.pop());\n        for (int i = 0; i < half; i++) queue.offer(queue.poll());\n        for (int i = 0; i < half; i++) stack.push(queue.poll());\n        while (!stack.isEmpty()) {\n            queue.offer(stack.pop());\n            queue.offer(queue.poll());\n        }\n        return queue;\n    }\n}',
        examples: [{ input: 'queue = [1, 2, 3, 4]', output: '[1, 3, 2, 4]' }],
        testCases: [{ input: '[1,2,3,4]', expectedOutput: '[1,3,2,4]', isHidden: false, points: 10 }],
        hints: ['Use stack to reverse first half', 'Queue first half then second', 'Interleave with alternating operations'],
        tags: ['Queue', 'Stack']
      },
      {
        topicId: 'day-62',
        title: 'Reveal Cards In Increasing Order',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Arrange deck so revealing reveals cards in sorted order.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] deckRevealedIncreasing(int[] deck) { return new int[0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] deckRevealedIncreasing(int[] deck) {\n        Arrays.sort(deck);\n        int n = deck.length;\n        Deque<Integer> index = new LinkedList<>();\n        for (int i = 0; i < n; i++) index.add(i);\n        int[] result = new int[n];\n        for (int card : deck) {\n            result[index.pollFirst()] = card;\n            if (!index.isEmpty()) {\n                index.addLast(index.pollFirst());\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'deck = [17,13,11,2,3,5,7]', output: '[2,13,3,11,5,17,7]' }],
        testCases: [{ input: '[17,13,11,2,3,5,7]', expectedOutput: '[2,13,3,11,5,17,7]', isHidden: false, points: 12 }],
        hints: ['Simulate the reveal process backwards', 'Use queue of indices', 'Assign sorted cards to positions'],
        tags: ['Array', 'Queue', 'Sorting', 'Simulation']
      },
      {
        topicId: 'day-62',
        title: 'Dota2 Senate',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Simulate Dota2 senate voting rounds.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String predictPartyVictory(String senate) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String predictPartyVictory(String senate) {\n        int n = senate.length();\n        Queue<Integer> radiant = new LinkedList<>();\n        Queue<Integer> dire = new LinkedList<>();\n        for (int i = 0; i < n; i++) {\n            if (senate.charAt(i) == \'R\') radiant.offer(i);\n            else dire.offer(i);\n        }\n        while (!radiant.isEmpty() && !dire.isEmpty()) {\n            int r = radiant.poll();\n            int d = dire.poll();\n            if (r < d) radiant.offer(r + n);\n            else dire.offer(d + n);\n        }\n        return radiant.isEmpty() ? "Dire" : "Radiant";\n    }\n}',
        examples: [{ input: 'senate = "RD"', output: '"Radiant"' }],
        testCases: [{ input: 'RD', expectedOutput: 'Radiant', isHidden: false, points: 12 }],
        hints: ['Two queues for each party', 'Lower index bans opponent', 'Add winner back with n offset'],
        tags: ['String', 'Queue', 'Greedy']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 63 - Deque & Sliding Window Maximum ====================
    const day63Topic = await Topic.findOneAndUpdate(
      { id: 'day-63' },
      {
        id: 'day-63',
        title: 'Deque & Sliding Window Maximum',
        description: 'Monotonic deque for range queries.',
        week: 10,
        day: 63,
        difficulty: 'Hard',
        estimatedTime: 180,
        prerequisites: ['day-62'],
        compulsoryQuestion: 'Sliding Window Maximum',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day63Topic.title}`);
    await Question.deleteMany({ topicId: 'day-63' });

    await Question.insertMany([
      {
        topicId: 'day-63',
        title: 'Design Circular Deque',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Design a circular double-ended queue.',
        starterCode: 'class MyCircularDeque {\n    public MyCircularDeque(int k) {}\n    public boolean insertFront(int value) { return false; }\n    public boolean insertLast(int value) { return false; }\n    public boolean deleteFront() { return false; }\n    public boolean deleteLast() { return false; }\n    public int getFront() { return -1; }\n    public int getRear() { return -1; }\n    public boolean isEmpty() { return true; }\n    public boolean isFull() { return false; }\n}',
        solution: 'class MyCircularDeque {\n    private int[] data;\n    private int front, rear, size, capacity;\n    public MyCircularDeque(int k) {\n        data = new int[k];\n        capacity = k;\n        front = 0;\n        rear = k - 1;\n        size = 0;\n    }\n    public boolean insertFront(int value) {\n        if (isFull()) return false;\n        front = (front - 1 + capacity) % capacity;\n        data[front] = value;\n        size++;\n        return true;\n    }\n    public boolean insertLast(int value) {\n        if (isFull()) return false;\n        rear = (rear + 1) % capacity;\n        data[rear] = value;\n        size++;\n        return true;\n    }\n    public boolean deleteFront() {\n        if (isEmpty()) return false;\n        front = (front + 1) % capacity;\n        size--;\n        return true;\n    }\n    public boolean deleteLast() {\n        if (isEmpty()) return false;\n        rear = (rear - 1 + capacity) % capacity;\n        size--;\n        return true;\n    }\n    public int getFront() {\n        return isEmpty() ? -1 : data[front];\n    }\n    public int getRear() {\n        return isEmpty() ? -1 : data[rear];\n    }\n    public boolean isEmpty() {\n        return size == 0;\n    }\n    public boolean isFull() {\n        return size == capacity;\n    }\n}',
        examples: [{ input: '["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]\n[[3], [1], [2], [3], [4], [], [], [], [4], []]', output: '[null, true, true, true, false, 2, true, true, true, 4]' }],
        testCases: [{ input: '["MyCircularDeque","insertLast","getFront"]\n[[2],[1],[]]', expectedOutput: '[null,true,1]', isHidden: false, points: 12 }],
        hints: ['Track front, rear, size', 'Use modulo for circular', 'Handle empty/full states'],
        tags: ['Array', 'Linked List', 'Design']
      },
      {
        topicId: 'day-63',
        title: 'Sliding Window Maximum',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: true,
        points: 35,
        timeLimit: 40,
        description: 'Find maximum in each sliding window of size k.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int[] maxSlidingWindow(int[] nums, int k) { return new int[0]; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int[] maxSlidingWindow(int[] nums, int k) {\n        int n = nums.length;\n        if (n == 0) return new int[0];\n        int[] result = new int[n - k + 1];\n        Deque<Integer> deque = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) {\n            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {\n                deque.pollFirst();\n            }\n            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {\n                deque.pollLast();\n            }\n            deque.offerLast(i);\n            if (i >= k - 1) {\n                result[i - k + 1] = nums[deque.peekFirst()];\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' }],
        testCases: [{ input: '[1,3,-1,-3,5,3,6,7]\n3', expectedOutput: '[3,3,5,5,6,7]', isHidden: false, points: 18 }],
        hints: ['Monotonic decreasing deque', 'Store indices', 'Front = max, remove out of window'],
        tags: ['Array', 'Queue', 'Sliding Window', 'Monotonic Queue']
      },
      {
        topicId: 'day-63',
        title: 'Shortest Subarray with Sum at Least K',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 40,
        timeLimit: 45,
        description: 'Find shortest subarray with sum >= k (may contain negatives).',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int shortestSubarray(int[] nums, int k) { return -1; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int shortestSubarray(int[] nums, int k) {\n        int n = nums.length;\n        long[] prefix = new long[n + 1];\n        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n        int result = n + 1;\n        Deque<Integer> deque = new ArrayDeque<>();\n        for (int i = 0; i <= n; i++) {\n            while (!deque.isEmpty() && prefix[i] - prefix[deque.peekFirst()] >= k) {\n                result = Math.min(result, i - deque.pollFirst());\n            }\n            while (!deque.isEmpty() && prefix[i] <= prefix[deque.peekLast()]) {\n                deque.pollLast();\n            }\n            deque.offerLast(i);\n        }\n        return result == n + 1 ? -1 : result;\n    }\n}',
        examples: [{ input: 'nums = [2,-1,2], k = 3', output: '3' }],
        testCases: [{ input: '[2,-1,2]\n3', expectedOutput: '3', isHidden: false, points: 20 }],
        hints: ['Prefix sum', 'Monotonic deque', 'When sum >= k, update and pop front'],
        tags: ['Array', 'Queue', 'Sliding Window', 'Monotonic Queue', 'Prefix Sum']
      },
      {
        topicId: 'day-63',
        title: 'Longest Continuous Subarray With Absolute Diff Limit',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Find longest subarray where max-min <= limit.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int longestSubarray(int[] nums, int limit) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int longestSubarray(int[] nums, int limit) {\n        Deque<Integer> maxDeque = new ArrayDeque<>();\n        Deque<Integer> minDeque = new ArrayDeque<>();\n        int left = 0, result = 0;\n        for (int right = 0; right < nums.length; right++) {\n            while (!maxDeque.isEmpty() && nums[right] > maxDeque.peekLast()) maxDeque.pollLast();\n            while (!minDeque.isEmpty() && nums[right] < minDeque.peekLast()) minDeque.pollLast();\n            maxDeque.offerLast(nums[right]);\n            minDeque.offerLast(nums[right]);\n            while (maxDeque.peekFirst() - minDeque.peekFirst() > limit) {\n                if (maxDeque.peekFirst() == nums[left]) maxDeque.pollFirst();\n                if (minDeque.peekFirst() == nums[left]) minDeque.pollFirst();\n                left++;\n            }\n            result = Math.max(result, right - left + 1);\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [8,2,4,7], limit = 4', output: '2' }],
        testCases: [{ input: '[8,2,4,7]\n4', expectedOutput: '2', isHidden: false, points: 15 }],
        hints: ['Two deques: one for max, one for min', 'Sliding window', 'Shrink when max-min > limit'],
        tags: ['Array', 'Queue', 'Sliding Window', 'Monotonic Queue']
      },
      {
        topicId: 'day-63',
        title: 'Constrained Subsequence Sum',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 40,
        timeLimit: 45,
        description: 'Max sum of non-empty subsequence where consecutive elements are at most k apart.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static int constrainedSubsetSum(int[] nums, int k) { return 0; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static int constrainedSubsetSum(int[] nums, int k) {\n        int n = nums.length;\n        int[] dp = new int[n];\n        Deque<Integer> deque = new ArrayDeque<>();\n        int result = Integer.MIN_VALUE;\n        for (int i = 0; i < n; i++) {\n            while (!deque.isEmpty() && deque.peekFirst() < i - k) {\n                deque.pollFirst();\n            }\n            dp[i] = nums[i];\n            if (!deque.isEmpty()) {\n                dp[i] = Math.max(dp[i], dp[deque.peekFirst()] + nums[i]);\n            }\n            while (!deque.isEmpty() && dp[i] >= dp[deque.peekLast()]) {\n                deque.pollLast();\n            }\n            if (dp[i] > 0) deque.offerLast(i);\n            result = Math.max(result, dp[i]);\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'nums = [10,2,-10,5,20], k = 2', output: '37' }],
        testCases: [{ input: '[10,2,-10,5,20]\n2', expectedOutput: '37', isHidden: false, points: 20 }],
        hints: ['DP with monotonic deque', 'dp[i] = max(nums[i], dp[j] + nums[i]) for j in [i-k, i-1]', 'Only add positive dp to deque'],
        tags: ['Array', 'Dynamic Programming', 'Queue', 'Sliding Window', 'Monotonic Queue']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 61-63 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays61to63();
