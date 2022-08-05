const mongoose = require('mongoose');
const User = require("../models/User");

const commentSchema = mongoose.Schema({
    user: { ref: "User", type: mongoose.Schema.Types.ObjectId },
    message: { type: String, required: true },
    image: { type: String },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
},
  { timestamps: true })


module.exports = mongoose.model('Comment', commentSchema);
