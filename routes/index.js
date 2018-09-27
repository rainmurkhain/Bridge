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

        news.forEach((news1) => {

            News.findById(news._id).populate(authorId).

        })

    });

    /*News.find({}, (err, news) => {
        let newsObjects = [];

        news.forEach((oneNews) => {

            let userName = "";
            let user1;

            console.log("News author id is: " + oneNews.authorId);

            Users.find({}, (err, users) => {

                users.forEach((user) => {

                    console.log("UserId is: " + user.userId);

                    if (user.userId === oneNews.authorId) {
                        user1 = user.userName;
                    }

                });

            });

            newsObjects.push(user1);
        });

        res.send(newsObjects);
        */
        /*
        Users.find({userId: news.body.authorId}, (err, author) => {
            res.send(author.body.userName)
        });
        res.send(news.body.title);
        res.send(news.body.news);
        */
    });
});




/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/views/index.html'))
});

router.get('/add', function(req, res, next) {
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

