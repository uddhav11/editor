// const express= require('express');
// const cors = require('cors');
// const connectDB= require('./config/db')
// const dotenv = require('dotenv');
// dotenv.config();
// const cookieparser= require('cookie-parser');
// const http= require('http');
// const {Server} = require('socket.io')
// const app = express();

// const port= process.env.PORT;


// // middlewares
// app.use(express.json())
// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true
// }))
// app.use(cookieparser())

// // Database connection is made
// connectDB()

// const server= http.createServer(app)

// const io= new Server(server, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ["GET", "POST"],
//         credentials: true,
//     },
//     path: '/api/socket.io',
//     transports: ['websocket', 'polling'],
//     pingTimeout: 60000,
//     pinginvertval: 25000,
// })



// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (!token) {
//         return next(new Error('Authentication error'));
        
//     } 
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return next(new Error('Invalid token'));
//         }
//         socket.user = decoded; 
//         next();
//     });
// })




// io.on('connection', (socket) => {
//     console.log(`user connected ${socket.id}`)

//     socket.on('join_room', (roomId) => {
//         socket.join(roomId)
//         console.log(`user with id ${socket.id} joined room ${roomId}`)
//     })

//     socket.on('code_change', (data) => {
//         socket.to(data.roomId).emit('receive_code_change', {
//             code: data.code,
//             senderId: socket.id
//         })
//     })

//     socket.on('cursor_position', (data) => {
//         socket.to(data.roomId).emit('receive_cursor_position', {
//             position: data.position,
//             user: data.user,
//             senderId: socket.id,
//         })
//     })

//     socket.on('disconnect', () => {
//         console.log(`user disconnected ${socket.id}`);
//     })
// });


// // Routes
// app.use('/api/auth', require('./routes/authRoutes'))
// app.use('/api/rooms', require('./routes/room'))
// app.use('/api/code', require('./routes/executionRoutes'))
// app.use('/api/collaboration', require('./routes/collaborationRoutes'))





// app.listen(port, () => {
//     console.log(`Server is conneted to the ${port}`)
// })



// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const http = require("http");
// const { Server } = require("socket.io");
// const jwt = require("jsonwebtoken");

// dotenv.config();
// const app = express();
// const server = http.createServer(app);
// const port = process.env.PORT || 4000;

// // Middlewares
// app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
// app.use(cookieParser());

// // Connect to DB
// connectDB();

// // ✅ Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true
//   },
//   path: "/socket.io", // ✅ USE DEFAULT PATH TO AVOID ISSUES
//   transports: ["websocket", "polling"]
// });

// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   if (!token) return next(new Error("Authentication error"));
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return next(new Error("Invalid token"));
//     socket.user = decoded;
//     next();
//   });
// });

// io.on("connection", (socket) => {
//   console.log("Socket connected:", socket.id);

//   socket.on("join_room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room ${roomId}`);
//   });

//   socket.on("code_change", (data) => {
//     socket.to(data.roomId).emit("receive_code_change", {
//       code: data.code,
//       senderId: socket.id
//     });
//   });

//   socket.on("cursor_position", (data) => {
//     socket.to(data.roomId).emit("receive_cursor_position", {
//       position: data.position,
//       user: data.user,
//       senderId: socket.id
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("Socket disconnected:", socket.id);
//   });
// });

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/rooms", require("./routes/room"));
// app.use("/api/code", require("./routes/executionRoutes"));
// app.use("/api/collaboration", require("./routes/collaborationRoutes"));

// server.listen(port, () => {
//   console.log(`Server is connected to port ${port}`);
// });




const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Room = require("./models/Room"); // Make sure to import your Room model

dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "editor-git-main-uddhav11s-projects.vercel.app",
  credentials: true
}));
app.use(cookieParser());

// Connect to DB
connectDB();

// Socket.IO Configuration
const io = new Server(server, {
  cors: {
    origin: "editor-git-main-uddhav11s-projects.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  },
  path: "/socket.io",
  transports: ["websocket", "polling"]
});

// Socket.IO Authentication Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error("Invalid token"));
    socket.user = decoded;
    next();
  });
});

// Room Code Cache
const roomCodeCache = new Map();

io.on("connection", (socket) => {
    console.log("Socket details:", socket.user?.userId);
  console.log("Socket connected:", socket.id, "User:", socket.user?.userId);

  // Handle room joining with initial code sync
  socket.on("join_room", async (roomId) => {
    try {
      socket.join(roomId);
      console.log(`User ${socket.user.username} joined room ${roomId}`);

      // Get or cache room code
      if (!roomCodeCache.has(roomId)) {
        const room = await Room.findById(roomId);
        if (room) {
          roomCodeCache.set(roomId, {
            code: room.code || '',
            language: room.language || 'javascript',
            members: new Set()
          });
        }
      }

      // Add user to room members
      const roomData = roomCodeCache.get(roomId);
      if (roomData) {
        roomData.members.add(socket.user.username);
        
        // Send current code and language to the new user
        socket.emit("code_sync", {
          code: roomData.code,
          language: roomData.language
        });

        // Update all members list
        io.to(roomId).emit("members_update", Array.from(roomData.members));
      }
    } catch (err) {
      console.error("Room join error:", err);
    }
  });

  // Handle code changes
  socket.on("code_update", (data) => {
    const { roomId, code } = data;
    if (roomCodeCache.has(roomId)) {
      roomCodeCache.get(roomId).code = code;
    }
    socket.to(roomId).emit("code_update", {
      code,
      senderId: socket.id
    });
  });

  // Handle language changes
  socket.on("language_update", (data) => {
    const { roomId, language } = data;
    if (roomCodeCache.has(roomId)) {
      roomCodeCache.get(roomId).language = language;
    }
    socket.to(roomId).emit("language_update", {
      language,
      senderId: socket.id
    });
  });

  // Handle cursor position updates
  socket.on("cursor_position", (data) => {
    socket.to(data.roomId).emit("cursor_position", {
      position: data.position,
      user: {
        id: socket.id,
        username: socket.user.username,
        color: data.color
      }
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    // Clean up room members
    roomCodeCache.forEach((roomData, roomId) => {
      if (roomData.members.has(socket.user?.username)) {
        roomData.members.delete(socket.user.username);
        io.to(roomId).emit("members_update", Array.from(roomData.members));
      }
    });
  });
});

// Periodically save room code to database
setInterval(async () => {
  for (const [roomId, roomData] of roomCodeCache) {
    try {
      await Room.findByIdAndUpdate(roomId, {
        code: roomData.code,
        language: roomData.language
      });
    } catch (err) {
      console.error("Failed to save room data:", err);
    }
  }
}, 30000); // Every 30 seconds

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/room"));
app.use("/api/code", require("./routes/executionRoutes"));
app.use("/api/collaboration", require("./routes/collaborationRoutes"));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});