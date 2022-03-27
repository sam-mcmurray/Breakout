const express = require('express')

const leaderboardServices = require('../services/leaderboard-services')
const router = express.Router()

router.get('/', leaderboardServices.getLeaderboard)

router.post('/', leaderboardServices.newScore)

module.exports = router