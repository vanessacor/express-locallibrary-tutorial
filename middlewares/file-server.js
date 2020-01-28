'use strict'
const parseUrl = require('url').parse;
const fs = require('fs');

const middleware  = function (req, res, next) {
  console.log('>>> received a request', req.method, req.url)

  var url = parseUrl(req.url, true);

  console.log(url);

  var filename = "./public" + url.pathname;

  fs.readFile(filename, function(err, data) {

    console.log('... file', err, data);
    if (err) {
      console.log('file not found next')
      next();
      return;
    } 

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(data);

    console.log('<<<< sent response 200')
    return res.end();
  });

}

module.exports = middleware