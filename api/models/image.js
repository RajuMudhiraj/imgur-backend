const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: {type:String, required: true},
    sourceLink:{type:String, required: true}
});

module.exports = mongoose.model('Image', imageSchema)