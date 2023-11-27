const express = require('express')

const router = express.Router()
const { CartItems, addItem } = require('../controllers/cart');
router.route('/user/:mobile/cart').get(CartItems).put(addItem);
module.exports = router