const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    imageId: {type:mongoose.Schema.Types.ObjectId, ref:'Image', required: true}    
});

module.exports = mongoose.model('Like', likeSchema)