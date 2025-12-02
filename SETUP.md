# Code Executor Setup Guide

## Prerequisites

### 1. Install Redis on Windows

**Option A: Using Memurai (Redis for Windows)**
1. Download Memurai from: https://www.memurai.com/get-memurai
2. Install and run Memurai
3. Redis will be available at `redis://127.0.0.1:6379`

**Option B: Using Docker**
```bash
docker run -d -p 6379:6379 redis:latest
```

**Option C: Using WSL (Windows Subsystem for Linux)**
```bash
wsl
sudo apt-get update
sudo apt-get install redis-server
redis-server
```

### 2. Install Docker Desktop
1. Download from: https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop
3. Ensure Docker is running (check system tray)

## Running the Application

### Terminal 1: Start Backend Server
```bash
cd "C:\Users\hdube\Desktop\Java Website\javacode-fortress\backend"
npm run dev
```

### Terminal 2: Start Code Executor Worker
```bash
cd "C:\Users\hdube\Desktop\Java Website\javacode-fortress\backend"
npm run worker
```

**Note:** The worker will:
- Build Docker images for Java (first time only, may take a few minutes)
- Start listening for code execution jobs
- Process code submissions from the backend

### Terminal 3: Start Frontend
```bash
cd "C:\Users\hdube\Desktop\Java Website\javacode-fortress"
npm run dev
```

## How It Works

1. **Frontend** (http://localhost:8080) - User submits code
2. **Backend** (http://localhost:5000) - Receives code, adds job to Redis queue
3. **Worker** - Picks up job from queue, executes code in Docker container
4. **Results** - Worker sends results back through queue to backend
5. **Frontend** - Displays results to user

## Troubleshooting

### Redis Connection Error
- Ensure Redis/Memurai is running
- Check if port 6379 is available: `netstat -an | findstr 6379`

### Docker Image Build Errors
- Ensure Docker Desktop is running
- Check Docker daemon: `docker ps`

### Worker Not Processing Jobs
- Check worker terminal for errors
- Ensure Redis URL in .env matches your Redis instance
- Restart worker: Ctrl+C and run `npm run worker` again

## Architecture

```
Frontend (React + Vite)
    ↓
Backend (Express + Mongoose)
    ↓
Redis Queue (Bull)
    ↓
Worker (code-executor)
    ↓
Docker Containers (Java execution)
```

The code-executor library handles:
- Creating isolated Docker containers for each code execution
- Managing timeouts and resource limits
- Returning execution results (output, errors, time, memory)
- Cleaning up containers after execution
