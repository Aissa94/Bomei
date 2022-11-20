var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { password: "Canyon" };
  var newvalues = { $set: {user: "Mickey", password: "Valley" } };
  // Or we can update only specific fields: var newvalues = { $set: { password: "Valley" } };
  dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.modifiedCount + " user updated");
    db.close();
  });
});