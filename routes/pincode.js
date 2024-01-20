const express = require('express')

const router = express.Router()
const { addPincode, deletePincode, getPincodes } = require('../controllers/pincode')

router.route('/admin/addpincode').post(addPincode)
router.route('/admin/deletepincode').delete(deletePincode)
router.route('/admin/pincodes').get(getPincodes)
module.exports = router