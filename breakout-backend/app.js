require('dotenv').config()
const path = require('path')

const express = require('express')
const cors = require('cors')

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
const PORT = 5600

const leaderboardRouter = require('./router/leaderboard-router')
app.use('/api/leaderboard', leaderboardRouter)

app.listen(PORT, () => {
  console.log(`Breakout api server running @ PORT: ${PORT}`);
  console.log('api served at http://127.0.0.1:5600/api/');
})