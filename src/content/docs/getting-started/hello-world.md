---
title: "Hello World"
description: "Your first steps in the INDU programming language."
order: 2
---

## Writing Your First Program

Let's write a simple program to get familiar with INDU's syntax. Create a file named `hello.indu` and add the following code:

```indu
// hello.indu
fn main() {
    print("Hello from the frontier!");
}
```

INDU uses `fn` to declare functions, similar to Rust. Every INDU program must have a `main` function as its entry point.

## Running the Code

You can run this file directly using the INDU compiler:

```bash
indc run hello.indu
```

**Output:**
```
Hello from the frontier!
```

## Variables and Types

INDU is statically typed, but uses type inference to keep your code clean. You use `let` to declare variables.

```indu
fn main() {
    // Type inferred as string
    let greeting = "Hello";
    
    // Type inferred as i32 (32-bit integer)
    let year = 2026;
    
    // Explicit type annotation
    let version: f32 = 1.0;
    
    // Formatted strings use the 'f' prefix
    print(f"{greeting}, INDU v{version} released in {year}");
}
```

By default, all variables in INDU are **immutable**. If you need to change a value later, you must explicitly declare it as mutable using `mut`:

```indu
let mut count = 0;
count += 1; // Valid

let fixed = 10;
// fixed = 11; // Compile error: Cannot assign to immutable variable 'fixed'
```

## Next Steps

Now that you know how to declare variables and print output, you're ready to learn about INDU's more powerful primitives.

Check out the [Core Concepts](/docs/core-concepts/agents) to see what makes INDU truly unique.
