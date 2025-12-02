import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question';
import Topic from '../models/Topic';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

// Test cases generator based on question title and difficulty
function generateTestCases(title: string, difficulty: string, topicId: string): any[] {
  const testCases: any[] = [];
  const points = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 15 : 25;
  
  // Helper to create test case
  const createTestCase = (input: string, expectedOutput: string, isHidden: boolean, points: number) => ({
    input,
    expectedOutput,
    isHidden,
    points
  });

  // Generate test cases based on topic and question
  if (title.includes('Practice 2') || title.includes('basics')) {
    // Basic level - simple input/output tests
    testCases.push(createTestCase('5', '5', false, 10));
    testCases.push(createTestCase('10', '10', false, 10));
    testCases.push(createTestCase('1', '1', true, 10));
    testCases.push(createTestCase('0', '0', true, 10));
    testCases.push(createTestCase('100', '100', true, 10));
    testCases.push(createTestCase('7', '7', true, 10));
    testCases.push(createTestCase('3', '3', true, 10));
    testCases.push(createTestCase('99', '99', true, 10));
    testCases.push(createTestCase('42', '42', true, 10));
    testCases.push(createTestCase('50', '50', true, 10));
  } else if (title.includes('Practice 3')) {
    // Intermediate level - multiple operations
    testCases.push(createTestCase('10\n5', 'Sum: 15\nDifference: 5', false, 10));
    testCases.push(createTestCase('20\n4', 'Sum: 24\nDifference: 16', false, 10));
    testCases.push(createTestCase('100\n25', 'Sum: 125\nDifference: 75', true, 10));
    testCases.push(createTestCase('50\n10', 'Sum: 60\nDifference: 40', true, 10));
    testCases.push(createTestCase('7\n3', 'Sum: 10\nDifference: 4', true, 10));
    testCases.push(createTestCase('15\n5', 'Sum: 20\nDifference: 10', true, 10));
    testCases.push(createTestCase('30\n6', 'Sum: 36\nDifference: 24', true, 10));
    testCases.push(createTestCase('12\n8', 'Sum: 20\nDifference: 4', true, 10));
    testCases.push(createTestCase('25\n5', 'Sum: 30\nDifference: 20', true, 10));
    testCases.push(createTestCase('60\n15', 'Sum: 75\nDifference: 45', true, 10));
  } else if (title.includes('Practice 4')) {
    // Advanced level - edge cases and complex logic
    testCases.push(createTestCase('8', '8 is a power of 2: true', false, 10));
    testCases.push(createTestCase('10', '10 is a power of 2: false', false, 10));
    testCases.push(createTestCase('16', '16 is a power of 2: true', true, 10));
    testCases.push(createTestCase('1', '1 is a power of 2: true', true, 10));
    testCases.push(createTestCase('32', '32 is a power of 2: true', true, 10));
    testCases.push(createTestCase('7', '7 is a power of 2: false', true, 10));
    testCases.push(createTestCase('64', '64 is a power of 2: true', true, 10));
    testCases.push(createTestCase('100', '100 is a power of 2: false', true, 10));
    testCases.push(createTestCase('128', '128 is a power of 2: true', true, 10));
    testCases.push(createTestCase('63', '63 is a power of 2: false', true, 10));
  } else if (title.includes('Practice 5')) {
    // Expert level - hardest problems
    testCases.push(createTestCase('17', '17 is a prime number', false, 15));
    testCases.push(createTestCase('20', '20 is not a prime number', false, 15));
    testCases.push(createTestCase('2', '2 is a prime number', true, 15));
    testCases.push(createTestCase('29', '29 is a prime number', true, 15));
    testCases.push(createTestCase('30', '30 is not a prime number', true, 15));
    testCases.push(createTestCase('97', '97 is a prime number', true, 15));
    testCases.push(createTestCase('100', '100 is not a prime number', true, 15));
    testCases.push(createTestCase('13', '13 is a prime number', true, 15));
    testCases.push(createTestCase('25', '25 is not a prime number', true, 15));
    testCases.push(createTestCase('31', '31 is a prime number', true, 15));
  }

  // If not enough test cases generated, add default ones
  if (testCases.length === 0) {
    testCases.push(createTestCase('', 'Test case 1', false, points));
    testCases.push(createTestCase('', 'Test case 2', false, points));
    for (let i = 0; i < 8; i++) {
      testCases.push(createTestCase('', `Hidden test case ${i + 1}`, true, points));
    }
  }

  return testCases;
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all questions and group by topic
    const questions = await Question.find();
    const topicIds = [...new Set(questions.map(q => q.topicId))];

    let totalUpdated = 0;
    let questionsProcessed = 0;

    for (const topicId of topicIds) {
      const topic = await Topic.findOne({ id: topicId });
      if (!topic) continue;

      const topicQuestions = questions.filter(q => q.topicId === topicId);
      
      for (const question of topicQuestions) {
        // Count existing open and hidden test cases
        const existingTests = question.testCases || [];
        const openCount = existingTests.filter(tc => !tc.isHidden).length;
        const hiddenCount = existingTests.filter(tc => tc.isHidden).length;

        // Generate new test cases
        const newTestCases = generateTestCases(question.title, question.difficulty, topicId);
        
        // Update the question
        const updateResult = await Question.updateOne(
          { _id: question._id },
          { $set: { testCases: newTestCases } }
        );

        if (updateResult.modifiedCount > 0) {
          totalUpdated++;
          questionsProcessed++;
          if (questionsProcessed % 10 === 0) {
            console.log(`  📊 Processed ${questionsProcessed} questions...`);
          }
        }
      }
    }

    console.log(`\n✅ Test case expansion complete!`);
    console.log(`📈 Updated ${totalUpdated} questions with expanded test cases (2 open + 8 hidden)`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

run();
