const express = require('express')

const router = express.Router()
const { scrapList, wires, eWastes, metals, papers, singleScrap, updateScrapPrice } = require('../controllers/scrap');
router.route('/scrap/all').get(scrapList);
router.route('/scrap/wires').get(wires);
router.route('/scrap/e-wastes').get(eWastes);
router.route('/scrap/metals').get(metals);
router.route('/scrap/papers').get(papers);
router.route('/scrap/:id').get(singleScrap);
router.route('/scrap/:id').patch(updateScrapPrice);
module.exports = router