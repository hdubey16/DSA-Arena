import { Worker } from 'code-executor';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const queueName = 'javaExecutor';

console.log('🚀 Starting code-executor worker...');
console.log(`📡 Redis: ${redisUrl}`);
console.log(`📋 Queue: ${queueName}`);

const worker = new Worker(queueName, redisUrl, {
  memory: 256, // 256 MB per container
  CPUs: 1, // 1 CPU per container
});

async function startWorker() {
  try {
    // Build Docker images for Java (and other languages if needed)
    console.log('🔨 Building Docker images...');
    await worker.build(['Java']);
    console.log('✅ Docker images built successfully!');

    // Start the worker
    console.log('👷 Starting worker...');
    worker.start();
    console.log('✅ Worker is now listening for jobs!');
  } catch (error) {
    console.error('❌ Error starting worker:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down worker...');
  worker.pause();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down worker...');
  worker.pause();
  process.exit(0);
});

startWorker();
