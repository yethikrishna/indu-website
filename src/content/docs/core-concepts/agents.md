---
title: "Native AI Agents"
description: "Understand how INDU treats AI as a language-level primitive."
order: 1
---

## The `agent` Keyword

In 2024, if you wanted to build an AI agent, you had to glue together 15 different libraries, Python scripts, and API wrappers (like LangChain or LlamaIndex). 

In INDU, an `agent` is a native language primitive. It is an actor with built-in fault tolerance, state persistence, and message-passing capabilities.

```indu
// Define an agent using the keyword
agent SummaryBot {
    // Configure the model and tools at the top level
    model: nexus.gpt4(),
    tools: [WebSearch, Calculator],
    
    // The handle function processes incoming messages
    fn handle(url: str) -> Result<str> {
        let page = nexus.fetch(url).await?;
        
        // Native model inference call
        page.summarize(
            model: "phi-3", 
            max_tokens: 200
        )
    }
}
```

## Spawning Agents

Agents do not block the main thread. When you call `.spawn()`, INDU creates a new asynchronous actor that can receive and process messages independently.

```indu
fn main() {
    // Spawn the agent
    let bot = SummaryBot.spawn();
    
    // Send a message and await the response
    let summary = bot.handle("https://indu.dev").await?;
    
    print(summary);
}
```

## Fault Tolerance

If an agent encounters an error (e.g., a network timeout or API rate limit), the INDU runtime automatically handles the restart process based on a configurable supervisor policy. You do not need to wrap your agent calls in manual `try/catch` blocks unless you want explicit control.

```indu
// The ? operator propagates errors up to the supervisor
let val = nexus.fetch(url).await?;
```

By default, an agent will retry up to 3 times with exponential backoff before bubbling an error up to the supervisor.

## Local and Cloud Inference

The `nexus` namespace provides seamless switching between local models and cloud providers.

```indu
// Use a local NPU/GPU model via ONNX/TensorRT
let local_model = nexus.local("llama3-8b");

// Use a cloud provider
let cloud_model = nexus.claude(api_key: env("ANTHROPIC_KEY"));
```

INDU will automatically optimize inference depending on the hardware available at runtime, compiling down to WebGPU compute shaders if necessary.
