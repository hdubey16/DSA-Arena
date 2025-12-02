import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question';
import Topic from '../models/Topic';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

// --- AI-Generated Content Store ---
// In a real scenario, this would come from an AI API call.
// For this simulation, we'll store the generated content here.
const aiGeneratedContent: { [key: string]: any } = {
    "3": { // Topic ID for "Operators in Java"
        "Operators in Java - Practice 2": {
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
        "Operators in Java - Practice 3": {
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
        "Operators in Java - Practice 4": {
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
        "Operators in Java - Practice 5": {
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
        }
    }
    // More topics will be added here...
};

async function run() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const topicIdsToUpdate = Object.keys(aiGeneratedContent);

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
                            tags: ['ai-generated', 'operators']
                        }
                    }
                );

                if (updateResult.modifiedCount > 0) {
                    console.log(`  ✅ Updated question: "${questionTitle}"`);
                } else {
                    console.log(`  - Question "${questionTitle}" not found or already up-to-date.`);
                }
            }
        }

        console.log('\n✅ AI content generation script finished.');
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        await mongoose.connection.close();
        process.exit(1);
    }
}

run();
