// Quick test script to verify Judge0 API is working
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || 'YOUR_RAPIDAPI_KEY_HERE';

async function testJudge0() {
  console.log('🧪 Testing Judge0 API Connection...\n');

  // Simple Hello World Java code (Judge0 expects class named Main)
  const testCode = `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Judge0!");
    }
}
  `.trim();

  try {
    // Step 1: Submit code
    console.log('📤 Submitting code to Judge0...');
    const submitResponse = await axios.post(
      `${JUDGE0_API_URL}/submissions`,
      {
        language_id: 62, // Java
        source_code: testCode,
        stdin: '',
      },
      {
        params: { base64_encoded: 'false', wait: 'false' },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    const token = submitResponse.data.token;
    console.log(`✅ Submission successful! Token: ${token}\n`);

    // Step 2: Poll for results
    console.log('⏳ Waiting for execution...');
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      await sleep(1000);
      
      const resultResponse = await axios.get(
        `${JUDGE0_API_URL}/submissions/${token}`,
        {
          params: { base64_encoded: 'false' },
          headers: {
            'X-RapidAPI-Key': JUDGE0_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        }
      );

      const result = resultResponse.data;
      
      if (result.status.id > 2) {
        console.log('\n🎉 Execution Complete!\n');
        console.log('Status:', result.status.description);
        console.log('Output:', result.stdout || '(no output)');
        console.log('Errors:', result.stderr || '(none)');
        console.log('Compile Output:', result.compile_output || '(none)');
        console.log('Time:', result.time, 'seconds');
        console.log('Memory:', result.memory, 'KB');
        
        if (result.status.id === 3) {
          console.log('\n✅ SUCCESS! Judge0 is working correctly!');
          console.log('Your website will work globally! 🌍\n');
        } else {
          console.log('\n❌ Execution failed. Check your code or Judge0 status.');
        }
        return;
      }

      attempts++;
      process.stdout.write('.');
    }

    console.log('\n⏰ Timeout waiting for execution');
  } catch (error: any) {
    console.error('\n❌ Error testing Judge0:');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data?.message || error.message);
      
      if (error.response.status === 401 || error.response.status === 403) {
        console.error('\n🔑 API Key Issue:');
        console.error('1. Sign up at: https://rapidapi.com/judge0-official/api/judge0-ce');
        console.error('2. Subscribe to the Basic plan (FREE)');
        console.error('3. Copy your API key');
        console.error('4. Update JUDGE0_API_KEY in .env file\n');
      }
    } else {
      console.error('Message:', error.message);
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run test
console.log('\n========================================');
console.log('     Judge0 API Connection Test');
console.log('========================================\n');

if (JUDGE0_API_KEY === 'YOUR_RAPIDAPI_KEY_HERE') {
  console.log('❌ ERROR: JUDGE0_API_KEY not set!\n');
  console.log('Please follow these steps:\n');
  console.log('1. Go to: https://rapidapi.com/judge0-official/api/judge0-ce');
  console.log('2. Sign up and subscribe to the Basic plan (FREE)');
  console.log('3. Copy your API key');
  console.log('4. Edit backend/.env and set:');
  console.log('   JUDGE0_API_KEY=your_actual_key_here\n');
  console.log('5. Run this test again: npx ts-node src/scripts/test-judge0.ts\n');
  process.exit(1);
}

testJudge0();
