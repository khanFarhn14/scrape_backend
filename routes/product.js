const express = require('express')

const router = express.Router()

const health = require('../controllers/health')

router.route('/healthcheck').get(health);

module.exports = router