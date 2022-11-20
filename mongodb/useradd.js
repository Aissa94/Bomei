var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongoose');



var app = express()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
})); //Added
//app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const port = process.env.PORT || 3000;

var db = mongo.connect("mongodb://0.0.0.0:27017/mydb")
.then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  });


var Schema = mongo.Schema;

var UsersSchema = new Schema({
    user: { type: String },
    password: { type: String },
}, { versionKey: false });

var model = mongo.model('users', UsersSchema);

var MessagesSchema = new Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
}, { versionKey: false });

var messages = mongo.model('messages', MessagesSchema);


//Added

app.post("/api/login", async(req, res) => {
    const {user, password} = req.body
    console.log(user, password)
    const resp = await model.findOne({user, password})
    if (!resp) {
        res.json({
            success: false,
            message: 'Incorrect details !'
        })
    } else {
        res.json({
            success: true
        })
        // make a session and set user to logged in.
        req.session.user = user
        req.session.save()
        console.log("logging you in")
    }
})

app.post("/api/isLoggedIn", (req, res) => {
    res.json({
        status: !!req.session.user
    })
})

app.post("/api/register", async(req, res) => {
    const {user, password} = req.body
    const existingUser = await model.findOne({user})
    console.log(existingUser, user, password)
    if (!existingUser) {
        res.json({
            success: false,
            message: 'User already in use !'
        })
        return
    }

    const mod = new model(req.body)
    const result = await mod.save()
})


app.get("/api/getData", function(req, res) {
    model.find({}).then(function (users) {
        res.send(users);
    });
})

app.post("/api/registerUser", async(req, res) => {
    const resp = await model.findOne(req.body.value)
    if (resp) {
        res.json({
            success: false,
            message: 'User already exists !'
        })
    } else {
        // make a session and set user to logged in.
        model.insertMany(req.body.value).then(function () {
            res.json({
                success: true
            })
        });
    }
})

app.post("/api/updateUser", async(req, res) => {
    //console.log(req.session.user, req.body.value)
    const user = await model.findOne({user: req.body.value.user})
    if (!user) {
        res.json({
            success: false,
            message: 'Invalid user!'
        })
    } else {
        await model.updateOne({user: req.body.value.user}, {$set: {password: req.body.value.password}})
        res.json({
            success: true
        })
    }
})

app.post("/api/deleteUser", async(req, res) => {
    const user = await model.findOne(req.body.id)
    if (!user) {
        res.json({
            success: false,
            message: 'Invalid user!'
        })
    } else {
        await model.deleteOne(req.body.id);
        res.json({
            success: true
        })
    }
})

app.post("/api/contactUs", (req, res) => {
    // make a session and set user to logged in.
    messages.insertMany(req.body.value).then(function () {
        res.json({
            success: true
        })
    });
})