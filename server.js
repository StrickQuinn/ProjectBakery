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

//___________________
// Controllers
//___________________
// middleware for the controller
const bakeryController = require('./controllers/bakery.js')
app.use(bakeryController)//applies middleware to the app

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));