import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

// Generate examples from test case data (like before)
function generateExamplesFromTestCases(testCases: any[]): any[] {
  // Take first 2 test cases as examples
  return testCases.slice(0, 2).map(tc => ({
    input: tc.input,
    output: tc.expectedOutput
  }));
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all questions
    const questions = await Question.find();
    let totalUpdated = 0;

    for (const question of questions) {
      const examples = generateExamplesFromTestCases(question.testCases);

      // Update the question with examples from test cases
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
          console.log(`  📊 Updated ${totalUpdated} questions...`);
        }
      }
    }

    console.log(`\n✅ Examples updated from test cases!`);
    console.log(`📋 Updated ${totalUpdated} questions`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

run();
