const express = require('express')

const router = express.Router()
const { CartItems, addItem, deleteItem } = require('../controllers/cart');
router.route('/user/:mobile/cart').get(CartItems).put(addItem).delete(deleteItem);
module.exports = router