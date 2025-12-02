import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

async function checkMissing() {
  await mongoose.connect(process.env.MONGODB_URI || '');
  
  const questions = await Question.find({
    day: { $in: [55, 56, 57, 58, 59, 60, 61, 62, 63] }
  }).select('title solution day');
  
  const missing = questions.filter(q => 
    !q.solution || !q.solution.includes('public static void main')
  );
  
  console.log(`\n📊 Days 55-63 Status:`);
  console.log(`Total: ${questions.length} questions`);
  console.log(`With main(): ${questions.length - missing.length}`);
  console.log(`Missing main(): ${missing.length}\n`);
  
  if (missing.length > 0) {
    console.log('Missing questions:');
    missing.forEach(q => console.log(`  - ${q.title}`));
  }
  
  await mongoose.disconnect();
}

checkMissing();
