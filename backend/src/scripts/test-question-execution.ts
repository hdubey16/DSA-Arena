import mongoose from 'mongoose';
import Question from '../models/Question';
import { JavaCodeExecutor } from '../services/codeExecutor';
import dotenv from 'dotenv';

dotenv.config();

async function testQuestionExecution() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    // Find a question from day-52
    const question = await Question.findOne({ topicId: 'day-52', isCompulsory: true });
    
    if (!question) {
      console.error('❌ No question found for day-52');
      process.exit(1);
    }

    console.log('═══════════════════════════════════════════════════════════');
    console.log('📝 Testing Question:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Title: ${question.title}`);
    console.log(`Topic ID: ${question.topicId}`);
    console.log(`Difficulty: ${question.difficulty}`);
    console.log(`Is Compulsory: ${question.isCompulsory}`);
    console.log();

    console.log('───────────────────────────────────────────────────────────');
    console.log('📋 Test Cases:');
    console.log('───────────────────────────────────────────────────────────');
    question.testCases.forEach((tc, idx) => {
      console.log(`Test Case ${idx + 1}:`);
      console.log(`  Input: ${tc.input}`);
      console.log(`  Expected Output: ${tc.expectedOutput}`);
      console.log(`  Hidden: ${tc.isHidden}`);
      console.log(`  Points: ${tc.points}`);
      console.log();
    });

    console.log('───────────────────────────────────────────────────────────');
    console.log('💻 Starter Code:');
    console.log('───────────────────────────────────────────────────────────');
    console.log(question.starterCode);
    console.log();

    console.log('───────────────────────────────────────────────────────────');
    console.log('✅ Solution Code:');
    console.log('───────────────────────────────────────────────────────────');
    console.log(question.solution);
    console.log();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🚀 Executing Solution with Judge0...');
    console.log('═══════════════════════════════════════════════════════════');
    
    const executor = new JavaCodeExecutor();
    const result = await executor.executeCode(
      question.solution || '',
      question.testCases.map((tc, idx) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isHidden: tc.isHidden,
        _id: `test-${idx}`,
        points: tc.points
      }))
    );

    console.log('\n───────────────────────────────────────────────────────────');
    console.log('📊 Execution Results:');
    console.log('───────────────────────────────────────────────────────────');
    console.log(`Success: ${result.success}`);
    console.log(`All Tests Passed: ${result.allTestsPassed}`);
    console.log(`Total Tests: ${result.totalTests}`);
    console.log(`Passed Tests: ${result.passedTests}`);
    console.log(`Failed Tests: ${result.failedTests}`);
    console.log(`Total Runtime: ${result.totalRuntime}ms`);
    console.log(`Average Memory: ${result.averageMemory}KB`);
    if (result.error) {
      console.log(`Error: ${result.error}`);
    }
    console.log();

    console.log('───────────────────────────────────────────────────────────');
    console.log('🔍 Individual Test Results:');
    console.log('───────────────────────────────────────────────────────────');
    result.results.forEach((testResult, idx) => {
      console.log(`\nTest ${idx + 1}:`);
      console.log(`  Input: ${testResult.input}`);
      console.log(`  Expected: ${testResult.expectedOutput}`);
      console.log(`  Actual: ${testResult.actualOutput}`);
      console.log(`  Passed: ${testResult.passed ? '✅' : '❌'}`);
      console.log(`  Runtime: ${testResult.runtime}ms`);
      console.log(`  Memory: ${testResult.memory}KB`);
      if (testResult.error) {
        console.log(`  Error: ${testResult.error}`);
      }
    });

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🔍 Analysis:');
    console.log('═══════════════════════════════════════════════════════════');
    
    // Analyze format issues
    const issues: string[] = [];
    
    result.results.forEach((testResult, idx) => {
      if (!testResult.passed && !testResult.error) {
        console.log(`\n⚠️  Test ${idx + 1} Failed - Format Mismatch:`);
        console.log(`   Expected format: "${testResult.expectedOutput}"`);
        console.log(`   Actual format: "${testResult.actualOutput}"`);
        console.log(`   Expected length: ${testResult.expectedOutput.length}`);
        console.log(`   Actual length: ${testResult.actualOutput.length}`);
        
        // Check for common issues
        if (testResult.actualOutput.includes('\n')) {
          issues.push('Output contains newlines');
        }
        if (testResult.actualOutput.includes(' ') && !testResult.expectedOutput.includes(' ')) {
          issues.push('Output contains unexpected spaces');
        }
        if (testResult.expectedOutput.includes('[') && !testResult.actualOutput.includes('[')) {
          issues.push('Output missing array brackets');
        }
      }
    });

    if (issues.length > 0) {
      console.log('\n🔧 Identified Issues:');
      issues.forEach(issue => console.log(`   - ${issue}`));
    } else if (result.allTestsPassed) {
      console.log('✅ No format issues detected! All tests passed.');
    } else if (result.error) {
      console.log(`❌ Execution error: ${result.error}`);
    }

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('📝 Summary:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Question: ${question.title}`);
    console.log(`Topic: ${question.topicId}`);
    console.log(`Test Input Format: ${question.testCases[0].input}`);
    console.log(`Expected Output Format: ${question.testCases[0].expectedOutput}`);
    console.log(`Status: ${result.allTestsPassed ? '✅ WORKING' : '❌ NEEDS FIX'}`);
    console.log('═══════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error during test:', error instanceof Error ? error.message : String(error));
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

testQuestionExecution();
