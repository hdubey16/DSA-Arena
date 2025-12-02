import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');

    // Check topics
    const topics = await Topic.find().sort({ day: 1 });
    console.log('\n📚 Topics in Database:');
    topics.forEach(topic => {
      console.log(`  Day ${topic.day}: ${topic.title} (ID: ${topic.id})`);
    });

    // Check questions - group by topic
    const questions = await Question.find().sort({ topicId: 1 });
    console.log('\n❓ Questions by Topic:');
    const questionsByTopic: { [key: string]: number } = {};
    questions.forEach(q => {
      questionsByTopic[q.topicId] = (questionsByTopic[q.topicId] || 0) + 1;
    });
    Object.entries(questionsByTopic).sort().forEach(([topicId, count]) => {
      console.log(`  ${topicId}: ${count} questions`);
    });

    console.log(`\n📊 Total Topics: ${topics.length}`);
    console.log(`📊 Total Questions: ${questions.length}`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkDatabase();
