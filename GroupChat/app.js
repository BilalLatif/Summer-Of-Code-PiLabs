var port = 3030;
var messages={};

/////////
var express = require('express');
var app = express();
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
app.use('/', express.static(__dirname + '/public'));
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
});

app.get("/a", function(req,res,next){
	//console.log("/");
	res.send("Hello");
});
app.get("/user123", function(req,res,next){
	//console.log("/");
	//get data
var collection = req.db.get('messagescollection');
collection.find({},{},function(e,docs){

    console.log(docs);
    res.send(docs);
});
	//res.send(messages);
});
app.post("/user/*",jsonParser,function(req,res){
 // Set our collection
    var collection = req.db.get('messagescollection');

    // Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }
    });
 var path = req.params[0];
 console.log(path,req.body);
 messages[req.params[0]]=req.body;
});
var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});
