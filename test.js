/*const test = require('ava');
const http = require('http');
const https = require('https');
const axios = require('axios');

function requestForm(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.on('data', (buffer) => {
        resolve(buffer.toString('utf8'));
      });  
    }).on('error', (e) => {
      reject(e);
    });
  });
}

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
  
function httpPOST(town){
  var response
    const data = JSON.stringify({
        ville: town
      })
    const options = {
        hostname: 'localhost',
        path: '/ville',
        method: 'POST',
        port: 3000,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
           response = res.d
          console.log(res.d.toString + typeof d+'ok')
          //process.stdout.write(typeof d)
          //return res
        })
      })
      req.on('error', error => {
        console.error('grrr' + error)
      })
      req.write(data)
      return response
      req.end()
}

axios.post('/ville',  {
  ville: town
})
.then(function (response) {
  console.log(response);
  return response
})
.catch(function (error) {
  console.log(error);
});


test('home page should contain a form', async t => {
  // condition de passage: la page contient un formulaire HTML
  // plus concretement: la reponse à HTTP `GET /` doit contenir `<form`
  const html = await requestForm('http://localhost:3000/');
  t.regex(html, /<form/);
});

test('/ville devrait retourner la ville saisi', async t => {
// condition de passage: la page contient un formulaire HTML
// plus concretement: la reponse à HTTP `GET /` doit contenir `<form`
//const html = await requestForm('http://localhost:3000/');
//t.regex(html, /<form/);
//const postVille = await httpPOST('nice');
//console.log( (JSON.stringify(postVille)))


t.regex(postVille, /nice/)

});






*/
const test = require('ava');
const http = require('http');
const fetch = require('node-fetch');

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.on('data', (buffer) => {
        resolve(buffer.toString('utf8'));
      });  
    }).on('error', (e) => {
      reject(e);
    });
  });
}

function httpPost(url, body) {
  return fetch(url, {
          method: 'post',
          body:    JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.text());
}
 
test('home page should contain a form', async t => {
  // condition de passage: la page contient un formulaire HTML
  // plus concretement: la reponse à HTTP `GET /` doit contenir `<form`
  const html = await httpGet('http://localhost:3000/');
  t.regex(html, /<form/);
});

test('city page should contain the name of the city', async t => {
  const html = await httpPost('http://localhost:3000/ville', { ville: 'paris' });
  console.log('2'+html)
  t.regex(html, /paris/);
});

test('city name with accentuated character should be supported', async t => {
  const html = await httpPost('http://localhost:3000/ville', { ville: 'nîmes' });
  t.regex(html, /nîmes/);
});