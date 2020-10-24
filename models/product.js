const { Schema, model } = require('mongoose')
const { StringType } = require('./types/StringRequired')
const ProductSchema = Schema({
    name: StringType,
    description: { type: String },
    price: { type: Number },
    isOnOffer: {},
    InStock: {},
    priceOffer: { type: Number },
    categoryId: {},

})
module.exports = model('Products', ProductSchema)