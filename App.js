const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('express/lib/response');
const blogRoutes = require('./routes/blogRoutes');


//express app
const app  = express();

//CONECT DB
const dbURI = 'mongodb+srv://BenIraa:keepitsafe@cluster0.tplc1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true  })
   .then((results) => console.log('DB CONNECTED'))
   .catch((err) => console.error(err))


//register view engine
app.set('view engine', 'ejs');

// listen for request
app.listen(3000);

//middleware $ static filesecure
app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));
app.use(morgan('dev'));



app.get('/', (req, res) => {
    res.redirect('/blogs'); 
    // res.send('<p>Boost website Api</p>');
    // res.sendFile('./src/index.html', {root: __dirname });
    res.render('index', { title: 'Home', blogs});

});
app.get('/about', (req, res) => {

    // res.send('<p>About Page</p>');
    res.render('about', { title: 'About'})

});

app.use('/blogs', blogRoutes)


//404 Page should be on bottom
app.use((req, res) => {
    res.render('404', { title: '404'});
});