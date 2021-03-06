const mongoose = require('mongoose');

const bakedSchema = new mongoose.Schema ({
    type: { type: String, required: true },
    typeImg: { type: String, required: true },
    category:  { type: String, required: true },
    subcat: { type: String },
    description: { type: String, required: true },
    ingredients: { type: String },
    pricingType: { type: String, required: true },
    shopPrice: { type: Number, required: true },
    marketPrice: { type: Number, required: true },
    shipmentPrice: {type: Number, required: true }
});

const Bakery = mongoose.model('Bakery', bakedSchema);

module.exports = Bakery;