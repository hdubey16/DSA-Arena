import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays52to54() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 52 - Reverse Linked List ====================
    const day52Topic = await Topic.findOneAndUpdate(
      { id: 'day-52' },
      {
        id: 'day-52',
        title: 'Reverse Linked List',
        description: 'Pointer manipulation for reversal.',
        week: 8,
        day: 52,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-51'],
        compulsoryQuestion: 'Reverse Linked List',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day52Topic.title}`);
    await Question.deleteMany({ topicId: 'day-52' });

    await Question.insertMany([
      {
        topicId: 'day-52',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: 'Reverse a singly linked list iteratively or recursively.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode reverseList(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        while (head != null) {\n            ListNode next = head.next;\n            head.next = prev;\n            prev = head;\n            head = next;\n        }\n        return prev;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
        testCases: [{ input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', isHidden: false, points: 8 }],
        hints: ['Track prev, curr, next', 'Reassign pointers', 'Return prev at end'],
        tags: ['Linked List', 'Recursion']
      },
      {
        topicId: 'day-52',
        title: 'Reverse Linked List II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Reverse nodes from position left to right.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode reverseBetween(ListNode head, int left, int right) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode reverseBetween(ListNode head, int left, int right) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode pre = dummy;\n        for (int i = 1; i < left; i++) pre = pre.next;\n        ListNode curr = pre.next;\n        for (int i = 0; i < right - left; i++) {\n            ListNode next = curr.next;\n            curr.next = next.next;\n            next.next = pre.next;\n            pre.next = next;\n        }\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5], left = 2, right = 4', output: '[1,4,3,2,5]' }],
        testCases: [{ input: '[1,2,3,4,5]\n2\n4', expectedOutput: '[1,4,3,2,5]', isHidden: false, points: 12 }],
        hints: ['Find node before left', 'Reverse by moving nodes to front', 'Use dummy node'],
        tags: ['Linked List']
      },
      {
        topicId: 'day-52',
        title: 'Reorder List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Reorder list: L0→Ln→L1→Ln-1→L2→Ln-2→...',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static void reorderList(ListNode head) {}\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static void reorderList(ListNode head) {\n        if (head == null || head.next == null) return;\n        ListNode slow = head, fast = head;\n        while (fast.next != null && fast.next.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        ListNode second = reverse(slow.next);\n        slow.next = null;\n        ListNode first = head;\n        while (second != null) {\n            ListNode tmp1 = first.next, tmp2 = second.next;\n            first.next = second;\n            second.next = tmp1;\n            first = tmp1;\n            second = tmp2;\n        }\n    }\n    private static ListNode reverse(ListNode head) {\n        ListNode prev = null;\n        while (head != null) {\n            ListNode next = head.next;\n            head.next = prev;\n            prev = head;\n            head = next;\n        }\n        return prev;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4]', output: '[1,4,2,3]' }],
        testCases: [{ input: '[1,2,3,4]', expectedOutput: '[1,4,2,3]', isHidden: false, points: 12 }],
        hints: ['Find middle', 'Reverse second half', 'Merge alternating'],
        tags: ['Linked List', 'Two Pointers', 'Stack']
      },
      {
        topicId: 'day-52',
        title: 'Rotate List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Rotate list to the right by k places.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode rotateRight(ListNode head, int k) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode rotateRight(ListNode head, int k) {\n        if (head == null || head.next == null || k == 0) return head;\n        int len = 1;\n        ListNode tail = head;\n        while (tail.next != null) {\n            len++;\n            tail = tail.next;\n        }\n        k = k % len;\n        if (k == 0) return head;\n        tail.next = head;\n        for (int i = 0; i < len - k; i++) tail = tail.next;\n        head = tail.next;\n        tail.next = null;\n        return head;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5], k = 2', output: '[4,5,1,2,3]' }],
        testCases: [{ input: '[1,2,3,4,5]\n2', expectedOutput: '[4,5,1,2,3]', isHidden: false, points: 10 }],
        hints: ['Find length', 'k = k % len', 'Make circular then break'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-52',
        title: 'Swap Nodes in Pairs',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Swap every two adjacent nodes without modifying values.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode swapPairs(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode swapPairs(ListNode head) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode prev = dummy;\n        while (prev.next != null && prev.next.next != null) {\n            ListNode first = prev.next;\n            ListNode second = prev.next.next;\n            first.next = second.next;\n            second.next = first;\n            prev.next = second;\n            prev = first;\n        }\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4]', output: '[2,1,4,3]' }],
        testCases: [{ input: '[1,2,3,4]', expectedOutput: '[2,1,4,3]', isHidden: false, points: 10 }],
        hints: ['Use dummy node', 'Swap pairs with pointer manipulation', 'Move prev by 2'],
        tags: ['Linked List', 'Recursion']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 53 - Loop Detection (Floyd's Cycle) ====================
    const day53Topic = await Topic.findOneAndUpdate(
      { id: 'day-53' },
      {
        id: 'day-53',
        title: 'Loop Detection (Floyd\'s Cycle)',
        description: 'Cycle detection and finding cycle entry point.',
        week: 8,
        day: 53,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-52'],
        compulsoryQuestion: 'Linked List Cycle',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day53Topic.title}`);
    await Question.deleteMany({ topicId: 'day-53' });

    await Question.insertMany([
      {
        topicId: 'day-53',
        title: 'Linked List Cycle',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: 'Determine if linked list has a cycle using Floyd\'s algorithm.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static boolean hasCycle(ListNode head) { return false; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static boolean hasCycle(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n}',
        examples: [{ input: 'head = [3,2,0,-4], pos = 1', output: 'true' }],
        testCases: [{ input: '[3,2,0,-4]\n1', expectedOutput: 'true', isHidden: false, points: 8 }],
        hints: ['Slow moves 1 step', 'Fast moves 2 steps', 'They meet if cycle exists'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-53',
        title: 'Linked List Cycle II',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Return node where cycle begins. Return null if no cycle.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode detectCycle(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode detectCycle(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) {\n                slow = head;\n                while (slow != fast) {\n                    slow = slow.next;\n                    fast = fast.next;\n                }\n                return slow;\n            }\n        }\n        return null;\n    }\n}',
        examples: [{ input: 'head = [3,2,0,-4], pos = 1', output: 'Node with value 2' }],
        testCases: [{ input: '[3,2,0,-4]\n1', expectedOutput: '2', isHidden: false, points: 12 }],
        hints: ['First detect cycle', 'Reset slow to head', 'Move both by 1 until meet'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-53',
        title: 'Intersection of Two Linked Lists',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Find node where two lists intersect. Return null if no intersection.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        ListNode a = headA, b = headB;\n        while (a != b) {\n            a = a == null ? headB : a.next;\n            b = b == null ? headA : b.next;\n        }\n        return a;\n    }\n}',
        examples: [{ input: 'listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]', output: 'Node with value 8' }],
        testCases: [{ input: '[4,1,8,4,5]\n[5,6,1,8,4,5]', expectedOutput: '8', isHidden: false, points: 10 }],
        hints: ['Two pointers technique', 'Switch heads when null', 'They meet at intersection or null'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-53',
        title: 'Happy Number',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Detect cycle in digit square sum sequence using Floyd\'s algorithm.',
        starterCode: 'public class Solution {\n    public static boolean isHappy(int n) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean isHappy(int n) {\n        int slow = n, fast = n;\n        do {\n            slow = sumOfSquares(slow);\n            fast = sumOfSquares(sumOfSquares(fast));\n        } while (slow != fast);\n        return slow == 1;\n    }\n    private static int sumOfSquares(int n) {\n        int sum = 0;\n        while (n > 0) {\n            int d = n % 10;\n            sum += d * d;\n            n /= 10;\n        }\n        return sum;\n    }\n}',
        examples: [{ input: 'n = 19', output: 'true' }],
        testCases: [{ input: '19', expectedOutput: 'true', isHidden: false, points: 8 }],
        hints: ['Use Floyd\'s cycle detection', 'If cycle leads to 1, happy', 'Apply to sequence'],
        tags: ['Hash Table', 'Math', 'Two Pointers']
      },
      {
        topicId: 'day-53',
        title: 'Find the Duplicate Number',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Find duplicate in array using O(1) space with Floyd\'s cycle detection.',
        starterCode: 'public class Solution {\n    public static int findDuplicate(int[] nums) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int findDuplicate(int[] nums) {\n        int slow = nums[0], fast = nums[0];\n        do {\n            slow = nums[slow];\n            fast = nums[nums[fast]];\n        } while (slow != fast);\n        slow = nums[0];\n        while (slow != fast) {\n            slow = nums[slow];\n            fast = nums[fast];\n        }\n        return slow;\n    }\n}',
        examples: [{ input: 'nums = [1,3,4,2,2]', output: '2' }],
        testCases: [{ input: '[1,3,4,2,2]', expectedOutput: '2', isHidden: false, points: 12 }],
        hints: ['Treat array as linked list', 'nums[i] is next pointer', 'Floyd\'s cycle detection'],
        tags: ['Array', 'Two Pointers', 'Binary Search']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 54 - Nth Node from End & Pairwise Swap ====================
    const day54Topic = await Topic.findOneAndUpdate(
      { id: 'day-54' },
      {
        id: 'day-54',
        title: 'Nth Node from End & List Manipulation',
        description: 'Two-pointer sliding window on lists.',
        week: 8,
        day: 54,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-53'],
        compulsoryQuestion: 'Swapping Nodes in a Linked List',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day54Topic.title}`);
    await Question.deleteMany({ topicId: 'day-54' });

    await Question.insertMany([
      {
        topicId: 'day-54',
        title: 'Remove Nth Node From End of List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Remove nth node from end in one pass.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode removeNthFromEnd(ListNode head, int n) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode first = dummy, second = dummy;\n        for (int i = 0; i <= n; i++) first = first.next;\n        while (first != null) {\n            first = first.next;\n            second = second.next;\n        }\n        second.next = second.next.next;\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' }],
        testCases: [{ input: '[1,2,3,4,5]\n2', expectedOutput: '[1,2,3,5]', isHidden: false, points: 10 }],
        hints: ['Two pointers n apart', 'Move together', 'Delete node at second'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-54',
        title: 'Swapping Nodes in a Linked List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 25,
        timeLimit: 30,
        description: 'Swap values of kth node from beginning and kth from end.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode swapNodes(ListNode head, int k) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode swapNodes(ListNode head, int k) {\n        ListNode first = head, second = head, curr = head;\n        for (int i = 1; i < k; i++) curr = curr.next;\n        first = curr;\n        while (curr.next != null) {\n            curr = curr.next;\n            second = second.next;\n        }\n        int temp = first.val;\n        first.val = second.val;\n        second.val = temp;\n        return head;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5], k = 2', output: '[1,4,3,2,5]' }],
        testCases: [{ input: '[1,2,3,4,5]\n2', expectedOutput: '[1,4,3,2,5]', isHidden: false, points: 12 }],
        hints: ['Find kth from start', 'Find kth from end using two pointers', 'Swap values'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-54',
        title: 'Odd Even Linked List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Group odd indices together followed by even indices.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode oddEvenList(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode oddEvenList(ListNode head) {\n        if (head == null) return null;\n        ListNode odd = head, even = head.next, evenHead = even;\n        while (even != null && even.next != null) {\n            odd.next = even.next;\n            odd = odd.next;\n            even.next = odd.next;\n            even = even.next;\n        }\n        odd.next = evenHead;\n        return head;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5]', output: '[1,3,5,2,4]' }],
        testCases: [{ input: '[1,2,3,4,5]', expectedOutput: '[1,3,5,2,4]', isHidden: false, points: 10 }],
        hints: ['Separate odd and even lists', 'Connect odd tail to even head'],
        tags: ['Linked List']
      },
      {
        topicId: 'day-54',
        title: 'Partition List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Partition list around x: nodes < x come before nodes >= x.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode partition(ListNode head, int x) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode partition(ListNode head, int x) {\n        ListNode lessHead = new ListNode(0), greaterHead = new ListNode(0);\n        ListNode less = lessHead, greater = greaterHead;\n        while (head != null) {\n            if (head.val < x) {\n                less.next = head;\n                less = less.next;\n            } else {\n                greater.next = head;\n                greater = greater.next;\n            }\n            head = head.next;\n        }\n        greater.next = null;\n        less.next = greaterHead.next;\n        return lessHead.next;\n    }\n}',
        examples: [{ input: 'head = [1,4,3,2,5,2], x = 3', output: '[1,2,2,4,3,5]' }],
        testCases: [{ input: '[1,4,3,2,5,2]\n3', expectedOutput: '[1,2,2,4,3,5]', isHidden: false, points: 10 }],
        hints: ['Two separate lists', 'Less and greater', 'Connect them'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-54',
        title: 'Split Linked List in Parts',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Split list into k consecutive parts with equal lengths.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode[] splitListToParts(ListNode head, int k) { return new ListNode[k]; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode[] splitListToParts(ListNode head, int k) {\n        int len = 0;\n        ListNode curr = head;\n        while (curr != null) {\n            len++;\n            curr = curr.next;\n        }\n        int size = len / k, extra = len % k;\n        ListNode[] result = new ListNode[k];\n        curr = head;\n        for (int i = 0; i < k; i++) {\n            result[i] = curr;\n            int partSize = size + (i < extra ? 1 : 0);\n            for (int j = 0; j < partSize - 1 && curr != null; j++) {\n                curr = curr.next;\n            }\n            if (curr != null) {\n                ListNode next = curr.next;\n                curr.next = null;\n                curr = next;\n            }\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'head = [1,2,3], k = 5', output: '[[1],[2],[3],[],[]]' }],
        testCases: [{ input: '[1,2,3]\n5', expectedOutput: '[[1],[2],[3],[],[]]', isHidden: false, points: 10 }],
        hints: ['Calculate base size and extra', 'Distribute extra to first parts'],
        tags: ['Linked List']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 52-54 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays52to54();
