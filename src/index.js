const path = require('path')
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cats = require('./routes/cats');

const app = express();
const port = process.env.PORT || 7713;

app.use(morgan('combined'));

app.use(favicon(path.resolve(__dirname, '..', 'public', 'favicon.ico')));

app.use('/cats', cats);

app.get('/', (req, res) => {
    res.status(200)
        .type('application/json')
        .send('{ error: false, message: "CatBook backend server"}')
        .end();
})

app.all('*', (req, res) => {
    res.status(404)
        .type('application/json')
        .send('{ error: true, message: "Error 404. Not found"}')
        .end();
})

app.listen(port, () => console.log(`
CatBook backend server started: 
http://localhost:${port}/ - main
http://localhost:${port}/cats
`));
