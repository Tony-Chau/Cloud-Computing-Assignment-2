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

router.get('/:search_param', function(req, res){
  if (tool.isset(req.params.search_param) && tool.isset(req.query.q)){
    var search_param = req.params.search_param;
    console.log(search_param);
    if(search_param == 'Graph'){
      twitter.search(req, res);
      //res.send(search_param);
    }else if (search_param == 'Stream'){
      res.send(search_param);
    }else if (search_param == 'twitterGraph'){
      res.render('twitterGraph', {
        Title: 'Twitter Hashtag Search',
      });
    }
  }
  //tool.errorpage(req, res);
  res.render('twitterGraph', {
    Title: 'Twitter Hashtag Search',
  });
});

module.exports = router;
