const express = require("express");
const { upload, parser } = require("../config/cloudinary");
const Product = require("../models/Product");
const debug = require("debug")("app:adminRouter");

const adminRouter = express.Router();

adminRouter.use((req, res, next)=>{
    if(req.user) {
      next()
    } else{
      res.redirect('/')
    }
  })

adminRouter.route("/view").get(async (req, res) => {
  const products = await Product.find();
  const categories = Array.from(new Set(products.map((pdt) => pdt.category)));

  res.render("view", { products, user: req.user, categories });
});

adminRouter
  .route("/addNew")
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

      res.redirect("/admin/view");
    } catch (error) {
      debug(error);
      res.redirect("/");
    }
  });

adminRouter
  .route("/edit/:pID")
  .get(async (req, res) => {
    const { pID } = req.params;
    const product = await Product.findById(pID);
    // debug(product)
    res.render("edit", { product, user: req.user });
  })
  .post(parser.single("thumbnail"), async (req, res) => {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      category,
      thumbnail_saved_url,
    } = req.body;
    // debug(req.body)
    const { pID } = req.params;

    try {
      if (!req.file) {
        await Product.updateOne(
          { _id: pID },
          {
            title,
            description,
            price,
            discountPercentage,
            rating,
            category,
            thumbnail: thumbnail_saved_url,
          }
        );
      } else {
        await Product.updateOne(
          { _id: pID },
          {
            title,
            description,
            price,
            discountPercentage,
            rating,
            category,
            thumbnail: req.file.path,
          }
        );
      }
      res.redirect("/admin/view");
    } catch (error) {
      debug(error);
    }
  });

  adminRouter
  .route("/delete/:pID")
  .get(async(req, res)=>{
      const { pID } = req.params;

      try {
          await Product.findByIdAndDelete(pID)
          res.redirect('/admin/view')
      } catch (error) {
          debug(error)
      }
  })

module.exports = adminRouter;
