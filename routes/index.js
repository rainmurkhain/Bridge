const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
//const password = require('password');
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
mongoose.Promise = global.Promise;

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

var app = express()

mongoose.connect("mongodb+srv://" + db_user + ":" + db_pass + "@cluster0-djbk6.mongodb.net/Bridge?retryWrites=true", { useNewUrlParser: true });

const newsSchema = new mongoose.Schema({
    title: String,
    news: String,
    pictureID: String,
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

router.get('/meist', function(req, res, next) {
    res.sendFile(path.resolve('public/views/meist.html'))
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

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.MAIL_PASS
        }
    });

    var mailOptions = {
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

module.exports = router;

function callMessagesApi() {
    var accessToken = oktaSignIn.tokenManager.get("accessToken");

    if (!accessToken) {
        return;
    }

    // Make the request using jQuery
    $.ajax({
        url: 'http://localhost:3000/api/messages',
        headers: {
            Authorization : 'Bearer ' + accessToken.accessToken
        },
        success: function(response) {
            // Received messages!
            console.log('Messages', response);
        },
        error: function(response) {
            console.error(response);
        }
    });
}

const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-598075.oktapreview.com/oauth2/default',
    clientId: '0oah83rrgn2Ie6qfy0h7',
    assertClaims: {
        aud: 'api://default'
    }
});

// The access token string, which should be obtained from the Authorization header on the request to your server
const accessTokenString = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Imk2UnRjSkxvbUg0e...';
/*
oktaJwtVerifier.verifyAccessToken(accessTokenString)
    .then(jwt => {
        // the token is valid
        console.log(jwt.claims);
    })
    .catch(err => {
        // a validation failed, inspect the error
    });
    */