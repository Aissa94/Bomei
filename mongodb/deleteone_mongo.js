var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { user: 'Vicky' };
  dbo.collection("users").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 user deleted");
    db.close();
  });
});

