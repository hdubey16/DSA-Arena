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
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    solution: data.solution,
    examples: data.examples,
    testCases: data.testCases,
    hints: data.hints || [],
    tags: data.tags || ['Binary Tree', 'BST']
  };
}

const topicsData: any[] = [
  {
    id: 'day-70-tree-construction',
    title: 'Construct Binary Trees',
    description: 'Build trees from traversals, serialize/deserialize',
    week: 11,
    day: 70,
    difficulty: 'Medium',
    estimatedTime: 120,
    prerequisites: ['day-64-binary-tree-basics'],
    compulsoryQuestion: 'Construct Binary Tree from Preorder and Inorder',
    practiceQuestions: 5
  },
  {
    id: 'day-71-bst-basics',
    title: 'Binary Search Tree Basics',
    description: 'BST search, insert, delete, validate',
    week: 11,
    day: 71,
    difficulty: 'Medium',
    estimatedTime: 110,
    prerequisites: ['day-64-binary-tree-basics'],
    compulsoryQuestion: 'Validate Binary Search Tree',
    practiceQuestions: 5
  },
  {
    id: 'day-72-bst-operations',
    title: 'BST Advanced Operations',
    description: 'BST LCA, successor, iterator, closest value',
    week: 11,
    day: 72,
    difficulty: 'Medium',
    estimatedTime: 110,
    prerequisites: ['day-71-bst-basics'],
    compulsoryQuestion: 'Inorder Successor in BST',
    practiceQuestions: 5
  }
];

async function populateDays70to72() {
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
      // Day 70: Tree Construction
      createQuestion({
        topicId: 'day-70-tree-construction',
        title: 'Construct Binary Tree from Preorder and Inorder',
        description: 'Given two integer arrays preorder and inorder where preorder is the preorder traversal and inorder is the inorder traversal of a binary tree, construct and return the binary tree.',
        difficulty: 'Medium',
        examples: [{ input: '[3,9,20,15,7]\n[9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' }],
        testCases: [
          { input: '[3,9,20,15,7]\n[9,3,15,20,7]', expectedOutput: '[3,9,20,null,null,15,7]', isHidden: false, points: 20 },
          { input: '[-1]\n[-1]', expectedOutput: '[-1]', isHidden: false, points: 20 },
          { input: '[1,2]\n[2,1]', expectedOutput: '[1,2]', isHidden: true, points: 20 },
          { input: '[1,2]\n[1,2]', expectedOutput: '[1,null,2]', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,6,7]\n[4,2,5,1,6,3,7]', expectedOutput: '[1,2,3,4,5,6,7]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static int preIdx = 0;
    static Map<Integer, Integer> inMap = new HashMap<>();
    public static TreeNode buildTree(int[] preorder, int[] inorder) {
        preIdx = 0;
        inMap.clear();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(preorder, 0, inorder.length - 1);
    }
    private static TreeNode build(int[] preorder, int left, int right) {
        if (left > right) return null;
        int val = preorder[preIdx++];
        TreeNode node = new TreeNode(val);
        node.left = build(preorder, left, inMap.get(val) - 1);
        node.right = build(preorder, inMap.get(val) + 1, right);
        return node;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String pre = sc.nextLine().trim();
        String in = sc.nextLine().trim();
        sc.close();
        int[] preorder = parseArray(pre);
        int[] inorder = parseArray(in);
        TreeNode root = buildTree(preorder, inorder);
        System.out.println(serialize(root));
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
        topicId: 'day-70-tree-construction',
        title: 'Construct Binary Tree from Inorder and Postorder',
        description: 'Given two integer arrays inorder and postorder where inorder is the inorder traversal and postorder is the postorder traversal of a binary tree, construct and return the binary tree.',
        difficulty: 'Medium',
        examples: [{ input: '[9,3,15,20,7]\n[9,15,7,20,3]', output: '[3,9,20,null,null,15,7]' }],
        testCases: [
          { input: '[9,3,15,20,7]\n[9,15,7,20,3]', expectedOutput: '[3,9,20,null,null,15,7]', isHidden: false, points: 20 },
          { input: '[-1]\n[-1]', expectedOutput: '[-1]', isHidden: false, points: 20 },
          { input: '[2,1]\n[2,1]', expectedOutput: '[1,2]', isHidden: true, points: 20 },
          { input: '[1,2]\n[2,1]', expectedOutput: '[1,null,2]', isHidden: true, points: 20 },
          { input: '[4,2,5,1,6,3,7]\n[4,5,2,6,7,3,1]', expectedOutput: '[1,2,3,4,5,6,7]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static int postIdx;
    static Map<Integer, Integer> inMap = new HashMap<>();
    public static TreeNode buildTree(int[] inorder, int[] postorder) {
        postIdx = postorder.length - 1;
        inMap.clear();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(postorder, 0, inorder.length - 1);
    }
    private static TreeNode build(int[] postorder, int left, int right) {
        if (left > right) return null;
        int val = postorder[postIdx--];
        TreeNode node = new TreeNode(val);
        node.right = build(postorder, inMap.get(val) + 1, right);
        node.left = build(postorder, left, inMap.get(val) - 1);
        return node;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String in = sc.nextLine().trim();
        String post = sc.nextLine().trim();
        sc.close();
        int[] inorder = parseArray(in);
        int[] postorder = parseArray(post);
        TreeNode root = buildTree(inorder, postorder);
        System.out.println(serialize(root));
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
        topicId: 'day-70-tree-construction',
        title: 'Construct Binary Tree from Preorder and Postorder',
        description: 'Given two integer arrays preorder and postorder where preorder is the preorder traversal and postorder is the postorder traversal of a full binary tree, construct and return any binary tree that matches the given traversals.',
        difficulty: 'Medium',
        examples: [{ input: '[1,2,4,5,3,6,7]\n[4,5,2,6,7,3,1]', output: '[1,2,3,4,5,6,7]' }],
        testCases: [
          { input: '[1,2,4,5,3,6,7]\n[4,5,2,6,7,3,1]', expectedOutput: '[1,2,3,4,5,6,7]', isHidden: false, points: 20 },
          { input: '[1]\n[1]', expectedOutput: '[1]', isHidden: false, points: 20 },
          { input: '[1,2]\n[2,1]', expectedOutput: '[1,2]', isHidden: true, points: 20 },
          { input: '[2,1]\n[1,2]', expectedOutput: '[2,null,1]', isHidden: true, points: 20 },
          { input: '[1,2,3]\n[3,2,1]', expectedOutput: '[1,2,null,3]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static int preIdx = 0;
    static Map<Integer, Integer> postMap = new HashMap<>();
    public static TreeNode constructFromPrePost(int[] preorder, int[] postorder) {
        preIdx = 0;
        postMap.clear();
        for (int i = 0; i < postorder.length; i++) {
            postMap.put(postorder[i], i);
        }
        return build(preorder, 0, postorder.length - 1);
    }
    private static TreeNode build(int[] preorder, int left, int right) {
        if (left > right || preIdx >= preorder.length) return null;
        TreeNode node = new TreeNode(preorder[preIdx++]);
        if (left == right || preIdx >= preorder.length) return node;
        int nextVal = preorder[preIdx];
        int postIdx = postMap.get(nextVal);
        node.left = build(preorder, left, postIdx);
        node.right = build(preorder, postIdx + 1, right - 1);
        return node;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String pre = sc.nextLine().trim();
        String post = sc.nextLine().trim();
        sc.close();
        int[] preorder = parseArray(pre);
        int[] postorder = parseArray(post);
        TreeNode root = constructFromPrePost(preorder, postorder);
        System.out.println(serialize(root));
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
        topicId: 'day-70-tree-construction',
        title: 'Serialize and Deserialize Binary Tree',
        description: 'Design an algorithm to serialize and deserialize a binary tree. Serialization is converting a tree to a string representation, and deserialization is converting back.',
        difficulty: 'Hard',
        examples: [{ input: '[1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]' }],
        testCases: [
          { input: '[1,2,3,null,null,4,5]', expectedOutput: '[1,2,3,null,null,4,5]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[1,2]', expectedOutput: '[1,2]', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5]', expectedOutput: '[1,2,3,4,5]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static String serialize(TreeNode root) {
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
    public static TreeNode deserialize(String data) {
        data = data.replace("[", "").replace("]", "");
        if (data.isEmpty()) return null;
        String[] parts = data.split(",");
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
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = deserialize(input);
        System.out.println(serialize(root));
    }
}`
      }),
      createQuestion({
        topicId: 'day-70-tree-construction',
        title: 'Flatten Binary Tree to Linked List',
        description: 'Given the root of a binary tree, flatten the tree into a "linked list" using the right pointers. The "linked list" should follow preorder traversal.',
        difficulty: 'Medium',
        examples: [{ input: '[1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]' }],
        testCases: [
          { input: '[1,2,5,3,4,null,6]', expectedOutput: '[1,null,2,null,3,null,4,null,5,null,6]', isHidden: false, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[0]', expectedOutput: '[0]', isHidden: false, points: 20 },
          { input: '[1,2,3]', expectedOutput: '[1,null,2,null,3]', isHidden: true, points: 20 },
          { input: '[1,2,null,3]', expectedOutput: '[1,null,2,null,3]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static void flatten(TreeNode root) {
        if (root == null) return;
        TreeNode current = root;
        while (current != null) {
            if (current.left != null) {
                TreeNode rightmost = current.left;
                while (rightmost.right != null) {
                    rightmost = rightmost.right;
                }
                rightmost.right = current.right;
                current.right = current.left;
                current.left = null;
            }
            current = current.right;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        flatten(root);
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
      // Day 71: BST Basics
      createQuestion({
        topicId: 'day-71-bst-basics',
        title: 'Search in a Binary Search Tree',
        description: 'You are given the root of a binary search tree (BST) and an integer val. Find the node in the BST whose value equals val and return the subtree rooted at that node.',
        difficulty: 'Easy',
        examples: [{ input: '[4,2,7,1,3]\n2', output: '[2,1,3]' }],
        testCases: [
          { input: '[4,2,7,1,3]\n2', expectedOutput: '[2,1,3]', isHidden: false, points: 20 },
          { input: '[4,2,7,1,3]\n5', expectedOutput: '[]', isHidden: false, points: 20 },
          { input: '[1]\n1', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[5,3,6,2,4,null,7]\n4', expectedOutput: '[4]', isHidden: true, points: 20 },
          { input: '[10,5,15,3,7,13,18,1,null,6]\n7', expectedOutput: '[7,6]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) return root;
        return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int val = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        TreeNode result = searchBST(root, val);
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
      createQuestion({
        topicId: 'day-71-bst-basics',
        title: 'Insert into a Binary Search Tree',
        description: 'You are given the root of a binary search tree (BST) and an integer val. Insert the value into the BST and return the root of the tree.',
        difficulty: 'Medium',
        examples: [{ input: '[4,2,7,1,3]\n5', output: '[4,2,7,1,3,5]' }],
        testCases: [
          { input: '[4,2,7,1,3]\n5', expectedOutput: '[4,2,7,1,3,5]', isHidden: false, points: 20 },
          { input: '[40,20,60,10,30,50,70]\n25', expectedOutput: '[40,20,60,10,30,50,70,null,null,25]', isHidden: false, points: 20 },
          { input: '[]\n5', expectedOutput: '[5]', isHidden: true, points: 20 },
          { input: '[5]\n3', expectedOutput: '[5,3]', isHidden: true, points: 20 },
          { input: '[5]\n7', expectedOutput: '[5,null,7]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) {
            root.left = insertIntoBST(root.left, val);
        } else {
            root.right = insertIntoBST(root.right, val);
        }
        return root;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int val = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        root = insertIntoBST(root, val);
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
        topicId: 'day-71-bst-basics',
        title: 'Delete Node in a BST',
        description: 'Given a root node of a binary search tree and a key, delete the node with the given key in the BST. Return the root node reference.',
        difficulty: 'Medium',
        examples: [{ input: '[5,3,6,2,4,null,7]\n3', output: '[5,4,6,2,null,null,7]' }],
        testCases: [
          { input: '[5,3,6,2,4,null,7]\n3', expectedOutput: '[5,4,6,2,null,null,7]', isHidden: false, points: 20 },
          { input: '[5,3,6,2,4,null,7]\n0', expectedOutput: '[5,3,6,2,4,null,7]', isHidden: false, points: 20 },
          { input: '[]\n0', expectedOutput: '[]', isHidden: true, points: 20 },
          { input: '[5]\n5', expectedOutput: '[]', isHidden: true, points: 20 },
          { input: '[5,3,6,2,4,null,7]\n5', expectedOutput: '[6,3,7,2,4]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;
        if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TreeNode minNode = findMin(root.right);
            root.val = minNode.val;
            root.right = deleteNode(root.right, minNode.val);
        }
        return root;
    }
    private static TreeNode findMin(TreeNode node) {
        while (node.left != null) node = node.left;
        return node;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int key = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        root = deleteNode(root, key);
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
        topicId: 'day-71-bst-basics',
        title: 'Validate Binary Search Tree',
        description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
        difficulty: 'Medium',
        examples: [{ input: '[2,1,3]', output: 'true' }],
        testCases: [
          { input: '[2,1,3]', expectedOutput: 'true', isHidden: false, points: 20 },
          { input: '[5,1,4,null,null,3,6]', expectedOutput: 'false', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: 'true', isHidden: true, points: 20 },
          { input: '[5,4,6,null,null,3,7]', expectedOutput: 'false', isHidden: true, points: 20 },
          { input: '[120,70,140,50,100,130,160,20,55,75,110,119,135,150,200]', expectedOutput: 'false', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    private static boolean validate(TreeNode node, Integer min, Integer max) {
        if (node == null) return true;
        if ((min != null && node.val <= min) || (max != null && node.val >= max)) {
            return false;
        }
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(isValidBST(root));
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
        topicId: 'day-71-bst-basics',
        title: 'Convert Sorted Array to Binary Search Tree',
        description: 'Given an integer array nums sorted in ascending order, convert it to a height-balanced binary search tree.',
        difficulty: 'Easy',
        examples: [{ input: '[-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]' }],
        testCases: [
          { input: '[-10,-3,0,5,9]', expectedOutput: '[0,-3,9,-10,null,5]', isHidden: false, points: 20 },
          { input: '[1,3]', expectedOutput: '[3,1]', isHidden: false, points: 20 },
          { input: '[1]', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[1,2,3,4,5,6,7]', expectedOutput: '[4,2,6,1,3,5,7]', isHidden: true, points: 20 },
          { input: '[]', expectedOutput: '[]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length - 1);
    }
    private static TreeNode build(int[] nums, int left, int right) {
        if (left > right) return null;
        int mid = left + (right - left) / 2;
        TreeNode node = new TreeNode(nums[mid]);
        node.left = build(nums, left, mid - 1);
        node.right = build(nums, mid + 1, right);
        return node;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        int[] nums = parseArray(input);
        TreeNode root = sortedArrayToBST(nums);
        System.out.println(serialize(root));
    }
    private static int[] parseArray(String s) {
        s = s.replace("[", "").replace("]", "");
        if (s.isEmpty()) return new int[0];
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
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
      // Day 72: BST Operations
      createQuestion({
        topicId: 'day-72-bst-operations',
        title: 'Lowest Common Ancestor of a Binary Search Tree',
        description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.',
        difficulty: 'Easy',
        examples: [{ input: '[6,2,8,0,4,7,9,null,null,3,5]\n2\n8', output: '6' }],
        testCases: [
          { input: '[6,2,8,0,4,7,9,null,null,3,5]\n2\n8', expectedOutput: '6', isHidden: false, points: 20 },
          { input: '[6,2,8,0,4,7,9,null,null,3,5]\n2\n4', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[2,1]\n2\n1', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[5,3,6,2,4,null,null,1]\n1\n4', expectedOutput: '3', isHidden: true, points: 20 },
          { input: '[10,5,15,3,7,13,18]\n3\n7', expectedOutput: '5', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {
        if (p > q) { int temp = p; p = q; q = temp; }
        while (root != null) {
            if (root.val > q) root = root.left;
            else if (root.val < p) root = root.right;
            else return root;
        }
        return null;
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
        topicId: 'day-72-bst-operations',
        title: 'Inorder Successor in BST',
        description: 'Given the root of a binary search tree and a node p, return the in-order successor of that node. The successor is the node with the smallest key greater than p.val.',
        difficulty: 'Medium',
        examples: [{ input: '[2,1,3]\n1', output: '2' }],
        testCases: [
          { input: '[2,1,3]\n1', expectedOutput: '2', isHidden: false, points: 20 },
          { input: '[5,3,6,2,4,null,null,1]\n6', expectedOutput: 'null', isHidden: false, points: 20 },
          { input: '[5,3,6,2,4,null,null,1]\n1', expectedOutput: '2', isHidden: true, points: 20 },
          { input: '[5,3,6,2,4,null,null,1]\n4', expectedOutput: '5', isHidden: true, points: 20 },
          { input: '[10,5,15,3,7,13,18]\n7', expectedOutput: '10', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode inorderSuccessor(TreeNode root, int p) {
        TreeNode successor = null;
        while (root != null) {
            if (p < root.val) {
                successor = root;
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return successor;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int p = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        TreeNode result = inorderSuccessor(root, p);
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
        topicId: 'day-72-bst-operations',
        title: 'Binary Search Tree Iterator',
        description: 'Implement the BSTIterator class with two functions: next() returns the next smallest number, and hasNext() returns whether we have a next smallest number.',
        difficulty: 'Medium',
        examples: [{ input: '[7,3,15,null,null,9,20]\n7', output: '[3,7,9,15,20]' }],
        testCases: [
          { input: '[7,3,15,null,null,9,20]\n7', expectedOutput: '[3,7,9,15,20]', isHidden: false, points: 20 },
          { input: '[1]\n1', expectedOutput: '[1]', isHidden: false, points: 20 },
          { input: '[5,3,7,2,4,6,8]\n7', expectedOutput: '[2,3,4,5,6,7,8]', isHidden: true, points: 20 },
          { input: '[10,5,15,null,7]\n4', expectedOutput: '[5,7,10,15]', isHidden: true, points: 20 },
          { input: '[2,1,3]\n3', expectedOutput: '[1,2,3]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    static class BSTIterator {
        Stack<TreeNode> stack = new Stack<>();
        public BSTIterator(TreeNode root) {
            pushLeft(root);
        }
        public int next() {
            TreeNode node = stack.pop();
            pushLeft(node.right);
            return node.val;
        }
        public boolean hasNext() {
            return !stack.isEmpty();
        }
        private void pushLeft(TreeNode node) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int calls = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        BSTIterator iterator = new BSTIterator(root);
        List<Integer> result = new ArrayList<>();
        while (iterator.hasNext() && result.size() < calls) {
            result.add(iterator.next());
        }
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
        topicId: 'day-72-bst-operations',
        title: 'Closest Binary Search Tree Value',
        description: 'Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target.',
        difficulty: 'Easy',
        examples: [{ input: '[4,2,5,1,3]\n3.714286', output: '4' }],
        testCases: [
          { input: '[4,2,5,1,3]\n3.714286', expectedOutput: '4', isHidden: false, points: 20 },
          { input: '[1]\n4.428571', expectedOutput: '1', isHidden: false, points: 20 },
          { input: '[10,5,15,3,7,13,18,1,null,6]\n6.5', expectedOutput: '6', isHidden: true, points: 20 },
          { input: '[10,5,15,3,7,13,18,1,null,6]\n7.1', expectedOutput: '7', isHidden: true, points: 20 },
          { input: '[2,1,3]\n1.5', expectedOutput: '1', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static int closestValue(TreeNode root, double target) {
        int closest = root.val;
        while (root != null) {
            if (Math.abs(root.val - target) < Math.abs(closest - target)) {
                closest = root.val;
            }
            root = target < root.val ? root.left : root.right;
        }
        return closest;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        double target = Double.parseDouble(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        System.out.println(closestValue(root, target));
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
        topicId: 'day-72-bst-operations',
        title: 'Trim a Binary Search Tree',
        description: 'Given the root of a binary search tree and two integers low and high, trim the tree so that all its elements lie in [low, high].',
        difficulty: 'Medium',
        examples: [{ input: '[1,0,2]\n1\n2', output: '[1,null,2]' }],
        testCases: [
          { input: '[1,0,2]\n1\n2', expectedOutput: '[1,null,2]', isHidden: false, points: 20 },
          { input: '[3,0,4,null,2,null,null,1]\n1\n3', expectedOutput: '[3,2,null,1]', isHidden: false, points: 20 },
          { input: '[1]\n1\n2', expectedOutput: '[1]', isHidden: true, points: 20 },
          { input: '[3,1,4,null,2]\n1\n3', expectedOutput: '[3,1,null,2]', isHidden: true, points: 20 },
          { input: '[10,5,15,3,7,null,18]\n7\n15', expectedOutput: '[10,7,15]', isHidden: true, points: 20 }
        ],
        solution: `import java.util.*;
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public class Solution {
    public static TreeNode trimBST(TreeNode root, int low, int high) {
        if (root == null) return null;
        if (root.val < low) return trimBST(root.right, low, high);
        if (root.val > high) return trimBST(root.left, low, high);
        root.left = trimBST(root.left, low, high);
        root.right = trimBST(root.right, low, high);
        return root;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int low = Integer.parseInt(sc.nextLine().trim());
        int high = Integer.parseInt(sc.nextLine().trim());
        sc.close();
        TreeNode root = buildTree(input);
        root = trimBST(root, low, high);
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

    console.log(`\n🎉 Days 70-72 complete! Created ${created}/15 questions\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays70to72();
