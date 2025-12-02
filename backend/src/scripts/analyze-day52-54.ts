import mongoose from 'mongoose';
import Question from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

interface DetailedReport {
  questionTitle: string;
  topicId: string;
  testCaseFormat: {
    input: string;
    expectedOutput: string;
  };
  codeStructure: {
    hasMain: boolean;
    hasNestedClasses: boolean;
    needsInputParsing: boolean;
    needsOutputFormatting: boolean;
  };
  issues: string[];
  fixes: string[];
}

async function analyzeDay52Questions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB\n');

    const questions = await Question.find({ topicId: { $in: ['day-52', 'day-53', 'day-54'] } });
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 COMPREHENSIVE ANALYSIS: Days 52-54 Questions');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    const reports: DetailedReport[] = [];

    for (const question of questions) {
      const report: DetailedReport = {
        questionTitle: question.title,
        topicId: question.topicId,
        testCaseFormat: {
          input: question.testCases[0]?.input || 'N/A',
          expectedOutput: question.testCases[0]?.expectedOutput || 'N/A'
        },
        codeStructure: {
          hasMain: question.solution.includes('public static void main'),
          hasNestedClasses: /class\s+\w+\s*\{/.test(question.solution) && 
                            question.solution.split('class ').length > 2,
          needsInputParsing: question.testCases[0]?.input.includes('[') || false,
          needsOutputFormatting: question.testCases[0]?.expectedOutput.includes('[') || false
        },
        issues: [],
        fixes: []
      };

      // Analyze issues
      if (!report.codeStructure.hasMain) {
        report.issues.push('❌ CRITICAL: No main() method - Judge0 cannot execute');
        report.fixes.push('Add main() method that reads stdin and writes stdout');
      }

      if (report.codeStructure.hasNestedClasses) {
        report.issues.push('❌ CRITICAL: Has nested classes (e.g., ListNode)');
        report.fixes.push('Code executor regex replaces ALL class names, breaking nested classes');
        report.fixes.push('Fix codeExecutor.ts to only replace the main public class');
      }

      if (report.codeStructure.needsInputParsing) {
        report.issues.push('⚠️  Needs input parsing (array format: [1,2,3])');
        report.fixes.push('Add Scanner to read input and parse array notation');
      }

      if (report.codeStructure.needsOutputFormatting) {
        report.issues.push('⚠️  Needs output formatting (array format: [1,2,3])');
        report.fixes.push('Convert result to array notation before printing');
      }

      reports.push(report);
    }

    // Print detailed reports
    reports.forEach((report, idx) => {
      console.log(`\n${'─'.repeat(63)}`);
      console.log(`Question ${idx + 1}: ${report.questionTitle}`);
      console.log(`${'─'.repeat(63)}`);
      console.log(`Topic: ${report.topicId}`);
      console.log(`Test Input: ${report.testCaseFormat.input}`);
      console.log(`Expected Output: ${report.testCaseFormat.expectedOutput}`);
      console.log('');
      console.log('Code Structure:');
      console.log(`  Has main(): ${report.codeStructure.hasMain ? '✅' : '❌'}`);
      console.log(`  Has nested classes: ${report.codeStructure.hasNestedClasses ? '❌' : '✅'}`);
      console.log(`  Needs input parsing: ${report.codeStructure.needsInputParsing ? '⚠️  Yes' : '✅ No'}`);
      console.log(`  Needs output formatting: ${report.codeStructure.needsOutputFormatting ? '⚠️  Yes' : '✅ No'}`);
      
      if (report.issues.length > 0) {
        console.log('');
        console.log('Issues Found:');
        report.issues.forEach(issue => console.log(`  ${issue}`));
      }
      
      if (report.fixes.length > 0) {
        console.log('');
        console.log('Required Fixes:');
        report.fixes.forEach((fix, i) => console.log(`  ${i + 1}. ${fix}`));
      }
    });

    // Summary
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('📝 SUMMARY OF CRITICAL ISSUES');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    const allQuestionsHaveIssues = reports.every(r => r.issues.length > 0);
    const questionsWithMain = reports.filter(r => r.codeStructure.hasMain).length;
    const questionsWithNestedClasses = reports.filter(r => r.codeStructure.hasNestedClasses).length;

    console.log(`Total Questions Analyzed: ${reports.length}`);
    console.log(`Questions with main() method: ${questionsWithMain} (${((questionsWithMain/reports.length)*100).toFixed(0)}%)`);
    console.log(`Questions with nested classes: ${questionsWithNestedClasses} (${((questionsWithNestedClasses/reports.length)*100).toFixed(0)}%)`);
    console.log('');

    console.log('🔧 ROOT CAUSE:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('File: backend/src/services/codeExecutor.ts');
    console.log('Line: 135');
    console.log('');
    console.log('Current Code:');
    console.log('  modifiedCode = modifiedCode.replace(/class\\s+\\w+\\s*\\{/g, \'class Main {\');');
    console.log('');
    console.log('Problem:');
    console.log('  This regex replaces ALL class declarations, including nested classes');
    console.log('  like ListNode, turning them into "class Main {" which creates:');
    console.log('    public class Main {');
    console.log('      static class Main {  // ❌ Invalid!');
    console.log('        ...');
    console.log('      }');
    console.log('    }');
    console.log('');
    console.log('Fix:');
    console.log('  Remove line 135 entirely - line 134 already handles the main class');
    console.log('  OR use a more specific regex that excludes nested classes');
    console.log('');

    console.log('🎯 IMMEDIATE ACTIONS NEEDED:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('1. Fix codeExecutor.ts regex (remove line 135)');
    console.log('2. Update all day-52 to day-54 questions to include:');
    console.log('   a. main() method with Scanner for stdin');
    console.log('   b. Input parsing logic for array notation [1,2,3]');
    console.log('   c. Output formatting to match expected format');
    console.log('   d. Use "static class ListNode" inside Main (nested)');
    console.log('');

    console.log('📋 EXAMPLE WORKING STRUCTURE:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`
import java.util.*;

public class Solution {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    
    public static ListNode reverseList(ListNode head) {
        // solution logic
        return head;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().trim()
                         .replace("[", "").replace("]", "");
        
        // Parse and build linked list
        ListNode head = buildList(input);
        
        // Execute solution
        ListNode result = reverseList(head);
        
        // Format and print output
        System.out.println(formatOutput(result));
    }
}`);

    console.log('\n═══════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

analyzeDay52Questions();
