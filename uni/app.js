var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
var dburl='localhost:27017/nodetest6';
if(process.env.PORT){
  dburl='rateit:december181993@ds059722.mongolab.com:59722/rateit';
}
var jsonParser = bodyParser.json();
var monk = require('monk');
var db = monk(dburl);


var emailofcurrentuser,nameofcurrentuser;




function findById(id, fn) {
  var collection = db.get('angularpdb3');
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
var collection = db.get('angularpdb3');
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
  console.log("invalid");
  res.send({error:true});
});



app.get('/getuser', function(req, res){
  if(req.isAuthenticated()){
      res.send(req.user.username);
  }
  else{
        res.send("");    
  }

  
});



app.post("/person",jsonParser,function(req,res){
  console.log("check dep",req.body.dep);
  if(req.body.dep==1){
    req.body.dep="cs";
  }
  else if(req.body.dep==2){
    req.body.dep="ee";
  }
  else if(req.body.dep==3){
    req.body.dep="bba";
  }
  else if(req.body.dep==4){
    req.body.dep="sc";
  }
 var collection = db.get('persondatan');
      collection.find({tdep:req.body.dep},{sort:{tlikes:-1}},function(e,docs){
        console.log("in /person",docs);
        res.send(docs);
      });
  
});

//------------sigup---------------------------------------------------------------------------


app.post("/Signup",jsonParser,function(req,res){
  var collection = db.get('angularpdb3');
      collection.findOne({email:req.body.email},{},function(e,docs){
        if(docs){
          console.log("already exist");
          //res.redirect('/signup');
          res.send({error:true});
          console.log("done");
        }
        else{
          var collection = req.db.get('angularpdb3');

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
app.post("/personinsert",jsonParser,function(req,res){
  console.log("in insert",req.body);
  var collection = db.get('persondatan');
     collection.insert(req.body, function (err, doc) {
        if (err) {
          console.log("error");
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
          console.log("data added",req.body);
            res.sendStatus(200);
        }
    });
  
});


//start from here-----------------------------------------------------------------------------------------------------------
app.post("/personlike",jsonParser,function(req,res){
  console.log("in insert",req.body);
   var collection = db.get('personlikes9');
      collection.findOne({$and:[{email:emailofcurrentuser},{tid:req.body.tid}]},{},function(e,docs){
        if(docs){
          console.log("user with id exist like",docs);
          if(docs.lastupdate=="unlike"){
            collection.update({$and:[{email:emailofcurrentuser},{tid:req.body.tid}]},{$set:{lastupdate:"like"}},{upsert:true});
            var collection2 = db.get('persondatan');
           collection2.findOne({_id:req.body.tid},{},function(e,docs){
            console.log("now likes",docs);
            collection2.update({_id:req.body.tid},{$inc:{tlikes:1,tdislikes:-1}},{upsert:true});
          }); 
           console.log("updated");
          }
          console.log("done");
          res.send(200);
        }
        else{
          console.log("user with id does not exist");
          var obj={};
          obj={email:emailofcurrentuser,tid:req.body.tid,lastupdate:"like"};
          var collect = db.get('personlikes9');
        collect.insert(obj, function (err, doc) {
            console.log("else me",doc);
          var collection2 = db.get('persondatan');
         collection2.update({_id:req.body.tid},{$inc:{tlikes:1}},{upsert:true});
           collection2.findOne({_id:req.body.tid},{},function(e,docs){
            console.log("now likes",docs);
          });
            res.send(200);
        });
         

      }
});
  
});


app.post("/personunlike",jsonParser,function(req,res){
  console.log("in insert",req.body);
   var collection = db.get('personlikes9');
      collection.findOne({$and:[{email:emailofcurrentuser},{tid:req.body.tid}]},{},function(e,docs){
        if(docs){
          console.log("user with id exist unlike");
          if(docs.lastupdate=="like"){
            collection.update({$and:[{email:emailofcurrentuser},{tid:req.body.tid}]},{$set:{lastupdate:"unlike"}},{upsert:true});
            console.log("updated");
             var collection2 = db.get('persondatan');
           collection2.findOne({_id:req.body.tid},{},function(e,docs){
            console.log("now likes",docs);
            collection2.update({_id:req.body.tid},{$inc:{tlikes:-1,tdislikes:1}},{upsert:true});
          }); 
           console.log("updated");
          
          }
          
          res.sendStatus(200);
        }
        else{
          console.log("user with id does not exist");
          var obj={};
          obj={email:emailofcurrentuser,tid:req.body.tid,lastupdate:"unlike"};
           var collect = db.get('personlikes9');
        collect.insert(obj, function (err, doc) {
            console.log("else me",doc);
           
        var collection2 = db.get('persondatan');
             collection2.update({_id:req.body.tid},{$inc:{tdislikes:1}},{upsert:true});
           collection2.findOne({_id:req.body.tid},{},function(e,docs){
             console.log("now unlikes",docs);
          
          }); 
           
            //collection2.update({$and:[{email:emailofcurrentuser},{tid:req.body.tid}]},{$inc:{tdislikes:1}},{upsert:true});
        //  });
            res.sendStatus(200);
        });
      }
});
  
});
//till here----------------------------------------------------------------------------------------

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
    console.log("logged in",salt);
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
  res.send({error:true});
}