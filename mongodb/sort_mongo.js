var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var mysort = { user: 1 }; // For Descending order { user: 1 }. // For Ascending order { user: -1 }
  dbo.collection("users").find().sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});