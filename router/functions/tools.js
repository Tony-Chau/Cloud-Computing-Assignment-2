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
    Top10Search: function (name, point){
        var top = [name.length];
        for (var i = 0; i < name.length; i += 1){
            top[i] = {
                name: name[i],
                point: point[i]
            }
        }
        arraySort(top, 'point');
        top.reverse();
        var top10Name = [];
        var top10Point = [];
        for (var i = 0 ; i < 10; i += 1){
            top10Name.push(top[i].name);
            top10Point.push(top[i].point);
        }
        return {
            name: top10Name,
            point: top10Point
        }
        // var top = [10];
        // var topIndex = [10];
        // for (var i = 0; i < 10; i+= 1) {
        //     top[i] = 0;
        //     topIndex[i] = -1;
        // }
        // top[0] = point[0];
        // var max = 0;
        // for (var i = 0; i < point.length; i += 1){
        //     max = point[i];
        //     for (var j = 0; j < point.length; j += 1){
        //         if (i != j){
        //             if (point[j] > point[i]){
        //                 var check = true;
        //                 for (var k = 0; k < top.length; k += 1){
        //                     if (top[k] == j){
        //                         check = false;
        //                     }
        //                 }
        //                 if (check){
        //                     top[i] = i;
        //                 }
        //             }
        //         }
        //     }
        // }

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