import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  path: '/api/socket.io',
  withCredentials: true,
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('token')
  }
});

// Debugging
socket.on('connect', () => {
  console.log('Connected with ID:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

export default socket;