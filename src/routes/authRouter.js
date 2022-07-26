const express = require("express");
const bcrypt = require("bcrypt");
const debug = require("debug")("app:authRouter");
const passport = require("passport");
const User = require("../models/User");

const authRouter = express.Router();

authRouter
  .route("/register")
  .post(async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userObj = new User({
        firstName,
        lastName,
        username,
        password: hashedPassword,
      });
      const user = await userObj.save();

      req.logIn(user, (err) => {
        res.redirect("/");
      });
    } catch (error) {
      debug(error);
    }

  });

authRouter
  .route("/login")
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/products",
    })
  );

  authRouter.route("/logout").get((req, res) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = authRouter;
