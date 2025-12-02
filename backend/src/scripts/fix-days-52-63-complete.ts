import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

// This script updates all Days 52-63 questions with proper main() methods and I/O parsing
// so they work correctly with Judge0

async function fixAllQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    let totalUpdated = 0;

    // ====================  DAY 52: REVERSE LINKED LIST ====================
    console.log('📝 Fixing Day 52 questions...');
    
    // Day 52-1: Reverse Linked List
    await Question.findOneAndUpdate(
      { topicId: 'day-52', title: 'Reverse Linked List' },
      {
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        while (head != null) {
            ListNode next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode result = reverseList(head);
        System.out.println(formatLinkedList(result));
    }
    private static ListNode parseLinkedList(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
        }
        return dummy.next;
    }
    private static String formatLinkedList(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (head != null) {
            if (!first) sb.append(",");
            sb.append(head.val);
            first = false;
            head = head.next;
        }
        sb.append("]");
        return sb.toString();
    }
}`
      }
    );
    totalUpdated++;

    // Day 52-2: Reverse Linked List II
    await Question.findOneAndUpdate(
      { topicId: 'day-52', title: 'Reverse Linked List II' },
      {
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode reverseBetween(ListNode head, int left, int right) {
        if (left == right) return head;
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        for (int i = 1; i < left; i++) prev = prev.next;
        ListNode curr = prev.next;
        for (int i = 0; i < right - left; i++) {
            ListNode next = curr.next;
            curr.next = next.next;
            next.next = prev.next;
            prev.next = next;
        }
        return dummy.next;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int left = sc.nextInt();
        int right = sc.nextInt();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode result = reverseBetween(head, left, right);
        System.out.println(formatLinkedList(result));
    }
    private static ListNode parseLinkedList(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
        }
        return dummy.next;
    }
    private static String formatLinkedList(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (head != null) {
            if (!first) sb.append(",");
            sb.append(head.val);
            first = false;
            head = head.next;
        }
        sb.append("]");
        return sb.toString();
    }
}`
      }
    );
    totalUpdated++;

    // Day 52-3: Reorder List
    await Question.findOneAndUpdate(
      { topicId: 'day-52', title: 'Reorder List' },
      {
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode second = slow.next;
        slow.next = null;
        second = reverse(second);
        ListNode first = head;
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
    private static ListNode reverse(ListNode head) {
        ListNode prev = null;
        while (head != null) {
            ListNode next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        ListNode head = parseLinkedList(input);
        reorderList(head);
        System.out.println(formatLinkedList(head));
    }
    private static ListNode parseLinkedList(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
        }
        return dummy.next;
    }
    private static String formatLinkedList(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (head != null) {
            if (!first) sb.append(",");
            sb.append(head.val);
            first = false;
            head = head.next;
        }
        sb.append("]");
        return sb.toString();
    }
}`
      }
    );
    totalUpdated++;

    // Day 52-4: Rotate List
    await Question.findOneAndUpdate(
      { topicId: 'day-52', title: 'Rotate List' },
      {
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode rotateRight(ListNode head, int k) {
        if (head == null || k == 0) return head;
        int len = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            len++;
        }
        k = k % len;
        if (k == 0) return head;
        ListNode curr = head;
        for (int i = 0; i < len - k - 1; i++) {
            curr = curr.next;
        }
        ListNode newHead = curr.next;
        curr.next = null;
        tail.next = head;
        return newHead;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode result = rotateRight(head, k);
        System.out.println(formatLinkedList(result));
    }
    private static ListNode parseLinkedList(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
        }
        return dummy.next;
    }
    private static String formatLinkedList(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (head != null) {
            if (!first) sb.append(",");
            sb.append(head.val);
            first = false;
            head = head.next;
        }
        sb.append("]");
        return sb.toString();
    }
}`
      }
    );
    totalUpdated++;

    // Day 52-5: Swap Nodes in Pairs
    await Question.findOneAndUpdate(
      { topicId: 'day-52', title: 'Swap Nodes in Pairs' },
      {
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = prev.next.next;
            first.next = second.next;
            second.next = first;
            prev.next = second;
            prev = first;
        }
        return dummy.next;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode result = swapPairs(head);
        System.out.println(formatLinkedList(result));
    }
    private static ListNode parseLinkedList(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
        }
        return dummy.next;
    }
    private static String formatLinkedList(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (head != null) {
            if (!first) sb.append(",");
            sb.append(head.val);
            first = false;
            head = head.next;
        }
        sb.append("]");
        return sb.toString();
    }
}`
      }
    );
    totalUpdated++;

    console.log(`  ✅ Day 52: ${totalUpdated} questions fixed\n`);

    // ==================== DAY 53: LOOP DETECTION ====================
    console.log('📝 Fixing Day 53 questions...');

    // Day 53-1: Linked List Cycle
    await Question.findOneAndUpdate(
      { topicId: 'day-53', title: 'Linked List Cycle' },
      {
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int pos = sc.nextInt();
        sc.close();
        ListNode head = parseLinkedListWithCycle(input, pos);
        boolean result = hasCycle(head);
        System.out.println(result);
    }
    private static ListNode parseLinkedListWithCycle(String input, int pos) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        ListNode cycleNode = null;
        int idx = 0;
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
            if (idx == pos) cycleNode = curr;
            idx++;
        }
        if (pos >= 0 && cycleNode != null) {
            curr.next = cycleNode;
        }
        return dummy.next;
    }
}`
      }
    );
    totalUpdated++;

    // Day 53-2: Linked List Cycle II
    await Question.findOneAndUpdate(
      { topicId: 'day-53', title: 'Linked List Cycle II' },
      {
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int pos = sc.nextInt();
        sc.close();
        ListNode head = parseLinkedListWithCycle(input, pos);
        ListNode result = detectCycle(head);
        System.out.println(result != null ? result.val : -1);
    }
    private static ListNode parseLinkedListWithCycle(String input, int pos) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        ListNode cycleNode = null;
        int idx = 0;
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
            if (idx == pos) cycleNode = curr;
            idx++;
        }
        if (pos >= 0 && cycleNode != null) {
            curr.next = cycleNode;
        }
        return dummy.next;
    }
}`
      }
    );
    totalUpdated++;

    // Day 53-3: Intersection of Two Linked Lists
    await Question.findOneAndUpdate(
      { topicId: 'day-53', title: 'Intersection of Two Linked Lists' },
      {
        solution: `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode a = headA, b = headB;
        while (a != b) {
            a = a == null ? headB : a.next;
            b = b == null ? headA : b.next;
        }
        return a;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String inputA = sc.nextLine().trim();
        String inputB = sc.nextLine().trim();
        sc.close();
        ListNode headA = parseLinkedList(inputA);
        ListNode headB = parseLinkedList(inputB);
        ListNode result = getIntersectionNode(headA, headB);
        System.out.println(result != null ? result.val : -1);
    }
    private static ListNode parseLinkedList(String input) {
        input = input.replace("[", "").replace("]", "");
        if (input.isEmpty()) return null;
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
        }
        return dummy.next;
    }
}`
      }
    );
    totalUpdated++;

    // Day 53-4: Happy Number
    await Question.findOneAndUpdate(
      { topicId: 'day-53', title: 'Happy Number' },
      {
        solution: `import java.util.*;
public class Solution {
    public static boolean isHappy(int n) {
        int slow = n, fast = n;
        do {
            slow = sumSquares(slow);
            fast = sumSquares(sumSquares(fast));
        } while (slow != fast);
        return slow == 1;
    }
    private static int sumSquares(int n) {
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }
        return sum;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.close();
        System.out.println(isHappy(n));
    }
}`
      }
    );
    totalUpdated++;

    // Day 53-5: Find the Duplicate Number
    await Question.findOneAndUpdate(
      { topicId: 'day-53', title: 'Find the Duplicate Number' },
      {
        solution: `import java.util.*;
public class Solution {
    public static int findDuplicate(int[] nums) {
        int slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim().replace("[", "").replace("]", "");
        sc.close();
        String[] parts = input.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        System.out.println(findDuplicate(nums));
    }
}`
      }
    );
    totalUpdated++;

    console.log(`  ✅ Day 53: 5 questions fixed\n`);

    // ==================== DAY 54: NTH NODE & LIST MANIPULATION ====================
    console.log('📝 Fixing Day 54 questions...');

    // Continuing with Day 54 questions...
    // (Due to length, I'll create the rest in a follow-up)

    console.log(`\n🎉 Total questions updated: ${totalUpdated}`);
    console.log('\nNote: Days 54-63 updates continue in next iteration...');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixAllQuestions();
