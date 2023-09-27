const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const infos = require("./info");

var path = require("path")
const express = require("express")
const app = express()
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")



function change(){
    const authenticateUserEmail = async (email, done) => {
        try{
            const user = await infos.findOne({email: email}).exec()

            if(!user){
                return done(null, false, {message: 'No user with that email'})
            } else {
                return res.redirect('/forgot2')
            } 
        }
            catch(e){
                return done(e)
            }


        }
    }


module.exports = change