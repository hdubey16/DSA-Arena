import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const question = await Question.findOne().lean();
    console.log('\n📋 Sample Question:');
    console.log(`Title: ${question?.title}`);
    console.log(`Has examples field: ${!!question?.examples}`);
    console.log(`Examples count: ${question?.examples?.length || 0}`);
    console.log(`Has testCases field: ${!!question?.testCases}`);
    console.log(`TestCases count: ${question?.testCases?.length || 0}`);
    
    if (question?.examples) {
      console.log('\nExamples:');
      console.log(JSON.stringify(question.examples, null, 2));
    }
    
    if (question?.testCases) {
      console.log('\nTest Cases (first 3):');
      console.log(JSON.stringify(question.testCases.slice(0, 3), null, 2));
    }
    
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err);
  }
}

check();
