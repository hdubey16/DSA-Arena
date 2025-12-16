import axios from 'axios';

// Judge0 API Configuration
// Using free public Judge0 instance
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const USE_RAPID_API = process.env.JUDGE0_API_KEY ? true : false;

// Alternative: Free public Judge0 instance (no API key needed)
const JUDGE0_FREE_URL = 'https://ce.judge0.com';

// Java Language ID in Judge0
const JAVA_LANGUAGE_ID = 62;

export interface TestResult {
  testCaseId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
  runtime: number;
  memory: number;
}

export interface ExecutionResult {
  success: boolean;
  allTestsPassed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: TestResult[];
  totalRuntime: number;
  averageMemory: number;
  error?: string;
}

export class JavaCodeExecutor {
  constructor() {}

  /**
   * Execute Java code using Judge0 API and run all test cases
   */
  async executeCode(
    code: string,
    testCases: Array<{ input: string; expectedOutput: string; isHidden?: boolean; _id?: string; points?: number }>
  ): Promise<ExecutionResult> {
    try {
      // Validate code
      if (!code || !code.trim()) {
        return {
          success: false,
          allTestsPassed: false,
          totalTests: testCases.length,
          passedTests: 0,
          failedTests: testCases.length,
          results: [],
          totalRuntime: 0,
          averageMemory: 0,
          error: 'Code cannot be empty'
        };
      }

      const results: TestResult[] = [];
      let passedTests = 0;
      let totalRuntime = 0;
      let totalMemory = 0;

      // Run each test case through Judge0
      for (const testCase of testCases) {
        const testResult = await this.runTestCase(code, testCase);

        totalRuntime += testResult.runtime;
        totalMemory += testResult.memory;

        const passed = testResult.actualOutput.trim() === testCase.expectedOutput.trim();
        if (passed) passedTests++;

        results.push({
          testCaseId: testCase._id || `test-${Date.now()}`,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: testResult.actualOutput,
          passed,
          error: testResult.error,
          runtime: testResult.runtime,
          memory: testResult.memory
        });

        // Stop early if critical error
        if (testResult.error && testResult.error.includes('Compilation')) {
          break;
        }
      }

      const allTestsPassed = passedTests === testCases.length;

      return {
        success: true,
        allTestsPassed,
        totalTests: testCases.length,
        passedTests,
        failedTests: testCases.length - passedTests,
        results,
        totalRuntime,
        averageMemory: Math.round(totalMemory / testCases.length)
      };
    } catch (error: any) {
      return {
        success: false,
        allTestsPassed: false,
        totalTests: testCases.length,
        passedTests: 0,
        failedTests: testCases.length,
        results: [],
        totalRuntime: 0,
        averageMemory: 0,
        error: error.message || 'Unknown error during execution'
      };
    }
  }

  /**
   * Submit code to Judge0
   */
  private async submitToJudge0(code: string, input: string): Promise<{ token: string }> {
    try {
      // Judge0 requires the class to be named "Main"
      let modifiedCode = code;
      
      // Replace only the main public class name (Solution, etc.) with Main
      // This preserves nested classes like ListNode, TreeNode, etc.
      modifiedCode = modifiedCode.replace(/public\s+class\s+\w+/g, 'public class Main');
      
      // Use free Judge0 instance (no API key required)
      const options: any = {
        method: 'POST',
        url: `${JUDGE0_FREE_URL}/submissions`,
        params: { base64_encoded: 'false', wait: 'false' },
        headers: {
          'content-type': 'application/json'
        },
        data: {
          language_id: JAVA_LANGUAGE_ID,
          source_code: modifiedCode,
          stdin: input || '',
          cpu_time_limit: 5,
          memory_limit: 256000 // 256MB
        }
      };

      console.log('Submitting to Judge0 (free instance)...');
      const response = await axios.request(options);
      console.log('Judge0 response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Judge0 submission error:', error.response?.data || error.message);
      throw new Error(`Failed to submit to Judge0: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Run a single test case through Judge0 API
   */
  private async runTestCase(
    code: string,
    testCase: { input: string; expectedOutput: string }
  ): Promise<{ actualOutput: string; memory: number; runtime: number; error?: string }> {
    try {
      // Step 1: Submit code to Judge0
      const submission = await this.submitToJudge0(code, testCase.input);

      if (!submission || !submission.token) {
        console.error('Judge0 submission failed - no token received');
        return {
          actualOutput: '',
          memory: 0,
          runtime: 0,
          error: 'Failed to submit code to Judge0'
        };
      }

      // Step 2: Get result (with polling)
      const result = await this.getSubmissionResult(submission.token);

      // Handle compilation errors
      if (result.status.id === 6) {
        return {
          actualOutput: '',
          memory: Math.round((result.memory || 0) / 1024), // Convert KB to MB
          runtime: parseFloat(result.time) * 1000 || 0, // Convert seconds to ms
          error: result.compile_output || 'Compilation error'
        };
      }

      // Handle runtime errors
      if (result.stderr) {
        return {
          actualOutput: result.stdout || '',
          memory: Math.round((result.memory || 0) / 1024), // Convert KB to MB
          runtime: parseFloat(result.time) * 1000 || 0, // Convert seconds to ms
          error: result.stderr
        };
      }

      // Success case
      return {
        actualOutput: result.stdout || '',
        memory: Math.round((result.memory || 0) / 1024), // Convert KB to MB
        runtime: parseFloat(result.time) * 1000 || 0, // Convert seconds to ms
        error: undefined
      };
    } catch (err: any) {
      console.error('Judge0 execution error:', err.message);
      return {
        actualOutput: '',
        memory: 0,
        runtime: 0,
        error: `Execution error: ${err.message}`
      };
    }
  }

  /**
   * Get submission result from Judge0 (with polling)
   */
  private async getSubmissionResult(token: string): Promise<any> {
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const options: any = {
          method: 'GET',
          url: `${JUDGE0_FREE_URL}/submissions/${token}`,
          params: { base64_encoded: 'false' },
          headers: {
            'content-type': 'application/json'
          }
        };

        const response = await axios.request(options);
        const result = response.data;

        console.log(`Polling Judge0 (attempt ${attempts + 1}): Status = ${result.status.description}`);

        // Status IDs: 1=In Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, 5=Time Limit Exceeded, 6=Compilation Error, etc.
        if (result.status.id > 2) {
          console.log('Judge0 execution complete:', result.status.description);
          return result;
        }

        // Wait before polling again
        await this.sleep(1000);
        attempts++;
      } catch (error: any) {
        console.error('Error polling Judge0:', error.response?.data || error.message);
        throw new Error(`Failed to get result from Judge0: ${error.message}`);
      }
    }

    throw new Error('Execution timeout: Judge0 took too long to process');
  }

  /**
   * Helper function to sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Cleanup method (no-op for Judge0, kept for compatibility)
   */
  cleanup(): void {
    // No cleanup needed with Judge0 API
  }
}

export default JavaCodeExecutor;
