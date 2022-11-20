var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { password: /^O/ };
  dbo.collection("users").deleteMany(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.deletedCount + " document(s) deleted");
    db.close();
  });
});