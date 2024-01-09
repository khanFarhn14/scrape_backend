const express = require('express')

const router = express.Router()

const {createUser, updateUser, getAllUsers, userDetails}= require('../controllers/user')

router.route('/users').post(createUser);
router.route('/user/:mobile').get(userDetails).patch(updateUser);
router.route('/admin/allusers').get(getAllUsers);
module.exports = router