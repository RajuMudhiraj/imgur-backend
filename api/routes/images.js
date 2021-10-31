const express = require('express');
const router = express.Router();


// Handling GET request to /images
const Image = require('../models/image')

router.get('/', (req, res) => {
    Image.find()
        .select('name sourceLink _id')
        .exec()
        .then(docs => {
            console.log(docs)
            const response = {
                count: docs.length,
                images: docs.map(doc => {
                    return {
                        name: doc.name,
                        sourceLink: doc.sourceLink,
                        likes:doc.likes,
                        _id: doc._id

                    }
                })
            };
            res.status(200).json(response)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// Handling GET by ID request to /images
router.get('/:imageId', (req, res) => {
    const id = req.params.imageId
    Image.findById(id)
        .select('name sourceLink _id')
        .exec()
        .then(docs => {
            if (docs) {
                res.status(200).json({
                    name: docs.name,
                    sourceLink: docs.sourceLink,
                    _id: docs._id
                })
            }
            res.status(200).json(response)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// Handling POST request to /images
router.post('/', (req, res) => {
    const image = new Image({
        name: req.body.name,
        sourceLink: req.body.sourceLink
    })
    console.log(image)
    image
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Created image successfully",
                createdImage: {
                    name: result.name,
                    sourceLink: result.sourceLink
                }
            })
        })
        .catch(err => {

            console.log(err)
            res.status(500).json({
                error: err
            })
        });


})


// Handling PATCH request to /images
router.patch('/:imageId', (req, res) => {
    const id = req.params.imageId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Image.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated'

            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// Handling DELETE request to /images
router.delete('/:imageId', (req, res, next) => {
    const id = req.params.imageId;
    Image.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted'

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
});

module.exports = router;