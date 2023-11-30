const express = require('express')

const router = express.Router()
const { orderHistory, addOrder, recentOrders, updateRequestStatus } = require('../controllers/order');
router.route('/user/:mobile/history').get(orderHistory);
router.route('/user/:mobile/recent').get(recentOrders);
router.route('/user/:mobile/addorder').post(addOrder);
router.route('/user/:mobile/addorder').post(addOrder);
router.route('/admin/statusupdate').patch(updateRequestStatus);

module.exports = router