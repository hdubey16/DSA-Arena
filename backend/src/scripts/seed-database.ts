import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Topic from '../models/Topic';
import Question from '../models/Question';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

const adminUser = {
  name: 'Admin User',
  email: 'admin@javaprep.com',
  password: 'admin123', // Will be hashed by the pre-save hook
  role: 'admin',
  status: 'active',
  lastLogin: null,
  sessions: []
};

const topics = [
  // Week 1 - Java Fundamentals
  { id: '1', title: "Introduction to Java", description: "Learn the basics of Java programming language, its history, features, and setup.", week: 1, day: 1, difficulty: "Easy", estimatedTime: 120, prerequisites: [], compulsoryQuestion: 'intro-java-basics', isLocked: false },
  { id: '2', title: "Variables and Data Types", description: "Understanding primitive and reference data types in Java.", week: 1, day: 2, difficulty: "Easy", estimatedTime: 120, prerequisites: ['1'], compulsoryQuestion: 'variables-datatypes', isLocked: false },
  { id: '3', title: "Operators in Java", description: "Explore arithmetic, relational, logical, and bitwise operators.", week: 1, day: 3, difficulty: "Easy", estimatedTime: 120, prerequisites: ['2'], compulsoryQuestion: 'operators-basics', isLocked: false },
  { id: '4', title: "Control Flow Statements", description: "Master if-else, switch, and ternary operators for decision making.", week: 1, day: 4, difficulty: "Easy", estimatedTime: 150, prerequisites: ['3'], compulsoryQuestion: 'control-flow', isLocked: false },
  { id: '5', title: "Loops in Java", description: "Learn for, while, do-while loops and loop control statements.", week: 1, day: 5, difficulty: "Easy", estimatedTime: 150, prerequisites: ['4'], compulsoryQuestion: 'loops-basics', isLocked: false },
  { id: '6', title: "Arrays and ArrayList", description: "Work with single and multi-dimensional arrays and ArrayList collections.", week: 1, day: 6, difficulty: "Medium", estimatedTime: 180, prerequisites: ['5'], compulsoryQuestion: 'arrays-arraylist', isLocked: false },
  { id: '7', title: "Week 1 Practice Challenge", description: "Comprehensive coding challenges covering Week 1 topics.", week: 1, day: 7, difficulty: "Medium", estimatedTime: 180, prerequisites: ['6'], compulsoryQuestion: 'week1-challenge', isLocked: false },

  // Week 2 - Object-Oriented Programming
  { id: '8', title: "Classes and Objects", description: "Introduction to OOP concepts, creating classes and objects.", week: 2, day: 8, difficulty: "Medium", estimatedTime: 180, prerequisites: ['7'], compulsoryQuestion: 'classes-objects', isLocked: false },
  { id: '9', title: "Constructors and Methods", description: "Understanding constructors, method overloading, and this keyword.", week: 2, day: 9, difficulty: "Medium", estimatedTime: 150, prerequisites: ['8'], compulsoryQuestion: 'constructors-methods', isLocked: false },
  { id: '10', title: "Inheritance", description: "Learn about inheritance, super keyword, and method overriding.", week: 2, day: 10, difficulty: "Medium", estimatedTime: 180, prerequisites: ['9'], compulsoryQuestion: 'inheritance', isLocked: false },
  { id: '11', title: "Polymorphism", description: "Master compile-time and runtime polymorphism in Java.", week: 2, day: 11, difficulty: "Medium", estimatedTime: 180, prerequisites: ['10'], compulsoryQuestion: 'polymorphism', isLocked: false },
  { id: '12', title: "Abstraction", description: "Work with abstract classes and interfaces for abstraction.", week: 2, day: 12, difficulty: "Medium", estimatedTime: 180, prerequisites: ['11'], compulsoryQuestion: 'abstraction', isLocked: false },
  { id: '13', title: "Encapsulation", description: "Implement data hiding and encapsulation principles.", week: 2, day: 13, difficulty: "Medium", estimatedTime: 150, prerequisites: ['12'], compulsoryQuestion: 'encapsulation', isLocked: false },
  { id: '14', title: "Week 2 OOP Project", description: "Build a complete project applying all OOP concepts.", week: 2, day: 14, difficulty: "Hard", estimatedTime: 240, prerequisites: ['13'], compulsoryQuestion: 'week2-oop-project', isLocked: false },

  // Week 3 - Advanced Java Concepts
  { id: '15', title: "Exception Handling", description: "Learn try-catch-finally, custom exceptions, and best practices.", week: 3, day: 15, difficulty: "Medium", estimatedTime: 180, prerequisites: ['14'], compulsoryQuestion: 'exception-handling', isLocked: false },
  { id: '16', title: "File Handling", description: "Read and write files using Java I/O streams.", week: 3, day: 16, difficulty: "Medium", estimatedTime: 180, prerequisites: ['15'], compulsoryQuestion: 'file-handling', isLocked: false },
  { id: '17', title: "Collections Framework", description: "Deep dive into List, Set, Map, and Queue interfaces.", week: 3, day: 17, difficulty: "Hard", estimatedTime: 210, prerequisites: ['16'], compulsoryQuestion: 'collections-framework', isLocked: true },
  { id: '18', title: "Generics in Java", description: "Understand generic classes, methods, and bounded type parameters.", week: 3, day: 18, difficulty: "Hard", estimatedTime: 180, prerequisites: ['17'], compulsoryQuestion: 'generics', isLocked: true },
  { id: '19', title: "Lambda Expressions", description: "Functional programming with lambda expressions and functional interfaces.", week: 3, day: 19, difficulty: "Hard", estimatedTime: 180, prerequisites: ['18'], compulsoryQuestion: 'lambda-expressions', isLocked: true },
  { id: '20', title: "Stream API", description: "Process collections using the powerful Stream API.", week: 3, day: 20, difficulty: "Hard", estimatedTime: 210, prerequisites: ['19'], compulsoryQuestion: 'stream-api', isLocked: true },
  { id: '21', title: "Week 3 Advanced Challenge", description: "Complex problems combining all Week 3 concepts.", week: 3, day: 21, difficulty: "Hard", estimatedTime: 240, prerequisites: ['20'], compulsoryQuestion: 'week3-challenge', isLocked: true },

  // Week 4 - Multithreading and Concurrency
  { id: '22', title: "Introduction to Threads", description: "Create and manage threads in Java applications.", week: 4, day: 22, difficulty: "Hard", estimatedTime: 180, prerequisites: ['21'], compulsoryQuestion: 'threads-intro', isLocked: true },
  { id: '23', title: "Thread Synchronization", description: "Implement thread safety using synchronized blocks and methods.", week: 4, day: 23, difficulty: "Hard", estimatedTime: 210, prerequisites: ['22'], compulsoryQuestion: 'thread-sync', isLocked: true },
  { id: '24', title: "Inter-thread Communication", description: "Master wait(), notify(), and notifyAll() methods.", week: 4, day: 24, difficulty: "Hard", estimatedTime: 180, prerequisites: ['23'], compulsoryQuestion: 'inter-thread', isLocked: true },
  { id: '25', title: "Executor Framework", description: "Use thread pools and executors for concurrent programming.", week: 4, day: 25, difficulty: "Hard", estimatedTime: 180, prerequisites: ['24'], compulsoryQuestion: 'executor-framework', isLocked: true },
  { id: '26', title: "Concurrent Collections", description: "Work with thread-safe collections like ConcurrentHashMap.", week: 4, day: 26, difficulty: "Hard", estimatedTime: 180, prerequisites: ['25'], compulsoryQuestion: 'concurrent-collections', isLocked: true },
  { id: '27', title: "CompletableFuture", description: "Asynchronous programming with CompletableFuture API.", week: 4, day: 27, difficulty: "Hard", estimatedTime: 210, prerequisites: ['26'], compulsoryQuestion: 'completable-future', isLocked: true },
  { id: '28', title: "Week 4 Concurrency Project", description: "Build a multi-threaded application from scratch.", week: 4, day: 28, difficulty: "Hard", estimatedTime: 240, prerequisites: ['27'], compulsoryQuestion: 'week4-concurrency', isLocked: true },

  // Week 5 - Database Connectivity (JDBC)
  { id: '29', title: "JDBC Basics", description: "Connect Java applications to databases using JDBC.", week: 5, day: 29, difficulty: "Medium", estimatedTime: 180, prerequisites: ['28'], compulsoryQuestion: 'jdbc-basics', isLocked: true },
  { id: '30', title: "PreparedStatement & CallableStatement", description: "Execute parameterized queries and stored procedures.", week: 5, day: 30, difficulty: "Medium", estimatedTime: 180, prerequisites: ['29'], compulsoryQuestion: 'prepared-statement', isLocked: true },
  { id: '31', title: "Transaction Management", description: "Handle database transactions with commit and rollback.", week: 5, day: 31, difficulty: "Hard", estimatedTime: 180, prerequisites: ['30'], compulsoryQuestion: 'transaction-mgmt', isLocked: true },
  { id: '32', title: "Connection Pooling", description: "Optimize database connections using connection pooling.", week: 5, day: 32, difficulty: "Hard", estimatedTime: 180, prerequisites: ['31'], compulsoryQuestion: 'connection-pooling', isLocked: true },
  { id: '33', title: "DAO Pattern", description: "Implement Data Access Object pattern for clean architecture.", week: 5, day: 33, difficulty: "Hard", estimatedTime: 210, prerequisites: ['32'], compulsoryQuestion: 'dao-pattern', isLocked: true },
  { id: '34', title: "Batch Processing", description: "Execute multiple SQL statements in batches for performance.", week: 5, day: 34, difficulty: "Hard", estimatedTime: 180, prerequisites: ['33'], compulsoryQuestion: 'batch-processing', isLocked: true },
  { id: '35', title: "Week 5 Database Project", description: "Build a complete CRUD application with JDBC.", week: 5, day: 35, difficulty: "Hard", estimatedTime: 240, prerequisites: ['34'], compulsoryQuestion: 'week5-database', isLocked: true },

  // Week 6 - Design Patterns & Best Practices
  { id: '36', title: "Singleton & Factory Patterns", description: "Implement creational design patterns.", week: 6, day: 36, difficulty: "Hard", estimatedTime: 180, prerequisites: ['35'], compulsoryQuestion: 'singleton-factory', isLocked: true },
  { id: '37', title: "Observer & Strategy Patterns", description: "Master behavioral design patterns for flexible code.", week: 6, day: 37, difficulty: "Hard", estimatedTime: 180, prerequisites: ['36'], compulsoryQuestion: 'observer-strategy', isLocked: true },
  { id: '38', title: "Builder & Prototype Patterns", description: "Advanced object creation patterns.", week: 6, day: 38, difficulty: "Hard", estimatedTime: 180, prerequisites: ['37'], compulsoryQuestion: 'builder-prototype', isLocked: true },
  { id: '39', title: "Final Project & Interview Prep", description: "Capstone project and interview preparation.", week: 6, day: 39, difficulty: "Hard", estimatedTime: 300, prerequisites: ['38'], compulsoryQuestion: 'final-project', isLocked: true }
];

const sampleQuestions = [
  {
    topicId: '1',
    title: "Hello World Program",
    description: "Write a Java program that prints 'Hello, World!' to the console.",
    starterCode: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
        
    }
}`,
    solution: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    difficulty: "Easy",
    type: "practice",
    isCompulsory: false,
    points: 10,
    timeLimit: 300,
    testCases: [
      {
        input: "",
        expectedOutput: "Hello, World!",
        isHidden: false,
        points: 10
      }
    ],
    hints: [
      "Use System.out.println() to print to console",
      "Don't forget the semicolon at the end"
    ],
    tags: ["basics", "output"]
  },
  {
    topicId: '1',
    title: "Sum of Two Numbers",
    description: "Write a method that takes two integers and returns their sum.",
    starterCode: `public class Solution {
    public static int sum(int a, int b) {
        // Write your code here
        
    }
    
    public static void main(String[] args) {
        System.out.println(sum(5, 3));
    }
}`,
    solution: `public class Solution {
    public static int sum(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        System.out.println(sum(5, 3));
    }
}`,
    difficulty: "Easy",
    type: "practice",
    isCompulsory: false,
    points: 15,
    timeLimit: 300,
    testCases: [
      {
        input: "5, 3",
        expectedOutput: "8",
        isHidden: false,
        points: 4
      },
      {
        input: "-10, 25",
        expectedOutput: "15",
        isHidden: false,
        points: 4
      },
      {
        input: "0, 0",
        expectedOutput: "0",
        isHidden: true,
        points: 4
      },
      {
        input: "100, -50",
        expectedOutput: "50",
        isHidden: true,
        points: 3
      }
    ],
    hints: [
      "Use the + operator to add two numbers",
      "The return type should be int"
    ],
    tags: ["basics", "arithmetic", "methods"]
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Topic.deleteMany({});
    await Question.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = new User(adminUser);
    await admin.save(); // Password will be hashed by pre-save hook
    console.log('✅ Admin user created: admin@javaprep.com (password: admin123)\n');

    // Create topics
    console.log('📚 Creating topics...');
    const createdTopics = await Topic.insertMany(topics);
    console.log(`✅ ${createdTopics.length} topics created\n`);

    // Create sample questions
    console.log('❓ Creating sample questions...');
    const createdQuestions = await Question.insertMany(sampleQuestions);
    console.log(`✅ ${createdQuestions.length} sample questions created\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Admin Users: 1`);
    console.log(`   - Topics: ${createdTopics.length}`);
    console.log(`   - Questions: ${createdQuestions.length}`);
    console.log(`   - Days 1-16: Unlocked`);
    console.log(`   - Days 17-39: Locked\n`);
    
    console.log('🔐 Admin Credentials:');
    console.log('   Email: admin@javaprep.com');
    console.log('   Password: admin123\n');

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedDatabase();
