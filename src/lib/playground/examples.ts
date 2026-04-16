export const examples = [
  {
    id: 'hello-world',
    name: 'Hello World',
    code: `// Your first INDU program
fn main() {
    print("Hello from the frontier!");
    
    let answer = 42;
    print(f"The answer is {answer}");
}`
  },
  {
    id: 'ai-agent',
    name: 'AI Agent (Native)',
    code: `// INDU is the first language with 'agent' as a keyword
agent SummaryBot {
    tools: [WebSearch, Calculator],
    model: nexus.gpt4(),
    
    fn handle(url: str) -> Result<str> {
        let page = nexus.fetch(url).await?;
        
        // Native model inference call
        page.summarize(
            model: "phi-3", 
            max_tokens: 200
        )
    }
}

fn main() {
    let bot = SummaryBot.spawn();
    let summary = bot.handle("https://indu.dev").await?;
    print(summary);
}`
  },
  {
    id: 'sync-crdt',
    name: 'Sync State (CRDT)',
    code: `// Distributed state management built-in
// This variable is automatically persisted to SQLite
// and synced via WebRTC to all connected clients

sync let global_counter: i32 = 0;

fn increment() {
    global_counter += 1;
    print(f"Counter is now: {global_counter}");
}

fn main() {
    increment();
}`
  },
  {
    id: 'tensor-math',
    name: 'Tensor Math (WebGPU)',
    code: `// First-class tensor operations that compile to WebGPU
fn main() {
    // Create tensors (automatically mapped to GPU memory)
    let a = tensor![[1.0, 2.0], [3.0, 4.0]];
    let b = tensor![[2.0, 0.0], [0.0, 2.0]];
    
    // Matrix multiplication executes on GPU
    let c = a @ b;
    
    print("Matrix A:");
    print(a);
    
    print("\\nMatrix A @ B:");
    print(c);
}`
  },
  {
    id: 'error-handling',
    name: 'Zero-Null Safety',
    code: `// INDU has no 'null'. We use Option and Result.
fn divide(a: f32, b: f32) -> Option<f32> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    let result = divide(10.0, 2.0);
    
    // Pattern matching is exhaustive
    match result {
        Some(val) => print(f"Success: {val}"),
        None => print("Error: Division by zero"),
    }
    
    // Or use the ? operator for propagation
    // let val = divide(10.0, 0.0)?; 
}`
  }
];
