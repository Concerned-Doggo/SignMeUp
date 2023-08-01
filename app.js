const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();
const port = 8080;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

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

const generateOptions = function(letterArray, options){
  
}


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
  let letterArray = switchFunc(customUrl);
  shuffle(letterArray);
  console.log(letterArray);

  let options=[];
  generateOptions(letterArray,options)
  
  res.render("quiz", {letterArray: letterArray, options: options});
});




app.listen(port, (req, res) => {
  console.log(`server is runnig on port ${port}`);
})
