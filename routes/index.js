const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Richard:R1chard!@cluster0-djbk6.mongodb.net/Bridge?retryWrites=true");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extend: true}));

const newsSchema = new mongoose.Schema({
    title: String,
    news: String
});

const News = mongoose.model("News", newsSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/views/index.html'))
});

router.get('/lisa', function(req, res, next) {
    res.sendFile(path.resolve('public/views/lisa.html'))
});

router.post("/addNews", (req, res) => {

    const myData = new News(req.body);
    myData.save()
        .then(item => {
            res.sendFile(path.resolve('public/views/index.html'));
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});



module.exports = router;

