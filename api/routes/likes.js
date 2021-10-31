const express = require('express')
const router = express.Router();

const Like = require('../models/like')
// Handling POST requests to /likes route

router.post('/', (req, res) => {
    const like  = new Like({
        imageId:req.body.imageId,
        userId:req.body.userId
    })
    like.save()
    .then(response => {
        res.status(201).json({
            response
        })
    })
    .catch(err => {
        error:err
    })
})

module.exports = router;