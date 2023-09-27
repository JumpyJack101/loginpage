const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")


const pushSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordOG: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
  }, {timestamps: true});
  
  
  const infos = mongoose.model("infos", pushSchema);
  module.exports = infos;
  