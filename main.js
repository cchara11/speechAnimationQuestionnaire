var express = require("express");
var app     = express();
var path    = require("path");
var session = require("express-session");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient   = require('mongodb').MongoClient,
  assert  = require('assert');

var url = 'mongodb://const:04061991@ds133496.mlab.com:33496/lipsync'

app.use(cookieParser('lipsync'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(session({ 
  secret: 'lipsync', 
  cookie: { secure: false , httpOnly:false},
}));

app.get('/connectAndInsertAnswers', function(req, res, next)
{
  var answers = req.query.answers2;
  var sessionID = req.sessionID;
  var documentName = 'userAnswers';

  answers[0].sess = sessionID;  

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertAnswers(db, answers, function(){
      db.close();
    });
  });
})

app.get('/connectAndInsertDemographics', function(req, res, next)
{
  var demographics = req.query.demographics;
  var sessionID = req.sessionID;
  var documentName = 'userDemographics';

  demographics[0].session = sessionID;

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertDemographics(db, demographics, function(){
      db.close();
    });
  });
})

var insertAnswers = function(db, answers, callback) {
  var collection = db.collection('userAnswers');

  collection.insert(answers, function(err, result) 
  {
    assert.equal(err, null);
    if (err)
    {
      console.log("Insertion error");
    }
    else
    {
      console.log("Success");
    }
    callback(result);
  });
}

var insertDemographics = function(db, demographics, callback) {
  var collection = db.collection('userDemographics');

  collection.insert(demographics, function(err, result) 
  {
    assert.equal(err, null);
    if (err)
    {
      console.log("Insertion error");
    }
    else
    {
      console.log("Success");
    }
    callback(result);
  });
}

app.use(express.static('public'))

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(process.env.PORT || 3000, function(){
});

console.log("Running at Port 3000");