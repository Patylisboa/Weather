var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  load= require('express-load');

module.exports = function(){

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

load('routes', {cwd: 'app'}).then('infra').into(app);

    return app;
};
