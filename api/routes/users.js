const express = require('express');
const user = require('../models/user');
const router = express.Router();

const User = require('../models/user')

// Handling GET request to /users
router.get('/', (req, res) => {
    User.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            users: docs.map(doc =>{
                return {
                    email: doc.email,
                    password: doc.password,
                    _id: doc._id
                }
            })
        }
        res.status(200).json(response)
    })
    .then(err => {
        res.send(500).json({
            error: err
        })
    });
});


// Handling POST request to /users
router.post('/', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user
        .save()
        .then( response => {
            res.status(201).json({
                message:'user created successfully!' 
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

//Handling PATCH request to /users
router.patch('/:userId', (req, res) => {
    const id = req.params.userId;

    const updateOps ={}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    User.updateOne({_id:id}, {$set: updateOps})
    .exec()
    .then(response =>{
        res.status(201).json({
            message: 'updated'
        })
    })
    .catch(err => {
        res.status(500).json({
           error:err 
        })
    })

})

//Handling DELETE request to /users
router.delete('/:userId', (req, res) => {
    const id = req.params.userId;

    User.remove({_id:id})
    .exec()
    .then(response =>{
        res.status(201).json({
            message: 'User deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
           error:err 
        })
    })

})

module.exports = router;