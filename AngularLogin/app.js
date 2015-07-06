var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;
var port = process.env.PORT || 3001;
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
var dburl='localhost:27017/nodetest1';
if(process.env.PORT){
  dburl='angular:december181993@ds053312.mongolab.com:53312/angular';
}
var jsonParser = bodyParser.json();
var monk = require('monk');
var db = monk(dburl);


//var users = [{}];


var emailofcurrentuser,nameofcurrentuser;




function findById(id, fn) {
  var collection = db.get('Angulardb');
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
var collection = db.get('Angulardb');
      collection.findOne({username:username},{},function(e,docs){
    if(docs!=null){
     var user = docs;
    if (user.username === username) {
      return fn(null, user);
    } 
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
  
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
 
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
app.use('/', express.static(__dirname + '/public/'));







app.get('/loginfailed', ensureAuthenticated, function(req, res){
  console.log("in loginfailed");
  res.send({error:true});
});

app.get('/showlist', function(req, res){
  var collection = req.db.get('Angularblogs2');
      collection.find({},{},function(e,docs){
        console.log(docs);
        res.send(docs);
      });
  
});

//------------sigup---------------------------------------------------------------------------

app.post("/Signup",jsonParser,function(req,res){
  var collection = db.get('Angulardb');
      collection.findOne({email:req.body.email},{},function(e,docs){
        if(docs){
          console.log("already exist");
          //res.redirect('/signup');
          res.send(500);
          console.log("done");
        }
        else{
          var collection = req.db.get('Angulardb');

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
    
  });
  
});
//--------------------------------------------------------------------------------------------
app.post("/blogupdate",jsonParser,function(req,res){
  console.log("blog update",req.body.txt);
  var collection = db.get('Angularblogs2');
  req.body.username=nameofcurrentuser;
     collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }
    });
  
});

//------------sigup---------------------------------------------------------------------------
// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/Login', 
  passport.authenticate('local', { failureRedirect: '/loginfailed'}),
  function(req, res) {
    nameofcurrentuser=req.user.username;
    emailofcurrentuser=req.user.email;
    console.log("logged in",req.user.username);
    res.send({success:true});
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
  console.log("in logout");
  //req.session.reset();
  req.logout();

  //res.redirect('/');
});

app.listen(port);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}