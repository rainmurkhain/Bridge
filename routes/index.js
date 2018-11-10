const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../lib/User');

mongoose.Promise = global.Promise;

passport.use(new Strategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

router.use(bodyParser.json());
router.use(require('morgan')('combined'));
router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

router.use(passport.initialize());
router.use(passport.session());

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
});

router.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
});


const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;


var multer  = require('multer');



var upload = multer({
    storage: multer.diskStorage({
        destination: './Images/newsPicture',
        filename: function (req, file, callback) {
            //TODO: tee filename skeem
            console.log("Olen siin: " + req.toString());
            callback( null, file.originalname+ '-' + Date.now());
        }
    })
});

mongoose.connect("mongodb+srv://" + db_user + ":" + db_pass + "@cluster0-djbk6.mongodb.net/Bridge?retryWrites=true", { useNewUrlParser: true });

const newsSchema = new mongoose.Schema({
    title: String,
    news: String,
    pictureID: String,
    authorId: {type: Number, default: 1}
});

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

router.get('/lisa', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    res.sendFile(path.resolve('public/views/lisa.html'))
});

router.get('/meist', function(req, res, next) {
    res.sendFile(path.resolve('public/views/meist.html'))
});

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('public/views/login.html'))
});

router.get('/register', function(req, res, next) {
    res.sendFile(path.resolve('public/views/register.html'))
});

router.post("/addNews", upload.single("picture"),  (req, res) => {
    //Teen eraldi fieldid ja siis panen kokku
    let title = req.body.title;
    let body = req.body.news;
    let pictureID = req.file.filename;
    console.log("pildi ID: " + req.file.filename);

    let myData = new News ({
        title: title,
        news: body,
        pictureID: pictureID
    });
    myData.save()
        .then(item => {
            res.sendFile(path.resolve('public/views/index.html'));
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });

    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});



router.post("/meist", (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: 'bridge.eesti@gmail.com',
        to: req.body.email,
        subject: 'Külastage uut bridzilehte!',
        text: 'Sind on kutsutud külastama uut bridzilehte!'
    };

    transporter.sendMail(mailOptions, function (err, inf) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + inf.response)
        }
    });


    res.redirect("/meist");
});

router.post('/register', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const newuser = new User();
    newuser.username = username;
    newuser.password = password;
    newuser.firstname = firstname;
    newuser.lastname = lastname;

    newuser.save((err, savedUser) => {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    })
});

module.exports = router;