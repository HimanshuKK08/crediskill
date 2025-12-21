const passport = require("passport");
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt"); // ✅ Import bcrypt correctly
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    async function (username, password, done) { 
      try {
        const user = await userModel.findOne({ username: username }); 
        if (!user) return done(null, false);
        
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return done(null, false);
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => { // ✅ Use async
  try {
    const user = await userModel.findById(id); // ✅ Use await
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;