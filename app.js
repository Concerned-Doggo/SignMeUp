const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();
const port = 8080;


app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get("/", (req, res)=>{
  res.render("index");
});

app.get("/letter", (req, res)=>{
  const letter = ['a','f','g','l','m','r','s','z']
  res.render("letter",{letter: letter});
});

app.get("/feedback", (req, res)=>{
  res.render("feedback", {});
});

app.get("/aboutus", (req, res)=>{
  res.render("aboutus", {});
});

app.get("/letter/:customeUrl", (req, res)=>{
  const customeUrl = req.params.customeUrl;
  let letterArray = [];
  switch (customeUrl){
    case 'a-f':
      letterArray = ['a','b','c','d','e','f'];
      break;
    case 'g-l':
      letterArray = ['g','h','i','j','k','l'];
      break;
    case 'm-r':
      letterArray = ['m','n','o','p','q','r'];
      break;
    case 's-z':
      letterArray = ['s','t','u','v','w','x','y','z'];
  }


  res.render("GOL", {letterArray: letterArray});
});
// app.get("/letter/:customUrl", (req, res)=>{
//   res.render("GOL");
// });

app.get("/attributions", (req, res)=>{
  res.render("attributions");
});









app.listen(port, (req, res)=>{
  console.log(`server is runnig on port ${port}`);
})
