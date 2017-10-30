const express = require('express');
const app = express();
const router = express.Router();
const MySqlServer = require('./functions/mysql.js');
const twitter = require('./functions/twitter.js');
const tool = require('./functions/tools.js');

router.get('/', function(req, res){
  res.render('index', {
    Title: 'Twitter Hashtag Search',
  });
});


router.get('/Graph', function(req, res){
  if (tool.isset(req.query.q)){
    app.locals.query = req.query.q;
    MySqlServer.Connect();
    twitter.search(req.query.q);
    setTimeout(function() {
      res.render('twitterGraph', {
        Title: 'Twitter Hashtag Search',
        search_hashtag: req.query.q
      });
    }, 20000);
    

  }
  tool.errorpage(req, res);
});

router.get('/GetQueries', function(req, res){
  var query = app.locals.query;
  twitter.search(query);
  setTimeout(function() {
    MySqlServer.getHashName(query, res);
  }, 20000);
  
});

module.exports = router;