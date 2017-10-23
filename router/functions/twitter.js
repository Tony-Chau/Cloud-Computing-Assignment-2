const Twit = require('twit');
var twitter = new Twit({
  consumer_key: 'Qoj9WAdgTGtPwb48VYSqdBEEF',
  consumer_secret: 'qkmWJtFTH08OYfPPEg3cX2XYiKmv3fCFj29c3P1b4Y34ICZ2Xf',
  access_token: '901995605249056768-GvylBUk69pnwaTHk57bfZiVSTuNBLlC',
  access_token_secret: 'bToRXg7TR7MylPex9kq3t3uJNgHGSeWMh8R5PAUH6FuLn'
});
const tool = require('./tools.js'); 
const mysql = require('./mysql.js');

module.exports = {
  search: function (req, res){
    //mysql.Connect();
    var query = req.query.q;
    var query = '#' + query; //(or %23)
    twitter.get('search/tweets', { q: query, count: 100, lang: 'en' }, function(err, data, response) {
      var length = data.search_metadata.count;
      var text = data.statuses[0].text;
      var hashdata = [];
      var twitterID = [];
      var date = [];
      for (var i = 0; i < length; i += 1){
        if (tool.isset(data.statuses[i])){
          var twitterDetail = data.statuses[i];
          var hash = twitterDetail.entities.hashtags; //This section here is a glitch where sometimes it works, but other times it doesn't
          for (var j = 0; j < hash.length; j += 1){
            hashdata.push(hash[j].text);
            twitterID.push(i);
          }
          date.push(twitterDetail.created_at);
        }
      }
      var twitterDate = [];
      for (var i = 0; i < twitterID.length; i+= 1){
        var datetime = tool.convertDateTimeToString(date[twitterDate[i]]);
        twitterDate.push(datetime);
      }
      mysql.InsertHashTable(hashdata, twitterID, twitterDate);
      res.send(data);
    });
  }
}
