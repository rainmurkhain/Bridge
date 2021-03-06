const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../lib/User');
const bcrypt = require('bcryptjs');

var app = express(), request = require('request');


mongoose.Promise = global.Promise;

passport.use(new Strategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (bcrypt.compareSync(password, user.password) === 'false') {
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

router.get('/newsJSON', function(req, res, next) {
    News.find({}, (err, news) => {

        res.json(JSON.stringify(news));

    });

});

router.get('/news', (req, res, next) => {
    res.sendFile(path.resolve('public/views/news.html'));
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

    const io = require('../bin/www');

    io.emit('new news');

    //Teen eraldi fieldid ja siis panen kokku
    let title = req.body.title;
    let body = req.body.news;
    let pictureID = null;
    let myData = null;
    if (req.body.filename !== undefined) {
        pictureID = req.body.filename;
        myData = new News ({
            title: title,
            news: body,
            pictureID: pictureID
        });
    } else {
        myData = new News({
            title: title,
            news: body,
        });
    }

    myData.save()
        .then(item => {
            res.sendFile(path.resolve('public/views/index.html'));
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
    /*
    //kontrollib, kas fail tuli kaasa, aga see pole tegelikult vajalik hetkel
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
    */
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
    newuser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    newuser.firstname = firstname;
    newuser.lastname = lastname;

    newuser.save((err, savedUser) => {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).redirect('/login');
    })
});

const env = require('dotenv').config();

//!!!!!!!!!!!!!!! Following variables need changing !!!!!!!!!!!!!!!!!!!!!!
var clientId = process.env.AUTH_CLIENT_ID;
var clientSecret = process.env.AUTH_SECRET;
var redirect_uri = "https://bridge-ee.herokuapp.com";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var oauth2 = require('simple-oauth2')({
    clientID: clientId,
    clientSecret: clientSecret,
    site: 'https://id.smartid.ee',
    tokenPath: '/oauth/access_token',
    authorizationPath: '/oauth/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
    redirect_uri: redirect_uri
});


//Make it possible to show the image
app.use(express.static('public'));


// Callback service parsing the authorization token and asking for the access token
router.get('/smartid', function (req, res) {
    var code = req.query.code;
    var login = req.query.login;
    console.log("***** " + code + ", " + login);
    if (typeof code === 'undefined' && typeof login !== 'undefined') {
        res.redirect(authorization_uri);
        return;
    } else if (typeof code !== 'undefined') {
        oauth2.authCode.getToken({
            code: code,
            redirect_uri: redirect_uri
        }, saveToken);
    } else {
        var url = req.protocol + '://' + req.get('host')
        var pageHtml = '<strong>Click the image below to start login</strong><br>'
            + '<a href="?login=true"><img src="'+url+'/eidas.jpg"></img></a>';
        res.send(pageHtml);
    }


    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error.message);
        }
        console.log("Saving token");
        token = oauth2.accessToken.create(result);
        request({
            url: 'https://id.smartid.ee/api/v2/user_data',
            headers: {
                "Authorization": "Bearer " + token.token.access_token
            }

        }, function (err, userResult) {

            //return res.status(200).json(token)
            res.redirect('/');
        });
    }

});


module.exports = router;

