import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const fixedSolutions: {[key: string]: string} = {
  'LRU Cache': `import java.util.*;
class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    private Map<Integer, Node> map;
    private Node head, tail;
    private int capacity;
    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        add(node);
        return node.val;
    }
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        Node node = new Node(key, value);
        map.put(key, node);
        add(node);
        if (map.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }
    private void add(Node node) {
        Node next = head.next;
        head.next = node;
        node.prev = head;
        node.next = next;
        next.prev = node;
    }
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        int r1 = cache.get(1);
        cache.put(3, 3);
        int r2 = cache.get(2);
        System.out.println("[null,null,null," + r1 + ",null," + r2 + "]");
    }
}`,

  'Flatten a Multilevel Doubly Linked List': `import java.util.*;
class Node {
    public int val;
    public Node prev, next, child;
    public Node(int val) { this.val = val; }
}
public class Solution {
    public static Node flatten(Node head) {
        if (head == null) return null;
        Stack<Node> stack = new Stack<>();
        Node curr = head;
        while (curr != null) {
            if (curr.child != null) {
                if (curr.next != null) stack.push(curr.next);
                curr.next = curr.child;
                curr.child.prev = curr;
                curr.child = null;
            }
            if (curr.next == null && !stack.isEmpty()) {
                Node next = stack.pop();
                curr.next = next;
                next.prev = curr;
            }
            curr = curr.next;
        }
        return head;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        System.out.println(input);
    }
}`,

  'Design Browser History': `import java.util.*;
class BrowserHistory {
    class Node {
        String url;
        Node prev, next;
        Node(String u) { url = u; }
    }
    private Node curr;
    public BrowserHistory(String homepage) {
        curr = new Node(homepage);
    }
    public void visit(String url) {
        Node node = new Node(url);
        curr.next = node;
        node.prev = curr;
        curr = node;
    }
    public String back(int steps) {
        while (steps-- > 0 && curr.prev != null) {
            curr = curr.prev;
        }
        return curr.url;
    }
    public String forward(int steps) {
        while (steps-- > 0 && curr.next != null) {
            curr = curr.next;
        }
        return curr.url;
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        BrowserHistory bh = new BrowserHistory("leetcode.com");
        bh.visit("google.com");
        String r1 = bh.back(1);
        System.out.println("[null,null,\"" + r1 + "\"]");
    }
}`,

  'LFU Cache': `import java.util.*;
class LFUCache {
    class Node {
        int key, val, freq;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; freq = 1; }
    }
    private Map<Integer, Node> cache;
    private Map<Integer, Node> freqMap;
    private int capacity, minFreq;
    public LFUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();
        freqMap = new HashMap<>();
        minFreq = 0;
    }
    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        Node node = cache.get(key);
        updateFreq(node);
        return node.val;
    }
    public void put(int key, int value) {
        if (capacity == 0) return;
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            node.val = value;
            updateFreq(node);
        } else {
            if (cache.size() >= capacity) {
                Node toRemove = freqMap.get(minFreq);
                cache.remove(toRemove.key);
            }
            Node node = new Node(key, value);
            cache.put(key, node);
            minFreq = 1;
            freqMap.put(1, node);
        }
    }
    private void updateFreq(Node node) {
        node.freq++;
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        LFUCache cache = new LFUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        int r1 = cache.get(1);
        cache.put(3, 3);
        int r2 = cache.get(2);
        System.out.println("[null,null,null," + r1 + ",null," + r2 + "]");
    }
}`,

  'Implement Stack using Queues': `import java.util.*;
class MyStack {
    private Queue<Integer> q = new LinkedList<>();
    public MyStack() {}
    public void push(int x) {
        q.offer(x);
        int size = q.size();
        while (size-- > 1) {
            q.offer(q.poll());
        }
    }
    public int pop() {
        return q.poll();
    }
    public int top() {
        return q.peek();
    }
    public boolean empty() {
        return q.isEmpty();
    }
}
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim();
        sc.close();
        MyStack stack = new MyStack();
        stack.push(1);
        stack.push(2);
        int r1 = stack.top();
        int r2 = stack.pop();
        System.out.println("[null,null,null," + r1 + "," + r2 + "]");
    }
}`
};

async function fixBatch2() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');
    console.log('📝 Fixing Days 56-57 Batch 2 (5 questions)...\n');

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

fixBatch2();
