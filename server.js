const express = require( "express" );
const cors = require( "cors" );

var server = express();
var port =  process.env.PORT || 3000;

//middleware
server.use(cors());
server.use(express.json());

//data
var data = require("./data.js")

//GET
server.get("/posts", function (req,res){
  var response = {
    posts: data.posts
  };
  res.json( response );
});

//POST
server.post("/posts", function (req,res){
  var new_post = {
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    image: req.body.image,
    text: req.body.text,
  };
  data.posts.unshift( new_post );
  res.status( 201 );
  res.send();
});

server.listen( port, function (){
  console.log(`listening on ${port}`)
});
