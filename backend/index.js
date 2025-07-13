const express= require('express');
const cors = require('cors');
const connectDB= require('./config/db')
const dotenv = require('dotenv');
dotenv.config();
const cookieparser= require('cookie-parser');
const http= require('http');
const {Server} = require('socket.io')
const app = express();

const port= process.env.PORT;


// middlewares
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieparser())

// Database connection is made
connectDB()

const server= http.createServer(app)

const io= new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
    },
    path: '/socket.io',
})



// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (token) {
//         socket.token = token; // Store the token in the socket object
//         next();
//     } else {
//         next(new Error('Authentication error'));
//     }
//     next()
// })




io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`)

    socket.on('join_room', (roomId) => {
        socket.join(roomId)
        console.log(`user with id ${socket.id} joined room ${roomId}`)
    })

    socket.on('code_change', (data) => {
        socket.to(data.roomId).emit('receive_code_change', {
            code: data.code,
            senderId: socket.id
        })
    })

    socket.on('cursor_position', (data) => {
        socket.to(data.roomId).emit('receive_cursor_position', {
            position: data.position,
            user: data.user,
            senderId: socket.id,
        })
    })

    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
    })
});


// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/rooms', require('./routes/room'))
app.use('/api/code', require('./routes/executionRoutes'))
app.use('/api/collaboration', require('./routes/collaborationRoutes'))





app.listen(port, () => {
    console.log(`Server is conneted to the ${port}`)
})