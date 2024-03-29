const express = require('express');
const mongoose = require('mongoose');
const connect = require('../config/db');
const debug = require('debug')('app:productRouter');
const Product = require("../models/Product");

// connecting to db
// const connect = require('./src/config/db')

const productsRouter = express.Router();

productsRouter.route('/').get(async (req, res) => {
    // await connect()
    const products = await Product.find()
    const categories = Array.from(new Set(products.map(pdt => pdt.category)))
    // await mongoose.disconnect()
    
    res.render('products', { products, categories, user: req.user })
})

productsRouter.route('/:id').get(async (req, res) => {
    const id = req.params.id
    
    // await connect()
    const product = await Product.findById(id)
    const similarProducts = await Product.find({category: product.category, _id:{$ne: product._id}}).limit(2)
    // await mongoose.disconnect()

    res.render('single_product', {product, similarProducts, user: req.user})
})



module.exports = productsRouter