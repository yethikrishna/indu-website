export function runMockInterpreter(code: string): { output: string[], error: boolean } {
  const output: string[] = [];
  let error = false;

  // Add compilation delay
  output.push('Compiling with indc v1.0.0-alpha...');
  
  try {
    // Very naive regex-based mock interpreter for demo purposes
    
    if (code.includes('agent SummaryBot')) {
      output.push('Starting agent runtime...');
      output.push('Initializing nexus.gpt4()...');
      output.push('SummaryBot spawned (PID: 1042)');
      output.push('Fetching https://indu.dev...');
      output.push('Summarizing with phi-3 (local NPU fallback)...');
      output.push('');
      output.push('Result: INDU is a compiled, multi-paradigm language featuring native AI agents, CRDT state sync, and WebGPU tensors.');
    } 
    else if (code.includes('sync let global_counter')) {
      output.push('Initializing SQLite persistence layer...');
      output.push('Connecting to WebRTC signaling server...');
      output.push('State synced with 0 peers.');
      output.push('');
      output.push('Counter is now: 1');
    }
    else if (code.includes('tensor![')) {
      output.push('Initializing WebGPU context...');
      output.push('Allocating tensor memory on device (Apple M3 Max)...');
      output.push('');
      output.push('Matrix A:');
      output.push('[[1.0, 2.0],');
      output.push(' [3.0, 4.0]]');
      output.push('');
      output.push('Matrix A @ B:');
      output.push('[[2.0, 4.0],');
      output.push(' [6.0, 8.0]]');
    }
    else if (code.includes('divide(')) {
      output.push('Success: 5.0');
    }
    else if (code.includes('print("Hello')) {
      output.push('Hello from the frontier!');
      output.push('The answer is 42');
    }
    else {
      // Generic fallback - just try to extract print statements
      const printRegex = /print\((?:f?"([^"]+)"|([a-zA-Z_]\w*))\)/g;
      let match;
      let printed = false;
      
      while ((match = printRegex.exec(code)) !== null) {
        if (match[1]) {
          output.push(match[1]); // String literal
        } else if (match[2]) {
          output.push(`[Value of ${match[2]}]`); // Variable
        }
        printed = true;
      }
      
      if (!printed) {
        output.push('Program exited successfully with code 0.');
      }
    }
  } catch (e) {
    error = true;
    output.push(`Runtime Error: ${(e as Error).message}`);
  }

  return { output, error };
}