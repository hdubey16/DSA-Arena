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
    tags: data.tags || ['Heap', 'Priority Queue']
  };
}

const topicsData: any[] = [
  {
    id: 'day-73-bst-advanced',
    title: 'BST Conversions & Tree Traversals',
    description: 'Kth smallest, recover BST, convert to greater tree, vertical order',
    week: 12,
    day: 73,
    difficulty: 'Medium',
    estimatedTime: 115,
    prerequisites: ['day-71-bst-basics'],
    compulsoryQuestion: 'Kth Smallest Element in a BST',
    practiceQuestions: 5
  },
  {
    id: 'day-74-heap-basics',
    title: 'Min Heap & Basic Operations',
    description: 'Implement min heap, kth largest, last stone weight',
    week: 12,
    day: 74,
    difficulty: 'Medium',
    estimatedTime: 110,
    prerequisites: [],
    compulsoryQuestion: 'Kth Largest Element in an Array',
    practiceQuestions: 5
  },
  {
    id: 'day-75-heap-advanced',
    title: 'Advanced Heap Applications',
    description: 'Task scheduler, merge k lists, top k frequent',
    week: 12,
    day: 75,
    difficulty: 'Hard',
    estimatedTime: 120,
    prerequisites: ['day-74-heap-basics'],
    compulsoryQuestion: 'Merge k Sorted Lists',
    practiceQuestions: 5
  }
];

async function populateDays73to75() {
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
      // Day 73: BST Advanced
      createQuestion({
        topicId: 'day-73-bst-advanced',
        title: 'Kth Smallest Element in a BST',
        description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
        difficulty: 'Medium',
        tags: ['BST', 'Binary Tree'],
        examples: [{ input: '[3,1,4,null,2]\n1', output: '1' }],
        testCases: [
          { input: '[3,1,4,null,2]\n1', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[5,3,6,2,4,null,null,1]\n3', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '[1]\n1', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[10,5,15,3,7,null,18]\n4', expectedOutput: '10', isHidden: true, points: 20 },
          { input: '[41,37,44,24,39,42,48,1,35,38,40,null,43,46,49,0,2,30,36,null,null,null,null,null,null,45,47,null,null,null,null,null,4,29,32,null,null,null,null,null,null,3,9,26,null,31,34,null,null,7,11,25,27,null,null,33,null,6,8,10,16,null,null,null,28,null,null,5,null,null,null,null,null,15,19,null,null,null,null,12,null,18,20,null,13,17,null,null,22,null,14,null,null,21,23]\n25', expectedOutput: '24', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static int count = 0;
    static int result = 0;
    public static int kthSmallest(TreeNode root, int k) {
        count = 0;
        result = 0;
        inorder(root, k);
        return result;
    }
    private static void inorder(TreeNode node, int k) {
        if (node == null) return;
        inorder(node.left, k);
        count++;
        if (count == k) {
            result = node.val;
            return;
        }
        inorder(node.right, k);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(kthSmallest(root, k));
    }
    private static TreeNode buildTree(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < parts.length) {
            TreeNode node = queue.poll();
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.left);
            }
            i++;
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
}`
      }),
      createQuestion({
        topicId: 'day-73-bst-advanced',
        title: 'Recover Binary Search Tree',
        description: 'You are given the root of a binary search tree (BST), where exactly two nodes were swapped by mistake. Recover the tree without changing its structure.',
        difficulty: 'Medium',
        tags: ['BST', 'Binary Tree'],
        examples: [{ input: '[1,3,null,null,2]', output: '[3,1,null,null,2]' }],
        testCases: [
          { input: '[1,3,null,null,2]', expectedOutput: '[3,1,null,null,2]', isHidden: false, points: 20 },
          { input: '[3,1,4,null,null,2]', expectedOutput: '[2,1,4,null,null,3]', isHidden: false, points: 20 },
          { input: '[2,1]', expectedOutput: '[1,2]', isHidden: true, points: 20 },
          { input: '[5,3,9,2,null,8,10]', expectedOutput: '[5,3,9,2,null,8,10]', isHidden: true, points: 20 },
          { input: '[10,5,15,null,null,14,20]', expectedOutput: '[10,5,15,null,null,14,20]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static TreeNode first = null, second = null, prev = null;
    public static void recoverTree(TreeNode root) {
        first = second = prev = null;
        inorder(root);
        if (first != null && second != null) {
            int temp = first.val;
            first.val = second.val;
            second.val = temp;
        }
    }
    private static void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null && prev.val > node.val) {
            if (first == null) first = prev;
            second = node;
        }
        prev = node;
        inorder(node.right);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        recoverTree(root);
        System.out.println(serialize(root));
    }
    private static TreeNode buildTree(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < parts.length) {
            TreeNode node = queue.poll();
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.left);
            }
            i++;
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
    private static String serialize(TreeNode root) {
        if (root == null) return "[]";
        StringBuilder sb = new StringBuilder("[");
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
        String result = sb.toString();
        while (result.endsWith(",null")) {
            result = result.substring(0, result.lastIndexOf(",null"));
        }
        return result + "]";
    }
}`
      }),
      createQuestion({
        topicId: 'day-73-bst-advanced',
        title: 'Convert BST to Greater Tree',
        description: 'Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.',
        difficulty: 'Medium',
        tags: ['BST', 'Binary Tree'],
        examples: [{ input: '[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]', output: '[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]' }],
        testCases: [
          { input: '[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]', expectedOutput: '[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]', isHidden: false, points: 20 },
          { input: '[0,null,1]', expectedOutput: '[1,null,1]', isHidden: false, points: 20 },
          { input: '[1,0,2]', expectedOutput: '[3,3,2]', isHidden: true, points: 20 },
          { input: '[3,2,4,1]', expectedOutput: '[7,9,4,10]', isHidden: true, points: 20 },
          { input: '[5,2,13]', expectedOutput: '[18,20,13]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static int sum = 0;
    public static TreeNode convertBST(TreeNode root) {
        sum = 0;
        reverseInorder(root);
        return root;
    }
    private static void reverseInorder(TreeNode node) {
        if (node == null) return;
        reverseInorder(node.right);
        sum += node.val;
        node.val = sum;
        reverseInorder(node.left);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        convertBST(root);
        System.out.println(serialize(root));
    }
    private static TreeNode buildTree(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < parts.length) {
            TreeNode node = queue.poll();
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.left);
            }
            i++;
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
    private static String serialize(TreeNode root) {
        if (root == null) return "[]";
        StringBuilder sb = new StringBuilder("[");
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
        String result = sb.toString();
        while (result.endsWith(",null")) {
            result = result.substring(0, result.lastIndexOf(",null"));
        }
        return result + "]";
    }
}`
      }),
      createQuestion({
        topicId: 'day-73-bst-advanced',
        title: 'Two Sum IV - Input is a BST',
        description: 'Given the root of a Binary Search Tree and a target number k, return true if there exist two elements in the BST such that their sum is equal to the given target.',
        difficulty: 'Easy',
        tags: ['BST', 'Binary Tree', 'Two Pointers'],
        examples: [{ input: '[5,3,6,2,4,null,7]\n9', output: 'true' }],
        testCases: [
          { input: '[5,3,6,2,4,null,7]\n9', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[5,3,6,2,4,null,7]\n28', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[1]\n2', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[2,1,3]\n4', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[2,1,3]\n3', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean findTarget(TreeNode root, int k) {
        Set<Integer> set = new HashSet<>();
        return find(root, k, set);
    }
    private static boolean find(TreeNode node, int k, Set<Integer> set) {
        if (node == null) return false;
        if (set.contains(k - node.val)) return true;
        set.add(node.val);
        return find(node.left, k, set) || find(node.right, k, set);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(findTarget(root, k));
    }
    private static TreeNode buildTree(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < parts.length) {
            TreeNode node = queue.poll();
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.left);
            }
            i++;
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
}`
      }),
      createQuestion({
        topicId: 'day-73-bst-advanced',
        title: 'Increasing Order Search Tree',
        description: 'Given the root of a binary search tree, rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only one right child.',
        difficulty: 'Easy',
        tags: ['BST', 'Binary Tree'],
        examples: [{ input: '[5,3,6,2,4,null,8,1,null,null,null,7,9]', output: '[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]' }],
        testCases: [
          { input: '[5,3,6,2,4,null,8,1,null,null,null,7,9]', expectedOutput: '[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]', isHidden: false, points: 20 },
          { input: '[5,1,7]', expectedOutput: '[1,null,5,null,7]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[2,1,3]', expectedOutput: '[1,null,2,null,3]', isHidden: true, points: 20 },
          { input: '[4,2,5,1,3]', expectedOutput: '[1,null,2,null,3,null,4,null,5]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static TreeNode current;
    public static TreeNode increasingBST(TreeNode root) {
        TreeNode dummy = new TreeNode(0);
        current = dummy;
        inorder(root);
        return dummy.right;
    }
    private static void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        node.left = null;
        current.right = node;
        current = node;
        inorder(node.right);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        TreeNode result = increasingBST(root);
        System.out.println(serialize(result));
    }
    private static TreeNode buildTree(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < parts.length) {
            TreeNode node = queue.poll();
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.left);
            }
            i++;
            if (i < parts.length && !parts[i].trim().equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[i].trim()));
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
    private static String serialize(TreeNode root) {
        if (root == null) return "[]";
        StringBuilder sb = new StringBuilder("[");
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
        String result = sb.toString();
        while (result.endsWith(",null")) {
            result = result.substring(0, result.lastIndexOf(",null"));
        }
        return result + "]";
    }
}`
      }),
      // Day 74: Heap Basics
      createQuestion({
        topicId: 'day-74-heap-basics',
        title: 'Kth Largest Element in an Array',
        description: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element.',
        difficulty: 'Medium',
        examples: [{ input: '[3,2,1,5,6,4]\n2', output: '5' }],
        testCases: [
          { input: '[3,2,1,5,6,4]\n2', expectedOutput: '5', isHidden: false, points: 20 },
          { input: '[3,2,3,1,2,4,5,5,6]\n4', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[1]\n1', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[7,6,5,4,3,2,1]\n5', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '[99,99]\n1', expectedOutput: '99', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int num : nums) {
            pq.offer(num);
            if (pq.size() > k) pq.poll();
        }
        return pq.peek();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        int[] nums = parseArray(input);
        System.out.println(findKthLargest(nums, k));
    }
    private static int[] parseArray(String s) {
        s = s.replace("[", "").replace("]", "");
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`
      }),
      createQuestion({
        topicId: 'day-74-heap-basics',
        title: 'Last Stone Weight',
        description: 'You are given an array of integers stones where stones[i] is the weight of the ith stone. On each turn, we choose the two heaviest stones and smash them together. Return the weight of the last remaining stone.',
        difficulty: 'Easy',
        examples: [{ input: '[2,7,4,1,8,1]', output: '1' }],
        testCases: [
          { input: '[2,7,4,1,8,1]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[2,2]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[7,6,7,6,9]', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '[1,3]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
        for (int stone : stones) pq.offer(stone);
        while (pq.size() > 1) {
            int first = pq.poll();
            int second = pq.poll();
            if (first != second) pq.offer(first - second);
        }
        return pq.isEmpty() ? 0 : pq.peek();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        int[] stones = parseArray(input);
        System.out.println(lastStoneWeight(stones));
    }
    private static int[] parseArray(String s) {
        s = s.replace("[", "").replace("]", "");
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`
      }),
      createQuestion({
        topicId: 'day-74-heap-basics',
        title: 'Relative Ranks',
        description: 'You are given an integer array score of size n, where score[i] is the score of the ith athlete. Return an array answer where answer[i] is the rank of the ith athlete.',
        difficulty: 'Easy',
        examples: [{ input: '[5,4,3,2,1]', output: '[Gold Medal,Silver Medal,Bronze Medal,4,5]' }],
        testCases: [
          { input: '[5,4,3,2,1]', expectedOutput: '[Gold Medal,Silver Medal,Bronze Medal,4,5]', isHidden: false, points: 20 },
          { input: '[10,3,8,9,4]', expectedOutput: '[Gold Medal,5,Bronze Medal,Silver Medal,4]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[Gold Medal]', isHidden: true, points: 20 },
          { input: '[1,2]', expectedOutput: '[Silver Medal,Gold Medal]', isHidden: true, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[Bronze Medal,Silver Medal,Gold Medal]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static String[] findRelativeRanks(int[] score) {
        int n = score.length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        for (int i = 0; i < n; i++) {
            pq.offer(new int[]{score[i], i});
        }
        String[] result = new String[n];
        int rank = 1;
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            if (rank == 1) result[curr[1]] = "Gold Medal";
            else if (rank == 2) result[curr[1]] = "Silver Medal";
            else if (rank == 3) result[curr[1]] = "Bronze Medal";
            else result[curr[1]] = String.valueOf(rank);
            rank++;
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        int[] score = parseArray(input);
        String[] result = findRelativeRanks(score);
        System.out.println(Arrays.toString(result));
    }
    private static int[] parseArray(String s) {
        s = s.replace("[", "").replace("]", "");
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`
      }),
      createQuestion({
        topicId: 'day-74-heap-basics',
        title: 'Minimum Amount of Time to Fill Cups',
        description: 'You have a water dispenser that can dispense cold, warm, and hot water. Every second, you can fill up 2 cups with different types of water. Return the minimum number of seconds needed to fill up all the cups.',
        difficulty: 'Easy',
        examples: [{ input: '[1,4,2]', output: '4' }],
        testCases: [
          { input: '[1,4,2]', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[5,4,4]', expectedOutput: '7', isHidden: false, points: 20 },
          { input: '[5,0,0]', expectedOutput: '5', isHidden: true, points: 20 },
          { input: '[1,1,1]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[0,0,0]', expectedOutput: '0', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int fillCups(int[] amount) {
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
        for (int a : amount) if (a > 0) pq.offer(a);
        int time = 0;
        while (pq.size() > 1) {
            int first = pq.poll();
            int second = pq.poll();
            time++;
            if (first - 1 > 0) pq.offer(first - 1);
            if (second - 1 > 0) pq.offer(second - 1);
        }
        return time + (pq.isEmpty() ? 0 : pq.peek());
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        int[] amount = parseArray(input);
        System.out.println(fillCups(amount));
    }
    private static int[] parseArray(String s) {
        s = s.replace("[", "").replace("]", "");
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`
      }),
      createQuestion({
        topicId: 'day-74-heap-basics',
        title: 'Seat Reservation Manager',
        description: 'Design a system that manages the reservation state of n seats numbered from 1 to n. Implement SeatManager class with reserve() which returns the smallest-numbered unreserved seat and unreserve(int seatNumber).',
        difficulty: 'Medium',
        examples: [{ input: '5\n[1,2,3,2,5]', output: '[1,2,3,2,5]' }],
        testCases: [
          { input: '5\n[1,2,3,2,5]', expectedOutput: '[1,2,3,2,5]', isHidden: false, points: 20 },
          { input: '3\n[1,2,3]', expectedOutput: '[1,2,3]', isHidden: false, points: 20 },
          { input: '10\n[1,2,1,3,1]', expectedOutput: '[1,2,1,3,1]', isHidden: true, points: 20 },
          { input: '2\n[1,2,1,2]', expectedOutput: '[1,2,1,2]', isHidden: true, points: 20 },
          { input: '1\n[1,1]', expectedOutput: '[1,1]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    static class SeatManager {
        PriorityQueue<Integer> available;
        public SeatManager(int n) {
            available = new PriorityQueue<>();
            for (int i = 1; i <= n; i++) {
                available.offer(i);
            }
        }
        public int reserve() {
            return available.poll();
        }
        public void unreserve(int seatNumber) {
            available.offer(seatNumber);
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        String input = sc.nextLine().trim();
        sc.close();
        int[] operations = parseArray(input);
        SeatManager manager = new SeatManager(n);
        List<Integer> result = new ArrayList<>();
        for (int op : operations) {
            if (op > 0) {
                result.add(manager.reserve());
            } else {
                manager.unreserve(-op);
            }
        }
        System.out.println(result.toString());
    }
    private static int[] parseArray(String s) {
        s = s.replace("[", "").replace("]", "");
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`
      }),
      // Day 75: Advanced Heap
      createQuestion({
        topicId: 'day-75-heap-advanced',
        title: 'Merge k Sorted Lists',
        description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
        difficulty: 'Hard',
        tags: ['Heap', 'Linked List', 'Divide and Conquer'],
        examples: [{ input: '[[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }],
        testCases: [
          { input: '[[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[[]]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[1,2,3,4,5,6,7,8,9]', isHidden: true, points: 20 },
          { input: '[[1],[2],[3]]', expectedOutput: '[1,2,3]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode list : lists) {
            if (list != null) pq.offer(list);
        }
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            curr.next = node;
            curr = curr.next;
            if (node.next != null) pq.offer(node.next);
        }
        return dummy.next;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        ListNode[] lists = parseLists(input);
        ListNode result = mergeKLists(lists);
        System.out.println(serializeList(result));
    }
    private static ListNode[] parseLists(String s) {
        if (s.equals("[]")) return new ListNode[0];
        if (s.equals("[[]]")) return new ListNode[]{null};
        s = s.substring(2, s.length() - 2);
        String[] parts = s.split("\\],\\[");
        ListNode[] lists = new ListNode[parts.length];
        for (int i = 0; i < parts.length; i++) {
            lists[i] = parseList(parts[i]);
        }
        return lists;
    }
    private static ListNode parseList(String s) {
        if (s.isEmpty()) return null;
        String[] nums = s.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String num : nums) {
            curr.next = new ListNode(Integer.parseInt(num.trim()));
            curr = curr.next;
        }
        return dummy.next;
    }
    private static String serializeList(ListNode head) {
        if (head == null) return "[]";
        StringBuilder sb = new StringBuilder("[");
        while (head != null) {
            sb.append(head.val).append(",");
            head = head.next;
        }
        sb.setLength(sb.length() - 1);
        return sb.append("]").toString();
    }
}`
      }),
      createQuestion({
        topicId: 'day-75-heap-advanced',
        title: 'Top K Frequent Elements',
        description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
        difficulty: 'Medium',
        examples: [{ input: '[1,1,1,2,2,3]\n2', output: '[1,2]' }],
        testCases: [
          { input: '[1,1,1,2,2,3]\n2', expectedOutput: '[1,2]', isHidden: false, points: 20 },
          { input: '[1]\n1', expectedOutput: '[1]', isHidden: false, points: 20 },
          { input: '[1,2]\n2', expectedOutput: '[1,2]', isHidden: true, points: 20 },
          { input: '[4,1,-1,2,-1,2,3]\n2', expectedOutput: '[-1,2]', isHidden: true, points: 20 },
          { input: '[5,3,1,1,1,3,73,1]\n2', expectedOutput: '[1,3]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        PriorityQueue<Map.Entry<Integer, Integer>> pq = new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            pq.offer(entry);
            if (pq.size() > k) pq.poll();
        }
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = pq.poll().getKey();
        }
        Arrays.sort(result);
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        int[] nums = parseArray(input);
        int[] result = topKFrequent(nums, k);
        System.out.println(Arrays.toString(result));
    }
    private static int[] parseArray(String s) {
        s = s.replace("[", "").replace("]", "");
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`
      }),
      createQuestion({
        topicId: 'day-75-heap-advanced',
        title: 'Top K Frequent Words',
        description: 'Given an array of strings words and an integer k, return the k most frequent strings. Return the answer sorted by the frequency from highest to lowest, then by lexicographic order.',
        difficulty: 'Medium',
        examples: [{ input: '[i,love,leetcode,i,love,coding]\n2', output: '[i,love]' }],
        testCases: [
          { input: '[i,love,leetcode,i,love,coding]\n2', expectedOutput: '[i,love]', isHidden: false, points: 20 },
          { input: '[the,day,is,sunny,the,the,the,sunny,is,is]\n4', expectedOutput: '[the,is,sunny,day]', isHidden: false, points: 20 },
          { input: '[a,aa,aaa]\n2', expectedOutput: '[a,aa]', isHidden: true, points: 20 },
          { input: '[a,b,c,a,b,a]\n2', expectedOutput: '[a,b]', isHidden: true, points: 20 },
          { input: '[i,love,you]\n1', expectedOutput: '[i]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> count = new HashMap<>();
        for (String word : words) {
            count.put(word, count.getOrDefault(word, 0) + 1);
        }
        PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> {
            int freqA = count.get(a);
            int freqB = count.get(b);
            if (freqA != freqB) return freqA - freqB;
            return b.compareTo(a);
        });
        for (String word : count.keySet()) {
            pq.offer(word);
            if (pq.size() > k) pq.poll();
        }
        List<String> result = new ArrayList<>();
        while (!pq.isEmpty()) {
            result.add(0, pq.poll());
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        String[] words = input.replace("[", "").replace("]", "").split(",");
        List<String> result = topKFrequent(words, k);
        System.out.println(result.toString());
    }
}`
      }),
      createQuestion({
        topicId: 'day-75-heap-advanced',
        title: 'Sort Characters By Frequency',
        description: 'Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.',
        difficulty: 'Medium',
        examples: [{ input: 'tree', output: 'eert' }],
        testCases: [
          { input: 'tree', expectedOutput: 'eetr', isHidden: false, points: 20 },
          { input: 'cccaaa', expectedOutput: 'aaaccc', isHidden: false, points: 20 },
          { input: 'Aabb', expectedOutput: 'bbAa', isHidden: true, points: 20 },
          { input: 'loveleetcode', expectedOutput: 'eeeeoollvtdc', isHidden: true, points: 20 },
          { input: 'a', expectedOutput: 'a', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static String frequencySort(String s) {
        Map<Character, Integer> count = new HashMap<>();
        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }
        PriorityQueue<Map.Entry<Character, Integer>> pq = new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
        pq.addAll(count.entrySet());
        StringBuilder result = new StringBuilder();
        while (!pq.isEmpty()) {
            Map.Entry<Character, Integer> entry = pq.poll();
            for (int i = 0; i < entry.getValue(); i++) {
                result.append(entry.getKey());
            }
        }
        return result.toString();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        sc.close();
        System.out.println(frequencySort(s));
    }
}`
      }),
      createQuestion({
        topicId: 'day-75-heap-advanced',
        title: 'Smallest Range Covering Elements from K Lists',
        description: 'You have k lists of sorted integers. Find the smallest range that includes at least one number from each of the k lists.',
        difficulty: 'Hard',
        examples: [{ input: '[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', output: '[20,24]' }],
        testCases: [
          { input: '[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', expectedOutput: '[20,24]', isHidden: false, points: 20 },
          { input: '[[1,2,3],[1,2,3],[1,2,3]]', expectedOutput: '[1,1]', isHidden: false, points: 20 },
          { input: '[[1],[2],[3],[4],[5]]', expectedOutput: '[1,5]', isHidden: true, points: 20 },
          { input: '[[10,10],[11,11]]', expectedOutput: '[10,11]', isHidden: true, points: 20 },
          { input: '[[1,3,5,7,9],[2,4,6,8,10]]', expectedOutput: '[1,2]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
public class Solution {
    public static int[] smallestRange(int[][] nums) {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            pq.offer(new int[]{nums[i][0], i, 0});
            max = Math.max(max, nums[i][0]);
        }
        int[] range = {-100000, 100000};
        while (pq.size() == nums.length) {
            int[] curr = pq.poll();
            int min = curr[0], listIdx = curr[1], elemIdx = curr[2];
            if (max - min < range[1] - range[0]) {
                range[0] = min;
                range[1] = max;
            }
            if (elemIdx + 1 < nums[listIdx].length) {
                int nextVal = nums[listIdx][elemIdx + 1];
                pq.offer(new int[]{nextVal, listIdx, elemIdx + 1});
                max = Math.max(max, nextVal);
            }
        }
        return range;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        int[][] nums = parseLists(input);
        int[] result = smallestRange(nums);
        System.out.println(Arrays.toString(result));
    }
    private static int[][] parseLists(String s) {
        s = s.substring(2, s.length() - 2);
        String[] parts = s.split("\\],\\[");
        int[][] lists = new int[parts.length][];
        for (int i = 0; i < parts.length; i++) {
            String[] nums = parts[i].split(",");
            lists[i] = new int[nums.length];
            for (int j = 0; j < nums.length; j++) {
                lists[i][j] = Integer.parseInt(nums[j].trim());
            }
        }
        return lists;
    }
}`
      })
    ];

    // Insert all questions
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

    console.log(`\n🎉 Days 73-75 complete! Created ${created}/15 questions\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays73to75();
