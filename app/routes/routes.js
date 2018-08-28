var appRouter = function (app) {

var db = require('mysql');
var appRoot = require('app-root-path');

var restful = require(appRoot + '/app/controller/restful');
// bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


app.get('/', function(req, res){
  res.send({error:true, message:'hello'})
});



app.get('/poc/:description/:id', function (req, res) {
  var description = req.params.description, prodID= req.params.id, apiJSON;
  var options = restful.getOptions({'id':prodID, 'description':description});

  restful.httpsRequest(options).then(function(body) {
      apiJSON = body.source;
      //console.log(apiJSON);
      res.json(apiJSON);
  })
  .catch((err) => console.error(err) );
});

//getAllTax
app.get('/poc/:description/description', function (req, res) {
  var description = req.params.taxtype, apiJSON;
  var options = restful.getOptions({'id':'', 'description':description});

  restful.httpsRequest(options).then(function(body) {
      apiJSON = body.source;
      //console.log(apiJSON);
      res.json(apiJSON);
  })
  .catch((err) => console.error(err) );
});


  app.get('/poc/listAll', function (req, res) {

   db.open("DATABASE=Mysql;HOSTNAME=mysql.com;UID=paty;PWD=test;PORT=3005;PROTOCOL=TCPIP;", function (err,conn) {
      if (err) {
        console.log("ERROR: " + err);
        return res.send("ERROR CONNECTING TO mysql ");
      }

    var sql = "select * from Mysql.request_info with ur";

    conn.query(sql, function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send("ERROR LOOKING FOR request info. ");
      }
      else {
        //console.log(rows);
        if (rows.length > 0) {
          var resultJson = JSON.stringify(rows);
          resultJson = JSON.parse(resultJson);
          var apiResult = {};

          //add our JSON results to the data table
          apiResult = resultJson;
          //console.log(apiResult);
           res.json(apiResult);
        } else {
          res.send("NOT FOUND");
        };
      }

    conn.close(function () {
      console.log('done');
      });
    });
  });

  });

  app.get('/poc/listByEmail/:id', function (req, res) {


      let email= req.params.id;

      if (!email) {
          return res.status(400).send({ error: true, message: 'Please provide email' });
      }
      db.open("DATABASE=Mysql;HOSTNAME=mysql.com;UID=paty;PWD=test;PORT=3005;PROTOCOL=TCPIP", function (err,conn) {
        if (err) {
          console.log("ERROR: " + err);
          return res.send("ERROR CONNECTING TO DB. ");
        }

      var sql = "select * from Mysql.request_info where sent_to_email =? ";

      conn.query(sql, [email], function (err, rows, fields) {
        if (err) {
          console.log(err);
          res.send("ERROR LOOKING FOR request info. ");
        }
        else {
          //console.log(rows);
          if (rows.length > 0) {
            var resultJson = JSON.stringify(rows);
            resultJson = JSON.parse(resultJson);
            var apiResult = {};

            //add our JSON results to the data table
            apiResult = resultJson;
            //console.log(apiResult);
             res.json(apiResult);
          } else {
            res.send("NOT FOUND");
          };
        }

      conn.close(function () {
        console.log('done');
        });
      });
      });

  });

}

module.exports = appRouter;
