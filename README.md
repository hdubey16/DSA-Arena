# DSA Arena 🚀

A comprehensive Data Structures and Algorithms learning platform in Java with curated DSA problems, hidden test cases, and LeetCode-style evaluation.

## ⚠️ Important: Security Setup Required

**Before running the project**, you must set up environment variables with your own credentials.

📖 **See [SECURITY_SETUP.md](./SECURITY_SETUP.md) for detailed setup instructions**

## Quick Start

**Prerequisites**: Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/hdubey16/DSA-Arena.git

# Step 2: Navigate to the project directory
cd DSA-Arena

# Step 3: Setup environment variables (REQUIRED!)
# Copy example files and fill in your credentials
cp .env.example .env
cp backend/.env.example backend/.env

# Edit .env and backend/.env with your credentials
# See SECURITY_SETUP.md for detailed instructions

# Step 4: Install frontend dependencies
npm i

# Step 5: Install backend dependencies
cd backend
npm i
cd ..

# Step 6: Start the backend server (in one terminal)
cd backend
npm run dev

# Step 7: Start the frontend (in another terminal)
npm run dev
```

## 🔒 Environment Variables

This project requires:
- MongoDB Atlas connection string
- JWT secret key
- Judge0 API key from RapidAPI

**Never commit `.env` files!** Use `.env.example` as templates.

See [SECURITY_SETUP.md](./SECURITY_SETUP.md) for complete setup guide.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

This project can be deployed to any platform that supports Node.js applications (Vercel, Netlify, Railway, etc.).

## Features

- 16-week structured DSA curriculum (112 days) covering all major topics
- Topics: Introduction, Mathematics, Bit Magic, Recursion, Arrays, Searching, Sorting, Matrix, Hashing, Strings, Linked List, Stack, Queue, Deque, Tree, BST, Heap, Graph, Greedy, Backtracking, Dynamic Programming, Trie, Segment Tree, Disjoint Set
- Monaco code editor with Java syntax highlighting
- Hidden test cases for comprehensive evaluation
- Admin panel for managing users, questions, and tests
- Progress tracking and leaderboard
- Plagiarism detection
- Real-time code execution via Judge0