const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors")
const app = express();
require('dotenv').config()

const mongodbErrorHandler = require('mongoose-mongodb-errors')
mongoose.plugin(mongodbErrorHandler);


const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');


mongoose.connect(process.env.SECRET_DTB,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors())
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended:true}))
app.use('/api/comments', commentRoutes);
app.use('/api/auth', userRoutes);



module.exports = app;

// npm run dev (front)
// nodemon server (back)
