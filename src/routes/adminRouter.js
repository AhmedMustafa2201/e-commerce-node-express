const express = require("express");
const Product = require("../model/Product");
const debug = require("debug")("app:adminRouter");

const adminRouter = express.Router();

// adminRouter.use((req, res, next)=>{
//     if(req.user) {
//       next()
//     } else{
//       res.redirect('/')
//     }
//   })

adminRouter.route("/view").get(async (req, res) => {
    const products = await Product.find()
    res.render('view', {products, user: req.user})
})


module.exports = adminRouter;
