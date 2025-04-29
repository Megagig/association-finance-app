#!/bin/bash

# Start backend and frontend concurrently
echo "Starting Financial Hub application..."

# Start backend
cd backend
echo "Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 5

# Start frontend
cd ../frontend
echo "Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
function cleanup {
  echo "Shutting down servers..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Register the cleanup function for when script is terminated
trap cleanup SIGINT SIGTERM

# Keep script running
echo "Financial Hub is running!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173 (or another port if 5173 is in use)"
echo "Press Ctrl+C to stop all servers"

# Wait for user to press Ctrl+C
wait
