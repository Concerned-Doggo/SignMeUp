const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();
const port = 8080;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1/test')

const questionSchema = new mongoose.Schema({
   question: String,
   ans: [
    {
      option0: String,
      option1: String,
      option2: String,
      option3: String,
    }
  ]
});

// model for question schema
const Question = new mongoose.model("Question", questionSchema);

const question1 = new Question({
  question: "a",
  ans:[
    {
      option0: "a",
      option1: "d",
      option2: "c",
      option3: "b",
    },
  ]
});

// question1.save();

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
// const generateOptions = function(array, options){
//   let i = array[0];
//   let optionRow = ['-1', '-1', '-1', '-1'];
// // creating "random answer index" to store in optionRow  since we will only have 4 options 
// // we multiply by 4 so that we get index between 0-3;
//   const ansIndex = Math.floor(Math.random() * optionRow.length);
//   optionRow[ansIndex] = array[i];

//   for(let j = 0; j < 3; j++){
//     // creating random option indexes
//     let optionIndex = Math.floor(Math.random() * optionRow.length);

//     // making sure the  optionIndex is not already filled 
//     while(optionRow[optionIndex] !== '-1'){
//       optionIndex = Math.floor(Math.random() * optionRow.length);
//       if(optionRow[optionIndex] === '-1') break;
//     }


//     let arrOption = Math.floor(Math.random() * array.length);
//     while (arrOption === i) {
//       arrOption = Math.floor(Math.random() * array.length);
//       if (arrOption !== i) break;
//     }
//     optionRow[optionIndex] = array[arrOption];

//   }//for loop end of j < 3

//   for(let i = 0; i < array.length; i++){

//     options.push(optionRow);
//   }
//   console.log(options);
//   return options;
// }

// const generateOptions = function(array, options){
//   for(let i = 0; i < array.length; i++){
//     let optionRow = [-1, -1, -1, -1];
//     optionRow[0] = array[i];
//     optionRow[1] = array[Math.floor(Math.random()+1) % array.length];
//     optionRow[2] = array[Math.floor(Math.random()+2) % array.length];
//     optionRow[3] = array[Math.floor(Math.random()+3) % array.length];
//     shuffle(optionRow);
//     options.push(optionRow);
//   }//forloop end
// return options;
// }

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
  res.render("index");
});

app.get("/letter", (req, res) => {
  const letter = ['a', 'f', 'g', 'l', 'm', 'r', 's', 'z']
  res.render("letter", { letter: letter });
});

app.get("/feedback", (req, res) => {
  res.render("feedback", {});
});

app.post("/feedback", (req, res) =>{
  console.log(req.body.email);
  console.log(req.body.feed);
})

app.get("/aboutus", (req, res) => {
  res.render("aboutus", {});
});

app.get("/letter/:customeUrl", (req, res) => {
  const customUrl = req.params.customeUrl;

  const letterArray = switchFunc(customUrl);

  res.render("GOL", { letterArray: letterArray });
});

app.get("/attributions", (req, res) => {
  res.render("attributions");
});


app.get("/quiz/:customUrl", (req, res) => {
  const customUrl = req.params.customUrl;
  letterArray = switchFunc(customUrl);
  shuffle(letterArray);
  // console.log(letterArray);

  let options = [];
  generateOptions(letterArray,options)

  // options[1].forEach(option=>{

  //   console.log(option.text);
  // })
  // console.log(__dirname);
  console.log(req.url);
  res.sendFile(__dirname + "/public/html/temp-quiz.html");
});
app.get("/register", (req,res) => {
  res.render("register")
})




app.listen(port, (req, res) => {
  console.log(`server is runnig on port ${port}`);
})
