var http = require("http");
var fs = require('fs');
var url = require('url');

exports.start = function(){
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        var ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名
        switch(ext){
            case ".css":
            case ".js":
                fs.readFile("."+request.url, 'utf-8',function (err, data) {//读取内容
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": {
                             ".css":"text/css",
                             ".js":"application/javascript",
                      }[ext]
                    });
                    response.write(data);
                    response.end();
                });
                break;
            default:
                fs.readFile('./case.html', 'utf-8',function (err, data) {//读取内容
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    response.write(data);
                    response.end();
                });
 
        }
 
    }).listen(8086)
    console.log('server running on http://127.0.0.1:8086/')
}

server.start()