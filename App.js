const express = require('express');
const req = require('express/lib/request');

//express app
const app  = express();

//register view engine
app.set('view engine', 'ejs');

// listen for request
app.listen(3000);
app.get('/', (req, res) => {
    const blogs = [
        {title: 'first blog', snippet: ' lorem ihsasas hbshvds sbdhsbd'},
        {title: 'first blog', snippet: ' lorem ihsasas hbshvds sbdhsbd'},
        {title: 'first blog', snippet: ' lorem ihsasas hbshvds sbdhsbd'},
        {title: 'first blog', snippet: ' lorem ihsasas hbshvds sbdhsbd'},
    ];

    // res.send('<p>Boost website Api</p>');
    // res.sendFile('./src/index.html', {root: __dirname });
    res.render('index', { title: 'Home', blogs});

});
app.get('/about', (req, res) => {

    // res.send('<p>About Page</p>');
    res.render('about', { title: 'About'})

});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog'});
})







//404 Page should be on bottom
app.use((req, res) => {
    res.render('404', { title: '404'});
});