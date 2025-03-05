require ('dotenv').config()
const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')
const taskRouter = require('./routes/taskRoutes')

const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
// middleware
app.use(express.json())
app.use(cors())

// connect to database
connectDB();
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connection SUCCESS'))
// .catch(err => console.error('MongoDB connection FAIL', err.message))

// routes
app.use('/tasks', taskRouter)

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http:localhost:${PORT}`);
});