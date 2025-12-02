import mongoose from 'mongoose';
import Question from '../models/Question';
import Topic from '../models/Topic';
import dotenv from 'dotenv';

dotenv.config();

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
    id: 'day-67-tree-views',
    title: 'Binary Tree Views & Properties',
    description: 'Right side view, left view, children sum property',
    week: 11,
    day: 67,
    difficulty: 'Medium',
    estimatedTime: 100,
    prerequisites: ['day-64-binary-tree-basics', 'day-65-level-order'],
    compulsoryQuestion: 'Binary Tree Right Side View',
    practiceQuestions: 5
  },
  {
    id: 'day-68-tree-paths',
    title: 'Tree Paths & Structure',
    description: 'Balanced tree, max width, path sum problems',
    week: 11,
    day: 68,
    difficulty: 'Medium',
    estimatedTime: 110,
    prerequisites: ['day-66-height-distance'],
    compulsoryQuestion: 'Balanced Binary Tree',
    practiceQuestions: 5
  },
  {
    id: 'day-69-tree-diameter-lca',
    title: 'Diameter, Max Path Sum & LCA',
    description: 'Advanced tree algorithms',
    week: 11,
    day: 69,
    difficulty: 'Hard',
    estimatedTime: 120,
    prerequisites: ['day-66-height-distance'],
    compulsoryQuestion: 'Diameter of Binary Tree',
    practiceQuestions: 5
  }
];

async function populateDays67to69() {
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
    
    // Day 67 Questions
    const day67Questions = [
      createQuestion({
        topicId: 'day-67-tree-views',
        title: 'Binary Tree Right Side View',
        description: 'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
        difficulty: 'Medium',
        examples: [{ input: '[1,2,3,null,5,null,4]', output: '[1,3,4]' }],
        testCases: [
          { input: '[1,2,3,null,5,null,4]', expectedOutput: '[1,3,4]', isHidden: false, points: 20 },
          { input: '[1,null,3]', expectedOutput: '[1,3]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1,2,3,4]', expectedOutput: '[1,3,4]', isHidden: true, points: 20 },
          { input: '[1,2,3,null,5,null,4,6]', expectedOutput: '[1,3,4,6]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (i == size - 1) result.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(rightSideView(root).toString());
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
        topicId: 'day-67-tree-views',
        title: 'Binary Tree Left View',
        description: 'Given the root of a binary tree, imagine yourself standing on the left side of it, return the values of the nodes you can see ordered from top to bottom.',
        difficulty: 'Medium',
        examples: [{ input: '[1,2,3,null,5,null,4]', output: '[1,2,5]' }],
        testCases: [
          { input: '[1,2,3,null,5,null,4]', expectedOutput: '[1,2,5]', isHidden: false, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[1,2]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: true, points: 20 },
          { input: '[1]', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[1,2,null,3]', expectedOutput: '[1,2,3]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static List<Integer> leftSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (i == 0) result.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(leftSideView(root).toString());
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
        topicId: 'day-67-tree-views',
        title: 'Children Sum Property',
        description: 'Given a binary tree, check if it follows the children sum property. For every node, the value of the node should be equal to the sum of values of its left and right children. Consider the value as 0 for NULL children.',
        difficulty: 'Medium',
        examples: [{ input: '[10,8,2,3,5,2]', output: 'true' }],
        testCases: [
          { input: '[10,8,2,3,5,2]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,4,3,5,null]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[10,10]', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[5,2,3,1,1,1,2]', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean isChildrenSumProperty(TreeNode root) {
        if (root == null) return true;
        if (root.left == null && root.right == null) return true;
        int leftVal = (root.left != null) ? root.left.val : 0;
        int rightVal = (root.right != null) ? root.right.val : 0;
        return (root.val == leftVal + rightVal) && 
               isChildrenSumProperty(root.left) && 
               isChildrenSumProperty(root.right);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(isChildrenSumProperty(root));
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
        topicId: 'day-67-tree-views',
        title: 'Cousins in Binary Tree',
        description: 'Given the root of a binary tree with unique values and two node values x and y, return true if the nodes corresponding to x and y are cousins. Two nodes are cousins if they have the same depth but different parents.',
        difficulty: 'Easy',
        examples: [{ input: '[1,2,3,4]\n4\n3', output: 'false' }],
        testCases: [
          { input: '[1,2,3,4]\n4\n3', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[1,2,3,null,4,null,5]\n5\n4', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,2,3,null,4]\n2\n3', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,6,7]\n4\n6', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,6,7]\n4\n5', expectedOutput: 'false', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static int xDepth = -1, yDepth = -1;
    static TreeNode xParent = null, yParent = null;
    public static boolean isCousins(TreeNode root, int x, int y) {
        xDepth = yDepth = -1;
        xParent = yParent = null;
        findDepth(root, null, x, y, 0);
        return xDepth == yDepth && xParent != yParent;
    }
    private static void findDepth(TreeNode node, TreeNode parent, int x, int y, int depth) {
        if (node == null) return;
        if (node.val == x) {
            xDepth = depth;
            xParent = parent;
        }
        if (node.val == y) {
            yDepth = depth;
            yParent = parent;
        }
        findDepth(node.left, node, x, y, depth + 1);
        findDepth(node.right, node, x, y, depth + 1);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int x = Integer.parseInt(sc.nextLine().trim());
        int y = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(isCousins(root, x, y));
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
        topicId: 'day-67-tree-views',
        title: 'Leaf-Similar Trees',
        description: 'Consider all the leaves of a binary tree, from left to right order. Two binary trees are considered leaf-similar if their leaf value sequence is the same.',
        difficulty: 'Easy',
        examples: [{ input: '[3,5,1,6,2,9,8,null,null,7,4]\n[3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]', output: 'true' }],
        testCases: [
          { input: '[3,5,1,6,2,9,8,null,null,7,4]\n[3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,2,3]\n[1,3,2]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[1]\n[1]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1,2]\n[2,2]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1,2,3]\n[1,2,3]', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> leaves1 = new ArrayList<>();
        List<Integer> leaves2 = new ArrayList<>();
        getLeaves(root1, leaves1);
        getLeaves(root2, leaves2);
        return leaves1.equals(leaves2);
    }
    private static void getLeaves(TreeNode node, List<Integer> leaves) {
        if (node == null) return;
        if (node.left == null && node.right == null) {
            leaves.add(node.val);
            return;
        }
        getLeaves(node.left, leaves);
        getLeaves(node.right, leaves);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input1 = sc.nextLine().trim();
        String input2 = sc.nextLine().trim();
        sc.close();
        TreeNode root1 = buildTree(input1);
        TreeNode root2 = buildTree(input2);
        System.out.println(leafSimilar(root1, root2));
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

    // Day 68 Questions
    const day68Questions = [
      createQuestion({
        topicId: 'day-68-tree-paths',
        title: 'Balanced Binary Tree',
        description: 'Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.',
        difficulty: 'Easy',
        examples: [{ input: '[3,9,20,null,null,15,7]', output: 'true' }],
        testCases: [
          { input: '[3,9,20,null,null,15,7]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,2,2,3,3,null,null,4,4]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,6,null,8]', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }
    private static int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left);
        if (left == -1) return -1;
        int right = height(node.right);
        if (right == -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(isBalanced(root));
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
        topicId: 'day-68-tree-paths',
        title: 'Maximum Width of Binary Tree',
        description: 'Given the root of a binary tree, return the maximum width of the given tree. The maximum width is the maximum number of nodes at any level.',
        difficulty: 'Medium',
        examples: [{ input: '[1,3,2,5,3,null,9]', output: '4' }],
        testCases: [
          { input: '[1,3,2,5,3,null,9]', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[1,3,2,5,null,null,9,6,null,7]', expectedOutput: '7', isHidden: false, points: 20 },
          { input: '[1,3,2,5]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[1]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[1,1,1,1,null,null,1,1,null,null,1]', expectedOutput: '8', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        Queue<Pair> queue = new LinkedList<>();
        queue.offer(new Pair(root, 0));
        int maxWidth = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            int min = queue.peek().pos;
            int first = 0, last = 0;
            for (int i = 0; i < size; i++) {
                Pair p = queue.poll();
                TreeNode node = p.node;
                int pos = p.pos - min;
                if (i == 0) first = pos;
                if (i == size - 1) last = pos;
                if (node.left != null) queue.offer(new Pair(node.left, 2 * pos));
                if (node.right != null) queue.offer(new Pair(node.right, 2 * pos + 1));
            }
            maxWidth = Math.max(maxWidth, last - first + 1);
        }
        return maxWidth;
    }
    static class Pair {
        TreeNode node;
        int pos;
        Pair(TreeNode node, int pos) {
            this.node = node;
            this.pos = pos;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(widthOfBinaryTree(root));
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
        topicId: 'day-68-tree-paths',
        title: 'Check Completeness of a Binary Tree',
        description: 'Given the root of a binary tree, determine if it is a complete binary tree. In a complete binary tree, every level is completely filled except possibly the last level.',
        difficulty: 'Medium',
        examples: [{ input: '[1,2,3,4,5,6]', output: 'true' }],
        testCases: [
          { input: '[1,2,3,4,5,6]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,2,3,4,5,null,7]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,6,7]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[1,2,3,5,null,7,8]', expectedOutput: 'false', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean isCompleteTree(TreeNode root) {
        if (root == null) return true;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean seenNull = false;
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                seenNull = true;
            } else {
                if (seenNull) return false;
                queue.offer(node.left);
                queue.offer(node.right);
            }
        }
        return true;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(isCompleteTree(root));
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
        topicId: 'day-68-tree-paths',
        title: 'Sum Root to Leaf Numbers',
        description: 'You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path represents a number. Return the total sum of all root-to-leaf numbers.',
        difficulty: 'Medium',
        examples: [{ input: '[1,2,3]', output: '25' }],
        testCases: [
          { input: '[1,2,3]', expectedOutput: '25', isHidden: false, points: 20 },
          { input: '[4,9,0,5,1]', expectedOutput: '1026', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[1,0]', expectedOutput: '10', isHidden: true, points: 20 },
          { input: '[4,9,0,null,1]', expectedOutput: '531', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }
    private static int dfs(TreeNode node, int current) {
        if (node == null) return 0;
        current = current * 10 + node.val;
        if (node.left == null && node.right == null) return current;
        return dfs(node.left, current) + dfs(node.right, current);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(sumNumbers(root));
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
        topicId: 'day-68-tree-paths',
        title: 'Path Sum',
        description: 'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
        difficulty: 'Easy',
        examples: [{ input: '[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22', output: 'true' }],
        testCases: [
          { input: '[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[1,2,3]\n5', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[]\n0', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[1,2]\n1', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[1]\n1', expectedOutput: 'true', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == targetSum;
        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int targetSum = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(hasPathSum(root, targetSum));
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

    // Day 69 Questions
    const day69Questions = [
      createQuestion({
        topicId: 'day-69-tree-diameter-lca',
        title: 'Diameter of Binary Tree',
        description: 'Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree.',
        difficulty: 'Easy',
        examples: [{ input: '[1,2,3,4,5]', output: '3' }],
        testCases: [
          { input: '[1,2,3,4,5]', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '[1,2]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '0', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,6,7]', expectedOutput: '4', isHidden: true, points: 20 },
          { input: '[4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2]', expectedOutput: '8', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static int diameter = 0;
    public static int diameterOfBinaryTree(TreeNode root) {
        diameter = 0;
        height(root);
        return diameter;
    }
    private static int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left);
        int right = height(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(diameterOfBinaryTree(root));
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
        topicId: 'day-69-tree-diameter-lca',
        title: 'Binary Tree Maximum Path Sum',
        description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. The path sum is the sum of the node\'s values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.',
        difficulty: 'Hard',
        examples: [{ input: '[1,2,3]', output: '6' }],
        testCases: [
          { input: '[1,2,3]', expectedOutput: '6', isHidden: false, points: 20 },
          { input: '[-10,9,20,null,null,15,7]', expectedOutput: '42', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[-3]', expectedOutput: '-3', isHidden: true, points: 20 },
          { input: '[2,-1]', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static int maxSum = Integer.MIN_VALUE;
    public static int maxPathSum(TreeNode root) {
        maxSum = Integer.MIN_VALUE;
        maxGain(root);
        return maxSum;
    }
    private static int maxGain(TreeNode node) {
        if (node == null) return 0;
        int leftGain = Math.max(maxGain(node.left), 0);
        int rightGain = Math.max(maxGain(node.right), 0);
        int priceNewPath = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, priceNewPath);
        return node.val + Math.max(leftGain, rightGain);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(maxPathSum(root));
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
        topicId: 'day-69-tree-diameter-lca',
        title: 'Lowest Common Ancestor of a Binary Tree',
        description: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. The LCA is the lowest node that has both nodes as descendants.',
        difficulty: 'Medium',
        examples: [{ input: '[3,5,1,6,2,0,8,null,null,7,4]\n5\n1', output: '3' }],
        testCases: [
          { input: '[3,5,1,6,2,0,8,null,null,7,4]\n5\n1', expectedOutput: '3', isHidden: false, points: 20 },
          { input: '[3,5,1,6,2,0,8,null,null,7,4]\n5\n4', expectedOutput: '5', isHidden: false, points: 20 },
          { input: '[1,2]\n1\n2', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[2,1]\n2\n1', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5]\n4\n5', expectedOutput: '2', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {
        if (root == null || root.val == p || root.val == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int p = Integer.parseInt(sc.nextLine().trim());
        int q = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        TreeNode lca = lowestCommonAncestor(root, p, q);
        System.out.println(lca != null ? lca.val : "null");
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
        topicId: 'day-69-tree-diameter-lca',
        title: 'Lowest Common Ancestor of Deepest Leaves',
        description: 'Given the root of a binary tree, return the lowest common ancestor of its deepest leaves.',
        difficulty: 'Medium',
        examples: [{ input: '[3,5,1,6,2,0,8,null,null,7,4]', output: '2' }],
        testCases: [
          { input: '[3,5,1,6,2,0,8,null,null,7,4]', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[0,1,3,null,2]', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[1,2,3]', expectedOutput: '1', isHidden: true, points: 20 },
          { input: '[1,2,3,4]', expectedOutput: '4', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode lcaDeepestLeaves(TreeNode root) {
        return helper(root).node;
    }
    private static Pair helper(TreeNode node) {
        if (node == null) return new Pair(null, 0);
        Pair left = helper(node.left);
        Pair right = helper(node.right);
        if (left.depth > right.depth) return new Pair(left.node, left.depth + 1);
        if (left.depth < right.depth) return new Pair(right.node, right.depth + 1);
        return new Pair(node, left.depth + 1);
    }
    static class Pair {
        TreeNode node;
        int depth;
        Pair(TreeNode node, int depth) {
            this.node = node;
            this.depth = depth;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        TreeNode result = lcaDeepestLeaves(root);
        System.out.println(result != null ? result.val : "null");
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
        topicId: 'day-69-tree-diameter-lca',
        title: 'Step-By-Step Directions From a Binary Tree Node to Another',
        description: 'You are given the root of a binary tree with n nodes and two integers startValue and destValue. Find the shortest path from the node with startValue to the node with destValue, return the directions as a string of L (go left), R (go right), and U (go up).',
        difficulty: 'Medium',
        examples: [{ input: '[5,1,2,3,null,6,4]\n3\n6', output: 'UURL' }],
        testCases: [
          { input: '[5,1,2,3,null,6,4]\n3\n6', expectedOutput: 'UURL', isHidden: false, points: 20 },
          { input: '[2,1]\n2\n1', expectedOutput: 'L', isHidden: false, points: 20 },
          { input: '[1,null,2]\n1\n2', expectedOutput: 'R', isHidden: true, points: 20 },
          { input: '[5,1,2,3,null,6,4]\n1\n4', expectedOutput: 'URR', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,6,7]\n4\n7', expectedOutput: 'UUR', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static String getDirections(TreeNode root, int startValue, int destValue) {
        StringBuilder pathToStart = new StringBuilder();
        StringBuilder pathToDest = new StringBuilder();
        findPath(root, startValue, pathToStart);
        findPath(root, destValue, pathToDest);
        int i = 0;
        while (i < pathToStart.length() && i < pathToDest.length() && 
               pathToStart.charAt(i) == pathToDest.charAt(i)) {
            i++;
        }
        StringBuilder result = new StringBuilder();
        for (int j = i; j < pathToStart.length(); j++) {
            result.append('U');
        }
        result.append(pathToDest.substring(i));
        return result.toString();
    }
    private static boolean findPath(TreeNode node, int target, StringBuilder path) {
        if (node == null) return false;
        if (node.val == target) return true;
        path.append('L');
        if (findPath(node.left, target, path)) return true;
        path.setLength(path.length() - 1);
        path.append('R');
        if (findPath(node.right, target, path)) return true;
        path.setLength(path.length() - 1);
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int start = Integer.parseInt(sc.nextLine().trim());
        int dest = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(getDirections(root, start, dest));
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
    const allQuestions = [...day67Questions, ...day68Questions, ...day69Questions];
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

    console.log(`\n🎉 Days 67-69 complete! Created ${created}/15 questions\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays67to69();
