const moment = require('moment');

function timeAndDateController(){
    return{
        convertToMilliSeconds(num){
         return (  Number(num.split(":")[0]) * 60 +
            Number(num.split(":")[1]) * 1000 );    
        },
        formatDate(date){
            return moment.utc(date,"DD-MM-YYYY",true).format()
        }
    }
}

module.exports = timeAndDateController;