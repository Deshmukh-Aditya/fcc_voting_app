process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var app = express();
var mongoose = require('mongoose');
var polls = require('./models/poll');
var user = require("./models/user");
var routes = require('./routes');
var methodOverride = require('method-override');
var port = 8080;
var ip = process.env.IP;
var db = mongoose.connect(' mongodb://Ajinkya:9921956339@ds042698.mlab.com:42698/pollapp');
var poll = db.model('poll',polls);

var passport = require('passport');
var session = require('express-session');
require('dotenv').config({path: '../.env'});
require('./auth/facebook/passport')(passport);

mongoose.connection.once('open', function() {
								
  console.log('Listening on port: '+ port);
  app.use(express.static(path.join(__dirname + "/../client")));
  app.use('/controllers', express.static(process.cwd() + '/controllers'));
  app.use(bodyParser.json());
  app.set('view engine','html');
  
  //app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  routes(app, passport);
 
  
  app.get('/list',function(req,res){
    
    poll.find({},function(err,list){
        if(err)throw err;
        res.json(list);
    });
  });
  
  app.get('/list/question/:q',function(req,res){
    console.log(req.params.q);
    poll.find({question: req.params.q},function(err,list){
        if(err)throw err;
        res.send('/#/list/'+list[0]._id);
    });
  });
  
   app.get('/list/:id',function(req,res){
       console.log(req.params.id);
    poll.find({_id: req.params.id},function(err,data){
        if(err)throw err;
        res.json(data);
    });
  });
  
  app.post('/list/newpoll',function(req,res){
      
      console.log(req.body);
      var vote = [];
      for(var i=0;i<req.body.options.length;i++){
          vote.push(new Object({option: req.body.options[i],count:0}));
      }
      console.log(vote);
      var p = new poll({question:req.body.question,vote:vote});
      p.save(function(error){
          if(error){
              throw error;
          }
          res.json(p);
      });
  });
  
  app.put('/list/:id',function(req,res){
     console.log(req.body.option);
     poll.update(
         {
           _id: req.params.id,
           "vote.option":req.body.option
         },
         {$inc:{"vote.$.count":1}},
         function(error){
             if(error)console.log(error);
         }
     );
     res.json(poll);
  });
  

  
  app.put('/list/updateuser/postq',function (req, res) {
      poll.find({})
        user.update(
            {"_id":req.body.user._id},
            {"$addToSet":{"pollList":req.body.question}},
            function(error){
                if(error)console.log(error);
            });
        res.json(req.body.user);
    });
  
  app.delete('/list/delete/:q',function(req,res){
      poll.findOneAndRemove({
          question:req.params.q
      },function(err){
          if(err)throw err;
      });
      user.update({
          pollList:req.params.q
      },{$pull:{pollList:req.params.q}},function(err){
          if(err)throw err;
          res.json("Deleted!");
      });
  });
  
  app.listen(port);
});
