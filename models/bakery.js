const mongoose = require('mongoose');

const bakedSchema = new mongoose.Schema ({
    category:  { type: String, required: true },
    catImg:  { type: String, required: true }, 
    subcat: { type: String },
    subcatImg: { type: String },
    type: { type: String, required: true },
    typeImg: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    pricingType: { type: String, required: true },
    price: {type: Number, required: true}
});

const Bakery = mongoose.model('Bakery', bakedSchema);

module.exports = Bakery;