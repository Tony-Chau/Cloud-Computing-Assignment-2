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
    }
}