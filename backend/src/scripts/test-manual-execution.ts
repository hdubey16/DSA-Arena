import mongoose from 'mongoose';
import { JavaCodeExecutor } from '../services/codeExecutor';
import dotenv from 'dotenv';

dotenv.config();

async function testManualExecution() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🧪 Testing Code Executor with Manual Code');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Test 1: Simple array reversal that should work
    console.log('───────────────────────────────────────────────────────────');
    console.log('Test 1: Array Reversal (Simple)');
    console.log('───────────────────────────────────────────────────────────');
    
    const simpleCode = `
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int[] reversed = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            reversed[i] = arr[arr.length - 1 - i];
        }
        System.out.println(Arrays.toString(reversed));
    }
}`;

    const executor = new JavaCodeExecutor();
    const result1 = await executor.executeCode(simpleCode, [
      { input: '', expectedOutput: '[5, 4, 3, 2, 1]' }
    ]);

    console.log('Result:', result1.allTestsPassed ? '✅ PASSED' : '❌ FAILED');
    console.log('Expected:', '[5, 4, 3, 2, 1]');
    console.log('Actual:', result1.results[0].actualOutput);
    console.log('');

    // Test 2: Linked List with proper structure
    console.log('───────────────────────────────────────────────────────────');
    console.log('Test 2: Linked List Reversal (Proper Structure)');
    console.log('───────────────────────────────────────────────────────────');
    
    const linkedListCode = `
import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { 
        this.val = val; 
    }
}

public class Main {
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
        // Read input array from stdin
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        sc.close();
        
        // Parse array format: [1,2,3,4,5]
        input = input.trim().replace("[", "").replace("]", "");
        if (input.isEmpty()) {
            System.out.println("[]");
            return;
        }
        
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
        }
        
        ListNode reversed = reverseList(dummy.next);
        
        // Print result in array format
        System.out.print("[");
        boolean first = true;
        while (reversed != null) {
            if (!first) System.out.print(",");
            System.out.print(reversed.val);
            first = false;
            reversed = reversed.next;
        }
        System.out.println("]");
    }
}`;

    const result2 = await executor.executeCode(linkedListCode, [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' }
    ]);

    console.log('Result:', result2.allTestsPassed ? '✅ PASSED' : '❌ FAILED');
    console.log('Expected:', '[5,4,3,2,1]');
    console.log('Actual:', result2.results[0].actualOutput);
    if (result2.results[0].error) {
      console.log('Error:', result2.results[0].error);
    }
    console.log('');

    // Test 3: Test with multiple inputs (multi-line)
    console.log('───────────────────────────────────────────────────────────');
    console.log('Test 3: Linked List Reversal Between (Multiple Inputs)');
    console.log('───────────────────────────────────────────────────────────');
    
    const multiInputCode = `
import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { 
        this.val = val; 
    }
}

public class Main {
    public static ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        for (int i = 1; i < left; i++) pre = pre.next;
        ListNode curr = pre.next;
        for (int i = 0; i < right - left; i++) {
            ListNode next = curr.next;
            curr.next = next.next;
            next.next = pre.next;
            pre.next = next;
        }
        return dummy.next;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        int left = sc.nextInt();
        int right = sc.nextInt();
        sc.close();
        
        // Parse array
        input = input.trim().replace("[", "").replace("]", "");
        String[] parts = input.split(",");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        
        for (String part : parts) {
            curr.next = new ListNode(Integer.parseInt(part.trim()));
            curr = curr.next;
        }
        
        ListNode result = reverseBetween(dummy.next, left, right);
        
        // Print result
        System.out.print("[");
        boolean first = true;
        while (result != null) {
            if (!first) System.out.print(",");
            System.out.print(result.val);
            first = false;
            result = result.next;
        }
        System.out.println("]");
    }
}`;

    const result3 = await executor.executeCode(multiInputCode, [
      { input: '[1,2,3,4,5]\n2\n4', expectedOutput: '[1,4,3,2,5]' }
    ]);

    console.log('Result:', result3.allTestsPassed ? '✅ PASSED' : '❌ FAILED');
    console.log('Input:', '[1,2,3,4,5]\\n2\\n4');
    console.log('Expected:', '[1,4,3,2,5]');
    console.log('Actual:', result3.results[0].actualOutput);
    if (result3.results[0].error) {
      console.log('Error:', result3.results[0].error);
    }
    console.log('');

    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 Summary of Issues Found:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log('1. ❌ CRITICAL: Starter/Solution code structure is wrong');
    console.log('   - Classes must be defined at the top level, not nested');
    console.log('   - ListNode needs to be outside Main class');
    console.log('');
    console.log('2. ❌ CRITICAL: No main() method to handle I/O');
    console.log('   - Judge0 needs a main() method to execute');
    console.log('   - Code needs to read from stdin and write to stdout');
    console.log('');
    console.log('3. ⚠️  Input/Output parsing needed:');
    console.log('   - Input format: [1,2,3,4,5] (array notation)');
    console.log('   - Need to parse and build linked list from array');
    console.log('   - Need to convert linked list back to array format');
    console.log('');
    console.log('4. ⚠️  Multiple input handling:');
    console.log('   - Some questions need multiple inputs (array + integers)');
    console.log('   - Format: line1=array, line2=int1, line3=int2, etc.');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Error during test:', error instanceof Error ? error.message : String(error));
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

testManualExecution();
