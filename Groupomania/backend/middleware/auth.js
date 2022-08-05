const jwt = require('jsonwebtoken')
const User = require("../models/User");
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !"
    } else {
      User.findById(req.auth.userId)
        .then(user => {
          req.user = user
        })
      next();
    }

  } catch (error) {
    res.status(401).json({ error: error | 'requête non authentifiée !' })

  }


}

