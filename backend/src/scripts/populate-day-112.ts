import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question";
import Topic from "../models/Topic";

dotenv.config();

const topics = [
  {
    id: "112",
    title: "Day 112 – Final DSA Review",
    description: "Comprehensive review covering advanced heap operations, cache implementations, and tree serialization - essential interview topics.",
    week: 16,
    day: 112,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["111"],
    compulsoryQuestion: "Trapping Rain Water II",
    practiceQuestions: 5,
    isLocked: false,
  },
];

function createQuestion(q: any) {
  return {
    topicId: q.topicId,
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    type: "practice",
    isCompulsory: q.isCompulsory ?? false,
    points: q.points,
    timeLimit: 45,
    starterCode: q.starterCode || "public class Solution {\n    \n}",
    solution: q.solution,
    examples: q.examples,
    testCases: q.testCases.map((tc: any) => ({
      input: tc.input,
      expectedOutput: tc.expected,
      isHidden: tc.isHidden,
      points: tc.isHidden ? 15 : 10,
    })),
    hints: [q.hint],
    tags: q.tags,
  };
}

const questions = [
  // Day 112 - Q1
  createQuestion({
    title: "Trapping Rain Water II",
    description:
      "Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.\n\nWater can flow to neighboring cells (up, down, left, right) if the neighbor's height is lower. The water level at each cell is determined by the minimum height of the boundary cells that surround it.",
    difficulty: "Hard",
    topicId: "112",
    isCompulsory: true,
    examples: [
      {
        input: "heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]",
        output: "4",
        explanation: "Water can be trapped in cells with lower elevation surrounded by higher boundaries",
      },
      {
        input: "heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]",
        output: "10",
        explanation: "Center cell traps water up to height 3",
      },
    ],
    testCases: [
      { input: "[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]", expected: "4", isHidden: false },
      { input: "[[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]", expected: "10", isHidden: true },
      { input: "[[12,13,1,12],[13,4,13,12],[13,8,10,12],[12,13,12,12],[13,13,13,13]]", expected: "14", isHidden: true },
      { input: "[[1,1],[1,1]]", expected: "0", isHidden: true },
      { input: "[[5,5,5,1],[5,1,1,5],[5,1,5,5],[5,2,5,8]]", expected: "3", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class Solution {
        public int trapRainWater(int[][] heightMap) {
            if (heightMap == null || heightMap.length == 0) return 0;
            
            int m = heightMap.length;
            int n = heightMap[0].length;
            
            // Priority queue to process cells from lowest to highest
            PriorityQueue<Cell> pq = new PriorityQueue<>((a, b) -> a.height - b.height);
            boolean[][] visited = new boolean[m][n];
            
            // Add all boundary cells to priority queue
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) {
                    if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
                        pq.offer(new Cell(i, j, heightMap[i][j]));
                        visited[i][j] = true;
                    }
                }
            }
            
            int water = 0;
            int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
            
            while (!pq.isEmpty()) {
                Cell cell = pq.poll();
                
                // Check all neighbors
                for (int[] dir : dirs) {
                    int nx = cell.x + dir[0];
                    int ny = cell.y + dir[1];
                    
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
                        visited[nx][ny] = true;
                        
                        // Water level is determined by max of current height and neighbor height
                        water += Math.max(0, cell.height - heightMap[nx][ny]);
                        
                        // Add to queue with updated height (water fills to boundary level)
                        pq.offer(new Cell(nx, ny, Math.max(heightMap[nx][ny], cell.height)));
                    }
                }
            }
            
            return water;
        }
        
        private class Cell {
            int x, y, height;
            
            Cell(int x, int y, int height) {
                this.x = x;
                this.y = y;
                this.height = height;
            }
        }
    }
    
    // Time: O(m * n * log(m * n)) due to priority queue operations
    // Space: O(m * n) for visited array and priority queue
    `,
    hint: "Use min-heap starting from boundary cells. Process cells by height, tracking maximum water level encountered.",
    tags: ["Heap", "Priority Queue", "BFS", "Matrix"],
    points: 150,
  }),

  // Day 112 - Q2
  createQuestion({
    title: "Sliding Window Median",
    description:
      "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.\n\nGiven an array nums and an integer k, there is a sliding window of size k which is moving from the very left to the very right. You can only see the k numbers in the window. Each time the window moves right by one position.\n\nReturn the median array for each window in the original array. Answers within 10^-5 of the actual value will be accepted.",
    difficulty: "Hard",
    topicId: "112",
    examples: [
      {
        input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        output: "[1.0,-1.0,-1.0,3.0,5.0,6.0]",
        explanation: "Window medians: [1,3,-1]→1, [3,-1,-3]→-1, [-1,-3,5]→-1, [-3,5,3]→3, [5,3,6]→5, [3,6,7]→6",
      },
      {
        input: "nums = [1,2,3,4,2,3,1,4,2], k = 3",
        output: "[2.0,3.0,3.0,3.0,2.0,3.0,2.0]",
        explanation: "For each window of size 3, find the median",
      },
    ],
    testCases: [
      { input: "[1,3,-1,-3,5,3,6,7], 3", expected: "[1.0,-1.0,-1.0,3.0,5.0,6.0]", isHidden: false },
      { input: "[1,2,3,4,2,3,1,4,2], 3", expected: "[2.0,3.0,3.0,3.0,2.0,3.0,2.0]", isHidden: true },
      { input: "[1,4,2,3], 4", expected: "[2.5]", isHidden: true },
      { input: "[1,1,1,1,1], 2", expected: "[1.0,1.0,1.0,1.0]", isHidden: true },
      { input: "[2147483647,2147483647], 2", expected: "[2147483647.0]", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class Solution {
        public double[] medianSlidingWindow(int[] nums, int k) {
            double[] result = new double[nums.length - k + 1];
            
            // Max heap for smaller half, min heap for larger half
            PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b, a));
            PriorityQueue<Integer> minHeap = new PriorityQueue<>();
            
            for (int i = 0; i < nums.length; i++) {
                // Add current element
                if (maxHeap.isEmpty() || nums[i] <= maxHeap.peek()) {
                    maxHeap.offer(nums[i]);
                } else {
                    minHeap.offer(nums[i]);
                }
                
                // Balance heaps
                balance(maxHeap, minHeap);
                
                // Remove element going out of window
                if (i >= k) {
                    if (!maxHeap.remove(nums[i - k])) {
                        minHeap.remove(nums[i - k]);
                    }
                    balance(maxHeap, minHeap);
                }
                
                // Calculate median if window is full
                if (i >= k - 1) {
                    if (k % 2 == 0) {
                        result[i - k + 1] = ((long) maxHeap.peek() + (long) minHeap.peek()) / 2.0;
                    } else {
                        result[i - k + 1] = (double) maxHeap.peek();
                    }
                }
            }
            
            return result;
        }
        
        private void balance(PriorityQueue<Integer> maxHeap, PriorityQueue<Integer> minHeap) {
            // MaxHeap should have equal or one more element than minHeap
            while (maxHeap.size() > minHeap.size() + 1) {
                minHeap.offer(maxHeap.poll());
            }
            while (minHeap.size() > maxHeap.size()) {
                maxHeap.offer(minHeap.poll());
            }
        }
    }
    
    // Alternative: Using TreeMap for efficient removal
    class TreeMapSolution {
        public double[] medianSlidingWindow(int[] nums, int k) {
            double[] result = new double[nums.length - k + 1];
            TreeMap<Integer, Integer> maxHeap = new TreeMap<>(Collections.reverseOrder());
            TreeMap<Integer, Integer> minHeap = new TreeMap<>();
            int maxSize = 0, minSize = 0;
            
            for (int i = 0; i < nums.length; i++) {
                // Add element
                if (maxHeap.isEmpty() || nums[i] <= maxHeap.firstKey()) {
                    maxHeap.put(nums[i], maxHeap.getOrDefault(nums[i], 0) + 1);
                    maxSize++;
                } else {
                    minHeap.put(nums[i], minHeap.getOrDefault(nums[i], 0) + 1);
                    minSize++;
                }
                
                // Balance
                while (maxSize > minSize + 1) {
                    int val = maxHeap.firstKey();
                    maxHeap.put(val, maxHeap.get(val) - 1);
                    if (maxHeap.get(val) == 0) maxHeap.remove(val);
                    minHeap.put(val, minHeap.getOrDefault(val, 0) + 1);
                    maxSize--;
                    minSize++;
                }
                while (minSize > maxSize) {
                    int val = minHeap.firstKey();
                    minHeap.put(val, minHeap.get(val) - 1);
                    if (minHeap.get(val) == 0) minHeap.remove(val);
                    maxHeap.put(val, maxHeap.getOrDefault(val, 0) + 1);
                    minSize--;
                    maxSize++;
                }
                
                // Remove old element
                if (i >= k) {
                    int toRemove = nums[i - k];
                    if (maxHeap.containsKey(toRemove)) {
                        maxHeap.put(toRemove, maxHeap.get(toRemove) - 1);
                        if (maxHeap.get(toRemove) == 0) maxHeap.remove(toRemove);
                        maxSize--;
                    } else {
                        minHeap.put(toRemove, minHeap.get(toRemove) - 1);
                        if (minHeap.get(toRemove) == 0) minHeap.remove(toRemove);
                        minSize--;
                    }
                    
                    // Balance after removal
                    while (maxSize > minSize + 1) {
                        int val = maxHeap.firstKey();
                        maxHeap.put(val, maxHeap.get(val) - 1);
                        if (maxHeap.get(val) == 0) maxHeap.remove(val);
                        minHeap.put(val, minHeap.getOrDefault(val, 0) + 1);
                        maxSize--;
                        minSize++;
                    }
                    while (minSize > maxSize) {
                        int val = minHeap.firstKey();
                        minHeap.put(val, minHeap.get(val) - 1);
                        if (minHeap.get(val) == 0) minHeap.remove(val);
                        maxHeap.put(val, maxHeap.getOrDefault(val, 0) + 1);
                        minSize--;
                        maxSize++;
                    }
                }
                
                // Calculate median
                if (i >= k - 1) {
                    if (k % 2 == 0) {
                        result[i - k + 1] = ((long) maxHeap.firstKey() + (long) minHeap.firstKey()) / 2.0;
                    } else {
                        result[i - k + 1] = (double) maxHeap.firstKey();
                    }
                }
            }
            
            return result;
        }
    }
    
    // Time: O(n * k) for removal from heap, O(n * log k) with TreeMap
    // Space: O(k) for heaps
    `,
    hint: "Maintain two heaps: max-heap for smaller half, min-heap for larger half. Balance after each add/remove.",
    tags: ["Heap", "Priority Queue", "Sliding Window", "Two Pointers"],
    points: 150,
  }),

  // Day 112 - Q3
  createQuestion({
    title: "LRU Cache",
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if it exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if it exists. Otherwise, add the key-value pair. If the number of keys exceeds capacity, evict the least recently used key.\n\nThe functions get and put must each run in O(1) average time complexity.",
    difficulty: "Medium",
    topicId: "112",
    examples: [
      {
        input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation: "Cache capacity 2. Operations show LRU eviction behavior",
      },
    ],
    testCases: [
      { input: "2, put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)", expected: "[null, null, null, 1, null, -1, null, -1, 3, 4]", isHidden: false },
      { input: "1, put(2,1), get(2)", expected: "[null, null, 1]", isHidden: true },
      { input: "2, get(2), put(2,6), get(1), put(1,5), put(1,2), get(1), get(2)", expected: "[null, -1, null, -1, null, null, 2, 6]", isHidden: true },
      { input: "3, put(1,1), put(2,2), put(3,3), put(4,4), get(4), get(3), get(2), get(1)", expected: "[null, null, null, null, null, 4, 3, 2, -1]", isHidden: true },
      { input: "2, put(2,1), put(1,1), put(2,3), put(4,1), get(1), get(2)", expected: "[null, null, null, null, null, -1, 3]", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class LRUCache {
        private class Node {
            int key, value;
            Node prev, next;
            
            Node(int key, int value) {
                this.key = key;
                this.value = value;
            }
        }
        
        private int capacity;
        private Map<Integer, Node> cache;
        private Node head, tail;
        
        public LRUCache(int capacity) {
            this.capacity = capacity;
            this.cache = new HashMap<>();
            
            // Dummy head and tail
            head = new Node(0, 0);
            tail = new Node(0, 0);
            head.next = tail;
            tail.prev = head;
        }
        
        public int get(int key) {
            if (!cache.containsKey(key)) {
                return -1;
            }
            
            Node node = cache.get(key);
            moveToHead(node);
            return node.value;
        }
        
        public void put(int key, int value) {
            if (cache.containsKey(key)) {
                Node node = cache.get(key);
                node.value = value;
                moveToHead(node);
            } else {
                Node newNode = new Node(key, value);
                cache.put(key, newNode);
                addToHead(newNode);
                
                if (cache.size() > capacity) {
                    Node lru = removeTail();
                    cache.remove(lru.key);
                }
            }
        }
        
        private void addToHead(Node node) {
            node.next = head.next;
            node.prev = head;
            head.next.prev = node;
            head.next = node;
        }
        
        private void removeNode(Node node) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        
        private void moveToHead(Node node) {
            removeNode(node);
            addToHead(node);
        }
        
        private Node removeTail() {
            Node lru = tail.prev;
            removeNode(lru);
            return lru;
        }
    }
    
    // Alternative: Using LinkedHashMap
    class LRUCacheLinkedHashMap {
        private LinkedHashMap<Integer, Integer> cache;
        private int capacity;
        
        public LRUCacheLinkedHashMap(int capacity) {
            this.capacity = capacity;
            this.cache = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true) {
                protected boolean removeEldestEntry(Map.Entry eldest) {
                    return size() > capacity;
                }
            };
        }
        
        public int get(int key) {
            return cache.getOrDefault(key, -1);
        }
        
        public void put(int key, int value) {
            cache.put(key, value);
        }
    }
    
    // Time: O(1) for both get and put operations
    // Space: O(capacity) for storing cache entries
    `,
    hint: "Use HashMap + Doubly Linked List. HashMap for O(1) access, DLL for O(1) add/remove at ends.",
    tags: ["Hash Table", "Linked List", "Design"],
    points: 120,
  }),

  // Day 112 - Q4
  createQuestion({
    title: "LFU Cache",
    description:
      "Design and implement a data structure for a Least Frequently Used (LFU) cache.\n\nImplement the LFUCache class:\n- LFUCache(int capacity) Initializes the object with the capacity of the data structure.\n- int get(int key) Gets the value of the key if it exists in the cache. Otherwise, returns -1.\n- void put(int key, int value) Updates the value of the key if present, or inserts if not. When capacity is reached, invalidate and remove the least frequently used key. If there is a tie, remove the least recently used key.\n\nBoth get and put must run in O(1) average time complexity.",
    difficulty: "Hard",
    topicId: "112",
    examples: [
      {
        input: 'LFUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), get(3), put(4,4), get(1), get(3), get(4)',
        output: "[null, null, null, 1, null, -1, 3, null, -1, 3, 4]",
        explanation: "Key 2 evicted as LFU when capacity reached",
      },
    ],
    testCases: [
      { input: "2, put(1,1), put(2,2), get(1), put(3,3), get(2), get(3), put(4,4), get(1), get(3), get(4)", expected: "[null, null, null, 1, null, -1, 3, null, -1, 3, 4]", isHidden: false },
      { input: "0, put(0,0), get(0)", expected: "[null, null, -1]", isHidden: true },
      { input: "2, put(2,1), put(3,2), get(3), get(2), put(4,3), get(2), get(3), get(4)", expected: "[null, null, null, 2, 1, null, 1, -1, 3]", isHidden: true },
      { input: "3, put(1,1), put(2,2), put(3,3), put(4,4), get(4), get(3), get(2), get(1)", expected: "[null, null, null, null, null, 4, 3, 2, -1]", isHidden: true },
      { input: "1, put(2,1), get(2), put(3,2), get(2), get(3)", expected: "[null, null, 1, null, -1, 2]", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class LFUCache {
        private class Node {
            int key, value, freq;
            Node prev, next;
            
            Node(int key, int value) {
                this.key = key;
                this.value = value;
                this.freq = 1;
            }
        }
        
        private class DLList {
            Node head, tail;
            int size;
            
            DLList() {
                head = new Node(0, 0);
                tail = new Node(0, 0);
                head.next = tail;
                tail.prev = head;
                size = 0;
            }
            
            void add(Node node) {
                node.next = head.next;
                node.prev = head;
                head.next.prev = node;
                head.next = node;
                size++;
            }
            
            void remove(Node node) {
                node.prev.next = node.next;
                node.next.prev = node.prev;
                size--;
            }
            
            Node removeLast() {
                if (size == 0) return null;
                Node last = tail.prev;
                remove(last);
                return last;
            }
        }
        
        private int capacity, minFreq;
        private Map<Integer, Node> cache;
        private Map<Integer, DLList> freqMap;
        
        public LFUCache(int capacity) {
            this.capacity = capacity;
            this.minFreq = 0;
            this.cache = new HashMap<>();
            this.freqMap = new HashMap<>();
        }
        
        public int get(int key) {
            if (!cache.containsKey(key)) {
                return -1;
            }
            
            Node node = cache.get(key);
            updateFreq(node);
            return node.value;
        }
        
        public void put(int key, int value) {
            if (capacity == 0) return;
            
            if (cache.containsKey(key)) {
                Node node = cache.get(key);
                node.value = value;
                updateFreq(node);
            } else {
                if (cache.size() >= capacity) {
                    DLList minFreqList = freqMap.get(minFreq);
                    Node toRemove = minFreqList.removeLast();
                    cache.remove(toRemove.key);
                }
                
                Node newNode = new Node(key, value);
                cache.put(key, newNode);
                freqMap.putIfAbsent(1, new DLList());
                freqMap.get(1).add(newNode);
                minFreq = 1;
            }
        }
        
        private void updateFreq(Node node) {
            int freq = node.freq;
            DLList list = freqMap.get(freq);
            list.remove(node);
            
            if (list.size == 0 && freq == minFreq) {
                minFreq++;
            }
            
            node.freq++;
            freqMap.putIfAbsent(node.freq, new DLList());
            freqMap.get(node.freq).add(node);
        }
    }
    
    // Time: O(1) for both get and put operations
    // Space: O(capacity) for storing nodes and frequency lists
    `,
    hint: "Use HashMap for cache + HashMap of frequency→DLL. Track minFreq for eviction. Update frequency on access.",
    tags: ["Hash Table", "Linked List", "Design"],
    points: 150,
  }),

  // Day 112 - Q5
  createQuestion({
    title: "Serialize and Deserialize Binary Tree",
    description:
      "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
    difficulty: "Hard",
    topicId: "112",
    examples: [
      {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]",
        explanation: "Serialize tree to string, then deserialize back to original tree",
      },
      {
        input: "root = []",
        output: "[]",
        explanation: "Empty tree",
      },
    ],
    testCases: [
      { input: "[1,2,3,null,null,4,5]", expected: "[1,2,3,null,null,4,5]", isHidden: false },
      { input: "[]", expected: "[]", isHidden: true },
      { input: "[1]", expected: "[1]", isHidden: true },
      { input: "[1,2,3,4,5,6,7]", expected: "[1,2,3,4,5,6,7]", isHidden: true },
      { input: "[5,2,3,null,null,2,4,3,1]", expected: "[5,2,3,null,null,2,4,3,1]", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    public class Codec {
        
        // Encodes a tree to a single string.
        public String serialize(TreeNode root) {
            if (root == null) return "null";
            
            StringBuilder sb = new StringBuilder();
            Queue<TreeNode> queue = new LinkedList<>();
            queue.offer(root);
            
            while (!queue.isEmpty()) {
                TreeNode node = queue.poll();
                
                if (node == null) {
                    sb.append("null,");
                } else {
                    sb.append(node.val).append(",");
                    queue.offer(node.left);
                    queue.offer(node.right);
                }
            }
            
            return sb.toString();
        }
        
        // Decodes your encoded data to tree.
        public TreeNode deserialize(String data) {
            if (data.equals("null")) return null;
            
            String[] values = data.split(",");
            TreeNode root = new TreeNode(Integer.parseInt(values[0]));
            Queue<TreeNode> queue = new LinkedList<>();
            queue.offer(root);
            
            int i = 1;
            while (!queue.isEmpty() && i < values.length) {
                TreeNode node = queue.poll();
                
                if (!values[i].equals("null")) {
                    node.left = new TreeNode(Integer.parseInt(values[i]));
                    queue.offer(node.left);
                }
                i++;
                
                if (i < values.length && !values[i].equals("null")) {
                    node.right = new TreeNode(Integer.parseInt(values[i]));
                    queue.offer(node.right);
                }
                i++;
            }
            
            return root;
        }
    }
    
    // Alternative: Preorder traversal approach
    class CodecPreorder {
        private int index;
        
        public String serialize(TreeNode root) {
            StringBuilder sb = new StringBuilder();
            serializeHelper(root, sb);
            return sb.toString();
        }
        
        private void serializeHelper(TreeNode node, StringBuilder sb) {
            if (node == null) {
                sb.append("null,");
                return;
            }
            
            sb.append(node.val).append(",");
            serializeHelper(node.left, sb);
            serializeHelper(node.right, sb);
        }
        
        public TreeNode deserialize(String data) {
            String[] values = data.split(",");
            index = 0;
            return deserializeHelper(values);
        }
        
        private TreeNode deserializeHelper(String[] values) {
            if (index >= values.length || values[index].equals("null")) {
                index++;
                return null;
            }
            
            TreeNode node = new TreeNode(Integer.parseInt(values[index++]));
            node.left = deserializeHelper(values);
            node.right = deserializeHelper(values);
            
            return node;
        }
    }
    
    // Definition for a binary tree node
    class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) { val = x; }
    }
    
    // Time: O(n) for both serialize and deserialize
    // Space: O(n) for storing all nodes
    `,
    hint: "Use level-order traversal (BFS) for serialization. Store null nodes to maintain structure. Deserialize by rebuilding level by level.",
    tags: ["Tree", "Binary Tree", "DFS", "BFS", "Design", "String"],
    points: 150,
  }),
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("✅ Connected to MongoDB");

    console.log("\n📝 Creating Topics...");
    for (const topic of topics) {
      const exists = await Topic.findOne({ id: topic.id });
      if (exists) {
        console.log(`⏭️  Exists: ${topic.title}`);
      } else {
        await Topic.create(topic);
        console.log(`✅ Created: ${topic.title}`);
      }
    }

    console.log("\n📝 Creating Questions...");
    let createdCount = 0;
    let skippedCount = 0;

    for (const question of questions) {
      const exists = await Question.findOne({ title: question.title });
      if (exists) {
        console.log(`⏭️  Exists: ${question.title}`);
        skippedCount++;
      } else {
        await Question.create(question);
        console.log(`✅ Created: ${question.title}`);
        createdCount++;
      }
    }

    console.log(
      `\n🎉 Day 112 processing complete! Created ${createdCount} questions, skipped ${skippedCount} existing`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
