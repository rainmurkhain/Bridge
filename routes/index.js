const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        res.sendFile(path.resolve('public/views/index.html'))
});

module.exports = router;
