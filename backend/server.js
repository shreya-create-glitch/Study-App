// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectRedis } = require("./config/redis");
const connection=require('./config/connection')
const dotenv=require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// connection();
connection();

if (process.env.REDIS_URL) {
  connectRedis();
}


app.use("/book",require('./routes/book'));
app.use("/interview",require('./routes/interview'));
app.use('/user',require('./routes/user'))
app.use('/api/interview', require('./routes/QuestionVisit'));

app.use('/',require('./routes/ai.routes'))

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
