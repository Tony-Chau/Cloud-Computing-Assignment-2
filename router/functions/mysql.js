const mysql = require('mysql');
const tool = require('./tools.js');
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
    CreateTable : function (search){
        con.query("SELECT * FROM `tonychau_twitterstream`.`SearchTable`;", function(err, result){
            if (err){
                throw err;
            }else{
                var check = true;
                for (var i = 0; i < result.length; i += 1){
                    if (result[i].Name == search.toLowerCase()){
                        check = false;
                    }
                }
                if (check){
                    var sql = "CREATE TABLE  `tonychau_twitterstream`.`" + search.toLowerCase() + "` ";
                    sql += "(TwitterID VARCHAR(255) NOT NULL, Name VARCHAR(255) NOT NULL, Time DATETIME NOT NULL);";
                    query(sql);
                    sql = "INSERT INTO `tonychau_twitterstream`.`SearchTable` (name) VALUE ('" + search.toLowerCase() + "');";
                    query (sql); 
                }
            }
        });
    },
    InsertHash: function (search, length, HashName, twitterHashID, twitterHashDate){
        var q = "SELECT * FROM `tonychau_twitterstream`.`" + search.toLowerCase() + "`;";
        con.query(q, function (err, result){
            if (err){
                throw err;
            }else{
                var SameID = [];
                for (var i = 0; i < result.length; i += 1){
                    for (var j = 0; j < twitterHashID.length; j += 1){
                        if (result[i].name == twitterHashID[j]){
                            SameID.push(twitterHashID[j]);
                        }
                    }
                }
                var newSameID = SameID.filter(function(elem, index, self){
                    return index == self.indexOf(elem);
                });
                for (var i = 0; i < twitterHashID.length; i += 1){
                    var check = true;
                    for (var j = 0; j < newSameID.length; j += 1){
                        if (newSameID[j] == twitterHashID[i]){
                            check = false;
                        }
                    }
                    if (check){
                        var sql = "INSERT INTO `tonychau_twitterstream`.`" + search.toLowerCase() + "`(TwitterID, Name, Time) VALUE ";
                        sql += "('" + twitterHashID[i] + "', '" + HashName[i].toLowerCase() + "', '" + twitterHashDate[i] + "');";
                        query(sql);
                    }
                }
            }
        });
    },
    getHashName: function(search, res){
        var sql = "SELECT * FROM `tonychau_twitterstream`.`" + search.toLowerCase() + "`;";
        con.query(sql, function (err, result){
            if (err){
                throw err;
            }else{
                var array = [result.length];
                for (var i = 0; i < result.length; i += 1){
                    array.push(result[i].Name);
                }
                var entry = array.filter(function(elem, index, self){
                    return index == self.indexOf(elem);
                });
                  var point = [entry.length];
                  for (var i = 0; i < entry.length; i += 1){
                    point[i] = 0;
                  }
                  for (var i = 0; i < entry.length; i += 1){
                    var increment = 0;
                    for (var j = 0; j < array.length; j += 1){
                      if (array[j] == entry[i]){
                        increment += 1;
                      }
                    }
                    point[i] += increment;
                  }
                  var top = tool.Top10Search(entry, point);
                  var send = {
                    hash: entry,
                    point: point,
                    topHash: top.name,
                    topPoint: top.point,
                    Title: 'Twitter Hashtag Search'
                  }
                  res.render('twitterGraph', send);
            }
        });
    }
}
