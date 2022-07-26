const passport = require("passport");
const bcrypt = require("bcrypt");
const debug = require("debug")("app:local.strategy");
const { Strategy } = require("passport-local");
const User = require("../../models/User");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, done) => {
            try {
                const user = await User.findOne({username})

                const res = await bcrypt.compare(password, user.password)
                if(user && res){
                  done(null, user)
                }else{
                  done(null, false)
                }
      
            } catch (error) {
              done(error, false)
            }

        // const user = {username, password, name: "ahmed"}
        // done(null, user)
      }
    )
  );
};
