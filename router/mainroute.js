const express = require('express');
const app = express();
const router = express.Router();
const MySqlServer = require('./functions/mysql.js');
const twitter = require('./functions/twitter.js');
const tool = require('./functions/tools.js');
MySqlServer.Connect();

router.get('/', function(req, res){
  res.render('index', {
    Title: 'Twitter Hashtag Search',
  });
});


router.get('/Graph', function(req, res){
  //Checks if a query is present
  if (tool.isset(req.query.q)){
    res.render('twitterGraph', {
      Title: 'Twitter Hashtag Search',
      search_hashtag: req.query.q
    });
  }else{
    tool.errorpage(req, res);
  }
});

router.get('/GetQueries', function(req, res){
  //Checks if a query is present
  if (tool.isset(req.query.q)){
    var query = req.query.q;
    //Calls the twitter api and puts the new info (if any) into the database (please check twitter.js)
    twitter.search(query);
    //Allow the sql to complete its task
    setTimeout(function() {
      //Goes to the database 
      MySqlServer.getHashName(query, res);
    }, 60000);
  }
});

router.get('/error', function (req, res){
  res.render('error');
});

module.exports = router;