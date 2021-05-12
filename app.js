    //jshint esversion:6
    
    const mongoose = require('mongoose');
    //Requiring express and body parser and initializing the constant "app"
    const express = require("express");
    const bodyParser = require("body-parser");
    const app = express();
    //Using bod-parser
    app.use(bodyParser.urlencoded({extended:true}));
    //The public folder which holds the CSS
    app.use(express.static("public"));
    

    app.listen(process.env.PORT||3000,function () {
     console.log("Server is running at port 3000");
    });
    

    app.get("/", function (req, res) {
     res.sendFile(__dirname + "/index.html");
    });

    //DB
    mongoose.connect('mongodb://localhost:27017/emailsDB', { useNewUrlParser: true, useUnifiedTopology: true});

    const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please check, name required!"]
  }
 });

const Email = mongoose.model("User", userSchema);

const user = new Email({
  email: "1@2.com"
});

    
    app.post("/", function (req,res) {
      const newEmail = req.body.email;

      const user = new Email( {
        email: newEmail
      })

      user.save(function(err, doc){
        if(err) return console.log(err);
        res.sendFile(__dirname + "/success.html");
      }) 
    });

