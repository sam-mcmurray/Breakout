require('dotenv').config()

const sqlite = require('better-sqlite3')
const db = sqlite(process.env.SQLITE_URL)

function getLeaderboard(req, res, next) {
  let result = db.prepare( `SELECT * FROM leaderboard`).all();
  res.json(result);
}

function newScore(req, res, next) {
  console.log(req.body)
  const row = db.
  prepare('INSERT INTO leaderboard (username, level, score) VALUES(?, ?, ?)')
    .run(req.body.username, req.body.level, req.body.score);
  console.log(row);
}

exports.getLeaderboard = getLeaderboard;
exports.newScore = newScore;