const mongoose = require("mongoose");
const schema = mongoose.Schema

const productSchema = new schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discountPercentage:{
        type: mongoose.SchemaTypes.Decimal128,
        required: true,
    },
    rating:{
        type: mongoose.SchemaTypes.Decimal128,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Product', productSchema)