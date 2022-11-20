var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { password: /^S/ };
  var newvalues = {$set: {user: "Minnie"} };
  dbo.collection("users").updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.modifiedCount + " document(s) updated");
    db.close();
  });
});