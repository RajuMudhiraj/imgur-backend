const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')



const Like = require('../models/like')
// Handling POST requests to /likes route

router.get('/', checkAuth, (req, res) => {
    console.log(req.userData)
    Like.find()
    .populate('imageId', '_id name sourceLink')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            likes: docs.map(doc => {
                return {
                    _id:doc._id,
                    image: doc.imageId

                }
            })

        })
    })
})

router.post('/', checkAuth, (req, res) => {
    const like  = new Like({
        imageId:req.body.imageId,
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

router.delete('/', checkAuth, (req, res) => {
    const id = req.body.likeId
    Like.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Like deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });    
} )

module.exports = router;