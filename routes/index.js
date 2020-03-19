var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/ville', function(req, res, next) {
  var param = req.body.ville
  res.render('ville', { title: 'Les villes que vous voulez', ville: param });
});

module.exports = router;
