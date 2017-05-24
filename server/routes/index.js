(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('mongodb://paperfly:paperfly@ds143231.mlab.com:43231/paperfly', ['states']);

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/states', function(req, res) {
    db.states.find(function(err, data) {
      res.json(data);
    });
  });

  router.get('/api/vehicles', function(req, res) {
    db.vehicles.find(function(err, data) {
      res.json(data);
    });
  });


  router.post('/api/vehicles', function(req, res) {
    db.vehicles.insert(req.body, function(err, data) {
var respo = {
  "resultcode":1,
  "msg":"success"
}
      res.json(respo);
    });

  });

  module.exports = router;

}());
