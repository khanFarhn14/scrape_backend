const express = require('express')

const router = express.Router()
const { scrapList, wires, eWastes, metals, papers } = require('../controllers/scrap');
router.route('/scrap/all').get(scrapList);
router.route('/scrap/wires').get(wires);
router.route('/scrap/e-wastes').get(eWastes);
router.route('/scrap/metals').get(metals);
router.route('/scrap/papers').get(papers);
module.exports = router