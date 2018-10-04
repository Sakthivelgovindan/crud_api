var http = require("http");
var emp = require('../controllers/employee');
var setting = require('../setting');
var httpMsg = require('../core/httpMsg');

http.createServer(function(req,resp){
    console.log(req.method);
    switch(req.method){

        case "GET":

            if(req.url === '/'){
                httpMsg.showHome(req,resp);
            }

            else if(req.url === '/employees'){
                emp.getList(req,resp);
            }

            else{
                var emppath = "[1001-1010]+";
                var patt = new RegExp("/employees/"+emppath);
                if(patt.test(req.url)){
                    patt = new RegExp(emppath);
                    var empno = patt.exec(req.url);
                    emp.get(req,resp,empno);
                }
                else{
                    httpMsg.show500(req,resp);
                }
               
            }
            break;

        case "POST":
            if(req.url === '/employee'){

                var reqBody = "";

                req.on('data',function(data){
                    reqBody += data;

                    if(reqBody.length > 10240){
                        httpMsg.show500(req,resp);

                    }
                });

                req.on("end",function(){
                     emp.add(req,resp,reqBody);
                })
            }
            else{

            }

            break;
            
        case "PUT":

        if(req.url === '/employee'){

            var reqBody = "";

            req.on('data',function(data){
                reqBody += data;

                if(reqBody.length > 10240){
                    httpMsg.show500(req,resp);

                }
            });

            req.on("end",function(){
                 emp.update(req,resp,reqBody);
            })
        }
        else{

        }

            break;

        case "DELETE":

        if(req.url === '/employee'){

            var reqBody = "";

            req.on('data',function(data){
                reqBody += data;

                if(reqBody.length > 10240){
                    httpMsg.show500(req,resp);

                }
            });

            req.on("end",function(){
                 emp.delete(req,resp,reqBody);
            })
        }
        else{

        }
            break;  
            
        default:
            
            break;

       
    }

}).listen(setting.webPort,function(){
    console.log("Started listening at :"+setting.webPort);
})