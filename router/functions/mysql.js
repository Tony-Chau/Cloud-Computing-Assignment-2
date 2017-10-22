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

function query(sql){
    con.query(sql, function(err){
        if (err){
            throw err;
        }
    });
}

module.exports = {
    InsertTwitterTable: function (author, text, mentions, length){
        con.connect(function(err){
            if (err){
                throw err;
            }else{
                var sql = '';
                for (var i = 0; i < length - 1; i += 1){
                    sql += 'INSERT INTO tonychau_twitterstream.TwitterTable(author, text, mentions) VALUES (';
                    sql += "'"+ author[i]+ "', '" + text[i] + "', '" + mentions + "');";
                }
                con.query(sql, function(err){
                    if (err){
                        throw err;
                    }
                });
            }
        });
    }, 
    ResetTwitterTable: function(){
        con.connect(function(err){
            if (err){
                throw err;
            }else{
                var sql = 'TRUNCATE tonychau_twitterstream.TwitterTable;';
                con.query(sql, function(err){
                    if (err){
                        throw err;
                    }
                });
            }
        });
    },
    SelectTwitterTable : function(req, res, search){
        con.connect(function(err){
            if (err){
                throw err;
            }else{
                var sql = 'Select * FROM tonychau_twitterstream.TwitterTable;';
                con.query(sql, function(err, result){
                    if (err){
                        throw err;
                    }
                    //do stuff here
                });
            }
        });
    },
    InsertHashTable: function(hashName, TwitterID){
        con.connect(function(err){
            if (err){
                throw err;
            }else{
                var reset = 'TRUNCATE tonychau_twitterstream.HashTable;';
                query(reset);
                for (var i = 0; i < hashName.length; i += 1){
                    var sql = 'INSERT INTO tonychau_twitterstream.HashTable(HashName, TwitterID) VALUE(\'' + hashName[i] + '\', ' + TwitterID[i] + ');';
                    query(sql);
                }
            }
        });
    },
    ResetHashTable: function(){
        con.connect(function(err){
            if (err){
                throw err;
            }else{
                var sql = 'TRUNCATE tonychau_twitterstream.HashTable;';
                query(sql);
            }
        });
    }
}
