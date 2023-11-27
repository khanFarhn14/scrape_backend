const express = require('express')

const router = express.Router()
const { scrapList } = require('../controllers/scrap');
router.route('/allscrap').get(scrapList);
module.exports = router