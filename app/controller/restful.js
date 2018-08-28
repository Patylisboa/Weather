var https = require('https');
var fs = require('fs');
var appRoot = require('app-root-path');

function getOptions(optt){
    var id;
    var options = {
        host:'https://openweathermap.org/appid', 
        port: 3000,
        path: '?q=London&APPID=a567ac5659010c49d1e05b26576be851',
        method: 'GET',
       
}
    //getOneId
    if(optt.id!=''){
        id=optt.id;
        if(optt.description=='clear sky'){
            options.path += 'https://samples.openweathermap.org/data/2.5/forecast?id=800&appid=b1b15e88fa797225412429c1c50c122a1';
        }else if(optt.description=='clouds'){
            options.path += 'https://samples.openweathermap.org/data/2.5/forecast?id=600&appid=b1b15e88fa797225412429c1c50c122a1';
        }
    }else{ //getAll
        if(optt.description=='clear sky'){
            options.path += 'https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1';
        }else if(optt.description=='clouds'){
            options.path += 'https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1';
        }
    }
    return options;
}

module.exports.getOptions = getOptions;
module.exports.httpsRequest = httpsRequest;

function httpsRequest(params, postData) {
    return new Promise(function(resolve, reject) { 
        var req = https.request(params, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}

