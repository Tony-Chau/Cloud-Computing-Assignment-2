//Allan, make sure u include these details to ur mysql
const mysql = require('mysql');
const mysqlConnection = {
    dbHost: 'twitterstreamcloudcomputing.heliohost.org',
    dbDatabase: 'tonychau_twitterstream',
    dbUser: 'tonychau_manager',
    dbPassword: 'twitter'
}
var con = mysql.createConnection({
    host: mysqlConnection.dbHost,
    user: mysqlConnection.dbUser,
    password: mysqlConnection.dbPassword
});

//Connection Code
// con.connect(function(err){
//     if (err){
//         throw err;
//     }else{
//         console.log('Connected');
//     }
// });