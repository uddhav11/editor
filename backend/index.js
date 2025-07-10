const express= require('express');
const cors = require('cors');
const connectDB= require('./config/db')
const dotenv = require('dotenv');
dotenv.config();
const cookieparser= require('cookie-parser');
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


// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/rooms', require('./routes/room'))





app.listen(port, () => {
    console.log(`Server is conneted to the ${port}`)
})