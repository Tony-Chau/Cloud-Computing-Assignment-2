const mysql = require('mysql');
const tool = require('./tools.js');
const lowerCase = require('lower-case');
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
                //Loops around the result to check of the search query table already exist
                var check = true;
                for (var i = 0; i < result.length; i += 1){
                    if (result[i].Name == lowerCase(search)){
                        check = false;
                    }
                }
                //If the table does not exist according to searchtable, then it will generate the table and update the searchtable
                if (check){
                    var sql = "CREATE TABLE  `tonychau_twitterstream`.`" + lowerCase(search) + "` ";
                    sql += "(TwitterID VARCHAR(255) NOT NULL, Name VARCHAR(255) NOT NULL, Time DATETIME NOT NULL);";
                    query(sql);
                    sql = "INSERT INTO `tonychau_twitterstream`.`SearchTable` (Name) VALUE ('" + lowerCase(search) + "');";
                    query (sql);
                }
            }
        });
    },
    InsertHash: function (search, length, HashName, twitterHashID, twitterHashDate){
        var q = "SELECT * FROM `tonychau_twitterstream`.`" + lowerCase(search) + "`;";
        con.query(q, function (err, result){
            if (err){
                throw err;
            }else{
                //Loops around the result from the database to prevent duplicate tweets from applying it
                for (var i = 0; i < twitterHashID.length; i += 1){
                    var check = true;
                    for (var j = 0; j < result.length; j += 1){
                        if (twitterHashID[i] == result[j].TwitterID){
                            check = false;
                        }
                    }
                    //Inserts new tweet hashtag
                    if (check){
                        var sql = "INSERT INTO `tonychau_twitterstream`.`" + lowerCase(search) + "`(TwitterID, Name, Time) VALUE ";
                        sql += "('" + twitterHashID[i] + "', '" + lowerCase(HashName[i]) + "', '" + twitterHashDate[i] + "');";
                        query(sql);
                    }
                }
            }
        });
    },
    getHashName: function(search, res){
        var sql = "SELECT * FROM `tonychau_twitterstream`.`" + lowerCase(search) + "`;";
        con.query(sql, function (err, result){
            console.log('Step 3');
            if (err){
                throw err;
            }else{
                //checks if there are any result, if not then sends them to the error page
                if (result.length > 0){
                    //adding all the result from the database within an array
                    var array = [result.length];
                    for (var i = 0; i < result.length; i += 1){
                        array.push(result[i].Name);
                    }
                    //eliminates every duplicate within the array
                    var entry = array.filter(function(elem, index, self){
                        return index == self.indexOf(elem);
                    });
                    console.log('step 4');
                    //Point counter to check how many repeated hashtags were on the list
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
                      var counter = 0;
                      setInterval(function(){
                        var counter = 0;
                        con.query(sql, function (err, result){
                            for (var i = 0; i < result.length; i += 1){
                                counter += 1;
                            }
                        });
                      }, 10);
                      //orders the array
                      var rank = tool.Ranking(entry, point);
                      //Find the top 10 search, but if less than varies depending on the result length
                      var top = tool.Top10Search(rank, entry.length);
                      //fixes up the rank glitch
                      rank = tool.fixRanking(rank, entry.length);
                      console.log('step 5');
                      var send = {
                        hash: rank.name,
                        point: rank.point,
                        topHash: top.name,
                        topPoint: top.point
                      }
                      //sends the send variable in a json format to send it to the graph.js
                      res.json(send);
                }else{
                    //returns null
                    send = {
                        hash: undefined,
                        point: undefined,
                        topHash: undefined,
                        topPoint: undefined
                    }
                    res.json(send);
                }
            }
        });
    },

}
