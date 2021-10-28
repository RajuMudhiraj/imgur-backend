const express = require('express');
const router = express.Router();

// Handling GET requests of /images
router.get('/', (req, res) =>{
    res.status(200).json({
        message: "I am in images router"
    })
})


module.exports = router;