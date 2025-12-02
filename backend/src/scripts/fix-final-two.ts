import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const fixedSolutions: {[key: string]: string} = {
  'Swap Kth Nodes from Ends': `import java.util.*;
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
public class Solution {
    public static ListNode swapNodes(ListNode head, int k) {
        ListNode first = head, second = head, temp = head;
        for (int i = 1; i < k; i++) {
            first = first.next;
        }
        temp = first;
        while (temp.next != null) {
            temp = temp.next;
            second = second.next;
        }
        int t = first.val;
        first.val = second.val;
        second.val = t;
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

  'Jump Game VI': `import java.util.*;
public class Solution {
    public static int maxResult(int[] nums, int k) {
        Deque<Integer> deque = new ArrayDeque<>();
        deque.offer(0);
        for (int i = 1; i < nums.length; i++) {
            nums[i] += nums[deque.peekFirst()];
            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            if (deque.peekFirst() == i - k) {
                deque.pollFirst();
            }
        }
        return nums[nums.length - 1];
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        int[] nums = parseArray(input);
        System.out.println(maxResult(nums, k));
    }
    private static int[] parseArray(String input) {
        input = input.replace("[", "").replace("]", "");
        String[] parts = input.split(",");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i].trim());
        }
        return arr;
    }
}`
};

async function fixFinalTwo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');
    console.log('📝 Fixing final 2 questions...\n');

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
      } else {
        console.log(`  ❌ Not found: ${title}`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updated}/2 questions!\n`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixFinalTwo();
