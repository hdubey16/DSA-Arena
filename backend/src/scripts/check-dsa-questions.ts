import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function checkDSAQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // Check for DSA questions
    const dsaQuestions = await Question.find({ 
      topicId: { $in: ['day-1', 'day-2', 'day-3', 'day-4', 'day-5', 'day-6', 'day-7', 'day-8'] } 
    });

    console.log(`📊 DSA Questions found: ${dsaQuestions.length}`);
    dsaQuestions.forEach(q => {
      console.log(`  - ${q.title} (${q.topicId})`);
    });

    // Check for old questions
    console.log('\n📊 Checking old JavaPrep questions:');
    const oldQuestions = await Question.find({ 
      topicId: { $in: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'] } 
    });
    console.log(`Old questions found: ${oldQuestions.length}`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkDSAQuestions();
