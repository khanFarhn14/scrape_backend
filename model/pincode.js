const mongoose = require('mongoose');

const pincodeSchema = new mongoose.Schema({
    pincode:{type:Number, required: true},
    postalOffice:{type:String, required: true},
}, {collection: 'pincode'})

module.exports = new mongoose.model('pincode', pincodeSchema);