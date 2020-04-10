var express = require('express');
var app = express();
// console.log(__dirname + "/views/index.html")
app.get('/',function(req,res){
    res.sendFile(__dirname + "/views/index.html")
})

app.use(function(req,res,next){
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
  next()
})

app.get('/json',function(req,res){
  var response = "Hello json"
if (process.env.MESSAGE_STYLE == "uppercase"){
  response = response.toUpperCase()
}

    res.json({"message":response})
  
})
app.get('/now', function(req, res, next){
        req.time = new Date().toString();
  next();
        }, function(req, res){
  res.send({"time":req.time})
})

app.get('/:word/echo', function(req, res){
    const {word} = req.params;
    res.json({"echo": word})
  })


  app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
      name: `${firstName} ${lastName}`
    });
  });
app.use(express.static(__dirname + "/public"))

// make app accessible to other files
module.exports = app;
