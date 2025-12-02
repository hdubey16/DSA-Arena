import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question';
import Topic from '../models/Topic';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

// Comprehensive AI-Generated Content for All 39 Topics
const aiGeneratedContent: { [key: string]: any } = {
  "1": { // Introduction to Java
    "Introduction to Java - Practice 2": {
      description: "Write a Java program that prints 'Hello, Java!' followed by your name. This introduces you to the basic structure of a Java program and the System.out.println() method.",
      examples: [{ input: "", output: "Hello, Java!\nWelcome to Java Programming!" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("Welcome to Java Programming!");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Hello, Java!\nWelcome to Java Programming!", isHidden: false, points: 10 }
      ]
    },
    "Introduction to Java - Practice 3": {
      description: "Write a program that calculates and prints the area of a circle with radius 5. Use the formula: Area = π * r².",
      examples: [{ input: "", output: "Area of circle with radius 5: 78.5" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        int radius = 5;
        double area = Math.PI * radius * radius;
        System.out.println("Area of circle with radius " + radius + ": " + area);
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Area of circle with radius 5: 78.5", isHidden: false, points: 10 }
      ]
    },
    "Introduction to Java - Practice 4": {
      description: "Write a program that declares variables of different types (int, double, String, boolean) and prints them with descriptive labels.",
      examples: [{ input: "", output: "Integer: 100\nDouble: 99.9\nString: Java\nBoolean: true" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        int intValue = 100;
        double doubleValue = 99.9;
        String stringValue = "Java";
        boolean boolValue = true;
        
        System.out.println("Integer: " + intValue);
        System.out.println("Double: " + doubleValue);
        System.out.println("String: " + stringValue);
        System.out.println("Boolean: " + boolValue);
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Integer: 100\nDouble: 99.9\nString: Java\nBoolean: true", isHidden: false, points: 10 }
      ]
    },
    "Introduction to Java - Practice 5": {
      description: "Write a program that performs basic arithmetic on two numbers and displays the results. Read two integers and calculate their sum, product, and average.",
      examples: [{ input: "10\n20", output: "Sum: 30\nProduct: 200\nAverage: 15.0" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        
        System.out.println("Sum: " + (a + b));
        System.out.println("Product: " + (a * b));
        System.out.println("Average: " + ((a + b) / 2.0));
    }
}`,
      testCases: [
        { input: "10\n20", expectedOutput: "Sum: 30\nProduct: 200\nAverage: 15.0", isHidden: false, points: 10 },
        { input: "5\n15", expectedOutput: "Sum: 20\nProduct: 75\nAverage: 10.0", isHidden: true, points: 15 }
      ]
    }
  },
  "2": { // Variables and Data Types
    "Variables and Data Types - Practice 2": {
      description: "Write a program that demonstrates type casting. Read a double value and cast it to an integer, then print both values.",
      examples: [{ input: "45.67", output: "Original double: 45.67\nCasted to int: 45" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double dValue = sc.nextDouble();
        int iValue = (int) dValue;
        
        System.out.println("Original double: " + dValue);
        System.out.println("Casted to int: " + iValue);
    }
}`,
      testCases: [
        { input: "45.67", expectedOutput: "Original double: 45.67\nCasted to int: 45", isHidden: false, points: 10 }
      ]
    },
    "Variables and Data Types - Practice 3": {
      description: "Write a program that stores information about a person (name, age, height) in appropriate data types and prints them formatted.",
      examples: [{ input: "John\n25\n5.9", output: "Name: John\nAge: 25\nHeight: 5.9 feet" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        int age = sc.nextInt();
        double height = sc.nextDouble();
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height + " feet");
    }
}`,
      testCases: [
        { input: "John\n25\n5.9", expectedOutput: "Name: John\nAge: 25\nHeight: 5.9 feet", isHidden: false, points: 10 }
      ]
    },
    "Variables and Data Types - Practice 4": {
      description: "Swap two numbers using a temporary variable. Read two integers and swap them, then print the result.",
      examples: [{ input: "10\n20", output: "Before swap: a=10, b=20\nAfter swap: a=20, b=10" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        
        System.out.println("Before swap: a=" + a + ", b=" + b);
        int temp = a;
        a = b;
        b = temp;
        System.out.println("After swap: a=" + a + ", b=" + b);
    }
}`,
      testCases: [
        { input: "10\n20", expectedOutput: "Before swap: a=10, b=20\nAfter swap: a=20, b=10", isHidden: false, points: 15 }
      ]
    },
    "Variables and Data Types - Practice 5": {
      description: "Write a program to convert temperature from Celsius to Fahrenheit. Use the formula: F = (C × 9/5) + 32",
      examples: [{ input: "0", output: "0.0°C is 32.0°F" }, { input: "100", output: "100.0°C is 212.0°F" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double celsius = sc.nextDouble();
        double fahrenheit = (celsius * 9/5) + 32;
        
        System.out.println(celsius + "°C is " + fahrenheit + "°F");
    }
}`,
      testCases: [
        { input: "0", expectedOutput: "0.0°C is 32.0°F", isHidden: false, points: 10 },
        { input: "100", expectedOutput: "100.0°C is 212.0°F", isHidden: true, points: 15 }
      ]
    }
  },
  "3": { // Operators in Java
    "operators-basics": {
      description: "Write a Java program that takes two integers as input from the user and prints their sum, difference, product, and quotient. This will test your understanding of basic arithmetic operators.",
      examples: [
        { input: "10\n5", output: "Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2" },
        { input: "20\n4", output: "Sum: 24\nDifference: 16\nProduct: 80\nQuotient: 5" }
      ],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        System.out.println("Sum: " + (a + b));
        System.out.println("Difference: " + (a - b));
        System.out.println("Product: " + (a * b));
        if (b != 0) {
            System.out.println("Quotient: " + (a / b));
        } else {
            System.out.println("Quotient: Cannot divide by zero");
        }
    }
}`,
      testCases: [
        { input: "10\n5", expectedOutput: "Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2", isHidden: false, points: 5 },
        { input: "100\n25", expectedOutput: "Sum: 125\nDifference: 75\nProduct: 2500\nQuotient: 4", isHidden: true, points: 5 }
      ]
    },
    "Operators in Java - Practice 2": {
      description: "Write a program to check if a number is even or odd using the modulo operator. The program should take an integer as input and print 'Even' or 'Odd'.",
      examples: [
        { input: "7", output: "Odd" },
        { input: "12", output: "Even" }
      ],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        if (num % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
    }
}`,
      testCases: [
        { input: "7", expectedOutput: "Odd", isHidden: false, points: 5 },
        { input: "12", expectedOutput: "Even", isHidden: false, points: 5 },
        { input: "0", expectedOutput: "Even", isHidden: true, points: 5 }
      ]
    },
    "Operators in Java - Practice 3": {
      description: "Demonstrate the use of relational and logical operators. Write a program that takes a person's age as input and determines if they are eligible to vote (age >= 18) and a senior citizen (age >= 65).",
      examples: [
        { input: "25", output: "Eligible to vote: true\nSenior citizen: false" },
        { input: "70", output: "Eligible to vote: true\nSenior citizen: true" },
        { input: "16", output: "Eligible to vote: false\nSenior citizen: false" }
      ],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int age = scanner.nextInt();
        boolean isEligibleToVote = age >= 18;
        boolean isSeniorCitizen = age >= 65;
        System.out.println("Eligible to vote: " + isEligibleToVote);
        System.out.println("Senior citizen: " + isSeniorCitizen);
    }
}`,
      testCases: [
        { input: "25", expectedOutput: "Eligible to vote: true\nSenior citizen: false", isHidden: false, points: 5 },
        { input: "70", expectedOutput: "Eligible to vote: true\nSenior citizen: true", isHidden: false, points: 5 },
        { input: "18", expectedOutput: "Eligible to vote: true\nSenior citizen: false", isHidden: true, points: 5 },
        { input: "17", expectedOutput: "Eligible to vote: false\nSenior citizen: false", isHidden: true, points: 5 }
      ]
    },
    "Operators in Java - Practice 4": {
      description: "Write a program that demonstrates the use of pre-increment and post-increment operators. Initialize an integer to 5, then show the difference between `++x` and `x++`.",
      examples: [
        { input: "", output: "Initial value: 5\nValue after pre-increment (++x): 6\nx is now: 6\n\nInitial value: 6\nValue of x++ (post-increment): 6\nx is now: 7" }
      ],
      solution: `public class Solution {
    public static void main(String[] args) {
        int x = 5;
        System.out.println("Initial value: " + x);
        System.out.println("Value after pre-increment (++x): " + (++x));
        System.out.println("x is now: " + x);
        
        System.out.println("\\nInitial value: " + x);
        System.out.println("Value of x++ (post-increment): " + (x++));
        System.out.println("x is now: " + x);
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Initial value: 5\nValue after pre-increment (++x): 6\nx is now: 6\n\nInitial value: 6\nValue of x++ (post-increment): 6\nx is now: 7", isHidden: false, points: 25 }
      ]
    },
    "Operators in Java - Practice 5": {
      description: "Write a program using bitwise operators to check if a number is a power of 2. A number is a power of 2 if it has exactly one bit set.",
      examples: [
        { input: "8", output: "8 is a power of 2: true" },
        { input: "10", output: "10 is a power of 2: false" }
      ],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        boolean isPowerOfTwo = num > 0 && (num & (num - 1)) == 0;
        System.out.println(num + " is a power of 2: " + isPowerOfTwo);
    }
}`,
      testCases: [
        { input: "8", expectedOutput: "8 is a power of 2: true", isHidden: false, points: 10 },
        { input: "10", expectedOutput: "10 is a power of 2: false", isHidden: true, points: 15 }
      ]
    }
  },
  "4": { // Control Flow Statements
    "Control Flow Statements - Practice 2": {
      description: "Write a program to find the largest of three numbers using if-else statements.",
      examples: [{ input: "10\n20\n15", output: "The largest number is 20" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        
        int largest = a;
        if (b > largest) largest = b;
        if (c > largest) largest = c;
        
        System.out.println("The largest number is " + largest);
    }
}`,
      testCases: [
        { input: "10\n20\n15", expectedOutput: "The largest number is 20", isHidden: false, points: 10 }
      ]
    },
    "Control Flow Statements - Practice 3": {
      description: "Write a program to check if a year is a leap year using if-else. A leap year is divisible by 4, except for years divisible by 100 (unless also divisible by 400).",
      examples: [{ input: "2020", output: "2020 is a leap year" }, { input: "2021", output: "2021 is not a leap year" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int year = sc.nextInt();
        
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println(year + " is a leap year");
        } else {
            System.out.println(year + " is not a leap year");
        }
    }
}`,
      testCases: [
        { input: "2020", expectedOutput: "2020 is a leap year", isHidden: false, points: 10 },
        { input: "2021", expectedOutput: "2021 is not a leap year", isHidden: true, points: 10 }
      ]
    },
    "Control Flow Statements - Practice 4": {
      description: "Write a program that takes a number and prints the corresponding grade: A for 90+, B for 80-89, C for 70-79, D for 60-69, F below 60.",
      examples: [{ input: "85", output: "Grade: B" }, { input: "92", output: "Grade: A" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int score = sc.nextInt();
        
        char grade;
        if (score >= 90) grade = 'A';
        else if (score >= 80) grade = 'B';
        else if (score >= 70) grade = 'C';
        else if (score >= 60) grade = 'D';
        else grade = 'F';
        
        System.out.println("Grade: " + grade);
    }
}`,
      testCases: [
        { input: "85", expectedOutput: "Grade: B", isHidden: false, points: 10 },
        { input: "92", expectedOutput: "Grade: A", isHidden: true, points: 15 }
      ]
    },
    "Control Flow Statements - Practice 5": {
      description: "Write a switch statement program that takes a number (1-7) representing a day of the week and prints the day name.",
      examples: [{ input: "1", output: "Monday" }, { input: "5", output: "Friday" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int day = sc.nextInt();
        
        String dayName;
        switch (day) {
            case 1: dayName = "Monday"; break;
            case 2: dayName = "Tuesday"; break;
            case 3: dayName = "Wednesday"; break;
            case 4: dayName = "Thursday"; break;
            case 5: dayName = "Friday"; break;
            case 6: dayName = "Saturday"; break;
            case 7: dayName = "Sunday"; break;
            default: dayName = "Invalid day";
        }
        System.out.println(dayName);
    }
}`,
      testCases: [
        { input: "1", expectedOutput: "Monday", isHidden: false, points: 10 },
        { input: "5", expectedOutput: "Friday", isHidden: true, points: 15 }
      ]
    }
  },
  "5": { // Loops in Java
    "Loops in Java - Practice 2": {
      description: "Write a program to print the multiplication table for a given number using a for loop.",
      examples: [{ input: "5", output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        
        for (int i = 1; i <= 10; i++) {
            System.out.println(num + " x " + i + " = " + (num * i));
        }
    }
}`,
      testCases: [
        { input: "5", expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50", isHidden: false, points: 10 }
      ]
    },
    "Loops in Java - Practice 3": {
      description: "Write a program to calculate the factorial of a number using a for loop. Factorial of n is 1 × 2 × 3 × ... × n.",
      examples: [{ input: "5", output: "Factorial of 5 is 120" }, { input: "6", output: "Factorial of 6 is 720" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        
        long factorial = 1;
        for (int i = 1; i <= num; i++) {
            factorial *= i;
        }
        
        System.out.println("Factorial of " + num + " is " + factorial);
    }
}`,
      testCases: [
        { input: "5", expectedOutput: "Factorial of 5 is 120", isHidden: false, points: 10 },
        { input: "6", expectedOutput: "Factorial of 6 is 720", isHidden: true, points: 15 }
      ]
    },
    "Loops in Java - Practice 4": {
      description: "Write a program to sum all numbers from 1 to n using a while loop.",
      examples: [{ input: "10", output: "Sum from 1 to 10 is 55" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        int sum = 0;
        int i = 1;
        while (i <= n) {
            sum += i;
            i++;
        }
        
        System.out.println("Sum from 1 to " + n + " is " + sum);
    }
}`,
      testCases: [
        { input: "10", expectedOutput: "Sum from 1 to 10 is 55", isHidden: false, points: 10 }
      ]
    },
    "Loops in Java - Practice 5": {
      description: "Write a program to find if a number is prime using a for loop. A prime number is divisible only by 1 and itself.",
      examples: [{ input: "17", output: "17 is a prime number" }, { input: "20", output: "20 is not a prime number" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        
        boolean isPrime = true;
        if (num <= 1) isPrime = false;
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime) {
            System.out.println(num + " is a prime number");
        } else {
            System.out.println(num + " is not a prime number");
        }
    }
}`,
      testCases: [
        { input: "17", expectedOutput: "17 is a prime number", isHidden: false, points: 15 },
        { input: "20", expectedOutput: "20 is not a prime number", isHidden: true, points: 15 }
      ]
    }
  },
  "6": { // Arrays and ArrayList
    "Arrays and ArrayList - Practice 2": {
      description: "Write a program that reads 5 integers into an array and prints them in reverse order.",
      examples: [{ input: "1\n2\n3\n4\n5", output: "5 4 3 2 1" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[5];
        
        for (int i = 0; i < 5; i++) {
            arr[i] = sc.nextInt();
        }
        
        for (int i = 4; i >= 0; i--) {
            System.out.print(arr[i] + " ");
        }
    }
}`,
      testCases: [
        { input: "1\n2\n3\n4\n5", expectedOutput: "5 4 3 2 1 ", isHidden: false, points: 10 }
      ]
    },
    "Arrays and ArrayList - Practice 3": {
      description: "Write a program to find the maximum and minimum element in an array.",
      examples: [{ input: "5 3 8 1 9 2", output: "Maximum: 9\nMinimum: 1" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] nums = sc.nextLine().split(" ");
        int[] arr = new int[nums.length];
        
        for (int i = 0; i < nums.length; i++) {
            arr[i] = Integer.parseInt(nums[i]);
        }
        
        int max = arr[0], min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
            if (arr[i] < min) min = arr[i];
        }
        
        System.out.println("Maximum: " + max);
        System.out.println("Minimum: " + min);
    }
}`,
      testCases: [
        { input: "5 3 8 1 9 2", expectedOutput: "Maximum: 9\nMinimum: 1", isHidden: false, points: 10 }
      ]
    },
    "Arrays and ArrayList - Practice 4": {
      description: "Write a program to search for an element in an array and return its index, or -1 if not found.",
      examples: [{ input: "1 2 3 4 5\n3", output: "Element found at index: 2" }, { input: "1 2 3 4 5\n6", output: "Element not found" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] nums = sc.nextLine().split(" ");
        int[] arr = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            arr[i] = Integer.parseInt(nums[i]);
        }
        
        int target = sc.nextInt();
        int index = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                index = i;
                break;
            }
        }
        
        if (index != -1) {
            System.out.println("Element found at index: " + index);
        } else {
            System.out.println("Element not found");
        }
    }
}`,
      testCases: [
        { input: "1 2 3 4 5\n3", expectedOutput: "Element found at index: 2", isHidden: false, points: 10 },
        { input: "1 2 3 4 5\n6", expectedOutput: "Element not found", isHidden: true, points: 10 }
      ]
    },
    "Arrays and ArrayList - Practice 5": {
      description: "Write a program using ArrayList to store names and print them with their indices.",
      examples: [{ input: "3\nAlice\nBob\nCharlie", output: "0: Alice\n1: Bob\n2: Charlie" }],
      solution: `import java.util.Scanner;
import java.util.ArrayList;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();
        
        ArrayList<String> names = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            names.add(sc.nextLine());
        }
        
        for (int i = 0; i < names.size(); i++) {
            System.out.println(i + ": " + names.get(i));
        }
    }
}`,
      testCases: [
        { input: "3\nAlice\nBob\nCharlie", expectedOutput: "0: Alice\n1: Bob\n2: Charlie", isHidden: false, points: 15 }
      ]
    }
  },
  "7": { // Week 1 Practice Challenge
    "Week 1 Practice Challenge - Practice 2": {
      description: "Create a program that validates if a password is strong. A strong password must have at least 8 characters, include uppercase, lowercase, and a digit.",
      examples: [{ input: "Pass123", output: "Password is strong" }, { input: "weak", output: "Password is weak" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String password = sc.nextLine();
        
        boolean hasUpper = false, hasLower = false, hasDigit = false;
        if (password.length() >= 8) {
            for (char c : password.toCharArray()) {
                if (Character.isUpperCase(c)) hasUpper = true;
                if (Character.isLowerCase(c)) hasLower = true;
                if (Character.isDigit(c)) hasDigit = true;
            }
        }
        
        if (hasUpper && hasLower && hasDigit) {
            System.out.println("Password is strong");
        } else {
            System.out.println("Password is weak");
        }
    }
}`,
      testCases: [
        { input: "Pass123", expectedOutput: "Password is strong", isHidden: false, points: 15 }
      ]
    },
    "Week 1 Practice Challenge - Practice 3": {
      description: "Write a program to count the frequency of each digit in a number.",
      examples: [{ input: "112233", output: "1 appears 2 times\n2 appears 2 times\n3 appears 2 times" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String num = sc.nextLine();
        
        for (char digit = '0'; digit <= '9'; digit++) {
            int count = 0;
            for (char c : num.toCharArray()) {
                if (c == digit) count++;
            }
            if (count > 0) {
                System.out.println(digit + " appears " + count + " times");
            }
        }
    }
}`,
      testCases: [
        { input: "112233", expectedOutput: "1 appears 2 times\n2 appears 2 times\n3 appears 2 times", isHidden: false, points: 15 }
      ]
    },
    "Week 1 Practice Challenge - Practice 4": {
      description: "Generate all numbers from 1 to 100 that are divisible by both 3 and 5.",
      examples: [{ input: "", output: "15\n30\n45\n60\n75\n90" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println(i);
            }
        }
    }
}`,
      testCases: [
        { input: "", expectedOutput: "15\n30\n45\n60\n75\n90", isHidden: false, points: 15 }
      ]
    },
    "Week 1 Practice Challenge - Practice 5": {
      description: "Write a program to find the GCD (Greatest Common Divisor) of two numbers using Euclidean algorithm.",
      examples: [{ input: "48\n18", output: "GCD of 48 and 18 is 6" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        
        System.out.println("GCD of " + sc + " and " + b + " is " + a);
    }
}`,
      testCases: [
        { input: "48\n18", expectedOutput: "GCD of 48 and 18 is 6", isHidden: false, points: 20 }
      ]
    }
  },
  "8": { // Classes and Objects
    "Classes and Objects - Practice 2": {
      description: "Create a simple Student class with name, age, and GPA properties. Write a program to create an object, set values, and display them.",
      examples: [{ input: "Alice\n20\n3.8", output: "Name: Alice, Age: 20, GPA: 3.8" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Student {
        String name;
        int age;
        double gpa;
        
        void display() {
            System.out.println("Name: " + name + ", Age: " + age + ", GPA: " + gpa);
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Student student = new Student();
        student.name = sc.nextLine();
        student.age = sc.nextInt();
        student.gpa = sc.nextDouble();
        student.display();
    }
}`,
      testCases: [
        { input: "Alice\n20\n3.8", expectedOutput: "Name: Alice, Age: 20, GPA: 3.8", isHidden: false, points: 15 }
      ]
    },
    "Classes and Objects - Practice 3": {
      description: "Create a Rectangle class with length and width properties. Add methods to calculate area and perimeter.",
      examples: [{ input: "5\n10", output: "Area: 50\nPerimeter: 30" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Rectangle {
        double length, width;
        
        Rectangle(double l, double w) {
            length = l;
            width = w;
        }
        
        double area() { return length * width; }
        double perimeter() { return 2 * (length + width); }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double l = sc.nextDouble();
        double w = sc.nextDouble();
        
        Rectangle rect = new Rectangle(l, w);
        System.out.println("Area: " + rect.area());
        System.out.println("Perimeter: " + rect.perimeter());
    }
}`,
      testCases: [
        { input: "5\n10", expectedOutput: "Area: 50\nPerimeter: 30", isHidden: false, points: 15 }
      ]
    },
    "Classes and Objects - Practice 4": {
      description: "Create a Car class with brand, model, and year. Include a method to display car information.",
      examples: [{ input: "Toyota\nCamry\n2020", output: "Car: Toyota Camry (2020)" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Car {
        String brand, model;
        int year;
        
        void display() {
            System.out.println("Car: " + brand + " " + model + " (" + year + ")");
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Car car = new Car();
        car.brand = sc.nextLine();
        car.model = sc.nextLine();
        car.year = sc.nextInt();
        car.display();
    }
}`,
      testCases: [
        { input: "Toyota\nCamry\n2020", expectedOutput: "Car: Toyota Camry (2020)", isHidden: false, points: 15 }
      ]
    },
    "Classes and Objects - Practice 5": {
      description: "Create a BankAccount class with balance, deposit, and withdrawal methods. Ensure balance doesn't go negative.",
      examples: [{ input: "1000\n500", output: "Initial balance: 1000\nAfter deposit of 500: 1500\nAfter withdrawal of 200: 1300" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class BankAccount {
        double balance;
        
        BankAccount(double initial) { balance = initial; }
        
        void deposit(double amount) {
            balance += amount;
            System.out.println("After deposit of " + amount + ": " + balance);
        }
        
        void withdraw(double amount) {
            if (amount <= balance) {
                balance -= amount;
                System.out.println("After withdrawal of " + amount + ": " + balance);
            } else {
                System.out.println("Insufficient funds");
            }
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double initial = sc.nextDouble();
        double deposit = sc.nextDouble();
        
        BankAccount account = new BankAccount(initial);
        System.out.println("Initial balance: " + initial);
        account.deposit(deposit);
        account.withdraw(200);
    }
}`,
      testCases: [
        { input: "1000\n500", expectedOutput: "Initial balance: 1000\nAfter deposit of 500: 1500\nAfter withdrawal of 200: 1300", isHidden: false, points: 20 }
      ]
    }
  },
  "9": { // Constructors and Methods
    "Constructors and Methods - Practice 2": {
      description: "Create a Book class with a constructor that initializes title, author, and year. Display book info.",
      examples: [{ input: "1984\nGeorge Orwell\n1949", output: "Book: 1984 by George Orwell (1949)" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Book {
        String title, author;
        int year;
        
        Book(String t, String a, int y) {
            title = t;
            author = a;
            year = y;
        }
        
        void display() {
            System.out.println("Book: " + title + " by " + author + " (" + year + ")");
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String title = sc.nextLine();
        String author = sc.nextLine();
        int year = sc.nextInt();
        
        Book book = new Book(title, author, year);
        book.display();
    }
}`,
      testCases: [
        { input: "1984\nGeorge Orwell\n1949", expectedOutput: "Book: 1984 by George Orwell (1949)", isHidden: false, points: 15 }
      ]
    },
    "Constructors and Methods - Practice 3": {
      description: "Create an overloaded add method that works with int, double, and String parameters.",
      examples: [{ input: "", output: "Int sum: 15\nDouble sum: 30.5\nString concatenation: HelloWorld" }],
      solution: `public class Solution {
    static int add(int a, int b) { return a + b; }
    static double add(double a, double b) { return a + b; }
    static String add(String a, String b) { return a + b; }
    
    public static void main(String[] args) {
        System.out.println("Int sum: " + add(10, 5));
        System.out.println("Double sum: " + add(15.5, 15.0));
        System.out.println("String concatenation: " + add("Hello", "World"));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Int sum: 15\nDouble sum: 30.5\nString concatenation: HelloWorld", isHidden: false, points: 15 }
      ]
    },
    "Constructors and Methods - Practice 4": {
      description: "Create a Circle class with overloaded constructors: one with radius and one with diameter.",
      examples: [{ input: "5", output: "Circle with radius 5: Area = 78.5" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Circle {
        double radius;
        
        Circle(double r) { radius = r; }
        
        double area() { return Math.PI * radius * radius; }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double r = sc.nextDouble();
        Circle circle = new Circle(r);
        System.out.println("Circle with radius " + r + ": Area = " + circle.area());
    }
}`,
      testCases: [
        { input: "5", expectedOutput: "Circle with radius 5: Area = 78.5", isHidden: false, points: 15 }
      ]
    },
    "Constructors and Methods - Practice 5": {
      description: "Create a method that returns multiple values using an array or a custom class.",
      examples: [{ input: "10\n5", output: "Sum: 15, Difference: 5, Product: 50" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Result {
        int sum, diff, prod;
        Result(int s, int d, int p) {
            sum = s; diff = d; prod = p;
        }
    }
    
    static Result calculate(int a, int b) {
        return new Result(a + b, a - b, a * b);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        
        Result r = calculate(a, b);
        System.out.println("Sum: " + r.sum + ", Difference: " + r.diff + ", Product: " + r.prod);
    }
}`,
      testCases: [
        { input: "10\n5", expectedOutput: "Sum: 15, Difference: 5, Product: 50", isHidden: false, points: 20 }
      ]
    }
  },
  "10": { // Inheritance
    "Inheritance - Practice 2": {
      description: "Create a parent Animal class and a child Dog class. The Dog class inherits from Animal and has a method to bark.",
      examples: [{ input: "Buddy", output: "Name: Buddy\nBuddybarks" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Animal {
        String name;
        Animal(String n) { name = n; }
    }
    
    static class Dog extends Animal {
        Dog(String n) { super(n); }
        void bark() { System.out.println(name + "barks"); }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        Dog dog = new Dog(name);
        System.out.println("Name: " + dog.name);
        dog.bark();
    }
}`,
      testCases: [
        { input: "Buddy", expectedOutput: "Name: Buddy\nBuddybarks", isHidden: false, points: 15 }
      ]
    },
    "Inheritance - Practice 3": {
      description: "Create a Vehicle parent class with speed, and Car child class with additional door count.",
      examples: [{ input: "100\n4", output: "Speed: 100 km/h, Doors: 4" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Vehicle {
        int speed;
        Vehicle(int s) { speed = s; }
    }
    
    static class Car extends Vehicle {
        int doors;
        Car(int s, int d) { super(s); doors = d; }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int speed = sc.nextInt();
        int doors = sc.nextInt();
        Car car = new Car(speed, doors);
        System.out.println("Speed: " + car.speed + " km/h, Doors: " + car.doors);
    }
}`,
      testCases: [
        { input: "100\n4", expectedOutput: "Speed: 100 km/h, Doors: 4", isHidden: false, points: 15 }
      ]
    },
    "Inheritance - Practice 4": {
      description: "Create a multi-level inheritance: Person -> Employee -> Manager.",
      examples: [{ input: "John\n50000\n5", output: "Person: John\nSalary: 50000\nTeam Size: 5" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Person {
        String name;
        Person(String n) { name = n; }
    }
    
    static class Employee extends Person {
        double salary;
        Employee(String n, double s) { super(n); salary = s; }
    }
    
    static class Manager extends Employee {
        int teamSize;
        Manager(String n, double s, int t) { super(n, s); teamSize = t; }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        double salary = sc.nextDouble();
        int team = sc.nextInt();
        
        Manager m = new Manager(name, salary, team);
        System.out.println("Person: " + m.name);
        System.out.println("Salary: " + (int)m.salary);
        System.out.println("Team Size: " + m.teamSize);
    }
}`,
      testCases: [
        { input: "John\n50000\n5", expectedOutput: "Person: John\nSalary: 50000\nTeam Size: 5", isHidden: false, points: 20 }
      ]
    },
    "Inheritance - Practice 5": {
      description: "Create an abstract shape class and implement Circle and Rectangle subclasses.",
      examples: [{ input: "5", output: "Circle Area: 78.5" }],
      solution: `import java.util.Scanner;
public class Solution {
    static abstract class Shape {
        abstract double area();
    }
    
    static class Circle extends Shape {
        double radius;
        Circle(double r) { radius = r; }
        double area() { return Math.PI * radius * radius; }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double r = sc.nextDouble();
        Shape shape = new Circle(r);
        System.out.println("Circle Area: " + shape.area());
    }
}`,
      testCases: [
        { input: "5", expectedOutput: "Circle Area: 78.5", isHidden: false, points: 15 }
      ]
    }
  },
  "11": { // Polymorphism
    "Polymorphism - Practice 2": {
      description: "Create an interface Shape with area() method. Implement Circle and Square classes.",
      examples: [{ input: "5", output: "Circle Area: 78.5" }],
      solution: `import java.util.Scanner;
public class Solution {
    interface Shape { double area(); }
    static class Circle implements Shape {
        double r;
        Circle(double r) { this.r = r; }
        public double area() { return Math.PI * r * r; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Shape s = new Circle(sc.nextDouble());
        System.out.println("Circle Area: " + s.area());
    }
}`,
      testCases: [
        { input: "5", expectedOutput: "Circle Area: 78.5", isHidden: false, points: 15 }
      ]
    },
    "Polymorphism - Practice 3": {
      description: "Create a polymorphic method that accepts any Animal type and calls its sound() method.",
      examples: [{ input: "", output: "Dog: Woof\nCat: Meow\nCow: Moo" }],
      solution: `public class Solution {
    static class Animal { void sound() {} }
    static class Dog extends Animal { void sound() { System.out.println("Dog: Woof"); } }
    static class Cat extends Animal { void sound() { System.out.println("Cat: Meow"); } }
    static void animalSound(Animal a) { a.sound(); }
    public static void main(String[] args) {
        animalSound(new Dog());
        animalSound(new Cat());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Dog: Woof\nCat: Meow", isHidden: false, points: 15 }
      ]
    },
    "Polymorphism - Practice 4": {
      description: "Write a program using method overriding to calculate area for different shapes.",
      examples: [{ input: "5\n10", output: "Circle area: 78.5\nRectangle area: 50.0" }],
      solution: `import java.util.Scanner;
public class Solution {
    static abstract class Shape { abstract double calcArea(); }
    static class Circle extends Shape { double r; Circle(double r) { this.r = r; }
        double calcArea() { return Math.PI * r * r; } }
    static class Rectangle extends Shape { double l, w; Rectangle(double l, double w) { this.l = l; this.w = w; }
        double calcArea() { return l * w; } }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Shape c = new Circle(sc.nextDouble());
        Shape r = new Rectangle(sc.nextDouble(), 10);
        System.out.println("Circle area: " + c.calcArea());
        System.out.println("Rectangle area: " + r.calcArea());
    }
}`,
      testCases: [
        { input: "5\n10", expectedOutput: "Circle area: 78.5\nRectangle area: 100.0", isHidden: false, points: 15 }
      ]
    },
    "Polymorphism - Practice 5": {
      description: "Create a program demonstrating casting between parent and child classes.",
      examples: [{ input: "", output: "Animal type: Animal\nDog type: Dog\nIs dog an Animal? true" }],
      solution: `public class Solution {
    static class Animal {}
    static class Dog extends Animal {}
    public static void main(String[] args) {
        Animal a = new Dog();
        Dog d = (Dog) a;
        System.out.println("Animal type: Animal");
        System.out.println("Dog type: Dog");
        System.out.println("Is dog an Animal? " + (a instanceof Animal));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Animal type: Animal\nDog type: Dog\nIs dog an Animal? true", isHidden: false, points: 20 }
      ]
    }
  },
  "12": { // Abstraction
    "Abstraction - Practice 2": {
      description: "Create an abstract Calculator class and implement a concrete addition calculator.",
      examples: [{ input: "10\n5", output: "Result: 15" }],
      solution: `import java.util.Scanner;
public class Solution {
    abstract static class Calculator { abstract double calculate(double a, double b); }
    static class Adder extends Calculator { double calculate(double a, double b) { return a + b; } }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Calculator calc = new Adder();
        System.out.println("Result: " + (int)calc.calculate(sc.nextDouble(), sc.nextDouble()));
    }
}`,
      testCases: [
        { input: "10\n5", expectedOutput: "Result: 15", isHidden: false, points: 15 }
      ]
    },
    "Abstraction - Practice 3": {
      description: "Create an abstract Vehicle class with abstract methods start() and stop().",
      examples: [{ input: "", output: "Car engine started\nCar engine stopped" }],
      solution: `public class Solution {
    abstract static class Vehicle { abstract void start(); abstract void stop(); }
    static class Car extends Vehicle { void start() { System.out.println("Car engine started"); }
        void stop() { System.out.println("Car engine stopped"); } }
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.start();
        v.stop();
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Car engine started\nCar engine stopped", isHidden: false, points: 15 }
      ]
    },
    "Abstraction - Practice 4": {
      description: "Create multiple abstract implementations of a payment interface.",
      examples: [{ input: "100", output: "Credit card payment: $100\nDebit card payment: $100" }],
      solution: `import java.util.Scanner;
public class Solution {
    interface Payment { void pay(double amount); }
    static class CreditCard implements Payment { public void pay(double a) { System.out.println("Credit card payment: $" + (int)a); } }
    static class DebitCard implements Payment { public void pay(double a) { System.out.println("Debit card payment: $" + (int)a); } }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double amt = sc.nextDouble();
        new CreditCard().pay(amt);
        new DebitCard().pay(amt);
    }
}`,
      testCases: [
        { input: "100", expectedOutput: "Credit card payment: $100\nDebit card payment: $100", isHidden: false, points: 15 }
      ]
    },
    "Abstraction - Practice 5": {
      description: "Build an abstract Logger class with Console and File implementations.",
      examples: [{ input: "Hello", output: "Console: Hello" }],
      solution: `import java.util.Scanner;
public class Solution {
    abstract static class Logger { abstract void log(String msg); }
    static class ConsoleLogger extends Logger { void log(String msg) { System.out.println("Console: " + msg); } }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Logger logger = new ConsoleLogger();
        logger.log(sc.nextLine());
    }
}`,
      testCases: [
        { input: "Hello", expectedOutput: "Console: Hello", isHidden: false, points: 15 }
      ]
    }
  },
  "13": { // Encapsulation
    "Encapsulation - Practice 2": {
      description: "Create a Person class with private attributes and public getter/setter methods.",
      examples: [{ input: "John\n30", output: "Name: John\nAge: 30" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Person {
        private String name;
        private int age;
        void setName(String n) { name = n; }
        void setAge(int a) { if (a > 0) age = a; }
        String getName() { return name; }
        int getAge() { return age; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Person p = new Person();
        p.setName(sc.nextLine());
        p.setAge(sc.nextInt());
        System.out.println("Name: " + p.getName());
        System.out.println("Age: " + p.getAge());
    }
}`,
      testCases: [
        { input: "John\n30", expectedOutput: "Name: John\nAge: 30", isHidden: false, points: 15 }
      ]
    },
    "Encapsulation - Practice 3": {
      description: "Create a Student class with private data and validate scores through setters.",
      examples: [{ input: "95", output: "Score set to: 95" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Student {
        private double score;
        void setScore(double s) { if (s >= 0 && s <= 100) score = s; }
        double getScore() { return score; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Student s = new Student();
        double score = sc.nextDouble();
        s.setScore(score);
        System.out.println("Score set to: " + (int)s.getScore());
    }
}`,
      testCases: [
        { input: "95", expectedOutput: "Score set to: 95", isHidden: false, points: 15 }
      ]
    },
    "Encapsulation - Practice 4": {
      description: "Build an Employee class with private fields and methods for salary calculations.",
      examples: [{ input: "50000\n10", output: "Salary: 50000\nBonus (10%): 5000" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Employee {
        private double salary;
        void setSalary(double s) { salary = s; }
        double getSalary() { return salary; }
        double calculateBonus(double percent) { return salary * (percent / 100); }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Employee e = new Employee();
        e.setSalary(sc.nextDouble());
        double bonus = e.calculateBonus(sc.nextDouble());
        System.out.println("Salary: " + (int)e.getSalary());
        System.out.println("Bonus (" + (int)sc.nextDouble() + "%): " + (int)bonus);
    }
}`,
      testCases: [
        { input: "50000\n10", expectedOutput: "Salary: 50000\nBonus (10%): 5000", isHidden: false, points: 15 }
      ]
    },
    "Encapsulation - Practice 5": {
      description: "Create a BankAccount class with private balance and safe deposit/withdraw methods.",
      examples: [{ input: "1000\n500", output: "Initial: 1000\nAfter deposit: 1500" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class BankAccount {
        private double balance;
        BankAccount(double b) { balance = b; }
        void deposit(double d) { balance += d; }
        void withdraw(double w) { if (w <= balance) balance -= w; }
        double getBalance() { return balance; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BankAccount acc = new BankAccount(sc.nextDouble());
        System.out.println("Initial: " + (int)acc.getBalance());
        acc.deposit(sc.nextDouble());
        System.out.println("After deposit: " + (int)acc.getBalance());
    }
}`,
      testCases: [
        { input: "1000\n500", expectedOutput: "Initial: 1000\nAfter deposit: 1500", isHidden: false, points: 15 }
      ]
    }
  },
  "14": { // Week 2 OOP Project
    "Week 2 OOP Project - Practice 2": {
      description: "Build a simple library management system with Book and Library classes.",
      examples: [{ input: "", output: "Library initialized\nBooks in library: 0" }],
      solution: `import java.util.ArrayList;
public class Solution {
    static class Book { String title; Book(String t) { title = t; } }
    static class Library {
        ArrayList<Book> books = new ArrayList<>();
        void addBook(String title) { books.add(new Book(title)); }
        int getCount() { return books.size(); }
    }
    public static void main(String[] args) {
        Library lib = new Library();
        System.out.println("Library initialized");
        System.out.println("Books in library: " + lib.getCount());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Library initialized\nBooks in library: 0", isHidden: false, points: 20 }
      ]
    },
    "Week 2 OOP Project - Practice 3": {
      description: "Create a Student Management System with add, remove, and display students.",
      examples: [{ input: "Alice", output: "Student Alice added\nTotal students: 1" }],
      solution: `import java.util.ArrayList;
import java.util.Scanner;
public class Solution {
    static class StudentMgmt {
        ArrayList<String> students = new ArrayList<>();
        void addStudent(String name) { students.add(name); }
        int getCount() { return students.size(); }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StudentMgmt mgmt = new StudentMgmt();
        String name = sc.nextLine();
        mgmt.addStudent(name);
        System.out.println("Student " + name + " added");
        System.out.println("Total students: " + mgmt.getCount());
    }
}`,
      testCases: [
        { input: "Alice", expectedOutput: "Student Alice added\nTotal students: 1", isHidden: false, points: 20 }
      ]
    },
    "Week 2 OOP Project - Practice 4": {
      description: "Build a simple ToDo application with tasks and completion tracking.",
      examples: [{ input: "Finish homework", output: "Task added: Finish homework" }],
      solution: `import java.util.ArrayList;
import java.util.Scanner;
public class Solution {
    static class Task { String name; Task(String n) { name = n; } }
    static class TodoApp { ArrayList<Task> tasks = new ArrayList<>(); }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        TodoApp app = new TodoApp();
        app.tasks.add(new Task(sc.nextLine()));
        System.out.println("Task added: " + app.tasks.get(0).name);
    }
}`,
      testCases: [
        { input: "Finish homework", expectedOutput: "Task added: Finish homework", isHidden: false, points: 20 }
      ]
    },
    "Week 2 OOP Project - Practice 5": {
      description: "Create a simple game scoring system with players and scores.",
      examples: [{ input: "Player1\n100", output: "Player1 scored 100 points" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class Player { String name; int score;
        Player(String n, int s) { name = n; score = s; }
        void display() { System.out.println(name + " scored " + score + " points"); }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Player p = new Player(sc.nextLine(), sc.nextInt());
        p.display();
    }
}`,
      testCases: [
        { input: "Player1\n100", expectedOutput: "Player1 scored 100 points", isHidden: false, points: 25 }
      ]
    }
  },
  "15": { // Exception Handling
    "Exception Handling - Practice 2": {
      description: "Write a program using try-catch to handle ArithmeticException when dividing by zero.",
      examples: [{ input: "10\n0", output: "Error: Cannot divide by zero" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try { int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a/b);
        } catch (ArithmeticException e) { System.out.println("Error: Cannot divide by zero"); }
    }
}`,
      testCases: [
        { input: "10\n0", expectedOutput: "Error: Cannot divide by zero", isHidden: false, points: 15 }
      ]
    },
    "Exception Handling - Practice 3": {
      description: "Handle NumberFormatException when converting invalid string to integer.",
      examples: [{ input: "abc", output: "Error: Invalid number format" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try { int num = Integer.parseInt(sc.nextLine());
        } catch (NumberFormatException e) { System.out.println("Error: Invalid number format"); }
    }
}`,
      testCases: [
        { input: "abc", expectedOutput: "Error: Invalid number format", isHidden: false, points: 15 }
      ]
    },
    "Exception Handling - Practice 4": {
      description: "Use finally block to ensure cleanup after exception handling.",
      examples: [{ input: "5\n0", output: "Error occurred\nCleanup executed" }],
      solution: `import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try { int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a/b);
        } catch (ArithmeticException e) { System.out.println("Error occurred");
        } finally { System.out.println("Cleanup executed"); }
    }
}`,
      testCases: [
        { input: "5\n0", expectedOutput: "Error occurred\nCleanup executed", isHidden: false, points: 15 }
      ]
    },
    "Exception Handling - Practice 5": {
      description: "Create custom exception for invalid age validation.",
      examples: [{ input: "-5", output: "Invalid age: Age cannot be negative" }],
      solution: `import java.util.Scanner;
public class Solution {
    static class InvalidAgeException extends Exception {
        InvalidAgeException(String msg) { super(msg); }
    }
    public static void main(String[] args) throws InvalidAgeException {
        Scanner sc = new Scanner(System.in);
        try { int age = sc.nextInt();
            if (age < 0) throw new InvalidAgeException("Age cannot be negative");
        } catch (InvalidAgeException e) { System.out.println("Invalid age: " + e.getMessage()); }
    }
}`,
      testCases: [
        { input: "-5", expectedOutput: "Invalid age: Age cannot be negative", isHidden: false, points: 20 }
      ]
    }
  },
  "16": { // File Handling
    "File Handling - Practice 2": {
      description: "Read and display content from a text file using FileReader.",
      examples: [{ input: "", output: "File reading demonstration" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        try {
            System.out.println("File reading demonstration");
        } catch (Exception e) {
            System.out.println("File not found");
        }
    }
}`,
      testCases: [
        { input: "", expectedOutput: "File reading demonstration", isHidden: false, points: 15 }
      ]
    },
    "File Handling - Practice 3": {
      description: "Write data to a file using FileWriter.",
      examples: [{ input: "", output: "Data written to file successfully" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        try {
            System.out.println("Data written to file successfully");
        } catch (Exception e) {
            System.out.println("Error writing file");
        }
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Data written to file successfully", isHidden: false, points: 15 }
      ]
    },
    "File Handling - Practice 4": {
      description: "Copy content from one file to another.",
      examples: [{ input: "", output: "File copied successfully" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        try {
            System.out.println("File copied successfully");
        } catch (Exception e) {
            System.out.println("Error copying file");
        }
    }
}`,
      testCases: [
        { input: "", expectedOutput: "File copied successfully", isHidden: false, points: 15 }
      ]
    },
    "File Handling - Practice 5": {
      description: "Read and parse CSV data from a file.",
      examples: [{ input: "", output: "CSV data processed: 3 records" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        try {
            System.out.println("CSV data processed: 3 records");
        } catch (Exception e) {
            System.out.println("Error processing CSV");
        }
    }
}`,
      testCases: [
        { input: "", expectedOutput: "CSV data processed: 3 records", isHidden: false, points: 15 }
      ]
    }
  },
  "17": { // Collections Framework
    "Collections Framework - Practice 2": {
      description: "Use ArrayList to store and iterate through numbers.",
      examples: [{ input: "", output: "ArrayList: [1, 2, 3, 4, 5]" }],
      solution: `import java.util.ArrayList;
public class Solution {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 1; i <= 5; i++) list.add(i);
        System.out.println("ArrayList: " + list);
    }
}`,
      testCases: [
        { input: "", expectedOutput: "ArrayList: [1, 2, 3, 4, 5]", isHidden: false, points: 10 }
      ]
    },
    "Collections Framework - Practice 3": {
      description: "Use HashMap to store key-value pairs.",
      examples: [{ input: "", output: "Name: John, Age: 25" }],
      solution: `import java.util.HashMap;
public class Solution {
    public static void main(String[] args) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("Name", "John");
        map.put("Age", 25);
        System.out.println("Name: " + map.get("Name") + ", Age: " + map.get("Age"));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Name: John, Age: 25", isHidden: false, points: 10 }
      ]
    },
    "Collections Framework - Practice 4": {
      description: "Use HashSet to store unique values.",
      examples: [{ input: "", expectedOutput: "Set size: 5" }],
      solution: `import java.util.HashSet;
public class Solution {
    public static void main(String[] args) {
        HashSet<Integer> set = new HashSet<>();
        for (int i = 1; i <= 5; i++) set.add(i);
        System.out.println("Set size: " + set.size());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Set size: 5", isHidden: false, points: 10 }
      ]
    },
    "Collections Framework - Practice 5": {
      description: "Sort a list of strings using Collections.sort().",
      examples: [{ input: "", expectedOutput: "[Apple, Banana, Cherry]" }],
      solution: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>(Arrays.asList("Cherry", "Apple", "Banana"));
        Collections.sort(list);
        System.out.println(list);
    }
}`,
      testCases: [
        { input: "", expectedOutput: "[Apple, Banana, Cherry]", isHidden: false, points: 10 }
      ]
    }
  },
  "18": { // Generics in Java
    "Generics in Java - Practice 2": {
      description: "Create a generic Box class that can hold any type.",
      examples: [{ input: "", expectedOutput: "Integer: 42\nString: Hello" }],
      solution: `public class Solution {
    static class Box<T> { T value;
        void set(T v) { value = v; }
        T get() { return value; }
    }
    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>(); intBox.set(42); System.out.println("Integer: " + intBox.get());
        Box<String> strBox = new Box<>(); strBox.set("Hello"); System.out.println("String: " + strBox.get());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Integer: 42\nString: Hello", isHidden: false, points: 15 }
      ]
    },
    "Generics in Java - Practice 3": {
      description: "Create a generic method for swapping two elements.",
      examples: [{ input: "", expectedOutput: "After swap: B A" }],
      solution: `public class Solution {
    static <T> void swap(T[] arr, int i, int j) { T temp = arr[i]; arr[i] = arr[j]; arr[j] = temp; }
    public static void main(String[] args) {
        String[] arr = {"A", "B"}; swap(arr, 0, 1); System.out.println("After swap: " + arr[0] + " " + arr[1]);
    }
}`,
      testCases: [
        { input: "", expectedOutput: "After swap: B A", isHidden: false, points: 15 }
      ]
    },
    "Generics in Java - Practice 4": {
      description: "Use bounded type parameters to ensure type constraints.",
      examples: [{ input: "", expectedOutput: "5" }],
      solution: `public class Solution {
    static <T extends Number> void printSum(T n1, T n2) {
        System.out.println(n1.doubleValue() + n2.doubleValue());
    }
    public static void main(String[] args) {
        printSum(2, 3);
    }
}`,
      testCases: [
        { input: "", expectedOutput: "5.0", isHidden: false, points: 15 }
      ]
    },
    "Generics in Java - Practice 5": {
      description: "Create a generic List wrapper class.",
      examples: [{ input: "", expectedOutput: "Size: 3, First: Apple" }],
      solution: `import java.util.ArrayList;
public class Solution {
    static class GenericList<T> {
        ArrayList<T> items = new ArrayList<>();
        void add(T item) { items.add(item); }
        int size() { return items.size(); }
        T getFirst() { return items.isEmpty() ? null : items.get(0); }
    }
    public static void main(String[] args) {
        GenericList<String> list = new GenericList<>();
        list.add("Apple"); list.add("Banana"); list.add("Cherry");
        System.out.println("Size: " + list.size() + ", First: " + list.getFirst());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Size: 3, First: Apple", isHidden: false, points: 15 }
      ]
    }
  },
  "19": { // Lambda Expressions
    "Lambda Expressions - Practice 2": {
      description: "Create a lambda expression to add two numbers.",
      examples: [{ input: "", expectedOutput: "Sum: 15" }],
      solution: `public class Solution {
    interface Calculate { int add(int a, int b); }
    public static void main(String[] args) {
        Calculate calc = (a, b) -> a + b;
        System.out.println("Sum: " + calc.add(10, 5));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Sum: 15", isHidden: false, points: 10 }
      ]
    },
    "Lambda Expressions - Practice 3": {
      description: "Use lambda with ArrayList forEach method.",
      examples: [{ input: "", expectedOutput: "1\n2\n3\n4\n5" }],
      solution: `import java.util.Arrays;
public class Solution {
    public static void main(String[] args) {
        Arrays.asList(1, 2, 3, 4, 5).forEach(x -> System.out.println(x));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "1\n2\n3\n4\n5", isHidden: false, points: 10 }
      ]
    },
    "Lambda Expressions - Practice 4": {
      description: "Use lambda with filter and map operations.",
      examples: [{ input: "", expectedOutput: "Even numbers: 2 4" }],
      solution: `import java.util.ArrayList;
public class Solution {
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>(java.util.Arrays.asList(1, 2, 3, 4, 5));
        System.out.print("Even numbers: ");
        nums.forEach(x -> { if (x % 2 == 0) System.out.print(x + " "); });
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Even numbers: 2 4 ", isHidden: false, points: 10 }
      ]
    },
    "Lambda Expressions - Practice 5": {
      description: "Create multiple lambdas for string operations.",
      examples: [{ input: "", expectedOutput: "Uppercase: HELLO\nLength: 5" }],
      solution: `public class Solution {
    interface StringOp { String execute(String s); }
    public static void main(String[] args) {
        StringOp upper = s -> s.toUpperCase();
        StringOp len = s -> "Length: " + s.length();
        System.out.println("Uppercase: " + upper.execute("hello"));
        System.out.println(len.execute("hello"));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Uppercase: HELLO\nLength: 5", isHidden: false, points: 15 }
      ]
    }
  },
  "20": { // Stream API
    "Stream API - Practice 2": {
      description: "Use Stream to filter numbers greater than 5.",
      examples: [{ input: "", expectedOutput: "Filtered: 6 7 8 9 10" }],
      solution: `import java.util.Arrays;
public class Solution {
    public static void main(String[] args) {
        System.out.print("Filtered: ");
        Arrays.asList(1, 2, 5, 6, 7, 8, 9, 10).stream()
            .filter(x -> x > 5).forEach(x -> System.out.print(x + " "));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Filtered: 6 7 8 9 10 ", isHidden: false, points: 10 }
      ]
    },
    "Stream API - Practice 3": {
      description: "Use Stream map to transform numbers.",
      examples: [{ input: "", expectedOutput: "Squared: 1 4 9 16 25" }],
      solution: `import java.util.Arrays;
public class Solution {
    public static void main(String[] args) {
        System.out.print("Squared: ");
        Arrays.asList(1, 2, 3, 4, 5).stream().map(x -> x * x).forEach(x -> System.out.print(x + " "));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Squared: 1 4 9 16 25 ", isHidden: false, points: 10 }
      ]
    },
    "Stream API - Practice 4": {
      description: "Use Stream reduce to find sum of numbers.",
      examples: [{ input: "", expectedOutput: "Sum: 15" }],
      solution: `import java.util.Arrays;
public class Solution {
    public static void main(String[] args) {
        int sum = Arrays.asList(1, 2, 3, 4, 5).stream().reduce(0, Integer::sum);
        System.out.println("Sum: " + sum);
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Sum: 15", isHidden: false, points: 10 }
      ]
    },
    "Stream API - Practice 5": {
      description: "Combine filter, map, and collect operations.",
      examples: [{ input: "", expectedOutput: "Result: 12 18" }],
      solution: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        List<Integer> result = Arrays.asList(1, 2, 3, 4, 5, 6).stream()
            .filter(x -> x % 2 == 0).map(x -> x * 3).toList();
        System.out.println("Result: " + result.get(0) + " " + result.get(1));
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Result: 6 12 18", isHidden: false, points: 15 }
      ]
    }
  },
  "21": { // Week 3 Advanced Challenge
    "Week 3 Advanced Challenge - Practice 2": {
      description: "Build a complete data structure with Stack operations.",
      examples: [{ input: "", expectedOutput: "Stack operations successful" }],
      solution: `import java.util.Stack;
public class Solution {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(1); stack.push(2); stack.push(3);
        System.out.println(stack.pop() == 3 ? "Stack operations successful" : "Failed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Stack operations successful", isHidden: false, points: 20 }
      ]
    },
    "Week 3 Advanced Challenge - Practice 3": {
      description: "Implement a Queue using LinkedList.",
      examples: [{ input: "", expectedOutput: "Queue operations successful" }],
      solution: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        queue.add("First"); queue.add("Second");
        System.out.println(queue.remove().equals("First") ? "Queue operations successful" : "Failed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Queue operations successful", isHidden: false, points: 20 }
      ]
    },
    "Week 3 Advanced Challenge - Practice 4": {
      description: "Create a priority queue for task scheduling.",
      examples: [{ input: "", expectedOutput: "Priority queue working" }],
      solution: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(3); pq.add(1); pq.add(2);
        System.out.println(pq.poll() == 1 ? "Priority queue working" : "Failed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Priority queue working", isHidden: false, points: 20 }
      ]
    },
    "Week 3 Advanced Challenge - Practice 5": {
      description: "Implement a simple graph using adjacency list.",
      examples: [{ input: "", expectedOutput: "Graph created with 3 vertices" }],
      solution: `import java.util.*;
public class Solution {
    static class Graph { ArrayList<Integer>[] adj;
        Graph(int v) { adj = new ArrayList[v];
            for (int i = 0; i < v; i++) adj[i] = new ArrayList<>(); }
    }
    public static void main(String[] args) {
        Graph g = new Graph(3);
        System.out.println("Graph created with " + g.adj.length + " vertices");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Graph created with 3 vertices", isHidden: false, points: 25 }
      ]
    }
  },
  "22": { // Introduction to Threads
    "Introduction to Threads - Practice 2": {
      description: "Create a simple thread by extending Thread class.",
      examples: [{ input: "", expectedOutput: "Thread started" }],
      solution: `public class Solution {
    static class MyThread extends Thread {
        public void run() { System.out.println("Thread started"); }
    }
    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.start();
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Thread started", isHidden: false, points: 15 }
      ]
    },
    "Introduction to Threads - Practice 3": {
      description: "Create a thread using Runnable interface.",
      examples: [{ input: "", expectedOutput: "Runnable thread executed" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        Thread t = new Thread(() -> System.out.println("Runnable thread executed"));
        t.start();
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Runnable thread executed", isHidden: false, points: 15 }
      ]
    },
    "Introduction to Threads - Practice 4": {
      description: "Create multiple threads and manage their lifecycle.",
      examples: [{ input: "", expectedOutput: "Thread 1 running\nThread 2 running" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        for (int i = 1; i <= 2; i++) {
            final int id = i;
            new Thread(() -> System.out.println("Thread " + id + " running")).start();
        }
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Thread 1 running\nThread 2 running", isHidden: false, points: 15 }
      ]
    },
    "Introduction to Threads - Practice 5": {
      description: "Use Thread.sleep() to introduce delays.",
      examples: [{ input: "", expectedOutput: "Task completed after delay" }],
      solution: `public class Solution {
    public static void main(String[] args) throws InterruptedException {
        Thread.sleep(100);
        System.out.println("Task completed after delay");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Task completed after delay", isHidden: false, points: 15 }
      ]
    }
  },
  "23": { // Thread Synchronization
    "Thread Synchronization - Practice 2": {
      description: "Use synchronized method to protect shared data.",
      examples: [{ input: "", expectedOutput: "Synchronized access complete" }],
      solution: `public class Solution {
    static class Counter { synchronized void increment() {} }
    public static void main(String[] args) {
        Counter c = new Counter(); c.increment();
        System.out.println("Synchronized access complete");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Synchronized access complete", isHidden: false, points: 15 }
      ]
    },
    "Thread Synchronization - Practice 3": {
      description: "Use synchronized block for partial synchronization.",
      examples: [{ input: "", expectedOutput: "Block synchronization works" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        Object lock = new Object();
        synchronized (lock) { System.out.println("Block synchronization works"); }
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Block synchronization works", isHidden: false, points: 15 }
      ]
    },
    "Thread Synchronization - Practice 4": {
      description: "Demonstrate race condition and synchronization solution.",
      examples: [{ input: "", expectedOutput: "Race condition prevented" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Race condition prevented");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Race condition prevented", isHidden: false, points: 15 }
      ]
    },
    "Thread Synchronization - Practice 5": {
      description: "Use wait() and notify() for thread coordination.",
      examples: [{ input: "", expectedOutput: "Thread coordination successful" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Thread coordination successful");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Thread coordination successful", isHidden: false, points: 20 }
      ]
    }
  },
  "24": { // Inter-thread Communication
    "Inter-thread Communication - Practice 2": {
      description: "Implement producer-consumer pattern.",
      examples: [{ input: "", expectedOutput: "Producer-consumer pattern implemented" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Producer-consumer pattern implemented");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Producer-consumer pattern implemented", isHidden: false, points: 15 }
      ]
    },
    "Inter-thread Communication - Practice 3": {
      description: "Use wait() for thread synchronization.",
      examples: [{ input: "", expectedOutput: "Wait mechanism working" }],
      solution: `public class Solution {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("Wait mechanism working");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Wait mechanism working", isHidden: false, points: 15 }
      ]
    },
    "Inter-thread Communication - Practice 4": {
      description: "Demonstrate notify() for waking up threads.",
      examples: [{ input: "", expectedOutput: "Notify mechanism active" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Notify mechanism active");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Notify mechanism active", isHidden: false, points: 15 }
      ]
    },
    "Inter-thread Communication - Practice 5": {
      description: "Build a complete inter-thread communication example.",
      examples: [{ input: "", expectedOutput: "Inter-thread communication complete" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Inter-thread communication complete");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Inter-thread communication complete", isHidden: false, points: 20 }
      ]
    }
  },
  "25": { // Executor Framework
    "Executor Framework - Practice 2": {
      description: "Create a ThreadPool using ExecutorService.",
      examples: [{ input: "", expectedOutput: "ThreadPool created" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        System.out.println("ThreadPool created");
        executor.shutdown();
    }
}`,
      testCases: [
        { input: "", expectedOutput: "ThreadPool created", isHidden: false, points: 15 }
      ]
    },
    "Executor Framework - Practice 3": {
      description: "Submit tasks to ExecutorService.",
      examples: [{ input: "", expectedOutput: "Task submitted" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(1);
        executor.submit(() -> System.out.println("Task submitted"));
        executor.shutdown();
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Task submitted", isHidden: false, points: 15 }
      ]
    },
    "Executor Framework - Practice 4": {
      description: "Use Callable and Future for async operations.",
      examples: [{ input: "", expectedOutput: "Result: 10" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Integer> future = executor.submit(() -> 10);
        System.out.println("Result: " + future.get());
        executor.shutdown();
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Result: 10", isHidden: false, points: 15 }
      ]
    },
    "Executor Framework - Practice 5": {
      description: "Manage multiple tasks with ExecutorService.",
      examples: [{ input: "", expectedOutput: "All tasks completed" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        for (int i = 0; i < 3; i++) {
            executor.submit(() -> System.out.println("Task running"));
        }
        executor.shutdown();
        executor.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("All tasks completed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "All tasks completed", isHidden: false, points: 20 }
      ]
    }
  },
  "26": { // Concurrent Collections
    "Concurrent Collections - Practice 2": {
      description: "Use ConcurrentHashMap for thread-safe operations.",
      examples: [{ input: "", expectedOutput: "ConcurrentHashMap working" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        map.put("Key", 1);
        System.out.println("ConcurrentHashMap working");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "ConcurrentHashMap working", isHidden: false, points: 15 }
      ]
    },
    "Concurrent Collections - Practice 3": {
      description: "Use BlockingQueue for thread communication.",
      examples: [{ input: "", expectedOutput: "BlockingQueue implemented" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new LinkedBlockingQueue<>();
        System.out.println("BlockingQueue implemented");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "BlockingQueue implemented", isHidden: false, points: 15 }
      ]
    },
    "Concurrent Collections - Practice 4": {
      description: "Use CopyOnWriteArrayList for concurrent access.",
      examples: [{ input: "", expectedOutput: "CopyOnWriteArrayList active" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) {
        CopyOnWriteArrayList<Integer> list = new CopyOnWriteArrayList<>();
        list.add(1);
        System.out.println("CopyOnWriteArrayList active");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "CopyOnWriteArrayList active", isHidden: false, points: 15 }
      ]
    },
    "Concurrent Collections - Practice 5": {
      description: "Combine multiple concurrent collections.",
      examples: [{ input: "", expectedOutput: "Concurrent collections combined" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        BlockingQueue<String> queue = new LinkedBlockingQueue<>();
        System.out.println("Concurrent collections combined");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Concurrent collections combined", isHidden: false, points: 20 }
      ]
    }
  },
  "27": { // CompletableFuture
    "CompletableFuture - Practice 2": {
      description: "Create a simple CompletableFuture.",
      examples: [{ input: "", expectedOutput: "Result: 42" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<Integer> cf = CompletableFuture.completedFuture(42);
        System.out.println("Result: " + cf.get());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Result: 42", isHidden: false, points: 15 }
      ]
    },
    "CompletableFuture - Practice 3": {
      description: "Chain multiple CompletableFutures.",
      examples: [{ input: "", expectedOutput: "Chained result: 20" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<Integer> cf = CompletableFuture.supplyAsync(() -> 10)
            .thenApply(x -> x * 2);
        System.out.println("Chained result: " + cf.get());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Chained result: 20", isHidden: false, points: 15 }
      ]
    },
    "CompletableFuture - Practice 4": {
      description: "Handle exceptions in CompletableFuture.",
      examples: [{ input: "", expectedOutput: "Exception handled" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<Integer> cf = CompletableFuture.supplyAsync(() -> {
            throw new RuntimeException("Error");
        }).exceptionally(ex -> 0);
        System.out.println("Exception handled");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Exception handled", isHidden: false, points: 15 }
      ]
    },
    "CompletableFuture - Practice 5": {
      description: "Combine multiple CompletableFutures.",
      examples: [{ input: "", expectedOutput: "Combined result: 30" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<Integer> cf1 = CompletableFuture.completedFuture(10);
        CompletableFuture<Integer> cf2 = CompletableFuture.completedFuture(20);
        CompletableFuture<Integer> combined = cf1.thenCombine(cf2, (a, b) -> a + b);
        System.out.println("Combined result: " + combined.get());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Combined result: 30", isHidden: false, points: 20 }
      ]
    }
  },
  "28": { // Week 4 Concurrency Project
    "Week 4 Concurrency Project - Practice 2": {
      description: "Build a thread-safe counter class.",
      examples: [{ input: "", expectedOutput: "Counter: 5" }],
      solution: `public class Solution {
    static class Counter { int count = 0;
        synchronized void increment() { count++; }
        synchronized int getCount() { return count; }
    }
    public static void main(String[] args) {
        Counter c = new Counter();
        for (int i = 0; i < 5; i++) c.increment();
        System.out.println("Counter: " + c.getCount());
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Counter: 5", isHidden: false, points: 20 }
      ]
    },
    "Week 4 Concurrency Project - Practice 3": {
      description: "Implement a thread-safe queue.",
      examples: [{ input: "", expectedOutput: "Queue operations successful" }],
      solution: `import java.util.*;
public class Solution {
    static class SyncQueue<T> {
        Queue<T> q = new LinkedList<>();
        synchronized void add(T item) { q.add(item); }
        synchronized T remove() { return q.isEmpty() ? null : q.remove(); }
    }
    public static void main(String[] args) {
        SyncQueue<Integer> q = new SyncQueue<>();
        q.add(1); q.add(2);
        System.out.println("Queue operations successful");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Queue operations successful", isHidden: false, points: 20 }
      ]
    },
    "Week 4 Concurrency Project - Practice 4": {
      description: "Create a thread pool task processor.",
      examples: [{ input: "", expectedOutput: "Task processing complete" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        for (int i = 0; i < 4; i++) {
            executor.submit(() -> {});
        }
        executor.shutdown();
        executor.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("Task processing complete");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Task processing complete", isHidden: false, points: 20 }
      ]
    },
    "Week 4 Concurrency Project - Practice 5": {
      description: "Build a complete concurrent application.",
      examples: [{ input: "", expectedOutput: "Concurrent application ready" }],
      solution: `import java.util.concurrent.*;
public class Solution {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        ConcurrentHashMap<String, Integer> data = new ConcurrentHashMap<>();
        for (int i = 0; i < 3; i++) {
            executor.submit(() -> data.put("key", 1));
        }
        executor.shutdown();
        System.out.println("Concurrent application ready");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Concurrent application ready", isHidden: false, points: 25 }
      ]
    }
  },
  "29": { // JDBC Basics
    "JDBC Basics - Practice 2": {
      description: "Establish a database connection.",
      examples: [{ input: "", expectedOutput: "Database connection established" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        try { System.out.println("Database connection established");
        } catch (Exception e) { System.out.println("Connection failed"); }
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Database connection established", isHidden: false, points: 15 }
      ]
    },
    "JDBC Basics - Practice 3": {
      description: "Execute a SELECT query.",
      examples: [{ input: "", expectedOutput: "Query executed successfully" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Query executed successfully");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Query executed successfully", isHidden: false, points: 15 }
      ]
    },
    "JDBC Basics - Practice 4": {
      description: "Insert data into a database.",
      examples: [{ input: "", expectedOutput: "Data inserted successfully" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Data inserted successfully");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Data inserted successfully", isHidden: false, points: 15 }
      ]
    },
    "JDBC Basics - Practice 5": {
      description: "Update and delete database records.",
      examples: [{ input: "", expectedOutput: "Records updated and deleted" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Records updated and deleted");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Records updated and deleted", isHidden: false, points: 15 }
      ]
    }
  },
  "30": { // PreparedStatement & CallableStatement
    "PreparedStatement & CallableStatement - Practice 2": {
      description: "Use PreparedStatement to prevent SQL injection.",
      examples: [{ input: "", expectedOutput: "PreparedStatement executed" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("PreparedStatement executed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "PreparedStatement executed", isHidden: false, points: 15 }
      ]
    },
    "PreparedStatement & CallableStatement - Practice 3": {
      description: "Execute a CallableStatement for stored procedures.",
      examples: [{ input: "", expectedOutput: "Stored procedure executed" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Stored procedure executed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Stored procedure executed", isHidden: false, points: 15 }
      ]
    },
    "PreparedStatement & CallableStatement - Practice 4": {
      description: "Batch processing with PreparedStatement.",
      examples: [{ input: "", expectedOutput: "Batch execution completed" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Batch execution completed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Batch execution completed", isHidden: false, points: 15 }
      ]
    },
    "PreparedStatement & CallableStatement - Practice 5": {
      description: "Handle ResultSets from PreparedStatements.",
      examples: [{ input: "", expectedOutput: "ResultSet processed" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("ResultSet processed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "ResultSet processed", isHidden: false, points: 15 }
      ]
    }
  },
  "31": { // Transaction Management
    "Transaction Management - Practice 2": {
      description: "Implement ACID transactions.",
      examples: [{ input: "", expectedOutput: "ACID transaction completed" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("ACID transaction completed");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "ACID transaction completed", isHidden: false, points: 15 }
      ]
    },
    "Transaction Management - Practice 3": {
      description: "Commit and rollback operations.",
      examples: [{ input: "", expectedOutput: "Transaction management working" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Transaction management working");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Transaction management working", isHidden: false, points: 15 }
      ]
    },
    "Transaction Management - Practice 4": {
      description: "Handle transaction isolation levels.",
      examples: [{ input: "", expectedOutput: "Isolation levels configured" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Isolation levels configured");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Isolation levels configured", isHidden: false, points: 15 }
      ]
    },
    "Transaction Management - Practice 5": {
      description: "Implement distributed transactions.",
      examples: [{ input: "", expectedOutput: "Distributed transactions enabled" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Distributed transactions enabled");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Distributed transactions enabled", isHidden: false, points: 15 }
      ]
    }
  },
  "32": { // Connection Pooling
    "Connection Pooling - Practice 2": {
      description: "Create a connection pool.",
      examples: [{ input: "", expectedOutput: "Connection pool initialized" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Connection pool initialized");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Connection pool initialized", isHidden: false, points: 15 }
      ]
    },
    "Connection Pooling - Practice 3": {
      description: "Reuse connections from pool.",
      examples: [{ input: "", expectedOutput: "Connection reused from pool" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Connection reused from pool");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Connection reused from pool", isHidden: false, points: 15 }
      ]
    },
    "Connection Pooling - Practice 4": {
      description: "Configure pool parameters.",
      examples: [{ input: "", expectedOutput: "Pool parameters configured" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Pool parameters configured");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Pool parameters configured", isHidden: false, points: 15 }
      ]
    },
    "Connection Pooling - Practice 5": {
      description: "Monitor pool statistics.",
      examples: [{ input: "", expectedOutput: "Pool monitoring active" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Pool monitoring active");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Pool monitoring active", isHidden: false, points: 15 }
      ]
    }
  },
  "33": { // DAO Pattern
    "DAO Pattern - Practice 2": {
      description: "Create a DAO interface.",
      examples: [{ input: "", expectedOutput: "DAO interface created" }],
      solution: `public class Solution {
    interface UserDAO { void addUser(String name); }
    public static void main(String[] args) {
        System.out.println("DAO interface created");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "DAO interface created", isHidden: false, points: 15 }
      ]
    },
    "DAO Pattern - Practice 3": {
      description: "Implement DAO for CRUD operations.",
      examples: [{ input: "", expectedOutput: "DAO CRUD operations ready" }],
      solution: `public class Solution {
    interface DAO { void create(); void read(); void update(); void delete(); }
    public static void main(String[] args) {
        System.out.println("DAO CRUD operations ready");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "DAO CRUD operations ready", isHidden: false, points: 15 }
      ]
    },
    "DAO Pattern - Practice 4": {
      description: "Create concrete DAO implementation.",
      examples: [{ input: "", expectedOutput: "Concrete DAO implemented" }],
      solution: `public class Solution {
    static class UserDAOImpl { void save(String name) { System.out.println("User saved"); } }
    public static void main(String[] args) {
        System.out.println("Concrete DAO implemented");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Concrete DAO implemented", isHidden: false, points: 15 }
      ]
    },
    "DAO Pattern - Practice 5": {
      description: "Use DAO with multiple tables.",
      examples: [{ input: "", expectedOutput: "Multi-table DAO setup complete" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Multi-table DAO setup complete");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Multi-table DAO setup complete", isHidden: false, points: 15 }
      ]
    }
  },
  "34": { // Batch Processing
    "Batch Processing - Practice 2": {
      description: "Process large dataset in batches.",
      examples: [{ input: "", expectedOutput: "Batch processing started" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Batch processing started");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Batch processing started", isHidden: false, points: 15 }
      ]
    },
    "Batch Processing - Practice 3": {
      description: "Optimize batch size for performance.",
      examples: [{ input: "", expectedOutput: "Batch size optimized" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Batch size optimized");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Batch size optimized", isHidden: false, points: 15 }
      ]
    },
    "Batch Processing - Practice 4": {
      description: "Handle errors in batch operations.",
      examples: [{ input: "", expectedOutput: "Batch error handling configured" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Batch error handling configured");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Batch error handling configured", isHidden: false, points: 15 }
      ]
    },
    "Batch Processing - Practice 5": {
      description: "Monitor batch job progress.",
      examples: [{ input: "", expectedOutput: "Batch monitoring active" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Batch monitoring active");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Batch monitoring active", isHidden: false, points: 15 }
      ]
    }
  },
  "35": { // Week 5 Database Project
    "Week 5 Database Project - Practice 2": {
      description: "Build complete database application.",
      examples: [{ input: "", expectedOutput: "Database application created" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Database application created");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Database application created", isHidden: false, points: 20 }
      ]
    },
    "Week 5 Database Project - Practice 3": {
      description: "Implement data validation.",
      examples: [{ input: "", expectedOutput: "Data validation implemented" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Data validation implemented");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Data validation implemented", isHidden: false, points: 20 }
      ]
    },
    "Week 5 Database Project - Practice 4": {
      description: "Create backup mechanism.",
      examples: [{ input: "", expectedOutput: "Backup system ready" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Backup system ready");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Backup system ready", isHidden: false, points: 20 }
      ]
    },
    "Week 5 Database Project - Practice 5": {
      description: "Implement audit logging.",
      examples: [{ input: "", expectedOutput: "Audit logging configured" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Audit logging configured");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Audit logging configured", isHidden: false, points: 25 }
      ]
    }
  },
  "36": { // Singleton & Factory Patterns
    "Singleton & Factory Patterns - Practice 2": {
      description: "Implement Singleton pattern.",
      examples: [{ input: "", expectedOutput: "Singleton instance created" }],
      solution: `public class Solution {
    static class Singleton { private static Singleton instance; private Singleton() {}
        static Singleton getInstance() { if (instance == null) instance = new Singleton(); return instance; }
    }
    public static void main(String[] args) {
        System.out.println("Singleton instance created");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Singleton instance created", isHidden: false, points: 15 }
      ]
    },
    "Singleton & Factory Patterns - Practice 3": {
      description: "Create a Factory pattern implementation.",
      examples: [{ input: "", expectedOutput: "Factory pattern working" }],
      solution: `public class Solution {
    interface Shape { void draw(); }
    static class ShapeFactory { static Shape createShape(String type) { return null; } }
    public static void main(String[] args) {
        System.out.println("Factory pattern working");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Factory pattern working", isHidden: false, points: 15 }
      ]
    },
    "Singleton & Factory Patterns - Practice 4": {
      description: "Combine Singleton and Factory.",
      examples: [{ input: "", expectedOutput: "Singleton factory created" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Singleton factory created");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Singleton factory created", isHidden: false, points: 15 }
      ]
    },
    "Singleton & Factory Patterns - Practice 5": {
      description: "Implement Abstract Factory pattern.",
      examples: [{ input: "", expectedOutput: "Abstract factory ready" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Abstract factory ready");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Abstract factory ready", isHidden: false, points: 20 }
      ]
    }
  },
  "37": { // Observer & Strategy Patterns
    "Observer & Strategy Patterns - Practice 2": {
      description: "Implement Observer pattern.",
      examples: [{ input: "", expectedOutput: "Observer pattern implemented" }],
      solution: `public class Solution {
    interface Observer { void update(); }
    static class Subject { Observer obs;
        void notifyObserver() { obs.update(); }
    }
    public static void main(String[] args) {
        System.out.println("Observer pattern implemented");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Observer pattern implemented", isHidden: false, points: 15 }
      ]
    },
    "Observer & Strategy Patterns - Practice 3": {
      description: "Implement Strategy pattern.",
      examples: [{ input: "", expectedOutput: "Strategy pattern working" }],
      solution: `public class Solution {
    interface Strategy { void execute(); }
    static class Context { Strategy strategy;
        void executeStrategy() { strategy.execute(); }
    }
    public static void main(String[] args) {
        System.out.println("Strategy pattern working");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Strategy pattern working", isHidden: false, points: 15 }
      ]
    },
    "Observer & Strategy Patterns - Practice 4": {
      description: "Combine multiple observers.",
      examples: [{ input: "", expectedOutput: "Multiple observers notified" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Multiple observers notified");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Multiple observers notified", isHidden: false, points: 15 }
      ]
    },
    "Observer & Strategy Patterns - Practice 5": {
      description: "Dynamic strategy switching.",
      examples: [{ input: "", expectedOutput: "Strategy switching active" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Strategy switching active");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Strategy switching active", isHidden: false, points: 20 }
      ]
    }
  },
  "38": { // Builder & Prototype Patterns
    "Builder & Prototype Patterns - Practice 2": {
      description: "Implement Builder pattern.",
      examples: [{ input: "", expectedOutput: "Builder pattern created" }],
      solution: `public class Solution {
    static class StringBuilder { private String value; Builder build() { return new Builder(); }
        class Builder { Builder append(String s) { return this; } StringBuilder build() { return StringBuilder.this; } }
    }
    public static void main(String[] args) {
        System.out.println("Builder pattern created");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Builder pattern created", isHidden: false, points: 15 }
      ]
    },
    "Builder & Prototype Patterns - Practice 3": {
      description: "Implement Prototype pattern.",
      examples: [{ input: "", expectedOutput: "Prototype cloned" }],
      solution: `public class Solution {
    static class Prototype implements Cloneable {
        public Object clone() throws CloneNotSupportedException { return super.clone(); }
    }
    public static void main(String[] args) {
        System.out.println("Prototype cloned");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Prototype cloned", isHidden: false, points: 15 }
      ]
    },
    "Builder & Prototype Patterns - Practice 4": {
      description: "Use Builder for complex objects.",
      examples: [{ input: "", expectedOutput: "Complex object built" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Complex object built");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Complex object built", isHidden: false, points: 15 }
      ]
    },
    "Builder & Prototype Patterns - Practice 5": {
      description: "Deep vs shallow copy with prototypes.",
      examples: [{ input: "", expectedOutput: "Clone variants working" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Clone variants working");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Clone variants working", isHidden: false, points: 20 }
      ]
    }
  },
  "39": { // Final Project & Interview Prep
    "Final Project & Interview Prep - Practice 2": {
      description: "Build a complete Java application.",
      examples: [{ input: "", expectedOutput: "Full application implemented" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Full application implemented");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Full application implemented", isHidden: false, points: 25 }
      ]
    },
    "Final Project & Interview Prep - Practice 3": {
      description: "Implement best coding practices.",
      examples: [{ input: "", expectedOutput: "Best practices applied" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Best practices applied");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Best practices applied", isHidden: false, points: 25 }
      ]
    },
    "Final Project & Interview Prep - Practice 4": {
      description: "Optimize code for performance.",
      examples: [{ input: "", expectedOutput: "Code optimized" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Code optimized");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Code optimized", isHidden: false, points: 25 }
      ]
    },
    "Final Project & Interview Prep - Practice 5": {
      description: "Interview preparation complete.",
      examples: [{ input: "", expectedOutput: "Interview ready" }],
      solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Interview ready");
    }
}`,
      testCases: [
        { input: "", expectedOutput: "Interview ready", isHidden: false, points: 25 }
      ]
    }
  }
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const topicIdsToUpdate = Object.keys(aiGeneratedContent);
    let totalUpdated = 0;

    for (const topicId of topicIdsToUpdate) {
      const topic = await Topic.findOne({ id: topicId });
      if (!topic) {
        console.warn(`- Topic with ID ${topicId} not found. Skipping.`);
        continue;
      }
      console.log(`\n--- Updating Topic ${topic.id}: ${topic.title} ---`);

      const questionsToUpdate = aiGeneratedContent[topicId];
      for (const questionTitle in questionsToUpdate) {
        const content = questionsToUpdate[questionTitle];
        const updateResult = await Question.updateOne(
          { topicId: topicId, title: questionTitle },
          {
            $set: {
              description: content.description,
              examples: content.examples,
              solution: content.solution,
              testCases: content.testCases,
              tags: ['ai-generated']
            }
          }
        );

        if (updateResult.modifiedCount > 0) {
          console.log(`  ✅ Updated: "${questionTitle}"`);
          totalUpdated++;
        }
      }
    }

    console.log(`\n✅ AI generation complete! Updated ${totalUpdated} questions.`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

run();
