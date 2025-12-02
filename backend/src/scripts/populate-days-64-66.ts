import mongoose from 'mongoose';
import Question from '../models/Question';
import Topic from '../models/Topic';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to create complete question objects
function createQuestion(data: any) {
  const defaultStarterCode = `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`;

  return {
    topicId: data.topicId,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    day: data.day,
    points: 100,
    timeLimit: 2000,
    starterCode: data.starterCode || defaultStarterCode,
    solution: data.solution,
    examples: data.examples,
    testCases: data.testCases,
    hints: data.hints || [],
    tags: data.tags || ['Binary Tree', 'Tree']
  };
}

const topicsData: any[] = [
  {
    id: 'day-64-binary-tree-basics',
    title: 'Binary Tree Basics & Traversals',
    description: 'Standard recursive and iterative traversals',
    week: 10,
    day: 64,
    difficulty: 'Easy',
    estimatedTime: 90,
    prerequisites: [],
    compulsoryQuestion: 'Binary Tree Inorder Traversal',
    practiceQuestions: 5
  },
  {
    id: 'day-65-level-order',
    title: 'Level Order & Spiral Traversal',
    description: 'Breadth-First Search (BFS) on Trees',
    week: 10,
    day: 65,
    difficulty: 'Medium',
    estimatedTime: 90,
    prerequisites: ['day-64-binary-tree-basics'],
    compulsoryQuestion: 'Binary Tree Level Order Traversal',
    practiceQuestions: 5
  },
  {
    id: 'day-66-height-distance',
    title: 'Height, Size & K-Distance Nodes',
    description: 'Tree properties involving depth and path lengths',
    week: 10,
    day: 66,
    difficulty: 'Medium',
    estimatedTime: 100,
    prerequisites: ['day-64-binary-tree-basics', 'day-65-level-order'],
    compulsoryQuestion: 'Maximum Depth of Binary Tree',
    practiceQuestions: 5
  }
];

async function populateDays64to66() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // Create Topics
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
    
    // Day 64 Questions
    const day64Questions = [
      createQuestion({
        topicId: 'day-64-binary-tree-basics',
        title: 'Binary Tree Inorder Traversal',
        description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
        difficulty: 'Easy',
        day: 64,
        examples: [{ input: '[1,null,2,3]', output: '[1,3,2]' }],
        testCases: [
          { input: '[1,null,2,3]', expectedOutput: '[1,3,2]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1]', isHidden: false, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[2,1,3]', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5]', expectedOutput: '[4,2,5,1,3]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorder(root, result);
        return result;
    }
    private static void inorder(TreeNode node, List<Integer> result) {
        if (node == null) return;
        inorder(node.left, result);
        result.add(node.val);
        inorder(node.right, result);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        List<Integer> result = inorderTraversal(root);
        System.out.println(result.toString());
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
        topicId: 'day-64-binary-tree-basics',
        title: 'Binary Tree Preorder Traversal',
        description: 'Given the root of a binary tree, return the preorder traversal of its nodes\' values.',
        difficulty: 'Easy',
        day: 64,
        examples: [{ input: '[1,null,2,3]', output: '[1,2,3]' }],
        testCases: [
          { input: '[1,null,2,3]', expectedOutput: '[1,2,3]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1]', isHidden: false, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[1,2,3]', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5]', expectedOutput: '[1,2,4,5,3]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorder(root, result);
        return result;
    }
    private static void preorder(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.val);
        preorder(node.left, result);
        preorder(node.right, result);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        List<Integer> result = preorderTraversal(root);
        System.out.println(result.toString());
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
        topicId: 'day-64-binary-tree-basics',
        title: 'Binary Tree Postorder Traversal',
        description: 'Given the root of a binary tree, return the postorder traversal of its nodes\' values.',
        difficulty: 'Easy',
        day: 64,
        examples: [{ input: '[1,null,2,3]', output: '[3,2,1]' }],
        testCases: [
          { input: '[1,null,2,3]', expectedOutput: '[3,2,1]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1]', isHidden: false, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[2,3,1]', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5]', expectedOutput: '[4,5,2,3,1]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorder(root, result);
        return result;
    }
    private static void postorder(TreeNode node, List<Integer> result) {
        if (node == null) return;
        postorder(node.left, result);
        postorder(node.right, result);
        result.add(node.val);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        List<Integer> result = postorderTraversal(root);
        System.out.println(result.toString());
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
        topicId: 'day-64-binary-tree-basics',
        title: 'Same Tree',
        description: 'Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
        difficulty: 'Easy',
        day: 64,
        examples: [{ input: '[1,2,3]\n[1,2,3]', output: 'true' }],
        testCases: [
          { input: '[1,2,3]\n[1,2,3]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,2]\n[1,null,2]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[1,2,1]\n[1,1,2]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[]\n[]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1]\n[1]', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input1 = sc.nextLine().trim();
        String input2 = sc.nextLine().trim();
        sc.close();
        TreeNode p = buildTree(input1);
        TreeNode q = buildTree(input2);
        System.out.println(isSameTree(p, q));
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
        topicId: 'day-64-binary-tree-basics',
        title: 'Symmetric Tree',
        description: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
        difficulty: 'Easy',
        day: 64,
        examples: [{ input: '[1,2,2,3,4,4,3]', output: 'true' }],
        testCases: [
          { input: '[1,2,2,3,4,4,3]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,2,2,null,3,null,3]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1,2,2,2,null,2]', expectedOutput: 'false', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }
    private static boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        return left.val == right.val && isMirror(left.left, right.right) && isMirror(left.right, right.left);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(isSymmetric(root));
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
      })
    ];

    // Day 65 Questions
    const day65Questions = [
      createQuestion({
        topicId: 'day-65-level-order',
        title: 'Binary Tree Level Order Traversal',
        description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
        difficulty: 'Medium',
        day: 65,
        examples: [{ input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
        testCases: [
          { input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[[1]]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1,2,3,4,5]', expectedOutput: '[[1],[2,3],[4,5]]', isHidden: true, points: 20 },
          { input: '[1,2,null,3,null,4,null,5]', expectedOutput: '[[1],[2],[3],[4],[5]]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(levelOrder(root).toString());
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
        topicId: 'day-65-level-order',
        title: 'Binary Tree Zigzag Level Order Traversal',
        description: 'Given the root of a binary tree, return the zigzag level order traversal of its nodes\' values. (i.e., from left to right, then right to left for the next level and alternate between).',
        difficulty: 'Medium',
        day: 65,
        examples: [{ input: '[3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' }],
        testCases: [
          { input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[20,9],[15,7]]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[[1]]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1,2,3,4,5]', expectedOutput: '[[1],[3,2],[4,5]]', isHidden: true, points: 20 },
          { input: '[1,2,3,4,null,null,5]', expectedOutput: '[[1],[3,2],[4,5]]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean leftToRight = true;
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            if (!leftToRight) Collections.reverse(level);
            result.add(level);
            leftToRight = !leftToRight;
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(zigzagLevelOrder(root).toString());
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
        topicId: 'day-65-level-order',
        title: 'Average of Levels in Binary Tree',
        description: 'Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.',
        difficulty: 'Easy',
        day: 65,
        examples: [{ input: '[3,9,20,null,null,15,7]', output: '[3.0,14.5,11.0]' }],
        testCases: [
          { input: '[3,9,20,null,null,15,7]', expectedOutput: '[3.0,14.5,11.0]', isHidden: false, points: 20 },
          { input: '[3,9,20,15,7]', expectedOutput: '[3.0,14.5,11.0]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1.0]', isHidden: true, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[1.0,2.5]', isHidden: true, points: 20 },
          { input: '[2147483647,2147483647,2147483647]', expectedOutput: '[2.147483647E9,2.147483647E9]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<Double> averageOfLevels(TreeNode root) {
        List<Double> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            double sum = 0;
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                sum += node.val;
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(sum / size);
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(averageOfLevels(root).toString());
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
        topicId: 'day-65-level-order',
        title: 'Find Largest Value in Each Tree Row',
        description: 'Given the root of a binary tree, return an array of the largest value in each row of the tree.',
        difficulty: 'Medium',
        day: 65,
        examples: [{ input: '[1,3,2,5,3,null,9]', output: '[1,3,9]' }],
        testCases: [
          { input: '[1,3,2,5,3,null,9]', expectedOutput: '[1,3,9]', isHidden: false, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[1,3]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[1,null,2]', expectedOutput: '[1,2]', isHidden: true, points: 20 },
          { input: '[0,-1]', expectedOutput: '[0,-1]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<Integer> largestValues(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            int max = Integer.MIN_VALUE;
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                max = Math.max(max, node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(max);
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(largestValues(root).toString());
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
        topicId: 'day-65-level-order',
        title: 'Populating Next Right Pointers in Each Node',
        description: 'You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.',
        difficulty: 'Medium',
        day: 65,
        examples: [{ input: '[1,2,3,4,5,6,7]', output: '[1,#,2,3,#,4,5,6,7,#]' }],
        testCases: [
          { input: '[1,2,3,4,5,6,7]', expectedOutput: '[1,#,2,3,#,4,5,6,7,#]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1,#]', isHidden: true, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[1,#,2,3,#]', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,null,7]', expectedOutput: '[1,#,2,3,#,4,5,7,#]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right, next;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode connect(TreeNode root) {
        if (root == null) return null;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (i < size - 1) node.next = queue.peek();
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        return root;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        connect(root);
        System.out.println(serialize(root));
    }
    private static String serialize(TreeNode root) {
        if (root == null) return "[]";
        StringBuilder sb = new StringBuilder("[");
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                sb.append(node.val).append(",");
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            sb.append("#,");
        }
        sb.setLength(sb.length() - 1);
        sb.append("]");
        return sb.toString();
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
      })
    ];

    // Day 66 Questions
    const day66Questions = [
      createQuestion({
        topicId: 'day-66-height-distance',
        title: 'Maximum Depth of Binary Tree',
        description: 'Given the root of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
        difficulty: 'Easy',
        day: 66,
        examples: [{ input: '[3,9,20,null,null,15,7]', output: '3' }],
        testCases: [
          { input: '[3,9,20,null,null,15,7]', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '[1,null,2]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[0]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[1,2,3,4,null,null,5]', expectedOutput: '3', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(maxDepth(root));
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
        topicId: 'day-66-height-distance',
        title: 'Minimum Depth of Binary Tree',
        description: 'Given a binary tree, find its minimum depth. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.',
        difficulty: 'Easy',
        day: 66,
        examples: [{ input: '[3,9,20,null,null,15,7]', output: '2' }],
        testCases: [
          { input: '[3,9,20,null,null,15,7]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[2,null,3,null,4,null,5,null,6]', expectedOutput: '5', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[1]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[1,2]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static int minDepth(TreeNode root) {
        if (root == null) return 0;
        if (root.left == null) return 1 + minDepth(root.right);
        if (root.right == null) return 1 + minDepth(root.left);
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(minDepth(root));
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
        topicId: 'day-66-height-distance',
        title: 'Count Complete Tree Nodes',
        description: 'Given the root of a complete binary tree, return the number of the nodes in the tree. In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.',
        difficulty: 'Medium',
        day: 66,
        examples: [{ input: '[1,2,3,4,5,6]', output: '6' }],
        testCases: [
          { input: '[1,2,3,4,5,6]', expectedOutput: '6', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[1,2,3,4,5,6,7,8,9,10]', expectedOutput: '10', isHidden: true, points: 20 },
          { input: '[1,2,3,4]', expectedOutput: '4', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static int countNodes(TreeNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(countNodes(root));
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
        topicId: 'day-66-height-distance',
        title: 'All Nodes Distance K in Binary Tree',
        description: 'Given the root of a binary tree, a target node in the tree, and an integer k, return an array of the values of all nodes that have a distance k from the target node.',
        difficulty: 'Medium',
        day: 66,
        examples: [{ input: '[3,5,1,6,2,0,8,null,null,7,4]\n5\n2', output: '[7,4,1]' }],
        testCases: [
          { input: '[3,5,1,6,2,0,8,null,null,7,4]\n5\n2', expectedOutput: '[7,4,1]', isHidden: false, points: 20 },
          { input: '[1]\n1\n3', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1]\n1\n0', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[0,1,null,3,2]\n2\n1', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[0,2,1,null,null,3]\n3\n3', expectedOutput: '[2]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<Integer> distanceK(TreeNode root, int target, int k) {
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        buildParent(root, null, parent);
        TreeNode targetNode = findNode(root, target);
        List<Integer> result = new ArrayList<>();
        Set<TreeNode> visited = new HashSet<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(targetNode);
        visited.add(targetNode);
        int dist = 0;
        while (!queue.isEmpty() && dist <= k) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (dist == k) result.add(node.val);
                if (node.left != null && !visited.contains(node.left)) {
                    queue.offer(node.left);
                    visited.add(node.left);
                }
                if (node.right != null && !visited.contains(node.right)) {
                    queue.offer(node.right);
                    visited.add(node.right);
                }
                TreeNode par = parent.get(node);
                if (par != null && !visited.contains(par)) {
                    queue.offer(par);
                    visited.add(par);
                }
            }
            dist++;
        }
        return result;
    }
    private static void buildParent(TreeNode node, TreeNode par, Map<TreeNode, TreeNode> parent) {
        if (node == null) return;
        parent.put(node, par);
        buildParent(node.left, node, parent);
        buildParent(node.right, node, parent);
    }
    private static TreeNode findNode(TreeNode root, int val) {
        if (root == null) return null;
        if (root.val == val) return root;
        TreeNode left = findNode(root.left, val);
        if (left != null) return left;
        return findNode(root.right, val);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int target = Integer.parseInt(sc.nextLine().trim());
        int k = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(distanceK(root, target, k).toString());
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
        topicId: 'day-66-height-distance',
        title: 'Amount of Time for Binary Tree to Be Infected',
        description: 'You are given the root of a binary tree with unique values, and an integer start. At minute 0, an infection starts from the node with value start. Each minute, a node becomes infected if: The node is currently uninfected. The node is adjacent to an infected node. Return the number of minutes needed for the entire tree to be infected.',
        difficulty: 'Medium',
        day: 66,
        examples: [{ input: '[1,5,3,null,4,10,6,9,2]\n3', output: '4' }],
        testCases: [
          { input: '[1,5,3,null,4,10,6,9,2]\n3', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[1]\n1', expectedOutput: '0', isHidden: false, points: 20 },
          { input: '[1,2,3]\n2', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[1,null,2]\n2', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[3,1,4,null,2]\n2', expectedOutput: '3', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static int amountOfTime(TreeNode root, int start) {
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        buildParent(root, null, parent);
        TreeNode startNode = findNode(root, start);
        Set<TreeNode> visited = new HashSet<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(startNode);
        visited.add(startNode);
        int time = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            boolean infected = false;
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (node.left != null && !visited.contains(node.left)) {
                    queue.offer(node.left);
                    visited.add(node.left);
                    infected = true;
                }
                if (node.right != null && !visited.contains(node.right)) {
                    queue.offer(node.right);
                    visited.add(node.right);
                    infected = true;
                }
                TreeNode par = parent.get(node);
                if (par != null && !visited.contains(par)) {
                    queue.offer(par);
                    visited.add(par);
                    infected = true;
                }
            }
            if (infected) time++;
        }
        return time;
    }
    private static void buildParent(TreeNode node, TreeNode par, Map<TreeNode, TreeNode> parent) {
        if (node == null) return;
        parent.put(node, par);
        buildParent(node.left, node, parent);
        buildParent(node.right, node, parent);
    }
    private static TreeNode findNode(TreeNode root, int val) {
        if (root == null) return null;
        if (root.val == val) return root;
        TreeNode left = findNode(root.left, val);
        if (left != null) return left;
        return findNode(root.right, val);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int start = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(amountOfTime(root, start));
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
      })
    ];

    // Insert all questions
    let created = 0;
    const allQuestions = [...day64Questions, ...day65Questions, ...day66Questions];
    for (const questionData of allQuestions) {
      const existing = await Question.findOne({ title: questionData.title });
      if (!existing) {
        await Question.create(questionData);
        console.log(`  ✅ Created: ${questionData.title}`);
        created++;
      } else {
        console.log(`  ⏭️  Exists: ${questionData.title}`);
      }
    }

    console.log(`\n🎉 Days 64-66 complete! Created ${created}/15 questions\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays64to66();
