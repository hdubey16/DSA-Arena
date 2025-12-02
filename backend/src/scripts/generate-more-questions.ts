import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../models/Topic';
import Question from '../models/Question';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javaprep_arena';

function difficultyPoints(diff: string) {
  if (diff === 'Easy') return 10;
  if (diff === 'Medium') return 15;
  return 25;
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const topics = await Topic.find().sort({ week: 1, day: 1 });
    console.log(`Found ${topics.length} topics`);

    for (const topic of topics) {
      const qCount = await Question.countDocuments({ topicId: topic.id });
      if (qCount >= 5) {
        console.log(`- Topic ${topic.id} (${topic.title}): ${qCount} questions (skip)`);
        continue;
      }

      console.log(`- Topic ${topic.id} (${topic.title}): ${qCount} questions (generating ${5 - qCount})`);

      const toCreate: any[] = [];

      // If compulsoryQuestion exists and not present in questions, insert it first
      if (topic.compulsoryQuestion) {
        const exists = await Question.findOne({ topicId: topic.id, title: topic.compulsoryQuestion });
        if (!exists && toCreate.length + qCount < 5) {
          toCreate.push({
            topicId: topic.id,
            title: topic.compulsoryQuestion,
            description: `Compulsory challenge for ${topic.title}`,
            difficulty: topic.difficulty || 'Easy',
            type: 'practice',
            isCompulsory: true,
            points: difficultyPoints(topic.difficulty || 'Easy'),
            timeLimit: 300,
            starterCode: `public class Solution {\n    public static void main(String[] args) {\n        // ${topic.compulsoryQuestion}\n    }\n}`,
            solution: 'Auto-generated solution (placeholder)',
            testCases: [{ input: '', expectedOutput: '', isHidden: true, points: difficultyPoints(topic.difficulty || 'Easy') }],
            hints: ['Read the problem statement carefully'],
            tags: ['compulsory']
          });
        }
      }

      // Add placeholder questions up to count 5
      const types = ['Easy','Easy','Medium','Medium','Hard'];
      let i = 1;
      while (qCount + toCreate.length < 5) {
        const idx = qCount + toCreate.length + 1;
        const diff = types[Math.min(idx-1, types.length-1)];
        toCreate.push({
          topicId: topic.id,
          title: `${topic.title} - Practice ${idx}`,
          description: `Auto-generated practice question ${idx} for ${topic.title}`,
          difficulty: diff,
          type: 'practice',
          isCompulsory: false,
          points: difficultyPoints(diff),
          timeLimit: 300,
          starterCode: `public class Solution {\n    public static void main(String[] args) {\n        // Practice ${idx} - ${topic.title}\n    }\n}`,
          solution: 'Auto-generated solution (placeholder)',
          testCases: [
            { input: '', expectedOutput: '', isHidden: true, points: Math.max(1, difficultyPoints(diff)) }
          ],
          hints: ['Think about edge cases'],
          tags: ['auto-generated']
        });
        i++;
      }

      if (toCreate.length > 0) {
        await Question.insertMany(toCreate);
        console.log(`  -> Inserted ${toCreate.length} questions for topic ${topic.id}`);
      }
    }

    console.log('\n✅ Generation complete');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

run();
