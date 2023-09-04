const dotenv = require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();
const port = 8080;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env["SECRET"],
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1/SignMeUp')

// const questionSchema = mongoose.Schema({
//    question: String,
//    ans: [
//     {
//       option0: String,
//       option1: String,
//       option2: String,
//       option3: String,
//     }
//   ]
// });

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);



// model for question schema
// const Question = new mongoose.model("Question", questionSchema);

const User = mongoose.model("User", userSchema);

// inititalizing passport for our User model
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






const switchFunc = function (customUrl) {
  letterArray = [];
  switch (customUrl) {
    case 'a-f':
      letterArray = ['a', 'b', 'c', 'd', 'e', 'f'];
      break;
    case 'g-l':
      letterArray = ['g', 'h', 'i', 'j', 'k', 'l'];
      break;
    case 'm-r':
      letterArray = ['m', 'n', 'o', 'p', 'q', 'r'];
      break;
    case 's-z':
      letterArray = ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  }
  return letterArray
}
const shuffle = function (array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

let letterArray = [];
let options = [];
const generateOptions = function(array, options){
  // (i + constatn) % array.length

  let n = array.length;
  for(let i = 0; i < n; i++){
    let optionRow = [
      {text: 'a', correct: false},
      {text: 'a', correct: false},
      {text: 'a', correct: false}
    ];
    optionRow[0] = {text: array[i], correct: true}; 
    optionRow[1] = {text: array[(i+4) % n], correct: false};
    optionRow[2] = {text: array[(i+5) % n], correct: false};
    shuffle(optionRow);
    options.push(optionRow);
  }
  return options;
}

generateOptions([1],[1]);


app.get("/", (req, res) => {
  let loggedIn = 0;

  let username = ""; 
  if(req.user) username = req.user.username;

  req.isAuthenticated() === true ? loggedIn = 1: loggedIn = 0;
  
  res.render("index", {username: username, loggedIn: loggedIn});
});





app.get("/letter", (req, res) => {
  let loggedIn = 0;
  req.isAuthenticated() ? loggedIn = 1 : loggedIn = 0;
  const letter = ['a', 'f', 'g', 'l', 'm', 'r', 's', 'z']

  let username = ""; 
  if(req.user) username = req.user.username;

  res.render("letter", { letter: letter, loggedIn: loggedIn, username: username});
});

app.get("/feedback", (req, res) => {
  let loggedIn = 0;
  req.isAuthenticated() ? loggedIn = 1 : loggedIn = 0;

  let username = ""; 
  if(req.user) username = req.user.username;


  res.render("feedback", {loggedIn: loggedIn, username: username});
});

app.post("/feedback", (req, res) =>{
  console.log(req.body.email);
  console.log(req.body.feed);
})

app.get("/aboutus", (req, res) => {
  let loggedIn = 0;
  req.isAuthenticated() ? loggedIn = 1 : loggedIn = 0;
 
  let username = ""; 
  if(req.user) username = req.user.username;
  
  const profile = [{
    name: "Harshal Chavan",
    github: "Concerned-Doggo ",
    linkedIn: "ajinkya-birari-25566b229",
  }, 
    {
    name: "Ajinkya Birari",
    github: "awkward-raccoon",
    linkedIn: "ajinkya-birari-25566b229",
    },
    {
      name: "Abhay Pandey",
    github: "AP2290",
    linkedIn: "ajinkya-birari-25566b229",
    },
    {
      name: "Atharva Aurangabadkar",
    github: "Atharva0825",
    linkedIn: "atharv-aurangabadkar-a24373289",
    }];

 res.render("aboutus", {loggedIn: loggedIn, username: username, profile: profile});
});

app.get("/letter/:customeUrl", (req, res) => {
  let loggedIn = 0;
  req.isAuthenticated() ? loggedIn = 1 : loggedIn = 0;

  const customUrl = req.params.customeUrl;

  const letterArray = switchFunc(customUrl);

  let username = ""; 
  if(req.user) username = req.user.username;


  res.render("GOL", { letterArray: letterArray , loggedIn: loggedIn, username: username});
});

app.get("/attributions", (req, res) => {
 
  let username = ""; 
  if(req.user) username = req.user.username;

 res.render("attributions", {loggedIn: loggedIn, username: username});
});


app.get("/quiz/:customUrl", (req, res) => {
  const customUrl = req.params.customUrl;
  letterArray = switchFunc(customUrl);
  shuffle(letterArray);

  let options = [];
  generateOptions(letterArray,options)

  res.sendFile(__dirname + "/public/html/temp-quiz.html");
});



app.get("/register", (req,res) => {
  
  res.render("register",{loggedIn: 0, username: ""});
});

app.post("/register", (req,res)=>{
  User.register({username: req.body.username}, req.body.password)
    .then(() => {
      const authenticate = passport.authenticate('local');
      authenticate(req, res, ()=>{
        res.redirect("/");
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/register");
    });
});

app.get("/login", (req, res)=>{
  res.render("login", {username: "", loggedIn: 0});
});

app.post('/login',passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect("/");
  });

app.get("/user/:customUrl", (req, res) => {
  
  let loggedIn = 0;
  req.isAuthenticated() ? loggedIn = 1 : loggedIn = 0;

  let username = ""; 
  if(req.user) username = req.user.username;


  res.render("user", {username: username, loggedIn: loggedIn});
});

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get("/edit", (req, res) => {
  let loggedIn = 0;
  req.isAuthenticated() ? loggedIn = 1 : loggedIn = 0;

  let username = ""; 
  if(req.user) username = req.user.username;

  res.render("editProfile",{username: username, loggedIn: loggedIn})
});

app.post("/edit", (req, res) => {
  const newUsername = req.body.newUsername;
  const prevUsername = req.body.username;
  if(prevUsername != newUsername){
    User.findOneAndUpdate({username: prevUsername}, {username: newUsername})
      .then(found =>{
        console.log("done");
    })
      .catch(err => console.log(err));
  }

  res.redirect("/");
})

app.listen(port, (req, res) => {
  console.log(`server is runnig on port ${port}`);
})
