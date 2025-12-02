import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question';
import Topic from '../models/Topic';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

// Generate 2 examples and 10 test cases (2 open + 8 hidden) for each question
function generateExamplesAndTestCases(title: string, difficulty: string, topicId: string): {
  examples: any[];
  testCases: any[];
} {
  const points = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 15 : 25;
  const examples: any[] = [];
  const testCases: any[] = [];

  // Helper functions
  const createExample = (input: string, output: string) => ({ input, output });
  const createTestCase = (input: string, expectedOutput: string, isHidden: boolean, points: number) => ({
    input,
    expectedOutput,
    isHidden,
    points
  });

  // Generate based on question type
  if (title.includes('Practice 2') || title.includes('basics')) {
    // Easy questions
    examples.push(createExample('5', '5'));
    examples.push(createExample('10', '10'));
    
    testCases.push(createTestCase('5', '5', false, points));
    testCases.push(createTestCase('10', '10', false, points));
    testCases.push(createTestCase('1', '1', true, points));
    testCases.push(createTestCase('0', '0', true, points));
    testCases.push(createTestCase('100', '100', true, points));
    testCases.push(createTestCase('7', '7', true, points));
    testCases.push(createTestCase('3', '3', true, points));
    testCases.push(createTestCase('99', '99', true, points));
    testCases.push(createTestCase('42', '42', true, points));
    testCases.push(createTestCase('50', '50', true, points));

  } else if (title.includes('Practice 3')) {
    // Medium questions
    examples.push(createExample('10\n5', 'Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2'));
    examples.push(createExample('20\n4', 'Sum: 24\nDifference: 16\nProduct: 80\nQuotient: 5'));
    
    testCases.push(createTestCase('10\n5', 'Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2', false, points));
    testCases.push(createTestCase('20\n4', 'Sum: 24\nDifference: 16\nProduct: 80\nQuotient: 5', false, points));
    testCases.push(createTestCase('100\n25', 'Sum: 125\nDifference: 75\nProduct: 2500\nQuotient: 4', true, points));
    testCases.push(createTestCase('50\n10', 'Sum: 60\nDifference: 40\nProduct: 500\nQuotient: 5', true, points));
    testCases.push(createTestCase('7\n3', 'Sum: 10\nDifference: 4\nProduct: 21\nQuotient: 2', true, points));
    testCases.push(createTestCase('15\n5', 'Sum: 20\nDifference: 10\nProduct: 75\nQuotient: 3', true, points));
    testCases.push(createTestCase('30\n6', 'Sum: 36\nDifference: 24\nProduct: 180\nQuotient: 5', true, points));
    testCases.push(createTestCase('12\n8', 'Sum: 20\nDifference: 4\nProduct: 96\nQuotient: 1', true, points));
    testCases.push(createTestCase('25\n5', 'Sum: 30\nDifference: 20\nProduct: 125\nQuotient: 5', true, points));
    testCases.push(createTestCase('60\n15', 'Sum: 75\nDifference: 45\nProduct: 900\nQuotient: 4', true, points));

  } else if (title.includes('Practice 4')) {
    // Medium-Hard questions
    examples.push(createExample('8', '8 is a power of 2: true'));
    examples.push(createExample('10', '10 is a power of 2: false'));
    
    testCases.push(createTestCase('8', '8 is a power of 2: true', false, points));
    testCases.push(createTestCase('10', '10 is a power of 2: false', false, points));
    testCases.push(createTestCase('16', '16 is a power of 2: true', true, points));
    testCases.push(createTestCase('1', '1 is a power of 2: true', true, points));
    testCases.push(createTestCase('32', '32 is a power of 2: true', true, points));
    testCases.push(createTestCase('7', '7 is a power of 2: false', true, points));
    testCases.push(createTestCase('64', '64 is a power of 2: true', true, points));
    testCases.push(createTestCase('100', '100 is a power of 2: false', true, points));
    testCases.push(createTestCase('128', '128 is a power of 2: true', true, points));
    testCases.push(createTestCase('63', '63 is a power of 2: false', true, points));

  } else if (title.includes('Practice 5')) {
    // Hard questions
    examples.push(createExample('17', '17 is a prime number'));
    examples.push(createExample('20', '20 is not a prime number'));
    
    testCases.push(createTestCase('17', '17 is a prime number', false, points));
    testCases.push(createTestCase('20', '20 is not a prime number', false, points));
    testCases.push(createTestCase('2', '2 is a prime number', true, points));
    testCases.push(createTestCase('29', '29 is a prime number', true, points));
    testCases.push(createTestCase('30', '30 is not a prime number', true, points));
    testCases.push(createTestCase('97', '97 is a prime number', true, points));
    testCases.push(createTestCase('100', '100 is not a prime number', true, points));
    testCases.push(createTestCase('13', '13 is a prime number', true, points));
    testCases.push(createTestCase('25', '25 is not a prime number', true, points));
    testCases.push(createTestCase('31', '31 is a prime number', true, points));
  }

  // Default if not enough generated
  if (examples.length === 0) {
    examples.push(createExample('', 'Example 1'));
    examples.push(createExample('', 'Example 2'));
  }

  if (testCases.length === 0) {
    testCases.push(createTestCase('', 'Test 1', false, points));
    testCases.push(createTestCase('', 'Test 2', false, points));
    for (let i = 0; i < 8; i++) {
      testCases.push(createTestCase('', `Hidden ${i + 1}`, true, points));
    }
  }

  return { examples, testCases };
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all questions
    const questions = await Question.find();
    let totalUpdated = 0;

    for (const question of questions) {
      const { examples, testCases } = generateExamplesAndTestCases(
        question.title,
        question.difficulty,
        question.topicId
      );

      // Update the question with examples and test cases
      const updateResult = await Question.updateOne(
        { _id: question._id },
        {
          $set: {
            examples: examples,
            testCases: testCases
          }
        }
      );

      if (updateResult.modifiedCount > 0) {
        totalUpdated++;
        if (totalUpdated % 20 === 0) {
          console.log(`  📊 Fixed ${totalUpdated} questions...`);
        }
      }
    }

    console.log(`\n✅ Structure fixed!`);
    console.log(`📋 Updated ${totalUpdated} questions with:
   - 2 Examples (visible in Examples tab)
   - 2 Open Test Cases (visible in Test Cases tab)
   - 8 Hidden Test Cases (for evaluation only)`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

run();
