import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function findMissing() {
  await mongoose.connect(process.env.MONGODB_URI || '');
  
  const all = [
    'Reverse Linked List','Reverse Linked List II','Reorder List','Rotate List','Swap Nodes in Pairs',
    'Linked List Cycle','Linked List Cycle II','Intersection of Two Linked Lists','Happy Number',
    'Find the Duplicate Number','Remove Nth Node From End of List','Odd Even Linked List',
    'Partition List','Split Linked List in Parts','Swap Kth Nodes from Ends',
    'Reverse Nodes in k-Group','Merge k Sorted Lists','Sort List','Insertion Sort List',
    'Copy List with Random Pointer','LRU Cache','Flatten a Multilevel Doubly Linked List',
    'Design Browser History','LFU Cache','Implement Stack using Queues','Min Stack',
    'Valid Parentheses','Simplify Path','Backspace String Compare','Generate Parentheses',
    'Longest Valid Parentheses','Online Stock Span','Daily Temperatures','Remove K Digits',
    'Next Greater Element I','Next Greater Element II','Largest Rectangle in Histogram',
    'Maximal Rectangle','Sum of Subarray Minimums','Evaluate Reverse Polish Notation',
    'Basic Calculator','Basic Calculator II','Decode String','Asteroid Collision',
    'Implement Queue using Stacks','Design Circular Queue','Number of Recent Calls',
    'Time Needed to Buy Tickets','Moving Average from Data Stream','First Unique Character in a String',
    'Reveal Cards In Increasing Order','Dota2 Senate','Design Circular Deque',
    'Sliding Window Maximum','Shortest Subarray with Sum at Least K','Constrained Subsequence Sum','Jump Game VI'
  ];
  
  console.log('Questions WITHOUT main() method:\n');
  
  for (const title of all) {
    const q = await Question.findOne({ title });
    if (!q || !q.solution || !q.solution.includes('main')) {
      console.log('  ❌ ' + title);
    }
  }
  
  await mongoose.disconnect();
}

findMissing();
