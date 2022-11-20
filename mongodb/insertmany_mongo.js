var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = [
    { _id: 2, user: 'John', password: 'Highway'},
    { _id: 3, user: 'Peter', password: 'Lowstreet'},
    { _id: 4, user: 'Amy', password: 'Apple'},
    { _id: 5, user: 'Hannah', password: 'Mountain'},
    { _id: 6, user: 'Michael', password: 'Valley'},
    { _id: 7, user: 'Sandy', password: 'Ocean'},
    { _id: 8, user: 'Betty', password: 'Green'},
    { _id: 9, user: 'Richard', password: 'Sky'},
    { _id: 10, user: 'Susan', password: 'One'},
    { _id: 11, user: 'Vicky', password: 'Yellow'},
    { _id: 12, user: 'Ben', password: 'Park'},
    { _id: 13, user: 'William', password: 'Central'},
    { _id: 14, user: 'Chuck', password: 'Main'},
    { _id: 15, user: 'Viola', password: 'Sideway'}
  ];
  dbo.collection("users").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of users inserted: " + res.insertedCount + "/n");
    console.log(res);
    db.close();
  });
});