import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question';
import Topic from '../models/Topic';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

interface QuestionContent {
  description: string;
  solution: string;
  examples: { input: string; output: string }[];
  testCases: { input: string; expectedOutput: string; isHidden: boolean; points: number }[];
}

// Generate content for Day 1: Introduction to Java
function generateDay1Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Write a Java program that prints 'Hello, World!' to the console.",
      solution: "public class Solution { public static void main(String[] args) { System.out.println(\"Hello, World!\"); } }",
      examples: [
        { input: "", output: "Hello, World!" },
        { input: "", output: "Hello, World!" }
      ],
      testCases: [
        { input: "", expectedOutput: "Hello, World!", isHidden: false, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: false, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: true, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: true, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: true, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: true, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: true, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: true, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: true, points: 10 },
        { input: "", expectedOutput: "Hello, World!", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Write a program that takes two integers as input and prints their sum.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a + b); } }",
      examples: [
        { input: "5\n3", output: "8" },
        { input: "10\n20", output: "30" }
      ],
      testCases: [
        { input: "5\n3", expectedOutput: "8", isHidden: false, points: 10 },
        { input: "10\n20", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "100\n50", expectedOutput: "150", isHidden: true, points: 10 },
        { input: "0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "7\n13", expectedOutput: "20", isHidden: true, points: 10 },
        { input: "999\n1", expectedOutput: "1000", isHidden: true, points: 10 },
        { input: "42\n58", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "500\n250", expectedOutput: "750", isHidden: true, points: 10 },
        { input: "123\n456", expectedOutput: "579", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Declare variables of different data types (int, double, char, boolean) and print them.",
      solution: "public class Solution { public static void main(String[] args) { int num = 42; double pi = 3.14; char letter = 'A'; boolean flag = true; System.out.println(num); System.out.println(pi); System.out.println(letter); System.out.println(flag); } }",
      examples: [
        { input: "", output: "42\n3.14\nA\ntrue" },
        { input: "", output: "42\n3.14\nA\ntrue" }
      ],
      testCases: [
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: false, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: false, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: true, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: true, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: true, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: true, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: true, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: true, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: true, points: 10 },
        { input: "", expectedOutput: "42\n3.14\nA\ntrue", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Write a program that prints your name and age.",
      solution: "public class Solution { public static void main(String[] args) { System.out.println(\"John Doe\"); System.out.println(25); } }",
      examples: [
        { input: "", output: "John Doe\n25" },
        { input: "", output: "John Doe\n25" }
      ],
      testCases: [
        { input: "", expectedOutput: "John Doe\n25", isHidden: false, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: false, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: true, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: true, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: true, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: true, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: true, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: true, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: true, points: 10 },
        { input: "", expectedOutput: "John Doe\n25", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Write a program that takes a string input and prints it back.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String str = sc.nextLine(); System.out.println(str); } }",
      examples: [
        { input: "Java Programming", output: "Java Programming" },
        { input: "Hello World", output: "Hello World" }
      ],
      testCases: [
        { input: "Java Programming", expectedOutput: "Java Programming", isHidden: false, points: 10 },
        { input: "Hello World", expectedOutput: "Hello World", isHidden: false, points: 10 },
        { input: "Test", expectedOutput: "Test", isHidden: true, points: 10 },
        { input: "12345", expectedOutput: "12345", isHidden: true, points: 10 },
        { input: "abc def ghi", expectedOutput: "abc def ghi", isHidden: true, points: 10 },
        { input: "Special!@#", expectedOutput: "Special!@#", isHidden: true, points: 10 },
        { input: "LongStringWithNoSpaces", expectedOutput: "LongStringWithNoSpaces", isHidden: true, points: 10 },
        { input: "a", expectedOutput: "a", isHidden: true, points: 10 },
        { input: "Multiple   Spaces", expectedOutput: "Multiple   Spaces", isHidden: true, points: 10 },
        { input: "END", expectedOutput: "END", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 2: Variables and Data Types
function generateDay2Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Write a program to swap two integer variables without using a third variable.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); a = a + b; b = a - b; a = a - b; System.out.println(a + \" \" + b); } }",
      examples: [
        { input: "5\n10", output: "10 5" },
        { input: "3\n7", output: "7 3" }
      ],
      testCases: [
        { input: "5\n10", expectedOutput: "10 5", isHidden: false, points: 10 },
        { input: "3\n7", expectedOutput: "7 3", isHidden: false, points: 10 },
        { input: "100\n200", expectedOutput: "200 100", isHidden: true, points: 10 },
        { input: "1\n2", expectedOutput: "2 1", isHidden: true, points: 10 },
        { input: "0\n50", expectedOutput: "50 0", isHidden: true, points: 10 },
        { input: "99\n1", expectedOutput: "1 99", isHidden: true, points: 10 },
        { input: "42\n58", expectedOutput: "58 42", isHidden: true, points: 10 },
        { input: "1000\n1", expectedOutput: "1 1000", isHidden: true, points: 10 },
        { input: "25\n75", expectedOutput: "75 25", isHidden: true, points: 10 },
        { input: "17\n31", expectedOutput: "31 17", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Write a program to find the maximum of two numbers using conditional operator.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int max = (a > b) ? a : b; System.out.println(max); } }",
      examples: [
        { input: "10\n20", output: "20" },
        { input: "50\n30", output: "50" }
      ],
      testCases: [
        { input: "10\n20", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "50\n30", expectedOutput: "50", isHidden: false, points: 10 },
        { input: "100\n100", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "1\n2", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "999\n1", expectedOutput: "999", isHidden: true, points: 10 },
        { input: "0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "42\n43", expectedOutput: "43", isHidden: true, points: 10 },
        { input: "500\n250", expectedOutput: "500", isHidden: true, points: 10 },
        { input: "7\n70", expectedOutput: "70", isHidden: true, points: 10 },
        { input: "88\n77", expectedOutput: "88", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Convert temperature from Celsius to Fahrenheit. Formula: F = (C * 9/5) + 32",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); double c = sc.nextDouble(); double f = (c * 9 / 5) + 32; System.out.println(f); } }",
      examples: [
        { input: "0", output: "32.0" },
        { input: "100", output: "212.0" }
      ],
      testCases: [
        { input: "0", expectedOutput: "32.0", isHidden: false, points: 10 },
        { input: "100", expectedOutput: "212.0", isHidden: false, points: 10 },
        { input: "37", expectedOutput: "98.6", isHidden: true, points: 10 },
        { input: "25", expectedOutput: "77.0", isHidden: true, points: 10 },
        { input: "50", expectedOutput: "122.0", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "50.0", isHidden: true, points: 10 },
        { input: "30", expectedOutput: "86.0", isHidden: true, points: 10 },
        { input: "20", expectedOutput: "68.0", isHidden: true, points: 10 },
        { input: "5", expectedOutput: "41.0", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "59.0", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Calculate the area of a circle. Take radius as input. Formula: Area = π * r * r (use 3.14159 for π)",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); double r = sc.nextDouble(); double area = 3.14159 * r * r; System.out.println(area); } }",
      examples: [
        { input: "5", output: "78.53975" },
        { input: "10", output: "314.159" }
      ],
      testCases: [
        { input: "5", expectedOutput: "78.53975", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "314.159", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "3.14159", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "153.93804", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "28.27431", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "12.56636", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "706.85775", isHidden: true, points: 10 },
        { input: "20", expectedOutput: "1256.636", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "201.06176", isHidden: true, points: 10 },
        { input: "12", expectedOutput: "452.38896", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a given integer is even or odd. Print 'Even' or 'Odd'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); if (n % 2 == 0) System.out.println(\"Even\"); else System.out.println(\"Odd\"); } }",
      examples: [
        { input: "4", output: "Even" },
        { input: "7", output: "Odd" }
      ],
      testCases: [
        { input: "4", expectedOutput: "Even", isHidden: false, points: 10 },
        { input: "7", expectedOutput: "Odd", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "Even", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "Odd", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "Even", isHidden: true, points: 10 },
        { input: "999", expectedOutput: "Odd", isHidden: true, points: 10 },
        { input: "42", expectedOutput: "Even", isHidden: true, points: 10 },
        { input: "13", expectedOutput: "Odd", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "Even", isHidden: true, points: 10 },
        { input: "55", expectedOutput: "Odd", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 3: Operators in Java
function generateDay3Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Write a program that takes two integers and performs all arithmetic operations (+, -, *, /, %).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a + b); System.out.println(a - b); System.out.println(a * b); System.out.println(a / b); System.out.println(a % b); } }",
      examples: [
        { input: "10\n3", output: "13\n7\n30\n3\n1" },
        { input: "20\n5", output: "25\n15\n100\n4\n0" }
      ],
      testCases: [
        { input: "10\n3", expectedOutput: "13\n7\n30\n3\n1", isHidden: false, points: 10 },
        { input: "20\n5", expectedOutput: "25\n15\n100\n4\n0", isHidden: false, points: 10 },
        { input: "100\n10", expectedOutput: "110\n90\n1000\n10\n0", isHidden: true, points: 10 },
        { input: "7\n2", expectedOutput: "9\n5\n14\n3\n1", isHidden: true, points: 10 },
        { input: "15\n4", expectedOutput: "19\n11\n60\n3\n3", isHidden: true, points: 10 },
        { input: "50\n7", expectedOutput: "57\n43\n350\n7\n1", isHidden: true, points: 10 },
        { input: "9\n3", expectedOutput: "12\n6\n27\n3\n0", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "2\n0\n1\n1\n0", isHidden: true, points: 10 },
        { input: "1000\n100", expectedOutput: "1100\n900\n100000\n10\n0", isHidden: true, points: 10 },
        { input: "13\n5", expectedOutput: "18\n8\n65\n2\n3", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Calculate simple interest. Formula: SI = (P * R * T) / 100. Take principal (P), rate (R), and time (T) as inputs.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); double p = sc.nextDouble(); double r = sc.nextDouble(); double t = sc.nextDouble(); double si = (p * r * t) / 100; System.out.println(si); } }",
      examples: [
        { input: "1000\n5\n2", output: "100.0" },
        { input: "5000\n10\n3", output: "1500.0" }
      ],
      testCases: [
        { input: "1000\n5\n2", expectedOutput: "100.0", isHidden: false, points: 10 },
        { input: "5000\n10\n3", expectedOutput: "1500.0", isHidden: false, points: 10 },
        { input: "2000\n8\n4", expectedOutput: "640.0", isHidden: true, points: 10 },
        { input: "10000\n7\n5", expectedOutput: "3500.0", isHidden: true, points: 10 },
        { input: "500\n2\n1", expectedOutput: "10.0", isHidden: true, points: 10 },
        { input: "1500\n6\n2", expectedOutput: "180.0", isHidden: true, points: 10 },
        { input: "3000\n4.5\n3", expectedOutput: "405.0", isHidden: true, points: 10 },
        { input: "7500\n9\n2", expectedOutput: "1350.0", isHidden: true, points: 10 },
        { input: "0\n10\n5", expectedOutput: "0.0", isHidden: true, points: 10 },
        { input: "1234\n5.67\n8.9", expectedOutput: "622.20126", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a number is divisible by both 3 and 5. Print 'Yes' if true, else 'No'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); if (n % 3 == 0 && n % 5 == 0) System.out.println(\"Yes\"); else System.out.println(\"No\"); } }",
      examples: [
        { input: "15", output: "Yes" },
        { input: "10", output: "No" }
      ],
      testCases: [
        { input: "15", expectedOutput: "Yes", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "No", isHidden: false, points: 10 },
        { input: "30", expectedOutput: "Yes", isHidden: true, points: 10 },
        { input: "45", expectedOutput: "Yes", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "No", isHidden: true, points: 10 },
        { input: "5", expectedOutput: "No", isHidden: true, points: 10 },
        { input: "60", expectedOutput: "Yes", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "No", isHidden: true, points: 10 },
        { input: "0", expectedOutput: "Yes", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "No", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Implement a bitwise XOR operation on two integers and print the result.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a ^ b); } }",
      examples: [
        { input: "5\n3", output: "6" },
        { input: "10\n7", output: "13" }
      ],
      testCases: [
        { input: "5\n3", expectedOutput: "6", isHidden: false, points: 10 },
        { input: "10\n7", expectedOutput: "13", isHidden: false, points: 10 },
        { input: "15\n15", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "8\n4", expectedOutput: "12", isHidden: true, points: 10 },
        { input: "0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "12\n5", expectedOutput: "9", isHidden: true, points: 10 },
        { input: "255\n0", expectedOutput: "255", isHidden: true, points: 10 },
        { input: "100\n50", expectedOutput: "86", isHidden: true, points: 10 },
        { input: "7\n14", expectedOutput: "9", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a number is positive, negative, or zero. Print 'Positive', 'Negative', or 'Zero'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); if (n > 0) System.out.println(\"Positive\"); else if (n < 0) System.out.println(\"Negative\"); else System.out.println(\"Zero\"); } }",
      examples: [
        { input: "5", output: "Positive" },
        { input: "-3", output: "Negative" }
      ],
      testCases: [
        { input: "5", expectedOutput: "Positive", isHidden: false, points: 10 },
        { input: "-3", expectedOutput: "Negative", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "Zero", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "Positive", isHidden: true, points: 10 },
        { input: "-100", expectedOutput: "Negative", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "Positive", isHidden: true, points: 10 },
        { input: "-1", expectedOutput: "Negative", isHidden: true, points: 10 },
        { input: "999", expectedOutput: "Positive", isHidden: true, points: 10 },
        { input: "-999", expectedOutput: "Negative", isHidden: true, points: 10 },
        { input: "42", expectedOutput: "Positive", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 4: Control Flow Statements
function generateDay4Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Write a program to find the largest of three numbers using if-else statements.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int c = sc.nextInt(); int max = a; if (b > max) max = b; if (c > max) max = c; System.out.println(max); } }",
      examples: [
        { input: "10\n20\n15", output: "20" },
        { input: "5\n3\n8", output: "8" }
      ],
      testCases: [
        { input: "10\n20\n15", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "5\n3\n8", expectedOutput: "8", isHidden: false, points: 10 },
        { input: "100\n50\n75", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "1\n1\n1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "7\n14\n3", expectedOutput: "14", isHidden: true, points: 10 },
        { input: "99\n98\n97", expectedOutput: "99", isHidden: true, points: 10 },
        { input: "0\n0\n1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "42\n42\n41", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "500\n250\n750", expectedOutput: "750", isHidden: true, points: 10 },
        { input: "33\n44\n55", expectedOutput: "55", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a year is a leap year. Print 'Leap Year' or 'Not Leap Year'. A year is leap if divisible by 4 but not by 100, except if divisible by 400.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int year = sc.nextInt(); if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) System.out.println(\"Leap Year\"); else System.out.println(\"Not Leap Year\"); } }",
      examples: [
        { input: "2020", output: "Leap Year" },
        { input: "2021", output: "Not Leap Year" }
      ],
      testCases: [
        { input: "2020", expectedOutput: "Leap Year", isHidden: false, points: 10 },
        { input: "2021", expectedOutput: "Not Leap Year", isHidden: false, points: 10 },
        { input: "2000", expectedOutput: "Leap Year", isHidden: true, points: 10 },
        { input: "1900", expectedOutput: "Not Leap Year", isHidden: true, points: 10 },
        { input: "2024", expectedOutput: "Leap Year", isHidden: true, points: 10 },
        { input: "2100", expectedOutput: "Not Leap Year", isHidden: true, points: 10 },
        { input: "2400", expectedOutput: "Leap Year", isHidden: true, points: 10 },
        { input: "2019", expectedOutput: "Not Leap Year", isHidden: true, points: 10 },
        { input: "2016", expectedOutput: "Leap Year", isHidden: true, points: 10 },
        { input: "1800", expectedOutput: "Not Leap Year", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Write a program to print the grade based on marks: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int marks = sc.nextInt(); if (marks >= 90) System.out.println(\"A\"); else if (marks >= 80) System.out.println(\"B\"); else if (marks >= 70) System.out.println(\"C\"); else if (marks >= 60) System.out.println(\"D\"); else System.out.println(\"F\"); } }",
      examples: [
        { input: "95", output: "A" },
        { input: "75", output: "C" }
      ],
      testCases: [
        { input: "95", expectedOutput: "A", isHidden: false, points: 10 },
        { input: "75", expectedOutput: "C", isHidden: false, points: 10 },
        { input: "100", expectedOutput: "A", isHidden: true, points: 10 },
        { input: "90", expectedOutput: "A", isHidden: true, points: 10 },
        { input: "85", expectedOutput: "B", isHidden: true, points: 10 },
        { input: "70", expectedOutput: "C", isHidden: true, points: 10 },
        { input: "65", expectedOutput: "D", isHidden: true, points: 10 },
        { input: "55", expectedOutput: "F", isHidden: true, points: 10 },
        { input: "0", expectedOutput: "F", isHidden: true, points: 10 },
        { input: "80", expectedOutput: "B", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Write a program using switch-case to print the day name based on day number (1=Monday, 2=Tuesday, ..., 7=Sunday).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int day = sc.nextInt(); switch(day) { case 1: System.out.println(\"Monday\"); break; case 2: System.out.println(\"Tuesday\"); break; case 3: System.out.println(\"Wednesday\"); break; case 4: System.out.println(\"Thursday\"); break; case 5: System.out.println(\"Friday\"); break; case 6: System.out.println(\"Saturday\"); break; case 7: System.out.println(\"Sunday\"); break; default: System.out.println(\"Invalid\"); } } }",
      examples: [
        { input: "1", output: "Monday" },
        { input: "5", output: "Friday" }
      ],
      testCases: [
        { input: "1", expectedOutput: "Monday", isHidden: false, points: 10 },
        { input: "5", expectedOutput: "Friday", isHidden: false, points: 10 },
        { input: "7", expectedOutput: "Sunday", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "Wednesday", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "Tuesday", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "Saturday", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "Thursday", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "Invalid", isHidden: true, points: 10 },
        { input: "0", expectedOutput: "Invalid", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "Invalid", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a character is a vowel or consonant. Print 'Vowel' or 'Consonant'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); char ch = sc.next().charAt(0); ch = Character.toLowerCase(ch); if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') System.out.println(\"Vowel\"); else System.out.println(\"Consonant\"); } }",
      examples: [
        { input: "a", output: "Vowel" },
        { input: "b", output: "Consonant" }
      ],
      testCases: [
        { input: "a", expectedOutput: "Vowel", isHidden: false, points: 10 },
        { input: "b", expectedOutput: "Consonant", isHidden: false, points: 10 },
        { input: "e", expectedOutput: "Vowel", isHidden: true, points: 10 },
        { input: "z", expectedOutput: "Consonant", isHidden: true, points: 10 },
        { input: "i", expectedOutput: "Vowel", isHidden: true, points: 10 },
        { input: "o", expectedOutput: "Vowel", isHidden: true, points: 10 },
        { input: "u", expectedOutput: "Vowel", isHidden: true, points: 10 },
        { input: "m", expectedOutput: "Consonant", isHidden: true, points: 10 },
        { input: "A", expectedOutput: "Vowel", isHidden: true, points: 10 },
        { input: "Z", expectedOutput: "Consonant", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 5: Loops in Java
function generateDay5Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Print numbers from 1 to N using a for loop.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); for (int i = 1; i <= n; i++) { System.out.println(i); } } }",
      examples: [
        { input: "5", output: "1\n2\n3\n4\n5" },
        { input: "3", output: "1\n2\n3" }
      ],
      testCases: [
        { input: "5", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 },
        { input: "3", expectedOutput: "1\n2\n3", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "1\n2\n3\n4\n5\n6\n7", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "1\n2", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "1\n2\n3\n4", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "1\n2\n3\n4\n5\n6", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Calculate the factorial of a number N.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); long factorial = 1; for (int i = 1; i <= n; i++) { factorial *= i; } System.out.println(factorial); } }",
      examples: [
        { input: "5", output: "120" },
        { input: "3", output: "6" }
      ],
      testCases: [
        { input: "5", expectedOutput: "120", isHidden: false, points: 10 },
        { input: "3", expectedOutput: "6", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "24", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "720", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "5040", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "3628800", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "40320", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Print the Fibonacci series up to N terms.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int a = 0, b = 1; for (int i = 1; i <= n; i++) { System.out.println(a); int next = a + b; a = b; b = next; } } }",
      examples: [
        { input: "5", output: "0\n1\n1\n2\n3" },
        { input: "7", output: "0\n1\n1\n2\n3\n5\n8" }
      ],
      testCases: [
        { input: "5", expectedOutput: "0\n1\n1\n2\n3", isHidden: false, points: 10 },
        { input: "7", expectedOutput: "0\n1\n1\n2\n3\n5\n8", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "0\n1", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "0\n1\n1\n2\n3\n5\n8\n13\n21\n34", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "0\n1\n1", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "0\n1\n1\n2\n3\n5\n8\n13", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "0\n1\n1\n2", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "0\n1\n1\n2\n3\n5", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "0\n1\n1\n2\n3\n5\n8\n13\n21", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a number is prime. Print 'Prime' or 'Not Prime'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); if (n <= 1) { System.out.println(\"Not Prime\"); return; } boolean isPrime = true; for (int i = 2; i <= Math.sqrt(n); i++) { if (n % i == 0) { isPrime = false; break; } } if (isPrime) System.out.println(\"Prime\"); else System.out.println(\"Not Prime\"); } }",
      examples: [
        { input: "7", output: "Prime" },
        { input: "10", output: "Not Prime" }
      ],
      testCases: [
        { input: "7", expectedOutput: "Prime", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "Not Prime", isHidden: false, points: 10 },
        { input: "2", expectedOutput: "Prime", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "Not Prime", isHidden: true, points: 10 },
        { input: "17", expectedOutput: "Prime", isHidden: true, points: 10 },
        { input: "20", expectedOutput: "Not Prime", isHidden: true, points: 10 },
        { input: "29", expectedOutput: "Prime", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "Not Prime", isHidden: true, points: 10 },
        { input: "97", expectedOutput: "Prime", isHidden: true, points: 10 },
        { input: "50", expectedOutput: "Not Prime", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Print the sum of digits of a number.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int sum = 0; while (n > 0) { sum += n % 10; n /= 10; } System.out.println(sum); } }",
      examples: [
        { input: "123", output: "6" },
        { input: "456", output: "15" }
      ],
      testCases: [
        { input: "123", expectedOutput: "6", isHidden: false, points: 10 },
        { input: "456", expectedOutput: "15", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "9", isHidden: true, points: 10 },
        { input: "999", expectedOutput: "27", isHidden: true, points: 10 },
        { input: "1234", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "5555", expectedOutput: "20", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "7890", expectedOutput: "24", isHidden: true, points: 10 },
        { input: "1111", expectedOutput: "4", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 6: Arrays and ArrayList
function generateDay6Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Find the largest element in an array of integers.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] arr = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); int max = arr[0]; for (int i = 1; i < n; i++) { if (arr[i] > max) max = arr[i]; } System.out.println(max); } }",
      examples: [
        { input: "5\n10\n20\n5\n30\n15", output: "30" },
        { input: "3\n7\n3\n9", output: "9" }
      ],
      testCases: [
        { input: "5\n10\n20\n5\n30\n15", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "3\n7\n3\n9", expectedOutput: "9", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "6\n100\n50\n75\n25\n90\n60", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "2\n5\n5", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "77", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "5\n99\n98\n97\n96\n95", expectedOutput: "99", isHidden: true, points: 10 },
        { input: "4\n15\n25\n35\n45", expectedOutput: "45", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Calculate the sum of all elements in an array.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] arr = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); int sum = 0; for (int i = 0; i < n; i++) sum += arr[i]; System.out.println(sum); } }",
      examples: [
        { input: "5\n1\n2\n3\n4\n5", output: "15" },
        { input: "3\n10\n20\n30", output: "60" }
      ],
      testCases: [
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "15", isHidden: false, points: 10 },
        { input: "3\n10\n20\n30", expectedOutput: "60", isHidden: false, points: 10 },
        { input: "1\n100", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "4\n0\n0\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "6\n5\n10\n15\n20\n25\n30", expectedOutput: "105", isHidden: true, points: 10 },
        { input: "2\n50\n50", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "7\n1\n1\n1\n1\n1\n1\n1", expectedOutput: "7", isHidden: true, points: 10 },
        { input: "3\n100\n200\n300", expectedOutput: "600", isHidden: true, points: 10 },
        { input: "5\n7\n14\n21\n28\n35", expectedOutput: "105", isHidden: true, points: 10 },
        { input: "4\n25\n25\n25\n25", expectedOutput: "100", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Reverse an array and print the reversed array.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] arr = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); for (int i = n - 1; i >= 0; i--) { System.out.println(arr[i]); } } }",
      examples: [
        { input: "5\n1\n2\n3\n4\n5", output: "5\n4\n3\n2\n1" },
        { input: "3\n10\n20\n30", output: "30\n20\n10" }
      ],
      testCases: [
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "5\n4\n3\n2\n1", isHidden: false, points: 10 },
        { input: "3\n10\n20\n30", expectedOutput: "30\n20\n10", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "2\n7\n8", expectedOutput: "8\n7", isHidden: true, points: 10 },
        { input: "4\n100\n200\n300\n400", expectedOutput: "400\n300\n200\n100", isHidden: true, points: 10 },
        { input: "6\n1\n2\n3\n4\n5\n6", expectedOutput: "6\n5\n4\n3\n2\n1", isHidden: true, points: 10 },
        { input: "3\n5\n5\n5", expectedOutput: "5\n5\n5", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "77\n66\n55\n44\n33\n22\n11", isHidden: true, points: 10 },
        { input: "2\n0\n1", expectedOutput: "1\n0", isHidden: true, points: 10 },
        { input: "4\n9\n8\n7\n6", expectedOutput: "6\n7\n8\n9", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Search for an element in an array using linear search. Print its index (0-based) if found, else print -1.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] arr = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); int target = sc.nextInt(); int index = -1; for (int i = 0; i < n; i++) { if (arr[i] == target) { index = i; break; } } System.out.println(index); } }",
      examples: [
        { input: "5\n10\n20\n30\n40\n50\n30", output: "2" },
        { input: "3\n1\n2\n3\n5", output: "-1" }
      ],
      testCases: [
        { input: "5\n10\n20\n30\n40\n50\n30", expectedOutput: "2", isHidden: false, points: 10 },
        { input: "3\n1\n2\n3\n5", expectedOutput: "-1", isHidden: false, points: 10 },
        { input: "1\n42\n42", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "4\n7\n8\n9\n10\n7", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "6\n5\n10\n15\n20\n25\n30\n20", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "2\n1\n1\n2", expectedOutput: "-1", isHidden: true, points: 10 },
        { input: "5\n100\n200\n300\n400\n500\n500", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0\n1", expectedOutput: "-1", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77\n44", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "4\n9\n8\n7\n6\n10", expectedOutput: "-1", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Count the frequency of a given element in an array.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] arr = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); int target = sc.nextInt(); int count = 0; for (int i = 0; i < n; i++) { if (arr[i] == target) count++; } System.out.println(count); } }",
      examples: [
        { input: "6\n1\n2\n3\n1\n1\n4\n1", output: "3" },
        { input: "5\n5\n5\n5\n5\n5\n5", output: "5" }
      ],
      testCases: [
        { input: "6\n1\n2\n3\n1\n1\n4\n1", expectedOutput: "3", isHidden: false, points: 10 },
        { input: "5\n5\n5\n5\n5\n5\n5", expectedOutput: "5", isHidden: false, points: 10 },
        { input: "1\n42\n42", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "3\n1\n2\n3\n4", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "7\n10\n20\n10\n30\n10\n40\n50\n10", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "4\n0\n0\n0\n0\n0", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "5\n7\n7\n8\n7\n9\n7", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "2\n1\n2\n3", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "8\n5\n5\n5\n6\n6\n6\n7\n7\n5", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "3\n100\n200\n300\n200", expectedOutput: "1", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 7: Exception Handling
function generateDay7Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Write a program to handle ArithmeticException when dividing two numbers. Read two integers and print their division result. If division by zero occurs, print 'Cannot divide by zero'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); try { int a = sc.nextInt(); int b = sc.nextInt(); int result = a / b; System.out.println(result); } catch (ArithmeticException e) { System.out.println(\"Cannot divide by zero\"); } } }",
      examples: [
        { input: "10\n2", output: "5" },
        { input: "10\n0", output: "Cannot divide by zero" }
      ],
      testCases: [
        { input: "10\n2", expectedOutput: "5", isHidden: false, points: 10 },
        { input: "10\n0", expectedOutput: "Cannot divide by zero", isHidden: false, points: 10 },
        { input: "100\n10", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "7\n3", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "50\n5", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "99\n0", expectedOutput: "Cannot divide by zero", isHidden: true, points: 10 },
        { input: "0\n5", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "1000\n10", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "15\n0", expectedOutput: "Cannot divide by zero", isHidden: true, points: 10 },
        { input: "81\n9", expectedOutput: "9", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Handle NumberFormatException when parsing a string to integer. Read a string and try to parse it. Print the integer if successful, otherwise print 'Invalid number format'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); try { String str = sc.nextLine(); int num = Integer.parseInt(str); System.out.println(num); } catch (NumberFormatException e) { System.out.println(\"Invalid number format\"); } } }",
      examples: [
        { input: "123", output: "123" },
        { input: "abc", output: "Invalid number format" }
      ],
      testCases: [
        { input: "123", expectedOutput: "123", isHidden: false, points: 10 },
        { input: "abc", expectedOutput: "Invalid number format", isHidden: false, points: 10 },
        { input: "456", expectedOutput: "456", isHidden: true, points: 10 },
        { input: "12.5", expectedOutput: "Invalid number format", isHidden: true, points: 10 },
        { input: "0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "hello", expectedOutput: "Invalid number format", isHidden: true, points: 10 },
        { input: "-50", expectedOutput: "-50", isHidden: true, points: 10 },
        { input: "99a", expectedOutput: "Invalid number format", isHidden: true, points: 10 },
        { input: "1000", expectedOutput: "1000", isHidden: true, points: 10 },
        { input: " 123", expectedOutput: "123", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Write a program that uses multiple catch blocks to handle ArrayIndexOutOfBoundsException and ArithmeticException. Read array size, elements, index to access, and a divisor. Print arr[index]/divisor or appropriate error message.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); try { int n = sc.nextInt(); int[] arr = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); int index = sc.nextInt(); int divisor = sc.nextInt(); int result = arr[index] / divisor; System.out.println(result); } catch (ArrayIndexOutOfBoundsException e) { System.out.println(\"Index out of bounds\"); } catch (ArithmeticException e) { System.out.println(\"Cannot divide by zero\"); } } }",
      examples: [
        { input: "3\n10\n20\n30\n1\n2", output: "10" },
        { input: "3\n10\n20\n30\n5\n2", output: "Index out of bounds" }
      ],
      testCases: [
        { input: "3\n10\n20\n30\n1\n2", expectedOutput: "10", isHidden: false, points: 10 },
        { input: "3\n10\n20\n30\n5\n2", expectedOutput: "Index out of bounds", isHidden: false, points: 10 },
        { input: "2\n50\n100\n0\n5", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "4\n8\n16\n24\n32\n2\n0", expectedOutput: "Cannot divide by zero", isHidden: true, points: 10 },
        { input: "3\n15\n25\n35\n-1\n5", expectedOutput: "Index out of bounds", isHidden: true, points: 10 },
        { input: "5\n5\n10\n15\n20\n25\n4\n5", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "2\n100\n200\n2\n10", expectedOutput: "Index out of bounds", isHidden: true, points: 10 },
        { input: "3\n9\n18\n27\n1\n0", expectedOutput: "Cannot divide by zero", isHidden: true, points: 10 },
        { input: "1\n42\n0\n7", expectedOutput: "6", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4\n10\n1", expectedOutput: "Index out of bounds", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a custom exception called NegativeNumberException and throw it when a negative number is entered. Read a number and print 'Valid' if positive, otherwise throw the custom exception with message 'Negative number not allowed'.",
      solution: "import java.util.Scanner; class NegativeNumberException extends Exception { public NegativeNumberException(String message) { super(message); } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); try { int num = sc.nextInt(); if (num < 0) throw new NegativeNumberException(\"Negative number not allowed\"); System.out.println(\"Valid\"); } catch (NegativeNumberException e) { System.out.println(e.getMessage()); } } }",
      examples: [
        { input: "10", output: "Valid" },
        { input: "-5", output: "Negative number not allowed" }
      ],
      testCases: [
        { input: "10", expectedOutput: "Valid", isHidden: false, points: 10 },
        { input: "-5", expectedOutput: "Negative number not allowed", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "Valid", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "Valid", isHidden: true, points: 10 },
        { input: "-1", expectedOutput: "Negative number not allowed", isHidden: true, points: 10 },
        { input: "50", expectedOutput: "Valid", isHidden: true, points: 10 },
        { input: "-100", expectedOutput: "Negative number not allowed", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "Valid", isHidden: true, points: 10 },
        { input: "-999", expectedOutput: "Negative number not allowed", isHidden: true, points: 10 },
        { input: "999", expectedOutput: "Valid", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate finally block usage. Read two numbers, divide them in try block, handle exception in catch, and print 'Execution completed' in finally block.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); try { int a = sc.nextInt(); int b = sc.nextInt(); int result = a / b; System.out.println(result); } catch (ArithmeticException e) { System.out.println(\"Cannot divide by zero\"); } finally { System.out.println(\"Execution completed\"); } } }",
      examples: [
        { input: "10\n2", output: "5\nExecution completed" },
        { input: "10\n0", output: "Cannot divide by zero\nExecution completed" }
      ],
      testCases: [
        { input: "10\n2", expectedOutput: "5\nExecution completed", isHidden: false, points: 10 },
        { input: "10\n0", expectedOutput: "Cannot divide by zero\nExecution completed", isHidden: false, points: 10 },
        { input: "20\n4", expectedOutput: "5\nExecution completed", isHidden: true, points: 10 },
        { input: "100\n0", expectedOutput: "Cannot divide by zero\nExecution completed", isHidden: true, points: 10 },
        { input: "50\n10", expectedOutput: "5\nExecution completed", isHidden: true, points: 10 },
        { input: "7\n0", expectedOutput: "Cannot divide by zero\nExecution completed", isHidden: true, points: 10 },
        { input: "99\n11", expectedOutput: "9\nExecution completed", isHidden: true, points: 10 },
        { input: "0\n5", expectedOutput: "0\nExecution completed", isHidden: true, points: 10 },
        { input: "8\n0", expectedOutput: "Cannot divide by zero\nExecution completed", isHidden: true, points: 10 },
        { input: "81\n9", expectedOutput: "9\nExecution completed", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 8: File Handling
function generateDay8Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Write a program to write a string to a file named 'output.txt'. Read a string from input and write it to the file, then print 'File written successfully'.",
      solution: "import java.io.*; import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); try { String content = sc.nextLine(); FileWriter writer = new FileWriter(\"output.txt\"); writer.write(content); writer.close(); System.out.println(\"File written successfully\"); } catch (IOException e) { System.out.println(\"Error writing file\"); } } }",
      examples: [
        { input: "Hello World", output: "File written successfully" },
        { input: "Java Programming", output: "File written successfully" }
      ],
      testCases: [
        { input: "Hello World", expectedOutput: "File written successfully", isHidden: false, points: 10 },
        { input: "Java Programming", expectedOutput: "File written successfully", isHidden: false, points: 10 },
        { input: "Test", expectedOutput: "File written successfully", isHidden: true, points: 10 },
        { input: "File Handling", expectedOutput: "File written successfully", isHidden: true, points: 10 },
        { input: "ABC", expectedOutput: "File written successfully", isHidden: true, points: 10 },
        { input: "Learning Java", expectedOutput: "File written successfully", isHidden: true, points: 10 },
        { input: "1234567890", expectedOutput: "File written successfully", isHidden: true, points: 10 },
        { input: "Code", expectedOutput: "File written successfully", isHidden: true, points: 10 },
        { input: "Sample Text", expectedOutput: "File written successfully", isHidden: true, points: 10 },
        { input: "X", expectedOutput: "File written successfully", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Read content from a file named 'input.txt' and print it. For testing purposes, assume the file contains the input string. Just echo the input.",
      solution: "import java.io.*; import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String content = sc.nextLine(); System.out.println(content); } }",
      examples: [
        { input: "Hello from file", output: "Hello from file" },
        { input: "Java", output: "Java" }
      ],
      testCases: [
        { input: "Hello from file", expectedOutput: "Hello from file", isHidden: false, points: 10 },
        { input: "Java", expectedOutput: "Java", isHidden: false, points: 10 },
        { input: "Reading files", expectedOutput: "Reading files", isHidden: true, points: 10 },
        { input: "Test content", expectedOutput: "Test content", isHidden: true, points: 10 },
        { input: "File IO", expectedOutput: "File IO", isHidden: true, points: 10 },
        { input: "Sample", expectedOutput: "Sample", isHidden: true, points: 10 },
        { input: "BufferedReader", expectedOutput: "BufferedReader", isHidden: true, points: 10 },
        { input: "Line 1", expectedOutput: "Line 1", isHidden: true, points: 10 },
        { input: "Data", expectedOutput: "Data", isHidden: true, points: 10 },
        { input: "Text", expectedOutput: "Text", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Copy content from one string to another and print the copied content. Read a string and print it back.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String source = sc.nextLine(); String destination = source; System.out.println(destination); } }",
      examples: [
        { input: "Copy this text", output: "Copy this text" },
        { input: "File operations", output: "File operations" }
      ],
      testCases: [
        { input: "Copy this text", expectedOutput: "Copy this text", isHidden: false, points: 10 },
        { input: "File operations", expectedOutput: "File operations", isHidden: false, points: 10 },
        { input: "Copying content", expectedOutput: "Copying content", isHidden: true, points: 10 },
        { input: "Source to destination", expectedOutput: "Source to destination", isHidden: true, points: 10 },
        { input: "Clone", expectedOutput: "Clone", isHidden: true, points: 10 },
        { input: "Duplicate", expectedOutput: "Duplicate", isHidden: true, points: 10 },
        { input: "Mirror", expectedOutput: "Mirror", isHidden: true, points: 10 },
        { input: "Replicate", expectedOutput: "Replicate", isHidden: true, points: 10 },
        { input: "Transfer", expectedOutput: "Transfer", isHidden: true, points: 10 },
        { input: "Backup", expectedOutput: "Backup", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Count the number of words in a given text. Read a line and print the word count (words are separated by spaces).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String line = sc.nextLine(); if (line.trim().isEmpty()) { System.out.println(0); } else { String[] words = line.trim().split(\"\\\\s+\"); System.out.println(words.length); } } }",
      examples: [
        { input: "Hello World Java", output: "3" },
        { input: "Count the words", output: "3" }
      ],
      testCases: [
        { input: "Hello World Java", expectedOutput: "3", isHidden: false, points: 10 },
        { input: "Count the words", expectedOutput: "3", isHidden: false, points: 10 },
        { input: "One", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "Two Words", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "This is a test sentence", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "Java Programming Language", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "A B C D", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "Single", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "One Two Three Four Five Six", expectedOutput: "6", isHidden: true, points: 10 },
        { input: "File handling in Java", expectedOutput: "4", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Read multiple lines until 'END' is entered and count total lines. Print the count (excluding the END line).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int count = 0; while (true) { String line = sc.nextLine(); if (line.equals(\"END\")) break; count++; } System.out.println(count); } }",
      examples: [
        { input: "Line 1\nLine 2\nEND", output: "2" },
        { input: "First\nSecond\nThird\nEND", output: "3" }
      ],
      testCases: [
        { input: "Line 1\nLine 2\nEND", expectedOutput: "2", isHidden: false, points: 10 },
        { input: "First\nSecond\nThird\nEND", expectedOutput: "3", isHidden: false, points: 10 },
        { input: "END", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "Only one\nEND", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "A\nB\nC\nD\nEND", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "Hello\nWorld\nJava\nProgramming\nEND", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "Line\nEND", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "1\n2\n3\n4\n5\nEND", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "Test\nEND", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "A\nB\nEND", expectedOutput: "2", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 9: Collections Framework
function generateDay9Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Create an ArrayList of integers, add elements from input, and print all elements. Read n, then n integers, and print them line by line.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); ArrayList<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } for (int num : list) { System.out.println(num); } } }",
      examples: [
        { input: "3\n10\n20\n30", output: "10\n20\n30" },
        { input: "5\n1\n2\n3\n4\n5", output: "1\n2\n3\n4\n5" }
      ],
      testCases: [
        { input: "3\n10\n20\n30", expectedOutput: "10\n20\n30", isHidden: false, points: 10 },
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "2\n100\n200", expectedOutput: "100\n200", isHidden: true, points: 10 },
        { input: "4\n5\n10\n15\n20", expectedOutput: "5\n10\n15\n20", isHidden: true, points: 10 },
        { input: "6\n7\n14\n21\n28\n35\n42", expectedOutput: "7\n14\n21\n28\n35\n42", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0\n0\n0", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "11\n22\n33\n44\n55\n66\n77", isHidden: true, points: 10 },
        { input: "2\n50\n50", expectedOutput: "50\n50", isHidden: true, points: 10 },
        { input: "4\n9\n8\n7\n6", expectedOutput: "9\n8\n7\n6", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use HashSet to remove duplicates from a list. Read n integers and print unique elements in the order they appear.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); LinkedHashSet<Integer> set = new LinkedHashSet<>(); for (int i = 0; i < n; i++) { set.add(sc.nextInt()); } for (int num : set) { System.out.println(num); } } }",
      examples: [
        { input: "5\n1\n2\n1\n3\n2", output: "1\n2\n3" },
        { input: "6\n10\n20\n10\n30\n20\n40", output: "10\n20\n30\n40" }
      ],
      testCases: [
        { input: "5\n1\n2\n1\n3\n2", expectedOutput: "1\n2\n3", isHidden: false, points: 10 },
        { input: "6\n10\n20\n10\n30\n20\n40", expectedOutput: "10\n20\n30\n40", isHidden: false, points: 10 },
        { input: "3\n5\n5\n5", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4", expectedOutput: "1\n2\n3\n4", isHidden: true, points: 10 },
        { input: "7\n7\n8\n7\n9\n8\n10\n7", expectedOutput: "7\n8\n9\n10", isHidden: true, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "5\n100\n200\n100\n200\n300", expectedOutput: "100\n200\n300", isHidden: true, points: 10 },
        { input: "8\n1\n1\n2\n2\n3\n3\n4\n4", expectedOutput: "1\n2\n3\n4", isHidden: true, points: 10 },
        { input: "2\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "6\n5\n10\n5\n15\n10\n20", expectedOutput: "5\n10\n15\n20", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a HashMap to store student names and their marks. Read n, then n pairs of name and marks. Print each name with marks in format 'name: marks'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); HashMap<String, Integer> map = new HashMap<>(); for (int i = 0; i < n; i++) { String name = sc.next(); int marks = sc.nextInt(); map.put(name, marks); } for (Map.Entry<String, Integer> entry : map.entrySet()) { System.out.println(entry.getKey() + \": \" + entry.getValue()); } } }",
      examples: [
        { input: "2\nAlice\n90\nBob\n85", output: "Alice: 90\nBob: 85" },
        { input: "3\nJohn\n75\nJane\n80\nJack\n70", output: "John: 75\nJane: 80\nJack: 70" }
      ],
      testCases: [
        { input: "2\nAlice\n90\nBob\n85", expectedOutput: "Alice: 90\nBob: 85", isHidden: false, points: 10 },
        { input: "3\nJohn\n75\nJane\n80\nJack\n70", expectedOutput: "John: 75\nJane: 80\nJack: 70", isHidden: false, points: 10 },
        { input: "1\nTom\n100", expectedOutput: "Tom: 100", isHidden: true, points: 10 },
        { input: "2\nAmy\n95\nBen\n88", expectedOutput: "Amy: 95\nBen: 88", isHidden: true, points: 10 },
        { input: "4\nA\n10\nB\n20\nC\n30\nD\n40", expectedOutput: "A: 10\nB: 20\nC: 30\nD: 40", isHidden: true, points: 10 },
        { input: "3\nX\n50\nY\n60\nZ\n70", expectedOutput: "X: 50\nY: 60\nZ: 70", isHidden: true, points: 10 },
        { input: "2\nSam\n65\nSue\n72", expectedOutput: "Sam: 65\nSue: 72", isHidden: true, points: 10 },
        { input: "1\nEve\n99", expectedOutput: "Eve: 99", isHidden: true, points: 10 },
        { input: "3\nP\n11\nQ\n22\nR\n33", expectedOutput: "P: 11\nQ: 22\nR: 33", isHidden: true, points: 10 },
        { input: "2\nLeo\n84\nMia\n91", expectedOutput: "Leo: 84\nMia: 91", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Sort an ArrayList of integers in ascending order using Collections.sort(). Read n integers and print them sorted.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); ArrayList<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } Collections.sort(list); for (int num : list) { System.out.println(num); } } }",
      examples: [
        { input: "5\n30\n10\n50\n20\n40", output: "10\n20\n30\n40\n50" },
        { input: "3\n9\n3\n6", output: "3\n6\n9" }
      ],
      testCases: [
        { input: "5\n30\n10\n50\n20\n40", expectedOutput: "10\n20\n30\n40\n50", isHidden: false, points: 10 },
        { input: "3\n9\n3\n6", expectedOutput: "3\n6\n9", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n100\n25\n75\n50", expectedOutput: "25\n50\n75\n100", isHidden: true, points: 10 },
        { input: "6\n5\n3\n8\n1\n9\n2", expectedOutput: "1\n2\n3\n5\n8\n9", isHidden: true, points: 10 },
        { input: "2\n20\n10", expectedOutput: "10\n20", isHidden: true, points: 10 },
        { input: "7\n70\n30\n90\n10\n50\n60\n40", expectedOutput: "10\n30\n40\n50\n60\n70\n90", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0\n0\n0", isHidden: true, points: 10 },
        { input: "5\n15\n5\n25\n10\n20", expectedOutput: "5\n10\n15\n20\n25", isHidden: true, points: 10 },
        { input: "4\n4\n3\n2\n1", expectedOutput: "1\n2\n3\n4", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Find the frequency of each element in a list using HashMap. Read n integers and print each unique number with its frequency in format 'number: frequency'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); HashMap<Integer, Integer> freq = new HashMap<>(); for (int i = 0; i < n; i++) { int num = sc.nextInt(); freq.put(num, freq.getOrDefault(num, 0) + 1); } for (Map.Entry<Integer, Integer> entry : freq.entrySet()) { System.out.println(entry.getKey() + \": \" + entry.getValue()); } } }",
      examples: [
        { input: "5\n1\n2\n1\n3\n2", output: "1: 2\n2: 2\n3: 1" },
        { input: "6\n5\n5\n5\n10\n10\n15", output: "5: 3\n10: 2\n15: 1" }
      ],
      testCases: [
        { input: "5\n1\n2\n1\n3\n2", expectedOutput: "1: 2\n2: 2\n3: 1", isHidden: false, points: 10 },
        { input: "6\n5\n5\n5\n10\n10\n15", expectedOutput: "5: 3\n10: 2\n15: 1", isHidden: false, points: 10 },
        { input: "3\n7\n7\n7", expectedOutput: "7: 3", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4", expectedOutput: "1: 1\n2: 1\n3: 1\n4: 1", isHidden: true, points: 10 },
        { input: "7\n1\n1\n2\n2\n2\n3\n3", expectedOutput: "1: 2\n2: 3\n3: 2", isHidden: true, points: 10 },
        { input: "1\n42", expectedOutput: "42: 1", isHidden: true, points: 10 },
        { input: "5\n10\n20\n10\n30\n20", expectedOutput: "10: 2\n20: 2\n30: 1", isHidden: true, points: 10 },
        { input: "2\n0\n0", expectedOutput: "0: 2", isHidden: true, points: 10 },
        { input: "8\n5\n5\n6\n6\n7\n7\n8\n8", expectedOutput: "5: 2\n6: 2\n7: 2\n8: 2", isHidden: true, points: 10 },
        { input: "3\n100\n200\n100", expectedOutput: "100: 2\n200: 1", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 10: Generics in Java
function generateDay10Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Create a generic method to print any type of array. Read array type ('int' or 'string'), size n, then n elements. Print each element on a new line.",
      solution: "import java.util.Scanner; public class Solution { public static <T> void printArray(T[] arr) { for (T element : arr) { System.out.println(element); } } public static void main(String[] args) { Scanner sc = new Scanner(System.in); String type = sc.next(); int n = sc.nextInt(); if (type.equals(\"int\")) { Integer[] arr = new Integer[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); printArray(arr); } else { String[] arr = new String[n]; for (int i = 0; i < n; i++) arr[i] = sc.next(); printArray(arr); } } }",
      examples: [
        { input: "int\n3\n10\n20\n30", output: "10\n20\n30" },
        { input: "string\n2\nHello\nWorld", output: "Hello\nWorld" }
      ],
      testCases: [
        { input: "int\n3\n10\n20\n30", expectedOutput: "10\n20\n30", isHidden: false, points: 10 },
        { input: "string\n2\nHello\nWorld", expectedOutput: "Hello\nWorld", isHidden: false, points: 10 },
        { input: "int\n5\n1\n2\n3\n4\n5", expectedOutput: "1\n2\n3\n4\n5", isHidden: true, points: 10 },
        { input: "string\n3\nJava\nPython\nC++", expectedOutput: "Java\nPython\nC++", isHidden: true, points: 10 },
        { input: "int\n1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "string\n4\nA\nB\nC\nD", expectedOutput: "A\nB\nC\nD", isHidden: true, points: 10 },
        { input: "int\n4\n100\n200\n300\n400", expectedOutput: "100\n200\n300\n400", isHidden: true, points: 10 },
        { input: "string\n1\nTest", expectedOutput: "Test", isHidden: true, points: 10 },
        { input: "int\n2\n0\n1", expectedOutput: "0\n1", isHidden: true, points: 10 },
        { input: "string\n5\nOne\nTwo\nThree\nFour\nFive", expectedOutput: "One\nTwo\nThree\nFour\nFive", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a generic class Box that can hold any type of value. Read type ('int' or 'string') and a value. Store it in Box and print the value.",
      solution: "import java.util.Scanner; class Box<T> { private T value; public void set(T value) { this.value = value; } public T get() { return value; } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String type = sc.next(); if (type.equals(\"int\")) { Box<Integer> box = new Box<>(); box.set(sc.nextInt()); System.out.println(box.get()); } else { Box<String> box = new Box<>(); box.set(sc.next()); System.out.println(box.get()); } } }",
      examples: [
        { input: "int\n100", output: "100" },
        { input: "string\nGeneric", output: "Generic" }
      ],
      testCases: [
        { input: "int\n100", expectedOutput: "100", isHidden: false, points: 10 },
        { input: "string\nGeneric", expectedOutput: "Generic", isHidden: false, points: 10 },
        { input: "int\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "string\nJava", expectedOutput: "Java", isHidden: true, points: 10 },
        { input: "int\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "string\nBox", expectedOutput: "Box", isHidden: true, points: 10 },
        { input: "int\n999", expectedOutput: "999", isHidden: true, points: 10 },
        { input: "string\nTest", expectedOutput: "Test", isHidden: true, points: 10 },
        { input: "int\n-50", expectedOutput: "-50", isHidden: true, points: 10 },
        { input: "string\nValue", expectedOutput: "Value", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Write a generic method to find the maximum element in an array of comparable elements. Read n integers and print the maximum.",
      solution: "import java.util.Scanner; public class Solution { public static <T extends Comparable<T>> T findMax(T[] arr) { T max = arr[0]; for (int i = 1; i < arr.length; i++) { if (arr[i].compareTo(max) > 0) max = arr[i]; } return max; } public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); Integer[] arr = new Integer[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(findMax(arr)); } }",
      examples: [
        { input: "5\n10\n50\n30\n20\n40", output: "50" },
        { input: "3\n7\n3\n9", output: "9" }
      ],
      testCases: [
        { input: "5\n10\n50\n30\n20\n40", expectedOutput: "50", isHidden: false, points: 10 },
        { input: "3\n7\n3\n9", expectedOutput: "9", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n100\n200\n150\n175", expectedOutput: "200", isHidden: true, points: 10 },
        { input: "6\n5\n15\n25\n35\n45\n55", expectedOutput: "55", isHidden: true, points: 10 },
        { input: "2\n10\n20", expectedOutput: "20", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "77", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "5\n99\n88\n77\n66\n55", expectedOutput: "99", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4", expectedOutput: "4", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a generic method to swap two elements in an array. Read n integers, then two indices i and j. Swap arr[i] and arr[j], then print the array.",
      solution: "import java.util.Scanner; public class Solution { public static <T> void swap(T[] arr, int i, int j) { T temp = arr[i]; arr[i] = arr[j]; arr[j] = temp; } public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); Integer[] arr = new Integer[n]; for (int k = 0; k < n; k++) arr[k] = sc.nextInt(); int i = sc.nextInt(); int j = sc.nextInt(); swap(arr, i, j); for (int num : arr) { System.out.println(num); } } }",
      examples: [
        { input: "3\n10\n20\n30\n0\n2", output: "30\n20\n10" },
        { input: "4\n1\n2\n3\n4\n1\n3", output: "1\n4\n3\n2" }
      ],
      testCases: [
        { input: "3\n10\n20\n30\n0\n2", expectedOutput: "30\n20\n10", isHidden: false, points: 10 },
        { input: "4\n1\n2\n3\n4\n1\n3", expectedOutput: "1\n4\n3\n2", isHidden: false, points: 10 },
        { input: "2\n5\n10\n0\n1", expectedOutput: "10\n5", isHidden: true, points: 10 },
        { input: "5\n10\n20\n30\n40\n50\n0\n4", expectedOutput: "50\n20\n30\n40\n10", isHidden: true, points: 10 },
        { input: "3\n7\n8\n9\n1\n2", expectedOutput: "7\n9\n8", isHidden: true, points: 10 },
        { input: "6\n1\n2\n3\n4\n5\n6\n2\n5", expectedOutput: "1\n2\n6\n4\n5\n3", isHidden: true, points: 10 },
        { input: "4\n100\n200\n300\n400\n0\n3", expectedOutput: "400\n200\n300\n100", isHidden: true, points: 10 },
        { input: "2\n0\n1\n0\n1", expectedOutput: "1\n0", isHidden: true, points: 10 },
        { input: "5\n5\n10\n15\n20\n25\n1\n4", expectedOutput: "5\n25\n15\n20\n10", isHidden: true, points: 10 },
        { input: "3\n42\n43\n44\n0\n2", expectedOutput: "44\n43\n42", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Implement a generic Pair class that holds two values of potentially different types. Read two integers and print them as 'First: X, Second: Y'.",
      solution: "import java.util.Scanner; class Pair<K, V> { private K first; private V second; public Pair(K first, V second) { this.first = first; this.second = second; } public K getFirst() { return first; } public V getSecond() { return second; } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); Pair<Integer, Integer> pair = new Pair<>(a, b); System.out.println(\"First: \" + pair.getFirst() + \", Second: \" + pair.getSecond()); } }",
      examples: [
        { input: "10\n20", output: "First: 10, Second: 20" },
        { input: "5\n15", output: "First: 5, Second: 15" }
      ],
      testCases: [
        { input: "10\n20", expectedOutput: "First: 10, Second: 20", isHidden: false, points: 10 },
        { input: "5\n15", expectedOutput: "First: 5, Second: 15", isHidden: false, points: 10 },
        { input: "0\n0", expectedOutput: "First: 0, Second: 0", isHidden: true, points: 10 },
        { input: "100\n200", expectedOutput: "First: 100, Second: 200", isHidden: true, points: 10 },
        { input: "1\n2", expectedOutput: "First: 1, Second: 2", isHidden: true, points: 10 },
        { input: "42\n84", expectedOutput: "First: 42, Second: 84", isHidden: true, points: 10 },
        { input: "7\n14", expectedOutput: "First: 7, Second: 14", isHidden: true, points: 10 },
        { input: "50\n100", expectedOutput: "First: 50, Second: 100", isHidden: true, points: 10 },
        { input: "3\n6", expectedOutput: "First: 3, Second: 6", isHidden: true, points: 10 },
        { input: "99\n88", expectedOutput: "First: 99, Second: 88", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 11: Lambda Expressions
function generateDay11Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Use a lambda expression to implement a functional interface that adds two numbers. Read two integers and print their sum.",
      solution: "import java.util.Scanner; interface Calculator { int calculate(int a, int b); } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); Calculator add = (x, y) -> x + y; System.out.println(add.calculate(a, b)); } }",
      examples: [
        { input: "10\n20", output: "30" },
        { input: "5\n7", output: "12" }
      ],
      testCases: [
        { input: "10\n20", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "5\n7", expectedOutput: "12", isHidden: false, points: 10 },
        { input: "0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "100\n200", expectedOutput: "300", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "50\n50", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "15\n25", expectedOutput: "40", isHidden: true, points: 10 },
        { input: "99\n1", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "42\n8", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "7\n13", expectedOutput: "20", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a lambda expression to check if a number is even. Read an integer and print 'true' if even, 'false' otherwise.",
      solution: "import java.util.Scanner; interface Predicate { boolean test(int n); } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); Predicate isEven = x -> x % 2 == 0; System.out.println(isEven.test(n)); } }",
      examples: [
        { input: "10", output: "true" },
        { input: "7", output: "false" }
      ],
      testCases: [
        { input: "10", expectedOutput: "true", isHidden: false, points: 10 },
        { input: "7", expectedOutput: "false", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "true", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "false", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "true", isHidden: true, points: 10 },
        { input: "99", expectedOutput: "false", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "true", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "false", isHidden: true, points: 10 },
        { input: "50", expectedOutput: "true", isHidden: true, points: 10 },
        { input: "51", expectedOutput: "false", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use lambda with forEach to print all elements of a list. Read n integers and print each on a new line using lambda.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); List<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } list.forEach(x -> System.out.println(x)); } }",
      examples: [
        { input: "3\n10\n20\n30", output: "10\n20\n30" },
        { input: "5\n1\n2\n3\n4\n5", output: "1\n2\n3\n4\n5" }
      ],
      testCases: [
        { input: "3\n10\n20\n30", expectedOutput: "10\n20\n30", isHidden: false, points: 10 },
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "2\n100\n200", expectedOutput: "100\n200", isHidden: true, points: 10 },
        { input: "4\n7\n14\n21\n28", expectedOutput: "7\n14\n21\n28", isHidden: true, points: 10 },
        { input: "6\n5\n10\n15\n20\n25\n30", expectedOutput: "5\n10\n15\n20\n25\n30", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0\n0\n0", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "11\n22\n33\n44\n55\n66\n77", isHidden: true, points: 10 },
        { input: "2\n50\n50", expectedOutput: "50\n50", isHidden: true, points: 10 },
        { input: "4\n9\n8\n7\n6", expectedOutput: "9\n8\n7\n6", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Filter a list of integers using lambda to get only even numbers. Read n integers and print only the even ones.",
      solution: "import java.util.*; import java.util.stream.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); List<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } list.stream().filter(x -> x % 2 == 0).forEach(x -> System.out.println(x)); } }",
      examples: [
        { input: "5\n1\n2\n3\n4\n5", output: "2\n4" },
        { input: "4\n10\n15\n20\n25", output: "10\n20" }
      ],
      testCases: [
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "2\n4", isHidden: false, points: 10 },
        { input: "4\n10\n15\n20\n25", expectedOutput: "10\n20", isHidden: false, points: 10 },
        { input: "3\n1\n3\n5", expectedOutput: "", isHidden: true, points: 10 },
        { input: "3\n2\n4\n6", expectedOutput: "2\n4\n6", isHidden: true, points: 10 },
        { input: "6\n7\n8\n9\n10\n11\n12", expectedOutput: "8\n10\n12", isHidden: true, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "5\n100\n101\n102\n103\n104", expectedOutput: "100\n102\n104", isHidden: true, points: 10 },
        { input: "2\n0\n1", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "22\n44\n66", isHidden: true, points: 10 },
        { input: "4\n50\n51\n52\n53", expectedOutput: "50\n52", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use lambda to sort a list of integers in descending order. Read n integers and print them sorted from largest to smallest.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); List<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } list.sort((a, b) -> b - a); list.forEach(x -> System.out.println(x)); } }",
      examples: [
        { input: "5\n10\n50\n30\n20\n40", output: "50\n40\n30\n20\n10" },
        { input: "3\n9\n3\n6", output: "9\n6\n3" }
      ],
      testCases: [
        { input: "5\n10\n50\n30\n20\n40", expectedOutput: "50\n40\n30\n20\n10", isHidden: false, points: 10 },
        { input: "3\n9\n3\n6", expectedOutput: "9\n6\n3", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n100\n25\n75\n50", expectedOutput: "100\n75\n50\n25", isHidden: true, points: 10 },
        { input: "6\n5\n3\n8\n1\n9\n2", expectedOutput: "9\n8\n5\n3\n2\n1", isHidden: true, points: 10 },
        { input: "2\n20\n10", expectedOutput: "20\n10", isHidden: true, points: 10 },
        { input: "7\n70\n30\n90\n10\n50\n60\n40", expectedOutput: "90\n70\n60\n50\n40\n30\n10", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0\n0\n0", isHidden: true, points: 10 },
        { input: "5\n15\n5\n25\n10\n20", expectedOutput: "25\n20\n15\n10\n5", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4", expectedOutput: "4\n3\n2\n1", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 12: Variables and Data Types
function generateDay12Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Demonstrate all primitive data types in Java. Read byte, short, int, long, float, double, char, boolean values and print each on a new line.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); byte b = sc.nextByte(); short s = sc.nextShort(); int i = sc.nextInt(); long l = sc.nextLong(); float f = sc.nextFloat(); double d = sc.nextDouble(); char c = sc.next().charAt(0); boolean bool = sc.nextBoolean(); System.out.println(b); System.out.println(s); System.out.println(i); System.out.println(l); System.out.println(f); System.out.println(d); System.out.println(c); System.out.println(bool); } }",
      examples: [
        { input: "10\n100\n1000\n10000\n1.5\n2.5\nA\ntrue", output: "10\n100\n1000\n10000\n1.5\n2.5\nA\ntrue" },
        { input: "5\n50\n500\n5000\n3.14\n6.28\nZ\nfalse", output: "5\n50\n500\n5000\n3.14\n6.28\nZ\nfalse" }
      ],
      testCases: [
        { input: "10\n100\n1000\n10000\n1.5\n2.5\nA\ntrue", expectedOutput: "10\n100\n1000\n10000\n1.5\n2.5\nA\ntrue", isHidden: false, points: 10 },
        { input: "5\n50\n500\n5000\n3.14\n6.28\nZ\nfalse", expectedOutput: "5\n50\n500\n5000\n3.14\n6.28\nZ\nfalse", isHidden: false, points: 10 },
        { input: "0\n0\n0\n0\n0.0\n0.0\nX\ntrue", expectedOutput: "0\n0\n0\n0\n0.0\n0.0\nX\ntrue", isHidden: true, points: 10 },
        { input: "1\n10\n100\n1000\n1.1\n2.2\nB\nfalse", expectedOutput: "1\n10\n100\n1000\n1.1\n2.2\nB\nfalse", isHidden: true, points: 10 },
        { input: "127\n32767\n2147483647\n9223372036854775807\n3.4\n1.7\nC\ntrue", expectedOutput: "127\n32767\n2147483647\n9223372036854775807\n3.4\n1.7\nC\ntrue", isHidden: true, points: 10 },
        { input: "7\n77\n777\n7777\n7.7\n77.77\nD\nfalse", expectedOutput: "7\n77\n777\n7777\n7.7\n77.77\nD\nfalse", isHidden: true, points: 10 },
        { input: "3\n30\n300\n3000\n3.3\n33.33\nE\ntrue", expectedOutput: "3\n30\n300\n3000\n3.3\n33.33\nE\ntrue", isHidden: true, points: 10 },
        { input: "9\n99\n999\n9999\n9.9\n99.99\nF\nfalse", expectedOutput: "9\n99\n999\n9999\n9.9\n99.99\nF\nfalse", isHidden: true, points: 10 },
        { input: "2\n20\n200\n2000\n2.2\n22.22\nG\ntrue", expectedOutput: "2\n20\n200\n2000\n2.2\n22.22\nG\ntrue", isHidden: true, points: 10 },
        { input: "8\n88\n888\n8888\n8.8\n88.88\nH\nfalse", expectedOutput: "8\n88\n888\n8888\n8.8\n88.88\nH\nfalse", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate type casting from int to double and double to int. Read an integer and a double. Cast int to double and double to int, then print both results.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int i = sc.nextInt(); double d = sc.nextDouble(); double intToDouble = (double) i; int doubleToInt = (int) d; System.out.println(intToDouble); System.out.println(doubleToInt); } }",
      examples: [
        { input: "10\n5.9", output: "10.0\n5" },
        { input: "7\n3.14", output: "7.0\n3" }
      ],
      testCases: [
        { input: "10\n5.9", expectedOutput: "10.0\n5", isHidden: false, points: 10 },
        { input: "7\n3.14", expectedOutput: "7.0\n3", isHidden: false, points: 10 },
        { input: "0\n0.0", expectedOutput: "0.0\n0", isHidden: true, points: 10 },
        { input: "100\n99.99", expectedOutput: "100.0\n99", isHidden: true, points: 10 },
        { input: "5\n5.5", expectedOutput: "5.0\n5", isHidden: true, points: 10 },
        { input: "42\n42.42", expectedOutput: "42.0\n42", isHidden: true, points: 10 },
        { input: "1\n1.1", expectedOutput: "1.0\n1", isHidden: true, points: 10 },
        { input: "99\n99.9", expectedOutput: "99.0\n99", isHidden: true, points: 10 },
        { input: "50\n50.5", expectedOutput: "50.0\n50", isHidden: true, points: 10 },
        { input: "25\n25.75", expectedOutput: "25.0\n25", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Calculate the size of different data types in bits. For int, print 32; for long, print 64; for byte, print 8; for short, print 16. Read the type name and print the size.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String type = sc.next(); switch(type) { case \"byte\": System.out.println(8); break; case \"short\": System.out.println(16); break; case \"int\": System.out.println(32); break; case \"long\": System.out.println(64); break; default: System.out.println(0); } } }",
      examples: [
        { input: "int", output: "32" },
        { input: "byte", output: "8" }
      ],
      testCases: [
        { input: "int", expectedOutput: "32", isHidden: false, points: 10 },
        { input: "byte", expectedOutput: "8", isHidden: false, points: 10 },
        { input: "long", expectedOutput: "64", isHidden: true, points: 10 },
        { input: "short", expectedOutput: "16", isHidden: true, points: 10 },
        { input: "int", expectedOutput: "32", isHidden: true, points: 10 },
        { input: "byte", expectedOutput: "8", isHidden: true, points: 10 },
        { input: "long", expectedOutput: "64", isHidden: true, points: 10 },
        { input: "short", expectedOutput: "16", isHidden: true, points: 10 },
        { input: "int", expectedOutput: "32", isHidden: true, points: 10 },
        { input: "long", expectedOutput: "64", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate variable scope. Read two integers a and b. Print 'Global: a' then 'Local: b' to show different scopes.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(\"Global: \" + a); { System.out.println(\"Local: \" + b); } } }",
      examples: [
        { input: "10\n20", output: "Global: 10\nLocal: 20" },
        { input: "5\n15", output: "Global: 5\nLocal: 15" }
      ],
      testCases: [
        { input: "10\n20", expectedOutput: "Global: 10\nLocal: 20", isHidden: false, points: 10 },
        { input: "5\n15", expectedOutput: "Global: 5\nLocal: 15", isHidden: false, points: 10 },
        { input: "0\n0", expectedOutput: "Global: 0\nLocal: 0", isHidden: true, points: 10 },
        { input: "100\n200", expectedOutput: "Global: 100\nLocal: 200", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "Global: 1\nLocal: 1", isHidden: true, points: 10 },
        { input: "42\n84", expectedOutput: "Global: 42\nLocal: 84", isHidden: true, points: 10 },
        { input: "7\n14", expectedOutput: "Global: 7\nLocal: 14", isHidden: true, points: 10 },
        { input: "50\n100", expectedOutput: "Global: 50\nLocal: 100", isHidden: true, points: 10 },
        { input: "3\n6", expectedOutput: "Global: 3\nLocal: 6", isHidden: true, points: 10 },
        { input: "99\n88", expectedOutput: "Global: 99\nLocal: 88", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use final keyword to create a constant. Read an integer radius and calculate circle area using final PI = 3.14159. Print the area.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); final double PI = 3.14159; int radius = sc.nextInt(); double area = PI * radius * radius; System.out.println(area); } }",
      examples: [
        { input: "5", output: "78.53975" },
        { input: "10", output: "314.159" }
      ],
      testCases: [
        { input: "5", expectedOutput: "78.53975", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "314.159", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "3.14159", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "12.56636", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "28.27431", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "153.93791", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "50.26544", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "113.09724", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "201.06176", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "254.46879", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 13: Stream API
function generateDay13Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Use Stream API to filter even numbers from a list. Read n integers and print only the even numbers using streams.",
      solution: "import java.util.*; import java.util.stream.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); List<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } list.stream().filter(x -> x % 2 == 0).forEach(System.out::println); } }",
      examples: [
        { input: "5\n1\n2\n3\n4\n5", output: "2\n4" },
        { input: "4\n10\n15\n20\n25", output: "10\n20" }
      ],
      testCases: [
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "2\n4", isHidden: false, points: 10 },
        { input: "4\n10\n15\n20\n25", expectedOutput: "10\n20", isHidden: false, points: 10 },
        { input: "3\n1\n3\n5", expectedOutput: "", isHidden: true, points: 10 },
        { input: "3\n2\n4\n6", expectedOutput: "2\n4\n6", isHidden: true, points: 10 },
        { input: "6\n7\n8\n9\n10\n11\n12", expectedOutput: "8\n10\n12", isHidden: true, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "5\n100\n101\n102\n103\n104", expectedOutput: "100\n102\n104", isHidden: true, points: 10 },
        { input: "2\n0\n1", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "22\n44\n66", isHidden: true, points: 10 },
        { input: "4\n50\n51\n52\n53", expectedOutput: "50\n52", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use Stream API to find the sum of all elements. Read n integers and print their sum using streams.",
      solution: "import java.util.*; import java.util.stream.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); List<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } int sum = list.stream().mapToInt(Integer::intValue).sum(); System.out.println(sum); } }",
      examples: [
        { input: "5\n1\n2\n3\n4\n5", output: "15" },
        { input: "3\n10\n20\n30", output: "60" }
      ],
      testCases: [
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "15", isHidden: false, points: 10 },
        { input: "3\n10\n20\n30", expectedOutput: "60", isHidden: false, points: 10 },
        { input: "1\n100", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "4\n0\n0\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "6\n5\n10\n15\n20\n25\n30", expectedOutput: "105", isHidden: true, points: 10 },
        { input: "2\n50\n50", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "7\n1\n1\n1\n1\n1\n1\n1", expectedOutput: "7", isHidden: true, points: 10 },
        { input: "3\n100\n200\n300", expectedOutput: "600", isHidden: true, points: 10 },
        { input: "5\n7\n14\n21\n28\n35", expectedOutput: "105", isHidden: true, points: 10 },
        { input: "4\n25\n25\n25\n25", expectedOutput: "100", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use Stream API map operation to square all numbers. Read n integers and print the square of each using streams.",
      solution: "import java.util.*; import java.util.stream.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); List<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } list.stream().map(x -> x * x).forEach(System.out::println); } }",
      examples: [
        { input: "3\n2\n3\n4", output: "4\n9\n16" },
        { input: "5\n1\n2\n3\n4\n5", output: "1\n4\n9\n16\n25" }
      ],
      testCases: [
        { input: "3\n2\n3\n4", expectedOutput: "4\n9\n16", isHidden: false, points: 10 },
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "1\n4\n9\n16\n25", isHidden: false, points: 10 },
        { input: "1\n10", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "2\n0\n1", expectedOutput: "0\n1", isHidden: true, points: 10 },
        { input: "4\n5\n6\n7\n8", expectedOutput: "25\n36\n49\n64", isHidden: true, points: 10 },
        { input: "3\n10\n10\n10", expectedOutput: "100\n100\n100", isHidden: true, points: 10 },
        { input: "6\n1\n2\n3\n4\n5\n6", expectedOutput: "1\n4\n9\n16\n25\n36", isHidden: true, points: 10 },
        { input: "2\n7\n8", expectedOutput: "49\n64", isHidden: true, points: 10 },
        { input: "5\n2\n4\n6\n8\n10", expectedOutput: "4\n16\n36\n64\n100", isHidden: true, points: 10 },
        { input: "3\n3\n3\n3", expectedOutput: "9\n9\n9", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use Stream API to count elements greater than a threshold. Read n, then n integers, then threshold value. Print count of elements greater than threshold.",
      solution: "import java.util.*; import java.util.stream.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); List<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } int threshold = sc.nextInt(); long count = list.stream().filter(x -> x > threshold).count(); System.out.println(count); } }",
      examples: [
        { input: "5\n10\n20\n30\n40\n50\n25", output: "3" },
        { input: "4\n5\n15\n25\n35\n20", output: "2" }
      ],
      testCases: [
        { input: "5\n10\n20\n30\n40\n50\n25", expectedOutput: "3", isHidden: false, points: 10 },
        { input: "4\n5\n15\n25\n35\n20", expectedOutput: "2", isHidden: false, points: 10 },
        { input: "3\n1\n2\n3\n5", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "6\n10\n20\n30\n40\n50\n60\n0", expectedOutput: "6", isHidden: true, points: 10 },
        { input: "2\n100\n200\n150", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "5\n5\n5\n5\n5\n5\n5", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77\n50", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "1\n42\n100", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4\n2", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "3\n10\n20\n30\n15", expectedOutput: "2", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use Stream API to find the maximum element. Read n integers and print the maximum using streams.",
      solution: "import java.util.*; import java.util.stream.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); List<Integer> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } int max = list.stream().max(Integer::compareTo).orElse(0); System.out.println(max); } }",
      examples: [
        { input: "5\n10\n50\n30\n20\n40", output: "50" },
        { input: "3\n7\n3\n9", output: "9" }
      ],
      testCases: [
        { input: "5\n10\n50\n30\n20\n40", expectedOutput: "50", isHidden: false, points: 10 },
        { input: "3\n7\n3\n9", expectedOutput: "9", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n100\n200\n150\n175", expectedOutput: "200", isHidden: true, points: 10 },
        { input: "6\n5\n15\n25\n35\n45\n55", expectedOutput: "55", isHidden: true, points: 10 },
        { input: "2\n10\n20", expectedOutput: "20", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "77", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "5\n99\n88\n77\n66\n55", expectedOutput: "99", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4", expectedOutput: "4", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 14: Week 3 Advanced Challenge
function generateDay14Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Implement a program to reverse a string using StringBuilder. Read a string and print its reverse.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String str = sc.nextLine(); StringBuilder sb = new StringBuilder(str); System.out.println(sb.reverse()); } }",
      examples: [
        { input: "hello", output: "olleh" },
        { input: "Java", output: "avaJ" }
      ],
      testCases: [
        { input: "hello", expectedOutput: "olleh", isHidden: false, points: 10 },
        { input: "Java", expectedOutput: "avaJ", isHidden: false, points: 10 },
        { input: "a", expectedOutput: "a", isHidden: true, points: 10 },
        { input: "12345", expectedOutput: "54321", isHidden: true, points: 10 },
        { input: "racecar", expectedOutput: "racecar", isHidden: true, points: 10 },
        { input: "Programming", expectedOutput: "gnimmargorP", isHidden: true, points: 10 },
        { input: "OpenAI", expectedOutput: "IAnepO", isHidden: true, points: 10 },
        { input: "Test", expectedOutput: "tseT", isHidden: true, points: 10 },
        { input: "abcd", expectedOutput: "dcba", isHidden: true, points: 10 },
        { input: "xyz", expectedOutput: "zyx", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a string is a palindrome. Read a string and print 'Palindrome' or 'Not Palindrome'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String str = sc.nextLine(); String reversed = new StringBuilder(str).reverse().toString(); if (str.equals(reversed)) System.out.println(\"Palindrome\"); else System.out.println(\"Not Palindrome\"); } }",
      examples: [
        { input: "racecar", output: "Palindrome" },
        { input: "hello", output: "Not Palindrome" }
      ],
      testCases: [
        { input: "racecar", expectedOutput: "Palindrome", isHidden: false, points: 10 },
        { input: "hello", expectedOutput: "Not Palindrome", isHidden: false, points: 10 },
        { input: "madam", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "java", expectedOutput: "Not Palindrome", isHidden: true, points: 10 },
        { input: "level", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "world", expectedOutput: "Not Palindrome", isHidden: true, points: 10 },
        { input: "noon", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "test", expectedOutput: "Not Palindrome", isHidden: true, points: 10 },
        { input: "a", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "ab", expectedOutput: "Not Palindrome", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Find the first non-repeating character in a string. Read a string and print the first character that appears only once. If none, print 'None'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String str = sc.nextLine(); Map<Character, Integer> freq = new LinkedHashMap<>(); for (char c : str.toCharArray()) { freq.put(c, freq.getOrDefault(c, 0) + 1); } for (Map.Entry<Character, Integer> entry : freq.entrySet()) { if (entry.getValue() == 1) { System.out.println(entry.getKey()); return; } } System.out.println(\"None\"); } }",
      examples: [
        { input: "aabbcde", output: "c" },
        { input: "aabbcc", output: "None" }
      ],
      testCases: [
        { input: "aabbcde", expectedOutput: "c", isHidden: false, points: 10 },
        { input: "aabbcc", expectedOutput: "None", isHidden: false, points: 10 },
        { input: "abcdef", expectedOutput: "a", isHidden: true, points: 10 },
        { input: "aabbccdd", expectedOutput: "None", isHidden: true, points: 10 },
        { input: "hello", expectedOutput: "h", isHidden: true, points: 10 },
        { input: "aabbcddc", expectedOutput: "None", isHidden: true, points: 10 },
        { input: "programming", expectedOutput: "p", isHidden: true, points: 10 },
        { input: "aaaa", expectedOutput: "None", isHidden: true, points: 10 },
        { input: "abcd", expectedOutput: "a", isHidden: true, points: 10 },
        { input: "aabbc", expectedOutput: "c", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Count the number of vowels in a string. Read a string and print the count of vowels (a, e, i, o, u - case insensitive).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String str = sc.nextLine().toLowerCase(); int count = 0; for (char c : str.toCharArray()) { if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') count++; } System.out.println(count); } }",
      examples: [
        { input: "hello", output: "2" },
        { input: "Java Programming", output: "5" }
      ],
      testCases: [
        { input: "hello", expectedOutput: "2", isHidden: false, points: 10 },
        { input: "Java Programming", expectedOutput: "5", isHidden: false, points: 10 },
        { input: "aeiou", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "xyz", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "HELLO", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "Education", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "bcdfg", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "AEIOUaeiou", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "Programming", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "Test", expectedOutput: "1", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Remove duplicate characters from a string. Read a string and print it with duplicate characters removed (keep first occurrence).",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String str = sc.nextLine(); LinkedHashSet<Character> set = new LinkedHashSet<>(); for (char c : str.toCharArray()) { set.add(c); } StringBuilder result = new StringBuilder(); for (char c : set) { result.append(c); } System.out.println(result); } }",
      examples: [
        { input: "hello", output: "helo" },
        { input: "aabbcc", output: "abc" }
      ],
      testCases: [
        { input: "hello", expectedOutput: "helo", isHidden: false, points: 10 },
        { input: "aabbcc", expectedOutput: "abc", isHidden: false, points: 10 },
        { input: "java", expectedOutput: "jav", isHidden: true, points: 10 },
        { input: "programming", expectedOutput: "progamin", isHidden: true, points: 10 },
        { input: "aaa", expectedOutput: "a", isHidden: true, points: 10 },
        { input: "abcd", expectedOutput: "abcd", isHidden: true, points: 10 },
        { input: "aabbccdd", expectedOutput: "abcd", isHidden: true, points: 10 },
        { input: "test", expectedOutput: "tes", isHidden: true, points: 10 },
        { input: "banana", expectedOutput: "ban", isHidden: true, points: 10 },
        { input: "book", expectedOutput: "bok", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 15: Introduction to Threads
function generateDay15Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Create a thread by extending Thread class. Read a number n and print numbers from 1 to n in a thread.",
      solution: "import java.util.Scanner; class MyThread extends Thread { private int n; public MyThread(int n) { this.n = n; } public void run() { for (int i = 1; i <= n; i++) { System.out.println(i); } } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); MyThread t = new MyThread(n); t.start(); try { t.join(); } catch (InterruptedException e) {} } }",
      examples: [
        { input: "5", output: "1\n2\n3\n4\n5" },
        { input: "3", output: "1\n2\n3" }
      ],
      testCases: [
        { input: "5", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 },
        { input: "3", expectedOutput: "1\n2\n3", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "1\n2\n3\n4\n5\n6\n7", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "1\n2", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "1\n2\n3\n4", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "1\n2\n3\n4\n5\n6", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a thread by implementing Runnable interface. Read a number n and print even numbers from 2 to n using Runnable.",
      solution: "import java.util.Scanner; class MyRunnable implements Runnable { private int n; public MyRunnable(int n) { this.n = n; } public void run() { for (int i = 2; i <= n; i += 2) { System.out.println(i); } } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); Thread t = new Thread(new MyRunnable(n)); t.start(); try { t.join(); } catch (InterruptedException e) {} } }",
      examples: [
        { input: "10", output: "2\n4\n6\n8\n10" },
        { input: "7", output: "2\n4\n6" }
      ],
      testCases: [
        { input: "10", expectedOutput: "2\n4\n6\n8\n10", isHidden: false, points: 10 },
        { input: "7", expectedOutput: "2\n4\n6", isHidden: false, points: 10 },
        { input: "5", expectedOutput: "2\n4", isHidden: true, points: 10 },
        { input: "20", expectedOutput: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "2\n4\n6\n8\n10\n12\n14", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "12", expectedOutput: "2\n4\n6\n8\n10\n12", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "2\n4\n6\n8", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "2\n4\n6", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate thread lifecycle with sleep. Read a message and print it, then sleep for 1 second (simulate with immediate print), then print 'Done'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String message = sc.nextLine(); System.out.println(message); System.out.println(\"Done\"); } }",
      examples: [
        { input: "Hello", output: "Hello\nDone" },
        { input: "Java", output: "Java\nDone" }
      ],
      testCases: [
        { input: "Hello", expectedOutput: "Hello\nDone", isHidden: false, points: 10 },
        { input: "Java", expectedOutput: "Java\nDone", isHidden: false, points: 10 },
        { input: "Thread", expectedOutput: "Thread\nDone", isHidden: true, points: 10 },
        { input: "Test", expectedOutput: "Test\nDone", isHidden: true, points: 10 },
        { input: "Programming", expectedOutput: "Programming\nDone", isHidden: true, points: 10 },
        { input: "Sleep", expectedOutput: "Sleep\nDone", isHidden: true, points: 10 },
        { input: "Message", expectedOutput: "Message\nDone", isHidden: true, points: 10 },
        { input: "Wait", expectedOutput: "Wait\nDone", isHidden: true, points: 10 },
        { input: "Execute", expectedOutput: "Execute\nDone", isHidden: true, points: 10 },
        { input: "Run", expectedOutput: "Run\nDone", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Get thread name and priority. Read a thread name, create a thread with that name, and print 'Thread: <name>, Priority: 5'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.nextLine(); Thread t = new Thread(() -> {}); t.setName(name); System.out.println(\"Thread: \" + t.getName() + \", Priority: \" + t.getPriority()); } }",
      examples: [
        { input: "Worker", output: "Thread: Worker, Priority: 5" },
        { input: "MyThread", output: "Thread: MyThread, Priority: 5" }
      ],
      testCases: [
        { input: "Worker", expectedOutput: "Thread: Worker, Priority: 5", isHidden: false, points: 10 },
        { input: "MyThread", expectedOutput: "Thread: MyThread, Priority: 5", isHidden: false, points: 10 },
        { input: "Task", expectedOutput: "Thread: Task, Priority: 5", isHidden: true, points: 10 },
        { input: "Thread1", expectedOutput: "Thread: Thread1, Priority: 5", isHidden: true, points: 10 },
        { input: "Main", expectedOutput: "Thread: Main, Priority: 5", isHidden: true, points: 10 },
        { input: "Background", expectedOutput: "Thread: Background, Priority: 5", isHidden: true, points: 10 },
        { input: "T1", expectedOutput: "Thread: T1, Priority: 5", isHidden: true, points: 10 },
        { input: "Process", expectedOutput: "Thread: Process, Priority: 5", isHidden: true, points: 10 },
        { input: "Job", expectedOutput: "Thread: Job, Priority: 5", isHidden: true, points: 10 },
        { input: "Executor", expectedOutput: "Thread: Executor, Priority: 5", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a thread is alive. Read a thread name and print 'Thread <name> is alive: false' (since we check before starting).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.nextLine(); Thread t = new Thread(() -> {}); t.setName(name); System.out.println(\"Thread \" + t.getName() + \" is alive: \" + t.isAlive()); } }",
      examples: [
        { input: "TestThread", output: "Thread TestThread is alive: false" },
        { input: "Worker", output: "Thread Worker is alive: false" }
      ],
      testCases: [
        { input: "TestThread", expectedOutput: "Thread TestThread is alive: false", isHidden: false, points: 10 },
        { input: "Worker", expectedOutput: "Thread Worker is alive: false", isHidden: false, points: 10 },
        { input: "T1", expectedOutput: "Thread T1 is alive: false", isHidden: true, points: 10 },
        { input: "MyThread", expectedOutput: "Thread MyThread is alive: false", isHidden: true, points: 10 },
        { input: "Task", expectedOutput: "Thread Task is alive: false", isHidden: true, points: 10 },
        { input: "Process", expectedOutput: "Thread Process is alive: false", isHidden: true, points: 10 },
        { input: "Job", expectedOutput: "Thread Job is alive: false", isHidden: true, points: 10 },
        { input: "Main", expectedOutput: "Thread Main is alive: false", isHidden: true, points: 10 },
        { input: "Background", expectedOutput: "Thread Background is alive: false", isHidden: true, points: 10 },
        { input: "Executor", expectedOutput: "Thread Executor is alive: false", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 16: Thread Synchronization
function generateDay16Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Demonstrate race condition by incrementing a counter without synchronization. Read n and simulate n increments. Print the final count (which should be n).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int count = 0; for (int i = 0; i < n; i++) { count++; } System.out.println(count); } }",
      examples: [
        { input: "100", output: "100" },
        { input: "50", output: "50" }
      ],
      testCases: [
        { input: "100", expectedOutput: "100", isHidden: false, points: 10 },
        { input: "50", expectedOutput: "50", isHidden: false, points: 10 },
        { input: "1000", expectedOutput: "1000", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "500", expectedOutput: "500", isHidden: true, points: 10 },
        { input: "250", expectedOutput: "250", isHidden: true, points: 10 },
        { input: "5", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "750", expectedOutput: "750", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "200", expectedOutput: "200", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use synchronized method to safely increment a counter. Read n and print the final count after n synchronized increments.",
      solution: "import java.util.Scanner; class Counter { private int count = 0; public synchronized void increment() { count++; } public int getCount() { return count; } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); Counter counter = new Counter(); for (int i = 0; i < n; i++) { counter.increment(); } System.out.println(counter.getCount()); } }",
      examples: [
        { input: "100", output: "100" },
        { input: "50", output: "50" }
      ],
      testCases: [
        { input: "100", expectedOutput: "100", isHidden: false, points: 10 },
        { input: "50", expectedOutput: "50", isHidden: false, points: 10 },
        { input: "1000", expectedOutput: "1000", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "500", expectedOutput: "500", isHidden: true, points: 10 },
        { input: "250", expectedOutput: "250", isHidden: true, points: 10 },
        { input: "5", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "750", expectedOutput: "750", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "200", expectedOutput: "200", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use synchronized block to protect critical section. Read two numbers and print their sum using synchronized block protection.",
      solution: "import java.util.Scanner; public class Solution { private static final Object lock = new Object(); public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int sum; synchronized(lock) { sum = a + b; } System.out.println(sum); } }",
      examples: [
        { input: "10\n20", output: "30" },
        { input: "5\n15", output: "20" }
      ],
      testCases: [
        { input: "10\n20", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "5\n15", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "100\n200", expectedOutput: "300", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "50\n50", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "25\n75", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "99\n1", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "42\n8", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "7\n13", expectedOutput: "20", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate deadlock prevention. Read two numbers and print 'Sum: X' and 'Product: Y' where X is sum and Y is product.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int sum = a + b; int product = a * b; System.out.println(\"Sum: \" + sum); System.out.println(\"Product: \" + product); } }",
      examples: [
        { input: "5\n10", output: "Sum: 15\nProduct: 50" },
        { input: "3\n7", output: "Sum: 10\nProduct: 21" }
      ],
      testCases: [
        { input: "5\n10", expectedOutput: "Sum: 15\nProduct: 50", isHidden: false, points: 10 },
        { input: "3\n7", expectedOutput: "Sum: 10\nProduct: 21", isHidden: false, points: 10 },
        { input: "0\n0", expectedOutput: "Sum: 0\nProduct: 0", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "Sum: 2\nProduct: 1", isHidden: true, points: 10 },
        { input: "10\n20", expectedOutput: "Sum: 30\nProduct: 200", isHidden: true, points: 10 },
        { input: "6\n8", expectedOutput: "Sum: 14\nProduct: 48", isHidden: true, points: 10 },
        { input: "2\n5", expectedOutput: "Sum: 7\nProduct: 10", isHidden: true, points: 10 },
        { input: "4\n9", expectedOutput: "Sum: 13\nProduct: 36", isHidden: true, points: 10 },
        { input: "7\n7", expectedOutput: "Sum: 14\nProduct: 49", isHidden: true, points: 10 },
        { input: "12\n3", expectedOutput: "Sum: 15\nProduct: 36", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use ReentrantLock for synchronization. Read a number n and print n using lock mechanism (simulated with direct output).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.println(n); } }",
      examples: [
        { input: "100", output: "100" },
        { input: "42", output: "42" }
      ],
      testCases: [
        { input: "100", expectedOutput: "100", isHidden: false, points: 10 },
        { input: "42", expectedOutput: "42", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "1000", expectedOutput: "1000", isHidden: true, points: 10 },
        { input: "500", expectedOutput: "500", isHidden: true, points: 10 },
        { input: "250", expectedOutput: "250", isHidden: true, points: 10 },
        { input: "750", expectedOutput: "750", isHidden: true, points: 10 },
        { input: "99", expectedOutput: "99", isHidden: true, points: 10 },
        { input: "333", expectedOutput: "333", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 17: Inter-thread Communication
function generateDay17Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Demonstrate wait() and notify() mechanism. Read a message and print 'Waiting: <message>' then 'Notified: <message>'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String message = sc.nextLine(); System.out.println(\"Waiting: \" + message); System.out.println(\"Notified: \" + message); } }",
      examples: [
        { input: "Hello", output: "Waiting: Hello\nNotified: Hello" },
        { input: "Java", output: "Waiting: Java\nNotified: Java" }
      ],
      testCases: [
        { input: "Hello", expectedOutput: "Waiting: Hello\nNotified: Hello", isHidden: false, points: 10 },
        { input: "Java", expectedOutput: "Waiting: Java\nNotified: Java", isHidden: false, points: 10 },
        { input: "Thread", expectedOutput: "Waiting: Thread\nNotified: Thread", isHidden: true, points: 10 },
        { input: "Test", expectedOutput: "Waiting: Test\nNotified: Test", isHidden: true, points: 10 },
        { input: "Message", expectedOutput: "Waiting: Message\nNotified: Message", isHidden: true, points: 10 },
        { input: "Communication", expectedOutput: "Waiting: Communication\nNotified: Communication", isHidden: true, points: 10 },
        { input: "Sync", expectedOutput: "Waiting: Sync\nNotified: Sync", isHidden: true, points: 10 },
        { input: "Wait", expectedOutput: "Waiting: Wait\nNotified: Wait", isHidden: true, points: 10 },
        { input: "Notify", expectedOutput: "Waiting: Notify\nNotified: Notify", isHidden: true, points: 10 },
        { input: "Signal", expectedOutput: "Waiting: Signal\nNotified: Signal", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Implement producer-consumer pattern. Read a number (item) and print 'Produced: X' then 'Consumed: X'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int item = sc.nextInt(); System.out.println(\"Produced: \" + item); System.out.println(\"Consumed: \" + item); } }",
      examples: [
        { input: "42", output: "Produced: 42\nConsumed: 42" },
        { input: "100", output: "Produced: 100\nConsumed: 100" }
      ],
      testCases: [
        { input: "42", expectedOutput: "Produced: 42\nConsumed: 42", isHidden: false, points: 10 },
        { input: "100", expectedOutput: "Produced: 100\nConsumed: 100", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "Produced: 0\nConsumed: 0", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "Produced: 1\nConsumed: 1", isHidden: true, points: 10 },
        { input: "500", expectedOutput: "Produced: 500\nConsumed: 500", isHidden: true, points: 10 },
        { input: "250", expectedOutput: "Produced: 250\nConsumed: 250", isHidden: true, points: 10 },
        { input: "999", expectedOutput: "Produced: 999\nConsumed: 999", isHidden: true, points: 10 },
        { input: "75", expectedOutput: "Produced: 75\nConsumed: 75", isHidden: true, points: 10 },
        { input: "33", expectedOutput: "Produced: 33\nConsumed: 33", isHidden: true, points: 10 },
        { input: "777", expectedOutput: "Produced: 777\nConsumed: 777", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use notifyAll() to wake up multiple threads. Read n (number of threads) and print 'Waking up X threads' where X is n.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.println(\"Waking up \" + n + \" threads\"); } }",
      examples: [
        { input: "5", output: "Waking up 5 threads" },
        { input: "10", output: "Waking up 10 threads" }
      ],
      testCases: [
        { input: "5", expectedOutput: "Waking up 5 threads", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "Waking up 10 threads", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "Waking up 1 threads", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "Waking up 3 threads", isHidden: true, points: 10 },
        { input: "20", expectedOutput: "Waking up 20 threads", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "Waking up 7 threads", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "Waking up 15 threads", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "Waking up 2 threads", isHidden: true, points: 10 },
        { input: "50", expectedOutput: "Waking up 50 threads", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "Waking up 8 threads", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Implement bounded buffer with wait/notify. Read buffer size and item, print 'Buffer Size: X, Item: Y'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int bufferSize = sc.nextInt(); int item = sc.nextInt(); System.out.println(\"Buffer Size: \" + bufferSize + \", Item: \" + item); } }",
      examples: [
        { input: "10\n5", output: "Buffer Size: 10, Item: 5" },
        { input: "20\n15", output: "Buffer Size: 20, Item: 15" }
      ],
      testCases: [
        { input: "10\n5", expectedOutput: "Buffer Size: 10, Item: 5", isHidden: false, points: 10 },
        { input: "20\n15", expectedOutput: "Buffer Size: 20, Item: 15", isHidden: false, points: 10 },
        { input: "5\n1", expectedOutput: "Buffer Size: 5, Item: 1", isHidden: true, points: 10 },
        { input: "100\n50", expectedOutput: "Buffer Size: 100, Item: 50", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "Buffer Size: 1, Item: 1", isHidden: true, points: 10 },
        { input: "50\n25", expectedOutput: "Buffer Size: 50, Item: 25", isHidden: true, points: 10 },
        { input: "15\n7", expectedOutput: "Buffer Size: 15, Item: 7", isHidden: true, points: 10 },
        { input: "30\n20", expectedOutput: "Buffer Size: 30, Item: 20", isHidden: true, points: 10 },
        { input: "25\n12", expectedOutput: "Buffer Size: 25, Item: 12", isHidden: true, points: 10 },
        { input: "8\n4", expectedOutput: "Buffer Size: 8, Item: 4", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use Condition variables for thread coordination. Read a state ('READY' or 'WAITING') and print 'State: <state>'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String state = sc.next(); System.out.println(\"State: \" + state); } }",
      examples: [
        { input: "READY", output: "State: READY" },
        { input: "WAITING", output: "State: WAITING" }
      ],
      testCases: [
        { input: "READY", expectedOutput: "State: READY", isHidden: false, points: 10 },
        { input: "WAITING", expectedOutput: "State: WAITING", isHidden: false, points: 10 },
        { input: "READY", expectedOutput: "State: READY", isHidden: true, points: 10 },
        { input: "WAITING", expectedOutput: "State: WAITING", isHidden: true, points: 10 },
        { input: "READY", expectedOutput: "State: READY", isHidden: true, points: 10 },
        { input: "WAITING", expectedOutput: "State: WAITING", isHidden: true, points: 10 },
        { input: "READY", expectedOutput: "State: READY", isHidden: true, points: 10 },
        { input: "WAITING", expectedOutput: "State: WAITING", isHidden: true, points: 10 },
        { input: "READY", expectedOutput: "State: READY", isHidden: true, points: 10 },
        { input: "WAITING", expectedOutput: "State: WAITING", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 18: Executor Framework
function generateDay18Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Use ExecutorService with single thread. Read a number n and print numbers from 1 to n.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); for (int i = 1; i <= n; i++) { System.out.println(i); } } }",
      examples: [
        { input: "5", output: "1\n2\n3\n4\n5" },
        { input: "3", output: "1\n2\n3" }
      ],
      testCases: [
        { input: "5", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 },
        { input: "3", expectedOutput: "1\n2\n3", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "1\n2\n3\n4\n5\n6\n7", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "1\n2", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "1\n2\n3\n4", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "1\n2\n3\n4\n5\n6", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a fixed thread pool. Read pool size n and print 'Thread Pool Size: n'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.println(\"Thread Pool Size: \" + n); } }",
      examples: [
        { input: "5", output: "Thread Pool Size: 5" },
        { input: "10", output: "Thread Pool Size: 10" }
      ],
      testCases: [
        { input: "5", expectedOutput: "Thread Pool Size: 5", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "Thread Pool Size: 10", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "Thread Pool Size: 1", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "Thread Pool Size: 3", isHidden: true, points: 10 },
        { input: "20", expectedOutput: "Thread Pool Size: 20", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "Thread Pool Size: 7", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "Thread Pool Size: 15", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "Thread Pool Size: 2", isHidden: true, points: 10 },
        { input: "50", expectedOutput: "Thread Pool Size: 50", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "Thread Pool Size: 8", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Submit tasks using Callable. Read a number n and print its square.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int result = n * n; System.out.println(result); } }",
      examples: [
        { input: "5", output: "25" },
        { input: "10", output: "100" }
      ],
      testCases: [
        { input: "5", expectedOutput: "25", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "100", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "49", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "9", isHidden: true, points: 10 },
        { input: "12", expectedOutput: "144", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "36", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "81", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "16", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use Future to get task results. Read two numbers and print their sum (simulating async computation).",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int sum = a + b; System.out.println(sum); } }",
      examples: [
        { input: "10\n20", output: "30" },
        { input: "5\n15", output: "20" }
      ],
      testCases: [
        { input: "10\n20", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "5\n15", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "100\n200", expectedOutput: "300", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "50\n50", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "25\n75", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "99\n1", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "42\n8", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "7\n13", expectedOutput: "20", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Schedule tasks with ScheduledExecutorService. Read delay in seconds and message, print 'Scheduled: <message> in <delay>s'.",
      solution: "import java.util.Scanner; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int delay = sc.nextInt(); String message = sc.next(); System.out.println(\"Scheduled: \" + message + \" in \" + delay + \"s\"); } }",
      examples: [
        { input: "5\nHello", output: "Scheduled: Hello in 5s" },
        { input: "10\nTask", output: "Scheduled: Task in 10s" }
      ],
      testCases: [
        { input: "5\nHello", expectedOutput: "Scheduled: Hello in 5s", isHidden: false, points: 10 },
        { input: "10\nTask", expectedOutput: "Scheduled: Task in 10s", isHidden: false, points: 10 },
        { input: "1\nTest", expectedOutput: "Scheduled: Test in 1s", isHidden: true, points: 10 },
        { input: "3\nJob", expectedOutput: "Scheduled: Job in 3s", isHidden: true, points: 10 },
        { input: "20\nWork", expectedOutput: "Scheduled: Work in 20s", isHidden: true, points: 10 },
        { input: "7\nRun", expectedOutput: "Scheduled: Run in 7s", isHidden: true, points: 10 },
        { input: "15\nExecute", expectedOutput: "Scheduled: Execute in 15s", isHidden: true, points: 10 },
        { input: "2\nStart", expectedOutput: "Scheduled: Start in 2s", isHidden: true, points: 10 },
        { input: "30\nProcess", expectedOutput: "Scheduled: Process in 30s", isHidden: true, points: 10 },
        { input: "8\nCompute", expectedOutput: "Scheduled: Compute in 8s", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 19: Concurrent Collections
function generateDay19Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Use ConcurrentHashMap to store key-value pairs safely. Read n, then n pairs of keys (strings) and values (integers). Print each key-value pair as 'key: value'.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>(); for (int i = 0; i < n; i++) { String key = sc.next(); int value = sc.nextInt(); map.put(key, value); } for (Map.Entry<String, Integer> entry : map.entrySet()) { System.out.println(entry.getKey() + \": \" + entry.getValue()); } } }",
      examples: [
        { input: "2\nkey1\n10\nkey2\n20", output: "key1: 10\nkey2: 20" },
        { input: "3\na\n5\nb\n10\nc\n15", output: "a: 5\nb: 10\nc: 15" }
      ],
      testCases: [
        { input: "2\nkey1\n10\nkey2\n20", expectedOutput: "key1: 10\nkey2: 20", isHidden: false, points: 10 },
        { input: "3\na\n5\nb\n10\nc\n15", expectedOutput: "a: 5\nb: 10\nc: 15", isHidden: false, points: 10 },
        { input: "1\nx\n100", expectedOutput: "x: 100", isHidden: true, points: 10 },
        { input: "4\nA\n1\nB\n2\nC\n3\nD\n4", expectedOutput: "A: 1\nB: 2\nC: 3\nD: 4", isHidden: true, points: 10 },
        { input: "2\nfirst\n50\nsecond\n100", expectedOutput: "first: 50\nsecond: 100", isHidden: true, points: 10 },
        { input: "3\none\n1\ntwo\n2\nthree\n3", expectedOutput: "one: 1\ntwo: 2\nthree: 3", isHidden: true, points: 10 },
        { input: "5\nk1\n10\nk2\n20\nk3\n30\nk4\n40\nk5\n50", expectedOutput: "k1: 10\nk2: 20\nk3: 30\nk4: 40\nk5: 50", isHidden: true, points: 10 },
        { input: "2\ntest\n99\ndata\n88", expectedOutput: "test: 99\ndata: 88", isHidden: true, points: 10 },
        { input: "3\nalpha\n11\nbeta\n22\ngamma\n33", expectedOutput: "alpha: 11\nbeta: 22\ngamma: 33", isHidden: true, points: 10 },
        { input: "4\nw\n5\nx\n10\ny\n15\nz\n20", expectedOutput: "w: 5\nx: 10\ny: 15\nz: 20", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use CopyOnWriteArrayList for thread-safe list operations. Read n integers, add them to the list, and print all elements.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); CopyOnWriteArrayList<Integer> list = new CopyOnWriteArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.nextInt()); } for (int num : list) { System.out.println(num); } } }",
      examples: [
        { input: "3\n10\n20\n30", output: "10\n20\n30" },
        { input: "5\n1\n2\n3\n4\n5", output: "1\n2\n3\n4\n5" }
      ],
      testCases: [
        { input: "3\n10\n20\n30", expectedOutput: "10\n20\n30", isHidden: false, points: 10 },
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "2\n100\n200", expectedOutput: "100\n200", isHidden: true, points: 10 },
        { input: "4\n7\n14\n21\n28", expectedOutput: "7\n14\n21\n28", isHidden: true, points: 10 },
        { input: "6\n5\n10\n15\n20\n25\n30", expectedOutput: "5\n10\n15\n20\n25\n30", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0\n0\n0", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "11\n22\n33\n44\n55\n66\n77", isHidden: true, points: 10 },
        { input: "2\n50\n50", expectedOutput: "50\n50", isHidden: true, points: 10 },
        { input: "4\n9\n8\n7\n6", expectedOutput: "9\n8\n7\n6", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use BlockingQueue for producer-consumer pattern. Read n numbers and print 'Added: X' for each, simulating queue operations.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); BlockingQueue<Integer> queue = new LinkedBlockingQueue<>(); for (int i = 0; i < n; i++) { int num = sc.nextInt(); try { queue.put(num); System.out.println(\"Added: \" + num); } catch (InterruptedException e) {} } } }",
      examples: [
        { input: "3\n10\n20\n30", output: "Added: 10\nAdded: 20\nAdded: 30" },
        { input: "2\n5\n15", output: "Added: 5\nAdded: 15" }
      ],
      testCases: [
        { input: "3\n10\n20\n30", expectedOutput: "Added: 10\nAdded: 20\nAdded: 30", isHidden: false, points: 10 },
        { input: "2\n5\n15", expectedOutput: "Added: 5\nAdded: 15", isHidden: false, points: 10 },
        { input: "1\n100", expectedOutput: "Added: 100", isHidden: true, points: 10 },
        { input: "4\n1\n2\n3\n4", expectedOutput: "Added: 1\nAdded: 2\nAdded: 3\nAdded: 4", isHidden: true, points: 10 },
        { input: "5\n10\n20\n30\n40\n50", expectedOutput: "Added: 10\nAdded: 20\nAdded: 30\nAdded: 40\nAdded: 50", isHidden: true, points: 10 },
        { input: "2\n0\n0", expectedOutput: "Added: 0\nAdded: 0", isHidden: true, points: 10 },
        { input: "6\n5\n10\n15\n20\n25\n30", expectedOutput: "Added: 5\nAdded: 10\nAdded: 15\nAdded: 20\nAdded: 25\nAdded: 30", isHidden: true, points: 10 },
        { input: "3\n7\n14\n21", expectedOutput: "Added: 7\nAdded: 14\nAdded: 21", isHidden: true, points: 10 },
        { input: "4\n25\n50\n75\n100", expectedOutput: "Added: 25\nAdded: 50\nAdded: 75\nAdded: 100", isHidden: true, points: 10 },
        { input: "2\n99\n88", expectedOutput: "Added: 99\nAdded: 88", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use ConcurrentLinkedQueue for non-blocking operations. Read n integers, offer them to queue, and poll all elements to print.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); ConcurrentLinkedQueue<Integer> queue = new ConcurrentLinkedQueue<>(); for (int i = 0; i < n; i++) { queue.offer(sc.nextInt()); } while (!queue.isEmpty()) { System.out.println(queue.poll()); } } }",
      examples: [
        { input: "3\n10\n20\n30", output: "10\n20\n30" },
        { input: "5\n1\n2\n3\n4\n5", output: "1\n2\n3\n4\n5" }
      ],
      testCases: [
        { input: "3\n10\n20\n30", expectedOutput: "10\n20\n30", isHidden: false, points: 10 },
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "2\n100\n200", expectedOutput: "100\n200", isHidden: true, points: 10 },
        { input: "4\n7\n14\n21\n28", expectedOutput: "7\n14\n21\n28", isHidden: true, points: 10 },
        { input: "6\n5\n10\n15\n20\n25\n30", expectedOutput: "5\n10\n15\n20\n25\n30", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0\n0\n0", isHidden: true, points: 10 },
        { input: "7\n11\n22\n33\n44\n55\n66\n77", expectedOutput: "11\n22\n33\n44\n55\n66\n77", isHidden: true, points: 10 },
        { input: "2\n50\n50", expectedOutput: "50\n50", isHidden: true, points: 10 },
        { input: "4\n9\n8\n7\n6", expectedOutput: "9\n8\n7\n6", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use ConcurrentSkipListSet for sorted concurrent set. Read n integers, add to set, and print in sorted order.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); ConcurrentSkipListSet<Integer> set = new ConcurrentSkipListSet<>(); for (int i = 0; i < n; i++) { set.add(sc.nextInt()); } for (int num : set) { System.out.println(num); } } }",
      examples: [
        { input: "5\n30\n10\n50\n20\n40", output: "10\n20\n30\n40\n50" },
        { input: "3\n9\n3\n6", output: "3\n6\n9" }
      ],
      testCases: [
        { input: "5\n30\n10\n50\n20\n40", expectedOutput: "10\n20\n30\n40\n50", isHidden: false, points: 10 },
        { input: "3\n9\n3\n6", expectedOutput: "3\n6\n9", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n100\n25\n75\n50", expectedOutput: "25\n50\n75\n100", isHidden: true, points: 10 },
        { input: "6\n5\n3\n8\n1\n9\n2", expectedOutput: "1\n2\n3\n5\n8\n9", isHidden: true, points: 10 },
        { input: "2\n20\n10", expectedOutput: "10\n20", isHidden: true, points: 10 },
        { input: "7\n70\n30\n90\n10\n50\n60\n40", expectedOutput: "10\n30\n40\n50\n60\n70\n90", isHidden: true, points: 10 },
        { input: "3\n5\n5\n5", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "5\n15\n5\n25\n10\n20", expectedOutput: "5\n10\n15\n20\n25", isHidden: true, points: 10 },
        { input: "4\n4\n3\n2\n1", expectedOutput: "1\n2\n3\n4", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 20: CompletableFuture
function generateDay20Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Create a CompletableFuture that returns a value. Read an integer n and print its square (simulating async computation).",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> n * n); try { System.out.println(future.get()); } catch (Exception e) {} } }",
      examples: [
        { input: "5", output: "25" },
        { input: "10", output: "100" }
      ],
      testCases: [
        { input: "5", expectedOutput: "25", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "100", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "49", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "9", isHidden: true, points: 10 },
        { input: "12", expectedOutput: "144", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "36", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "81", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "16", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Chain CompletableFutures with thenApply. Read a number, double it, then add 10. Print the final result.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> n).thenApply(x -> x * 2).thenApply(x -> x + 10); try { System.out.println(future.get()); } catch (Exception e) {} } }",
      examples: [
        { input: "5", output: "20" },
        { input: "10", output: "30" }
      ],
      testCases: [
        { input: "5", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "12", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "16", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "24", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "14", isHidden: true, points: 10 },
        { input: "15", expectedOutput: "40", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "18", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "26", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Combine two CompletableFutures with thenCombine. Read two numbers and print their sum.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> a); CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> b); CompletableFuture<Integer> combined = future1.thenCombine(future2, (x, y) -> x + y); try { System.out.println(combined.get()); } catch (Exception e) {} } }",
      examples: [
        { input: "10\n20", output: "30" },
        { input: "5\n15", output: "20" }
      ],
      testCases: [
        { input: "10\n20", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "5\n15", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "100\n200", expectedOutput: "300", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "50\n50", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "25\n75", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "99\n1", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "42\n8", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "7\n13", expectedOutput: "20", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Handle exceptions with exceptionally. Read a number, divide 100 by it. If zero, print 'Error', else print result.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> { if (n == 0) throw new ArithmeticException(); return String.valueOf(100 / n); }).exceptionally(ex -> \"Error\"); try { System.out.println(future.get()); } catch (Exception e) {} } }",
      examples: [
        { input: "10", output: "10" },
        { input: "0", output: "Error" }
      ],
      testCases: [
        { input: "10", expectedOutput: "10", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "Error", isHidden: false, points: 10 },
        { input: "5", expectedOutput: "20", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "25", isHidden: true, points: 10 },
        { input: "0", expectedOutput: "Error", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "20", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "0", expectedOutput: "Error", isHidden: true, points: 10 },
        { input: "25", expectedOutput: "4", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use allOf to wait for multiple futures. Read three numbers and print their sum after all complete.",
      solution: "import java.util.*; import java.util.concurrent.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int c = sc.nextInt(); CompletableFuture<Integer> f1 = CompletableFuture.supplyAsync(() -> a); CompletableFuture<Integer> f2 = CompletableFuture.supplyAsync(() -> b); CompletableFuture<Integer> f3 = CompletableFuture.supplyAsync(() -> c); CompletableFuture<Void> all = CompletableFuture.allOf(f1, f2, f3); try { all.get(); int sum = f1.get() + f2.get() + f3.get(); System.out.println(sum); } catch (Exception e) {} } }",
      examples: [
        { input: "10\n20\n30", output: "60" },
        { input: "5\n10\n15", output: "30" }
      ],
      testCases: [
        { input: "10\n20\n30", expectedOutput: "60", isHidden: false, points: 10 },
        { input: "5\n10\n15", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "0\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "1\n2\n3", expectedOutput: "6", isHidden: true, points: 10 },
        { input: "100\n200\n300", expectedOutput: "600", isHidden: true, points: 10 },
        { input: "25\n25\n25", expectedOutput: "75", isHidden: true, points: 10 },
        { input: "7\n14\n21", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "50\n50\n50", expectedOutput: "150", isHidden: true, points: 10 },
        { input: "11\n22\n33", expectedOutput: "66", isHidden: true, points: 10 },
        { input: "10\n10\n10", expectedOutput: "30", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 21: Week 4 Concurrency Project
function generateDay21Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Build a simple thread-safe counter. Read n operations, each with 'INC' or 'GET'. For INC, increment counter. For GET, print current value.",
      solution: "import java.util.*; public class Solution { private static int counter = 0; public static synchronized void increment() { counter++; } public static synchronized int get() { return counter; } public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); for (int i = 0; i < n; i++) { String op = sc.next(); if (op.equals(\"INC\")) { increment(); } else { System.out.println(get()); } } } }",
      examples: [
        { input: "4\nINC\nINC\nGET\nINC", output: "2" },
        { input: "3\nINC\nGET\nGET", output: "1\n1" }
      ],
      testCases: [
        { input: "4\nINC\nINC\nGET\nINC", expectedOutput: "2", isHidden: false, points: 10 },
        { input: "3\nINC\nGET\nGET", expectedOutput: "1\n1", isHidden: false, points: 10 },
        { input: "2\nGET\nGET", expectedOutput: "0\n0", isHidden: true, points: 10 },
        { input: "5\nINC\nINC\nINC\nGET\nINC", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "1\nGET", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "6\nINC\nINC\nGET\nINC\nINC\nGET", expectedOutput: "2\n4", isHidden: true, points: 10 },
        { input: "3\nINC\nINC\nINC", expectedOutput: "", isHidden: true, points: 10 },
        { input: "4\nGET\nINC\nGET\nINC", expectedOutput: "0\n1", isHidden: true, points: 10 },
        { input: "5\nINC\nGET\nINC\nGET\nINC", expectedOutput: "1\n2", isHidden: true, points: 10 },
        { input: "2\nINC\nGET", expectedOutput: "1", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Implement a simple task scheduler. Read n tasks with task names, print 'Executing: <task>' for each.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); for (int i = 0; i < n; i++) { String task = sc.next(); System.out.println(\"Executing: \" + task); } } }",
      examples: [
        { input: "3\nTask1\nTask2\nTask3", output: "Executing: Task1\nExecuting: Task2\nExecuting: Task3" },
        { input: "2\nJobA\nJobB", output: "Executing: JobA\nExecuting: JobB" }
      ],
      testCases: [
        { input: "3\nTask1\nTask2\nTask3", expectedOutput: "Executing: Task1\nExecuting: Task2\nExecuting: Task3", isHidden: false, points: 10 },
        { input: "2\nJobA\nJobB", expectedOutput: "Executing: JobA\nExecuting: JobB", isHidden: false, points: 10 },
        { input: "1\nSingleTask", expectedOutput: "Executing: SingleTask", isHidden: true, points: 10 },
        { input: "4\nA\nB\nC\nD", expectedOutput: "Executing: A\nExecuting: B\nExecuting: C\nExecuting: D", isHidden: true, points: 10 },
        { input: "5\nWork1\nWork2\nWork3\nWork4\nWork5", expectedOutput: "Executing: Work1\nExecuting: Work2\nExecuting: Work3\nExecuting: Work4\nExecuting: Work5", isHidden: true, points: 10 },
        { input: "2\nFirst\nSecond", expectedOutput: "Executing: First\nExecuting: Second", isHidden: true, points: 10 },
        { input: "3\nRun1\nRun2\nRun3", expectedOutput: "Executing: Run1\nExecuting: Run2\nExecuting: Run3", isHidden: true, points: 10 },
        { input: "1\nTest", expectedOutput: "Executing: Test", isHidden: true, points: 10 },
        { input: "4\nP1\nP2\nP3\nP4", expectedOutput: "Executing: P1\nExecuting: P2\nExecuting: P3\nExecuting: P4", isHidden: true, points: 10 },
        { input: "2\nAlpha\nBeta", expectedOutput: "Executing: Alpha\nExecuting: Beta", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a thread pool manager simulator. Read pool size n and number of tasks m. Print 'Pool size: n, Tasks: m'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int m = sc.nextInt(); System.out.println(\"Pool size: \" + n + \", Tasks: \" + m); } }",
      examples: [
        { input: "5\n10", output: "Pool size: 5, Tasks: 10" },
        { input: "3\n7", output: "Pool size: 3, Tasks: 7" }
      ],
      testCases: [
        { input: "5\n10", expectedOutput: "Pool size: 5, Tasks: 10", isHidden: false, points: 10 },
        { input: "3\n7", expectedOutput: "Pool size: 3, Tasks: 7", isHidden: false, points: 10 },
        { input: "1\n1", expectedOutput: "Pool size: 1, Tasks: 1", isHidden: true, points: 10 },
        { input: "10\n20", expectedOutput: "Pool size: 10, Tasks: 20", isHidden: true, points: 10 },
        { input: "2\n5", expectedOutput: "Pool size: 2, Tasks: 5", isHidden: true, points: 10 },
        { input: "8\n15", expectedOutput: "Pool size: 8, Tasks: 15", isHidden: true, points: 10 },
        { input: "4\n8", expectedOutput: "Pool size: 4, Tasks: 8", isHidden: true, points: 10 },
        { input: "7\n14", expectedOutput: "Pool size: 7, Tasks: 14", isHidden: true, points: 10 },
        { input: "6\n12", expectedOutput: "Pool size: 6, Tasks: 12", isHidden: true, points: 10 },
        { input: "9\n18", expectedOutput: "Pool size: 9, Tasks: 18", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Implement a simple rate limiter. Read requests per second limit n and number of requests m. Print 'Allowed: X' where X is min(n, m).",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int m = sc.nextInt(); int allowed = Math.min(n, m); System.out.println(\"Allowed: \" + allowed); } }",
      examples: [
        { input: "5\n3", output: "Allowed: 3" },
        { input: "10\n15", output: "Allowed: 10" }
      ],
      testCases: [
        { input: "5\n3", expectedOutput: "Allowed: 3", isHidden: false, points: 10 },
        { input: "10\n15", expectedOutput: "Allowed: 10", isHidden: false, points: 10 },
        { input: "1\n1", expectedOutput: "Allowed: 1", isHidden: true, points: 10 },
        { input: "100\n50", expectedOutput: "Allowed: 50", isHidden: true, points: 10 },
        { input: "20\n30", expectedOutput: "Allowed: 20", isHidden: true, points: 10 },
        { input: "7\n7", expectedOutput: "Allowed: 7", isHidden: true, points: 10 },
        { input: "15\n10", expectedOutput: "Allowed: 10", isHidden: true, points: 10 },
        { input: "3\n5", expectedOutput: "Allowed: 3", isHidden: true, points: 10 },
        { input: "50\n50", expectedOutput: "Allowed: 50", isHidden: true, points: 10 },
        { input: "8\n12", expectedOutput: "Allowed: 8", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Build a concurrent cache simulator. Read n entries as key-value pairs. Print 'Cached: n entries'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); for (int i = 0; i < n; i++) { sc.next(); sc.nextInt(); } System.out.println(\"Cached: \" + n + \" entries\"); } }",
      examples: [
        { input: "2\nkey1\n10\nkey2\n20", output: "Cached: 2 entries" },
        { input: "3\na\n5\nb\n10\nc\n15", output: "Cached: 3 entries" }
      ],
      testCases: [
        { input: "2\nkey1\n10\nkey2\n20", expectedOutput: "Cached: 2 entries", isHidden: false, points: 10 },
        { input: "3\na\n5\nb\n10\nc\n15", expectedOutput: "Cached: 3 entries", isHidden: false, points: 10 },
        { input: "1\nx\n100", expectedOutput: "Cached: 1 entries", isHidden: true, points: 10 },
        { input: "4\nA\n1\nB\n2\nC\n3\nD\n4", expectedOutput: "Cached: 4 entries", isHidden: true, points: 10 },
        { input: "5\nk1\n10\nk2\n20\nk3\n30\nk4\n40\nk5\n50", expectedOutput: "Cached: 5 entries", isHidden: true, points: 10 },
        { input: "2\nfirst\n50\nsecond\n100", expectedOutput: "Cached: 2 entries", isHidden: true, points: 10 },
        { input: "3\none\n1\ntwo\n2\nthree\n3", expectedOutput: "Cached: 3 entries", isHidden: true, points: 10 },
        { input: "1\ntest\n99", expectedOutput: "Cached: 1 entries", isHidden: true, points: 10 },
        { input: "4\nw\n5\nx\n10\ny\n15\nz\n20", expectedOutput: "Cached: 4 entries", isHidden: true, points: 10 },
        { input: "2\nalpha\n11\nbeta\n22", expectedOutput: "Cached: 2 entries", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 22: JDBC Basics
function generateDay22Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate database connection string creation. Read host, port, and database name. Print 'jdbc:mysql://<host>:<port>/<database>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String host = sc.next(); int port = sc.nextInt(); String database = sc.next(); System.out.println(\"jdbc:mysql://\" + host + \":\" + port + \"/\" + database); } }",
      examples: [
        { input: "localhost\n3306\nmydb", output: "jdbc:mysql://localhost:3306/mydb" },
        { input: "127.0.0.1\n3307\ntestdb", output: "jdbc:mysql://127.0.0.1:3307/testdb" }
      ],
      testCases: [
        { input: "localhost\n3306\nmydb", expectedOutput: "jdbc:mysql://localhost:3306/mydb", isHidden: false, points: 10 },
        { input: "127.0.0.1\n3307\ntestdb", expectedOutput: "jdbc:mysql://127.0.0.1:3307/testdb", isHidden: false, points: 10 },
        { input: "192.168.1.1\n3306\nproduction", expectedOutput: "jdbc:mysql://192.168.1.1:3306/production", isHidden: true, points: 10 },
        { input: "db.example.com\n3308\nusers", expectedOutput: "jdbc:mysql://db.example.com:3308/users", isHidden: true, points: 10 },
        { input: "localhost\n5432\npostgres", expectedOutput: "jdbc:mysql://localhost:5432/postgres", isHidden: true, points: 10 },
        { input: "server1\n3306\norders", expectedOutput: "jdbc:mysql://server1:3306/orders", isHidden: true, points: 10 },
        { input: "10.0.0.5\n3306\ninventory", expectedOutput: "jdbc:mysql://10.0.0.5:3306/inventory", isHidden: true, points: 10 },
        { input: "dbhost\n8080\napp", expectedOutput: "jdbc:mysql://dbhost:8080/app", isHidden: true, points: 10 },
        { input: "localhost\n3306\nshop", expectedOutput: "jdbc:mysql://localhost:3306/shop", isHidden: true, points: 10 },
        { input: "mysql.cloud.com\n3306\ndata", expectedOutput: "jdbc:mysql://mysql.cloud.com:3306/data", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate SQL query builder. Read table name and column name. Print 'SELECT <column> FROM <table>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String table = sc.next(); String column = sc.next(); System.out.println(\"SELECT \" + column + \" FROM \" + table); } }",
      examples: [
        { input: "users\nname", output: "SELECT name FROM users" },
        { input: "products\nprice", output: "SELECT price FROM products" }
      ],
      testCases: [
        { input: "users\nname", expectedOutput: "SELECT name FROM users", isHidden: false, points: 10 },
        { input: "products\nprice", expectedOutput: "SELECT price FROM products", isHidden: false, points: 10 },
        { input: "employees\nsalary", expectedOutput: "SELECT salary FROM employees", isHidden: true, points: 10 },
        { input: "orders\ntotal", expectedOutput: "SELECT total FROM orders", isHidden: true, points: 10 },
        { input: "customers\nemail", expectedOutput: "SELECT email FROM customers", isHidden: true, points: 10 },
        { input: "items\nquantity", expectedOutput: "SELECT quantity FROM items", isHidden: true, points: 10 },
        { input: "accounts\nbalance", expectedOutput: "SELECT balance FROM accounts", isHidden: true, points: 10 },
        { input: "students\ngrade", expectedOutput: "SELECT grade FROM students", isHidden: true, points: 10 },
        { input: "books\nauthor", expectedOutput: "SELECT author FROM books", isHidden: true, points: 10 },
        { input: "movies\ntitle", expectedOutput: "SELECT title FROM movies", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate INSERT statement builder. Read table name, column, and value. Print 'INSERT INTO <table> (<column>) VALUES (<value>)'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String table = sc.next(); String column = sc.next(); String value = sc.next(); System.out.println(\"INSERT INTO \" + table + \" (\" + column + \") VALUES (\" + value + \")\"); } }",
      examples: [
        { input: "users\nname\nJohn", output: "INSERT INTO users (name) VALUES (John)" },
        { input: "products\nprice\n100", output: "INSERT INTO products (price) VALUES (100)" }
      ],
      testCases: [
        { input: "users\nname\nJohn", expectedOutput: "INSERT INTO users (name) VALUES (John)", isHidden: false, points: 10 },
        { input: "products\nprice\n100", expectedOutput: "INSERT INTO products (price) VALUES (100)", isHidden: false, points: 10 },
        { input: "employees\nsalary\n50000", expectedOutput: "INSERT INTO employees (salary) VALUES (50000)", isHidden: true, points: 10 },
        { input: "orders\ntotal\n250", expectedOutput: "INSERT INTO orders (total) VALUES (250)", isHidden: true, points: 10 },
        { input: "customers\nemail\ntest@example.com", expectedOutput: "INSERT INTO customers (email) VALUES (test@example.com)", isHidden: true, points: 10 },
        { input: "items\nquantity\n10", expectedOutput: "INSERT INTO items (quantity) VALUES (10)", isHidden: true, points: 10 },
        { input: "accounts\nbalance\n1000", expectedOutput: "INSERT INTO accounts (balance) VALUES (1000)", isHidden: true, points: 10 },
        { input: "students\ngrade\nA", expectedOutput: "INSERT INTO students (grade) VALUES (A)", isHidden: true, points: 10 },
        { input: "books\nauthor\nSmith", expectedOutput: "INSERT INTO books (author) VALUES (Smith)", isHidden: true, points: 10 },
        { input: "movies\ntitle\nInception", expectedOutput: "INSERT INTO movies (title) VALUES (Inception)", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate UPDATE statement builder. Read table, column, new value, and id. Print 'UPDATE <table> SET <column>=<value> WHERE id=<id>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String table = sc.next(); String column = sc.next(); String value = sc.next(); int id = sc.nextInt(); System.out.println(\"UPDATE \" + table + \" SET \" + column + \"=\" + value + \" WHERE id=\" + id); } }",
      examples: [
        { input: "users\nname\nAlice\n5", output: "UPDATE users SET name=Alice WHERE id=5" },
        { input: "products\nprice\n200\n10", output: "UPDATE products SET price=200 WHERE id=10" }
      ],
      testCases: [
        { input: "users\nname\nAlice\n5", expectedOutput: "UPDATE users SET name=Alice WHERE id=5", isHidden: false, points: 10 },
        { input: "products\nprice\n200\n10", expectedOutput: "UPDATE products SET price=200 WHERE id=10", isHidden: false, points: 10 },
        { input: "employees\nsalary\n60000\n1", expectedOutput: "UPDATE employees SET salary=60000 WHERE id=1", isHidden: true, points: 10 },
        { input: "orders\ntotal\n300\n7", expectedOutput: "UPDATE orders SET total=300 WHERE id=7", isHidden: true, points: 10 },
        { input: "customers\nemail\nnew@test.com\n3", expectedOutput: "UPDATE customers SET email=new@test.com WHERE id=3", isHidden: true, points: 10 },
        { input: "items\nquantity\n20\n15", expectedOutput: "UPDATE items SET quantity=20 WHERE id=15", isHidden: true, points: 10 },
        { input: "accounts\nbalance\n2000\n9", expectedOutput: "UPDATE accounts SET balance=2000 WHERE id=9", isHidden: true, points: 10 },
        { input: "students\ngrade\nB\n12", expectedOutput: "UPDATE students SET grade=B WHERE id=12", isHidden: true, points: 10 },
        { input: "books\nauthor\nJones\n4", expectedOutput: "UPDATE books SET author=Jones WHERE id=4", isHidden: true, points: 10 },
        { input: "movies\ntitle\nMatrix\n8", expectedOutput: "UPDATE movies SET title=Matrix WHERE id=8", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate DELETE statement builder. Read table name and id. Print 'DELETE FROM <table> WHERE id=<id>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String table = sc.next(); int id = sc.nextInt(); System.out.println(\"DELETE FROM \" + table + \" WHERE id=\" + id); } }",
      examples: [
        { input: "users\n5", output: "DELETE FROM users WHERE id=5" },
        { input: "products\n10", output: "DELETE FROM products WHERE id=10" }
      ],
      testCases: [
        { input: "users\n5", expectedOutput: "DELETE FROM users WHERE id=5", isHidden: false, points: 10 },
        { input: "products\n10", expectedOutput: "DELETE FROM products WHERE id=10", isHidden: false, points: 10 },
        { input: "employees\n1", expectedOutput: "DELETE FROM employees WHERE id=1", isHidden: true, points: 10 },
        { input: "orders\n7", expectedOutput: "DELETE FROM orders WHERE id=7", isHidden: true, points: 10 },
        { input: "customers\n3", expectedOutput: "DELETE FROM customers WHERE id=3", isHidden: true, points: 10 },
        { input: "items\n15", expectedOutput: "DELETE FROM items WHERE id=15", isHidden: true, points: 10 },
        { input: "accounts\n9", expectedOutput: "DELETE FROM accounts WHERE id=9", isHidden: true, points: 10 },
        { input: "students\n12", expectedOutput: "DELETE FROM students WHERE id=12", isHidden: true, points: 10 },
        { input: "books\n4", expectedOutput: "DELETE FROM books WHERE id=4", isHidden: true, points: 10 },
        { input: "movies\n8", expectedOutput: "DELETE FROM movies WHERE id=8", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 23: Operators in Java
function generateDay23Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Demonstrate arithmetic operators. Read two numbers a and b. Print their sum, difference, product, quotient, and remainder on separate lines.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a + b); System.out.println(a - b); System.out.println(a * b); System.out.println(a / b); System.out.println(a % b); } }",
      examples: [
        { input: "10\n3", output: "13\n7\n30\n3\n1" },
        { input: "20\n4", output: "24\n16\n80\n5\n0" }
      ],
      testCases: [
        { input: "10\n3", expectedOutput: "13\n7\n30\n3\n1", isHidden: false, points: 10 },
        { input: "20\n4", expectedOutput: "24\n16\n80\n5\n0", isHidden: false, points: 10 },
        { input: "15\n5", expectedOutput: "20\n10\n75\n3\n0", isHidden: true, points: 10 },
        { input: "100\n7", expectedOutput: "107\n93\n700\n14\n2", isHidden: true, points: 10 },
        { input: "50\n6", expectedOutput: "56\n44\n300\n8\n2", isHidden: true, points: 10 },
        { input: "25\n5", expectedOutput: "30\n20\n125\n5\n0", isHidden: true, points: 10 },
        { input: "8\n2", expectedOutput: "10\n6\n16\n4\n0", isHidden: true, points: 10 },
        { input: "17\n3", expectedOutput: "20\n14\n51\n5\n2", isHidden: true, points: 10 },
        { input: "30\n4", expectedOutput: "34\n26\n120\n7\n2", isHidden: true, points: 10 },
        { input: "9\n2", expectedOutput: "11\n7\n18\n4\n1", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate relational operators. Read two numbers and print results of ==, !=, >, <, >=, <= as true/false.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a == b); System.out.println(a != b); System.out.println(a > b); System.out.println(a < b); System.out.println(a >= b); System.out.println(a <= b); } }",
      examples: [
        { input: "5\n5", output: "true\nfalse\nfalse\nfalse\ntrue\ntrue" },
        { input: "10\n5", output: "false\ntrue\ntrue\nfalse\ntrue\nfalse" }
      ],
      testCases: [
        { input: "5\n5", expectedOutput: "true\nfalse\nfalse\nfalse\ntrue\ntrue", isHidden: false, points: 10 },
        { input: "10\n5", expectedOutput: "false\ntrue\ntrue\nfalse\ntrue\nfalse", isHidden: false, points: 10 },
        { input: "3\n7", expectedOutput: "false\ntrue\nfalse\ntrue\nfalse\ntrue", isHidden: true, points: 10 },
        { input: "15\n15", expectedOutput: "true\nfalse\nfalse\nfalse\ntrue\ntrue", isHidden: true, points: 10 },
        { input: "20\n10", expectedOutput: "false\ntrue\ntrue\nfalse\ntrue\nfalse", isHidden: true, points: 10 },
        { input: "8\n12", expectedOutput: "false\ntrue\nfalse\ntrue\nfalse\ntrue", isHidden: true, points: 10 },
        { input: "0\n0", expectedOutput: "true\nfalse\nfalse\nfalse\ntrue\ntrue", isHidden: true, points: 10 },
        { input: "100\n50", expectedOutput: "false\ntrue\ntrue\nfalse\ntrue\nfalse", isHidden: true, points: 10 },
        { input: "7\n7", expectedOutput: "true\nfalse\nfalse\nfalse\ntrue\ntrue", isHidden: true, points: 10 },
        { input: "4\n9", expectedOutput: "false\ntrue\nfalse\ntrue\nfalse\ntrue", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate logical operators. Read two boolean values (1 for true, 0 for false). Print results of AND, OR, NOT for first value.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); boolean a = sc.nextInt() == 1; boolean b = sc.nextInt() == 1; System.out.println(a && b); System.out.println(a || b); System.out.println(!a); } }",
      examples: [
        { input: "1\n1", output: "true\ntrue\nfalse" },
        { input: "1\n0", output: "false\ntrue\nfalse" }
      ],
      testCases: [
        { input: "1\n1", expectedOutput: "true\ntrue\nfalse", isHidden: false, points: 10 },
        { input: "1\n0", expectedOutput: "false\ntrue\nfalse", isHidden: false, points: 10 },
        { input: "0\n0", expectedOutput: "false\nfalse\ntrue", isHidden: true, points: 10 },
        { input: "0\n1", expectedOutput: "false\ntrue\ntrue", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "true\ntrue\nfalse", isHidden: true, points: 10 },
        { input: "0\n0", expectedOutput: "false\nfalse\ntrue", isHidden: true, points: 10 },
        { input: "1\n0", expectedOutput: "false\ntrue\nfalse", isHidden: true, points: 10 },
        { input: "0\n1", expectedOutput: "false\ntrue\ntrue", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "true\ntrue\nfalse", isHidden: true, points: 10 },
        { input: "0\n0", expectedOutput: "false\nfalse\ntrue", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate bitwise operators. Read two integers and print results of &, |, ^, left shift by 1, right shift by 1.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a & b); System.out.println(a | b); System.out.println(a ^ b); System.out.println(a << 1); System.out.println(a >> 1); } }",
      examples: [
        { input: "5\n3", output: "1\n7\n6\n10\n2" },
        { input: "12\n10", output: "8\n14\n6\n24\n6" }
      ],
      testCases: [
        { input: "5\n3", expectedOutput: "1\n7\n6\n10\n2", isHidden: false, points: 10 },
        { input: "12\n10", expectedOutput: "8\n14\n6\n24\n6", isHidden: false, points: 10 },
        { input: "7\n4", expectedOutput: "4\n7\n3\n14\n3", isHidden: true, points: 10 },
        { input: "15\n9", expectedOutput: "9\n15\n6\n30\n7", isHidden: true, points: 10 },
        { input: "6\n2", expectedOutput: "2\n6\n4\n12\n3", isHidden: true, points: 10 },
        { input: "8\n4", expectedOutput: "0\n12\n12\n16\n4", isHidden: true, points: 10 },
        { input: "11\n7", expectedOutput: "3\n15\n12\n22\n5", isHidden: true, points: 10 },
        { input: "20\n16", expectedOutput: "16\n20\n4\n40\n10", isHidden: true, points: 10 },
        { input: "9\n5", expectedOutput: "1\n13\n12\n18\n4", isHidden: true, points: 10 },
        { input: "14\n6", expectedOutput: "6\n14\n8\n28\n7", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Demonstrate ternary operator. Read three integers: a, b, c. Print max of a and b, then print 'Even' if c is even else 'Odd'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int c = sc.nextInt(); System.out.println(a > b ? a : b); System.out.println(c % 2 == 0 ? \"Even\" : \"Odd\"); } }",
      examples: [
        { input: "10\n5\n4", output: "10\nEven" },
        { input: "3\n7\n9", output: "7\nOdd" }
      ],
      testCases: [
        { input: "10\n5\n4", expectedOutput: "10\nEven", isHidden: false, points: 10 },
        { input: "3\n7\n9", expectedOutput: "7\nOdd", isHidden: false, points: 10 },
        { input: "15\n20\n6", expectedOutput: "20\nEven", isHidden: true, points: 10 },
        { input: "100\n50\n11", expectedOutput: "100\nOdd", isHidden: true, points: 10 },
        { input: "8\n8\n8", expectedOutput: "8\nEven", isHidden: true, points: 10 },
        { input: "25\n30\n15", expectedOutput: "30\nOdd", isHidden: true, points: 10 },
        { input: "40\n35\n20", expectedOutput: "40\nEven", isHidden: true, points: 10 },
        { input: "12\n18\n7", expectedOutput: "18\nOdd", isHidden: true, points: 10 },
        { input: "5\n5\n10", expectedOutput: "5\nEven", isHidden: true, points: 10 },
        { input: "99\n100\n99", expectedOutput: "100\nOdd", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 24: PreparedStatement & CallableStatement
function generateDay24Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate PreparedStatement parameter binding. Read table, column, and value. Print 'PreparedStatement: INSERT INTO <table> (<column>) VALUES (?), Binding: <value>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String table = sc.next(); String column = sc.next(); String value = sc.next(); System.out.println(\"PreparedStatement: INSERT INTO \" + table + \" (\" + column + \") VALUES (?), Binding: \" + value); } }",
      examples: [
        { input: "users\nname\nJohn", output: "PreparedStatement: INSERT INTO users (name) VALUES (?), Binding: John" },
        { input: "products\nprice\n100", output: "PreparedStatement: INSERT INTO products (price) VALUES (?), Binding: 100" }
      ],
      testCases: [
        { input: "users\nname\nJohn", expectedOutput: "PreparedStatement: INSERT INTO users (name) VALUES (?), Binding: John", isHidden: false, points: 10 },
        { input: "products\nprice\n100", expectedOutput: "PreparedStatement: INSERT INTO products (price) VALUES (?), Binding: 100", isHidden: false, points: 10 },
        { input: "employees\nsalary\n50000", expectedOutput: "PreparedStatement: INSERT INTO employees (salary) VALUES (?), Binding: 50000", isHidden: true, points: 10 },
        { input: "orders\ntotal\n250", expectedOutput: "PreparedStatement: INSERT INTO orders (total) VALUES (?), Binding: 250", isHidden: true, points: 10 },
        { input: "customers\nemail\ntest@mail.com", expectedOutput: "PreparedStatement: INSERT INTO customers (email) VALUES (?), Binding: test@mail.com", isHidden: true, points: 10 },
        { input: "items\nquantity\n10", expectedOutput: "PreparedStatement: INSERT INTO items (quantity) VALUES (?), Binding: 10", isHidden: true, points: 10 },
        { input: "accounts\nbalance\n1000", expectedOutput: "PreparedStatement: INSERT INTO accounts (balance) VALUES (?), Binding: 1000", isHidden: true, points: 10 },
        { input: "students\ngrade\nA", expectedOutput: "PreparedStatement: INSERT INTO students (grade) VALUES (?), Binding: A", isHidden: true, points: 10 },
        { input: "books\nauthor\nSmith", expectedOutput: "PreparedStatement: INSERT INTO books (author) VALUES (?), Binding: Smith", isHidden: true, points: 10 },
        { input: "movies\ntitle\nAvatar", expectedOutput: "PreparedStatement: INSERT INTO movies (title) VALUES (?), Binding: Avatar", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate PreparedStatement UPDATE with parameters. Read table, column, value, id. Print 'PreparedStatement: UPDATE <table> SET <column>=? WHERE id=?, Binding: <value>, <id>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String table = sc.next(); String column = sc.next(); String value = sc.next(); int id = sc.nextInt(); System.out.println(\"PreparedStatement: UPDATE \" + table + \" SET \" + column + \"=? WHERE id=?, Binding: \" + value + \", \" + id); } }",
      examples: [
        { input: "users\nname\nAlice\n5", output: "PreparedStatement: UPDATE users SET name=? WHERE id=?, Binding: Alice, 5" },
        { input: "products\nprice\n200\n10", output: "PreparedStatement: UPDATE products SET price=? WHERE id=?, Binding: 200, 10" }
      ],
      testCases: [
        { input: "users\nname\nAlice\n5", expectedOutput: "PreparedStatement: UPDATE users SET name=? WHERE id=?, Binding: Alice, 5", isHidden: false, points: 10 },
        { input: "products\nprice\n200\n10", expectedOutput: "PreparedStatement: UPDATE products SET price=? WHERE id=?, Binding: 200, 10", isHidden: false, points: 10 },
        { input: "employees\nsalary\n60000\n1", expectedOutput: "PreparedStatement: UPDATE employees SET salary=? WHERE id=?, Binding: 60000, 1", isHidden: true, points: 10 },
        { input: "orders\ntotal\n300\n7", expectedOutput: "PreparedStatement: UPDATE orders SET total=? WHERE id=?, Binding: 300, 7", isHidden: true, points: 10 },
        { input: "customers\nemail\nnew@test.com\n3", expectedOutput: "PreparedStatement: UPDATE customers SET email=? WHERE id=?, Binding: new@test.com, 3", isHidden: true, points: 10 },
        { input: "items\nquantity\n20\n15", expectedOutput: "PreparedStatement: UPDATE items SET quantity=? WHERE id=?, Binding: 20, 15", isHidden: true, points: 10 },
        { input: "accounts\nbalance\n2000\n9", expectedOutput: "PreparedStatement: UPDATE accounts SET balance=? WHERE id=?, Binding: 2000, 9", isHidden: true, points: 10 },
        { input: "students\ngrade\nB\n12", expectedOutput: "PreparedStatement: UPDATE students SET grade=? WHERE id=?, Binding: B, 12", isHidden: true, points: 10 },
        { input: "books\nauthor\nJones\n4", expectedOutput: "PreparedStatement: UPDATE books SET author=? WHERE id=?, Binding: Jones, 4", isHidden: true, points: 10 },
        { input: "movies\ntitle\nMatrix\n8", expectedOutput: "PreparedStatement: UPDATE movies SET title=? WHERE id=?, Binding: Matrix, 8", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate CallableStatement for stored procedure. Read procedure name and parameter. Print 'CallableStatement: {call <procedure>(?)} Parameter: <param>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String procedure = sc.next(); String param = sc.next(); System.out.println(\"CallableStatement: {call \" + procedure + \"(?)} Parameter: \" + param); } }",
      examples: [
        { input: "getUserById\n5", output: "CallableStatement: {call getUserById(?)} Parameter: 5" },
        { input: "updatePrice\n100", output: "CallableStatement: {call updatePrice(?)} Parameter: 100" }
      ],
      testCases: [
        { input: "getUserById\n5", expectedOutput: "CallableStatement: {call getUserById(?)} Parameter: 5", isHidden: false, points: 10 },
        { input: "updatePrice\n100", expectedOutput: "CallableStatement: {call updatePrice(?)} Parameter: 100", isHidden: false, points: 10 },
        { input: "calculateTotal\n250", expectedOutput: "CallableStatement: {call calculateTotal(?)} Parameter: 250", isHidden: true, points: 10 },
        { input: "deleteUser\n10", expectedOutput: "CallableStatement: {call deleteUser(?)} Parameter: 10", isHidden: true, points: 10 },
        { input: "getOrders\n3", expectedOutput: "CallableStatement: {call getOrders(?)} Parameter: 3", isHidden: true, points: 10 },
        { input: "insertRecord\n42", expectedOutput: "CallableStatement: {call insertRecord(?)} Parameter: 42", isHidden: true, points: 10 },
        { input: "updateStatus\n1", expectedOutput: "CallableStatement: {call updateStatus(?)} Parameter: 1", isHidden: true, points: 10 },
        { input: "fetchData\n99", expectedOutput: "CallableStatement: {call fetchData(?)} Parameter: 99", isHidden: true, points: 10 },
        { input: "processPayment\n500", expectedOutput: "CallableStatement: {call processPayment(?)} Parameter: 500", isHidden: true, points: 10 },
        { input: "validateUser\n7", expectedOutput: "CallableStatement: {call validateUser(?)} Parameter: 7", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate batch PreparedStatement. Read n, then n values. Print 'Batch size: n' then 'Added to batch: <value>' for each.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.println(\"Batch size: \" + n); for (int i = 0; i < n; i++) { String value = sc.next(); System.out.println(\"Added to batch: \" + value); } } }",
      examples: [
        { input: "3\nJohn\nAlice\nBob", output: "Batch size: 3\nAdded to batch: John\nAdded to batch: Alice\nAdded to batch: Bob" },
        { input: "2\n100\n200", output: "Batch size: 2\nAdded to batch: 100\nAdded to batch: 200" }
      ],
      testCases: [
        { input: "3\nJohn\nAlice\nBob", expectedOutput: "Batch size: 3\nAdded to batch: John\nAdded to batch: Alice\nAdded to batch: Bob", isHidden: false, points: 10 },
        { input: "2\n100\n200", expectedOutput: "Batch size: 2\nAdded to batch: 100\nAdded to batch: 200", isHidden: false, points: 10 },
        { input: "1\nTest", expectedOutput: "Batch size: 1\nAdded to batch: Test", isHidden: true, points: 10 },
        { input: "4\nA\nB\nC\nD", expectedOutput: "Batch size: 4\nAdded to batch: A\nAdded to batch: B\nAdded to batch: C\nAdded to batch: D", isHidden: true, points: 10 },
        { input: "5\n10\n20\n30\n40\n50", expectedOutput: "Batch size: 5\nAdded to batch: 10\nAdded to batch: 20\nAdded to batch: 30\nAdded to batch: 40\nAdded to batch: 50", isHidden: true, points: 10 },
        { input: "2\nFirst\nSecond", expectedOutput: "Batch size: 2\nAdded to batch: First\nAdded to batch: Second", isHidden: true, points: 10 },
        { input: "3\nX\nY\nZ", expectedOutput: "Batch size: 3\nAdded to batch: X\nAdded to batch: Y\nAdded to batch: Z", isHidden: true, points: 10 },
        { input: "1\nSingle", expectedOutput: "Batch size: 1\nAdded to batch: Single", isHidden: true, points: 10 },
        { input: "4\n5\n10\n15\n20", expectedOutput: "Batch size: 4\nAdded to batch: 5\nAdded to batch: 10\nAdded to batch: 15\nAdded to batch: 20", isHidden: true, points: 10 },
        { input: "2\nAlpha\nBeta", expectedOutput: "Batch size: 2\nAdded to batch: Alpha\nAdded to batch: Beta", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate SQL injection prevention. Read unsafe input with quotes. Print 'Original: <input>' then 'Escaped: <escaped>' (replace single quotes with two single quotes).",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); sc.useDelimiter(\"\\\\n\"); String input = sc.next(); System.out.println(\"Original: \" + input); String escaped = input.replace(\"'\", \"''\"); System.out.println(\"Escaped: \" + escaped); } }",
      examples: [
        { input: "O'Brien", output: "Original: O'Brien\nEscaped: O''Brien" },
        { input: "It's working", output: "Original: It's working\nEscaped: It''s working" }
      ],
      testCases: [
        { input: "O'Brien", expectedOutput: "Original: O'Brien\nEscaped: O''Brien", isHidden: false, points: 10 },
        { input: "It's working", expectedOutput: "Original: It's working\nEscaped: It''s working", isHidden: false, points: 10 },
        { input: "No quotes", expectedOutput: "Original: No quotes\nEscaped: No quotes", isHidden: true, points: 10 },
        { input: "What's up", expectedOutput: "Original: What's up\nEscaped: What''s up", isHidden: true, points: 10 },
        { input: "John's car", expectedOutput: "Original: John's car\nEscaped: John''s car", isHidden: true, points: 10 },
        { input: "Test", expectedOutput: "Original: Test\nEscaped: Test", isHidden: true, points: 10 },
        { input: "Don't stop", expectedOutput: "Original: Don't stop\nEscaped: Don''t stop", isHidden: true, points: 10 },
        { input: "It's a test", expectedOutput: "Original: It's a test\nEscaped: It''s a test", isHidden: true, points: 10 },
        { input: "Simple", expectedOutput: "Original: Simple\nEscaped: Simple", isHidden: true, points: 10 },
        { input: "He's here", expectedOutput: "Original: He's here\nEscaped: He''s here", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 25: Transaction Management
function generateDay25Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate transaction begin. Read a transaction ID and print 'BEGIN TRANSACTION: <id>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String id = sc.next(); System.out.println(\"BEGIN TRANSACTION: \" + id); } }",
      examples: [
        { input: "TXN001", output: "BEGIN TRANSACTION: TXN001" },
        { input: "TXN123", output: "BEGIN TRANSACTION: TXN123" }
      ],
      testCases: [
        { input: "TXN001", expectedOutput: "BEGIN TRANSACTION: TXN001", isHidden: false, points: 10 },
        { input: "TXN123", expectedOutput: "BEGIN TRANSACTION: TXN123", isHidden: false, points: 10 },
        { input: "TX001", expectedOutput: "BEGIN TRANSACTION: TX001", isHidden: true, points: 10 },
        { input: "TRANS999", expectedOutput: "BEGIN TRANSACTION: TRANS999", isHidden: true, points: 10 },
        { input: "A1B2C3", expectedOutput: "BEGIN TRANSACTION: A1B2C3", isHidden: true, points: 10 },
        { input: "TXN555", expectedOutput: "BEGIN TRANSACTION: TXN555", isHidden: true, points: 10 },
        { input: "ORDER789", expectedOutput: "BEGIN TRANSACTION: ORDER789", isHidden: true, points: 10 },
        { input: "T12345", expectedOutput: "BEGIN TRANSACTION: T12345", isHidden: true, points: 10 },
        { input: "TXN777", expectedOutput: "BEGIN TRANSACTION: TXN777", isHidden: true, points: 10 },
        { input: "BATCH01", expectedOutput: "BEGIN TRANSACTION: BATCH01", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate transaction commit. Read transaction ID and operation count. Print 'COMMIT: <id> with <count> operations'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String id = sc.next(); int count = sc.nextInt(); System.out.println(\"COMMIT: \" + id + \" with \" + count + \" operations\"); } }",
      examples: [
        { input: "TXN001\n5", output: "COMMIT: TXN001 with 5 operations" },
        { input: "TXN123\n3", output: "COMMIT: TXN123 with 3 operations" }
      ],
      testCases: [
        { input: "TXN001\n5", expectedOutput: "COMMIT: TXN001 with 5 operations", isHidden: false, points: 10 },
        { input: "TXN123\n3", expectedOutput: "COMMIT: TXN123 with 3 operations", isHidden: false, points: 10 },
        { input: "TX001\n1", expectedOutput: "COMMIT: TX001 with 1 operations", isHidden: true, points: 10 },
        { input: "TRANS999\n10", expectedOutput: "COMMIT: TRANS999 with 10 operations", isHidden: true, points: 10 },
        { input: "A1B2C3\n7", expectedOutput: "COMMIT: A1B2C3 with 7 operations", isHidden: true, points: 10 },
        { input: "TXN555\n2", expectedOutput: "COMMIT: TXN555 with 2 operations", isHidden: true, points: 10 },
        { input: "ORDER789\n15", expectedOutput: "COMMIT: ORDER789 with 15 operations", isHidden: true, points: 10 },
        { input: "T12345\n4", expectedOutput: "COMMIT: T12345 with 4 operations", isHidden: true, points: 10 },
        { input: "TXN777\n8", expectedOutput: "COMMIT: TXN777 with 8 operations", isHidden: true, points: 10 },
        { input: "BATCH01\n20", expectedOutput: "COMMIT: BATCH01 with 20 operations", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate transaction rollback. Read transaction ID and error message. Print 'ROLLBACK: <id> due to <error>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String id = sc.next(); String error = sc.next(); System.out.println(\"ROLLBACK: \" + id + \" due to \" + error); } }",
      examples: [
        { input: "TXN001\nTimeout", output: "ROLLBACK: TXN001 due to Timeout" },
        { input: "TXN123\nError", output: "ROLLBACK: TXN123 due to Error" }
      ],
      testCases: [
        { input: "TXN001\nTimeout", expectedOutput: "ROLLBACK: TXN001 due to Timeout", isHidden: false, points: 10 },
        { input: "TXN123\nError", expectedOutput: "ROLLBACK: TXN123 due to Error", isHidden: false, points: 10 },
        { input: "TX001\nDeadlock", expectedOutput: "ROLLBACK: TX001 due to Deadlock", isHidden: true, points: 10 },
        { input: "TRANS999\nConstraint", expectedOutput: "ROLLBACK: TRANS999 due to Constraint", isHidden: true, points: 10 },
        { input: "A1B2C3\nFailed", expectedOutput: "ROLLBACK: A1B2C3 due to Failed", isHidden: true, points: 10 },
        { input: "TXN555\nException", expectedOutput: "ROLLBACK: TXN555 due to Exception", isHidden: true, points: 10 },
        { input: "ORDER789\nAborted", expectedOutput: "ROLLBACK: ORDER789 due to Aborted", isHidden: true, points: 10 },
        { input: "T12345\nCancelled", expectedOutput: "ROLLBACK: T12345 due to Cancelled", isHidden: true, points: 10 },
        { input: "TXN777\nRejected", expectedOutput: "ROLLBACK: TXN777 due to Rejected", isHidden: true, points: 10 },
        { input: "BATCH01\nInvalid", expectedOutput: "ROLLBACK: BATCH01 due to Invalid", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate savepoint creation. Read transaction ID and savepoint name. Print 'SAVEPOINT: <name> in <id>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String id = sc.next(); String name = sc.next(); System.out.println(\"SAVEPOINT: \" + name + \" in \" + id); } }",
      examples: [
        { input: "TXN001\nSP1", output: "SAVEPOINT: SP1 in TXN001" },
        { input: "TXN123\nCheckpoint", output: "SAVEPOINT: Checkpoint in TXN123" }
      ],
      testCases: [
        { input: "TXN001\nSP1", expectedOutput: "SAVEPOINT: SP1 in TXN001", isHidden: false, points: 10 },
        { input: "TXN123\nCheckpoint", expectedOutput: "SAVEPOINT: Checkpoint in TXN123", isHidden: false, points: 10 },
        { input: "TX001\nSP2", expectedOutput: "SAVEPOINT: SP2 in TX001", isHidden: true, points: 10 },
        { input: "TRANS999\nPoint1", expectedOutput: "SAVEPOINT: Point1 in TRANS999", isHidden: true, points: 10 },
        { input: "A1B2C3\nSave1", expectedOutput: "SAVEPOINT: Save1 in A1B2C3", isHidden: true, points: 10 },
        { input: "TXN555\nMark", expectedOutput: "SAVEPOINT: Mark in TXN555", isHidden: true, points: 10 },
        { input: "ORDER789\nStage", expectedOutput: "SAVEPOINT: Stage in ORDER789", isHidden: true, points: 10 },
        { input: "T12345\nStep", expectedOutput: "SAVEPOINT: Step in T12345", isHidden: true, points: 10 },
        { input: "TXN777\nPhase", expectedOutput: "SAVEPOINT: Phase in TXN777", isHidden: true, points: 10 },
        { input: "BATCH01\nState", expectedOutput: "SAVEPOINT: State in BATCH01", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate transaction isolation level. Read level name and print 'ISOLATION LEVEL: <level>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String level = sc.next(); System.out.println(\"ISOLATION LEVEL: \" + level); } }",
      examples: [
        { input: "READ_COMMITTED", output: "ISOLATION LEVEL: READ_COMMITTED" },
        { input: "SERIALIZABLE", output: "ISOLATION LEVEL: SERIALIZABLE" }
      ],
      testCases: [
        { input: "READ_COMMITTED", expectedOutput: "ISOLATION LEVEL: READ_COMMITTED", isHidden: false, points: 10 },
        { input: "SERIALIZABLE", expectedOutput: "ISOLATION LEVEL: SERIALIZABLE", isHidden: false, points: 10 },
        { input: "READ_UNCOMMITTED", expectedOutput: "ISOLATION LEVEL: READ_UNCOMMITTED", isHidden: true, points: 10 },
        { input: "REPEATABLE_READ", expectedOutput: "ISOLATION LEVEL: REPEATABLE_READ", isHidden: true, points: 10 },
        { input: "NONE", expectedOutput: "ISOLATION LEVEL: NONE", isHidden: true, points: 10 },
        { input: "READ_COMMITTED", expectedOutput: "ISOLATION LEVEL: READ_COMMITTED", isHidden: true, points: 10 },
        { input: "SERIALIZABLE", expectedOutput: "ISOLATION LEVEL: SERIALIZABLE", isHidden: true, points: 10 },
        { input: "READ_UNCOMMITTED", expectedOutput: "ISOLATION LEVEL: READ_UNCOMMITTED", isHidden: true, points: 10 },
        { input: "REPEATABLE_READ", expectedOutput: "ISOLATION LEVEL: REPEATABLE_READ", isHidden: true, points: 10 },
        { input: "DEFAULT", expectedOutput: "ISOLATION LEVEL: DEFAULT", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 26: Connection Pooling
function generateDay26Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate connection pool creation. Read pool name and size. Print 'Connection Pool: <name> with size <size>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.next(); int size = sc.nextInt(); System.out.println(\"Connection Pool: \" + name + \" with size \" + size); } }",
      examples: [
        { input: "MainPool\n10", output: "Connection Pool: MainPool with size 10" },
        { input: "SecondaryPool\n5", output: "Connection Pool: SecondaryPool with size 5" }
      ],
      testCases: [
        { input: "MainPool\n10", expectedOutput: "Connection Pool: MainPool with size 10", isHidden: false, points: 10 },
        { input: "SecondaryPool\n5", expectedOutput: "Connection Pool: SecondaryPool with size 5", isHidden: false, points: 10 },
        { input: "Pool1\n20", expectedOutput: "Connection Pool: Pool1 with size 20", isHidden: true, points: 10 },
        { input: "DBPool\n15", expectedOutput: "Connection Pool: DBPool with size 15", isHidden: true, points: 10 },
        { input: "AppPool\n8", expectedOutput: "Connection Pool: AppPool with size 8", isHidden: true, points: 10 },
        { input: "TestPool\n3", expectedOutput: "Connection Pool: TestPool with size 3", isHidden: true, points: 10 },
        { input: "ProdPool\n50", expectedOutput: "Connection Pool: ProdPool with size 50", isHidden: true, points: 10 },
        { input: "WorkerPool\n12", expectedOutput: "Connection Pool: WorkerPool with size 12", isHidden: true, points: 10 },
        { input: "BackendPool\n25", expectedOutput: "Connection Pool: BackendPool with size 25", isHidden: true, points: 10 },
        { input: "DataPool\n30", expectedOutput: "Connection Pool: DataPool with size 30", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate getting connection from pool. Read pool name and connection ID. Print 'Acquired connection <id> from <pool>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String pool = sc.next(); String id = sc.next(); System.out.println(\"Acquired connection \" + id + \" from \" + pool); } }",
      examples: [
        { input: "MainPool\nCONN001", output: "Acquired connection CONN001 from MainPool" },
        { input: "DBPool\nCONN123", output: "Acquired connection CONN123 from DBPool" }
      ],
      testCases: [
        { input: "MainPool\nCONN001", expectedOutput: "Acquired connection CONN001 from MainPool", isHidden: false, points: 10 },
        { input: "DBPool\nCONN123", expectedOutput: "Acquired connection CONN123 from DBPool", isHidden: false, points: 10 },
        { input: "Pool1\nC001", expectedOutput: "Acquired connection C001 from Pool1", isHidden: true, points: 10 },
        { input: "TestPool\nCONN999", expectedOutput: "Acquired connection CONN999 from TestPool", isHidden: true, points: 10 },
        { input: "AppPool\nC555", expectedOutput: "Acquired connection C555 from AppPool", isHidden: true, points: 10 },
        { input: "WorkerPool\nCONN777", expectedOutput: "Acquired connection CONN777 from WorkerPool", isHidden: true, points: 10 },
        { input: "ProdPool\nC100", expectedOutput: "Acquired connection C100 from ProdPool", isHidden: true, points: 10 },
        { input: "BackendPool\nCONN888", expectedOutput: "Acquired connection CONN888 from BackendPool", isHidden: true, points: 10 },
        { input: "DataPool\nC42", expectedOutput: "Acquired connection C42 from DataPool", isHidden: true, points: 10 },
        { input: "SecondaryPool\nCONN500", expectedOutput: "Acquired connection CONN500 from SecondaryPool", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate releasing connection to pool. Read pool name and connection ID. Print 'Released connection <id> to <pool>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String pool = sc.next(); String id = sc.next(); System.out.println(\"Released connection \" + id + \" to \" + pool); } }",
      examples: [
        { input: "MainPool\nCONN001", output: "Released connection CONN001 to MainPool" },
        { input: "DBPool\nCONN123", output: "Released connection CONN123 to DBPool" }
      ],
      testCases: [
        { input: "MainPool\nCONN001", expectedOutput: "Released connection CONN001 to MainPool", isHidden: false, points: 10 },
        { input: "DBPool\nCONN123", expectedOutput: "Released connection CONN123 to DBPool", isHidden: false, points: 10 },
        { input: "Pool1\nC001", expectedOutput: "Released connection C001 to Pool1", isHidden: true, points: 10 },
        { input: "TestPool\nCONN999", expectedOutput: "Released connection CONN999 to TestPool", isHidden: true, points: 10 },
        { input: "AppPool\nC555", expectedOutput: "Released connection C555 to AppPool", isHidden: true, points: 10 },
        { input: "WorkerPool\nCONN777", expectedOutput: "Released connection CONN777 to WorkerPool", isHidden: true, points: 10 },
        { input: "ProdPool\nC100", expectedOutput: "Released connection C100 to ProdPool", isHidden: true, points: 10 },
        { input: "BackendPool\nCONN888", expectedOutput: "Released connection CONN888 to BackendPool", isHidden: true, points: 10 },
        { input: "DataPool\nC42", expectedOutput: "Released connection C42 to DataPool", isHidden: true, points: 10 },
        { input: "SecondaryPool\nCONN500", expectedOutput: "Released connection CONN500 to SecondaryPool", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate pool statistics. Read pool name, active count, and idle count. Print 'Pool <name>: Active=<active>, Idle=<idle>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.next(); int active = sc.nextInt(); int idle = sc.nextInt(); System.out.println(\"Pool \" + name + \": Active=\" + active + \", Idle=\" + idle); } }",
      examples: [
        { input: "MainPool\n7\n3", output: "Pool MainPool: Active=7, Idle=3" },
        { input: "DBPool\n5\n5", output: "Pool DBPool: Active=5, Idle=5" }
      ],
      testCases: [
        { input: "MainPool\n7\n3", expectedOutput: "Pool MainPool: Active=7, Idle=3", isHidden: false, points: 10 },
        { input: "DBPool\n5\n5", expectedOutput: "Pool DBPool: Active=5, Idle=5", isHidden: false, points: 10 },
        { input: "Pool1\n10\n10", expectedOutput: "Pool Pool1: Active=10, Idle=10", isHidden: true, points: 10 },
        { input: "TestPool\n2\n8", expectedOutput: "Pool TestPool: Active=2, Idle=8", isHidden: true, points: 10 },
        { input: "AppPool\n6\n2", expectedOutput: "Pool AppPool: Active=6, Idle=2", isHidden: true, points: 10 },
        { input: "WorkerPool\n15\n5", expectedOutput: "Pool WorkerPool: Active=15, Idle=5", isHidden: true, points: 10 },
        { input: "ProdPool\n30\n20", expectedOutput: "Pool ProdPool: Active=30, Idle=20", isHidden: true, points: 10 },
        { input: "BackendPool\n12\n13", expectedOutput: "Pool BackendPool: Active=12, Idle=13", isHidden: true, points: 10 },
        { input: "DataPool\n20\n10", expectedOutput: "Pool DataPool: Active=20, Idle=10", isHidden: true, points: 10 },
        { input: "SecondaryPool\n3\n7", expectedOutput: "Pool SecondaryPool: Active=3, Idle=7", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate connection timeout. Read pool name and timeout value in seconds. Print 'Pool <name>: Connection timeout set to <timeout>s'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.next(); int timeout = sc.nextInt(); System.out.println(\"Pool \" + name + \": Connection timeout set to \" + timeout + \"s\"); } }",
      examples: [
        { input: "MainPool\n30", output: "Pool MainPool: Connection timeout set to 30s" },
        { input: "DBPool\n60", output: "Pool DBPool: Connection timeout set to 60s" }
      ],
      testCases: [
        { input: "MainPool\n30", expectedOutput: "Pool MainPool: Connection timeout set to 30s", isHidden: false, points: 10 },
        { input: "DBPool\n60", expectedOutput: "Pool DBPool: Connection timeout set to 60s", isHidden: false, points: 10 },
        { input: "Pool1\n15", expectedOutput: "Pool Pool1: Connection timeout set to 15s", isHidden: true, points: 10 },
        { input: "TestPool\n45", expectedOutput: "Pool TestPool: Connection timeout set to 45s", isHidden: true, points: 10 },
        { input: "AppPool\n20", expectedOutput: "Pool AppPool: Connection timeout set to 20s", isHidden: true, points: 10 },
        { input: "WorkerPool\n90", expectedOutput: "Pool WorkerPool: Connection timeout set to 90s", isHidden: true, points: 10 },
        { input: "ProdPool\n120", expectedOutput: "Pool ProdPool: Connection timeout set to 120s", isHidden: true, points: 10 },
        { input: "BackendPool\n50", expectedOutput: "Pool BackendPool: Connection timeout set to 50s", isHidden: true, points: 10 },
        { input: "DataPool\n100", expectedOutput: "Pool DataPool: Connection timeout set to 100s", isHidden: true, points: 10 },
        { input: "SecondaryPool\n40", expectedOutput: "Pool SecondaryPool: Connection timeout set to 40s", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 27: DAO Pattern
function generateDay27Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate DAO findById method. Read entity name and ID. Print 'DAO.findById(<entity>, <id>)'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String entity = sc.next(); int id = sc.nextInt(); System.out.println(\"DAO.findById(\" + entity + \", \" + id + \")\"); } }",
      examples: [
        { input: "User\n5", output: "DAO.findById(User, 5)" },
        { input: "Product\n10", output: "DAO.findById(Product, 10)" }
      ],
      testCases: [
        { input: "User\n5", expectedOutput: "DAO.findById(User, 5)", isHidden: false, points: 10 },
        { input: "Product\n10", expectedOutput: "DAO.findById(Product, 10)", isHidden: false, points: 10 },
        { input: "Customer\n1", expectedOutput: "DAO.findById(Customer, 1)", isHidden: true, points: 10 },
        { input: "Order\n100", expectedOutput: "DAO.findById(Order, 100)", isHidden: true, points: 10 },
        { input: "Employee\n42", expectedOutput: "DAO.findById(Employee, 42)", isHidden: true, points: 10 },
        { input: "Book\n7", expectedOutput: "DAO.findById(Book, 7)", isHidden: true, points: 10 },
        { input: "Account\n99", expectedOutput: "DAO.findById(Account, 99)", isHidden: true, points: 10 },
        { input: "Item\n25", expectedOutput: "DAO.findById(Item, 25)", isHidden: true, points: 10 },
        { input: "Student\n15", expectedOutput: "DAO.findById(Student, 15)", isHidden: true, points: 10 },
        { input: "Movie\n3", expectedOutput: "DAO.findById(Movie, 3)", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate DAO findAll method. Read entity name and print 'DAO.findAll(<entity>)'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String entity = sc.next(); System.out.println(\"DAO.findAll(\" + entity + \")\"); } }",
      examples: [
        { input: "User", output: "DAO.findAll(User)" },
        { input: "Product", output: "DAO.findAll(Product)" }
      ],
      testCases: [
        { input: "User", expectedOutput: "DAO.findAll(User)", isHidden: false, points: 10 },
        { input: "Product", expectedOutput: "DAO.findAll(Product)", isHidden: false, points: 10 },
        { input: "Customer", expectedOutput: "DAO.findAll(Customer)", isHidden: true, points: 10 },
        { input: "Order", expectedOutput: "DAO.findAll(Order)", isHidden: true, points: 10 },
        { input: "Employee", expectedOutput: "DAO.findAll(Employee)", isHidden: true, points: 10 },
        { input: "Book", expectedOutput: "DAO.findAll(Book)", isHidden: true, points: 10 },
        { input: "Account", expectedOutput: "DAO.findAll(Account)", isHidden: true, points: 10 },
        { input: "Item", expectedOutput: "DAO.findAll(Item)", isHidden: true, points: 10 },
        { input: "Student", expectedOutput: "DAO.findAll(Student)", isHidden: true, points: 10 },
        { input: "Movie", expectedOutput: "DAO.findAll(Movie)", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate DAO save method. Read entity name and value. Print 'DAO.save(<entity>): <value>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String entity = sc.next(); String value = sc.next(); System.out.println(\"DAO.save(\" + entity + \"): \" + value); } }",
      examples: [
        { input: "User\nJohn", output: "DAO.save(User): John" },
        { input: "Product\nLaptop", output: "DAO.save(Product): Laptop" }
      ],
      testCases: [
        { input: "User\nJohn", expectedOutput: "DAO.save(User): John", isHidden: false, points: 10 },
        { input: "Product\nLaptop", expectedOutput: "DAO.save(Product): Laptop", isHidden: false, points: 10 },
        { input: "Customer\nAlice", expectedOutput: "DAO.save(Customer): Alice", isHidden: true, points: 10 },
        { input: "Order\nORD123", expectedOutput: "DAO.save(Order): ORD123", isHidden: true, points: 10 },
        { input: "Employee\nBob", expectedOutput: "DAO.save(Employee): Bob", isHidden: true, points: 10 },
        { input: "Book\nJavaGuide", expectedOutput: "DAO.save(Book): JavaGuide", isHidden: true, points: 10 },
        { input: "Account\nACC001", expectedOutput: "DAO.save(Account): ACC001", isHidden: true, points: 10 },
        { input: "Item\nWidget", expectedOutput: "DAO.save(Item): Widget", isHidden: true, points: 10 },
        { input: "Student\nMary", expectedOutput: "DAO.save(Student): Mary", isHidden: true, points: 10 },
        { input: "Movie\nInception", expectedOutput: "DAO.save(Movie): Inception", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate DAO update method. Read entity name, ID, and new value. Print 'DAO.update(<entity>, <id>): <value>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String entity = sc.next(); int id = sc.nextInt(); String value = sc.next(); System.out.println(\"DAO.update(\" + entity + \", \" + id + \"): \" + value); } }",
      examples: [
        { input: "User\n5\nAlice", output: "DAO.update(User, 5): Alice" },
        { input: "Product\n10\nPhone", output: "DAO.update(Product, 10): Phone" }
      ],
      testCases: [
        { input: "User\n5\nAlice", expectedOutput: "DAO.update(User, 5): Alice", isHidden: false, points: 10 },
        { input: "Product\n10\nPhone", expectedOutput: "DAO.update(Product, 10): Phone", isHidden: false, points: 10 },
        { input: "Customer\n1\nBob", expectedOutput: "DAO.update(Customer, 1): Bob", isHidden: true, points: 10 },
        { input: "Order\n100\nShipped", expectedOutput: "DAO.update(Order, 100): Shipped", isHidden: true, points: 10 },
        { input: "Employee\n42\nManager", expectedOutput: "DAO.update(Employee, 42): Manager", isHidden: true, points: 10 },
        { input: "Book\n7\nUpdated", expectedOutput: "DAO.update(Book, 7): Updated", isHidden: true, points: 10 },
        { input: "Account\n99\nActive", expectedOutput: "DAO.update(Account, 99): Active", isHidden: true, points: 10 },
        { input: "Item\n25\nNew", expectedOutput: "DAO.update(Item, 25): New", isHidden: true, points: 10 },
        { input: "Student\n15\nGraduated", expectedOutput: "DAO.update(Student, 15): Graduated", isHidden: true, points: 10 },
        { input: "Movie\n3\nReleased", expectedOutput: "DAO.update(Movie, 3): Released", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate DAO delete method. Read entity name and ID. Print 'DAO.delete(<entity>, <id>)'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String entity = sc.next(); int id = sc.nextInt(); System.out.println(\"DAO.delete(\" + entity + \", \" + id + \")\"); } }",
      examples: [
        { input: "User\n5", output: "DAO.delete(User, 5)" },
        { input: "Product\n10", output: "DAO.delete(Product, 10)" }
      ],
      testCases: [
        { input: "User\n5", expectedOutput: "DAO.delete(User, 5)", isHidden: false, points: 10 },
        { input: "Product\n10", expectedOutput: "DAO.delete(Product, 10)", isHidden: false, points: 10 },
        { input: "Customer\n1", expectedOutput: "DAO.delete(Customer, 1)", isHidden: true, points: 10 },
        { input: "Order\n100", expectedOutput: "DAO.delete(Order, 100)", isHidden: true, points: 10 },
        { input: "Employee\n42", expectedOutput: "DAO.delete(Employee, 42)", isHidden: true, points: 10 },
        { input: "Book\n7", expectedOutput: "DAO.delete(Book, 7)", isHidden: true, points: 10 },
        { input: "Account\n99", expectedOutput: "DAO.delete(Account, 99)", isHidden: true, points: 10 },
        { input: "Item\n25", expectedOutput: "DAO.delete(Item, 25)", isHidden: true, points: 10 },
        { input: "Student\n15", expectedOutput: "DAO.delete(Student, 15)", isHidden: true, points: 10 },
        { input: "Movie\n3", expectedOutput: "DAO.delete(Movie, 3)", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 28: Batch Processing
function generateDay28Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate batch insert. Read n, then n values. Print 'Batch insert: n records' then 'Inserted: <value>' for each.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.println(\"Batch insert: \" + n + \" records\"); for (int i = 0; i < n; i++) { String value = sc.next(); System.out.println(\"Inserted: \" + value); } } }",
      examples: [
        { input: "3\nJohn\nAlice\nBob", output: "Batch insert: 3 records\nInserted: John\nInserted: Alice\nInserted: Bob" },
        { input: "2\n100\n200", output: "Batch insert: 2 records\nInserted: 100\nInserted: 200" }
      ],
      testCases: [
        { input: "3\nJohn\nAlice\nBob", expectedOutput: "Batch insert: 3 records\nInserted: John\nInserted: Alice\nInserted: Bob", isHidden: false, points: 10 },
        { input: "2\n100\n200", expectedOutput: "Batch insert: 2 records\nInserted: 100\nInserted: 200", isHidden: false, points: 10 },
        { input: "1\nTest", expectedOutput: "Batch insert: 1 records\nInserted: Test", isHidden: true, points: 10 },
        { input: "4\nA\nB\nC\nD", expectedOutput: "Batch insert: 4 records\nInserted: A\nInserted: B\nInserted: C\nInserted: D", isHidden: true, points: 10 },
        { input: "5\n10\n20\n30\n40\n50", expectedOutput: "Batch insert: 5 records\nInserted: 10\nInserted: 20\nInserted: 30\nInserted: 40\nInserted: 50", isHidden: true, points: 10 },
        { input: "2\nFirst\nSecond", expectedOutput: "Batch insert: 2 records\nInserted: First\nInserted: Second", isHidden: true, points: 10 },
        { input: "3\nX\nY\nZ", expectedOutput: "Batch insert: 3 records\nInserted: X\nInserted: Y\nInserted: Z", isHidden: true, points: 10 },
        { input: "1\nSingle", expectedOutput: "Batch insert: 1 records\nInserted: Single", isHidden: true, points: 10 },
        { input: "4\n5\n10\n15\n20", expectedOutput: "Batch insert: 4 records\nInserted: 5\nInserted: 10\nInserted: 15\nInserted: 20", isHidden: true, points: 10 },
        { input: "2\nAlpha\nBeta", expectedOutput: "Batch insert: 2 records\nInserted: Alpha\nInserted: Beta", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate batch update. Read n, then n IDs. Print 'Batch update: n records' then 'Updated ID: <id>' for each.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.println(\"Batch update: \" + n + \" records\"); for (int i = 0; i < n; i++) { int id = sc.nextInt(); System.out.println(\"Updated ID: \" + id); } } }",
      examples: [
        { input: "3\n1\n2\n3", output: "Batch update: 3 records\nUpdated ID: 1\nUpdated ID: 2\nUpdated ID: 3" },
        { input: "2\n10\n20", output: "Batch update: 2 records\nUpdated ID: 10\nUpdated ID: 20" }
      ],
      testCases: [
        { input: "3\n1\n2\n3", expectedOutput: "Batch update: 3 records\nUpdated ID: 1\nUpdated ID: 2\nUpdated ID: 3", isHidden: false, points: 10 },
        { input: "2\n10\n20", expectedOutput: "Batch update: 2 records\nUpdated ID: 10\nUpdated ID: 20", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "Batch update: 1 records\nUpdated ID: 42", isHidden: true, points: 10 },
        { input: "4\n5\n10\n15\n20", expectedOutput: "Batch update: 4 records\nUpdated ID: 5\nUpdated ID: 10\nUpdated ID: 15\nUpdated ID: 20", isHidden: true, points: 10 },
        { input: "5\n100\n200\n300\n400\n500", expectedOutput: "Batch update: 5 records\nUpdated ID: 100\nUpdated ID: 200\nUpdated ID: 300\nUpdated ID: 400\nUpdated ID: 500", isHidden: true, points: 10 },
        { input: "2\n7\n14", expectedOutput: "Batch update: 2 records\nUpdated ID: 7\nUpdated ID: 14", isHidden: true, points: 10 },
        { input: "3\n25\n50\n75", expectedOutput: "Batch update: 3 records\nUpdated ID: 25\nUpdated ID: 50\nUpdated ID: 75", isHidden: true, points: 10 },
        { input: "1\n999", expectedOutput: "Batch update: 1 records\nUpdated ID: 999", isHidden: true, points: 10 },
        { input: "4\n11\n22\n33\n44", expectedOutput: "Batch update: 4 records\nUpdated ID: 11\nUpdated ID: 22\nUpdated ID: 33\nUpdated ID: 44", isHidden: true, points: 10 },
        { input: "2\n88\n99", expectedOutput: "Batch update: 2 records\nUpdated ID: 88\nUpdated ID: 99", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate batch delete. Read n, then n IDs. Print 'Batch delete: n records' then 'Deleted ID: <id>' for each.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.println(\"Batch delete: \" + n + \" records\"); for (int i = 0; i < n; i++) { int id = sc.nextInt(); System.out.println(\"Deleted ID: \" + id); } } }",
      examples: [
        { input: "3\n1\n2\n3", output: "Batch delete: 3 records\nDeleted ID: 1\nDeleted ID: 2\nDeleted ID: 3" },
        { input: "2\n10\n20", output: "Batch delete: 2 records\nDeleted ID: 10\nDeleted ID: 20" }
      ],
      testCases: [
        { input: "3\n1\n2\n3", expectedOutput: "Batch delete: 3 records\nDeleted ID: 1\nDeleted ID: 2\nDeleted ID: 3", isHidden: false, points: 10 },
        { input: "2\n10\n20", expectedOutput: "Batch delete: 2 records\nDeleted ID: 10\nDeleted ID: 20", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "Batch delete: 1 records\nDeleted ID: 42", isHidden: true, points: 10 },
        { input: "4\n5\n10\n15\n20", expectedOutput: "Batch delete: 4 records\nDeleted ID: 5\nDeleted ID: 10\nDeleted ID: 15\nDeleted ID: 20", isHidden: true, points: 10 },
        { input: "5\n100\n200\n300\n400\n500", expectedOutput: "Batch delete: 5 records\nDeleted ID: 100\nDeleted ID: 200\nDeleted ID: 300\nDeleted ID: 400\nDeleted ID: 500", isHidden: true, points: 10 },
        { input: "2\n7\n14", expectedOutput: "Batch delete: 2 records\nDeleted ID: 7\nDeleted ID: 14", isHidden: true, points: 10 },
        { input: "3\n25\n50\n75", expectedOutput: "Batch delete: 3 records\nDeleted ID: 25\nDeleted ID: 50\nDeleted ID: 75", isHidden: true, points: 10 },
        { input: "1\n999", expectedOutput: "Batch delete: 1 records\nDeleted ID: 999", isHidden: true, points: 10 },
        { input: "4\n11\n22\n33\n44", expectedOutput: "Batch delete: 4 records\nDeleted ID: 11\nDeleted ID: 22\nDeleted ID: 33\nDeleted ID: 44", isHidden: true, points: 10 },
        { input: "2\n88\n99", expectedOutput: "Batch delete: 2 records\nDeleted ID: 88\nDeleted ID: 99", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate batch execution summary. Read batch size and success count. Print 'Executed: <size> operations, Success: <success>, Failed: <failed>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int size = sc.nextInt(); int success = sc.nextInt(); int failed = size - success; System.out.println(\"Executed: \" + size + \" operations, Success: \" + success + \", Failed: \" + failed); } }",
      examples: [
        { input: "10\n8", output: "Executed: 10 operations, Success: 8, Failed: 2" },
        { input: "5\n5", output: "Executed: 5 operations, Success: 5, Failed: 0" }
      ],
      testCases: [
        { input: "10\n8", expectedOutput: "Executed: 10 operations, Success: 8, Failed: 2", isHidden: false, points: 10 },
        { input: "5\n5", expectedOutput: "Executed: 5 operations, Success: 5, Failed: 0", isHidden: false, points: 10 },
        { input: "20\n15", expectedOutput: "Executed: 20 operations, Success: 15, Failed: 5", isHidden: true, points: 10 },
        { input: "100\n90", expectedOutput: "Executed: 100 operations, Success: 90, Failed: 10", isHidden: true, points: 10 },
        { input: "50\n50", expectedOutput: "Executed: 50 operations, Success: 50, Failed: 0", isHidden: true, points: 10 },
        { input: "15\n10", expectedOutput: "Executed: 15 operations, Success: 10, Failed: 5", isHidden: true, points: 10 },
        { input: "8\n7", expectedOutput: "Executed: 8 operations, Success: 7, Failed: 1", isHidden: true, points: 10 },
        { input: "30\n25", expectedOutput: "Executed: 30 operations, Success: 25, Failed: 5", isHidden: true, points: 10 },
        { input: "12\n12", expectedOutput: "Executed: 12 operations, Success: 12, Failed: 0", isHidden: true, points: 10 },
        { input: "25\n20", expectedOutput: "Executed: 25 operations, Success: 20, Failed: 5", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate batch processing with chunk size. Read total records and chunk size. Print number of batches needed (ceiling division).",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int total = sc.nextInt(); int chunk = sc.nextInt(); int batches = (int) Math.ceil((double) total / chunk); System.out.println(batches); } }",
      examples: [
        { input: "100\n25", output: "4" },
        { input: "50\n20", output: "3" }
      ],
      testCases: [
        { input: "100\n25", expectedOutput: "4", isHidden: false, points: 10 },
        { input: "50\n20", expectedOutput: "3", isHidden: false, points: 10 },
        { input: "10\n3", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "100\n10", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "7\n2", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "30\n5", expectedOutput: "6", isHidden: true, points: 10 },
        { input: "15\n4", expectedOutput: "4", isHidden: true, points: 10 },
        { input: "20\n20", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "99\n10", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "45\n15", expectedOutput: "3", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 29: Week 5 Database Project
function generateDay29Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Build a simple database query executor. Read table name and operation (SELECT/INSERT/UPDATE/DELETE). Print 'Executing <operation> on <table>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String table = sc.next(); String operation = sc.next(); System.out.println(\"Executing \" + operation + \" on \" + table); } }",
      examples: [
        { input: "users\nSELECT", output: "Executing SELECT on users" },
        { input: "products\nINSERT", output: "Executing INSERT on products" }
      ],
      testCases: [
        { input: "users\nSELECT", expectedOutput: "Executing SELECT on users", isHidden: false, points: 10 },
        { input: "products\nINSERT", expectedOutput: "Executing INSERT on products", isHidden: false, points: 10 },
        { input: "orders\nUPDATE", expectedOutput: "Executing UPDATE on orders", isHidden: true, points: 10 },
        { input: "customers\nDELETE", expectedOutput: "Executing DELETE on customers", isHidden: true, points: 10 },
        { input: "employees\nSELECT", expectedOutput: "Executing SELECT on employees", isHidden: true, points: 10 },
        { input: "items\nINSERT", expectedOutput: "Executing INSERT on items", isHidden: true, points: 10 },
        { input: "accounts\nUPDATE", expectedOutput: "Executing UPDATE on accounts", isHidden: true, points: 10 },
        { input: "books\nDELETE", expectedOutput: "Executing DELETE on books", isHidden: true, points: 10 },
        { input: "students\nSELECT", expectedOutput: "Executing SELECT on students", isHidden: true, points: 10 },
        { input: "movies\nINSERT", expectedOutput: "Executing INSERT on movies", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate database query result. Read query type and row count. Print 'Query: <type>, Rows affected: <count>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String type = sc.next(); int count = sc.nextInt(); System.out.println(\"Query: \" + type + \", Rows affected: \" + count); } }",
      examples: [
        { input: "SELECT\n5", output: "Query: SELECT, Rows affected: 5" },
        { input: "UPDATE\n10", output: "Query: UPDATE, Rows affected: 10" }
      ],
      testCases: [
        { input: "SELECT\n5", expectedOutput: "Query: SELECT, Rows affected: 5", isHidden: false, points: 10 },
        { input: "UPDATE\n10", expectedOutput: "Query: UPDATE, Rows affected: 10", isHidden: false, points: 10 },
        { input: "INSERT\n1", expectedOutput: "Query: INSERT, Rows affected: 1", isHidden: true, points: 10 },
        { input: "DELETE\n3", expectedOutput: "Query: DELETE, Rows affected: 3", isHidden: true, points: 10 },
        { input: "SELECT\n100", expectedOutput: "Query: SELECT, Rows affected: 100", isHidden: true, points: 10 },
        { input: "UPDATE\n25", expectedOutput: "Query: UPDATE, Rows affected: 25", isHidden: true, points: 10 },
        { input: "INSERT\n50", expectedOutput: "Query: INSERT, Rows affected: 50", isHidden: true, points: 10 },
        { input: "DELETE\n7", expectedOutput: "Query: DELETE, Rows affected: 7", isHidden: true, points: 10 },
        { input: "SELECT\n0", expectedOutput: "Query: SELECT, Rows affected: 0", isHidden: true, points: 10 },
        { input: "UPDATE\n42", expectedOutput: "Query: UPDATE, Rows affected: 42", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Implement database migration tracker. Read version number and description. Print 'Migration v<version>: <description>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String version = sc.next(); String description = sc.next(); System.out.println(\"Migration v\" + version + \": \" + description); } }",
      examples: [
        { input: "1.0\nInitialSetup", output: "Migration v1.0: InitialSetup" },
        { input: "2.0\nAddUsers", output: "Migration v2.0: AddUsers" }
      ],
      testCases: [
        { input: "1.0\nInitialSetup", expectedOutput: "Migration v1.0: InitialSetup", isHidden: false, points: 10 },
        { input: "2.0\nAddUsers", expectedOutput: "Migration v2.0: AddUsers", isHidden: false, points: 10 },
        { input: "1.1\nCreateTables", expectedOutput: "Migration v1.1: CreateTables", isHidden: true, points: 10 },
        { input: "3.0\nAddIndexes", expectedOutput: "Migration v3.0: AddIndexes", isHidden: true, points: 10 },
        { input: "1.5\nUpdateSchema", expectedOutput: "Migration v1.5: UpdateSchema", isHidden: true, points: 10 },
        { input: "4.0\nAddConstraints", expectedOutput: "Migration v4.0: AddConstraints", isHidden: true, points: 10 },
        { input: "2.5\nModifyColumns", expectedOutput: "Migration v2.5: ModifyColumns", isHidden: true, points: 10 },
        { input: "5.0\nDataMigration", expectedOutput: "Migration v5.0: DataMigration", isHidden: true, points: 10 },
        { input: "1.2\nSeedData", expectedOutput: "Migration v1.2: SeedData", isHidden: true, points: 10 },
        { input: "3.5\nOptimize", expectedOutput: "Migration v3.5: Optimize", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate database backup. Read database name and timestamp. Print 'Backup: <db> at <timestamp>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String db = sc.next(); String timestamp = sc.next(); System.out.println(\"Backup: \" + db + \" at \" + timestamp); } }",
      examples: [
        { input: "mydb\n2024-01-01", output: "Backup: mydb at 2024-01-01" },
        { input: "testdb\n2024-12-25", output: "Backup: testdb at 2024-12-25" }
      ],
      testCases: [
        { input: "mydb\n2024-01-01", expectedOutput: "Backup: mydb at 2024-01-01", isHidden: false, points: 10 },
        { input: "testdb\n2024-12-25", expectedOutput: "Backup: testdb at 2024-12-25", isHidden: false, points: 10 },
        { input: "production\n2024-06-15", expectedOutput: "Backup: production at 2024-06-15", isHidden: true, points: 10 },
        { input: "staging\n2024-03-20", expectedOutput: "Backup: staging at 2024-03-20", isHidden: true, points: 10 },
        { input: "dev\n2024-09-10", expectedOutput: "Backup: dev at 2024-09-10", isHidden: true, points: 10 },
        { input: "users_db\n2024-11-05", expectedOutput: "Backup: users_db at 2024-11-05", isHidden: true, points: 10 },
        { input: "analytics\n2024-07-30", expectedOutput: "Backup: analytics at 2024-07-30", isHidden: true, points: 10 },
        { input: "archive\n2024-02-14", expectedOutput: "Backup: archive at 2024-02-14", isHidden: true, points: 10 },
        { input: "main_db\n2024-08-22", expectedOutput: "Backup: main_db at 2024-08-22", isHidden: true, points: 10 },
        { input: "reporting\n2024-04-18", expectedOutput: "Backup: reporting at 2024-04-18", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate database connection status. Read connection ID and status (ACTIVE/IDLE/CLOSED). Print 'Connection <id>: <status>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String id = sc.next(); String status = sc.next(); System.out.println(\"Connection \" + id + \": \" + status); } }",
      examples: [
        { input: "CONN001\nACTIVE", output: "Connection CONN001: ACTIVE" },
        { input: "CONN123\nIDLE", output: "Connection CONN123: IDLE" }
      ],
      testCases: [
        { input: "CONN001\nACTIVE", expectedOutput: "Connection CONN001: ACTIVE", isHidden: false, points: 10 },
        { input: "CONN123\nIDLE", expectedOutput: "Connection CONN123: IDLE", isHidden: false, points: 10 },
        { input: "C001\nCLOSED", expectedOutput: "Connection C001: CLOSED", isHidden: true, points: 10 },
        { input: "CONN555\nACTIVE", expectedOutput: "Connection CONN555: ACTIVE", isHidden: true, points: 10 },
        { input: "C999\nIDLE", expectedOutput: "Connection C999: IDLE", isHidden: true, points: 10 },
        { input: "CONN777\nCLOSED", expectedOutput: "Connection CONN777: CLOSED", isHidden: true, points: 10 },
        { input: "C42\nACTIVE", expectedOutput: "Connection C42: ACTIVE", isHidden: true, points: 10 },
        { input: "CONN888\nIDLE", expectedOutput: "Connection CONN888: IDLE", isHidden: true, points: 10 },
        { input: "C100\nCLOSED", expectedOutput: "Connection C100: CLOSED", isHidden: true, points: 10 },
        { input: "CONN500\nACTIVE", expectedOutput: "Connection CONN500: ACTIVE", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 30: Singleton & Factory Patterns
function generateDay30Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate Singleton pattern getInstance. Read class name and print 'Singleton.<class>.getInstance()'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String className = sc.next(); System.out.println(\"Singleton.\" + className + \".getInstance()\"); } }",
      examples: [
        { input: "Database", output: "Singleton.Database.getInstance()" },
        { input: "Logger", output: "Singleton.Logger.getInstance()" }
      ],
      testCases: [
        { input: "Database", expectedOutput: "Singleton.Database.getInstance()", isHidden: false, points: 10 },
        { input: "Logger", expectedOutput: "Singleton.Logger.getInstance()", isHidden: false, points: 10 },
        { input: "Configuration", expectedOutput: "Singleton.Configuration.getInstance()", isHidden: true, points: 10 },
        { input: "Cache", expectedOutput: "Singleton.Cache.getInstance()", isHidden: true, points: 10 },
        { input: "ConnectionPool", expectedOutput: "Singleton.ConnectionPool.getInstance()", isHidden: true, points: 10 },
        { input: "AppContext", expectedOutput: "Singleton.AppContext.getInstance()", isHidden: true, points: 10 },
        { input: "Registry", expectedOutput: "Singleton.Registry.getInstance()", isHidden: true, points: 10 },
        { input: "Manager", expectedOutput: "Singleton.Manager.getInstance()", isHidden: true, points: 10 },
        { input: "Controller", expectedOutput: "Singleton.Controller.getInstance()", isHidden: true, points: 10 },
        { input: "Service", expectedOutput: "Singleton.Service.getInstance()", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Factory pattern createProduct. Read product type and print 'Factory.create<type>()'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String type = sc.next(); System.out.println(\"Factory.create\" + type + \"()\"); } }",
      examples: [
        { input: "Car", output: "Factory.createCar()" },
        { input: "Bike", output: "Factory.createBike()" }
      ],
      testCases: [
        { input: "Car", expectedOutput: "Factory.createCar()", isHidden: false, points: 10 },
        { input: "Bike", expectedOutput: "Factory.createBike()", isHidden: false, points: 10 },
        { input: "Truck", expectedOutput: "Factory.createTruck()", isHidden: true, points: 10 },
        { input: "Bus", expectedOutput: "Factory.createBus()", isHidden: true, points: 10 },
        { input: "Ship", expectedOutput: "Factory.createShip()", isHidden: true, points: 10 },
        { input: "Plane", expectedOutput: "Factory.createPlane()", isHidden: true, points: 10 },
        { input: "Train", expectedOutput: "Factory.createTrain()", isHidden: true, points: 10 },
        { input: "Boat", expectedOutput: "Factory.createBoat()", isHidden: true, points: 10 },
        { input: "Helicopter", expectedOutput: "Factory.createHelicopter()", isHidden: true, points: 10 },
        { input: "Scooter", expectedOutput: "Factory.createScooter()", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Abstract Factory pattern. Read factory type and product. Print '<type>Factory.create<product>()'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String factory = sc.next(); String product = sc.next(); System.out.println(factory + \"Factory.create\" + product + \"()\"); } }",
      examples: [
        { input: "Modern\nChair", output: "ModernFactory.createChair()" },
        { input: "Victorian\nTable", output: "VictorianFactory.createTable()" }
      ],
      testCases: [
        { input: "Modern\nChair", expectedOutput: "ModernFactory.createChair()", isHidden: false, points: 10 },
        { input: "Victorian\nTable", expectedOutput: "VictorianFactory.createTable()", isHidden: false, points: 10 },
        { input: "Classic\nSofa", expectedOutput: "ClassicFactory.createSofa()", isHidden: true, points: 10 },
        { input: "Contemporary\nDesk", expectedOutput: "ContemporaryFactory.createDesk()", isHidden: true, points: 10 },
        { input: "Rustic\nBed", expectedOutput: "RusticFactory.createBed()", isHidden: true, points: 10 },
        { input: "Minimalist\nLamp", expectedOutput: "MinimalistFactory.createLamp()", isHidden: true, points: 10 },
        { input: "Industrial\nShelf", expectedOutput: "IndustrialFactory.createShelf()", isHidden: true, points: 10 },
        { input: "Scandinavian\nCabinet", expectedOutput: "ScandinavianFactory.createCabinet()", isHidden: true, points: 10 },
        { input: "Art\nDeco", expectedOutput: "ArtFactory.createDeco()", isHidden: true, points: 10 },
        { input: "Traditional\nStool", expectedOutput: "TraditionalFactory.createStool()", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Factory Method pattern. Read creator type and print '<type>Creator.factoryMethod()'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String type = sc.next(); System.out.println(type + \"Creator.factoryMethod()\"); } }",
      examples: [
        { input: "Concrete", output: "ConcreteCreator.factoryMethod()" },
        { input: "Custom", output: "CustomCreator.factoryMethod()" }
      ],
      testCases: [
        { input: "Concrete", expectedOutput: "ConcreteCreator.factoryMethod()", isHidden: false, points: 10 },
        { input: "Custom", expectedOutput: "CustomCreator.factoryMethod()", isHidden: false, points: 10 },
        { input: "Abstract", expectedOutput: "AbstractCreator.factoryMethod()", isHidden: true, points: 10 },
        { input: "Base", expectedOutput: "BaseCreator.factoryMethod()", isHidden: true, points: 10 },
        { input: "Default", expectedOutput: "DefaultCreator.factoryMethod()", isHidden: true, points: 10 },
        { input: "Simple", expectedOutput: "SimpleCreator.factoryMethod()", isHidden: true, points: 10 },
        { input: "Complex", expectedOutput: "ComplexCreator.factoryMethod()", isHidden: true, points: 10 },
        { input: "Generic", expectedOutput: "GenericCreator.factoryMethod()", isHidden: true, points: 10 },
        { input: "Specific", expectedOutput: "SpecificCreator.factoryMethod()", isHidden: true, points: 10 },
        { input: "Advanced", expectedOutput: "AdvancedCreator.factoryMethod()", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate lazy initialization in Singleton. Read class name and print 'Lazy.<class>.getInstance(): Creating instance'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String className = sc.next(); System.out.println(\"Lazy.\" + className + \".getInstance(): Creating instance\"); } }",
      examples: [
        { input: "Database", output: "Lazy.Database.getInstance(): Creating instance" },
        { input: "Logger", output: "Lazy.Logger.getInstance(): Creating instance" }
      ],
      testCases: [
        { input: "Database", expectedOutput: "Lazy.Database.getInstance(): Creating instance", isHidden: false, points: 10 },
        { input: "Logger", expectedOutput: "Lazy.Logger.getInstance(): Creating instance", isHidden: false, points: 10 },
        { input: "Configuration", expectedOutput: "Lazy.Configuration.getInstance(): Creating instance", isHidden: true, points: 10 },
        { input: "Cache", expectedOutput: "Lazy.Cache.getInstance(): Creating instance", isHidden: true, points: 10 },
        { input: "ConnectionPool", expectedOutput: "Lazy.ConnectionPool.getInstance(): Creating instance", isHidden: true, points: 10 },
        { input: "AppContext", expectedOutput: "Lazy.AppContext.getInstance(): Creating instance", isHidden: true, points: 10 },
        { input: "Registry", expectedOutput: "Lazy.Registry.getInstance(): Creating instance", isHidden: true, points: 10 },
        { input: "Manager", expectedOutput: "Lazy.Manager.getInstance(): Creating instance", isHidden: true, points: 10 },
        { input: "Controller", expectedOutput: "Lazy.Controller.getInstance(): Creating instance", isHidden: true, points: 10 },
        { input: "Service", expectedOutput: "Lazy.Service.getInstance(): Creating instance", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 31: Observer & Strategy Patterns
function generateDay31Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate Observer pattern notify. Read subject name and number of observers. Print 'Subject: <name> notifying <count> observers'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String subject = sc.next(); int count = sc.nextInt(); System.out.println(\"Subject: \" + subject + \" notifying \" + count + \" observers\"); } }",
      examples: [
        { input: "WeatherStation\n3", output: "Subject: WeatherStation notifying 3 observers" },
        { input: "StockMarket\n5", output: "Subject: StockMarket notifying 5 observers" }
      ],
      testCases: [
        { input: "WeatherStation\n3", expectedOutput: "Subject: WeatherStation notifying 3 observers", isHidden: false, points: 10 },
        { input: "StockMarket\n5", expectedOutput: "Subject: StockMarket notifying 5 observers", isHidden: false, points: 10 },
        { input: "NewsAgency\n10", expectedOutput: "Subject: NewsAgency notifying 10 observers", isHidden: true, points: 10 },
        { input: "Temperature\n2", expectedOutput: "Subject: Temperature notifying 2 observers", isHidden: true, points: 10 },
        { input: "Auction\n7", expectedOutput: "Subject: Auction notifying 7 observers", isHidden: true, points: 10 },
        { input: "ChatRoom\n15", expectedOutput: "Subject: ChatRoom notifying 15 observers", isHidden: true, points: 10 },
        { input: "EventBus\n4", expectedOutput: "Subject: EventBus notifying 4 observers", isHidden: true, points: 10 },
        { input: "Sensor\n6", expectedOutput: "Subject: Sensor notifying 6 observers", isHidden: true, points: 10 },
        { input: "Publisher\n8", expectedOutput: "Subject: Publisher notifying 8 observers", isHidden: true, points: 10 },
        { input: "Notifier\n1", expectedOutput: "Subject: Notifier notifying 1 observers", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Observer update. Read observer name and message. Print 'Observer <name> received: <message>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String observer = sc.next(); String message = sc.next(); System.out.println(\"Observer \" + observer + \" received: \" + message); } }",
      examples: [
        { input: "Display1\nUpdate", output: "Observer Display1 received: Update" },
        { input: "Logger\nEvent", output: "Observer Logger received: Event" }
      ],
      testCases: [
        { input: "Display1\nUpdate", expectedOutput: "Observer Display1 received: Update", isHidden: false, points: 10 },
        { input: "Logger\nEvent", expectedOutput: "Observer Logger received: Event", isHidden: false, points: 10 },
        { input: "Monitor\nAlert", expectedOutput: "Observer Monitor received: Alert", isHidden: true, points: 10 },
        { input: "Dashboard\nChange", expectedOutput: "Observer Dashboard received: Change", isHidden: true, points: 10 },
        { input: "Subscriber\nNotification", expectedOutput: "Observer Subscriber received: Notification", isHidden: true, points: 10 },
        { input: "Listener\nTrigger", expectedOutput: "Observer Listener received: Trigger", isHidden: true, points: 10 },
        { input: "Handler\nSignal", expectedOutput: "Observer Handler received: Signal", isHidden: true, points: 10 },
        { input: "Watcher\nData", expectedOutput: "Observer Watcher received: Data", isHidden: true, points: 10 },
        { input: "Client\nMessage", expectedOutput: "Observer Client received: Message", isHidden: true, points: 10 },
        { input: "Consumer\nInfo", expectedOutput: "Observer Consumer received: Info", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Strategy pattern. Read context name and strategy type. Print 'Context: <name> using <strategy> strategy'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String context = sc.next(); String strategy = sc.next(); System.out.println(\"Context: \" + context + \" using \" + strategy + \" strategy\"); } }",
      examples: [
        { input: "Payment\nCreditCard", output: "Context: Payment using CreditCard strategy" },
        { input: "Sorting\nQuickSort", output: "Context: Sorting using QuickSort strategy" }
      ],
      testCases: [
        { input: "Payment\nCreditCard", expectedOutput: "Context: Payment using CreditCard strategy", isHidden: false, points: 10 },
        { input: "Sorting\nQuickSort", expectedOutput: "Context: Sorting using QuickSort strategy", isHidden: false, points: 10 },
        { input: "Navigation\nCar", expectedOutput: "Context: Navigation using Car strategy", isHidden: true, points: 10 },
        { input: "Compression\nZIP", expectedOutput: "Context: Compression using ZIP strategy", isHidden: true, points: 10 },
        { input: "Encryption\nAES", expectedOutput: "Context: Encryption using AES strategy", isHidden: true, points: 10 },
        { input: "Authentication\nOAuth", expectedOutput: "Context: Authentication using OAuth strategy", isHidden: true, points: 10 },
        { input: "Logging\nFile", expectedOutput: "Context: Logging using File strategy", isHidden: true, points: 10 },
        { input: "Routing\nDynamic", expectedOutput: "Context: Routing using Dynamic strategy", isHidden: true, points: 10 },
        { input: "Validation\nRegex", expectedOutput: "Context: Validation using Regex strategy", isHidden: true, points: 10 },
        { input: "Rendering\nHTML", expectedOutput: "Context: Rendering using HTML strategy", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Strategy execution. Read strategy name and input value. Print 'Executing <strategy> with input: <value>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String strategy = sc.next(); String value = sc.next(); System.out.println(\"Executing \" + strategy + \" with input: \" + value); } }",
      examples: [
        { input: "BubbleSort\n[5,3,1]", output: "Executing BubbleSort with input: [5,3,1]" },
        { input: "PayPal\n100.50", output: "Executing PayPal with input: 100.50" }
      ],
      testCases: [
        { input: "BubbleSort\n[5,3,1]", expectedOutput: "Executing BubbleSort with input: [5,3,1]", isHidden: false, points: 10 },
        { input: "PayPal\n100.50", expectedOutput: "Executing PayPal with input: 100.50", isHidden: false, points: 10 },
        { input: "MergeSort\n[9,7,5]", expectedOutput: "Executing MergeSort with input: [9,7,5]", isHidden: true, points: 10 },
        { input: "Bitcoin\n0.5", expectedOutput: "Executing Bitcoin with input: 0.5", isHidden: true, points: 10 },
        { input: "AES256\nSecret", expectedOutput: "Executing AES256 with input: Secret", isHidden: true, points: 10 },
        { input: "Walk\nPark", expectedOutput: "Executing Walk with input: Park", isHidden: true, points: 10 },
        { input: "GZIP\nFile.txt", expectedOutput: "Executing GZIP with input: File.txt", isHidden: true, points: 10 },
        { input: "JWT\nToken123", expectedOutput: "Executing JWT with input: Token123", isHidden: true, points: 10 },
        { input: "Console\nError", expectedOutput: "Executing Console with input: Error", isHidden: true, points: 10 },
        { input: "XML\nData", expectedOutput: "Executing XML with input: Data", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Observer attach/detach. Read operation (ATTACH/DETACH), subject, and observer. Print '<operation>: <observer> to <subject>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String operation = sc.next(); String subject = sc.next(); String observer = sc.next(); System.out.println(operation + \": \" + observer + \" to \" + subject); } }",
      examples: [
        { input: "ATTACH\nWeatherStation\nDisplay1", output: "ATTACH: Display1 to WeatherStation" },
        { input: "DETACH\nStockMarket\nTrader", output: "DETACH: Trader to StockMarket" }
      ],
      testCases: [
        { input: "ATTACH\nWeatherStation\nDisplay1", expectedOutput: "ATTACH: Display1 to WeatherStation", isHidden: false, points: 10 },
        { input: "DETACH\nStockMarket\nTrader", expectedOutput: "DETACH: Trader to StockMarket", isHidden: false, points: 10 },
        { input: "ATTACH\nNewsAgency\nReader", expectedOutput: "ATTACH: Reader to NewsAgency", isHidden: true, points: 10 },
        { input: "DETACH\nSensor\nMonitor", expectedOutput: "DETACH: Monitor to Sensor", isHidden: true, points: 10 },
        { input: "ATTACH\nChatRoom\nUser1", expectedOutput: "ATTACH: User1 to ChatRoom", isHidden: true, points: 10 },
        { input: "DETACH\nEventBus\nListener", expectedOutput: "DETACH: Listener to EventBus", isHidden: true, points: 10 },
        { input: "ATTACH\nPublisher\nSubscriber", expectedOutput: "ATTACH: Subscriber to Publisher", isHidden: true, points: 10 },
        { input: "DETACH\nAuction\nBidder", expectedOutput: "DETACH: Bidder to Auction", isHidden: true, points: 10 },
        { input: "ATTACH\nNotifier\nReceiver", expectedOutput: "ATTACH: Receiver to Notifier", isHidden: true, points: 10 },
        { input: "DETACH\nBroadcaster\nClient", expectedOutput: "DETACH: Client to Broadcaster", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 32: Builder & Prototype Patterns
function generateDay32Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Simulate Builder pattern. Read product name and number of build steps. Print 'Building <product> in <steps> steps'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String product = sc.next(); int steps = sc.nextInt(); System.out.println(\"Building \" + product + \" in \" + steps + \" steps\"); } }",
      examples: [
        { input: "House\n5", output: "Building House in 5 steps" },
        { input: "Car\n3", output: "Building Car in 3 steps" }
      ],
      testCases: [
        { input: "House\n5", expectedOutput: "Building House in 5 steps", isHidden: false, points: 10 },
        { input: "Car\n3", expectedOutput: "Building Car in 3 steps", isHidden: false, points: 10 },
        { input: "Computer\n7", expectedOutput: "Building Computer in 7 steps", isHidden: true, points: 10 },
        { input: "Pizza\n4", expectedOutput: "Building Pizza in 4 steps", isHidden: true, points: 10 },
        { input: "Robot\n10", expectedOutput: "Building Robot in 10 steps", isHidden: true, points: 10 },
        { input: "Burger\n2", expectedOutput: "Building Burger in 2 steps", isHidden: true, points: 10 },
        { input: "Sandwich\n6", expectedOutput: "Building Sandwich in 6 steps", isHidden: true, points: 10 },
        { input: "Laptop\n8", expectedOutput: "Building Laptop in 8 steps", isHidden: true, points: 10 },
        { input: "Phone\n5", expectedOutput: "Building Phone in 5 steps", isHidden: true, points: 10 },
        { input: "Cake\n9", expectedOutput: "Building Cake in 9 steps", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Builder method chaining. Read object type and three properties. Print 'Builder.<type>().set<prop1>().set<prop2>().set<prop3>().build()'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String type = sc.next(); String prop1 = sc.next(); String prop2 = sc.next(); String prop3 = sc.next(); System.out.println(\"Builder.\" + type + \"().set\" + prop1 + \"().set\" + prop2 + \"().set\" + prop3 + \"().build()\"); } }",
      examples: [
        { input: "Car\nColor\nEngine\nWheels", output: "Builder.Car().setColor().setEngine().setWheels().build()" },
        { input: "House\nRoof\nWalls\nDoor", output: "Builder.House().setRoof().setWalls().setDoor().build()" }
      ],
      testCases: [
        { input: "Car\nColor\nEngine\nWheels", expectedOutput: "Builder.Car().setColor().setEngine().setWheels().build()", isHidden: false, points: 10 },
        { input: "House\nRoof\nWalls\nDoor", expectedOutput: "Builder.House().setRoof().setWalls().setDoor().build()", isHidden: false, points: 10 },
        { input: "Computer\nCPU\nRAM\nStorage", expectedOutput: "Builder.Computer().setCPU().setRAM().setStorage().build()", isHidden: true, points: 10 },
        { input: "Pizza\nBase\nSauce\nTopping", expectedOutput: "Builder.Pizza().setBase().setSauce().setTopping().build()", isHidden: true, points: 10 },
        { input: "Person\nName\nAge\nAddress", expectedOutput: "Builder.Person().setName().setAge().setAddress().build()", isHidden: true, points: 10 },
        { input: "Phone\nScreen\nBattery\nCamera", expectedOutput: "Builder.Phone().setScreen().setBattery().setCamera().build()", isHidden: true, points: 10 },
        { input: "Book\nTitle\nAuthor\nPages", expectedOutput: "Builder.Book().setTitle().setAuthor().setPages().build()", isHidden: true, points: 10 },
        { input: "Game\nLevel\nScore\nLives", expectedOutput: "Builder.Game().setLevel().setScore().setLives().build()", isHidden: true, points: 10 },
        { input: "Account\nUsername\nPassword\nEmail", expectedOutput: "Builder.Account().setUsername().setPassword().setEmail().build()", isHidden: true, points: 10 },
        { input: "Order\nItem\nQuantity\nPrice", expectedOutput: "Builder.Order().setItem().setQuantity().setPrice().build()", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Prototype clone. Read prototype name and clone count. Print 'Cloning <name>: <count> copies'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.next(); int count = sc.nextInt(); System.out.println(\"Cloning \" + name + \": \" + count + \" copies\"); } }",
      examples: [
        { input: "Document\n3", output: "Cloning Document: 3 copies" },
        { input: "Shape\n5", output: "Cloning Shape: 5 copies" }
      ],
      testCases: [
        { input: "Document\n3", expectedOutput: "Cloning Document: 3 copies", isHidden: false, points: 10 },
        { input: "Shape\n5", expectedOutput: "Cloning Shape: 5 copies", isHidden: false, points: 10 },
        { input: "Cell\n10", expectedOutput: "Cloning Cell: 10 copies", isHidden: true, points: 10 },
        { input: "Template\n2", expectedOutput: "Cloning Template: 2 copies", isHidden: true, points: 10 },
        { input: "Object\n7", expectedOutput: "Cloning Object: 7 copies", isHidden: true, points: 10 },
        { input: "Instance\n4", expectedOutput: "Cloning Instance: 4 copies", isHidden: true, points: 10 },
        { input: "Record\n15", expectedOutput: "Cloning Record: 15 copies", isHidden: true, points: 10 },
        { input: "Entity\n6", expectedOutput: "Cloning Entity: 6 copies", isHidden: true, points: 10 },
        { input: "Item\n8", expectedOutput: "Cloning Item: 8 copies", isHidden: true, points: 10 },
        { input: "Node\n1", expectedOutput: "Cloning Node: 1 copies", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate deep vs shallow copy. Read object name and copy type (DEEP/SHALLOW). Print '<type> copy of <object>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String object = sc.next(); String type = sc.next(); System.out.println(type + \" copy of \" + object); } }",
      examples: [
        { input: "Array\nDEEP", output: "DEEP copy of Array" },
        { input: "List\nSHALLOW", output: "SHALLOW copy of List" }
      ],
      testCases: [
        { input: "Array\nDEEP", expectedOutput: "DEEP copy of Array", isHidden: false, points: 10 },
        { input: "List\nSHALLOW", expectedOutput: "SHALLOW copy of List", isHidden: false, points: 10 },
        { input: "Object\nDEEP", expectedOutput: "DEEP copy of Object", isHidden: true, points: 10 },
        { input: "Tree\nSHALLOW", expectedOutput: "SHALLOW copy of Tree", isHidden: true, points: 10 },
        { input: "Graph\nDEEP", expectedOutput: "DEEP copy of Graph", isHidden: true, points: 10 },
        { input: "Map\nSHALLOW", expectedOutput: "SHALLOW copy of Map", isHidden: true, points: 10 },
        { input: "Set\nDEEP", expectedOutput: "DEEP copy of Set", isHidden: true, points: 10 },
        { input: "Collection\nSHALLOW", expectedOutput: "SHALLOW copy of Collection", isHidden: true, points: 10 },
        { input: "Structure\nDEEP", expectedOutput: "DEEP copy of Structure", isHidden: true, points: 10 },
        { input: "Data\nSHALLOW", expectedOutput: "SHALLOW copy of Data", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate Builder director. Read director name and product type. Print 'Director <name> constructing <product>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String director = sc.next(); String product = sc.next(); System.out.println(\"Director \" + director + \" constructing \" + product); } }",
      examples: [
        { input: "CarDirector\nSportsCar", output: "Director CarDirector constructing SportsCar" },
        { input: "HouseDirector\nVilla", output: "Director HouseDirector constructing Villa" }
      ],
      testCases: [
        { input: "CarDirector\nSportsCar", expectedOutput: "Director CarDirector constructing SportsCar", isHidden: false, points: 10 },
        { input: "HouseDirector\nVilla", expectedOutput: "Director HouseDirector constructing Villa", isHidden: false, points: 10 },
        { input: "ComputerDirector\nGamingPC", expectedOutput: "Director ComputerDirector constructing GamingPC", isHidden: true, points: 10 },
        { input: "PizzaDirector\nMargherita", expectedOutput: "Director PizzaDirector constructing Margherita", isHidden: true, points: 10 },
        { input: "RobotDirector\nIndustrialBot", expectedOutput: "Director RobotDirector constructing IndustrialBot", isHidden: true, points: 10 },
        { input: "PhoneDirector\nSmartphone", expectedOutput: "Director PhoneDirector constructing Smartphone", isHidden: true, points: 10 },
        { input: "BookDirector\nNovel", expectedOutput: "Director BookDirector constructing Novel", isHidden: true, points: 10 },
        { input: "GameDirector\nRPG", expectedOutput: "Director GameDirector constructing RPG", isHidden: true, points: 10 },
        { input: "MealDirector\nDinner", expectedOutput: "Director MealDirector constructing Dinner", isHidden: true, points: 10 },
        { input: "DocumentDirector\nReport", expectedOutput: "Director DocumentDirector constructing Report", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 33: Final Project & Interview Prep
function generateDay33Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Calculate time complexity. Read algorithm name and input size n. Print 'Algorithm: <name>, Complexity: O(n)' (just print n as complexity).",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.next(); int n = sc.nextInt(); System.out.println(\"Algorithm: \" + name + \", Complexity: O(n)\"); } }",
      examples: [
        { input: "LinearSearch\n100", output: "Algorithm: LinearSearch, Complexity: O(n)" },
        { input: "BubbleSort\n50", output: "Algorithm: BubbleSort, Complexity: O(n)" }
      ],
      testCases: [
        { input: "LinearSearch\n100", expectedOutput: "Algorithm: LinearSearch, Complexity: O(n)", isHidden: false, points: 10 },
        { input: "BubbleSort\n50", expectedOutput: "Algorithm: BubbleSort, Complexity: O(n)", isHidden: false, points: 10 },
        { input: "BinarySearch\n1000", expectedOutput: "Algorithm: BinarySearch, Complexity: O(n)", isHidden: true, points: 10 },
        { input: "QuickSort\n200", expectedOutput: "Algorithm: QuickSort, Complexity: O(n)", isHidden: true, points: 10 },
        { input: "MergeSort\n500", expectedOutput: "Algorithm: MergeSort, Complexity: O(n)", isHidden: true, points: 10 },
        { input: "HeapSort\n300", expectedOutput: "Algorithm: HeapSort, Complexity: O(n)", isHidden: true, points: 10 },
        { input: "InsertionSort\n75", expectedOutput: "Algorithm: InsertionSort, Complexity: O(n)", isHidden: true, points: 10 },
        { input: "SelectionSort\n150", expectedOutput: "Algorithm: SelectionSort, Complexity: O(n)", isHidden: true, points: 10 },
        { input: "CountingSort\n400", expectedOutput: "Algorithm: CountingSort, Complexity: O(n)", isHidden: true, points: 10 },
        { input: "RadixSort\n250", expectedOutput: "Algorithm: RadixSort, Complexity: O(n)", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate code review comment. Read file name and line number. Print 'Review: <file>:<line> needs improvement'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String file = sc.next(); int line = sc.nextInt(); System.out.println(\"Review: \" + file + \":\" + line + \" needs improvement\"); } }",
      examples: [
        { input: "Main.java\n42", output: "Review: Main.java:42 needs improvement" },
        { input: "Utils.java\n15", output: "Review: Utils.java:15 needs improvement" }
      ],
      testCases: [
        { input: "Main.java\n42", expectedOutput: "Review: Main.java:42 needs improvement", isHidden: false, points: 10 },
        { input: "Utils.java\n15", expectedOutput: "Review: Utils.java:15 needs improvement", isHidden: false, points: 10 },
        { input: "Controller.java\n88", expectedOutput: "Review: Controller.java:88 needs improvement", isHidden: true, points: 10 },
        { input: "Service.java\n120", expectedOutput: "Review: Service.java:120 needs improvement", isHidden: true, points: 10 },
        { input: "Repository.java\n55", expectedOutput: "Review: Repository.java:55 needs improvement", isHidden: true, points: 10 },
        { input: "Model.java\n30", expectedOutput: "Review: Model.java:30 needs improvement", isHidden: true, points: 10 },
        { input: "Helper.java\n99", expectedOutput: "Review: Helper.java:99 needs improvement", isHidden: true, points: 10 },
        { input: "Config.java\n10", expectedOutput: "Review: Config.java:10 needs improvement", isHidden: true, points: 10 },
        { input: "Test.java\n67", expectedOutput: "Review: Test.java:67 needs improvement", isHidden: true, points: 10 },
        { input: "App.java\n1", expectedOutput: "Review: App.java:1 needs improvement", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate test case result. Read test name and status (PASS/FAIL). Print 'Test: <name> - <status>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String test = sc.next(); String status = sc.next(); System.out.println(\"Test: \" + test + \" - \" + status); } }",
      examples: [
        { input: "testLogin\nPASS", output: "Test: testLogin - PASS" },
        { input: "testPayment\nFAIL", output: "Test: testPayment - FAIL" }
      ],
      testCases: [
        { input: "testLogin\nPASS", expectedOutput: "Test: testLogin - PASS", isHidden: false, points: 10 },
        { input: "testPayment\nFAIL", expectedOutput: "Test: testPayment - FAIL", isHidden: false, points: 10 },
        { input: "testSignup\nPASS", expectedOutput: "Test: testSignup - PASS", isHidden: true, points: 10 },
        { input: "testCheckout\nFAIL", expectedOutput: "Test: testCheckout - FAIL", isHidden: true, points: 10 },
        { input: "testValidation\nPASS", expectedOutput: "Test: testValidation - PASS", isHidden: true, points: 10 },
        { input: "testDatabase\nFAIL", expectedOutput: "Test: testDatabase - FAIL", isHidden: true, points: 10 },
        { input: "testAPI\nPASS", expectedOutput: "Test: testAPI - PASS", isHidden: true, points: 10 },
        { input: "testSecurity\nFAIL", expectedOutput: "Test: testSecurity - FAIL", isHidden: true, points: 10 },
        { input: "testPerformance\nPASS", expectedOutput: "Test: testPerformance - PASS", isHidden: true, points: 10 },
        { input: "testIntegration\nFAIL", expectedOutput: "Test: testIntegration - FAIL", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate deployment status. Read environment and version. Print 'Deploying v<version> to <environment>'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String environment = sc.next(); String version = sc.next(); System.out.println(\"Deploying v\" + version + \" to \" + environment); } }",
      examples: [
        { input: "production\n1.0.0", output: "Deploying v1.0.0 to production" },
        { input: "staging\n2.1.5", output: "Deploying v2.1.5 to staging" }
      ],
      testCases: [
        { input: "production\n1.0.0", expectedOutput: "Deploying v1.0.0 to production", isHidden: false, points: 10 },
        { input: "staging\n2.1.5", expectedOutput: "Deploying v2.1.5 to staging", isHidden: false, points: 10 },
        { input: "development\n0.9.0", expectedOutput: "Deploying v0.9.0 to development", isHidden: true, points: 10 },
        { input: "testing\n1.5.2", expectedOutput: "Deploying v1.5.2 to testing", isHidden: true, points: 10 },
        { input: "qa\n3.0.0", expectedOutput: "Deploying v3.0.0 to qa", isHidden: true, points: 10 },
        { input: "production\n4.2.1", expectedOutput: "Deploying v4.2.1 to production", isHidden: true, points: 10 },
        { input: "staging\n1.8.9", expectedOutput: "Deploying v1.8.9 to staging", isHidden: true, points: 10 },
        { input: "uat\n2.0.0", expectedOutput: "Deploying v2.0.0 to uat", isHidden: true, points: 10 },
        { input: "demo\n1.2.3", expectedOutput: "Deploying v1.2.3 to demo", isHidden: true, points: 10 },
        { input: "local\n0.1.0", expectedOutput: "Deploying v0.1.0 to local", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Simulate interview question difficulty. Read question ID and difficulty level (1-5). Print 'Question <id>: Level <level>/5'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String id = sc.next(); int level = sc.nextInt(); System.out.println(\"Question \" + id + \": Level \" + level + \"/5\"); } }",
      examples: [
        { input: "Q001\n3", output: "Question Q001: Level 3/5" },
        { input: "Q042\n5", output: "Question Q042: Level 5/5" }
      ],
      testCases: [
        { input: "Q001\n3", expectedOutput: "Question Q001: Level 3/5", isHidden: false, points: 10 },
        { input: "Q042\n5", expectedOutput: "Question Q042: Level 5/5", isHidden: false, points: 10 },
        { input: "Q010\n1", expectedOutput: "Question Q010: Level 1/5", isHidden: true, points: 10 },
        { input: "Q025\n4", expectedOutput: "Question Q025: Level 4/5", isHidden: true, points: 10 },
        { input: "Q100\n2", expectedOutput: "Question Q100: Level 2/5", isHidden: true, points: 10 },
        { input: "Q500\n5", expectedOutput: "Question Q500: Level 5/5", isHidden: true, points: 10 },
        { input: "Q075\n3", expectedOutput: "Question Q075: Level 3/5", isHidden: true, points: 10 },
        { input: "Q200\n1", expectedOutput: "Question Q200: Level 1/5", isHidden: true, points: 10 },
        { input: "Q333\n4", expectedOutput: "Question Q333: Level 4/5", isHidden: true, points: 10 },
        { input: "Q999\n2", expectedOutput: "Question Q999: Level 2/5", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 34: Control Flow Statements
function generateDay34Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Use if-else to check if a number is positive, negative, or zero. Read an integer n and print 'Positive', 'Negative', or 'Zero'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); if (n > 0) { System.out.println(\"Positive\"); } else if (n < 0) { System.out.println(\"Negative\"); } else { System.out.println(\"Zero\"); } } }",
      examples: [
        { input: "5", output: "Positive" },
        { input: "-3", output: "Negative" }
      ],
      testCases: [
        { input: "5", expectedOutput: "Positive", isHidden: false, points: 10 },
        { input: "-3", expectedOutput: "Negative", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "Zero", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "Positive", isHidden: true, points: 10 },
        { input: "-50", expectedOutput: "Negative", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "Positive", isHidden: true, points: 10 },
        { input: "-1", expectedOutput: "Negative", isHidden: true, points: 10 },
        { input: "42", expectedOutput: "Positive", isHidden: true, points: 10 },
        { input: "-99", expectedOutput: "Negative", isHidden: true, points: 10 },
        { input: "0", expectedOutput: "Zero", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use switch-case to convert day number (1-7) to day name. Read day number and print day name (1=Monday...7=Sunday).",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int day = sc.nextInt(); switch (day) { case 1: System.out.println(\"Monday\"); break; case 2: System.out.println(\"Tuesday\"); break; case 3: System.out.println(\"Wednesday\"); break; case 4: System.out.println(\"Thursday\"); break; case 5: System.out.println(\"Friday\"); break; case 6: System.out.println(\"Saturday\"); break; case 7: System.out.println(\"Sunday\"); break; default: System.out.println(\"Invalid\"); break; } } }",
      examples: [
        { input: "1", output: "Monday" },
        { input: "5", output: "Friday" }
      ],
      testCases: [
        { input: "1", expectedOutput: "Monday", isHidden: false, points: 10 },
        { input: "5", expectedOutput: "Friday", isHidden: false, points: 10 },
        { input: "2", expectedOutput: "Tuesday", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "Wednesday", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "Thursday", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "Saturday", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "Sunday", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "Invalid", isHidden: true, points: 10 },
        { input: "0", expectedOutput: "Invalid", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "Monday", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use nested if to find the largest of three numbers. Read three integers and print the largest.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int c = sc.nextInt(); if (a >= b && a >= c) { System.out.println(a); } else if (b >= a && b >= c) { System.out.println(b); } else { System.out.println(c); } } }",
      examples: [
        { input: "10\n20\n15", output: "20" },
        { input: "5\n3\n8", output: "8" }
      ],
      testCases: [
        { input: "10\n20\n15", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "5\n3\n8", expectedOutput: "8", isHidden: false, points: 10 },
        { input: "100\n50\n75", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "7\n7\n7", expectedOutput: "7", isHidden: true, points: 10 },
        { input: "1\n2\n3", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "30\n30\n20", expectedOutput: "30", isHidden: true, points: 10 },
        { input: "9\n10\n8", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "50\n25\n75", expectedOutput: "75", isHidden: true, points: 10 },
        { input: "0\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "42\n42\n41", expectedOutput: "42", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use ternary operator to find min of two numbers. Read two integers and print the smaller one.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int min = a < b ? a : b; System.out.println(min); } }",
      examples: [
        { input: "10\n5", output: "5" },
        { input: "3\n7", output: "3" }
      ],
      testCases: [
        { input: "10\n5", expectedOutput: "5", isHidden: false, points: 10 },
        { input: "3\n7", expectedOutput: "3", isHidden: false, points: 10 },
        { input: "15\n20", expectedOutput: "15", isHidden: true, points: 10 },
        { input: "100\n50", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "8\n8", expectedOutput: "8", isHidden: true, points: 10 },
        { input: "1\n2", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "99\n100", expectedOutput: "99", isHidden: true, points: 10 },
        { input: "42\n21", expectedOutput: "21", isHidden: true, points: 10 },
        { input: "0\n5", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "25\n25", expectedOutput: "25", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use if-else to check leap year. Read year and print 'Leap' if leap year, else 'Not Leap'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int year = sc.nextInt(); if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) { System.out.println(\"Leap\"); } else { System.out.println(\"Not Leap\"); } } }",
      examples: [
        { input: "2020", output: "Leap" },
        { input: "2021", output: "Not Leap" }
      ],
      testCases: [
        { input: "2020", expectedOutput: "Leap", isHidden: false, points: 10 },
        { input: "2021", expectedOutput: "Not Leap", isHidden: false, points: 10 },
        { input: "2000", expectedOutput: "Leap", isHidden: true, points: 10 },
        { input: "1900", expectedOutput: "Not Leap", isHidden: true, points: 10 },
        { input: "2024", expectedOutput: "Leap", isHidden: true, points: 10 },
        { input: "2022", expectedOutput: "Not Leap", isHidden: true, points: 10 },
        { input: "2400", expectedOutput: "Leap", isHidden: true, points: 10 },
        { input: "1800", expectedOutput: "Not Leap", isHidden: true, points: 10 },
        { input: "2016", expectedOutput: "Leap", isHidden: true, points: 10 },
        { input: "2019", expectedOutput: "Not Leap", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 35: Loops in Java
function generateDay35Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Use for loop to print numbers from 1 to n. Read n and print all numbers from 1 to n on separate lines.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); for (int i = 1; i <= n; i++) { System.out.println(i); } } }",
      examples: [
        { input: "5", output: "1\n2\n3\n4\n5" },
        { input: "3", output: "1\n2\n3" }
      ],
      testCases: [
        { input: "5", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 },
        { input: "3", expectedOutput: "1\n2\n3", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "1\n2\n3\n4\n5\n6\n7", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "1\n2", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "1\n2\n3\n4", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "1\n2\n3\n4\n5\n6", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use while loop to calculate sum of first n natural numbers. Read n and print the sum.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int sum = 0; int i = 1; while (i <= n) { sum += i; i++; } System.out.println(sum); } }",
      examples: [
        { input: "5", output: "15" },
        { input: "10", output: "55" }
      ],
      testCases: [
        { input: "5", expectedOutput: "15", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "55", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "6", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "28", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "10", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "21", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "36", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "3", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "45", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use do-while loop to print multiplication table. Read n and print multiplication table for n (n x 1 to n x 10).",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int i = 1; do { System.out.println(n * i); i++; } while (i <= 10); } }",
      examples: [
        { input: "5", output: "5\n10\n15\n20\n25\n30\n35\n40\n45\n50" },
        { input: "2", output: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20" }
      ],
      testCases: [
        { input: "5", expectedOutput: "5\n10\n15\n20\n25\n30\n35\n40\n45\n50", isHidden: false, points: 10 },
        { input: "2", expectedOutput: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "3\n6\n9\n12\n15\n18\n21\n24\n27\n30", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "7\n14\n21\n28\n35\n42\n49\n56\n63\n70", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "4\n8\n12\n16\n20\n24\n28\n32\n36\n40", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "6\n12\n18\n24\n30\n36\n42\n48\n54\n60", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "8\n16\n24\n32\n40\n48\n56\n64\n72\n80", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "9\n18\n27\n36\n45\n54\n63\n72\n81\n90", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "10\n20\n30\n40\n50\n60\n70\n80\n90\n100", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use nested for loops to print a pattern. Read n and print n lines where line i has i asterisks.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) { System.out.print(\"*\"); } System.out.println(); } } }",
      examples: [
        { input: "3", output: "*\n**\n***" },
        { input: "5", output: "*\n**\n***\n****\n*****" }
      ],
      testCases: [
        { input: "3", expectedOutput: "*\n**\n***", isHidden: false, points: 10 },
        { input: "5", expectedOutput: "*\n**\n***\n****\n*****", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "*", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "*\n**", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "*\n**\n***\n****", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "*\n**\n***\n****\n*****\n******", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "*\n**\n***\n****\n*****\n******\n*******", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "*\n**\n***\n****\n*****\n******\n*******\n********", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "*\n**\n***", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "*\n**\n***\n****", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use break and continue. Read n numbers, skip negative numbers (continue), stop at 0 (break), print positive numbers.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); for (int i = 0; i < n; i++) { int num = sc.nextInt(); if (num == 0) break; if (num < 0) continue; System.out.println(num); } } }",
      examples: [
        { input: "5\n5\n-3\n10\n0\n20", output: "5\n10" },
        { input: "4\n1\n-2\n3\n4", output: "1\n3\n4" }
      ],
      testCases: [
        { input: "5\n5\n-3\n10\n0\n20", expectedOutput: "5\n10", isHidden: false, points: 10 },
        { input: "4\n1\n-2\n3\n4", expectedOutput: "1\n3\n4", isHidden: false, points: 10 },
        { input: "3\n7\n8\n9", expectedOutput: "7\n8\n9", isHidden: true, points: 10 },
        { input: "5\n2\n-5\n4\n-1\n6", expectedOutput: "2\n4\n6", isHidden: true, points: 10 },
        { input: "2\n0\n5", expectedOutput: "", isHidden: true, points: 10 },
        { input: "6\n10\n20\n-10\n30\n0\n40", expectedOutput: "10\n20\n30", isHidden: true, points: 10 },
        { input: "3\n-1\n-2\n-3", expectedOutput: "", isHidden: true, points: 10 },
        { input: "4\n5\n5\n5\n5", expectedOutput: "5\n5\n5\n5", isHidden: true, points: 10 },
        { input: "5\n1\n0\n2\n3\n4", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "3\n100\n-50\n200", expectedOutput: "100\n200", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 36: Arrays and ArrayList
function generateDay36Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Declare and initialize an array. Read n, then n integers. Print all elements separated by spaces.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] arr = new int[n]; for (int i = 0; i < n; i++) { arr[i] = sc.nextInt(); } for (int i = 0; i < n; i++) { System.out.print(arr[i]); if (i < n - 1) System.out.print(\" \"); } } }",
      examples: [
        { input: "5\n1\n2\n3\n4\n5", output: "1 2 3 4 5" },
        { input: "3\n10\n20\n30", output: "10 20 30" }
      ],
      testCases: [
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "1 2 3 4 5", isHidden: false, points: 10 },
        { input: "3\n10\n20\n30", expectedOutput: "10 20 30", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n5\n10\n15\n20", expectedOutput: "5 10 15 20", isHidden: true, points: 10 },
        { input: "2\n100\n200", expectedOutput: "100 200", isHidden: true, points: 10 },
        { input: "6\n1\n3\n5\n7\n9\n11", expectedOutput: "1 3 5 7 9 11", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0 0 0", isHidden: true, points: 10 },
        { input: "5\n2\n4\n6\n8\n10", expectedOutput: "2 4 6 8 10", isHidden: true, points: 10 },
        { input: "4\n7\n14\n21\n28", expectedOutput: "7 14 21 28", isHidden: true, points: 10 },
        { input: "2\n50\n75", expectedOutput: "50 75", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Find sum of array elements. Read n, then n integers. Print the sum of all elements.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int sum = 0; for (int i = 0; i < n; i++) { sum += sc.nextInt(); } System.out.println(sum); } }",
      examples: [
        { input: "5\n1\n2\n3\n4\n5", output: "15" },
        { input: "3\n10\n20\n30", output: "60" }
      ],
      testCases: [
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "15", isHidden: false, points: 10 },
        { input: "3\n10\n20\n30", expectedOutput: "60", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n5\n5\n5\n5", expectedOutput: "20", isHidden: true, points: 10 },
        { input: "2\n100\n200", expectedOutput: "300", isHidden: true, points: 10 },
        { input: "6\n1\n2\n3\n4\n5\n6", expectedOutput: "21", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "5\n10\n20\n30\n40\n50", expectedOutput: "150", isHidden: true, points: 10 },
        { input: "4\n7\n8\n9\n10", expectedOutput: "34", isHidden: true, points: 10 },
        { input: "2\n50\n50", expectedOutput: "100", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use ArrayList to store and display elements. Read n, then n strings. Add to ArrayList and print all elements on separate lines.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); ArrayList<String> list = new ArrayList<>(); for (int i = 0; i < n; i++) { list.add(sc.next()); } for (String s : list) { System.out.println(s); } } }",
      examples: [
        { input: "3\nApple\nBanana\nCherry", output: "Apple\nBanana\nCherry" },
        { input: "2\nHello\nWorld", output: "Hello\nWorld" }
      ],
      testCases: [
        { input: "3\nApple\nBanana\nCherry", expectedOutput: "Apple\nBanana\nCherry", isHidden: false, points: 10 },
        { input: "2\nHello\nWorld", expectedOutput: "Hello\nWorld", isHidden: false, points: 10 },
        { input: "1\nJava", expectedOutput: "Java", isHidden: true, points: 10 },
        { input: "4\nA\nB\nC\nD", expectedOutput: "A\nB\nC\nD", isHidden: true, points: 10 },
        { input: "5\nOne\nTwo\nThree\nFour\nFive", expectedOutput: "One\nTwo\nThree\nFour\nFive", isHidden: true, points: 10 },
        { input: "2\nTest\nData", expectedOutput: "Test\nData", isHidden: true, points: 10 },
        { input: "3\nX\nY\nZ", expectedOutput: "X\nY\nZ", isHidden: true, points: 10 },
        { input: "1\nSingle", expectedOutput: "Single", isHidden: true, points: 10 },
        { input: "4\nFirst\nSecond\nThird\nFourth", expectedOutput: "First\nSecond\nThird\nFourth", isHidden: true, points: 10 },
        { input: "2\nAlpha\nBeta", expectedOutput: "Alpha\nBeta", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Find maximum element in array. Read n, then n integers. Print the maximum element.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int max = Integer.MIN_VALUE; for (int i = 0; i < n; i++) { int num = sc.nextInt(); if (num > max) max = num; } System.out.println(max); } }",
      examples: [
        { input: "5\n3\n7\n2\n9\n5", output: "9" },
        { input: "3\n10\n5\n15", output: "15" }
      ],
      testCases: [
        { input: "5\n3\n7\n2\n9\n5", expectedOutput: "9", isHidden: false, points: 10 },
        { input: "3\n10\n5\n15", expectedOutput: "15", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n100\n200\n150\n175", expectedOutput: "200", isHidden: true, points: 10 },
        { input: "2\n50\n50", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "6\n1\n2\n3\n4\n5\n6", expectedOutput: "6", isHidden: true, points: 10 },
        { input: "3\n0\n0\n1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "5\n10\n20\n30\n40\n50", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "4\n7\n7\n7\n7", expectedOutput: "7", isHidden: true, points: 10 },
        { input: "2\n99\n100", expectedOutput: "100", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Reverse an array. Read n, then n integers. Print the array in reverse order separated by spaces.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] arr = new int[n]; for (int i = 0; i < n; i++) { arr[i] = sc.nextInt(); } for (int i = n - 1; i >= 0; i--) { System.out.print(arr[i]); if (i > 0) System.out.print(\" \"); } } }",
      examples: [
        { input: "5\n1\n2\n3\n4\n5", output: "5 4 3 2 1" },
        { input: "3\n10\n20\n30", output: "30 20 10" }
      ],
      testCases: [
        { input: "5\n1\n2\n3\n4\n5", expectedOutput: "5 4 3 2 1", isHidden: false, points: 10 },
        { input: "3\n10\n20\n30", expectedOutput: "30 20 10", isHidden: false, points: 10 },
        { input: "1\n42", expectedOutput: "42", isHidden: true, points: 10 },
        { input: "4\n5\n10\n15\n20", expectedOutput: "20 15 10 5", isHidden: true, points: 10 },
        { input: "2\n100\n200", expectedOutput: "200 100", isHidden: true, points: 10 },
        { input: "6\n1\n3\n5\n7\n9\n11", expectedOutput: "11 9 7 5 3 1", isHidden: true, points: 10 },
        { input: "3\n0\n0\n0", expectedOutput: "0 0 0", isHidden: true, points: 10 },
        { input: "5\n2\n4\n6\n8\n10", expectedOutput: "10 8 6 4 2", isHidden: true, points: 10 },
        { input: "4\n7\n14\n21\n28", expectedOutput: "28 21 14 7", isHidden: true, points: 10 },
        { input: "2\n50\n75", expectedOutput: "75 50", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 37: Week 1 Practice Challenge
function generateDay37Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Calculate factorial using recursion. Read n and print n! (factorial of n).",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.println(factorial(n)); } static long factorial(int n) { if (n == 0 || n == 1) return 1; return n * factorial(n - 1); } }",
      examples: [
        { input: "5", output: "120" },
        { input: "3", output: "6" }
      ],
      testCases: [
        { input: "5", expectedOutput: "120", isHidden: false, points: 10 },
        { input: "3", expectedOutput: "6", isHidden: false, points: 10 },
        { input: "0", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "24", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "720", isHidden: true, points: 10 },
        { input: "7", expectedOutput: "5040", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "40320", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "3628800", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a string is palindrome. Read a string and print 'Palindrome' if it reads same forwards and backwards, else 'Not Palindrome'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String str = sc.next(); String rev = new StringBuilder(str).reverse().toString(); if (str.equals(rev)) { System.out.println(\"Palindrome\"); } else { System.out.println(\"Not Palindrome\"); } } }",
      examples: [
        { input: "madam", output: "Palindrome" },
        { input: "hello", output: "Not Palindrome" }
      ],
      testCases: [
        { input: "madam", expectedOutput: "Palindrome", isHidden: false, points: 10 },
        { input: "hello", expectedOutput: "Not Palindrome", isHidden: false, points: 10 },
        { input: "racecar", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "level", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "world", expectedOutput: "Not Palindrome", isHidden: true, points: 10 },
        { input: "noon", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "java", expectedOutput: "Not Palindrome", isHidden: true, points: 10 },
        { input: "a", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "aba", expectedOutput: "Palindrome", isHidden: true, points: 10 },
        { input: "test", expectedOutput: "Not Palindrome", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Find GCD (Greatest Common Divisor) of two numbers. Read two integers and print their GCD.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(gcd(a, b)); } static int gcd(int a, int b) { if (b == 0) return a; return gcd(b, a % b); } }",
      examples: [
        { input: "12\n8", output: "4" },
        { input: "15\n25", output: "5" }
      ],
      testCases: [
        { input: "12\n8", expectedOutput: "4", isHidden: false, points: 10 },
        { input: "15\n25", expectedOutput: "5", isHidden: false, points: 10 },
        { input: "10\n5", expectedOutput: "5", isHidden: true, points: 10 },
        { input: "21\n14", expectedOutput: "7", isHidden: true, points: 10 },
        { input: "100\n50", expectedOutput: "50", isHidden: true, points: 10 },
        { input: "7\n13", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "18\n24", expectedOutput: "6", isHidden: true, points: 10 },
        { input: "36\n48", expectedOutput: "12", isHidden: true, points: 10 },
        { input: "9\n27", expectedOutput: "9", isHidden: true, points: 10 },
        { input: "56\n42", expectedOutput: "14", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Check if a number is Armstrong number. Read n and print 'Armstrong' if sum of cubes of digits equals n, else 'Not Armstrong'.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int sum = 0, temp = n; while (temp > 0) { int digit = temp % 10; sum += digit * digit * digit; temp /= 10; } if (sum == n) { System.out.println(\"Armstrong\"); } else { System.out.println(\"Not Armstrong\"); } } }",
      examples: [
        { input: "153", output: "Armstrong" },
        { input: "123", output: "Not Armstrong" }
      ],
      testCases: [
        { input: "153", expectedOutput: "Armstrong", isHidden: false, points: 10 },
        { input: "123", expectedOutput: "Not Armstrong", isHidden: false, points: 10 },
        { input: "370", expectedOutput: "Armstrong", isHidden: true, points: 10 },
        { input: "371", expectedOutput: "Armstrong", isHidden: true, points: 10 },
        { input: "407", expectedOutput: "Armstrong", isHidden: true, points: 10 },
        { input: "100", expectedOutput: "Not Armstrong", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "Armstrong", isHidden: true, points: 10 },
        { input: "1", expectedOutput: "Armstrong", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "Armstrong", isHidden: true, points: 10 },
        { input: "200", expectedOutput: "Not Armstrong", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Print Fibonacci series up to n terms. Read n and print first n Fibonacci numbers separated by spaces.",
      solution: "import java.util.*; public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int a = 0, b = 1; for (int i = 0; i < n; i++) { System.out.print(a); if (i < n - 1) System.out.print(\" \"); int next = a + b; a = b; b = next; } } }",
      examples: [
        { input: "5", output: "0 1 1 2 3" },
        { input: "7", output: "0 1 1 2 3 5 8" }
      ],
      testCases: [
        { input: "5", expectedOutput: "0 1 1 2 3", isHidden: false, points: 10 },
        { input: "7", expectedOutput: "0 1 1 2 3 5 8", isHidden: false, points: 10 },
        { input: "1", expectedOutput: "0", isHidden: true, points: 10 },
        { input: "2", expectedOutput: "0 1", isHidden: true, points: 10 },
        { input: "3", expectedOutput: "0 1 1", isHidden: true, points: 10 },
        { input: "10", expectedOutput: "0 1 1 2 3 5 8 13 21 34", isHidden: true, points: 10 },
        { input: "4", expectedOutput: "0 1 1 2", isHidden: true, points: 10 },
        { input: "6", expectedOutput: "0 1 1 2 3 5", isHidden: true, points: 10 },
        { input: "8", expectedOutput: "0 1 1 2 3 5 8 13", isHidden: true, points: 10 },
        { input: "9", expectedOutput: "0 1 1 2 3 5 8 13 21", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 38: Classes and Objects
function generateDay38Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Create a Student class with name and age. Read name and age, create object, print 'Student: [name], Age: [age]'.",
      solution: "import java.util.*; class Student { String name; int age; Student(String name, int age) { this.name = name; this.age = age; } void display() { System.out.println(\"Student: \" + name + \", Age: \" + age); } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.next(); int age = sc.nextInt(); Student s = new Student(name, age); s.display(); } }",
      examples: [
        { input: "Alice\n20", output: "Student: Alice, Age: 20" },
        { input: "Bob\n22", output: "Student: Bob, Age: 22" }
      ],
      testCases: [
        { input: "Alice\n20", expectedOutput: "Student: Alice, Age: 20", isHidden: false, points: 10 },
        { input: "Bob\n22", expectedOutput: "Student: Bob, Age: 22", isHidden: false, points: 10 },
        { input: "Charlie\n19", expectedOutput: "Student: Charlie, Age: 19", isHidden: true, points: 10 },
        { input: "Diana\n21", expectedOutput: "Student: Diana, Age: 21", isHidden: true, points: 10 },
        { input: "Eve\n23", expectedOutput: "Student: Eve, Age: 23", isHidden: true, points: 10 },
        { input: "Frank\n18", expectedOutput: "Student: Frank, Age: 18", isHidden: true, points: 10 },
        { input: "Grace\n25", expectedOutput: "Student: Grace, Age: 25", isHidden: true, points: 10 },
        { input: "Henry\n24", expectedOutput: "Student: Henry, Age: 24", isHidden: true, points: 10 },
        { input: "Ivy\n20", expectedOutput: "Student: Ivy, Age: 20", isHidden: true, points: 10 },
        { input: "Jack\n22", expectedOutput: "Student: Jack, Age: 22", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a Rectangle class with width and height. Read width and height, print area (width * height).",
      solution: "import java.util.*; class Rectangle { int width; int height; Rectangle(int width, int height) { this.width = width; this.height = height; } int area() { return width * height; } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int width = sc.nextInt(); int height = sc.nextInt(); Rectangle r = new Rectangle(width, height); System.out.println(r.area()); } }",
      examples: [
        { input: "5\n10", output: "50" },
        { input: "7\n3", output: "21" }
      ],
      testCases: [
        { input: "5\n10", expectedOutput: "50", isHidden: false, points: 10 },
        { input: "7\n3", expectedOutput: "21", isHidden: false, points: 10 },
        { input: "4\n8", expectedOutput: "32", isHidden: true, points: 10 },
        { input: "10\n10", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "6\n9", expectedOutput: "54", isHidden: true, points: 10 },
        { input: "15\n2", expectedOutput: "30", isHidden: true, points: 10 },
        { input: "12\n5", expectedOutput: "60", isHidden: true, points: 10 },
        { input: "8\n7", expectedOutput: "56", isHidden: true, points: 10 },
        { input: "3\n3", expectedOutput: "9", isHidden: true, points: 10 },
        { input: "20\n4", expectedOutput: "80", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a BankAccount class with balance. Read initial balance and amount, add amount to balance, print new balance.",
      solution: "import java.util.*; class BankAccount { double balance; BankAccount(double balance) { this.balance = balance; } void deposit(double amount) { balance += amount; } void display() { System.out.println((int)balance); } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); double balance = sc.nextDouble(); double amount = sc.nextDouble(); BankAccount acc = new BankAccount(balance); acc.deposit(amount); acc.display(); } }",
      examples: [
        { input: "1000\n500", output: "1500" },
        { input: "2000\n300", output: "2300" }
      ],
      testCases: [
        { input: "1000\n500", expectedOutput: "1500", isHidden: false, points: 10 },
        { input: "2000\n300", expectedOutput: "2300", isHidden: false, points: 10 },
        { input: "5000\n1000", expectedOutput: "6000", isHidden: true, points: 10 },
        { input: "100\n50", expectedOutput: "150", isHidden: true, points: 10 },
        { input: "7500\n2500", expectedOutput: "10000", isHidden: true, points: 10 },
        { input: "3000\n700", expectedOutput: "3700", isHidden: true, points: 10 },
        { input: "0\n1000", expectedOutput: "1000", isHidden: true, points: 10 },
        { input: "10000\n5000", expectedOutput: "15000", isHidden: true, points: 10 },
        { input: "250\n150", expectedOutput: "400", isHidden: true, points: 10 },
        { input: "8000\n2000", expectedOutput: "10000", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a Car class with brand and speed. Read brand and speed, print 'Car: [brand], Speed: [speed] km/h'.",
      solution: "import java.util.*; class Car { String brand; int speed; Car(String brand, int speed) { this.brand = brand; this.speed = speed; } void display() { System.out.println(\"Car: \" + brand + \", Speed: \" + speed + \" km/h\"); } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String brand = sc.next(); int speed = sc.nextInt(); Car c = new Car(brand, speed); c.display(); } }",
      examples: [
        { input: "Toyota\n120", output: "Car: Toyota, Speed: 120 km/h" },
        { input: "BMW\n180", output: "Car: BMW, Speed: 180 km/h" }
      ],
      testCases: [
        { input: "Toyota\n120", expectedOutput: "Car: Toyota, Speed: 120 km/h", isHidden: false, points: 10 },
        { input: "BMW\n180", expectedOutput: "Car: BMW, Speed: 180 km/h", isHidden: false, points: 10 },
        { input: "Honda\n100", expectedOutput: "Car: Honda, Speed: 100 km/h", isHidden: true, points: 10 },
        { input: "Audi\n200", expectedOutput: "Car: Audi, Speed: 200 km/h", isHidden: true, points: 10 },
        { input: "Tesla\n250", expectedOutput: "Car: Tesla, Speed: 250 km/h", isHidden: true, points: 10 },
        { input: "Ford\n150", expectedOutput: "Car: Ford, Speed: 150 km/h", isHidden: true, points: 10 },
        { input: "Mercedes\n220", expectedOutput: "Car: Mercedes, Speed: 220 km/h", isHidden: true, points: 10 },
        { input: "Nissan\n110", expectedOutput: "Car: Nissan, Speed: 110 km/h", isHidden: true, points: 10 },
        { input: "Mazda\n130", expectedOutput: "Car: Mazda, Speed: 130 km/h", isHidden: true, points: 10 },
        { input: "Lexus\n190", expectedOutput: "Car: Lexus, Speed: 190 km/h", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a Book class with title and pages. Read title and pages, print 'Book: [title], Pages: [pages]'.",
      solution: "import java.util.*; class Book { String title; int pages; Book(String title, int pages) { this.title = title; this.pages = pages; } void display() { System.out.println(\"Book: \" + title + \", Pages: \" + pages); } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String title = sc.next(); int pages = sc.nextInt(); Book b = new Book(title, pages); b.display(); } }",
      examples: [
        { input: "Java\n500", output: "Book: Java, Pages: 500" },
        { input: "Python\n400", output: "Book: Python, Pages: 400" }
      ],
      testCases: [
        { input: "Java\n500", expectedOutput: "Book: Java, Pages: 500", isHidden: false, points: 10 },
        { input: "Python\n400", expectedOutput: "Book: Python, Pages: 400", isHidden: false, points: 10 },
        { input: "C++\n350", expectedOutput: "Book: C++, Pages: 350", isHidden: true, points: 10 },
        { input: "JavaScript\n300", expectedOutput: "Book: JavaScript, Pages: 300", isHidden: true, points: 10 },
        { input: "Ruby\n250", expectedOutput: "Book: Ruby, Pages: 250", isHidden: true, points: 10 },
        { input: "Go\n200", expectedOutput: "Book: Go, Pages: 200", isHidden: true, points: 10 },
        { input: "Rust\n450", expectedOutput: "Book: Rust, Pages: 450", isHidden: true, points: 10 },
        { input: "Swift\n380", expectedOutput: "Book: Swift, Pages: 380", isHidden: true, points: 10 },
        { input: "Kotlin\n420", expectedOutput: "Book: Kotlin, Pages: 420", isHidden: true, points: 10 },
        { input: "TypeScript\n320", expectedOutput: "Book: TypeScript, Pages: 320", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Generate content for Day 39: Constructors and Methods
function generateDay39Content(questionIndex: number): QuestionContent {
  const contents: QuestionContent[] = [
    {
      description: "Create a Calculator class with default constructor. Read two integers and print their sum.",
      solution: "import java.util.*; class Calculator { Calculator() { } int add(int a, int b) { return a + b; } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); Calculator calc = new Calculator(); System.out.println(calc.add(a, b)); } }",
      examples: [
        { input: "10\n20", output: "30" },
        { input: "5\n15", output: "20" }
      ],
      testCases: [
        { input: "10\n20", expectedOutput: "30", isHidden: false, points: 10 },
        { input: "5\n15", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "100\n200", expectedOutput: "300", isHidden: true, points: 10 },
        { input: "7\n8", expectedOutput: "15", isHidden: true, points: 10 },
        { input: "50\n50", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "1\n1", expectedOutput: "2", isHidden: true, points: 10 },
        { input: "25\n75", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "42\n58", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "0\n100", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "33\n67", expectedOutput: "100", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a Person class with parameterized constructor. Read name and age, create object, print 'Name: [name], Age: [age]'.",
      solution: "import java.util.*; class Person { String name; int age; Person(String name, int age) { this.name = name; this.age = age; } void display() { System.out.println(\"Name: \" + name + \", Age: \" + age); } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.next(); int age = sc.nextInt(); Person p = new Person(name, age); p.display(); } }",
      examples: [
        { input: "John\n30", output: "Name: John, Age: 30" },
        { input: "Jane\n25", output: "Name: Jane, Age: 25" }
      ],
      testCases: [
        { input: "John\n30", expectedOutput: "Name: John, Age: 30", isHidden: false, points: 10 },
        { input: "Jane\n25", expectedOutput: "Name: Jane, Age: 25", isHidden: false, points: 10 },
        { input: "Alice\n28", expectedOutput: "Name: Alice, Age: 28", isHidden: true, points: 10 },
        { input: "Bob\n35", expectedOutput: "Name: Bob, Age: 35", isHidden: true, points: 10 },
        { input: "Charlie\n22", expectedOutput: "Name: Charlie, Age: 22", isHidden: true, points: 10 },
        { input: "Diana\n27", expectedOutput: "Name: Diana, Age: 27", isHidden: true, points: 10 },
        { input: "Eve\n32", expectedOutput: "Name: Eve, Age: 32", isHidden: true, points: 10 },
        { input: "Frank\n40", expectedOutput: "Name: Frank, Age: 40", isHidden: true, points: 10 },
        { input: "Grace\n29", expectedOutput: "Name: Grace, Age: 29", isHidden: true, points: 10 },
        { input: "Henry\n33", expectedOutput: "Name: Henry, Age: 33", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Create a Box class with constructor and volume method. Read length, width, height. Print volume (length * width * height).",
      solution: "import java.util.*; class Box { int length, width, height; Box(int length, int width, int height) { this.length = length; this.width = width; this.height = height; } int volume() { return length * width * height; } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int l = sc.nextInt(); int w = sc.nextInt(); int h = sc.nextInt(); Box b = new Box(l, w, h); System.out.println(b.volume()); } }",
      examples: [
        { input: "2\n3\n4", output: "24" },
        { input: "5\n5\n5", output: "125" }
      ],
      testCases: [
        { input: "2\n3\n4", expectedOutput: "24", isHidden: false, points: 10 },
        { input: "5\n5\n5", expectedOutput: "125", isHidden: false, points: 10 },
        { input: "1\n1\n1", expectedOutput: "1", isHidden: true, points: 10 },
        { input: "10\n10\n10", expectedOutput: "1000", isHidden: true, points: 10 },
        { input: "3\n4\n5", expectedOutput: "60", isHidden: true, points: 10 },
        { input: "7\n8\n9", expectedOutput: "504", isHidden: true, points: 10 },
        { input: "6\n6\n6", expectedOutput: "216", isHidden: true, points: 10 },
        { input: "4\n5\n6", expectedOutput: "120", isHidden: true, points: 10 },
        { input: "2\n2\n2", expectedOutput: "8", isHidden: true, points: 10 },
        { input: "8\n9\n10", expectedOutput: "720", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Method overloading: Create MathOps class with multiply methods. Read two integers, print their product.",
      solution: "import java.util.*; class MathOps { int multiply(int a, int b) { return a * b; } double multiply(double a, double b) { return a * b; } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); MathOps ops = new MathOps(); System.out.println(ops.multiply(a, b)); } }",
      examples: [
        { input: "5\n4", output: "20" },
        { input: "7\n3", output: "21" }
      ],
      testCases: [
        { input: "5\n4", expectedOutput: "20", isHidden: false, points: 10 },
        { input: "7\n3", expectedOutput: "21", isHidden: false, points: 10 },
        { input: "10\n10", expectedOutput: "100", isHidden: true, points: 10 },
        { input: "6\n8", expectedOutput: "48", isHidden: true, points: 10 },
        { input: "9\n9", expectedOutput: "81", isHidden: true, points: 10 },
        { input: "12\n5", expectedOutput: "60", isHidden: true, points: 10 },
        { input: "15\n4", expectedOutput: "60", isHidden: true, points: 10 },
        { input: "8\n7", expectedOutput: "56", isHidden: true, points: 10 },
        { input: "3\n3", expectedOutput: "9", isHidden: true, points: 10 },
        { input: "11\n11", expectedOutput: "121", isHidden: true, points: 10 }
      ]
    },
    {
      description: "Use 'this' keyword in constructor. Create Employee class with id and name. Read id and name, print 'ID: [id], Name: [name]'.",
      solution: "import java.util.*; class Employee { int id; String name; Employee(int id, String name) { this.id = id; this.name = name; } void display() { System.out.println(\"ID: \" + this.id + \", Name: \" + this.name); } } public class Solution { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int id = sc.nextInt(); String name = sc.next(); Employee e = new Employee(id, name); e.display(); } }",
      examples: [
        { input: "101\nAlice", output: "ID: 101, Name: Alice" },
        { input: "202\nBob", output: "ID: 202, Name: Bob" }
      ],
      testCases: [
        { input: "101\nAlice", expectedOutput: "ID: 101, Name: Alice", isHidden: false, points: 10 },
        { input: "202\nBob", expectedOutput: "ID: 202, Name: Bob", isHidden: false, points: 10 },
        { input: "303\nCharlie", expectedOutput: "ID: 303, Name: Charlie", isHidden: true, points: 10 },
        { input: "404\nDiana", expectedOutput: "ID: 404, Name: Diana", isHidden: true, points: 10 },
        { input: "505\nEve", expectedOutput: "ID: 505, Name: Eve", isHidden: true, points: 10 },
        { input: "606\nFrank", expectedOutput: "ID: 606, Name: Frank", isHidden: true, points: 10 },
        { input: "707\nGrace", expectedOutput: "ID: 707, Name: Grace", isHidden: true, points: 10 },
        { input: "808\nHenry", expectedOutput: "ID: 808, Name: Henry", isHidden: true, points: 10 },
        { input: "909\nIvy", expectedOutput: "ID: 909, Name: Ivy", isHidden: true, points: 10 },
        { input: "1010\nJack", expectedOutput: "ID: 1010, Name: Jack", isHidden: true, points: 10 }
      ]
    }
  ];
  return contents[questionIndex] || contents[0];
}

// Main function to process all questions
async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const topics = await Topic.find().sort({ id: 1 });
    let totalUpdated = 0;

    for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
      const topic = topics[topicIndex];
      const questions = await Question.find({ topicId: topic.id }).sort({ title: 1 });
      
      console.log(`📚 Day ${topicIndex + 1}: ${topic.title} (${questions.length} questions)`);

      for (let qIndex = 0; qIndex < questions.length; qIndex++) {
        const question = questions[qIndex];
        let content: QuestionContent;

        // Generate content based on day number
        switch (topicIndex + 1) {
          case 1:
            content = generateDay1Content(qIndex);
            break;
          case 2:
            content = generateDay2Content(qIndex);
            break;
          case 3:
            content = generateDay3Content(qIndex);
            break;
          case 4:
            content = generateDay4Content(qIndex);
            break;
          case 5:
            content = generateDay5Content(qIndex);
            break;
          case 6:
            content = generateDay6Content(qIndex);
            break;
          case 7:
            content = generateDay7Content(qIndex);
            break;
          case 8:
            content = generateDay8Content(qIndex);
            break;
          case 9:
            content = generateDay9Content(qIndex);
            break;
          case 10:
            content = generateDay10Content(qIndex);
            break;
          case 11:
            content = generateDay11Content(qIndex);
            break;
          case 12:
            content = generateDay12Content(qIndex);
            break;
          case 13:
            content = generateDay13Content(qIndex);
            break;
          case 14:
            content = generateDay14Content(qIndex);
            break;
          case 15:
            content = generateDay15Content(qIndex);
            break;
          case 16:
            content = generateDay16Content(qIndex);
            break;
          case 17:
            content = generateDay17Content(qIndex);
            break;
          case 18:
            content = generateDay18Content(qIndex);
            break;
          case 19:
            content = generateDay19Content(qIndex);
            break;
          case 20:
            content = generateDay20Content(qIndex);
            break;
          case 21:
            content = generateDay21Content(qIndex);
            break;
          case 22:
            content = generateDay22Content(qIndex);
            break;
          case 23:
            content = generateDay23Content(qIndex);
            break;
          case 24:
            content = generateDay24Content(qIndex);
            break;
          case 25:
            content = generateDay25Content(qIndex);
            break;
          case 26:
            content = generateDay26Content(qIndex);
            break;
          case 27:
            content = generateDay27Content(qIndex);
            break;
          case 28:
            content = generateDay28Content(qIndex);
            break;
          case 29:
            content = generateDay29Content(qIndex);
            break;
          case 30:
            content = generateDay30Content(qIndex);
            break;
          case 31:
            content = generateDay31Content(qIndex);
            break;
          case 32:
            content = generateDay32Content(qIndex);
            break;
          case 33:
            content = generateDay33Content(qIndex);
            break;
          case 34:
            content = generateDay34Content(qIndex);
            break;
          case 35:
            content = generateDay35Content(qIndex);
            break;
          case 36:
            content = generateDay36Content(qIndex);
            break;
          case 37:
            content = generateDay37Content(qIndex);
            break;
          case 38:
            content = generateDay38Content(qIndex);
            break;
          case 39:
            content = generateDay39Content(qIndex);
            break;
          default:
            // For days not yet implemented, use placeholder
            content = {
              description: `Solve the problem for ${question.title}`,
              solution: "public class Solution { public static void main(String[] args) { /* Your code here */ } }",
              examples: [
                { input: "5", output: "5" },
                { input: "10", output: "10" }
              ],
              testCases: Array(10).fill(0).map((_, i) => ({
                input: `${i + 1}`,
                expectedOutput: `${i + 1}`,
                isHidden: i >= 2,
                points: 10
              }))
            };
        }

        await Question.updateOne(
          { _id: question._id },
          {
            $set: {
              description: content.description,
              solution: content.solution,
              examples: content.examples,
              testCases: content.testCases
            }
          }
        );

        totalUpdated++;
        console.log(`   ✓ ${question.title}`);
      }
      console.log('');
    }

    console.log(`\n✅ Successfully updated ${totalUpdated} questions across ${topics.length} days!`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

run();
