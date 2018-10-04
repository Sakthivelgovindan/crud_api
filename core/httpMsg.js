var setting = require('../setting');

exports.show500 = function(req,resp,err){

    if(setting.httpMsgFormat == "HTML"){
        resp.writeHead(500,"Internal Server Error",{'content-Type':"text/html"});
        resp.write('<html><head><title>500</title></head><body>Internal server error :'+err+'</body></html>');
    }
    else{
        resp.writeHead(500,"Internal server error",{"content-Type" : "application/json"});
        resp.write(JSON.stringify({data : err}));
    }

    resp.end();
};

exports.sendJson = function(req,resp,data){

    resp.writeHead(200,{"content-Type" : "application/json"});

    if(data){
        resp.write(JSON.stringify(data));
    }
    
    resp.end();
    
};


exports.showHome = function(req,resp){
    
    if(setting.httpMsgFormat == "HTML"){
        resp.writeHead(200,{"content-Type":"text/html"});
        resp.write('<html><head><title>Home page</title></head><body>Home page</body></html>');
    }

    resp.end();
}

exports.show200 = function(req,resp){

    if(setting.httpMSgFormat == "HTML"){
        resp.writeHead(200,{"content-Type":"application/json"});
        // resp.write('<html><head><title>200</title></head><body></body></html>')
    }

    resp.end();
}