const express = require("express");
const debug = require("debug")("app:productRouter");
const Product = require("../models/Product");
const { parser } = require("../config/cloudinary");

const upload = parser.single("thumbnail")
// connecting to db
// const connect = require('./src/config/db')

const productEndpointRouter = express.Router();

productEndpointRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  // post it through form data in postman
  .post(parser.single("thumbnail"), async (req, res) => {
    const { title, description, price, discountPercentage, rating, category } =
      req.body;
    try {
      //   debug(req.file);
      const prod_OBJ = new Product({
        title,
        description,
        price,
        discountPercentage,
        rating,
        category,
        thumbnail: req.file.path,
      });
      await prod_OBJ.save();

      res.status(200).json({message: "product saved successfully!"})
    }catch(error){
      res.status(500).json({message: `error on saving this product - ${error}`})
    }
  })
  
productEndpointRouter.route("/:id").get(async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = productEndpointRouter;
