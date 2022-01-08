require('dotenv').config();
const express = require('express');
const app     = express();
const cors    = require('cors');
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

// get all users
app.get('/account/all', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});

// get user by id
app.get('/account/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});


// create user account
app.post('/account/create', async(req, res) => {
    const { username, email, password} = req.body;
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


app.put('/account/update', async (req, res) => {

    const { email, amount } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email })
        if (user) {
            await user.update({ $inc: { balance: amount } })
            res.status(200).send('ok')
        } else {
            res.status(404).send('not found')
        }
    } catch (error) {
        console.log(error)
    }
})


var port = process.env.PORT || 3001;
app.listen(port);
console.log('Running on port: ' + port);