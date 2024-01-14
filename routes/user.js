const express = require('express')

const router = express.Router()

const {createUser, updateUser, getAllUsers, userDetails, deleteUser}= require('../controllers/user')

router.route('/user').post(createUser);
router.route('/user/:mobile').get(userDetails).patch(updateUser);
router.route('/admin/allusers').get(getAllUsers);
router.route('/user/deleteaccount').delete(deleteUser);
module.exports = router