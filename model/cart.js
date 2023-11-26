const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    mobile: {
        type: Number, 
        required: true, 
        validate: {
        validator: function(value) {
          const phoneRegex = /^\d+$/;
          
          return phoneRegex.test(value);
          }
        }
    },
    cartItems:{
        type: Array
    }
}, {collection: 'cart'})

module.exports = new mongoose.model('cart', cartSchema);