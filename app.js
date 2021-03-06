'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var kv = require('./api/controllers/kv.js'),
  encrypt = require('./api/controllers/encrypt.js')


module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerRestify.create(config, function (err, swaggerRestify) {
  if (err) { throw err; }

  swaggerRestify.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log(`Listening on http://127.0.0.1:${port}`);
});

app.post('/kv/:kv', kv.postKEY)
app.get('/kv/:kv', kv.getKEY)
app.del('/kv/:kv', kv.deleteKEY)
app.post('/encrypt',encrypt)
