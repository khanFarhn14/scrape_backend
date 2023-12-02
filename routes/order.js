const express = require('express')

const router = express.Router()
const { orderHistory, addOrder, recentOrders, updateRequestStatus, ordersFromUser } = require('../controllers/order');
router.route('/user/:mobile/history').get(orderHistory);
router.route('/user/:mobile/recent').get(recentOrders);
router.route('/user/:mobile/addorder').post(addOrder);
router.route('/user/:mobile/addorder').post(addOrder);
router.route('/admin/statusupdate').patch(updateRequestStatus);
router.route('/admin/allorders').get(ordersFromUser);

module.exports = router