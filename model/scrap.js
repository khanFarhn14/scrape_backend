const mongoose = require('mongoose');

const scrapSchema = new mongoose.Schema({
    scrapName:{type:String, required: true},
    scrapPrice:{type:Number, required: true},
    scrapImage:{type: String, required: true},
    scrapCategory:{type: String, required: true},
}, {collection: 'scrap'})

module.exports = new mongoose.model('scrap', scrapSchema);