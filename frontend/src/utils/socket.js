// import { io } from 'socket.io-client';

// const socket = io('http://localhost:4000', {
//   path: '/api/socket.io',
//   withCredentials: true,
//   transports: ['websocket', 'polling'],
//   auth: {
//     token: localStorage.getItem('token')
//   }
// });

// // Debugging
// socket.on('connect', () => {
//   console.log('Connected with ID:', socket.id);
// });

// socket.on('connect_error', (err) => {
//     console.log('this is the socket error:- ', err)
//   console.error('Connection error:', err.message);
// });

// export default socket;



import { io } from "socket.io-client";

const socket = io("https://editor-1-kjah.onrender.com", {
  withCredentials: true,
  path: "/socket.io",
  transports: ["websocket", "polling"], // allow fallback
  auth: {
    token: localStorage.getItem("token")
  }
});

socket.on("connect", () => {
  console.log("Connected to socket:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connect error:", err.message);
});

export default socket;
