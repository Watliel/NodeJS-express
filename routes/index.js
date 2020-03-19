var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ville', function(req, res, next) {
  var param = req.query.ville
  res.render('ville', { title: 'Les villes que vous voulez', ville: param });
});

module.exports = router;
