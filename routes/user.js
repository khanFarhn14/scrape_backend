const express = require('express')

const router = express.Router()

const {createUser, updateUser, getAllUsers, userDetails}= require('../controllers/user')

router.route('/users').get(getAllUsers).post(createUser)
router.route('/users/:mobile').get(userDetails).patch(updateUser);
module.exports = router