const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const fs = require("fs")
const path = require("path")
require('dotenv').config()



exports.findOneUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.password = undefined
            console.log(user)
            return res.status(200).json(user)
        })
        .catch(error => res.status(404).json({ error: error }))
}

exports.updateUser = (req, res) => {
    const userObject = { ...req.body }
    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'User updated!' }))
        .catch(error => res.status(400).json({ error }))
}

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res) => {
    // console.log("ne devrais pas passer ici pour le signup")
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "mot de passe incorrect !" })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.Status(500).json({ error }))
        })
        .catch(error => res.Status(500).json({ error }))
};