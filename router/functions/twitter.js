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
      var twitterHashID = [];
      var date = [];
      var twitterText = [];
      var twitterUser = [];
      var twitterMention = [];
      var twitterAuthor = [];
      var twitterID = [];
      var twitterDate = [];
      var twitterMentionName = [];
      var twitterMentionID = [];
      //Setting hashtag 
      for (var i = 0; i < length; i += 1){
        if (tool.isset(data.statuses[i])){
          var twitterDetail = data.statuses[i];
          var mention = twitterDetail.entities.user_mentions;
          var hash = twitterDetail.entities.hashtags; //This section here is a glitch where sometimes it works, but other times it doesn't
          for (var j = 0; j < hash.length; j += 1){
            hashdata.push(hash[j].text);
            twitterHashID.push(twitterDetail.id);
            date.push(twitterDetail.created_at);
          }
          for(var j = 0; j < mention.length; j += 1){
            twitterMentionName.push(mention[j].name);
            twitterMentionID.push(twitterDetail.id);
          }
          twitterUser.push(twitterDetail.user.name); 
          twitterText.push(twitterDetail.text); 
          twitterID.push(twitterDetail.id);
          twitterDate.push(tool.convertDateTimeToString(twitterDetail.created_at));
  
        }
      }
      var twitterHashDate = [];
      twitterText = tool.ArrayTextFix(twitterText);
      //Setting up name
      for (var i = 0; i < twitterHashID.length; i+= 1){
        var datetime = tool.convertDateTimeToString(date[twitterHashID[i]]);
        twitterHashDate.push(datetime);
      }
      mysql.InsertHashTable(hashdata, twitterHashID, twitterHashDate);
      mysql.InsertTwitterTable(twitterID, twitterText, twitterDate, twitterUser);
      mysql.InsertMentionTable(twitterMentionName, twitterMentionID);        
      res.send(data);
    });
  },
  stream: function (req, res){
    
  }
}
