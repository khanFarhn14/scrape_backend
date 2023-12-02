const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    scrapName:{type:String, required: true},
    scrapImage:{type:String, required: true},
    weight:{type:String, required:true}, 
    requestStatus: {type:String, required:true},
    requestDate: {type:String, required:true},
    confirmationDate: {type:String, required:true},
})

const orderSchema = new mongoose.Schema({
    mobile:{type:Number, required: true, unique:true},
    orders: [productSchema]

}, {collection: 'order'})

module.exports = new mongoose.model('orders', orderSchema);