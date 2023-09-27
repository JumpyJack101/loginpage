if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

  //start

  var bodyParser = require("body-parser");


const infos = require("./info");
const morgan = require("morgan");

const mongoose = require("mongoose");
const mongodb = require("mongodb");

//end

var path = require("path")
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

app.use(express.json())

// const initializePassport = require("./passport-config")
// initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)

// )

//TRYING THE SAME FUNCTION SO THAT IT QUERIES MONGODB

const initializePassport = require("./passport-config");

// Modify the function to find a user by email in MongoDB Atlas
initializePassport(
    passport,
    async email => {
        const user = await infos.findOne({ email: email }).exec();
        return user;
    },
    id => users.find(user => user.id === id)
);


//start
app.use(bodyParser.json())

const dbURI = "mongodb+srv://Shashwat:ryangiggs2003@testcluster.ow9vhvj.mongodb.net/";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
// .then((result) => app.listen(3000))
.catch((err) => console.log(err));
//end

const users = []

app.use(express.static(path.join(__dirname, "style")))
app.set("view-engine", "ejs")
app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.listen(3000)


app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

    //start
        const pushe = new infos({
          id:  Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          passwordOG: req.body.password,
          password: hashedPassword
      });
      pushe.save()

      //end

      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })



//add code
// app.get('/forgot1', (req,res) => {
//   res.render('forgot1.ejs')
// })

// app.post('/forgot1', emailtry, async (req,res) => {
//   if (authenticateUserEmail) {
//       res.redirect('forgot2')
//   } else {
//     res.redirect('login')
//   }
// })
  


  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }




