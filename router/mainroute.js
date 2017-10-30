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
    MySqlServer.Connect();
    res.render('twitterGraph', {
      Title: 'Twitter Hashtag Search',
      search_hashtag: req.query.q
    });
  }
  tool.errorpage(req, res);
});

router.get('/GetQueries', function(req, res){
  if (tool.isset(req.query.q)){
    var query = req.query.q;
    twitter.search(query);
    setTimeout(function() {
      MySqlServer.getHashName(query, res);
    }, 20000);
  }
});

module.exports = router;