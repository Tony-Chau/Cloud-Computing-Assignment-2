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

function query(sql){
    con.query(sql, function(err){
        if (err){
            throw err;
        }
    });
}

module.exports = {
    Connect: function (){
        con.connect(function(err){
            if (err){
                throw err;
            }
        });
    },
    InsertTwitterTable: function (twitterID, text, time, author){
        var length = twitterID.length;
        for (var i = 0; i < length; i += 1){
            var message = text[i];
            var sql = 'INSERT INTO tonychau_twitterstream.TwitterTable(TwitterID, text, time, Author) VALUES';
            sql += '(\"' + twitterID[i] + '\", \"' + message + '\", \"' + time[i] + '\", \"' + author[i] + '\");';
            query(sql);
            //console.log(sql);
        }
    }, 
    ResetTwitterTable: function(){
        var sql = 'TRUNCATE tonychau_twitterstream.TwitterTable;';
        con.query(sql, function(err){
            if (err){
                throw err;
            }
        });
    },
    SelectTwitterTable : function(req, res, search){
        var sql = 'Select * FROM tonychau_twitterstream.TwitterTable;';
        con.query(sql, function(err, result){
            if (err){
                throw err;
            }
            //do stuff here
        });
    },
    InsertHashTable: function(hashName, TwitterID, twitterDate){
        var reset = 'TRUNCATE tonychau_twitterstream.HashTable;';
        var twitterid_validation = [TwitterID.length];
        var count = 0;
        for (var i = 0; i < TwitterID.length; i += 1){
            twitterid_validation[i] = false;
        }
        con.query("SELECT * FROM tonychau_twitterstream.HashTable;", function(err, result){
            for (var i = 0; i < result.length; i += 1){
                for (var j = 0; j < TwitterID.length; j += 1){
                    if (TwitterID[j] == result[i].TwitterID){
                        twitterid_validation[i] = true;
                    }else{
                        twitterid_validation[i] = false;
                        count += 1;
                    }                    
                }

            }
            if (result.length + count > 1000){
                query('TRUNCATE tonychau_twitterstream.HashTable;');
            }
            for (var i = 0; i < TwitterID.length; i += 1){
                if (!twitterid_validation[i]){
                    var sql = 'INSERT INTO tonychau_twitterstream.HashTable(HashName, TwitterID, TwitterDate) VALUE(\"' + hashName[i] + '\", \"' + TwitterID[i] + '\", \"'+twitterDate[i]+'\");';
                    query(sql);
                }
            }
        });
    },
    ResetHashTable: function(){
        var sql = 'TRUNCATE tonychau_twitterstream.HashTable;';
        query(sql);
    }
}
