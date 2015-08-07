var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
//var flash    = require('connect-flash');
//---------------------------database------------------------

app.get('/GetLinkedinProfileData', function(req, res){
//var collection = db.get('blogs');
  //collection.find({},{},function(e,docs){
    //res.send(docs);
  //});


request('https://pk.linkedin.com/pub/muhammad-faizan-uddin/67/58a/b57', function(error, response, body)
{
        var Skill = [];
        var Experience = [];
        var Data = {};
      if(!error && response.statusCode == 200)
      {
        var $ = cheerio.load(body);
        $('.endorse-item-name-text').each(function(i, element)
        {
          Skill.push(element.children[0].data);
        });
  //      console.log(Skills);
        $('#background-experience').each(function(i, element)
        {
          for (i = 1; i < (element.children.length-1); i++)
          {
            var Position;
            var Company;
            var Duration;
            if(element.children[i].children[0].children[0].children[0].name == "h5")
            {
              Position = element.children[i].children[0].children[0].children[1].children[0].children[0].data;
              Company = element.children[i].children[0].children[0].children[2].children[0].children[0].data;
            }
            if(element.children[i].children[0].children[0].children[0].name == "h4")
            {
              Position = element.children[i].children[0].children[0].children[0].children[0].children[0].data;
              Company = element.children[i].children[0].children[0].children[1].children[0].children[0].data;
            }
            Duration = element.children[i].children[0].children[1].children[0].children[0].data;
            Duration += element.children[i].children[0].children[1].children[0].next.data;
            if(i > 1)
            {
              Duration = element.children[i].children[0].children[1].children[1].next.children[0].data;
              Duration += element.children[i].children[0].children[1].children[1].next.next.data;
            }
            var x ={position:Position,company:Company,duration:Duration};
            Experience.push(x);
          }
          Data = {skills: [Skill],Experience: [Experience]};
        });
      }
      res.send(Data);
    });
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
var dburl='localhost:27017/nodetest2';
if(process.env.PORT){
  dburl='angular:december181993@ds053312.mongolab.com:53312/angular';
}
var jsonParser = bodyParser.json();
var monk = require('monk');
var db = monk(dburl);


//var users = [{}];


var emailofcurrentuser,nameofcurrentuser;




function findById(id, fn) {
  var collection = db.get('angularpdb');
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
var collection = db.get('angularpdb');
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
  res.send({error:true});
});

app.get('/aboutus', function(req, res){
  var collection = req.db.get('angularpdb');
      collection.findOne({email:emailofcurrentuser},{},function(e,docs){
        console.log(docs);
        res.send(docs);
      });
  
});

app.get('/getuser', function(req, res){
  if(req.isAuthenticated()){
      res.send(req.user.username);
  }
  else{
        res.send("");    
  }

  
});

//------------sigup---------------------------------------------------------------------------

app.post('/Post', 
  function(req, res) {
var collection = db.get('messagescollection');
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.db.send("There was a problem adding the information to the database.");
            res.send({error:true});
        }
        else {
//          res.send({msg:"success"});
          res.send(req.body);
        }
    });
  });

app.post("/Signup",jsonParser,function(req,res){
  var collection = db.get('angularpdb');
      collection.findOne({email:req.body.email},{},function(e,docs){
        if(docs){
          console.log("already exist");
          //res.redirect('/signup');
          res.send(500);
          console.log("done");
        }
        else{
          var collection = req.db.get('angularpdb');

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

app.get('/logout', function(req, res){
  //req.session.reset();
  req.logout();

  res.send({success:true});
});

app.listen(port);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) { return next(); }
  res.redirect('/getuser');
}