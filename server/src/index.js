require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//Mount the routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/scores', require('./routes/scores'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
}
);