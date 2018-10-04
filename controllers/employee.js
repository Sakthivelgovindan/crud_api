var db = require('../core/db');
var httpMsg = require('../core/httpMsg');
var util = require('util');

exports.getList = function(req,resp){
    
    db.executeSql("SELECT * from employee",function(data,err){
        if(err){
          httpMsg.show500(req,resp,err);
        }
        else{
           httpMsg.sendJson(req,resp,data);
        }
         
       
    });
};

exports.get = function(req,resp,empno){

    db.executeSql("SELECT * from employee where empno="+empno,function(data,err){
        if(err){
          httpMsg.show500(req,resp,err);
        }
        else{
           httpMsg.sendJson(req,resp,data);
        }
         
       
    });

};

exports.add = function(req,resp,reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid");

        var data = JSON.parse(reqBody);
        console.log(data);
        if(data){
            var sql ="INSERT INTO employee(empno,ename,salary,deptno) values ";
            sql += util.format("('%s','%s','%s','%d')",data.empno,data.ename,data.salary,data.deptno);

            console.log(sql);
            db.executeSql(sql,function(data,err){
                if(err){
                  httpMsg.show500(req,resp,err);
                }
                else{
                   httpMsg.show200(req,resp);
                }
            }); 
        }
        else{
            throw new Error("Input not valid");
        }
    }
    catch(exce){
        httpMsg.show500(req,resp,exce);
    }
};

exports.update =  function(req,resp,reqBody){

    try{
        if(!reqBody) throw new Error("Input not valid");

        var data = JSON.parse(reqBody);
       
        if(data){

            if(!data.empno){
                throw new Error("Employee no invalid");
            }
            
            var sql = "UPDATE employee SET";
            var isDataProvided = false;

            if(data.ename){
                sql +=" ename='"+data.ename+",";
                isDataProvided = true;
            }

            if(data.salary){
                sql += " salary='"+data.salary+",";
                isDataProvided = true;
            }

            if(data.deptno){
                sql += " deptno="+data.deptno;
                isDataProvided = true;
            }
            //sql = sql.splice(0,-1);
            sql +=" WHERE empno = '"+data.empno+"'";

            console.log(sql);
            db.executeSql(sql,function(data,err){
                if(err){
                  httpMsg.show500(req,resp,err);
                }
                else{
                   httpMsg.show200(req,resp);
                }
            }); 
        }
        else{
            throw new Error("Input not valid");
        }
    }
    catch(exce){
        httpMsg.show500(req,resp,exce);
    }

};

exports.delete = function(req,resp,reqBody){

    try{
        if(!reqBody) throw new Error("Input not valid");

        var data = JSON.parse(reqBody);
       
        if(data){

            if(!data.empno){
                throw new Error("Employee no invalid");
            }
            
            var sql = "DELETE FROM employee ";
           
            sql +="WHERE empno = "+data.empno;

           console.log(sql);

            db.executeSql(sql,function(data,err){
                if(err){
                  httpMsg.show500(req,resp,err);
                }
                else{
                   httpMsg.show200(req,resp);
                }
            }); 
        }
        else{
            throw new Error("Input not valid");
        }
    }
    catch(exce){
        httpMsg.show500(req,resp,exce);
    }

};