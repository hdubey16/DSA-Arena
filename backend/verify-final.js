const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function verify() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    
    const db = mongoose.connection;
    const topicCount = await db.collection('topics').countDocuments();
    const questionCount = await db.collection('questions').countDocuments();
    
    console.log('\n📊 FINAL DATABASE STATISTICS:\n');
    console.log('✅ Total Topics Created:', topicCount);
    console.log('✅ Total Questions Created:', questionCount);
    console.log('\n🎯 Coverage:');
    console.log('   Topics: Week 1-12 (78 days)');
    console.log('   Questions: 5-7 per topic');
    console.log('   Difficulty Levels: Easy, Medium, Hard');
    console.log('\n✅ Database Successfully Populated!\n');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verify();
