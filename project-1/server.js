const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const taskRouter = require('./routes/routeTask');


const app = express();
app.use(express.json());
app.use('/api/task/', taskRouter);

// checking api status
app.get('/', (req, res) => {
    res.send("API is running");
});

const PORT = 5000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`App is running on port ${PORT}`);
});