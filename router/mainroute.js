const express = require('express');
const app = express();
const router = express.Router();
const MySqlServer = require('./functions/mysql.js');
const twitter = require('./functions/twitter.js');

router.get('/', function(req, res){
  res.render('index', {
    Title: 'Twitter Hashtag Search',
  });
});

router.get('/search', function(req, res){
  twitter.search(req, res);
});



module.exports = router;
