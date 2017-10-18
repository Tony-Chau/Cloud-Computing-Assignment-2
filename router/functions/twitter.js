const Twit = require('twit');
var twitter = new Twit({
  consumer_key: 'Qoj9WAdgTGtPwb48VYSqdBEEF',
  consumer_secret: 'qkmWJtFTH08OYfPPEg3cX2XYiKmv3fCFj29c3P1b4Y34ICZ2Xf',
  access_token: '901995605249056768-GvylBUk69pnwaTHk57bfZiVSTuNBLlC',
  access_token_secret: 'bToRXg7TR7MylPex9kq3t3uJNgHGSeWMh8R5PAUH6FuLn'
});
const tool = require('./tools.js'); 


module.exports = {
  search: function (req, res){
    var query = req.query.q;
    var query = '#' + query; //(or %23)
    twitter.get('search/tweets', { q: query, count: 100, lang: 'en' }, function(err, data, response) {
      //var TwitterData = JSON.parse(data);
      //console.log(data);
      var TwitterData = JSON.stringify(data);
      // res.render('index', {
      //   Title: 'Twitter Hashtag Search',
      //   data: data
      // });
      TwitterData = JSON.parse(TwitterData);
      res.send(TwitterData);
    });
  }
}
