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
    twitter.search(req, res);
    setTimeout(function() {
      console.log('Step 1');
      MySqlServer.getHashName(req.query.q, res);
    }, 20000);
    

  }
  tool.errorpage(req, res);
});

module.exports = router;