var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
//var flash    = require('connect-flash');
//---------------------------database------------------------

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
var jsonParser = bodyParser.json();
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');


//var users = [{}];


var emailofcurrentuser;




function findById(id, fn) {
  var collection = db.get('trycollection3');
      collection.findOne({_id:id},{},function(e,docs){
        if (docs._id) {
    fn(null, docs);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
      });
  
}

function findByUsername(username, fn) {
  //-----------------------------------------------------
console.log("in user");
var collection = db.get('trycollection3');
      collection.findOne({username:username},{},function(e,docs){
    console.log("db",docs.password);
      //users=docs;
     // console.log("dbuser",docs.length);
      //for (var i = 0, len = docs.length; i < len; i++) {
    console.log("username",docs.username);
    var user = docs;
    if (user.username === username) {
      return fn(null, user);
    }
 // }
  return fn(null, null);
          });
      //--------------------------------------------------------------
    //console.log("dbuser",users.password);

  
}



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// configure Express
app.use(cookieParser());
//app.use(express.methodOverride());
app.use(session({
  
  secret: 'keyboard cat'
  //resave: true,
  //saveUninitialized: true,
  //cookie : { secure : false, maxAge : (40 * 60 * 60 * 1000)}, // 4 hours
}));

app.use(passport.initialize());
app.use(passport.session());




// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  console.log("ser",user);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log(id,"id");
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    //---------------------db authenticate-----------------------------

  findByUsername(username, function(err,user) {
    //res.send(docs);
      //console.log("given",user.username);
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
      return done(null, user);
    })
}
));







// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
//app.use(flash());
app.use('/', express.static(__dirname + '/public'));

app.use('/emails', express.static(__dirname + '/public/emails.html'));

app.use('/signup', express.static(__dirname + '/public/signup.html'));

app.use('/showemailonpage.html/*', express.static(__dirname + '/public/showemailonpage.html'));






app.get('/account', ensureAuthenticated, function(req, res){
  res.send(req.user);
});

app.get('/login', function(req, res){
  res.send("login karrrlo!");
  //res.redirect('/');
  //console.log("in login",res);
});
//----------------------------sent-----------------------------------------------------------
app.get('/sent', function(req, res){
  var collection = req.db.get('emailcollection');
  collection.find({sendfrom:emailofcurrentuser},{},function(e,docs){

    console.log("in sent",docs);
    res.send(docs);
});
  //res.redirect('/');
  //console.log("in login",res);
});
//---------------------------------sent end--------------------------------------------------

//-------------------------showemailonpage.html----------------------------------------------
app.get('/showemail/*', function(req, res){
   var collection = req.db.get('emailcollection');
  collection.find({_id:req.params[0]},{},function(e,docs){

    console.log("in sent",docs);
    res.send(docs);
});
 //console.log("showemail",req.params[0]);
 // res.redirect('/showemailonpage.html');
 // console.log("in login",res);
});

//-----------------------------------showemailonpage.htmlend---------------------------------



//------------sigup---------------------------------------------------------------------------

app.post("/Signup",jsonParser,function(req,res){
  var collection = db.get('trycollection3');
      collection.findOne({email:req.body.email},{},function(e,docs){
        if(docs){
          console.log("already exist");
          //res.redirect('/signup');
          res.send(500);
          console.log("done");
        }
        else{
          var collection = req.db.get('trycollection3');

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
       //res.redirect('/');   
        }
    
    /*var collection = req.db.get('trycollection3');

    // Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }
    });*/
  });
      //users=docs;
 // Set our collection
    
    //res.redirect('/');
    //console.log("dbcheck2",req.body);
});
//--------------------------------------------------------------------------------------------
app.post("/compose",jsonParser,function(req,res){
 // Set our collection
    var collection = req.db.get('emailcollection');

    req.body.sendfrom=emailofcurrentuser;
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
    //res.redirect('/emails');
    console.log("dbcheckfor emails",req.body);
});
//--------------------------------------------------------------------------------------------
//----------------------------getcompose------------------------------------------------------
app.get('/getcompose', function(req, res){
  var collection = req.db.get('emailcollection');
  collection.find({sendto:emailofcurrentuser},{},function(e,docs){

   // console.log(docs);
    res.send(docs);
});
  //console.log("in login",res);
});

//--------------------------getcomposeend-----------------------------------------------------

/*app.post("/logout",jsonParser,function(req,res){
 // Set our collection
 req.session.reset();
res.redirect('/');
   
});*/


//------------sigup---------------------------------------------------------------------------
// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/'}),
  function(req, res) {
    console.log("success",req.user);
    console.log("s2",req.session);
    console.log("semailofcurrentuser",req.user.email);
    emailofcurrentuser=req.user.email;

    res.redirect('/emails');
  });
  
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
/*
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
*/

app.get('/logout', function(req, res){
  
  //req.session.reset();
  req.logout();

  res.redirect('/');
});

app.listen(3030);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  console.log("req.userensure",req.user,req.session);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}