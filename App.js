const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('express/lib/response');
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
//blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog'});
})

app.get('/blogs', (req, res) => {
    Blog.find().sort(( {createdAt: -1}))
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result})

    })
    .catch((err) => {console.log(err);})
})
app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
       .then((result) => {
           res.redirect('/blogs')
       })
       .catch((err) => {console.log(err);})
})
app.get('/blogs/:id', (req, res) => {
    const id =  req.params.id;
    console.log(id);
    Blog.findById(id)
      .then((result) => {
        res.render('details', {blog: result, title: 'Blog details'})
      })
      .catch((err) => {console.log(err);});
})
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });



//404 Page should be on bottom
app.use((req, res) => {
    res.render('404', { title: '404'});
});