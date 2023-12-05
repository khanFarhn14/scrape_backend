const express = require('express')

const router = express.Router()
const { CartItems, addItem, deleteItem, clearCartList } = require('../controllers/cart');
router.route('/user/:mobile/cart').get(CartItems).put(addItem).delete(deleteItem)
router.route('/user/:mobile/cart/clearlist').delete(clearCartList);
module.exports = router