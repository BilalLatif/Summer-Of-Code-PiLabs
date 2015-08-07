var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var monk = require('monk');
var db = monk('localhost:27017/chat');

function FindById(id, fn)
{
  var collection = db.get('messagescollection');
  collection.findOne({_id:id},{},function(e,docs)
  {
    if (docs._id)
    {
      fn(null,docs);
    }
    else
    {
      fn(new Error('User ' + id + ' does not exist'));
    }
  });
}

function FindByUsername(username, fn)
{
  var collection = db.get('messagescollection');
  collection.findOne({username:username},{},function(e,docs)
  {
    if(docs!=null)
    {
      if (docs.username === username)
      {
        return fn(null, docs);
      }
    }
    return fn(null, null);
  });
}

var app = express();
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
passport.serializeUser(function(user, done)
{
  done(null, user._id);
});

passport.deserializeUser(function(id, done)
{
  FindById(id, function (err, user)
  {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done)
  {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    FindByUsername(username, function(err, user)
    {
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
app.use(express.static(__dirname + '/public'));

app.get('/loginfailed', function(req, res)
{
  res.send({error:true});
});

app.get('/GetPublicRoom', function(req, res)
{
  var collection = db.get('groupssss');
  collection.find({},{},function(e,docs)
  {
    res.send(docs);
  });
});

app.get('/GetRoom', function(req, res)
{
  var collection = db.get('groupssss');
  collection.find({},{},function(e,docs)
  {
    res.send(docs);
  });
});

app.get('/GetComment', function(req, res)
{
  var collection = db.get('commentssss');
  collection.find({},{},function(e,docs)
  {
    res.send(docs);
  });
});

app.get('/GetUser', function(req, res)
{
  if(req.isAuthenticated())
    res.send(req.user.fullname);
  else
    res.send("");
});


app.get('/Logout', function(req, res)
{
  req.logout();
  res.send({msg:"success"});
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login

app.post('/Login', passport.authenticate('local', { failureRedirect: '/loginfailed'}), function(req, res)
{
  res.send({msg:"success"});
});

app.post('/Register', function(req, res)
{
  var collection = db.get('messagescollection');
  collection.findOne({username:req.body.username},{},function(e,docs)
  {
    if(!docs)
    {
      collection.findOne({email:req.body.email},{},function(e,docs)
      {
        if(!docs)
        {
          collection.insert(req.body, function (err, doc) 
          {
            if (err)
            {
              res.db.send("There was a problem adding the information to the database.");
              res.send({error:true});
            }
            else
            {
              res.send({msg:"success"});
            }
          });
        }
        else
          res.send({msg:"email"});
      });
    }
    else
      res.send({msg:"username"});
  });
});

app.post('/PostRoom', function(req, res)
{
  req.body.timestamp = new Date();
  req.body.username = req.user.username;
  var collection = db.get('groupssss');
  collection.insert(req.body, function (err, doc)
  {
    if (err)
    {
      res.db.send("There was a problem adding the information to the database.");
      res.send({error:true});
    }
    else
    {
      res.send({msg:"success"});
    }
  });
});

app.post('/PostStory', function(req, res)
{
  req.body.timestamp = new Date();
  req.body.username = req.user.username;
  var collection = db.get('groupssss');
  collection.findOne({groupid:req.body.id},{},function(e,docs)
  {
    req.body.groupname=docs.title;
    collection = db.get('postssss');
    collection.insert(req.body, function (err, doc)
    {
      if (err)
      {
        res.db.send("There was a problem adding the information to the database.");
        res.send({error:true});
      }
      else
      {
        res.send({msg:"success"});
      }
    });
  });
});

app.post('/PostComment', function(req, res)
{
  req.body.timestamp = new Date();
  req.body.username = req.user.username;
  var collection = db.get('commentssss');
  collection.insert(req.body, function (err, doc)
  {
    if (err)
    {
      res.db.send("There was a problem adding the information to the database.");
      res.send({error:true});
    }
    else
    {
      res.send({msg:"success"});
    }
  });
});

app.post('/GetGroupName', function(req, res)
{
  var collection = db.get('groupssss');
  collection.findOne({_id:req.body.id},{},function(e,docs)
  {
    res.send(docs.title);
  });
});

app.post('/GetStory', function(req, res)
{
  var collection = db.get('postssss');
  collection.find({groupid:req.body.id},{},function(e,docs)
  {
    res.send(docs);
  });
});

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.

app.listen(3030);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.

function EnsureAuthenticated(req, res, next)
{
  if (req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/login');
}