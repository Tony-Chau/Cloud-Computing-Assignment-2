const Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'Qoj9WAdgTGtPwb48VYSqdBEEF',
    consumer_secret: 'qkmWJtFTH08OYfPPEg3cX2XYiKmv3fCFj29c3P1b4Y34ICZ2Xf',
    access_token_key: '901995605249056768-GvylBUk69pnwaTHk57bfZiVSTuNBLlC',
    access_token_secret: 'bToRXg7TR7MylPex9kq3t3uJNgHGSeWMh8R5PAUH6FuLn'
  });

//   client.get('search/tweets', {q: '#'}, function(error, tweets, response) {
//     console.log(tweets);
//     console.log(response);
//  });

 client.get('search/tweets', {q: '%40twitterapi', lang: 'en', count: 1000}, function(error, tweets, response) {
    console.log(tweets);
  });

  
