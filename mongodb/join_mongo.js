var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('positions').aggregate([
    { $lookup:
       {
         from: 'users',
         localField: 'user_id',
         foreignField: '_id',
         as: 'positiondetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});