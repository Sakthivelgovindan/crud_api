var mysql = require('mysql');
var setting = require('../setting');


exports.executeSql = function( sql , callback){

    console.log(sql);
 
    var conn = mysql.createConnection(setting.dbConfig);


    conn.connect(function(err) {

        if (err){
            console.log(err);
            callback(null,err);
        }
        else{
            console.log('Connected');
            conn.query(sql,function(err,result,fields){
                if(err){
                    console.log(err);
                    callback(null,err);
                }
                else{
                    callback(result);
                }
            })
               
            
        }
       
    });
};