import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

// Generate meaningful examples based on question title
function generateMeaningfulExamples(title: string, description: string): any[] {
  const examples: any[] = [];

  if (title.toLowerCase().includes('hello') || title.toLowerCase().includes('print')) {
    examples.push({
      input: "",
      output: "Hello, World!"
    });
    examples.push({
      input: "",
      output: "Output from your program"
    });
  } else if (title.toLowerCase().includes('sum') || title.toLowerCase().includes('add')) {
    examples.push({
      input: "5\n3",
      output: "8"
    });
    examples.push({
      input: "10\n20",
      output: "30"
    });
  } else if (title.toLowerCase().includes('even') || title.toLowerCase().includes('odd')) {
    examples.push({
      input: "4",
      output: "4 is even"
    });
    examples.push({
      input: "7",
      output: "7 is odd"
    });
  } else if (title.toLowerCase().includes('factorial')) {
    examples.push({
      input: "5",
      output: "120"
    });
    examples.push({
      input: "3",
      output: "6"
    });
  } else if (title.toLowerCase().includes('fibonacci')) {
    examples.push({
      input: "5",
      output: "0 1 1 2 3"
    });
    examples.push({
      input: "3",
      output: "0 1 1"
    });
  } else if (title.toLowerCase().includes('prime')) {
    examples.push({
      input: "17",
      output: "17 is a prime number"
    });
    examples.push({
      input: "20",
      output: "20 is not a prime number"
    });
  } else if (title.toLowerCase().includes('palindrome')) {
    examples.push({
      input: "racecar",
      output: "racecar is a palindrome"
    });
    examples.push({
      input: "hello",
      output: "hello is not a palindrome"
    });
  } else if (title.toLowerCase().includes('reverse')) {
    examples.push({
      input: "12345",
      output: "54321"
    });
    examples.push({
      input: "hello",
      output: "olleh"
    });
  } else if (title.toLowerCase().includes('count')) {
    examples.push({
      input: "hello",
      output: "5"
    });
    examples.push({
      input: "java",
      output: "4"
    });
  } else if (title.toLowerCase().includes('largest') || title.toLowerCase().includes('maximum')) {
    examples.push({
      input: "10 5 20 3",
      output: "20"
    });
    examples.push({
      input: "100 50 75",
      output: "100"
    });
  } else if (title.toLowerCase().includes('smallest') || title.toLowerCase().includes('minimum')) {
    examples.push({
      input: "10 5 20 3",
      output: "3"
    });
    examples.push({
      input: "100 50 75",
      output: "50"
    });
  } else if (title.toLowerCase().includes('average')) {
    examples.push({
      input: "10\n20\n30",
      output: "20.0"
    });
    examples.push({
      input: "5\n5\n5",
      output: "5.0"
    });
  } else if (title.toLowerCase().includes('loop')) {
    examples.push({
      input: "5",
      output: "1\n2\n3\n4\n5"
    });
    examples.push({
      input: "3",
      output: "1\n2\n3"
    });
  } else {
    // Generic fallback
    examples.push({
      input: "Sample Input 1",
      output: "Sample Output 1"
    });
    examples.push({
      input: "Sample Input 2",
      output: "Sample Output 2"
    });
  }

  return examples;
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all questions
    const questions = await Question.find();
    let totalUpdated = 0;

    for (const question of questions) {
      const examples = generateMeaningfulExamples(question.title, question.description);

      // Update the question with meaningful examples
      const updateResult = await Question.updateOne(
        { _id: question._id },
        {
          $set: {
            examples: examples
          }
        }
      );

      if (updateResult.modifiedCount > 0) {
        totalUpdated++;
        if (totalUpdated % 20 === 0) {
          console.log(`  📊 Updated ${totalUpdated} questions with meaningful examples...`);
        }
      }
    }

    console.log(`\n✅ Examples populated!`);
    console.log(`📋 Updated ${totalUpdated} questions with meaningful examples based on their titles`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

run();
