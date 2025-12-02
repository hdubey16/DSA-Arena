import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays55to57() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 55 - Reverse in K Groups & Intersection ====================
    const day55Topic = await Topic.findOneAndUpdate(
      { id: 'day-55' },
      {
        id: 'day-55',
        title: 'Reverse in K Groups & Advanced List',
        description: 'Hard reversal problems and merge k lists.',
        week: 8,
        day: 55,
        difficulty: 'Hard',
        estimatedTime: 180,
        prerequisites: ['day-54'],
        compulsoryQuestion: 'Reverse Nodes in k-Group',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day55Topic.title}`);
    await Question.deleteMany({ topicId: 'day-55' });

    await Question.insertMany([
      {
        topicId: 'day-55',
        title: 'Reverse Nodes in k-Group',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: true,
        points: 35,
        timeLimit: 40,
        description: 'Reverse nodes k at a time. Leave remaining nodes as is.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode reverseKGroup(ListNode head, int k) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode reverseKGroup(ListNode head, int k) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode prevGroupEnd = dummy;\n        while (true) {\n            ListNode kth = getKth(prevGroupEnd, k);\n            if (kth == null) break;\n            ListNode groupStart = prevGroupEnd.next;\n            ListNode nextGroupStart = kth.next;\n            ListNode prev = nextGroupStart, curr = groupStart;\n            while (curr != nextGroupStart) {\n                ListNode next = curr.next;\n                curr.next = prev;\n                prev = curr;\n                curr = next;\n            }\n            prevGroupEnd.next = kth;\n            prevGroupEnd = groupStart;\n        }\n        return dummy.next;\n    }\n    private static ListNode getKth(ListNode curr, int k) {\n        while (curr != null && k > 0) {\n            curr = curr.next;\n            k--;\n        }\n        return curr;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' }],
        testCases: [{ input: '[1,2,3,4,5]\n2', expectedOutput: '[2,1,4,3,5]', isHidden: false, points: 18 }],
        hints: ['Find kth node', 'Reverse group', 'Connect groups'],
        tags: ['Linked List', 'Recursion']
      },
      {
        topicId: 'day-55',
        title: 'Intersection of Two Linked Lists',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Find intersection node of two linked lists.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        ListNode a = headA, b = headB;\n        while (a != b) {\n            a = a == null ? headB : a.next;\n            b = b == null ? headA : b.next;\n        }\n        return a;\n    }\n}',
        examples: [{ input: 'listA = [4,1,8], listB = [5,6,1,8]', output: '8' }],
        testCases: [{ input: '[4,1,8]\n[5,6,1,8]', expectedOutput: '8', isHidden: false, points: 10 }],
        hints: ['Switch to other head at null', 'Meet at intersection'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-55',
        title: 'Merge k Sorted Lists',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Merge k sorted linked lists into one sorted list.',
        starterCode: 'import java.util.*;\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode mergeKLists(ListNode[] lists) { return null; }\n}',
        solution: 'import java.util.*;\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) return null;\n        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);\n        for (ListNode node : lists) {\n            if (node != null) pq.offer(node);\n        }\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (!pq.isEmpty()) {\n            ListNode node = pq.poll();\n            curr.next = node;\n            curr = curr.next;\n            if (node.next != null) pq.offer(node.next);\n        }\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }],
        testCases: [{ input: '[[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]', isHidden: false, points: 18 }],
        hints: ['Use min heap', 'Add all heads', 'Poll and add next'],
        tags: ['Linked List', 'Divide and Conquer', 'Heap']
      },
      {
        topicId: 'day-55',
        title: 'Sort List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Sort linked list in O(n log n) time using merge sort.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode sortList(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode sortList(ListNode head) {\n        if (head == null || head.next == null) return head;\n        ListNode slow = head, fast = head.next;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        ListNode mid = slow.next;\n        slow.next = null;\n        ListNode left = sortList(head);\n        ListNode right = sortList(mid);\n        return merge(left, right);\n    }\n    private static ListNode merge(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (l1 != null && l2 != null) {\n            if (l1.val < l2.val) {\n                curr.next = l1;\n                l1 = l1.next;\n            } else {\n                curr.next = l2;\n                l2 = l2.next;\n            }\n            curr = curr.next;\n        }\n        curr.next = l1 != null ? l1 : l2;\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [4,2,1,3]', output: '[1,2,3,4]' }],
        testCases: [{ input: '[4,2,1,3]', expectedOutput: '[1,2,3,4]', isHidden: false, points: 15 }],
        hints: ['Find middle', 'Split and sort recursively', 'Merge sorted halves'],
        tags: ['Linked List', 'Two Pointers', 'Divide and Conquer', 'Sorting']
      },
      {
        topicId: 'day-55',
        title: 'Insertion Sort List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Sort linked list using insertion sort algorithm.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode insertionSortList(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode insertionSortList(ListNode head) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode prev = dummy;\n            while (prev.next != null && prev.next.val < curr.val) {\n                prev = prev.next;\n            }\n            ListNode next = curr.next;\n            curr.next = prev.next;\n            prev.next = curr;\n            curr = next;\n        }\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [4,2,1,3]', output: '[1,2,3,4]' }],
        testCases: [{ input: '[4,2,1,3]', expectedOutput: '[1,2,3,4]', isHidden: false, points: 12 }],
        hints: ['Build sorted list from scratch', 'Insert each node at correct position'],
        tags: ['Linked List', 'Sorting']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 56 - Clone List with Random Pointer & LRU Cache ====================
    const day56Topic = await Topic.findOneAndUpdate(
      { id: 'day-56' },
      {
        id: 'day-56',
        title: 'Clone List with Random Pointer & LRU Cache',
        description: 'Complex structure handling: Deep Copy, HashMap + DLL.',
        week: 8,
        day: 56,
        difficulty: 'Hard',
        estimatedTime: 180,
        prerequisites: ['day-55'],
        compulsoryQuestion: 'Copy List with Random Pointer',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day56Topic.title}`);
    await Question.deleteMany({ topicId: 'day-56' });

    await Question.insertMany([
      {
        topicId: 'day-56',
        title: 'Copy List with Random Pointer',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 30,
        timeLimit: 35,
        description: 'Deep copy linked list with random pointers.',
        starterCode: 'import java.util.*;\nclass Node {\n    int val;\n    Node next, random;\n    Node(int val) { this.val = val; }\n}\npublic class Solution {\n    public static Node copyRandomList(Node head) { return null; }\n}',
        solution: 'import java.util.*;\nclass Node {\n    int val;\n    Node next, random;\n    Node(int val) { this.val = val; }\n}\npublic class Solution {\n    public static Node copyRandomList(Node head) {\n        if (head == null) return null;\n        Map<Node, Node> map = new HashMap<>();\n        Node curr = head;\n        while (curr != null) {\n            map.put(curr, new Node(curr.val));\n            curr = curr.next;\n        }\n        curr = head;\n        while (curr != null) {\n            map.get(curr).next = map.get(curr.next);\n            map.get(curr).random = map.get(curr.random);\n            curr = curr.next;\n        }\n        return map.get(head);\n    }\n}',
        examples: [{ input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]' }],
        testCases: [{ input: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', expectedOutput: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', isHidden: false, points: 15 }],
        hints: ['Use HashMap: old → new', 'First pass: create nodes', 'Second pass: set pointers'],
        tags: ['Hash Table', 'Linked List']
      },
      {
        topicId: 'day-56',
        title: 'LRU Cache',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Design LRU cache with O(1) get and put using HashMap + Doubly Linked List.',
        starterCode: 'import java.util.*;\nclass LRUCache {\n    public LRUCache(int capacity) {}\n    public int get(int key) { return -1; }\n    public void put(int key, int value) {}\n}',
        solution: 'import java.util.*;\nclass LRUCache {\n    class Node {\n        int key, val;\n        Node prev, next;\n        Node(int k, int v) { key = k; val = v; }\n    }\n    private Map<Integer, Node> map = new HashMap<>();\n    private Node head = new Node(0, 0), tail = new Node(0, 0);\n    private int capacity;\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        head.next = tail;\n        tail.prev = head;\n    }\n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        Node node = map.get(key);\n        remove(node);\n        insert(node);\n        return node.val;\n    }\n    public void put(int key, int value) {\n        if (map.containsKey(key)) remove(map.get(key));\n        if (map.size() == capacity) {\n            remove(tail.prev);\n        }\n        insert(new Node(key, value));\n    }\n    private void remove(Node node) {\n        map.remove(node.key);\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    private void insert(Node node) {\n        map.put(node.key, node);\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n}',
        examples: [{ input: '["LRUCache",2],["put",1,1],["put",2,2],["get",1]', output: '[null,null,null,1]' }],
        testCases: [{ input: '["LRUCache",2],["put",1,1],["get",1]', expectedOutput: '[null,null,1]', isHidden: false, points: 18 }],
        hints: ['HashMap for O(1) lookup', 'DLL for O(1) insert/remove', 'Most recent at head'],
        tags: ['Hash Table', 'Linked List', 'Design']
      },
      {
        topicId: 'day-56',
        title: 'Flatten a Multilevel Doubly Linked List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 30,
        timeLimit: 35,
        description: 'Flatten multilevel DLL with child pointers.',
        starterCode: 'class Node {\n    int val;\n    Node prev, next, child;\n    Node(int val) { this.val = val; }\n}\npublic class Solution {\n    public static Node flatten(Node head) { return null; }\n}',
        solution: 'class Node {\n    int val;\n    Node prev, next, child;\n    Node(int val) { this.val = val; }\n}\npublic class Solution {\n    public static Node flatten(Node head) {\n        if (head == null) return null;\n        Node curr = head;\n        while (curr != null) {\n            if (curr.child != null) {\n                Node child = curr.child;\n                Node next = curr.next;\n                curr.next = child;\n                child.prev = curr;\n                curr.child = null;\n                while (child.next != null) child = child.next;\n                child.next = next;\n                if (next != null) next.prev = child;\n            }\n            curr = curr.next;\n        }\n        return head;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10]', output: '[1,2,3,7,8,11,12,9,10,4,5,6]' }],
        testCases: [{ input: '[1,2,3,4,5,6]', expectedOutput: '[1,2,3,4,5,6]', isHidden: false, points: 15 }],
        hints: ['Insert child after current', 'Find tail of child list', 'Connect to next'],
        tags: ['Linked List', 'DFS', 'Doubly-Linked List']
      },
      {
        topicId: 'day-56',
        title: 'Design Browser History',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Design browser history with visit, back, and forward.',
        starterCode: 'import java.util.*;\nclass BrowserHistory {\n    public BrowserHistory(String homepage) {}\n    public void visit(String url) {}\n    public String back(int steps) { return ""; }\n    public String forward(int steps) { return ""; }\n}',
        solution: 'import java.util.*;\nclass BrowserHistory {\n    private List<String> history = new ArrayList<>();\n    private int curr = 0;\n    public BrowserHistory(String homepage) {\n        history.add(homepage);\n    }\n    public void visit(String url) {\n        while (history.size() > curr + 1) {\n            history.remove(history.size() - 1);\n        }\n        history.add(url);\n        curr++;\n    }\n    public String back(int steps) {\n        curr = Math.max(0, curr - steps);\n        return history.get(curr);\n    }\n    public String forward(int steps) {\n        curr = Math.min(history.size() - 1, curr + steps);\n        return history.get(curr);\n    }\n}',
        examples: [{ input: '["BrowserHistory","leetcode.com"],["visit","google.com"],["back",1]', output: '[null,null,"leetcode.com"]' }],
        testCases: [{ input: '["BrowserHistory","leetcode.com"],["back",1]', expectedOutput: '[null,"leetcode.com"]', isHidden: false, points: 12 }],
        hints: ['Use list or DLL', 'Track current position', 'Clear forward on visit'],
        tags: ['Array', 'Linked List', 'Stack', 'Design']
      },
      {
        topicId: 'day-56',
        title: 'LFU Cache',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 40,
        timeLimit: 45,
        description: 'Design LFU cache with O(1) get and put.',
        starterCode: 'import java.util.*;\nclass LFUCache {\n    public LFUCache(int capacity) {}\n    public int get(int key) { return -1; }\n    public void put(int key, int value) {}\n}',
        solution: 'import java.util.*;\nclass LFUCache {\n    private int capacity, minFreq;\n    private Map<Integer, int[]> cache = new HashMap<>();\n    private Map<Integer, LinkedHashSet<Integer>> freqMap = new HashMap<>();\n    public LFUCache(int capacity) {\n        this.capacity = capacity;\n    }\n    public int get(int key) {\n        if (!cache.containsKey(key)) return -1;\n        int[] node = cache.get(key);\n        updateFreq(key, node);\n        return node[0];\n    }\n    public void put(int key, int value) {\n        if (capacity == 0) return;\n        if (cache.containsKey(key)) {\n            int[] node = cache.get(key);\n            node[0] = value;\n            updateFreq(key, node);\n        } else {\n            if (cache.size() >= capacity) {\n                int evict = freqMap.get(minFreq).iterator().next();\n                freqMap.get(minFreq).remove(evict);\n                cache.remove(evict);\n            }\n            cache.put(key, new int[]{value, 1});\n            minFreq = 1;\n            freqMap.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(key);\n        }\n    }\n    private void updateFreq(int key, int[] node) {\n        int freq = node[1];\n        freqMap.get(freq).remove(key);\n        if (freqMap.get(freq).isEmpty() && freq == minFreq) minFreq++;\n        node[1]++;\n        freqMap.computeIfAbsent(node[1], k -> new LinkedHashSet<>()).add(key);\n    }\n}',
        examples: [{ input: '["LFUCache",2],["put",1,1],["put",2,2],["get",1]', output: '[null,null,null,1]' }],
        testCases: [{ input: '["LFUCache",2],["put",1,1],["get",1]', expectedOutput: '[null,null,1]', isHidden: false, points: 20 }],
        hints: ['Track frequency per key', 'LinkedHashSet for LRU within freq', 'Track minFreq'],
        tags: ['Hash Table', 'Linked List', 'Design']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 57 - Stack Implementation & Applications ====================
    const day57Topic = await Topic.findOneAndUpdate(
      { id: 'day-57' },
      {
        id: 'day-57',
        title: 'Stack Implementation & Applications',
        description: 'Basic LIFO operations and applications.',
        week: 9,
        day: 57,
        difficulty: 'Easy',
        estimatedTime: 120,
        prerequisites: ['day-56'],
        compulsoryQuestion: 'Valid Parentheses',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day57Topic.title}`);
    await Question.deleteMany({ topicId: 'day-57' });

    await Question.insertMany([
      {
        topicId: 'day-57',
        title: 'Implement Stack using Queues',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Implement LIFO stack using only two queues.',
        starterCode: 'import java.util.*;\nclass MyStack {\n    public MyStack() {}\n    public void push(int x) {}\n    public int pop() { return 0; }\n    public int top() { return 0; }\n    public boolean empty() { return true; }\n}',
        solution: 'import java.util.*;\nclass MyStack {\n    private Queue<Integer> queue = new LinkedList<>();\n    public MyStack() {}\n    public void push(int x) {\n        queue.offer(x);\n        for (int i = 0; i < queue.size() - 1; i++) {\n            queue.offer(queue.poll());\n        }\n    }\n    public int pop() { return queue.poll(); }\n    public int top() { return queue.peek(); }\n    public boolean empty() { return queue.isEmpty(); }\n}',
        examples: [{ input: '["push",1],["push",2],["top"],["pop"]', output: '[null,null,2,2]' }],
        testCases: [{ input: '["push",1],["top"]', expectedOutput: '[null,1]', isHidden: false, points: 10 }],
        hints: ['Push: add then rotate', 'Pop and top: standard queue ops'],
        tags: ['Stack', 'Queue', 'Design']
      },
      {
        topicId: 'day-57',
        title: 'Min Stack',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Design stack that supports push, pop, top, and getMin in O(1).',
        starterCode: 'import java.util.*;\nclass MinStack {\n    public MinStack() {}\n    public void push(int val) {}\n    public void pop() {}\n    public int top() { return 0; }\n    public int getMin() { return 0; }\n}',
        solution: 'import java.util.*;\nclass MinStack {\n    private Stack<int[]> stack = new Stack<>();\n    public MinStack() {}\n    public void push(int val) {\n        int min = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);\n        stack.push(new int[]{val, min});\n    }\n    public void pop() { stack.pop(); }\n    public int top() { return stack.peek()[0]; }\n    public int getMin() { return stack.peek()[1]; }\n}',
        examples: [{ input: '["push",-2],["push",0],["getMin"]', output: '[null,null,-2]' }],
        testCases: [{ input: '["push",-2],["getMin"]', expectedOutput: '[null,-2]', isHidden: false, points: 12 }],
        hints: ['Store value and min together', 'Or use two stacks'],
        tags: ['Stack', 'Design']
      },
      {
        topicId: 'day-57',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: 'Check if brackets are valid: (), {}, [].',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean isValid(String s) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == \'(\') stack.push(\')\');\n            else if (c == \'{\') stack.push(\'}\');\n            else if (c == \'[\') stack.push(\']\');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}',
        examples: [{ input: 's = "()[]{}"', output: 'true' }],
        testCases: [{ input: '()[]{}', expectedOutput: 'true', isHidden: false, points: 8 }],
        hints: ['Push expected closing', 'Match on pop'],
        tags: ['String', 'Stack']
      },
      {
        topicId: 'day-57',
        title: 'Simplify Path',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Convert Unix path to simplified canonical path.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static String simplifyPath(String path) { return ""; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static String simplifyPath(String path) {\n        Deque<String> stack = new ArrayDeque<>();\n        for (String part : path.split("/")) {\n            if (part.equals("..")) {\n                if (!stack.isEmpty()) stack.pop();\n            } else if (!part.isEmpty() && !part.equals(".")) {\n                stack.push(part);\n            }\n        }\n        StringBuilder sb = new StringBuilder();\n        while (!stack.isEmpty()) {\n            sb.insert(0, "/" + stack.pop());\n        }\n        return sb.length() == 0 ? "/" : sb.toString();\n    }\n}',
        examples: [{ input: 'path = "/a/./b/../../c/"', output: '"/c"' }],
        testCases: [{ input: '/a/./b/../../c/', expectedOutput: '/c', isHidden: false, points: 12 }],
        hints: ['Split by /', 'Pop for ..', 'Skip . and empty'],
        tags: ['String', 'Stack']
      },
      {
        topicId: 'day-57',
        title: 'Backspace String Compare',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Compare strings after applying backspace (#).',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static boolean backspaceCompare(String s, String t) { return false; }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static boolean backspaceCompare(String s, String t) {\n        return build(s).equals(build(t));\n    }\n    private static String build(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c != \'#\') stack.push(c);\n            else if (!stack.isEmpty()) stack.pop();\n        }\n        return stack.toString();\n    }\n}',
        examples: [{ input: 's = "ab#c", t = "ad#c"', output: 'true' }],
        testCases: [{ input: 'ab#c\nad#c', expectedOutput: 'true', isHidden: false, points: 8 }],
        hints: ['Use stack to build result', 'Pop on #', 'Compare final strings'],
        tags: ['Two Pointers', 'String', 'Stack']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 55-57 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays55to57();
