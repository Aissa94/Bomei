var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { user: "Vicky" };
  dbo.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});