const express = require("express");
const cors = require("cors");
const userModel = require('./Models/userModel')
const bcrypt = require("bcrypt");
const passport = require('./config/passport');
var session = require('express-session')
var MongoStore = require('connect-mongodb-session')(session);
const userDataModel = require('./Models/userDataModel')
const app = express(); 
const getRandomQuestions = require('./utils/getRandomQuestions');
const Questions = require("./Models/Questions");

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
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ success: false, message: 'Unauthorized' });
}


app.use(passport.initialize());
app.use(passport.session());
/* -------------------- ROUTES -------------------- */

app.post('/login',passport.authenticate('local'), (req, res, next) => {
    res.status(200).json({
      success: true, 
      message: "Login Successfully",
    })
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: "Unauthorized" });
}
  
app.get('/profile', isLoggedIn ,async (req,res)=>{
  let userData = await userDataModel.findOne({ userId: req.user._id })
  if (!userData) {
    userData = await userDataModel.create({
      userId: req.user._id,

      username: req.user.username || '',
      name: req.user.name || '',
      bio: 'Please Enter About yourself here',

      profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg',

      links: {
        email: req.user.email || '',
        github: '',
        linkedin: '',
        portfolio: '',
      },

      skills: [],
      projects: [],
      growthData: [],
    });
  }
  res.json({
    success: true,
    data: userData
  });
})

app.put('/changedata', isLoggedIn, async (req, res) => {
  const { bio, profilePhoto, links, skills, projects } = req.body;

  const newData = await userDataModel.findOneAndUpdate(
    { userId: req.user._id },
    {
      $set: {
        bio,
        profilePhoto,
        links,
        skills,
        projects,
      },
    },
    { new: true }
  );

  res.json({
    success: true,
    data: newData,
  });
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

app.post("/api/test/start", async (req, res) => {
  const { skillName } = req.body;
  try {
    const questions = await getRandomQuestions(skillName);
    res.json({
      success: true,
      testId: Date.now(),
      questions
    });
    
  } catch (error) {
    res.json({
      success: false
    })
  }

});

app.post("/api/test/submit", async (req, res) => {
  const { testId, answers, skillName, totalQuestions } = req.body;
  const questionIds = Object.keys(answers);
  
  try {
    const promises = questionIds.map(questionId => 
      Questions.findOne(
        { _id: questionId },
        { correctOptionIndex: 1, _id: 0 }  // projection
      )
    );
    
    // Step 2: Execute all queries in parallel
    const correctOptions = await Promise.all(promises);
    
    // Step 3: Calculate score
    let score = 0;
    questionIds.forEach((questionId, index) => {
      const correctOption = correctOptions[index];
      if (answers[questionId] === correctOption.correctOptionIndex) {
        score++;
      }
    });
    let percentage = (score/totalQuestions)*100;
    const user = req.user;
    const userData = await userDataModel.findOne({userId: user._id});
    userData.skills.forEach((skill)=>{
      if(skill.name == skillName){
        skill.score = percentage.toFixed(2);
        skill.lastTested = Date.now();
        skill.isTested = true;
      }
    })
    await userData.save();
    console.log('Final score:', score);
    
    res.json({
      score,
      success: true
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate score'
    });
  }
});

app.post('/api/skill', async(req,res)=>{
  const skills = await Questions.distinct("skill");
  res.json(skills);
})









app.get('/demo', ensureAuthenticated ,(req,res)=>{
   console.log(req.user);
  
})

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
