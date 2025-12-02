import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question";
import Topic from "../models/Topic";

dotenv.config();

const topics = [
  {
    id: "108",
    title: "Day 108 – Segment Tree (Build & Query)",
    description: "Introduction to segment trees for efficient range queries including sum, minimum, GCD, and interval operations.",
    week: 16,
    day: 108,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["107"],
    compulsoryQuestion: "Range Sum Query - Mutable",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "109",
    title: "Day 109 – Segment Tree (Lazy Propagation)",
    description: "Advanced segment tree techniques with lazy propagation for efficient range updates and complex query operations.",
    week: 16,
    day: 109,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["108"],
    compulsoryQuestion: "Range Add Queries",
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
  // Day 108 - Q1
  createQuestion({
    title: "Range Sum Query - Mutable",
    description:
      "Given an integer array nums, handle multiple queries of the following types:\n1. Update the value of an element in nums.\n2. Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.\n\nImplement the NumArray class with update(index, val) and sumRange(left, right) methods.",
    difficulty: "Medium",
    topicId: "108",
    isCompulsory: true,
    examples: [
      {
        input: 'nums = [1,3,5], update(1,2), sumRange(0,2)',
        output: "8",
        explanation: "After update, array becomes [1,2,5]. Sum from index 0 to 2 is 1+2+5=8",
      },
      {
        input: 'nums = [7,2,7,2,0], sumRange(0,2), update(4,6), sumRange(0,4)',
        output: "16, 24",
        explanation: "Initial sum(0,2)=16. After update, sum(0,4)=24",
      },
    ],
    testCases: [
      { input: "[1,3,5], update(1,2), sumRange(0,2)", expected: "8", isHidden: false },
      { input: "[7,2,7,2,0], sumRange(0,2), update(4,6), sumRange(0,4)", expected: "16, 24", isHidden: true },
      { input: "[9,1,7,8,3], sumRange(1,3), update(2,4), sumRange(0,4)", expected: "16, 25", isHidden: true },
      { input: "[5], update(0,10), sumRange(0,0)", expected: "10", isHidden: true },
      { input: "[1,2,3,4,5,6,7,8,9,10], sumRange(3,7), update(5,0)", expected: "35", isHidden: true },
    ],
    solution: `
    class NumArray {
        private int[] tree;
        private int n;
        
        public NumArray(int[] nums) {
            n = nums.length;
            tree = new int[4 * n];
            if (n > 0) {
                build(nums, 0, 0, n - 1);
            }
        }
        
        private void build(int[] nums, int node, int start, int end) {
            if (start == end) {
                tree[node] = nums[start];
                return;
            }
            
            int mid = start + (end - start) / 2;
            int leftNode = 2 * node + 1;
            int rightNode = 2 * node + 2;
            
            build(nums, leftNode, start, mid);
            build(nums, rightNode, mid + 1, end);
            
            tree[node] = tree[leftNode] + tree[rightNode];
        }
        
        public void update(int index, int val) {
            updateHelper(0, 0, n - 1, index, val);
        }
        
        private void updateHelper(int node, int start, int end, int idx, int val) {
            if (start == end) {
                tree[node] = val;
                return;
            }
            
            int mid = start + (end - start) / 2;
            int leftNode = 2 * node + 1;
            int rightNode = 2 * node + 2;
            
            if (idx <= mid) {
                updateHelper(leftNode, start, mid, idx, val);
            } else {
                updateHelper(rightNode, mid + 1, end, idx, val);
            }
            
            tree[node] = tree[leftNode] + tree[rightNode];
        }
        
        public int sumRange(int left, int right) {
            return queryHelper(0, 0, n - 1, left, right);
        }
        
        private int queryHelper(int node, int start, int end, int l, int r) {
            if (r < start || l > end) {
                return 0;
            }
            
            if (l <= start && end <= r) {
                return tree[node];
            }
            
            int mid = start + (end - start) / 2;
            int leftSum = queryHelper(2 * node + 1, start, mid, l, r);
            int rightSum = queryHelper(2 * node + 2, mid + 1, end, l, r);
            
            return leftSum + rightSum;
        }
    }
    
    // Time: O(log n) for both update and query
    // Space: O(n) for the segment tree
    `,
    hint: "Build a segment tree where each node stores the sum of its range. Update and query in O(log n).",
    tags: ["Segment Tree", "Array", "Design"],
    points: 120,
  }),

  // Day 108 - Q2
  createQuestion({
    title: "Range Minimum Query",
    description:
      "Given an array nums of integers, implement a data structure that supports:\n1. query(left, right): Returns the minimum element in the range [left, right].\n2. update(index, val): Updates the value at index to val.\n\nImplement the RMQ class efficiently using a segment tree.",
    difficulty: "Medium",
    topicId: "108",
    examples: [
      {
        input: "nums = [2,5,1,4,9,3], query(1,4)",
        output: "1",
        explanation: "Minimum in range [1,4] is min(5,1,4,9)=1",
      },
      {
        input: "nums = [3,2,7,1,8], update(3,5), query(1,4)",
        output: "2",
        explanation: "After update array becomes [3,2,7,5,8]. Min(2,7,5,8)=2",
      },
    ],
    testCases: [
      { input: "[2,5,1,4,9,3], query(1,4)", expected: "1", isHidden: false },
      { input: "[3,2,7,1,8], update(3,5), query(1,4)", expected: "2", isHidden: true },
      { input: "[10,20,30,40,50], query(0,4)", expected: "10", isHidden: true },
      { input: "[8,3,9,2,1], update(4,10), query(0,4)", expected: "2", isHidden: true },
      { input: "[5,5,5,5,5], update(2,1), query(0,4)", expected: "1", isHidden: true },
    ],
    solution: `
    class RMQ {
        private int[] tree;
        private int n;
        
        public RMQ(int[] nums) {
            n = nums.length;
            tree = new int[4 * n];
            if (n > 0) {
                build(nums, 0, 0, n - 1);
            }
        }
        
        private void build(int[] nums, int node, int start, int end) {
            if (start == end) {
                tree[node] = nums[start];
                return;
            }
            
            int mid = start + (end - start) / 2;
            int leftNode = 2 * node + 1;
            int rightNode = 2 * node + 2;
            
            build(nums, leftNode, start, mid);
            build(nums, rightNode, mid + 1, end);
            
            tree[node] = Math.min(tree[leftNode], tree[rightNode]);
        }
        
        public void update(int index, int val) {
            updateHelper(0, 0, n - 1, index, val);
        }
        
        private void updateHelper(int node, int start, int end, int idx, int val) {
            if (start == end) {
                tree[node] = val;
                return;
            }
            
            int mid = start + (end - start) / 2;
            int leftNode = 2 * node + 1;
            int rightNode = 2 * node + 2;
            
            if (idx <= mid) {
                updateHelper(leftNode, start, mid, idx, val);
            } else {
                updateHelper(rightNode, mid + 1, end, idx, val);
            }
            
            tree[node] = Math.min(tree[leftNode], tree[rightNode]);
        }
        
        public int query(int left, int right) {
            return queryHelper(0, 0, n - 1, left, right);
        }
        
        private int queryHelper(int node, int start, int end, int l, int r) {
            if (r < start || l > end) {
                return Integer.MAX_VALUE;
            }
            
            if (l <= start && end <= r) {
                return tree[node];
            }
            
            int mid = start + (end - start) / 2;
            int leftMin = queryHelper(2 * node + 1, start, mid, l, r);
            int rightMin = queryHelper(2 * node + 2, mid + 1, end, l, r);
            
            return Math.min(leftMin, rightMin);
        }
    }
    
    // Time: O(log n) for both update and query
    // Space: O(n) for the segment tree
    `,
    hint: "Store minimum value at each segment tree node instead of sum.",
    tags: ["Segment Tree", "Array", "Design"],
    points: 120,
  }),

  // Day 108 - Q3
  createQuestion({
    title: "Count of Range Sum",
    description:
      "Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.\n\nRange sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.",
    difficulty: "Hard",
    topicId: "108",
    examples: [
      {
        input: "nums = [-2,5,-1], lower = -2, upper = 2",
        output: "3",
        explanation: "The three ranges are [0,0], [2,2], and [0,2] with sums -2, -1, and 2",
      },
      {
        input: "nums = [0], lower = 0, upper = 0",
        output: "1",
        explanation: "Only one range [0,0] with sum 0",
      },
    ],
    testCases: [
      { input: "[-2,5,-1], -2, 2", expected: "3", isHidden: false },
      { input: "[0], 0, 0", expected: "1", isHidden: true },
      { input: "[1,2,3,4,5], 3, 8", expected: "6", isHidden: true },
      { input: "[-3,1,2,-2,2,-1], -3, -1", expected: "7", isHidden: true },
      { input: "[2147483647,-2147483648,-1,0], -1, 0", expected: "4", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    public class Solution {
        public int countRangeSum(int[] nums, int lower, int upper) {
            int n = nums.length;
            long[] prefixSum = new long[n + 1];
            
            // Calculate prefix sums
            for (int i = 0; i < n; i++) {
                prefixSum[i + 1] = prefixSum[i] + nums[i];
            }
            
            return countWhileMergeSort(prefixSum, 0, n + 1, lower, upper);
        }
        
        private int countWhileMergeSort(long[] sums, int start, int end, int lower, int upper) {
            if (end - start <= 1) return 0;
            
            int mid = start + (end - start) / 2;
            int count = countWhileMergeSort(sums, start, mid, lower, upper)
                      + countWhileMergeSort(sums, mid, end, lower, upper);
            
            // Count valid ranges
            int j = mid, k = mid, t = mid;
            long[] cache = new long[end - start];
            int r = 0;
            
            for (int i = start; i < mid; i++) {
                // Find valid j and k for current i
                while (k < end && sums[k] - sums[i] < lower) k++;
                while (j < end && sums[j] - sums[i] <= upper) j++;
                count += j - k;
                
                // Merge for sorting
                while (t < end && sums[t] < sums[i]) cache[r++] = sums[t++];
                cache[r++] = sums[i];
            }
            
            System.arraycopy(cache, 0, sums, start, r);
            
            return count;
        }
    }
    
    // Alternative: Using merge sort tree approach
    class SegmentTreeSolution {
        public int countRangeSum(int[] nums, int lower, int upper) {
            int n = nums.length;
            long[] sums = new long[n + 1];
            for (int i = 0; i < n; i++) {
                sums[i + 1] = sums[i] + nums[i];
            }
            return mergeSort(sums, 0, n + 1, lower, upper);
        }
        
        private int mergeSort(long[] arr, int left, int right, int lower, int upper) {
            if (right - left <= 1) return 0;
            int mid = (left + right) / 2;
            int count = mergeSort(arr, left, mid, lower, upper) 
                      + mergeSort(arr, mid, right, lower, upper);
            
            int j = mid, k = mid;
            for (int i = left; i < mid; i++) {
                while (j < right && arr[j] - arr[i] < lower) j++;
                while (k < right && arr[k] - arr[i] <= upper) k++;
                count += k - j;
            }
            
            Arrays.sort(arr, left, right);
            return count;
        }
    }
    
    // Time: O(n log n) - merge sort with counting
    // Space: O(n) for prefix sums and temporary arrays
    `,
    hint: "Use prefix sums and merge sort. For each i, count j where lower <= sum[j]-sum[i] <= upper.",
    tags: ["Segment Tree", "Merge Sort", "Divide and Conquer", "Prefix Sum"],
    points: 150,
  }),

  // Day 108 - Q4
  createQuestion({
    title: "Range GCD Query",
    description:
      "Given an array nums of positive integers, implement a data structure that supports:\n1. query(left, right): Returns the GCD of all elements in the range [left, right].\n2. update(index, val): Updates the value at index to val.\n\nGCD (Greatest Common Divisor) of a set of numbers is the largest positive integer that divides all numbers.",
    difficulty: "Medium",
    topicId: "108",
    examples: [
      {
        input: "nums = [6,9,12,18], query(1,3)",
        output: "3",
        explanation: "GCD(9,12,18) = 3",
      },
      {
        input: "nums = [10,20,30], update(1,40), query(0,2)",
        output: "10",
        explanation: "After update: [10,40,30]. GCD(10,40,30)=10",
      },
    ],
    testCases: [
      { input: "[6,9,12,18], query(1,3)", expected: "3", isHidden: false },
      { input: "[10,20,30], update(1,40), query(0,2)", expected: "10", isHidden: true },
      { input: "[2,4,6,8,10], query(0,4)", expected: "2", isHidden: true },
      { input: "[15,25,35], update(2,45), query(0,2)", expected: "5", isHidden: true },
      { input: "[100], query(0,0)", expected: "100", isHidden: true },
    ],
    solution: `
    class RangeGCD {
        private int[] tree;
        private int n;
        
        public RangeGCD(int[] nums) {
            n = nums.length;
            tree = new int[4 * n];
            if (n > 0) {
                build(nums, 0, 0, n - 1);
            }
        }
        
        private int gcd(int a, int b) {
            while (b != 0) {
                int temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }
        
        private void build(int[] nums, int node, int start, int end) {
            if (start == end) {
                tree[node] = nums[start];
                return;
            }
            
            int mid = start + (end - start) / 2;
            int leftNode = 2 * node + 1;
            int rightNode = 2 * node + 2;
            
            build(nums, leftNode, start, mid);
            build(nums, rightNode, mid + 1, end);
            
            tree[node] = gcd(tree[leftNode], tree[rightNode]);
        }
        
        public void update(int index, int val) {
            updateHelper(0, 0, n - 1, index, val);
        }
        
        private void updateHelper(int node, int start, int end, int idx, int val) {
            if (start == end) {
                tree[node] = val;
                return;
            }
            
            int mid = start + (end - start) / 2;
            int leftNode = 2 * node + 1;
            int rightNode = 2 * node + 2;
            
            if (idx <= mid) {
                updateHelper(leftNode, start, mid, idx, val);
            } else {
                updateHelper(rightNode, mid + 1, end, idx, val);
            }
            
            tree[node] = gcd(tree[leftNode], tree[rightNode]);
        }
        
        public int query(int left, int right) {
            return queryHelper(0, 0, n - 1, left, right);
        }
        
        private int queryHelper(int node, int start, int end, int l, int r) {
            if (r < start || l > end) {
                return 0;
            }
            
            if (l <= start && end <= r) {
                return tree[node];
            }
            
            int mid = start + (end - start) / 2;
            int leftGcd = queryHelper(2 * node + 1, start, mid, l, r);
            int rightGcd = queryHelper(2 * node + 2, mid + 1, end, l, r);
            
            if (leftGcd == 0) return rightGcd;
            if (rightGcd == 0) return leftGcd;
            
            return gcd(leftGcd, rightGcd);
        }
    }
    
    // Time: O(log n * log(max_value)) for operations due to GCD calculation
    // Space: O(n) for the segment tree
    `,
    hint: "GCD is associative: GCD(a,b,c) = GCD(GCD(a,b),c). Store GCD at each segment tree node.",
    tags: ["Segment Tree", "Math", "GCD"],
    points: 120,
  }),

  // Day 108 - Q5
  createQuestion({
    title: "My Calendar I",
    description:
      "Implement a MyCalendar class to store your events. A new event can be added if adding it will not cause a double booking.\n\nYour class will have one method, book(start, end), which represents a booking on the half-open interval [start, end) (start <= time < end).\n\nA double booking happens when two events have some non-empty intersection (ie., there is some time that is common to both events).\n\nFor each call to the method MyCalendar.book, return true if the event can be added without causing a double booking. Otherwise, return false.",
    difficulty: "Medium",
    topicId: "108",
    examples: [
      {
        input: "book(10,20), book(15,25), book(20,30)",
        output: "true, false, true",
        explanation: "First event [10,20) books successfully. Second [15,25) conflicts with first. Third [20,30) doesn't conflict.",
      },
      {
        input: "book(5,10), book(10,15), book(0,5)",
        output: "true, true, true",
        explanation: "All events can be booked as they don't overlap",
      },
    ],
    testCases: [
      { input: "book(10,20), book(15,25), book(20,30)", expected: "true, false, true", isHidden: false },
      { input: "book(5,10), book(10,15), book(0,5)", expected: "true, true, true", isHidden: true },
      { input: "book(47,50), book(33,41), book(39,45)", expected: "true, true, false", isHidden: true },
      { input: "book(1,100), book(50,60), book(101,200)", expected: "true, false, true", isHidden: true },
      { input: "book(20,30), book(10,20), book(30,40)", expected: "true, true, true", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class MyCalendar {
        private TreeMap<Integer, Integer> calendar;
        
        public MyCalendar() {
            calendar = new TreeMap<>();
        }
        
        public boolean book(int start, int end) {
            // Find the event that starts at or after this event
            Integer nextStart = calendar.ceilingKey(start);
            if (nextStart != null && nextStart < end) {
                return false; // Overlap with next event
            }
            
            // Find the event that starts before this event
            Integer prevStart = calendar.floorKey(start);
            if (prevStart != null && calendar.get(prevStart) > start) {
                return false; // Overlap with previous event
            }
            
            calendar.put(start, end);
            return true;
        }
    }
    
    // Alternative: Using segment tree for interval overlap detection
    class MyCalendarSegmentTree {
        private class Node {
            int start, end;
            Node left, right;
            boolean booked;
            
            public Node(int start, int end) {
                this.start = start;
                this.end = end;
                this.booked = false;
            }
        }
        
        private Node root;
        
        public MyCalendarSegmentTree() {
            root = new Node(0, 1_000_000_000);
        }
        
        public boolean book(int start, int end) {
            return bookHelper(root, start, end);
        }
        
        private boolean bookHelper(Node node, int start, int end) {
            if (node == null || start >= node.end || end <= node.start) {
                return true;
            }
            
            if (node.booked) {
                return false;
            }
            
            if (start <= node.start && end >= node.end) {
                if (node.left != null || node.right != null) {
                    return false;
                }
                node.booked = true;
                return true;
            }
            
            int mid = node.start + (node.end - node.start) / 2;
            if (node.left == null) {
                node.left = new Node(node.start, mid);
                node.right = new Node(mid, node.end);
            }
            
            return bookHelper(node.left, start, end) && bookHelper(node.right, start, end);
        }
    }
    
    // Time: O(log n) per booking for TreeMap approach, O(n log C) for segment tree where C is coordinate range
    // Space: O(n) for storing bookings
    `,
    hint: "Use TreeMap to find adjacent intervals. Check if new interval overlaps with floor or ceiling entries.",
    tags: ["Segment Tree", "Design", "TreeMap", "Ordered Set"],
    points: 120,
  }),

  // Day 109 - Q1
  createQuestion({
    title: "Range Add Queries",
    description:
      "You are given an empty array of length n. Perform m range add operations. For each operation [l, r, val], add val to all elements from index l to r inclusive.\n\nAfter all operations, return the final array. Use lazy propagation for efficient range updates.",
    difficulty: "Hard",
    topicId: "109",
    isCompulsory: true,
    examples: [
      {
        input: "n = 5, operations = [[1,3,2], [2,4,3], [0,2,-2]]",
        output: "[-2, 0, 3, 3, 3]",
        explanation: "Start: [0,0,0,0,0]. After [1,3,2]: [0,2,2,2,0]. After [2,4,3]: [0,2,5,5,3]. After [0,2,-2]: [-2,0,3,5,3]",
      },
      {
        input: "n = 4, operations = [[0,1,5], [2,3,10]]",
        output: "[5, 5, 10, 10]",
        explanation: "No overlapping ranges, simple addition",
      },
    ],
    testCases: [
      { input: "5, [[1,3,2], [2,4,3], [0,2,-2]]", expected: "[-2, 0, 3, 3, 3]", isHidden: false },
      { input: "4, [[0,1,5], [2,3,10]]", expected: "[5, 5, 10, 10]", isHidden: true },
      { input: "6, [[0,2,100], [1,5,-50], [3,4,25]]", expected: "[100, 50, 50, 25, 25, -50]", isHidden: true },
      { input: "3, [[0,2,1], [0,2,1], [0,2,1]]", expected: "[3, 3, 3]", isHidden: true },
      { input: "10, [[0,9,10]]", expected: "[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]", isHidden: true },
    ],
    solution: `
    class RangeAddQueries {
        private int[] tree;
        private int[] lazy;
        private int n;
        
        public int[] getModifiedArray(int length, int[][] updates) {
            n = length;
            tree = new int[4 * n];
            lazy = new int[4 * n];
            
            // Apply all updates
            for (int[] update : updates) {
                updateRange(0, 0, n - 1, update[0], update[1], update[2]);
            }
            
            // Build result array
            int[] result = new int[n];
            for (int i = 0; i < n; i++) {
                result[i] = query(0, 0, n - 1, i);
            }
            
            return result;
        }
        
        private void push(int node, int start, int end) {
            if (lazy[node] != 0) {
                tree[node] += lazy[node] * (end - start + 1);
                
                if (start != end) {
                    lazy[2 * node + 1] += lazy[node];
                    lazy[2 * node + 2] += lazy[node];
                }
                
                lazy[node] = 0;
            }
        }
        
        private void updateRange(int node, int start, int end, int l, int r, int val) {
            push(node, start, end);
            
            if (start > r || end < l) {
                return;
            }
            
            if (start >= l && end <= r) {
                lazy[node] += val;
                push(node, start, end);
                return;
            }
            
            int mid = start + (end - start) / 2;
            updateRange(2 * node + 1, start, mid, l, r, val);
            updateRange(2 * node + 2, mid + 1, end, l, r, val);
            
            push(2 * node + 1, start, mid);
            push(2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
        
        private int query(int node, int start, int end, int idx) {
            push(node, start, end);
            
            if (start == end) {
                return tree[node];
            }
            
            int mid = start + (end - start) / 2;
            if (idx <= mid) {
                return query(2 * node + 1, start, mid, idx);
            } else {
                return query(2 * node + 2, mid + 1, end, idx);
            }
        }
    }
    
    // Alternative: Difference array approach (simpler for this problem)
    class SimpleSolution {
        public int[] getModifiedArray(int length, int[][] updates) {
            int[] diff = new int[length];
            
            for (int[] update : updates) {
                diff[update[0]] += update[2];
                if (update[1] + 1 < length) {
                    diff[update[1] + 1] -= update[2];
                }
            }
            
            for (int i = 1; i < length; i++) {
                diff[i] += diff[i - 1];
            }
            
            return diff;
        }
    }
    
    // Time: O(m log n) for segment tree, O(m + n) for difference array where m = updates
    // Space: O(n) for the tree and lazy array
    `,
    hint: "Use lazy propagation to defer updates. Mark nodes with pending updates and push down when needed.",
    tags: ["Segment Tree", "Lazy Propagation", "Range Update"],
    points: 150,
  }),

  // Day 109 - Q2
  createQuestion({
    title: "Range Update and Sum Query",
    description:
      "Implement a data structure that supports three operations:\n1. updateRange(left, right, val): Add val to all elements in range [left, right].\n2. updatePoint(index, val): Set the value at index to val.\n3. sumRange(left, right): Return the sum of elements in range [left, right].\n\nImplement using segment tree with lazy propagation for O(log n) complexity.",
    difficulty: "Hard",
    topicId: "109",
    examples: [
      {
        input: "arr = [1,2,3,4,5], updateRange(1,3,2), sumRange(0,4)",
        output: "19",
        explanation: "After range update: [1,4,5,6,5]. Sum = 1+4+5+6+5 = 19",
      },
      {
        input: "arr = [0,0,0,0], updateRange(0,3,5), updatePoint(2,10), sumRange(1,3)",
        output: "20",
        explanation: "After updates: [5,5,10,5]. Sum(1,3) = 5+10+5 = 20",
      },
    ],
    testCases: [
      { input: "[1,2,3,4,5], updateRange(1,3,2), sumRange(0,4)", expected: "19", isHidden: false },
      { input: "[0,0,0,0], updateRange(0,3,5), updatePoint(2,10), sumRange(1,3)", expected: "20", isHidden: true },
      { input: "[10,20,30], updateRange(0,2,-5), sumRange(0,2)", expected: "45", isHidden: true },
      { input: "[5,5,5,5,5], updatePoint(2,0), sumRange(0,4)", expected: "20", isHidden: true },
      { input: "[1], updateRange(0,0,100), sumRange(0,0)", expected: "101", isHidden: true },
    ],
    solution: `
    class RangeUpdateSumQuery {
        private long[] tree;
        private long[] lazy;
        private int[] arr;
        private int n;
        
        public RangeUpdateSumQuery(int[] nums) {
            n = nums.length;
            arr = nums.clone();
            tree = new long[4 * n];
            lazy = new long[4 * n];
            build(0, 0, n - 1);
        }
        
        private void build(int node, int start, int end) {
            if (start == end) {
                tree[node] = arr[start];
                return;
            }
            
            int mid = start + (end - start) / 2;
            build(2 * node + 1, start, mid);
            build(2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
        
        private void push(int node, int start, int end) {
            if (lazy[node] != 0) {
                tree[node] += lazy[node] * (end - start + 1);
                
                if (start != end) {
                    lazy[2 * node + 1] += lazy[node];
                    lazy[2 * node + 2] += lazy[node];
                }
                
                lazy[node] = 0;
            }
        }
        
        public void updateRange(int left, int right, int val) {
            updateRangeHelper(0, 0, n - 1, left, right, val);
        }
        
        private void updateRangeHelper(int node, int start, int end, int l, int r, int val) {
            push(node, start, end);
            
            if (start > r || end < l) {
                return;
            }
            
            if (start >= l && end <= r) {
                lazy[node] += val;
                push(node, start, end);
                return;
            }
            
            int mid = start + (end - start) / 2;
            updateRangeHelper(2 * node + 1, start, mid, l, r, val);
            updateRangeHelper(2 * node + 2, mid + 1, end, l, r, val);
            
            push(2 * node + 1, start, mid);
            push(2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
        
        public void updatePoint(int index, int val) {
            int currentVal = (int)queryHelper(0, 0, n - 1, index, index);
            updateRangeHelper(0, 0, n - 1, index, index, val - currentVal);
        }
        
        public long sumRange(int left, int right) {
            return queryHelper(0, 0, n - 1, left, right);
        }
        
        private long queryHelper(int node, int start, int end, int l, int r) {
            if (start > r || end < l) {
                return 0;
            }
            
            push(node, start, end);
            
            if (start >= l && end <= r) {
                return tree[node];
            }
            
            int mid = start + (end - start) / 2;
            long leftSum = queryHelper(2 * node + 1, start, mid, l, r);
            long rightSum = queryHelper(2 * node + 2, mid + 1, end, l, r);
            
            return leftSum + rightSum;
        }
    }
    
    // Time: O(log n) for all operations
    // Space: O(n) for tree and lazy arrays
    `,
    hint: "Maintain lazy array for pending range updates. Push updates down only when necessary during queries.",
    tags: ["Segment Tree", "Lazy Propagation", "Array", "Design"],
    points: 150,
  }),

  // Day 109 - Q3
  createQuestion({
    title: "Count of Smaller Numbers After Self",
    description:
      "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].\n\nFor example, if nums = [5,2,6,1], the answer is [2,1,1,0] because:\n- To the right of 5 there are 2 smaller elements (2 and 1)\n- To the right of 2 there is 1 smaller element (1)\n- To the right of 6 there is 1 smaller element (1)\n- To the right of 1 there are 0 smaller elements",
    difficulty: "Hard",
    topicId: "109",
    examples: [
      {
        input: "nums = [5,2,6,1]",
        output: "[2,1,1,0]",
        explanation: "Count smaller elements to the right of each position",
      },
      {
        input: "nums = [-1]",
        output: "[0]",
        explanation: "No elements to the right",
      },
      {
        input: "nums = [-1,-1]",
        output: "[0,0]",
        explanation: "Elements are equal, not smaller",
      },
    ],
    testCases: [
      { input: "[5,2,6,1]", expected: "[2,1,1,0]", isHidden: false },
      { input: "[-1]", expected: "[0]", isHidden: true },
      { input: "[-1,-1]", expected: "[0,0]", isHidden: true },
      { input: "[26,78,27,100,33,67,90,23,66,5,38,7,35,23,52,22,83,51,98,69,81,32,78,28,94,13,2,97,3,76,99,51,9,21,84,66,65,36,100,41]", expected: "[10,27,10,35,12,22,28,8,19,2,12,2,9,6,12,5,17,9,19,12,14,6,12,5,12,3,0,10,0,7,8,4,0,0,4,3,2,0,1,0]", isHidden: true },
      { input: "[1,2,3,4,5]", expected: "[0,0,0,0,0]", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class Solution {
        public List<Integer> countSmaller(int[] nums) {
            int n = nums.length;
            Integer[] result = new Integer[n];
            int[][] arr = new int[n][2]; // [value, original_index]
            
            for (int i = 0; i < n; i++) {
                arr[i][0] = nums[i];
                arr[i][1] = i;
            }
            
            mergeSort(arr, 0, n - 1, result);
            return Arrays.asList(result);
        }
        
        private void mergeSort(int[][] arr, int left, int right, Integer[] result) {
            if (left >= right) return;
            
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid, result);
            mergeSort(arr, mid + 1, right, result);
            merge(arr, left, mid, right, result);
        }
        
        private void merge(int[][] arr, int left, int mid, int right, Integer[] result) {
            int[][] temp = new int[right - left + 1][2];
            int i = left, j = mid + 1, k = 0;
            int rightCount = 0;
            
            while (i <= mid && j <= right) {
                if (arr[i][0] > arr[j][0]) {
                    rightCount++;
                    temp[k++] = arr[j++];
                } else {
                    if (result[arr[i][1]] == null) {
                        result[arr[i][1]] = 0;
                    }
                    result[arr[i][1]] += rightCount;
                    temp[k++] = arr[i++];
                }
            }
            
            while (i <= mid) {
                if (result[arr[i][1]] == null) {
                    result[arr[i][1]] = 0;
                }
                result[arr[i][1]] += rightCount;
                temp[k++] = arr[i++];
            }
            
            while (j <= right) {
                temp[k++] = arr[j++];
            }
            
            for (i = left, k = 0; i <= right; i++, k++) {
                arr[i] = temp[k];
            }
        }
    }
    
    // Alternative: Using Binary Indexed Tree (Fenwick Tree)
    class BITSolution {
        public List<Integer> countSmaller(int[] nums) {
            int n = nums.length;
            Integer[] result = new Integer[n];
            
            // Coordinate compression
            int[] sorted = nums.clone();
            Arrays.sort(sorted);
            Map<Integer, Integer> ranks = new HashMap<>();
            int rank = 0;
            for (int num : sorted) {
                if (!ranks.containsKey(num)) {
                    ranks.put(num, ++rank);
                }
            }
            
            BIT bit = new BIT(rank);
            
            // Process from right to left
            for (int i = n - 1; i >= 0; i--) {
                int r = ranks.get(nums[i]);
                result[i] = bit.query(r - 1);
                bit.update(r, 1);
            }
            
            return Arrays.asList(result);
        }
        
        class BIT {
            private int[] tree;
            
            public BIT(int n) {
                tree = new int[n + 1];
            }
            
            public void update(int i, int val) {
                while (i < tree.length) {
                    tree[i] += val;
                    i += i & (-i);
                }
            }
            
            public int query(int i) {
                int sum = 0;
                while (i > 0) {
                    sum += tree[i];
                    i -= i & (-i);
                }
                return sum;
            }
        }
    }
    
    // Time: O(n log n) for merge sort approach
    // Space: O(n) for temporary arrays
    `,
    hint: "Use merge sort. When merging, count elements from right subarray that are smaller than left elements.",
    tags: ["Segment Tree", "Binary Indexed Tree", "Merge Sort", "Divide and Conquer"],
    points: 150,
  }),

  // Day 109 - Q4
  createQuestion({
    title: "My Calendar II",
    description:
      "Implement a MyCalendarTwo class to store your events. A new event can be added if adding the event will not cause a triple booking.\n\nYour class will have one method, book(start, end), which represents a booking on the half open interval [start, end).\n\nA triple booking happens when three events have some non-empty intersection.\n\nFor each call to MyCalendarTwo.book, return true if the event can be added without causing a triple booking. Otherwise, return false.",
    difficulty: "Medium",
    topicId: "109",
    examples: [
      {
        input: "book(10,20), book(50,60), book(10,40), book(5,15), book(5,10), book(25,55)",
        output: "true, true, true, true, true, true",
        explanation: "All bookings succeed as none cause triple booking",
      },
      {
        input: "book(10,20), book(15,25), book(17,22)",
        output: "true, true, false",
        explanation: "Third booking would create triple overlap at [17,20)",
      },
    ],
    testCases: [
      { input: "book(10,20), book(50,60), book(10,40), book(5,15), book(5,10), book(25,55)", expected: "true, true, true, true, true, true", isHidden: false },
      { input: "book(10,20), book(15,25), book(17,22)", expected: "true, true, false", isHidden: true },
      { input: "book(24,40), book(43,50), book(27,43), book(5,21), book(30,40)", expected: "true, true, true, true, false", isHidden: true },
      { input: "book(1,10), book(2,11), book(3,12)", expected: "true, true, false", isHidden: true },
      { input: "book(0,100), book(25,75), book(40,60)", expected: "true, true, false", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class MyCalendarTwo {
        private List<int[]> bookings;
        private List<int[]> overlaps;
        
        public MyCalendarTwo() {
            bookings = new ArrayList<>();
            overlaps = new ArrayList<>();
        }
        
        public boolean book(int start, int end) {
            // Check if new booking overlaps with any existing double booking
            for (int[] overlap : overlaps) {
                if (start < overlap[1] && end > overlap[0]) {
                    return false; // Would create triple booking
                }
            }
            
            // Add overlaps with existing bookings to overlaps list
            for (int[] booking : bookings) {
                if (start < booking[1] && end > booking[0]) {
                    overlaps.add(new int[]{Math.max(start, booking[0]), Math.min(end, booking[1])});
                }
            }
            
            bookings.add(new int[]{start, end});
            return true;
        }
    }
    
    // Alternative: Using TreeMap for sweep line
    class MyCalendarTwoSweepLine {
        private TreeMap<Integer, Integer> delta;
        
        public MyCalendarTwoSweepLine() {
            delta = new TreeMap<>();
        }
        
        public boolean book(int start, int end) {
            delta.put(start, delta.getOrDefault(start, 0) + 1);
            delta.put(end, delta.getOrDefault(end, 0) - 1);
            
            int active = 0;
            for (int d : delta.values()) {
                active += d;
                if (active >= 3) {
                    // Rollback
                    delta.put(start, delta.get(start) - 1);
                    if (delta.get(start) == 0) {
                        delta.remove(start);
                    }
                    delta.put(end, delta.get(end) + 1);
                    if (delta.get(end) == 0) {
                        delta.remove(end);
                    }
                    return false;
                }
            }
            
            return true;
        }
    }
    
    // Time: O(n^2) for checking all overlaps, O(n log n) for sweep line per booking
    // Space: O(n) for storing bookings and overlaps
    `,
    hint: "Track single and double bookings separately. New booking fails if it overlaps with a double booking.",
    tags: ["Segment Tree", "Design", "Sweep Line", "Ordered Map"],
    points: 120,
  }),

  // Day 109 - Q5
  createQuestion({
    title: "My Calendar III",
    description:
      "Implement a MyCalendarThree class to store your events. A new event can always be added.\n\nYour class will have one method, book(start, end), which represents a booking on the half open interval [start, end).\n\nFor each call to MyCalendarThree.book, return an integer k representing the largest integer such that there exists a k-booking in the calendar.\n\nA k-booking is defined as a sequence of events such that there are k events with some non-empty intersection.",
    difficulty: "Hard",
    topicId: "109",
    examples: [
      {
        input: "book(10,20), book(50,60), book(10,40), book(5,15), book(5,10), book(25,55)",
        output: "1, 1, 2, 3, 3, 3",
        explanation: "Maximum overlapping events at each step",
      },
      {
        input: "book(1,10), book(2,11), book(3,12), book(4,13)",
        output: "1, 2, 3, 4",
        explanation: "Each booking increases maximum overlap by 1",
      },
    ],
    testCases: [
      { input: "book(10,20), book(50,60), book(10,40), book(5,15), book(5,10), book(25,55)", expected: "1, 1, 2, 3, 3, 3", isHidden: false },
      { input: "book(1,10), book(2,11), book(3,12), book(4,13)", expected: "1, 2, 3, 4", isHidden: true },
      { input: "book(24,40), book(43,50), book(27,43), book(5,21), book(30,40), book(14,29)", expected: "1, 1, 2, 2, 3, 3", isHidden: true },
      { input: "book(0,10), book(5,15), book(10,20)", expected: "1, 2, 2", isHidden: true },
      { input: "book(1,100), book(25,50), book(30,40), book(35,38)", expected: "1, 2, 3, 4", isHidden: true },
    ],
    solution: `
    import java.util.*;
    
    class MyCalendarThree {
        private TreeMap<Integer, Integer> delta;
        
        public MyCalendarThree() {
            delta = new TreeMap<>();
        }
        
        public int book(int start, int end) {
            // Add event: +1 at start, -1 at end
            delta.put(start, delta.getOrDefault(start, 0) + 1);
            delta.put(end, delta.getOrDefault(end, 0) - 1);
            
            // Sweep through timeline and find maximum active bookings
            int active = 0;
            int maxBookings = 0;
            
            for (int d : delta.values()) {
                active += d;
                maxBookings = Math.max(maxBookings, active);
            }
            
            return maxBookings;
        }
    }
    
    // Alternative: Using segment tree with lazy propagation
    class MyCalendarThreeSegmentTree {
        private class Node {
            int start, end, count, lazy;
            Node left, right;
            
            public Node(int start, int end) {
                this.start = start;
                this.end = end;
                this.count = 0;
                this.lazy = 0;
            }
        }
        
        private Node root;
        private int max;
        
        public MyCalendarThreeSegmentTree() {
            root = new Node(0, 1_000_000_000);
            max = 0;
        }
        
        public int book(int start, int end) {
            update(root, start, end - 1);
            return max;
        }
        
        private void update(Node node, int start, int end) {
            if (node == null || start > node.end || end < node.start) {
                return;
            }
            
            if (start <= node.start && node.end <= end) {
                node.count++;
                node.lazy++;
                max = Math.max(max, node.count);
                return;
            }
            
            int mid = node.start + (node.end - node.start) / 2;
            
            if (node.left == null) {
                node.left = new Node(node.start, mid);
                node.right = new Node(mid + 1, node.end);
            }
            
            if (node.lazy > 0) {
                node.left.count += node.lazy;
                node.left.lazy += node.lazy;
                node.right.count += node.lazy;
                node.right.lazy += node.lazy;
                node.lazy = 0;
            }
            
            update(node.left, start, end);
            update(node.right, start, end);
        }
    }
    
    // Time: O(n log n) per booking for TreeMap sweep line
    // Space: O(n) for storing timeline events
    `,
    hint: "Use sweep line with TreeMap. Track +1 at event start and -1 at end. Maximum active count is the answer.",
    tags: ["Segment Tree", "Design", "Sweep Line", "Ordered Map"],
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
      `\n🎉 Days 108-109 processing complete! Created ${createdCount} questions, skipped ${skippedCount} existing`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
