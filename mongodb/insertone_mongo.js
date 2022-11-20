var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { user: "Aissa", password: "123456" };
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 user inserted");
    db.close();
  });
});
