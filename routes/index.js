const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/views/index.html'))
});

router.get('/lisa', function(req, res, next) {
    res.sendFile(path.resolve('public/views/lisa.html'))
});

module.exports = router;

