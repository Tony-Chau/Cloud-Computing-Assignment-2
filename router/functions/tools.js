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
    }
}