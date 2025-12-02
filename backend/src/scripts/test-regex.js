// Test what the regex replacement does

const code = `
import java.util.*;

public class Solution {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { 
            this.val = val; 
        }
    }
    
    public static void main(String[] args) {
        System.out.println("Test");
    }
}`;

console.log('Original Code:');
console.log('═══════════════════════════════════════════════════════════');
console.log(code);
console.log('');

let modifiedCode = code;

// Step 1: Replace public class
modifiedCode = modifiedCode.replace(/public\s+class\s+\w+/g, 'public class Main');
console.log('After Step 1 (public class replacement):');
console.log('═══════════════════════════════════════════════════════════');
console.log(modifiedCode);
console.log('');

// Step 2: Replace any remaining class
modifiedCode = modifiedCode.replace(/class\s+\w+\s*\{/g, 'class Main {');
console.log('After Step 2 (all class replacement):');
console.log('═══════════════════════════════════════════════════════════');
console.log(modifiedCode);
console.log('');

console.log('❌ PROBLEM: ListNode class got replaced with Main!');
console.log('This creates duplicate Main classes, breaking the code.');
