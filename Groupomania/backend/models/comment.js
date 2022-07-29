const mongoose = require('mongoose');
const User = require("../models/User");


const commentSchema = mongoose.Schema({ // Utilisation de la méthode schéma de mongoose qui permet de créer un schéma de données pour notre BDD MongoDB
    user: { ref: "User", type: mongoose.Schema.Types.ObjectId },
    message: { type: String, required: true },

    // imageUrl: { type: String },
    // likes: { type: Number, default: 0 },
    // dislikes: { type: Number, default: 0 },
    // usersLiked: { type: [String] },
    // usersDisliked: { type: [String] }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema); // model exporte ce modèle en un modèle utilisable sur d'autres fichiers JS.
