var express = require('express');
var router = express.Router();
const axios = require('axios')
var https = require('https');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App' });
});


function requestCityData(cityName) {
  return new Promise((resolve, reject) => {
    https.get(`https://geocode.xyz/${cityName.replace(/ /g, '+')}?json=1`, (res) => {
      res.on('data', (buffer) => {
        resolve(JSON.parse(buffer.toString('utf8')));
      });  
    }).on('error', (e) => {
      reject(e);
    });
  });
}

/* GET home page. */


router.post('/ville', async function(req, res, next) {
  const data = await requestCityData(req.body.ville);
  const longt = Number(data.longt);
  const latt = Number(data.latt);
  res.render('ville', {
    ville: req.body.ville,
    missingCoords: isNaN(longt) || longt === 0,
    longt: longt,
    latt: latt
  });
});

module.exports = router;
