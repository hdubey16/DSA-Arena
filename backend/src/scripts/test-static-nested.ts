import mongoose from 'mongoose';
import { JavaCodeExecutor } from '../services/codeExecutor';
import dotenv from 'dotenv';

dotenv.config();

async function testLinkedListFormats() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    const executor = new JavaCodeExecutor();

    // Test with static nested class
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Test: Static Nested Class');
    console.log('═══════════════════════════════════════════════════════════');
    
    const staticNestedCode = `
import java.util.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { 
            this.val = val; 
        }
    }
    
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
        String input = sc.nextLine();
        sc.close();
        
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

    const result1 = await executor.executeCode(staticNestedCode, [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' }
    ]);

    console.log('Result:', result1.allTestsPassed ? '✅ PASSED' : '❌ FAILED');
    console.log('Expected:', '[5,4,3,2,1]');
    console.log('Actual:', result1.results[0].actualOutput);
    if (result1.results[0].error) {
      console.log('Compilation Error:', result1.results[0].error);
    }
    console.log('');

    // Test without spaces in output
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Test: Multiple Test Cases');
    console.log('═══════════════════════════════════════════════════════════');
    
    const result2 = await executor.executeCode(staticNestedCode, [
      { input: '[1,2,3]', expectedOutput: '[3,2,1]' },
      { input: '[1]', expectedOutput: '[1]' },
      { input: '[]', expectedOutput: '[]' }
    ]);

    console.log('Total Tests:', result2.totalTests);
    console.log('Passed:', result2.passedTests);
    console.log('Failed:', result2.failedTests);
    console.log('');
    
    result2.results.forEach((r, idx) => {
      console.log(`Test ${idx + 1}: ${r.passed ? '✅' : '❌'}`);
      console.log(`  Input: ${r.input}`);
      console.log(`  Expected: ${r.expectedOutput}`);
      console.log(`  Actual: ${r.actualOutput}`);
      if (r.error) console.log(`  Error: ${r.error}`);
    });

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

testLinkedListFormats();
