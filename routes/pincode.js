const express = require('express')

const router = express.Router()
const { addPincode } = require('../controllers/pincode')

router.route('/admin/addpincode').post(addPincode)
module.exports = router