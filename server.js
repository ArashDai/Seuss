const express = require('express');
const path = require('path');
let quotes = require('./quotes.json').quotes;
const rateLimit = require("express-rate-limit");
const app = express();
const port = (process.env.PORT || '3000');
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
  });

app.set('port', port);
app.use('/public', express.static('./home/public'))
app.use("/api/", apiLimiter); 
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);



app.get('/api/:format?', function (req, res, next) {
    if ( req.params.format && req.params.format.toLowerCase() === 'text') {
        res.send(JSON.stringify(quotes[getRandomInt(quotes.length)]));
    } else {
        res.send({ 'quote': quotes[getRandomInt(quotes.length)] });
    }
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/home/index.html'));
});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.listen(port);