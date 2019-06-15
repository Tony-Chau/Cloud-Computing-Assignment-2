const Twit = require('twit');
var twitter = new Twit({
  consumer_key: 'Cannot find it',
  consumer_secret: 'Its a secret',
  access_token: 'Whant to know the access token?',
  access_token_secret: 'Haha. Never'
});
const tool = require('./tools.js'); 
const mysql = require('./mysql.js');

module.exports = {
  search: function (query){
    var hash = '#' + query; //(or %23)
    //Creates the table based on the query (or ignore creating a table if the table already exist)
    mysql.CreateTable(query);
    twitter.get('search/tweets', { q: hash, count: 100, lang: 'en' }, function(err, data, response) {
      var length = data.statuses.length;
      var HashName = [];
      var twitterHashID = [];
      var date = [];
      //Setting hashtag 
      for (var i = 0; i < length; i += 1){
        if (tool.isset(data.statuses[i])){
          var twitterDetail = data.statuses[i];
          var mention = twitterDetail.entities.user_mentions;
          var hash = twitterDetail.entities.hashtags; //This section here is a glitch where sometimes it works, but other times it doesn't
          for (var j = 0; j < hash.length; j += 1){
            HashName.push(hash[j].text);
            twitterHashID.push(twitterDetail.id);
            date.push(twitterDetail.created_at);
          }
        }
      }
      var twitterHashDate = [];
      //Setting up date
      for (var i = 0; i < twitterHashID.length; i+= 1){
        var datetime = tool.convertDateTimeToString(date[twitterHashID[i]]);
        twitterHashDate.push(datetime);
      }
      console.log('step 1');
      //Give it some time for the create table to process
      setTimeout(function() {
        //Insert the hashtag data to the mysql table
        mysql.InsertHash(query, length, HashName, twitterHashID, twitterHashDate);  
        console.log('step 2'); 
      }, 2000);
      
      //res.send(data);     
    });
  }
}
