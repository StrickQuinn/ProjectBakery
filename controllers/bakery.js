//___________________
//Dependencies
//___________________
const express = require('express');
const router = express.Router()

//___________________
//Model
//___________________
const Bakery = require('../models/bakery.js')

//___________________
// Routes
//___________________

//index -- homepage
router.get('/bakery', (req, res) => {
    Bakery.find({}, (error, allBakeries) => {
        res.render('index.ejs', {
            bakeries: allBakeries
        });
    });    
});

//route to get search.ejs
router.get('/search', (req, res) => {
    Bakery.find(req.body.query, (error, searchBakery) => {
        res.render('search.ejs', {
            bakeries : searchBakery
        })
    })
});

//route to GET NEW bakery item page
router.get('/bakery/new', (req, res) => {
    res.render('new.ejs')
});


//Create new bakery Item
router.post('/bakery', (req, res) => {
    Bakery.create(req.body, (error, createdBakery) => {
        res.redirect('/bakery')
    });
});

//return search results on search.ejs
//Sources: https://www.compose.com/articles/full-text-search-with-mongodb-and-node-js/
//Sources: https://www.youtube.com/watch?v=kZ77X67GUfk
//** problem area here **//
router.post('/search', (req,res) => {
    Bakery.find({
        '$text': {
            '$search': req.body.query
        }
    }, {
        type: 1,
        category: 1,
        subcat: 1,
        description: 1,
    }, (error, searchBakery) => {
        res.redirect('/search')
    })
});

//get edit item page
router.get('/bakery/:id/edit', (req, res) => {
    Bakery.findById(req.params.id, (error, foundBakery) => {
        res.render('edit.ejs', {
            bakeries: foundBakery
        })
    })
});

//put updated info on item details page
router.put('/bakery/:id', (req, res) => {
    Bakery.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedBakery) => {
        res.redirect('/bakery')
    });
});

//get id -- show
router.get('/bakery/:id', (req, res) => {
    Bakery.findById(req.params.id, (error, foundBakery) => {
        res.render('show.ejs', {
            bakeries: foundBakery
        })
    });
});

//delete item
router.delete('/bakery/:id', (req, res) => {
    Bakery.findByIdAndRemove(req.params.id, (error, foundBakery) => {
        res.redirect('/bakery');
    });
});

module.exports = router;