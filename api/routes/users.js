const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth')


const User = require('../models/user')

// Handling GET request to /users
router.get('/', (req, res) => {
    User.find()
        .exec()
        .then(docs => {
            const response = {

                count: docs.length,
                users: docs.map(doc => {
                    return {
                        email: doc.email,
                        password: doc.password,
                        _id: doc._id,
                        name: doc.name
                    }
                })
            }
            res.status(200).json(response)
            
        })
        .then(err => {
            res.status(500).json({
                error: err
            })
        });
});


// Handling POST request to /users/signUp
router.post('/signUp', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(doc => {
            if (doc.length <= 0) {
                const hash = bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            name: req.body.name
                        })
                        user
                            .save()
                            .then(response => {
                                res.status(201).json({
                                    message: 'user created successfully!'
                                })
                            })
                    }
                })



            }
            else {
                res.status(200).json({
                    message: "User exists"
                })
            }
        })

        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});


// Handling POST request to /users/signIn
router.post('/signIn', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authentication failed'
                })
            }
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Authentication failed'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                            "secret",
                            {
                                expiresIn: "1h"

                            })
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        })
                    };
                    res.status(401).json({
                        message: 'Authentication failed'
                    })
                })
            }

        })

        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

//Handling PATCH request to /users
router.patch('/:userId', checkAuth, (req, res) => {
    const id = req.params.userId;

    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    User.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(response => {
            res.status(201).json({
                message: 'updated'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

//Handling DELETE request to /users
router.delete('/:userId', checkAuth, (req, res) => {
    const id = req.params.userId;

    User.remove({ _id: id })
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

module.exports = router;