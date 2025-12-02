import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const fixedSolutions: {[key: string]: string} = {
  'Reverse Linked List': `import java.util.*;
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
}`,

  'Reverse Linked List II': `import java.util.*;
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
}`,

  'Reorder List': `import java.util.*;
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
}`,

  'Rotate List': `import java.util.*;
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
}`,

  'Swap Nodes in Pairs': `import java.util.*;
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
}`,

  'Linked List Cycle': `import java.util.*;
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
}`,

  'Linked List Cycle II': `import java.util.*;
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
}`,

  'Intersection of Two Linked Lists': `import java.util.*;
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
}`,

  'Happy Number': `import java.util.*;
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
}`,

  'Find the Duplicate Number': `import java.util.*;
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
}`,

  'Remove Nth Node From End of List': `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode first = dummy, second = dummy;
        for (int i = 0; i <= n; i++) first = first.next;
        while (first != null) {
            first = first.next;
            second = second.next;
        }
        second.next = second.next.next;
        return dummy.next;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int n = sc.nextInt();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode result = removeNthFromEnd(head, n);
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
}`,

  'Swap Kth Nodes from Beginning and End': `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode swapNodes(ListNode head, int k) {
        ListNode first = head, second = head, curr = head;
        for (int i = 1; i < k; i++) curr = curr.next;
        first = curr;
        while (curr.next != null) {
            curr = curr.next;
            second = second.next;
        }
        int temp = first.val;
        first.val = second.val;
        second.val = temp;
        return head;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode result = swapNodes(head, k);
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
}`,

  'Odd Even Linked List': `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode oddEvenList(ListNode head) {
        if (head == null) return null;
        ListNode odd = head, even = head.next, evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode result = oddEvenList(head);
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
}`,

  'Partition List': `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode partition(ListNode head, int x) {
        ListNode before = new ListNode(0), after = new ListNode(0);
        ListNode beforeCurr = before, afterCurr = after;
        while (head != null) {
            if (head.val < x) {
                beforeCurr.next = head;
                beforeCurr = beforeCurr.next;
            } else {
                afterCurr.next = head;
                afterCurr = afterCurr.next;
            }
            head = head.next;
        }
        afterCurr.next = null;
        beforeCurr.next = after.next;
        return before.next;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int x = sc.nextInt();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode result = partition(head, x);
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
}`,

  'Split Linked List in Parts': `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode[] splitListToParts(ListNode head, int k) {
        int len = 0;
        ListNode curr = head;
        while (curr != null) {
            len++;
            curr = curr.next;
        }
        int base = len / k, extra = len % k;
        ListNode[] result = new ListNode[k];
        curr = head;
        for (int i = 0; i < k; i++) {
            result[i] = curr;
            int partSize = base + (i < extra ? 1 : 0);
            for (int j = 0; j < partSize - 1 && curr != null; j++) {
                curr = curr.next;
            }
            if (curr != null) {
                ListNode next = curr.next;
                curr.next = null;
                curr = next;
            }
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        ListNode head = parseLinkedList(input);
        ListNode[] result = splitListToParts(head, k);
        System.out.print("[");
        for (int i = 0; i < result.length; i++) {
            if (i > 0) System.out.print(",");
            System.out.print(formatLinkedList(result[i]));
        }
        System.out.println("]");
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
        if (head == null) return "[]";
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
};

async function fixDays52to54() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');
    console.log('📝 Fixing Days 52-54 questions with executable solutions...\n');

    let updated = 0;
    
    for (const [title, solution] of Object.entries(fixedSolutions)) {
      const result = await Question.findOneAndUpdate(
        { title },
        { solution },
        { new: true }
      );
      
      if (result) {
        console.log(`  ✅ Fixed: ${title}`);
        updated++;
      }
    }

    console.log(`\n🎉 Successfully updated ${updated} questions!\n`);
    console.log('All Days 52-54 questions now have:');
    console.log('  ✅ main() methods for Judge0 execution');
    console.log('  ✅ Input parsing (arrays, linked lists, integers)');
    console.log('  ✅ Output formatting (matching expected format)');
    console.log('  ✅ Proper class structure (no nested class conflicts)\n');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixDays52to54();
