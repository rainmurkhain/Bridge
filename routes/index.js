const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
//const password = require('password');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Richard:R1chard!@cluster0-djbk6.mongodb.net/Bridge?retryWrites=true");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extend: true}));

const newsSchema = new mongoose.Schema({
    title: String,
    news: String,
    authorId: {type: Number, default: 1}
});

const usersSchema = new mongoose.Schema({
    userId: Number,
    userName: String
});

const Users = mongoose.model("Users", usersSchema);

/*//Created a user
Users({userId: 1, userName: "Bridge fan"}).save();
*/

const News = mongoose.model("News", newsSchema);

router.get('/news', function(req, res, next) {

    News.find({}, (err, news) => {
        res.send(news);
    });
});




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

router.post("/lisa", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bridge.eesti@gmail.com',
            pass: 'R1chard!'
        }
    });

    const mailOptions = {
        from: 'bridge.eesti@gmail.com',
        to: req.body.emailAdd,
        subject: 'Külastage uut bridzilehte!',
        text: 'Külastage meid aadressil bridge-ee.herokuapp.com'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    //res.redirect("/");
});




module.exports = router;

