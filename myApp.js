let express = require('express');
let app = express();
require('dotenv').config()
const bodyParser = require('body-parser')

console.log('Hello, World!');

// app.get('/', (req, res) => {
//     res.send("Hello Express")
// })

const HTMLPath = __dirname + '/views/index.html'
const staticPath = __dirname + '/public'

app.get('/', (req, res) => {
    res.sendFile(HTMLPath)
})

app.use('/public', express.static(staticPath))

// app.get('/json', (req, res) => {
//     if (process.env.MESSAGE_STYLE === 'uppercase') {
//         res.json({message: "HELLO JSON"})
//     } else {
//         res.json({message: "Hello json"})
//     }
// })

app.get('/json', (req, res, next) => {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
    console.log(`${method} ${path} - ${ip}`);
    next();
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({time: req.time});
})

app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({echo: word});
})

app.get('/name', (req, res) => {
    const first = req.query.first;
    const last = req.query.last;
    res.json({name: `${first} ${last}`});
})

app.use(bodyParser.urlencoded({extended: false}))

app.post('/name', (req, res) => {
    first = req.body.first;
    last = req.body.last;
    res.json({name: `${first} ${last}`});
})


 module.exports = app;
