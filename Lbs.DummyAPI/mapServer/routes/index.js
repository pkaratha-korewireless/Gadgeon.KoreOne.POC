var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/map', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var a = Math.floor(Date.now() / 1000);
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  var data = 
  [{
    "iMEI": "000013612345678",
    "location": 
        [{
            "lat": 10.011818 + Math.random()/100,
            "lng": 76.366180 + Math.random()/100
        }],
    "fuel": getRandomInt(100),
    "speed": getRandomInt(150)
  },
  {
    "iMEI": "000013612345679",
    "location": 
        [{
            "lat": 9.9710364 + Math.random()/100,
            "lng": 76.2382523 + Math.random()/100
        }],
    "fuel": getRandomInt(100),
    "speed": getRandomInt(150)
  },
  {
    "iMEI": "000013612345680",
    "location": 
        [{
            "lat": 9.7774047 + Math.random()/100,
            "lng": 76.4157906 + Math.random()/100
        }],
    "fuel": getRandomInt(100),
    "speed": getRandomInt(150)
  }
];
  res.send(data);
});
module.exports = router;
