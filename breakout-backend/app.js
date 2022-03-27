require('dotenv').config()
const path = require('path')

const express = require('express')
const cors = require('cors')

const app = express()

const allowedOrigins = ["http://localhost:3000"];
const methods = ["GET", "PUT", "POST", "PATCH", "UPDATE", "HEAD", "OPTIONS", "DELETE"]
const headers = ["Origin", "X-Requested-With", "Content-Type", "Accept"]

app.use(cors({
  origin: allowedOrigins,
  methods: methods,
  headers: headers
}));

app.use(express.json());
const PORT = 5600

const leaderboardRouter = require('./router/leaderboard-router')
app.use('/api/leaderboard', leaderboardRouter)

app.listen(PORT, () => {
  console.log(`Breakout api server running @ PORT: ${PORT}`);
  console.log('api served at http://127.0.0.1:5600/api/');
})