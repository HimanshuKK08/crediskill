const express = require("express");
const cors = require("cors");
const userModel = require('./Models/userModel')
const bcrypt = require("bcrypt");
const passport = require('./config/passport');
var session = require('express-session')
var MongoStore = require('connect-mongodb-session')(session);

const app = express(); 

/* -------------------- MIDDLEWARE -------------------- */
const store = new MongoStore({
  uri: 'mongodb://127.0.0.1:27017/CrediSkill',
  collection: 'mySessions'
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(session({
  secret: "CrediSkillSecret",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 10 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());
/* -------------------- ROUTES -------------------- */

app.post('/login',passport.authenticate('local'), (req, res, next) => {
  res.status(200).json({
    success: true, 
    message: "Login Successfully"
  })
    
});




app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: user._id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});




app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});



/* -------------------- SERVER -------------------- */
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
