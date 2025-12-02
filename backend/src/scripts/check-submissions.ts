import mongoose from 'mongoose';
import Submission from '../models/Submission';
import dotenv from 'dotenv';

dotenv.config();

const checkSubmissions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');

    const allSubmissions = await Submission.find()
      .populate('userId', 'name email')
      .populate('questionId', 'title')
      .select('userId questionId status totalTestCases passedTestCases createdAt');

    console.log('\n📊 Total Submissions:', allSubmissions.length);
    console.log('\n🔍 Submission Details:');
    
    allSubmissions.forEach((sub: any, index) => {
      console.log(`\n${index + 1}. ${sub.userId?.name || 'Unknown'}`);
      console.log(`   Question: ${sub.questionId?.title || 'Unknown'}`);
      console.log(`   Status: ${sub.status}`);
      console.log(`   Test Cases: ${sub.passedTestCases}/${sub.totalTestCases}`);
      console.log(`   Date: ${sub.createdAt}`);
    });

    const statusCounts = await Submission.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    console.log('\n📈 Status Breakdown:');
    statusCounts.forEach(s => {
      console.log(`   ${s._id}: ${s.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkSubmissions();
