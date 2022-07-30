const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors") // permet d'autoriser les origines croisées
const app = express(); // Crée une application express
require('dotenv').config()

const mongodbErrorHandler = require('mongoose-mongodb-errors')
mongoose.plugin(mongodbErrorHandler);


const commentRoutes = require('./routes/comment'); // remplacer par post
const userRoutes = require('./routes/user');


mongoose.connect(process.env.SECRET_DTB,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors())
app.use(express.json({limit: '5mb'})); // récupère les objets JSON
app.use(express.urlencoded({extended:true}))
app.use('/api/comments', commentRoutes); // // remplacer par post
app.use('/api/auth', userRoutes);



module.exports = app; // exports permet d'utiliser notre fonction sur d'autres fichiers

// npm run dev (front)
// nodemon server (back)
