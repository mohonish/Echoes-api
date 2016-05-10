var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var Echoes_Collection = "echoes"

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var db;
var mongodb_URI = "mongodb://admin:@dmin!23@ds043022.mlab.com:43022/echoesdb"

mongodb.MongoClient.connect(mongodb_URI, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready!")

  //initialize app
  var server = app.listen(process.env.port || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

});

//TODO: routes.

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

 });

 app.post("/echoes", function(req, res) {

 });

 
