const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String },
  profilePicture: { type: String },
  service: { type: String },
  admin: { type: Boolean, default : false }
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)