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
            var s = '';
            for(var j = 0; j < textArray[i].length; j += 1){
                if (textArray[j] == "'"){
                    s += "\'";
                }else if(textArray[j] == '"'){
                    s += '\"';
                }else{
                    s += textArray[j];
                }
            }
            newText.push(s);
        }
        return newText;
    }
}