const express = require('express')

const router = express.Router()
const { CartItems } = require('../controllers/cart');
router.route('/user/:mobile/cart').get(CartItems);
module.exports = router