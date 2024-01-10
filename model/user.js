const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 20},
    mobile: {
        type: Number, 
        required: true, 
        validate: {
        validator: function(value) {
          const phoneRegex = /^\d+$/;
          
          return phoneRegex.test(value);
          }
        },
        unique: true,
    },
    email: {
        type: String,
        required: true, 
        validate: {
        validator: function(value) {
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          
          return emailRegex.test(value);
          }
        }
    },
    address: {type: String, required: true}
}, {collection: 'users'});

module.exports = new mongoose.model('user', userSchema);
