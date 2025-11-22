export interface StudyDay {
  day: number;
  week: number;
  topic: string;
  compulsoryQuestion: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const studyDays: StudyDay[] = [
  // Week 1
  { day: 1, week: 1, topic: "Install Java + IDE, Basic Structure (class, main)", compulsoryQuestion: "Print your name & age", difficulty: "Easy" },
  { day: 2, week: 1, topic: "Variables, Data Types, Operators", compulsoryQuestion: "Add, subtract, multiply two numbers", difficulty: "Easy" },
  { day: 3, week: 1, topic: "Input with Scanner, Type Casting", compulsoryQuestion: "Simple interest calculator", difficulty: "Easy" },
  { day: 4, week: 1, topic: "If-else, Nested If", compulsoryQuestion: "Find largest of 3 numbers", difficulty: "Easy" },
  { day: 5, week: 1, topic: "Switch statement", compulsoryQuestion: "Calculator using switch", difficulty: "Easy" },
  { day: 6, week: 1, topic: "Loops (for, while, do-while)", compulsoryQuestion: "Print table of a number", difficulty: "Easy" },
  
  // Week 2
  { day: 7, week: 2, topic: "Methods (with/without return)", compulsoryQuestion: "Sum of two numbers using method", difficulty: "Easy" },
  { day: 8, week: 2, topic: "Method Overloading", compulsoryQuestion: "Area calculator (circle, square)", difficulty: "Medium" },
  { day: 9, week: 2, topic: "Arrays 1D", compulsoryQuestion: "Find max & min element", difficulty: "Easy" },
  { day: 10, week: 2, topic: "Arrays 2D", compulsoryQuestion: "Matrix addition", difficulty: "Medium" },
  { day: 11, week: 2, topic: "Enhanced for loop", compulsoryQuestion: "Reverse an array", difficulty: "Easy" },
  { day: 12, week: 2, topic: "Strings (concat, length, compare)", compulsoryQuestion: "Palindrome string", difficulty: "Medium" },
  
  // Week 3
  { day: 13, week: 3, topic: "Classes & Objects", compulsoryQuestion: "Create Student class", difficulty: "Easy" },
  { day: 14, week: 3, topic: "Constructors (default, parameterized)", compulsoryQuestion: "BankAccount class", difficulty: "Medium" },
  { day: 15, week: 3, topic: "this keyword", compulsoryQuestion: "Differentiate variable & parameter", difficulty: "Easy" },
  { day: 16, week: 3, topic: "Access Modifiers", compulsoryQuestion: "Secure Student data", difficulty: "Medium" },
  { day: 17, week: 3, topic: "static keyword", compulsoryQuestion: "Static counter for objects", difficulty: "Medium" },
  { day: 18, week: 3, topic: "Inheritance (extends)", compulsoryQuestion: "Vehicle Car", difficulty: "Medium" },
  
  // Week 4
  { day: 19, week: 4, topic: "Method Overriding", compulsoryQuestion: "Animal Dog sound", difficulty: "Medium" },
  { day: 20, week: 4, topic: "super keyword", compulsoryQuestion: "Call parent constructor", difficulty: "Medium" },
  { day: 21, week: 4, topic: "Polymorphism", compulsoryQuestion: "Shape area (Circle, Rectangle)", difficulty: "Medium" },
  { day: 22, week: 4, topic: "Abstraction (abstract class)", compulsoryQuestion: "Employee payroll", difficulty: "Hard" },
  { day: 23, week: 4, topic: "Interface", compulsoryQuestion: "Multiple payment methods", difficulty: "Hard" },
  { day: 24, week: 4, topic: "Encapsulation", compulsoryQuestion: "Secure password storage", difficulty: "Medium" },
  
  // Week 5
  { day: 25, week: 5, topic: "try, catch, finally", compulsoryQuestion: "Divide by zero handling", difficulty: "Easy" },
  { day: 26, week: 5, topic: "Multiple catch blocks", compulsoryQuestion: "Array index exception", difficulty: "Medium" },
  { day: 27, week: 5, topic: "throw & throws", compulsoryQuestion: "Custom exception for age", difficulty: "Medium" },
  { day: 28, week: 5, topic: "Custom exceptions", compulsoryQuestion: "Bank balance exception", difficulty: "Medium" },
  { day: 29, week: 5, topic: "ArrayList", compulsoryQuestion: "Add, remove, search elements", difficulty: "Easy" },
  { day: 30, week: 5, topic: "LinkedList", compulsoryQuestion: "Reverse linked list", difficulty: "Medium" },
  
  // Week 6
  { day: 31, week: 6, topic: "HashSet", compulsoryQuestion: "Remove duplicates", difficulty: "Medium" },
  { day: 32, week: 6, topic: "HashMap", compulsoryQuestion: "Student ID Name mapping", difficulty: "Medium" },
  { day: 33, week: 6, topic: "Iterator & for-each loop", compulsoryQuestion: "Iterate & display collection", difficulty: "Easy" },
  { day: 34, week: 6, topic: "Sorting with Collections.sort()", compulsoryQuestion: "Sort names alphabetically", difficulty: "Easy" },
  { day: 35, week: 6, topic: "Reading file (FileReader, BufferedReader)", compulsoryQuestion: "Display file content", difficulty: "Medium" },
  { day: 36, week: 6, topic: "Writing to file (FileWriter, BufferedWriter)", compulsoryQuestion: "Save user input to file", difficulty: "Medium" },
  
  // Week 7
  { day: 37, week: 7, topic: "Serialization", compulsoryQuestion: "Save object to file", difficulty: "Hard" },
  { day: 38, week: 7, topic: "Deserialization", compulsoryQuestion: "Load object from file", difficulty: "Hard" },
  { day: 39, week: 7, topic: "CRUD Operations", compulsoryQuestion: "Insert, update, delete", difficulty: "Hard" },
];

// Helper to generate 4 AI practice questions (Easy → Med → Med → Hard)
export const generatePracticeQuestions = (dayData: StudyDay) => {
  const { topic, compulsoryQuestion } = dayData;
  
  return [
    {
      id: `q1-day${dayData.day}`,
      title: compulsoryQuestion,
      difficulty: dayData.difficulty,
      isCompulsory: true,
      description: `Compulsory Question for Day ${dayData.day}: ${topic}`,
      examples: [
        { input: "// Write your code here", output: "// Expected output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // ${compulsoryQuestion}
        // Your code here
    }
}`
    },
    {
      id: `q2-day${dayData.day}`,
      title: `${topic} - Practice 1`,
      difficulty: "Easy",
      isCompulsory: false,
      description: `AI-generated easy practice question for ${topic}`,
      examples: [
        { input: "Example input", output: "Example output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    },
    {
      id: `q3-day${dayData.day}`,
      title: `${topic} - Practice 2`,
      difficulty: "Medium",
      isCompulsory: false,
      description: `AI-generated medium practice question for ${topic}`,
      examples: [
        { input: "Example input", output: "Example output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    },
    {
      id: `q4-day${dayData.day}`,
      title: `${topic} - Practice 3`,
      difficulty: "Medium",
      isCompulsory: false,
      description: `AI-generated medium practice question for ${topic}`,
      examples: [
        { input: "Example input", output: "Example output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    },
    {
      id: `q5-day${dayData.day}`,
      title: `${topic} - Practice 4`,
      difficulty: "Hard",
      isCompulsory: false,
      description: `AI-generated hard practice question for ${topic}`,
      examples: [
        { input: "Example input", output: "Example output" }
      ],
      starterCode: `public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`
    }
  ];
};
