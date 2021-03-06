require('dotenv').config();
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var payment = require('./payment');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/checkout', function (req, res) {
    console.log('Checkout Initialized');

    payment.call(req.body)
    .then((response) => {
        console.log(response);
        res.redirect(response.body.init_point);
    }).catch((err) => {
        console.error(err);
        res.status(400).send(err);
    });
});

app.get('/success', function (req, res) {
    res.render('message', {...req.query, message: 'Pago exitoso'});
});
app.get('/pending', function (req, res) {
    res.render('message', {...req.query, message: 'Pago pendiente'});
});
app.get('/failure', function (req, res) {
    res.render('message', {...req.query, message: 'Pago rechazado'});
});

app.post('/notifications', function (req, res) {
    console.log('Instant Payment Notification');
    console.log('req-query: ', req.query);
    console.log('req-body: ', req.body);
    res.status(200).send();
});

app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));


const port = process.env.PORT || 3000;
app.listen(port);
