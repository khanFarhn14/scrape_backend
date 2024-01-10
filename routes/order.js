const express = require('express')

const router = express.Router()
const { orderHistory, addOrder, recentOrders, updateRequestStatus, ordersFromUser, pendingOrdersFromUser } = require('../controllers/order');
router.route('/user/:mobile/order/history').get(orderHistory);
router.route('/user/:mobile/order/recent').get(recentOrders);
router.route('/user/:mobile/addorder').post(addOrder);
router.route('/admin/statusupdate').patch(updateRequestStatus);
router.route('/admin/settledorders').get(ordersFromUser);
router.route('/admin/pendingorders').get(pendingOrdersFromUser);

module.exports = router