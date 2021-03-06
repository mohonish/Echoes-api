var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var ECHOES_COLLECTION = "echoes"

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var db;
var mongodb_URI = "mongodb://admin:admin@ds043022.mlab.com:43022/echoesdb"
//var mongodb_URI = "mongodb%3A%2F%2Fadmin%3A%40dmin%2123%40ds043022.mlab.com%3A43022%2Fechoesdb"

mongodb.MongoClient.connect(mongodb_URI, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready!")

  //initialize app
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

});

//TODO: more routes, and more descriptive.

// Generic error handler reused.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/* "/echoes"
 * GET: find all echoes.
 * POST: create a new echo.
 */

 app.get("/echoes", function(req, res) {
   db.collection(ECHOES_COLLECTION).find({}).toArray(function(err, docs) {
     if (err) {
       handleError(res, err.message, "Failed to get echoes!");
     } else {
       res.status(200).json(docs);
     }
   });
 });

 app.post("/echoes", function(req, res) {
   console.log("Received POST req! body: " + req.body);

   var newEcho = req.body;
   newEcho.createDate = new Date();

   //TODO: validation for title, body, and from.

   console.log("Inserting to DB:" + newEcho);

   db.collection(ECHOES_COLLECTION).insertOne(newEcho, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to create new echo!");
     } else {
       console.log("Created new Echo!");
       res.status(201).json(doc.ops[0]);
     }
   });

 });
