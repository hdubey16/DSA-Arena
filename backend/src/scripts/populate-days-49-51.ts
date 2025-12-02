import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function populateDays49to51() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // ==================== DAY 49 - String Practice Problems ====================
    const day49Topic = await Topic.findOneAndUpdate(
      { id: 'day-49' },
      {
        id: 'day-49',
        title: 'String Practice Problems',
        description: 'Consolidating string algorithms and tricky edge cases.',
        week: 7,
        day: 49,
        difficulty: 'Hard',
        estimatedTime: 180,
        prerequisites: ['day-48'],
        compulsoryQuestion: 'Text Justification',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day49Topic.title}`);
    await Question.deleteMany({ topicId: 'day-49' });

    await Question.insertMany([
      {
        topicId: 'day-49',
        title: 'Text Justification',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: true,
        points: 40,
        timeLimit: 45,
        description: 'Format text with exactly maxWidth characters per line, fully justified.',
        starterCode: 'import java.util.*;\npublic class Solution {\n    public static List<String> fullJustify(String[] words, int maxWidth) { return new ArrayList<>(); }\n}',
        solution: 'import java.util.*;\npublic class Solution {\n    public static List<String> fullJustify(String[] words, int maxWidth) {\n        List<String> result = new ArrayList<>();\n        int i = 0;\n        while (i < words.length) {\n            int lineLen = words[i].length();\n            int j = i + 1;\n            while (j < words.length && lineLen + 1 + words[j].length() <= maxWidth) {\n                lineLen += 1 + words[j].length();\n                j++;\n            }\n            StringBuilder line = new StringBuilder();\n            int numWords = j - i;\n            if (j == words.length || numWords == 1) {\n                for (int k = i; k < j; k++) {\n                    line.append(words[k]);\n                    if (k < j - 1) line.append(" ");\n                }\n                while (line.length() < maxWidth) line.append(" ");\n            } else {\n                int totalSpaces = maxWidth - lineLen + (numWords - 1);\n                int spacesBetween = totalSpaces / (numWords - 1);\n                int extraSpaces = totalSpaces % (numWords - 1);\n                for (int k = i; k < j; k++) {\n                    line.append(words[k]);\n                    if (k < j - 1) {\n                        for (int s = 0; s < spacesBetween; s++) line.append(" ");\n                        if (k - i < extraSpaces) line.append(" ");\n                    }\n                }\n            }\n            result.add(line.toString());\n            i = j;\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'words = ["This","is","an","example"], maxWidth = 16', output: '["This    is    an","example         "]' }],
        testCases: [
          { input: '["This","is","an","example"]\n16', expectedOutput: '["This    is    an","example         "]', isHidden: false, points: 20 }
        ],
        hints: ['Pack words greedily', 'Distribute spaces evenly', 'Last line is left-justified'],
        tags: ['Array', 'String', 'Simulation']
      },
      {
        topicId: 'day-49',
        title: 'Zigzag Conversion',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Convert string to zigzag pattern on given number of rows.',
        starterCode: 'public class Solution {\n    public static String convert(String s, int numRows) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String convert(String s, int numRows) {\n        if (numRows == 1) return s;\n        StringBuilder[] rows = new StringBuilder[Math.min(numRows, s.length())];\n        for (int i = 0; i < rows.length; i++) rows[i] = new StringBuilder();\n        int currRow = 0;\n        boolean goingDown = false;\n        for (char c : s.toCharArray()) {\n            rows[currRow].append(c);\n            if (currRow == 0 || currRow == numRows - 1) goingDown = !goingDown;\n            currRow += goingDown ? 1 : -1;\n        }\n        StringBuilder result = new StringBuilder();\n        for (StringBuilder row : rows) result.append(row);\n        return result.toString();\n    }\n}',
        examples: [{ input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"' }],
        testCases: [
          { input: 'PAYPALISHIRING\n3', expectedOutput: 'PAHNAPLSIIGYIR', isHidden: false, points: 12 }
        ],
        hints: ['Create array of StringBuilders', 'Toggle direction at boundaries', 'Concatenate all rows'],
        tags: ['String']
      },
      {
        topicId: 'day-49',
        title: 'Compare Version Numbers',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Compare two version numbers. Return -1, 0, or 1.',
        starterCode: 'public class Solution {\n    public static int compareVersion(String version1, String version2) { return 0; }\n}',
        solution: 'public class Solution {\n    public static int compareVersion(String version1, String version2) {\n        String[] v1 = version1.split("\\\\.");\n        String[] v2 = version2.split("\\\\.");\n        int maxLen = Math.max(v1.length, v2.length);\n        for (int i = 0; i < maxLen; i++) {\n            int num1 = i < v1.length ? Integer.parseInt(v1[i]) : 0;\n            int num2 = i < v2.length ? Integer.parseInt(v2[i]) : 0;\n            if (num1 < num2) return -1;\n            if (num1 > num2) return 1;\n        }\n        return 0;\n    }\n}',
        examples: [{ input: 'version1 = "1.01", version2 = "1.001"', output: '0' }],
        testCases: [
          { input: '1.01\n1.001', expectedOutput: '0', isHidden: false, points: 10 }
        ],
        hints: ['Split by dot', 'Compare as integers', 'Handle different lengths'],
        tags: ['String', 'Two Pointers']
      },
      {
        topicId: 'day-49',
        title: 'Multiply Strings',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Multiply two non-negative integers represented as strings.',
        starterCode: 'public class Solution {\n    public static String multiply(String num1, String num2) { return ""; }\n}',
        solution: 'public class Solution {\n    public static String multiply(String num1, String num2) {\n        if (num1.equals("0") || num2.equals("0")) return "0";\n        int[] result = new int[num1.length() + num2.length()];\n        for (int i = num1.length() - 1; i >= 0; i--) {\n            for (int j = num2.length() - 1; j >= 0; j--) {\n                int mul = (num1.charAt(i) - \'0\') * (num2.charAt(j) - \'0\');\n                int sum = mul + result[i + j + 1];\n                result[i + j + 1] = sum % 10;\n                result[i + j] += sum / 10;\n            }\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int num : result) {\n            if (!(sb.length() == 0 && num == 0)) sb.append(num);\n        }\n        return sb.toString();\n    }\n}',
        examples: [{ input: 'num1 = "123", num2 = "456"', output: '"56088"' }],
        testCases: [
          { input: '123\n456', expectedOutput: '56088', isHidden: false, points: 12 }
        ],
        hints: ['Use array for result', 'Position i+j and i+j+1', 'Handle carries'],
        tags: ['Math', 'String', 'Simulation']
      },
      {
        topicId: 'day-49',
        title: 'Valid Number',
        difficulty: 'Hard',
        type: 'practice',
        isCompulsory: false,
        points: 35,
        timeLimit: 40,
        description: 'Check if string is a valid number (decimal, integer, scientific notation).',
        starterCode: 'public class Solution {\n    public static boolean isNumber(String s) { return false; }\n}',
        solution: 'public class Solution {\n    public static boolean isNumber(String s) {\n        boolean seenDigit = false, seenExponent = false, seenDot = false;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (Character.isDigit(c)) {\n                seenDigit = true;\n            } else if (c == \'+\' || c == \'-\') {\n                if (i > 0 && s.charAt(i - 1) != \'e\' && s.charAt(i - 1) != \'E\') return false;\n            } else if (c == \'e\' || c == \'E\') {\n                if (seenExponent || !seenDigit) return false;\n                seenExponent = true;\n                seenDigit = false;\n            } else if (c == \'.\') {\n                if (seenDot || seenExponent) return false;\n                seenDot = true;\n            } else {\n                return false;\n            }\n        }\n        return seenDigit;\n    }\n}',
        examples: [{ input: 's = "0"', output: 'true' }],
        testCases: [
          { input: '0', expectedOutput: 'true', isHidden: false, points: 18 }
        ],
        hints: ['Track seen digits, dot, exponent', 'Sign only at start or after e', 'Must have digit'],
        tags: ['String']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 50 - Singly Linked List Operations ====================
    const day50Topic = await Topic.findOneAndUpdate(
      { id: 'day-50' },
      {
        id: 'day-50',
        title: 'Singly Linked List Operations',
        description: 'Basic node manipulation with head and next pointers.',
        week: 8,
        day: 50,
        difficulty: 'Easy',
        estimatedTime: 120,
        prerequisites: ['day-49'],
        compulsoryQuestion: 'Design Linked List',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day50Topic.title}`);
    await Question.deleteMany({ topicId: 'day-50' });

    await Question.insertMany([
      {
        topicId: 'day-50',
        title: 'Design Linked List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: true,
        points: 30,
        timeLimit: 35,
        description: 'Design your implementation of the linked list with get, addAtHead, addAtTail, addAtIndex, deleteAtIndex.',
        starterCode: 'class MyLinkedList {\n    public MyLinkedList() {}\n    public int get(int index) { return -1; }\n    public void addAtHead(int val) {}\n    public void addAtTail(int val) {}\n    public void addAtIndex(int index, int val) {}\n    public void deleteAtIndex(int index) {}\n}',
        solution: 'class MyLinkedList {\n    class Node {\n        int val;\n        Node next;\n        Node(int val) { this.val = val; }\n    }\n    private Node head;\n    private int size;\n    public MyLinkedList() {\n        head = null;\n        size = 0;\n    }\n    public int get(int index) {\n        if (index < 0 || index >= size) return -1;\n        Node curr = head;\n        for (int i = 0; i < index; i++) curr = curr.next;\n        return curr.val;\n    }\n    public void addAtHead(int val) {\n        Node newNode = new Node(val);\n        newNode.next = head;\n        head = newNode;\n        size++;\n    }\n    public void addAtTail(int val) {\n        Node newNode = new Node(val);\n        if (head == null) {\n            head = newNode;\n        } else {\n            Node curr = head;\n            while (curr.next != null) curr = curr.next;\n            curr.next = newNode;\n        }\n        size++;\n    }\n    public void addAtIndex(int index, int val) {\n        if (index > size) return;\n        if (index <= 0) { addAtHead(val); return; }\n        Node newNode = new Node(val);\n        Node curr = head;\n        for (int i = 0; i < index - 1; i++) curr = curr.next;\n        newNode.next = curr.next;\n        curr.next = newNode;\n        size++;\n    }\n    public void deleteAtIndex(int index) {\n        if (index < 0 || index >= size) return;\n        if (index == 0) {\n            head = head.next;\n        } else {\n            Node curr = head;\n            for (int i = 0; i < index - 1; i++) curr = curr.next;\n            curr.next = curr.next.next;\n        }\n        size--;\n    }\n}',
        examples: [{ input: '["addAtHead",1],["addAtTail",3],["get",1]', output: '[null,null,3]' }],
        testCases: [
          { input: '["addAtHead",1],["get",0]', expectedOutput: '[null,1]', isHidden: false, points: 15 }
        ],
        hints: ['Track head and size', 'Handle edge cases', 'Use dummy node or careful pointer manipulation'],
        tags: ['Linked List', 'Design']
      },
      {
        topicId: 'day-50',
        title: 'Convert Binary Number in a Linked List to Integer',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Convert binary number represented as linked list to decimal integer.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static int getDecimalValue(ListNode head) { return 0; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static int getDecimalValue(ListNode head) {\n        int result = 0;\n        while (head != null) {\n            result = result * 2 + head.val;\n            head = head.next;\n        }\n        return result;\n    }\n}',
        examples: [{ input: 'head = [1,0,1]', output: '5' }],
        testCases: [
          { input: '[1,0,1]', expectedOutput: '5', isHidden: false, points: 8 }
        ],
        hints: ['Shift left and add', 'result = result * 2 + digit'],
        tags: ['Linked List', 'Math']
      },
      {
        topicId: 'day-50',
        title: 'Remove Linked List Elements',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Remove all nodes with given value from linked list.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode removeElements(ListNode head, int val) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode removeElements(ListNode head, int val) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode curr = dummy;\n        while (curr.next != null) {\n            if (curr.next.val == val) {\n                curr.next = curr.next.next;\n            } else {\n                curr = curr.next;\n            }\n        }\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [1,2,6,3,4,5,6], val = 6', output: '[1,2,3,4,5]' }],
        testCases: [
          { input: '[1,2,6,3,4,5,6]\n6', expectedOutput: '[1,2,3,4,5]', isHidden: false, points: 8 }
        ],
        hints: ['Use dummy node', 'Skip nodes with target value'],
        tags: ['Linked List']
      },
      {
        topicId: 'day-50',
        title: 'Merge Two Sorted Lists',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Merge two sorted linked lists into one sorted list.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) {\n                curr.next = list1;\n                list1 = list1.next;\n            } else {\n                curr.next = list2;\n                list2 = list2.next;\n            }\n            curr = curr.next;\n        }\n        curr.next = list1 != null ? list1 : list2;\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' }],
        testCases: [
          { input: '[1,2,4]\n[1,3,4]', expectedOutput: '[1,1,2,3,4,4]', isHidden: false, points: 10 }
        ],
        hints: ['Use dummy node', 'Compare and attach smaller', 'Attach remaining'],
        tags: ['Linked List', 'Recursion']
      },
      {
        topicId: 'day-50',
        title: 'Remove Duplicates from Sorted List',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 15,
        timeLimit: 20,
        description: 'Delete duplicates from sorted linked list so each element appears once.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode deleteDuplicates(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode deleteDuplicates(ListNode head) {\n        ListNode curr = head;\n        while (curr != null && curr.next != null) {\n            if (curr.val == curr.next.val) {\n                curr.next = curr.next.next;\n            } else {\n                curr = curr.next;\n            }\n        }\n        return head;\n    }\n}',
        examples: [{ input: 'head = [1,1,2]', output: '[1,2]' }],
        testCases: [
          { input: '[1,1,2]', expectedOutput: '[1,2]', isHidden: false, points: 8 }
        ],
        hints: ['Compare curr with curr.next', 'Skip duplicates', 'No dummy needed'],
        tags: ['Linked List']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    // ==================== DAY 51 - Delete Node & Find Middle ====================
    const day51Topic = await Topic.findOneAndUpdate(
      { id: 'day-51' },
      {
        id: 'day-51',
        title: 'Delete Node & Find Middle',
        description: 'Fast & Slow Pointers technique (Tortoise and Hare).',
        week: 8,
        day: 51,
        difficulty: 'Medium',
        estimatedTime: 120,
        prerequisites: ['day-50'],
        compulsoryQuestion: 'Middle of the Linked List',
        practiceQuestions: 5,
        isLocked: false
      },
      { upsert: true, new: true }
    );
    console.log(`✅ ${day51Topic.title}`);
    await Question.deleteMany({ topicId: 'day-51' });

    await Question.insertMany([
      {
        topicId: 'day-51',
        title: 'Delete Node in a Linked List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Delete given node (not tail) from linked list. You only have access to that node.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static void deleteNode(ListNode node) {}\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static void deleteNode(ListNode node) {\n        node.val = node.next.val;\n        node.next = node.next.next;\n    }\n}',
        examples: [{ input: 'head = [4,5,1,9], node = 5', output: '[4,1,9]' }],
        testCases: [
          { input: '[4,5,1,9]\n5', expectedOutput: '[4,1,9]', isHidden: false, points: 10 }
        ],
        hints: ['Copy next value to current', 'Skip next node'],
        tags: ['Linked List']
      },
      {
        topicId: 'day-51',
        title: 'Middle of the Linked List',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: true,
        points: 15,
        timeLimit: 20,
        description: 'Find middle node using slow and fast pointers. Return second middle if two exist.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode middleNode(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode middleNode(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        return slow;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5]', output: '[3,4,5]' }],
        testCases: [
          { input: '[1,2,3,4,5]', expectedOutput: '[3,4,5]', isHidden: false, points: 8 }
        ],
        hints: ['Slow moves 1 step', 'Fast moves 2 steps', 'When fast reaches end, slow at middle'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-51',
        title: 'Palindrome Linked List',
        difficulty: 'Easy',
        type: 'practice',
        isCompulsory: false,
        points: 25,
        timeLimit: 30,
        description: 'Check if linked list is palindrome in O(n) time and O(1) space.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static boolean isPalindrome(ListNode head) { return false; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static boolean isPalindrome(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        ListNode reversed = reverse(slow);\n        while (reversed != null) {\n            if (head.val != reversed.val) return false;\n            head = head.next;\n            reversed = reversed.next;\n        }\n        return true;\n    }\n    private static ListNode reverse(ListNode head) {\n        ListNode prev = null;\n        while (head != null) {\n            ListNode next = head.next;\n            head.next = prev;\n            prev = head;\n            head = next;\n        }\n        return prev;\n    }\n}',
        examples: [{ input: 'head = [1,2,2,1]', output: 'true' }],
        testCases: [
          { input: '[1,2,2,1]', expectedOutput: 'true', isHidden: false, points: 12 }
        ],
        hints: ['Find middle', 'Reverse second half', 'Compare both halves'],
        tags: ['Linked List', 'Two Pointers', 'Stack']
      },
      {
        topicId: 'day-51',
        title: 'Remove Nth Node From End of List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Remove nth node from end of list in one pass.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode removeNthFromEnd(ListNode head, int n) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode first = dummy, second = dummy;\n        for (int i = 0; i <= n; i++) {\n            first = first.next;\n        }\n        while (first != null) {\n            first = first.next;\n            second = second.next;\n        }\n        second.next = second.next.next;\n        return dummy.next;\n    }\n}',
        examples: [{ input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' }],
        testCases: [
          { input: '[1,2,3,4,5]\n2', expectedOutput: '[1,2,3,5]', isHidden: false, points: 10 }
        ],
        hints: ['Two pointers n apart', 'Move both until first reaches end', 'Delete second.next'],
        tags: ['Linked List', 'Two Pointers']
      },
      {
        topicId: 'day-51',
        title: 'Delete the Middle Node of a Linked List',
        difficulty: 'Medium',
        type: 'practice',
        isCompulsory: false,
        points: 20,
        timeLimit: 25,
        description: 'Delete middle node and return head.',
        starterCode: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode deleteMiddle(ListNode head) { return null; }\n}',
        solution: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public static ListNode deleteMiddle(ListNode head) {\n        if (head == null || head.next == null) return null;\n        ListNode slow = head, fast = head, prev = null;\n        while (fast != null && fast.next != null) {\n            prev = slow;\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        prev.next = slow.next;\n        return head;\n    }\n}',
        examples: [{ input: 'head = [1,3,4,7,1,2,6]', output: '[1,3,4,1,2,6]' }],
        testCases: [
          { input: '[1,3,4,7,1,2,6]', expectedOutput: '[1,3,4,1,2,6]', isHidden: false, points: 10 }
        ],
        hints: ['Use slow/fast pointers', 'Track previous node', 'Delete slow node'],
        tags: ['Linked List', 'Two Pointers']
      }
    ]);
    console.log('  ✅ 5 questions added\n');

    console.log(`\n🎉 Days 49-51 populated successfully! (15 questions)`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateDays49to51();
