require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log("Connected successfully to server");

    // database Name
    const dbName = 'bank';
    const db = client.db(dbName);

    // new user
    const username = 'user' + Math.floor(Math.random()*10000);
    const email = username + '@mit.edu';
    const firebaseId = (Math.floor(Math.random()*100000000)).toString();
    const balance = 0;

    // insert into customer table
    var collection = db.collection('users');
    var doc = {username, email, firebaseId, balance};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document insert');
    });

    var users = db
        .collection('users')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:',docs);

            // clean up
            client.close();            
    });    

});
