require('dotenv').config();
const express = require('express');
const app     = express();
const cors    = require('cors');
const User = require('./models/User')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const firebase = require('./config/firebase.js');
const corsOptions = {
    origin: process.env.CLIENT_URL,
}
const decodeToken = require('./middlewares/authFB');
// connect to mongo database
mongoose
    .connect(process.env.DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then((x) => console.log(`Connected to MongoDB, database: ${x.connections[0].name}`))
    .catch(err => console.error('Could not connect to MongoDB', err));

// middlewares
// used to serve static files from public directory
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use(decodeToken);

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

// get user by firebaseId
app.get('/account', function (req, res) {
    /* const { firebaseId } = req.body; */
    const { firebaseId } = req.query;
    User.find({firebaseId: firebaseId}, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

// create user account
app.post('/account/create', async(req, res) => {
    const { name, email, password} = req.body;
    console.log(req.body);
    try {
        const firebaseUser = await firebase.auth().createUser({
            email,
            emailVerified: true,
            password,
            disabled: false
        })
        console.log('firebaseUser', firebaseUser)
        const dbUser = await User.create({name, email, firebaseId: firebaseUser.uid, balance: 0})
        console.log('dbUser', dbUser)
    } catch (error) {
        console.log(error)
    }
    res.status(200).send('ok')
})

app.put('/account/update', async (req, res) => {
    const { _id, amount } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ _id })
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