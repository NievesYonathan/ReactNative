const express = require('express');
const passport = require('passport');

const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

const usersRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(cors());
app.use(passport.initialize());

app.disable('x-powered-by');

app.set('port', port)

usersRoutes(app);
server.listen(3000, '0.0.0.0' || 'localhost', function (){
    console.log(' Aplicacion de NodeJs ' + process.pid + ' inicio en el puerto ' + port);
});

/**Rutas */
app.get('/', (req, res) => {
    res.send('Ruta raz del Backend');
});

app.get('/test', (req, res) => {
    res.send('Test del TEST');
});

/**ERROR HANDLER */
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});        