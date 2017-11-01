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
