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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'bakery_db';

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded(
    { extended: true }
));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//___________________
//Data
//___________________
//temporary placement of data
const bakeryItem = {
    category:  "Bread",
    catImg:  "https://i.imgur.com/TUmV3wH.jpg?1",
    subcategory: "White",
    subcatImg: "https://i.imgur.com/TUmV3wH.jpg?1",
    type: "White Sourdough",
    typeImg: "https://i.imgur.com/TUmV3wH.jpg?1",
    description: "The dough needs to be prepared at least 2 days before baking.",
    ingredients: "sourdough, distilled water",
    size: "24 oz",
    price: "$5"
}

//___________________
// Routes
//___________________
//localhost:3000

//INDEX route to GET the bakery home page
app.get('/bakery' , (req, res) => {
    res.render('index.ejs', {
        allBakeryItems: bakeryItem
    });
    console.log('index page works')
});

//SUBCAT route to GET the subcategory page
app.get('/bakery/subcat', (req, res) => {
    res.render('subcat.ejs', {
        subcatItems: bakeryItem
    });
    console.log('subcat page works')
});

//route to GET NEW bakery item page
app.get('/bakery/new', (req, res) => {
    res.render('new.ejs')
    console.log('new page works')
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));