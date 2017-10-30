const dateFormat = require('dateformat');
const arraySort = require('array-sort');
module.exports = {
    isset : function(val){
        if (typeof val === 'undefined'){
            return false;
          }
          return true;
    },
    errorpage : function (req, res){
        //Make the error page
    },
    ChangeSymbol: function(val){
        return val.toString('utf8');
    },
    convertDateTimeToString: function(date){
        return dateFormat(date, 'yyyy-mm-dd hh:mm:ss');
    },
    ArrayTextFix: function(textArray){
        var newText = []; 
        for(var i = 0; i < textArray.length; i += 1){
            var s = textArray[i];
             s = s.replace(/'/gi,'%27');
             s = s.replace(/"/gi, "%22");
            newText.push(s);
        }
        return newText;
    },
    RemoveHtmlEncoding: function(textArray){
        var newText = []; 
        for (var i = 0; i < textArray.length; i += 1){
            var s = textArray[i];
            s = s.replace(/%27/, '\'');
            s = s.replace(/%22/, '\"');
            newText.push(s);
        }
        return newText;
    },
    Top10Search: function (rank){
        var top10Name = [];
        var top10Point = [];
        for (var i = 0 ; i < 10; i += 1){
            top10Name.push(rank[i].name);
            top10Point.push(rank[i].point);
        }
        return {
            name: top10Name,
            point: top10Point
        }
    },
    Ranking: function(name, point){
        var top = [name.length];
        for (var i = 0; i < name.length; i += 1){
            top[i] = {
                name: name[i],
                point: point[i]
            }
        }
        arraySort(top, 'point');
        top.reverse();
        console.log(top);
        return top;
    },
    fixRanking: function(rank, length){
        var name = [];
        var point = [];
        for (var i = 0; i < length; i += 1){
            name.push(rank[i].name);
            point.push(rank[i].point);
        }
        return {
            name: name,
            point: point
        }
    }
}