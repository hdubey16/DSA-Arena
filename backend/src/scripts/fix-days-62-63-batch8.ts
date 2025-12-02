import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const fixedSolutions: {[key: string]: string} = {
  'Reverse First K Elements of Queue': `import java.util.*;
public class Solution {
    public static Queue<Integer> reverseK(Queue<Integer> queue, int k) {
        if (k <= 0 || k > queue.size()) return queue;
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < k; i++) {
            stack.push(queue.poll());
        }
        while (!stack.isEmpty()) {
            queue.offer(stack.pop());
        }
        for (int i = 0; i < queue.size() - k; i++) {
            queue.offer(queue.poll());
        }
        return queue;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        int[] arr = parseArray(input);
        Queue<Integer> queue = new LinkedList<>();
        for (int num : arr) queue.offer(num);
        queue = reverseK(queue, k);
        System.out.println(formatQueue(queue));
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
    private static String formatQueue(Queue<Integer> queue) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (!queue.isEmpty()) {
            if (!first) sb.append(",");
            sb.append(queue.poll());
            first = false;
        }
        sb.append("]");
        return sb.toString();
    }
}`,

  'First Unique Character in a String': `import java.util.*;
public class Solution {
    public static int firstUniqChar(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) {
            freq[c - 'a']++;
        }
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim().replace("\"", "");
        sc.close();
        System.out.println(firstUniqChar(s));
    }
}`,

  'Interleave the First Half of the Queue with Second Half': `import java.util.*;
public class Solution {
    public static Queue<Integer> interleave(Queue<Integer> queue) {
        int size = queue.size();
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < size / 2; i++) {
            stack.push(queue.poll());
        }
        while (!stack.isEmpty()) {
            queue.offer(stack.pop());
        }
        for (int i = 0; i < size / 2; i++) {
            queue.offer(queue.poll());
        }
        for (int i = 0; i < size / 2; i++) {
            stack.push(queue.poll());
        }
        while (!stack.isEmpty()) {
            queue.offer(stack.pop());
            queue.offer(queue.poll());
        }
        return queue;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        int[] arr = parseArray(input);
        Queue<Integer> queue = new LinkedList<>();
        for (int num : arr) queue.offer(num);
        queue = interleave(queue);
        System.out.println(formatQueue(queue));
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
    private static String formatQueue(Queue<Integer> queue) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (!queue.isEmpty()) {
            if (!first) sb.append(",");
            sb.append(queue.poll());
            first = false;
        }
        sb.append("]");
        return sb.toString();
    }
}`,

  'Reveal Cards In Increasing Order': `import java.util.*;
public class Solution {
    public static int[] deckRevealedIncreasing(int[] deck) {
        Arrays.sort(deck);
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < deck.length; i++) {
            queue.offer(i);
        }
        int[] result = new int[deck.length];
        for (int card : deck) {
            result[queue.poll()] = card;
            if (!queue.isEmpty()) {
                queue.offer(queue.poll());
            }
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        int[] deck = parseArray(input);
        int[] result = deckRevealedIncreasing(deck);
        System.out.println(formatArray(result));
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
    private static String formatArray(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(arr[i]);
        }
        sb.append("]");
        return sb.toString();
    }
}`,

  'Dota2 Senate': `import java.util.*;
public class Solution {
    public static String predictPartyVictory(String senate) {
        Queue<Integer> radiant = new LinkedList<>();
        Queue<Integer> dire = new LinkedList<>();
        int n = senate.length();
        for (int i = 0; i < n; i++) {
            if (senate.charAt(i) == 'R') {
                radiant.offer(i);
            } else {
                dire.offer(i);
            }
        }
        while (!radiant.isEmpty() && !dire.isEmpty()) {
            int r = radiant.poll();
            int d = dire.poll();
            if (r < d) {
                radiant.offer(r + n);
            } else {
                dire.offer(d + n);
            }
        }
        return radiant.isEmpty() ? "Dire" : "Radiant";
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String senate = sc.nextLine().trim().replace("\"", "");
        sc.close();
        System.out.println(predictPartyVictory(senate));
    }
}`
};

async function fixBatch8() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');
    console.log('📝 Fixing Days 62-63 Batch 8 (5 questions)...\n');

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

    console.log(`\n🎉 Successfully updated ${updated}/5 questions!\n`);
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixBatch8();
