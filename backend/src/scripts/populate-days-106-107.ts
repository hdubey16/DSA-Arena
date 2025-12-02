import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question";
import Topic from "../models/Topic";

dotenv.config();

const topics = [
  {
    id: "106",
    title: "Day 106 – Trie (Insert, Search, Delete)",
    description: "Trie data structure fundamentals including implementation and basic operations.",
    week: 16,
    day: 106,
    difficulty: "Medium",
    estimatedTime: 180,
    prerequisites: ["105"],
    compulsoryQuestion: "Implement Trie (Prefix Tree)",
    practiceQuestions: 5,
    isLocked: false,
  },
  {
    id: "107",
    title: "Day 107 – Trie Applications",
    description: "Advanced Trie usage including prefix matching, word squares, and concatenated words.",
    week: 16,
    day: 107,
    difficulty: "Hard",
    estimatedTime: 200,
    prerequisites: ["106"],
    compulsoryQuestion: "Word Squares",
    practiceQuestions: 5,
    isLocked: false,
  },
];

function createQuestion(q: any) {
  return {
    topicId: q.topicId,
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    type: "practice",
    isCompulsory: q.isCompulsory ?? false,
    points: q.points,
    timeLimit: 45,
    starterCode: q.starterCode || "public class Solution {\n    \n}",
    solution: q.solution,
    examples: q.examples,
    testCases: q.testCases.map((tc: any) => ({
      input: tc.input,
      expectedOutput: tc.expected,
      isHidden: tc.isHidden,
      points: tc.isHidden ? 15 : 10,
    })),
    hints: [q.hint],
    tags: q.tags,
  };
}

const questions = [
  // Day 106 - Q1
  createQuestion({
    title: "Implement Trie (Prefix Tree)",
    description:
      "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class with insert, search, and startsWith methods.",
    difficulty: "Medium",
    topicId: "106",
    isCompulsory: true,
    examples: [
      {
        input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
        output: "[null, null, true, false, true, null, true]",
        explanation: "Standard trie operations",
      },
    ],
    testCases: [
      { input: '["Trie","insert","search"], [[], ["apple"], ["apple"]]', expected: "[null, null, true]", isHidden: false },
      { input: '["Trie","insert","search","startsWith"], [[], ["hello"], ["hell"], ["hell"]]', expected: "[null, null, false, true]", isHidden: true },
      { input: '["Trie","insert","insert","search"], [[], ["app"], ["apple"], ["app"]]', expected: "[null, null, null, true]", isHidden: true },
      { input: '["Trie","insert","search","search"], [[], ["test"], ["test"], ["testing"]]', expected: "[null, null, true, false]", isHidden: true },
      { input: '["Trie","startsWith"], [[], ["a"]]', expected: "[null, false]", isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children;
        boolean isEndOfWord;
        
        public TrieNode() {
            children = new TrieNode[26];
            isEndOfWord = false;
        }
    }
    
    class Trie {
        private TrieNode root;
        
        public Trie() {
            root = new TrieNode();
        }
        
        public void insert(String word) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
            }
            curr.isEndOfWord = true;
        }
        
        public boolean search(String word) {
            TrieNode node = searchPrefix(word);
            return node != null && node.isEndOfWord;
        }
        
        public boolean startsWith(String prefix) {
            return searchPrefix(prefix) != null;
        }
        
        private TrieNode searchPrefix(String prefix) {
            TrieNode curr = root;
            for (char c : prefix.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    return null;
                }
                curr = curr.children[idx];
            }
            return curr;
        }
    }
    
    // Time: O(m) for all operations where m = word length
    // Space: O(n * m) where n = number of words
    `,
    hint: "Each node has 26 children (for a-z). Mark end of word with boolean flag.",
    tags: ["Trie", "Design", "String"],
    points: 120,
  }),

  // Day 106 - Q2
  createQuestion({
    title: "Word Search II",
    description:
      "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
    difficulty: "Hard",
    topicId: "106",
    examples: [
      {
        input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]',
        explanation: "Find words using Trie + DFS",
      },
    ],
    testCases: [
      { input: '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]', expected: '["eat","oath"]', isHidden: false },
      { input: '[["a","b"],["c","d"]], ["abcb"]', expected: "[]", isHidden: true },
      { input: '[["a"]], ["a"]', expected: '["a"]', isHidden: true },
      { input: '[["a","a"]], ["aaa"]', expected: "[]", isHidden: true },
      { input: '[["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]], ["oa","oaa"]', expected: '["oa","oaa"]', isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;
    }
    
    public List<String> findWords(char[][] board, String[] words) {
        // Build Trie
        TrieNode root = new TrieNode();
        for (String word : words) {
            TrieNode node = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (node.children[idx] == null) {
                    node.children[idx] = new TrieNode();
                }
                node = node.children[idx];
            }
            node.word = word;
        }
        
        List<String> result = new ArrayList<>();
        int m = board.length, n = board[0].length;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(board, i, j, root, result);
            }
        }
        
        return result;
    }
    
    private void dfs(char[][] board, int i, int j, TrieNode node, List<String> result) {
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
        
        char c = board[i][j];
        if (c == '#' || node.children[c - 'a'] == null) return;
        
        node = node.children[c - 'a'];
        if (node.word != null) {
            result.add(node.word);
            node.word = null; // Avoid duplicates
        }
        
        board[i][j] = '#'; // Mark visited
        dfs(board, i + 1, j, node, result);
        dfs(board, i - 1, j, node, result);
        dfs(board, i, j + 1, node, result);
        dfs(board, i, j - 1, node, result);
        board[i][j] = c; // Restore
    }
    
    // Time: O(m * n * 4^L) where L = max word length
    // Space: O(N) where N = total chars in words
    `,
    hint: "Build Trie from words. DFS on board, prune branches not in Trie.",
    tags: ["Trie", "Backtracking", "DFS", "Matrix"],
    points: 150,
  }),

  // Day 106 - Q3
  createQuestion({
    title: "Design Add and Search Words Data Structure",
    description:
      "Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the WordDictionary class with addWord and search methods. The search method can use '.' to match any letter.",
    difficulty: "Medium",
    topicId: "106",
    examples: [
      {
        input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
        output: "[null,null,null,null,false,true,true,true]",
        explanation: "Search with wildcards",
      },
    ],
    testCases: [
      { input: '["WordDictionary","addWord","search"], [[], ["word"], ["word"]]', expected: "[null, null, true]", isHidden: false },
      { input: '["WordDictionary","addWord","search"], [[], ["word"], [".ord"]]', expected: "[null, null, true]", isHidden: true },
      { input: '["WordDictionary","addWord","addWord","search"], [[], ["a"], ["a"], ["."]]', expected: "[null, null, null, true]", isHidden: true },
      { input: '["WordDictionary","addWord","search"], [[], ["at"], ["an"]]', expected: "[null, null, false]", isHidden: true },
      { input: '["WordDictionary","addWord","addWord","search"], [[], ["ran"], ["rune"], ["r.n"]]', expected: "[null, null, null, true]", isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children;
        boolean isEnd;
        
        public TrieNode() {
            children = new TrieNode[26];
            isEnd = false;
        }
    }
    
    class WordDictionary {
        private TrieNode root;
        
        public WordDictionary() {
            root = new TrieNode();
        }
        
        public void addWord(String word) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
            }
            curr.isEnd = true;
        }
        
        public boolean search(String word) {
            return searchHelper(word, 0, root);
        }
        
        private boolean searchHelper(String word, int index, TrieNode node) {
            if (index == word.length()) {
                return node.isEnd;
            }
            
            char c = word.charAt(index);
            
            if (c == '.') {
                // Try all possible children
                for (TrieNode child : node.children) {
                    if (child != null && searchHelper(word, index + 1, child)) {
                        return true;
                    }
                }
                return false;
            } else {
                int idx = c - 'a';
                if (node.children[idx] == null) {
                    return false;
                }
                return searchHelper(word, index + 1, node.children[idx]);
            }
        }
    }
    
    // Time: O(m) for addWord, O(26^m) worst case for search with dots
    // Space: O(n * m)
    `,
    hint: "Use DFS for search with '.'. Branch to all 26 children when encountering '.'",
    tags: ["Trie", "Design", "DFS", "String"],
    points: 120,
  }),

  // Day 106 - Q4
  createQuestion({
    title: "Longest Word in Dictionary",
    description:
      "Given an array of strings words representing an English Dictionary, return the longest word in words that can be built one character at a time by other words in words. If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.",
    difficulty: "Medium",
    topicId: "106",
    examples: [
      {
        input: 'words = ["w","wo","wor","worl","world"]',
        output: '"world"',
        explanation: "Can build incrementally: w → wo → wor → worl → world",
      },
      {
        input: 'words = ["a","banana","app","appl","ap","apply","apple"]',
        output: '"apple"',
        explanation: "Both 'apple' and 'apply' can be built, 'apple' is lexicographically smaller",
      },
    ],
    testCases: [
      { input: '["w","wo","wor","worl","world"]', expected: '"world"', isHidden: false },
      { input: '["a","banana","app","appl","ap","apply","apple"]', expected: '"apple"', isHidden: true },
      { input: '["m","mo","moc","moch","mocha","l","la","lat","latt","latte","c","ca","cat"]', expected: '"latte"', isHidden: true },
      { input: '["a","ab"]', expected: '"ab"', isHidden: true },
      { input: '["yo","ew","fc","zrc","yodn","fcm","qm","qmo","fcmz","z","ewq","yod","ewqz","y"]', expected: '"yodn"', isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;
    }
    
    public String longestWord(String[] words) {
        // Build Trie
        TrieNode root = new TrieNode();
        root.word = ""; // Root represents empty string
        
        for (String word : words) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
            }
            curr.word = word;
        }
        
        String result = "";
        Queue<TrieNode> queue = new LinkedList<>();
        queue.offer(root);
        
        // BFS to find longest buildable word
        while (!queue.isEmpty()) {
            TrieNode node = queue.poll();
            
            for (int i = 0; i < 26; i++) {
                TrieNode child = node.children[i];
                if (child != null && child.word != null) {
                    if (child.word.length() > result.length() ||
                        (child.word.length() == result.length() && child.word.compareTo(result) < 0)) {
                        result = child.word;
                    }
                    queue.offer(child);
                }
            }
        }
        
        return result;
    }
    
    // Time: O(n * m) where n = number of words, m = average length
    // Space: O(n * m)
    `,
    hint: "Build Trie, then BFS from root. Only traverse to nodes with complete words.",
    tags: ["Trie", "BFS", "String"],
    points: 120,
  }),

  // Day 106 - Q5
  createQuestion({
    title: "Replace Words",
    description:
      "In English, we have a concept called root, which can be followed by some other word to form another longer word. Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.",
    difficulty: "Medium",
    topicId: "106",
    examples: [
      {
        input: 'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"',
        output: '"the cat was rat by the bat"',
        explanation: "Replace 'cattle' with 'cat', 'rattled' with 'rat', 'battery' with 'bat'",
      },
    ],
    testCases: [
      { input: '["cat","bat","rat"], "the cattle was rattled by the battery"', expected: '"the cat was rat by the bat"', isHidden: false },
      { input: '["a","aa","aaa","aaaa"], "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"', expected: '"a a a a a a a a bbb baba a"', isHidden: true },
      { input: '["catt","cat","bat","rat"], "the cattle was rattled by the battery"', expected: '"the cat was rat by the bat"', isHidden: true },
      { input: '["a","b","c"], "aadsfasf absbs bbab cadsfafs"', expected: '"a a b c"', isHidden: true },
      { input: '["e","k","c","harqp","h","gsafc","vn","lqp","soy","mr"], "the rkqppvuw lqp"', expected: '"the rkqppvuw lqp"', isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;
    }
    
    public String replaceWords(List<String> dictionary, String sentence) {
        // Build Trie
        TrieNode root = new TrieNode();
        for (String word : dictionary) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
            }
            curr.word = word;
        }
        
        StringBuilder result = new StringBuilder();
        String[] words = sentence.split(" ");
        
        for (int i = 0; i < words.length; i++) {
            if (i > 0) result.append(" ");
            result.append(findRoot(words[i], root));
        }
        
        return result.toString();
    }
    
    private String findRoot(String word, TrieNode root) {
        TrieNode curr = root;
        
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                return word; // No root found
            }
            curr = curr.children[idx];
            if (curr.word != null) {
                return curr.word; // Found shortest root
            }
        }
        
        return word;
    }
    
    // Time: O(d * m + s * n) where d = dict size, m = avg root length, s = words in sentence, n = avg word length
    // Space: O(d * m)
    `,
    hint: "Build Trie from dictionary. For each word, find shortest prefix that's a root.",
    tags: ["Trie", "String", "Hash Table"],
    points: 120,
  }),

  // Day 107 - Q1
  createQuestion({
    title: "Shortest Unique Prefix",
    description:
      "Given an array of words, find the shortest unique prefix for each word. A unique prefix is a prefix that uniquely identifies the word (no other word has that prefix).",
    difficulty: "Medium",
    topicId: "107",
    examples: [
      {
        input: 'words = ["zebra", "dog", "duck", "dot"]',
        output: '["z", "dog", "du", "dot"]',
        explanation: "'z' uniquely identifies 'zebra', 'dog' needs full word, etc.",
      },
    ],
    testCases: [
      { input: '["zebra","dog","duck","dot"]', expected: '["z","dog","du","dot"]', isHidden: false },
      { input: '["apple","application","apply"]', expected: '["appl","appli","apply"]', isHidden: true },
      { input: '["abc","abcd","abcde"]', expected: '["abc","abcd","abcde"]', isHidden: true },
      { input: '["a","b","c"]', expected: '["a","b","c"]', isHidden: true },
      { input: '["test","testing","tester"]', expected: '["test","testi","teste"]', isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        int count = 0; // Number of words passing through this node
    }
    
    public String[] shortestUniquePrefixes(String[] words) {
        TrieNode root = new TrieNode();
        
        // Build Trie with counts
        for (String word : words) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
                curr.count++;
            }
        }
        
        String[] result = new String[words.length];
        
        for (int i = 0; i < words.length; i++) {
            result[i] = findShortestPrefix(words[i], root);
        }
        
        return result;
    }
    
    private String findShortestPrefix(String word, TrieNode root) {
        TrieNode curr = root;
        StringBuilder prefix = new StringBuilder();
        
        for (char c : word.toCharArray()) {
            prefix.append(c);
            int idx = c - 'a';
            curr = curr.children[idx];
            
            if (curr.count == 1) {
                return prefix.toString();
            }
        }
        
        return word; // Entire word is needed
    }
    
    // Time: O(n * m) where n = number of words, m = average length
    // Space: O(n * m)
    `,
    hint: "Store count at each node. Shortest prefix is where count becomes 1.",
    tags: ["Trie", "String"],
    points: 120,
  }),

  // Day 107 - Q2
  createQuestion({
    title: "Word Squares",
    description:
      "Given an array of unique strings words, return all the word squares you can build from words. A sequence of strings forms a valid word square if the kth row and column read the same string, where 0 ≤ k < max(numRows, numColumns).",
    difficulty: "Hard",
    topicId: "107",
    isCompulsory: true,
    examples: [
      {
        input: 'words = ["area","lead","wall","lady","ball"]',
        output: '[["ball","area","lead","lady"],["wall","area","lead","lady"]]',
        explanation: "Two valid word squares",
      },
    ],
    testCases: [
      { input: '["area","lead","wall","lady","ball"]', expected: '[["ball","area","lead","lady"],["wall","area","lead","lady"]]', isHidden: false },
      { input: '["abat","baba","atan","atal"]', expected: '[["baba","abat","baba","atan"],["baba","abat","baba","atal"]]', isHidden: true },
      { input: '["a"]', expected: '[["a"]]', isHidden: true },
      { input: '["abc","def"]', expected: "[]", isHidden: true },
      { input: '["area","lead","wall","baby","ball"]', expected: "Multiple squares", isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        List<String> wordsWithPrefix = new ArrayList<>();
    }
    
    public List<List<String>> wordSquares(String[] words) {
        TrieNode root = buildTrie(words);
        List<List<String>> result = new ArrayList<>();
        
        for (String word : words) {
            List<String> square = new ArrayList<>();
            square.add(word);
            backtrack(root, words[0].length(), square, result);
        }
        
        return result;
    }
    
    private TrieNode buildTrie(String[] words) {
        TrieNode root = new TrieNode();
        
        for (String word : words) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
                curr.wordsWithPrefix.add(word);
            }
        }
        
        return root;
    }
    
    private void backtrack(TrieNode root, int n, List<String> square, List<List<String>> result) {
        if (square.size() == n) {
            result.add(new ArrayList<>(square));
            return;
        }
        
        // Build prefix for next word
        StringBuilder prefix = new StringBuilder();
        int idx = square.size();
        for (String word : square) {
            prefix.append(word.charAt(idx));
        }
        
        // Find words with this prefix
        List<String> candidates = getWordsWithPrefix(root, prefix.toString());
        
        for (String candidate : candidates) {
            square.add(candidate);
            backtrack(root, n, square, result);
            square.remove(square.size() - 1);
        }
    }
    
    private List<String> getWordsWithPrefix(TrieNode root, String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                return new ArrayList<>();
            }
            curr = curr.children[idx];
        }
        return curr.wordsWithPrefix;
    }
    
    // Time: O(n * 26^L) where L = word length
    // Space: O(n * L)
    `,
    hint: "Build Trie storing words at each prefix. Backtrack, finding words matching column constraints.",
    tags: ["Trie", "Backtracking", "String"],
    points: 150,
  }),

  // Day 107 - Q3
  createQuestion({
    title: "Concatenated Words",
    description:
      "Given an array of strings words (without duplicates), return all the concatenated words in the given list of words. A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.",
    difficulty: "Hard",
    topicId: "107",
    examples: [
      {
        input: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]',
        output: '["catsdogcats","dogcatsdog","ratcatdogcat"]',
        explanation: "These can be formed from other words",
      },
    ],
    testCases: [
      { input: '["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]', expected: '["catsdogcats","dogcatsdog","ratcatdogcat"]', isHidden: false },
      { input: '["cat","dog","catdog"]', expected: '["catdog"]', isHidden: true },
      { input: '["a","b","ab","abc"]', expected: '["ab"]', isHidden: true },
      { input: '["cat","cats","catsdogcats"]', expected: '[]', isHidden: true },
      { input: '["a","aa","aaa","aaaa"]', expected: '["aa","aaa","aaaa"]', isHidden: true },
    ],
    solution: `
    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        Set<String> wordSet = new HashSet<>(Arrays.asList(words));
        List<String> result = new ArrayList<>();
        
        for (String word : words) {
            if (canForm(word, wordSet)) {
                result.add(word);
            }
        }
        
        return result;
    }
    
    private boolean canForm(String word, Set<String> wordSet) {
        if (word.isEmpty()) return false;
        
        boolean[] dp = new boolean[word.length() + 1];
        dp[0] = true;
        
        for (int i = 1; i <= word.length(); i++) {
            for (int j = (i == word.length() ? 1 : 0); j < i; j++) {
                if (dp[j] && wordSet.contains(word.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[word.length()];
    }
    
    // Alternative: Trie + DFS
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isWord = false;
    }
    
    public List<String> findAllConcatenatedWordsInADictTrie(String[] words) {
        TrieNode root = new TrieNode();
        
        // Sort by length to process shorter words first
        Arrays.sort(words, (a, b) -> a.length() - b.length());
        
        List<String> result = new ArrayList<>();
        
        for (String word : words) {
            if (word.isEmpty()) continue;
            
            if (canFormWithTrie(word, root, 0, 0)) {
                result.add(word);
            } else {
                addToTrie(root, word);
            }
        }
        
        return result;
    }
    
    private boolean canFormWithTrie(String word, TrieNode root, int index, int count) {
        TrieNode curr = root;
        
        for (int i = index; i < word.length(); i++) {
            int idx = word.charAt(i) - 'a';
            if (curr.children[idx] == null) {
                return false;
            }
            curr = curr.children[idx];
            
            if (curr.isWord) {
                if (i == word.length() - 1) {
                    return count >= 1;
                }
                if (canFormWithTrie(word, root, i + 1, count + 1)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private void addToTrie(TrieNode root, String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isWord = true;
    }
    
    // Time: O(n * m^2) for DP approach
    // Space: O(n * m) for Trie
    `,
    hint: "DP: Check if word can be segmented into >= 2 dict words. Or use Trie + DFS.",
    tags: ["Trie", "DP", "DFS", "String"],
    points: 150,
  }),

  // Day 107 - Q4
  createQuestion({
    title: "Prefix and Suffix Search",
    description:
      "Design a special dictionary with some words that searchs the words in it by a prefix and a suffix. Implement the WordFilter class. Given a word, return the word in the dictionary that has the prefix prefix and the suffix suffix. If there is more than one valid word, return the word with the largest index.",
    difficulty: "Hard",
    topicId: "107",
    examples: [
      {
        input: '["WordFilter", "f"]\\n[[["apple"]], ["a", "e"]]',
        output: "[null, 0]",
        explanation: "The word 'apple' has prefix 'a' and suffix 'e'",
      },
    ],
    testCases: [
      { input: '["WordFilter","f"], [[["apple"]], ["a","e"]]', expected: "[null, 0]", isHidden: false },
      { input: '["WordFilter","f"], [[["apple","apples"]], ["a","s"]]', expected: "[null, 1]", isHidden: true },
      { input: '["WordFilter","f","f"], [[["pop"]], ["p","p"], ["","p"]]', expected: "[null, 0, 0]", isHidden: true },
      { input: '["WordFilter","f"], [[["test","testing"]], ["test","g"]]', expected: "[null, 1]", isHidden: true },
      { input: '["WordFilter","f"], [[["a","aa","aaa"]], ["a","a"]]', expected: "[null, 2]", isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children = new TrieNode[27]; // 26 letters + '{' separator
        int weight = 0;
    }
    
    class WordFilter {
        TrieNode root;
        
        public WordFilter(String[] words) {
            root = new TrieNode();
            
            for (int weight = 0; weight < words.length; weight++) {
                String word = words[weight];
                
                // Insert all suffix#prefix combinations
                for (int i = 0; i <= word.length(); i++) {
                    String key = word.substring(i) + "{" + word;
                    TrieNode curr = root;
                    
                    for (char c : key.toCharArray()) {
                        int idx = c - 'a';
                        if (curr.children[idx] == null) {
                            curr.children[idx] = new TrieNode();
                        }
                        curr = curr.children[idx];
                        curr.weight = weight;
                    }
                }
            }
        }
        
        public int f(String prefix, String suffix) {
            String key = suffix + "{" + prefix;
            TrieNode curr = root;
            
            for (char c : key.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    return -1;
                }
                curr = curr.children[idx];
            }
            
            return curr.weight;
        }
    }
    
    // Time: O(n * m^2) for construction, O(m) for query
    // Space: O(n * m^2)
    `,
    hint: "Store suffix#prefix combinations in Trie. Query with suffix#prefix pattern.",
    tags: ["Trie", "Design", "String"],
    points: 150,
  }),

  // Day 107 - Q5
  createQuestion({
    title: "Stream of Characters",
    description:
      "Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings words. Implement the StreamChecker class with query method that returns true if any of the words is a suffix of the stream formed by the characters queried so far.",
    difficulty: "Hard",
    topicId: "107",
    examples: [
      {
        input: '["StreamChecker", "query", "query", "query", "query"]\\n[[["cd", "f", "kl"]], ["a"], ["b"], ["c"], ["d"]]',
        output: "[null, false, false, false, true]",
        explanation: "'cd' matches at the end of stream 'abcd'",
      },
    ],
    testCases: [
      { input: '["StreamChecker","query","query","query","query"], [[["cd","f","kl"]], ["a"], ["b"], ["c"], ["d"]]', expected: "[null,false,false,false,true]", isHidden: false },
      { input: '["StreamChecker","query","query"], [[["ab","ba","aaab"]], ["a"], ["a"]]', expected: "[null,false,false]", isHidden: true },
      { input: '["StreamChecker","query"], [[["abc"]], ["a"]]', expected: "[null,false]", isHidden: true },
      { input: '["StreamChecker","query","query","query"], [[["cd"]], ["c"], ["d"], ["e"]]', expected: "[null,false,true,false]", isHidden: true },
      { input: '["StreamChecker","query","query","query"], [[["abc","xyz"]], ["a"], ["x"], ["y"]]', expected: "[null,false,false,false]", isHidden: true },
    ],
    solution: `
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }
    
    class StreamChecker {
        TrieNode root;
        StringBuilder stream;
        int maxLen;
        
        public StreamChecker(String[] words) {
            root = new TrieNode();
            stream = new StringBuilder();
            maxLen = 0;
            
            // Build reversed Trie
            for (String word : words) {
                TrieNode curr = root;
                maxLen = Math.max(maxLen, word.length());
                
                // Insert word in reverse
                for (int i = word.length() - 1; i >= 0; i--) {
                    char c = word.charAt(i);
                    int idx = c - 'a';
                    if (curr.children[idx] == null) {
                        curr.children[idx] = new TrieNode();
                    }
                    curr = curr.children[idx];
                }
                curr.isEnd = true;
            }
        }
        
        public boolean query(char letter) {
            stream.append(letter);
            
            // Keep only last maxLen characters
            if (stream.length() > maxLen) {
                stream.deleteCharAt(0);
            }
            
            // Check suffix in reversed Trie
            TrieNode curr = root;
            for (int i = stream.length() - 1; i >= 0; i--) {
                char c = stream.charAt(i);
                int idx = c - 'a';
                
                if (curr.children[idx] == null) {
                    return false;
                }
                
                curr = curr.children[idx];
                if (curr.isEnd) {
                    return true;
                }
            }
            
            return false;
        }
    }
    
    // Time: O(m) per query where m = max word length
    // Space: O(n * m) where n = number of words
    `,
    hint: "Build Trie with reversed words. Check stream suffix by traversing Trie backwards.",
    tags: ["Trie", "Design", "String", "Data Stream"],
    points: 150,
  }),
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("✅ Connected to MongoDB");

    console.log("\n📝 Creating Topics...");
    for (const topic of topics) {
      const exists = await Topic.findOne({ id: topic.id });
      if (exists) {
        console.log(`⏭️  Exists: ${topic.title}`);
      } else {
        await Topic.create(topic);
        console.log(`✅ Created: ${topic.title}`);
      }
    }

    console.log("\n📝 Creating Questions...");
    let createdCount = 0;
    let skippedCount = 0;

    for (const question of questions) {
      const exists = await Question.findOne({ title: question.title });
      if (exists) {
        console.log(`⏭️  Exists: ${question.title}`);
        skippedCount++;
      } else {
        await Question.create(question);
        console.log(`✅ Created: ${question.title}`);
        createdCount++;
      }
    }

    console.log(
      `\n🎉 Days 106-107 processing complete! Created ${createdCount} questions, skipped ${skippedCount} existing`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
