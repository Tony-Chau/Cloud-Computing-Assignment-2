const dateFormat = require('dateformat');

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
    Top10Search: function (name, point){
        var top = [10];
        for (var i = 0; i < 10; i++) {
            top[i] = 0;
            
        }
        var best = 0;
        var count = 0;
        for (var i = 0; i < point.length; i += 1){
            if (point[i] > best){
                var check = true;
                for (var j = 0; j < 10; j += 1){
                    if (i == top[j]){
                        check = false;
                    }
                }
                if (check){
                    best = point[i];
                }
                if (best > top[count]){
                    top[count] = best;
                    count += 1;
                }
            }
        }
        var assignNames = [10];
        var assignPoint = [10];
        for(var i = 0; i < 10; i += 1){
            assignNames[i] = name[top[i]];
            assignPoint[i] = point[top[i]];
        } 
        return {
            name: assignNames,
            point: assignPoint
        }
    }
}