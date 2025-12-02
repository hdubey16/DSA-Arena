import mongoose from 'mongoose';
import Question from '../models/Question';
import Topic from '../models/Topic';
import dotenv from 'dotenv';

dotenv.config();

async function cleanOldData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // Delete old questions (those with numeric topicIds like '1', '2', '10', etc.)
    const oldQuestions = await Question.deleteMany({ 
      topicId: { $regex: /^[0-9]+$/ }  // Match pure numeric IDs
    });
    console.log(`🗑️  Deleted ${oldQuestions.deletedCount} old JavaPrep questions`);

    // Delete old topics (those with numeric IDs like '1', '2', '9', '10', etc.)
    const oldTopics = await Topic.deleteMany({ 
      id: { $regex: /^[0-9]+$/ }  // Match pure numeric IDs
    });
    console.log(`🗑️  Deleted ${oldTopics.deletedCount} old JavaPrep topics`);

    // Verify remaining data
    const remainingQuestions = await Question.countDocuments();
    const remainingTopics = await Topic.countDocuments();
    
    console.log(`\n✅ Remaining DSA Questions: ${remainingQuestions}`);
    console.log(`✅ Remaining DSA Topics: ${remainingTopics}`);

    await mongoose.disconnect();
    console.log('\n✅ Cleanup complete!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanOldData();
