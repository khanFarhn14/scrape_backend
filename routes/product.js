const express = require('express')

const router = express.Router()

const {health, product }= require('../controllers/health')

router.route('/healthcheck').get(health);
router.route('/product').get(product);

module.exports = router