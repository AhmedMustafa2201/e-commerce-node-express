const passport = require("passport");
const { Strategy } = require("passport-local");
const { MongoClient } = require('mongodb')

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      { usernameField: "username", passwordField: "password" },
      (username, password, done) => {

        const url = process.env.DB_URL;
        const dbName = 'globalMantics';
        
        (async function validateUser(){
            let client 
            try {
                client = await MongoClient.connect(url)
                debug('connected...')
      
                const db = client.db(dbName)
                const user = await db.collection('users').findOne({username})


                if(user && user.password === password){
                  done(null, user)
                }else{
                  done(null, false)
                }
      
            } catch (error) {
              done(error, false)
            }
            client.close()
        }())

        // const user = {username, password, name: "ahmed"}
        // done(null, user)
      }
    )
  );
};
