const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json());

let captureRequests = (req, res, next) => {
    console.log("Logging Request");
    console.log(req.url);
    next();
}
app.use(captureRequests);

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', captureRequests, (req, res, next) => {
    var isIpad = !!req.headers['user-agent'].match(/iPad/);
    var isAndroid = !!req.headers['user-agent'].match(/Android/);
    req.source = (isIpad ? "Apple iPad" : (isAndroid ? "Android Device" : "Not an iPad or Android"));
}, (req, res, next) => {
    res.json({
        source: req.source,
        time: new Date()
    });
});

let userRoutes = require('./userRoutes.js');
app.use('/users', userRoutes);

app.get('/error', (req, res, next) => {
    // some error in this request
    let err = true;
    if (err) {
        next("Error in the API")
    } else {
        res.json({
            result: 'success'
        });
    }

})
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))