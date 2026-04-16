---
title: "Installation"
description: "Get up and running with the INDU toolchain in seconds."
order: 1
---

## The INDU Toolchain

INDU uses a single, unified binary called `indc` that handles compiling, running, package management, and formatting. You do not need to install Python, Node, or Rust to use INDU.

### macOS & Linux

The fastest way to install INDU is via our official installation script:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://indu.dev/install.sh | sh
```

This will download the latest `indc` binary for your architecture and add it to your `$PATH`.

### Windows

On Windows, we currently support installation via PowerShell (requires Windows 10+ or Windows 11):

```powershell
iwr https://indu.dev/install.ps1 -useb | iex
```

## Verifying the Installation

Once installed, open a new terminal window and run:

```bash
indc --version
```

You should see output similar to:

```
indc 1.0.0-alpha.1 (aarch64-apple-darwin)
```

## Creating Your First Project

INDU comes with a built-in project generator. To scaffold a new project, simply run:

```bash
indc new my_project
cd my_project
indc run
```

This will create a new directory with a `main.indu` file and execute it immediately.

## Editor Support

### VS Code
We highly recommend using the official INDU extension for VS Code. It provides:
- Syntax highlighting
- Real-time error checking
- Auto-completion for standard library and imported packages
- Formatting via `indc fmt`

You can install it directly from the VS Code marketplace by searching for **"INDU"**.

### Other Editors
Language Server Protocol (LSP) support is built directly into the compiler. You can start the language server by running `indc lsp`. Configuration instructions for Neovim, Helix, and Emacs are available in the [Editor Setup](/docs/getting-started/editor-setup) guide.
