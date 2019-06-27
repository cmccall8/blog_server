const express = require( "express" );
const cors = require( "cors" );
const mongoose = require("mongoose");

var server = express();
var port =  process.env.PORT || 3000;

//middleware
server.use(cors());
server.use(express.json());

//data
var postsModel = require("./schema.js"); //instead of grabbing data we grab mongoose model

//GET
server.get("/posts", function (req,res){
  postsModel.find().then(function(posts){ //gets back list of posts
    var response = {
      posts: posts //got back from .find
    };
    res.json( response );
  }).catch(function(error){
    var response = {
      msg: error.message
    };
    res.status( 400 );
    res.json( response );
  });
  // var response = {
  //   posts: data.posts
  // };
  // res.json( response );
});

//POST
server.post("/posts", function(req,res){
  postsModel.create({ //add record into table defined as object
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    //dont define date because it has a default
    image: req.body.image,
    text: req.body.text
  }).then(function( new_post ) {  //gives back all new_post data
    res.status(201);
    res.json( new_post ); //send it back to see it for test
  } ).catch(function(error) { //catch errors if anything above went wrong
    var response = {
      msg: error.message
    };
    res.status( 400 );
    res.json( response );
  });
});

server.delete("/posts/:id", function(req,res){
  postsModel.findByIdAndDelete(req.params.id).then(function() { //we dont recieve anything
    res.status( 204 );
    res.send();
  }).catch(function(error){
    var response = {
      msg: error.message
    };
    res.status( 400 );
    res.json( response );
  });
});

// server.post("/posts", function (req,res){
//   var new_post = {
//     title: req.body.title,
//     author: req.body.author,
//     date: req.body.date,
//     image: req.body.image,
//     text: req.body.text,
//   };
//   data.posts.unshift( new_post );
//   res.status( 201 );
//   res.send();
// });

//replace <password> with password you chose
mongoose.connect("mongodb+srv://cm9292:2929mc@cmdatabase-3ru7e.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true //avoid errors
}).then(function(){
  //starts server --now inside this function
  server.listen( port, function (){
    console.log(`listening on ${port}`)
  });
});
