const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();


app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.get("/letter", (req, res)=>{
  res.render("letter",{});
});

app.get("/aboutus", (req, res)=>{
  res.render("aboutus", {});
});

app.get("/letter/:customeUrl", (req, res)=>{
  const word = req.params.customeUrl;
  res.render("word", {word: word});
});









app.listen(8080, (req, res)=>{
  console.log("server is runnig on port 8080");
})
