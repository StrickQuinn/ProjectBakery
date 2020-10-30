const mongoose = require('mongoose');

const bakedSchema = new mongoose.Schema
({
    category:  { type: String, required: true },
    catImg:  { type: String, required: true },
    subcategory: { type: String, required: true },
    subcatImg: { type: String, required: true },
    type: { type: String, required: true },
    typeImg: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: String, required: true }
});

const Bakery = mongoose.model('Bakery', bakedSchema);

module.exports = bakedSchema;