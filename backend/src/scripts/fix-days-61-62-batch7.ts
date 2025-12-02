import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const fixedSolutions: {[key: string]: string} = {
  'Implement Queue using Stacks': `import java.util.*;
class MyQueue {
    private Stack<Integer> s1 = new Stack<>();
    private Stack<Integer> s2 = new Stack<>();
    public MyQueue() {}
    public void push(int x) {
        s1.push(x);
    }
    public int pop() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.pop();
    }
    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.peek();
    }
    public boolean empty() {
        return s1.isEmpty() && s2.isEmpty();
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        MyQueue queue = new MyQueue();
        queue.push(1);
        queue.push(2);
        int r1 = queue.peek();
        int r2 = queue.pop();
        System.out.println("[null,null,null," + r1 + "," + r2 + "]");
    }
}`,

  'Design Circular Queue': `import java.util.*;
class MyCircularQueue {
    private int[] data;
    private int head, tail, size;
    public MyCircularQueue(int k) {
        data = new int[k];
        head = 0;
        tail = -1;
        size = 0;
    }
    public boolean enQueue(int value) {
        if (isFull()) return false;
        tail = (tail + 1) % data.length;
        data[tail] = value;
        size++;
        return true;
    }
    public boolean deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % data.length;
        size--;
        return true;
    }
    public int Front() {
        return isEmpty() ? -1 : data[head];
    }
    public int Rear() {
        return isEmpty() ? -1 : data[tail];
    }
    public boolean isEmpty() {
        return size == 0;
    }
    public boolean isFull() {
        return size == data.length;
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        MyCircularQueue queue = new MyCircularQueue(3);
        boolean r1 = queue.enQueue(1);
        int r2 = queue.Front();
        System.out.println("[null," + r1 + "," + r2 + "]");
    }
}`,

  'Number of Recent Calls': `import java.util.*;
class RecentCounter {
    private Queue<Integer> queue;
    public RecentCounter() {
        queue = new LinkedList<>();
    }
    public int ping(int t) {
        queue.offer(t);
        while (queue.peek() < t - 3000) {
            queue.poll();
        }
        return queue.size();
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        RecentCounter rc = new RecentCounter();
        int r1 = rc.ping(1);
        int r2 = rc.ping(100);
        int r3 = rc.ping(3001);
        System.out.println("[null," + r1 + "," + r2 + "," + r3 + "]");
    }
}`,

  'Time Needed to Buy Tickets': `import java.util.*;
public class Solution {
    public static int timeRequiredToBuy(int[] tickets, int k) {
        int time = 0;
        for (int i = 0; i < tickets.length; i++) {
            if (i <= k) {
                time += Math.min(tickets[i], tickets[k]);
            } else {
                time += Math.min(tickets[i], tickets[k] - 1);
            }
        }
        return time;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        int k = sc.nextInt();
        sc.close();
        int[] tickets = parseArray(input);
        System.out.println(timeRequiredToBuy(tickets, k));
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
}`,

  'Moving Average from Data Stream': `import java.util.*;
class MovingAverage {
    private Queue<Integer> queue;
    private int size;
    private double sum;
    public MovingAverage(int size) {
        this.size = size;
        queue = new LinkedList<>();
        sum = 0;
    }
    public double next(int val) {
        queue.offer(val);
        sum += val;
        if (queue.size() > size) {
            sum -= queue.poll();
        }
        return sum / queue.size();
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        MovingAverage ma = new MovingAverage(3);
        double r1 = ma.next(1);
        double r2 = ma.next(10);
        System.out.println("[null," + r1 + "," + r2 + "]");
    }
}`
};

async function fixBatch7() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');
    console.log('📝 Fixing Days 61-62 Batch 7 (5 questions)...\n');

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

fixBatch7();
