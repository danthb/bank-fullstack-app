require('dotenv').config();
const express = require('express');
const app     = express();
const cors    = require('cors');
const dal = require('./dal.js');
const e = require('express');
const User = require('./models/User')
const bodyParser = require('body-parser');
const corsOptions = {
    origin: process.env.CLIENT_URL,
}
const mongoose = require('mongoose');
const firebase = require('./config/firebase.js');

// connect to mongo
mongoose
    .connect(process.env.DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then((x) => console.log(`Connected to MongoDB, database: ${x.connections[0].name}`))
    .catch(err => console.error('Could not connect to MongoDB', err));

// used to serve static files from public directory
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cors(corsOptions));

//Routes
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

// create user account
app.post('/account/create', async(req, res) => {
    const { username, email, password, balance } = req.body;
    console.log(req.body);
    try {
        const firebaseUser = await firebase.auth().createUser({
            email,
            emailVerified: true,
            password,
            disabled: false
        })
        console.log('firebaseUser', firebaseUser)
        const dbUser = await User.create({username, email, firebaseId: firebaseUser.uid, balance: 0})
        console.log('dbUser', dbUser)
    } catch (error) {
        console.log(error)
    }
    res.status(200).send('ok')
})


/* app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});
 */
var port = process.env.PORT || 3001;
app.listen(port);
console.log('Running on port: ' + port);