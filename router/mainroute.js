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

var listSearch = []

router.get('/Graph', function(req, res){
  if (tool.isset(req.query.q)){
    listSearch.push(req.query.q);
    MySqlServer.Connect();
    twitter.search(req, res);
    setTimeout(function() {
      res.render('index', {
        Title: 'Twitter Hashtag Search',
        search_hashtag: search
      });
    }, 20000);
    

  }
  tool.errorpage(req, res);
});

router.get('/GetQueries', function(req, res){
  MySqlServer.Connect();
  var query = listSearch[-1];
  MySqlServer.getHashName(req.query.q, res);
});

module.exports = router;