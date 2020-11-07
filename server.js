//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bakery_db';

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Model
//___________________
const Bakery = require('./models/bakery.js')

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded(
    { extended: true }
));
app.use(express.json());// middlewares that parses JSON

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//data comes from bakery Schema
const bakery = require('./models/bakery.js')
//___________________
// Routes
//___________________
//localhost:3000

//index -- homepage
app.get('/bakery', (req, res) => {
    Bakery.find({}, (error, allBakeries) => {
        res.render('index.ejs', {
            bakeries: allBakeries
        });
    });    
});

//route to get search.ejs
app.get('/search', (req, res) => {
    res.send('search works')
});

//route to GET NEW bakery item page
app.get('/bakery/new', (req, res) => {
    res.render('new.ejs')
});


//Create new bakery Item
app.post('/bakery', (req, res) => {
    Bakery.create(req.body, (error, createdBakery) => {
        res.redirect('/bakery')
    });
    console.log(req.body.id)
});

//return search results on search.ejs
//Sources: https://www.compose.com/articles/full-text-search-with-mongodb-and-node-js/
//Sources: https://www.youtube.com/watch?v=kZ77X67GUfk
app.post('/search', (req,res) => {
    Bakery.find({
        '$text': {
            '$search': req.body.query
        }
    }, {
        type: 1,
        category: 1,
        subcat: 1,
        description: 1,
        textScore: {
            $meta: 'textScore'
        }
    }, {
        sort: {
            textScore: {
                $meta: 'textScore'
            }
        }
    }, (error, searchBakery) => {
        res.send('search result will show here')
    })
})

//get edit item page
app.get('/bakery/:id/edit', (req, res) => {
    Bakery.findById(req.params.id, (error, foundBakery) => {
        res.render('edit.ejs', {
            bakeries: foundBakery
        })
    })
});

//put updated info on item details page
app.put('/bakery/:id', (req, res) => {
    Bakery.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedBakery) => {
        res.redirect('/bakery')
    });
});

//get id -- show
app.get('/bakery/:id', (req, res) => {
    Bakery.findById(req.params.id, (error, foundBakery) => {
        res.render('show.ejs', {
            bakeries: foundBakery
        })
    });
});

//delete item
app.delete('/bakery/:id', (req, res) => {
    Bakery.findByIdAndRemove(req.params.id, (error, foundBakery) => {
        res.redirect('/bakery');
    });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));